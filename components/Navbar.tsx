"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Mail, ChevronDown, Sparkles, ShieldCheck, Tag, Zap, Smartphone, Laptop, Tv, Home as HomeIcon, Award, X } from "lucide-react";
import { navData, NavItem } from "../lib/nav-data";

interface NavbarProps {
  navItems?: NavItem[];
}

export default function Navbar({ navItems }: NavbarProps) {
  const currentNavData = navItems && navItems.length > 0 ? navItems : navData;

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

  const activeNavData = currentNavData.find((item) => item.slug === openSlug && item.columns);

  return (
    <header className="sticky top-0 z-50 shadow-md" ref={navRef}>
      {/* Flipkart Signature Blue Top Header */}
      <div className="bg-[#2874f0] text-white px-2.5 sm:px-4 py-2 sm:py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Flipkart Plus Style Tag */}
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0 group">
            <div className="bg-white text-[#2874f0] font-black w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-base sm:text-lg shadow-sm group-hover:scale-105 transition shrink-0">
              ⚡
            </div>
            <div className="flex flex-col leading-none shrink-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-base sm:text-xl font-black italic tracking-tight text-white">
                  TheCodeBrains
                </span>
                <span className="bg-[#ffe500] text-slate-900 text-[8px] sm:text-[9px] font-black px-1 sm:px-1.5 py-0.5 rounded italic shadow-xs">
                  PLUS✦
                </span>
                <span className="hidden lg:inline-flex items-center gap-1 bg-slate-900/90 text-orange-400 border border-slate-700 text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase shadow-xs">
                  <svg className="w-2.5 h-2.5 fill-[#F38020]" viewBox="0 0 24 24">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                  </svg>
                  Cloudflare Secured
                </span>
              </div>
              <span className="hidden sm:block text-[9px] text-blue-100 font-bold tracking-widest uppercase mt-0.5">
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
          <div className="flex items-center gap-1.5 sm:gap-2.5 text-xs font-extrabold shrink-0">
            <a
              href="https://t.me/thecodebrainss"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#229ED9] hover:bg-[#1c8bbd] text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition flex items-center gap-1 shadow-sm text-[10px] sm:text-[11px] shrink-0"
              title="Join Telegram Channel for Instant Deals"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .54-1.43.53-.47-.01-1.37-.26-2.04-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.89 8.01-3.46 3.81-1.59 4.6-1.87 5.12-1.88.11 0 .37.03.54.17.14.12.18.28.2.45-.01.07.01.23 0 .38z"/>
              </svg>
              <span className="hidden xs:inline">Telegram</span>
            </a>

            <a
              href="https://whatsapp.com/channel/0029VbDQp84DOQIPmdj9430p"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition flex items-center gap-1 shadow-sm text-[10px] sm:text-[11px] shrink-0"
              title="Join WhatsApp Channel for Coupon Alerts"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.15 4.201 4.293-1.124z"/>
              </svg>
              <span className="hidden xs:inline">WhatsApp</span>
            </a>

            <Link
              href="/browse"
              className="bg-[#ffe500] hover:bg-yellow-300 text-slate-950 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg transition flex items-center gap-1 shadow-sm uppercase tracking-wider text-[10px] sm:text-[11px] shrink-0 font-black"
            >
              <Zap size={13} className="fill-slate-950 shrink-0" />
              <span>Deals</span>
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
              {currentNavData.map((item) => {
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
                    <span className="bg-[#ffe500] text-slate-900 text-[9px] font-black px-2 py-0.5 rounded uppercase">
                      Live Verified
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setOpenSlug(null);
                      setIsLocked(false);
                    }}
                    aria-label="Close menu"
                    className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div
                  className={`grid gap-6 ${
                    activeNavData.columns?.length === 1
                      ? "grid-cols-1"
                      : activeNavData.columns?.length === 2
                      ? "grid-cols-2"
                      : activeNavData.columns?.length === 3
                      ? "grid-cols-3"
                      : "grid-cols-2 sm:grid-cols-4"
                  }`}
                >
                  {activeNavData.columns?.map((col, idx) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-1.5 border-b border-slate-100 flex items-center justify-between">
                        <span>{col.heading}</span>
                      </h4>
                      <ul className="space-y-1">
                        {col.links.map((link, lIdx) => (
                          <li key={lIdx}>
                            {link.disabled ? (
                              <span className="text-slate-300 text-xs font-medium cursor-not-allowed flex items-center justify-between py-1">
                                {link.label}
                                <span className="text-[8px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded font-black uppercase">
                                  Soon
                                </span>
                              </span>
                            ) : (
                              <Link
                                href={link.href}
                                onClick={() => {
                                  setOpenSlug(null);
                                  setIsLocked(false);
                                }}
                                className="text-slate-600 hover:text-[#2874f0] text-xs font-semibold hover:font-bold py-1 block transition flex items-center justify-between group/link"
                              >
                                <span>{link.label}</span>
                                <span className="text-[#2874f0] opacity-0 group-hover/link:opacity-100 transition-opacity font-bold">
                                  →
                                </span>
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
