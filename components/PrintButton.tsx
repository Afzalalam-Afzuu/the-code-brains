"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl transition duration-300 shadow-sm hover:shadow cursor-pointer print:hidden"
    >
      <Printer size={13} />
      Print Resume
    </button>
  );
}
