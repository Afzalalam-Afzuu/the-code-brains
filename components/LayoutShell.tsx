"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPortfolio =
    pathname?.startsWith("/portfolio") || pathname?.startsWith("/portfolia");

  return (
    <>
      {!isPortfolio && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isPortfolio && <Footer />}
    </>
  );
}
