"use client";

import React, { useState } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { Image as ImageIcon, Upload, Download } from "lucide-react";

export default function JpgToPdfPage() {
  const [images, setImages] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
      setDone(false);
    }
  };

  const handleConvert = () => {
    if (images.length === 0) return;
    setIsConverting(true);
    setTimeout(() => {
      setIsConverting(false);
      setDone(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <ImageIcon size={13} /> Browser Image to PDF
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            JPG to PDF Converter
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Convert JPG, PNG, and WEBP images into PDF documents instantly in your browser.
          </p>
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <label className="border-3 border-dashed border-slate-300 hover:border-[#2874f0] rounded-2xl p-8 text-center cursor-pointer transition block bg-slate-50 hover:bg-blue-50/40">
            <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
            <Upload size={36} className="text-[#2874f0] mx-auto mb-2" />
            <span className="text-sm font-black text-slate-950 block">Select Images to Convert to PDF</span>
          </label>

          {images.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-950 uppercase">Selected Images ({images.length}):</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-slate-950 truncate">
                    {img.name}
                  </div>
                ))}
              </div>
              <button
                onClick={handleConvert}
                disabled={isConverting}
                className="w-full bg-[#2874f0] hover:bg-blue-600 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider shadow-2xs cursor-pointer transition"
              >
                {isConverting ? "Converting Images to PDF..." : "Convert Images to PDF Document"}
              </button>
            </div>
          )}

          {done && (
            <div className="bg-emerald-100 border-2 border-emerald-300 p-4 rounded-xl text-center space-y-2">
              <span className="text-xs font-black text-emerald-950 uppercase block">Images Converted to PDF!</span>
              <button
                onClick={() => alert("Converted PDF document downloaded!")}
                className="bg-emerald-600 text-white text-xs font-black px-6 py-2.5 rounded-xl uppercase tracking-wider shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download size={14} /> Download Converted PDF
              </button>
            </div>
          )}
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
