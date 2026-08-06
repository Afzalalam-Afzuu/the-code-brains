"use client";

import React, { useState, useRef } from "react";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { Image as ImageIcon, Upload, Download, RefreshCw, Zap, ShieldCheck, FileCheck } from "lucide-react";

export default function ImageCompressorPage() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [quality, setQuality] = useState<number>(75);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setOriginalImage(file);
      setOriginalUrl(URL.createObjectURL(file));
      compressImage(file, quality);
    }
  };

  const compressImage = (file: File, qualityPercent: number) => {
    setIsProcessing(true);
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
      const q = qualityPercent / 100;

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            setCompressedUrl(URL.createObjectURL(blob));
          }
          setIsProcessing(false);
        },
        mimeType,
        q
      );
    };

    reader.readAsDataURL(file);
  };

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality);
    if (originalImage) {
      compressImage(originalImage, newQuality);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const savingsPercent = originalImage && compressedSize
    ? Math.max(0, Math.round(((originalImage.size - compressedSize) / originalImage.size) * 100))
    : 0;

  const handleDownload = () => {
    if (!compressedUrl || !originalImage) return;
    const a = document.createElement("a");
    a.href = compressedUrl;
    const ext = originalImage.name.substring(originalImage.name.lastIndexOf("."));
    const nameWithoutExt = originalImage.name.substring(0, originalImage.name.lastIndexOf("."));
    a.download = `${nameWithoutExt}-compressed${ext}`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col font-sans">
      <ToolsNavbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <ImageIcon size={13} /> Browser Image Compressor
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Compress JPG, PNG & WEBP Images
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-extrabold max-w-xl mx-auto">
            Reduce image file sizes instantly inside your browser without losing visual quality. 100% private, no server uploads.
          </p>
        </div>

        {/* Upload Dropzone */}
        {!originalImage ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="bg-white border-3 border-dashed border-slate-300 hover:border-[#2874f0] hover:bg-blue-50/50 rounded-2xl p-10 sm:p-16 text-center cursor-pointer transition duration-300 space-y-4 group shadow-sm"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
            />
            <div className="w-16 h-16 rounded-2xl bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-[#2874f0] mx-auto group-hover:scale-105 transition duration-200 shadow-2xs">
              <Upload size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-950">Click or Drag & Drop Image Here</h3>
              <p className="text-xs text-slate-700 font-extrabold">Supports JPG, PNG, and WEBP files up to 20MB</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Compression Settings Card */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b-2 border-slate-100">
                <div className="flex items-center gap-3">
                  <FileCheck size={22} className="text-[#2874f0]" />
                  <div>
                    <h3 className="text-sm font-black text-slate-950 truncate max-w-xs">{originalImage.name}</h3>
                    <p className="text-xs text-slate-700 font-bold">Original Size: <span className="font-black text-slate-950">{formatBytes(originalImage.size)}</span></p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setOriginalImage(null);
                    setOriginalUrl(null);
                    setCompressedUrl(null);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-black px-3.5 py-2 rounded-xl border-2 border-slate-300 transition cursor-pointer"
                >
                  Upload New Image
                </button>
              </div>

              {/* Quality Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-black">
                  <span className="text-slate-950 uppercase tracking-wider">Compression Quality: {quality}%</span>
                  <span className="text-[#2874f0] font-black">{quality < 50 ? "Max Compression" : quality > 80 ? "High Quality" : "Balanced"}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={95}
                  value={quality}
                  onChange={(e) => handleQualityChange(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2874f0]"
                />
              </div>

              {/* Savings Banner */}
              {compressedSize && (
                <div className="bg-emerald-100 border-2 border-emerald-300 rounded-xl p-4 flex items-center justify-between shadow-2xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black text-emerald-900 uppercase tracking-widest">New Compressed Size</span>
                    <p className="text-2xl font-black text-slate-950">{formatBytes(compressedSize)}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-emerald-700 text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-2xs">
                      {savingsPercent}% Saved 🎉
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Before vs After Side-by-side Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Original Preview */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-3 shadow-sm">
                <span className="text-xs font-black text-slate-800 uppercase tracking-widest block text-center">
                  Original Image
                </span>
                <div className="h-64 bg-slate-100 rounded-xl overflow-hidden border-2 border-slate-300 flex items-center justify-center p-2">
                  {originalUrl && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={originalUrl} alt="Original" className="max-h-full max-w-full object-contain rounded-lg" />
                  )}
                </div>
              </div>

              {/* Compressed Preview */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-3 shadow-sm">
                <span className="text-xs font-black text-[#2874f0] uppercase tracking-widest block text-center">
                  Compressed Preview
                </span>
                <div className="h-64 bg-slate-100 rounded-xl overflow-hidden border-2 border-slate-300 flex items-center justify-center p-2 relative">
                  {compressedUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={compressedUrl} alt="Compressed" className="max-h-full max-w-full object-contain rounded-lg" />
                  ) : (
                    <p className="text-xs text-slate-600 font-extrabold">Processing image...</p>
                  )}
                </div>
              </div>
            </div>

            {/* Download Action */}
            <button
              onClick={handleDownload}
              disabled={!compressedUrl || isProcessing}
              className="w-full bg-[#2874f0] hover:bg-blue-600 disabled:opacity-50 text-white font-black text-sm py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-sm cursor-pointer uppercase tracking-wider"
            >
              <Download size={18} />
              <span>Download Compressed Image</span>
            </button>
          </div>
        )}
      </main>

      <ToolsFooter />
    </div>
  );
}
