import type { Metadata } from "next";
import "./globals.css";
import LayoutShell from "../components/LayoutShell";
import { getNavDataFromDB } from "../lib/db-actions";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodebrains.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TheCodeBrains — India's Trusted Tech Reviews, Deals & Buying Advice",
    template: "%s | TheCodeBrains",
  },
  description:
    "Independent tech reviews, smartphone & laptop buying guides, price comparisons across Amazon & Flipkart, and verified discount coupons.",
  keywords: [
    "TheCodeBrains",
    "Tech Reviews India",
    "Best Phones 2026",
    "Best Laptops",
    "Amazon Deals India",
    "Flipkart Price Comparison",
    "Verified Coupon Codes",
    "OLED TV Buying Guide",
    "Gadget Reviews",
  ],
  authors: [{ name: "TheCodeBrains Team", url: siteUrl }],
  creator: "TheCodeBrains",
  publisher: "TheCodeBrains",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "TheCodeBrains — India's Trusted Tech Reviews & Deals Portal",
    description:
      "Find the best tech deals, honest gadget reviews, price comparisons between Amazon & Flipkart, and verified discount coupons.",
    siteName: "TheCodeBrains",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "TheCodeBrains Tech & Deals Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheCodeBrains — Upgrade Your Tech",
    description: "Independent tech reviews, multi-store price comparisons & verified coupons.",
    images: [`${siteUrl}/og-image.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
  other: {
    "impact-site-verification": "adcf51df-90d0-4fb9-9173-4cbd3f255d84",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = await getNavDataFromDB();

  // JSON-LD Structured Data Schema for Google Search Engine Optimization
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "TheCodeBrains",
        "description": "India's Trusted Tech Reviews & Deals Portal",
        "publisher": {
          "@id": `${siteUrl}/#organization`,
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "TheCodeBrains",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.png`,
        "sameAs": [
          "https://twitter.com/thecodebrains",
          "https://facebook.com/thecodebrains",
        ],
      },
    ],
  };

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* impact verify website code */}
        <meta name="impact-site-verification" content="adcf51df-90d0-4fb9-9173-4cbd3f255d84" />
        {/* @ts-ignore */}
        <meta name="impact-site-verification" value="adcf51df-90d0-4fb9-9173-4cbd3f255d84" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Google Search JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f1f3f6] font-sans">
        <LayoutShell navItems={navItems}>{children}</LayoutShell>
      </body>
    </html>
  );
}