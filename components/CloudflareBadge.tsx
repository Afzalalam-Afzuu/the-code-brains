"use client";

import React from "react";
import { ShieldCheck, Lock, Zap } from "lucide-react";

export function CloudflareIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
    </svg>
  );
}

export function CloudflareBadgePill({ variant = "default" }: { variant?: "default" | "dark" | "space" | "amber" }) {
  if (variant === "dark") {
    return (
      <div className="inline-flex items-center gap-2 bg-slate-900 text-slate-200 border border-slate-700/80 px-3 py-1 rounded-full text-xs font-mono font-bold shadow-xs hover:border-[#F38020] transition duration-200">
        <span className="flex items-center gap-1 text-[#F38020]">
          <CloudflareIcon className="w-3.5 h-3.5 fill-[#F38020]" />
        </span>
        <span className="text-[11px] uppercase tracking-wider text-slate-300">
          Secured by <strong className="text-white font-black">Cloudflare</strong>
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>
    );
  }

  if (variant === "space") {
    return (
      <div className="inline-flex items-center gap-2 bg-slate-900/90 text-slate-100 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-mono font-bold shadow-xs">
        <ShieldCheck size={13} className="text-emerald-400" />
        <span className="flex items-center gap-1 text-[#F38020]">
          <CloudflareIcon className="w-3.5 h-3.5 fill-[#F38020]" />
          <span className="text-slate-200 font-extrabold text-[10px] uppercase tracking-widest">
            Cloudflare Enterprise Shield
          </span>
        </span>
      </div>
    );
  }

  if (variant === "amber") {
    return (
      <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold shadow-xs">
        <CloudflareIcon className="w-3.5 h-3.5 fill-[#F38020]" />
        <span className="text-[11px]">
          Protected by <strong>Cloudflare DDoS Shield</strong>
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 bg-orange-50/90 text-orange-950 border border-orange-200 px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
      <CloudflareIcon className="w-3.5 h-3.5 fill-[#F38020]" />
      <span className="text-[11px] text-orange-900">
        Secured & Accelerated by <strong>Cloudflare</strong>
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
    </div>
  );
}

export function CloudflareSecurityBanner() {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-orange-950/40 to-slate-900 border border-orange-500/30 rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md font-sans">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-[#F38020]/20 border border-[#F38020]/40 text-[#F38020] flex items-center justify-center shrink-0 shadow-sm">
          <CloudflareIcon className="w-6 h-6 fill-[#F38020]" />
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h4 className="font-black text-sm text-white tracking-tight flex items-center gap-1.5">
              100% Protected & Accelerated by Cloudflare
            </h4>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Shield
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            Enterprise DDoS Shield • 256-Bit SSL Encryption • Global Anycast Edge Network CDN
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs font-mono shrink-0">
        <span className="bg-slate-800/90 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 font-semibold flex items-center gap-1">
          <Lock size={12} className="text-emerald-400" /> SSL Encrypted
        </span>
        <span className="bg-slate-800/90 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 font-semibold flex items-center gap-1">
          <Zap size={12} className="text-amber-400" /> Edge CDN
        </span>
      </div>
    </div>
  );
}

export default CloudflareBadgePill;
