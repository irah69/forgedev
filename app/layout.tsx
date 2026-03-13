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
  metadataBase: new URL("https://irah.dev"), // change to your real domain

  title: {
    default: "IRAH Web Development | Modern Websites & Digital Solutions",
    template: "%s | IRAH Web Development",
  },

  description:
    "IRAH is a freelance web development studio creating high-performance websites, scalable web applications, e-commerce stores, and SEO-optimized platforms using modern technologies like Next.js and React.",

  keywords: [
    "web development services",
    "freelance web developer",
    "Next.js developer",
    "React developer",
    "ecommerce website development",
    "Shopify development",
    "SEO optimization services",
    "technical SEO",
    "website maintenance",
    "custom web applications",
  ],

  authors: [{ name: "IRAH Web Development" }],
  creator: "IRAH",
  publisher: "IRAH",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/logo.svg",
  },

  openGraph: {
    title: "IRAH Web Development | Websites, E-Commerce & SEO",
    description:
      "Freelance web development studio building fast websites, scalable web apps, e-commerce platforms, and SEO-optimized digital products.",
    url: "https://irah.dev",
    siteName: "IRAH Web Development",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "IRAH Web Development",
    description:
      "Modern websites, scalable web apps, e-commerce solutions, SEO optimization, and website maintenance services.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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