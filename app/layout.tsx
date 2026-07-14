import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "TheCodeBrains — Upgrade Your Tech",
  description: "Independent tech reviews and buying advice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* In-Page Push Ad Code */}
        <Script
          src="https://nap5k.com/tag.min.js"
          data-zone="11284781"
          data-cfasync="false"
          strategy="afterInteractive"
        />

        {/* Vignette Banner Ad */}
        <Script
          src="https://n6wxm.com/vignette.min.js"
          data-zone="11285105"
          data-cfasync="false"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}