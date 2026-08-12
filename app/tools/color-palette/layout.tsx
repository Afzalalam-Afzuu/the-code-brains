import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Free Color Picker & Palette Generator — HEX, RGB, HSL Code Studio",
  description: "Pick colors, convert HEX, RGB, and HSL formats, and generate 5-color harmonious color palettes for modern web, graphic, and UI designs.",
  keywords: ["color picker", "color palette generator", "hex to rgb converter", "color scheme generator", "ui color picker"],
  alternates: {
    canonical: `${siteUrl}/tools/color-palette`,
  },
  openGraph: {
    title: "🎨 Color Picker & Palette Generator — TheCodeBrains",
    description: "Pick colors, convert formats, and generate harmonious design palettes.",
    url: `${siteUrl}/tools/color-palette`,
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Color Picker & Palette Generator",
    "url": `${siteUrl}/tools/color-palette`,
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Select colors, convert HEX/RGB/HSL color codes, and generate 5-color harmonious design palettes."
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
