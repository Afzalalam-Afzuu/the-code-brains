import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "../components/LayoutShell";
import { getNavDataFromDB } from "../lib/db-actions";

export const metadata: Metadata = {
  title: "TheCodeBrains — Upgrade Your Tech",
  description: "Independent tech reviews and buying advice.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = await getNavDataFromDB();

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f1f3f6] font-sans">
        <LayoutShell navItems={navItems}>{children}</LayoutShell>
      </body>
    </html>
  );
}