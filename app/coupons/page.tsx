import { getAffiliateProductsFromDB } from "@/lib/db-actions";
import CouponsClient from "./CouponsClient";

export const metadata = {
  title: "Verified Coupons & Promo Codes — TheCodeBrains",
  description: "Find active discount coupons and promo codes for Amazon, Flipkart, Udemy, and Hostinger to save extra money.",
};

export const revalidate = 60;

export default async function CouponsPage() {
  const products = await getAffiliateProductsFromDB();
  return <CouponsClient products={products} />;
}
