"use client";

import React, { useState, useMemo } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { Calendar, Clock, Sparkles, Heart, RefreshCw, Zap, Star } from "lucide-react";

export default function AgeCalculatorPage() {
  const todayStr = new Date().toISOString().split("T")[0];
  const [dob, setDob] = useState<string>("2000-01-01");
  const [targetDate, setTargetDate] = useState<string>(todayStr);

  const calculatedAge = useMemo(() => {
    if (!dob) return null;

    const birth = new Date(dob);
    const target = new Date(targetDate || todayStr);

    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth > target) {
      return null;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total metrics
    const diffMs = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    // Upcoming birthday calculation
    const nextBdayYear = target.getMonth() > birth.getMonth() ||
      (target.getMonth() === birth.getMonth() && target.getDate() > birth.getDate())
      ? target.getFullYear() + 1
      : target.getFullYear();

    const nextBday = new Date(nextBdayYear, birth.getMonth(), birth.getDate());
    const daysUntilNextBday = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const nextBdayDayOfWeek = dayNames[nextBday.getDay()];

    // Zodiac sign determination
    const month = birth.getMonth() + 1; // 1-12
    const day = birth.getDate();

    const getZodiac = (m: number, d: number) => {
      if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return { name: "Aries", symbol: "♈", element: "Fire" };
      if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return { name: "Taurus", symbol: "♉", element: "Earth" };
      if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return { name: "Gemini", symbol: "♊", element: "Air" };
      if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return { name: "Cancer", symbol: "♋", element: "Water" };
      if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return { name: "Leo", symbol: "♌", element: "Fire" };
      if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return { name: "Virgo", symbol: "♍", element: "Earth" };
      if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return { name: "Libra", symbol: "♎", element: "Air" };
      if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return { name: "Scorpio", symbol: "♏", element: "Water" };
      if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return { name: "Sagittarius", symbol: "♐", element: "Fire" };
      if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return { name: "Capricorn", symbol: "♑", element: "Earth" };
      if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return { name: "Aquarius", symbol: "♒", element: "Air" };
      return { name: "Pisces", symbol: "♓", element: "Water" };
    };

    const zodiac = getZodiac(month, day);

    return {
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysUntilNextBday,
      nextBdayDayOfWeek,
      zodiac,
    };
  }, [dob, targetDate, todayStr]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <ToolsNavbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
            <Calendar size={12} /> Age & Milestone Calculator
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Calculate Your Exact Age & Life Stats
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-medium">
            Enter your Date of Birth to discover your precise age in years, months, days, total seconds lived, upcoming birthday countdown, and zodiac sign.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-[#2874f0] transition cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2">
                Calculate Age At Date
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-[#2874f0] transition cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Results Showcase */}
        {calculatedAge ? (
          <div className="space-y-6">
            {/* Primary Highlight Banner */}
            <div className="bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 text-center space-y-3 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-1">
                <span className="text-xs font-extrabold text-indigo-300 uppercase tracking-widest">
                  Your Precise Age Is
                </span>
                <div className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-3">
                  <span>{calculatedAge.years} <span className="text-lg font-bold text-slate-400">Years</span></span>
                  <span>{calculatedAge.months} <span className="text-lg font-bold text-slate-400">Months</span></span>
                  <span>{calculatedAge.days} <span className="text-lg font-bold text-slate-400">Days</span></span>
                </div>
              </div>
            </div>

            {/* Metric Grids */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400">Total Months</span>
                <p className="text-xl font-black text-amber-400">{calculatedAge.totalMonths.toLocaleString()}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400">Total Weeks</span>
                <p className="text-xl font-black text-indigo-400">{calculatedAge.totalWeeks.toLocaleString()}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400">Total Days</span>
                <p className="text-xl font-black text-emerald-400">{calculatedAge.totalDays.toLocaleString()}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400">Total Hours</span>
                <p className="text-xl font-black text-rose-400">{calculatedAge.totalHours.toLocaleString()}</p>
              </div>
            </div>

            {/* Upcoming Birthday & Zodiac Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-extrabold text-xs">
                  <Heart size={16} /> Next Birthday Countdown
                </div>
                <div className="text-2xl font-black text-white">
                  {calculatedAge.daysUntilNextBday} <span className="text-sm font-bold text-slate-400">Days Remaining</span>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  Your next birthday falls on a <span className="text-amber-400 font-bold">{calculatedAge.nextBdayDayOfWeek}</span>.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-xs">
                  <Star size={16} /> Zodiac Astrological Sign
                </div>
                <div className="text-2xl font-black text-white flex items-center gap-2">
                  <span className="text-amber-400 text-3xl">{calculatedAge.zodiac.symbol}</span>
                  <span>{calculatedAge.zodiac.name}</span>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  Element: <span className="text-emerald-400 font-bold">{calculatedAge.zodiac.element}</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl p-8 text-center text-slate-500 font-semibold text-xs">
            Please enter a valid Date of Birth above to compute your age metrics.
          </div>
        )}
      </main>

      <ToolsFooter />
    </div>
  );
}
