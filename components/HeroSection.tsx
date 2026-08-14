"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
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
	wrapperClassName,
	as: Tag = "h1",
}: {
	children: React.ReactNode;
	delay: number;
	className?: string;
	wrapperClassName?: string;
	as?: "h1" | "p";
}) {
	const prefersReducedMotion = useReducedMotion() ?? false;
	const [isComplete, setIsComplete] = useState(prefersReducedMotion);

	return (
		<div
			className={`${isComplete ? "" : "overflow-hidden"} ${wrapperClassName ?? ""}`}
		>
			<motion.div
				initial={{ y: prefersReducedMotion ? 0 : "110%" }}
				animate={{ y: 0 }}
				transition={{
					duration: prefersReducedMotion ? 0 : 0.85,
					ease: appleEase,
					delay: prefersReducedMotion ? 0 : delay,
				}}
				onAnimationComplete={() => setIsComplete(true)}
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

	const enter = !prefersReducedMotion && shouldEnter;
	const ambient = !prefersReducedMotion && shouldAnimateAmbient;

	const contentY = useTransform(scrollYProgress, [0, 1], [0, -72]);
	const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
	const scrollOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

	useEffect(() => {
		const mq = window.matchMedia("(min-width: 1024px)");
		const syncEnter = () => {
			if (!mq.matches) completeEnter();
		};
		syncEnter();
		mq.addEventListener("change", syncEnter);
		return () => mq.removeEventListener("change", syncEnter);
	}, [completeEnter]);

	return (
		<section
			ref={sectionRef}
			id="home"
			className="relative flex min-h-dvh flex-col justify-center overflow-hidden"
		>
			<motion.div
				style={{ y: contentY, opacity: contentOpacity }}
				className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-[5fr_4fr] lg:items-center lg:gap-8 md:px-8 md:py-24"
			>
				<div className="min-w-0">
					<ClipReveal delay={0.1} className="mb-10">
						<SectionEyebrow>{t("badge")}</SectionEyebrow>
					</ClipReveal>

					<div className="mb-8 flex flex-col gap-1 sm:gap-2">
						<HeroTitleLine
							delay={0.28}
							className="pb-[0.08em] text-[clamp(3rem,7.5vw,6rem)] font-semibold tracking-[-0.04em] leading-[1.02]"
						>
							{t("title")}
						</HeroTitleLine>
						<HeroTitleLine
							delay={0.42}
							as="p"
							className="pb-[0.08em] font-serif text-[clamp(3rem,7.5vw,6rem)] font-semibold tracking-[-0.04em] leading-[1.02] text-muted-foreground"
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
								target="_blank"
								rel="noopener noreferrer"
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

				<div className="hidden min-w-0 w-full overflow-visible lg:block">
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
