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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <ToolsNavbar />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
            <Code2 size={12} /> JSON Formatter & Validator
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            JSON Formatter, Minifier & Validator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-medium">
            Format messy JSON string data with custom indentations, validate syntax in real-time, minify for APIs, and download `.json` files.
          </p>
        </div>

        {/* Action Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleFormat}
                className="bg-[#2874f0] hover:bg-blue-600 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Code2 size={14} />
                <span>Format JSON</span>
              </button>

              <button
                onClick={handleMinify}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs px-4 py-2 rounded-xl border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Minimize2 size={14} />
                <span>Minify JSON</span>
              </button>

              <select
                value={indent}
                onChange={(e) => setIndent(Number(e.target.value))}
                className="bg-slate-950 text-slate-300 border border-slate-700 text-xs font-bold px-3 py-2 rounded-xl outline-none cursor-pointer"
              >
                <option value={2}>2 Spaces Indent</option>
                <option value={4}>4 Spaces Indent</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-extrabold px-3 py-2 rounded-xl border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy JSON"}</span>
              </button>

              <button
                onClick={handleDownload}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold px-3 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <Download size={14} />
                <span>Download .JSON</span>
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-rose-950/80 border border-rose-500/40 rounded-2xl p-3 text-rose-300 text-xs font-bold flex items-center gap-2">
              <AlertTriangle size={16} className="text-rose-400 shrink-0" />
              <span>Invalid JSON: {error}</span>
            </div>
          )}

          {/* Editors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Raw Input */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                Input Raw JSON String:
              </label>
              <textarea
                rows={16}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste unformatted JSON string here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-200 outline-none focus:border-cyan-500 transition leading-relaxed resize-none"
              />
            </div>

            {/* Formatted Output */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-extrabold text-cyan-400 uppercase tracking-widest">
                Formatted Output:
              </label>
              <textarea
                rows={16}
                readOnly
                value={output || (error ? "" : input)}
                placeholder="Formatted JSON result will appear here..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-cyan-300 outline-none leading-relaxed resize-none"
              />
            </div>
          </div>
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
