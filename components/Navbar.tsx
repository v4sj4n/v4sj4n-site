"use client"
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navbar() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setMounted(true);
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const toggleTheme = () => setTheme(resolvedTheme === 'light' ? 'dark' : 'light');

    // Use dark theme as default for SSR to avoid hydration mismatch
    const isLight = mounted ? resolvedTheme === 'light' : false;

    const borderColor = isLight ? "border-neutral-950" : "border-white";
    const subBorderColor = isLight ? "border-neutral-200" : "border-neutral-800";
    const mutedText = isLight ? "text-neutral-500" : "text-neutral-400";

    return (
        <header className={`sticky top-0 z-50 border-b ${borderColor} backdrop-blur-xl ${isLight ? 'bg-white/80' : 'bg-neutral-950/80'}`}>
            <div className="max-w-screen-2xl mx-auto flex items-center justify-between h-16 md:h-20 px-6 md:px-8">

                {/* BRAND */}
                <a href="#home" className="group flex items-center gap-1">
                    <h1 className="text-xl md:text-2xl font-bold tracking-tighter uppercase leading-none transition-colors group-hover:text-red-600">
                        Vasjan<span className="text-red-600 group-hover:scale-125 inline-block transition-transform">.</span>
                    </h1>
                </a>

                {/* NAV LINKS */}
                <nav className="hidden md:flex items-center gap-10">
                    {['Home', 'Projects', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className={`relative text-xs font-bold uppercase tracking-widest py-2 transition-colors hover:text-red-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full`}
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                {/* RIGHT SIDE: TIME + THEME + MOBILE MENU */}
                <div className="flex items-center gap-4 md:gap-6">
                    {/* Live Clock */}
                    {time && (
                        <div className={`hidden md:flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider ${mutedText} px-3 py-1.5 rounded-full border ${subBorderColor}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            {time.toLocaleTimeString('en-GB')}
                        </div>
                    )}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2.5 rounded-full border ${subBorderColor} hover:border-red-600 hover:text-red-600 transition-all duration-300 hover:scale-105`}
                        aria-label="Toggle Theme"
                    >
                        {isLight ? <Moon size={16} /> : <Sun size={16} />}
                    </button>


                </div>
            </div>
        </header>
    );
}
