"use client";

import { siteConfig } from "@/config/site";
import { motion } from "motion/react";

export default function AnimatedSection() {
  return (
    <motion.section
      className="mb-24 relative"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Hello, I&apos;m{" "}
          <span className="text-red-600 relative">
            Vasjan Çupri
            <span className="absolute -z-10 inset-x-0 bottom-1 h-3 bg-red-600/20 blur-md"></span>
          </span>
        </h1>
        <p className="text-xl mb-10 text-zinc-300 font-light max-w-2xl">
          {siteConfig.description}
        </p>
        <div className="flex flex-wrap gap-2 md:gap-4">
          <a
            href="#projects"
            className="group bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 relative overflow-hidden flex items-center"
          >
            <span className="relative z-10">View Projects</span>
            <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>
          <a
            href="#contact"
            className="group bg-transparent text-white font-medium py-3 px-6 border border-zinc-700 hover:border-red-600 rounded-md transition-all duration-300 relative overflow-hidden flex items-center"
          >
            <span className="relative z-10">Get in Touch</span>
            <span className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
