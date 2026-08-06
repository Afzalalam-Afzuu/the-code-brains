"use client";

import React, { useState, useMemo } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { ArrowRightLeft, Ruler, Scale, Thermometer, Gauge, Square, Droplet } from "lucide-react";

type Category = "length" | "weight" | "temperature" | "speed" | "area" | "volume";

const unitsMap: Record<Category, { name: string; ratio: number }[]> = {
  length: [
    { name: "Meter (m)", ratio: 1 },
    { name: "Kilometer (km)", ratio: 1000 },
    { name: "Centimeter (cm)", ratio: 0.01 },
    { name: "Millimeter (mm)", ratio: 0.001 },
    { name: "Mile (mi)", ratio: 1609.34 },
    { name: "Yard (yd)", ratio: 0.9144 },
    { name: "Foot (ft)", ratio: 0.3048 },
    { name: "Inch (in)", ratio: 0.0254 },
  ],
  weight: [
    { name: "Kilogram (kg)", ratio: 1 },
    { name: "Gram (g)", ratio: 0.001 },
    { name: "Milligram (mg)", ratio: 0.000001 },
    { name: "Pound (lb)", ratio: 0.453592 },
    { name: "Ounce (oz)", ratio: 0.0283495 },
    { name: "Metric Ton (t)", ratio: 1000 },
  ],
  temperature: [
    { name: "Celsius (°C)", ratio: 1 },
    { name: "Fahrenheit (°F)", ratio: 1 },
    { name: "Kelvin (K)", ratio: 1 },
  ],
  speed: [
    { name: "Meter/Second (m/s)", ratio: 1 },
    { name: "Kilometer/Hour (km/h)", ratio: 0.277778 },
    { name: "Mile/Hour (mph)", ratio: 0.44704 },
    { name: "Knot (kn)", ratio: 0.514444 },
  ],
  area: [
    { name: "Square Meter (m²)", ratio: 1 },
    { name: "Square Kilometer (km²)", ratio: 1000000 },
    { name: "Square Foot (ft²)", ratio: 0.092903 },
    { name: "Square Yard (yd²)", ratio: 0.836127 },
    { name: "Acre (ac)", ratio: 4046.86 },
    { name: "Hectare (ha)", ratio: 10000 },
  ],
  volume: [
    { name: "Liter (L)", ratio: 1 },
    { name: "Milliliter (mL)", ratio: 0.001 },
    { name: "Cubic Meter (m³)", ratio: 1000 },
    { name: "Gallon US (gal)", ratio: 3.78541 },
    { name: "Fluid Ounce (fl oz)", ratio: 0.0295735 },
  ],
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>("length");
  const [inputValue, setInputValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<number>(0);
  const [toUnit, setToUnit] = useState<number>(1);

  const convertTemperature = (val: number, fromIdx: number, toIdx: number) => {
    // 0: Celsius, 1: Fahrenheit, 2: Kelvin
    let celsius = val;
    if (fromIdx === 1) celsius = (val - 32) * (5 / 9);
    if (fromIdx === 2) celsius = val - 273.15;

    if (toIdx === 0) return celsius;
    if (toIdx === 1) return celsius * (9 / 5) + 32;
    if (toIdx === 2) return celsius + 273.15;
    return celsius;
  };

  const convertedResult = useMemo(() => {
    if (isNaN(inputValue)) return 0;
    if (category === "temperature") {
      return convertTemperature(inputValue, fromUnit, toUnit);
    }
    const fromRatio = unitsMap[category][fromUnit]?.ratio || 1;
    const toRatio = unitsMap[category][toUnit]?.ratio || 1;
    const baseValue = inputValue * fromRatio;
    return baseValue / toRatio;
  }, [category, inputValue, fromUnit, toUnit]);

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <ArrowRightLeft size={13} /> Multi-Unit Converter
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Universal Unit Converter
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Convert measurements for Length, Weight, Temperature, Speed, Area, and Volume in real-time.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            <button
              onClick={() => { setCategory("length"); setFromUnit(0); setToUnit(1); }}
              className={`py-3 px-2 rounded-xl text-xs font-black transition cursor-pointer flex flex-col items-center gap-1.5 ${
                category === "length" ? "bg-[#2874f0] text-white shadow-2xs" : "bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Ruler size={18} /> Length
            </button>

            <button
              onClick={() => { setCategory("weight"); setFromUnit(0); setToUnit(1); }}
              className={`py-3 px-2 rounded-xl text-xs font-black transition cursor-pointer flex flex-col items-center gap-1.5 ${
                category === "weight" ? "bg-[#2874f0] text-white shadow-2xs" : "bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Scale size={18} /> Weight
            </button>

            <button
              onClick={() => { setCategory("temperature"); setFromUnit(0); setToUnit(1); }}
              className={`py-3 px-2 rounded-xl text-xs font-black transition cursor-pointer flex flex-col items-center gap-1.5 ${
                category === "temperature" ? "bg-[#2874f0] text-white shadow-2xs" : "bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Thermometer size={18} /> Temperature
            </button>

            <button
              onClick={() => { setCategory("speed"); setFromUnit(0); setToUnit(1); }}
              className={`py-3 px-2 rounded-xl text-xs font-black transition cursor-pointer flex flex-col items-center gap-1.5 ${
                category === "speed" ? "bg-[#2874f0] text-white shadow-2xs" : "bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Gauge size={18} /> Speed
            </button>

            <button
              onClick={() => { setCategory("area"); setFromUnit(0); setToUnit(1); }}
              className={`py-3 px-2 rounded-xl text-xs font-black transition cursor-pointer flex flex-col items-center gap-1.5 ${
                category === "area" ? "bg-[#2874f0] text-white shadow-2xs" : "bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Square size={18} /> Area
            </button>

            <button
              onClick={() => { setCategory("volume"); setFromUnit(0); setToUnit(1); }}
              className={`py-3 px-2 rounded-xl text-xs font-black transition cursor-pointer flex flex-col items-center gap-1.5 ${
                category === "volume" ? "bg-[#2874f0] text-white shadow-2xs" : "bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Droplet size={18} /> Volume
            </button>
          </div>
        </div>

        {/* Converter Workspace Card */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* FROM Input */}
            <div className="space-y-3">
              <label className="block text-xs font-black text-slate-950 uppercase tracking-wider">
                From Value & Unit
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3.5 text-xl font-black text-slate-950 outline-none focus:bg-white focus:border-[#2874f0] focus:ring-2 focus:ring-blue-200 transition"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(Number(e.target.value))}
                className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-sm font-black text-slate-950 outline-none cursor-pointer focus:bg-white focus:border-[#2874f0]"
              >
                {unitsMap[category].map((u, i) => (
                  <option key={i} value={i}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            {/* TO Result */}
            <div className="space-y-3">
              <label className="block text-xs font-black text-[#2874f0] uppercase tracking-wider">
                Converted Output
              </label>
              <div className="w-full bg-blue-50 border-2 border-blue-300 rounded-xl px-4 py-3.5 text-xl font-black text-slate-950 truncate">
                {convertedResult.toLocaleString(undefined, { maximumFractionDigits: 6 })}
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(Number(e.target.value))}
                className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-sm font-black text-slate-950 outline-none cursor-pointer focus:bg-white focus:border-[#2874f0]"
              >
                {unitsMap[category].map((u, i) => (
                  <option key={i} value={i}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
