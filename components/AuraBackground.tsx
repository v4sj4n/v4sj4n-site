import type { ReactNode } from "react";

export function AuraBackground({ children }: { children?: ReactNode }) {
	return (
		<div className="aura-bg relative min-h-dvh flex flex-1 flex-col">
			<div
				className="fixed inset-0 pointer-events-none overflow-hidden z-0"
				aria-hidden="true"
			>
				<div className="aura-layer-1" />
				<div className="aura-layer-2" />
				<div className="aura-layer-3" />
				<div className="aura-grain">
					<svg
						width="100%"
						height="100%"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<filter id="aura-grain">
							<feTurbulence
								type="fractalNoise"
								baseFrequency="0.7"
								numOctaves="4"
								stitchTiles="stitch"
							/>
							<feColorMatrix
								type="matrix"
								values="0.181 0.608 0.061 0 0.075
								        0.181 0.608 0.061 0 0.075
								        0.181 0.608 0.061 0 0.075
								        0     0     0     1 0"
							/>
						</filter>
						<rect width="100%" height="100%" filter="url(#aura-grain)" />
					</svg>
				</div>
			</div>
			{children ? (
				<div className="relative z-1 flex flex-1 flex-col">{children}</div>
			) : null}
		</div>
	);
}
