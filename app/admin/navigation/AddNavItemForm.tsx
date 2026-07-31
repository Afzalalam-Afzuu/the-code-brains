"use client";

import React, { useActionState } from "react";
import { addNavItemAction } from "@/lib/db-actions";
import { Plus, Key, Link as LinkIcon, Folder, Tag } from "lucide-react";

const initialState: { error?: string; success?: boolean } = {};

export default function AddNavItemForm() {
  const [state, formAction, isPending] = useActionState(addNavItemAction, initialState);

  return (
    <form action={formAction} className="space-y-4 text-xs">
      {state?.error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-semibold">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl font-semibold">
          Nav link added successfully! Refresh to see updates in header.
        </div>
      )}

      <div className="space-y-1">
        <label className="font-extrabold text-slate-700 uppercase tracking-wider text-[10px] flex items-center gap-1">
          <Folder size={12} className="text-[#2874f0]" /> Category Name
        </label>
        <input
          type="text"
          name="category_label"
          placeholder="e.g. Phones, TV & Audio, Gaming"
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#2874f0] font-semibold"
        />
      </div>

      <div className="space-y-1">
        <label className="font-extrabold text-slate-700 uppercase tracking-wider text-[10px] flex items-center gap-1">
          <Tag size={12} className="text-[#2874f0]" /> Category Slug
        </label>
        <input
          type="text"
          name="category_slug"
          placeholder="e.g. phones, tv-audio, gaming"
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#2874f0] font-mono text-[11px]"
        />
      </div>

      <div className="space-y-1">
        <label className="font-extrabold text-slate-700 uppercase tracking-wider text-[10px]">
          Group Heading (Dropdown Column)
        </label>
        <input
          type="text"
          name="heading"
          placeholder="e.g. Best Picks, Brands, Reviews"
          defaultValue="Best Picks"
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#2874f0] font-semibold"
        />
      </div>

      <div className="space-y-1">
        <label className="font-extrabold text-slate-700 uppercase tracking-wider text-[10px]">
          Link Display Name
        </label>
        <input
          type="text"
          name="link_label"
          placeholder="e.g. Best Gaming Consoles"
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#2874f0] font-semibold"
        />
      </div>

      <div className="space-y-1">
        <label className="font-extrabold text-slate-700 uppercase tracking-wider text-[10px] flex items-center gap-1">
          <LinkIcon size={12} className="text-[#2874f0]" /> Link Href (URL)
        </label>
        <input
          type="text"
          name="link_href"
          placeholder="e.g. /gaming/best-consoles"
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#2874f0] font-mono text-[11px]"
        />
      </div>

      <div className="space-y-1 pt-2 border-t border-slate-100">
        <label className="font-extrabold text-slate-700 uppercase tracking-wider text-[10px] flex items-center gap-1">
          <Key size={12} className="text-amber-600" /> Admin Security PIN
        </label>
        <input
          type="password"
          name="pin"
          placeholder="Enter PIN (Default: 1234)"
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#2874f0] font-mono"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#2874f0] hover:bg-blue-700 text-white font-extrabold py-3 rounded-xl transition uppercase tracking-wider text-xs flex items-center justify-center gap-1 shadow-md cursor-pointer disabled:opacity-50"
      >
        <Plus size={15} />
        <span>{isPending ? "Adding Link..." : "Save Navigation Link"}</span>
      </button>
    </form>
  );
}
