import Link from "next/link";
import { Scale, CheckCircle2, ShieldAlert } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Terms of Use — TheCodeBrains",
  description: "Terms of Use and Service Agreement for TheCodeBrains web tools, gadget reviews, and price comparison portal.",
  alternates: {
    canonical: `${siteUrl}/terms-of-use`,
  },
  openGraph: {
    title: "Terms of Use — TheCodeBrains",
    description: "Terms of service and user agreement for TheCodeBrains.",
    url: `${siteUrl}/terms-of-use`,
    siteName: "TheCodeBrains",
    type: "website",
  },
};

export default function TermsOfUsePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-slate-900">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <span className="bg-amber-100 text-amber-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
          <Scale size={14} /> User Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
          Terms of Use
        </h1>
        <p className="text-xs text-slate-500 font-semibold">
          Last Updated: February 2026 • Effective Immediately
        </p>
      </div>

      {/* Main Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#2874f0]" /> 1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using <strong>TheCodeBrains</strong> (<a href={siteUrl} className="text-[#2874f0] underline font-bold">{siteUrl}</a>), including our web tools, price comparison engine, deal directories, and tech blogs, you agree to be bound by these Terms of Use. If you do not agree, please discontinue using the site.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#2874f0]" /> 2. Web Tools Usage & Warranties
          </h2>
          <p>
            Our web utilities (accessible via <code>/tools</code>) are provided "AS IS" for informational and utility purposes free of charge:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-medium text-slate-800">
            <li>Calculations (e.g. Loan EMI, Age, BMI) and conversions (e.g. Base64, Units) are performed locally in your browser. While we strive for 100% mathematical accuracy, results should not be used as official financial, legal, or medical advice.</li>
            <li>Users are solely responsible for verifying QR code destination URLs, password strengths, and file output contents.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#2874f0]" /> 3. Price Comparison & Deal Disclaimer
          </h2>
          <p>
            Product prices, stock availability, bank discounts, and seller ratings listed on Amazon India, Flipkart, and partner stores fluctuate rapidly:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-medium text-slate-800">
            <li>The final price and availability displayed on the merchant website at the time of purchase apply.</li>
            <li>TheCodeBrains is not an online store and does not collect payments or process product returns directly.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#2874f0]" /> 4. Intellectual Property
          </h2>
          <p>
            All original blog content, buying guide reviews, code architecture, visual icons, and web tool designs on TheCodeBrains are protected by copyright laws. Unauthorized reproduction or scraping is strictly prohibited.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#2874f0]" /> 5. Limitation of Liability
          </h2>
          <p>
            TheCodeBrains and its operators shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our tools, price comparison information, or third-party links.
          </p>
        </section>

      </div>

      {/* Back Link */}
      <div className="pt-6 border-t border-slate-200">
        <Link href="/" className="text-xs font-black text-[#2874f0] hover:underline">
          ← Back to Homepage
        </Link>
      </div>
    </div>
  );
}
