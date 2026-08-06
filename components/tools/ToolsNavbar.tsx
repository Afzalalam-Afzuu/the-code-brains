"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wrench, Calendar, QrCode, Image as ImageIcon, Code2, Database, ArrowRight, Home } from "lucide-react";

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
    <header className="bg-white border-b-2 border-slate-200 text-slate-950 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Tools Logo */}
        <Link href="/tools" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#2874f0] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition duration-200">
            <Wrench size={20} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl tracking-tight text-slate-950">TheCodeBrains</span>
              <span className="bg-blue-100 text-[#2874f0] border border-blue-300 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                TOOLS
              </span>
            </div>
            <p className="text-[11px] text-slate-600 font-extrabold leading-none">Free Client-Side Web Utilities</p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-xl border border-slate-300">
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
                    : "text-slate-800 hover:text-slate-950 hover:bg-slate-200/80"
                }`}
              >
                <Icon size={15} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Back to Main Site */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-black text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition border-2 border-slate-300 shadow-2xs"
          >
            <Home size={14} />
            <span className="hidden sm:inline">Main Website</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Mobile Tools Navigation Sub-bar */}
      <div className="md:hidden bg-slate-100 border-t border-slate-200 px-3 py-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {toolLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition shrink-0 ${
                  isActive
                    ? "bg-[#2874f0] text-white shadow-xs"
                    : "text-slate-800 hover:text-slate-950 bg-white border border-slate-300"
                }`}
              >
                <Icon size={14} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
