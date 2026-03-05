"use client";

import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { siteInfo } from "@/lib/info";

const ease = [0.32, 0.72, 0, 1] as const;

function ProjectCard({
	project,
	index,
}: {
	project: (typeof siteInfo.projects)[0];
	index: number;
}) {
	return (
		<motion.a
			href={project.href}
			target="_blank"
			rel="noopener noreferrer"
			initial={{ opacity: 0, y: 40 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.15 }}
			transition={{ duration: 0.7, ease, delay: index * 0.1 }}
			className="group block relative overflow-hidden rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900/50 p-8 md:p-10 transition-all duration-500 hover:border-primary/40 dark:hover:border-primary/40 hover:shadow-[0_0_0_1px_oklch(from_var(--primary)_l_c_h/0.2),0_8px_32px_oklch(from_var(--primary)_l_c_h/0.08)] hover:bg-primary/5"
		>
			{/* Project number */}
			<div className="flex items-start justify-between mb-8">
				<span className="text-[11px] font-mono text-neutral-300 dark:text-neutral-700 tracking-wider">
					0{index + 1}
				</span>
				<ArrowUpRightIcon
					size={20}
					className="text-neutral-300 dark:text-neutral-700 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
				/>
			</div>

			{/* Title */}
			<h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
				{project.title}
			</h3>

			{/* Description */}
			<p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base leading-relaxed mb-8 max-w-md">
				{project.description}
			</p>

			{/* Technologies */}
			<div className="flex flex-wrap gap-2">
				{project.technologies.map((tech) => (
					<span
						key={tech}
						className="px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase rounded-full bg-neutral-100 dark:bg-neutral-800/80 text-neutral-500 dark:text-neutral-400 transition-colors duration-300 group-hover:bg-primary/10 dark:group-hover:bg-primary/10 group-hover:text-primary dark:group-hover:text-primary"
					>
						{tech}
					</span>
				))}
			</div>

			{/* Hover gradient — green */}
			<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
		</motion.a>
	);
}

export default function ProjectsSection() {
	return (
		<section id="projects" className="py-32 md:py-40">
			<div className="max-w-screen-xl mx-auto px-6 md:px-8">
				{/* Section header */}
				<div className="mb-20 md:mb-28">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.6, ease }}
						className="mb-4"
					>
						<span className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
							<span className="w-6 h-px bg-neutral-300 dark:bg-neutral-700" />
							Selected Work
						</span>
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.8, ease }}
						className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]"
					>
						Projects that <br className="hidden md:block" />
						<span className="text-neutral-400 dark:text-neutral-600">
							speak for themselves.
						</span>
					</motion.h2>
				</div>

				{/* Project cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{siteInfo.projects.map((project, i) => (
						<ProjectCard key={project.title} project={project} index={i} />
					))}
				</div>
			</div>
		</section>
	);
}
