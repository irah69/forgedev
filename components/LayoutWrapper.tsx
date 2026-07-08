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
    <div className="w-full overflow-x-hidden">
      {pathname !== "/" && <Navbar />}

      <main className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>

      <ConditionalFooter />
    </div>
  );
}