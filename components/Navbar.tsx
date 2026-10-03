"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LanguageDropdown } from "@/components/LanguageDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "@/i18n/navigation";
import { appleEase } from "@/lib/motion";

const navLinks = [
	{ href: "#projects", key: "projects" as const },
	{ href: "#contact", key: "contact" as const },
];

export function Navbar() {
	const t = useTranslations("nav");
	const [active, setActive] = useState<string>("home");
	const [hidden, setHidden] = useState(false);
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, "change", (y) => {
		const prev = scrollY.getPrevious() ?? 0;
		if (y > prev && y > 120) setHidden(true);
		else if (y < prev) setHidden(false);
	});

	useEffect(() => {
		const ids = ["home", ...navLinks.map(({ key }) => key)];
		const sections = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);
		if (sections.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const id = entry.target.id;
					if (id === "home") continue;
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

	// Hero zone owns the clean URL: anywhere above the projects section,
	// drop the hash so scrolling/clicking back to the top never leaves
	// a stale #projects behind.
	useEffect(() => {
		const clearHashInHeroZone = () => {
			const projects = document.getElementById("projects");
			if (!projects) return;
			const projectsTop = projects.getBoundingClientRect().top + window.scrollY;
			if (window.scrollY < projectsTop - window.innerHeight * 0.5) {
				setActive((prev) => {
					if (prev === "home") return prev;
					if (window.location.hash !== "") {
						history.replaceState(
							null,
							"",
							window.location.pathname + window.location.search,
						);
					}
					return "home";
				});
			}
		};
		clearHashInHeroZone();
		window.addEventListener("scroll", clearHashInHeroZone, {
			passive: true,
		});
		return () => window.removeEventListener("scroll", clearHashInHeroZone);
	}, []);

	const handleLogoClick = () => {
		if (window.location.hash !== "") {
			history.replaceState(
				null,
				"",
				window.location.pathname + window.location.search,
			);
		}
		setActive("home");
	};

	return (
		<>
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
			>
				Skip to content
			</a>
			<motion.header
				initial={{ y: -16, opacity: 0 }}
				animate={{ y: hidden ? "-110%" : 0, opacity: 1 }}
				transition={{ duration: 0.5, ease: appleEase }}
				className="site-header"
			>
				<nav
					aria-label="Primary"
					className="section-container flex min-h-16 items-center justify-between"
					style={{ minHeight: "var(--nav-height)" }}
				>
					<Link
						href="/"
						aria-label="Home"
						onClick={handleLogoClick}
						className="group shrink-0 rounded-full px-3 py-1.5 transition-all duration-150 hover:bg-[rgba(32,33,36,0.08)] dark:hover:bg-white/10"
					>
						<span
							className="whitespace-nowrap text-[15px] text-foreground"
							style={{
								fontWeight: 500,
								letterSpacing: "-0.02em",
							}}
						>
							v4sj4n
							<span aria-hidden className="text-muted-foreground">
								.
							</span>
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
										className={`nav-button nav-link ${
											isActive
												? "text-foreground"
												: "text-muted-foreground hover:text-foreground"
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
				</nav>
			</motion.header>
		</>
	);
}
