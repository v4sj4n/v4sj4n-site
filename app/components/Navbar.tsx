"use client";
import { siteConfig } from "@/config/site";
import { useState, useEffect } from "react";
export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`backdrop-blur-md bg-zinc-900/90 border-b border-zinc-800/50 px-4 md:px-6 py-4 sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-[0_5px_20px_-3px_rgba(0,0,0,0.3)]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          vasjan<span className="text-red-600">.</span>
        </h1>

        {/* Desktop navigation */}
        <ul className="hidden md:flex gap-1">
          {siteConfig.navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-red-500 relative group flex items-center"
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div
            className={`w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></div>
        </button>
      </div>

      {/* Mobile navigation menu with smooth transition */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col">
          {siteConfig.navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="px-4 py-3 text-sm font-medium transition-colors hover:bg-zinc-800/50 rounded-sm mx-1 flex items-center"
                onClick={() => setMenuOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
