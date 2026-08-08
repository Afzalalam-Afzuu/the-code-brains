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
            {/* Official Social Channels */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <a
                href="https://t.me/thecodebrainss"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#229ED9] hover:bg-[#1d87b9] text-white px-3 py-1.5 rounded-lg text-[11px] font-extrabold flex items-center gap-1.5 transition shadow-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .54-1.43.53-.47-.01-1.37-.26-2.04-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.89 8.01-3.46 3.81-1.59 4.6-1.87 5.12-1.88.11 0 .37.03.54.17.14.12.18.28.2.45-.01.07.01.23 0 .38z"/>
                </svg>
                <span>Join Telegram</span>
              </a>

              <a
                href="https://whatsapp.com/channel/0029VbDQp84DOQIPmdj9430p"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 py-1.5 rounded-lg text-[11px] font-extrabold flex items-center gap-1.5 transition shadow-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.15 4.201 4.293-1.124z"/>
                </svg>
                <span>Join WhatsApp</span>
              </a>
            </div>
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
              <li><Link href="/terms-of-use" className="hover:text-[#2874f0] transition">Terms Of Use</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#2874f0] transition">Privacy Policy</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-[#2874f0] transition">Affiliate Disclosure</Link></li>
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
