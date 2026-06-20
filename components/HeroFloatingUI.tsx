"use client";

import {
	Command,
	FileCode2,
	GitBranch,
	Search,
	TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ClipReveal } from "@/components/ClipReveal";
import { appleEase, floatLoop, visibleState } from "@/lib/motion";

const cardShadow =
	"shadow-[0_1px_1px_rgba(0,0,0,0.024),0_2px_5px_rgba(0,0,0,0.032),0_6px_19px_rgba(0,0,0,0.048)] dark:shadow-[0_1px_1px_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.2),0_16px_40px_rgba(0,0,0,0.35)]";

function UiCard({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`overflow-hidden rounded-xl border border-black/[0.06] bg-white/90 text-card-foreground backdrop-blur-md dark:border-white/[0.08] dark:bg-card/95 ${cardShadow} ${className}`}
		>
			{children}
		</div>
	);
}

function CodeEditorCard() {
	return (
		<UiCard className="h-full w-full min-w-0">
			<div className="flex items-center gap-2 border-b border-black/[0.05] bg-black/[0.02] px-3 py-2 dark:border-white/[0.05] dark:bg-white/[0.02]">
				<FileCode2 size={11} className="text-muted-foreground" />
				<span className="font-mono text-[10px] text-muted-foreground">
					api/users.ts
				</span>
				<div className="ml-auto flex gap-1">
					<span className="size-2 rounded-full bg-black/10 dark:bg-white/15" />
					<span className="size-2 rounded-full bg-black/10 dark:bg-white/15" />
				</div>
			</div>
			<div className="space-y-0.5 p-3.5 font-mono text-[10.5px] leading-[1.65]">
				<div>
					<span className="text-foreground">fetchUser</span>
					<span className="text-muted-foreground">(</span>
					<span className="text-accent">id</span>
					<span className="text-muted-foreground">: </span>
					<span className="text-primary">string</span>
					<span className="text-muted-foreground">) {"{"}</span>
				</div>
				<div className="pl-3">
					<span className="text-primary">const</span>{" "}
					<span className="text-foreground">res</span>
					<span className="text-muted-foreground"> = </span>
					<span className="text-primary">await</span>{" "}
					<span className="text-foreground">fetch</span>
					<span className="text-muted-foreground">(</span>
					<span className="text-success">{`\`/api/users/\${id}\``}</span>
					<span className="text-muted-foreground">)</span>
				</div>
				<div className="pl-3">
					<span className="text-primary">return</span> res.json()
				</div>
				<div>
					<span className="text-muted-foreground">{"}"}</span>
				</div>
			</div>
		</UiCard>
	);
}

function ChartCard({
	shouldEnter,
	shouldAnimateAmbient,
}: {
	shouldEnter: boolean;
	shouldAnimateAmbient: boolean;
}) {
	const t = useTranslations("hero.ui.chart");
	const chartWidth = 272;
	const pathD =
		"M 8 52 C 28 48, 38 38, 58 42 S 88 18, 112 22 S 148 8, 172 14 S 208 28, 232 20 S 258 6, 272 12";

	return (
		<UiCard className="w-full min-w-0">
			<div className="flex items-center justify-between border-b border-black/[0.05] px-4 py-3 dark:border-white/[0.05]">
				<div className="flex items-center gap-2">
					<TrendingUp size={13} className="text-primary" />
					<span className="text-[12px] font-medium">{t("title")}</span>
				</div>
				<span className="font-mono text-[11px] tabular-nums text-success">
					{t("metric")}
				</span>
			</div>
			<div className="relative px-4 py-4">
				<svg
					viewBox={`0 0 ${chartWidth + 8} 60`}
					className="h-[96px] w-full sm:h-[108px]"
					aria-hidden
				>
					<defs>
						<linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="var(--primary)" stopOpacity="0.18" />
							<stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
						</linearGradient>
						<filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
							<feGaussianBlur stdDeviation="1.5" result="blur" />
							<feMerge>
								<feMergeNode in="blur" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>
					</defs>
					{[15, 30, 45].map((y) => (
						<line
							key={y}
							x1="8"
							y1={y}
							x2={chartWidth}
							y2={y}
							stroke="currentColor"
							strokeOpacity="0.06"
							strokeWidth="0.5"
						/>
					))}
					<motion.path
						d={`${pathD} L ${chartWidth} 58 L 8 58 Z`}
						fill="url(#chartFill)"
						initial={{ opacity: 1 }}
						animate={
							shouldEnter
								? {
										opacity: [0.35, 1],
										transition: { duration: 1.2, ease: appleEase, delay: 0.2 },
									}
								: { opacity: 1 }
						}
					/>
					<motion.path
						d={pathD}
						fill="none"
						stroke="var(--primary)"
						strokeWidth="1.5"
						strokeLinecap="round"
						filter="url(#lineGlow)"
						initial={{ pathLength: 1, opacity: 1 }}
						animate={
							shouldEnter
								? {
										pathLength: [0.12, 1],
										opacity: 1,
										transition: { duration: 1.4, ease: appleEase, delay: 0.05 },
									}
								: { pathLength: 1, opacity: 1 }
						}
					/>
					<motion.circle
						cx={chartWidth}
						cy="12"
						r="3"
						fill="var(--primary)"
						initial={{ scale: 1, opacity: 1 }}
						animate={
							shouldAnimateAmbient
								? {
										scale: [0.85, 1],
										opacity: 1,
										transition: { duration: 0.4, ease: appleEase },
									}
								: { scale: 1, opacity: 1 }
						}
					/>
				</svg>
				<div className="mt-1 flex justify-between font-mono text-[9px] tabular-nums text-muted-foreground/70">
					<span>{t("mon")}</span>
					<span>{t("wed")}</span>
					<span>{t("fri")}</span>
					<span>{t("sun")}</span>
				</div>
			</div>
		</UiCard>
	);
}

function CommandMenuCard({ shouldEnter }: { shouldEnter: boolean }) {
	const t = useTranslations("hero.ui.command");

	const items = [
		{ icon: Search, label: t("searchProjects"), shortcut: "⌘K", active: true },
		{ icon: GitBranch, label: t("createBranch"), shortcut: "⌘B" },
		{ icon: Command, label: t("runCommand"), shortcut: "⌘⇧P" },
	];

	return (
		<UiCard className="h-full w-full min-w-0">
			<div className="flex items-center gap-2.5 border-b border-black/[0.05] px-3.5 py-2.5 dark:border-white/[0.05]">
				<Search size={13} className="text-muted-foreground" />
				<span className="text-[12px] text-muted-foreground">
					{t("placeholder")}
				</span>
				<kbd className="ml-auto rounded-md border border-black/[0.08] bg-muted/80 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground dark:border-white/[0.08]">
					⌘K
				</kbd>
			</div>
			<div className="p-1.5">
				{items.map(({ icon: Icon, label, shortcut, active }, index) => (
					<motion.div
						key={label}
						initial={visibleState}
						animate={
							shouldEnter
								? {
										...visibleState,
										y: [8, 0],
										transition: {
											duration: 0.5,
											ease: appleEase,
											delay: 0.12 + index * 0.08,
										},
									}
								: visibleState
						}
						className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 ${
							active
								? "bg-primary/[0.08] text-foreground"
								: "text-muted-foreground"
						}`}
					>
						<Icon size={13} className={active ? "text-primary" : ""} />
						<span className="flex-1 text-[11px] font-medium">{label}</span>
						<kbd className="font-mono text-[9px] opacity-60">{shortcut}</kbd>
					</motion.div>
				))}
			</div>
		</UiCard>
	);
}

type FloatingCardProps = {
	children: React.ReactNode;
	className?: string;
	rotateDeg: number;
	revealDelay: number;
	floatDelay: number;
	floatAmount: number;
	shouldAnimateAmbient: boolean;
	onRevealComplete?: () => void;
};

function FloatingCard({
	children,
	className = "",
	rotateDeg,
	revealDelay,
	floatDelay,
	floatAmount,
	shouldAnimateAmbient,
	onRevealComplete,
}: FloatingCardProps) {
	return (
		<motion.div
			className={`will-change-transform [backface-visibility:hidden] ${className}`}
			initial={visibleState}
			animate={
				shouldAnimateAmbient
					? {
							opacity: 1,
							y: [0, -floatAmount, 0],
							filter: "blur(0px)",
							transition: floatLoop(floatAmount, floatDelay).transition,
						}
					: visibleState
			}
			style={{ rotate: rotateDeg }}
		>
			<ClipReveal
				clip={false}
				fade
				delay={revealDelay}
				onComplete={onRevealComplete}
			>
				{children}
			</ClipReveal>
		</motion.div>
	);
}

type HeroFloatingUIProps = {
	shouldEnter: boolean;
	shouldAnimateAmbient: boolean;
	onEnterComplete: () => void;
};

export function HeroFloatingUI({
	shouldEnter,
	shouldAnimateAmbient,
	onEnterComplete,
}: HeroFloatingUIProps) {
	return (
		<div
			className="relative mx-auto w-full max-w-[720px] lg:mx-0 lg:max-w-none"
			aria-hidden
		>
			<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
				<div className="h-[320px] w-[320px] rounded-full bg-gradient-to-br from-primary/[0.12] via-accent/[0.06] to-transparent blur-[80px]" />
			</div>

			<div className="relative w-full" style={{ perspective: "1000px" }}>
				<div className="relative flex flex-col gap-4 sm:gap-5">
					<FloatingCard
						className="relative z-30 w-full"
						rotateDeg={1}
						revealDelay={0.55}
						floatDelay={0.55}
						floatAmount={6}
						shouldAnimateAmbient={shouldAnimateAmbient}
					>
						<ChartCard
							shouldEnter={shouldEnter}
							shouldAnimateAmbient={shouldAnimateAmbient}
						/>
					</FloatingCard>

					<div className="grid grid-cols-1 items-stretch gap-4 p-3 sm:grid-cols-2 sm:gap-5">
						<FloatingCard
							className="relative z-10 min-w-0"
							rotateDeg={-2.5}
							revealDelay={0.72}
							floatDelay={1.2}
							floatAmount={5}
							shouldAnimateAmbient={shouldAnimateAmbient}
						>
							<CodeEditorCard />
						</FloatingCard>

						<FloatingCard
							className="relative z-20 min-w-0"
							rotateDeg={-1.5}
							revealDelay={0.88}
							floatDelay={2.4}
							floatAmount={4}
							shouldAnimateAmbient={shouldAnimateAmbient}
							onRevealComplete={onEnterComplete}
						>
							<CommandMenuCard shouldEnter={shouldEnter} />
						</FloatingCard>
					</div>
				</div>
			</div>
		</div>
	);
}
