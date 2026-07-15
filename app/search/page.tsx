// app/search/page.tsx
"use client";

import { useState } from "react";
import { Search, Sparkles, Loader2, BookOpen, MessageSquare, ShieldAlert, Cpu } from "lucide-react";
import { askGeminiAction } from "../../lib/db-actions";
import { parseMarkdown } from "../../lib/markdown";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [model, setModel] = useState("gemini-2.5-flash");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");

  const suggestions = [
    "Explain AI Agents in simple terms",
    "Compare OLED vs QLED screen technology",
    "List top 5 productivity hacks for developers",
    "Next.js 15 routing checklist"
  ];

  const startCooldown = () => {
    setCooldown(5);
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSearch = async (searchQuery: string, activeModel: string = model) => {
    const q = searchQuery.trim();
    if (!q || isLoading || cooldown > 0) return;

    setQuery(q);
    setIsLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await askGeminiAction(q, activeModel);
      if (res.startsWith("Error calling Gemini:")) {
        setError(res);
      } else {
        setResponse(res);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
      startCooldown();
    }
  };

  const formattedHtml = parseMarkdown(response);

  return (
    <div className="bg-slate-95/50 min-h-screen pb-16">
      {/* Search Header Banner */}
      <div className="bg-slate-900 text-white py-16 text-center relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-4 relative">
          <div className="inline-flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase mb-4">
            <Sparkles size={10} />
            <span>Gemini AI Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Knowledge <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Assistant</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Search anything, ask questions, or research complex topics. Powered by Google Gemini AI.
          </p>
        </div>
      </div>

      {/* Main Search Viewport */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Search Box Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query, model);
            }}
            className="flex flex-col md:flex-row gap-3"
          >
            <div className="flex gap-2 p-1.5 border border-slate-200 rounded-2xl focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-150 transition bg-white flex-1 items-center">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500 transition cursor-pointer font-bold shrink-0"
              >
                <option value="gemini-2.5-flash">✨ AI 1.5 Flash (Most Reliable)</option>
                <option value="gemini-2.5-flash-lite">⚡ AI 2.0 Flash-Lite</option>
              </select>
              
              <div className="flex-1 flex items-center gap-2 pl-2">
                <Search className="text-slate-400 shrink-0" size={18} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask about AI, coding, hardware reviews, or history..."
                  className="w-full bg-transparent text-slate-800 text-sm outline-none border-0 p-0"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading || cooldown > 0}
              className="bg-slate-950 text-white hover:bg-indigo-600 disabled:bg-slate-400 font-extrabold text-xs uppercase tracking-wider px-6 py-4 rounded-2xl transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0 md:h-[58px]"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                <Search size={14} />
              )}
              <span>{cooldown > 0 ? `Wait ${cooldown}s` : "Search"}</span>
            </button>
          </form>

          {/* Suggestion Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mr-1">
              Try asking:
            </span>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSearch(s, model)}
                className="text-[11px] font-bold bg-slate-50 border border-slate-100 text-slate-650 hover:bg-indigo-50 hover:text-indigo-650 hover:border-indigo-100 transition px-3 py-1.5 rounded-lg cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Results Area */}
          {(isLoading || response || error) && (
            <div className="pt-6 border-t border-slate-100">
              {/* Loading State */}
              {isLoading && (
                <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                  <Loader2 className="animate-spin text-indigo-600" size={32} />
                  <p className="text-xs text-slate-450 font-bold animate-pulse">
                    Consulting Gemini Knowledge Cache...
                  </p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-700 text-xs font-semibold">
                  <ShieldAlert className="shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="font-bold">Search Error</p>
                    <p className="mt-1 font-medium text-red-600">{error}</p>
                  </div>
                </div>
              )}

              {/* Content Response View */}
              {response && !isLoading && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[10px] font-extrabold uppercase text-slate-450 tracking-wider flex items-center gap-1">
                      <Cpu size={12} className="text-indigo-600" />
                      Gemini Verified Response
                    </span>
                  </div>

                  <div
                    className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formattedHtml }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
