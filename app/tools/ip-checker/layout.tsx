import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodebrains.com";

export const metadata = {
  title: "Free IP Address & Device Info Checker — Check Public IP, ISP & Screen Specs",
  description: "Check your public IP address, ISP provider, country location, operating system, screen resolution, and user agent string instantly.",
  keywords: ["what is my ip", "ip address checker", "my ip location", "user agent checker", "device resolution test"],
  alternates: {
    canonical: `${siteUrl}/tools/ip-checker`,
  },
  openGraph: {
    title: "🌐 IP Address & Device Info Checker — TheCodeBrains",
    description: "View your public IP address, location, network ISP, OS, and screen specifications.",
    url: `${siteUrl}/tools/ip-checker`,
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "IP Address & Device Info Checker",
    "url": `${siteUrl}/tools/ip-checker`,
    "applicationCategory": "NetworkApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Inspect public IP address, ISP network provider, geographical location, operating platform, and browser user agent."
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
