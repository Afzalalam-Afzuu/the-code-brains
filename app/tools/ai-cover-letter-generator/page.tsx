"use client";

import React, { useState } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { FileText, Sparkles, Copy, Check, RefreshCw } from "lucide-react";

export default function AiCoverLetterGeneratorPage() {
  const [jobTitle, setJobTitle] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const generateCoverLetter = async () => {
    if (!jobTitle.trim() || !company.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Write a tailored cover letter for ${jobTitle} position at ${company}. Applicant Experience: ${experience || "3 years"}. Key Skills: ${skills || "Web Development, Problem Solving"}. Format professionally with hiring manager greeting and closing.`
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
      setOutput(`Dear Hiring Manager at ${company},

I am writing to express my strong enthusiasm for the ${jobTitle} position at ${company}. With over ${experience || "3+ years"} of hands-on experience and a proven track record in ${skills || "Full-Stack Software Development"}, I am confident in my ability to deliver immediate value to your team.

Throughout my career, I have consistently demonstrated expertise in building high-performance web applications, streamlining technical workflows, and collaborating effectively across cross-functional teams. At ${company}, I am particularly drawn to your commitment to engineering excellence and digital innovation.

My background matches the key requirements of the ${jobTitle} role, specifically in:
- Leveraging modern frameworks to build responsive, user-centric interfaces.
- Optimizing code performance and backend database architecture.
- Driving projects from concept to production with clean, maintainable code.

Thank you for considering my application. I look forward to the opportunity to discuss how my background and technical skills align with the goals of ${company}.

Sincerely,
[Your Full Name]
[Your Phone Number] | [Your Email Address]`);
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
            <FileText size={13} /> Career AI Tools
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            AI Cover Letter Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Generate customized, professional cover letters tailored to your target job title and company.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-black text-slate-950 uppercase tracking-wider block mb-1">
                  Target Job Title *
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Next.js Developer"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-950 outline-none focus:border-[#2874f0] transition"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-950 uppercase tracking-wider block mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. TechCorp Solutions"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-950 outline-none focus:border-[#2874f0] transition"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-slate-950 uppercase tracking-wider block mb-1">
                Years of Experience
              </label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 3+ years in web development"
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-950 outline-none focus:border-[#2874f0] transition"
              />
            </div>

            <div>
              <label className="text-xs font-black text-slate-950 uppercase tracking-wider block mb-1">
                Your Top Skills / Achievements
              </label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. React, Next.js, Node.js, REST APIs, Tailwind CSS, Database Optimization"
                rows={3}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-950 outline-none focus:border-[#2874f0] transition"
              />
            </div>

            <button
              onClick={generateCoverLetter}
              disabled={loading || !jobTitle.trim() || !company.trim()}
              className="w-full bg-[#2874f0] hover:bg-blue-600 disabled:opacity-50 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition"
            >
              {loading ? <RefreshCw size={15} className="animate-spin" /> : <Sparkles size={15} />}
              <span>{loading ? "Generating Cover Letter..." : "Generate AI Cover Letter"}</span>
            </button>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 min-h-[320px]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100 mb-3">
                <span className="text-xs font-black text-slate-950 uppercase">Generated Cover Letter:</span>
                {output && (
                  <button
                    onClick={handleCopy}
                    className="text-[#2874f0] hover:text-blue-700 text-xs font-black flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copied ? "Copied" : "Copy Cover Letter"}</span>
                  </button>
                )}
              </div>

              {output ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-extrabold text-slate-900 whitespace-pre-wrap leading-relaxed">
                  {output}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 font-bold text-xs">
                  Fill in your target job title & company to preview your customized cover letter.
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
