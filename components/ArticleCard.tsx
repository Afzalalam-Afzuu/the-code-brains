import type { Article } from "../lib/articles-data";

const imageMap: Record<string, string> = {
  rose: "/images/modern_smartphone.png",
  slate: "/images/modern_laptop.png",
  amber: "/images/oled_tv.png",
  teal: "/images/premium_headphones.png",
  indigo: "/images/modern_smartphone.png",
  emerald: "/images/modern_laptop.png",
};

export default function ArticleCard({ article }: { article: Article }) {
  const imgSrc = imageMap[article.image] ?? "/images/modern_smartphone.png";

  return (
    <a
      href={`https://www.amazon.in/s?k=${encodeURIComponent(article.title)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-4 py-5 border-b border-slate-100 group"
    >
      <div className="w-32 h-24 sm:w-40 sm:h-28 shrink-0 rounded-lg overflow-hidden bg-slate-50 relative border border-slate-100">
        <img
          src={imgSrc}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
      <div className="min-w-0 flex-1 flex flex-col justify-between">
        <div>
          <span className="inline-block bg-indigo-50 text-indigo-700 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded mb-2">
            {article.tag}
          </span>
          <h3 className="font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition group-hover:underline text-base">
            {article.title}
          </h3>
          <p className="text-sm text-slate-500 mt-1 line-clamp-2">{article.excerpt}</p>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          By {article.author} • Last updated {article.date}
        </p>
      </div>
    </a>
  );
}
