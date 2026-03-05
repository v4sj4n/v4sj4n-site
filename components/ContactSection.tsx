"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { siteInfo } from "@/lib/info";
import ContactForm from "./ContactForm";
import { useRef, type ElementType } from "react";

const ease = [0.32, 0.72, 0, 1] as const;

export default function ContactSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "start 0.2"],
	});

	const headingOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
	const headingY = useTransform(scrollYProgress, [0, 0.6], [60, 0]);

	return (
		<section ref={sectionRef} id="contact" className="py-32 md:py-40">
			<div className="max-w-screen-xl mx-auto px-6 md:px-8">
				{/* Section header */}
				<div className="mb-20 md:mb-24">
					<motion.div
						style={{ opacity: headingOpacity, y: headingY }}
						className="mb-4"
					>
						<span className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
							<span className="w-6 h-px bg-neutral-300 dark:bg-neutral-700" />
							Get in touch
						</span>
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.8, ease }}
						className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.2] pb-1"
					>
						Let&apos;s create <br className="hidden md:block" />
						<span className="text-neutral-400 dark:text-neutral-600">
							something great.
						</span>
					</motion.h2>
				</div>

				{/* Two-column layout */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
					{/* Left: Social links — reveal first */}
					<div>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.6, ease }}
							className="text-neutral-500 dark:text-neutral-400 text-base md:text-lg leading-relaxed mb-12"
						>
							I&apos;m currently accepting freelance projects and collaboration
							opportunities. Feel free to reach out through any channel below.
						</motion.p>

						{/* Social links — staggered progressive disclosure */}
						<div className="space-y-1">
							{siteInfo.contactLinks.map((link, i) => {
								const Icon = link.icon as ElementType;
								return (
									<motion.a
										key={link.title}
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true, amount: 0.3 }}
										transition={{
											duration: 0.5,
											ease,
											delay: i * 0.08,
										}}
										className="group flex items-center justify-between py-4 px-4 -mx-4 rounded-xl transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/40"
									>
										<div className="flex items-center gap-4">
											<Icon
												size={20}
												weight="regular"
												className="text-neutral-400 dark:text-neutral-500 group-hover:text-primary transition-colors duration-300"
											/>
											<div>
												<span className="text-sm font-medium block">
													{link.title}
												</span>
												<span className="text-xs text-neutral-400 dark:text-neutral-500">
													{link.description}
												</span>
											</div>
										</div>
										<ArrowUpRightIcon
											size={14}
											className="text-neutral-300 dark:text-neutral-700 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
										/>
									</motion.a>
								);
							})}
						</div>
					</div>

					{/* Right: Contact form — reveals after links */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.15 }}
						transition={{ duration: 0.8, ease, delay: 0.2 }}
					>
						<ContactForm />
					</motion.div>
				</div>
			</div>
		</section>
	);
}
