"use client";

import { Send } from "lucide-react";
import { motion } from "motion/react";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { validateContactInput } from "@/lib/contact-validation";

type TurnstileApi = {
	render: (
		container: HTMLElement,
		options: {
			sitekey: string;
			theme?: "light" | "dark" | "auto";
			appearance?: "always" | "execute" | "interaction-only";
			size?: "normal" | "flexible" | "compact";
			action?: string;
			callback?: (token: string) => void;
			"expired-callback"?: () => void;
			"error-callback"?: () => void;
		},
	) => string;
	reset: (widgetId?: string) => void;
	remove: (widgetId: string) => void;
	ready: (callback: () => void) => void;
};

const fieldSurfaceClassName =
	"w-full rounded-xl border border-black/[0.06] bg-card/95 outline outline-1 outline-black/[0.08] backdrop-blur-md transition-[border-color,box-shadow] duration-300 dark:border-white/[0.06] dark:bg-card/90 dark:outline-white/[0.08]";

const inputClassName = `${fieldSurfaceClassName} px-4 py-3 text-sm placeholder:text-muted-foreground/60 hover:border-primary/20 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] focus:border-primary/40 focus:shadow-[0_0_0_3px_oklch(from_var(--primary)_l_c_h/0.12),0_2px_8px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_2px_8px_rgba(0,0,0,0.25)]`;

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const contactApiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL ?? "/api/contact";

type FormStatus = "idle" | "submitting" | "success" | "error";

type FormErrorKey =
	| "turnstileError"
	| "nameTooShort"
	| "invalidEmail"
	| "messageTooShort"
	| "error";

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

export function ContactForm() {
	const t = useTranslations("contact.form");
	const turnstileRef = useRef<HTMLDivElement>(null);
	const turnstileWidgetId = useRef<string | null>(null);
	const [token, setToken] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState<FormStatus>("idle");
	const [errorKey, setErrorKey] = useState<FormErrorKey | null>(null);
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

	return (
		<>
			<Script
				src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
				strategy="afterInteractive"
			/>

			<form className="space-y-5 py-6 md:py-8" onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
						rows={4}
						required
						value={message}
						onChange={(event) => setMessage(event.target.value)}
						disabled={isSubmitting}
						placeholder={t("messagePlaceholder")}
						className={`${inputClassName} resize-none`}
					/>
				</div>

				{turnstileSiteKey ? (
					<div className="turnstile-field">
						<div ref={turnstileRef} className="w-full" />
					</div>
				) : null}

				{status === "success" ? (
					<p role="status" className="text-sm font-medium text-primary">
						{t("success")}
					</p>
				) : null}

				{status === "error" && errorKey ? (
					<p role="alert" className="text-sm font-medium text-destructive">
						{t(errorKey)}
					</p>
				) : null}

				<motion.button
					type="submit"
					disabled={!canSubmit}
					whileHover={canSubmit ? { scale: 1.02 } : undefined}
					whileTap={canSubmit ? { scale: 0.96 } : undefined}
					className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-[13px] font-semibold tracking-wide text-background transition-colors duration-500 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
				>
					<span>{isSubmitting ? t("submitting") : t("submit")}</span>
					<Send size={16} strokeWidth={2} className="shrink-0" aria-hidden />
				</motion.button>
			</form>
		</>
	);
}
