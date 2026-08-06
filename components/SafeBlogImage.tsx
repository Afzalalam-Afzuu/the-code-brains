"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

interface SafeBlogImageProps {
  src: string;
  alt: string;
  className?: string;
  tag?: string;
  title?: string;
}

export default function SafeBlogImage({ src, alt, className = "w-full h-full object-cover", tag, title }: SafeBlogImageProps) {
  const [error, setError] = useState(!src || src.trim() === "");

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden flex items-center justify-center">
      {/* Sleek Gradient & Tech Pattern Fallback (always rendered behind image) */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 flex flex-col items-center justify-center p-4 text-center text-white">
        <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center mb-2 shadow-lg backdrop-blur-sm">
          <Sparkles className="text-indigo-400" size={18} />
        </div>
        {tag && (
          <span className="text-[10px] uppercase tracking-widest text-indigo-300 bg-indigo-900/80 px-2.5 py-0.5 rounded-full mb-1 border border-indigo-500/30 font-extrabold">
            {tag}
          </span>
        )}
        {title && (
          <span className="text-xs font-bold text-slate-200 max-w-xs line-clamp-2 leading-tight">
            {title}
          </span>
        )}
      </div>

      {/* Actual Image overlay */}
      {!error && src && src.trim() !== "" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={`${className} relative z-10`}
          onError={(e) => {
            setError(true);
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      )}
    </div>
  );
}
