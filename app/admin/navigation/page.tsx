// app/admin/navigation/page.tsx
import { checkAdminAuth } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import { getNavDataFromDB } from "@/lib/db-actions";
import Link from "next/link";
import { ArrowLeft, Menu, Plus, ShieldCheck, Tag } from "lucide-react";
import AddNavItemForm from "./AddNavItemForm";

export const metadata = {
  title: "Manage Navigation Menu - Admin Dashboard",
  description: "Add dynamic categories and dropdown menu links into Supabase database.",
};

export const dynamic = "force-dynamic";

export default async function AdminNavigationPage() {
  const isLoggedIn = await checkAdminAuth();
  if (!isLoggedIn) {
    redirect("/admin/login");
  }

  const navItems = await getNavDataFromDB();

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-[#2874f0] transition uppercase tracking-wider mb-2"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Menu size={22} className="text-[#2874f0]" />
            Dynamic Navigation Menu Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage top header categories, mega menus, and links stored in Supabase database (<code className="text-[#2874f0] font-bold">navigation_menu</code>).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs sticky top-24">
            <h3 className="text-sm font-black text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2 mb-4">
              <Plus size={16} className="text-[#2874f0]" /> Add New Menu Link
            </h3>
            <AddNavItemForm />
          </div>
        </div>

        {/* Live Menu Preview Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
            <h3 className="text-sm font-black text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between mb-4">
              <span className="flex items-center gap-2">
                <Tag size={16} className="text-[#2874f0]" /> Current Active Categories ({navItems.length})
              </span>
              <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                Live DB Sync
              </span>
            </h3>

            <div className="space-y-6">
              {navItems.map((cat) => (
                <div key={cat.slug} className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 mb-3">
                    <span className="font-black text-sm text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#2874f0]" />
                      {cat.label}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">slug: {cat.slug}</span>
                  </div>

                  {cat.columns ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {cat.columns.map((col, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-2xs">
                          <h4 className="text-[11px] font-extrabold text-[#2874f0] uppercase tracking-wider mb-2">
                            {col.heading}
                          </h4>
                          <ul className="space-y-1">
                            {col.links.map((link, lIdx) => (
                              <li key={lIdx} className="text-xs text-slate-700 flex items-center justify-between">
                                <span className="font-semibold">{link.label}</span>
                                <span className="text-[10px] font-mono text-slate-400">{link.href}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic font-semibold">Direct Link: {cat.href}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
