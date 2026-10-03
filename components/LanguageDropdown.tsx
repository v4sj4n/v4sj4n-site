"use client";

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
	const [query, setQuery] = useState("");
	const [searchOpen, setSearchOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const selectedItemRef = useRef<HTMLButtonElement>(null);
	const pathname = usePathname();
	const router = useRouter();

	const current = LOCALES.find((l) => l.code === activeLocale) || LOCALES[0];
	const q = query.trim().toLowerCase();
	const visibleLocales = q
		? LOCALES.filter(
				(l) =>
					l.nativeName.toLowerCase().includes(q) ||
					l.name.toLowerCase().includes(q) ||
					l.code.toLowerCase().includes(q),
			)
		: LOCALES;

	// Close on click outside or Escape
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
				setSearchOpen(false);
				setQuery("");
			}
		}
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setIsOpen(false);
				setSearchOpen(false);
				setQuery("");
			}
		}
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleKeyDown);
			// Scroll selected language into view smoothly on open
			if (!query.trim()) {
				setTimeout(() => {
					selectedItemRef.current?.scrollIntoView({
						block: "nearest",
						behavior: "smooth",
					});
				}, 50);
			}
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, query]);

	const handleSelect = (code: string) => {
		setIsOpen(false);
		setSearchOpen(false);
		setQuery("");
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
				whileTap={{ scale: 0.96 }}
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				aria-label={`Change language, current is ${current.name}`}
				className="nav-button flex h-10 items-center justify-center gap-2 px-4 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]"
			>
				<span className="symbol" style={{ fontSize: 20 }} aria-hidden="true">
					language
				</span>
				<span className="hidden max-w-28 truncate text-sm font-medium normal-case tracking-normal sm:inline">
					{current.nativeName}
				</span>
				<span className="text-xs font-medium uppercase tracking-[0.08em] sm:hidden">
					{current.code}
				</span>
				<span
					className={`symbol dropdown-icon ${isOpen ? "dropdown-open" : ""}`}
					style={{ fontSize: 18 }}
					aria-hidden="true"
				>
					keyboard_arrow_down
				</span>
			</motion.button>

			{/* Scrollable Popover */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: -4 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -4 }}
						transition={appleSpringSnappy}
						className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-[#e8eaed] bg-white p-1.5 shadow-[0_1px_3px_rgba(60,64,67,.3)] backdrop-blur-xl transition-all dark:border-white/10 dark:bg-[#2f3034]"
						role="listbox"
						aria-label="Select language"
					>
						<div className="mb-1 flex items-center justify-between border-b border-[#e8eaed] py-1 pr-1 pl-3 dark:border-white/10">
							<span className="py-1 text-[12px] font-medium uppercase tracking-[0.08em] text-[#5f6368] dark:text-[#9aa0a6]">
								Languages ({LOCALES.length})
							</span>
							<button
								type="button"
								onClick={() => {
									setSearchOpen((prev) => !prev);
									setQuery("");
								}}
								aria-expanded={searchOpen}
								aria-label={searchOpen ? "Close search" : "Search languages"}
								className="flex size-8 items-center justify-center rounded-full text-[#5f6368] transition-all duration-150 hover:bg-[#f1f3f4] hover:text-[#202124] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] dark:text-[#9aa0a6] dark:hover:bg-white/10 dark:hover:text-white"
							>
								<span
									className="symbol"
									style={{ fontSize: 18 }}
									aria-hidden="true"
								>
									{searchOpen ? "close" : "search"}
								</span>
							</button>
						</div>

						<AnimatePresence initial={false}>
							{searchOpen && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: "auto", opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.2, ease: "easeOut" }}
									className="overflow-hidden"
								>
									<div className="p-1.5 pb-0.5">
										<label className="flex items-center gap-2 rounded-lg border border-[#dadce0] bg-white px-3 py-2 transition-all duration-150 focus-within:border-[#1a73e8] focus-within:shadow-[0_0_0_2px_#1a73e8] dark:border-white/20 dark:bg-white/5">
											<span className="sr-only">Search languages</span>
											<input
												value={query}
												onChange={(e) => setQuery(e.target.value)}
												placeholder="Search languages"
												className="w-full bg-transparent text-sm text-[#202124] placeholder:text-[#5f6368] focus:outline-none dark:text-white dark:placeholder:text-[#9aa0a6]"
											/>
											{query ? (
												<button
													type="button"
													onClick={() => setQuery("")}
													aria-label="Clear search"
													className="flex shrink-0 items-center justify-center rounded-full p-0.5 text-[#5f6368] transition-colors duration-150 hover:text-[#202124] dark:text-[#9aa0a6] dark:hover:text-white"
												>
													<span
														className="symbol"
														style={{ fontSize: 16 }}
														aria-hidden="true"
													>
														close
													</span>
												</button>
											) : null}
										</label>
									</div>
								</motion.div>
							)}
						</AnimatePresence>

						<div className="scrollbar-thin max-h-60 space-y-0.5 overflow-y-auto p-1.5">
							{visibleLocales.length === 0 ? (
								<p className="px-3 py-6 text-center text-sm text-[#5f6368] dark:text-[#9aa0a6]">
									No languages found
								</p>
							) : (
								visibleLocales.map((l) => {
									const isSelected = l.code === activeLocale;
									return (
										<button
											key={l.code}
											ref={isSelected ? selectedItemRef : undefined}
											type="button"
											role="option"
											aria-selected={isSelected}
											onClick={() => handleSelect(l.code)}
											className={`flex w-full items-center justify-between gap-2 rounded-full px-3 py-2 text-left text-[14px] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] ${
												isSelected
													? "bg-[#e8f0fe] font-medium text-[#1a73e8] dark:bg-[#1a73e8]/20 dark:text-[#8ab4f8]"
													: "font-normal text-[#3c4043] hover:bg-[#f1f3f4] hover:text-[#202124] dark:text-[#e8eaed] dark:hover:bg-white/10 dark:hover:text-white"
											}`}
										>
											<span className="flex min-w-0 items-baseline gap-2">
												<span className="truncate font-medium">
													{l.nativeName}
												</span>
												<span className="shrink-0 text-[12px] text-[#5f6368] dark:text-[#9aa0a6]">
													{l.name}
												</span>
											</span>
											{isSelected && (
												<span
													className="symbol shrink-0 text-[#1a73e8] dark:text-[#8ab4f8]"
													style={{ fontSize: 18 }}
													aria-hidden="true"
												>
													check
												</span>
											)}
										</button>
									);
								})
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
