"use client";

import { useReducedMotion } from "motion/react";
import * as motion from "motion/react-client";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { AxolotlViewer } from "@/components/AxolotlViewer";
import { validateContactInput } from "@/lib/contact-validation";

type TurnstileApi = {
	render: (
		container: HTMLElement,
		options: {
			sitekey: string;
			theme?: "light" | "dark" | "auto";
			appearance?: "always" | "execute" | "interaction-only";
			size?: "normal" | "compact" | "flexible";
			action?: string;
			callback?: (token: string) => void;
			"error-callback"?: () => void;
			"expired-callback"?: () => void;
		},
	) => string;
	reset: (widgetId: string) => void;
	remove: (widgetId: string) => void;
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const contactApiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL ?? "/api/contact";

const fieldSurfaceClassName =
	"w-full rounded-xl border border-black/[0.06] bg-muted/20 outline outline-1 outline-black/[0.08] backdrop-blur-sm dark:border-white/[0.06] dark:bg-card/40 dark:outline-white/[0.08]";

const inputClassName = `${fieldSurfaceClassName} px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus-visible:border-black/20 focus-visible:outline-2 focus-visible:outline-black/20 focus-visible:ring-0 dark:focus-visible:border-white/20 dark:focus-visible:outline-white/20 disabled:cursor-not-allowed disabled:opacity-50`;

type FormStatus = "idle" | "submitting" | "success" | "error";

type FormErrorKey =
	| "turnstileError"
	| "nameTooShort"
	| "invalidEmail"
	| "messageTooShort"
	| "error";

type SubmittedMessage = {
	name: string;
	email: string;
	message: string;
};

function mapValidationError(
	error: ReturnType<typeof validateContactInput>,
): FormErrorKey {
	switch (error) {
		case "invalid_name":
			return "nameTooShort";
		case "invalid_email":
			return "invalidEmail";
		case "message_too_short":
			return "messageTooShort";
		default:
			return "error";
	}
}

function mapServerError(error: string | undefined): FormErrorKey {
	switch (error) {
		case "turnstile_failed":
		case "turnstile_required":
			return "turnstileError";
		case "invalid_name":
			return "nameTooShort";
		case "invalid_email":
			return "invalidEmail";
		case "message_too_short":
			return "messageTooShort";
		default:
			return "error";
	}
}

function readSiteTheme(): "light" | "dark" {
	if (typeof document === "undefined") {
		return "dark";
	}

	return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ContactForm({
	onSuccessChange,
}: {
	onSuccessChange?: (sent: boolean) => void;
}) {
	const t = useTranslations("contact.form");
	const prefersReducedMotion = useReducedMotion() ?? false;
	const turnstileRef = useRef<HTMLDivElement>(null);
	const turnstileWidgetId = useRef<string | null>(null);
	const [token, setToken] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState<FormStatus>("idle");
	const [errorKey, setErrorKey] = useState<FormErrorKey | null>(null);
	const [submittedMessage, setSubmittedMessage] =
		useState<SubmittedMessage | null>(null);
	const [turnstileTheme, setTurnstileTheme] = useState<"light" | "dark">(
		"dark",
	);

	useEffect(() => {
		setTurnstileTheme(readSiteTheme());

		const observer = new MutationObserver(() => {
			setTurnstileTheme(readSiteTheme());
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!turnstileSiteKey) {
			return;
		}

		let cancelled = false;
		let pollId: number | undefined;

		const mountTurnstile = () => {
			if (cancelled || !turnstileRef.current) {
				return false;
			}

			const turnstile = (window as Window & { turnstile?: TurnstileApi })
				.turnstile;
			if (!turnstile) {
				return false;
			}

			if (turnstileWidgetId.current) {
				turnstile.remove(turnstileWidgetId.current);
				turnstileWidgetId.current = null;
			}

			setToken("");

			turnstileWidgetId.current = turnstile.render(turnstileRef.current, {
				sitekey: turnstileSiteKey,
				theme: turnstileTheme,
				appearance: "interaction-only",
				size: "flexible",
				action: "contact-form",
				callback: (nextToken) => setToken(nextToken),
				"expired-callback": () => setToken(""),
				"error-callback": () => {
					setToken("");
					setErrorKey("turnstileError");
					setStatus("error");
				},
			});

			return true;
		};

		if (!mountTurnstile()) {
			pollId = window.setInterval(() => {
				if (mountTurnstile() && pollId !== undefined) {
					window.clearInterval(pollId);
				}
			}, 50);
		}

		return () => {
			cancelled = true;
			if (pollId !== undefined) {
				window.clearInterval(pollId);
			}
			const api = (window as Window & { turnstile?: TurnstileApi }).turnstile;
			if (turnstileWidgetId.current && api) {
				api.remove(turnstileWidgetId.current);
				turnstileWidgetId.current = null;
			}
		};
	}, [turnstileTheme]);

	const resetTurnstile = useCallback(() => {
		setToken("");
		const turnstile = (window as Window & { turnstile?: TurnstileApi })
			.turnstile;
		if (turnstileWidgetId.current && turnstile) {
			turnstile.reset(turnstileWidgetId.current);
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorKey(null);

		const form = e.currentTarget;
		const formData = new FormData(form);
		const name = String(formData.get("name") ?? "").trim();
		const email = String(formData.get("email") ?? "").trim();
		const message = String(formData.get("message") ?? "").trim();

		const validationError = validateContactInput({ name, email, message });
		if (validationError) {
			setErrorKey(mapValidationError(validationError));
			setStatus("error");
			return;
		}

		if (!token) {
			setErrorKey("turnstileError");
			setStatus("error");
			return;
		}

		setStatus("submitting");

		try {
			const response = await fetch(contactApiUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name,
					email,
					message,
					token,
				}),
			});

			const data = (await response.json()) as { ok?: boolean; error?: string };

			if (!response.ok || !data.ok) {
				setErrorKey(mapServerError(data.error));
				setStatus("error");
				resetTurnstile();
				return;
			}

			setStatus("success");
			setSubmittedMessage({ name, email, message });
			form.reset();
			setName("");
			setEmail("");
			setMessage("");
			resetTurnstile();
		} catch {
			setErrorKey("error");
			setStatus("error");
			resetTurnstile();
		}
	};

	const isSubmitting = status === "submitting";
	const isFormValid = validateContactInput({ name, email, message }) === null;
	const canSubmit =
		isFormValid && (!turnstileSiteKey || !!token) && !isSubmitting;

	useEffect(() => {
		onSuccessChange?.(status === "success" && submittedMessage !== null);
	}, [status, submittedMessage, onSuccessChange]);

	if (status === "success" && submittedMessage) {
		return (
			<motion.div
				initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					duration: prefersReducedMotion ? 0 : 0.45,
					ease: [0.32, 0.72, 0, 1],
				}}
				className="min-w-0 space-y-4 pt-5 pb-2 md:pt-7 md:pb-3"
				data-status="submitted"
				data-state="submitted"
				role="status"
			>
				<figure className={`${fieldSurfaceClassName} px-4 py-3 text-sm`}>
					<figcaption className="mb-1 text-[13px] font-medium">
						{t("receivedMessageLabel")}
					</figcaption>
					<blockquote className="whitespace-pre-wrap break-words text-muted-foreground">
						{submittedMessage.message}
					</blockquote>
					<figcaption className="mt-2 truncate text-xs text-muted-foreground/80">
						{submittedMessage.name} — {submittedMessage.email}
					</figcaption>
				</figure>

				<AxolotlViewer
					label={t("viewerLabel")}
					loadingLabel={t("viewerLoading")}
					errorLabel={t("viewerError")}
					celebration
				/>
			</motion.div>
		);
	}

	return (
		<>
			<Script
				src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
				strategy="afterInteractive"
			/>

			<form className="space-y-4 py-5 md:py-6" onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label
							htmlFor="name"
							className="mb-2 block text-[13px] font-medium"
						>
							{t("name")}
						</label>
						<input
							id="name"
							name="name"
							type="text"
							required
							minLength={2}
							value={name}
							onChange={(event) => setName(event.target.value)}
							disabled={isSubmitting}
							placeholder={t("namePlaceholder")}
							className={inputClassName}
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="mb-2 block text-[13px] font-medium"
						>
							{t("email")}
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							disabled={isSubmitting}
							placeholder={t("emailPlaceholder")}
							className={inputClassName}
						/>
					</div>
				</div>

				<div>
					<label
						htmlFor="message"
						className="mb-2 block text-[13px] font-medium"
					>
						{t("message")}
					</label>
					<textarea
						id="message"
						name="message"
						required
						rows={4}
						minLength={10}
						value={message}
						onChange={(event) => setMessage(event.target.value)}
						disabled={isSubmitting}
						placeholder={t("messagePlaceholder")}
						className={`${inputClassName} resize-none`}
					/>
				</div>

				{/* Mounted only when a site key is configured; unmounted with
				    the form on success. interaction-only renders nothing
				    visible until a challenge is required, so this collapses
				    to zero height and takes no space when idle. */}
				{turnstileSiteKey ? (
					<div ref={turnstileRef} className="overflow-hidden empty:hidden" />
				) : null}

				{errorKey ? (
					<p role="alert" className="text-sm font-medium text-destructive">
						{t(errorKey)}
					</p>
				) : null}

				<div className="pt-1">
					<button
						type="submit"
						disabled={!canSubmit}
						className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
					>
						{isSubmitting ? t("submitting") : t("submit")}
					</button>
				</div>
			</form>
		</>
	);
}
