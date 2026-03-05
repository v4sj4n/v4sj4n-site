import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
	return (
		<div className="min-h-screen font-sans bg-background text-foreground transition-colors duration-500">
			<Navbar />

			<main>
				<HeroSection />
				<ProjectsSection />
				<ContactSection />
			</main>

			<Footer />
		</div>
	);
}
