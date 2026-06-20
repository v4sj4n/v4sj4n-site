"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { appleEase, disclosureSpring } from "@/lib/motion";

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: 0.8, ease: appleEase },
	},
};

const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.8, ease: appleEase },
	},
};

const variantMap = {
	fadeUp,
	fadeIn,
} as const;

type RevealVariant = keyof typeof variantMap;

type RevealProps = {
	children: ReactNode;
	variant?: RevealVariant;
	delay?: number;
	className?: string;
	once?: boolean;
	amount?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

export function Reveal({
	children,
	variant = "fadeUp",
	delay = 0,
	className,
	once = true,
	amount = 0.2,
	...props
}: RevealProps) {
	const selected = variantMap[variant];

	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once, amount }}
			variants={{
				hidden: selected.hidden,
				visible: {
					...selected.visible,
					transition: {
						...(typeof selected.visible === "object" &&
						selected.visible !== null &&
						"transition" in selected.visible
							? selected.visible.transition
							: {}),
						delay,
					},
				},
			}}
			className={className}
			{...props}
		>
			{children}
		</motion.div>
	);
}

type StaggerProps = {
	children: ReactNode;
	className?: string;
	staggerDelay?: number;
	delayChildren?: number;
};

export function Stagger({
	children,
	className,
	staggerDelay = 0.1,
	delayChildren = 0.08,
}: StaggerProps) {
	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.15 }}
			variants={{
				hidden: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: { staggerChildren: staggerDelay, delayChildren },
				},
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}

type StaggerItemProps = {
	children: ReactNode;
	className?: string;
	variant?: RevealVariant;
};

export function StaggerItem({
	children,
	className,
	variant = "fadeUp",
}: StaggerItemProps) {
	return (
		<motion.div variants={variantMap[variant]} className={className}>
			{children}
		</motion.div>
	);
}

export const disclosureMotion = {
	initial: { height: 0, opacity: 0 },
	animate: {
		height: "auto",
		opacity: 1,
		transition: {
			height: disclosureSpring,
			opacity: { duration: 0.15, ease: appleEase },
		},
	},
	exit: {
		height: 0,
		opacity: 0,
		transition: {
			height: { duration: 0.18, ease: appleEase },
			opacity: { duration: 0.1, ease: appleEase },
		},
	},
};
