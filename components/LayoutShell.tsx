"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AIChatAssistant from "./AIChatAssistant";
import { NavItem } from "../lib/nav-data";

export default function LayoutShell({
  children,
  navItems,
}: {
  children: React.ReactNode;
  navItems?: NavItem[];
}) {
  const pathname = usePathname();
  const isPortfolio =
    pathname?.startsWith("/portfolio") || pathname?.startsWith("/portfolia");

  return (
    <>
      {!isPortfolio && <Navbar navItems={navItems} />}
      <main className="flex-1">{children}</main>
      {!isPortfolio && <AIChatAssistant />}
      {!isPortfolio && <Footer />}
    </>
  );
}
