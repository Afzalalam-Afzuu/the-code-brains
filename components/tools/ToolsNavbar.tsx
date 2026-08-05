"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wrench, Calendar, QrCode, Image as ImageIcon, Code2, Database, ArrowRight, ShieldCheck, Home } from "lucide-react";

export default function ToolsNavbar() {
  const pathname = usePathname();

  const toolLinks = [
    { name: "Age Calculator", href: "/tools/age-calculator", icon: Calendar },
    { name: "QR Code Generator", href: "/tools/qr-generator", icon: QrCode },
    { name: "Image Compressor", href: "/tools/image-compressor", icon: ImageIcon },
    { name: "JSON Formatter", href: "/tools/json-formatter", icon: Code2 },
    { name: "Dummy JSON", href: "/tools/dummy-json", icon: Database },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Tools Logo */}
        <Link href="/tools" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
            <Wrench size={18} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base sm:text-lg tracking-tight">TheCodeBrains</span>
              <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                TOOLS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium leading-none">Free Client-Side Web Utilities</p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          {toolLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-black transition ${
                  isActive
                    ? "bg-[#2874f0] text-white shadow-xs"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <Icon size={14} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Back to Main Site */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl transition border border-slate-700"
          >
            <Home size={14} />
            <span className="hidden sm:inline">Main Website</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Mobile Tools Navigation Sub-bar */}
      <div className="md:hidden bg-slate-950 border-t border-slate-800 px-3 py-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {toolLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black transition shrink-0 ${
                  isActive
                    ? "bg-[#2874f0] text-white"
                    : "text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                }`}
              >
                <Icon size={13} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
