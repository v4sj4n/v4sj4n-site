import { routing, type Locale } from "@/i18n/routing";

const locales = new Set<string>(routing.locales);

function isLocale(value: string): value is Locale {
	return locales.has(value);
}

/** Map a BCP 47 tag like `it-IT` or `en_US` to a supported locale code. */
function languageFromTag(tag: string): string {
	return tag.toLowerCase().split(/[-_]/)[0];
}

export function resolveBrowserLocale(): Locale {
	if (typeof navigator === "undefined") {
		return routing.defaultLocale;
	}

	const candidates = navigator.languages?.length
		? [...navigator.languages]
		: navigator.language
			? [navigator.language]
			: [];

	for (const tag of candidates) {
		const language = languageFromTag(tag);
		if (isLocale(language)) {
			return language;
		}
	}

	return routing.defaultLocale;
}
