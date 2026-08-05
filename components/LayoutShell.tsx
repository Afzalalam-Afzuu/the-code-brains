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
  const isCustomLayoutPage =
    pathname?.startsWith("/portfolio") ||
    pathname?.startsWith("/portfolia") ||
    pathname?.startsWith("/tools");

  return (
    <>
      {!isCustomLayoutPage && <Navbar navItems={navItems} />}
      <main className="flex-1">{children}</main>
      {!isCustomLayoutPage && <AIChatAssistant />}
      {!isCustomLayoutPage && <Footer />}
    </>
  );
}
