import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#172337] text-slate-300 border-t border-slate-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-10 text-xs">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-white text-[#2874f0] font-black w-8 h-8 rounded-lg flex items-center justify-center text-base">
                ⚡
              </div>
              <span className="text-xl font-black italic text-white tracking-tight">
                TheCodeBrains <span className="text-[#ffe500] text-sm">PLUS✦</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed font-medium max-w-sm">
              India's leading independent tech review and deals portal. We track live pricing and test gadgets hands-on for accurate buying advice.
            </p>
            <div className="flex items-center gap-2 font-bold text-slate-300 pt-1">
              <ShieldCheck size={14} className="text-[#388e3c]" />
              <span>100% Independent Editorial Trust</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">ABOUT</h4>
            <ul className="space-y-2 text-slate-300 font-semibold">
              <li><Link href="/join" className="hover:text-[#2874f0] transition">About Us</Link></li>
              <li><Link href="/join" className="hover:text-[#2874f0] transition">Contact Us</Link></li>
              <li><Link href="/browse" className="hover:text-[#2874f0] transition">Deals Directory</Link></li>
              <li><Link href="/portfolio" className="hover:text-[#2874f0] transition">Developer Portfolio</Link></li>
            </ul>
          </div>

          {/* Group Companies */}
          <div>
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">DEALS & STORES</h4>
            <ul className="space-y-2 text-slate-300 font-semibold">
              <li><Link href="/browse" className="hover:text-[#2874f0] transition">Amazon Deals</Link></li>
              <li><Link href="/browse" className="hover:text-[#2874f0] transition">Flipkart Offers</Link></li>
              <li><Link href="/phones/best-picks" className="hover:text-[#2874f0] transition">Mobile Reviews</Link></li>
              <li><Link href="/computing/best-laptops" className="hover:text-[#2874f0] transition">Laptop Guides</Link></li>
            </ul>
          </div>

          {/* Free Web Tools */}
          <div>
            <h4 className="text-[11px] font-black text-amber-400 uppercase tracking-widest mb-3">FREE WEB TOOLS</h4>
            <ul className="space-y-2 text-slate-300 font-semibold">
              <li><Link href="/tools" className="hover:text-amber-400 transition">All Tools Hub</Link></li>
              <li><Link href="/tools/age-calculator" className="hover:text-amber-400 transition">Age Calculator</Link></li>
              <li><Link href="/tools/qr-generator" className="hover:text-amber-400 transition">QR Code Generator</Link></li>
              <li><Link href="/tools/image-compressor" className="hover:text-amber-400 transition">Image Compressor</Link></li>
              <li><Link href="/tools/json-formatter" className="hover:text-amber-400 transition">JSON Formatter</Link></li>
              <li><Link href="/tools/dummy-json" className="hover:text-amber-400 transition">Dummy JSON</Link></li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">POLICY</h4>
            <ul className="space-y-2 text-slate-300 font-semibold">
              <li><Link href="/" className="hover:text-[#2874f0] transition">Return Policy</Link></li>
              <li><Link href="/" className="hover:text-[#2874f0] transition">Terms Of Use</Link></li>
              <li><Link href="/" className="hover:text-[#2874f0] transition">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-[#2874f0] transition">Affiliate Disclosure</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer Bar */}
        <div className="border-t border-slate-700/80 pt-6 space-y-3 text-[11px] text-slate-400 font-medium">
          <p>
            <strong className="text-slate-300 uppercase tracking-wider">Affiliate Transparency:</strong> TheCodeBrains is a participant in the Amazon Services LLC Associates Program and Flipkart Affiliate Program, designed to provide a means for sites to earn advertising fees by linking to Amazon.in and Flipkart.com.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs font-semibold text-slate-400">
            <p>&copy; {new Date().getFullYear()} TheCodeBrains Media. All Rights Reserved.</p>
            <p>Made for Indian Tech Enthusiasts ⚡</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
