export const appleEase = [0.32, 0.72, 0, 1] as const;

export const appleSpring = {
	type: "spring" as const,
	damping: 30,
	stiffness: 100,
	mass: 0.8,
};

export const appleSpringSnappy = {
	type: "spring" as const,
	duration: 0.3,
	bounce: 0,
};

/** Fast accordion expand/collapse — avoid heavy springs on `height: auto`. */
export const disclosureSpring = {
	type: "spring" as const,
	duration: 0.22,
	bounce: 0,
};

export const appleTransition = {
	duration: 0.6,
	ease: appleEase,
};

/** Resting pose — content is fully visible before motion enhances it. */
export const visibleState = {
	opacity: 1,
	y: 0,
	filter: "blur(0px)",
} as const;

export const clipRevealDuration = 0.85;

export const clipReveal = (delay = 0) => ({
	initial: { y: "110%" as const },
	animate: { y: 0 },
	transition: { duration: clipRevealDuration, ease: appleEase, delay },
});

export const floatLoop = (amount: number, delay = 0) => ({
	y: [0, -amount, 0] as const,
	transition: {
		duration: 5,
		repeat: Number.POSITIVE_INFINITY,
		ease: "easeInOut" as const,
		delay,
	},
});
