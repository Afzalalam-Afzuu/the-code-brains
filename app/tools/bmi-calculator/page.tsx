"use client";

import React, { useState, useMemo } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { Activity, Heart, Scale, User, Sparkles } from "lucide-react";

export default function BmiCalculatorPage() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightKg, setWeightKg] = useState<number>(68);

  const bmiData = useMemo(() => {
    let heightM = heightCm / 100;
    if (heightM <= 0 || weightKg <= 0) return { score: 0, category: "Unknown", color: "bg-slate-500", text: "text-slate-700" };

    const score = +(weightKg / (heightM * heightM)).toFixed(1);

    let category = "Normal Weight";
    let color = "bg-emerald-500";
    let text = "text-emerald-700";

    if (score < 18.5) {
      category = "Underweight";
      color = "bg-amber-500";
      text = "text-amber-700";
    } else if (score >= 18.5 && score <= 24.9) {
      category = "Healthy Normal Weight";
      color = "bg-emerald-500";
      text = "text-emerald-700";
    } else if (score >= 25 && score <= 29.9) {
      category = "Overweight";
      color = "bg-orange-500";
      text = "text-orange-700";
    } else {
      category = "Obese";
      color = "bg-rose-600";
      text = "text-rose-700";
    }

    const minIdealKg = +(18.5 * heightM * heightM).toFixed(1);
    const maxIdealKg = +(24.9 * heightM * heightM).toFixed(1);

    return { score, category, color, text, minIdealKg, maxIdealKg };
  }, [heightCm, weightKg]);

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <Activity size={13} /> Health BMI Studio
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Body Mass Index (BMI) Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Calculate your BMI score, health category status, and ideal weight range instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Card */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            {/* Height Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-slate-950 uppercase tracking-wider">Height (cm)</span>
                <span className="text-[#2874f0] font-black text-base">{heightCm} cm ({(heightCm / 30.48).toFixed(1)} ft)</span>
              </div>
              <input
                type="range"
                min={100}
                max={230}
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2874f0]"
              />
            </div>

            {/* Weight Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-slate-950 uppercase tracking-wider">Weight (kg)</span>
                <span className="text-[#2874f0] font-black text-base">{weightKg} kg ({(weightKg * 2.20462).toFixed(1)} lbs)</span>
              </div>
              <input
                type="range"
                min={30}
                max={180}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2874f0]"
              />
            </div>
          </div>

          {/* Results Showcase Card */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
            <div className="bg-[#2874f0] text-white rounded-2xl p-6 text-center space-y-2 border-2 border-blue-600 shadow-md">
              <span className="text-xs font-black text-blue-100 uppercase tracking-widest block">
                Your Calculated BMI Score
              </span>
              <div className="text-4xl sm:text-6xl font-black tracking-tight">
                {bmiData.score}
              </div>
              <span className="inline-block bg-white text-slate-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-2xs">
                {bmiData.category}
              </span>
            </div>

            {/* Ideal Weight Indicator */}
            <div className="bg-emerald-100 border-2 border-emerald-300 rounded-xl p-4 text-center space-y-1">
              <span className="text-[10px] font-black text-emerald-950 uppercase tracking-widest block">Recommended Ideal Weight Range</span>
              <p className="text-xl font-black text-slate-950">{bmiData.minIdealKg} kg – {bmiData.maxIdealKg} kg</p>
            </div>
          </div>
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
