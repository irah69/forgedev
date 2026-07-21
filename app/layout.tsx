import type { Metadata, Viewport } from "next";
import LayoutClient from "@/components/LayoutClient";
import Footer from "@/components/Footer";
import MenuOverlay from "@/components/menu";
import {
  Geist,
  Geist_Mono,
  Cormorant_Garamond,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://irahtech.in"),

  title: {
    default: "IRAH TECH — Premium Web Development Studio",
    template: "%s | IRAH TECH",
  },

  description:
    "IRAH TECH crafts premium websites, web applications, digital experiences, and scalable business solutions using modern technologies like Next.js and React.",

  keywords: [
    "IRAH TECH",
    "Web Development",
    "Next.js",
    "React",
    "Frontend",
    "Full Stack",
    "Website Development",
    "Business Website",
    "Portfolio Website",
    "Landing Page",
    "SEO",
    "Hyderabad",
    "India",
  ],

  authors: [
    {
      name: "IRAH TECH",
      url: "https://irahtech.in",
    },
  ],

  creator: "IRAH TECH",
  publisher: "IRAH TECH",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "https://irahtech.in",
    siteName: "IRAH TECH",

    title: "IRAH TECH — Premium Web Development Studio",

    description:
      "Modern websites, scalable web applications, UI/UX design, maintenance, and digital solutions.",

    locale: "en_IN",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "IRAH TECH",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "IRAH TECH",

    description:
      "Premium websites, web applications, and digital solutions.",

    images: ["/logo.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],

    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],

    shortcut: "/favicon.ico",

    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
      },
    ],
  },

  manifest: "/site.webmanifest",

  applicationName: "IRAH TECH",

  appleWebApp: {
    capable: true,
    title: "IRAH TECH",
    statusBarStyle: "black-translucent",
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  other: {
    "google-site-verification": "YOUR_GOOGLE_VERIFICATION_CODE",

    "geo.region": "IN-TG",
    "geo.placename": "Hyderabad, Telangana",
    "geo.position": "17.4948;78.3996",
    ICBM: "17.4948,78.3996",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
    >
      <body className="min-h-screen bg-black text-white">
        <LayoutClient>
          <MenuOverlay />
          {children}
          <Footer  />
        </LayoutClient>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",

              name: "IRAH TECH",

              url: "https://irahtech.in",

              logo: "https://irahtech.in/logo.png",

              image: "https://irahtech.in/logo.png",

              description:
                "Premium web development studio building modern websites and digital experiences.",

              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                addressCountry: "IN",
              },

              geo: {
                "@type": "GeoCoordinates",
                latitude: 17.4948,
                longitude: 78.3996,
              },

              areaServed: "India",

              serviceType: [
                "Web Development",
                "UI/UX Design",
                "Website Maintenance",
                "SEO",
                "Next.js Development",
                "React Development",
              ],

              priceRange: "₹₹",

              sameAs: [
                // Add your social links here
                // "https://instagram.com/irahtech",
                // "https://linkedin.com/company/irahtech",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}