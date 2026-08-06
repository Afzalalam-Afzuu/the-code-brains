import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodebrains.com";

export const metadata = {
  title: "Free JSON Formatter, Minifier & Validator Online — Developer Studio",
  description: "Format, prettify, minify, and validate JSON strings online. Real-time syntax error checking, custom indentations, and 1-click download.",
  keywords: ["json formatter", "json minifier", "json validator", "prettify json", "format json online"],
  alternates: {
    canonical: `${siteUrl}/tools/json-formatter`,
  },
  openGraph: {
    title: "💻 JSON Formatter & Validator — TheCodeBrains",
    description: "Format, prettify, minify, and validate JSON strings with real-time syntax checking.",
    url: `${siteUrl}/tools/json-formatter`,
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JSON Formatter & Validator",
    "url": `${siteUrl}/tools/json-formatter`,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Pretty print, minify, repair formatting, and validate JSON syntax online in real-time."
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
