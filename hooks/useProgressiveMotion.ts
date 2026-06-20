"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

export type MotionPhase = "rest" | "enter" | "ambient";

/**
 * Progressive disclosure for motion: content stays visible at rest, then
 * entrance choreography runs after first paint, then ambient loops.
 */
export function useProgressiveMotion() {
	const prefersReducedMotion = useReducedMotion() ?? false;
	const [phase, setPhase] = useState<MotionPhase>("rest");

	useEffect(() => {
		if (prefersReducedMotion) return;

		const frame = requestAnimationFrame(() => {
			setPhase("enter");
		});

		return () => cancelAnimationFrame(frame);
	}, [prefersReducedMotion]);

	const completeEnter = useCallback(() => {
		if (!prefersReducedMotion) {
			setPhase("ambient");
		}
	}, [prefersReducedMotion]);

	return {
		phase,
		prefersReducedMotion,
		completeEnter,
		shouldEnter: phase === "enter",
		shouldAnimateAmbient: phase === "ambient",
	};
}
