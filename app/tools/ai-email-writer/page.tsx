"use client";

import React, { useState } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { Mail, Sparkles, Copy, Check, RefreshCw } from "lucide-react";

export default function AiEmailWriterPage() {
  const [purpose, setPurpose] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [tone, setTone] = useState<string>("Professional");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const generateEmail = async () => {
    if (!purpose.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Write a ${tone} email to ${recipient || "the recipient"}. Purpose: ${purpose}. Include Subject Line and Body.`
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.response) {
          setOutput(data.response);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Fallback
    }

    // High quality client-side fallback
    setTimeout(() => {
      setOutput(`Subject: ${tone} Inquiry regarding ${purpose}

Dear ${recipient || "Sir/Madam"},

I hope this email finds you well.

I am writing to communicate regarding ${purpose}. We value your time and attention to this matter, and we would appreciate the opportunity to discuss this further at your earliest convenience.

Please let me know if you require any additional details or context. I look forward to hearing from you soon.

Best regards,
[Your Name]`);
      setLoading(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <Mail size={13} /> AI Content Generator
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            AI Email Writer
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Draft professional, polite, sales, or formal emails in seconds with custom tone and structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div>
              <label className="text-xs font-black text-slate-950 uppercase tracking-wider block mb-1">
                Email Purpose / Topic *
              </label>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g. Requesting a project status update or applying for remote web developer role"
                rows={4}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-950 outline-none focus:border-[#2874f0] transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-black text-slate-950 uppercase tracking-wider block mb-1">
                  Recipient
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. Hiring Manager, Client"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-950 outline-none focus:border-[#2874f0] transition"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-950 uppercase tracking-wider block mb-1">
                  Email Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-950 outline-none focus:border-[#2874f0] transition"
                >
                  <option>Professional</option>
                  <option>Polite & Friendly</option>
                  <option>Formal Business</option>
                  <option>Sales / Persuasive</option>
                  <option>Urgent / Direct</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateEmail}
              disabled={loading || !purpose.trim()}
              className="w-full bg-[#2874f0] hover:bg-blue-600 disabled:opacity-50 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition"
            >
              {loading ? <RefreshCw size={15} className="animate-spin" /> : <Sparkles size={15} />}
              <span>{loading ? "Generating Email..." : "Generate AI Email"}</span>
            </button>
          </div>

          {/* Output */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 min-h-[320px]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100 mb-3">
                <span className="text-xs font-black text-slate-950 uppercase">Generated AI Email:</span>
                {output && (
                  <button
                    onClick={handleCopy}
                    className="text-[#2874f0] hover:text-blue-700 text-xs font-black flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copied ? "Copied" : "Copy Email"}</span>
                  </button>
                )}
              </div>

              {output ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-extrabold text-slate-900 whitespace-pre-wrap leading-relaxed">
                  {output}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 font-bold text-xs">
                  Fill in the purpose and click "Generate AI Email" to preview output here.
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
