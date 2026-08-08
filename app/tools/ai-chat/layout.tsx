import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Free AI Chat Assistant & Code Solver — Ask Technical Questions Online",
  description: "Ask coding questions, generate code snippets, debug errors, and brainstorm technical ideas in real-time with AI assistant intelligence.",
  keywords: ["ai chat tool", "ai coding assistant", "free ai chatbot", "code solver ai", "debug code with ai"],
  alternates: {
    canonical: `${siteUrl}/tools/ai-chat`,
  },
  openGraph: {
    title: "🤖 Free AI Chat Assistant & Code Solver — TheCodeBrains",
    description: "Ask technical questions, debug errors, and generate code snippets with AI intelligence.",
    url: `${siteUrl}/tools/ai-chat`,
    siteName: "TheCodeBrains",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Free AI Chat Assistant & Code Solver — TheCodeBrains",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "🤖 Free AI Chat Assistant & Code Solver — TheCodeBrains",
    description: "Ask technical questions, debug errors, and generate code snippets with AI intelligence.",
    images: [`${siteUrl}/images/og-image.png`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Chat Assistant & Code Solver",
    "url": `${siteUrl}/tools/ai-chat`,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Interactive AI Assistant for writing code, debugging syntax errors, and explaining complex technical topics."
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
