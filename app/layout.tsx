import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "TheCodeBrains — Upgrade Your Tech",
  description: "Independent tech reviews and buying advice.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "";
  const isPortfolio = pathname === "/portfolio" || pathname === "/portfolia";

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head />
      <body className="min-h-full flex flex-col bg-gray-50 font-sans">
        {!isPortfolio && <Navbar />}
        <main className="flex-1">{children}</main>
        {!isPortfolio && <Footer />}
      </body>
    </html>
  );
}