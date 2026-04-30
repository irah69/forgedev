'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Hide footer on services page
  if (pathname === '/services') {
    return null;
  }

  return <Footer />;
}
