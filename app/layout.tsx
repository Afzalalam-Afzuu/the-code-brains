import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import LayoutShell from "../components/LayoutShell";
import { getNavDataFromDB } from "../lib/db-actions";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

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
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  other: {
    "impact-site-verification": "adcf51df-90d0-4fb9-9173-4cbd3f255d84",
    "google-site-verification": "k6g02O-cMXMyEGK6JH4s5v-9RwuDjR5344cbRYXJb00",
    "google-adsense-account": "ca-pub-3691889459537976",
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
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Google AdSense Auto Ads Script optimized with lazyOnload strategy */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3691889459537976"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        {/* Google AdSense Account Code */}
        <meta name="google-adsense-account" content="ca-pub-3691889459537976" />
        {/* Google Site Verification Code */}
        <meta name="google-site-verification" content="k6g02O-cMXMyEGK6JH4s5v-9RwuDjR5344cbRYXJb00" />
        {/* impact verify website code */}
        <meta name="impact-site-verification" content="adcf51df-90d0-4fb9-9173-4cbd3f255d84" />
        <meta name="theme-color" content="#2874f0" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="alternate" type="application/rss+xml" title="TheCodeBrains RSS Feed" href="/feed.xml" />

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