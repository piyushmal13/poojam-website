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
  title: "Pooja Chandak — Elite ATS Resume Writer & Career Branding Expert",
  description:
    "Pooja Chandak is an elite ATS Resume Writer, Cover Letter Specialist, and LinkedIn Profile Optimizer with 13+ years of experience helping job seekers stand out and secure corporate shortlistings.",
  keywords: [
    "Pooja Chandak",
    "ATS Resume Writer",
    "Resume Writer Mumbai",
    "LinkedIn Profile Optimization",
    "Cover Letter Specialist",
    "Job Search Strategy",
    "SWOT Resume Analysis",
  ],
  authors: [{ name: "Pooja Chandak" }],
  openGraph: {
    title: "Pooja Chandak — Elite ATS Resume Writer & Career Branding Expert",
    description:
      "Transform your professional identity. Bypassing recruiter filters with highly targeted, keyword-optimized, and achievement-driven resumes by Pooja Chandak.",
    type: "website",
    locale: "en_US",
    siteName: "Pooja Chandak Career Advisory",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pooja Chandak — Elite ATS Resume Writer",
    description:
      "Transform your professional identity. Bypassing recruiter filters with keyword-optimized resumes by Pooja Chandak.",
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
