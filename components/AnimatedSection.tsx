"use client";

import { motion, type Variants } from "framer-motion";
import type React from "react";

// Apple-style spring easing — smooth and natural
const springTransition = {
	type: "spring" as const,
	damping: 30,
	stiffness: 100,
	mass: 0.8,
};

const easeCubic = [0.25, 0.1, 0.25, 1.0] as const;

// Variants for different reveal styles
const fadeUp: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: easeCubic },
	},
};

const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 1, ease: easeCubic },
	},
};

const scaleUp: Variants = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.8, ease: easeCubic },
	},
};

const slideFromLeft: Variants = {
	hidden: { opacity: 0, x: -60 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.8, ease: easeCubic },
	},
};

const slideFromRight: Variants = {
	hidden: { opacity: 0, x: 60 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.8, ease: easeCubic },
	},
};

const variantMap = {
	fadeUp,
	fadeIn,
	scaleUp,
	slideFromLeft,
	slideFromRight,
};

type AnimationVariant = keyof typeof variantMap;

interface AnimatedSectionProps {
	children: React.ReactNode;
	variant?: AnimationVariant;
	delay?: number;
	className?: string;
	as?: "div" | "section" | "span" | "h1" | "h2" | "h3" | "p" | "a";
	once?: boolean;
	amount?: number;
}

export default function AnimatedSection({
	children,
	variant = "fadeUp",
	delay = 0,
	className = "",
	as = "div",
	once = true,
	amount = 0.3,
}: AnimatedSectionProps) {
	const selectedVariant = variantMap[variant];

	// Add delay to the variant's visible state
	const delayedVariant: Variants = {
		hidden: selectedVariant.hidden,
		visible: {
			...selectedVariant.visible,
			transition: {
				...((selectedVariant.visible as Record<string, unknown>)
					.transition as Record<string, unknown>),
				delay,
			},
		},
	};

	const Component = motion.create(as as "div");

	return (
		<Component
			initial="hidden"
			whileInView="visible"
			viewport={{ once, amount }}
			variants={delayedVariant}
			className={className}
		>
			{children}
		</Component>
	);
}

// Stagger container — children animate in sequence
interface StaggerContainerProps {
	children: React.ReactNode;
	className?: string;
	staggerDelay?: number;
	as?: "div" | "section" | "ul";
}

const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.1,
		},
	},
};

export function StaggerContainer({
	children,
	className = "",
	staggerDelay = 0.15,
	as = "div",
}: StaggerContainerProps) {
	const customStagger: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: staggerDelay,
				delayChildren: 0.1,
			},
		},
	};

	const Component = motion.create(as as "div");

	return (
		<Component
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			variants={customStagger}
			className={className}
		>
			{children}
		</Component>
	);
}

// Stagger item — to be used inside StaggerContainer
interface StaggerItemProps {
	children: React.ReactNode;
	className?: string;
	variant?: AnimationVariant;
}

export function StaggerItem({
	children,
	className = "",
	variant = "fadeUp",
}: StaggerItemProps) {
	return (
		<motion.div variants={variantMap[variant]} className={className}>
			{children}
		</motion.div>
	);
}

// Text reveal — word-by-word or character-by-character
interface TextRevealProps {
	text: string;
	className?: string;
	by?: "word" | "char";
	delay?: number;
}

export function TextReveal({
	text,
	className = "",
	by = "word",
	delay = 0,
}: TextRevealProps) {
	const items = by === "word" ? text.split(" ") : text.split("");

	return (
		<motion.span
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.5 }}
			variants={{
				hidden: {},
				visible: {
					transition: {
						staggerChildren: by === "word" ? 0.08 : 0.03,
						delayChildren: delay,
					},
				},
			}}
			className={className}
			aria-label={text}
		>
			{items.map((item, i) => (
				<motion.span
					key={`${item}-${i}`}
					variants={{
						hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
						visible: {
							opacity: 1,
							y: 0,
							filter: "blur(0px)",
							transition: { duration: 0.5, ease: easeCubic },
						},
					}}
					className="inline-block"
				>
					{item}
					{by === "word" && i < items.length - 1 ? "\u00A0" : ""}
				</motion.span>
			))}
		</motion.span>
	);
}

// Counter animation for numbers
interface CountUpProps {
	target: number;
	duration?: number;
	className?: string;
	suffix?: string;
}

export function CountUp({
	target,
	duration = 2,
	className = "",
	suffix = "",
}: CountUpProps) {
	return (
		<motion.span
			className={className}
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
		>
			<motion.span
				initial={{ opacity: 0 }}
				whileInView={{
					opacity: 1,
				}}
				viewport={{ once: true }}
			>
				{target}
				{suffix}
			</motion.span>
		</motion.span>
	);
}
