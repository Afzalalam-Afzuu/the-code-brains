import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodebrains.com";

export const metadata = {
  title: "Free AI SQL Generator — Text to SQL Query Converter",
  description: "Convert plain English text into optimized SQL queries for PostgreSQL, MySQL, SQLite, and MS SQL Server instantly using AI.",
  keywords: ["ai sql generator", "text to sql converter", "sql query generator", "ai database query maker", "free sql generator"],
  alternates: { canonical: `${siteUrl}/tools/ai-sql-generator` },
  openGraph: { title: "💻 Free AI SQL Generator — TheCodeBrains", description: "Convert plain English instructions into complex SQL queries using AI.", url: `${siteUrl}/tools/ai-sql-generator`, type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI SQL Generator",
    "url": `${siteUrl}/tools/ai-sql-generator`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Convert plain English instructions into optimized SQL queries for PostgreSQL, MySQL, and SQLite."
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
