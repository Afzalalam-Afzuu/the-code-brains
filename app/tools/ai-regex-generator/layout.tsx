import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Free AI Regex Generator — Regular Expression Pattern Maker",
  description: "Generate complex regular expressions (Regex) from English descriptions instantly using AI. Includes detailed breakdown and example test matches.",
  keywords: ["ai regex generator", "regular expression maker", "text to regex generator", "regex builder", "free regex generator"],
  alternates: { canonical: `${siteUrl}/tools/ai-regex-generator` },
  openGraph: { title: "⚡ Free AI Regex Generator — TheCodeBrains", description: "Convert text descriptions into regular expressions with explanations.", url: `${siteUrl}/tools/ai-regex-generator`, type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Regex Generator",
    "url": `${siteUrl}/tools/ai-regex-generator`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Convert English descriptions into regular expressions with detailed explanations."
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
