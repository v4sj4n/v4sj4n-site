import { Badge } from "@/components/ui/badge";
import { siteInfo } from "@/lib/info";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

interface Project {
	title: string;
	description: string;
	href: string;
	technologies: string[];
}

function ProjectCard({ project }: { project: Project }) {
	return (
		<Link
			href={project.href}
			className="group flex flex-col justify-between rounded-lg border border-primary bg-card 
                 p-6 transition-all duration-300 ease-in-out
                 hover:bg-accent hover:shadow-lg"
		>
			<div>
				<h4 className="text-2xl text-primary">{project.title}</h4>
				<p className="mt-3 text-balance text-muted-foreground">
					{project.description}
				</p>
			</div>

			<div className="mt-6 flex flex-wrap gap-2">
				{project.technologies.map((tag) => (
					<Badge key={tag}>{tag}</Badge>
				))}
			</div>

			<div className="mt-4 flex justify-end">
				<ArrowUpRightIcon
					size={24}
					className="text-muted-foreground transition-transform duration-300 
                     group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground"
				/>
			</div>
		</Link>
	);
}

export default function ProjectsPage() {
	return (
		<main className="mt-20 py-4 md:py-8">
			<h3 className="mb-8 text-2xl font-bold">projects.</h3>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{siteInfo.projects.map((project) => (
					<ProjectCard key={project.href} project={project} />
				))}
			</div>
		</main>
	);
}
