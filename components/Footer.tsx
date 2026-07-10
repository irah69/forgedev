
import Link from 'next/link'

// Import generic icons from lucide-react

import { Playfair } from "next/font/google";
const playfair = Playfair({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
const links = [
    {
        title: 'Services',
        href: '/services',
    },
    {
        title: 'Work',
        href: '/work',
    },
    {
        title: 'About us',
        href: '/about',
    },
    {
        title: 'Process',
        href: '/process',
    },
    {
        title: 'Tech',
        href: '/tech',
    },
    {
        title: 'Contact',
        href: '/contact',
    },
]

export default function FooterSection() {
    return (
        <footer className="py-16 md:py-32">
          
            <div className="mx-auto max-w-5xl px-6">
              
                <div className="flex flex-col items-center text-center">
  <Link
    href="/"
    aria-label="Go Home"
    className="flex items-center gap-3"
  >
    <img
      src="/logo.png"
      alt="IRAH Logo"
      className="h-10 w-10 object-contain"
    />

<span
  className={`${playfair.className} text-4xl font-bold tracking-[0.25em] uppercase`}
>
  IRAH
</span>
  </Link>

  <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
    We craft digital solutions that are fast, scalable, and built to grow
    with your business. From idea to launch—and beyond.
  </p>
</div>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-muted-foreground hover:text-primary block duration-150">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
<div className="my-8 flex flex-wrap justify-center gap-6">
  {/* Instagram */}
  <Link
    href="https://instagram.com/irahtech"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="text-muted-foreground hover:text-primary transition-colors"
  >
    <svg viewBox="0 0 24 24" fill="currentColor"className="w-8 h-8">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
  </Link>

  {/* Email */}
  <Link
    href="mailto:irahtech69@gmail.com"
    aria-label="Email"
    className="text-muted-foreground hover:text-primary transition-colors"
  >
      <svg viewBox="0 0 24 24" fill="currentColor"className="w-8 h-8">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.907 1.528-1.148C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
  </Link>

  {/* Phone */}
  <Link
    href="tel:+919014497622"
    aria-label="Phone"
    className="text-muted-foreground hover:text-primary transition-colors"
  >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
  </Link>
</div>
                <span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} Irah Tech, All rights reserved</span>
            </div>
        </footer>
    )
}