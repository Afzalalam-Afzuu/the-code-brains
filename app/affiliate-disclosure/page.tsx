import Link from "next/link";
import { Tag, CheckCircle2, ShieldCheck } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Affiliate Disclosure — TheCodeBrains",
  description: "Transparency & Affiliate Disclosure for TheCodeBrains. We participate in the Amazon Associates & Flipkart Affiliate programs.",
  alternates: {
    canonical: `${siteUrl}/affiliate-disclosure`,
  },
  openGraph: {
    title: "Affiliate Disclosure — TheCodeBrains",
    description: "Full disclosure of our affiliate relationships with Amazon, Flipkart, and partner merchants.",
    url: `${siteUrl}/affiliate-disclosure`,
    siteName: "TheCodeBrains",
    type: "website",
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-slate-900">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
          <Tag size={14} /> Full Transparency
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
          Affiliate Disclosure
        </h1>
        <p className="text-xs text-slate-500 font-semibold">
          Last Updated: February 2026 • Effective Immediately
        </p>
      </div>

      {/* Main Box */}
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 space-y-3">
        <h2 className="text-base font-black text-emerald-900 flex items-center gap-2">
          <ShieldCheck size={20} className="text-emerald-600" /> Amazon Associates & Affiliate Program Notice
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
          <strong>TheCodeBrains</strong> is a participant in the <strong>Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in. We also participate in the Flipkart Affiliate Program and other retail affiliate networks.
        </p>
      </div>

      {/* Details */}
      <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#2874f0]" /> How Affiliate Links Work
          </h2>
          <p>
            When you click on a product link, "Buy on Amazon", "Buy on Flipkart", or promotional coupon link on TheCodeBrains and make a purchase, we may receive a small referral commission from the merchant store.
          </p>
          <ul className="list-disc pl-5 space-y-1 font-medium text-slate-800">
            <li><strong>No Extra Cost To You:</strong> Clicking an affiliate link does NOT increase the price you pay. You pay the exact same price (or lower with our discount codes) as visiting the merchant directly.</li>
            <li><strong>Editorial Independence:</strong> Our reviews, gadget ratings, and lab recommendations are 100% independent. Higher affiliate commission does not influence our editorial opinion.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[#2874f0]" /> Questions & Contact
          </h2>
          <p>
            If you have any questions regarding our affiliate relationships or deal verification process, please reach out to us at:
          </p>
          <div className="bg-slate-100 p-4 rounded-xl font-mono text-slate-900 font-bold w-fit">
            affiliates@thecodebrains.com
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
