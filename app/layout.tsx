import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import "./globals.css";

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
      <body className={`${geologica.variable} antialiased`}>{children}</body>
    </html>
  );
}
