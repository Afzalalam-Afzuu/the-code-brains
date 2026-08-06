"use client";

import React, { useState, useEffect } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { Monitor, Globe, Shield, Smartphone, HardDrive, Wifi, Copy, Check, RefreshCw } from "lucide-react";

interface IpDetails {
  ip?: string;
  city?: string;
  region?: string;
  country_name?: string;
  org?: string;
  asn?: string;
}

export default function IpCheckerPage() {
  const [deviceInfo, setDeviceInfo] = useState<{
    userAgent: string;
    screenRes: string;
    availableRes: string;
    language: string;
    platform: string;
    cookiesEnabled: boolean;
    onlineStatus: boolean;
    deviceMemory?: number;
    hardwareConcurrency?: number;
  }>({
    userAgent: "",
    screenRes: "",
    availableRes: "",
    language: "",
    platform: "",
    cookiesEnabled: false,
    onlineStatus: true,
  });

  const [ipData, setIpData] = useState<IpDetails | null>(null);
  const [loadingIp, setLoadingIp] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    // Detect browser specs client-side
    if (typeof window !== "undefined") {
      setDeviceInfo({
        userAgent: navigator.userAgent,
        screenRes: `${window.screen.width} x ${window.screen.height}`,
        availableRes: `${window.screen.availWidth} x ${window.screen.availHeight}`,
        language: navigator.language,
        platform: navigator.platform,
        cookiesEnabled: navigator.cookieEnabled,
        onlineStatus: navigator.onLine,
        hardwareConcurrency: navigator.hardwareConcurrency,
      });
    }

    // Fetch IP info
    fetchIpDetails();
  }, []);

  const fetchIpDetails = async () => {
    setLoadingIp(true);
    try {
      const res = await fetch("https://ipapi.co/json/");
      if (res.ok) {
        const data = await res.json();
        setIpData(data);
      } else {
        // Fallback simple IP
        const res2 = await fetch("https://api.ipify.org?format=json");
        const data2 = await res2.json();
        setIpData({ ip: data2.ip });
      }
    } catch {
      setIpData({ ip: "Unable to detect (Adblocker active)" });
    } finally {
      setLoadingIp(false);
    }
  };

  const handleCopyUserAgent = () => {
    if (!deviceInfo.userAgent) return;
    navigator.clipboard.writeText(deviceInfo.userAgent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <Monitor size={13} /> Browser & Network Inspector
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            IP Address & Device Info Checker
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            View your public IP address, location, network ISP, operating system, and screen specifications.
          </p>
        </div>

        {/* IP Address Card */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#2874f0] text-white p-6 rounded-2xl border-2 border-blue-600 shadow-md">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-black text-blue-100 uppercase tracking-wider block">Your Public IP Address</span>
              <div className="text-3xl sm:text-5xl font-mono font-black tracking-tight">
                {loadingIp ? "Detecting IP..." : ipData?.ip || "Not Available"}
              </div>
            </div>

            <button
              onClick={fetchIpDetails}
              className="bg-white text-slate-950 hover:bg-blue-50 font-black text-xs px-4 py-3 rounded-xl border-2 border-white transition flex items-center gap-1.5 cursor-pointer uppercase tracking-wider shadow-2xs"
            >
              <RefreshCw size={14} /> Refresh IP
            </button>
          </div>

          {/* Location & ISP Grid */}
          {ipData?.city && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 space-y-0.5">
                <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider">City / Region</span>
                <p className="text-base font-black text-slate-950">{ipData.city}, {ipData.region}</p>
              </div>

              <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 space-y-0.5">
                <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider">Country</span>
                <p className="text-base font-black text-slate-950">{ipData.country_name}</p>
              </div>

              <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 space-y-0.5">
                <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider">ISP / Network</span>
                <p className="text-base font-black text-slate-950 truncate">{ipData.org || "Standard Broadband"}</p>
              </div>
            </div>
          )}
        </div>

        {/* Device Specifications Card */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-black text-slate-950 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
            <Smartphone size={18} className="text-[#2874f0]" /> Device & Browser Specifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 space-y-1">
              <span className="text-[10px] font-black text-slate-800 uppercase tracking-wider block">Screen Resolution</span>
              <p className="text-lg font-black text-slate-950">{deviceInfo.screenRes}</p>
            </div>

            <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 space-y-1">
              <span className="text-[10px] font-black text-slate-800 uppercase tracking-wider block">Operating Platform</span>
              <p className="text-lg font-black text-slate-950">{deviceInfo.platform || "Desktop"}</p>
            </div>

            <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 space-y-1">
              <span className="text-[10px] font-black text-slate-800 uppercase tracking-wider block">Primary Language</span>
              <p className="text-lg font-black text-slate-950 uppercase">{deviceInfo.language}</p>
            </div>

            <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 space-y-1">
              <span className="text-[10px] font-black text-slate-800 uppercase tracking-wider block">CPU Cores</span>
              <p className="text-lg font-black text-slate-950">{deviceInfo.hardwareConcurrency || "N/A"} Cores</p>
            </div>
          </div>

          {/* User Agent */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider">
              <span className="text-slate-950">User Agent String</span>
              <button
                onClick={handleCopyUserAgent}
                className="text-[#2874f0] hover:underline flex items-center gap-1 font-black cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy User Agent"}</span>
              </button>
            </div>
            <textarea
              rows={3}
              readOnly
              value={deviceInfo.userAgent}
              className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-3 font-mono text-xs text-slate-950 font-extrabold outline-none resize-none"
            />
          </div>
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
