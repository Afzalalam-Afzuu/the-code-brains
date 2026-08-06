"use client";

import React, { useState, useEffect } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { Palette, Copy, Check, RefreshCw, Sparkles, Sliders } from "lucide-react";

export default function ColorPalettePage() {
  const [selectedColor, setSelectedColor] = useState<string>("#2874F0");
  const [palette, setPalette] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
    const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
    const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const generateRandomPalette = () => {
    const newColors = Array.from({ length: 5 }, () => {
      return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0").toUpperCase();
    });
    setPalette(newColors);
  };

  useEffect(() => {
    generateRandomPalette();
  }, []);

  const handleCopy = (colorText: string, index: number) => {
    navigator.clipboard.writeText(colorText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <Palette size={13} /> Designer Color Studio
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Color Picker & Palette Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Pick colors, convert HEX/RGB formats, and generate 5-color harmonious palettes for modern Web & UI designs.
          </p>
        </div>

        {/* Color Picker & Format Converter */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex items-center gap-4 bg-slate-50 border-2 border-slate-300 rounded-2xl p-4">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value.toUpperCase())}
              className="w-16 h-16 rounded-xl cursor-pointer border-0 bg-transparent"
            />
            <div className="space-y-1">
              <span className="text-xs font-black text-slate-950 uppercase tracking-wider block">Selected Base Color</span>
              <p className="text-2xl font-mono font-black text-slate-950">{selectedColor}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between bg-slate-50 border-2 border-slate-200 rounded-xl p-3">
              <span className="text-xs font-black text-slate-800 uppercase">HEX Code</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-black text-slate-950">{selectedColor}</span>
                <button
                  onClick={() => handleCopy(selectedColor, 100)}
                  className="bg-white border border-slate-300 text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                >
                  {copiedIndex === 100 ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between bg-slate-50 border-2 border-slate-200 rounded-xl p-3">
              <span className="text-xs font-black text-slate-800 uppercase">RGB Code</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-black text-slate-950">{hexToRgb(selectedColor)}</span>
                <button
                  onClick={() => handleCopy(hexToRgb(selectedColor), 101)}
                  className="bg-white border border-slate-300 text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                >
                  {copiedIndex === 101 ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Color Random Palette Generator */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
            <div className="space-y-0.5">
              <h2 className="text-lg font-black text-slate-950">Harmonious Color Palette</h2>
              <p className="text-xs text-slate-800 font-extrabold">Generate random complementary color schemes.</p>
            </div>
            <button
              onClick={generateRandomPalette}
              className="bg-[#2874f0] hover:bg-blue-600 text-white font-black text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-2xs cursor-pointer uppercase tracking-wider"
            >
              <RefreshCw size={14} /> Generate New Palette
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {palette.map((c, i) => (
              <div
                key={i}
                className="bg-slate-50 border-2 border-slate-200 rounded-2xl overflow-hidden shadow-xs space-y-3 p-3 flex flex-col justify-between"
              >
                <div
                  className="w-full h-32 rounded-xl shadow-inner border border-slate-300"
                  style={{ backgroundColor: c }}
                />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-slate-950">{c}</span>
                  <button
                    onClick={() => handleCopy(c, i)}
                    className="bg-white border border-slate-300 text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                  >
                    {copiedIndex === i ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
