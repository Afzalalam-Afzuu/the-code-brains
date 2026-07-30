"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Mail, ChevronDown, Sparkles, ShieldCheck, Tag, Zap, Smartphone, Laptop, Tv, Home as HomeIcon, Award, X } from "lucide-react";
import { navData } from "../lib/nav-data";

export default function Navbar() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  function handleMouseEnter(slug: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (!isLocked) {
      setOpenSlug(slug);
    }
  }

  function handleMouseLeave() {
    if (!isLocked) {
      closeTimer.current = setTimeout(() => {
        setOpenSlug(null);
      }, 300);
    }
  }

  function handleButtonClick(slug: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openSlug === slug && isLocked) {
      // Toggle off if already locked
      setOpenSlug(null);
      setIsLocked(false);
    } else {
      // Lock open
      setOpenSlug(slug);
      setIsLocked(true);
    }
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenSlug(null);
        setIsLocked(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categoryIcons: Record<string, any> = {
    phones: Smartphone,
    computing: Laptop,
    "tv-audio": Tv,
    home: HomeIcon,
    ai: Sparkles,
  };

  const activeNavData = navData.find((item) => item.slug === openSlug && item.columns);

  return (
    <header className="sticky top-0 z-50 shadow-md" ref={navRef}>
      {/* Flipkart Signature Blue Top Header */}
      <div className="bg-[#2874f0] text-white px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Flipkart Plus Style Tag */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="bg-white text-[#2874f0] font-black w-9 h-9 rounded-lg flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition">
              ⚡
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1">
                <span className="text-xl font-black italic tracking-tight text-white">
                  TheCodeBrains
                </span>
                <span className="bg-[#ffe500] text-slate-900 text-[9px] font-black px-1.5 py-0.5 rounded italic shadow-xs">
                  PLUS✦
                </span>
              </div>
              <span className="text-[9px] text-blue-100 font-bold tracking-widest uppercase mt-0.5">
                India's Trusted Tech & Deals Portal
              </span>
            </div>
          </Link>

          {/* Flipkart Style Big Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <form action="/search" method="GET" className="relative flex items-center">
              <input
                type="text"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for Products, Brands, Coupons & Amazon Deals..."
                className="w-full bg-white text-slate-800 text-xs font-semibold rounded-lg py-2.5 pl-4 pr-10 outline-none shadow-inner placeholder-slate-400 focus:ring-2 focus:ring-yellow-300 transition"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1 text-[#2874f0] hover:text-blue-700 p-1.5 font-bold"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Right Header Quick Actions */}
          <div className="flex items-center gap-3 text-xs font-extrabold">
            <Link
              href="/browse"
              className="bg-[#ffe500] hover:bg-yellow-300 text-slate-950 px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 shadow-sm uppercase tracking-wider text-[11px]"
            >
              <Zap size={14} className="fill-slate-950" />
              {/* <span>Deals Zone</span> */}
              <span>Deals</span>
            </Link>

            <Link
              href="/join"
              className="flex items-center gap-1.5 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition"
            >
              <Award size={15} />
              <span>Join Plus</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Flipkart Style White Category Sub-Bar */}
      <nav className="bg-white border-b border-slate-200 shadow-xs relative">
        <div className="max-w-7xl mx-auto px-4 relative">
          
          {/* Scrollable Category Tab Bar */}
          <div className="overflow-x-auto scrollbar-none py-1.5">
            <ul className="flex items-center gap-1 sm:gap-3 text-xs font-extrabold text-slate-700 min-w-max">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-[#2874f0] hover:bg-blue-50 transition text-[#2874f0] font-black"
                >
                  <Tag size={14} />
                  <span>Top Offers</span>
                </Link>
              </li>
              {navData.map((item) => {
                const hasMenu = !!item.columns;
                const IconComponent = categoryIcons[item.slug] || Sparkles;
                const isOpen = openSlug === item.slug;

                return (
                  <li key={item.slug} className="group/item">
                    {hasMenu ? (
                      <button
                        onClick={() => handleButtonClick(item.slug)}
                        onMouseEnter={() => handleMouseEnter(item.slug)}
                        onMouseLeave={handleMouseLeave}
                        className={`flex items-center gap-1.5 px-3 py-2 whitespace-nowrap rounded-lg transition font-bold ${
                          isOpen ? "bg-blue-50 text-[#2874f0]" : "hover:text-[#2874f0] hover:bg-blue-50 text-slate-700"
                        }`}
                        aria-expanded={isOpen}
                      >
                        <IconComponent size={14} className={isOpen ? "text-[#2874f0]" : "text-slate-400 group-hover/item:text-[#2874f0]"} />
                        <span>{item.label}</span>
                        <ChevronDown
                          size={12}
                          className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-[#2874f0]" : "text-slate-400 group-hover/item:text-[#2874f0]"}`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href ?? "#"}
                        className="flex items-center gap-1.5 px-3 py-2 whitespace-nowrap rounded-lg hover:text-[#2874f0] hover:bg-blue-50 transition text-slate-700 font-bold"
                      >
                        <IconComponent size={14} className="text-slate-400" />
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Mega Menu Dropdown Rendered OUTSIDE overflow-x-auto container */}
          {activeNavData && (
            <div
              onMouseEnter={() => handleMouseEnter(activeNavData.slug)}
              onMouseLeave={handleMouseLeave}
              className="absolute left-4 right-4 sm:left-4 sm:w-[min(90vw,780px)] top-full pt-1 z-50 animate-in fade-in duration-150"
            >
              <div className="bg-white shadow-2xl border border-slate-200 rounded-xl p-6 relative">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#2874f0] uppercase tracking-wider">
                      {activeNavData.label} Directory
                    </span>
                    {isLocked && (
                      <span className="bg-blue-50 text-[#2874f0] text-[9px] font-black px-2 py-0.5 rounded border border-blue-200">
                        Locked Open 🔒
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setOpenSlug(null);
                      setIsLocked(false);
                    }}
                    className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition"
                    aria-label="Close menu"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {activeNavData.columns!.map((col) => (
                    <div key={col.heading}>
                      <p className="text-[#2874f0] text-[11px] font-black uppercase tracking-wider mb-2.5 pb-1 border-b border-blue-50">
                        {col.heading}
                      </p>
                      <ul className="space-y-2">
                        {col.links.map((link) => (
                          <li key={link.href}>
                            {link.disabled ? (
                              <span className="text-slate-400 text-xs font-medium opacity-60 flex items-center justify-between">
                                <span>{link.label}</span>
                                <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded font-bold">Soon</span>
                              </span>
                            ) : (
                              <Link
                                href={link.href}
                                onClick={() => {
                                  setOpenSlug(null);
                                  setIsLocked(false);
                                }}
                                className="text-slate-700 hover:text-[#2874f0] hover:font-bold text-xs font-semibold transition block py-0.5"
                              >
                                {link.label}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </nav>
    </header>
  );
}
