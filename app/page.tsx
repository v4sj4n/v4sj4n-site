"use client";

import { useEffect } from "react";
import { resolveBrowserLocale } from "@/lib/resolve-browser-locale";

export default function RootPage() {
	useEffect(() => {
		const locale = resolveBrowserLocale();
		window.location.replace(`/${locale}/`);
	}, []);

	return (
		<main className="flex flex-1 items-center justify-center">
			<p className="text-sm text-foreground/60">Redirecting…</p>
		</main>
	);
}
