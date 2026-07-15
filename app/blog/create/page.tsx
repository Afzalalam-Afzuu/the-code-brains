// app/blog/create/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogCreateForm from "../../../components/BlogCreateForm";

export const metadata = {
  title: "Write a New Blog Post - TheCodeBrains",
  description: "Publish a new technology review, AI automation guide, or general tutorial to TheCodeBrains blog.",
};

export default function WriteBlogPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen pb-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-650 transition uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="border-b border-slate-100 pb-5 mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Create a New <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Blog Post</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1.5 font-medium">
              Fill out the form below. The post will be automatically saved to Supabase and published live instantly.
            </p>
          </div>

          {/* Form */}
          <BlogCreateForm />
        </div>

      </div>
    </div>
  );
}
