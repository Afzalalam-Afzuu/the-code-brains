"use client";

import React, { useState } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { Code2, Sparkles, Copy, Check, RefreshCw, CheckCircle2, XCircle } from "lucide-react";

export default function AiRegexGeneratorPage() {
  const [description, setDescription] = useState<string>("");
  const [flavor, setFlavor] = useState<string>("JavaScript (ECMAScript)");
  const [regexOutput, setRegexOutput] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [testInput, setTestInput] = useState<string>("");
  const [isTestMatching, setIsTestMatching] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const generateRegex = async () => {
    if (!description.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Generate a regular expression (Regex) pattern for ${flavor} to match: "${description}". Provide the regex string and breakdown.`
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.response) {
          setRegexOutput(data.response);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Fallback
    }

    setTimeout(() => {
      let pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
      let exp = "^ asserts start of string, [a-zA-Z0-9._%+-]+ matches username characters, @ matches domain separator, [a-zA-Z0-9.-]+ matches domain name, \\.[a-zA-Z]{2,} matches TLD extension, $ asserts end of string.";

      if (description.toLowerCase().includes("phone") || description.toLowerCase().includes("number")) {
        pattern = "^\\+?[1-9]\\d{1,14}$";
        exp = "Matches E.164 international phone number format starting with optional +, followed by 2 to 15 digits.";
      } else if (description.toLowerCase().includes("url") || description.toLowerCase().includes("link")) {
        pattern = "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)";
        exp = "Matches http:// or https:// URLs with optional www. prefix and path query strings.";
      }

      setRegexOutput(pattern);
      setExplanation(exp);
      setLoading(false);
    }, 600);
  };

  const handleTestMatch = (text: string) => {
    setTestInput(text);
    if (!regexOutput || !text.trim()) {
      setIsTestMatching(null);
      return;
    }
    try {
      const reg = new RegExp(regexOutput.replace(/^\/|\/[gimsuy]*$/g, ""));
      setIsTestMatching(reg.test(text));
    } catch {
      setIsTestMatching(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(regexOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <Code2 size={13} /> Developer AI Tools
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            AI Regex Generator & Tester
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Convert English text descriptions into regular expressions with instant pattern testing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div>
              <label className="text-xs font-black text-slate-950 uppercase tracking-wider block mb-1">
                What pattern do you want to match? *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Valid email address, international phone number, strong password with special chars"
                rows={4}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-950 outline-none focus:border-[#2874f0] transition"
              />
            </div>

            <div>
              <label className="text-xs font-black text-slate-950 uppercase tracking-wider block mb-1">
                Regex Engine / Language
              </label>
              <select
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-950 outline-none focus:border-[#2874f0] transition"
              >
                <option>JavaScript (ECMAScript)</option>
                <option>Python (re)</option>
                <option>PHP (PCRE)</option>
                <option>Java</option>
                <option>Golang</option>
              </select>
            </div>

            <button
              onClick={generateRegex}
              disabled={loading || !description.trim()}
              className="w-full bg-[#2874f0] hover:bg-blue-600 disabled:opacity-50 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition"
            >
              {loading ? <RefreshCw size={15} className="animate-spin" /> : <Sparkles size={15} />}
              <span>{loading ? "Generating Regex..." : "Generate AI Regex"}</span>
            </button>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 min-h-[320px]">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100">
                <span className="text-xs font-black text-slate-950 uppercase">Generated Regex Pattern:</span>
                {regexOutput && (
                  <button
                    onClick={handleCopy}
                    className="text-[#2874f0] hover:text-blue-700 text-xs font-black flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copied ? "Copied" : "Copy Pattern"}</span>
                  </button>
                )}
              </div>

              {regexOutput ? (
                <div className="space-y-3">
                  <div className="bg-slate-950 text-[#2874f0] font-mono border border-slate-800 rounded-xl p-3.5 text-xs font-black overflow-x-auto">
                    /{regexOutput}/g
                  </div>

                  {explanation && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800">
                      💡 <strong>Breakdown:</strong> {explanation}
                    </div>
                  )}

                  {/* Interactive Regex Test */}
                  <div className="pt-2 space-y-1.5">
                    <label className="text-[11px] font-black text-slate-950 uppercase block">
                      Test Pattern Matcher:
                    </label>
                    <input
                      type="text"
                      value={testInput}
                      onChange={(e) => handleTestMatch(e.target.value)}
                      placeholder="Type test string here..."
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-950 outline-none focus:border-[#2874f0]"
                    />

                    {isTestMatching !== null && (
                      <div
                        className={`flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-lg ${
                          isTestMatching ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {isTestMatching ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                        <span>{isTestMatching ? "Match Found! Pattern is valid." : "No Match Found"}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 font-bold text-xs">
                  Describe what string pattern you want to match and click "Generate AI Regex".
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
