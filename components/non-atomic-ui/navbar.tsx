"use client";

import { usePathname } from "next/navigation";
import { ThemeModeToggle } from "../ui/theme-mode-toggle";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function Navbar() {
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const links = [
		{ name: "Home", href: "/" },
		{ name: "Projects", href: "/projects" },
		{ name: "Contact", href: "/contact" },
	];

	return (
		<nav className="bg-accent w-full">
			<div className="flex justify-between px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 p-5 items-center">
				{/* Logo */}
				<h2 className="text-xl font-bold">
					<Link href="/">Vasjan</Link>
				</h2>

				{/* Desktop Navigation */}
				<div className="hidden md:flex gap-6 items-center">
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

				{/* Mobile Menu Button */}
				<div className="flex md:hidden items-center gap-3">
					<ThemeModeToggle />
					<Button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label="Toggle menu"
					>
						{mobileMenuOpen ? <X size={24} /> : <List size={24} />}
					</Button>
				</div>
			</div>

			{/* Mobile Navigation */}
			{mobileMenuOpen && (
				<div className="md:hidden border-t border-border">
					<div className="flex flex-col px-4 py-4 space-y-3">
						{links.map((link) => (
							<Link
								href={link.href}
								key={link.href}
								onClick={() => setMobileMenuOpen(false)}
								className={cn(
									"cursor-pointer transition-colors py-2 px-3 rounded-md",
									pathname === link.href
										? "font-semibold text-primary bg-primary/10"
										: "text-muted-foreground hover:text-foreground hover:bg-accent",
								)}
							>
								{link.name}
							</Link>
						))}
					</div>
				</div>
			)}
		</nav>
	);
}
