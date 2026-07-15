// app/admin/page.tsx
import { checkAdminAuth } from "../../lib/admin-auth";
import { redirect } from "next/navigation";
import { getBlogs } from "../../lib/db-actions";
import Link from "next/link";
import { Plus, BookOpen, User, Tag, Calendar, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard - TheCodeBrains",
  description: "Manage system articles and configurations.",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const isLoggedIn = await checkAdminAuth();
  if (!isLoggedIn) {
    redirect("/admin/login");
  }

  const blogs = await getBlogs();

  return (
    <div className="space-y-8">
      {/* Welcome Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl -z-10" />
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Welcome back, Admin! Here is the current state of your blog publication network.
          </p>
        </div>

        <Link
          href="/admin/create-blog"
          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-750 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition duration-300 shadow-md cursor-pointer"
        >
          <Plus size={14} />
          <span>Write new blog</span>
        </Link>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Published Articles", value: blogs.length, icon: BookOpen, color: "text-indigo-400 bg-indigo-500/10" },
          { label: "Blog Authors", value: new Set(blogs.map(b => b.author)).size, icon: User, color: "text-emerald-400 bg-emerald-500/10" },
          { label: "Categories Active", value: new Set(blogs.map(b => b.tag)).size, icon: Tag, color: "text-amber-400 bg-amber-500/10" }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-slate-900 border border-slate-850 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-[10px] font-extrabold uppercase tracking-wider">{item.label}</p>
                <p className="text-3xl font-black text-white mt-1.5">{item.value}</p>
              </div>
              <div className={`p-3.5 rounded-xl ${item.color}`}>
                <Icon size={20} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Published Blogs Table Section */}
      <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-base font-black text-white">Manage Publications</h3>
          <p className="text-slate-400 text-xs mt-1">Listing of all available static and dynamic articles in database cache.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-extrabold tracking-widest text-[9px]">
                <th className="pb-3 pl-2">Title</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Author</th>
                <th className="pb-3">Date Published</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {blogs.map((blog) => (
                <tr key={blog.slug} className="group hover:bg-slate-850/30 transition-colors">
                  <td className="py-4 pl-2 font-bold text-slate-200 group-hover:text-white max-w-sm truncate">
                    {blog.title}
                  </td>
                  <td className="py-4">
                    <span className="bg-slate-950 border border-slate-800 text-slate-300 text-[9px] font-extrabold tracking-wide px-2 py-0.5 rounded uppercase">
                      {blog.tag}
                    </span>
                  </td>
                  <td className="py-4 text-slate-400 font-semibold">{blog.author}</td>
                  <td className="py-4 text-slate-400 font-semibold">{blog.date}</td>
                  <td className="py-4 text-right pr-2">
                    <Link
                      href={blog.href}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-bold"
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
