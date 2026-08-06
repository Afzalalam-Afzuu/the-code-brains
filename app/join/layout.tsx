import React from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodebrains.com";

export const metadata = {
  title: "Join Plus Club — Free Tech Membership & Exclusive Price Alerts",
  description: "Join TheCodeBrains Plus Club for free to receive instant price drop alerts, verified promo codes, and priority support.",
  alternates: {
    canonical: `${siteUrl}/join`,
  },
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
