import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const ease = [0.32, 0.72, 0, 1] as const;

export default function Footer() {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<motion.footer
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, ease }}
			className="border-t border-neutral-200/60 dark:border-neutral-800/60"
		>
			<div className="max-w-screen-xl mx-auto px-6 md:px-8 py-6 flex justify-between items-center">
				<span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600 tracking-wider">
					© {new Date().getFullYear()} Vasjan Çupri
				</span>

				<span className="hidden md:inline text-[11px] font-mono text-neutral-300 dark:text-neutral-700 tracking-wider">
					Designed with care
				</span>

				<motion.button
					onClick={scrollToTop}
					whileHover={{ scale: 1.05, y: -1 }}
					whileTap={{ scale: 0.95 }}
					className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600 hover:text-primary dark:hover:text-primary transition-colors duration-300 tracking-wider flex items-center gap-1"
				>
					Back to top
					<ArrowUpRight size={12} />
				</motion.button>
			</div>
		</motion.footer>
	);
}
