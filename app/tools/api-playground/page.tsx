"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import {
  Play,
  Code2,
  Copy,
  Check,
  Search,
  Plus,
  Trash2,
  Globe,
  Lock,
  Layers,
  Sparkles,
  RefreshCw,
  Terminal,
  Send,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Clock,
  Database,
  ExternalLink,
} from "lucide-react";

interface HeaderPair {
  key: string;
  value: string;
  enabled: boolean;
}

interface ParamPair {
  key: string;
  value: string;
  enabled: boolean;
}

interface EndpointDefinition {
  id: string;
  category: string;
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  description: string;
  headers: HeaderPair[];
  params: ParamPair[];
  body?: string;
}

const PRESET_ENDPOINTS: EndpointDefinition[] = [
  {
    id: "coursera-institution",
    category: "Education APIs",
    name: "getInstitution",
    method: "GET",
    url: "https://collection-for-coursera-courses.p.rapidapi.com/rapidapi/coursera/get_institution.php",
    description: "Fetch university metadata, accreditation, and course catalogs from Coursera API.",
    headers: [
      { key: "x-rapidapi-key", value: "43702090b2mshfeb45ede034cd37p196cfejsn1962fe470eb6", enabled: true },
      { key: "x-rapidapi-host", value: "collection-for-coursera-courses.p.rapidapi.com", enabled: true },
      { key: "Content-Type", value: "application/json", enabled: true },
    ],
    params: [
      { key: "institution_id", value: "stanford-university", enabled: true },
      { key: "limit", value: "10", enabled: true },
    ],
  },
  {
    id: "coursera-courses",
    category: "Education APIs",
    name: "getCourse",
    method: "GET",
    url: "https://collection-for-coursera-courses.p.rapidapi.com/rapidapi/coursera/get_course.php",
    description: "Search Coursera courses by category, rating, and instructor credentials.",
    headers: [
      { key: "x-rapidapi-key", value: "43702090b2mshfeb45ede034cd37p196cfejsn1962fe470eb6", enabled: true },
      { key: "x-rapidapi-host", value: "collection-for-coursera-courses.p.rapidapi.com", enabled: true },
    ],
    params: [
      { key: "query", value: "machine-learning", enabled: true },
    ],
  },
  {
    id: "dummy-json-products",
    category: "E-Commerce APIs",
    name: "getProducts",
    method: "GET",
    url: "https://dummyjson.com/products",
    description: "Retrieve sample e-commerce product listings with prices, ratings, and stock status.",
    headers: [
      { key: "Content-Type", value: "application/json", enabled: true },
    ],
    params: [
      { key: "limit", value: "5", enabled: true },
    ],
  },
  {
    id: "dummy-json-add",
    category: "E-Commerce APIs",
    name: "addProduct",
    method: "POST",
    url: "https://dummyjson.com/products/add",
    description: "Simulate adding a new product item to inventory database.",
    headers: [
      { key: "Content-Type", value: "application/json", enabled: true },
    ],
    params: [],
    body: JSON.stringify({ title: "Wireless Noise Cancelling Headphones", price: 149.99, category: "audio" }, null, 2),
  },
  {
    id: "nasa-asteroid",
    category: "Space Science APIs",
    name: "getAsteroids",
    method: "GET",
    url: "https://api.nasa.gov/neo/rest/v1/feed/today",
    description: "Real-time Near-Earth Asteroid Radar feed from NASA JPL Horizons database.",
    headers: [],
    params: [
      { key: "detailed", value: "false", enabled: true },
      { key: "api_key", value: "DEMO_KEY", enabled: true },
    ],
  },
];

export default function ApiPlaygroundPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointDefinition>(PRESET_ENDPOINTS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "DELETE">(PRESET_ENDPOINTS[0].method);
  const [url, setUrl] = useState(PRESET_ENDPOINTS[0].url);
  const [headers, setHeaders] = useState<HeaderPair[]>(PRESET_ENDPOINTS[0].headers);
  const [params, setParams] = useState<ParamPair[]>(PRESET_ENDPOINTS[0].params);
  const [body, setBody] = useState(PRESET_ENDPOINTS[0].body || "");
  
  const [activeCenterTab, setActiveCenterTab] = useState<"params" | "headers" | "body" | "auth">("params");
  const [activeRightTab, setActiveRightTab] = useState<"code" | "results">("code");
  const [codeTarget, setCodeTarget] = useState<"javascript" | "xhr" | "python" | "curl" | "axios">("javascript");
  
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [responseSize, setResponseSize] = useState<string | null>(null);
  const [responseBody, setResponseBody] = useState<string | null>(null);
  const [responseError, setResponseError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // When selected endpoint changes, reset state
  const handleSelectEndpoint = (ep: EndpointDefinition) => {
    setSelectedEndpoint(ep);
    setMethod(ep.method);
    setUrl(ep.url);
    setHeaders([...ep.headers]);
    setParams([...ep.params]);
    setBody(ep.body || "");
    setResponseStatus(null);
    setResponseBody(null);
    setResponseError(null);
  };

  // Build full query string URL
  const getFullUrl = () => {
    try {
      const activeParams = params.filter((p) => p.enabled && p.key.trim());
      if (activeParams.length === 0) return url;
      const urlObj = new URL(url);
      activeParams.forEach((p) => urlObj.searchParams.append(p.key, p.value));
      return urlObj.toString();
    } catch {
      return url;
    }
  };

  // Add Header / Param row
  const addHeaderRow = () => setHeaders([...headers, { key: "", value: "", enabled: true }]);
  const removeHeaderRow = (idx: number) => setHeaders(headers.filter((_, i) => i !== idx));

  const addParamRow = () => setParams([...params, { key: "", value: "", enabled: true }]);
  const removeParamRow = (idx: number) => setParams(params.filter((_, i) => i !== idx));

  // Generate Code Snippets dynamically
  const generateSnippet = () => {
    const fullUrl = getFullUrl();
    const activeHeaders = headers.filter((h) => h.enabled && h.key.trim());

    if (codeTarget === "javascript") {
      const headerObj: Record<string, string> = {};
      activeHeaders.forEach((h) => (headerObj[h.key] = h.value));
      return `// JavaScript fetch API
const options = {
  method: '${method}',
  headers: ${JSON.stringify(headerObj, null, 4)}${method !== "GET" && body ? `,\n  body: JSON.stringify(${body})` : ""}
};

fetch('${fullUrl}', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));`;
    }

    if (codeTarget === "xhr") {
      const headerLines = activeHeaders
        .map((h) => `xhr.setRequestHeader('${h.key}', '${h.value}');`)
        .join("\n");
      return `// JavaScript XMLHttpRequest
const data = ${method !== "GET" && body ? JSON.stringify(body) : "null"};

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open('${method}', '${fullUrl}');
${headerLines}

xhr.send(data);`;
    }

    if (codeTarget === "python") {
      const headerObj: Record<string, string> = {};
      activeHeaders.forEach((h) => (headerObj[h.key] = h.value));
      return `# Python requests library
import requests

url = "${fullUrl}"
headers = ${JSON.stringify(headerObj, null, 4)}

response = requests.request("${method}", url, headers=headers${method !== "GET" && body ? `, data='''${body}'''` : ""})

print(response.json())`;
    }

    if (codeTarget === "curl") {
      const headerFlags = activeHeaders.map((h) => `-H "${h.key}: ${h.value}"`).join(" \\\n  ");
      return `curl -X ${method} "${fullUrl}" ${headerFlags ? "\\\n  " + headerFlags : ""}${
        method !== "GET" && body ? ` \\\n  -d '${body}'` : ""
      }`;
    }

    if (codeTarget === "axios") {
      const headerObj: Record<string, string> = {};
      activeHeaders.forEach((h) => (headerObj[h.key] = h.value));
      return `import axios from 'axios';

const options = {
  method: '${method}',
  url: '${fullUrl}',
  headers: ${JSON.stringify(headerObj, null, 4)}${method !== "GET" && body ? `,\n  data: ${body}` : ""}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});`;
    }

    return "";
  };

  // Test Endpoint Execution
  const handleTestEndpoint = async () => {
    setIsLoading(true);
    setResponseStatus(null);
    setResponseBody(null);
    setResponseError(null);
    setActiveRightTab("results");

    const startTime = performance.now();

    try {
      const targetUrl = getFullUrl();
      const reqHeaders: Record<string, string> = {};
      headers
        .filter((h) => h.enabled && h.key.trim())
        .forEach((h) => (reqHeaders[h.key] = h.value));

      const options: RequestInit = {
        method,
        headers: reqHeaders,
      };

      if (method !== "GET" && body) {
        options.body = body;
      }

      const res = await fetch(targetUrl, options);
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      setResponseStatus(res.status);

      const resText = await res.text();
      setResponseSize(`${(new Blob([resText]).size / 1024).toFixed(2)} KB`);

      try {
        const jsonParsed = JSON.parse(resText);
        setResponseBody(JSON.stringify(jsonParsed, null, 2));
      } catch {
        setResponseBody(resText);
      }
    } catch (err: any) {
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      setResponseStatus(500);
      setResponseError(err.message || "Network Error / CORS Restriction. Check URL and headers.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const filteredEndpoints = PRESET_ENDPOINTS.filter(
    (ep) =>
      ep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <ToolsNavbar />

      {/* Main Top Breadcrumb & Action Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Breadcrumb Path */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 overflow-x-auto scrollbar-none">
          <Link href="/tools" className="hover:text-indigo-400 transition">Tools</Link>
          <span>/</span>
          <span className="text-slate-300">API Marketplace</span>
          <span>/</span>
          <span className="text-slate-300">{selectedEndpoint.category}</span>
          <span>/</span>
          <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
            <Layers size={11} /> {selectedEndpoint.name}
          </span>
        </div>

        {/* Primary Action Test Button */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs text-slate-400 font-mono">
            Method: <strong className="text-emerald-400">{method}</strong>
          </span>
          <button
            onClick={handleTestEndpoint}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer active:scale-95"
          >
            {isLoading ? (
              <RefreshCw size={15} className="animate-spin text-white" />
            ) : (
              <Send size={15} className="fill-white" />
            )}
            <span>{isLoading ? "Testing Endpoint..." : "Test Endpoint"}</span>
          </button>
        </div>
      </div>

      {/* Workspace 3-Column Layout */}
      <div className="flex-1 flex flex-col lg:flex-row min-w-0">
        
        {/* Left Column: API Discovery & Endpoints Menu */}
        <aside className="w-full lg:w-72 bg-slate-950 border-r border-slate-800 p-4 space-y-4 shrink-0">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Globe size={15} className="text-blue-400" /> API Endpoints
            </h2>
            <span className="bg-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded-md font-bold">
              {filteredEndpoints.length} APIs
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Endpoints..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
            />
          </div>

          {/* Endpoints List */}
          <div className="space-y-3 max-h-[60vh] lg:max-h-[calc(100vh-14rem)] overflow-y-auto scrollbar-thin">
            {filteredEndpoints.map((ep) => {
              const isSelected = ep.id === selectedEndpoint.id;
              let methodColor = "bg-blue-500/20 text-blue-400 border-blue-500/40";
              if (ep.method === "POST") methodColor = "bg-emerald-500/20 text-emerald-400 border-emerald-500/40";
              if (ep.method === "PUT") methodColor = "bg-amber-500/20 text-amber-400 border-amber-500/40";
              if (ep.method === "DELETE") methodColor = "bg-rose-500/20 text-rose-400 border-rose-500/40";

              return (
                <button
                  key={ep.id}
                  onClick={() => handleSelectEndpoint(ep)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-2 ${
                    isSelected
                      ? "bg-slate-900 border-blue-500/60 ring-1 ring-blue-500/20 shadow-md"
                      : "bg-slate-950 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700"
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase ${methodColor}`}>
                        {ep.method}
                      </span>
                      <span className="text-xs font-bold text-white truncate">{ep.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{ep.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Center Column: Request Configuration & Key Inputs */}
        <section className="flex-1 border-r border-slate-800 p-4 sm:p-6 space-y-6 overflow-y-auto">
          {/* Method & URL Input Bar */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Request Method & Endpoint URL
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
                className="bg-slate-900 text-white font-mono text-xs font-bold px-4 py-3 rounded-xl border border-slate-800 focus:border-blue-500 outline-none cursor-pointer"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>

              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/endpoint"
                className="flex-1 bg-slate-900 text-emerald-300 font-mono text-xs p-3 rounded-xl border border-slate-800 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Config Tabs: Params / Headers / Body / Auth */}
          <div className="space-y-4">
            <div className="flex items-center border-b border-slate-800 gap-2 text-xs font-mono font-bold">
              <button
                onClick={() => setActiveCenterTab("params")}
                className={`pb-2 px-3 border-b-2 transition ${
                  activeCenterTab === "params"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Params ({params.filter((p) => p.enabled).length})
              </button>
              <button
                onClick={() => setActiveCenterTab("headers")}
                className={`pb-2 px-3 border-b-2 transition ${
                  activeCenterTab === "headers"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Headers ({headers.filter((h) => h.enabled).length})
              </button>
              {(method === "POST" || method === "PUT") && (
                <button
                  onClick={() => setActiveCenterTab("body")}
                  className={`pb-2 px-3 border-b-2 transition ${
                    activeCenterTab === "body"
                      ? "border-blue-500 text-blue-400"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Body (JSON)
                </button>
              )}
              <button
                onClick={() => setActiveCenterTab("auth")}
                className={`pb-2 px-3 border-b-2 transition ${
                  activeCenterTab === "auth"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Authorizations
              </button>
            </div>

            {/* Params Table */}
            {activeCenterTab === "params" && (
              <div className="space-y-3">
                <div className="space-y-2">
                  {params.map((param, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={param.enabled}
                        onChange={(e) => {
                          const copy = [...params];
                          copy[idx].enabled = e.target.checked;
                          setParams(copy);
                        }}
                        className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        placeholder="Parameter Key"
                        value={param.key}
                        onChange={(e) => {
                          const copy = [...params];
                          copy[idx].key = e.target.value;
                          setParams(copy);
                        }}
                        className="w-1/2 bg-slate-900 text-slate-200 font-mono text-xs p-2.5 rounded-lg border border-slate-800 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={param.value}
                        onChange={(e) => {
                          const copy = [...params];
                          copy[idx].value = e.target.value;
                          setParams(copy);
                        }}
                        className="w-1/2 bg-slate-900 text-emerald-300 font-mono text-xs p-2.5 rounded-lg border border-slate-800 outline-none"
                      />
                      <button
                        onClick={() => removeParamRow(idx)}
                        className="p-2 text-slate-500 hover:text-rose-400 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addParamRow}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold px-3 py-2 rounded-lg border border-slate-800 flex items-center gap-1.5"
                >
                  <Plus size={14} /> Add Parameter Row
                </button>
              </div>
            )}

            {/* Headers Table */}
            {activeCenterTab === "headers" && (
              <div className="space-y-3">
                <div className="space-y-2">
                  {headers.map((hdr, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={hdr.enabled}
                        onChange={(e) => {
                          const copy = [...headers];
                          copy[idx].enabled = e.target.checked;
                          setHeaders(copy);
                        }}
                        className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        placeholder="Header Key (e.g. x-rapidapi-key)"
                        value={hdr.key}
                        onChange={(e) => {
                          const copy = [...headers];
                          copy[idx].key = e.target.value;
                          setHeaders(copy);
                        }}
                        className="w-1/2 bg-slate-900 text-slate-200 font-mono text-xs p-2.5 rounded-lg border border-slate-800 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Header Value"
                        value={hdr.value}
                        onChange={(e) => {
                          const copy = [...headers];
                          copy[idx].value = e.target.value;
                          setHeaders(copy);
                        }}
                        className="w-1/2 bg-slate-900 text-emerald-300 font-mono text-xs p-2.5 rounded-lg border border-slate-800 outline-none"
                      />
                      <button
                        onClick={() => removeHeaderRow(idx)}
                        className="p-2 text-slate-500 hover:text-rose-400 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={addHeaderRow}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold px-3 py-2 rounded-lg border border-slate-800 flex items-center gap-1.5"
                >
                  <Plus size={14} /> Add Header Row
                </button>
              </div>
            )}

            {/* Body Textarea */}
            {activeCenterTab === "body" && (
              <div className="space-y-2">
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder='{ "key": "value" }'
                  rows={8}
                  className="w-full bg-slate-900 text-emerald-300 font-mono text-xs p-4 rounded-xl border border-slate-800 outline-none leading-relaxed"
                />
              </div>
            )}

            {/* Authorizations */}
            {activeCenterTab === "auth" && (
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Lock size={14} /> API Key & RapidAPI Credentials Header
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Headers like <code>x-rapidapi-key</code> or <code>Authorization: Bearer &lt;token&gt;</code> can be edited directly under the <strong>Headers</strong> tab for maximum flexibility.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Right Column: Dynamic Code Snippets & Response Viewer */}
        <section className="w-full lg:w-96 bg-slate-950 p-4 sm:p-6 space-y-4 shrink-0 flex flex-col">
          {/* Top Tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold">
              <button
                onClick={() => setActiveRightTab("code")}
                className={`pb-2 px-2 border-b-2 transition ${
                  activeRightTab === "code"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Code Snippets
              </button>
              <button
                onClick={() => setActiveRightTab("results")}
                className={`pb-2 px-2 border-b-2 transition ${
                  activeRightTab === "results"
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Live Results {responseStatus && `(${responseStatus})`}
              </button>
            </div>

            {activeRightTab === "code" && (
              <button
                onClick={handleCopyCode}
                className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1"
              >
                {copiedCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copiedCode ? "Copied" : "Copy"}</span>
              </button>
            )}
          </div>

          {/* Code Snippets Panel */}
          {activeRightTab === "code" && (
            <div className="flex-1 space-y-3 flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-slate-400">Target Language:</span>
                <select
                  value={codeTarget}
                  onChange={(e) => setCodeTarget(e.target.value as any)}
                  className="bg-slate-900 text-slate-200 text-xs font-mono font-bold px-2.5 py-1 rounded-lg border border-slate-800 outline-none cursor-pointer"
                >
                  <option value="javascript">JavaScript (fetch)</option>
                  <option value="xhr">JavaScript (XHR)</option>
                  <option value="python">Python (requests)</option>
                  <option value="axios">Node.js (Axios)</option>
                  <option value="curl">cURL</option>
                </select>
              </div>

              <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-4 overflow-x-auto font-mono text-xs text-sky-300">
                <pre className="whitespace-pre">{generateSnippet()}</pre>
              </div>
            </div>
          )}

          {/* Live Results Panel */}
          {activeRightTab === "results" && (
            <div className="flex-1 space-y-3 flex flex-col min-h-[300px]">
              {/* Response Status Metrics */}
              {responseStatus !== null && (
                <div className="flex items-center justify-between text-xs font-mono p-3 bg-slate-900 border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Status:</span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded ${
                        responseStatus >= 200 && responseStatus < 300
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                      }`}
                    >
                      {responseStatus} {responseStatus === 200 ? "OK" : ""}
                    </span>
                  </div>

                  {responseTime && (
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock size={12} className="text-amber-400" /> {responseTime} ms
                    </span>
                  )}

                  {responseSize && (
                    <span className="text-slate-400">{responseSize}</span>
                  )}
                </div>
              )}

              {/* Response Body Output */}
              <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-4 overflow-auto font-mono text-xs">
                {isLoading ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2 py-12">
                    <RefreshCw size={24} className="animate-spin text-blue-400" />
                    <span>Executing Request...</span>
                  </div>
                ) : responseError ? (
                  <div className="text-rose-400 space-y-2">
                    <div className="flex items-center gap-2 font-bold">
                      <AlertCircle size={16} /> Error Executing Request
                    </div>
                    <p className="text-xs leading-relaxed">{responseError}</p>
                  </div>
                ) : responseBody ? (
                  <pre className="text-emerald-300 whitespace-pre-wrap">{responseBody}</pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2 py-12 text-center">
                    <Terminal size={24} />
                    <p className="text-xs">Click "Test Endpoint" above to execute API call and view real-time JSON response</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      <ToolsFooter />
    </div>
  );
}
