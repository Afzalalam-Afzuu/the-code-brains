import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodebrains.com";

export const metadata = {
  title: "Free Universal Unit Converter — Length, Weight, Temperature, Speed & Area",
  description: "Convert units of length, weight, temperature, speed, area, and volume instantly online. 100% accurate, fast, and free multi-unit converter.",
  keywords: ["unit converter", "length converter", "weight converter", "temperature converter", "speed converter"],
  alternates: {
    canonical: `${siteUrl}/tools/unit-converter`,
  },
  openGraph: {
    title: "📐 Universal Unit Converter — TheCodeBrains",
    description: "Convert measurements for length, weight, temperature, speed, area, and volume in real-time.",
    url: `${siteUrl}/tools/unit-converter`,
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Universal Unit Converter",
    "url": `${siteUrl}/tools/unit-converter`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Convert physical unit measurements across length, weight, temperature, speed, area, and volume online."
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
