"use client";

import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";

export type Theme = "light" | "dark";

export interface ToggleCoords {
	x: number;
	y: number;
}

export function useTheme() {
	const [theme, setThemeState] = useState<Theme>("dark");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const isDark = document.documentElement.classList.contains("dark");
		setThemeState(isDark ? "dark" : "light");
	}, []);

	const toggleTheme = useCallback((coords?: ToggleCoords) => {
		const isDark = document.documentElement.classList.contains("dark");
		const nextTheme: Theme = isDark ? "light" : "dark";
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (!document.startViewTransition || prefersReducedMotion) {
			setThemeState(nextTheme);
			document.documentElement.classList.toggle("dark", nextTheme === "dark");
			localStorage.setItem("theme", nextTheme);
			return;
		}

		const x = coords?.x ?? window.innerWidth / 2;
		const y = coords?.y ?? window.innerHeight / 2;
		const endRadius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y),
		);

		document.documentElement.classList.add("theme-switching");

		const transition = document.startViewTransition(() => {
			flushSync(() => {
				setThemeState(nextTheme);
			});
			document.documentElement.classList.toggle("dark", nextTheme === "dark");
			localStorage.setItem("theme", nextTheme);
		});

		transition.ready.then(() => {
			document.documentElement.animate(
				{
					clipPath: [
						`circle(0px at ${x}px ${y}px)`,
						`circle(${endRadius}px at ${x}px ${y}px)`,
					],
				},
				{
					duration: 750,
					easing: "cubic-bezier(0.22, 1, 0.36, 1)",
					pseudoElement: "::view-transition-new(root)",
				},
			);
		});

		transition.finished.finally(() => {
			document.documentElement.classList.remove("theme-switching");
		});
	}, []);

	const setTheme = useCallback((newTheme: Theme) => {
		setThemeState(newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
		localStorage.setItem("theme", newTheme);
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key.toLowerCase() !== "d" || e.metaKey || e.ctrlKey || e.altKey) {
				return;
			}

			const target = e.target as HTMLElement | null;
			if (
				target &&
				(target.tagName === "INPUT" ||
					target.tagName === "TEXTAREA" ||
					target.tagName === "SELECT" ||
					target.isContentEditable ||
					target.getAttribute("role") === "textbox")
			) {
				return;
			}

			e.preventDefault();
			toggleTheme();
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleTheme]);

	return { theme, setTheme, toggleTheme, mounted };
}
