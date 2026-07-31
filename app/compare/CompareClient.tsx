"use client";

import React, { useState } from "react";
import { AffiliateItem, autoFormatAffiliateLink } from "@/lib/affiliate-links";
import { ArrowLeftRight, Check, Sparkles, Star, Tag, Zap, ShieldCheck, ShoppingCart, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";
import AffiliateButton from "@/components/AffiliateButton";

interface CompareClientProps {
  products: AffiliateItem[];
}

export default function CompareClient({ products }: CompareClientProps) {
  // Default selected product IDs (pick first 2 products if available)
  const defaultProd1 = products[1]?.id || products[0]?.id || "";
  const defaultProd2 = products[2]?.id || products[0]?.id || "";

  const [selectedId1, setSelectedId1] = useState<string>(defaultProd1);
  const [selectedId2, setSelectedId2] = useState<string>(defaultProd2);

  const prod1 = products.find((p) => p.id === selectedId1) || products[0];
  const prod2 = products.find((p) => p.id === selectedId2) || products[1] || products[0];

  const handleSwap = () => {
    setSelectedId1(selectedId2);
    setSelectedId2(selectedId1);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6 px-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#2874f0] via-indigo-600 to-blue-700 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="bg-[#ffe500] text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            ✦ Real-Time Comparison Engine
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Compare Tech Products & Amazon vs Flipkart Deals
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 font-medium">
            Select any 2 products side-by-side to compare ratings, verified prices, coupons, and multi-store availability before buying!
          </p>
        </div>
      </div>

      {/* Product Selectors */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Selector 1 */}
          <div className="w-full sm:flex-1 space-y-1.5">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#2874f0]" /> Product 1:
            </label>
            <select
              value={selectedId1}
              onChange={(e) => setSelectedId1(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#2874f0] transition cursor-pointer"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.currency || "₹"}{p.price.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            title="Swap Products"
            className="bg-slate-100 hover:bg-[#2874f0] hover:text-white p-3 rounded-2xl text-slate-600 transition duration-200 shadow-2xs cursor-pointer shrink-0 mt-4 sm:mt-5"
          >
            <ArrowLeftRight size={18} />
          </button>

          {/* Selector 2 */}
          <div className="w-full sm:flex-1 space-y-1.5">
            <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600" /> Product 2:
            </label>
            <select
              value={selectedId2}
              onChange={(e) => setSelectedId2(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#2874f0] transition cursor-pointer"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.currency || "₹"}{p.price.toLocaleString()})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      {prod1 && prod2 && (
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {/* Product Column 1 */}
            <div className="p-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="relative w-full h-52 bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={prod1.image} alt={prod1.title} className="h-full object-contain" />
                  <span className="absolute top-3 left-3 bg-[#388e3c] text-white text-[10px] font-black px-2 py-0.5 rounded">
                    {prod1.merchant || "Amazon"}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold bg-blue-50 text-[#2874f0] px-2 py-0.5 rounded uppercase">
                    {prod1.category || "General"}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mt-1.5 leading-snug">
                    {prod1.title}
                  </h3>
                </div>

                {/* Specs comparison */}
                <div className="space-y-3 bg-slate-50/80 rounded-xl p-4 text-xs font-semibold">
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Best Price:</span>
                    <span className="font-black text-slate-900 text-sm">
                      {prod1.currency || "₹"}{prod1.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Original MRP:</span>
                    <span className="line-through text-slate-400">
                      {prod1.currency || "₹"}{prod1.oldPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Discount Savings:</span>
                    <span className="text-emerald-700 font-extrabold">
                      {prod1.oldPrice > prod1.price
                        ? `${Math.round(((prod1.oldPrice - prod1.price) / prod1.oldPrice) * 100)}% OFF`
                        : "Verified Price"}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">User Rating:</span>
                    <span className="flex items-center gap-1 font-black text-slate-900">
                      {prod1.rating || 4.8} <Star size={12} className="fill-amber-400 text-amber-400" />
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Coupon Available:</span>
                    <span className="font-mono text-[#2874f0] font-black">
                      {prod1.couponCode || "None"}
                    </span>
                  </div>
                </div>

                {/* Stores Available */}
                {prod1.stores && prod1.stores.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                      Multi-Store Prices:
                    </span>
                    {prod1.stores.map((s, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs bg-slate-50 px-3 py-1.5 rounded-lg font-bold">
                        <span>{s.merchant}</span>
                        <span className="text-[#2874f0]">{prod1.currency || "₹"}{s.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100">
                <AffiliateButton
                  productId={prod1.id}
                  href={prod1.link}
                  merchant={prod1.merchant || "Amazon"}
                  label={`Buy ${prod1.merchant || "Amazon"} Deal`}
                  couponCode={prod1.couponCode}
                  className="w-full"
                />
              </div>
            </div>

            {/* Product Column 2 */}
            <div className="p-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="relative w-full h-52 bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={prod2.image} alt={prod2.title} className="h-full object-contain" />
                  <span className="absolute top-3 left-3 bg-[#388e3c] text-white text-[10px] font-black px-2 py-0.5 rounded">
                    {prod2.merchant || "Amazon"}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded uppercase">
                    {prod2.category || "General"}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mt-1.5 leading-snug">
                    {prod2.title}
                  </h3>
                </div>

                {/* Specs comparison */}
                <div className="space-y-3 bg-slate-50/80 rounded-xl p-4 text-xs font-semibold">
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Best Price:</span>
                    <span className="font-black text-slate-900 text-sm">
                      {prod2.currency || "₹"}{prod2.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Original MRP:</span>
                    <span className="line-through text-slate-400">
                      {prod2.currency || "₹"}{prod2.oldPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Discount Savings:</span>
                    <span className="text-emerald-700 font-extrabold">
                      {prod2.oldPrice > prod2.price
                        ? `${Math.round(((prod2.oldPrice - prod2.price) / prod2.oldPrice) * 100)}% OFF`
                        : "Verified Price"}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">User Rating:</span>
                    <span className="flex items-center gap-1 font-black text-slate-900">
                      {prod2.rating || 4.8} <Star size={12} className="fill-amber-400 text-amber-400" />
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Coupon Available:</span>
                    <span className="font-mono text-[#2874f0] font-black">
                      {prod2.couponCode || "None"}
                    </span>
                  </div>
                </div>

                {/* Stores Available */}
                {prod2.stores && prod2.stores.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                      Multi-Store Prices:
                    </span>
                    {prod2.stores.map((s, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs bg-slate-50 px-3 py-1.5 rounded-lg font-bold">
                        <span>{s.merchant}</span>
                        <span className="text-[#2874f0]">{prod2.currency || "₹"}{s.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100">
                <AffiliateButton
                  productId={prod2.id}
                  href={prod2.link}
                  merchant={prod2.merchant || "Amazon"}
                  label={`Buy ${prod2.merchant || "Amazon"} Deal`}
                  couponCode={prod2.couponCode}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
