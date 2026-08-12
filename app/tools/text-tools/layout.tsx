import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Free Word Counter & Case Converter — Text Formatting & Cleaning Utilities",
  description: "Count words, characters, and lines in real-time. Convert text cases (UPPER, lower, Title), remove duplicate lines, and clean extra whitespace.",
  keywords: ["word counter", "character counter", "text case converter", "remove duplicate lines", "clean extra spaces"],
  alternates: {
    canonical: `${siteUrl}/tools/text-tools`,
  },
  openGraph: {
    title: "📝 Word Counter & Text Utilities — TheCodeBrains",
    description: "Count words and characters, convert text cases, remove duplicate lines, and format text strings.",
    url: `${siteUrl}/tools/text-tools`,
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Word Counter & Text Converter",
    "url": `${siteUrl}/tools/text-tools`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Real-time word and character counter with text case conversion, duplicate line removal, and whitespace formatting."
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
