"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { QrCode, Download, Copy, Check, Sparkles, RefreshCw, Layers, Link as LinkIcon, Wifi, Phone } from "lucide-react";

export default function QrGeneratorPage() {
  const [text, setText] = useState<string>("https://thecodebrains.com");
  const [darkColor, setDarkColor] = useState<string>("#000000");
  const [lightColor, setLightColor] = useState<string>("#ffffff");
  const [qrSize, setQrSize] = useState<number>(300);
  const [copied, setCopied] = useState<boolean>(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!text) {
      setQrDataUrl("");
      return;
    }

    QRCode.toDataURL(
      text,
      {
        width: qrSize,
        margin: 2,
        color: {
          dark: darkColor,
          light: lightColor,
        },
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        }
      }
    );
  }, [text, darkColor, lightColor, qrSize]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "thecodebrains-qrcode.png";
    a.click();
  };

  const handlePreset = (type: string) => {
    if (type === "url") setText("https://thecodebrains.com");
    if (type === "wifi") setText("WIFI:T:WPA;S:MyHomeWiFi;P:SecretPassword123;;");
    if (type === "whatsapp") setText("https://wa.me/919876543210?text=Hello%20TheCodeBrains");
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <QrCode size={13} /> HD QR Code Studio
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Create & Download Custom QR Codes
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Generate high-resolution QR codes for websites, Wi-Fi networks, WhatsApp links, and text. Customize colors and download in PNG format instantly.
          </p>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            {/* Quick Presets */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-950 uppercase tracking-wider">
                Quick Presets
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handlePreset("url")}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-black px-3 py-1.5 rounded-xl border-2 border-slate-300 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <LinkIcon size={13} /> Website URL
                </button>
                <button
                  onClick={() => handlePreset("wifi")}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-black px-3 py-1.5 rounded-xl border-2 border-slate-300 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Wifi size={13} /> Wi-Fi Network
                </button>
                <button
                  onClick={() => handlePreset("whatsapp")}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-black px-3 py-1.5 rounded-xl border-2 border-slate-300 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Phone size={13} /> WhatsApp Link
                </button>
              </div>
            </div>

            {/* Input Text */}
            <div>
              <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-2">
                QR Code Content (URL or Text)
              </label>
              <textarea
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your URL, text message, or contact details..."
                className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl p-3.5 text-xs sm:text-sm font-bold text-slate-950 outline-none focus:bg-white focus:border-[#2874f0] focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>

            {/* Color Customization */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-1.5">
                  Foreground Color
                </label>
                <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-300 rounded-xl p-2">
                  <input
                    type="color"
                    value={darkColor}
                    onChange={(e) => setDarkColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono font-black text-slate-950">{darkColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-1.5">
                  Background Color
                </label>
                <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-300 rounded-xl p-2">
                  <input
                    type="color"
                    value={lightColor}
                    onChange={(e) => setLightColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono font-black text-slate-950">{lightColor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Preview & Download Panel */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-between space-y-6">
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest">
              Live Preview
            </span>

            {/* QR Code Container */}
            <div className="p-6 bg-slate-100 rounded-2xl border-2 border-slate-300 shadow-inner flex items-center justify-center min-h-[260px] w-full max-w-[280px]">
              {qrDataUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={qrDataUrl} alt="Generated QR Code" className="w-56 h-56 rounded-xl object-contain shadow-xs" />
              ) : (
                <p className="text-xs text-slate-600 font-extrabold">Enter text above to render QR code.</p>
              )}
            </div>

            {/* Actions */}
            <div className="w-full space-y-2">
              <button
                onClick={handleDownload}
                disabled={!qrDataUrl}
                className="w-full bg-[#2874f0] hover:bg-blue-600 disabled:opacity-50 text-white font-black text-xs py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm cursor-pointer uppercase tracking-wider"
              >
                <Download size={16} />
                <span>Download High-Res PNG</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
