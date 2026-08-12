import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Convert JPG to PDF Online — Free Image to PDF Converter",
  description: "Convert JPG, PNG, and WEBP images to PDF documents online. Fast, free, 100% private browser image to PDF converter.",
  keywords: ["jpg to pdf", "convert image to pdf", "png to pdf", "image to pdf converter", "jpg to pdf online"],
  alternates: { canonical: `${siteUrl}/tools/jpg-to-pdf` },
  openGraph: { title: "📄 Convert JPG to PDF Online — TheCodeBrains", description: "Convert JPG images to PDF documents in your browser.", url: `${siteUrl}/tools/jpg-to-pdf`, type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JPG to PDF Converter",
    "url": `${siteUrl}/tools/jpg-to-pdf`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Convert JPG, PNG, and WEBP image files to PDF documents."
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
