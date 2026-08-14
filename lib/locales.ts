export interface Locale {
	code: string;
	name: string;
	nativeName: string;
	dir?: "ltr" | "rtl";
}

export const LOCALES: Locale[] = [
	// Priority / Featured locales
	{ code: "en", name: "English", nativeName: "English" },
	{ code: "sq", name: "Albanian", nativeName: "Shqip" },
	{ code: "de", name: "German", nativeName: "Deutsch" },
	{ code: "it", name: "Italian", nativeName: "Italiano" },
	{ code: "es", name: "Spanish", nativeName: "Español" },
	{ code: "fr", name: "French", nativeName: "Français" },
	{ code: "zh", name: "Chinese", nativeName: "中文" },

	// Alphabetical order
	{ code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl" },
	{ code: "arc", name: "Aramaic", nativeName: "ܐܪܡܝܐ", dir: "rtl" },
	{ code: "bn", name: "Bengali", nativeName: "বাংলা" },
	{ code: "bg", name: "Bulgarian", nativeName: "Български" },
	{ code: "hr", name: "Croatian", nativeName: "Hrvatski" },
	{ code: "nl", name: "Dutch", nativeName: "Nederlands" },
	{ code: "ka", name: "Georgian", nativeName: "ქართული" },
	{ code: "el", name: "Greek", nativeName: "Ελληνικά" },
	{ code: "he", name: "Hebrew", nativeName: "עברית", dir: "rtl" },
	{ code: "hi", name: "Hindi", nativeName: "हिन्दी" },
	{ code: "is", name: "Icelandic", nativeName: "Íslenska" },
	{ code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia" },
	{ code: "ja", name: "Japanese", nativeName: "日本語" },
	{ code: "ko", name: "Korean", nativeName: "한국어" },
	{ code: "no", name: "Norwegian", nativeName: "Norsk" },
	{ code: "pl", name: "Polish", nativeName: "Polski" },
	{ code: "pt", name: "Portuguese", nativeName: "Português" },
	{ code: "ro", name: "Romanian", nativeName: "Română" },
	{ code: "ru", name: "Russian", nativeName: "Русский" },
	{ code: "sr", name: "Serbian", nativeName: "Srpski" },
	{ code: "sv", name: "Swedish", nativeName: "Svenska" },
	{ code: "th", name: "Thai", nativeName: "ไทย" },
	{ code: "tr", name: "Turkish", nativeName: "Türkçe" },
	{ code: "uk", name: "Ukrainian", nativeName: "Українська" },
	{ code: "ur", name: "Urdu", nativeName: "اردو", dir: "rtl" },
	{ code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
];
