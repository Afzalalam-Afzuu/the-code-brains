// components/ProductCard.tsx
import { ExternalLink, Star, ShieldCheck, Truck, Zap } from "lucide-react";

interface ProductProps {
  title: string;
  price: number;
  oldPrice: number;
  link: string;
  image: string;
  merchant?: string;
  currency?: string;
  rating?: number;
}

export default function ProductCard({
  title,
  price,
  oldPrice,
  link,
  image,
  merchant = "Amazon",
  currency = "₹",
  rating = 4.8,
}: ProductProps) {
  const discountPercent = oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <div className="fk-card p-4 flex flex-col justify-between group relative border border-slate-200/90 hover:border-[#2874f0]/50">
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
            <span className="absolute top-2.5 left-2.5 bg-[#388e3c] text-white text-[10px] font-black tracking-wider px-2 py-0.5 rounded shadow-sm flex items-center gap-0.5">
              <Zap size={10} className="fill-white" />
              {discountPercent}% OFF
            </span>
          )}
          <span className="absolute top-2.5 right-2.5 bg-slate-900/80 text-white text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">
            {merchant}
          </span>
        </div>

        {/* Rating & Assured Tag (Flipkart Style) */}
        <div className="flex items-center justify-between gap-1 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="fk-rating-badge">
              <span>{rating}</span>
              <Star size={10} className="fill-white text-white" />
            </span>
            <span className="text-slate-400 text-[10px] font-bold">(1.2k)</span>
          </div>

          <span className="fk-assured-badge flex items-center gap-1">
            <ShieldCheck size={10} />
            Verified
          </span>
        </div>

        {/* Product Title */}
        <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm leading-snug group-hover:text-[#2874f0] transition duration-200 h-10 overflow-hidden line-clamp-2">
          {title}
        </h3>
      </div>

      {/* Pricing & Flipkart Style CTA */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xl font-black text-slate-900 tracking-tight">
            {currency}{price.toLocaleString()}
          </span>
          {oldPrice > price && (
            <span className="text-slate-400 line-through text-xs font-semibold">
              {currency}{oldPrice.toLocaleString()}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-[#388e3c] text-xs font-extrabold">
              {discountPercent}% off
            </span>
          )}
        </div>

        {/* Delivery micro-info */}
        <p className="text-[10px] font-semibold text-slate-500 flex items-center gap-1 mb-3">
          <Truck size={12} className="text-[#388e3c]" />
          <span>Free & Fast Delivery • Live Deal</span>
        </p>

        {/* Buy Button */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="fk-blue-btn flex items-center justify-center gap-2 w-full py-2.5 px-3 font-black transition text-xs tracking-wider uppercase shadow-sm"
        >
          <span>Buy Now At {merchant}</span>
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}