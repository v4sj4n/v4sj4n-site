"use client";

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
import { useProgressiveMotion } from "@/hooks/useProgressiveMotion";
import { appleEase, floatLoop } from "@/lib/motion";

const bouncers = ["terminal", "deployed_code", "sdk", "neurology"] as const;

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
				className="relative z-[5] mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[5fr_4fr] lg:items-center lg:gap-16 md:px-8 md:py-16"
			>
				<div className="min-w-0">
					<div className="mt-4 mb-4 flex flex-col md:mb-5">
						<HeroTitleLine
							delay={0.28}
							className="agy-head hero-title-line pb-[0.02em] text-[clamp(1.75rem,4.9vw,3.75rem)] leading-[1.05] text-foreground"
						>
							{t("title")}
						</HeroTitleLine>
						<HeroTitleLine
							delay={0.42}
							as="p"
							className="agy-head hero-title-line pb-[0.02em] text-[clamp(1.75rem,4.9vw,3.75rem)] leading-[1.05] text-muted-foreground"
						>
							{t("titleAccent")}
						</HeroTitleLine>
					</div>

					<ClipReveal delay={0.62}>
						<p className="body-copy max-w-xl text-[17px] leading-[1.5] md:max-w-2xl md:text-[17.5px]">
							{t("description")}
						</p>
					</ClipReveal>

					<ClipReveal delay={0.82} className="mt-10">
						<div className="flex flex-wrap items-center gap-3">
							<motion.a
								href="/resume.pdf"
								target="_blank"
								rel="noopener noreferrer"
								whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
								whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
								className="agy-btn agy-btn-primary text-[16px]"
							>
								{t("resume")}
								<span className="symbol" style={{ fontSize: 20 }} aria-hidden>
									arrow_outward
								</span>
							</motion.a>
							<a
								href="#projects"
								className="agy-btn agy-btn-secondary text-[16px]"
							>
								{t("work")}
							</a>
						</div>
					</ClipReveal>

					<ClipReveal delay={0.94} className="mt-10">
						<div className="bouncer-row !justify-start" aria-hidden="true">
							{bouncers.map((icon) => (
								<span key={icon} className="bouncer">
									<span className="symbol">{icon}</span>
								</span>
							))}
						</div>
					</ClipReveal>
				</div>

				<div className="block min-w-0 w-full overflow-visible">
					<HeroFloatingUI
						shouldEnter={enter}
						shouldAnimateAmbient={ambient}
						onEnterComplete={completeEnter}
					/>
				</div>
			</motion.div>

			<motion.div
				style={{ opacity: scrollOpacity }}
				className="absolute bottom-6 left-1/2 z-[5] flex -translate-x-1/2 flex-col items-center gap-2 [@media(max-height:600px)]:hidden"
			>
				<span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
					{t("scroll")}
				</span>
				<motion.div
					initial={{ y: 0 }}
					animate={
						ambient
							? { y: [0, -6, 0], transition: floatLoop(6, 0).transition }
							: { y: 0 }
					}
					className="h-6 w-px bg-border/60"
				/>
			</motion.div>
		</section>
	);
}
