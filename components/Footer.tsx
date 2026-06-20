"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";

export function Footer() {
	const t = useTranslations("footer");
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-border/50">
			<Reveal variant="fadeIn">
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-[13px] text-muted-foreground md:px-8 sm:flex-row">
					<p>{t("copyright", { year })}</p>
					<p>{t("tagline")}</p>
					<a
						href="#home"
						className="transition-colors duration-300 hover:text-foreground"
					>
						{t("backToTop")}
					</a>
				</div>
			</Reveal>
		</footer>
	);
}
