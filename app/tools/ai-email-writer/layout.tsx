import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodebrains.com";

export const metadata = {
  title: "Free AI Email Writer — Instant Professional Email Generator",
  description: "Generate professional, polite, persuasive, or formal emails instantly using AI. Free online browser-based AI email generator.",
  keywords: ["ai email writer", "ai email generator", "professional email writer", "ai cold email generator", "free email generator"],
  alternates: { canonical: `${siteUrl}/tools/ai-email-writer` },
  openGraph: { title: "✉️ Free AI Email Writer — TheCodeBrains", description: "Generate professional emails in seconds using AI.", url: `${siteUrl}/tools/ai-email-writer`, type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Email Writer",
    "url": `${siteUrl}/tools/ai-email-writer`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Generate professional, polite, formal, or sales emails in seconds using AI."
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
