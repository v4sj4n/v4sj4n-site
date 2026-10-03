"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

export type Theme = "light" | "dark";

export interface ToggleCoords {
	x: number;
	y: number;
}

export function useTheme() {
	const [theme, setThemeState] = useState<Theme>("dark");
	const [mounted, setMounted] = useState(false);
	const activeTransition = useRef<ViewTransition | null>(null);

	useEffect(() => {
		setMounted(true);
		const syncFromDom = () => {
			setThemeState(
				document.documentElement.classList.contains("dark") ? "dark" : "light",
			);
		};
		syncFromDom();
		// Each useTheme() instance owns its own state, but toggles can come
		// from anywhere (button, shortcut). Observe the <html> class so every
		// instance converges on the real theme instead of going stale.
		const observer = new MutationObserver(syncFromDom);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
		return () => observer.disconnect();
	}, []);

	const toggleTheme = useCallback((coords?: ToggleCoords) => {
		// A transition is already running — ignore the repeat instead of
		// starting a new one, which aborts the old transition and surfaces
		// an AbortError ("Old view transition aborted by new view transition").
		if (activeTransition.current) return;

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

		let transition: ViewTransition;
		try {
			transition = document.startViewTransition(() => {
				flushSync(() => {
					setThemeState(nextTheme);
				});
				document.documentElement.classList.toggle("dark", nextTheme === "dark");
				localStorage.setItem("theme", nextTheme);
			});
		} catch {
			// View transitions unavailable after all — apply instantly.
			document.documentElement.classList.remove("theme-switching");
			setThemeState(nextTheme);
			document.documentElement.classList.toggle("dark", nextTheme === "dark");
			localStorage.setItem("theme", nextTheme);
			return;
		}
		activeTransition.current = transition;

		const cleanup = () => {
			if (activeTransition.current === transition) {
				activeTransition.current = null;
			}
			document.documentElement.classList.remove("theme-switching");
		};

		transition.ready
			.then(() => {
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
			})
			.catch(() => {
				// Transition aborted or skipped — cleanup below still runs.
			});

		transition.finished.then(cleanup, cleanup);
	}, []);

	const setTheme = useCallback((newTheme: Theme) => {
		setThemeState(newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
		localStorage.setItem("theme", newTheme);
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.repeat) return;
			const key = typeof e.key === "string" ? e.key.toLowerCase() : "";
			if (key !== "d" || e.metaKey || e.ctrlKey || e.altKey) {
				return;
			}

			const target = e.target;
			if (
				target instanceof HTMLElement &&
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
