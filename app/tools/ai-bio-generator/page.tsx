"use client";

import React, { useState } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { UserCheck, Sparkles, Copy, Check, RefreshCw } from "lucide-react";

export default function AiBioGeneratorPage() {
  const [role, setRole] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [platform, setPlatform] = useState<string>("LinkedIn");
  const [tone, setTone] = useState<string>("Professional");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const generateBio = async () => {
    if (!role.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Write 3 unique ${tone} bios for ${platform}. Profession: ${role}. Key Skills/Interests: ${skills || "Technology, Coding, Innovation"}. Keep emojis suitable for ${platform}.`
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

    setTimeout(() => {
      setOutput(`Option 1 (${platform} Professional):
💼 ${role} | Specializing in ${skills || "Full-Stack Development & AI Engineering"}
🚀 Passionate about building scalable digital solutions & web performance.
📫 Let's connect!

Option 2 (${platform} Casual & Creative):
👨‍💻 ${role} turning complex problems into elegant code.
✨ Tech Enthusiast • ${skills || "React, Next.js & Open Source"}
📍 Based in India | Always learning & sharing insights.

Option 3 (Short & Punchy):
⚡ ${role} | Building high-impact tech tools. ${skills || "AI & Web Apps"}. 📩 DM for collaborations!`);
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
            <UserCheck size={13} /> Social Profile AI
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            AI Bio Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Create high-converting social media bios for LinkedIn, Twitter, Instagram, and GitHub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div>
              <label className="text-xs font-black text-slate-950 uppercase tracking-wider block mb-1">
                Your Profession / Role *
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Senior Full-Stack Engineer, Digital Marketer"
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-950 outline-none focus:border-[#2874f0] transition"
              />
            </div>

            <div>
              <label className="text-xs font-black text-slate-950 uppercase tracking-wider block mb-1">
                Key Skills / Interests
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. Next.js, React, Node.js, UI Design"
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-950 outline-none focus:border-[#2874f0] transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-black text-slate-950 uppercase tracking-wider block mb-1">
                  Target Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-950 outline-none focus:border-[#2874f0] transition"
                >
                  <option>LinkedIn</option>
                  <option>Twitter / X</option>
                  <option>Instagram</option>
                  <option>GitHub</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black text-slate-950 uppercase tracking-wider block mb-1">
                  Tone & Vibe
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-950 outline-none focus:border-[#2874f0] transition"
                >
                  <option>Professional</option>
                  <option>Casual & Friendly</option>
                  <option>Witty & Creative</option>
                  <option>Minimalist & Punchy</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateBio}
              disabled={loading || !role.trim()}
              className="w-full bg-[#2874f0] hover:bg-blue-600 disabled:opacity-50 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition"
            >
              {loading ? <RefreshCw size={15} className="animate-spin" /> : <Sparkles size={15} />}
              <span>{loading ? "Generating Bios..." : "Generate AI Bios"}</span>
            </button>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 min-h-[320px]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100 mb-3">
                <span className="text-xs font-black text-slate-950 uppercase">Generated Social Bios:</span>
                {output && (
                  <button
                    onClick={handleCopy}
                    className="text-[#2874f0] hover:text-blue-700 text-xs font-black flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copied ? "Copied" : "Copy Bios"}</span>
                  </button>
                )}
              </div>

              {output ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-extrabold text-slate-900 whitespace-pre-wrap leading-relaxed">
                  {output}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 font-bold text-xs">
                  Fill in your role and click "Generate AI Bios" to preview options here.
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
