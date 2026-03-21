import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://irahtech.in"),

  title: {
    default:
      "IRAH Web Development | Web Developer in Beeramguda, Hyderabad",
    template: "%s | IRAH Web Development",
  },

  description:
    "IRAH is a freelance web development studio based in Beeramguda, Hyderabad offering modern websites, digital wedding invitations, e-commerce stores, SEO optimization, and scalable web applications using Next.js and React.",

  keywords: [
    // Core Services
    "web development services",
    "freelance web developer",
    "Next.js developer",
    "React developer",
    "custom web applications",

    // Local SEO (VERY IMPORTANT)
    "web developer in Beeramguda",
    "web developer in Hyderabad",
    "website development in Hyderabad",
    "freelance web developer Hyderabad",
    "web design Beeramguda",

    // Business Services
    "ecommerce website development",
    "Shopify development",
    "SEO optimization services",
    "technical SEO",
    "website maintenance",

    // Niche Keywords (HIGH CONVERSION)
    "digital wedding cards",
    "online wedding invitations India",
    "animated wedding invitations",
    "custom digital invites",
  ],

  authors: [{ name: "IRAH Web Development" }],
  creator: "IRAH",
  publisher: "IRAH",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 🔥 GEO SEO (Helps local ranking)
  other: {
    "geo.region": "IN-TG",
    "geo.placename": "Hyderabad",
    "geo.position": "17.4948;78.3996",
    "ICBM": "17.4948, 78.3996",
  },

  icons: {
    icon: "/logo.svg",
  },

  openGraph: {
    title:
      "Web Developer in Beeramguda, Hyderabad | IRAH Web Development",
    description:
      "Get modern websites, digital wedding cards, e-commerce solutions, and SEO services from a freelance web developer in Hyderabad.",
    url: "https://irahtech.in",
    siteName: "IRAH Web Development",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "IRAH Web Development Hyderabad",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "IRAH Web Development | Hyderabad Web Developer",
    description:
      "Web development, digital wedding cards, SEO & e-commerce solutions in Hyderabad.",
    images: ["/logo.svg"],
  },

  // 🔥 Canonical (VERY IMPORTANT)
  alternates: {
    canonical: "https://irahtech.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <head>
        <meta name="google-site-verification" content="iU-QaAE_iPxSwG73I0oMyyk63yoq_Do5kcBslpiOxMI" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}