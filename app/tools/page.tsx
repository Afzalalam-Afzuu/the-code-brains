import Link from "next/link";
import ToolsNavbar from "@/components/tools/ToolsNavbar";
import ToolsFooter from "@/components/tools/ToolsFooter";
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
} from "lucide-react";

export const metadata = {
  title: "Free Online Web Tools — AI Chat, PDF Tools, Password Generator, QR & Age Calculators",
  description: "100% free, fast, and private online web tools. AI Chat, Password Generator, Unit Converter, Color Palette, Base64, EMI Calculator, BMI Calculator, PDF Tools, and IP Checker.",
};

export default function ToolsHubPage() {
  const tools = [
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

        {/* Privacy & Trust Metrics */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center shadow-sm">
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
            <h3 className="text-sm font-black text-slate-950">No Ads / No Registration</h3>
            <p className="text-xs text-slate-800 font-extrabold">Use any tool freely without creating an account.</p>
          </div>
        </div>
      </main>

      <ToolsFooter />
    </div>
  );
}
