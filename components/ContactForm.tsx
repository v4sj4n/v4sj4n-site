"use client";

import { motion } from "motion/react";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { useCallback, useId, useState } from "react";

declare global {
	interface Window {
		onContactTurnstileSuccess?: (token: string) => void;
		onContactTurnstileExpired?: () => void;
		onContactTurnstileError?: () => void;
	}
}

const inputClassName =
	"w-full rounded-xl border border-black/[0.06] bg-card/95 px-4 py-3 text-sm outline outline-1 outline-black/[0.08] backdrop-blur-md transition-[border-color,box-shadow,transform] duration-300 placeholder:text-muted-foreground/60 hover:border-primary/20 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] focus:border-primary/40 focus:shadow-[0_0_0_3px_oklch(from_var(--primary)_l_c_h/0.12),0_2px_8px_rgba(0,0,0,0.04)] dark:border-white/[0.06] dark:bg-card/90 dark:outline-white/[0.08] dark:hover:shadow-[0_2px_8px_rgba(0,0,0,0.25)]";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const contactApiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL ?? "/api/contact";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
	const t = useTranslations("contact.form");
	const consentId = useId();
	const [token, setToken] = useState("");
	const [consent, setConsent] = useState(false);
	const [status, setStatus] = useState<FormStatus>("idle");
	const [errorKey, setErrorKey] = useState<string | null>(null);

	const resetTurnstile = useCallback(() => {
		setToken("");
		if (typeof window !== "undefined" && "turnstile" in window) {
			const turnstile = (
				window as Window & {
					turnstile?: { reset: () => void };
				}
			).turnstile;
			turnstile?.reset();
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorKey(null);

		if (!consent) {
			setErrorKey("consentRequired");
			setStatus("error");
			return;
		}

		if (!token) {
			setErrorKey("turnstileError");
			setStatus("error");
			return;
		}

		const form = e.currentTarget;
		const formData = new FormData(form);
		const name = String(formData.get("name") ?? "").trim();
		const email = String(formData.get("email") ?? "").trim();
		const message = String(formData.get("message") ?? "").trim();

		if (!name || !email || !message) {
			setErrorKey("error");
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
					consent: true,
					token,
				}),
			});

			const data = (await response.json()) as { ok?: boolean; error?: string };

			if (!response.ok || !data.ok) {
				setErrorKey(
					data.error === "consent_required"
						? "consentRequired"
						: data.error === "turnstile_failed" ||
								data.error === "turnstile_required"
							? "turnstileError"
							: "error",
				);
				setStatus("error");
				resetTurnstile();
				return;
			}

			setStatus("success");
			form.reset();
			setConsent(false);
			resetTurnstile();
		} catch {
			setErrorKey("error");
			setStatus("error");
			resetTurnstile();
		}
	};

	const isSubmitting = status === "submitting";
	const canSubmit = consent && !!token && !isSubmitting;

	return (
		<>
			<Script
				src="https://challenges.cloudflare.com/turnstile/v0/api.js"
				strategy="afterInteractive"
				onLoad={() => {
					window.onContactTurnstileSuccess = (nextToken: string) => {
						setToken(nextToken);
					};
					window.onContactTurnstileExpired = () => {
						setToken("");
					};
					window.onContactTurnstileError = () => {
						setToken("");
						setErrorKey("turnstileError");
						setStatus("error");
					};
				}}
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
						disabled={isSubmitting}
						placeholder={t("messagePlaceholder")}
						className={`${inputClassName} resize-none`}
					/>
				</div>

				<div className="flex items-start gap-3">
					<input
						id={consentId}
						name="consent"
						type="checkbox"
						checked={consent}
						disabled={isSubmitting}
						onChange={(e) => setConsent(e.target.checked)}
						className="mt-0.5 size-4 shrink-0 rounded border border-border accent-primary"
					/>
					<label
						htmlFor={consentId}
						className="text-[13px] leading-relaxed text-muted-foreground"
					>
						{t("consent")}
					</label>
				</div>

				{turnstileSiteKey ? (
					<div
						className="cf-turnstile"
						data-sitekey={turnstileSiteKey}
						data-action="contact-form"
						data-callback="onContactTurnstileSuccess"
						data-expired-callback="onContactTurnstileExpired"
						data-error-callback="onContactTurnstileError"
					/>
				) : null}

				{status === "success" ? (
					<p role="status" className="text-sm font-medium text-primary">
						{t("success")}
					</p>
				) : null}

				{status === "error" && errorKey ? (
					<p role="alert" className="text-sm font-medium text-destructive">
						{errorKey === "consentRequired"
							? t("consentRequired")
							: errorKey === "turnstileError"
								? t("turnstileError")
								: t("error")}
					</p>
				) : null}

				<motion.button
					type="submit"
					disabled={!canSubmit}
					whileHover={canSubmit ? { scale: 1.02 } : undefined}
					whileTap={canSubmit ? { scale: 0.96 } : undefined}
					className="rounded-full bg-foreground px-7 py-3.5 text-[13px] font-semibold tracking-wide text-background transition-colors duration-500 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting ? t("submitting") : t("submit")}
				</motion.button>
			</form>
		</>
	);
}
