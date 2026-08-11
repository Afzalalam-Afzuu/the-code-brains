import SpaceObservatoryResearchPage from "../nasa/page";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";

export const metadata = {
  title: "Global Space Observatory & Astronomical Data Research Lab — TheCodeBrains",
  description: "Real-Time ISS Orbital Tracking, Near-Earth Asteroid Radar, Solar Flares Matrix, Planetary Geology Expeditions, Astronaut Pioneers & NASA Open Data Workbench.",
  alternates: {
    canonical: `${siteUrl}/space-observatory`,
  },
  openGraph: {
    title: "Space Research Observatory & Live Telemetry Lab — TheCodeBrains",
    description: "Explore real-time ISS orbital coordinates, near-Earth asteroid radar, deep space photography, planetary surface geology, and NASA science APIs.",
    url: `${siteUrl}/space-observatory`,
    siteName: "TheCodeBrains Space Research",
    images: [
      {
        url: `${siteUrl}/images/space_nebula_hero.png`,
        width: 1200,
        height: 630,
        alt: "TheCodeBrains Space Observatory Telemetry Lab",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Space Observatory & Astronomical Telemetry Lab",
    description: "Real-time ISS tracking, near-Earth asteroid radar, deep space photography, and NASA Open Data workbench.",
    images: [`${siteUrl}/images/space_nebula_hero.png`],
  },
};

export default SpaceObservatoryResearchPage;
