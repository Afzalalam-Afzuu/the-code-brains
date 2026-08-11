"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export default function AdSenseScript() {
  const pathname = usePathname();
  const isNoAdsPage =
    pathname?.startsWith("/nasa") || pathname?.startsWith("/space-observatory");

  if (isNoAdsPage) {
    return null;
  }

  return (
    <Script
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3691889459537976"
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
}
