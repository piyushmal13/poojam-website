import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pooja Malpani — Executive Technology Advisor & CTO Specialist",
  description:
    "Pooja Malpani is a veteran product engineering champion and corporate tech advisor. Providing executive architecture audits, team scaling strategies, and system modernization consulting for enterprise-level operations.",
  keywords: [
    "Pooja Malpani",
    "CTO Advisor",
    "Technology Consultant",
    "Enterprise Architecture",
    "Executive Engineering",
    "System Modernization",
    "Tech Due Diligence",
  ],
  authors: [{ name: "Pooja Malpani" }],
  openGraph: {
    title: "Pooja Malpani — Executive Technology Advisor & CTO Specialist",
    description:
      "Veteran product engineering champion providing board-level architecture audits, engineering team scaling, and enterprise system modernization.",
    type: "website",
    locale: "en_US",
    siteName: "Pooja Malpani Advisory",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pooja Malpani — Executive Technology Advisor",
    description:
      "Board-level tech specialist providing architecture audits, team scaling, and system modernization for enterprise operations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
