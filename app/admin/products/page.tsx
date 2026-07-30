// app/admin/products/page.tsx
import { checkAdminAuth } from "../../../lib/admin-auth";
import { redirect } from "next/navigation";
import { getAffiliateProductsFromDB } from "../../../lib/db-actions";
import Link from "next/link";
import { Plus, ShoppingBag, ExternalLink, Flame, Tag } from "lucide-react";

export const metadata = {
  title: "View Affiliate Products - TheCodeBrains Admin",
  description: "Manage system affiliate products and deal listings.",
};

export const dynamic = "force-dynamic";

export default async function ProductsManagerPage() {
  const isLoggedIn = await checkAdminAuth();
  if (!isLoggedIn) {
    redirect("/admin/login");
  }

  const products = await getAffiliateProductsFromDB();

  return (
    <div className="w-full space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#2874f0] font-extrabold text-xs uppercase tracking-wider mb-1">
            <ShoppingBag size={15} /> Products Management
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Deals & Products Manager ({products.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage your live affiliate products stored in Supabase database (<code className="text-[#2874f0]">affiliate_products</code>).
          </p>
        </div>

        {/* TOP RIGHT ACTION BUTTON */}
        <Link
          href="/admin/add-product"
          className="inline-flex items-center gap-2 bg-[#2874f0] hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition duration-300 shadow-md shadow-blue-500/20 cursor-pointer shrink-0"
        >
          <Plus size={16} />
          <span>Add Affiliate Product</span>
        </Link>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Tag size={18} className="text-[#2874f0]" />
            Live Product Directory ({products.length})
          </h3>
          <span className="text-xs text-slate-600 font-semibold bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
            Realtime DB Sync
          </span>
        </div>

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
              {products.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/80 transition-colors">
                  {/* Thumbnail & Title */}
                  <td className="py-4 pl-3 font-bold text-slate-800 max-w-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 p-1 shrink-0 overflow-hidden flex items-center justify-center shadow-2xs">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                      <span className="line-clamp-2 text-xs font-black text-slate-900">{item.title}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4">
                    <span className="bg-blue-50 border border-blue-100 text-[#2874f0] text-[9px] font-extrabold tracking-wide px-2.5 py-1 rounded-md uppercase">
                      {item.category || "General"}
                    </span>
                  </td>

                  {/* Merchant */}
                  <td className="py-4">
                    <span className="bg-amber-50 border border-amber-200 text-amber-800 text-[9px] font-extrabold tracking-wide px-2.5 py-1 rounded-md uppercase">
                      {item.merchant || "Amazon"}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-4 font-black text-emerald-600 text-sm">
                    {item.currency}{item.price.toLocaleString()}
                    {item.oldPrice > item.price && (
                      <span className="block text-[10px] text-slate-400 line-through font-medium">
                        {item.currency}{item.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </td>

                  {/* Placement */}
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

                  {/* Action */}
                  <td className="py-4 text-right pr-3">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-[#2874f0] hover:bg-blue-700 text-white text-[11px] font-extrabold px-3.5 py-1.5 rounded-lg transition shadow-xs"
                    >
                      <span>View Deal</span>
                      <ExternalLink size={12} />
                    </a>
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
