"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  const hiddenRoutes = ["/about", "/contact"];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return <Footer />;
}