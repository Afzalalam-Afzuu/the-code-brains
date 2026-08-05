import { getAffiliateProductsFromDB } from "@/lib/db-actions";
import CompareClient from "./CompareClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodebrains.com";

export const metadata = {
  title: "Compare Products & Multi-Store Prices — TheCodeBrains",
  description: "Compare smartphones, laptops, TVs and tech gadgets side-by-side with live Amazon vs Flipkart prices and verified coupons.",
  alternates: {
    canonical: `${siteUrl}/compare`,
  },
  openGraph: {
    title: "Compare Products & Multi-Store Prices — TheCodeBrains",
    description: "Compare smartphones, laptops, TVs and tech gadgets side-by-side with live Amazon vs Flipkart prices.",
    url: `${siteUrl}/compare`,
    type: "website",
  },
};

export const revalidate = 60;

export default async function ComparePage() {
  const products = await getAffiliateProductsFromDB();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Side-by-Side Product Comparison",
    "description": "Compare gadget specifications and multi-store prices across Amazon India and Flipkart.",
    "url": `${siteUrl}/compare`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CompareClient products={products} />
    </>
  );
}

