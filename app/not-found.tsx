import { WarningCircleIcon, HouseIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="mt-8 lg:mt-20 py-4 md:py-8 px-4 md:px-6 lg:px-8">
			<h3 className="mb-8 text-2xl font-bold">404.</h3>
			<div className="flex min-h-[60vh] items-center justify-center rounded-lg border-2 border-primary bg-accent dark:bg-accent">
				<div className="p-6 md:p-8 text-center max-w-2xl">
					<WarningCircleIcon
						size={80}
						weight="bold"
						className="mx-auto mb-6 text-primary"
					/>
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Page Not Found
					</h1>
					<p className="text-lg text-muted-foreground mb-8">
						The page you're looking for doesn't exist or has been moved.
					</p>
					<Link
						href="/"
						className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary px-6 py-3 
                         text-lg font-medium text-primary-foreground transition-all duration-300 
                         hover:bg-primary/90 hover:shadow-lg"
					>
						<HouseIcon size={24} weight="bold" />
						Back to Home
					</Link>
				</div>
			</div>
		</main>
	);
}
