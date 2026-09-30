import type { Metadata } from "next";
import { Geologica, Merriweather } from "next/font/google";
import { AuraBackground } from "@/components/AuraBackground";
import "./globals.css";

export const metadata: Metadata = {
	icons: {
		icon: "/favicon.png",
		shortcut: "/favicon.png",
		apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
	},
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#faf9f1" },
		{ media: "(prefers-color-scheme: dark)", color: "#081410" },
	],
};

const geologica = Geologica({
	variable: "--font-geologica",
	subsets: ["latin"],
});

const merriweather = Merriweather({
	variable: "--font-merriweather",
	subsets: ["latin"],
	weight: ["400", "700", "900"],
});

const themeInitScript = `
(function () {
  var saved = localStorage.getItem("theme");
  if (saved === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
    if (!saved) localStorage.setItem("theme", "dark");
  }
})();
`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geologica.variable} ${merriweather.variable} dark h-full antialiased`}
			suppressHydrationWarning
		>
			<head>
				<meta name="apple-mobile-web-app-title" content="Vasjan" />
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: static theme bootstrap to prevent flash */}
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<body className="flex min-h-full flex-col transition-colors duration-300">
				<AuraBackground>{children}</AuraBackground>
			</body>
		</html>
	);
}
