import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodebrains.com";

export const metadata = {
  title: "Free PDF Text Extractor & Document Inspector — Browser PDF Tools",
  description: "Extract raw text from PDF documents, inspect metadata, page counts, and export text files directly inside your browser. 100% private.",
  keywords: ["pdf text extractor", "extract text from pdf", "pdf page count inspector", "read pdf text online", "pdf tools"],
  alternates: {
    canonical: `${siteUrl}/tools/pdf-tools`,
  },
  openGraph: {
    title: "📄 PDF Text Extractor & Inspector — TheCodeBrains",
    description: "Extract raw text from PDF documents and inspect page counts inside your browser.",
    url: `${siteUrl}/tools/pdf-tools`,
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF Text Extractor & Inspector",
    "url": `${siteUrl}/tools/pdf-tools`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Browser-based PDF text extraction, document page count inspection, and raw text export."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
