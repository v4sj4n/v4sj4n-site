import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ProjectsSection } from "@/components/ProjectsSection";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://v4sj4n.com";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "metadata" });
	const title = t("title");
	const description = t("description");

	return {
		metadataBase: new URL(SITE_URL),
		title,
		description,
		openGraph: {
			title,
			description,
			url: `/${locale}/`,
			siteName: "Vasjan Çupri",
			locale,
			alternateLocale: routing.locales.filter((l) => l !== locale),
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
		},
		alternates: {
			canonical: `/${locale}/`,
			languages: {
				...Object.fromEntries(routing.locales.map((l) => [l, `/${l}/`])),
				"x-default": "/en/",
			},
		},
	};
}

export default async function HomePage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<>
			<Navbar />
			<main>
				<HeroSection />
				<ProjectsSection />
				<ContactSection />
			</main>
			<Footer />
		</>
	);
}
