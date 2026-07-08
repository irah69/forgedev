"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import ConditionalFooter from "./ConditionalFooter";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/" && <Navbar />}

      <main className="flex-1">
        {children}
      </main>

      <ConditionalFooter />
    </>
  );
}