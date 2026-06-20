"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const inputClassName =
	"w-full rounded-xl border border-black/[0.06] bg-card/95 px-4 py-3 text-sm outline outline-1 outline-black/[0.08] backdrop-blur-md transition-[border-color,box-shadow,transform] duration-300 placeholder:text-muted-foreground/60 hover:border-primary/20 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] focus:border-primary/40 focus:shadow-[0_0_0_3px_oklch(from_var(--primary)_l_c_h/0.12),0_2px_8px_rgba(0,0,0,0.04)] dark:border-white/[0.06] dark:bg-card/90 dark:outline-white/[0.08] dark:hover:shadow-[0_2px_8px_rgba(0,0,0,0.25)]";

export function ContactForm() {
	const t = useTranslations("contact.form");

	return (
		<form
			className="space-y-5 py-6 md:py-8"
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
				<div>
					<label htmlFor="name" className="mb-2 block text-[13px] font-medium">
						{t("name")}
					</label>
					<input
						id="name"
						name="name"
						type="text"
						placeholder={t("namePlaceholder")}
						className={inputClassName}
					/>
				</div>
				<div>
					<label htmlFor="email" className="mb-2 block text-[13px] font-medium">
						{t("email")}
					</label>
					<input
						id="email"
						name="email"
						type="email"
						placeholder={t("emailPlaceholder")}
						className={inputClassName}
					/>
				</div>
			</div>
			<div>
				<label htmlFor="message" className="mb-2 block text-[13px] font-medium">
					{t("message")}
				</label>
				<textarea
					id="message"
					name="message"
					rows={4}
					placeholder={t("messagePlaceholder")}
					className={`${inputClassName} resize-none`}
				/>
			</div>
			<motion.button
				type="submit"
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.96 }}
				className="rounded-full bg-foreground px-7 py-3.5 text-[13px] font-semibold tracking-wide text-background transition-colors duration-500 hover:bg-primary"
			>
				{t("submit")}
			</motion.button>
		</form>
	);
}
