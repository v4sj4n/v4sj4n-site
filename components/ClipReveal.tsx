"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useState } from "react";
import { appleEase, clipRevealDuration } from "@/lib/motion";

type ClipRevealProps = {
	children: ReactNode;
	delay?: number;
	className?: string;
	clip?: boolean;
	fade?: boolean;
	duration?: number;
	onComplete?: () => void;
};

export function ClipReveal({
	children,
	delay = 0,
	className = "",
	clip = true,
	fade = false,
	duration = clipRevealDuration,
	onComplete,
}: ClipRevealProps) {
	const prefersReducedMotion = useReducedMotion() ?? false;
	const motionDelay = prefersReducedMotion ? 0 : delay;
	const motionDuration = prefersReducedMotion ? 0 : duration;
	const [isComplete, setIsComplete] = useState(prefersReducedMotion);

	const shouldClip = clip && !isComplete;

	return (
		<div className={`${shouldClip ? "overflow-hidden" : ""} ${className}`}>
			<motion.div
				initial={{
					y: prefersReducedMotion ? 0 : "110%",
					opacity: fade && !prefersReducedMotion ? 0 : 1,
				}}
				animate={{ y: 0, opacity: 1 }}
				transition={{
					duration: motionDuration,
					ease: appleEase,
					delay: motionDelay,
				}}
				onAnimationComplete={() => {
					setIsComplete(true);
					onComplete?.();
				}}
			>
				{children}
			</motion.div>
		</div>
	);
}
