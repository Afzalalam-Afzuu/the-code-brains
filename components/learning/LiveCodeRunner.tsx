"use client";

import React, { useState } from "react";
import { Play, RotateCcw, Copy, Check, Code, Monitor, Sparkles } from "lucide-react";

interface LiveCodeRunnerProps {
  initialCode: string;
  title?: string;
}

export default function LiveCodeRunner({ initialCode, title = "Try It Yourself Editor" }: LiveCodeRunnerProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"split" | "editor" | "preview">("split");

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(initialCode);
  };

  return (
    <div className="my-8 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-xl bg-slate-950 font-sans">
      {/* Top Header Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold">
            <Play size={16} className="fill-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-sm text-white tracking-tight">{title}</h4>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                <Sparkles size={10} /> Live W3-Editor
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Edit code below and see instant live output in the preview box</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle Buttons */}
          <div className="hidden sm:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab("split")}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                activeTab === "split" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Monitor size={12} /> Split View
            </button>
            <button
              onClick={() => setActiveTab("editor")}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                activeTab === "editor" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Code size={12} /> Editor Only
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                activeTab === "preview" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Play size={12} /> Result Only
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
            title="Copy Code"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span className="hidden xs:inline">{copied ? "Copied!" : "Copy"}</span>
          </button>

          <button
            onClick={handleReset}
            className="bg-slate-800 hover:bg-amber-950/60 hover:border-amber-700/60 text-slate-200 hover:text-amber-400 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
            title="Reset Code to Original"
          >
            <RotateCcw size={14} />
            <span className="hidden xs:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 min-h-[380px]">
        {/* Source Code Editor */}
        {(activeTab === "split" || activeTab === "editor") && (
          <div className="p-4 bg-slate-950 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Code size={13} className="text-blue-400" /> Source Code Input
              </span>
              <span className="text-[10px] text-slate-500 font-mono">HTML5 / CSS / JS</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full flex-1 min-h-[320px] bg-slate-900/90 text-emerald-300 font-mono text-xs p-4 rounded-xl border border-slate-800 focus:border-emerald-500 outline-none leading-relaxed resize-y shadow-inner"
            />
          </div>
        )}

        {/* Live Preview Result Frame */}
        {(activeTab === "split" || activeTab === "preview") && (
          <div className="p-4 bg-slate-900/60 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Monitor size={13} className="text-emerald-400" /> Live Browser Result
              </span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Sandbox Isolated
              </span>
            </div>
            <div className="w-full flex-1 min-h-[320px] bg-white rounded-xl overflow-hidden border border-slate-700 shadow-lg">
              <iframe
                srcDoc={code}
                title="W3 Live Code Preview"
                sandbox="allow-scripts allow-modals"
                className="w-full h-full min-h-[320px] border-0"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
