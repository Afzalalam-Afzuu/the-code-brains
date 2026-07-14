import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          
          {/* Column 1: Brand Info (Spans 2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 leading-none group">
              {/* Logo Icon */}
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-md shadow-indigo-200/50 group-hover:shadow-lg group-hover:shadow-indigo-300/50 transition-all duration-300">
                <svg className="w-5.5 h-5.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" className="opacity-20" />
                  <path d="M9.5 8.5C8 9.5 7.5 11 7.5 12s.5 2.5 2 3.5" />
                  <path d="M14.5 8.5c1.5 1 2 2.5 2 3.5s-.5 2.5-2 3.5" />
                  <path d="M12 7v10" />
                  <circle cx="12" cy="7" r="1" fill="currentColor" />
                  <circle cx="7.5" cy="12" r="1" fill="currentColor" />
                  <circle cx="16.5" cy="12" r="1" fill="currentColor" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" />
                </svg>
              </div>
              
              {/* Logo Text */}
              <div className="flex flex-col">
                <span className="text-xl tracking-tight font-light text-slate-800">
                  The<span className="font-bold text-slate-900">Code</span>
                  <span className="font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent group-hover:from-indigo-500 group-hover:to-violet-500 transition-colors">Brains</span>
                  <span className="text-indigo-600 font-extrabold">.</span>
                </span>
                <span className="text-[8px] tracking-[0.2em] text-slate-400 font-extrabold mt-1 uppercase">
                  Upgrade Your Tech
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              TheCodeBrains is your trusted, independent resource for tech reviews, curated buying guides, and live deal tracking. We spent thousands of hours testing gadgets so you don't have to.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { 
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ), 
                  href: "https://twitter.com" 
                },
                { 
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.516 3.5 12 3.5 12 3.5s-7.516 0-9.388.555a3.003 3.003 0 0 0-2.11 2.108C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.872.555 9.388.555 9.388.555s7.516 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  ), 
                  href: "https://youtube.com" 
                },
                { 
                  icon: (
                    <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  ), 
                  href: "https://instagram.com" 
                },
                { 
                  icon: (
                    <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 11a9 9 0 0 1 9 9"></path>
                      <path d="M4 4a16 16 0 0 1 16 16"></path>
                      <circle cx="5" cy="19" r="1"></circle>
                    </svg>
                  ), 
                  href: "https://www.amazon.in" 
                }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all duration-300 hover:bg-indigo-50/30"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Categories</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Phones", href: "/phones/best-picks" },
                { label: "TV & Audio", href: "/tv-audio/tv-best-picks" },
                { label: "Computing", href: "/computing/best-laptops" },
                { label: "Smart Home", href: "/home/best-smart-speakers" },
                { label: "AI Tools", href: "/ai/best-ai-chatbots" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About TheCodeBrains", href: "/join" },
                { label: "TheCodeBrains Club", href: "/join" },
                { label: "Newsletters", href: "/newsletters" },
                { label: "Editorial Staff", href: "/" },
                { label: "Contact Us", href: "/newsletters" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal & Policy */}
          <div>
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Privacy Policy", href: "/" },
                { label: "Terms of Service", href: "/" },
                { label: "Affiliate Disclosure", href: "/" },
                { label: "Advertising Policy", href: "/" },
                { label: "Manage Cookies", href: "/" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-indigo-600 transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Section with Affiliate Disclaimer */}
        <div className="border-t border-slate-100 pt-8 mt-8 space-y-6">
          <p className="text-[11px] text-slate-400 leading-relaxed text-center lg:text-left">
            <span className="font-bold text-slate-500 uppercase tracking-wider mr-1">Affiliate Commission Disclosure:</span> 
            TheCodeBrains.com is a participant in affiliate marketing programs, which means we may get paid commission on editorially chosen products purchased through our links to retailer sites. Our product reviews and picks are established solely by our editorial staff through hands-on testing, and the commissions we receive help fund our independent testing lab.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-slate-400 font-medium">
              &copy; {new Date().getFullYear()} TheCodeBrains Media Group. All rights reserved.
            </p>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
              Made for tech enthusiasts <span className="text-red-500">❤️</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
