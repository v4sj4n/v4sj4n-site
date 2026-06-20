type SectionEyebrowProps = {
	children: React.ReactNode;
};

export function SectionEyebrow({ children }: SectionEyebrowProps) {
	return (
		<span className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
			<span className="h-px w-6 bg-border" aria-hidden />
			{children}
		</span>
	);
}
