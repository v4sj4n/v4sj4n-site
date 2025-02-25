import {
  Code,
  GithubLogo,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

type Project = {
  title: string;
  description: string;
  sourceCode: string;
  technologies: string[];
};

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div
      key={project.title}
      className="group bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 hover:border-red-600 transition-all duration-500 h-full flex flex-col rounded-sm hover:shadow-[0_5px_30px_-15px_rgba(220,38,38,0.3)]"
    >
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-3 group-hover:text-red-500 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="mb-6 text-zinc-400 leading-relaxed flex-grow">
          {project.description}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-zinc-800/70 text-zinc-300 px-2 py-1 text-xs rounded-sm backdrop-blur-sm transition-colors duration-300 group-hover:bg-zinc-800 flex items-center"
              >
                <Code weight="bold" size={12} className="mr-1" />
                {tech}
              </span>
            ))}
          </div>

          <a
            href={project.sourceCode}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-red-500 hover:text-red-400 transition-colors relative"
          >
            <GithubLogo weight="fill" className="mr-1.5" size={16} />
            View Source
            <ArrowRight
              weight="bold"
              className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1"
              size={16}
            />
            <span className="absolute inset-x-0 bottom-0 h-px bg-red-500/50 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </a>
        </div>
      </div>
    </div>
  );
};
