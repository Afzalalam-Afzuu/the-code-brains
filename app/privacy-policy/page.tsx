import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Privacy Policy — TheCodeBrains",
  description: "Learn how TheCodeBrains protects your privacy. 100% client-side web tools, zero data tracking, and Google AdSense / Amazon Affiliate privacy standards.",
  alternates: {
    canonical: `${siteUrl}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy — TheCodeBrains",
    description: "Our commitment to user privacy, client-side tools processing, and data security.",
    url: `${siteUrl}/privacy-policy`,
    siteName: "TheCodeBrains",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-slate-900">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <span className="bg-blue-100 text-[#2874f0] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
          <ShieldCheck size={14} /> Legal & Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 font-semibold">
          Last Updated: February 2026 • Effective Immediately
        </p>
      </div>

      {/* Intro Box */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 space-y-2">
        <h2 className="text-base font-black text-[#2874f0] flex items-center gap-2">
          <Lock size={18} /> Our Zero-Data Harvesting Commitment
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
          At <strong>TheCodeBrains</strong> (accessible at <a href={siteUrl} className="text-[#2874f0] underline font-bold">{siteUrl}</a>), the privacy of our visitors is our highest priority. All interactive web tools (QR Generator, Image Compressor, PDF Inspector, Calculators, etc.) run 100% locally inside your web browser. No private files, images, or input values are transmitted to external servers.
        </p>
      </div>

      {/* Main Sections */}
      <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#2874f0]" /> 1. Client-Side Web Tools Privacy
          </h2>
          <p>
            Our web utilities (accessible via <code>/tools</code>) process all computations, image compressions, QR code encodings, and document analyses directly in your browser's JavaScript runtime.
          </p>
          <ul className="list-disc pl-5 space-y-1 font-medium text-slate-800">
            <li><strong>Zero Server Uploads:</strong> Images, PDF files, and text inputs never leave your personal device.</li>
            <li><strong>No User Account Required:</strong> You can access 100% of our utility tools anonymously without registration.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#2874f0]" /> 2. Information We Collect
          </h2>
          <p>
            Like most standard websites, TheCodeBrains logs routine, non-personally identifiable web traffic data for performance monitoring and security:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-medium text-slate-800">
            <li>Internet Protocol (IP) address for rate-limiting and DDoS prevention.</li>
            <li>Browser type, Operating System, and screen resolution.</li>
            <li>Referring/exit pages and timestamp of visit.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#2874f0]" /> 3. Google AdSense & Third-Party Cookies
          </h2>
          <p>
            TheCodeBrains displays advertising powered by <strong>Google AdSense</strong> to monetize web content:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-medium text-slate-800">
            <li>Third-party vendors, including Google, use cookies (such as the DART cookie) to serve ads based on a user's prior visits to our website or other websites.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#2874f0] underline font-bold">Google Ad Settings</a>.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#2874f0]" /> 4. Affiliate Links & External Sites
          </h2>
          <p>
            Our website contains outbound referral links to e-commerce partners including <strong>Amazon India</strong> and <strong>Flipkart</strong>. Clicking an outbound link may place a tracking cookie to attribute sales commissions. Please review the privacy policies of Amazon.in and Flipkart.com when visiting external merchant stores.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#2874f0]" /> 5. Contact Us
          </h2>
          <p>
            If you have questions regarding this Privacy Policy or site data security, please contact us via email at:
          </p>
          <div className="bg-slate-100 p-4 rounded-xl font-mono text-slate-900 font-bold w-fit">
            privacy@thecodebrains.com
          </div>
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
