"use client";

import Script from "next/script";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { validateContactInput } from "@/lib/contact-validation";
import { useTheme } from "@/hooks/useTheme";

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

const inputClassName =
	"contact-input w-full px-4 py-3 disabled:cursor-not-allowed disabled:opacity-50";

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

export function ContactForm({
	onSuccessChange,
}: {
	onSuccessChange?: (sent: boolean) => void;
}) {
	const t = useTranslations("contact.form");
	const { theme } = useTheme();
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
	const [draftLoaded, setDraftLoaded] = useState(false);

	const wordCount = message.trim() ? message.trim().split(/\s+/).length : 0;

	useEffect(() => {
		try {
			const raw = localStorage.getItem("contact-draft");
			if (raw) {
				const draft = JSON.parse(raw) as {
					name?: string;
					email?: string;
					message?: string;
				};
				if (typeof draft.name === "string") setName(draft.name);
				if (typeof draft.email === "string") setEmail(draft.email);
				if (typeof draft.message === "string") setMessage(draft.message);
			}
		} catch {
			// Corrupt draft — start fresh.
		} finally {
			setDraftLoaded(true);
		}
	}, []);

	useEffect(() => {
		if (!draftLoaded || status === "success") return;
		try {
			localStorage.setItem(
				"contact-draft",
				JSON.stringify({ name, email, message }),
			);
		} catch {
			// Storage full or blocked — the form still works.
		}
	}, [name, email, message, draftLoaded, status]);

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
				// Explicit site theme — "auto" follows the OS setting, not the
				// site's dark/light toggle, so the widget clashes with the bg.
				theme,
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
	}, [theme]);

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
			try {
				localStorage.removeItem("contact-draft");
			} catch {
				// Ignore storage errors on success cleanup.
			}
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
		const sendAnother = () => {
			setStatus("idle");
			setErrorKey(null);
			setSubmittedMessage(null);
		};
		return (
			<div
				className="min-w-0 space-y-4 pt-5 pb-2 md:pt-7 md:pb-3"
				data-status="submitted"
				data-state="submitted"
				role="status"
			>
				<div className="flex items-center gap-3">
					<span
						className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#188038] text-white"
						aria-hidden
					>
						<span className="symbol" style={{ fontSize: 20 }}>
							check
						</span>
					</span>
					<div className="min-w-0">
						<p className="text-[15px] font-medium tracking-[-0.01em] text-foreground">
							{t("successTitle")}
						</p>
						<p className="text-sm text-muted-foreground">{t("success")}</p>
					</div>
				</div>

				<figure className="rounded-2xl border border-border bg-card px-4 py-3 text-sm text-card-foreground">
					<figcaption className="mb-1 text-[13px] font-medium">
						{t("receivedMessageLabel")}
					</figcaption>
					<blockquote className="whitespace-pre-wrap break-words text-muted-foreground">
						{submittedMessage.message}
					</blockquote>
					<figcaption className="mt-2 truncate text-xs text-muted-foreground">
						{submittedMessage.name}, {submittedMessage.email}
					</figcaption>
				</figure>

				<div className="pt-1">
					<button
						type="button"
						onClick={sendAnother}
						className="agy-btn agy-btn-secondary inline-flex text-sm"
					>
						{t("sendAnother")}
					</button>
				</div>
			</div>
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
							className="g-label mb-2 block text-foreground"
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
							className="g-label mb-2 block text-foreground"
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
					<div className="mb-2 flex items-baseline justify-between gap-3">
						<label htmlFor="message" className="g-label block text-foreground">
							{t("message")}
						</label>
						<span
							id="message-count"
							className="text-xs tabular-nums text-muted-foreground"
							aria-live="polite"
						>
							{t("wordCount", { count: wordCount })}
						</span>
					</div>
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
						className={`${inputClassName} resize-none rounded-2xl`}
						aria-describedby="message-count"
					/>
				</div>

				{/* Mounted only when a site key is configured; unmounted with
				    the form on success. interaction-only renders nothing
				    visible until a challenge is required, so this collapses
				    to zero height and takes no space when idle. */}
				{turnstileSiteKey ? (
					<div
						ref={turnstileRef}
						className="turnstile-field w-full overflow-hidden empty:hidden"
						style={{ colorScheme: "light dark" }}
					/>
				) : null}

				{errorKey ? (
					<p role="alert" className="g-error text-sm font-medium">
						{t(errorKey)}
					</p>
				) : null}

				<div className="flex justify-end pt-1">
					<button
						type="submit"
						disabled={!canSubmit}
						className="agy-btn agy-btn-primary w-full text-base sm:w-auto"
					>
						{isSubmitting ? t("submitting") : t("submit")}
					</button>
				</div>
			</form>
		</>
	);
}
