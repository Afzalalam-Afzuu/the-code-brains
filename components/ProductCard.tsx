// components/ProductCard.tsx
import { ExternalLink } from "lucide-react";

interface ProductProps {
  title: string;
  price: number;
  oldPrice: number;
  link: string;
  image: string;
  merchant?: string;
}

export default function ProductCard({ title, price, oldPrice, link, image, merchant = "Amazon" }: ProductProps) {
  const discountPercent = Math.round(((oldPrice - price) / oldPrice) * 100);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between group relative">
      <div>
        <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-50 border border-slate-100/50">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {discountPercent > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-full uppercase shadow-sm">
              Save {discountPercent}%
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            DEAL AT {merchant}
          </span>
        </div>
        <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-indigo-600 transition h-10 overflow-hidden line-clamp-2">
          {title}
        </h3>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100/80">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-slate-900">${price}</span>
          {oldPrice > price && (
            <span className="text-slate-400 line-through text-xs">${oldPrice}</span>
          )}
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 w-full mt-4 bg-slate-950 text-white text-center py-2.5 rounded-xl font-bold hover:bg-indigo-600 transition-colors duration-300 text-xs tracking-wider uppercase"
        >
          View Deal
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}