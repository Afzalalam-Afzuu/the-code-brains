"use client";

import React, { useState } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { Binary, Copy, Check, Download, ArrowRightLeft, Image as ImageIcon, FileText } from "lucide-react";

export default function Base64ConverterPage() {
  const [mode, setMode] = useState<"encode" | "decode" | "image">("encode");
  const [inputText, setInputText] = useState<string>("Hello, TheCodeBrains!");
  const [outputText, setOutputText] = useState<string>("");
  const [imageResult, setImageResult] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleEncode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(inputText)));
      setOutputText(encoded);
      setError(null);
    } catch {
      setError("Failed to encode text to Base64.");
      setOutputText("");
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(inputText)));
      setOutputText(decoded);
      setError(null);
    } catch {
      setError("Invalid Base64 string payload.");
      setOutputText("");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageResult(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = (textToCopy: string) => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <Binary size={13} /> Base64 Utility Studio
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Base64 Encoder & Decoder
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Encode raw strings and images to Base64 data URLs or decode Base64 back to plain text instantly.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode("encode")}
              className={`py-2 px-4 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                mode === "encode" ? "bg-[#2874f0] text-white shadow-2xs" : "bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <FileText size={14} /> Text Encode
            </button>
            <button
              onClick={() => setMode("decode")}
              className={`py-2 px-4 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                mode === "decode" ? "bg-[#2874f0] text-white shadow-2xs" : "bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <ArrowRightLeft size={14} /> Text Decode
            </button>
            <button
              onClick={() => setMode("image")}
              className={`py-2 px-4 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                mode === "image" ? "bg-[#2874f0] text-white shadow-2xs" : "bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <ImageIcon size={14} /> Image to Base64
            </button>
          </div>
        </div>

        {/* Workspace Grid */}
        {mode !== "image" ? (
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
              <span className="text-xs font-black text-slate-950 uppercase tracking-wider">
                {mode === "encode" ? "String to Base64" : "Base64 to String"}
              </span>
              <button
                onClick={mode === "encode" ? handleEncode : handleDecode}
                className="bg-[#2874f0] hover:bg-blue-600 text-white text-xs font-black px-5 py-2.5 rounded-xl transition cursor-pointer uppercase tracking-wider shadow-2xs"
              >
                Execute {mode === "encode" ? "Encode" : "Decode"}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-950 uppercase tracking-widest">
                  Input String:
                </label>
                <textarea
                  rows={12}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type text payload..."
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-4 font-mono text-xs text-slate-950 font-extrabold outline-none focus:bg-white focus:border-[#2874f0] focus:ring-2 focus:ring-blue-200 transition resize-y"
                />
              </div>

              {/* Output */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                  <span className="text-[#2874f0]">Output Result:</span>
                  <button
                    onClick={() => handleCopy(outputText)}
                    disabled={!outputText}
                    className="text-slate-950 hover:text-[#2874f0] transition flex items-center gap-1 font-black cursor-pointer disabled:opacity-50"
                  >
                    {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
                <textarea
                  rows={12}
                  readOnly
                  value={outputText}
                  placeholder="Output payload will appear here..."
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-4 font-mono text-xs text-slate-950 font-extrabold outline-none resize-y"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-950 uppercase tracking-wider">
                Select Image File (JPG, PNG, WEBP, SVG)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-3 text-xs font-black text-slate-950 cursor-pointer"
              />
            </div>

            {imageResult && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-slate-100 pb-2">
                  <span className="text-xs font-black text-slate-950 uppercase">Base64 Image Data URI</span>
                  <button
                    onClick={() => handleCopy(imageResult)}
                    className="bg-[#2874f0] text-white text-xs font-black px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? "Copied!" : "Copy Base64 URI"}</span>
                  </button>
                </div>
                <textarea
                  rows={10}
                  readOnly
                  value={imageResult}
                  className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-4 font-mono text-xs text-slate-950 font-extrabold outline-none resize-y"
                />
              </div>
            )}
          </div>
        )}
      </main>

      <ToolsFooter />
    </div>
  );
}
