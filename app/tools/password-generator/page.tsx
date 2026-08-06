"use client";

import React, { useState, useEffect, useCallback } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { KeyRound, Copy, Check, RefreshCw, ShieldCheck, ShieldAlert, Sparkles, Sliders } from "lucide-react";

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeSimilar, setExcludeSimilar] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = useCallback(() => {
    let charset = "";
    let uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    let numberChars = "0123456789";
    let symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (excludeSimilar) {
      uppercaseChars = uppercaseChars.replace(/[O]/g, "");
      lowercaseChars = lowercaseChars.replace(/[l]/g, "");
      numberChars = numberChars.replace(/[01]/g, "");
    }

    if (includeUppercase) charset += uppercaseChars;
    if (includeLowercase) charset += lowercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSymbols) charset += symbolChars;

    if (!charset) {
      setPassword("");
      return;
    }

    let generated = "";
    const cryptoObj = window.crypto || (window as unknown as { msCrypto: Crypto }).msCrypto;
    const values = new Uint32Array(length);
    cryptoObj.getRandomValues(values);

    for (let i = 0; i < length; i++) {
      generated += charset[values[i] % charset.length];
    }

    setPassword(generated);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Password Strength Estimator
  const getStrength = () => {
    if (!password) return { label: "Weak", color: "bg-rose-500", text: "text-rose-600", percent: 10 };
    let score = 0;
    if (password.length >= 12) score += 2;
    if (password.length >= 16) score += 2;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 2;

    if (score <= 3) return { label: "Weak", color: "bg-rose-500", text: "text-rose-600", percent: 25 };
    if (score <= 5) return { label: "Moderate", color: "bg-amber-500", text: "text-amber-600", percent: 55 };
    if (score <= 7) return { label: "Strong", color: "bg-emerald-500", text: "text-emerald-600", percent: 80 };
    return { label: "Very Strong", color: "bg-blue-600", text: "text-[#2874f0]", percent: 100 };
  };

  const strength = getStrength();

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <KeyRound size={13} /> Secure Password Studio
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Strong Password Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Generate ultra-secure, cryptographically random passwords to protect your accounts and databases.
          </p>
        </div>

        {/* Display Banner */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:flex-1 bg-slate-100 border-2 border-slate-300 rounded-xl p-4 flex items-center justify-between overflow-x-auto">
              <span className="font-mono text-lg sm:text-2xl font-black text-slate-950 tracking-wider break-all select-all">
                {password || "Select character options below"}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={generatePassword}
                className="flex-1 sm:flex-initial bg-slate-100 hover:bg-slate-200 text-slate-900 font-black text-xs px-4 py-4 rounded-xl border-2 border-slate-300 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                title="Regenerate"
              >
                <RefreshCw size={16} />
              </button>

              <button
                onClick={handleCopy}
                disabled={!password}
                className="flex-1 sm:flex-initial bg-[#2874f0] hover:bg-blue-600 text-white font-black text-xs px-6 py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-2xs cursor-pointer uppercase tracking-wider disabled:opacity-50"
              >
                {copied ? <Check size={16} className="text-white" /> : <Copy size={16} />}
                <span>{copied ? "Copied!" : "Copy Password"}</span>
              </button>
            </div>
          </div>

          {/* Strength Meter */}
          <div className="space-y-1.5 pt-2 border-t-2 border-slate-100">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-slate-800 uppercase tracking-wider">Password Strength:</span>
              <span className={`${strength.text} uppercase tracking-wider font-black`}>{strength.label}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden p-0.5 border border-slate-300">
              <div
                className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                style={{ width: `${strength.percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Options Customizer */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-black text-slate-950 uppercase tracking-wider border-b-2 border-slate-100 pb-3">
            <Sliders size={16} className="text-[#2874f0]" /> Customize Password Settings
          </div>

          {/* Length Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-slate-950 uppercase tracking-wider">Password Length</span>
              <span className="bg-blue-100 text-[#2874f0] border border-blue-300 px-3 py-1 rounded-full text-sm font-black">
                {length} Characters
              </span>
            </div>
            <input
              type="range"
              min={6}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2874f0]"
            />
          </div>

          {/* Checkboxes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4 accent-[#2874f0] rounded cursor-pointer"
              />
              <div>
                <span className="text-xs font-black text-slate-950 block">Include Uppercase (A-Z)</span>
                <span className="text-[11px] text-slate-700 font-extrabold">ABCDEF...</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4 accent-[#2874f0] rounded cursor-pointer"
              />
              <div>
                <span className="text-xs font-black text-slate-950 block">Include Lowercase (a-z)</span>
                <span className="text-[11px] text-slate-700 font-extrabold">abcdef...</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 accent-[#2874f0] rounded cursor-pointer"
              />
              <div>
                <span className="text-xs font-black text-slate-950 block">Include Numbers (0-9)</span>
                <span className="text-[11px] text-slate-700 font-extrabold">0123456789</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 accent-[#2874f0] rounded cursor-pointer"
              />
              <div>
                <span className="text-xs font-black text-slate-950 block">Include Symbols (!@#$)</span>
                <span className="text-[11px] text-slate-700 font-extrabold">!@#$%^&*()_+-=</span>
              </div>
            </label>

            <label className="sm:col-span-2 flex items-center gap-3 p-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={excludeSimilar}
                onChange={(e) => setExcludeSimilar(e.target.checked)}
                className="w-4 h-4 accent-[#2874f0] rounded cursor-pointer"
              />
              <div>
                <span className="text-xs font-black text-slate-950 block">Exclude Similar Characters</span>
                <span className="text-[11px] text-slate-700 font-extrabold">Removes confusing characters like 0, O, l, 1</span>
              </div>
            </label>
          </div>
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
