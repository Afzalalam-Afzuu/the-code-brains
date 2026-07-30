// app/admin/blogs/page.tsx
import { checkAdminAuth } from "../../../lib/admin-auth";
import { redirect } from "next/navigation";
import { getBlogs } from "../../../lib/db-actions";
import Link from "next/link";
import { Plus, BookOpen, ExternalLink, PenTool } from "lucide-react";

export const metadata = {
  title: "View Articles - TheCodeBrains Admin",
  description: "Manage system editorial blogs and article publications.",
};

export const dynamic = "force-dynamic";

export default async function BlogsManagerPage() {
  const isLoggedIn = await checkAdminAuth();
  if (!isLoggedIn) {
    redirect("/admin/login");
  }

  const blogs = await getBlogs();

  return (
    <div className="w-full space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#2874f0] font-extrabold text-xs uppercase tracking-wider mb-1">
            <BookOpen size={15} /> Editorial Management
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Blogs & Articles Publisher ({blogs.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Listing of all published static and dynamic blog articles in database cache.
          </p>
        </div>

        {/* TOP RIGHT ACTION BUTTON */}
        <Link
          href="/admin/create-blog"
          className="inline-flex items-center gap-2 bg-[#2874f0] hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition duration-300 shadow-md shadow-blue-500/20 cursor-pointer shrink-0"
        >
          <PenTool size={16} />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* BLOGS TABLE */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <BookOpen size={18} className="text-[#2874f0]" />
            Published Articles ({blogs.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase font-extrabold tracking-widest text-[9px] bg-slate-50/50">
                <th className="py-3 pl-3">Title</th>
                <th className="py-3">Category</th>
                <th className="py-3">Author</th>
                <th className="py-3">Date Published</th>
                <th className="py-3 text-right pr-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((blog) => (
                <tr key={blog.slug} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 pl-3 font-bold text-slate-900 max-w-sm truncate">
                    {blog.title}
                  </td>
                  <td className="py-4">
                    <span className="bg-blue-50 border border-blue-100 text-[#2874f0] text-[9px] font-extrabold tracking-wide px-2.5 py-1 rounded-md uppercase">
                      {blog.tag}
                    </span>
                  </td>
                  <td className="py-4 text-slate-600 font-semibold">{blog.author}</td>
                  <td className="py-4 text-slate-600 font-semibold">{blog.date}</td>
                  <td className="py-4 text-right pr-3">
                    <Link
                      href={blog.href}
                      target="_blank"
                      className="inline-flex items-center gap-1 bg-[#2874f0] hover:bg-blue-700 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg transition"
                    >
                      <span>View</span>
                      <ExternalLink size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
