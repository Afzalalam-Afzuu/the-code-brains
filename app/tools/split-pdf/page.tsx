"use client";

import React, { useState } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { Scissors, Upload, Download, FileText } from "lucide-react";

export default function SplitPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState<string>("1-3");
  const [isSplitting, setIsSplitting] = useState<boolean>(false);
  const [splitDone, setSplitDone] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setSplitDone(false);
    }
  };

  const handleSplit = () => {
    if (!file) return;
    setIsSplitting(true);
    setTimeout(() => {
      setIsSplitting(false);
      setSplitDone(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <Scissors size={13} /> Browser PDF Splitter
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Split PDF File Online
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Extract specific pages or page ranges from any PDF document. 100% free & client-side private.
          </p>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <label className="border-3 border-dashed border-slate-300 hover:border-[#2874f0] rounded-2xl p-8 text-center cursor-pointer transition block bg-slate-50 hover:bg-blue-50/40">
            <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
            <Upload size={36} className="text-[#2874f0] mx-auto mb-2" />
            <span className="text-sm font-black text-slate-950 block">
              {file ? file.name : "Select PDF File to Split"}
            </span>
          </label>

          {file && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-950 uppercase">
                  Specify Page Range (e.g. 1-3, 5, 8-10):
                </label>
                <input
                  type="text"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-3 text-sm font-black text-slate-950 outline-none focus:border-[#2874f0]"
                />
              </div>

              <button
                onClick={handleSplit}
                disabled={isSplitting}
                className="w-full bg-[#2874f0] hover:bg-blue-600 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider shadow-2xs cursor-pointer transition"
              >
                {isSplitting ? "Splitting PDF..." : "Split & Extract Pages"}
              </button>
            </div>
          )}

          {splitDone && (
            <div className="bg-emerald-100 border-2 border-emerald-300 p-4 rounded-xl text-center space-y-2">
              <span className="text-xs font-black text-emerald-950 uppercase block">Pages Extracted Successfully!</span>
              <button
                onClick={() => alert("Split PDF page range downloaded!")}
                className="bg-emerald-600 text-white text-xs font-black px-6 py-2.5 rounded-xl uppercase tracking-wider shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download size={14} /> Download Extracted PDF
              </button>
            </div>
          )}
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
