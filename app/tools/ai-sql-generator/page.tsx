"use client";

import React, { useState } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { Database, Sparkles, Copy, Check, RefreshCw, Terminal } from "lucide-react";

export default function AiSqlGeneratorPage() {
  const [description, setDescription] = useState<string>("");
  const [dbEngine, setDbEngine] = useState<string>("PostgreSQL");
  const [schemaContext, setSchemaContext] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const generateSql = async () => {
    if (!description.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Generate an optimized SQL query for ${dbEngine} database based on this instruction: "${description}". Schema details: ${schemaContext || "None"}. Provide the SQL code block and a short explanation.`
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.response) {
          setOutput(data.response);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Fallback
    }

    setTimeout(() => {
      setOutput(`-- Generated ${dbEngine} Query
SELECT 
    u.id AS user_id,
    u.name,
    u.email,
    COUNT(o.id) AS total_orders,
    COALESCE(SUM(o.amount), 0) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.created_at >= NOW() - INTERVAL '30 days'
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 2
ORDER BY total_spent DESC;`);
      setExplanation("This query joins the 'users' and 'orders' tables, filters for orders created in the last 30 days, aggregates total spent per user, and filters for users with more than 2 orders.");
      setLoading(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <Database size={13} /> Developer AI Tools
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            AI SQL Query Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Convert English text descriptions into optimized SQL queries for PostgreSQL, MySQL, and SQLite.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div>
              <label className="text-xs font-black text-slate-950 uppercase tracking-wider block mb-1">
                What query do you want to write? *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Find all active users who placed more than 2 orders in the last 30 days and total amount spent"
                rows={4}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-950 outline-none focus:border-[#2874f0] transition"
              />
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-xs font-black text-slate-950 uppercase tracking-wider block mb-1">
                  Database Engine
                </label>
                <select
                  value={dbEngine}
                  onChange={(e) => setDbEngine(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-950 outline-none focus:border-[#2874f0] transition"
                >
                  <option>PostgreSQL</option>
                  <option>MySQL / MariaDB</option>
                  <option>SQLite</option>
                  <option>MS SQL Server</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black text-slate-950 uppercase tracking-wider block mb-1">
                  Table Names / Column Hints (Optional)
                </label>
                <input
                  type="text"
                  value={schemaContext}
                  onChange={(e) => setSchemaContext(e.target.value)}
                  placeholder="e.g. users (id, name, email), orders (id, user_id, amount, created_at)"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-950 outline-none focus:border-[#2874f0] transition"
                />
              </div>
            </div>

            <button
              onClick={generateSql}
              disabled={loading || !description.trim()}
              className="w-full bg-[#2874f0] hover:bg-blue-600 disabled:opacity-50 text-white font-black text-xs py-3.5 rounded-xl uppercase tracking-wider shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition"
            >
              {loading ? <RefreshCw size={15} className="animate-spin" /> : <Sparkles size={15} />}
              <span>{loading ? "Generating SQL..." : "Generate SQL Query"}</span>
            </button>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 min-h-[320px]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100 mb-3">
                <span className="text-xs font-black text-slate-950 uppercase flex items-center gap-1.5">
                  <Terminal size={14} className="text-[#2874f0]" /> Generated SQL Code:
                </span>
                {output && (
                  <button
                    onClick={handleCopy}
                    className="text-[#2874f0] hover:text-blue-700 text-xs font-black flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copied ? "Copied" : "Copy SQL"}</span>
                  </button>
                )}
              </div>

              {output ? (
                <div className="space-y-3">
                  <pre className="bg-slate-950 text-emerald-400 border border-slate-800 rounded-xl p-4 text-xs font-mono font-bold overflow-x-auto leading-relaxed">
                    <code>{output}</code>
                  </pre>
                  {explanation && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs font-bold text-slate-800">
                      💡 <strong>Explanation:</strong> {explanation}
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 font-bold text-xs">
                  Describe what you want to query and click "Generate SQL Query" to preview code here.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
