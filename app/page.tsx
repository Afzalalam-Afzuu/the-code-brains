import Link from "next/link";
import Script from "next/script";
import ProductCard from "../components/ProductCard";
import { TrendingUp, Sparkles, ShieldCheck, Mail, Clock, ArrowRight, Zap, Flame, ShieldAlert, Award, Tag } from "lucide-react";
import { getBlogs, getDealOfTheDayProductsFromDB } from "../lib/db-actions";

export default async function Home() {
  const blogs = await getBlogs();
  const featuredProducts = await getDealOfTheDayProductsFromDB();

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 pb-20 pt-4">

      {/* FLIPKART STYLE QUICK CATEGORY SHORTCUTS BAR */}
      <div className="fk-card p-3 sm:p-4 mb-5 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-[650px] sm:min-w-0">
          {[
            { label: "Top Offers", icon: "🔥", href: "/browse", badge: "HOT" },
            { label: "Mobiles", icon: "📱", href: "/phones/best-picks" },
            { label: "Electronics", icon: "💻", href: "/computing/best-laptops" },
            { label: "TVs & Appliances", icon: "📺", href: "/tv-audio/tv-best-picks" },
            { label: "Smart Home", icon: "🏠", href: "/home/best-smart-speakers" },
            { label: "AI Tools", icon: "🤖", href: "/browse" },
            { label: "Plus Club", icon: "✦", href: "/join", badge: "PLUS" },
          ].map((cat, i) => (
            <Link
              key={i}
              href={cat.href}
              className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-blue-50/80 transition group shrink-0"
            >
              <div className="relative w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-[#2874f0] group-hover:text-white transition-all duration-300 shadow-xs">
                {cat.icon}
                {cat.badge && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">
                    {cat.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-black text-slate-800 group-hover:text-[#2874f0] transition">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* FLIPKART BIG HERO DEALS BANNER */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#2874f0] via-indigo-600 to-[#1259cb] text-white p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#ffe500] text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              <Flame size={14} className="fill-slate-950" />
              Big Tech Savings Sale • Live Deals
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Lowest Prices Guaranteed On Verified Tech & Gadgets
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm font-semibold max-w-xl">
              Compare live prices on Amazon & Flipkart with 100% independent editor testing.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/browse"
              className="bg-[#ffe500] hover:bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition text-center"
            >
              Shop All Deals →
            </Link>
          </div>
        </div>
      </div>

      {/* ADVERTISEMENT BANNER */}
      <div className="mb-6">
        <div className="bg-white border border-slate-200/80 rounded-xl p-3 text-center relative overflow-hidden shadow-xs">
          <div className="absolute top-0 left-0 bg-slate-100 text-slate-500 text-[8px] font-black px-2 py-0.5 uppercase tracking-widest rounded-br-md">
            ADVERTISEMENT
          </div>
          <div className="advertisement-box flex justify-center items-center py-1">
            <Script
              id="ad-script-11284701"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(s){s.dataset.zone='11284701';s.src='https://omg10.com/4/11284701'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
              }}
            />
          </div>
        </div>
      </div>

      {/* FLIPKART STYLE DEALS OF THE DAY SECTION */}
      <section className="fk-card p-5 sm:p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <Zap size={24} className="text-[#2874f0] fill-[#2874f0]" />
                Deals of the Day
              </h2>
              <span className="bg-[#388e3c] text-white text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
                Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Top verified price drops on Amazon & Flipkart updated in real-time.
            </p>
          </div>
          <Link href="/browse" className="text-xs font-black text-[#2874f0] hover:underline uppercase tracking-wider flex items-center gap-1">
            View All Offers <ArrowRight size={14} />
          </Link>
        </div>

        {/* Dynamic Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              currency={product.currency}
              link={product.link}
              image={product.image}
              merchant={product.merchant}
              rating={product.rating}
              couponCode={product.couponCode}
              stores={product.stores}
            />
          ))}
        </div>
      </section>

      {/* FEATURED BUYING GUIDES GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Lead Story */}
        <div className="lg:col-span-2 fk-card p-6 flex flex-col justify-between group">
          <div>
            <div className="relative w-full h-80 rounded-xl overflow-hidden mb-4 bg-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/modern_smartphone.png"
                alt="Best Smartphones"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-3 left-3 bg-[#2874f0] text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider shadow">
                Flagship Review
              </span>
            </div>
            <span className="text-[10px] font-black text-[#2874f0] uppercase tracking-wider">Mobile Tech</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug group-hover:text-[#2874f0] transition mt-1">
              Best Smartphones of 2026 — 9 Flagships Tested For Battery & Cameras
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2">
              Our lab editors tested low-light photography, battery life under gaming load, and heat dissipation across every flagship.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">By Priya Sharma • Senior Editor</span>
            <Link href="/phones/best-picks" className="bg-[#2874f0] hover:bg-blue-700 text-white font-black text-xs uppercase px-4 py-2 rounded-lg transition">
              Read Guide →
            </Link>
          </div>
        </div>

        {/* Sidebar Trending Guides */}
        <div className="fk-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <TrendingUp size={18} className="text-[#2874f0]" />
              Trending Reviews
            </h3>
            <div className="divide-y divide-slate-100">
              {blogs.slice(0, 4).map((item, index) => (
                <Link key={index} href={item.href} className="flex gap-3 py-3 group block">
                  <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-black uppercase text-[#2874f0] bg-blue-50 px-1.5 py-0.5 rounded">
                      {item.tag}
                    </span>
                    <h4 className="font-extrabold text-slate-800 text-xs leading-snug group-hover:text-[#2874f0] transition line-clamp-2 mt-1">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FLIPKART STYLE NEWSLETTER CARD */}
      <section className="bg-slate-950 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <span className="bg-[#ffe500] text-slate-950 font-black text-[10px] px-2.5 py-1 rounded uppercase tracking-wider">
              TheCodeBrains Plus Club
            </span>
            <h2 className="text-xl sm:text-3xl font-black mt-2 tracking-tight">
              Get Exclusive Price Drop Alerts & Coupons
            </h2>
            <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
              Subscribe free to receive verified Amazon & Flipkart deals direct to your inbox.
            </p>
          </div>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter email address"
              className="bg-slate-900 border border-slate-800 text-white text-xs rounded-xl px-4 py-3 outline-none focus:border-[#2874f0] flex-1"
              required
            />
            <button
              type="submit"
              className="bg-[#2874f0] hover:bg-blue-600 text-white font-black text-xs uppercase px-5 py-3 rounded-xl transition shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
