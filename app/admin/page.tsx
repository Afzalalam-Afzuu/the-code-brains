// app/admin/page.tsx
import { checkAdminAuth } from "../../lib/admin-auth";
import { redirect } from "next/navigation";
import { getBlogs, getAffiliateProductsFromDB, getAffiliateClicksFromDB } from "../../lib/db-actions";
import Link from "next/link";
import { Plus, BookOpen, Tag, ShoppingBag, ExternalLink, Flame, MousePointerClick, Activity } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard - TheCodeBrains",
  description: "Manage system articles, affiliate products, and link click analytics.",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const isLoggedIn = await checkAdminAuth();
  if (!isLoggedIn) {
    redirect("/admin/login");
  }

  const blogs = await getBlogs();
  const products = await getAffiliateProductsFromDB();
  const clickLogs = await getAffiliateClicksFromDB();

  return (
    <div className="w-full space-y-6">
      {/* Welcome Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Control Center Overview</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Welcome back! Manage your blog publications, affiliate products, and live click tracking.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/navigation"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider px-4 py-3 rounded-xl transition duration-300 shadow-md cursor-pointer"
          >
            <Plus size={15} />
            <span>Manage Nav Menu</span>
          </Link>
          <Link
            href="/admin/add-product"
            className="inline-flex items-center gap-1.5 bg-[#2874f0] hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider px-4 py-3 rounded-xl transition duration-300 shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Product</span>
          </Link>
          <Link
            href="/admin/create-blog"
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider px-4 py-3 rounded-xl transition duration-300 shadow-md cursor-pointer"
          >
            <Plus size={15} />
            <span>Write Blog</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Total Link Clicks", value: clickLogs.length, icon: MousePointerClick, color: "text-emerald-600 bg-emerald-50 border border-emerald-100" },
          { label: "Active Products", value: products.length, icon: ShoppingBag, color: "text-[#2874f0] bg-blue-50 border border-blue-100" },
          { label: "Deals of the Day", value: products.filter(p => p.featured).length, icon: Flame, color: "text-amber-600 bg-amber-50 border border-amber-100" },
          { label: "Published Articles", value: blogs.length, icon: BookOpen, color: "text-indigo-600 bg-indigo-50 border border-indigo-100" },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-slate-500 text-[10px] font-extrabold uppercase tracking-wider">{item.label}</p>
                <div className={`p-2 rounded-xl ${item.color}`}>
                  <Icon size={18} />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">{item.value}</p>
            </div>
          );
        })}
      </div>

      {/* AFFILIATE PRODUCTS LIST TABLE SECTION */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#2874f0]" />
              Recent Live Products ({products.length})
            </h3>
            <p className="text-slate-500 text-xs mt-0.5 font-medium">
              Live products stored in Supabase database (<code className="text-[#2874f0] font-bold">affiliate_products</code>).
            </p>
          </div>
          <Link
            href="/admin/add-product"
            className="bg-[#2874f0] hover:bg-blue-700 text-white font-extrabold text-xs uppercase px-4 py-2 rounded-xl transition flex items-center gap-1 shrink-0"
          >
            <Plus size={14} /> Add Product
          </Link>
        </div>

        {/* Mobile & Desktop Responsive Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase font-extrabold tracking-widest text-[9px] bg-slate-50/50">
                <th className="py-3 pl-3">Product</th>
                <th className="py-3">Category</th>
                <th className="py-3">Merchant</th>
                <th className="py-3">Price</th>
                <th className="py-3">Placement</th>
                <th className="py-3 text-right pr-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.slice(0, 5).map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 pl-3 font-bold text-slate-800 max-w-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-1 shrink-0 overflow-hidden flex items-center justify-center shadow-2xs">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                      <span className="line-clamp-2 text-xs font-black text-slate-900">{item.title}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="bg-blue-50 border border-blue-100 text-[#2874f0] text-[9px] font-extrabold tracking-wide px-2.5 py-1 rounded-md uppercase">
                      {item.category || "General"}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="bg-amber-50 border border-amber-200 text-amber-800 text-[9px] font-extrabold tracking-wide px-2.5 py-1 rounded-md uppercase">
                      {item.merchant || "Amazon"}
                    </span>
                  </td>
                  <td className="py-4 font-black text-emerald-600 text-sm">
                    {item.currency}{item.price.toLocaleString()}
                    {item.oldPrice > item.price && (
                      <span className="block text-[10px] text-slate-400 line-through font-medium">
                        {item.currency}{item.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td className="py-4">
                    {item.featured ? (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase flex items-center gap-1 w-max">
                        <Flame size={10} className="fill-emerald-600 text-emerald-600" /> Home Deal
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                        Directory Only
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-right pr-3">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-[#2874f0] hover:bg-blue-700 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg transition"
                    >
                      <span>View</span>
                      <ExternalLink size={12} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECENT CLICK TRACKING ANALYTICS SECTION */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Activity size={18} className="text-emerald-600" />
              Live Affiliate Click Logs ({clickLogs.length})
            </h3>
            <p className="text-slate-500 text-xs mt-0.5 font-medium">
              Real-time user outbound clicks tracked via <code className="text-emerald-600 font-bold">affiliate_clicks</code> table in Supabase.
            </p>
          </div>
        </div>

        {clickLogs.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200/60">
            <MousePointerClick size={24} className="text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-600">No clicks recorded yet.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Clicks will show up here automatically when users click product buy links on your site!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase font-extrabold tracking-widest text-[9px] bg-slate-50/50">
                  <th className="py-3 pl-3">Timestamp</th>
                  <th className="py-3">Product ID</th>
                  <th className="py-3">Referrer</th>
                  <th className="py-3">User Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clickLogs.slice(0, 10).map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 pl-3 font-semibold text-slate-700 whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                    </td>
                    <td className="py-3">
                      <span className="bg-slate-100 text-slate-800 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                        {log.product_id}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500 max-w-xs truncate">
                      {log.referrer || 'Direct Visit'}
                    </td>
                    <td className="py-3 text-slate-400 max-w-xs truncate text-[10px]">
                      {log.user_agent || 'Unknown'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
