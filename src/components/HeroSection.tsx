import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useRef } from "react";

const ease = [0.32, 0.72, 0, 1] as const;

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    // Parallax-like transforms as user scrolls
    const headlineY = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const subtextY = useTransform(scrollYProgress, [0, 1], [0, -40]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scrollIndicatorOpacity = useTransform(
        scrollYProgress,
        [0, 0.15],
        [1, 0],
    );

    return (
        <section
            ref={sectionRef}
            id="home"
            className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
        >
            {/* Subtle ambient glow — green palette */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease }}
                    className="absolute top-[10%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-emerald-500/[0.04] via-green-500/[0.02] to-transparent dark:from-emerald-500/[0.06] dark:via-green-500/[0.03] blur-[100px]"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease, delay: 0.3 }}
                    className="absolute bottom-[10%] left-[0%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-neutral-300/20 to-transparent dark:from-neutral-700/10 blur-[80px]"
                />
            </div>

            <motion.div
                style={{ y: headlineY, opacity }}
                className="relative max-w-screen-xl mx-auto w-full px-6 md:px-8 py-20"
            >
                {/* Eyebrow — First thing to appear */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.1 }}
                    className="mb-10"
                >
                    <span className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                        <span className="w-6 h-px bg-neutral-300 dark:bg-neutral-700" />
                        Available for work
                    </span>
                </motion.div>

                {/* Main headline — staggered word reveals */}
                <div className="mb-8">
                    <div className="overflow-hidden pb-[0.15em]">
                        <motion.h2
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease, delay: 0.3 }}
                            className="text-[clamp(2.5rem,7vw,6rem)] font-semibold tracking-[-0.03em] leading-[1.08] z-50"
                        >
                            I craft digital
                        </motion.h2>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h2
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, ease, delay: 0.45 }}
                            className="text-[clamp(2.5rem,7vw,6rem)] font-semibold tracking-[-0.03em] leading-[1]"
                        >
                            experiences
                            <motion.span
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, ease, delay: 1.1 }}
                                className="inline-block text-primary ml-1"
                            >
                                .
                            </motion.span>
                        </motion.h2>
                    </div>
                </div>

                {/* Description — progressive reveal after headline */}
                <motion.div style={{ y: subtextY }} className="max-w-lg">
                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease, delay: 0.7 }}
                        className="text-base md:text-lg leading-relaxed text-neutral-500 dark:text-neutral-400"
                    >
                        Full-stack developer specializing in{" "}
                        <span className="text-neutral-950 dark:text-white font-medium">
                            TypeScript
                        </span>
                        ,{" "}
                        <span className="text-neutral-950 dark:text-white font-medium">
                            React
                        </span>
                        , and{" "}
                        <span className="text-neutral-950 dark:text-white font-medium">
                            Next.js
                        </span>
                        . I transform complex problems into elegant, performant solutions.
                    </motion.p>
                </motion.div>

                {/* CTA — appears last in the hierarchy */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.95 }}
                    className="mt-10 flex flex-wrap items-center gap-4"
                >
                    <motion.a
                        href="/resume.pdf"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group inline-flex items-center gap-3 px-7 py-3.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-[13px] font-semibold tracking-wide hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all duration-500 rounded-full"
                    >
                        View Resume
                        <ArrowUpRight
                            size={14}
                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                        />
                    </motion.a>
                    <a
                        href="#projects"
                        className="inline-flex items-center gap-2 px-5 py-3.5 text-[13px] font-medium text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition-colors duration-300"
                    >
                        See my work
                        <ArrowDown size={14} />
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll indicator — fades out as user scrolls */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                style={{ opacity: scrollIndicatorOpacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                    className="w-px h-6 bg-gradient-to-b from-neutral-300 to-transparent dark:from-neutral-600"
                />
            </motion.div>
        </section>
    );
}
