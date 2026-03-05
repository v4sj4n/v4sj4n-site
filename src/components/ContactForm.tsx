import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useActionState, useEffect, useRef, useState } from "react";
import { actions } from "astro:actions";
import { CLOUDFLARE_SITE } from "astro:env/client";
import Turnstile from "react-turnstile";
import { WebHaptics } from "web-haptics";

const ease = [0.32, 0.72, 0, 1] as const;

export default function ContactForm() {
	const formRef = useRef<HTMLFormElement>(null);
	const hapticsRef = useRef<WebHaptics | null>(null);
	const turnstileRef = useRef<any>(null);
	const [buttonState, setButtonState] = useState<"idle" | "success" | "error">(
		"idle",
	);
	const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
	const [isMounted, setIsMounted] = useState(false);

	const [state, submitAction, isPending] = useActionState(
		async (prevState: any, formData: FormData) => {
			try {
				const { data, error } = await actions.contact(formData);
				if (error || (data && !data.success)) {
					return {
						status: "error",
						message: error?.message || data?.error,
						id: Date.now(),
					};
				}
				return { status: "success", id: Date.now() };
			} catch (err) {
				return { status: "error", message: "Network error", id: Date.now() };
			}
		},
		{ status: "idle", id: 0 },
	);

	useEffect(() => {
		setIsMounted(true);
		hapticsRef.current = new WebHaptics();
		return () => hapticsRef.current?.destroy();
	}, []);

	useEffect(() => {
		if (!state.id) return;

		if (state.status === "success") {
			formRef.current?.reset();
			setTurnstileToken(null);
			turnstileRef.current?.reset();
			hapticsRef.current?.trigger("success");
			setButtonState("success");
		} else if (state.status === "error") {
			hapticsRef.current?.trigger("error");
			setButtonState("error");
			setTurnstileToken(null);
			turnstileRef.current?.reset();
		}

		const t = setTimeout(() => {
			setButtonState("idle");
		}, 3000);

		return () => clearTimeout(t);
	}, [state.status, state.id]);

	return (
		<div className="relative rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900/50 p-8 md:p-10">
			<div className="mb-10">
				<p className="text-lg font-medium mb-2">Send a message</p>
				<p className="text-sm text-neutral-400 dark:text-neutral-500">
					I&apos;ll get back to you within 24 hours.
				</p>
			</div>

			<form ref={formRef} action={submitAction} className="space-y-8">
				{[
					{
						label: "Name",
						name: "name",
						type: "text",
						placeholder: "Your name",
					},
					{
						label: "Email",
						name: "email",
						type: "email",
						placeholder: "your@email.com",
					},
				].map((field, i) => (
					<motion.div
						key={field.name}
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.08 }}
						className="group"
					>
						<label className="text-[11px] font-mono uppercase tracking-[0.15em] block mb-2 text-neutral-400 dark:text-neutral-500 group-focus-within:text-primary transition-colors duration-300">
							{field.label}
						</label>
						<input
							name={field.name}
							type={field.type}
							required
							className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-700 py-3 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors duration-300 text-sm placeholder:text-neutral-300 dark:placeholder:text-neutral-700"
							placeholder={field.placeholder}
						/>
					</motion.div>
				))}

				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, ease, delay: 0.46 }}
					className="group"
				>
					<label className="text-[11px] font-mono uppercase tracking-[0.15em] block mb-2 text-neutral-400 dark:text-neutral-500 group-focus-within:text-primary transition-colors duration-300">
						Message
					</label>
					<textarea
						name="message"
						rows={4}
						required
						className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-700 py-3 focus:outline-none focus:border-primary dark:focus:border-primary transition-colors duration-300 resize-none text-sm placeholder:text-neutral-300 dark:placeholder:text-neutral-700"
						placeholder="Tell me about your project..."
					/>
				</motion.div>

				<div className="mt-4 w-full [&>div]:w-full">
					{isMounted && (
						<Turnstile
							sitekey={CLOUDFLARE_SITE}
							theme="dark"
							size="flexible"
							style={{ width: "100%" }}
							onVerify={(token, boundTurnstile) => {
								setTurnstileToken(token);
								turnstileRef.current = boundTurnstile;
							}}
							onError={() => setTurnstileToken(null)}
							onExpire={() => setTurnstileToken(null)}
						/>
					)}
				</div>

				{state.status === "error" && buttonState === "error" && (
					<p className="text-red-500 text-sm">Failed: {state.message}</p>
				)}

				<motion.div
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, ease, delay: 0.54 }}
				>
					<motion.button
						type="submit"
						disabled={isPending || !turnstileToken}
						whileHover={{ scale: 1.01 }}
						whileTap={{ scale: 0.99 }}
						className="group w-full py-4 mt-4 flex justify-center items-center gap-3 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-xl text-[13px] font-semibold tracking-wide hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all duration-500 disabled:opacity-60"
					>
						{isPending
							? "Sending..."
							: buttonState === "success"
								? "Message Sent ✓"
								: buttonState === "error"
									? "Failed — Try Again"
									: "Send Message"}
						{!isPending &&
							buttonState !== "success" &&
							buttonState !== "error" && (
								<Send
									size={14}
									className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
								/>
							)}
					</motion.button>
				</motion.div>
			</form>
		</div>
	);
}
