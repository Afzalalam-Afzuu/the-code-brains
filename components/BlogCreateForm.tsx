// components/BlogCreateForm.tsx
"use client";

import { useActionState, useState, useEffect } from "react";
import { createBlogAction, generateBlogDraftAction } from "../lib/db-actions";
import { ArrowLeft, Sparkles, AlertCircle, Eye, Edit2, Loader2, Cpu } from "lucide-react";
import Link from "next/link";

interface ActionState {
  error?: string;
  success?: boolean;
}

export default function BlogCreateForm() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    async (prevState, formData) => {
      const res = await createBlogAction(prevState, formData);
      return res || { success: true };
    },
    {}
  );

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  // AI draft helpers
  const [aiTopic, setAiTopic] = useState("");
  const [aiModel, setAiModel] = useState("gemini-2.5-flash");
  const [aiLoading, setAiLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [aiError, setAiError] = useState("");
  const [aiSuccess, setAiSuccess] = useState(false);

  // Auto-generate slug from title if not manually changed
  useEffect(() => {
    if (!isSlugManual && title) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // remove special chars
        .replace(/\s+/g, "-") // replace spaces with dashes
        .replace(/-+/g, "-") // remove duplicate dashes
        .trim();
      setSlug(generated);
    }
  }, [title, isSlugManual]);

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

  const handleAiDraft = async () => {
    const topic = aiTopic.trim();
    if (!topic || aiLoading || cooldown > 0) return;

    setAiLoading(true);
    setAiError("");
    setAiSuccess(false);

    try {
      const res = await generateBlogDraftAction(topic, aiModel);
      if (res.error) {
        setAiError(res.error);
      } else {
        setTitle(res.title);
        setExcerpt(res.excerpt);
        setContent(res.content);
        setAiSuccess(true);
      }
    } catch (err: any) {
      setAiError(err.message || "Failed to generate draft content.");
    } finally {
      setAiLoading(false);
      startCooldown();
    }
  };

  return (
    <form action={formAction} className="space-y-6">
      {/* Error Alert */}
      {state.error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-700 text-xs font-semibold animate-pulse">
          <AlertCircle className="shrink-0 mt-0.5" size={16} />
          <p>{state.error}</p>
        </div>
      )}

      {/* AI Writer Assistant Widget */}
      <div className="bg-slate-50 border border-dashed border-indigo-200 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-1.5 text-indigo-700 text-xs font-black uppercase tracking-wider">
          <Sparkles className="animate-pulse shrink-0" size={16} />
          <span>Gemini AI Writer Assistant</span>
        </div>
        <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
          Select your model and type a blog topic. Gemini AI will automatically generate a headline, SEO description, and draft the complete article content in Markdown.
        </p>

        <div className="flex flex-col md:flex-row gap-2">
          <select
            value={aiModel}
            onChange={(e) => setAiModel(e.target.value)}
            className="bg-white border border-slate-200 text-slate-800 text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500 transition cursor-pointer font-bold shrink-0"
          >
            <option value="gemini-2.5-flash">✨ AI 1.5 Flash (Most Reliable)</option>
            <option value="gemini-2.5-flash-lite">⚡ AI 2.0 Flash-Lite</option>
          </select>
          <input
            type="text"
            value={aiTopic}
            onChange={(e) => setAiTopic(e.target.value)}
            placeholder="e.g. Top features of Next.js 15 App Router..."
            className="flex-1 bg-white border border-slate-200 text-slate-800 text-xs rounded-xl px-3.5 py-2.5 outline-none focus:border-indigo-500 transition"
          />
          <button
            type="button"
            onClick={handleAiDraft}
            disabled={aiLoading || cooldown > 0}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-extrabold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            {aiLoading ? (
              <Loader2 className="animate-spin" size={13} />
            ) : (
              <Cpu size={13} />
            )}
            <span>{cooldown > 0 ? `Wait ${cooldown}s` : "Draft Article"}</span>
          </button>
        </div>

        {aiError && <p className="text-[10px] text-red-600 font-bold">{aiError}</p>}
        {aiSuccess && <p className="text-[10px] text-emerald-600 font-bold">✨ Blog draft populated successfully! Feel free to review and customize fields below.</p>}
      </div>

      {/* Grid of basic fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">
            Blog Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Next.js 15 Features and Benefits"
            className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-150 transition"
            required
          />
        </div>

        {/* Slug */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">
            URL Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="slug"
            value={slug}
            onChange={(e) => {
              setIsSlugManual(true);
              setSlug(e.target.value);
            }}
            placeholder="e.g. nextjs-15-features-and-benefits"
            className="w-full bg-white border border-slate-200 text-slate-850 text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-150 transition"
            required
          />
          <p className="text-[10px] text-slate-405 font-semibold">
            {isSlugManual ? "✍️ Manually customized slug" : "⚡ Automatically generated from title"}
          </p>
        </div>
      </div>

      {/* Grid of secondary fields */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Category Tag */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">Category Tag</label>
          <select
            name="tag"
            defaultValue="AI & AUTOMATION"
            className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-150 transition cursor-pointer"
          >
            <option value="AI & AUTOMATION">AI & Automation</option>
            <option value="DEVELOPMENT">Development</option>
            <option value="LAPTOPS">Laptops</option>
            <option value="OLED TVS">OLED TVs</option>
            <option value="ANTIVIRUS">Antivirus</option>
            <option value="REVIEWS">General Reviews</option>
          </select>
        </div>

        {/* Author */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">Author</label>
          <input
            type="text"
            name="author"
            defaultValue="Dev Kapoor"
            className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-150 transition"
          />
        </div>

        {/* Read Time */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">Read Time</label>
          <input
            type="text"
            name="readTime"
            defaultValue="5 Min Read"
            className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-150 transition"
          />
        </div>

        {/* Image URL */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">Image URL (Unsplash/Web)</label>
          <input
            type="url"
            name="image"
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-150 transition"
          />
        </div>
      </div>

      {/* Excerpt */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide">
          Excerpt / Short Summary <span className="text-red-500">*</span>
        </label>
        <textarea
          name="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="Brief description showing on listing card and Google search results..."
          className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-150 transition resize-y"
          required
        />
      </div>

      {/* Markdown Content Editor with Live Preview tabs */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
        <div className="bg-slate-55/80 border-b border-slate-200 px-4 py-2 flex items-center justify-between flex-wrap gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === "edit" ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <Edit2 size={13} />
              <span>Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === "preview" ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              <Eye size={13} />
              <span>Preview</span>
            </button>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
            Markdown Supported
          </span>
        </div>

        {activeTab === "edit" ? (
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            placeholder="# Write your blog content here in markdown...&#10;&#10;## Subheading&#10;Paragraph text here. You can use standard formatting.&#10;&#10;- Bullet points&#10;- Another bullet&#10;&#10;[Link Text](https://link-url.com)"
            className="w-full p-5 outline-none text-slate-800 text-sm border-0 focus:ring-0 resize-y font-mono"
            required
          />
        ) : (
          <div className="p-6 min-h-[240px] bg-slate-50/50 max-h-[480px] overflow-y-auto prose prose-slate max-w-none text-slate-700 text-sm">
            {content ? (
              <div className="whitespace-pre-wrap leading-relaxed">
                {/* Very basic preview, client side */}
                <h1 className="text-xl font-black text-slate-900 border-b pb-2 mb-4">{title || "Untitled Blog"}</h1>
                {content}
              </div>
            ) : (
              <p className="text-slate-450 italic text-center pt-10">Nothing to preview yet. Start writing in the Editor tab!</p>
            )}
          </div>
        )}
      </div>

      {/* Security Admin PIN and Submit */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide shrink-0">
            Admin PIN <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="pin"
            placeholder="Enter security PIN"
            className="w-full sm:w-48 bg-white border border-slate-200 text-slate-850 text-xs rounded-lg px-3 py-2 outline-none focus:border-indigo-500 transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto bg-slate-950 text-white hover:bg-indigo-600 disabled:bg-slate-400 font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={14} />
              <span>Publishing...</span>
            </>
          ) : (
            <>
              <Sparkles size={14} />
              <span>Publish Blog Post</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
