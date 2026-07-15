// app/blog/page.tsx
import Link from "next/link";
import { Mail, Clock, Calendar, ArrowRight, Sparkles, BookOpen, Plus } from "lucide-react";
import { getBlogs } from "../../lib/db-actions";

export const metadata = {
  title: "Technology Blog, Tutorials & Reviews - TheCodeBrains",
  description: "Read expert reviews, no-code automation tutorials, coding best practices, and TV & laptop reviews by TheCodeBrains team.",
};

// Force SSR (Server-Side Rendering) by setting dynamic rendering behaviour
export const dynamic = "force-dynamic";

export default async function BlogListingPage() {
  const blogs = await getBlogs();
  const [featuredPost, ...otherPosts] = blogs;

  return (
    <div className="bg-slate-50/50 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-[11px] font-bold text-slate-400 mb-4 space-x-1 tracking-wider uppercase">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span className="mx-1 text-slate-300">›</span>
          <span className="text-slate-650">Blog</span>
        </nav>

        {/* Blog Page Title */}
        <div className="border-b border-slate-100 pb-6 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              TheCodeBrains <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Stay ahead of the curve with expert reviews, technology tutorials, and no-code automation tips.
            </p>
          </div>
          
          {/* Admin Write Blog CTA */}
          <Link 
            href="/blog/create" 
            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <Plus size={14} />
            <span>Write a Blog</span>
          </Link>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          
          {/* Main Content Area */}
          <div className="space-y-12">
            
            {/* Featured Post Card (Prominent display for the latest article) */}
            {featuredPost ? (
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs hover:shadow-md transition-shadow duration-300 group flex flex-col md:flex-row gap-6">
                <Link 
                  href={featuredPost.href} 
                  className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0 block relative"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-indigo-600 text-white text-[9px] font-extrabold tracking-wider px-3 py-1 rounded-md uppercase shadow-md flex items-center gap-1">
                    <Sparkles size={10} />
                    <span>LATEST GUIDE</span>
                  </span>
                </Link>

                <div className="flex flex-col justify-between py-1">
                  <div>
                    <span className="bg-indigo-50 text-indigo-700 text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-md uppercase">
                      {featuredPost.tag}
                    </span>
                    
                    <Link href={featuredPost.href}>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight tracking-tight mt-3 hover:text-indigo-600 hover:underline transition-all">
                        {featuredPost.title}
                      </h2>
                    </Link>
                    
                    <p className="text-slate-500 text-sm mt-3 leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-xs text-slate-400 font-medium">
                      By <strong className="text-slate-700 font-bold">{featuredPost.author}</strong> • {featuredPost.date}
                    </div>

                    <Link 
                      href={featuredPost.href} 
                      className="inline-flex items-center gap-1 bg-slate-950 text-white hover:bg-indigo-600 transition font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-xl"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-8">
                <BookOpen size={40} className="mx-auto text-slate-350 mb-3" />
                <h3 className="font-bold text-slate-700">No blog posts found</h3>
                <p className="text-slate-400 text-xs mt-1">Check back later or click "Write a Blog" to publish one!</p>
              </div>
            )}

            {/* Other Posts Grid */}
            {otherPosts.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 mb-6 uppercase tracking-wider">
                  More Tech & AI Guides
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {otherPosts.map((post) => (
                    <div 
                      key={post.slug} 
                      className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        <Link 
                          href={post.href}
                          className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100 block mb-4"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          />
                        </Link>

                        <span className="bg-slate-100 text-slate-650 text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded uppercase">
                          {post.tag}
                        </span>

                        <Link href={post.href}>
                          <h4 className="font-bold text-slate-900 text-base leading-snug group-hover:text-indigo-600 hover:underline transition mt-2.5 line-clamp-2">
                            {post.title}
                          </h4>
                        </Link>

                        <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span>{post.date} • {post.readTime}</span>
                        <Link href={post.href} className="text-indigo-600 hover:underline font-bold flex items-center gap-0.5">
                          <span>Read</span>
                          <ArrowRight size={10} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            
            {/* Newsletter Subscription */}
            <div className="bg-slate-950 text-white rounded-2xl p-6 relative overflow-hidden border border-slate-800 shadow-xs">
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-indigo-600/20 rounded-full blur-2xl" />
              <h3 className="text-sm font-black tracking-tight flex items-center gap-1.5 mb-2">
                <Mail size={16} className="text-indigo-400" />
                TheCodeBrains Club
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                Join 50,000+ developers receiving the top tech, AI and gadget buying guides directly in their inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[11px] tracking-wider uppercase py-2 rounded-lg transition"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Popular/Trending Categories */}
            <div className="border border-slate-100 rounded-2xl p-5 bg-white shadow-xs">
              <h3 className="text-xs font-black text-slate-900 pb-3 border-b border-slate-100 uppercase tracking-wider mb-4">
                Popular Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {["AI Tools", "Laptops", "Smart Home", "Development", "Security", "Reviews"].map((tag) => (
                  <Link
                    key={tag}
                    href="/browse"
                    className="text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-650 transition px-3 py-1.5 rounded-lg text-slate-600 font-semibold"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
}
