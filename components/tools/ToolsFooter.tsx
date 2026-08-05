"use client";

import Link from "next/link";
import { ShieldCheck, Lock, Cpu, Heart, ArrowUp } from "lucide-react";

export default function ToolsFooter() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Privacy Statement */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-white font-extrabold">
            <span>TheCodeBrains Web Tools Portal</span>
            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/30">
              <Lock size={10} /> 100% Client-Side Privacy
            </span>
          </div>
          <p className="text-[11px] text-slate-400 max-w-md">
            All age calculations, QR codes, and image compressions run entirely inside your browser. No files or private data are ever uploaded to external servers.
          </p>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-300">
          <Link href="/tools/age-calculator" className="hover:text-white transition">
            Age Calculator
          </Link>
          <span>•</span>
          <Link href="/tools/qr-generator" className="hover:text-white transition">
            QR Code Generator
          </Link>
          <span>•</span>
          <Link href="/tools/image-compressor" className="hover:text-white transition">
            Image Compressor
          </Link>
          <span>•</span>
          <Link href="/tools/json-formatter" className="hover:text-white transition">
            JSON Formatter
          </Link>
          <span>•</span>
          <Link href="/tools/dummy-json" className="hover:text-white transition">
            Dummy JSON
          </Link>
          <span>•</span>
          <Link href="/" className="hover:text-white transition">
            Main Site
          </Link>
        </div>

        {/* Scroll To Top & Copyright */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-slate-500">
            © {new Date().getFullYear()} TheCodeBrains
          </span>
          <button
            onClick={scrollToTop}
            className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-xl border border-slate-700 transition cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
