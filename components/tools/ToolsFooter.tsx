"use client";

import Link from "next/link";
import { ShieldCheck, Lock, ArrowUp } from "lucide-react";
import AdBanner from "@/components/AdBanner";

export default function ToolsFooter() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-white border-t-2 border-slate-200 text-slate-900 text-xs py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col space-y-6">
        {/* Global Ad Banner for All Tool Pages */}
        <div className="w-full max-w-4xl mx-auto">
          <AdBanner className="my-0" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
          {/* Brand & Privacy Statement */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-slate-950 font-black">
              <span>TheCodeBrains Web Tools Portal</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300">
                <Lock size={11} /> 100% Client-Side Privacy
              </span>
              <span className="bg-orange-50 text-orange-950 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-orange-300">
                <svg className="w-3.5 h-3.5 fill-[#F38020]" viewBox="0 0 24 24">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                </svg>
                Cloudflare Protected
              </span>
            </div>
            <p className="text-xs text-slate-700 max-w-md font-bold leading-relaxed">
              All calculations, text conversions, and file processing run entirely inside your browser. No private data is ever uploaded to external servers. Protected & accelerated by Cloudflare DDoS Shield.
            </p>

            {/* Official Social Channels */}
            <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-2">
              <a
                href="https://t.me/thecodebrainss"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#229ED9] hover:bg-[#1d87b9] text-white px-2.5 py-1 rounded-md text-[10px] font-extrabold flex items-center gap-1 transition shadow-2xs"
              >
                <svg className="w-3 h-3 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .54-1.43.53-.47-.01-1.37-.26-2.04-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.89 8.01-3.46 3.81-1.59 4.6-1.87 5.12-1.88.11 0 .37.03.54.17.14.12.18.28.2.45-.01.07.01.23 0 .38z"/>
                </svg>
                <span>Telegram</span>
              </a>

              <a
                href="https://whatsapp.com/channel/0029VbDQp84DOQIPmdj9430p"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-2.5 py-1 rounded-md text-[10px] font-extrabold flex items-center gap-1 transition shadow-2xs"
              >
                <svg className="w-3 h-3 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.15 4.201 4.293-1.124z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Navigation Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-black text-slate-800">
            <Link href="/space-observatory" className="hover:text-[#2874f0] underline transition font-bold text-indigo-600">
              🚀 Space Observatory
            </Link>
            <span>•</span>
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
            <Link href="/privacy-policy" className="hover:text-[#2874f0] underline transition font-bold text-[#2874f0]">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms-of-use" className="hover:text-[#2874f0] underline transition font-bold text-[#2874f0]">
              Terms of Use
            </Link>
            <span>•</span>
            <Link href="/affiliate-disclosure" className="hover:text-[#2874f0] underline transition font-bold text-[#2874f0]">
              Affiliate Disclosure
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
      </div>
    </footer>
  );
}
