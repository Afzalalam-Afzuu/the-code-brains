"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  links?: { label: string; href: string }[];
  timestamp: string;
}

const QUICK_SUGGESTIONS = [
  "📱 Best Phones under ₹30,000?",
  "🌍 What is Quantum Computing?",
  "💻 Top Gaming & Work Laptops?",
  "🛒 How to compare Amazon vs Flipkart prices?",
  "⚡ What features does TheCodeBrains offer?",
];

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Namaste! 👋 I am **Brainy AI**, powered by **Google Gemini**. I can answer any tech shopping questions, compare prices, or answer general knowledge questions about anything in the world! What's on your mind?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Extract internal route links from text if present
  const extractLinks = (text: string) => {
    const links: { label: string; href: string }[] = [];
    const lower = text.toLowerCase();

    if (lower.includes("/browse") || lower.includes("browse")) {
      links.push({ label: "Browse All Deals", href: "/browse" });
    }
    if (lower.includes("phone") || lower.includes("mobile")) {
      links.push({ label: "Best Phones Hub", href: "/phones/best-picks" });
    }
    if (lower.includes("laptop") || lower.includes("computing")) {
      links.push({ label: "Best Laptops", href: "/computing/best-laptops" });
    }
    if (lower.includes("plus") || lower.includes("membership") || lower.includes("/join")) {
      links.push({ label: "Join Plus Membership", href: "/join" });
    }

    // Deduplicate links by href
    return links.filter((v, i, a) => a.findIndex(t => t.href === v.href) === i);
  };

  const handleSend = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: messageText }),
      });

      const data = await res.json();
      const responseText =
        data?.response ||
        "I'm here to help! Feel free to ask about tech gadgets, price comparisons, or any general knowledge topic!";

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: responseText,
        links: extractLinks(responseText),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "I'm having a slight network connection issue, but you can explore our latest deals on **/browse**!",
          links: [{ label: "Browse Deals", href: "/browse" }],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Widget Trigger Button */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-lg border border-slate-700 animate-bounce">
            <Zap size={13} className="text-yellow-400 fill-yellow-400" />
            <span>Ask Gemini AI Assistant</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle AI Assistant"
          className="relative group bg-gradient-to-r from-[#2874f0] via-indigo-600 to-purple-600 text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20 cursor-pointer flex items-center justify-center"
        >
          {isOpen ? (
            <X size={22} />
          ) : (
            <>
              <Sparkles size={22} className="animate-spin-slow" />
              <span className="absolute -top-1 -right-1 bg-[#ffe500] text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase border border-white shadow-xs">
                GEMINI
              </span>
            </>
          )}
        </button>
      </div>

      {/* AI Chat Popup Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[390px] h-[540px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2874f0] via-indigo-600 to-purple-700 text-white p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Sparkles size={20} className="text-yellow-300" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-1.5">
                  <span>Brainy AI (Gemini Powered)</span>
                  <span className="bg-[#ffe500] text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                    LIVE
                  </span>
                </h3>
                <p className="text-[10px] text-blue-100 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Google Gemini 1.5 Flash • World Knowledge</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2874f0] to-purple-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1 shadow-xs">
                    ⚡
                  </div>
                )}

                <div
                  className={`max-w-[84%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#2874f0] text-white font-semibold rounded-br-none"
                      : "bg-white text-slate-800 border border-slate-200/80 shadow-2xs rounded-bl-none"
                  }`}
                >
                  <div className="whitespace-pre-line font-medium space-y-1">{msg.text}</div>

                  {/* Recommendation Action Links */}
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col gap-1.5">
                      {msg.links.map((link, lIdx) => (
                        <Link
                          key={lIdx}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center justify-between px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#2874f0] font-extrabold rounded-lg text-[11px] transition"
                        >
                          <span>{link.label}</span>
                          <ArrowRight size={12} />
                        </Link>
                      ))}
                    </div>
                  )}

                  <span
                    className={`block text-[9px] mt-1 text-right font-medium ${
                      msg.sender === "user" ? "text-blue-100" : "text-slate-400"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2874f0] to-purple-600 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                  ⚡
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl p-3 shadow-2xs rounded-bl-none flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500">Gemini is thinking</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2874f0] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-bounce delay-200" />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestions Scrollable Pills */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
            {QUICK_SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(sug)}
                className="whitespace-nowrap bg-slate-100 hover:bg-blue-50 hover:text-[#2874f0] text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-200/80 transition cursor-pointer shrink-0"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Gemini anything in the world..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] font-medium"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="bg-gradient-to-r from-[#2874f0] to-purple-600 hover:opacity-90 disabled:opacity-50 text-white p-2 rounded-xl transition cursor-pointer flex items-center justify-center shrink-0"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
