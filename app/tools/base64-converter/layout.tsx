import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodebrains.com";

export const metadata = {
  title: "Free Base64 Encoder & Decoder — Text & Image to Base64 Converter",
  description: "Encode text strings and images to Base64 data URLs or decode Base64 strings back to plain text instantly online. 100% free developer utility.",
  keywords: ["base64 encoder", "base64 decoder", "image to base64", "text to base64", "base64 string converter"],
  alternates: {
    canonical: `${siteUrl}/tools/base64-converter`,
  },
  openGraph: {
    title: "🔐 Base64 Encoder & Decoder — TheCodeBrains",
    description: "Encode raw text and images to Base64 data URLs or decode Base64 back to plain text.",
    url: `${siteUrl}/tools/base64-converter`,
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Base64 Encoder & Decoder",
    "url": `${siteUrl}/tools/base64-converter`,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Encode text strings and images to Base64 data URIs or decode Base64 payloads back to plain text online."
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
