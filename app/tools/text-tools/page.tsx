"use client";

import React, { useState, useMemo } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { FileText, Copy, Check, Download, Trash2, ArrowRightLeft, Sparkles, AlignLeft, Layers } from "lucide-react";

export default function TextToolsPage() {
  const [text, setText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Text Statistics
  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s+/g, "").length;
    const lines = text ? text.split(/\r\n|\r|\n/).length : 0;
    const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).length : 0;
    const readingTimeMinutes = Math.ceil(words / 200);

    return { words, chars, charsNoSpaces, lines, paragraphs, readingTimeMinutes };
  }, [text]);

  // Operations
  const handleUppercase = () => setText(text.toUpperCase());
  const handleLowercase = () => setText(text.toLowerCase());

  const handleTitleCase = () => {
    const formatted = text.toLowerCase().replace(/(?:^|\s|-)\S/g, (match) => match.toUpperCase());
    setText(formatted);
  };

  const handleSentenceCase = () => {
    const formatted = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (match) => match.toUpperCase());
    setText(formatted);
  };

  const handleRemoveDuplicates = () => {
    const lines = text.split(/\r\n|\r|\n/);
    const uniqueLines = Array.from(new Set(lines));
    setText(uniqueLines.join("\n"));
  };

  const handleCleanWhitespace = () => {
    const cleaned = text.replace(/[ \t]+/g, " ").replace(/\n\s*\n/g, "\n");
    setText(cleaned.trim());
  };

  const handleReverseText = () => {
    setText(text.split("").reverse().join(""));
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "processed-text.txt";
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <FileText size={13} /> Text Utilities Studio
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Word Counter & Text Converter
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Count words and characters, convert text cases, remove duplicate lines, and format text strings instantly.
          </p>
        </div>

        {/* Real-time Stats Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          <div className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center shadow-sm space-y-0.5">
            <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider">Words</span>
            <p className="text-2xl font-black text-[#2874f0]">{stats.words.toLocaleString()}</p>
          </div>
          <div className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center shadow-sm space-y-0.5">
            <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider">Characters</span>
            <p className="text-2xl font-black text-slate-950">{stats.chars.toLocaleString()}</p>
          </div>
          <div className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center shadow-sm space-y-0.5">
            <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider">No Spaces</span>
            <p className="text-2xl font-black text-slate-950">{stats.charsNoSpaces.toLocaleString()}</p>
          </div>
          <div className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center shadow-sm space-y-0.5">
            <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider">Lines</span>
            <p className="text-2xl font-black text-slate-950">{stats.lines.toLocaleString()}</p>
          </div>
          <div className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center shadow-sm space-y-0.5">
            <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider">Paragraphs</span>
            <p className="text-2xl font-black text-slate-950">{stats.paragraphs.toLocaleString()}</p>
          </div>
          <div className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center shadow-sm space-y-0.5">
            <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider">Est. Read</span>
            <p className="text-2xl font-black text-emerald-600">{stats.readingTimeMinutes} Min</p>
          </div>
        </div>

        {/* Text Area Card */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-100 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleUppercase}
                className="bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-black px-3.5 py-2 rounded-xl border-2 border-slate-300 transition cursor-pointer"
              >
                UPPERCASE
              </button>
              <button
                onClick={handleLowercase}
                className="bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-black px-3.5 py-2 rounded-xl border-2 border-slate-300 transition cursor-pointer"
              >
                lowercase
              </button>
              <button
                onClick={handleTitleCase}
                className="bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-black px-3.5 py-2 rounded-xl border-2 border-slate-300 transition cursor-pointer"
              >
                Title Case
              </button>
              <button
                onClick={handleSentenceCase}
                className="bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-black px-3.5 py-2 rounded-xl border-2 border-slate-300 transition cursor-pointer"
              >
                Sentence case
              </button>
              <button
                onClick={handleRemoveDuplicates}
                className="bg-blue-100 hover:bg-blue-200 text-[#2874f0] text-xs font-black px-3.5 py-2 rounded-xl border-2 border-blue-300 transition cursor-pointer"
              >
                Remove Duplicates
              </button>
              <button
                onClick={handleCleanWhitespace}
                className="bg-blue-100 hover:bg-blue-200 text-[#2874f0] text-xs font-black px-3.5 py-2 rounded-xl border-2 border-blue-300 transition cursor-pointer"
              >
                Clean Extra Spaces
              </button>
              <button
                onClick={handleReverseText}
                className="bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-black px-3.5 py-2 rounded-xl border-2 border-slate-300 transition cursor-pointer"
              >
                Reverse Text
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setText("")}
                className="bg-rose-100 hover:bg-rose-200 text-rose-900 text-xs font-black px-3 py-2 rounded-xl border-2 border-rose-300 transition cursor-pointer flex items-center gap-1"
              >
                <Trash2 size={14} /> Clear
              </button>
              <button
                onClick={handleCopy}
                className="bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-black px-3.5 py-2 rounded-xl border-2 border-slate-300 transition cursor-pointer flex items-center gap-1.5"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
              <button
                onClick={handleDownload}
                className="bg-[#2874f0] hover:bg-blue-600 text-white text-xs font-black px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer uppercase tracking-wider shadow-2xs"
              >
                <Download size={14} />
                <span>Export .TXT</span>
              </button>
            </div>
          </div>

          <textarea
            rows={14}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text article, paragraph, or code snippet here..."
            className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-4 text-sm font-bold text-slate-950 outline-none focus:bg-white focus:border-[#2874f0] focus:ring-2 focus:ring-blue-200 transition leading-relaxed resize-y"
          />
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
