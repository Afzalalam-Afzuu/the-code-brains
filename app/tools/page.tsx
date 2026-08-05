import Link from "next/link";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import { Calendar, QrCode, Image as ImageIcon, Code2, Database, Zap, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Free Online Web Tools — Age Calculator, QR Generator, JSON Formatter, Image Compressor",
  description: "100% free, fast, and private online client-side tools. Calculate your exact age, generate custom high-res QR codes, format JSON, compress images, and generate mock datasets without data uploads.",
};

export default function ToolsHubPage() {
  const tools = [
    {
      id: "age-calculator",
      title: "Age & Milestone Calculator",
      description: "Calculate your exact age in years, months, days, total hours, seconds, zodiac sign, and upcoming birthday countdown.",
      icon: Calendar,
      gradient: "from-amber-500 to-orange-600",
      href: "/tools/age-calculator",
      badge: "Popular Utility",
    },
    {
      id: "qr-generator",
      title: "Custom QR Code Generator",
      description: "Create high-resolution QR codes for websites, WiFi passwords, WhatsApp numbers, and text with custom colors and instant download.",
      icon: QrCode,
      gradient: "from-[#2874f0] to-indigo-600",
      href: "/tools/qr-generator",
      badge: "HD Export",
    },
    {
      id: "image-compressor",
      title: "Browser Image Compressor",
      description: "Compress PNG, JPG, and WEBP images directly inside your browser with zero quality loss. Real-time file size comparison before vs after.",
      icon: ImageIcon,
      gradient: "from-emerald-500 to-teal-600",
      href: "/tools/image-compressor",
      badge: "100% Private",
    },
    {
      id: "json-formatter",
      title: "JSON Formatter & Validator",
      description: "Format, prettify, minify, and validate JSON strings in real-time. Highlights syntax errors, custom spacing, and 1-click download.",
      icon: Code2,
      gradient: "from-cyan-500 to-blue-600",
      href: "/tools/json-formatter",
      badge: "Developer Tool",
    },
    {
      id: "dummy-json",
      title: "Dummy JSON Generator",
      description: "Generate realistic mock JSON datasets for users, products, and blogs for API testing and frontend prototyping.",
      icon: Database,
      gradient: "from-purple-500 to-indigo-600",
      href: "/tools/dummy-json",
      badge: "Mock Data Studio",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <ToolsNavbar />

      <main className="max-w-7xl mx-auto px-4 py-12 flex-1 space-y-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles size={13} className="text-amber-400" /> Free Client-Side Utility Hub
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Fast, Free & Private <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
              Online Web Tools
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 font-medium">
            Useful browser utilities engineered for speed and total privacy. Zero signups, zero server uploads, 100% free forever.
          </p>
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.id}
                href={t.href}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Decorative Top Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${t.gradient}`} />

                <div className="space-y-4 z-10">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition duration-300`}>
                      <Icon size={24} />
                    </div>
                    <span className="bg-slate-800 text-slate-300 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border border-slate-700">
                      {t.badge}
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-white group-hover:text-amber-400 transition">
                    {t.title}
                  </h2>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-black text-[#2874f0] group-hover:text-amber-400 transition">
                  <span>Open Tool</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition duration-200" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Privacy & Trust Metrics */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-1">
            <ShieldCheck size={28} className="text-emerald-400 mx-auto" />
            <h3 className="text-sm font-black text-white">100% Client Side</h3>
            <p className="text-[11px] text-slate-400">All data stays inside your web browser.</p>
          </div>
          <div className="space-y-1">
            <Zap size={28} className="text-amber-400 mx-auto" />
            <h3 className="text-sm font-black text-white">Lightning Fast</h3>
            <p className="text-[11px] text-slate-400">Instant results with zero server latencies.</p>
          </div>
          <div className="space-y-1">
            <Sparkles size={28} className="text-[#2874f0] mx-auto" />
            <h3 className="text-sm font-black text-white">No Ads / No Registration</h3>
            <p className="text-[11px] text-slate-400">Use any tool freely without creating an account.</p>
          </div>
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
