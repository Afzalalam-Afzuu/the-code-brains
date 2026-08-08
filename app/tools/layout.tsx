import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "15+ Free Online Web Tools — AI Chat, PDF Tools, Password Generator, QR & Calculators",
  description: "Explore 15+ free, client-side web tools. AI Chat Assistant, QR Generator, Image Compressor, Password Generator, Unit Converter, EMI & BMI Calculators.",
  alternates: {
    canonical: `${siteUrl}/tools`,
  },
  openGraph: {
    title: "⚡ 15+ Free Web Utilities & Developer Tools — TheCodeBrains",
    description: "100% free, fast, browser-side tools with zero data tracking.",
    url: `${siteUrl}/tools`,
    type: "website",
  },
};

export default function ToolsRootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "TheCodeBrains Web Tools Suite",
    "description": "Collection of free, client-side web utilities, calculators, developer formats, and AI assistants.",
    "url": `${siteUrl}/tools`,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "AI Chat Assistant", "url": `${siteUrl}/tools/ai-chat` },
      { "@type": "ListItem", "position": 2, "name": "Age & Milestone Calculator", "url": `${siteUrl}/tools/age-calculator` },
      { "@type": "ListItem", "position": 3, "name": "Custom QR Code Generator", "url": `${siteUrl}/tools/qr-generator` },
      { "@type": "ListItem", "position": 4, "name": "Browser Image Compressor", "url": `${siteUrl}/tools/image-compressor` },
      { "@type": "ListItem", "position": 5, "name": "Strong Password Generator", "url": `${siteUrl}/tools/password-generator` },
      { "@type": "ListItem", "position": 6, "name": "Word Counter & Text Tools", "url": `${siteUrl}/tools/text-tools` },
      { "@type": "ListItem", "position": 7, "name": "Universal Unit Converter", "url": `${siteUrl}/tools/unit-converter` },
      { "@type": "ListItem", "position": 8, "name": "Color Picker & Palette Generator", "url": `${siteUrl}/tools/color-palette` },
      { "@type": "ListItem", "position": 9, "name": "Loan EMI Calculator", "url": `${siteUrl}/tools/emi-calculator` },
      { "@type": "ListItem", "position": 10, "name": "BMI Health Calculator", "url": `${siteUrl}/tools/bmi-calculator` },
      { "@type": "ListItem", "position": 11, "name": "JSON Formatter & Validator", "url": `${siteUrl}/tools/json-formatter` },
      { "@type": "ListItem", "position": 12, "name": "Base64 Encoder / Decoder", "url": `${siteUrl}/tools/base64-converter` },
      { "@type": "ListItem", "position": 13, "name": "IP & Device Info Checker", "url": `${siteUrl}/tools/ip-checker` },
      { "@type": "ListItem", "position": 14, "name": "PDF Text Extractor & Inspector", "url": `${siteUrl}/tools/pdf-tools` },
      { "@type": "ListItem", "position": 15, "name": "Dummy JSON Generator", "url": `${siteUrl}/tools/dummy-json` }
    ]
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
