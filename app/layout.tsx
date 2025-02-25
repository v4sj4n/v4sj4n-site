import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vasjan Çupri - Developer Page",
  description:
    "I develop efficient, scalable web solutions that empower businesses to streamline operations and achieve digital growth.",
  openGraph: {
    images: [
      {
        url: "/cover.png",
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
      <body className={`${dmSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
