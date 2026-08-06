import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodebrains.com";

export const metadata = {
  title: "Merge PDF Files Online — Free PDF Joiner Tool",
  description: "Combine multiple PDF files into one single PDF document online. Fast, free, 100% private client-side PDF merger.",
  keywords: ["merge pdf", "combine pdf files", "pdf joiner", "merge pdf online", "pdf merger free"],
  alternates: {
    canonical: `${siteUrl}/tools/merge-pdf`,
  },
  openGraph: {
    title: "📄 Merge PDF Files Online — TheCodeBrains",
    description: "Combine multiple PDF documents into a single PDF file with 100% browser privacy.",
    url: `${siteUrl}/tools/merge-pdf`,
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Merge PDF Files",
    "url": `${siteUrl}/tools/merge-pdf`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Combine multiple PDF documents into one single PDF file."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
