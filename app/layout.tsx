import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geologica = Geologica({
	variable: "--font-geologica",
	subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
	title: "Vasjan Çupri - Full-Stack Developer",
	description:
		"I develop efficient, scalable web solutions that empower businesses to streamline operations and achieve digital growth. Specializing in TypeScript, React, Next.js, and Node.js.",
	keywords: ["Full-Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Web Development", "Vasjan Çupri"],
	authors: [{ name: "Vasjan Çupri", url: "https://vasjan.com" }],
	creator: "Vasjan Çupri",
	metadataBase: new URL("https://vasjan.com"),
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: [
			{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
		],
		other: [
			{ rel: "android-chrome", url: "/icons/android-chrome-192x192.png", sizes: "192x192" },
			{ rel: "android-chrome", url: "/icons/android-chrome-512x512.png", sizes: "512x512" },
		],
	},
	manifest: "/icons/site.webmanifest",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://vasjan.com",
		siteName: "Vasjan Çupri",
		title: "Vasjan Çupri - Full-Stack Developer",
		description:
			"I develop efficient, scalable web solutions that empower businesses to streamline operations and achieve digital growth.",
		images: [
			{
				url: "/cover.png",
				width: 1200,
				height: 630,
				alt: "Vasjan Çupri - Full-Stack Developer",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Vasjan Çupri - Full-Stack Developer",
		description:
			"I develop efficient, scalable web solutions that empower businesses to streamline operations and achieve digital growth.",
		creator: "@v4sj4n",
		images: ["/cover.png"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geologica.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
						{children}
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
