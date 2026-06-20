"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/hooks/useTheme";
import { appleSpringSnappy } from "@/lib/motion";

const iconVariants = {
	initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
	animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
	exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
};

export function ThemeToggle() {
	const t = useTranslations("nav");
	const { theme, toggleTheme, mounted } = useTheme();
	const isLight = mounted && theme === "light";

	return (
		<motion.button
			type="button"
			onClick={toggleTheme}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.96 }}
			className="relative rounded-full p-2.5 text-muted-foreground transition-colors duration-300 hover:bg-muted/80 hover:text-foreground"
			aria-label={isLight ? t("themeDark") : t("themeLight")}
		>
			<span className="relative block size-[18px]">
				<AnimatePresence mode="wait" initial={false}>
					{isLight ? (
						<motion.span
							key="moon"
							variants={iconVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							transition={appleSpringSnappy}
							className="absolute inset-0 flex items-center justify-center"
						>
							<Moon size={18} />
						</motion.span>
					) : (
						<motion.span
							key="sun"
							variants={iconVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							transition={appleSpringSnappy}
							className="absolute inset-0 flex items-center justify-center"
						>
							<Sun size={18} />
						</motion.span>
					)}
				</AnimatePresence>
			</span>
		</motion.button>
	);
}
