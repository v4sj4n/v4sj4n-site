import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/non-atomic-ui/navbar";

const geologica = Geologica({
	variable: "--font-geologica",
	subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
	title: "Vasjan Çupri - Developer Page",
	description:
		"I develop efficient, scalable web solutions that empower businesses to streamline operations and achieve digital growth.",
	openGraph: {
		images: [
			{
				url: "https://vasjan.com/cover.png",
				width: 200,
				height: 200,
				alt: "Vasjan Çupri - Developer Page",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geologica.variable} antialiased`}
				suppressHydrationWarning
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Navbar />
					<div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
						{children}
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
