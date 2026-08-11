import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata: Metadata = {
  title: "The Code Brains Space Research — Live Telemetry & Observatory Lab",
  description: "Real-Time ISS Orbital Tracking, Near-Earth Asteroid Radar, Solar Flares Matrix, Planetary Geology Expeditions, Astronaut Pioneers & NASA Open Data Workbench.",
  alternates: {
    canonical: `${siteUrl}/nasa`,
  },
  openGraph: {
    title: "The Code Brains Space Research Observatory",
    description: "Explore real-time ISS orbital coordinates, near-Earth asteroid radar, deep space photography, planetary surface geology, and NASA science APIs.",
    url: `${siteUrl}/nasa`,
    siteName: "The Code Brains Space Research",
    images: [
      {
        url: `${siteUrl}/images/space_research_og.png`,
        width: 1200,
        height: 630,
        alt: "The Code Brains Space Research Observatory Banner",
        type: "image/png",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Code Brains Space Research Observatory",
    description: "Real-time ISS tracking, near-Earth asteroid radar, deep space photography, and NASA Open Data workbench.",
    images: [`${siteUrl}/images/space_research_og.png`],
  },
};

export default function NasaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
