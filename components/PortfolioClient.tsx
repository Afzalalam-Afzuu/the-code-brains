"use client";

import React, { useState, useEffect } from "react";
import { 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  Database, 
  Cpu, 
  Cloud, 
  FileText, 
  Check, 
  Terminal, 
  User,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  ClipboardCheck,
  Clipboard,
  Layers,
  Zap,
  ShieldCheck,
  Send
} from "lucide-react";
import PrintButton from "./PrintButton";

export default function PortfolioClient() {
  const [activeTab, setActiveTab] = useState("all");
  const [copiedText, setCopiedText] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "System initialized. Type a command or click a shortcut below.",
    "Guest session established."
  ]);
  const [terminalInput, setTerminalInput] = useState("");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;
    executeCommand(cmd);
    setTerminalInput("");
  };

  const executeCommand = (cmd: string) => {
    let output = [...terminalOutput, `> ${cmd}`];
    
    switch (cmd) {
      case "help":
        output.push(
          "Available commands:",
          "  skills      - List core technologies",
          "  experience  - View career timeline",
          "  contact     - Display contact options",
          "  clear       - Clear terminal window"
        );
        break;
      case "skills":
        output.push(
          "Core Tech Stack:",
          "  • Languages: Node.js, Express, React, Next.js, Laravel, Flutter, Python/Django",
          "  • DB & Cache: MongoDB, PostgreSQL, MySQL, Redis Caching",
          "  • Cloud & DevOps: AWS EC2/S3, Vercel, Docker, Git"
        );
        break;
      case "experience":
        output.push(
          "Timeline:",
          "  • SchoolDigitalised | Full-Stack Developer (April 2026 - Present)",
          "  • Microcen Pvt Ltd  | Full-Stack Developer Intern (April 2025 - March 2026)"
        );
        break;
      case "contact":
        output.push(
          "Contact Channels:",
          "  • Email: afzalalam.afzuu@gmail.com",
          "  • Phone: +91 8102061851",
          "  • LinkedIn: linkedin.com/in/afzal-alam-afzuu"
        );
        break;
      case "clear":
        output = ["Terminal cleared. Type 'help' for options."];
        break;
      default:
        output.push(`Command '${cmd}' not recognized. Type 'help' for options.`);
    }
    
    setTerminalOutput(output);
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen text-slate-800 font-sans selection:bg-slate-900 selection:text-white relative overflow-hidden bg-[linear-gradient(to_right,#8080800b_1px,transparent_1px),linear-gradient(to_bottom,#8080800b_1px,transparent_1px)] bg-[size:24px_24px] print:bg-white print:text-black">
      
      {/* Decorative Blur Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none print:hidden" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[45%] bg-violet-100/30 rounded-full blur-[120px] pointer-events-none print:hidden" />

      {/* FLOATING LOCAL NAVIGATION BAR */}
      <nav className="sticky top-4 z-50 max-w-5xl mx-auto mx-4 sm:mx-auto bg-white/70 backdrop-blur-xl border border-slate-200/40 px-6 py-3.5 flex items-center justify-between rounded-2xl shadow-sm print:hidden">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-900 animate-pulse" />
          <span className="font-black text-sm tracking-widest text-slate-900 uppercase">
            AFZAL<span className="text-indigo-600">.</span>DEV
          </span>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
          <a href="#skills" className="hover:text-slate-900 transition-colors">Skills</a>
          <a href="#experience" className="hover:text-slate-900 transition-colors">Experience</a>
          <a href="#projects" className="hover:text-slate-900 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <PrintButton />
        </div>
      </nav>

      {/* PORTFOLIO BODY CONTAINER */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-28 print:py-4 print:space-y-6">
        
        {/* SECTION 1: HERO HEADER & INTERACTIVE TERMINAL */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-4 print:grid-cols-1 print:gap-4 print:pt-0">
          
          {/* Hero Left Column */}
          <div className="lg:col-span-7 space-y-6 print:col-span-1 print:space-y-3">
            <div className="inline-flex items-center gap-2 bg-slate-900 text-white rounded-full px-3.5 py-1 text-[10px] font-bold tracking-widest uppercase shadow-xs print:hidden">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM ARCHITECT
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[0.95] text-slate-900 print:text-3xl">
              Afzal Alam
            </h1>
            
            <p className="text-md sm:text-lg font-bold text-slate-500 tracking-wide print:text-xs">
              MERN Stack • Laravel • Flutter • AI Engineering
            </p>
            
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base print:text-xs max-w-lg">
              I construct robust, high-performance backends and native cross-platform mobile systems. My work targets low latency, secure token lifecycles, and database horizontal scalability.
            </p>

            {/* Premium Social & Contact Pills */}
            <div className="flex flex-wrap gap-2.5 pt-2 print:grid print:grid-cols-2 print:gap-1.5 print:text-black">
              {/* Email */}
              <button 
                onClick={() => copyToClipboard("afzalalam.afzuu@gmail.com", "email")}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200/60 rounded-xl hover:border-slate-400 text-xs font-semibold text-slate-600 hover:text-slate-900 transition shadow-2xs group cursor-pointer print:border-none print:shadow-none print:px-0"
              >
                <Mail size={13} className="text-slate-400 group-hover:text-slate-900" />
                <span>afzalalam.afzuu@gmail.com</span>
                {copiedText === "email" ? (
                  <ClipboardCheck size={11} className="text-emerald-600 print:hidden" />
                ) : (
                  <Clipboard size={11} className="text-slate-300 opacity-0 group-hover:opacity-100 transition print:hidden" />
                )}
              </button>

              {/* Phone */}
              <a 
                href="tel:+918102061851"
                className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200/60 rounded-xl hover:border-slate-400 text-xs font-semibold text-slate-600 hover:text-slate-900 transition shadow-2xs group print:border-none print:shadow-none print:px-0"
              >
                <Phone size={13} className="text-slate-400 group-hover:text-slate-900" />
                <span>+91 8102061851</span>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/in/afzal-alam-afzuu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200/60 rounded-xl hover:border-slate-400 text-xs font-semibold text-slate-600 hover:text-slate-900 transition shadow-2xs group print:border-none print:shadow-none print:px-0"
              >
                <svg className="w-3 h-3 text-slate-400 group-hover:text-slate-900 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
                <span>linkedin.com/in/afzal-alam-afzuu</span>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/Afzalalam-Afzuu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200/60 rounded-xl hover:border-slate-400 text-xs font-semibold text-slate-600 hover:text-slate-900 transition shadow-2xs group print:border-none print:shadow-none print:px-0"
              >
                <svg className="w-3 h-3 text-slate-400 group-hover:text-slate-900 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                <span>github.com/Afzalalam-Afzuu</span>
              </a>
            </div>
          </div>

          {/* Hero Right: Interactive Developer Console */}
          <div className="lg:col-span-5 print:hidden">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs text-slate-300 max-w-md mx-auto">
              
              {/* Console Topbar */}
              <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] text-slate-500 font-bold select-none">system_core.sh</span>
                <Terminal size={12} className="text-slate-500" />
              </div>

              {/* Console Output Screen */}
              <div className="p-4 h-48 overflow-y-auto space-y-1.5 bg-slate-950/80 text-emerald-400 scrollbar-thin scrollbar-thumb-slate-800">
                {terminalOutput.map((line, idx) => (
                  <div key={idx} className="whitespace-pre-wrap leading-relaxed text-[11px]">
                    {line.startsWith("> ") ? (
                      <span className="text-slate-400 font-bold">{line}</span>
                    ) : line.startsWith("  •") || line.startsWith("  •") ? (
                      <span className="text-indigo-300">{line}</span>
                    ) : (
                      line
                    )}
                  </div>
                ))}
              </div>

              {/* Console Shortcut Buttons */}
              <div className="p-3 bg-slate-900 border-t border-slate-800 flex flex-wrap gap-1.5">
                <button 
                  onClick={() => executeCommand("skills")} 
                  className="px-2 py-1 bg-slate-850 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white rounded border border-slate-800 font-bold transition cursor-pointer"
                >
                  sh skills.sh
                </button>
                <button 
                  onClick={() => executeCommand("experience")} 
                  className="px-2 py-1 bg-slate-850 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white rounded border border-slate-800 font-bold transition cursor-pointer"
                >
                  sh experience.sh
                </button>
                <button 
                  onClick={() => executeCommand("contact")} 
                  className="px-2 py-1 bg-slate-850 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white rounded border border-slate-800 font-bold transition cursor-pointer"
                >
                  sh contact.sh
                </button>
              </div>

              {/* Input Form */}
              <form onSubmit={handleTerminalSubmit} className="flex border-t border-slate-800">
                <span className="pl-3 py-2.5 text-slate-500 select-none font-bold">&gt;</span>
                <input 
                  type="text" 
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type help and hit Enter..."
                  className="w-full bg-transparent outline-none border-none py-2.5 px-2 text-[11px] text-white placeholder-slate-650"
                />
              </form>
            </div>
          </div>
        </section>

        {/* SECTION 2: EXECUTIVE SUMMARY & PHILOSOPHIES */}
        <section id="about" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start scroll-mt-24">
          <div className="md:col-span-4 space-y-3">
            <div className="inline-flex items-center gap-1 text-[10px] font-extrabold text-indigo-650 uppercase tracking-widest">
              <Sparkles size={11} />
              Engineering Ethos
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              The Developer Philosophy
            </h2>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              How I approach software: minimizing database requests, designing predictable interfaces, and ensuring deployment pipelines work automatically.
            </p>
          </div>

          <div className="md:col-span-8 bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-2xs hover:shadow-xs transition duration-300 space-y-6 print:border-none print:shadow-none print:p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed print:grid-cols-1 print:gap-4 print:text-xs">
              <div className="space-y-3">
                <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-xs">Modern Full-Stack Focus</h3>
                <p>
                  I don't just write functional code; I architect systems. Utilizing frameworks like Next.js, Laravel, and Flutter, I build responsive, clean applications with structured state schemas, clean layout styling, and optimized client bundles.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-extrabold text-slate-900 uppercase tracking-wider text-xs">Speed & AI Optimization</h3>
                <p>
                  High-traffic APIs require efficient caching strategy. Using Redis memory storage, I shield relational and document databases, reducing direct database read cycles by 50%. I also build custom RAG interfaces that leverage prompt structures to output clean, structured context.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TECHNICAL EXPERTISE GRID */}
        <section id="skills" className="space-y-6 scroll-mt-24 print:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-indigo-650 uppercase tracking-widest flex items-center gap-1.5">
                <Layers size={11} />
                Capabilities
              </span>
              <h2 className="text-3xl font-black text-slate-900">Technical Skill Index</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-4">
            {/* Languages & Frameworks */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition duration-300">
              <div className="flex items-center gap-3 mb-3">
                <span className="p-2 rounded-xl bg-slate-100 text-slate-800"><Code size={16} /></span>
                <h3 className="font-bold text-slate-900 text-sm tracking-tight uppercase">Languages & Frameworks</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Next.js & React:</strong> SSR/SSG rendering patterns, App Router configurations, and custom hook hooks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Laravel (PHP):</strong> Restful endpoint modeling, MVC backend layers, and migrations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Flutter (Dart):</strong> Native mobile structures, secure auth stores, and async fetch.</span>
                </li>
              </ul>
            </div>

            {/* Databases & Performance Caching */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition duration-300">
              <div className="flex items-center gap-3 mb-3">
                <span className="p-2 rounded-xl bg-slate-100 text-slate-800"><Database size={16} /></span>
                <h3 className="font-bold text-slate-900 text-sm tracking-tight uppercase">Databases & Performance Caching</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Redis Memory Store:</strong> Sub-millisecond response caching, rate limiting, and queue buffers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>PostgreSQL & MySQL:</strong> Complex query performance tuning, index paths, and structural schemas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>MongoDB:</strong> Aggregates, nested document models, and cluster distribution.</span>
                </li>
              </ul>
            </div>

            {/* DevOps & Cloud Infrastructure */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition duration-300">
              <div className="flex items-center gap-3 mb-3">
                <span className="p-2 rounded-xl bg-slate-100 text-slate-800"><Cloud size={16} /></span>
                <h3 className="font-bold text-slate-900 text-sm tracking-tight uppercase">DevOps & Cloud Infrastructure</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>AWS (EC2 & S3):</strong> Virtual machines deployment, scalable S3 media buckets, and load balancing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Vercel & Git Pipelines:</strong> Standardized continuous builds, branch management, and release hooks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>API Protection:</strong> JSON Web Tokens (JWT) storage, rate limits, and CORS security.</span>
                </li>
              </ul>
            </div>

            {/* AI Engineering & RAG Workflows */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition duration-300">
              <div className="flex items-center gap-3 mb-3">
                <span className="p-2 rounded-xl bg-slate-100 text-slate-800"><Cpu size={16} /></span>
                <h3 className="font-bold text-slate-900 text-sm tracking-tight uppercase">AI Engineering & RAG Workflows</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>RAG Architecture:</strong> Document vector extraction, vector database search, and context inject.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>LLM Automation:</strong> Prompt configurations, API schema validations, and blog asset synthesis.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Semantic Search:</strong> Matching similarity values, context indexing, and query speedups.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 4: PROFESSIONAL EXPERIENCE (RESTORED INTERNSHIP) */}
        <section id="experience" className="space-y-6 scroll-mt-24 print:space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-indigo-650 uppercase tracking-widest flex items-center gap-1.5">
              <Briefcase size={11} />
              Career Journey
            </span>
            <h2 className="text-3xl font-black text-slate-900">Work Experience & Internship</h2>
          </div>
          
          <div className="space-y-6">
            
            {/* Experience Item 1: SchoolDigitalised */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-2xs hover:shadow-xs transition duration-300 relative overflow-hidden print:p-4">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-900" />
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold text-indigo-600 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Full-Time Role
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-lg leading-tight pt-1">Full-Stack Developer</h3>
                  <p className="text-xs font-semibold text-slate-500">SchoolDigitalised</p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 w-fit">
                  <Calendar size={11} />
                  April 2026 – Present
                </div>
              </div>
              
              <ul className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed list-inside">
                <li className="flex gap-2">
                  <span className="text-slate-900 font-bold shrink-0 mt-0.5">↳</span>
                  <span>Spearheaded the development of large-scale, high-traffic E-commerce, EdTech (LMS), and CMS solutions, consistently supporting <strong className="text-slate-800 font-bold">5,000+ concurrent active users</strong>.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-slate-900 font-bold shrink-0 mt-0.5">↳</span>
                  <span>Architected highly available backend systems specifically designed for live-class conduction and VOD (Video-on-Demand) storage, successfully <strong className="text-slate-800 font-bold">reducing system latency by 20%</strong> through strategic cloud optimization.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-slate-900 font-bold shrink-0 mt-0.5">↳</span>
                  <span>Collaborating with cross-functional teams to translate complex business requirements into scalable, stable technical architectures.</span>
                </li>
              </ul>
            </div>

            {/* Experience Item 2: Microcen Pvt Ltd (INTERNSHIP RESTORED & LABELED) */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-2xs hover:shadow-xs transition duration-300 relative overflow-hidden print:p-4">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-650" />
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-150 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Internship
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-lg leading-tight pt-1">Full-Stack Developer Intern</h3>
                  <p className="text-xs font-semibold text-slate-500">Microcen Pvt Ltd</p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 w-fit">
                  <Calendar size={11} />
                  12-Month Period
                </div>
              </div>
              
              <ul className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed list-inside">
                <li className="flex gap-2">
                  <span className="text-indigo-600 font-bold shrink-0 mt-0.5">↳</span>
                  <span>Successfully built and maintained complex ERP, LMS, and CRM solutions, achieving a consistent <strong className="text-slate-800 font-bold">99.9% system uptime</strong>.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-600 font-bold shrink-0 mt-0.5">↳</span>
                  <span>Applied advanced API lifecycle management and enforced strict security protocols, resulting in a significantly more resilient infrastructure.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-600 font-bold shrink-0 mt-0.5">↳</span>
                  <span>Optimized complex multi-database queries (MySQL/PostgreSQL/MongoDB), which <strong className="text-slate-800 font-bold">improved overall system response time by 30%</strong> for end-users.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5: TECHNICAL PROJECTS (GITHUB STYLE) */}
        <section id="projects" className="space-y-6 scroll-mt-24 print:space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-indigo-650 uppercase tracking-widest flex items-center gap-1.5">
              <Zap size={11} />
              Implementations
            </span>
            <h2 className="text-3xl font-black text-slate-900">Featured Technical Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Project 1 */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>Production Ready</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base leading-tight">AI-Driven Affiliate & Content Platform</h3>
                <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                  Built a comprehensive, high-performance affiliate aggregator using Next.js and PostgreSQL. Integrated multiple third-party APIs, structured automated SEO blog generations via LLM parameter controls, and set up semantic indexing.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5 items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {["Next.js", "PostgreSQL", "LLM", "AdSense"].map(tag => (
                    <span key={tag} className="text-[9px] font-bold bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-100">{tag}</span>
                  ))}
                </div>
                <span className="text-[10px] font-black text-indigo-600 tracking-wider uppercase">+40% Organic Traffic</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>High Concurrency</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base leading-tight">High-Concurrency Online Exam System</h3>
                <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                  Engineered an exam architecture using Redis memory strategy. Cached all test answers and active inputs to relieve database stress by 50% during heavy loading. Supports automatic submit timers and session recovery.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5 items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {["Node.js", "Redis Caching", "Queues"].map(tag => (
                    <span key={tag} className="text-[9px] font-bold bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-100">{tag}</span>
                  ))}
                </div>
                <span className="text-[10px] font-black text-indigo-600 tracking-wider uppercase">10k+ concurrent subs</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>Mobile Ecosystem</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base leading-tight">Cross-Platform Mobile Ecosystem</h3>
                <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                  Developed a responsive mobile app using Flutter paired with a secure Laravel API gateway. Structured JWT security rules, SharedPreferences token caching, and complex pagination.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5 items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {["Flutter", "Laravel API", "JWT Auth"].map(tag => (
                    <span key={tag} className="text-[9px] font-bold bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-100">{tag}</span>
                  ))}
                </div>
                <span className="text-[10px] font-black text-indigo-600 tracking-wider uppercase">50k+ Active Users</span>
              </div>
            </div>

            {/* Project 4 */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition duration-300 flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>AWS Stack</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base leading-tight">Scalable E-commerce Application</h3>
                <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                  Designed a full MERN stack transaction system. Configured image optimization pipes using AWS S3, set up load-balanced instances on EC2, and implemented robust pagination routes.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5 items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {["MongoDB", "Express", "React", "AWS S3"].map(tag => (
                    <span key={tag} className="text-[9px] font-bold bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-100">{tag}</span>
                  ))}
                </div>
                <span className="text-[10px] font-black text-indigo-600 tracking-wider uppercase">AWS Auto-Scale</span>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 6: ACADEMICS & TRUST */}
        <section id="education" className="grid grid-cols-1 md:grid-cols-2 gap-8 scroll-mt-24 print:grid-cols-2 print:gap-4">
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-slate-100 rounded-lg text-slate-900"><GraduationCap size={15} /></span>
              Academics
            </h3>
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition duration-300">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Degree Program</span>
              <h4 className="font-extrabold text-slate-900 text-base mt-2 mb-1">Bachelor of Computer Applications (BCA)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Focused on database logic, algorithms, structural query languages, network diagrams, and Object-Oriented design frameworks.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-slate-100 rounded-lg text-slate-900"><Award size={15} /></span>
              Credentials
            </h3>
            <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition duration-300">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Industry Training</span>
              <h4 className="font-extrabold text-slate-900 text-base mt-2 mb-1">Advanced Web & AI Engineering</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                LinkedIn Learning and Udemy Professional Certifications covering modern React environments, Laravel security structures, and LLM integrations.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: PRO CONTACT INQUIRY */}
        <section id="contact" className="scroll-mt-24 print:hidden">
          <div className="bg-white border border-slate-200/60 rounded-3xl p-8 sm:p-10 shadow-xs hover:shadow-sm transition duration-300 max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form Left Side */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] font-extrabold text-indigo-650 uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldCheck size={11} />
                  Safe Channel
                </span>
                <h3 className="text-2xl font-black text-slate-900">Start a Project</h3>
                <p className="text-slate-550 text-xs sm:text-sm leading-relaxed max-w-xs">
                  Submit an inquiry regarding a contract role, systems optimization audit, or full-stack architectural design.
                </p>
                <div className="space-y-2 pt-2 text-xs font-bold text-slate-500">
                  <div className="flex items-center gap-2">
                    <span>Email:</span>
                    <a href="mailto:afzalalam.afzuu@gmail.com" className="text-slate-900 hover:underline">afzalalam.afzuu@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Phone:</span>
                    <a href="tel:+918102061851" className="text-slate-900 hover:underline">+91 8102061851</a>
                  </div>
                </div>
              </div>

              {/* Form Right Side */}
              <form className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full border border-slate-200/80 focus:border-slate-800 outline-none rounded-xl px-3 py-2.5 text-xs transition bg-slate-50/50" 
                      required 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="jane@company.com" 
                      className="w-full border border-slate-200/80 focus:border-slate-800 outline-none rounded-xl px-3 py-2.5 text-xs transition bg-slate-50/50" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Technical Inquiry" 
                    className="w-full border border-slate-200/80 focus:border-slate-800 outline-none rounded-xl px-3 py-2.5 text-xs transition bg-slate-50/50" 
                    required 
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Details</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe the technical requirements or opportunities..." 
                    className="w-full border border-slate-200/80 focus:border-slate-800 outline-none rounded-xl px-3 py-2.5 text-xs transition bg-slate-50/50 resize-none" 
                    required 
                  />
                </div>
                
                <button 
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition duration-300 shadow-2xs hover:shadow-xs cursor-pointer"
                >
                  Submit Inquiry
                  <Send size={11} />
                </button>
              </form>

            </div>
          </div>
        </section>
        
      </main>
    </div>
  );
}
