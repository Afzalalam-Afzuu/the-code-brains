"use client";

// components/ProductCard.tsx
import { useState } from "react";
import { Star, ShieldCheck, Truck, Zap, CheckCircle2, ShoppingCart, ExternalLink, Share2, Copy, Check, MessageCircle, X } from "lucide-react";
import AffiliateButton from "./AffiliateButton";
import { autoFormatAffiliateLink, AffiliateStoreOption } from "@/lib/affiliate-links";

interface ProductProps {
  id?: string;
  title: string;
  price: number;
  oldPrice: number;
  link: string;
  image: string;
  merchant?: string;
  currency?: string;
  rating?: number;
  couponCode?: string;
  stores?: AffiliateStoreOption[];
}

export default function ProductCard({
  id,
  title,
  price,
  oldPrice,
  link,
  image,
  merchant = "Amazon",
  currency = "₹",
  rating = 4.8,
  couponCode,
  stores,
}: ProductProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const discountPercent =
    oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  const formattedLink = id ? `/go/${id}` : autoFormatAffiliateLink(link, merchant);

  const getShareText = () => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://thecodebrains.com';
    return `🔥 *Check out this deal on TheCodeBrains!*\n\n📱 *${title}*\n💰 *Price*: ${currency}${price.toLocaleString('en-IN')}${discountPercent > 0 ? ` (${discountPercent}% OFF)` : ''}\n\n👉 *View Live Deal*: ${siteUrl}${formattedLink}`;
  };

  const handleWhatsAppShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(getShareText())}`, '_blank');
    setShowShareMenu(false);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(getShareText());
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowShareMenu(false);
    }, 2000);
  };

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://thecodebrains.com';
        await navigator.share({
          title: title,
          text: `Check out this deal on ${title} (${currency}${price.toLocaleString('en-IN')})`,
          url: `${siteUrl}${formattedLink}`,
        });
        setShowShareMenu(false);
      } catch (err) {
        // Fallback if cancelled
      }
    } else {
      handleCopyLink(e);
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 hover:border-[#2874f0] rounded-2xl p-4 flex flex-col justify-between group relative shadow-xs hover:shadow-xl transition-all duration-300 h-full">
      <div>
        {/* Product Image Container */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3 bg-slate-50 border border-slate-100 flex items-center justify-center p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          {discountPercent > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-[#388e3c] text-white text-[10px] font-black tracking-wider px-2 py-0.5 rounded shadow-xs flex items-center gap-0.5">
              <Zap size={10} className="fill-white" />
              {discountPercent}% OFF
            </span>
          )}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 z-20">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowShareMenu(!showShareMenu);
                }}
                title="Share Deal Options"
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-1.5 rounded-md shadow-sm transition duration-200 flex items-center gap-1 cursor-pointer"
              >
                <Share2 size={13} />
              </button>

              {/* Share Popover Menu */}
              {showShareMenu && (
                <div
                  className="absolute right-0 top-8 w-44 bg-slate-900 text-white rounded-xl shadow-2xl p-2 border border-slate-700 z-50 flex flex-col gap-1.5 text-xs font-semibold"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between px-2 py-1 text-[10px] text-slate-400 font-extrabold uppercase border-b border-slate-800">
                    <span>Share Options</span>
                    <button
                      onClick={() => setShowShareMenu(false)}
                      className="hover:text-white"
                    >
                      <X size={12} />
                    </button>
                  </div>

                  <button
                    onClick={handleWhatsAppShare}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold transition text-left cursor-pointer"
                  >
                    <MessageCircle size={14} />
                    <span>Share on WhatsApp</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition text-left cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copied ? "Copied to Clipboard!" : "Copy Deal Link"}</span>
                  </button>

                  <button
                    onClick={handleNativeShare}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition text-left cursor-pointer"
                  >
                    <Share2 size={14} />
                    <span>More Share Options</span>
                  </button>
                </div>
              )}
            </div>

            <span className="bg-slate-900 text-white text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider shadow-xs">
              {merchant}
            </span>
          </div>
        </div>

        {/* Rating & Verified Tag */}
        <div className="flex items-center justify-between gap-1 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="bg-[#388e3c] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <span>{rating}</span>
              <Star size={9} className="fill-white text-white" />
            </span>
            <span className="text-slate-400 text-[10px] font-bold">(1.2k reviews)</span>
          </div>

          <span className="text-[#2874f0] bg-blue-50 border border-blue-100 text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck size={10} />
            Verified Price
          </span>
        </div>

        {/* Product Title */}
        <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm leading-snug group-hover:text-[#2874f0] transition duration-200 min-h-[2.5rem] line-clamp-2">
          {title}
        </h3>
      </div>

      {/* Pricing & CTA Section */}
      <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
        {/* Pricing Block */}
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900 tracking-tight" suppressHydrationWarning>
              {currency}{price.toLocaleString('en-IN')}
            </span>
            {oldPrice > price && (
              <span className="text-slate-400 line-through text-xs font-semibold" suppressHydrationWarning>
                {currency}{oldPrice.toLocaleString('en-IN')}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-[#388e3c] text-xs font-extrabold">
                {discountPercent}% off
              </span>
            )}
          </div>

          <p className="text-[10px] font-bold text-slate-500 flex items-center gap-1 mt-0.5">
            <Truck size={12} className="text-[#388e3c]" />
            <span>Free Delivery & Live Stock</span>
          </p>
        </div>

        {/* Primary Affiliate Action Button */}
        <AffiliateButton
          productId={id}
          href={formattedLink}
          merchant={merchant}
          label={`Buy at ${merchant}`}
          couponCode={couponCode}
          className="w-full justify-center"
        />

        {/* Store Comparison Matrix or Store Trust Footer */}
        <div className="pt-2 border-t border-slate-100 min-h-[48px] flex flex-col justify-center">
          {stores && stores.length > 0 ? (
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Also available on:</span>
              <div className="grid grid-cols-1 gap-1">
                {stores.map((s, idx) => (
                  <a
                    key={idx}
                    href={autoFormatAffiliateLink(s.link, s.merchant)}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    className="flex items-center justify-between px-2.5 py-1 bg-slate-50 hover:bg-blue-50 hover:text-[#2874f0] rounded-lg text-[10px] font-extrabold text-slate-700 transition"
                  >
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2874f0]" />
                      {s.merchant}
                    </span>
                    <span className="font-black" suppressHydrationWarning>{currency}{s.price.toLocaleString('en-IN')} {s.badge ? `(${s.badge})` : ''} →</span>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between px-2.5 py-1.5 bg-slate-50 rounded-lg text-[10px] font-extrabold text-slate-500">
              <span className="flex items-center gap-1 text-slate-600">
                <CheckCircle2 size={12} className="text-emerald-600" /> Best Editor Pick
              </span>
              <span className="text-indigo-600 font-bold">Official Store ✓</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}