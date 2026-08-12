import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Free Strong Password Generator — Generate Secure Random Passwords Online",
  description: "Generate cryptographically secure, random passwords with custom symbols, numbers, and strength indicators. 100% private & browser-based.",
  keywords: ["password generator", "strong password generator", "random password creator", "secure password tool"],
  alternates: {
    canonical: `${siteUrl}/tools/password-generator`,
  },
  openGraph: {
    title: "🔑 Free Strong Password Generator — TheCodeBrains",
    description: "Generate cryptographically secure passwords online with custom options. 100% private.",
    url: `${siteUrl}/tools/password-generator`,
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Strong Password Generator",
    "url": `${siteUrl}/tools/password-generator`,
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Generate cryptographically secure random passwords online with customizable character sets and strength meters."
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
