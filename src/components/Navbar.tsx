import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const navItems = ["Home", "Projects", "Contact"];

export default function Navbar() {
	const { theme, toggleTheme, mounted } = useTheme();
	const [scrolled, setScrolled] = useState(false);
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, "change", (latest) => {
		setScrolled(latest > 50);
	});

	const isLight = mounted ? theme === "light" : false;

	return (
		<motion.header
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
			className={`fixed z-50 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
				scrolled
					? `top-4 left-4 right-4 md:left-0 md:right-0 md:mx-auto max-w-2xl rounded-2xl backdrop-blur-2xl backdrop-saturate-150 border shadow-lg ${
							isLight
								? "bg-white/70 border-neutral-200/50 shadow-black/3"
								: "bg-neutral-950/70 border-neutral-800/50 shadow-black/20"
						}`
					: "top-0 left-0 right-0 w-full bg-transparent border-b border-transparent"
			}`}
		>
			<div
				className={`mx-auto flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${scrolled ? "px-5 h-12" : "px-6 md:px-8 h-14 md:h-16 max-w-screen-xl"}`}
			>
				{/* BRAND */}
				<motion.a
					href="#home"
					className="group flex items-center gap-0 overflow-hidden"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					<h1 className="text-lg md:text-xl font-semibold tracking-tight leading-none transition-colors duration-300 group-hover:text-primary flex items-baseline">
						{/* The "v" is always visible */}
						<span className="inline-block">v</span>

						{/* The remaining letters morph out when scrolled */}
						<span
							className="inline-flex overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
							style={{
								maxWidth: scrolled ? "0px" : "120px",
								opacity: scrolled ? 0 : 1,
							}}
						>
							<span className="whitespace-nowrap">asjan</span>
						</span>

						{/* The dot */}
						<span className="text-primary group-hover:scale-125 inline-block transition-transform duration-300">
							.
						</span>
					</h1>
				</motion.a>

				{/* NAV LINKS - Desktop */}
				<nav className="hidden md:flex items-center gap-1">
					{navItems.map((item) => (
						<a
							key={item}
							href={`#${item.toLowerCase()}`}
							className={`relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800/50 ${
								isLight
									? "text-neutral-600 hover:text-neutral-950"
									: "text-neutral-400 hover:text-white"
							}`}
						>
							{item}
						</a>
					))}
				</nav>

				{/* RIGHT SIDE */}
				<div className="flex items-center gap-3">
					{/* Theme Toggle */}
					<motion.button
						onClick={toggleTheme}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={`p-2.5 rounded-full transition-all duration-300 ${
							isLight
								? "hover:bg-neutral-100 text-neutral-500 hover:text-neutral-950"
								: "hover:bg-neutral-800 text-neutral-400 hover:text-white"
						}`}
						aria-label="Toggle Theme"
					>
						{isLight ? <Moon size={18} /> : <Sun size={18} />}
					</motion.button>
				</div>
			</div>
		</motion.header>
	);
}
