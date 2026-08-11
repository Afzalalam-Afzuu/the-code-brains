"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface AdBannerProps {
  slot?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal";
  responsive?: boolean;
  className?: string;
  label?: string;
}

export default function AdBanner({
  slot,
  format = "auto",
  responsive = true,
  className = "my-6",
  label = "ADVERTISEMENT",
}: AdBannerProps) {
  const pathname = usePathname();
  const adRef = useRef<boolean>(false);

  const isNoAdsPage =
    pathname?.startsWith("/nasa") || pathname?.startsWith("/space-observatory");

  useEffect(() => {
    if (isNoAdsPage) return;
    if (adRef.current) return;
    adRef.current = true;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log("AdSense push notice:", err);
    }
  }, [isNoAdsPage]);

  if (isNoAdsPage) {
    return null;
  }

  return (
    <div className={`w-full flex flex-col items-center justify-center text-center overflow-hidden ${className}`}>
      {label && (
        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-extrabold mb-1.5">
          {label}
        </span>
      )}
      <div className="w-full min-h-[90px] bg-slate-100/70 border border-slate-200/70 rounded-2xl flex items-center justify-center overflow-hidden p-2">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client="ca-pub-3691889459537976"
          data-ad-slot={slot || "auto"}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
}
