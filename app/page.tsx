import Link from "next/link";
import Script from "next/script";
import ProductCard from "../components/ProductCard";
import { TrendingUp, Sparkles, ShieldCheck, Mail, Clock, ArrowRight, Zap, Flame, ShieldAlert, Award, Tag, Smartphone, Laptop, Tv, Headphones, HomeIcon, Ticket, BarChart3, CheckCircle, ExternalLink, HelpCircle, Wrench, Calendar, QrCode, Image as ImageIcon } from "lucide-react";
import { getBlogs, getDealOfTheDayProductsFromDB } from "../lib/db-actions";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "TheCodeBrains — India's #1 Tech Reviews, Deals & Price Comparison",
  description: "Never overpay for gadgets! Compare live prices across Amazon & Flipkart, read 100% independent buying guides, and get 200+ verified discount codes.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "🔥 TheCodeBrains — India's #1 Tech Reviews, Price Comparison & Deals Portal",
    description: "⚡ Compare live prices on Amazon & Flipkart, read independent buying guides, and unlock verified discount promo codes.",
    url: siteUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "TheCodeBrains WhatsApp OG Banner",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "🔥 TheCodeBrains — India's #1 Tech Reviews & Price Comparison",
    description: "Never overpay for gadgets! Compare live prices on Amazon & Flipkart, read independent guides & unlock verified promo codes.",
    images: [`${siteUrl}/images/og-image.png`],
  },
};

export default async function Home() {
  const blogs = await getBlogs();
  const featuredProducts = await getDealOfTheDayProductsFromDB();

  const faqItems = [
    {
      question: "How does TheCodeBrains verify deals and prices?",
      answer: "Our automated deal verification engine checks live prices across Amazon India, Flipkart, and authorized brand stores multiple times daily to confirm real discounts before listing."
    },
    {
      question: "Are product reviews on TheCodeBrains independent?",
      answer: "Yes, 100%. Our editors independently test hardware, camera performance, display accuracy, and battery benchmarks without brand interference."
    },
    {
      question: "How can I get price drop alerts and discount coupons?",
      answer: "You can join TheCodeBrains Plus Club for free by subscribing with your email to receive instant price drop notifications and verified promo codes."
    },
    {
      question: "Does TheCodeBrains charge readers for buying guides?",
      answer: "No, all buying guides, price comparison tools, and coupon directories on TheCodeBrains are 100% free for all users."
    }
  ];

  const homepageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": faqItems.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      },
      {
        "@type": "ItemList",
        "name": "Deals of the Day",
        "itemListElement": featuredProducts.map((p, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": p.title,
          "url": p.link || `${siteUrl}/browse`
        }))
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 pb-20 pt-4 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />

      {/* FLIPKART STYLE QUICK CATEGORY SHORTCUTS BAR */}
      <div className="fk-card p-3 sm:p-4 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-[650px] sm:min-w-0">
          {[
            { label: "Top Offers", icon: "🔥", href: "/browse", badge: "HOT" },
            { label: "Mobiles", icon: "📱", href: "/phones/best-picks" },
            { label: "Electronics", icon: "💻", href: "/computing/best-laptops" },
            { label: "TVs & Audio", icon: "📺", href: "/tv-audio/tv-best-picks" },
            { label: "Smart Home", icon: "🏠", href: "/home/best-smart-speakers" },
            { label: "Compare", icon: "⚖️", href: "/compare", badge: "NEW" },
            { label: "Coupons", icon: "🎟️", href: "/coupons", badge: "FREE" },
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

      {/* TRUST & AUTHORITY METRICS BAR */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-slate-800/80">
          <div className="px-2">
            <p className="text-lg sm:text-2xl font-black text-[#ffe500]">150,000+</p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Gadgets Tested</p>
          </div>
          <div className="px-2">
            <p className="text-lg sm:text-2xl font-black text-emerald-400">1.2M+</p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Monthly Readers</p>
          </div>
          <div className="px-2">
            <p className="text-lg sm:text-2xl font-black text-sky-400">100%</p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Independent Testing</p>
          </div>
          <div className="px-2">
            <p className="text-lg sm:text-2xl font-black text-indigo-400">Live 24/7</p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Price Comparisons</p>
          </div>
        </div>
      </div>

      {/* FLIPKART BIG HERO DEALS BANNER */}
      <div className="rounded-2xl bg-gradient-to-r from-[#2874f0] via-indigo-600 to-[#1259cb] text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#ffe500] text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              <Flame size={14} className="fill-slate-950" />
              Big Tech Savings Sale • Live Verified Deals
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              India's #1 Tech Reviews & Multi-Store Price Comparison
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm font-semibold max-w-2xl leading-relaxed">
              Compare live prices on Amazon, Flipkart & Brand Stores with 100% independent editor testing, lab benchmarks, and exclusive discount coupons.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/browse"
              className="bg-[#ffe500] hover:bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition text-center"
            >
              Shop All Deals →
            </Link>
            <Link
              href="/compare"
              className="bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-white/20 backdrop-blur-xs transition text-center"
            >
              Compare Specs ⚖️
            </Link>
          </div>
        </div>
      </div>

      {/* ADVERTISEMENT BANNER */}
      <div>
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
      <section className="fk-card p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <Zap size={24} className="text-[#2874f0] fill-[#2874f0]" />
                Deals of the Day
              </h2>
              <span className="bg-[#388e3c] text-white text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
                Verified Drops
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
          {featuredProducts.slice(0, 8).map((product) => (
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

      {/* FREE ONLINE WEB TOOLS SPOTLIGHT SECTION */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-xl">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Sparkles size={12} /> 15+ Free Online Web Tools
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Free Developer & Utility Tools Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              100% free, browser-based utilities engineered for speed and total privacy. Zero signups.
            </p>
          </div>

          <Link
            href="/tools"
            className="bg-[#2874f0] hover:bg-blue-600 text-white text-xs font-black px-6 py-3.5 rounded-2xl shadow-xl transition flex items-center justify-center gap-2 uppercase tracking-wider w-fit shrink-0 border border-blue-400/30"
          >
            <span>Explore All 15+ Tools Hub</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Small Icons Grid for All 15 Tools */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-4 border-t border-slate-800">
          {[
            { name: "AI Chat Bot", icon: "🤖", href: "/tools/ai-chat", badge: "AI" },
            { name: "Age Calculator", icon: "🗓️", href: "/tools/age-calculator" },
            { name: "QR Generator", icon: "📱", href: "/tools/qr-generator" },
            { name: "Image Compressor", icon: "🖼️", href: "/tools/image-compressor" },
            { name: "Password Generator", icon: "🔑", href: "/tools/password-generator" },
            { name: "Word & Text Tools", icon: "📝", href: "/tools/text-tools" },
            { name: "Unit Converter", icon: "📐", href: "/tools/unit-converter" },
            { name: "Color Palette", icon: "🎨", href: "/tools/color-palette" },
            { name: "Loan EMI Calc", icon: "💰", href: "/tools/emi-calculator" },
            { name: "BMI Health Calc", icon: "⚖️", href: "/tools/bmi-calculator" },
            { name: "JSON Formatter", icon: "💻", href: "/tools/json-formatter" },
            { name: "Base64 Converter", icon: "🔐", href: "/tools/base64-converter" },
            { name: "IP & Device Info", icon: "🌐", href: "/tools/ip-checker" },
            { name: "PDF Inspector", icon: "📄", href: "/tools/pdf-tools" },
            { name: "Dummy JSON Data", icon: "🗄️", href: "/tools/dummy-json" },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/80 hover:bg-slate-800/90 p-3 rounded-xl transition duration-200 group flex items-center gap-2.5 shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 group-hover:bg-[#2874f0] transition">
                {item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black text-slate-100 group-hover:text-amber-400 transition truncate">
                  {item.name}
                </p>
                <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 group-hover:text-white transition">
                  Open <ArrowRight size={10} className="group-hover:translate-x-0.5 transition" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* POPULAR BUYING CATEGORIES SHOWCASE GRID */}
      <section className="fk-card p-6">
        <div className="mb-6 pb-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Award size={24} className="text-indigo-600" />
              Explore By Category
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Deep-dive into tested buying recommendations across all tech verticals.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "Smartphones", icon: Smartphone, href: "/phones/best-picks", count: "120+ Guides", color: "bg-blue-50 text-blue-600 border-blue-200" },
            { name: "Laptops", icon: Laptop, href: "/computing/best-laptops", count: "85+ Reviews", color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
            { name: "TV & Display", icon: Tv, href: "/tv-audio/tv-best-picks", count: "60+ Tests", color: "bg-purple-50 text-purple-600 border-purple-200" },
            { name: "Headphones", icon: Headphones, href: "/tv-audio/earbuds", count: "90+ Picks", color: "bg-rose-50 text-rose-600 border-rose-200" },
            { name: "Smart Home", icon: HomeIcon, href: "/home/best-smart-speakers", count: "45+ Guides", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
            { name: "Discount Coupons", icon: Ticket, href: "/coupons", count: "200+ Active", color: "bg-amber-50 text-amber-600 border-amber-200" },
          ].map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <Link
                key={idx}
                href={cat.href}
                className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-md hover:border-[#2874f0] transition duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${cat.color} mb-3 group-hover:scale-110 transition duration-300`}>
                  <IconComp size={24} />
                </div>
                <h3 className="font-extrabold text-slate-900 text-xs group-hover:text-[#2874f0] transition">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED BUYING GUIDES GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              {blogs.slice(0, 5).map((item, index) => (
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

      {/* VERIFIED COUPONS SPOTLIGHT WIDGET */}
      <section className="fk-card p-6 bg-gradient-to-br from-amber-500/10 via-amber-50/50 to-white border border-amber-200/80 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-3 border-b border-amber-200/60 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Ticket size={24} className="text-amber-600" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Top Verified Promo Codes & Coupons
              </h2>
            </div>
            <p className="text-xs text-slate-600 font-semibold mt-1">
              Active discount codes verified by our team today.
            </p>
          </div>
          <Link href="/coupons" className="text-xs font-black text-amber-700 hover:underline uppercase tracking-wider flex items-center gap-1">
            Browse All Coupons →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { store: "Amazon India", discount: "10% INSTANT CARD DISCOUNT", code: "HDFC2026", desc: "Valid on Mobiles & Laptops" },
            { store: "Flipkart", discount: "UP TO ₹5,000 EXCHANGE BONUS", code: "EXCHANGE5K", desc: "Valid on Flagship Smartphones" },
            { store: "Hostinger", discount: "75% OFF + FREE DOMAIN", code: "THECODEBRAINS", desc: "Valid on Premium Web Hosting" },
            { store: "Udemy", discount: "COURSES AT ₹399 ONLY", code: "LEARN2026", desc: "Valid on Tech & Coding Courses" },
          ].map((c, i) => (
            <div key={i} className="bg-white border border-amber-200 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[9px] font-black text-amber-700 uppercase bg-amber-100 px-2 py-0.5 rounded">
                  {c.store}
                </span>
                <p className="font-black text-slate-900 text-xs mt-2 leading-tight">
                  {c.discount}
                </p>
                <p className="text-[10px] text-slate-500 mt-1 font-medium">
                  {c.desc}
                </p>
              </div>
              <div className="bg-slate-900 text-amber-400 font-mono font-black text-xs px-3 py-2 rounded-lg flex items-center justify-between">
                <span>{c.code}</span>
                <span className="text-[9px] text-slate-400 font-sans uppercase">Copy</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MULTI-STORE PRICE COMPARISON SPOTLIGHT */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="space-y-3">
            <span className="bg-[#2874f0] text-white text-[9px] font-black px-2.5 py-1 rounded uppercase tracking-wider">
              Price Engine
            </span>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight">
              Compare Amazon vs Flipkart Prices Live
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              Don't overpay! Our real-time price comparison engine checks multi-store prices, seller ratings, and bank offers side-by-side.
            </p>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 bg-[#ffe500] text-slate-950 font-black text-xs uppercase px-5 py-3 rounded-xl hover:bg-yellow-300 transition"
            >
              <BarChart3 size={16} /> Launch Price Comparator
            </Link>
          </div>

          <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800">
              <span>Popular Gadget</span>
              <span>Amazon India</span>
              <span>Flipkart</span>
              <span>Best Store</span>
            </div>

            {[
              { name: "Apple iPhone 16 Pro (128GB)", amz: "₹1,19,900", fk: "₹1,18,990", best: "Flipkart (-₹910)" },
              { name: "Samsung Galaxy S25 Ultra", amz: "₹1,24,999", fk: "₹1,26,000", best: "Amazon (-₹1,001)" },
              { name: "MacBook Air M3 (16GB RAM)", amz: "₹1,04,900", fk: "₹1,04,900", best: "Same Price" },
            ].map((row, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-bold py-2 border-b border-slate-900 last:border-0">
                <span className="text-slate-200 truncate max-w-[180px] sm:max-w-none">{row.name}</span>
                <span className="text-slate-400">{row.amz}</span>
                <span className="text-slate-400">{row.fk}</span>
                <span className="text-emerald-400 font-extrabold">{row.best}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO FAQ SECTION FOR RICH SNIPPETS & BETTER SEARCH INDEXING */}
      <section className="fk-card p-6 sm:p-8 bg-white border border-slate-100 rounded-2xl">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 tracking-tight flex items-center gap-2">
          <HelpCircle size={22} className="text-[#2874f0]" />
          Frequently Asked Questions (FAQ)
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Everything you need to know about our buying guides, deal verification, and affiliate transparency.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {faqItems.map((faq, i) => (
            <div key={i} className="bg-slate-50 border border-slate-100 p-5 rounded-xl flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm mb-2 leading-snug">
                  {faq.question}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed font-normal">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TELEGRAM & WHATSAPP OFFICIAL COMMUNITY BANNER */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-700 to-sky-600 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              ⚡ Instant Loot Deal Alerts
            </div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              Join Our Official Telegram & WhatsApp Channels
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm font-semibold max-w-xl">
              Get instant notification for 90% OFF price drops, Amazon/Flipkart glitch deals, and newly published free web tools before anyone else!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="https://t.me/thecodebrainss"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#229ED9] hover:bg-[#1b8abf] text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 border border-white/20"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .54-1.43.53-.47-.01-1.37-.26-2.04-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.89 8.01-3.46 3.81-1.59 4.6-1.87 5.12-1.88.11 0 .37.03.54.17.14.12.18.28.2.45-.01.07.01.23 0 .38z"/>
              </svg>
              <span>Join Telegram Channel</span>
            </a>

            <a
              href="https://whatsapp.com/channel/0029VbDQp84DOQIPmdj9430p"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1eb652] text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 border border-white/20"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.15 4.201 4.293-1.124z"/>
              </svg>
              <span>Join WhatsApp Channel</span>
            </a>
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


