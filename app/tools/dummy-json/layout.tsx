import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Free Dummy JSON Generator — Generate Mock Data for APIs & Prototyping",
  description: "Generate realistic mock JSON datasets for users, e-commerce products, and blog posts. Perfect for frontend prototyping, API testing, and database seeders.",
  keywords: ["dummy json generator", "mock json data", "fake json api", "generate sample json", "mock data generator"],
  alternates: {
    canonical: `${siteUrl}/tools/dummy-json`,
  },
  openGraph: {
    title: "🗄️ Dummy JSON Generator — TheCodeBrains",
    description: "Generate mock JSON data arrays for users, products, and blogs in 1-click.",
    url: `${siteUrl}/tools/dummy-json`,
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Dummy JSON Generator",
    "url": `${siteUrl}/tools/dummy-json`,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Generate mock JSON datasets for users, products, and tech articles to test frontend applications and APIs."
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
