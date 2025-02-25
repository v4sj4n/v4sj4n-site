import { siteConfig } from "@/config/site";
import {
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ProjectCard } from "./components/ProjectCard";

const VasjanPortfolio = () => {
  // Social icon mapping
  const socialIcons: { [key: string]: React.ReactNode } = {
    github: <GithubLogo weight="fill" className="mr-2" size={18} />,
    x: <TwitterLogo weight="fill" className="mr-2" size={18} />,
    linkedin: <LinkedinLogo weight="fill" className="mr-2" size={18} />,
  };

  return (
    <div className="font-sans bg-zinc-950 text-zinc-100 min-h-screen relative">


      <Navbar />
      <main className="px-4 md:px-8 py-16 max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <section className="mb-24 relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Hello, I&apos;m{" "}
              <span className="text-red-600 relative">
                Vasjan Çupri
                <span className="absolute -z-10 inset-x-0 bottom-1 h-3 bg-red-600/20 blur-md"></span>
              </span>
            </h1>
            <p className="text-xl mb-10 text-zinc-300 leading-relaxed max-w-2xl">
              {siteConfig.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="group bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-sm transition-all duration-300 relative overflow-hidden flex items-center"
              >
                <span className="relative z-10">View Projects</span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
              <a
                href="#contact"
                className="group bg-transparent text-white font-medium py-3 px-6 border border-zinc-700 hover:border-red-600 rounded-sm transition-all duration-300 relative overflow-hidden flex items-center"
              >
                <span className="relative z-10">Get in Touch</span>
                <span className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="flex flex-wrap gap-4 justify-center">
            {Object.entries(siteConfig.links).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-zinc-900/80 backdrop-blur-sm hover:bg-zinc-800/80 px-5 py-2 rounded-sm text-sm font-medium transition-all duration-300 border border-zinc-800/50 hover:border-red-600 hover:shadow-[0_0_15px_rgba(220,38,38,0.15)] flex items-center"
              >
                {socialIcons[platform]}
                <span className="relative">
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section id="projects" className="mb-24 scroll-mt-24">
          <div className="relative">
            <h2 className="text-3xl font-bold mb-12 relative inline-block">
              Projects
              <svg
                className="absolute -bottom-3 left-0"
                width="120"
                height="25"
                viewBox="0 0 120 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 9.5C20 4.5 40 3.5 60.5 9.5C81 15.5 100 12.5 118 9.5"
                  stroke="#DC2626"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-80"
                />
              </svg>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteConfig.projects.map((project) => (
              <ProjectCard project={project} key={project.sourceCode} />
            ))}
          </div>
        </section>

        <section id="contact" className="mb-16 scroll-mt-24">
          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 p-8 md:p-12 text-center max-w-4xl mx-auto rounded-sm relative overflow-hidden group hover:border-red-600/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">
                Let&apos;s Build Something Together
              </h2>
              <p className="text-lg mb-8 max-w-lg mx-auto text-zinc-400">
                Need a custom web solution for your business? Let&apos;s discuss
                how I can help you meet your goals.
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="group bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-sm transition-all duration-300 inline-flex items-center relative overflow-hidden"
              >
                <span className="relative z-10">Contact Me</span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VasjanPortfolio;
