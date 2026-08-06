"use client";

import React, { useState } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { Code2, Copy, Check, Download, AlertTriangle, CheckCircle2, RefreshCw, FileText, Minimize2 } from "lucide-react";

export default function JsonFormatterPage() {
  const sampleJson = `{
  "name": "TheCodeBrains",
  "version": "1.0.0",
  "description": "Developer Web Tools",
  "active": true,
  "features": [
    "JSON Formatter",
    "JSON Minifier",
    "Syntax Validator"
  ],
  "author": {
    "name": "Dev Team",
    "location": "India"
  }
}`;

  const [input, setInput] = useState<string>(sampleJson);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [indent, setIndent] = useState<number>(2);

  const handleFormat = () => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid JSON syntax.");
      }
      setOutput("");
    }
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid JSON syntax.");
      }
      setOutput("");
    }
  };

  const handleCopy = () => {
    const textToCopy = output || input;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = output || input;
    if (!content) return;
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted-data.json";
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <Code2 size={13} /> JSON Formatter & Validator
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            JSON Formatter, Minifier & Validator
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Format messy JSON string data with custom indentations, validate syntax in real-time, minify for APIs, and download `.json` files.
          </p>
        </div>

        {/* Action Controls */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-100 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleFormat}
                className="bg-[#2874f0] hover:bg-blue-600 text-white font-black text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-2xs uppercase tracking-wider"
              >
                <Code2 size={15} />
                <span>Format JSON</span>
              </button>

              <button
                onClick={handleMinify}
                className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-black text-xs px-4 py-2.5 rounded-xl border-2 border-slate-300 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Minimize2 size={15} />
                <span>Minify JSON</span>
              </button>

              <select
                value={indent}
                onChange={(e) => setIndent(Number(e.target.value))}
                className="bg-slate-50 text-slate-950 border-2 border-slate-300 text-xs font-black px-3 py-2 rounded-xl outline-none cursor-pointer focus:bg-white focus:border-[#2874f0]"
              >
                <option value={2}>2 Spaces Indent</option>
                <option value={4}>4 Spaces Indent</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-black px-3.5 py-2 rounded-xl border-2 border-slate-300 transition flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy JSON"}</span>
              </button>

              <button
                onClick={handleDownload}
                className="bg-slate-950 hover:bg-slate-900 text-white text-xs font-black px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-2xs uppercase tracking-wider"
              >
                <Download size={14} />
                <span>Download .JSON</span>
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-rose-100 border-2 border-rose-300 rounded-xl p-3.5 text-rose-950 text-xs font-black flex items-center gap-2 shadow-2xs">
              <AlertTriangle size={18} className="text-rose-700 shrink-0" />
              <span>Invalid JSON: {error}</span>
            </div>
          )}

          {/* Editors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Raw Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-950 uppercase tracking-widest">
                Input Raw JSON String:
              </label>
              <textarea
                rows={16}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste unformatted JSON string here..."
                className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-4 font-mono text-xs text-slate-950 font-extrabold outline-none focus:bg-white focus:border-[#2874f0] focus:ring-2 focus:ring-blue-200 transition leading-relaxed resize-none"
              />
            </div>

            {/* Formatted Output */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-[#2874f0] uppercase tracking-widest">
                Formatted Output:
              </label>
              <textarea
                rows={16}
                readOnly
                value={output || (error ? "" : input)}
                placeholder="Formatted JSON result will appear here..."
                className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-4 font-mono text-xs text-slate-950 font-extrabold outline-none leading-relaxed resize-none"
              />
            </div>
          </div>
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
