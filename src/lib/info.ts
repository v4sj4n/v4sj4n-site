import {
	EnvelopeSimple,
	GithubLogo,
	LinkedinLogo,
	XLogo,
} from "@phosphor-icons/react";

export const siteInfo = {
	projects: [
		{
			title: "Vaschat",
			description:
				"Chat with AI models using your own API key. No need for expensive monthly subscriptions anymore.",
			href: "https://github.com/v4sj4n/Vaschat",
			technologies: ["nextjs", "shadcn"],
		},

		{
			title: "Moments",
			description:
				"Connect with others and preserve shared memories in a dedicated space for your favorite groups.",
			href: "https://github.com/v4sj4n/Moments",
			technologies: ["nextjs", "supabase", "clerk"],
		},
		{
			title: "HR Software",
			description:
				"A platform to build professional websites effortlessly, no matter your design experience or technical background.",
			href: "https://github.com/v4sj4n/hr-software-FE-exypnos",
			technologies: [
				"react",
				"material-ui",
				"react-query",
				"react-hook-form",
				"nest-js",
				"mongodb",
			],
		},
	],
	contactLinks: [
		{
			title: "LinkedIn",
			href: "https://linkedin.com/in/v4sj4n",
			description: "Professional profile & network.",
			icon: LinkedinLogo,
		},
		{
			title: "GitHub",
			href: "https://github.com/v4sj4n",
			description: "All my code and projects.",
			icon: GithubLogo,
		},
		{
			title: "Email",
			href: "mailto:work@vasjan.com",
			description: "Direct to my inbox.",
			icon: EnvelopeSimple,
		},
		{
			title: "X (Twitter)",
			href: "https://x.com/v4sj4n",
			description: "Thoughts & updates.",
			icon: XLogo,
		},
	],
};
