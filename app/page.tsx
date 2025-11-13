import { MailboxIcon, PuzzlePieceIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function HomePage() {
	return (
		<main className="mt-8 lg:mt-20 py-4 md:py-8">
			<h3 className="mb-8 text-2xl font-bold">home.</h3>
			<div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 min-h-[60vh] rounded-lg border-2 border-primary dark:bg-accent bg-accent">
				<div className="p-6 md:p-8 lg:col-span-2 lg:row-span-2 border-b lg:border-b-0 lg:border-r border-primary items-center justify-center flex">
					<div>
						<h3 className="text-2xl font-bold">Vasjan Çupri</h3>
						<p className="mt-4 text-balance text-neutral-400">
							Full-stack developer passionate about building modern web
							experiences. I specialize in TypeScript, React, Next.js, and
							Node.js, transforming complex problems into sleek, efficient
							solutions.
						</p>
						<Link
							href="/resume.pdf"
							className="mt-6 inline-block text-lg font-medium text-primary underline decoration-transparent underline-offset-4 transition-all duration-300 hover:decoration-primary hover:text-white"
						>
							View my CV &rarr;
						</Link>
					</div>
				</div>

				<div
					className="group p-6 md:p-8 lg:col-span-2 lg:row-span-1 border-b border-primary
                     transition-colors duration-300 ease-in-out hover:bg-primary/20 
                     items-center justify-center flex"
				>
					<div>
						<Link href="/projects" className="w-full text-center flex gap-4">
							<PuzzlePieceIcon size={40} weight="bold" />
							<h4 className="text-4xl font-bold">Projects</h4>
						</Link>
					</div>
				</div>

				<div
					className="group p-6 md:p-8 lg:col-span-2 lg:row-span-1 transition-colors 
                     duration-300 ease-in-out hover:bg-primary/20 
                     items-center justify-center flex"
				>
					<div>
						<Link href="/contact" className="w-full text-center flex gap-4">
							<MailboxIcon size={40} weight="bold" />
							<h4 className="text-4xl font-bold">Contact</h4>
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
