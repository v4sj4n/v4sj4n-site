"use client"
import { ArrowUpRight } from 'lucide-react';

const borderColor = "border-neutral-950 dark:border-white";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={`border-t ${borderColor}`}>
            <div className="max-w-screen-2xl mx-auto px-6 py-4 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                <span>© {new Date().getFullYear()} Vasjan Çupri</span>
                <span className="hidden md:inline">Designed with Swiss Principles</span>
                <button
                    onClick={scrollToTop}
                    className="hover:text-red-600 transition-colors"
                >
                    Top <ArrowUpRight className="inline -mt-0.5" size={10} />
                </button>
            </div>
        </footer>
    );
}
