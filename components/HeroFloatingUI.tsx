"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ClipReveal } from "@/components/ClipReveal";
import { appleEase, floatLoop, visibleState } from "@/lib/motion";

function UiCard({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`overflow-hidden rounded-3xl border bg-card text-card-foreground backdrop-blur-md ${className}`}
			style={{ borderColor: "var(--theme-outline-variant)" }}
		>
			{children}
		</div>
	);
}

function CodeEditorCard() {
	return (
		<UiCard className="h-full w-full min-w-0">
			<div
				className="flex items-center gap-2 border-b px-3 py-2"
				style={{
					borderColor: "var(--theme-outline-variant)",
					background: "var(--theme-surface-surface-container)",
				}}
			>
				<span className="symbol" style={{ fontSize: 14 }} aria-hidden>
					code_blocks
				</span>
				<span className="font-mono text-[10px] text-muted-foreground">
					api/users.ts
				</span>
				<div className="ml-auto flex gap-1" aria-hidden>
					<span className="size-2 rounded-full bg-black/10 dark:bg-white/15" />
					<span className="size-2 rounded-full bg-black/10 dark:bg-white/15" />
				</div>
			</div>
			<div className="space-y-0.5 p-3.5 font-mono text-[10.5px] leading-[1.65]">
				<div>
					<span className="text-foreground">fetchUser</span>
					<span className="text-muted-foreground">(</span>
					<span className="text-foreground">id</span>
					<span className="text-muted-foreground">: </span>
					<span className="text-foreground">string</span>
					<span className="text-muted-foreground">) {"{"}</span>
				</div>
				<div className="pl-3">
					<span className="text-foreground">const</span>{" "}
					<span className="text-foreground">res</span>
					<span className="text-muted-foreground"> = </span>
					<span className="text-foreground">await</span>{" "}
					<span className="text-foreground">fetch</span>
					<span className="text-muted-foreground">(</span>
					<span className="code-chip px-1">{`/api/users/\${id}`}</span>
					<span className="text-muted-foreground">)</span>
				</div>
				<div className="pl-3">
					<span className="text-foreground">return</span> res.json()
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
			<div
				className="flex items-center justify-between border-b px-4 py-3"
				style={{ borderColor: "var(--theme-outline-variant)" }}
			>
				<div className="flex items-center gap-2">
					<span className="symbol" style={{ fontSize: 16 }} aria-hidden>
						trending_up
					</span>
					<span className="text-[12px] font-medium">{t("title")}</span>
				</div>
				<span className="font-mono text-[11px] tabular-nums text-foreground">
					{t("metric")}
				</span>
			</div>
			<div className="relative px-4 py-4">
				{/* biome-ignore lint/a11y/noSvgWithoutTitle: decorative chart illustration */}
				<svg
					viewBox={`0 0 ${chartWidth + 8} 60`}
					className="h-[96px] w-full sm:h-[108px]"
					aria-hidden
				>
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
						d={pathD}
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
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
						fill="currentColor"
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
		{
			icon: "search",
			label: t("searchProjects"),
			shortcut: "⌘K",
			active: true,
		},
		{ icon: "fork_right", label: t("createBranch"), shortcut: "⌘B" },
		{ icon: "terminal", label: t("runCommand"), shortcut: "⌘⇧P" },
	];

	return (
		<UiCard className="h-full w-full min-w-0">
			<div
				className="flex items-center gap-2.5 border-b px-3.5 py-2.5"
				style={{ borderColor: "var(--theme-outline-variant)" }}
			>
				<span className="symbol" style={{ fontSize: 16 }} aria-hidden>
					search
				</span>
				<span className="text-[12px] text-muted-foreground">
					{t("placeholder")}
				</span>
				<kbd className="code-chip ml-auto px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">
					⌘K
				</kbd>
			</div>
			<div className="p-1.5">
				{items.map(({ icon, label, shortcut, active }, index) => (
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
						className={`flex items-center gap-2.5 rounded-full px-2.5 py-2 ${
							active
								? "bg-muted font-medium text-foreground"
								: "text-muted-foreground"
						}`}
					>
						<span className="symbol" style={{ fontSize: 16 }} aria-hidden>
							{icon}
						</span>
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
