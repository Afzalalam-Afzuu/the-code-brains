import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodebrains.com";

export const metadata = {
  title: "Free Browser Image Compressor — Reduce JPG, PNG & WEBP File Size Online",
  description: "Compress JPG, PNG, and WEBP images online directly inside your browser with zero quality loss. 100% private, fast, and no server uploads.",
  keywords: ["image compressor", "compress image online", "reduce image size", "png compressor", "jpg size reducer"],
  alternates: {
    canonical: `${siteUrl}/tools/image-compressor`,
  },
  openGraph: {
    title: "🖼️ Browser Image Compressor — TheCodeBrains",
    description: "Compress images online with zero server uploads and live quality controls. 100% private.",
    url: `${siteUrl}/tools/image-compressor`,
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Browser Image Compressor",
    "url": `${siteUrl}/tools/image-compressor`,
    "applicationCategory": "GraphicsApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Compress JPG, PNG, and WEBP image file sizes directly inside your web browser with zero server uploads and real-time comparison."
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
