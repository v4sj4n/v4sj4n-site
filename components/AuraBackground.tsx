import type { ReactNode } from "react";

export function AuraBackground({ children }: { children?: ReactNode }) {
	return (
		<div className="aura-bg relative min-h-dvh flex flex-1 flex-col">
			<div
				className="fixed inset-0 pointer-events-none overflow-hidden z-0"
				aria-hidden="true"
			>
				<div className="aura-layer-1" />
			</div>
			{children ? (
				<div className="relative z-1 flex flex-1 flex-col">{children}</div>
			) : null}
		</div>
	);
}
