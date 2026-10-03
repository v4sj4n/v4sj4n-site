"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/hooks/useTheme";
import { appleEase } from "@/lib/motion";

const iconVariants = {
	initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
	animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
	exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
};

// Synced crossfade — both icons animate together, Google micro-timing.
const iconTransition = { duration: 0.15, ease: appleEase } as const;

export function ThemeToggle() {
	const t = useTranslations("nav");
	const { theme, toggleTheme, mounted } = useTheme();
	const isLight = mounted && theme === "light";

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		toggleTheme({
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2,
		});
	};

	return (
		<motion.button
			type="button"
			onClick={handleClick}
			whileTap={{ scale: 0.96 }}
			className="nav-button flex size-10 items-center justify-center text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]"
			aria-label={isLight ? t("themeDark") : t("themeLight")}
		>
			<span className="relative block size-[20px]">
				<AnimatePresence mode="sync" initial={false}>
					{isLight ? (
						<motion.span
							key="moon"
							variants={iconVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							transition={iconTransition}
							className="absolute inset-0 flex items-center justify-center"
						>
							<span className="symbol" style={{ fontSize: 20 }} aria-hidden>
								dark_mode
							</span>
						</motion.span>
					) : (
						<motion.span
							key="sun"
							variants={iconVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							transition={iconTransition}
							className="absolute inset-0 flex items-center justify-center"
						>
							<span className="symbol" style={{ fontSize: 20 }} aria-hidden>
								light_mode
							</span>
						</motion.span>
					)}
				</AnimatePresence>
			</span>
		</motion.button>
	);
}
