"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { CircleHalfTiltIcon } from "@phosphor-icons/react";

export function ThemeModeToggle() {
	const { setTheme, resolvedTheme } = useTheme();

	const onClick = () => {
		resolvedTheme === "dark" ? setTheme("light") : setTheme("dark");
	};

	return (
		<Button onClick={onClick} variant="ghost" size="icon">
			<CircleHalfTiltIcon weight="bold" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
