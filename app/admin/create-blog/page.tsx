// app/admin/create-blog/page.tsx
import { checkAdminAuth } from "../../../lib/admin-auth";
import { redirect } from "next/navigation";
import BlogCreateForm from "../../../components/BlogCreateForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Write a New Blog - Admin Panel",
  description: "Create and publish articles to Supabase.",
};

export default async function AdminCreateBlogPage() {
  const isLoggedIn = await checkAdminAuth();
  if (!isLoggedIn) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back to dashboard breadcrumb */}
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-slate-450 hover:text-white uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={12} />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Form Container Card */}
      <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="border-b border-slate-800 pb-5 mb-8">
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Publish an <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Article</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1.5 font-medium">
            Draft your post content in Markdown. It will be stored in your Supabase DB and served to users in real-time.
          </p>
        </div>

        {/* Re-use the visual creation form component */}
        <BlogCreateForm />
      </div>
    </div>
  );
}
