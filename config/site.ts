export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vasjan Çupri - Developer Page",
  description:
    "I create intelligent, user-friendly web solutions that help small businesses automate, scale, and focus on what matters most.",

  navItems: [
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "About Me",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/v4sj4n",
    twitter: "https://x.com/v4sj4n",
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
