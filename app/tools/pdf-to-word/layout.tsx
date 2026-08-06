import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodebrains.com";

export const metadata = {
  title: "Convert PDF to Word Online — Free PDF to DOCX Converter",
  description: "Convert PDF documents to editable Word DOCX files online. 100% free, fast, and private browser PDF to Word converter.",
  keywords: ["pdf to word", "convert pdf to docx", "pdf to word converter", "pdf to doc online", "free pdf to word"],
  alternates: { canonical: `${siteUrl}/tools/pdf-to-word` },
  openGraph: { title: "📄 Convert PDF to Word Online — TheCodeBrains", description: "Convert PDF documents to editable DOCX files.", url: `${siteUrl}/tools/pdf-to-word`, type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF to Word Converter",
    "url": `${siteUrl}/tools/pdf-to-word`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Convert PDF files into editable Microsoft Word DOCX documents."
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
