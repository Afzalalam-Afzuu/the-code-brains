import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Free AI Cover Letter Generator — Custom Job Application Letters",
  description: "Generate tailored, professional cover letters for job applications in seconds using AI. Free online browser-based AI cover letter writer.",
  keywords: ["ai cover letter generator", "ai cover letter writer", "job application cover letter", "resume cover letter maker", "free cover letter generator"],
  alternates: { canonical: `${siteUrl}/tools/ai-cover-letter-generator` },
  openGraph: { title: "📝 Free AI Cover Letter Generator — TheCodeBrains", description: "Generate custom cover letters for job applications using AI.", url: `${siteUrl}/tools/ai-cover-letter-generator`, type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Cover Letter Generator",
    "url": `${siteUrl}/tools/ai-cover-letter-generator`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Generate custom cover letters for job applications in seconds using AI."
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
