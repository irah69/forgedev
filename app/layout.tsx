import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // ✅ Prevents invisible text during font load (CLS fix)
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ✅ Viewport export is now SEPARATE from metadata (Next.js 14+ requirement)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  // ──────────────────────────────────────────────
  // BASE
  // ──────────────────────────────────────────────
  metadataBase: new URL("https://irahtech.in"),

  title: {
    default: "IRAH Web Development — Freelance Web Developer in Hyderabad",
    template: "%s | IRAH Web Development",
  },

  description:
    "IRAH is a freelance web development studio in Beeramguda, Hyderabad. We build fast, modern websites, digital wedding invitations, e-commerce stores, and SEO-optimised web apps with Next.js and React.",

  // ──────────────────────────────────────────────
  // KEYWORDS (still read by Bing, Yandex, etc.)
  // ──────────────────────────────────────────────
  keywords: [
    // ── Local SEO ──
    "web developer Hyderabad",
    "web developer Beeramguda",
    "freelance web developer Hyderabad",
    "website development Hyderabad",
    "web design Hyderabad",
    "web design Beeramguda",
    "web developer near me Hyderabad",
    "affordable web developer Hyderabad",
    "best web developer Hyderabad",
    "website designer Hyderabad",

    // ── Core Tech ──
    "Next.js developer India",
    "React developer Hyderabad",
    "React developer India",
    "full stack developer Hyderabad",
    "Node.js developer Hyderabad",
    "TypeScript developer India",
    "JavaScript developer Hyderabad",
    "custom web application development",
    "web app development India",
    "progressive web app development",

    // ── Business Websites ──
    "business website development Hyderabad",
    "startup website development India",
    "landing page design Hyderabad",
    "portfolio website development",
    "portfolio website Hyderabad",
    "blog website development India",
    "restaurant website design Hyderabad",
    "small business website Hyderabad",

    // ── E-commerce ──
    "ecommerce website development Hyderabad",
    "online store development India",
    "Shopify developer Hyderabad",
    "WooCommerce developer India",
    "ecommerce SEO Hyderabad",
    "product catalogue website India",

    // ── Digital Invitations ──
    "digital wedding invitations India",
    "animated wedding cards online",
    "online wedding invitation Hyderabad",
    "digital wedding card maker India",
    "e-invite for wedding India",
    "WhatsApp wedding invitation India",

    // ── SEO ──
    "SEO services Hyderabad",
    "local SEO Hyderabad",
    "technical SEO India",
    "on-page SEO services",
    "Google ranking services Hyderabad",
    "website speed optimisation India",

    // ── Maintenance & Support ──
    "website maintenance Hyderabad",
    "website redesign Hyderabad",
    "website revamp India",
  ],

  // ──────────────────────────────────────────────
  // AUTHORSHIP
  // ──────────────────────────────────────────────
  authors: [{ name: "IRAH Web Development", url: "https://irahtech.in" }],
  creator: "IRAH Web Development",
  publisher: "IRAH Web Development",

  // ──────────────────────────────────────────────
  // CANONICAL + ALTERNATES
  // ──────────────────────────────────────────────
  alternates: {
    canonical: "https://irahtech.in",
  },

  // ──────────────────────────────────────────────
  // ROBOTS
  // ──────────────────────────────────────────────
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

  // ──────────────────────────────────────────────
  // OPEN GRAPH
  // ──────────────────────────────────────────────
  openGraph: {
    type: "website",
    url: "https://irahtech.in",
    siteName: "IRAH Web Development",
    locale: "en_IN",
    title: "IRAH Web Development — Freelance Web Developer in Hyderabad",
    description:
      "Modern websites, digital wedding invitations, e-commerce & SEO from a freelance web developer in Beeramguda, Hyderabad.",
    images: [
      {
        url: "/og-image.png", // ⚠️ Replace with a 1200×630 PNG — SVGs don't render in OG previews
        width: 1200,
        height: 630,
        alt: "IRAH Web Development — Hyderabad",
        type: "image/png",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // TWITTER / X
  // ──────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@irahtech", // ✅ Add your Twitter/X handle if you have one
    creator: "@irahtech",
    title: "IRAH Web Development — Hyderabad Web Developer",
    description:
      "Websites, digital wedding cards, SEO & e-commerce solutions. Based in Beeramguda, Hyderabad.",
    images: ["/og-image.png"],
  },

  // ──────────────────────────────────────────────
  // ICONS  (use multiple sizes for best coverage)
  // ──────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png", // 180×180 PNG
    shortcut: "/favicon-32x32.ico",
  },

  // ──────────────────────────────────────────────
  // APP / PWA
  // ──────────────────────────────────────────────
  applicationName: "IRAH Web Development",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "IRAH Web Development",
  },
  formatDetection: {
    telephone: false, // Prevents iOS from auto-linking numbers as calls
  },

  // ──────────────────────────────────────────────
  // GEO + VERIFICATION
  // ──────────────────────────────────────────────
  other: {
    // Geo meta tags (helps local/map search on Bing & legacy crawlers)
    "geo.region": "IN-TG",
    "geo.placename": "Hyderabad, Telangana, India",
    "geo.position": "17.4948;78.3996",
    ICBM: "17.4948, 78.3996",

    // Site verifications
    "google-site-verification": "iU-QaAE_iPxSwG73I0oMyyk63yoq_Do5kcBslpiOxMI",
    // "msvalidate.01": "YOUR_BING_VERIFICATION_CODE", // ✅ Add Bing verification
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
        {/*
         * ✅ JSON-LD Structured Data — critical for Google rich results.
         *    This tells Google you're a LocalBusiness so you can appear
         *    in map packs, knowledge panels, and rich snippets.
         */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "IRAH Web Development",
              url: "https://irahtech.in",
              logo: "https://irahtech.in/logo.svg",
              image: "https://irahtech.in/og-image.png",
              description:
                "Freelance web development studio in Beeramguda, Hyderabad offering websites, digital wedding invitations, e-commerce, and SEO services.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Beeramguda",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                postalCode: "502032",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 17.4948,
                longitude: 78.3996,
              },
              areaServed: {
                "@type": "City",
                name: "Hyderabad",
              },
              serviceType: [
                "Web Development",
                "E-commerce Development",
                "SEO Optimization",
                "Digital Wedding Invitations",
              ],
              priceRange: "₹₹",
              sameAs: [
                // ✅ Add your social profile URLs here
                // "https://www.instagram.com/irahtech",
                // "https://www.linkedin.com/company/irahtech",
              ],
            }),
          }}
        />
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