"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import {
  Globe,
  Orbit,
  Flame,
  Sparkles,
  Search,
  Compass,
  Sun,
  Satellite,
  Zap,
  AlertTriangle,
  Shield,
  ShieldCheck,
  Eye,
  Calendar,
  RefreshCw,
  ExternalLink,
  Info,
  Download,
  Share2,
  Cpu,
  Database,
  ArrowRight,
  Maximize2,
  X,
  Copy,
  Check,
  Radio,
  Clock,
  Navigation,
  Activity,
  Award,
  ChevronRight,
  Code2,
  Terminal,
  Crosshair,
  Radar,
  Sliders,
  Layers,
  Filter,
  ArrowLeft,
  Volume2,
  VolumeX,
  FileText,
  Bookmark,
} from "lucide-react";

// --- Interfaces ---
interface APODData {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  date: string;
  media_type: string;
  copyright?: string;
}

interface Asteroid {
  id: string;
  name: string;
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date_full: string;
    relative_velocity: {
      kilometers_per_hour: string;
    };
    miss_distance: {
      kilometers: string;
      lunar: string;
    };
    orbiting_body: string;
  }>;
}

interface EPICImage {
  id: string;
  image: string;
  date: string;
  caption: string;
  url: string;
  coords: {
    lat: number;
    lon: number;
  };
}

interface ISSData {
  name: string;
  id: number;
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  visibility: string;
  timestamp: number;
}

interface SolarFlare {
  flrID: string;
  beginTime: string;
  peakTime: string;
  classType: string;
  sourceLocation: string;
}

interface Exoplanet {
  pl_name: string;
  hostname: string;
  discoverymethod: string;
  disc_year: number;
  pl_orbper?: number;
  pl_rade?: number;
  pl_bmasse?: number;
}

interface NASAImageItem {
  id: string;
  title: string;
  description: string;
  date_created: string;
  center: string;
  href: string;
}

interface EONETEvent {
  id: string;
  title: string;
  description?: string;
  categories: Array<{ id: string; title: string }>;
  geometry: Array<{ date: string; coordinates: number[] }>;
}

interface Fireball {
  date: string;
  lat: string;
  lon: string;
  energy: string;
  impact_e: string;
  vel: string;
}

interface TechProject {
  id: number;
  lastUpdated: string;
}

interface Astronaut {
  name: string;
  title: string;
  agency: string;
  mission: string;
  image: string;
  bio: string;
  country: string;
  yearsActive: string;
  quote: string;
}

interface SpaceArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
}

const astronautPioneers: Astronaut[] = [
  {
    name: "Space Command Telemetry Specialist",
    title: "Orbital Console & Research Operations",
    agency: "NASA / Space Command Station",
    mission: "Microgravity Experimentation & Data Telemetry",
    image: "/images/user_astronaut_laptop.jpg",
    bio: "Astronaut engineers manage live mission control telemetry, satellite payload processing, and orbital trajectory analysis using onboard workstation consoles.",
    country: "Space Station Operations",
    yearsActive: "Active Crew Mission",
    quote: "Processing live space telemetry in microgravity requires precision, real-time command response, and endless curiosity.",
  },
  {
    name: "Orbital Spacewalk EVA Specialist",
    title: "International Space Station EVA Mission",
    agency: "NASA / International Partner",
    mission: "ISS Extravehicular Activity (Spacewalk)",
    image: "/images/user_astronaut_spacewalk.jpg",
    bio: "Floating 250 miles (400 km) above planet Earth at 17,500 mph, astronauts perform critical extravehicular maintenance, solar array upgrades, and scientific equipment installations.",
    country: "International ISS Mission",
    yearsActive: "Live Active Mission",
    quote: "Looking down at Earth with only a visor between you and the infinite cosmos is the most humbling experience in human history.",
  },
  {
    name: "Yuri Gagarin",
    title: "First Human in Space",
    agency: "Soviet Space Program",
    mission: "Vostok 1 (April 12, 1961)",
    image: "/images/user_astronaut_spacewalk_2.jpg",
    bio: "On April 12, 1961, Yuri Gagarin became the first human to orbit Earth in his Vostok 3KA spacecraft, completing a single orbit in 108 minutes.",
    country: "USSR",
    yearsActive: "1960 - 1968",
    quote: "Orbiting Earth in the spaceship, I saw how beautiful our planet is. People, let us preserve and increase this beauty, not destroy it!",
  },
  {
    name: "Neil Armstrong",
    title: "First Person on the Moon",
    agency: "NASA",
    mission: "Apollo 11 (July 20, 1969)",
    image: "/images/user_earthrise_moon.jpg",
    bio: "Commander of Apollo 11, Neil Armstrong became the first human to step onto the lunar surface on July 20, 1969, uttering the immortal words: 'That's one small step for man, one giant leap for mankind.'",
    country: "USA",
    yearsActive: "1962 - 1971",
    quote: "That's one small step for man, one giant leap for mankind.",
  },
  {
    name: "Kalpana Chawla",
    title: "First Woman of Indian Origin in Space",
    agency: "NASA",
    mission: "STS-87 (1997) & STS-107 (2003)",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    bio: "Aeronautical engineer and NASA astronaut Kalpana Chawla flew on Space Shuttle Columbia in 1997 as a mission specialist and primary robotic arm operator.",
    country: "India / USA",
    yearsActive: "1994 - 2003",
    quote: "The path from dreams to success does exist. May you have the vision to find it, the courage to get on to it, and perseverance to follow it.",
  },
  {
    name: "Sunita Williams",
    title: "Record-Setting Spacewalk Pioneer",
    agency: "NASA",
    mission: "Expedition 14/15, Expedition 32/33, Starliner",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=600&q=80",
    bio: "Naval aviator and astronaut Sunita Williams spent 322+ days in space across multiple long-duration ISS missions, holding records for total spacewalk time by a woman.",
    country: "USA / India",
    yearsActive: "1998 - Present",
    quote: "Look at the big picture from space, and you realize how trivial our differences are.",
  },
  {
    name: "Rakesh Sharma",
    title: "First Indian Citizen in Space",
    agency: "ISRO / Soviet Space Program",
    mission: "Soyuz T-11 / Salyut 7 (April 3, 1984)",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80",
    bio: "Wing Commander Rakesh Sharma spent 7 days aboard Salyut 7 orbital station. When asked by Prime Minister Indira Gandhi how India looked from space, he famously replied: 'Saare Jahan Se Achha'.",
    country: "India",
    yearsActive: "1982 - 1987",
    quote: "Saare Jahan Se Achha (Better than the entire world).",
  },
  {
    name: "Chris Hadfield",
    title: "Commander of International Space Station",
    agency: "CSA / NASA",
    mission: "STS-74, STS-100, Expedition 34/35",
    image: "/images/user_iss_cupola.jpg",
    bio: "Colonel Chris Hadfield was the first Canadian to walk in space and served as ISS Commander, famous for his orbital scientific outreach and microgravity music.",
    country: "Canada",
    yearsActive: "1992 - 2013",
    quote: "Decide in your heart of hearts what really excites and challenges you, and start preparing yourself to execute it.",
  },
];

const spaceArticles: SpaceArticle[] = [
  {
    id: "human-spaceflight",
    title: "The Odyssey of Human Spaceflight: From Vostok to Artemis",
    category: "Space History",
    readTime: "6 min read",
    image: "/images/user_earthrise_moon.jpg",
    excerpt: "Discover the 60+ year journey of human space exploration, from Yuri Gagarin's historic 1961 orbit to Apollo lunar landings and NASA's Artemis program.",
    content: `Humanity's journey into space represents one of our species' greatest triumphs. Beginning on April 12, 1961, when Soviet cosmonaut Yuri Gagarin launched aboard Vostok 1, humans proved that life could survive in the vacuum of space.

Just eight years later, on July 20, 1969, Apollo 11 commander Neil Armstrong and lunar module pilot Buzz Aldrin walked on the Moon, witnessing the majestic Earthrise over cratered lunar highlands. 

The Space Shuttle program (1981-2011) democratized access to low Earth orbit, enabling the construction of the International Space Station (ISS)—a continuously inhabited orbital laboratory that has hosted over 270 astronauts from 21 nations since 2000.

Today, through NASA's Artemis program, SpaceX Starship, and commercial spaceflight, we stand on the precipice of returning to the Moon and venturing onward to Mars.`
  },
  {
    id: "james-webb",
    title: "Unveiling the Cosmic Dawn: How James Webb Telescope Changed Astronomy",
    category: "Astrophysics",
    readTime: "5 min read",
    image: "/images/space_nebula_hero.png",
    excerpt: "Orbiting 1 million miles from Earth at Lagrange Point 2, the James Webb Space Telescope (JWST) uses infrared sensors to peer back 13.5 billion years into cosmic history.",
    content: `Launched on Christmas Day 2021, the $10 billion James Webb Space Telescope (JWST) is the most powerful space observatory ever constructed. With its 6.5-meter gold-coated beryllium mirror, JWST sees the universe in infrared light.

This capability allows astronomers to pierce dense interstellar dust clouds and witness the formation of the very first stars and galaxies that ignited after the Big Bang, 13.5 billion years ago.

JWST is also analyzing the atmospheric chemical signatures of distant exoplanets, searching for water vapor, methane, and carbon dioxide—the potential building blocks of extraterrestrial life.`
  },
  {
    id: "planetary-guide",
    title: "Guide to Our Solar System: Mysteries of the 8 Planets",
    category: "Planetary Science",
    readTime: "7 min read",
    image: "/images/user_earth_orbit.jpg",
    excerpt: "From the scorching surface of Mercury to the frozen methane seas of Neptune and Kuiper Belt dwarf planets, explore the diverse worlds orbiting our Sun.",
    content: `Our Solar System spans over 9 billion miles across the heliosphere. 

- Mercury: The smallest terrestrial planet with extreme temperature swings (-180°C to 430°C).
- Venus: Earth's twin wrapped in dense sulfuric acid clouds with a runaway greenhouse effect reaching 465°C.
- Earth: The blue marble—the only known world in the cosmos to harbor liquid water oceans and life.
- Mars: The Red Planet, home to Olympus Mons (the solar system's tallest volcano at 21.9 km high).
- Jupiter: The gas giant containing 70% of planetary mass, featuring the 350-year-old Great Red Spot storm.
- Saturn: Famous for its intricate 282,000 km wide icy ring system and Titan, a moon with rivers of liquid methane.
- Uranus & Neptune: The ice giants driven by supersonic winds reaching 2,100 km/h.`
  },
  {
    id: "black-holes",
    title: "Monsters of the Cosmos: Supermassive Black Holes & Gravitational Waves",
    category: "Cosmology",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80",
    excerpt: "Where gravity bends space and time to infinity. Learn how Event Horizon Telescope imaged Sag A* and how LIGO detects ripples in spacetime.",
    content: `Black holes are regions of spacetime where gravity is so dense that nothing—not even light—can escape their event horizon. 

In 2019, the Event Horizon Telescope (EHT) captured the first direct image of a supermassive black hole in galaxy M87*, followed by Sagittarius A* at the center of our Milky Way in 2022.

Furthermore, LIGO and Virgo gravitational-wave observatories regularly detect invisible collisions between black holes billions of light-years away, opening a completely new sensory window onto cosmic physics.`
  }
];

export default function SpaceObservatoryResearchPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "astronauts" | "articles" | "json_workbench" | "apod" | "asteroids" | "epic" | "donki" | "exoplanets" | "images" | "eonet" | "tech"
  >("overview");

  const [selectedArticle, setSelectedArticle] = useState<SpaceArticle | null>(null);

  // Telemetry & Research Data States
  const [apod, setApod] = useState<APODData | null>(null);
  const [apodDate, setApodDate] = useState<string>("");
  const [loadingApod, setLoadingApod] = useState(true);

  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [asteroidsCount, setAsteroidsCount] = useState(0);
  const [loadingAsteroids, setLoadingAsteroids] = useState(false);
  const [hazardOnly, setHazardOnly] = useState(false);

  const [epicList, setEpicList] = useState<EPICImage[]>([]);
  const [selectedEpic, setSelectedEpic] = useState<EPICImage | null>(null);
  const [loadingEpic, setLoadingEpic] = useState(false);

  const [issData, setIssData] = useState<ISSData | null>(null);
  const [issAutoRefresh, setIssAutoRefresh] = useState(true);
  const [issHistory, setIssHistory] = useState<Array<{ lat: number; lon: number }>>([]);

  const [solarFlares, setSolarFlares] = useState<SolarFlare[]>([]);
  const [loadingDonki, setLoadingDonki] = useState(false);

  const [exoplanets, setExoplanets] = useState<Exoplanet[]>([]);
  const [exoSearch, setExoSearch] = useState("");
  const [exoMethodFilter, setExoMethodFilter] = useState("all");
  const [loadingExo, setLoadingExo] = useState(false);

  const [mediaQuery, setMediaQuery] = useState("james webb");
  const [mediaList, setMediaList] = useState<NASAImageItem[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);

  const [eonetEvents, setEonetEvents] = useState<EONETEvent[]>([]);
  const [loadingEonet, setLoadingEonet] = useState(false);

  const [fireballs, setFireballs] = useState<Fireball[]>([]);
  const [techProjects, setTechProjects] = useState<TechProject[]>([]);

  // Raw JSON Workbench State
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("apod");
  const [rawJsonData, setRawJsonData] = useState<any>(null);
  const [loadingJson, setLoadingJson] = useState(false);
  const [jsonCopied, setJsonCopied] = useState(false);

  // Modal / Preview State
  const [modalImage, setModalImage] = useState<{ url: string; title: string; desc: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Clock Ticker
  const [utcTime, setUtcTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      setUtcTime(new Date().toUTCString());
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- API Fetchers ---
  const fetchApod = async (dateStr?: string) => {
    setLoadingApod(true);
    try {
      const url = `/api/nasa?action=apod${dateStr ? `&date=${dateStr}` : ""}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success && json.data) {
        setApod(json.data);
      }
    } catch (e) {
      console.error("Fetch APOD error:", e);
    } finally {
      setLoadingApod(false);
    }
  };

  const fetchAsteroids = async () => {
    setLoadingAsteroids(true);
    try {
      const res = await fetch("/api/nasa?action=asteroids");
      const json = await res.json();
      if (json.success && json.data?.near_earth_objects) {
        setAsteroidsCount(json.data.element_count || 0);
        const dateKey = Object.keys(json.data.near_earth_objects)[0];
        const list = json.data.near_earth_objects[dateKey] || [];
        setAsteroids(list);
      }
    } catch (e) {
      console.error("Fetch Asteroids error:", e);
    } finally {
      setLoadingAsteroids(false);
    }
  };

  const fetchEpic = async () => {
    setLoadingEpic(true);
    try {
      const res = await fetch("/api/nasa?action=epic");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setEpicList(json.data);
        if (json.data.length > 0) setSelectedEpic(json.data[0]);
      }
    } catch (e) {
      console.error("Fetch EPIC error:", e);
    } finally {
      setLoadingEpic(false);
    }
  };

  const fetchISS = useCallback(async () => {
    try {
      const res = await fetch("/api/nasa?action=iss");
      const json = await res.json();
      if (json.success && json.data) {
        setIssData(json.data);
        setIssHistory((prev) => {
          const next = [...prev, { lat: json.data.latitude, lon: json.data.longitude }];
          return next.slice(-20);
        });
      }
    } catch (e) {
      console.error("Fetch ISS error:", e);
    }
  }, []);

  const fetchDonki = async () => {
    setLoadingDonki(true);
    try {
      const res = await fetch("/api/nasa?action=donki");
      const json = await res.json();
      if (json.success && json.data?.flares) {
        setSolarFlares(json.data.flares);
      }
    } catch (e) {
      console.error("Fetch DONKI error:", e);
    } finally {
      setLoadingDonki(false);
    }
  };

  const fetchExoplanets = async () => {
    setLoadingExo(true);
    try {
      const res = await fetch("/api/nasa?action=exoplanets");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setExoplanets(json.data);
      }
    } catch (e) {
      console.error("Fetch Exoplanets error:", e);
    } finally {
      setLoadingExo(false);
    }
  };

  const fetchNASAImages = async (q: string) => {
    setLoadingMedia(true);
    try {
      const res = await fetch(`/api/nasa?action=images&query=${encodeURIComponent(q)}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setMediaList(json.data);
      }
    } catch (e) {
      console.error("Fetch NASA Images error:", e);
    } finally {
      setLoadingMedia(false);
    }
  };

  const fetchEonet = async () => {
    setLoadingEonet(true);
    try {
      const res = await fetch("/api/nasa?action=eonet");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setEonetEvents(json.data);
      }
    } catch (e) {
      console.error("Fetch EONET error:", e);
    } finally {
      setLoadingEonet(false);
    }
  };

  const fetchFireballs = async () => {
    try {
      const res = await fetch("/api/nasa?action=fireballs");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setFireballs(json.data);
      }
    } catch (e) {
      console.error("Fetch Fireballs error:", e);
    }
  };

  const fetchTechport = async () => {
    try {
      const res = await fetch("/api/nasa?action=techport");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setTechProjects(json.data);
      }
    } catch (e) {
      console.error("Fetch Techport error:", e);
    }
  };

  const fetchRawEndpointJson = async (endpoint: string) => {
    setLoadingJson(true);
    try {
      const res = await fetch(`/api/nasa?action=${endpoint}`);
      const json = await res.json();
      setRawJsonData(json);
    } catch (e) {
      setRawJsonData({ error: "Failed to fetch raw payload" });
    } finally {
      setLoadingJson(false);
    }
  };

  useEffect(() => {
    fetchApod();
    fetchAsteroids();
    fetchEpic();
    fetchISS();
    fetchDonki();
    fetchExoplanets();
    fetchNASAImages("james webb");
    fetchEonet();
    fetchFireballs();
    fetchTechport();
    fetchRawEndpointJson("apod");
  }, [fetchISS]);

  useEffect(() => {
    if (!issAutoRefresh) return;
    const interval = setInterval(() => {
      fetchISS();
    }, 4000);
    return () => clearInterval(interval);
  }, [issAutoRefresh, fetchISS]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyJson = (obj: any) => {
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
    setJsonCopied(true);
    setTimeout(() => setJsonCopied(false), 2000);
  };

  const downloadJsonFile = (obj: any, filename: string) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${filename}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredAsteroids = hazardOnly
    ? asteroids.filter((a) => a.is_potentially_hazardous_asteroid)
    : asteroids;

  const filteredExoplanets = exoplanets.filter((p) => {
    const matchesSearch =
      p.pl_name.toLowerCase().includes(exoSearch.toLowerCase()) ||
      p.hostname.toLowerCase().includes(exoSearch.toLowerCase());
    const matchesMethod =
      exoMethodFilter === "all" ||
      p.discoverymethod.toLowerCase().includes(exoMethodFilter.toLowerCase());
    return matchesSearch && matchesMethod;
  });

  const issX = issData ? ((issData.longitude + 180) / 360) * 100 : 50;
  const issY = issData ? ((90 - issData.latitude) / 180) * 100 : 50;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white relative overflow-x-hidden">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* ================= STANDALONE SPACE RESEARCH HEADER ================= */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Main Space Agency Emblem & Title */}
          <div className="flex items-center gap-3.5">
            <div className="relative group cursor-pointer">
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
                <Orbit size={24} className="animate-[spin_10s_linear_infinite]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex flex-col">
                  <h1 className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight leading-none">
                    The Code Brains
                  </h1>
                  <span className="text-xs sm:text-sm font-bold text-slate-500 tracking-widest uppercase font-mono mt-1">
                    Space Research Observatory
                  </span>
                </div>
                <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono flex items-center gap-1.5 self-start mt-0.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" /> LIVE TELEMETRY
                </span>
              </div>
            </div>
          </div>

          {/* Agency Affiliation Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="bg-slate-100 text-slate-800 font-semibold px-2.5 py-1 rounded-md border border-slate-200 flex items-center gap-1.5">
              <Database size={12} className="text-slate-700" /> NASA Open Data
            </span>
            <span className="bg-slate-100 text-slate-800 font-semibold px-2.5 py-1 rounded-md border border-slate-200">
              ESA Archives
            </span>
            <span className="bg-slate-100 text-slate-800 font-semibold px-2.5 py-1 rounded-md border border-slate-200">
              ISRO Feeds
            </span>
            <span className="bg-orange-50 text-orange-950 font-bold px-2.5 py-1 rounded-md border border-orange-200 flex items-center gap-1.5 shadow-2xs">
              <svg className="w-3.5 h-3.5 fill-[#F38020]" viewBox="0 0 24 24">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
              </svg>
              Cloudflare Shield
            </span>
            <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-md border border-blue-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" /> ISS NORAD 25544
            </span>
          </div>

          {/* Quick Nav back to main portal */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden xl:block text-right font-mono text-[11px] text-slate-500">
              <div>UTC CLOCK: <span className="font-bold text-slate-900">{utcTime || "SYNCING..."}</span></div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3.5 py-2 rounded-lg transition duration-200 cursor-pointer font-mono"
            >
              <ArrowLeft size={14} className="text-slate-700" />
              <span>Main Portal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Science Portal Body */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 space-y-8 w-full z-10">
        {/* Mission Overview Hero Card */}
        <div className="relative rounded-2xl p-6 sm:p-8 border border-slate-200 bg-white shadow-xs space-y-6 overflow-hidden min-h-[320px] flex flex-col justify-center">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 font-mono">
                <span className="bg-blue-50 text-blue-700 font-bold text-[10px] px-3 py-1 rounded-full border border-blue-200 uppercase tracking-widest inline-flex items-center gap-1.5 shadow-2xs">
                  <Globe size={13} className="text-slate-700 animate-pulse" /> DEEP SPACE RESEARCH OBSERVATORY
                </span>
                <span className="bg-slate-100 text-slate-800 font-bold text-[10px] px-3 py-1 rounded-full border border-slate-200 uppercase tracking-widest inline-flex items-center gap-1.5 shadow-2xs">
                  <Database size={13} className="text-slate-700" /> HUMAN SPACEFLIGHT & TELEMETRY
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Cosmic Exploration Hub <br className="hidden sm:block" />
                <span className="text-slate-900 font-black">
                  Astronaut Pioneers & Space Science
                </span>
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Explore the cosmos through the eyes of legendary astronauts, human spaceflight missions, planetary surface analog field expeditions, and real-time NASA telemetry streams. Discover the stories of Yuri Gagarin, Neil Armstrong, Kalpana Chawla, and Sunita Williams, alongside live orbital tracking and high-res deep space photography.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
                <button
                  onClick={() => setActiveTab("astronauts")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-lg transition duration-200 flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Award size={16} /> Explore Astronaut Pioneers
                </button>
                <button
                  onClick={() => setActiveTab("articles")}
                  className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold px-4 py-2.5 rounded-lg transition duration-200 flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <FileText size={16} /> Space Science Guides
                </button>
              </div>
            </div>

            {/* Astronaut Hero Card & ISS Telemetry Widget */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0 font-mono">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm group max-w-[280px] cursor-pointer" onClick={() => setActiveTab("astronauts")}>
                <img
                  src="/images/user_astronaut_spacewalk.jpg"
                  alt="Human Spaceflight Spacewalk Astronaut"
                  className="w-full h-36 object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 text-xs">
                  <div className="text-blue-400 font-bold flex items-center gap-1">
                    <Award size={12} /> HUMAN SPACEFLIGHT
                  </div>
                  <div className="text-white font-bold text-xs">Pioneers of the Cosmos (EVA)</div>
                </div>
              </div>

              {/* ISS Live Satellite Orbital Tracker HUD Widget */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shrink-0 flex flex-col gap-2 min-w-[260px] shadow-xs relative overflow-hidden font-mono">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Satellite size={16} className="text-slate-700 animate-spin" />
                    <span>ISS LIVE POSITION</span>
                  </div>
                  <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-bold">
                    NORAD 25544
                  </span>
                </div>

                {issData ? (
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between items-center text-slate-700">
                      <span className="text-slate-500">LAT / LON:</span>
                      <span className="text-slate-900 font-bold">
                        {issData.latitude.toFixed(2)}°, {issData.longitude.toFixed(2)}°
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-slate-700">
                      <span className="text-slate-500">SPEED:</span>
                      <span className="text-blue-600 font-bold">
                        {Math.round(issData.velocity).toLocaleString()} km/h
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-[10px] text-slate-600 animate-pulse py-2 text-center">Syncing Telemetry...</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Space Navigation HUD Tabs */}
        <div className="bg-white border border-slate-200 rounded-xl p-2 flex items-center gap-2 overflow-x-auto scrollbar-none shadow-xs">
          {[
            { id: "overview", label: "Overview & Trackers", icon: Compass },
            { id: "astronauts", label: "Astronaut Pioneers", icon: Award },
            { id: "articles", label: "Space Articles & Guides", icon: FileText },
            { id: "apod", label: "APOD Gallery", icon: Sparkles },
            { id: "asteroids", label: "Asteroids & Fireballs", icon: Orbit },
            { id: "epic", label: "DSCOVR EPIC Earth", icon: Globe },
            { id: "donki", label: "Space Weather Radar", icon: Sun },
            { id: "exoplanets", label: "Exoplanet Archive", icon: Radio },
            { id: "images", label: "Global Space Media", icon: Search },
            { id: "json_workbench", label: "Raw JSON Workbench", icon: Code2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold font-mono transition duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm border border-blue-700 font-bold"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 bg-slate-50"
                }`}
              >
                <Icon size={15} className="text-current" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>


        {/* ================= TAB 1: OVERVIEW & TRACKERS ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Live SVG World Satellite Orbit Map & Celestial Target Radar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Live SVG World Map Tracker */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Globe size={18} className="text-slate-700" /> ISS Space Station World Orbital Tracking Map
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Real-time geographical position projected on global latitude/longitude grid.
                    </p>
                  </div>
                  <span className="bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> LIVE TELEMETRY
                  </span>
                </div>

                {/* SVG Tactical World Map Container */}
                <div className="relative w-full aspect-[2/1] bg-[#091122] border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
                  {/* Grid overlay */}
                  <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="light-grid" width="40" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#light-grid)" />
                  </svg>

                  {/* World Continents SVG Outline */}
                  <svg className="w-full h-full opacity-30 text-sky-400 fill-current" viewBox="0 0 1000 500">
                    <path d="M150,120 Q180,100 250,110 T300,160 T250,220 T150,200 Z M280,260 Q300,280 320,350 T280,450 T240,360 Z M450,100 Q520,90 580,130 T600,200 T480,220 T420,150 Z M520,230 Q600,240 620,320 T550,420 T480,300 Z M650,120 Q780,100 880,160 T850,240 T700,220 Z M800,320 Q880,320 900,400 T820,440 Z" />
                  </svg>

                  {/* ISS Historical Trajectory Trail */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {issHistory.length > 1 && (
                      <polyline
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        points={issHistory
                          .map((pt) => `${((pt.lon + 180) / 360) * 100}%,${((90 - pt.lat) / 180) * 100}%`)
                          .join(" ")}
                      />
                    )}
                  </svg>

                  {/* ISS Satellite Target Pinpoint */}
                  <div
                    className="absolute transition-all duration-1000 ease-linear transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ left: `${issX}%`, top: `${issY}%` }}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full border-2 border-sky-400 animate-ping absolute opacity-75" />
                      <div className="w-5 h-5 rounded-full bg-sky-500 text-white border border-sky-200 flex items-center justify-center shadow-lg">
                        <Satellite size={12} />
                      </div>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-7 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-[10px] text-sky-300 font-mono px-2.5 py-1 rounded shadow-xl whitespace-nowrap opacity-95">
                      ISS: {issData?.latitude.toFixed(1)}°, {issData?.longitude.toFixed(1)}°
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-3 text-[10px] text-slate-400 font-mono flex items-center gap-3">
                    <span>GRID: LAT/LON 15°</span>
                    <span className="text-sky-400 font-bold">TARGET: NORAD 25544</span>
                    <span className="text-sky-300 font-bold">SPEED: {issData ? Math.round(issData.velocity) : 0} KM/H</span>
                  </div>
                </div>
              </div>

              {/* Celestial Target Radar */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 font-mono">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Radar size={18} className="text-slate-700" /> Asteroid Target Radar
                  </h3>
                  <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full font-bold">
                    SCANNING
                  </span>
                </div>

                {/* Animated Circular Radar */}
                <div className="relative w-48 h-48 mx-auto rounded-full border-2 border-slate-700 bg-slate-900 flex items-center justify-center overflow-hidden shadow-inner">
                  <div className="absolute inset-0 rounded-full border border-slate-800" />
                  <div className="absolute inset-8 rounded-full border border-slate-800" />
                  <div className="absolute inset-16 rounded-full border border-slate-800" />
                  <div className="absolute w-full h-[1px] bg-slate-800" />
                  <div className="absolute h-full w-[1px] bg-slate-800" />

                  {/* Sweep line */}
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(37,99,235,0.35)_360deg)] rounded-full animate-spin [animation-duration:4s]" />

                  {/* Asteroid Blips */}
                  {asteroids.slice(0, 5).map((ast, idx) => {
                    const angle = (idx * 72) * (Math.PI / 180);
                    const dist = 30 + (idx * 8);
                    const left = 50 + dist * Math.cos(angle);
                    const top = 50 + dist * Math.sin(angle);
                    return (
                      <div
                        key={ast.id}
                        style={{ left: `${left}%`, top: `${top}%` }}
                        className="absolute w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg cursor-pointer group bg-blue-500"
                      >
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-[9px] text-slate-200 p-1 rounded whitespace-nowrap hidden group-hover:block z-20">
                          {ast.name.replace(/[\(\)]/g, "")}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-1 text-center font-mono text-[11px] text-slate-600">
                  <div>TRACKED ASTEROIDS: <span className="text-slate-900 font-bold">{asteroids.length} NEAR-EARTH</span></div>
                  <div>HAZARDOUS: <span className="text-blue-600 font-bold">{asteroids.filter(a => a.is_potentially_hazardous_asteroid).length} TARGETS</span></div>
                </div>
              </div>
            </div>

            {/* Orbital Space Photography & Astronaut Telemetry Gallery */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 font-mono">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Eye size={18} className="text-slate-700" /> 
                    <span>Orbital Space Photography & Planetary Surface Analog Expeditions</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5 font-medium">
                    High-resolution imagery captured during human extravehicular activities, ISS cupola observations, and field geology analog missions.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                  4 FIELD & ORBITAL VAULTS ACTIVE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-mono">
                {/* Image 1: Planetary Surface Analog Field Expedition (NEW USER UPLOAD) */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-2xs group hover:border-blue-500 hover:shadow-sm transition duration-200">
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src="/images/user_planetary_analog.jpg"
                      alt="Planetary Geology Analog Field Expedition"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <span className="absolute top-2 left-2 bg-slate-900/90 text-white border border-slate-700 text-[9px] font-bold px-2 py-0.5 rounded">
                      PLANETARY ANALOG EXPEDITION
                    </span>
                  </div>
                  <div className="p-3 space-y-1">
                    <h4 className="text-xs font-bold text-slate-900">Planetary Geology Analog Field Testing</h4>
                    <p className="text-[10px] text-slate-600 font-sans leading-relaxed">
                      Scientists carrying scientific payload cases across volcanic terrain analog simulating Moon and Mars EVA operations.
                    </p>
                  </div>
                </div>

                {/* Image 2: Spacewalk EVA Selfie */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-2xs group hover:border-blue-500 hover:shadow-sm transition duration-200">
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src="/images/user_astronaut_spacewalk.jpg"
                      alt="Astronaut Spacewalk EVA Helmet Reflection"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <span className="absolute top-2 left-2 bg-slate-900/90 text-white border border-slate-700 text-[9px] font-bold px-2 py-0.5 rounded">
                      EVA SPACEWALK
                    </span>
                  </div>
                  <div className="p-3 space-y-1">
                    <h4 className="text-xs font-bold text-slate-900">Extravehicular Activity (EVA) Selfie</h4>
                    <p className="text-[10px] text-slate-600 font-sans leading-relaxed">
                      Spacewalking astronaut with visor reflecting the glowing curvature of Earth and orbital sunlight.
                    </p>
                  </div>
                </div>

                {/* Image 3: ISS Cupola View */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-2xs group hover:border-blue-500 hover:shadow-sm transition duration-200">
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src="/images/user_iss_cupola.jpg"
                      alt="ISS Cupola Panoramic Observatory Window"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <span className="absolute top-2 left-2 bg-slate-900/90 text-white border border-slate-700 text-[9px] font-bold px-2 py-0.5 rounded">
                      ISS CUPOLA OBSERVATORY
                    </span>
                  </div>
                  <div className="p-3 space-y-1">
                    <h4 className="text-xs font-bold text-slate-900">ISS Orbital Observation Deck</h4>
                    <p className="text-[10px] text-slate-600 font-sans leading-relaxed">
                      7-window Cupola observatory looking down at coastal lights and atmospheric airglow from 400km.
                    </p>
                  </div>
                </div>

                {/* Image 4: Blue Marble Earth Disc */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-2xs group hover:border-blue-500 hover:shadow-sm transition duration-200">
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src="/images/user_earth_orbit.jpg"
                      alt="Blue Marble Earth From Orbit"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <span className="absolute top-2 left-2 bg-slate-900/90 text-white border border-slate-700 text-[9px] font-bold px-2 py-0.5 rounded">
                      HIGH ORBIT VIEW
                    </span>
                  </div>
                  <div className="p-3 space-y-1">
                    <h4 className="text-xs font-bold text-slate-900">Full-Disc Orbital Earth Perspective</h4>
                    <p className="text-[10px] text-slate-600 font-sans leading-relaxed">
                      Stunning blue ocean, continent cloud structures, and terminator shadow line dividing day and night.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
              {/* APOD Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} className="text-slate-700" /> APOD Photo Archive
                  </h3>
                  <span className="text-xs text-slate-500">{apod?.date || "Today"}</span>
                </div>

                {apod && apod.media_type === "image" ? (
                  <div
                    className="relative rounded-xl overflow-hidden border border-slate-200 max-h-44 group cursor-pointer"
                    onClick={() => setActiveTab("apod")}
                  >
                    <img src={apod.url} alt={apod.title} className="w-full h-44 object-cover group-hover:scale-105 transition" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-3">
                      <div className="text-xs font-bold text-white line-clamp-1">{apod.title}</div>
                    </div>
                  </div>
                ) : (
                  <div className="h-44 bg-slate-100 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">
                    Loading Astronomy Picture...
                  </div>
                )}

                <button
                  onClick={() => setActiveTab("apod")}
                  className="w-full text-xs font-bold text-slate-900 hover:underline flex items-center justify-center gap-1 pt-1 cursor-pointer"
                >
                  Open APOD Observatory <ChevronRight size={14} />
                </button>
              </div>

              {/* Solar Weather Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sun size={14} className="text-slate-700" /> Solar Weather Matrix
                  </h3>
                  <span className="text-xs bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded border border-slate-200">
                    DONKI API
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {solarFlares.slice(0, 3).map((f) => (
                    <div key={f.flrID} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-slate-900">Class {f.classType} Flare</div>
                        <div className="text-[10px] text-slate-500">Peak: {f.peakTime}</div>
                      </div>
                      <span className="text-[10px] bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded">
                        {f.sourceLocation || "Active Sun Area"}
                      </span>
                    </div>
                  ))}
                  {solarFlares.length === 0 && (
                    <div className="text-xs text-slate-500 py-4 text-center">No solar flare events logged today.</div>
                  )}
                </div>

                <button
                  onClick={() => setActiveTab("donki")}
                  className="w-full text-xs font-bold text-slate-900 hover:underline flex items-center justify-center gap-1 pt-1 cursor-pointer"
                >
                  View Space Weather Radar <ChevronRight size={14} />
                </button>
              </div>

              {/* Exoplanet Archive Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Radio size={14} className="text-slate-700" /> Exoplanet Archive
                  </h3>
                  <span className="text-xs bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded border border-slate-200">
                    {exoplanets.length}+ WORLDS
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {exoplanets.slice(0, 3).map((p, i) => (
                    <div key={i} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-slate-900">{p.pl_name}</div>
                        <div className="text-[10px] text-slate-500">Host Star: {p.hostname}</div>
                      </div>
                      <span className="text-[10px] text-slate-800 font-bold bg-slate-200 px-2 py-0.5 rounded">
                        {p.disc_year}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab("exoplanets")}
                  className="w-full text-xs font-bold text-slate-900 hover:underline flex items-center justify-center gap-1 pt-1 cursor-pointer"
                >
                  Explore Exoplanet Catalog <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Extended NASA & Aerospace Open Data Services Hub */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 font-mono">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Database size={18} className="text-slate-700" /> Integrated NASA & Aerospace Open Data Services Hub
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">
                    Direct visual access and live endpoint links to all integrated multi-agency space APIs.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  14 Live Endpoints Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
                {[
                  {
                    name: "Open Science Data Repository (OSDR)",
                    desc: "Biological payloads, spaceflight experiments, and direct file download URLs.",
                    action: "osdr_files",
                    directUrl: "/api/nasa?action=osdr_files&studyId=87",
                    badge: "OSDR Data Server",
                  },
                  {
                    name: "TechTransfer Patents & Software",
                    desc: "NASA patents, open-source engineering software, and spinoff inventions.",
                    action: "techtransfer",
                    directUrl: "/api/nasa?action=techtransfer&type=software&query=engine",
                    badge: "TechTransfer API",
                  },
                  {
                    name: "NORAD TLE Satellite Orbits",
                    desc: "Two-Line Element orbital trajectory records for Earth-orbiting satellites.",
                    action: "tle",
                    directUrl: "/api/nasa?action=tle&query=HUBBLE",
                    badge: "TLE Orbital API",
                  },
                  {
                    name: "InSight Mars Weather Telemetry",
                    desc: "Atmospheric weather, temperature, and pressure logs from Mars InSight lander.",
                    action: "mars_weather",
                    directUrl: "/api/nasa?action=mars_weather",
                    badge: "Mars InSight",
                  },
                  {
                    name: "Satellite Situation Center (SSC)",
                    desc: "Geocentric spacecraft position data within empirical geophysical regions.",
                    action: "ssc",
                    directUrl: "/api/nasa?action=ssc",
                    badge: "GSFC SSC Web",
                  },
                  {
                    name: "Moon & Mars Trek WMTS Maps",
                    desc: "Web Map Tile Service for high-res lunar & martian surface imagery tiles.",
                    action: "trek",
                    directUrl: "/api/nasa?action=trek&target=Moon",
                    badge: "JPL Trek Tiles",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-slate-400 transition duration-200 shadow-2xs">
                    <div className="space-y-1 font-sans">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-800 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono">
                          {item.badge}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="API Live" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 pt-1">{item.name}</h4>
                      <p className="text-[11px] text-slate-600 font-normal leading-normal">{item.desc}</p>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200 font-mono text-[10px]">
                      <a
                        href={item.directUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-900 hover:text-black font-bold flex items-center gap-1 hover:underline"
                      >
                        JSON Endpoint <ExternalLink size={10} />
                      </a>
                      <button
                        onClick={() => {
                          setActiveTab("json_workbench");
                          setSelectedEndpoint(item.action);
                          fetchRawEndpointJson(item.action);
                        }}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-2.5 py-1 rounded transition cursor-pointer flex items-center gap-1 shadow-2xs"
                      >
                        Inspect Payload <Code2 size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: ASTRONAUT PIONEERS GALLERY ================= */}
        {activeTab === "astronauts" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 font-mono">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Award size={22} className="text-slate-700" /> Human Spaceflight & Astronaut Pioneers
                </h2>
                <p className="text-xs text-slate-500 font-sans mt-1">
                  Honoring the brave men and women who ventured into the cosmos, orbited Earth, and walked on the Moon.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full uppercase tracking-wider">
                8 Legendary Pioneers Spotlighted
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {astronautPioneers.map((astro, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:border-slate-400 transition duration-200 flex flex-col justify-between group"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-900">
                    <img
                      src={astro.image}
                      alt={astro.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    <span className="absolute top-3 left-3 bg-slate-900/90 text-slate-200 border border-slate-700 text-[9px] font-bold font-mono px-2.5 py-0.5 rounded-full uppercase">
                      {astro.country}
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 space-y-0.5">
                      <h3 className="text-base font-black text-white">{astro.name}</h3>
                      <div className="text-[11px] font-bold text-slate-300 font-mono">{astro.title}</div>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between font-mono text-xs">
                    <div className="space-y-2 text-slate-700">
                      <div className="text-[11px] bg-white border border-slate-200 p-2 rounded text-slate-700 font-sans shadow-2xs">
                        <span className="text-slate-900 font-bold block text-[10px] uppercase font-mono">Mission Milestone:</span>
                        {astro.mission}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-sans">{astro.bio}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 space-y-2">
                      <blockquote className="text-[10px] italic text-slate-700 bg-slate-100 border-l-2 border-slate-500 pl-2 py-1 font-sans">
                        "{astro.quote}"
                      </blockquote>
                      <div className="flex justify-between items-center text-[10px] text-slate-500">
                        <span>{astro.agency}</span>
                        <span>{astro.yearsActive}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: SPACE SCIENCE ARTICLES ================= */}
        {activeTab === "articles" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs font-sans">
            <div className="border-b border-slate-200 pb-4 font-mono">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <FileText size={22} className="text-slate-700" /> Space Science Articles & Deep Space Guides
              </h2>
              <p className="text-xs text-slate-500 font-sans mt-1">
                Deep dive into human spaceflight history, astrophysics discoveries, exoplanet research, and planetary science.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {spaceArticles.map((art) => (
                <div
                  key={art.id}
                  className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:border-slate-400 transition duration-200 flex flex-col sm:flex-row group"
                >
                  <div className="sm:w-2/5 relative h-48 sm:h-auto overflow-hidden bg-slate-900">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 sm:hidden" />
                  </div>

                  <div className="sm:w-3/5 p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="bg-slate-100 text-slate-800 border border-slate-200 px-2 py-0.5 rounded font-bold uppercase">
                          {art.category}
                        </span>
                        <span className="text-slate-500">{art.readTime}</span>
                      </div>

                      <h3 className="text-base font-black text-slate-900 leading-snug group-hover:text-slate-700 transition">
                        {art.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedArticle(art)}
                      className="w-fit text-xs font-bold text-slate-900 hover:underline flex items-center gap-1 font-mono cursor-pointer pt-2"
                    >
                      Read Full Guide <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Space Article Reading Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative font-sans">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 bg-slate-100 text-slate-700 p-2 rounded-full hover:bg-slate-200 transition z-10 cursor-pointer border border-slate-300"
              >
                <X size={18} />
              </button>

              <div className="relative h-64 bg-slate-900 overflow-hidden shrink-0">
                <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 space-y-1">
                  <span className="bg-sky-950/90 text-sky-300 border border-sky-700/60 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded uppercase">
                    {selectedArticle.category} • {selectedArticle.readTime}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">{selectedArticle.title}</h2>
                </div>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto font-sans text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
                
                <div className="pt-4 border-t border-slate-200 flex justify-between items-center font-mono text-xs text-slate-500">
                  <span>The Code Brains Space Research Suite</span>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-lg transition cursor-pointer border border-slate-800"
                  >
                    Close Reader
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: RAW JSON WORKBENCH ================= */}
        {activeTab === "json_workbench" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs font-sans">
            {/* Astronaut Command Console Visual Banner */}
            <div className="relative h-44 rounded-xl overflow-hidden border border-slate-200 shadow-xs mb-4 font-mono">
              <img src="/images/user_astronaut_laptop.jpg" alt="Space Station Astronaut Laptop Console" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent flex items-center p-6" />
              <div className="absolute left-6 space-y-1">
                <span className="bg-sky-950/90 text-sky-300 border border-sky-700/60 text-[9px] font-bold px-2.5 py-0.5 rounded uppercase">
                  ORBITAL WORKSTATION TELEMETRY
                </span>
                <h3 className="text-lg font-black text-white">Space Station Command Console & Payload Workbench</h3>
                <p className="text-xs text-slate-300 font-sans max-w-lg">
                  Real-time JSON response inspection, payload structure validation, and raw data export for 14 NASA & space agency endpoints.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 font-mono">
                  <Code2 size={20} className="text-sky-600" /> Space Science Raw JSON Data Inspector
                </h2>
                <p className="text-xs text-slate-500 font-sans mt-1">
                  Inspect live raw JSON telemetry payloads from space agency APIs. Copy JSON or export dataset files.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono">
                <button
                  onClick={() => handleCopyJson(rawJsonData)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-lg border border-slate-300 flex items-center gap-1.5 transition cursor-pointer"
                >
                  {jsonCopied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span>{jsonCopied ? "JSON Copied!" : "Copy Payload"}</span>
                </button>

                <button
                  onClick={() => downloadJsonFile(rawJsonData, `space_data_${selectedEndpoint}`)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition shadow-xs cursor-pointer border border-slate-800"
                >
                  <Download size={14} className="text-sky-400" /> Export .JSON Dataset
                </button>
              </div>
            </div>

            {/* API Endpoint Pills */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4 font-mono">
              <span className="text-xs font-bold text-slate-600 mr-2 uppercase">Select Dataset Endpoint:</span>
              {[
                { id: "apod", name: "APOD Photo" },
                { id: "asteroids", name: "Asteroids NeoWs" },
                { id: "epic", name: "EPIC Earth" },
                { id: "iss", name: "ISS Telemetry" },
                { id: "donki", name: "DONKI Solar Flares" },
                { id: "exoplanets", name: "Exoplanets Archive" },
                { id: "images", name: "NASA Media Vault" },
                { id: "eonet", name: "EONET Earth Events" },
                { id: "fireballs", name: "JPL Fireballs" },
                { id: "techport", name: "Space TechPort" },
                { id: "osdr", name: "OSDR Science Studies" },
                { id: "osdr_files", name: "OSDR Study Files & Downloads" },
                { id: "techtransfer", name: "TechTransfer Patents & Software" },
                { id: "tle", name: "NORAD TLE Satellites" },
                { id: "mars_weather", name: "InSight Mars Weather" },
                { id: "ssc", name: "Satellite Situation Center" },
                { id: "trek", name: "Moon & Mars Trek WMTS" },
              ].map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => {
                    setSelectedEndpoint(ep.id);
                    fetchRawEndpointJson(ep.id);
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                    selectedEndpoint === ep.id
                      ? "bg-slate-900 text-sky-400 border-sky-800 shadow-xs"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                  }`}
                >
                  {ep.name}
                </button>
              ))}
            </div>

            {/* Code Viewer Container */}
            <div className="bg-[#091122] border border-sky-900/50 rounded-xl p-5 font-mono text-xs overflow-x-auto max-h-[500px] text-sky-300 relative shadow-inner">
              {loadingJson ? (
                <div className="h-64 flex items-center justify-center text-sky-400 animate-pulse">
                  Querying live astronomical API endpoint [{selectedEndpoint}]...
                </div>
              ) : rawJsonData ? (
                <pre>{JSON.stringify(rawJsonData, null, 2)}</pre>
              ) : null}
            </div>
          </div>
        )}

        {/* ================= TAB 3: APOD OBSERVATORY ================= */}
        {activeTab === "apod" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 font-mono">
                  <Sparkles size={20} className="text-slate-700" /> Astronomy Picture of the Day Archive
                </h2>
                <p className="text-xs text-slate-500 font-sans mt-1">Browse daily astronomical photographs from 1995 to present.</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={apodDate}
                  onChange={(e) => {
                    setApodDate(e.target.value);
                    fetchApod(e.target.value);
                  }}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg px-3 py-2 outline-none focus:border-slate-800 font-mono"
                />
                <button
                  onClick={() => {
                    setApodDate("");
                    fetchApod();
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer"
                >
                  Today
                </button>
              </div>
            </div>

            {loadingApod ? (
              <div className="h-80 bg-slate-100 rounded-xl animate-pulse flex items-center justify-center text-slate-400">
                Fetching APOD Data...
              </div>
            ) : apod ? (
              <div className="space-y-6">
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 flex items-center justify-center max-h-[500px]">
                  {apod.media_type === "image" ? (
                    <img src={apod.url} alt={apod.title} className="w-full h-full object-contain max-h-[500px]" />
                  ) : (
                    <iframe src={apod.url} title={apod.title} className="w-full h-96 border-0" />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">{apod.title}</h3>
                      <div className="text-xs text-slate-500 font-mono mt-1">
                        Date: {apod.date} {apod.copyright && `| Copyright: ${apod.copyright}`}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono">
                      <button
                        onClick={() => handleCopy(apod.hdurl || apod.url)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-lg border border-slate-300 flex items-center gap-1.5 transition cursor-pointer"
                      >
                        {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        <span>{copied ? "Copied Link" : "Copy HD Link"}</span>
                      </button>

                      {apod.hdurl && (
                        <a
                          href={apod.hdurl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition shadow-2xs"
                        >
                          <Download size={14} /> Download HD Image
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-slate-50 p-5 rounded-xl border border-slate-200">
                    {apod.explanation}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ================= TAB 4: ASTEROIDS & FIREBALLS ================= */}
        {activeTab === "asteroids" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 font-mono">
                  <Orbit size={20} className="text-slate-700" /> Near-Earth Asteroids & Meteorite Impacts
                </h2>
                <p className="text-xs text-slate-500 font-sans mt-1">Powered by NASA NeoWs API & JPL Solar System Dynamics.</p>
              </div>

              <button
                onClick={() => setHazardOnly(!hazardOnly)}
                className={`text-xs font-bold font-mono px-3.5 py-2 rounded-lg border transition cursor-pointer ${
                  hazardOnly
                    ? "bg-slate-900 text-white border-slate-950 shadow-2xs"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                }`}
              >
                {hazardOnly ? "Showing Hazardous Only" : "Filter Potentially Hazardous"}
              </button>
            </div>

            {loadingAsteroids ? (
              <div className="h-64 bg-slate-50 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-600 font-mono">
                Scanning Near-Earth Objects Database...
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAsteroids.map((ast) => {
                    const approach = ast.close_approach_data[0];
                    const kmDist = approach?.miss_distance?.kilometers
                      ? Math.round(Number(approach.miss_distance.kilometers)).toLocaleString()
                      : "N/A";
                    const velocity = approach?.relative_velocity?.kilometers_per_hour
                      ? Math.round(Number(approach.relative_velocity.kilometers_per_hour)).toLocaleString()
                      : "N/A";

                    return (
                      <div
                        key={ast.id}
                        className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 font-mono transition duration-200 shadow-2xs"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm">{ast.name.replace(/[\(\)]/g, "")}</h3>
                            <div className="text-[10px] text-slate-500">ID: {ast.id}</div>
                          </div>
                          {ast.is_potentially_hazardous_asteroid ? (
                            <span className="bg-slate-900 text-white border border-slate-800 text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                              <AlertTriangle size={10} /> HAZARDOUS
                            </span>
                          ) : (
                            <span className="bg-slate-200 text-slate-800 border border-slate-300 text-[9px] font-bold px-2 py-0.5 rounded">
                              SAFE
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 text-xs border-t border-slate-200 pt-2 text-slate-700">
                          <div className="flex justify-between">
                            <span className="text-slate-500">DIAMETER:</span>
                            <span className="text-slate-900 font-bold">
                              {Math.round(ast.estimated_diameter.meters.estimated_diameter_min)}-
                              {Math.round(ast.estimated_diameter.meters.estimated_diameter_max)}m
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">MISS DISTANCE:</span>
                            <span className="text-slate-900 font-bold">{kmDist} km</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">LUNAR DISTANCE:</span>
                            <span className="text-slate-900 font-bold">
                              {approach?.miss_distance?.lunar ? Number(approach.miss_distance.lunar).toFixed(1) : "N/A"} LD
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">VELOCITY:</span>
                            <span className="text-slate-900 font-bold">{velocity} km/h</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* JPL Fireball Table */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 font-mono">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase">
                    <Flame size={16} className="text-slate-700" /> JPL Meteorite Fireball Impact Research Log
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-600 font-bold uppercase">
                          <th className="py-2 px-3">Date & Time</th>
                          <th className="py-2 px-3">Coordinates</th>
                          <th className="py-2 px-3">Energy (Joules)</th>
                          <th className="py-2 px-3">Velocity (km/s)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-700">
                        {fireballs.slice(0, 6).map((f, i) => (
                          <tr key={i} className="hover:bg-slate-100">
                            <td className="py-2 px-3 text-slate-900 font-bold">{f.date}</td>
                            <td className="py-2 px-3">{f.lat}°, {f.lon}°</td>
                            <td className="py-2 px-3 text-slate-900 font-bold">{f.energy || "N/A"}</td>
                            <td className="py-2 px-3 text-slate-900 font-bold">{f.vel || "N/A"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: EPIC EARTH ================= */}
        {activeTab === "epic" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 font-mono">
                <Globe size={20} className="text-slate-700" /> DSCOVR Earth Satellite Camera (EPIC)
              </h2>
              <p className="text-xs text-slate-500 font-sans mt-1">Full-disc Earth photos captured 1,000,000 miles away by DSCOVR satellite.</p>
            </div>

            {loadingEpic ? (
              <div className="h-80 bg-slate-100 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">
                Retrieving DSCOVR Earth Snapshots...
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start font-mono">
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[400px]">
                  {selectedEpic && (
                    <>
                      <img src={selectedEpic.url} alt={selectedEpic.caption} className="max-h-[440px] object-contain rounded" />
                      <div className="text-xs text-slate-300 mt-3 text-center">
                        Captured: {selectedEpic.date} | Centroid Lat: {selectedEpic.coords?.lat?.toFixed(2)}°, Lon: {selectedEpic.coords?.lon?.toFixed(2)}°
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                  <div className="text-xs font-bold text-slate-700 uppercase">Select Earth Snapshot</div>
                  <div className="grid grid-cols-2 gap-2">
                    {epicList.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedEpic(item)}
                        className={`p-2 rounded-lg border text-left transition cursor-pointer ${
                          selectedEpic?.id === item.id ? "border-slate-900 bg-slate-100 font-bold" : "border-slate-200 bg-slate-50"
                        }`}
                      >
                        <img src={item.url} alt="Earth" className="w-full h-20 object-cover rounded bg-black" />
                        <div className="text-[10px] text-slate-700 mt-1 truncate">{item.date.split(" ")[1]}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 6: SPACE WEATHER ================= */}
        {activeTab === "donki" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs font-mono">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Sun size={20} className="text-slate-700" /> Space Weather & Heliophysics Matrix (DONKI)
              </h2>
              <p className="text-xs text-slate-500 font-sans mt-1">Database of Solar Flares, Coronal Mass Ejections, and Geomagnetic Disturbances.</p>
            </div>

            {loadingDonki ? (
              <div className="h-64 bg-slate-50 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-600">
                Connecting to Space Weather Radar...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {solarFlares.map((f) => (
                  <div key={f.flrID} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="bg-slate-200 text-slate-900 border border-slate-300 text-xs font-bold px-2.5 py-0.5 rounded">
                        CLASS {f.classType} FLARE
                      </span>
                      <span className="text-[10px] text-slate-500">{f.beginTime}</span>
                    </div>
                    <div className="space-y-1 text-xs text-slate-700">
                      <div>PEAK TIME: <span className="text-slate-900 font-bold">{f.peakTime}</span></div>
                      <div>SOLAR REGION: <span className="text-slate-900 font-bold">{f.sourceLocation || "Active Region"}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 7: EXOPLANETS ARCHIVE ================= */}
        {activeTab === "exoplanets" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Radio size={20} className="text-slate-700" /> Exoplanet Archive Database
                </h2>
                <p className="text-xs text-slate-500 font-sans mt-1">Confirmed extrasolar planets discovered outside our Solar System.</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search planet or star..."
                  value={exoSearch}
                  onChange={(e) => setExoSearch(e.target.value)}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg px-3 py-2 outline-none focus:border-slate-800 font-mono"
                />
                <select
                  value={exoMethodFilter}
                  onChange={(e) => setExoMethodFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg px-3 py-2 outline-none font-mono"
                >
                  <option value="all">All Methods</option>
                  <option value="transit">Transit</option>
                  <option value="radial">Radial Velocity</option>
                  <option value="imaging">Direct Imaging</option>
                </select>
              </div>
            </div>

            {loadingExo ? (
              <div className="h-64 bg-slate-50 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-600">
                Querying Exoplanet Database...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredExoplanets.map((p, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{p.pl_name}</h3>
                        <div className="text-[10px] text-slate-500">HOST STAR: {p.hostname}</div>
                      </div>
                      <span className="bg-slate-200 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-300">
                        {p.disc_year}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs border-t border-slate-200 pt-2 text-slate-700">
                      <div className="flex justify-between">
                        <span className="text-slate-500">METHOD:</span>
                        <span className="text-slate-900 font-bold">{p.discoverymethod}</span>
                      </div>
                      {p.pl_rade && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">RADIUS:</span>
                          <span className="text-slate-900 font-bold">{p.pl_rade} Earth Radii</span>
                        </div>
                      )}
                      {p.pl_orbper && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">ORBIT PERIOD:</span>
                          <span className="text-slate-900 font-bold">{Number(p.pl_orbper).toFixed(1)} Days</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 8: GLOBAL MEDIA SEARCH ================= */}
        {activeTab === "images" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Search size={20} className="text-slate-700" /> Global Space Image & Video Library
                </h2>
                <p className="text-xs text-slate-500 font-sans mt-1">Search over 140,000 space mission photos across Hubble, James Webb, Mars Rovers & Apollo.</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. James Webb, Mars, Nebula..."
                  value={mediaQuery}
                  onChange={(e) => setMediaQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchNASAImages(mediaQuery)}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg px-3 py-2 outline-none focus:border-slate-800 w-56 font-mono"
                />
                <button
                  onClick={() => fetchNASAImages(mediaQuery)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Search
                </button>
              </div>
            </div>

            {loadingMedia ? (
              <div className="h-64 bg-slate-50 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-600">
                Searching Astronomical Photo Vault...
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mediaList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setModalImage({ url: item.href, title: item.title, desc: item.description })}
                    className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden group hover:border-slate-400 transition cursor-pointer flex flex-col justify-between shadow-2xs"
                  >
                    <div className="h-40 overflow-hidden bg-slate-900 relative">
                      <img src={item.href} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                    <div className="p-3 space-y-1">
                      <h4 className="font-bold text-slate-900 text-xs line-clamp-2">{item.title}</h4>
                      <div className="text-[10px] text-slate-500">{item.center} | {item.date_created.split("T")[0]}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 9: EARTH EVENT TRACKER ================= */}
        {activeTab === "eonet" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs font-mono">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Flame size={20} className="text-slate-700" /> Earth Observatory Natural Event Tracker (EONET)
              </h2>
              <p className="text-xs text-slate-500 font-sans mt-1">Live tracking of Wildfires, Volcanoes, Storms, and Icebergs.</p>
            </div>

            {loadingEonet ? (
              <div className="h-64 bg-slate-50 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-600">
                Fetching Earth Events Data...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eonetEvents.map((evt) => (
                  <div key={evt.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-slate-900 text-xs">{evt.title}</h3>
                      <span className="bg-slate-200 text-slate-900 text-[9px] font-bold px-2 py-0.5 rounded border border-slate-300">
                        {evt.categories?.[0]?.title || "EVENT"}
                      </span>
                    </div>
                    {evt.geometry?.[0] && (
                      <div className="text-[11px] text-slate-600">
                        Date: {evt.geometry[0].date.split("T")[0]} <br />
                        Coords: {evt.geometry[0].coordinates.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 10: TECH INNOVATIONS ================= */}
        {activeTab === "tech" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs font-mono">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Cpu size={20} className="text-slate-700" /> Space Technology & Engineering Projects
              </h2>
              <p className="text-xs text-slate-500 font-sans mt-1">Database of active space technology research projects and engineering patents.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {techProjects.map((p) => (
                <div key={p.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="font-bold text-slate-900 text-xs">Space Engineering Project #{p.id}</div>
                  <div className="text-[10px] text-slate-500">Updated: {p.lastUpdated}</div>
                  <a
                    href={`https://techport.nasa.gov/view/${p.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-900 hover:underline pt-1"
                  >
                    View Project <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Image HD Modal */}
        {modalImage && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative font-sans">
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-3 right-3 bg-slate-100 text-slate-700 p-2 rounded-full hover:bg-slate-200 transition z-10 cursor-pointer border border-slate-300"
              >
                <X size={18} />
              </button>

              <div className="p-4 bg-slate-900 flex items-center justify-center max-h-[60vh]">
                <img src={modalImage.url} alt={modalImage.title} className="max-h-[60vh] object-contain" />
              </div>

              <div className="p-6 space-y-3 overflow-y-auto font-mono text-slate-900">
                <h3 className="text-xl font-black text-slate-900">{modalImage.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{modalImage.desc}</p>
                <div className="pt-2 flex justify-end">
                  <a
                    href={modalImage.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-lg inline-flex items-center gap-1.5 shadow-2xs"
                  >
                    <Download size={14} /> Open Full Resolution Image
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= MISSION CONTROL SPACE RESEARCH FOOTER ================= */}
      <footer className="bg-white border-t border-slate-200 text-slate-600 py-10 px-4 text-xs font-sans mt-12 relative z-10 shadow-inner">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Official Educational & Research Fair Use Disclaimer Box */}
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 shadow-2xs text-slate-800">
            <div className="p-2 rounded-lg bg-slate-200 text-slate-900 shrink-0 mt-0.5">
              <ShieldCheck size={20} />
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-slate-900 flex items-center gap-2 font-mono">
                EDUCATIONAL RESEARCH & NON-COMMERCIAL DATA ANALYSIS DISCLAIMER
              </h4>
              <p className="text-slate-700 leading-relaxed font-sans">
                This website and all associated space telemetry data, images, mission records, and NASA/ESA/ISRO API datasets are provided strictly for <strong>Educational Purposes, Scientific Research, Learning & Data Analysis</strong>. This platform does not make commercial claims or intend copyright infringement. All logos, trademarks, and mission names of NASA, ESA, ISRO, and NORAD belong to their respective space agencies and are presented for academic study under Fair Use Guidelines (17 U.S. Code § 107).
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2 border-t border-slate-100">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-2xs border border-slate-800">
                  <Orbit size={16} />
                </div>
                <span className="font-bold text-slate-900 tracking-tight text-sm font-mono">
                  The Code Brains Space Research Consortium
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                Serving global open data for astronomical research, orbital space telemetry, planetary science, and software engineering. Data integrated from NASA Open Data APIs, ESA Science Archives, ISRO Data Feeds, and NORAD Satellite Catalog.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
              <span className="bg-orange-50 text-orange-950 px-3 py-1.5 rounded-md border border-orange-200 font-bold flex items-center gap-1.5 shadow-2xs">
                <svg className="w-3.5 h-3.5 fill-[#F38020]" viewBox="0 0 24 24">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                </svg>
                CLOUD FLARE DDOS SHIELD: ACTIVE
              </span>
              <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md border border-slate-200 font-bold">
                STATION: GOLDSTONE DSS-14
              </span>
              <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md border border-slate-200 font-bold">
                STATION: MADRID DSS-63
              </span>
              <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md border border-slate-200 font-bold">
                STATION: CANBERRA DSS-43
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
