import ProductCard from "../../components/ProductCard";
import { getAffiliateProductsFromDB } from "../../lib/db-actions";
import { Tag, ShoppingBag, ShieldCheck, Sparkles } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Verified Tech Deals Directory & Amazon Affiliate Picks | TheCodeBrains",
  description: "Browse curated Amazon and partner affiliate tech deals, discounts, and live verified prices.",
  alternates: {
    canonical: `${siteUrl}/browse`,
  },
  openGraph: {
    title: "Verified Tech Deals Directory — TheCodeBrains",
    description: "Browse curated Amazon and partner affiliate tech deals, discounts, and live verified prices.",
    url: `${siteUrl}/browse`,
    type: "website",
  },
};

export const revalidate = 0; // Fresh DB data on every request

export default async function BrowsePage() {
  const products = await getAffiliateProductsFromDB();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Verified Tech Deals & Products",
    "description": "Curated tech deals, discounts, and live verified prices.",
    "itemListElement": products.map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": p.title,
      "url": p.link || `${siteUrl}/browse`,
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 mb-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-xs uppercase tracking-widest mb-3">
            <Tag size={16} />
            <span>Affiliate Deals Directory</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            All Verified Tech Deals & Amazon Products
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Every product listed here is verified live by TheCodeBrains team. Clicking View Deal takes you directly to the verified merchant page with our affiliate tag.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-extrabold">
            <span className="bg-indigo-950 text-indigo-300 border border-indigo-800/60 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <Sparkles size={13} className="text-indigo-400" /> {products.length} Active Deals
            </span>
            <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-400" /> 100% Unbiased Selection
            </span>
          </div>
        </div>
      </div>

      {/* Affiliate Transparency Notice */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 mb-8 flex items-start gap-3 shadow-xs">
        <ShieldCheck size={20} className="text-indigo-600 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          <strong className="text-slate-900 uppercase tracking-wide">Editorial Disclosure:</strong> When you buy through links on our site, we may earn an affiliate commission at zero additional cost to you. This funds our independent lab testing.
        </p>
      </div>

      {/* Product Grid */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200/80">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#2874f0]" />
            Curated Products List ({products.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              currency={product.currency}
              link={product.link}
              image={product.image}
              merchant={product.merchant}
              rating={product.rating}
              couponCode={product.couponCode}
              stores={product.stores}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
