import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { ProjectsSection } from "@/components/ProjectsSection";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "metadata" });

	return {
		metadataBase: new URL("https://v4sj4n.com"),
		title: t("title"),
		description: t("description"),
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
