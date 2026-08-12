import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Free Age Calculator Online — Calculate Exact Age in Years, Months, Days & Hours",
  description: "Calculate your exact age in years, months, weeks, days, hours, and seconds. Discover your zodiac sign, birth day of the week, and upcoming birthday countdown. 100% private.",
  keywords: ["age calculator", "calculate exact age", "date of birth calculator", "birthday countdown", "zodiac sign finder"],
  alternates: {
    canonical: `${siteUrl}/tools/age-calculator`,
  },
  openGraph: {
    title: "🗓️ Free Age & Milestone Calculator — TheCodeBrains",
    description: "Calculate your exact age in years, months, days, total hours, and seconds with live birthday countdown.",
    url: `${siteUrl}/tools/age-calculator`,
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Age & Milestone Calculator",
    "url": `${siteUrl}/tools/age-calculator`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Calculate exact age from date of birth in years, months, days, hours, and seconds with zodiac sign detection and birthday countdown."
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
