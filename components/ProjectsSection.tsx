"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { type ComponentType, type KeyboardEvent, useState } from "react";
import {
	HrSoftwareMockup,
	MomentsMockup,
	OptimoLmsMockup,
	VasChatMockup,
} from "@/components/ProjectMockups";
import { Reveal } from "@/components/Reveal";
import { appleSpringSnappy } from "@/lib/motion";

const projectKeys = ["optimolms", "hrSoftware", "moments", "vaschat"] as const;

type ProjectKey = (typeof projectKeys)[number];

const projectAccents: Record<ProjectKey, string> = {
	optimolms: "#1a73e8",
	hrSoftware: "#1a73e8",
	moments: "#1a73e8",
	vaschat: "#1a73e8",
};

const projectTech: Record<ProjectKey, readonly string[]> = {
	optimolms: ["Next.js", "PostgreSQL", "OpenAI"],
	hrSoftware: ["React", "PostgreSQL", "Analytics"],
	moments: ["PostgreSQL", "Supabase", "Next.js"],
	vaschat: ["Next.js", "TypeScript", "OpenAI"],
};

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

	return (
		<button
			type="button"
			role="tab"
			id={`tab-${projectKey}`}
			aria-selected={isActive}
			aria-controls={`panel-${projectKey}`}
			tabIndex={isActive ? 0 : -1}
			onClick={onSelect}
			className={`group relative flex max-w-[10.5rem] min-w-[6.75rem] shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[0.8125rem] transition-all duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a73e8] sm:max-w-[11.5rem] sm:min-w-[7.5rem] sm:px-3 sm:py-2 ${
				isActive
					? "z-20 bg-[#1a73e8] font-medium text-white"
					: "z-10 bg-transparent font-normal text-[#5f6368] hover:bg-[#f1f3f4] hover:text-[#202124] dark:text-[#9aa0a6] dark:hover:bg-white/10 dark:hover:text-white"
			}`}
		>
			<span
				className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${
					isActive
						? "bg-white/20 text-white"
						: "bg-[#f1f3f4] text-[#202124] dark:bg-white/10 dark:text-white"
				}`}
				aria-hidden
			>
				{title.charAt(0).toUpperCase()}
			</span>
			<span className="min-w-0 flex-1 text-left leading-snug break-words tracking-[-0.01em]">
				{title}
			</span>
		</button>
	);
}

function WindowControls() {
	return (
		<div
			className="flex shrink-0 items-center gap-1.5 self-center pb-0.5 sm:gap-[5px]"
			aria-hidden
		>
			<span className="size-2.5 rounded-full bg-[#ea4335] sm:size-[11px]" />
			<span className="size-2.5 rounded-full bg-[#fbbc04] sm:size-[11px]" />
			<span className="size-2.5 rounded-full bg-[#34a853] sm:size-[11px]" />
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
			tabIndex={0}
			initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
			animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
			transition={appleSpringSnappy}
			className="space-y-6 sm:space-y-8 md:space-y-10"
		>
			<div className="hidden px-4 pt-4 sm:px-6 sm:pt-6 md:block md:px-8 md:pt-8">
				<ProjectScreenshot projectKey={projectKey} title={title} />
			</div>

			<div className="space-y-3 px-4 py-5 sm:space-y-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
				<h3 className="agy-head text-xl sm:text-2xl md:text-3xl">{title}</h3>
				<p className="body-copy text-pretty text-sm leading-relaxed sm:text-[0.9375rem] md:text-base">
					{description}
				</p>

				<div className="flex flex-wrap items-center gap-2 pt-1">
					{tech.map((item) => (
						<span
							key={item}
							className="code-chip inline-flex items-center px-2.5 py-1.5 font-mono text-[10px] tracking-wide text-muted-foreground sm:text-[11px]"
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

	const handleTabListKeyDown = (e: KeyboardEvent) => {
		const currentIndex = projectKeys.indexOf(activeKey);
		let nextIndex: number | null = null;
		if (e.key === "ArrowRight")
			nextIndex = (currentIndex + 1) % projectKeys.length;
		else if (e.key === "ArrowLeft")
			nextIndex = (currentIndex - 1 + projectKeys.length) % projectKeys.length;
		else if (e.key === "Home") nextIndex = 0;
		else if (e.key === "End") nextIndex = projectKeys.length - 1;
		if (nextIndex === null) return;
		e.preventDefault();
		const nextKey = projectKeys[nextIndex];
		setActiveKey(nextKey);
		document.getElementById(`tab-${nextKey}`)?.focus();
	};

	return (
		<section id="projects" className="py-16 md:py-24">
			<div className="section-container">
				<div className="mb-12 md:mb-16">
					<Reveal delay={0.08}>
						<p className="g-eyebrow">{t("label")}</p>
						<h2 className="agy-head mt-4 max-w-2xl text-4xl md:text-5xl lg:text-6xl">
							{t("title")}{" "}
							<span className="text-muted-foreground">{t("titleAccent")}</span>
						</h2>
					</Reveal>
				</div>

				<Reveal delay={0.12}>
					<div className="feature-media group/panel overflow-hidden border border-border bg-card transition-all duration-150">
						<div
							role="tablist"
							aria-label={t("label")}
							aria-orientation="horizontal"
							onKeyDown={handleTabListKeyDown}
							className="flex items-end gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3"
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
