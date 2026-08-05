"use client";

import React, { useState } from "react";
import { Share2, Copy, Check, MessageCircle, Send } from "lucide-react";

interface BlogShareBarProps {
  title: string;
  slug: string;
  excerpt?: string;
  className?: string;
}

export default function BlogShareBar({ title, slug, excerpt, className = "" }: BlogShareBarProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://thecodebrains.com";
    return `${siteUrl}/blog/${slug}`;
  };

  const getShareText = () => {
    return `🔥 *${title}*\n\n${excerpt ? `⚡ ${excerpt}\n\n` : ''}👉 Read full article on TheCodeBrains: ${getShareUrl()}`;
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(getShareText())}`;
    window.open(url, "_blank");
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`🔥 ${title}`)}&url=${encodeURIComponent(getShareUrl())}`;
    window.open(url, "_blank");
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`;
    window.open(url, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: excerpt || title,
          url: getShareUrl(),
        });
      } catch (err) {
        // Ignored if user cancels share dialog
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-[10px] sm:text-xs font-black uppercase text-slate-400 tracking-wider mr-1">
        Share Guide:
      </span>

      {/* WhatsApp Share Button */}
      <button
        onClick={handleWhatsAppShare}
        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
        title="Share on WhatsApp"
      >
        <MessageCircle size={14} />
        <span>WhatsApp</span>
      </button>

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
        title="Copy Link to Clipboard"
      >
        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        <span>{copied ? "Copied!" : "Copy Link"}</span>
      </button>

      {/* Twitter / X Share Button */}
      <button
        onClick={handleTwitterShare}
        className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
        title="Share on Twitter / X"
      >
        <Send size={13} />
        <span className="hidden sm:inline">Twitter/X</span>
      </button>

      {/* Native Device Share */}
      <button
        onClick={handleNativeShare}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold p-2 rounded-xl shadow-xs transition flex items-center justify-center cursor-pointer"
        title="More Share Options"
      >
        <Share2 size={14} />
      </button>
    </div>
  );
}
