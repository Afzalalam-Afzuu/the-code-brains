import { getAffiliateProductsFromDB } from "@/lib/db-actions";
import CouponsClient from "./CouponsClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Verified Coupons & Promo Codes — TheCodeBrains",
  description: "Find active discount coupons and promo codes for Amazon, Flipkart, Udemy, and Hostinger to save extra money.",
  alternates: {
    canonical: `${siteUrl}/coupons`,
  },
  openGraph: {
    title: "Verified Coupons & Promo Codes — TheCodeBrains",
    description: "Find active discount coupons and promo codes for Amazon, Flipkart, Udemy, and Hostinger.",
    url: `${siteUrl}/coupons`,
    type: "website",
  },
};

export const revalidate = 60;

export default async function CouponsPage() {
  const products = await getAffiliateProductsFromDB();
  const couponProducts = products.filter((p) => p.couponCode);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "Verified Coupons & Promo Codes",
    "description": "Active promo codes for online shopping",
    "itemListElement": couponProducts.map((p, idx) => ({
      "@type": "Offer",
      "position": idx + 1,
      "name": p.title,
      "price": p.price,
      "priceCurrency": p.currency || "INR",
      "description": `Coupon code: ${p.couponCode}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CouponsClient products={products} />
    </>
  );
}

