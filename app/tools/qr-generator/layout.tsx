import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Free Custom QR Code Generator — Create High-Res QR Codes for URLs & WiFi",
  description: "Create custom QR codes for websites, WiFi networks, WhatsApp numbers, and text with custom colors, background fills, and instant HD PNG downloads. 100% free & private.",
  keywords: ["qr code generator", "create qr code online", "wifi qr code generator", "custom color qr code", "free qr maker"],
  alternates: {
    canonical: `${siteUrl}/tools/qr-generator`,
  },
  openGraph: {
    title: "📱 Custom QR Code Generator — TheCodeBrains",
    description: "Generate high-resolution QR codes with custom colors and instant PNG download. 100% private.",
    url: `${siteUrl}/tools/qr-generator`,
    siteName: "TheCodeBrains",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Free Custom QR Code Generator — TheCodeBrains",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "📱 Custom QR Code Generator — TheCodeBrains",
    description: "Generate high-resolution QR codes with custom colors and instant PNG download. 100% private.",
    images: [`${siteUrl}/images/og-image.png`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Custom QR Code Generator",
    "url": `${siteUrl}/tools/qr-generator`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Create high-resolution custom QR codes for URLs, WiFi passwords, and text with custom colors and instant PNG download."
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
