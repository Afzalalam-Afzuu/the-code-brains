// app/blog/jotform-ai-agents/page.tsx
import Link from "next/link";
import { ArrowLeft, Sparkles, Brain, Cpu, Zap, Share2, Bookmark, CheckCircle2, MessageSquare, ExternalLink, Calendar, User, Clock } from "lucide-react";
import { blogPosts } from "../../../lib/blog-data";

export const metadata = {
  title: "Jotform AI Agents Review: No-Code Workflow Automation - TheCodeBrains",
  description: "Discover how Jotform's new AI Agent builder is revolutionizing business workflows. Build custom, conversational AI assistants without writing code.",
};

export default function JotformAiAgentsBlog() {
  const affiliateUrl = "https://www.jotform.com/ai/agents/?partner=thecodebrains";

  return (
    <div className="bg-slate-50/50 min-h-screen pb-16">
      {/* Article Header Banner */}
      <div className="bg-slate-900 text-white py-12 sm:py-16 relative overflow-hidden">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/10 blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-to-tr from-emerald-500/10 to-indigo-500/20 blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-4">
          {/* Back button and Category */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </Link>

            <span className="bg-indigo-600/90 text-white text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase">
              AI & AUTOMATION
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15] mb-6">
            Jotform AI Agents: Build Custom AI Assistants to Automate Your Business Workflows
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base sm:text-lg font-medium max-w-3xl mb-8 leading-relaxed">
            The next generation of no-code automation is here. Discover how to create interactive, decision-making AI agents that handle data, talk to users, and complete tasks on autopilot.
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400 border-t border-slate-800 pt-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-300">
                DK
              </div>
              <span className="font-bold text-slate-200">Dev Kapoor</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>July 15, 2026</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>6 Min Read</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 size={14} />
              <span>Editor's Choice</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-4xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
        
        {/* Blog Post Content Body */}
        <article className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xs">
          
          {/* Introduction Card */}
          <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed mb-6 italic border-l-4 border-indigo-500 pl-4 bg-slate-50 py-3 rounded-r-xl">
            Imagine having an assistant that works 24/7, responds instantly to customer queries, routes data to your databases, and automates document workflows without you writing a single line of code. That's exactly what Jotform's new AI Agent builder delivers.
          </p>

          <p className="text-slate-655 text-sm leading-relaxed mb-6">
            Businesses have been using forms for decades to collect leads, receive feedback, and register users. But static forms can feel rigid. Today, conversational AI is taking over. By converting your forms and internal documents into interactive, context-aware AI agents, Jotform is bridging the gap between data collection and smart automation.
          </p>

          {/* Section: What are AI Agents? */}
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-10 mb-4 flex items-center gap-2">
            <Brain className="text-indigo-600" size={22} />
            What is Jotform AI Agent Builder?
          </h2>
          <p className="text-slate-655 text-sm leading-relaxed mb-6">
            The Jotform AI Agent Builder is a revolutionary, visual no-code platform that allows anyone to create custom AI chat agents. These agents aren't just generic chatbots; they can be integrated with your existing Jotform forms, tables, and workflows to trigger actions, qualify leads, schedule calls, and record client responses in real-time.
          </p>

          {/* Key Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex gap-3.5">
              <Cpu className="text-indigo-600 shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">Contextual Reasoning</h4>
                <p className="text-slate-500 text-xs leading-relaxed">The agent understands your business docs, PDFs, and previous forms to give accurate, personalized answers.</p>
              </div>
            </div>
            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex gap-3.5">
              <Zap className="text-indigo-600 shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">Instant Actions</h4>
                <p className="text-slate-500 text-xs leading-relaxed">It can trigger email notifications, update CRM tools, and save leads into spreadsheets automatically.</p>
              </div>
            </div>
          </div>

          {/* Section: Features */}
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-10 mb-4">
            Key Features of Jotform AI Agents
          </h2>
          <p className="text-slate-655 text-sm leading-relaxed mb-4">
            Jotform has brought its decades-long expertise in no-code productivity tools to AI. Here are the features that stand out:
          </p>
          <ul className="space-y-3.5 mb-8">
            {[
              { title: "No-Code Customization", desc: "No coding background? No problem. Drag-and-drop elements, set custom prompts, and train your agent visually." },
              { title: "Smart Data Capture", desc: "Agents gather data conversationally and sync it instantly with your Jotform Tables." },
              { title: "Omnichannel Deployment", desc: "Embed your custom AI agent directly on your website, load it as a standalone landing page, or share it via QR code." },
              { title: "Integration Ecosystem", desc: "Easily connect with Slack, Google Sheets, Salesforce, HubSpot, and 100+ other tools." }
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-1" />
                <div className="text-sm">
                  <strong className="text-slate-800 font-bold">{feature.title}:</strong>{" "}
                  <span className="text-slate-500">{feature.desc}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* INTERACTIVE CALL-TO-ACTION BANNER */}
          <div className="my-10 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-indigo-500/20 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl" />
            
            <div className="relative z-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="inline-block bg-indigo-500 text-white text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded-md uppercase mb-3">
                  EXCLUSIVE PARTNER OFFER
                </span>
                <h3 className="text-lg sm:text-xl font-black tracking-tight mb-2">
                  Create Your Custom AI Agent Free
                </h3>
                <p className="text-slate-400 text-xs max-w-md leading-relaxed">
                  Start building custom conversational workflows. Jotform AI Agent builder is free to start. No credit card required.
                </p>
              </div>

              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-slate-900 hover:bg-indigo-600 hover:text-white font-extrabold text-xs uppercase tracking-wider px-6 py-4 rounded-xl transition duration-300 shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>Build Agent Free</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* How to Get Started Section */}
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-10 mb-4">
            How to Build Your First Agent in 3 Steps
          </h2>
          <p className="text-slate-655 text-sm leading-relaxed mb-6">
            Starting with Jotform AI Agents is exceptionally straightforward. You can go live in under 10 minutes:
          </p>

          <ol className="space-y-6 mb-8">
            <li className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 flex items-center justify-center font-black shrink-0 text-sm">
                1
              </span>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Define Agent Purpose & Instructions</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Log in to Jotform AI Agent Builder, name your agent, and write its instruction prompt (e.g. "You are an automated support agent that qualifies real-estate leads").
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 flex items-center justify-center font-black shrink-0 text-sm">
                2
              </span>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Train with Data Sources</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Upload your pricing PDFs, FAQ documents, or link your existing contact forms. The agent scans these dynamically to reply accurately.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 flex items-center justify-center font-black shrink-0 text-sm">
                3
              </span>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Publish and Integrate</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Copy the iframe embed code to paste it into your WordPress, Shopify, or Webflow site, or share the direct link. Connect integrations to automate data routing.
                </p>
              </div>
            </li>
          </ol>

          {/* Conclusion */}
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-10 mb-4">
            Our Verdict
          </h2>
          <p className="text-slate-655 text-sm leading-relaxed mb-6">
            If you are looking to boost customer engagement, automate repetitive data collection, or build custom task workflows, **Jotform AI Agents** is one of the most mature no-code AI builders available. Since it integrates natively with Jotform's powerful ecosystem of tables, approvals, and e-signatures, it provides end-to-end automation that other standard chatbots can't match.
          </p>

          {/* Final CTA Button */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <p className="text-slate-400 text-[10px] italic max-w-sm text-center sm:text-left">
              Disclosure: This guide contains affiliate links. Clicking them supports our editorial team at no extra cost to you.
            </p>
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Get Started with Jotform AI →</span>
            </a>
          </div>

        </article>

        {/* Sidebar Info & Sharing */}
        <aside className="space-y-6">
          {/* Author/Rating Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs text-center">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Overall Rating</h4>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <StarIcon key={s} size={16} />
              ))}
            </div>
            <p className="text-2xl font-black text-slate-800">4.8 / 5.0</p>
            <p className="text-slate-400 text-[10px] mt-1">Based on workflow efficiency, no-code integrations, and response accuracy.</p>
          </div>

          {/* Quick Stats */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2.5 border-b border-slate-100 mb-3">
              Jotform AI Specs
            </h4>
            <table className="w-full text-xs">
              <tbody>
                {[
                  { key: "Pricing", val: "Free / Premium" },
                  { key: "Setup Time", val: "Under 10 mins" },
                  { key: "Integrations", val: "100+ platforms" },
                  { key: "Training Docs", val: "PDF, TXT, CSV" },
                  { key: "Code Required", val: "None (100% Visual)" }
                ].map((item) => (
                  <tr key={item.key} className="border-b border-slate-50 last:border-0">
                    <td className="py-2 text-slate-450 font-bold">{item.key}</td>
                    <td className="py-2 text-slate-800 text-right font-semibold">{item.val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Share article */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs text-center">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Share Guide</h4>
            <div className="flex items-center justify-center gap-3">
              <button className="p-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition text-slate-500 cursor-pointer" aria-label="Share">
                <Share2 size={16} />
              </button>
              <button className="p-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition text-slate-500 cursor-pointer" aria-label="Bookmark">
                <Bookmark size={16} />
              </button>
            </div>
          </div>

          {/* Recommended Reads */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs text-left">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider pb-2.5 border-b border-slate-100 mb-3 font-extrabold">
              Recommended Reads
            </h4>
            <div className="space-y-4">
              {blogPosts
                .filter((p) => p.slug !== "jotform-ai-agents")
                .map((post) => (
                  <Link key={post.slug} href={post.href} className="group block text-xs">
                    <p className="font-extrabold text-indigo-600 uppercase tracking-wider text-[9px] mb-0.5">
                      {post.tag}
                    </p>
                    <p className="font-bold text-slate-850 group-hover:text-indigo-600 transition line-clamp-2 leading-snug">
                      {post.title}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}

function StarIcon({ size }: { size: number }) {
  return (
    <svg className="text-amber-400 fill-amber-400" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
