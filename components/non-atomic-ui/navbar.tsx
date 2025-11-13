"use client";

import { usePathname } from "next/navigation";
import { ThemeModeToggle } from "../ui/theme-mode-toggle";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Navbar() {
	const pathname = usePathname();

	const links = [
		{ name: "Home", href: "/" },
		{ name: "Projects", href: "/projects" },
		{ name: "Contact", href: "/contact" },
	];

	return (
		<div className="flex justify-between px-48 p-5 bg-accent w-full items-center">
			<h2 className="text-xl font-bold">
				<Link href="/">Vasjan</Link>
			</h2>
			<div className="flex gap-6 items-center">
				{links.map((link) => (
					<Link
						href={link.href}
						key={link.href}
						className={cn(
							"cursor-pointer transition-colors",
							pathname === link.href
								? "font-semibold text-primary"
								: "text-muted-foreground hover:text-foreground",
						)}
					>
						{link.name}
					</Link>
				))}
				<ThemeModeToggle />
			</div>
		</div>
	);
}
