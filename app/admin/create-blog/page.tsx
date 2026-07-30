// app/admin/create-blog/page.tsx
import { checkAdminAuth } from "../../../lib/admin-auth";
import { redirect } from "next/navigation";
import BlogCreateForm from "../../../components/BlogCreateForm";
import Link from "next/link";
import { ArrowLeft, List, BookOpen } from "lucide-react";

export const metadata = {
  title: "Write New Articles - Admin Panel",
  description: "Create and publish articles to Supabase.",
};

export default async function AdminCreateBlogPage() {
  const isLoggedIn = await checkAdminAuth();
  if (!isLoggedIn) {
    redirect("/admin/login");
  }

  return (
    <div className="w-full space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div>
          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-1 text-xs text-[#2874f0] hover:underline font-bold uppercase tracking-wider mb-2 transition"
          >
            <ArrowLeft size={14} /> Back to Articles List
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="text-[#2874f0]" />
            Publish New Article
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Draft your blog post content in Markdown. Saved articles serve in real-time.
          </p>
        </div>

        {/* TOP RIGHT BACK TO LIST VIEW BUTTON */}
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs uppercase px-5 py-3 rounded-xl transition border border-slate-200 shrink-0"
        >
          <List size={15} />
          <span>View All Articles</span>
        </Link>
      </div>

      {/* Full-Width Form Container Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-xs">
        <BlogCreateForm />
      </div>
    </div>
  );
}
