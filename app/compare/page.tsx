import { getAffiliateProductsFromDB } from "@/lib/db-actions";
import CompareClient from "./CompareClient";

export const metadata = {
  title: "Compare Products & Multi-Store Prices — TheCodeBrains",
  description: "Compare smartphones, laptops, TVs and tech gadgets side-by-side with live Amazon vs Flipkart prices and verified coupons.",
};

export const revalidate = 60;

export default async function ComparePage() {
  const products = await getAffiliateProductsFromDB();
  return <CompareClient products={products} />;
}
