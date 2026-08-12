import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Split PDF File Online — Free PDF Page Extractor",
  description: "Split PDF pages into separate PDF files or extract specific page ranges online. 100% free and private browser PDF splitter.",
  keywords: ["split pdf", "extract pdf pages", "pdf splitter", "split pdf online", "separate pdf pages"],
  alternates: { canonical: `${siteUrl}/tools/split-pdf` },
  openGraph: { title: "📄 Split PDF File Online — TheCodeBrains", description: "Split PDF pages or extract page ranges inside your browser.", url: `${siteUrl}/tools/split-pdf`, type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Split PDF File",
    "url": `${siteUrl}/tools/split-pdf`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Split PDF pages or extract page ranges into separate PDF documents."
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
