import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Free AI Bio Generator — Generate LinkedIn, Twitter & Instagram Bios",
  description: "Create engaging, professional, or funny social media bios for LinkedIn, Twitter (X), Instagram, and GitHub instantly using AI.",
  keywords: ["ai bio generator", "social media bio generator", "linkedin bio generator", "twitter bio generator", "instagram bio maker"],
  alternates: { canonical: `${siteUrl}/tools/ai-bio-generator` },
  openGraph: { title: "✨ Free AI Bio Generator — TheCodeBrains", description: "Generate attractive LinkedIn, Twitter, and Instagram bios in seconds.", url: `${siteUrl}/tools/ai-bio-generator`, type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Bio Generator",
    "url": `${siteUrl}/tools/ai-bio-generator`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Generate professional and creative bios for LinkedIn, Twitter, and Instagram using AI."
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
