"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LanguageDropdown } from "@/components/LanguageDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "@/i18n/navigation";
import { appleEase } from "@/lib/motion";

/** Scroll distance over which the pill morph completes */
const SCROLL_RANGE = 96;

const navLinks = [
	{ href: "#projects", key: "projects" as const },
	{ href: "#contact", key: "contact" as const },
];

const spring = { stiffness: 380, damping: 42, mass: 0.75 };

export function Navbar() {
	const t = useTranslations("nav");
	const { scrollY } = useScroll();
	const [active, setActive] = useState<string>("home");

	useEffect(() => {
		const ids = navLinks.map(({ key }) => key);
		const sections = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);
		if (sections.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const id = entry.target.id;
					setActive((prev) => {
						if (prev === id) return prev;
						if (window.location.hash !== `#${id}`) {
							history.replaceState(null, "", `#${id}`);
						}
						return id;
					});
				}
			},
			{ rootMargin: "-40% 0px -55% 0px", threshold: 0 },
		);

		for (const section of sections) observer.observe(section);
		return () => observer.disconnect();
	}, []);

	const progress = useTransform(scrollY, [0, SCROLL_RANGE], [0, 1], {
		clamp: true,
	});
	const morph = useSpring(progress, spring);

	const headerPadTop = useTransform(morph, [0, 1], [0, 16]);
	const headerPadX = useTransform(morph, [0, 1], [0, 16]);
	const navMaxWidth = useTransform(morph, [0, 1], [1152, 672]);
	const navRadius = useTransform(morph, [0, 1], [0, 16]);
	const navPadX = useTransform(morph, [0, 1], [24, 20]);
	const navPadY = useTransform(morph, [0, 1], [0, 4]);
	const navBgOpacity = useTransform(morph, [0, 1], [0, 0.7]);
	const navBlur = useTransform(morph, [0, 1], [0, 12]);
	const shadowAlpha = useTransform(morph, [0, 1], [0, 0.1]);

	const navBg = useTransform(
		navBgOpacity,
		(o) => `color-mix(in oklch, var(--background) ${o * 100}%, transparent)`,
	);
	const navBackdrop = useTransform(navBlur, (b) =>
		b > 0.5 ? `blur(${b}px) saturate(1.2)` : "none",
	);
	const navShadow = useTransform(shadowAlpha, (a) =>
		a < 0.01 ? "none" : `0 8px 32px oklch(0 0 0 / ${a})`,
	);

	/* Trailing "asjan" collapses as a single unit */
	const tailWidth = useTransform(morph, [0, 0.8], [100, 0]);
	const tailWidthStr = useTransform(tailWidth, (w) => `${w}%`);
	const tailOpacity = useTransform(morph, [0, 0.5], [1, 0]);

	/* Dot fades in as tail collapses */
	const dotOpacity = useTransform(morph, [0.3, 0.7], [0, 1]);

	return (
		<>
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
			>
				Skip to content
			</a>
			<motion.header
				initial={{ y: -16, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, ease: appleEase }}
				style={{
					paddingTop: headerPadTop,
					paddingLeft: headerPadX,
					paddingRight: headerPadX,
				}}
				className="fixed inset-x-0 top-0 z-50"
			>
				<motion.nav
					style={{
						maxWidth: navMaxWidth,
						borderRadius: navRadius,
						paddingLeft: navPadX,
						paddingRight: navPadX,
						paddingTop: navPadY,
						paddingBottom: navPadY,
						backgroundColor: navBg,
						backdropFilter: navBackdrop,
						WebkitBackdropFilter: navBackdrop,
						boxShadow: navShadow,
					}}
					className="relative mx-auto flex min-h-14 w-full items-center justify-between"
				>
					<Link href="/" aria-label="Home" className="group shrink-0">
						<span className="text-[15px] font-semibold tracking-normal text-foreground whitespace-nowrap">
							v
							<motion.span
								style={{
									width: tailWidthStr,
									opacity: tailOpacity,
									clipPath: "inset(0)",
								}}
								className="inline-block whitespace-nowrap"
							>
								asjan
							</motion.span>
							<motion.span style={{ opacity: dotOpacity }} className="inline">
								.
							</motion.span>
						</span>
					</Link>

					{/* Middle: Nav links */}
					<ul className="hidden items-center gap-0.5 md:flex md:absolute md:left-1/2 md:-translate-x-1/2">
						{navLinks.map(({ href, key }) => {
							const isActive = active === key;
							return (
								<li key={key}>
									<a
										href={href}
										aria-current={isActive ? "true" : undefined}
										className={`rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 hover:bg-muted/80 hover:text-foreground ${
											isActive
												? "bg-muted/80 text-foreground"
												: "text-muted-foreground"
										}`}
									>
										{t(key)}
									</a>
								</li>
							);
						})}
					</ul>

					{/* Right: Actions */}
					<div className="flex items-center gap-1 sm:gap-2 shrink-0">
						<LanguageDropdown />
						<ThemeToggle />
					</div>
				</motion.nav>
			</motion.header>
		</>
	);
}
