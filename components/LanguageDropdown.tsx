"use client";

import { Check, ChevronDown, Globe } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { LOCALES } from "@/lib/locales";
import { appleSpringSnappy } from "@/lib/motion";

interface Props {
	currentLocale?: string;
}

export function LanguageDropdown({ currentLocale }: Props) {
	const defaultLocale = useLocale();
	const activeLocale = currentLocale || defaultLocale;
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const selectedItemRef = useRef<HTMLButtonElement>(null);
	const pathname = usePathname();
	const router = useRouter();

	const current = LOCALES.find((l) => l.code === activeLocale) || LOCALES[0];

	// Close on click outside or Escape
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		}
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleKeyDown);
			// Scroll selected language into view smoothly on open
			setTimeout(() => {
				selectedItemRef.current?.scrollIntoView({
					block: "nearest",
					behavior: "smooth",
				});
			}, 50);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	const handleSelect = (code: string) => {
		setIsOpen(false);
		if (code === activeLocale) return;

		const hash = typeof window !== "undefined" ? window.location.hash : "";
		const segments = (pathname || "").split("/").filter(Boolean);

		if (segments.length > 0 && LOCALES.some((l) => l.code === segments[0])) {
			segments[0] = code;
			router.push(`/${segments.join("/")}/${hash}`);
		} else {
			router.push(`/${code}/${hash}`);
		}
	};

	return (
		<div className="relative" ref={dropdownRef}>
			{/* Trigger Button */}
			<motion.button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.96 }}
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				aria-label={`Change language, current is ${current.name}`}
				className="flex h-[38px] items-center justify-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3"
			>
				<Globe className="size-3.5 shrink-0" aria-hidden="true" />
				<span className="text-[11px] font-semibold uppercase tracking-wider">
					{current.code}
				</span>
				<ChevronDown
					className={`size-3 shrink-0 transition-transform duration-200 ${
						isOpen ? "rotate-180" : ""
					}`}
					aria-hidden="true"
				/>
			</motion.button>

			{/* Scrollable Popover */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: -4 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -4 }}
						transition={appleSpringSnappy}
						className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-border/60 bg-card/95 p-1.5 shadow-2xl backdrop-blur-xl transition-all"
						role="listbox"
						aria-label="Select language"
					>
						<div className="mb-1 border-b border-border/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70">
							Languages ({LOCALES.length})
						</div>

						<div className="scrollbar-thin max-h-60 space-y-0.5 overflow-y-auto pr-1">
							{LOCALES.map((l, index) => {
								const isSelected = l.code === activeLocale;
								return (
									<div key={l.code}>
										{index === 7 && (
											<div className="my-1 border-t border-border/30" />
										)}
										<button
											ref={isSelected ? selectedItemRef : undefined}
											type="button"
											role="option"
											aria-selected={isSelected}
											onClick={() => handleSelect(l.code)}
											className={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-left text-[12px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
												isSelected
													? "bg-primary/10 font-semibold text-primary"
													: "text-foreground/80 hover:bg-muted/70 hover:text-foreground"
											}`}
										>
											<div className="flex items-center gap-2">
												<span className="font-medium">{l.nativeName}</span>
												<span className="font-mono text-[10px] text-muted-foreground/60">
													{l.name}
												</span>
											</div>
											{isSelected && (
												<Check
													className="size-3.5 shrink-0 text-primary"
													aria-hidden="true"
												/>
											)}
										</button>
									</div>
								);
							})}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
