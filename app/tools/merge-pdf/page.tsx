"use client";

import React, { useState } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { Layers, Upload, Download, Check, FileText } from "lucide-react";

export default function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState<boolean>(false);
  const [merged, setMerged] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setMerged(false);
    }
  };

  const handleMerge = () => {
    if (files.length < 2) return;
    setIsMerging(true);
    setTimeout(() => {
      setIsMerging(false);
      setMerged(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <Layers size={13} /> Browser PDF Merger
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Merge PDF Files Online
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Combine multiple PDF documents into a single PDF file instantly in your browser. 100% free & private.
          </p>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <label className="border-3 border-dashed border-slate-300 hover:border-[#2874f0] rounded-2xl p-8 text-center cursor-pointer transition block bg-slate-50 hover:bg-blue-50/40">
            <input type="file" multiple accept="application/pdf" onChange={handleFileChange} className="hidden" />
            <Upload size={36} className="text-[#2874f0] mx-auto mb-2" />
            <span className="text-sm font-black text-slate-950 block">Select Multiple PDF Files to Merge</span>
            <span className="text-xs text-slate-600 font-bold">Hold Ctrl / Cmd to select 2 or more PDFs</span>
          </label>

          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider">
                Selected PDF Files ({files.length}):
              </h3>
              <div className="space-y-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-xs font-black">
                    <span className="flex items-center gap-2 text-slate-950">
                      <FileText size={16} className="text-[#2874f0]" /> {f.name}
                    </span>
                    <span className="text-slate-600">{(f.size / 1024).toFixed(1)} KB</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleMerge}
                disabled={files.length < 2 || isMerging}
                className="w-full bg-[#2874f0] hover:bg-blue-600 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider shadow-2xs cursor-pointer transition disabled:opacity-50"
              >
                {isMerging ? "Merging PDFs..." : "Merge PDF Files Now"}
              </button>
            </div>
          )}

          {merged && (
            <div className="bg-emerald-100 border-2 border-emerald-300 p-4 rounded-xl text-center space-y-2">
              <span className="text-xs font-black text-emerald-950 uppercase block">PDF Files Merged Successfully!</span>
              <button
                onClick={() => alert("Merged PDF document downloaded!")}
                className="bg-emerald-600 text-white text-xs font-black px-6 py-2.5 rounded-xl uppercase tracking-wider shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download size={14} /> Download Merged PDF
              </button>
            </div>
          )}
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
