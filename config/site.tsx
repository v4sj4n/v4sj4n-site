import {
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
  Envelope, Code, Browsers
} from "@phosphor-icons/react/dist/ssr";

export const siteConfig = {
  name: "Vasjan Çupri - Developer Page",
  description:
    "I develop efficient, scalable web solutions that empower businesses to streamline operations and achieve digital growth.",
  navItems: [
    {
      label: "Projects",
      href: "#projects",
      icon: <Code weight="bold" size={18} />,
    },
    {
      label: "Contact",
      href: "#contact",
      icon: <Envelope weight="bold" size={18} />,
    },
    {
      label: "About Me",
      href: "#about",
      icon: <Browsers weight="bold" size={18} />,
    },
  ],
  links: {
    github: "https://github.com/v4sj4n",
    x: "https://x.com/v4sj4n",
    linkedin: "https://linkedin.com/in/v4sj4n",
  },
  email: "work@vasjan.com",
  projects: [
    {
      title: "Vaschat",
      description:
        "Chat with AI models using your own API key. No need for expensive monthly subscriptions anymore.",
      sourceCode: "https://github.com/v4sj4n/Vaschat",
      technologies: ["nextjs", "shadcn"],
    },
    {
      title: "HR Software",
      description:
        "A platform to build professional websites effortlessly, no matter your design experience or technical background.",
      sourceCode: "https://github.com/v4sj4n/hr-software-FE-exypnos",
      technologies: [
        "react",
        "material-ui",
        "react-query",
        "react-hook-form",
        "nest-js",
        "mongodb",
      ],
    },
    {
      title: "Moments",
      description:
        "Connect with others and preserve shared memories in a dedicated space for your favorite groups.",
      sourceCode: "https://github.com/v4sj4n/Moments",
      technologies: ["nextjs", "supabase", "clerk"],
    },
  ],
};

export const socialIcons: { [key: string]: React.ReactNode } = {
  github: <GithubLogo weight="fill" className="mr-2" size={18} />,
  x: <TwitterLogo weight="fill" className="mr-2" size={18} />,
  linkedin: <LinkedinLogo weight="fill" className="mr-2" size={18} />,
};
