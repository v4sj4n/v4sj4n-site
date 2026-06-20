"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
	AnimatePresence,
	motion,
	useReducedMotion,
	useScroll,
	useTransform,
} from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { ClipReveal } from "@/components/ClipReveal";
import { HeroFloatingUI } from "@/components/HeroFloatingUI";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { useProgressiveMotion } from "@/hooks/useProgressiveMotion";
import { appleEase, floatLoop } from "@/lib/motion";

function HeroTitleLine({
	children,
	delay,
	className,
	as: Tag = "h1",
}: {
	children: React.ReactNode;
	delay: number;
	className?: string;
	as?: "h1" | "p";
}) {
	const prefersReducedMotion = useReducedMotion() ?? false;

	return (
		<div className="overflow-hidden">
			<motion.div
				initial={{ y: prefersReducedMotion ? 0 : "110%" }}
				animate={{ y: 0 }}
				transition={{
					duration: prefersReducedMotion ? 0 : 0.85,
					ease: appleEase,
					delay: prefersReducedMotion ? 0 : delay,
				}}
			>
				<Tag className={className}>{children}</Tag>
			</motion.div>
		</div>
	);
}

export function HeroSection() {
	const t = useTranslations("hero");
	const sectionRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});
	const {
		prefersReducedMotion,
		shouldEnter,
		shouldAnimateAmbient,
		completeEnter,
	} = useProgressiveMotion();
	const [showShortName, setShowShortName] = useState(false);

	const enter = !prefersReducedMotion && shouldEnter;
	const ambient = !prefersReducedMotion && shouldAnimateAmbient;

	const contentY = useTransform(scrollYProgress, [0, 1], [0, -72]);
	const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
	const scrollOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
	useEffect(() => {
		if (prefersReducedMotion) return;
		const timer = window.setTimeout(() => setShowShortName(true), 1300);
		return () => window.clearTimeout(timer);
	}, [prefersReducedMotion]);

	return (
		<section
			ref={sectionRef}
			id="home"
			className="relative flex min-h-dvh flex-col justify-center overflow-hidden"
		>
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<motion.div
					initial={{ opacity: 0, scale: 0.85 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 2, ease: appleEase }}
					className="absolute top-[8%] right-[0%] h-[55vw] w-[55vw] rounded-full bg-gradient-to-br from-primary/[0.07] via-accent/[0.04] to-transparent blur-[100px]"
				/>
				<motion.div
					initial={{ opacity: 0, scale: 0.85 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 2, ease: appleEase, delay: 0.25 }}
					className="absolute bottom-[5%] left-[-10%] h-[42vw] w-[42vw] rounded-full bg-gradient-to-tr from-muted/60 to-transparent blur-[90px]"
				/>
			</div>

			<motion.div
				style={{ y: contentY, opacity: contentOpacity }}
				className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-[5fr_4fr] lg:items-center lg:gap-8 md:px-8 md:py-24"
			>
				<div className="min-w-0">
					<ClipReveal delay={0.1} className="mb-10">
						<SectionEyebrow>{t("badge")}</SectionEyebrow>
					</ClipReveal>

					<div className="mb-8">
						<HeroTitleLine
							delay={0.28}
							className="pb-[0.12em] text-[clamp(2.75rem,7vw,5.75rem)] font-semibold tracking-[-0.04em] leading-[1.1]"
						>
							{t("title")}
						</HeroTitleLine>
						<HeroTitleLine
							delay={0.42}
							as="p"
							className="pb-[0.12em] font-serif text-[clamp(2.75rem,7vw,5.75rem)] font-semibold tracking-[-0.04em] leading-[1.1] text-muted-foreground"
						>
							{t("titleAccent")}
						</HeroTitleLine>
					</div>

					<ClipReveal delay={0.62}>
						<p className="max-w-xl text-base leading-relaxed text-muted-foreground md:max-w-2xl md:text-lg">
							{t("description")}
						</p>
					</ClipReveal>

					<ClipReveal delay={0.82} className="mt-10">
						<div className="flex flex-wrap items-center gap-4">
							<motion.a
								href="/resume.pdf"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.96 }}
								className="group inline-flex items-center gap-2.5 rounded-full bg-foreground px-7 py-3.5 text-[13px] font-semibold tracking-wide text-background transition-colors duration-500 hover:bg-primary"
							>
								{t("resume")}
								<ArrowUpRight
									size={14}
									className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								/>
							</motion.a>
							<a
								href="#projects"
								className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-[13px] font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
							>
								{t("work")}
								<ArrowDown size={14} />
							</a>
						</div>
					</ClipReveal>
				</div>

				<div className="min-w-0 w-full overflow-visible">
					<HeroFloatingUI
						shouldEnter={enter}
						shouldAnimateAmbient={ambient}
						onEnterComplete={completeEnter}
					/>
				</div>
			</motion.div>

			<motion.div
				style={{ opacity: scrollOpacity }}
				className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
			>
				<span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70">
					{t("scroll")}
				</span>
				<motion.div
					initial={{ y: 0 }}
					animate={
						ambient
							? { y: [0, -6, 0], transition: floatLoop(6, 0).transition }
							: { y: 0 }
					}
					className="h-6 w-px bg-gradient-to-b from-border to-transparent"
				/>
			</motion.div>
		</section>
	);
}
