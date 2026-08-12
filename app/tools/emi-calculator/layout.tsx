import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Free Loan EMI Calculator — Calculate Monthly EMI & Interest Breakup",
  description: "Calculate your monthly home, car, or personal loan EMIs, total interest payable, and overall loan repayment schedule online.",
  keywords: ["emi calculator", "loan emi calculator", "home loan emi", "car loan emi calculator", "interest calculator"],
  alternates: {
    canonical: `${siteUrl}/tools/emi-calculator`,
  },
  openGraph: {
    title: "💰 Loan EMI & Interest Calculator — TheCodeBrains",
    description: "Calculate monthly loan EMIs, interest payable, and total loan repayment breakdown.",
    url: `${siteUrl}/tools/emi-calculator`,
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Loan EMI & Interest Calculator",
    "url": `${siteUrl}/tools/emi-calculator`,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Calculate monthly loan EMIs, total interest payable, and payment breakdowns for home, car, and personal loans."
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
