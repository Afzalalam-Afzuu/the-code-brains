import Link from "next/link";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
import AdBanner from "@/components/AdBanner";
import {
  Calendar,
  QrCode,
  Image as ImageIcon,
  Code2,
  Database,
  KeyRound,
  FileText,
  ArrowRightLeft,
  Landmark,
  Activity,
  Palette,
  Binary,
  Monitor,
  Bot,
  FileCode,
  Zap,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Orbit,
} from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Free Online Web Tools Suite — AI Generators, PDF Tools & Calculators | TheCodeBrains",
  description: "100% free, fast, and private online web tools. AI Chat Assistant, Password Generator, QR Generator, Unit Converter, Color Palette, Base64, EMI & BMI Calculators, PDF Utilities, and Space Observatory.",
  alternates: {
    canonical: `${siteUrl}/tools`,
  },
  openGraph: {
    title: "Free Online Web Tools & Utilities Suite — TheCodeBrains",
    description: "Access 20+ free browser-based developer, utility, and AI productivity tools. Zero installation required.",
    url: `${siteUrl}/tools`,
    siteName: "TheCodeBrains Tools Hub",
    images: [
      {
        url: `${siteUrl}/images/modern_laptop.png`,
        width: 1200,
        height: 630,
        alt: "TheCodeBrains Web Tools Hub",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Web Tools Suite — TheCodeBrains",
    description: "20+ fast, free, private online web tools, AI chat assistants, and utilities.",
    images: [`${siteUrl}/images/modern_laptop.png`],
  },
};

export default function ToolsHubPage() {
  const tools = [
    {
      id: "space-observatory",
      title: "Global Space Observatory & Research Lab",
      description: "Real-time ISS orbital tracking, near-Earth asteroid radar, solar flares matrix, DSCOVR Earth satellite photos, and raw JSON data workbench.",
      icon: Orbit,
      href: "/space-observatory",
      badge: "🚀 Space Portal",
    },
    {
      id: "ai-chat",
      title: "AI Chat Assistant",
      description: "Ask questions, debug errors, write code, and solve technical problems with AI intelligence.",
      icon: Bot,
      href: "/tools/ai-chat",
      badge: "AI Assistant",
    },
    {
      id: "ai-email-writer",
      title: "AI Email Writer",
      description: "Draft professional, polite, sales, or formal business emails in seconds.",
      icon: Sparkles,
      href: "/tools/ai-email-writer",
      badge: "AI Content",
    },
    {
      id: "ai-bio-generator",
      title: "AI Bio Generator",
      description: "Create engaging social media bios for LinkedIn, Twitter, Instagram, and GitHub.",
      icon: Sparkles,
      href: "/tools/ai-bio-generator",
      badge: "AI Social",
    },
    {
      id: "ai-cover-letter-generator",
      title: "AI Cover Letter Generator",
      description: "Generate customized, professional job cover letters tailored to your target company.",
      icon: FileText,
      href: "/tools/ai-cover-letter-generator",
      badge: "AI Career",
    },
    {
      id: "ai-sql-generator",
      title: "AI SQL Query Generator",
      description: "Convert English text descriptions into optimized SQL queries for PostgreSQL and MySQL.",
      icon: Database,
      href: "/tools/ai-sql-generator",
      badge: "AI Developer",
    },
    {
      id: "ai-regex-generator",
      title: "AI Regex Generator",
      description: "Convert English descriptions into regular expressions with instant pattern testing.",
      icon: Code2,
      href: "/tools/ai-regex-generator",
      badge: "AI Developer",
    },
    {
      id: "age-calculator",
      title: "Age & Milestone Calculator",
      description: "Calculate your exact age in years, months, days, total hours, seconds, and upcoming birthday countdown.",
      icon: Calendar,
      href: "/tools/age-calculator",
      badge: "Popular Utility",
    },
    {
      id: "qr-generator",
      title: "Custom QR Code Generator",
      description: "Create high-resolution QR codes for websites, WiFi passwords, WhatsApp numbers, and text with custom colors.",
      icon: QrCode,
      href: "/tools/qr-generator",
      badge: "HD Export",
    },
    {
      id: "image-compressor",
      title: "Browser Image Compressor",
      description: "Compress PNG, JPG, and WEBP images directly inside your browser with zero quality loss.",
      icon: ImageIcon,
      href: "/tools/image-compressor",
      badge: "100% Private",
    },
    {
      id: "password-generator",
      title: "Strong Password Generator",
      description: "Generate cryptographically random passwords with custom symbols, numbers, and strength indicators.",
      icon: KeyRound,
      href: "/tools/password-generator",
      badge: "Security Studio",
    },
    {
      id: "text-tools",
      title: "Word Counter & Text Tools",
      description: "Count words/characters, convert text cases, remove duplicate lines, and clean extra whitespace.",
      icon: FileText,
      href: "/tools/text-tools",
      badge: "Text Studio",
    },
    {
      id: "unit-converter",
      title: "Universal Unit Converter",
      description: "Convert length, weight, temperature, speed, area, and volume measurements in real-time.",
      icon: ArrowRightLeft,
      href: "/tools/unit-converter",
      badge: "Multi Converter",
    },
    {
      id: "color-palette",
      title: "Color Picker & Palette",
      description: "Pick colors, convert HEX/RGB/HSL values, and generate 5-color harmonious design palettes.",
      icon: Palette,
      href: "/tools/color-palette",
      badge: "Design Utility",
    },
    {
      id: "emi-calculator",
      title: "Loan EMI Calculator",
      description: "Calculate monthly loan EMIs, interest payable, and total loan repayment schedule.",
      icon: Landmark,
      href: "/tools/emi-calculator",
      badge: "Finance Studio",
    },
    {
      id: "bmi-calculator",
      title: "BMI Health Calculator",
      description: "Calculate your Body Mass Index, health category, and recommended ideal weight range.",
      icon: Activity,
      href: "/tools/bmi-calculator",
      badge: "Health Utility",
    },
    {
      id: "json-formatter",
      title: "JSON Formatter & Validator",
      description: "Format, prettify, minify, and validate JSON strings in real-time. Highlights syntax errors.",
      icon: Code2,
      href: "/tools/json-formatter",
      badge: "Developer Tool",
    },
    {
      id: "base64-converter",
      title: "Base64 Encoder / Decoder",
      description: "Encode text strings and images to Base64 data URLs or decode Base64 back to plain text.",
      icon: Binary,
      href: "/tools/base64-converter",
      badge: "Binary Utility",
    },
    {
      id: "ip-checker",
      title: "IP & Device Info Checker",
      description: "View your public IP address, ISP, location details, OS, screen resolution, and user agent.",
      icon: Monitor,
      href: "/tools/ip-checker",
      badge: "Network Inspector",
    },
    {
      id: "pdf-tools",
      title: "PDF Text Extractor & Inspector",
      description: "Extract text from PDF documents, inspect metadata, page counts, and export text files.",
      icon: FileCode,
      href: "/tools/pdf-tools",
      badge: "PDF Studio",
    },
    {
      id: "dummy-json",
      title: "Dummy JSON Generator",
      description: "Generate realistic mock JSON datasets for users, products, and blogs for API testing.",
      icon: Database,
      href: "/tools/dummy-json",
      badge: "Mock Data Studio",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-950 flex flex-col">
      <ToolsNavbar />

      <main className="max-w-7xl mx-auto px-4 py-12 flex-1 space-y-12 w-full">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="bg-blue-100 text-[#2874f0] border-2 border-blue-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
            <Sparkles size={14} className="text-[#2874f0]" /> 15+ Free Online Web Tools
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-tight">
            Fast, Free & Private <br />
            <span className="text-[#2874f0] underline decoration-blue-300 underline-offset-4">
              Developer & Utility Tools
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-800 font-extrabold max-w-2xl mx-auto">
            Useful browser utilities engineered for speed and total privacy. Zero signups, zero server uploads, 100% free forever.
          </p>
        </div>

        {/* Featured Global Space Observatory Banner */}
        <div className="max-w-6xl mx-auto">
          <Link
            href="/space-observatory"
            className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 border-2 border-indigo-500/40 shadow-xl hover:shadow-2xl transition duration-300 flex flex-col md:flex-row items-center justify-between gap-6 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-3 max-w-2xl z-10 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <Orbit size={14} className="animate-spin text-indigo-400" /> Featured Science Portal
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  ISS Real-Time Tracking
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Global Space Observatory & Data Research Lab
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Access real-time International Space Station orbit tracking, near-Earth asteroid radar, solar flares matrix, DSCOVR satellite Earth imagery, exoplanet archives, and live JSON data workbench.
              </p>
            </div>
            <div className="shrink-0 z-10">
              <span className="bg-indigo-600 group-hover:bg-indigo-500 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg inline-flex items-center gap-2 transition duration-200">
                Launch Space Observatory <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        </div>

        {/* Dedicated High-Visibility Ad Banner */}
        <div className="max-w-4xl mx-auto">
          <AdBanner className="my-4" />
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.id}
                href={t.href}
                className="bg-white border-2 border-slate-200 hover:border-[#2874f0] rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between group relative overflow-hidden space-y-6"
              >
                <div className="space-y-4 z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-300 flex items-center justify-center text-[#2874f0] group-hover:bg-[#2874f0] group-hover:text-white transition duration-200">
                      <Icon size={24} />
                    </div>
                    <span className="bg-slate-100 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full border-2 border-slate-300">
                      {t.badge}
                    </span>
                  </div>

                  <h2 className="text-xl font-black text-slate-950 group-hover:text-[#2874f0] transition">
                    {t.title}
                  </h2>

                  <p className="text-sm text-slate-800 leading-relaxed font-extrabold">
                    {t.description}
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-between text-xs font-black text-[#2874f0]">
                  <span>Open Tool</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition duration-200" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Telegram & WhatsApp Official Channels Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-sky-600 text-white rounded-3xl p-6 sm:p-8 max-w-6xl mx-auto shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-yellow-400 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              🔥 Free Web Tools & Tech Updates
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              Join Our Telegram & WhatsApp Channels
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 font-semibold max-w-xl">
              Get notified when we add new free online web tools, AI assistants, developer utilities, and high-discount Amazon/Flipkart loot deals!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="https://t.me/thecodebrainss"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#229ED9] hover:bg-[#1b8abf] text-white font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 border border-white/20"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .54-1.43.53-.47-.01-1.37-.26-2.04-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.89 8.01-3.46 3.81-1.59 4.6-1.87 5.12-1.88.11 0 .37.03.54.17.14.12.18.28.2.45-.01.07.01.23 0 .38z"/>
              </svg>
              <span>Join Telegram</span>
            </a>

            <a
              href="https://whatsapp.com/channel/0029VbDQp84DOQIPmdj9430p"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1eb652] text-white font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 border border-white/20"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.15 4.201 4.293-1.124z"/>
              </svg>
              <span>Join WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Privacy & Trust Metrics */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center shadow-sm">
          <div className="space-y-1">
            <ShieldCheck size={28} className="text-emerald-600 mx-auto" />
            <h3 className="text-sm font-black text-slate-950">100% Client Side</h3>
            <p className="text-xs text-slate-800 font-extrabold">All data stays inside your web browser.</p>
          </div>
          <div className="space-y-1">
            <Zap size={28} className="text-amber-500 mx-auto" />
            <h3 className="text-sm font-black text-slate-950">Lightning Fast</h3>
            <p className="text-xs text-slate-800 font-extrabold">Instant results with zero server latencies.</p>
          </div>
          <div className="space-y-1">
            <Sparkles size={28} className="text-[#2874f0] mx-auto" />
            <h3 className="text-sm font-black text-slate-950">Free & Instant</h3>
            <p className="text-xs text-slate-800 font-extrabold">Use any tool freely without creating an account.</p>
          </div>
          <div className="space-y-1">
            <div className="w-7 h-7 rounded-full bg-orange-100 border border-orange-300 mx-auto flex items-center justify-center">
              <svg className="w-4 h-4 fill-[#F38020]" viewBox="0 0 24 24">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
              </svg>
            </div>
            <h3 className="text-sm font-black text-slate-950">Cloudflare Protected</h3>
            <p className="text-xs text-slate-800 font-extrabold">Encrypted by 256-Bit SSL & DDoS Shield.</p>
          </div>
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
