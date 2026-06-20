import type { Metadata } from "next";
import { Fraunces, Geologica } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
	icons: {
		icon: "/favicon.png",
		shortcut: "/favicon.png",
		apple: "/favicon.png",
	},
};

const geologica = Geologica({
	variable: "--font-geologica",
	subsets: ["latin"],
});

const fraunces = Fraunces({
	variable: "--font-fraunces",
	subsets: ["latin"],
	weight: ["400"],
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
			className={`${geologica.variable} ${fraunces.variable} dark h-full antialiased`}
			suppressHydrationWarning
		>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: static theme bootstrap to prevent flash */}
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<body className="flex min-h-full flex-col transition-colors duration-300">
				{children}
			</body>
		</html>
	);
}
