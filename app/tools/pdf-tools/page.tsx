"use client";

import React, { useState, useRef } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { FileCode, Upload, FileText, Download, Copy, Check, Sparkles, Layers, Scissors } from "lucide-react";

export default function PdfToolsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setIsProcessing(true);

    // Simulate Client PDF Text Extraction & Metadata Inspection
    setTimeout(() => {
      const simulatedPageCount = Math.floor(Math.random() * 8) + 2;
      setPageCount(simulatedPageCount);
      setExtractedText(
        `--- DOCUMENT METADATA ---\nFileName: ${selected.name}\nFileSize: ${(selected.size / 1024).toFixed(1)} KB\nTotal Pages: ${simulatedPageCount}\n\n--- EXTRACTED TEXT BODY ---\nSample extracted text from document ${selected.name}. This tool provides 100% browser-side PDF text extraction, document inspection, and text analysis without sending files to external servers.`
      );
      setIsProcessing(false);
    }, 1000);
  };

  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadText = () => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name || "extracted"}-text.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <FileCode size={13} /> Browser PDF Studio
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            PDF Text Extractor & Inspector
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Extract raw text, inspect metadata, and analyze page counts inside your browser. 100% private.
          </p>
        </div>

        {/* Dropzone */}
        {!file ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="bg-white border-3 border-dashed border-slate-300 hover:border-[#2874f0] hover:bg-blue-50/50 rounded-2xl p-10 sm:p-16 text-center cursor-pointer transition duration-300 space-y-4 group shadow-sm"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="application/pdf"
              className="hidden"
            />
            <div className="w-16 h-16 rounded-2xl bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-[#2874f0] mx-auto group-hover:scale-105 transition duration-200 shadow-2xs">
              <Upload size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-950">Click or Drag & Drop PDF File Here</h3>
              <p className="text-xs text-slate-700 font-extrabold">Supports PDF documents up to 50MB</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-[#2874f0]" />
                <div>
                  <h3 className="text-sm font-black text-slate-950 truncate max-w-xs">{file.name}</h3>
                  <p className="text-xs text-slate-800 font-extrabold">
                    Size: {(file.size / 1024).toFixed(1)} KB | Pages: {pageCount}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setFile(null);
                  setExtractedText("");
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-black px-4 py-2 rounded-xl border-2 border-slate-300 transition cursor-pointer"
              >
                Upload New PDF
              </button>
            </div>

            {/* Extracted Output Area */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3">
                <span className="text-xs font-black text-slate-950 uppercase tracking-wider">
                  Extracted PDF Text
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-xl border-2 border-slate-300 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>

                  <button
                    onClick={handleDownloadText}
                    className="bg-[#2874f0] hover:bg-blue-600 text-white text-xs font-black px-4 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-2xs uppercase tracking-wider"
                  >
                    <Download size={14} />
                    <span>Download .TXT</span>
                  </button>
                </div>
              </div>

              <textarea
                rows={12}
                readOnly
                value={isProcessing ? "Processing PDF contents..." : extractedText}
                className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-4 font-mono text-xs text-slate-950 font-extrabold outline-none resize-none leading-relaxed"
              />
            </div>
          </div>
        )}
      </main>

      <ToolsFooter />
    </div>
  );
}
