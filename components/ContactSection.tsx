"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ComponentType, SVGProps } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { ContactForm } from "./ContactForm";

type ChannelIcon = ComponentType<SVGProps<SVGSVGElement>>;

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
			<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.559V9h3.555v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
		</svg>
	);
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
			<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
		</svg>
	);
}

function XIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
		</svg>
	);
}

const channels: {
	key: "linkedin" | "github" | "email" | "twitter";
	href: string;
	icon: ChannelIcon;
}[] = [
	{
		key: "linkedin",
		href: "https://linkedin.com/in/v4sj4n",
		icon: LinkedinIcon,
	},
	{
		key: "github",
		href: "https://github.com/v4sj4n",
		icon: GithubIcon,
	},
	{
		key: "email",
		href: "mailto:hello@v4sj4n.com",
		icon: Mail,
	},
	{
		key: "twitter",
		href: "https://x.com/v4sj4n",
		icon: XIcon,
	},
];

export function ContactSection() {
	const t = useTranslations("contact");

	return (
		<section id="contact" className="border-t border-border/50 py-32 md:py-40">
			<div className="mx-auto max-w-6xl px-6 md:px-8">
				<div className="mb-20 md:mb-24">
					<Reveal>
						<SectionEyebrow>{t("label")}</SectionEyebrow>
					</Reveal>
					<Reveal delay={0.08}>
						<h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.03em] md:text-5xl lg:text-6xl">
							{t("title")}{" "}
							<span className="text-muted-foreground">{t("titleAccent")}</span>
						</h2>
					</Reveal>
				</div>

				<div className="grid grid-cols-1 gap-16 lg:grid-cols-[2fr_3fr] lg:gap-12">
					<div>
						<Reveal delay={0.12}>
							<p className="mb-12 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
								{t("description")}
							</p>
						</Reveal>

						<Reveal delay={0.16}>
							<div className="w-full rounded-2xl border border-border/60 bg-card/40 p-2.5 backdrop-blur-sm md:p-3">
								<Stagger className="flex flex-col gap-0.5">
									{channels.map(({ key, href, icon: Icon }) => (
										<StaggerItem key={key}>
											<a
												href={href}
												target={key === "email" ? undefined : "_blank"}
												rel={
													key === "email" ? undefined : "noopener noreferrer"
												}
												aria-label={`${t(`channels.${key}.label`)} — ${t(`channels.${key}.description`)}`}
												className="group flex items-center gap-4 rounded-lg border border-border/50 bg-muted/25 px-3 py-3.5 transition-[transform,background-color,border-color] duration-300 hover:border-border hover:bg-muted/60 active:scale-[0.96] sm:px-4 sm:py-4"
											>
												<Icon
													strokeWidth={1.75}
													className="size-[18px] shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-primary md:size-5"
												/>
												<span className="min-w-0 flex-1 text-left">
													<span className="block text-[11px] font-medium leading-tight tracking-[-0.01em] md:text-xs">
														{t(`channels.${key}.label`)}
													</span>
													<span className="mt-0.5 block text-pretty text-[10px] leading-snug text-muted-foreground md:text-[11px]">
														{t(`channels.${key}.description`)}
													</span>
												</span>
												<ArrowUpRight
													size={14}
													strokeWidth={1.75}
													className="shrink-0 text-muted-foreground/40 transition-[transform,color] duration-300 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-primary"
													aria-hidden
												/>
											</a>
										</StaggerItem>
									))}
								</Stagger>
							</div>
						</Reveal>
					</div>

					<Reveal delay={0.16}>
						<div className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
							<div className="border-b border-border/50 px-6 py-5 md:px-8 md:py-6">
								<h3 className="text-lg font-semibold tracking-[-0.02em] text-balance">
									{t("form.heading")}
								</h3>
								<p className="mt-1 max-w-[68ch] text-pretty text-sm text-muted-foreground">
									{t("form.subheading")}
								</p>
							</div>
							<div className="px-6 md:px-8">
								<ContactForm />
							</div>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
