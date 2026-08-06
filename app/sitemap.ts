import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://vasjan.com";

const LOCALES = [
	"en",
	"ar",
	"arc",
	"bg",
	"bn",
	"de",
	"el",
	"es",
	"fr",
	"he",
	"hi",
	"hr",
	"id",
	"is",
	"it",
	"ja",
	"ka",
	"ko",
	"nl",
	"no",
	"pl",
	"pt",
	"ro",
	"ru",
	"sq",
	"sr",
	"sv",
	"th",
	"tr",
	"uk",
	"ur",
	"vi",
	"zh",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	return LOCALES.map((locale) => {
		const alternates: Record<string, string> = {};
		for (const l of LOCALES) {
			alternates[l] = `${BASE_URL}/${l}/`;
		}

		return {
			url: `${BASE_URL}/${locale}/`,
			lastModified: now,
			changeFrequency: "monthly",
			priority: locale === "en" ? 1 : 0.8,
			alternates: {
				languages: alternates,
			},
		};
	});
}
