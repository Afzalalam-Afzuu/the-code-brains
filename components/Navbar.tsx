"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Search, Mail, ChevronDown } from "lucide-react";
import { navData } from "../lib/nav-data";

export default function Navbar() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openMenu(slug: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenSlug(slug);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpenSlug(null), 120);
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-xs">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          {/* Logo Icon */}
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-md shadow-indigo-200/50 group-hover:shadow-lg group-hover:shadow-indigo-300/50 group-hover:scale-105 transition-all duration-300">
            {/* SVG Icon: Sleek Brain / Code hybrid */}
            <svg className="w-5.5 h-5.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" className="opacity-20" />
              {/* Left hemisphere / left bracket */}
              <path d="M9.5 8.5C8 9.5 7.5 11 7.5 12s.5 2.5 2 3.5" />
              {/* Right hemisphere / right bracket */}
              <path d="M14.5 8.5c1.5 1 2 2.5 2 3.5s-.5 2.5-2 3.5" />
              {/* Center brain stem/circuit */}
              <path d="M12 7v10" />
              {/* Neural connection dots */}
              <circle cx="12" cy="7" r="1" fill="currentColor" />
              <circle cx="7.5" cy="12" r="1" fill="currentColor" />
              <circle cx="16.5" cy="12" r="1" fill="currentColor" />
              <circle cx="12" cy="17" r="1" fill="currentColor" />
            </svg>
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Logo Text */}
          <div className="flex flex-col leading-none">
            <span className="text-xl tracking-tight font-light text-slate-800">
              The<span className="font-bold text-slate-900">Code</span>
              <span className="font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent group-hover:from-indigo-500 group-hover:to-violet-500 transition-colors">Brains</span>
              <span className="text-indigo-600 font-extrabold">.</span>
            </span>
            <span className="text-[8px] tracking-[0.2em] text-slate-400 font-extrabold mt-1 uppercase">
              Upgrade Your Tech
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-4 text-sm">
          <button className="rounded-full border border-slate-200 px-3.5 py-1.5 text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-950 transition text-xs cursor-pointer">
            US Edition ▾
          </button>
          <Link
            href="/join"
            className="rounded-xl bg-slate-950 text-white font-bold px-4 py-2 hover:bg-indigo-600 transition shadow-sm text-xs tracking-wider uppercase"
          >
            Join TheCodeBrains Club →
          </Link>
          <Link
            href="/newsletters"
            aria-label="Newsletters"
            className="p-2 text-slate-400 hover:text-slate-800 transition"
          >
            <Mail size={18} />
          </Link>
          <Link href="/search" aria-label="Search" className="p-2 text-slate-400 hover:text-slate-800 transition">
            <Search size={18} />
          </Link>
        </div>
      </div>

      {/* Category bar */}
      <nav className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 relative">
          <ul className="flex items-center gap-1 text-sm font-semibold text-slate-600 overflow-x-auto scrollbar-none py-1">
            <li>
              <Link
                href="/"
                className="block px-3 py-2.5 whitespace-nowrap rounded-lg hover:bg-slate-50 hover:text-slate-950 transition text-slate-600 font-bold"
              >
                Home
              </Link>
            </li>
            {navData.map((item) => {
              const hasMenu = !!item.columns;
              return (
                <li
                  key={item.slug}
                  className="group/item"
                  onMouseEnter={() => hasMenu && openMenu(item.slug)}
                  onMouseLeave={() => hasMenu && scheduleClose()}
                >
                  {hasMenu ? (
                    <button
                      onClick={() =>
                        setOpenSlug((cur) => (cur === item.slug ? null : item.slug))
                      }
                      className="flex items-center gap-1.5 px-3 py-2.5 whitespace-nowrap rounded-lg hover:bg-slate-50 hover:text-slate-950 transition text-slate-600 font-bold"
                      aria-expanded={openSlug === item.slug}
                    >
                      {item.label}
                      <ChevronDown size={14} className="text-slate-400 group-hover/item:text-slate-600 transition-colors" />
                    </button>
                  ) : (
                    <Link
                      href={item.href ?? "#"}
                      className="block px-3 py-2.5 whitespace-nowrap rounded-lg hover:bg-slate-50 hover:text-slate-950 transition text-slate-600 font-bold"
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Mega menu */}
                  {hasMenu && openSlug === item.slug && (
                    <div
                      onMouseEnter={() => openMenu(item.slug)}
                      onMouseLeave={() => scheduleClose()}
                      className="absolute left-0 top-full z-50 w-[min(90vw,780px)] bg-white shadow-2xl border border-slate-200/60 rounded-b-2xl mt-0.5"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-6">
                        {item.columns!.map((col) => (
                          <div key={col.heading}>
                            <p className="text-slate-900 text-xs font-black uppercase tracking-wider mb-3">
                              {col.heading}
                            </p>
                            <ul className="space-y-2">
                              {col.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    onClick={() => setOpenSlug(null)}
                                    className="text-slate-500 hover:text-indigo-600 hover:underline text-sm font-medium transition-colors"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
