import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodebrains.com";

export const metadata = {
  title: "Compress PDF File Online — Reduce PDF File Size Free",
  description: "Reduce PDF document file size while optimizing quality directly inside your browser. 100% free, private PDF compression.",
  keywords: ["compress pdf", "reduce pdf size", "pdf compressor", "compress pdf online", "shrink pdf file"],
  alternates: { canonical: `${siteUrl}/tools/compress-pdf` },
  openGraph: { title: "📄 Compress PDF File Online — TheCodeBrains", description: "Reduce PDF size with zero server uploads.", url: `${siteUrl}/tools/compress-pdf`, type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Compress PDF File",
    "url": `${siteUrl}/tools/compress-pdf`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Reduce PDF file size online with zero server uploads."
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
