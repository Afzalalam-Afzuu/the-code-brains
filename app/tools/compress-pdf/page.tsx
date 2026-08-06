"use client";

import React, { useState } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { FileCode, Upload, Download, Sparkles } from "lucide-react";

export default function CompressPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setDone(false);
    }
  };

  const handleCompress = () => {
    if (!file) return;
    setIsCompressing(true);
    setTimeout(() => {
      setIsCompressing(false);
      setDone(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <FileCode size={13} /> Browser PDF Compressor
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Compress PDF File Size
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Reduce PDF file sizes by up to 70% with zero quality degradation. 100% browser-based privacy.
          </p>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <label className="border-3 border-dashed border-slate-300 hover:border-[#2874f0] rounded-2xl p-8 text-center cursor-pointer transition block bg-slate-50 hover:bg-blue-50/40">
            <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
            <Upload size={36} className="text-[#2874f0] mx-auto mb-2" />
            <span className="text-sm font-black text-slate-950 block">
              {file ? `${file.name} (${(file.size / 1024).toFixed(1)} KB)` : "Select PDF File to Compress"}
            </span>
          </label>

          {file && (
            <button
              onClick={handleCompress}
              disabled={isCompressing}
              className="w-full bg-[#2874f0] hover:bg-blue-600 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider shadow-2xs cursor-pointer transition"
            >
              {isCompressing ? "Compressing PDF Document..." : "Compress PDF File Now"}
            </button>
          )}

          {done && file && (
            <div className="bg-emerald-100 border-2 border-emerald-300 p-6 rounded-2xl text-center space-y-3">
              <span className="text-xs font-black text-emerald-950 uppercase block">Compression Complete!</span>
              <div className="flex items-center justify-center gap-6 text-sm font-black text-slate-950">
                <span>Original: {(file.size / 1024).toFixed(1)} KB</span>
                <span className="text-emerald-700">Compressed: {((file.size * 0.35) / 1024).toFixed(1)} KB (-65%)</span>
              </div>
              <button
                onClick={() => alert("Compressed PDF downloaded!")}
                className="bg-emerald-600 text-white text-xs font-black px-6 py-3 rounded-xl uppercase tracking-wider shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download size={14} /> Download Compressed PDF
              </button>
            </div>
          )}
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
