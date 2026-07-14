import Link from "next/link";
import { notFound } from "next/navigation";
import { navData } from "../../../lib/nav-data";
import { getCategoryPage } from "../../../lib/articles-data";
import ArticleCard from "../../../components/ArticleCard";

// Fully static generation: every mega-menu link gets pre-built at build time.
export function generateStaticParams() {
  const params: { category: string; sub: string }[] = [];
  for (const item of navData) {
    if (!item.columns) continue;
    for (const col of item.columns) {
      for (const link of col.links) {
        const parts = link.href.split("/").filter(Boolean);
        if (parts.length === 2) {
          params.push({ category: parts[0], sub: parts[1] });
        }
      }
    }
  }
  return params;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string; sub: string }>;
}) {
  const { category, sub } = await params;
  const href = `/${category}/${sub}`;

  const validTop = navData.some((item) => item.slug === category && item.columns);
  if (!validTop) notFound();

  const page = getCategoryPage(href);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
      <div>
        <nav className="text-[11px] font-bold text-slate-400 mb-3 space-x-1 tracking-wider uppercase">
          {page.breadcrumb.map((crumb, i) => (
            <span key={crumb}>
              {i > 0 && <span className="mx-1 text-slate-300">›</span>}
              <span className={i === page.breadcrumb.length - 1 ? "text-slate-500" : ""}>{crumb}</span>
            </span>
          ))}
        </nav>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 border-b border-slate-100 pb-4 mb-2">
          {page.title}
        </h1>
        <p className="text-xs font-extrabold text-slate-400 tracking-wider uppercase mt-8 mb-4">
          Latest Recommendations & Reviews
        </p>

        <div className="divide-y divide-slate-100 border-t border-slate-100">
          {page.articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>

      <aside className="space-y-6">
        {/* Ad slot */}
        <div className="border border-slate-100 rounded-2xl p-4 text-center bg-white shadow-xs relative overflow-hidden group">
          <div className="absolute top-0 left-0 bg-slate-200 text-slate-500 text-[8px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-br-md">
            ADVERTISEMENT
          </div>
          <div className="bg-slate-50 border border-slate-100/80 p-5 rounded-xl h-64 flex flex-col items-center justify-between text-slate-600 text-xs">
            <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mt-4">Sponsored Offer</span>
            <div className="my-3 text-center">
              <p className="font-extrabold text-slate-800 text-sm leading-snug">Spigen Armour Cases</p>
              <p className="text-slate-400 text-[10px] mt-1 font-medium">Military-grade drops protection for iPhone 17 and Galaxy S26 series.</p>
            </div>
            <a
              href="https://amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-slate-950 text-white hover:bg-indigo-600 transition font-bold py-2 rounded-lg text-[10px] uppercase tracking-wider"
            >
              Shop Spigen at Amazon
            </a>
          </div>
        </div>

        {/* Newsletter Card */}
        <div className="border border-slate-100 rounded-2xl p-6 bg-white shadow-xs">
          <h3 className="font-black text-slate-900 text-sm tracking-tight mb-2">Get TheCodeBrains Daily</h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            The best tech deals, price drops, and verified buying guides, straight to your inbox.
          </p>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full border border-slate-200 focus:border-indigo-500 outline-none rounded-lg px-3.5 py-2.5 text-xs transition"
              required
            />
            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg py-2.5 transition uppercase tracking-wider"
            >
              Subscribe now
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
}
