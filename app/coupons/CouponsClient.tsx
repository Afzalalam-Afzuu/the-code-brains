"use client";

import React, { useState } from "react";
import { Tag, Copy, Check, ExternalLink, Search, Sparkles, Zap, ShieldCheck, ShoppingCart } from "lucide-react";
import { AffiliateItem, autoFormatAffiliateLink } from "@/lib/affiliate-links";

interface CouponsClientProps {
  products: AffiliateItem[];
}

export default function CouponsClient({ products }: CouponsClientProps) {
  const [search, setSearch] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Extract products with coupons + pre-built store coupons
  const productCoupons = products.filter((p) => Boolean(p.couponCode));

  // Additional curated partner promo codes
  const partnerCoupons = [
    {
      id: "udemy-tech2026",
      title: "Udemy Web Development & AI Masterclass",
      merchant: "Udemy",
      couponCode: "DEVCLASS2026",
      discount: "85% OFF",
      link: "https://www.udemy.com/?couponCode=DEVCLASS2026",
      description: "Get 85% discount on top rated python, react, and web dev courses.",
      category: "Learning",
    },
    {
      id: "amazon-[#humidity]",
      title: "ROSEKM Ultrasonic Cool Mist Humidifier",
      merchant: "Amazon",
      couponCode: "HUMID100",
      discount: "FLAT ₹100 OFF",
      link: "https://www.amazon.in/dp/B0F31ZQD1H?tag=thecodebrains-21",
      description: "Extra ₹100 instant checkout coupon on Amazon India.",
      category: "Smart Home",
    },
    {
      id: "hostinger-plus",
      title: "Hostinger Cloud & VPS Web Hosting",
      merchant: "Hostinger",
      couponCode: "CODEBRAINS10",
      discount: "EXTRA 10% OFF",
      link: "https://www.hostinger.in/?REFERRALCODE=thecodebrains",
      description: "Extra 10% discount on 4-year premium hosting plans with free domain.",
      category: "Hosting & Tools",
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const filteredProducts = productCoupons.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.couponCode?.toLowerCase().includes(search.toLowerCase()) ||
      p.merchant?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6 px-4">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="bg-white text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 w-fit">
            <Zap size={12} className="fill-slate-950" /> 100% Verified Promos & Coupons
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Verified Discount Coupons & Promo Codes
          </h1>
          <p className="text-xs sm:text-sm text-orange-100 font-medium">
            Save extra money on Amazon, Flipkart, Udemy, and Tech Brands. Copy your promo code with 1-click and redeem at checkout!
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
        <div className="relative flex items-center">
          <Search size={18} className="absolute left-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search coupons by brand name (e.g. Amazon, Udemy, HUMID100)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold outline-none focus:border-amber-500 transition"
          />
        </div>
      </div>

      {/* Partner Featured Coupons Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Sparkles size={18} className="text-amber-500" /> Partner Hot Deals & Coupons
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnerCoupons.map((c) => (
            <div
              key={c.id}
              className="bg-white border-2 border-amber-200 hover:border-amber-400 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                    {c.merchant}
                  </span>
                  <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded">
                    {c.discount}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-sm leading-snug">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">{c.description}</p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100">
                {/* Copy Coupon Bar */}
                <div className="flex items-center justify-between bg-dashed border border-amber-300 bg-amber-50/60 rounded-xl p-2 font-mono text-xs font-black text-amber-950">
                  <span>{c.couponCode}</span>
                  <button
                    onClick={() => handleCopy(c.couponCode)}
                    className="bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode === c.couponCode ? (
                      <>
                        <Check size={12} /> COPIED!
                      </>
                    ) : (
                      <>
                        <Copy size={12} /> COPY
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={autoFormatAffiliateLink(c.link, c.merchant)}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 uppercase tracking-wider"
                >
                  <ShoppingCart size={13} />
                  <span>Redeem at {c.merchant}</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Database Product Coupons */}
      {filteredProducts.length > 0 && (
        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Tag size={18} className="text-[#2874f0]" /> Active Product Coupons ({filteredProducts.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl p-1 shrink-0 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} className="max-h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                      {p.merchant || "Amazon"}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-xs leading-snug line-clamp-2 mt-0.5">
                      {p.title}
                    </h4>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl p-2 text-xs font-mono font-black text-amber-950">
                    <span>CODE: {p.couponCode}</span>
                    <button
                      onClick={() => handleCopy(p.couponCode!)}
                      className="bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold px-2 py-1 rounded transition flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCode === p.couponCode ? <Check size={11} /> : <Copy size={11} />}
                      <span>{copiedCode === p.couponCode ? "COPIED" : "COPY"}</span>
                    </button>
                  </div>

                  <a
                    href={p.id ? `/go/${p.id}` : autoFormatAffiliateLink(p.link, p.merchant)}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="w-full bg-[#2874f0] hover:bg-blue-600 text-white text-xs font-extrabold py-2 rounded-xl transition flex items-center justify-center gap-1 uppercase tracking-wider"
                  >
                    <span suppressHydrationWarning>Claim Deal ({p.currency || "₹"}{p.price.toLocaleString('en-IN')})</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
