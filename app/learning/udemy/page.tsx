// app/learning/udemy/page.tsx
import Link from "next/link";
import { Search, Star, ExternalLink, GraduationCap, Award, BookOpen, AlertCircle, ArrowRight } from "lucide-react";
import { affiliateFactory } from "../../../lib/services/affiliate/factory";

export const metadata = {
  title: "Udemy Online Courses - TheCodeBrains",
  description: "Browse and search top-rated Udemy courses on web development, programming, AI, data science, and design with verified ratings.",
};

const POPULAR_TOPICS = [
  { label: "All Development", query: "Development" },
  { label: "Next.js", query: "Next.js" },
  { label: "React", query: "React" },
  { label: "Python", query: "Python" },
  { label: "TypeScript", query: "TypeScript" },
  { label: "AI & ChatGPT", query: "ChatGPT" }
];

export default async function UdemyPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q?.trim() || "";
  const page = Number(resolvedParams.page) || 1;

  const provider = affiliateFactory.getProvider("udemy");
  
  // If query is empty, default search is "Development" to show popular courses
  const searchResult = await provider.search({
    query: query || "Development",
    page,
    pageSize: 12
  });

  return (
    <div className="bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-[11px] font-bold text-slate-400 mb-4 space-x-1 tracking-wider uppercase">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span className="mx-1 text-slate-300">›</span>
          <span className="text-slate-500">Learning</span>
          <span className="mx-1 text-slate-300">›</span>
          <span className="text-slate-600">Udemy Courses</span>
        </nav>

        {/* Hero Header Area */}
        <div className="relative border border-slate-100 rounded-3xl p-8 sm:p-12 bg-white shadow-xs overflow-hidden mb-10">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-50 to-violet-50/30 blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-72 h-72 rounded-full bg-gradient-to-tr from-emerald-50/20 to-indigo-50/20 blur-3xl -z-10" />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-5">
              <GraduationCap size={14} className="animate-pulse" />
              <span>Premium Tech Education</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-[1.1]">
              Browse Premium <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Udemy Courses</span>
            </h1>
            
            <p className="text-slate-550 text-base sm:text-lg font-medium leading-relaxed mb-8">
              Upgrade your engineering and design skills with top-rated online courses, certified tutorials, and expert instruction.
            </p>

            {/* Native Search Input Form */}
            <form action="/learning/udemy" method="GET" className="relative flex items-center max-w-xl">
              <div className="relative w-full">
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Search courses (e.g. Next.js, Python, React...)"
                  className="w-full pl-5 pr-14 py-4 bg-slate-55/40 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 outline-none rounded-2xl text-sm font-medium transition-all shadow-xs text-slate-800 placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-slate-900 hover:bg-indigo-600 text-white p-2.5 rounded-xl transition-all shadow-xs hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
                  aria-label="Submit Search"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* Popular Topics Quick Filters */}
            <div className="flex flex-wrap items-center gap-2 mt-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Popular:</span>
              {POPULAR_TOPICS.map((topic) => {
                const isActive = (query === "" && topic.query === "Development") || (query.toLowerCase() === topic.query.toLowerCase());
                return (
                  <Link
                    key={topic.label}
                    href={topic.query === "Development" ? "/learning/udemy" : `/learning/udemy?q=${encodeURIComponent(topic.query)}`}
                    className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all border ${
                      isActive
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-100"
                        : "bg-slate-100 hover:bg-slate-200 border-transparent text-slate-650"
                    }`}
                  >
                    {topic.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Info Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              {query ? `Search Results for "${query}"` : "Recommended Development Courses"}
            </h2>
            <p className="text-slate-450 text-xs mt-1 font-medium">
              Showing {searchResult.products.length} courses from Udemy's official directory
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 bg-slate-100/60 border border-slate-200/40 rounded-xl px-3 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <Award size={14} className="text-indigo-500" />
            <span>Affiliate Verified</span>
          </div>
        </div>

        {/* Zero State */}
        {searchResult.products.length === 0 && (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl shadow-xs">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-100">
              <AlertCircle size={28} className="text-amber-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No courses match your query</h3>
            <p className="text-slate-400 text-xs max-w-sm mx-auto mt-2 leading-relaxed">
              We couldn't find any courses for "{query}". Try checking your spelling or choosing one of our popular topics above.
            </p>
            <Link
              href="/learning/udemy"
              className="inline-flex items-center gap-2 mt-6 bg-slate-900 hover:bg-indigo-650 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
            >
              Reset Search Filter
            </Link>
          </div>
        )}

        {/* Course Grid */}
        {searchResult.products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResult.products.map((course) => {
              const stars = [];
              const rating = course.rating || 4.5;
              const fullStars = Math.floor(rating);
              for (let i = 1; i <= 5; i++) {
                if (i <= fullStars) {
                  stars.push(<Star key={i} size={13} className="fill-amber-400 text-amber-400" />);
                } else if (i === fullStars + 1 && rating % 1 >= 0.5) {
                  stars.push(<Star key={i} size={13} className="fill-amber-400/50 text-amber-400" />);
                } else {
                  stars.push(<Star key={i} size={13} className="text-slate-200" />);
                }
              }

              return (
                <div 
                  key={course.id} 
                  className="bg-white border border-slate-100 hover:border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
                >
                  {/* Thumbnail Image Container */}
                  <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={course.imageUrl} 
                      alt={course.title}
                      className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-xs text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md">
                      Udemy
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Instructor Label */}
                      <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                        <BookOpen size={10} />
                        <span className="truncate max-w-[180px]">{course.author}</span>
                      </span>

                      {/* Course Title */}
                      <h3 className="text-slate-900 font-bold text-sm leading-snug group-hover:text-indigo-650 transition-colors line-clamp-2 min-h-[40px] mb-2">
                        {course.title}
                      </h3>

                      {/* Course Headline Description */}
                      <p className="text-slate-450 text-[11px] leading-relaxed line-clamp-2 min-h-[34px] mb-4">
                        {course.description}
                      </p>
                    </div>

                    {/* Ratings & Price Footer */}
                    <div className="pt-3 border-t border-slate-100">
                      {/* Ratings Block */}
                      <div className="flex items-center gap-1.5 mb-3.5">
                        <div className="flex items-center gap-0.5">{stars}</div>
                        <span className="text-slate-700 text-xs font-bold">{rating}</span>
                        {course.reviewsCount && course.reviewsCount > 0 && (
                          <span className="text-slate-400 text-[10px] font-medium">({course.reviewsCount.toLocaleString()})</span>
                        )}
                      </div>

                      {/* Price & Call To Action */}
                      <div className="flex items-center justify-between gap-2 mt-auto">
                        <div className="flex flex-col">
                          <span className="text-slate-800 font-black text-sm">{course.price}</span>
                          {course.originalPrice && (
                            <span className="text-[10px] text-slate-405 line-through font-semibold leading-none">{course.originalPrice}</span>
                          )}
                        </div>

                        <a
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-3.5 rounded-xl text-xs transition-all flex items-center gap-1 hover:gap-1.5 shadow-sm shadow-indigo-100 hover:shadow-md cursor-pointer"
                        >
                          <span>Enroll</span>
                          <ExternalLink size={12} className="opacity-90" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Affiliate Disclosure Notice */}
        <div className="mt-16 border-t border-slate-200/80 pt-6 max-w-3xl mx-auto text-center">
          <p className="text-[10px] text-slate-400 leading-relaxed italic">
            <strong>Affiliate Transparency:</strong> TheCodeBrains curates and recommends products based on value and high ratings. 
            When you purchase a course through our links, we may receive an affiliate commission from Udemy at no additional cost to you. 
            This helps support the free guides and resources we build for developers.
          </p>
        </div>

      </div>
    </div>
  );
}
