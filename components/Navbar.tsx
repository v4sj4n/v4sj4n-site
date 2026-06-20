"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "@/i18n/navigation";
import { appleEase } from "@/lib/motion";

/** Scroll distance over which the pill morph completes */
const SCROLL_RANGE = 96;

const navLinks = [
	{ href: "#home", key: "home" as const },
	{ href: "#projects", key: "projects" as const },
	{ href: "#contact", key: "contact" as const },
];

const spring = { stiffness: 380, damping: 42, mass: 0.75 };

export function Navbar() {
	const t = useTranslations("nav");
	const { scrollY } = useScroll();

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
	const navBlur = useTransform(morph, [0, 1], [0, 20]);
	const shadowAlpha = useTransform(morph, [0, 1], [0, 0.1]);

	const navBg = useTransform(
		navBgOpacity,
		(o) => `color-mix(in oklch, var(--background) ${o * 100}%, transparent)`,
	);
	const navBackdrop = useTransform(navBlur, (b) =>
		b > 0.5 ? `blur(${b}px) saturate(1.5)` : "none",
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
				className="mx-auto flex w-full min-h-14 items-center justify-between"
			>
				<Link href="/" aria-label="Home" className="group">
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

				<div className="flex items-center gap-1 sm:gap-2">
					<ul className="hidden items-center gap-0.5 md:flex">
						{navLinks.map(({ href, key }) => (
							<li key={key}>
								<a
									href={href}
									className="rounded-full px-4 py-2 text-[13px] font-medium tracking-wide text-muted-foreground transition-colors duration-300 hover:bg-muted/80 hover:text-foreground"
								>
									{t(key)}
								</a>
							</li>
						))}
					</ul>
					<ThemeToggle />
				</div>
			</motion.nav>
		</motion.header>
	);
}
