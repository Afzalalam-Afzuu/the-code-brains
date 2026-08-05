"use client";

import React, { useState, useMemo } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { Database, Copy, Check, Download, Sparkles, RefreshCw, Layers, Users, ShoppingBag, BookOpen } from "lucide-react";

export default function DummyJsonGeneratorPage() {
  const [datasetType, setDatasetType] = useState<"users" | "products" | "blogs">("users");
  const [count, setCount] = useState<number>(5);
  const [copied, setCopied] = useState<boolean>(false);

  const sampleNames = ["Dev Kapoor", "Aarav Sharma", "Priya Patel", "Rohan Verma", "Ananya Singh", "Siddharth Rao", "Neha Gupta", "Vikram Malhotra"];
  const sampleRoles = ["Frontend Developer", "Product Manager", "UI/UX Designer", "DevOps Engineer", "Data Scientist"];
  const sampleCities = ["Mumbai", "Bengaluru", "Delhi", "Hyderabad", "Pune", "Chennai", "Kolkata"];

  const sampleProducts = ["Wireless ANC Headphones", "Ultra-Slim Laptop 15", "OLED Smart TV 55", "Mechanical Gaming Keyboard", "Smartwatch Series X", "Portable Bluetooth Speaker"];
  const sampleCategories = ["Audio", "Computing", "Smart Home", "Gaming", "Wearables"];

  const dummyData = useMemo(() => {
    if (datasetType === "users") {
      return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: sampleNames[i % sampleNames.length],
        email: `${sampleNames[i % sampleNames.length].toLowerCase().replace(/\s+/g, ".")}@example.com`,
        phone: `+91 98765 ${10000 + i}`,
        role: sampleRoles[i % sampleRoles.length],
        city: sampleCities[i % sampleCities.length],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user_${i + 1}`,
      }));
    }

    if (datasetType === "products") {
      return Array.from({ length: count }, (_, i) => ({
        id: i + 101,
        title: sampleProducts[i % sampleProducts.length],
        price: 1999 + i * 850,
        oldPrice: 2999 + i * 1100,
        rating: +(4.2 + (i % 8) * 0.1).toFixed(1),
        category: sampleCategories[i % sampleCategories.length],
        inStock: i % 2 === 0,
        merchant: i % 2 === 0 ? "Amazon" : "Flipkart",
        image: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80`,
      }));
    }

    // Blogs
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      title: `Top Tech Trends & Buying Advice #${i + 1}`,
      slug: `top-tech-trends-buying-advice-${i + 1}`,
      author: sampleNames[i % sampleNames.length],
      category: sampleCategories[i % sampleCategories.length],
      readTime: `${4 + (i % 5)} Min Read`,
      excerpt: "In-depth testing and lab reviews to help you find the best value tech products in India.",
      publishedAt: new Date(2026, 7, 1 + i).toISOString().split("T")[0],
    }));
  }, [datasetType, count]);

  const jsonString = JSON.stringify(dummyData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dummy-${datasetType}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <ToolsNavbar />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
            <Database size={12} /> Mock Data Studio
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Dummy JSON Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-medium">
            Generate realistic mock JSON datasets for frontend prototyping, API testing, and database seeders in 1-click.
          </p>
        </div>

        {/* Controls Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Schema Type */}
            <div>
              <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2">
                Select Dataset Schema:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setDatasetType("users")}
                  className={`p-3 rounded-2xl border text-xs font-extrabold transition flex flex-col items-center gap-1.5 cursor-pointer ${
                    datasetType === "users"
                      ? "bg-[#2874f0] border-[#2874f0] text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <Users size={18} />
                  <span>Users ({count})</span>
                </button>

                <button
                  onClick={() => setDatasetType("products")}
                  className={`p-3 rounded-2xl border text-xs font-extrabold transition flex flex-col items-center gap-1.5 cursor-pointer ${
                    datasetType === "products"
                      ? "bg-[#2874f0] border-[#2874f0] text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <ShoppingBag size={18} />
                  <span>Products ({count})</span>
                </button>

                <button
                  onClick={() => setDatasetType("blogs")}
                  className={`p-3 rounded-2xl border text-xs font-extrabold transition flex flex-col items-center gap-1.5 cursor-pointer ${
                    datasetType === "blogs"
                      ? "bg-[#2874f0] border-[#2874f0] text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <BookOpen size={18} />
                  <span>Blogs ({count})</span>
                </button>
              </div>
            </div>

            {/* Item Count */}
            <div>
              <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2">
                Generated Items Count:
              </label>
              <div className="flex items-center gap-2">
                {[5, 10, 25, 50].map((num) => (
                  <button
                    key={num}
                    onClick={() => setCount(num)}
                    className={`flex-1 py-3 rounded-2xl border text-xs font-extrabold transition cursor-pointer ${
                      count === num
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {num} Items
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-xs font-extrabold text-slate-400">
              Output: <span className="text-purple-400">{count} Records</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy Dummy JSON"}</span>
              </button>

              <button
                onClick={handleDownload}
                className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Download size={14} />
                <span>Download .JSON</span>
              </button>
            </div>
          </div>

          {/* JSON Viewer */}
          <textarea
            rows={14}
            readOnly
            value={jsonString}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-purple-300 outline-none leading-relaxed resize-none"
          />
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
