import Link from "next/link";
import Script from "next/script";
import ProductCard from "../components/ProductCard";
import { TrendingUp, Sparkles, ShieldCheck, Mail, Clock, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">

      {/* TOP AD ADVERTISEMENT SLOT */}
      <div className="my-6">
        <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-4 text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 bg-slate-200 text-slate-500 text-[8px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-br-md">
            ADVERTISEMENT
          </div>
          <div className="advertisement-box flex justify-center items-center py-2">
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(s){s.dataset.zone='11284701';s.src='https://omg10.com/4/11284701'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
              }}
            />
          </div>
        </div>
      </div>

      {/* AFFILIATE DISCLOSURE BANNER */}
      <div className="mb-8 border-b border-slate-100 pb-4">
        <p className="text-[11px] text-slate-400 leading-relaxed">
          <span className="font-bold text-slate-500 uppercase tracking-wide mr-1">Affiliate Disclosure:</span>
          TheCodeBrains is an independent, reader-supported review site. When you buy through links on our site, we may earn an affiliate commission from our merchant partners (like Amazon and Best Buy). This does not affect our product evaluation ratings or editorial independence.
        </p>
      </div>

      {/* HERO SECTION: GRID OF FEATURED STORY + SIDEBAR */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Featured Article (66% Width) */}
        <div className="lg:col-span-2 flex flex-col justify-between border border-slate-100 rounded-2xl p-6 bg-white shadow-xs hover:shadow-md transition-shadow duration-300 group">
          <div>
            <Link href="/phones/best-picks" className="block relative w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
              <img
                src="/images/modern_smartphone.png"
                alt="Best Smartphones 2026"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-indigo-600 text-white text-[10px] font-extrabold tracking-wider px-3 py-1 rounded-full uppercase shadow-md">
                Featured Guide
              </span>
            </Link>

            <div className="mt-6">
              <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold mb-3">
                <span className="text-indigo-600 font-extrabold uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-md">Phones</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={12} /> 12 Min Read</span>
              </div>

              <Link href="/phones/best-picks">
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight hover:text-indigo-600 transition group-hover:underline">
                  Best phones of 2026 — 9 flagships worth your money
                </h1>
              </Link>

              <p className="mt-4 text-slate-500 text-base leading-relaxed">
                We've spent hundreds of hours testing every major flagship release this year, evaluating cameras under low light, battery drain under heavy use, and absolute computing power. Here is our definitive buying advice for what you should actually buy.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 font-bold text-indigo-700 flex items-center justify-center text-sm shadow-inner">
                PS
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Priya Sharma</p>
                <p className="text-xs text-slate-400">Senior Editor, Mobile Tech</p>
              </div>
            </div>
            <Link href="/phones/best-picks" className="bg-slate-950 text-white hover:bg-indigo-600 transition font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-xs">
              Read Guide
            </Link>
          </div>
        </div>

        {/* Sidebar: Trending Reviews (33% Width) */}
        <div className="flex flex-col justify-between border border-slate-100 rounded-2xl p-6 bg-white shadow-xs">
          <div>
            <h2 className="text-lg font-black text-slate-900 pb-4 border-b border-slate-100 flex items-center gap-2">
              <TrendingUp size={18} className="text-indigo-600" />
              Trending Guides
            </h2>

            <div className="divide-y divide-slate-100">
              {[
                {
                  category: "OLED TVs",
                  title: "Best OLED TVs in 2026 — tested and ranked",
                  href: "/tv-audio/tv-best-picks",
                  image: "/images/oled_tv.png",
                  readTime: "8 min"
                },
                {
                  category: "Computing",
                  title: "Best laptops in 2026, tested by our team",
                  href: "/computing/best-laptops",
                  image: "/images/modern_laptop.png",
                  readTime: "10 min"
                },
                {
                  category: "Audio",
                  title: "Sleek wireless headphones you can buy on a budget",
                  href: "/tv-audio/earbuds",
                  image: "/images/premium_headphones.png",
                  readTime: "6 min"
                }
              ].map((item, index) => (
                <Link key={index} href={item.href} className="flex gap-4 py-4 group block">
                  <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-50 border border-slate-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-extrabold uppercase text-indigo-600 tracking-wider bg-indigo-50/80 px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-indigo-600 group-hover:underline mt-1.5 transition">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 bg-slate-50/50 rounded-xl p-4 border border-slate-100">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 block uppercase mb-1">Affiliate Spotlight</span>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              We monitor price drops on verified gear 24/7. Join our newsletter to receive the top tech discounts direct to your inbox.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK CATEGORY CAROUSEL */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Sparkles size={18} className="text-indigo-600" />
            Popular Categories
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Best Phones", count: "12 Guides", href: "/phones/best-picks", icon: "📱" },
            { label: "OLED TVs", count: "8 Guides", href: "/tv-audio/tv-best-picks", icon: "📺" },
            { label: "Premium Laptops", count: "15 Guides", href: "/computing/best-laptops", icon: "💻" },
            { label: "Smart Home", count: "9 Guides", href: "/home/best-smart-speakers", icon: "🏠" },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="bg-white border border-slate-100 rounded-xl p-5 hover:shadow-md hover:border-slate-200 transition duration-300 flex items-center gap-4 group"
            >
              <div className="text-3xl p-2 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition duration-300">{c.icon}</div>
              <div>
                <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition text-sm">{c.label}</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{c.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SPONSORED HORIZONTAL AD BLOCK */}
      <div className="my-10">
        <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-indigo-600 text-[8px] font-extrabold px-3 py-1 uppercase tracking-widest rounded-bl-xl">
            SPONSORED
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black tracking-tight">Sony WH-1000XM6 Launch Deal</h3>
            <p className="text-slate-400 text-sm mt-1 leading-relaxed">
              Get the industry's best noise-cancelling headphones for $100 off today. Checked and verified live pricing at Amazon.
            </p>
          </div>
          <a
            href="https://www.amazon.in/s?k=Sony+WH-1000XM5"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-white text-slate-950 font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl hover:bg-indigo-500 hover:text-white transition duration-300 shadow-lg"
          >
            Shop Deal At Amazon →
          </a>
        </div>
      </div>

      {/* DEAL FINDER (PRODUCT GRID) */}
      <section className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck size={20} className="text-indigo-600" />
              Verified Deals of the Day
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-1">Our editors check thousands of prices daily to bring you verified tech discounts.</p>
          </div>
          <Link href="/browse" className="text-xs font-bold text-indigo-600 hover:underline uppercase tracking-wider flex items-center gap-1">
            Browse All Deals <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            title="Samsung Galaxy S26 Ultra 5G (512GB, Unlocked)"
            price={999}
            oldPrice={1299}
            link="https://www.amazon.in/s?k=Samsung+Galaxy+S24+Ultra"
            image="/images/modern_smartphone.png"
            merchant="Amazon"
          />
          <ProductCard
            title="Dell XPS 13 OLED (2026 Ultra-thin, 32GB RAM)"
            price={1149}
            oldPrice={1499}
            link="https://www.flipkart.com/search?q=Dell+XPS+13+OLED"
            image="/images/modern_laptop.png"
            merchant="Flipkart"
          />
          <ProductCard
            title="LG G6 OLED 55-inch Evo 4K HDR Smart TV"
            price={1399}
            oldPrice={1799}
            link="https://www.amazon.in/s?k=LG+OLED+55+inch+TV"
            image="/images/oled_tv.png"
            merchant="Amazon"
          />
          <ProductCard
            title="Sony WH-1000XM6 Active Noise Cancelling Headphones"
            price={299}
            oldPrice={399}
            link="https://www.flipkart.com/search?q=Sony+WH-1000XM5"
            image="/images/premium_headphones.png"
            merchant="Flipkart"
          />
        </div>
      </section>

      {/* SPONSORED SIDE-BY-SIDE NATIVE AD BLOCK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
        <div className="border border-dashed border-slate-200 bg-slate-50/30 rounded-xl p-5 text-center relative">
          <span className="absolute top-2 right-2 text-[8px] font-bold text-slate-400 uppercase tracking-widest">ADVERTISEMENT</span>
          <p className="text-sm font-bold text-slate-700 mt-2">Need a reliable VPN for your new tech?</p>
          <p className="text-xs text-slate-400 mt-1">Get 70% off NordVPN 2-Year plan + 3 months free. Verified security recommendation.</p>
          <a
            href="https://www.amazon.in/s?k=NordVPN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-xs font-bold text-indigo-600 hover:underline"
          >
            Get NordVPN Deal →
          </a>
        </div>
        <div className="border border-dashed border-slate-200 bg-slate-50/30 rounded-xl p-5 text-center relative">
          <span className="absolute top-2 right-2 text-[8px] font-bold text-slate-400 uppercase tracking-widest">ADVERTISEMENT</span>
          <p className="text-sm font-bold text-slate-700 mt-2">Protective Cases for iPhone 17 & Galaxy S26</p>
          <p className="text-xs text-slate-400 mt-1">Buy 1 Get 1 50% Off on military-grade protective cases at Spigen Amazon Store.</p>
          <a
            href="https://www.amazon.in/s?k=Spigen+Cases"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-xs font-bold text-indigo-600 hover:underline"
          >
            Shop Spigen Cases →
          </a>
        </div>
      </div>

      {/* ADDITIONAL BLOG CONTENT SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest Tech News & Buying Advice (Col span 2) */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-4 mb-6">
            Latest Tech Reviews & Buying Guides
          </h2>
          <div className="space-y-6">
            {[
              {
                tag: "ANTIVIRUS",
                title: "The best Android antivirus apps in 2026",
                excerpt: "The top Android antivirus apps guard against malware and typically bundle in a VPN, password manager, and phishing protection to secure your personal mobile files.",
                author: "Priya Sharma",
                date: "Jul 8, 2026",
                image: "/images/modern_smartphone.png"
              },
              {
                tag: "LAPTOPS",
                title: "Best laptops in 2026, tested by our team",
                excerpt: "From ultraportables with all-day battery life to power-packed creator workstations, these are the laptops we'd actually recommend spending your hard-earned money on.",
                author: "Karan Malhotra",
                date: "Jul 11, 2026",
                image: "/images/modern_laptop.png"
              },
              {
                tag: "OLED TVS",
                title: "Best QLED TVs for bright living rooms in 2026",
                excerpt: "If your living room gets a lot of natural sunlight, OLED can struggle with glare. These QLED sets battle bright light best without washed-out color contrast.",
                author: "Neha Verma",
                date: "Jul 4, 2026",
                image: "/images/oled_tv.png"
              }
            ].map((article, idx) => (
              <Link href="/browse" key={idx} className="flex flex-col sm:flex-row gap-6 p-5 border border-slate-100 rounded-xl hover:shadow-md transition duration-300 bg-white group block">
                <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden shrink-0 bg-slate-50 border border-slate-100">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-102 transition duration-300" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block bg-indigo-50 text-indigo-700 text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-md">
                      {article.tag}
                    </span>
                    <h3 className="font-bold text-slate-800 text-lg leading-snug group-hover:text-indigo-600 transition group-hover:underline mt-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 font-medium">
                    By {article.author} • Updated {article.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar: Newsletter Card & Quick Deals */}
        <div className="space-y-6">
          {/* Newsletter Card */}
          <div className="bg-slate-950 text-white rounded-2xl p-6 relative overflow-hidden border border-slate-800 shadow-xl">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl" />
            <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
              <Mail size={18} className="text-indigo-400" />
              TheCodeBrains Club Newsletter
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Join 50,000+ tech enthusiasts. Get the best tech reviews, buying guides, and verified coupons delivered daily to your inbox.
            </p>
            <form className="mt-4 space-y-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3.5 py-2.5 outline-none focus:border-indigo-500 transition"
                required
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs tracking-wider uppercase py-2.5 rounded-lg transition"
              >
                Subscribe Now
              </button>
            </form>
            <p className="text-[10px] text-slate-500 text-center mt-3">We value your privacy. Unsubscribe anytime in one click.</p>
          </div>

          {/* Quick Coupon Codes Spot */}
          <div className="border border-slate-100 rounded-2xl p-6 bg-white shadow-xs">
            <h3 className="text-sm font-black text-slate-900 pb-3 border-b border-slate-100 uppercase tracking-wider">
              Exclusive Promo Coupons
            </h3>
            <div className="mt-4 space-y-3">
              {[
                { store: "Best Buy", code: "BESTBUY10", discount: "10% Off Sitewide" },
                { store: "Amazon Store", code: "CODEBRAINS5", discount: "5% Off Selected Monitors" },
                { store: "Walmart Tech", code: "WALMART20", discount: "$20 Off orders over $150" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-800">{item.store}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{item.discount}</p>
                  </div>
                  <span className="font-mono text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-1 rounded border border-dashed border-indigo-200">
                    {item.code}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
