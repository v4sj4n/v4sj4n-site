"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

type MockupProps = {
	accent: string;
	title: string;
};

function BrowserFrame({
	accent,
	children,
}: MockupProps & { children: ReactNode }) {
	return (
		<div
			className="relative aspect-[3/2] w-full overflow-hidden rounded-b-lg rounded-t-none bg-card/95 outline outline-1 outline-black/10 sm:aspect-[16/9] sm:rounded-b-xl sm:rounded-t-none lg:aspect-[21/9] dark:bg-card dark:outline-white/10"
			style={{
				background: `linear-gradient(140deg, color-mix(in oklch, ${accent} 9%, var(--mockup-mix-base)) 0%, color-mix(in oklch, ${accent} 4%, var(--mockup-mix-base)) 46%, color-mix(in oklch, ${accent} 8%, var(--mockup-mix-base)) 100%)`,
			}}
		>
			<div className="absolute inset-0 overflow-hidden">{children}</div>
		</div>
	);
}

function Skeleton({
	className = "",
	accent,
}: {
	className?: string;
	accent?: string;
}) {
	return (
		<div
			className={`rounded-md bg-black/[0.045] ring-1 ring-black/10 dark:bg-muted/45 dark:ring-white/10 ${className}`}
			style={
				accent
					? {
							background: `color-mix(in oklch, ${accent} 16%, var(--mockup-mix-base))`,
						}
					: undefined
			}
		/>
	);
}

export function OptimoLmsMockup({ accent, title }: MockupProps) {
	const t = useTranslations("projects.mockups.optimolms");
	const courses = t.raw("courses") as string[];

	return (
		<BrowserFrame accent={accent} title={title}>
			<div className="flex h-full">
				<aside className="flex w-[24%] shrink-0 flex-col border-r border-black/5 p-2 dark:border-white/5 sm:w-[26%] sm:p-3 md:w-[28%] md:p-3.5">
					<Skeleton
						accent={accent}
						className="mb-1.5 h-3 w-14 sm:mb-2.5 sm:h-3.5 sm:w-20"
					/>
					<div className="space-y-1 sm:space-y-2">
						{courses.map((course, i) => (
							<div
								key={course}
								className={`flex items-center gap-1.5 rounded-md px-1.5 py-1.5 sm:gap-2 sm:px-2.5 sm:py-2 ${
									i === 0
										? "bg-white/85 shadow-[0_1px_2px_rgba(0,0,0,0.08)] dark:bg-muted/50"
										: "opacity-70"
								}`}
							>
								<Skeleton
									accent={accent}
									className="size-2.5 shrink-0 rounded-sm sm:size-3"
								/>
								<span className="truncate text-[9px] font-medium leading-none sm:text-[11px]">
									{course}
								</span>
							</div>
						))}
					</div>
				</aside>

				<main className="flex min-w-0 flex-1 flex-col p-2 sm:p-3 md:p-3.5">
					<div className="mb-1.5 flex items-center justify-between sm:mb-2.5">
						<Skeleton accent={accent} className="h-3 w-20 sm:h-3.5 sm:w-28" />
						<div
							className="rounded-full px-1.5 py-0.5 text-[8px] font-medium sm:px-2.5 sm:py-1 sm:text-[10px]"
							style={{
								background: `color-mix(in oklch, ${accent} 20%, transparent)`,
								color: accent,
							}}
						>
							{t("aiSummary")}
						</div>
					</div>

					<div className="mb-1.5 flex-1 space-y-1.5 rounded-lg border border-black/10 bg-white/65 p-2 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-card/35 sm:mb-2.5 sm:space-y-2 sm:p-3">
						<Skeleton className="h-2 w-full sm:h-2.5" />
						<Skeleton className="h-2 w-[92%] sm:h-2.5" />
						<Skeleton className="h-2 w-[78%] sm:h-2.5" />
						<div className="mt-1 rounded-md border border-dashed border-black/10 p-1.5 dark:border-white/10 sm:mt-2 sm:p-2.5">
							<Skeleton
								accent={accent}
								className="mb-1 h-2 w-16 sm:mb-1.5 sm:h-2.5 sm:w-24"
							/>
							<Skeleton className="h-1.5 w-full sm:h-2" />
							<Skeleton className="mt-1 h-1.5 w-[85%] sm:mt-1.5 sm:h-2" />
						</div>
					</div>

					<div className="flex items-center gap-1.5 rounded-lg border border-black/10 bg-white/80 px-2 py-1.5 dark:border-white/10 dark:bg-card/40 sm:gap-2 sm:px-3 sm:py-2">
						<div
							className="size-4 shrink-0 rounded-full sm:size-5"
							style={{ background: accent }}
						/>
						<span className="truncate text-[8px] text-muted-foreground sm:text-[10px]">
							{t("askPlaceholder")}
						</span>
					</div>
				</main>
			</div>
		</BrowserFrame>
	);
}

export function HrSoftwareMockup({ accent, title }: MockupProps) {
	const t = useTranslations("projects.mockups.hrSoftware");
	const notifications = t.raw("notifications") as string[];

	const stats = [
		{ label: t("employees"), value: "248" },
		{ label: t("openRoles"), value: "12" },
		{ label: t("attendance"), value: "96%" },
	];

	const columns = [
		{ label: t("applied"), count: 1 },
		{ label: t("interview"), count: 2 },
		{ label: t("offer"), count: 1 },
	];

	return (
		<BrowserFrame accent={accent} title={title}>
			<div className="flex h-full flex-col p-2 sm:p-3 md:p-3.5">
				<div className="mb-1.5 grid grid-cols-3 gap-1 sm:mb-2.5 sm:gap-2">
					{stats.map((stat) => (
						<div
							key={stat.label}
							className="rounded-lg border border-black/10 bg-white/90 p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:border-white/5 dark:bg-card/80 sm:p-2.5"
						>
							<p className="truncate text-[8px] text-muted-foreground sm:text-[10px]">
								{stat.label}
							</p>
							<p
								className="text-[11px] font-semibold tabular-nums sm:text-[13px]"
								style={{ color: accent }}
							>
								{stat.value}
							</p>
						</div>
					))}
				</div>

				<div className="flex min-h-0 flex-1 gap-1.5 sm:gap-2.5">
					<div className="flex min-w-0 flex-1 flex-col">
						<Skeleton
							accent={accent}
							className="mb-1.5 h-2.5 w-16 sm:mb-2 sm:h-3 sm:w-24"
						/>
						<div className="grid flex-1 grid-cols-3 gap-1 sm:gap-2">
							{columns.map((col) => (
								<div
									key={col.label}
									className="flex flex-col rounded-lg border border-black/10 bg-white/55 p-1.5 dark:border-white/5 dark:bg-muted/30 sm:p-2"
								>
									<p className="mb-1 truncate text-[8px] font-medium text-muted-foreground sm:mb-1.5 sm:text-[10px]">
										{col.label}
									</p>
									{Array.from({ length: col.count }).map((_, i) => (
										<div
											key={i}
											className="mb-1 rounded border border-black/10 bg-white/90 p-1.5 dark:border-white/5 dark:bg-card/90 sm:mb-1.5 sm:p-2"
										>
											<Skeleton
												accent={accent}
												className="mb-1 h-2 w-3/4 sm:mb-1.5 sm:h-2.5"
											/>
											<Skeleton className="h-1.5 w-1/2 sm:h-2" />
										</div>
									))}
								</div>
							))}
						</div>
					</div>

					<aside className="hidden w-[30%] shrink-0 rounded-lg border border-black/10 bg-white/90 p-2 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:border-white/5 dark:bg-card/80 sm:block md:w-[32%] md:p-2.5">
						<Skeleton
							accent={accent}
							className="mb-2 h-2.5 w-16 sm:mb-2.5 sm:h-3 sm:w-20"
						/>
						<div className="space-y-2 sm:space-y-2.5">
							{notifications.map((item) => (
								<div key={item} className="flex items-start gap-1.5 sm:gap-2">
									<div
										className="mt-0.5 size-1.5 shrink-0 rounded-full sm:size-2"
										style={{ background: accent }}
									/>
									<span className="text-[8px] leading-tight text-muted-foreground sm:text-[10px]">
										{item}
									</span>
								</div>
							))}
						</div>
					</aside>
				</div>
			</div>
		</BrowserFrame>
	);
}

export function MomentsMockup({ accent, title }: MockupProps) {
	const t = useTranslations("projects.mockups.moments");
	const groups = t.raw("groups") as string[];

	return (
		<BrowserFrame accent={accent} title={title}>
			<div className="flex h-full">
				<aside className="flex w-[22%] shrink-0 flex-col border-r border-black/10 bg-white/55 p-2 dark:border-white/5 dark:bg-white/[0.02] sm:w-[24%] sm:p-3 md:w-[26%] md:p-3.5">
					<Skeleton
						accent={accent}
						className="mb-1.5 h-3 w-12 sm:mb-2.5 sm:h-3.5 sm:w-16"
					/>
					{groups.map((group, i) => (
						<div
							key={group}
							className={`mb-1 flex items-center gap-1.5 rounded-md px-1.5 py-1.5 sm:mb-1.5 sm:gap-2 sm:px-2.5 sm:py-2 ${
								i === 0
									? "bg-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.08)] dark:bg-muted/50"
									: "opacity-65"
							}`}
						>
							<div
								className="flex size-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white sm:size-5 sm:text-[9px]"
								style={{ background: accent }}
							>
								{group[0]}
							</div>
							<span className="truncate text-[9px] font-medium sm:text-[11px]">
								{group}
							</span>
						</div>
					))}
				</aside>

				<main className="flex min-w-0 flex-1 flex-col p-2 sm:p-3 md:p-3.5">
					<div className="mb-1.5 flex items-center justify-between sm:mb-2.5">
						<Skeleton accent={accent} className="h-3 w-16 sm:h-3.5 sm:w-24" />
						<span className="text-[8px] text-muted-foreground sm:text-[10px]">
							{t("memoryCount", { count: 12 })}
						</span>
					</div>

					<div className="mb-1.5 grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-1 sm:mb-2.5 sm:gap-2">
						{[0, 1, 2, 3, 4].map((i) => (
							<div
								key={i}
								className={`overflow-hidden rounded-md border border-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:border-white/5 dark:shadow-none ${
									i === 0 ? "col-span-2 row-span-2" : ""
								}`}
								style={{
									background: `color-mix(in oklch, ${accent} ${10 + i * 2}%, var(--mockup-mix-base))`,
								}}
							>
								{i === 0 && (
									<div className="flex h-full flex-col justify-end p-1.5 sm:p-2.5">
										<Skeleton className="mb-1 h-2 w-14 bg-white/30 sm:mb-1.5 sm:h-2.5 sm:w-20" />
										<Skeleton className="h-1.5 w-20 bg-white/20 sm:h-2 sm:w-28" />
									</div>
								)}
							</div>
						))}
					</div>

					<div className="flex items-center gap-1.5 rounded-lg border border-black/10 bg-white/85 px-2 py-1.5 dark:border-white/5 dark:bg-card/90 sm:gap-2 sm:px-3 sm:py-2">
						<Skeleton className="size-3 rounded-full sm:size-4" />
						<Skeleton className="h-2 flex-1 sm:h-2.5" />
					</div>
				</main>
			</div>
		</BrowserFrame>
	);
}

export function VasChatMockup({ accent, title }: MockupProps) {
	const t = useTranslations("projects.mockups.vaschat");
	const chats = t.raw("chats") as string[];

	return (
		<BrowserFrame accent={accent} title={title}>
			<div className="flex h-full">
				<aside className="flex w-[26%] shrink-0 flex-col border-r border-black/10 bg-white/60 p-2 dark:border-white/5 dark:bg-muted/30 sm:w-[28%] sm:p-3 md:w-[30%]">
					<div className="mb-1.5 flex items-center justify-between sm:mb-2.5">
						<Skeleton accent={accent} className="h-3 w-12 sm:h-3.5 sm:w-16" />
						<span
							className="rounded px-1 py-0.5 text-[8px] font-medium sm:px-1.5 sm:text-[9px]"
							style={{
								background: `color-mix(in oklch, ${accent} 18%, transparent)`,
								color: accent,
							}}
						>
							{t("api")}
						</span>
					</div>
					{chats.map((chat, i) => (
						<div
							key={chat}
							className={`mb-1 rounded-md px-1.5 py-1.5 sm:mb-1.5 sm:px-2.5 sm:py-2 ${
								i === 0
									? "bg-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.08)] dark:bg-muted/50"
									: "opacity-65"
							}`}
						>
							<p className="truncate text-[9px] font-medium sm:text-[11px]">
								{chat}
							</p>
							<p className="truncate text-[8px] text-muted-foreground sm:text-[10px]">
								{i === 0 ? t("claudeModel") : t("gptModel")}
							</p>
						</div>
					))}
				</aside>

				<main className="flex min-w-0 flex-1 flex-col p-2 sm:p-3 md:p-3.5">
					<div className="mb-1.5 flex items-center gap-1.5 sm:mb-2.5 sm:gap-2">
						<div
							className="truncate rounded-md border px-1.5 py-0.5 text-[8px] font-medium sm:px-2 sm:py-1 sm:text-[10px]"
							style={{
								borderColor: `color-mix(in oklch, ${accent} 35%, transparent)`,
								color: accent,
							}}
						>
							{t("claudeModel")} ▾
						</div>
						<Skeleton className="ml-auto h-2 w-10 sm:h-2.5 sm:w-14" />
					</div>

					<div className="flex min-h-0 flex-1 flex-col justify-end space-y-1.5 sm:space-y-2.5">
						<div className="self-end max-w-[75%] rounded-lg rounded-br-sm border border-black/10 bg-white/90 px-2 py-1.5 dark:border-white/10 dark:bg-muted/50 sm:px-3 sm:py-2">
							<Skeleton className="h-1.5 w-24 sm:h-2 sm:w-32" />
							<Skeleton className="mt-1 h-1.5 w-16 sm:mt-1.5 sm:h-2 sm:w-24" />
						</div>
						<div
							className="max-w-[80%] rounded-lg rounded-bl-sm border border-black/10 px-2 py-1.5 dark:border-white/5 sm:px-3 sm:py-2"
							style={{
								background: `color-mix(in oklch, ${accent} 8%, var(--mockup-mix-base))`,
							}}
						>
							<Skeleton className="h-1.5 w-full sm:h-2" />
							<Skeleton className="mt-1 h-1.5 w-[90%] sm:mt-1.5 sm:h-2" />
							<Skeleton className="mt-1 h-1.5 w-[70%] sm:mt-1.5 sm:h-2" />
						</div>
					</div>

					<div className="mt-1.5 flex items-center gap-1.5 rounded-lg border border-black/10 bg-white/90 px-2 py-1.5 dark:border-white/5 dark:bg-card/90 sm:mt-2.5 sm:gap-2 sm:px-3 sm:py-2">
						<Skeleton className="h-2 flex-1 sm:h-2.5" />
						<div
							className="size-4 shrink-0 rounded-md sm:size-5"
							style={{ background: accent }}
						/>
					</div>
				</main>
			</div>
		</BrowserFrame>
	);
}
