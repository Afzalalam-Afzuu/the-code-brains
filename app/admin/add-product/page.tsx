"use client";

import { useActionState, useState } from "react";
import { createAffiliateProductAction } from "../../../lib/db-actions";
import Link from "next/link";
import { navData } from "../../../lib/nav-data";
import { ArrowLeft, Tag, ShoppingBag, ShieldCheck, Image as ImageIcon, Sparkles, Flame, List } from "lucide-react";

export default function AddProductPage() {
  const [state, formAction, isPending] = useActionState(createAffiliateProductAction, null);
  const [imageUrl, setImageUrl] = useState("");
  const [merchant, setMerchant] = useState("Amazon");

  // Extract all categories from navigation bar
  const categories = [
    "Phones",
    "TV & Audio",
    "Computing",
    "AI",
    "Learning",
    "Home",
    "Wordle & Games",
    "General",
    ...navData.map((n) => n.label),
  ];
  const uniqueCategories = Array.from(new Set(categories));

  return (
    <div className="w-full space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1 text-xs text-[#2874f0] hover:underline font-bold uppercase tracking-wider mb-2 transition"
          >
            <ArrowLeft size={14} /> Back to Products List
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ShoppingBag className="text-[#2874f0]" />
            Add New Affiliate Product
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Fill in the details below. Products added here will save directly to your Supabase database.
          </p>
        </div>

        {/* TOP RIGHT BACK TO LIST VIEW BUTTON */}
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs uppercase px-5 py-3 rounded-xl transition border border-slate-200 shrink-0"
        >
          <List size={15} />
          <span>View All Products</span>
        </Link>
      </div>

      {/* Full-Width Form Container */}
      <form action={formAction} className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
        
        {/* Error Alert */}
        {state?.error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-extrabold p-4 rounded-xl flex items-center gap-2">
            <ShieldCheck size={18} className="text-rose-600 shrink-0" />
            <span>{state.error}</span>
          </div>
        )}

        {/* Grid 2-Column Section for Wide Desktop Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column 1: Basic Information & Pricing */}
          <div className="space-y-5 bg-slate-50/70 p-6 rounded-2xl border border-slate-200/70">
            <h2 className="text-xs font-black text-[#2874f0] uppercase tracking-widest pb-2 border-b border-slate-200 flex items-center gap-2">
              <Tag size={16} /> 1. Basic Product Information
            </h2>

            {/* Product Title */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Product Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Samsung Galaxy S26 Ultra 5G (512GB)"
                className="w-full bg-white border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-4 py-3 outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition placeholder-slate-400"
              />
            </div>

            {/* Pricing Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Deal Price (₹) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  required
                  placeholder="2198"
                  className="w-full bg-white border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-4 py-3 outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  MRP / Old Price (₹)
                </label>
                <input
                  type="number"
                  name="old_price"
                  step="0.01"
                  placeholder="3499"
                  className="w-full bg-white border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-4 py-3 outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  name="currency"
                  defaultValue="₹"
                  className="w-full bg-white border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-4 py-3 outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition"
                />
              </div>
            </div>

            {/* Category & Merchant Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Category <span className="text-rose-500">*</span>
                </label>
                <select
                  name="category"
                  defaultValue="Phones"
                  className="w-full bg-white border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-4 py-3 outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition cursor-pointer"
                >
                  {uniqueCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Merchant Dropdown */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Merchant / Store <span className="text-rose-500">*</span>
                </label>
                <select
                  name="merchant"
                  value={merchant}
                  onChange={(e) => setMerchant(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-4 py-3 outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition cursor-pointer"
                >
                  <option value="Amazon">Amazon</option>
                  <option value="Flipkart">Flipkart</option>
                  <option value="Croma">Croma</option>
                  <option value="Tata CLiQ">Tata CLiQ</option>
                  <option value="Spigen">Spigen</option>
                  <option value="Other">Other Store</option>
                </select>
              </div>
            </div>
          </div>

          {/* Column 2: Links, Image Preview & Display Settings */}
          <div className="space-y-5 bg-slate-50/70 p-6 rounded-2xl border border-slate-200/70">
            <h2 className="text-xs font-black text-[#2874f0] uppercase tracking-widest pb-2 border-b border-slate-200 flex items-center gap-2">
              <ImageIcon size={16} /> 2. Affiliate Links & Media Preview
            </h2>

            {/* Raw Affiliate Link */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Affiliate Link (Amazon / Flipkart URL) <span className="text-rose-500">*</span>
              </label>
              <input
                type="url"
                name="affiliate_link"
                required
                placeholder="e.g. https://www.amazon.in/dp/B0F31ZQD1H?tag=thecodebrains-21"
                className="w-full bg-white border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-4 py-3 outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition placeholder-slate-400"
              />
              <p className="text-[10px] text-slate-500 font-medium mt-1">
                If it's an Amazon link, your affiliate tag (<code className="text-[#2874f0] font-bold">thecodebrains-21</code>) will automatically be verified.
              </p>
            </div>

            {/* Image URL with Thumbnail Preview */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                Image URL / Path <span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  name="image_url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="e.g. /images/rosekm_humidifier.png or https://m.media-amazon.com/..."
                  className="flex-1 bg-white border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-4 py-3 outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition placeholder-slate-400"
                />
                {/* Thumbnail Box */}
                <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-1 shadow-xs">
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-contain" />
                  ) : (
                    <ImageIcon size={22} className="text-slate-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Display Options */}
            <div className="pt-1">
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                Placement Options
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 bg-white border border-slate-200 p-3.5 rounded-xl cursor-pointer hover:border-[#2874f0] transition shadow-2xs">
                  <input
                    type="checkbox"
                    name="is_deal_of_the_day"
                    defaultChecked
                    className="w-4 h-4 accent-[#2874f0] rounded"
                  />
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block">Deal of the Day</span>
                    <span className="text-[10px] text-slate-500">Shows on Home Page grid.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 bg-white border border-slate-200 p-3.5 rounded-xl cursor-pointer hover:border-[#2874f0] transition shadow-2xs">
                  <input
                    type="checkbox"
                    name="is_featured"
                    defaultChecked
                    className="w-4 h-4 accent-[#2874f0] rounded"
                  />
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block">Featured Highlight</span>
                    <span className="text-[10px] text-slate-500">Featured recommendation.</span>
                  </div>
                </label>
              </div>
            </div>

          </div>

        </div>

        {/* Full-Width Bottom Authorization & Action Button */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <div className="max-w-md">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Admin Security PIN <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              name="pin"
              required
              placeholder="Enter Admin PIN (Default: 1234)"
              className="w-full bg-white border border-slate-200 text-slate-900 text-xs font-semibold rounded-xl px-4 py-3 outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition placeholder-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#2874f0] hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl transition duration-300 shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isPending ? (
              <span>Saving Product to Database...</span>
            ) : (
              <>
                <ShoppingBag size={18} />
                <span>Save Product to Supabase Database →</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
