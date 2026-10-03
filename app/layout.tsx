import type { Metadata, Viewport } from "next";
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
		<html lang="en" className="h-full antialiased" suppressHydrationWarning>
			<head>
				<meta name="apple-mobile-web-app-title" content="Vasjan" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital@0;1&display=swap"
					rel="stylesheet"
				/>
				<link
					// biome-ignore lint/suspicious/useGoogleFontDisplay: Google Symbols requires display=block per Antigravity brand skill
					href="https://fonts.googleapis.com/css2?family=Google+Symbols:opsz,wght,FILL,GRAD,ROND@20..48,100..700,0..1,-50..200,0..100&display=block"
					rel="stylesheet"
				/>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: static theme bootstrap to prevent flash */}
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<body className="flex min-h-full flex-col transition-colors duration-300">
				<AuraBackground>{children}</AuraBackground>
			</body>
		</html>
	);
}
