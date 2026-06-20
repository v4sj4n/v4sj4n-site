"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export function useTheme() {
	const [theme, setThemeState] = useState<Theme>("dark");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const isDark = document.documentElement.classList.contains("dark");
		setThemeState(isDark ? "dark" : "light");
	}, []);

	const setTheme = useCallback((newTheme: Theme) => {
		setThemeState(newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
		localStorage.setItem("theme", newTheme);
	}, []);

	const toggleTheme = useCallback(() => {
		setThemeState((current) => {
			const next = current === "light" ? "dark" : "light";
			document.documentElement.classList.toggle("dark", next === "dark");
			localStorage.setItem("theme", next);
			return next;
		});
	}, []);

	return { theme, setTheme, toggleTheme, mounted };
}
