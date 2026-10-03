import type { Metadata, Viewport } from "next";
import { Rethink_Sans, Space_Mono } from "next/font/google";
import { AuraBackground } from "@/components/AuraBackground";
import "./globals.css";

export const metadata: Metadata = {
	icons: {
		icon: "/favicon.png",
		shortcut: "/favicon.png",
		apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#202124" },
	],
};

// OFL-licensed type: Rethink Sans (headings/body) + Space Mono (code).
// next/font self-hosts the files at build time — no runtime Google requests.
const rethinkSans = Rethink_Sans({
	subsets: ["latin", "latin-ext"],
	display: "swap",
	variable: "--font-rethink-sans",
});

const spaceMono = Space_Mono({
	weight: ["400", "700"],
	subsets: ["latin", "latin-ext"],
	display: "swap",
	variable: "--font-space-mono",
});

const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      if (!saved) localStorage.setItem("theme", "light");
    }
  } catch (e) {}
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
			className={`h-full antialiased ${rethinkSans.variable} ${spaceMono.variable}`}
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
