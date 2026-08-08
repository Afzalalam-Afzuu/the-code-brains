// app/blog/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, CheckCircle2, Share2, Bookmark, ExternalLink } from "lucide-react";
import { getBlogBySlug, getBlogs } from "../../../lib/db-actions";
import { parseMarkdown } from "../../../lib/markdown";
import BlogShareBar from "../../../components/BlogShareBar";
import SafeBlogImage from "../../../components/SafeBlogImage";
import AdBanner from "../../../components/AdBanner";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

// Force SSR (Server-Side Rendering) by setting dynamic rendering behaviour
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found - TheCodeBrains",
    };
  }

  const title = `${blog.title} — TheCodeBrains`;
  const description = blog.excerpt;
  const canonicalUrl = `${siteUrl}/blog/${slug}`;

  const rawImage = blog.image || `${siteUrl}/images/og-image.png`;
  const ogImage = rawImage.startsWith("http")
    ? rawImage
    : `${siteUrl}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;

  return {
    title,
    description,
    keywords: [blog.tag, blog.title, "TheCodeBrains blog", "Tech Guide India", "Reviews"],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title: `🔥 ${blog.title}`,
      description: `⚡ ${blog.excerpt}`,
      url: canonicalUrl,
      siteName: "TheCodeBrains",
      publishedTime: blog.date,
      authors: [blog.author || "TheCodeBrains Team"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `🔥 ${blog.title}`,
      description: `⚡ ${blog.excerpt}`,
      images: [ogImage],
    },
  };
}

export default async function DynamicBlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Fetch other blogs for the sidebar recommendations
  const allBlogs = await getBlogs();
  const recommendedBlogs = allBlogs.filter((p) => p.slug !== slug).slice(0, 3);

  const formattedHtmlContent = parseMarkdown(blog.content);

  // JSON-LD Article Schema
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt,
    "image": blog.image ? [blog.image] : [`${siteUrl}/og-image.png`],
    "datePublished": blog.date,
    "author": {
      "@type": "Person",
      "name": blog.author || "TheCodeBrains Team",
    },
    "publisher": {
      "@type": "Organization",
      "name": "TheCodeBrains",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`,
    },
  };

  return (
    <div className="bg-slate-50/50 min-h-screen pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      {/* Article Header Banner */}
      <div className="bg-slate-900 text-white py-12 sm:py-16 relative overflow-hidden">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/10 blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-to-tr from-emerald-500/10 to-indigo-500/20 blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-4">
          {/* Back button and Category */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider"
            >
              <ArrowLeft size={14} />
              <span>Back to Blog</span>
            </Link>

            <span className="bg-indigo-600/90 text-white text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase">
              {blog.tag}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15] mb-6">
            {blog.title}
          </h1>

          {/* Subtitle / Excerpt */}
          <p className="text-slate-300 text-base sm:text-lg font-medium max-w-3xl mb-8 leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 border-t border-slate-800 pt-6">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-300">
                  {blog.author.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="font-bold text-slate-200">{blog.author}</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{blog.date}</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{blog.readTime}</span>
              </div>
            </div>

            {/* Header Share Bar */}
            <BlogShareBar title={blog.title} slug={slug} excerpt={blog.excerpt} />
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-4xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
        
        {/* Blog Post Content Body */}
        <article className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xs">
          
          {/* Featured Image */}
          {blog.image && (
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-100 mb-8 relative">
              <SafeBlogImage 
                src={blog.image} 
                alt={blog.title} 
                tag={blog.tag}
                title={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Rendered HTML Content */}
          <div 
            className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formattedHtmlContent }}
          />

          {/* Dedicated Ad Placement in Article */}
          <AdBanner className="my-8" />

          {/* Bottom Sharing Bar */}
          <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50 p-4 rounded-2xl">
            <BlogShareBar title={blog.title} slug={slug} excerpt={blog.excerpt} className="justify-center sm:justify-start" />
          </div>

          {/* Bottom Disclosure */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <p className="text-slate-400 text-[10px] italic max-w-sm text-center sm:text-left">
              Disclosure: This guide is a reader-supported review. Clicking links may earn us an affiliate commission from our merchant partners at no extra cost to you.
            </p>
          </div>

        </article>

        {/* Sidebar Info & Sharing */}
        <aside className="space-y-6">
          {/* Sidebar Dedicated Ad Placement */}
          <AdBanner className="my-2" format="rectangle" />

          {/* Author Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs text-center">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Written By</h4>
            <div className="w-12 h-12 rounded-full bg-slate-100 font-bold text-slate-700 flex items-center justify-center text-sm mx-auto mb-3 shadow-inner">
              {blog.author.split(' ').map(n => n[0]).join('')}
            </div>
            <p className="font-black text-slate-800 text-sm">{blog.author}</p>
            <p className="text-slate-400 text-[10px] mt-0.5">Technology Contributor</p>
          </div>

          {/* Share article */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs text-center">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Share Guide</h4>
            <BlogShareBar title={blog.title} slug={slug} excerpt={blog.excerpt} className="flex-col items-stretch gap-2" />
          </div>

          {/* Recommended Reads */}
          {recommendedBlogs.length > 0 && (
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs text-left">
              <h4 className="text-xs font-black text-slate-905 uppercase tracking-wider pb-2.5 border-b border-slate-100 mb-3 font-extrabold">
                Recommended Reads
              </h4>
              <div className="space-y-4">
                {recommendedBlogs.map((post) => (
                  <Link key={post.slug} href={post.href} className="group block text-xs">
                    <p className="font-extrabold text-indigo-600 uppercase tracking-wider text-[9px] mb-0.5">
                      {post.tag}
                    </p>
                    <p className="font-bold text-slate-850 group-hover:text-indigo-600 transition line-clamp-2 leading-snug">
                      {post.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>

      </div>
    </div>
  );
}
