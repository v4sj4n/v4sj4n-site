"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState, type ComponentType } from "react";
import {
	HrSoftwareMockup,
	MomentsMockup,
	OptimoLmsMockup,
	VasChatMockup,
} from "@/components/ProjectMockups";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { appleSpringSnappy } from "@/lib/motion";

const projectKeys = ["optimolms", "hrSoftware", "moments", "vaschat"] as const;

type ProjectKey = (typeof projectKeys)[number];

const projectAccents: Record<ProjectKey, string> = {
	optimolms: "oklch(56% 0.19 275)",
	hrSoftware: "oklch(62% 0.15 155)",
	moments: "oklch(62% 0.17 295)",
	vaschat: "oklch(68% 0.16 55)",
};

const projectTech: Record<ProjectKey, readonly string[]> = {
	optimolms: ["Next.js", "PostgreSQL", "OpenAI"],
	hrSoftware: ["React", "PostgreSQL", "Analytics"],
	moments: ["PostgreSQL", "Supabase", "Next.js"],
	vaschat: ["Next.js", "TypeScript", "OpenAI"],
};

const panelSurface = "bg-white/85 dark:bg-card";

const projectMockups: Record<
	ProjectKey,
	ComponentType<{ accent: string; title: string }>
> = {
	optimolms: OptimoLmsMockup,
	hrSoftware: HrSoftwareMockup,
	moments: MomentsMockup,
	vaschat: VasChatMockup,
};

function ProjectScreenshot({
	projectKey,
	title,
}: {
	projectKey: ProjectKey;
	title: string;
}) {
	const accent = projectAccents[projectKey];
	const Mockup = projectMockups[projectKey];

	return <Mockup accent={accent} title={title} />;
}

function ProjectTab({
	projectKey,
	isActive,
	onSelect,
}: {
	projectKey: ProjectKey;
	isActive: boolean;
	onSelect: () => void;
}) {
	const t = useTranslations("projects");
	const title = t(`items.${projectKey}.title`);
	const accent = projectAccents[projectKey];

	return (
		<button
			type="button"
			role="tab"
			id={`tab-${projectKey}`}
			aria-selected={isActive}
			aria-controls={`panel-${projectKey}`}
			onClick={onSelect}
			className={`group relative flex max-w-[10.5rem] min-w-[6.75rem] shrink-0 items-center gap-1.5 rounded-lg border-x border-t px-2.5 py-1.5 text-[0.8125rem] transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.98] sm:max-w-[11.5rem] sm:min-w-[7.5rem] sm:px-3 sm:py-2 ${
				isActive
					? "z-20 -mb-px border-border/70 bg-muted/70 font-semibold text-foreground shadow-[0_-1px_0_0_var(--muted),0_2px_4px_-2px_rgba(0,0,0,0.14)] dark:shadow-[0_-1px_0_0_var(--muted),0_2px_5px_-2px_rgba(0,0,0,0.45)]"
					: "z-10 border-transparent bg-black/[0.02] font-normal text-muted-foreground/75 hover:bg-black/[0.04] hover:text-foreground/80 dark:bg-white/[0.02] dark:text-muted-foreground/70 dark:hover:bg-white/[0.05] dark:hover:text-foreground/80"
			}`}
		>
			<span
				className="h-3 w-[2px] shrink-0 rounded-full opacity-90"
				style={{ background: accent }}
				aria-hidden
			/>
			<span className="min-w-0 flex-1 truncate text-left tracking-[-0.01em]">
				{title}
			</span>
			{isActive ? (
				<span
					className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-muted/45"
					aria-hidden
				/>
			) : null}
		</button>
	);
}

function WindowControls() {
	return (
		<div
			className="flex shrink-0 items-center gap-1.5 self-center pb-0.5 sm:gap-[5px]"
			aria-hidden
		>
			<span className="size-2.5 rounded-full bg-[#FF5F57] sm:size-[11px]" />
			<span className="size-2.5 rounded-full bg-[#FEBC2E] sm:size-[11px]" />
			<span className="size-2.5 rounded-full bg-[#28C840] sm:size-[11px]" />
		</div>
	);
}

function ProjectPanel({ projectKey }: { projectKey: ProjectKey }) {
	const t = useTranslations("projects");
	const title = t(`items.${projectKey}.title`);
	const description = t(`items.${projectKey}.description`);
	const tech = projectTech[projectKey];

	return (
		<motion.div
			key={projectKey}
			role="tabpanel"
			id={`panel-${projectKey}`}
			aria-labelledby={`tab-${projectKey}`}
			initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
			animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
			transition={appleSpringSnappy}
			className="space-y-3 sm:space-y-4 md:space-y-5"
		>
			<ProjectScreenshot projectKey={projectKey} title={title} />

			<div className="space-y-3 px-4 pb-5 sm:space-y-4 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
				<h3 className="text-xl font-semibold tracking-[-0.02em] sm:text-2xl md:text-3xl">
					{title}
				</h3>
				<p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem] md:text-base">
					{description}
				</p>

				<div className="flex flex-wrap items-center gap-2 pt-1">
					{tech.map((item) => (
						<span
							key={item}
							className="inline-flex items-center rounded-full border border-border/50 bg-muted/35 px-2.5 py-1 font-mono text-[10px] tracking-wide text-muted-foreground sm:text-[11px]"
						>
							{item}
						</span>
					))}
				</div>
			</div>
		</motion.div>
	);
}

export function ProjectsSection() {
	const t = useTranslations("projects");
	const [activeKey, setActiveKey] = useState<ProjectKey>("optimolms");

	return (
		<section id="projects" className="pb-32 pt-12 md:pb-40 md:pt-16">
			<div className="mx-auto max-w-6xl px-6 md:px-8">
				<div className="mb-12 md:mb-16">
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

				<Reveal delay={0.12}>
					<div
						className={`group/panel overflow-hidden rounded-2xl border border-black/10 transition-[border-color,transform] duration-300 hover:border-black/15 dark:border-border/45 dark:hover:border-border/50 ${panelSurface}`}
					>
						<div
							role="tablist"
							aria-label={t("label")}
							className="flex items-end gap-2.5 border-b border-border/35 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3"
						>
							<WindowControls />
							<div className="flex min-w-0 flex-1 items-end gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-1 [&::-webkit-scrollbar]:hidden">
								{projectKeys.map((key) => (
									<ProjectTab
										key={key}
										projectKey={key}
										isActive={activeKey === key}
										onSelect={() => setActiveKey(key)}
									/>
								))}
							</div>
						</div>

						<div>
							<AnimatePresence mode="wait" initial={false}>
								<ProjectPanel key={activeKey} projectKey={activeKey} />
							</AnimatePresence>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
