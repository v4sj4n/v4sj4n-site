import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
			},
			{
				userAgent: "GPTBot",
				allow: "/",
			},
			{
				userAgent: "ClaudeBot",
				allow: "/",
			},
			{
				userAgent: "Google-Extended",
				allow: "/",
			},
			{
				userAgent: "CCBot",
				allow: "/",
			},
		],
		sitemap: "https://vasjan.com/sitemap.xml",
		host: "https://vasjan.com",
	};
}
