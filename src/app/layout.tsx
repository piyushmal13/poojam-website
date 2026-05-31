import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
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
  title: "Pooja Malpani — Executive Career Strategist",
  description:
    "India's trusted Executive Career Strategist. ATS-optimized resumes, LinkedIn overhauls, and interview positioning that gets mid-senior professionals shortlisted faster. 13+ years. 500+ careers transformed. 5.0★ rated.",
  keywords: [
    "Pooja Malpani",
    "Executive Career Strategist",
    "ATS Resume Optimization India",
    "LinkedIn Profile Optimization",
    "Career Coach Mumbai",
    "Resume Writer India",
    "Interview Preparation",
    "Career Transition Strategy",
    "Executive Positioning Consultant",
    "Personal Brand Architect",
    "ATS Optimization Expert",
    "Job Search Strategy India",
  ],
  authors: [{ name: "Pooja Malpani" }],
  openGraph: {
    title: "Pooja Malpani — Executive Career Strategist",
    description:
      "Stop being invisible to recruiters. ATS-optimized resumes, LinkedIn overhauls, and career positioning by India's most trusted Executive Career Strategist.",
    type: "website",
    locale: "en_IN",
    siteName: "PM Executive Strategy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pooja Malpani — Executive Career Strategist",
    description:
      "Stop being invisible. ATS resumes & LinkedIn optimization by Pooja Malpani.",
  },
  robots: { index: true, follow: true },
};

import { LenisProvider } from "@/providers/LenisProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030512]">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
