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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <ToolsNavbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-1 w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
            <ImageIcon size={12} /> Browser Image Compressor
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Compress JPG, PNG & WEBP Images
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-medium">
            Reduce image file sizes instantly inside your browser without losing visual quality. 100% private, no server uploads.
          </p>
        </div>

        {/* Upload Dropzone */}
        {!originalImage ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="bg-slate-900 border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-3xl p-10 sm:p-16 text-center cursor-pointer transition duration-300 space-y-4 group shadow-xl"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
            />
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto group-hover:scale-110 transition duration-300">
              <Upload size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-white">Click or Drag & Drop Image Here</h3>
              <p className="text-xs text-slate-400 font-medium">Supports JPG, PNG, and WEBP files up to 20MB</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Compression Settings Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <FileCheck size={20} className="text-emerald-400" />
                  <div>
                    <h3 className="text-sm font-black text-white truncate max-w-xs">{originalImage.name}</h3>
                    <p className="text-xs text-slate-400">Original Size: <span className="font-bold text-slate-200">{formatBytes(originalImage.size)}</span></p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setOriginalImage(null);
                    setOriginalUrl(null);
                    setCompressedUrl(null);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 transition cursor-pointer"
                >
                  Upload New Image
                </button>
              </div>

              {/* Quality Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-extrabold">
                  <span className="text-slate-300 uppercase tracking-wider">Compression Quality: {quality}%</span>
                  <span className="text-emerald-400">{quality < 50 ? "Max Compression" : quality > 80 ? "High Quality" : "Balanced"}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={95}
                  value={quality}
                  onChange={(e) => handleQualityChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Savings Banner */}
              {compressedSize && (
                <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">New Compressed Size</span>
                    <p className="text-xl font-black text-white">{formatBytes(compressedSize)}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-emerald-500 text-slate-950 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {savingsPercent}% Saved 🎉
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Before vs After Side-by-side Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Original Preview */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block text-center">
                  Original Image
                </span>
                <div className="h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-2">
                  {originalUrl && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={originalUrl} alt="Original" className="max-h-full max-w-full object-contain rounded-lg" />
                  )}
                </div>
              </div>

              {/* Compressed Preview */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3">
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest block text-center">
                  Compressed Preview
                </span>
                <div className="h-64 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center p-2 relative">
                  {compressedUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={compressedUrl} alt="Compressed" className="max-h-full max-w-full object-contain rounded-lg" />
                  ) : (
                    <p className="text-xs text-slate-500">Processing image...</p>
                  )}
                </div>
              </div>
            </div>

            {/* Download Action */}
            <button
              onClick={handleDownload}
              disabled={!compressedUrl || isProcessing}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-extrabold text-sm py-4 rounded-2xl transition flex items-center justify-center gap-2 shadow-xl cursor-pointer uppercase tracking-wider"
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
