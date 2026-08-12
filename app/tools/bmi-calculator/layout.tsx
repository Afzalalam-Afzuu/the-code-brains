import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Free Body Mass Index (BMI) Calculator — Check Health & Ideal Weight Range",
  description: "Calculate your BMI score, health category status, and recommended ideal weight range online. Fast, private, and accurate.",
  keywords: ["bmi calculator", "body mass index calculator", "ideal weight range", "health bmi calculator", "calculate bmi online"],
  alternates: {
    canonical: `${siteUrl}/tools/bmi-calculator`,
  },
  openGraph: {
    title: "⚖️ Body Mass Index (BMI) Calculator — TheCodeBrains",
    description: "Calculate your BMI score, health category status, and ideal weight range instantly.",
    url: `${siteUrl}/tools/bmi-calculator`,
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Body Mass Index (BMI) Calculator",
    "url": `${siteUrl}/tools/bmi-calculator`,
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Calculate Body Mass Index (BMI) score, health status category, and ideal weight range based on height and weight."
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
