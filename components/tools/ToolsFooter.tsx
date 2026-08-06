"use client";

import Link from "next/link";
import { ShieldCheck, Lock, ArrowUp } from "lucide-react";

export default function ToolsFooter() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-white border-t-2 border-slate-200 text-slate-900 text-xs py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Privacy Statement */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-slate-950 font-black">
            <span>TheCodeBrains Web Tools Portal</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300">
              <Lock size={11} /> 100% Client-Side Privacy
            </span>
          </div>
          <p className="text-xs text-slate-700 max-w-md font-bold leading-relaxed">
            All calculations, text conversions, and file processing run entirely inside your browser. No private data is ever uploaded to external servers.
          </p>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-black text-slate-800">
          <Link href="/tools/ai-chat" className="hover:text-[#2874f0] underline transition">
            AI Chat
          </Link>
          <span>•</span>
          <Link href="/tools/age-calculator" className="hover:text-[#2874f0] underline transition">
            Age Calc
          </Link>
          <span>•</span>
          <Link href="/tools/qr-generator" className="hover:text-[#2874f0] underline transition">
            QR Generator
          </Link>
          <span>•</span>
          <Link href="/tools/password-generator" className="hover:text-[#2874f0] underline transition">
            Passwords
          </Link>
          <span>•</span>
          <Link href="/tools/text-tools" className="hover:text-[#2874f0] underline transition">
            Text Tools
          </Link>
          <span>•</span>
          <Link href="/tools/unit-converter" className="hover:text-[#2874f0] underline transition">
            Unit Conv
          </Link>
          <span>•</span>
          <Link href="/tools/color-palette" className="hover:text-[#2874f0] underline transition">
            Color Palette
          </Link>
          <span>•</span>
          <Link href="/tools/emi-calculator" className="hover:text-[#2874f0] underline transition">
            EMI Calc
          </Link>
          <span>•</span>
          <Link href="/tools/bmi-calculator" className="hover:text-[#2874f0] underline transition">
            BMI Calc
          </Link>
          <span>•</span>
          <Link href="/tools/base64-converter" className="hover:text-[#2874f0] underline transition">
            Base64
          </Link>
          <span>•</span>
          <Link href="/tools/ip-checker" className="hover:text-[#2874f0] underline transition">
            IP Info
          </Link>
          <span>•</span>
          <Link href="/" className="hover:text-[#2874f0] underline transition">
            Main Site
          </Link>
        </div>

        {/* Scroll To Top & Copyright */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-600 font-extrabold">
            © {new Date().getFullYear()} TheCodeBrains
          </span>
          <button
            onClick={scrollToTop}
            className="bg-slate-100 hover:bg-slate-200 text-slate-900 p-2.5 rounded-xl border-2 border-slate-300 transition cursor-pointer shadow-2xs font-bold"
            title="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
