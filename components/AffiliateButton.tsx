"use client";

import React, { useState } from "react";
import { ExternalLink, ShoppingCart, Tag, Check } from "lucide-react";
import { autoFormatAffiliateLink } from "@/lib/affiliate-links";

interface AffiliateButtonProps {
  productId?: string;
  href: string;
  merchant?: string;
  label?: string;
  variant?: "primary" | "secondary" | "outline" | "compact";
  useCloaking?: boolean;
  couponCode?: string;
  className?: string;
}

export default function AffiliateButton({
  productId,
  href,
  merchant = "Amazon",
  label,
  variant = "primary",
  useCloaking = true,
  couponCode,
  className = "",
}: AffiliateButtonProps) {
  const [copied, setCopied] = useState(false);

  // If productId exists and cloaking enabled, use /go/[id], else format direct URL
  const targetUrl =
    useCloaking && productId
      ? `/go/${productId}`
      : autoFormatAffiliateLink(href, merchant);

  const displayLabel = label || `Buy on ${merchant}`;

  const copyCoupon = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (couponCode) {
      navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isAmazon = merchant.toLowerCase().includes("amazon");
  const isFlipkart = merchant.toLowerCase().includes("flipkart");

  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return "bg-slate-900 hover:bg-slate-800 text-white shadow-sm";
      case "outline":
        return "border border-slate-300 hover:border-slate-800 text-slate-800 bg-white hover:bg-slate-50";
      case "compact":
        return "px-2.5 py-1.5 text-[11px] font-extrabold bg-[#ffe500] hover:bg-yellow-400 text-slate-950 rounded-lg";
      default:
        if (isAmazon) {
          return "bg-[#ff9900] hover:bg-[#e68a00] text-slate-950 font-black shadow-sm";
        }
        if (isFlipkart) {
          return "bg-[#2874f0] hover:bg-blue-600 text-white font-black shadow-sm";
        }
        return "bg-[#ffe500] hover:bg-yellow-300 text-slate-950 font-black shadow-sm";
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer nofollow sponsored"
        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer w-full ${getVariantStyles()} ${className}`}
      >
        <ShoppingCart size={14} className="shrink-0" />
        <span>{displayLabel}</span>
        <ExternalLink size={12} className="opacity-80 shrink-0" />
      </a>

      {couponCode && (
        <button
          onClick={copyCoupon}
          type="button"
          title="Copy Discount Coupon Code"
          className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-extrabold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition cursor-pointer w-full"
        >
          <Tag size={12} className="text-amber-600 shrink-0" />
          <span>{copied ? "COPIED TO CLIPBOARD!" : `COUPON CODE: ${couponCode}`}</span>
          {copied ? <Check size={12} className="text-emerald-600 shrink-0" /> : null}
        </button>
      )}
    </div>
  );
}
