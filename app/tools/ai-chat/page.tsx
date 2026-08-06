"use client";

import React, { useState, useRef, useEffect } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { Bot, Send, User, Sparkles, RefreshCw, Copy, Check, Code2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am your AI Developer & Coding Assistant. How can I help you write code, debug errors, or explain technical topics today?",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend, message: textToSend }),
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data.response || data.reply || "Here is the response for your query.";
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `I am here to help you! Regarding "${textToSend}", you can explore live tech deals, code helpers, and price comparisons across our tools and browse sections.`,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Here is information regarding your query on "${textToSend}". Feel free to ask more technical questions!`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (content: string, idx: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-6 flex flex-col">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <Bot size={13} /> AI Intelligence Studio
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            AI Assistant & Code Solver
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Ask coding questions, generate code snippets, debug errors, and brainstorm technical ideas in real-time.
          </p>
        </div>

        {/* Preset Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => handleSend("Explain Next.js Server Components vs Client Components")}
            className="bg-white border-2 border-slate-200 hover:border-[#2874f0] text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full transition cursor-pointer shadow-xs"
          >
            💡 Explain Next.js Server Components
          </button>
          <button
            onClick={() => handleSend("Write a TypeScript function to debounce an API call")}
            className="bg-white border-2 border-slate-200 hover:border-[#2874f0] text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full transition cursor-pointer shadow-xs"
          >
            ⚡ TypeScript Debounce Snippet
          </button>
          <button
            onClick={() => handleSend("How to optimize Tailwind CSS for production?")}
            className="bg-white border-2 border-slate-200 hover:border-[#2874f0] text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full transition cursor-pointer shadow-xs"
          >
            🎨 Optimize Tailwind CSS
          </button>
        </div>

        {/* Chat Conversation Box */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm flex-1 min-h-[420px] flex flex-col justify-between space-y-4">
          <div className="space-y-4 overflow-y-auto max-h-[480px] pr-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-xl bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-[#2874f0] shrink-0 mt-1">
                    <Bot size={18} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs font-extrabold leading-relaxed shadow-2xs space-y-2 ${
                    msg.role === "user"
                      ? "bg-[#2874f0] text-white rounded-br-none border-2 border-blue-600"
                      : "bg-slate-50 text-slate-950 rounded-bl-none border-2 border-slate-200"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {msg.role === "assistant" && (
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleCopy(msg.content, idx)}
                        className="text-slate-600 hover:text-slate-950 text-[10px] font-black flex items-center gap-1 cursor-pointer"
                      >
                        {copiedIndex === idx ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                        <span>{copiedIndex === idx ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-xl bg-slate-950 text-white flex items-center justify-center shrink-0 mt-1">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 justify-start items-center text-xs font-black text-slate-700">
                <div className="w-8 h-8 rounded-xl bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-[#2874f0] animate-pulse">
                  <Bot size={18} />
                </div>
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="flex items-center gap-2 pt-3 border-t-2 border-slate-100">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a technical or coding question..."
              className="flex-1 bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3.5 text-xs font-black text-slate-950 outline-none focus:bg-white focus:border-[#2874f0] focus:ring-2 focus:ring-blue-200 transition"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="bg-[#2874f0] hover:bg-blue-600 text-white font-black text-xs px-5 py-3.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer uppercase tracking-wider disabled:opacity-50"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
