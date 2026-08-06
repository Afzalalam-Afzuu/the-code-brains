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
    title: "🔥 TheCodeBrains — India's #1 Tech Reviews, Price Comparison & Deals Portal",
    description:
      "⚡ Never overpay for gadgets! Compare live prices on Amazon & Flipkart, read 100% independent buying guides, and unlock verified discount promo codes.",
    siteName: "TheCodeBrains",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "TheCodeBrains — India's #1 Tech Reviews & Deals Portal",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "🔥 TheCodeBrains — India's #1 Tech Reviews & Price Comparison",
    description: "Never overpay! Compare live prices on Amazon & Flipkart, read independent guides & unlock verified promo codes.",
    images: [`${siteUrl}/images/og-image.png`],
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": `${siteUrl}/feed.xml`,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
        "logo": `${siteUrl}/favicon.svg`,
        "sameAs": [
          "https://twitter.com/thecodebrains",
          "https://facebook.com/thecodebrains",
        ],
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${siteUrl}/#navigation`,
        "name": "Main Navigation",
        "url": siteUrl,
      },
    ],
  };

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* impact verify website code */}
        <meta name="impact-site-verification" content="adcf51df-90d0-4fb9-9173-4cbd3f255d84" />
        <meta name="theme-color" content="#2874f0" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="alternate" type="application/rss+xml" title="TheCodeBrains RSS Feed" href="/feed.xml" />

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