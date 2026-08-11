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

export default function SpaceObservatoryResearchPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "json_workbench" | "apod" | "asteroids" | "epic" | "donki" | "exoplanets" | "images" | "eonet" | "tech"
  >("overview");

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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* ================= BESPOKE STANDALONE GLOBAL SPACE RESEARCH HEADER ================= */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Main Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shrink-0">
              <Orbit size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-lg sm:text-xl text-slate-900 tracking-tight leading-none">
                  Global Space Observatory
                </h1>
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Data Science Lab
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Astronomical Research Portal & Multi-Agency Telemetry Suite
              </p>
            </div>
          </div>

          {/* Agency Affiliation Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded border border-slate-200">
              NASA Open Data
            </span>
            <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded border border-slate-200">
              ESA Archives
            </span>
            <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded border border-slate-200">
              ISRO Data Feed
            </span>
            <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> ISS NORAD 25544
            </span>
          </div>

          {/* Quick Nav back to home */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden xl:block text-right font-mono text-[11px] text-slate-500">
              <div>UTC: <span className="font-bold text-indigo-600">{utcTime || "SYNCING..."}</span></div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3.5 py-2 rounded-lg transition"
            >
              <ArrowLeft size={14} />
              <span>Main Portal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Science Portal Body */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 space-y-8 w-full">
        {/* Research Overview Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-indigo-50 text-indigo-700 font-bold text-[11px] px-3 py-1 rounded-full border border-indigo-200 uppercase tracking-wider inline-flex items-center gap-1.5">
                  <Globe size={13} className="text-indigo-600" /> Space Science Research Center
                </span>
                <span className="bg-cyan-50 text-cyan-700 font-bold text-[11px] px-3 py-1 rounded-full border border-cyan-200 uppercase tracking-wider inline-flex items-center gap-1.5">
                  <Database size={13} className="text-cyan-600" /> Real-Time Telemetry Workbench
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Global Astronomical Data Visualizer <br className="hidden sm:block" />
                <span className="text-indigo-600">& Scientific Research Workbench</span>
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Comprehensive data platform for astrophysicists, researchers, developers, and space enthusiasts. Access real-time orbital tracking for the International Space Station, Near-Earth Asteroids radar, DSCOVR satellite Earth imaging, solar weather matrix, Exoplanet Archive, 140,000+ astronomical media search, and raw JSON API workbench.
              </p>
            </div>

            {/* ISS Live Satellite Orbital Tracker Widget */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shrink-0 flex flex-col gap-3 min-w-[300px]">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Satellite size={16} className="text-indigo-600" /> ISS Orbit Telemetry
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  4s REFRESH
                </span>
              </div>

              {issData ? (
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-700">
                    <span className="text-slate-500">LATITUDE / LON:</span>
                    <span className="text-indigo-600 font-bold">
                      {issData.latitude.toFixed(2)}°, {issData.longitude.toFixed(2)}°
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="text-slate-500">ORBITAL SPEED:</span>
                    <span className="text-emerald-700 font-bold">
                      {Math.round(issData.velocity).toLocaleString()} km/h
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="text-slate-500">ALTITUDE:</span>
                    <span className="text-cyan-700 font-bold">{Math.round(issData.altitude)} km</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500 animate-pulse">Fetching ISS Orbital Coordinates...</div>
              )}
            </div>
          </div>
        </div>

        {/* Global Science Navigation Tabs */}
        <div className="bg-white border border-slate-200 rounded-xl p-2 flex items-center gap-2 overflow-x-auto scrollbar-none shadow-sm">
          {[
            { id: "overview", label: "Overview & Trackers", icon: Compass },
            { id: "json_workbench", label: "Raw JSON Workbench", icon: Code2 },
            { id: "apod", label: "APOD Photo Gallery", icon: Sparkles },
            { id: "asteroids", label: "Asteroids & Fireballs", icon: Orbit },
            { id: "epic", label: "DSCOVR EPIC Earth", icon: Globe },
            { id: "donki", label: "Space Weather Radar", icon: Sun },
            { id: "exoplanets", label: "Exoplanets Archive", icon: Radio },
            { id: "images", label: "Global Space Media", icon: Search },
            { id: "eonet", label: "Earth Event Tracker", icon: Flame },
            { id: "tech", label: "Space Tech Innovations", icon: Cpu },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon size={15} />
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
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Globe size={18} className="text-indigo-600" /> ISS Space Station World Orbital Tracking Map
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Real-time geographical position projected on global latitude/longitude grid.
                    </p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> LIVE TELEMETRY
                  </span>
                </div>

                {/* SVG Tactical World Map Container */}
                <div className="relative w-full aspect-[2/1] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
                  {/* Grid overlay */}
                  <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="light-grid" width="40" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#818cf8" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#light-grid)" />
                  </svg>

                  {/* World Continents SVG Outline */}
                  <svg className="w-full h-full opacity-40 text-indigo-400 fill-current" viewBox="0 0 1000 500">
                    <path d="M150,120 Q180,100 250,110 T300,160 T250,220 T150,200 Z M280,260 Q300,280 320,350 T280,450 T240,360 Z M450,100 Q520,90 580,130 T600,200 T480,220 T420,150 Z M520,230 Q600,240 620,320 T550,420 T480,300 Z M650,120 Q780,100 880,160 T850,240 T700,220 Z M800,320 Q880,320 900,400 T820,440 Z" />
                  </svg>

                  {/* ISS Historical Trajectory Trail */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {issHistory.length > 1 && (
                      <polyline
                        fill="none"
                        stroke="#818cf8"
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
                      <div className="w-8 h-8 rounded-full border-2 border-indigo-400 animate-ping absolute opacity-75" />
                      <div className="w-5 h-5 rounded-full bg-indigo-500 shadow-[0_0_15px_#6366f1] flex items-center justify-center text-white">
                        <Satellite size={12} />
                      </div>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-7 left-1/2 -translate-x-1/2 bg-slate-900 border border-indigo-400 text-[10px] text-indigo-300 font-mono px-2.5 py-1 rounded shadow-xl whitespace-nowrap opacity-95">
                      ISS: {issData?.latitude.toFixed(1)}°, {issData?.longitude.toFixed(1)}°
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-3 text-[10px] text-slate-400 font-mono flex items-center gap-3">
                    <span>GRID: LAT/LON 15°</span>
                    <span className="text-indigo-400">TARGET: NORAD 25544</span>
                    <span className="text-emerald-400">SPEED: {issData ? Math.round(issData.velocity) : 0} KM/H</span>
                  </div>
                </div>
              </div>

              {/* Celestial Target Radar */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Radar size={18} className="text-amber-600" /> Asteroid Target Radar
                  </h3>
                  <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold">
                    SCANNING
                  </span>
                </div>

                {/* Animated Circular Radar */}
                <div className="relative w-48 h-48 mx-auto rounded-full border-2 border-amber-500/30 bg-slate-950 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 rounded-full border border-amber-500/20" />
                  <div className="absolute inset-8 rounded-full border border-amber-500/20" />
                  <div className="absolute inset-16 rounded-full border border-amber-500/20" />
                  <div className="absolute w-full h-[1px] bg-amber-500/20" />
                  <div className="absolute h-full w-[1px] bg-amber-500/20" />

                  {/* Sweep line */}
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(245,158,11,0.4)_360deg)] rounded-full animate-spin [animation-duration:4s]" />

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
                        className={`absolute w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg cursor-pointer group ${
                          ast.is_potentially_hazardous_asteroid ? "bg-rose-500 animate-ping" : "bg-emerald-400"
                        }`}
                      >
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 text-[9px] text-white p-1 rounded whitespace-nowrap hidden group-hover:block z-20">
                          {ast.name.replace(/[\(\)]/g, "")}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-1 text-center font-mono text-[11px] text-slate-600">
                  <div>TRACKED ASTEROIDS: <span className="text-amber-600 font-bold">{asteroids.length} NEAR-EARTH</span></div>
                  <div>HAZARDOUS: <span className="text-rose-600 font-bold">{asteroids.filter(a => a.is_potentially_hazardous_asteroid).length} TARGETS</span></div>
                </div>
              </div>
            </div>

            {/* Quick Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* APOD Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} /> APOD Photo Archive
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">{apod?.date || "Today"}</span>
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
                  className="w-full text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-1 pt-1 cursor-pointer"
                >
                  Open APOD Observatory <ChevronRight size={14} />
                </button>
              </div>

              {/* Solar Weather Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Sun size={14} /> Solar Weather Matrix
                  </h3>
                  <span className="text-xs bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded border border-amber-200">
                    DONKI API
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {solarFlares.slice(0, 3).map((f) => (
                    <div key={f.flrID} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-amber-800">Class {f.classType} Flare</div>
                        <div className="text-[10px] text-slate-500">Peak: {f.peakTime}</div>
                      </div>
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
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
                  className="w-full text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-1 pt-1 cursor-pointer"
                >
                  View Space Weather Radar <ChevronRight size={14} />
                </button>
              </div>

              {/* Exoplanet Archive Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold text-purple-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Radio size={14} /> Exoplanet Archive
                  </h3>
                  <span className="text-xs bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded border border-purple-200">
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
                      <span className="text-[10px] text-purple-700 font-bold bg-purple-100 px-2 py-0.5 rounded">
                        {p.disc_year}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab("exoplanets")}
                  className="w-full text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-1 pt-1 cursor-pointer"
                >
                  Explore Exoplanet Catalog <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Extended NASA & Aerospace Open Data Services Hub */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Database size={18} className="text-indigo-600" /> Integrated NASA & Aerospace Open Data Services Hub
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Direct visual access and live endpoint links to all integrated multi-agency space APIs.
                  </p>
                </div>
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full uppercase">
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
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-indigo-300 transition">
                    <div className="space-y-1 font-sans">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                          {item.badge}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500" title="API Live" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 pt-1">{item.name}</h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-normal">{item.desc}</p>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/80 font-mono text-[10px]">
                      <a
                        href={item.directUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1 hover:underline"
                      >
                        JSON Endpoint <ExternalLink size={10} />
                      </a>
                      <button
                        onClick={() => {
                          setActiveTab("json_workbench");
                          setSelectedEndpoint(item.action);
                          fetchRawEndpointJson(item.action);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-2.5 py-1 rounded transition cursor-pointer flex items-center gap-1"
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

        {/* ================= TAB 2: RAW JSON WORKBENCH ================= */}
        {activeTab === "json_workbench" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Code2 size={20} className="text-indigo-600" /> Space Science Raw JSON Data Inspector
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Inspect raw JSON data payloads returned by live astronomical APIs. Copy JSON or export dataset files.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyJson(rawJsonData)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-lg border border-slate-300 flex items-center gap-1.5 transition cursor-pointer"
                >
                  {jsonCopied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span>{jsonCopied ? "JSON Copied!" : "Copy Payload"}</span>
                </button>

                <button
                  onClick={() => downloadJsonFile(rawJsonData, `space_data_${selectedEndpoint}`)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download size={14} /> Export .JSON Dataset
                </button>
              </div>
            </div>

            {/* API Endpoint Pills */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-slate-500 mr-2 uppercase">Select Dataset Endpoint:</span>
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
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {ep.name}
                </button>
              ))}
            </div>

            {/* Code Viewer Container */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 font-mono text-xs overflow-x-auto max-h-[500px] text-cyan-300 relative shadow-inner">
              {loadingJson ? (
                <div className="h-64 flex items-center justify-center text-slate-400 animate-pulse">
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
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Sparkles size={20} className="text-indigo-600" /> Astronomy Picture of the Day Archive
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">Browse daily astronomical photographs from 1995 to present.</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={apodDate}
                  onChange={(e) => {
                    setApodDate(e.target.value);
                    fetchApod(e.target.value);
                  }}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg px-3 py-2 outline-none focus:border-indigo-600 font-mono"
                />
                <button
                  onClick={() => {
                    setApodDate("");
                    fetchApod();
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer"
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
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-950 flex items-center justify-center max-h-[500px]">
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

                    <div className="flex items-center gap-2">
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
                          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition"
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
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Orbit size={20} className="text-amber-600" /> Near-Earth Asteroids & Meteorite Impacts
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">Powered by NASA NeoWs API & JPL Solar System Dynamics.</p>
              </div>

              <button
                onClick={() => setHazardOnly(!hazardOnly)}
                className={`text-xs font-bold px-3.5 py-2 rounded-lg border transition cursor-pointer ${
                  hazardOnly
                    ? "bg-rose-100 text-rose-800 border-rose-300"
                    : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                }`}
              >
                {hazardOnly ? "Showing Hazardous Only" : "Filter Potentially Hazardous"}
              </button>
            </div>

            {loadingAsteroids ? (
              <div className="h-64 bg-slate-100 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">
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
                        className={`bg-slate-50 border rounded-xl p-4 space-y-3 font-mono ${
                          ast.is_potentially_hazardous_asteroid ? "border-rose-300 bg-rose-50/40" : "border-slate-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm">{ast.name.replace(/[\(\)]/g, "")}</h3>
                            <div className="text-[10px] text-slate-500">ID: {ast.id}</div>
                          </div>
                          {ast.is_potentially_hazardous_asteroid ? (
                            <span className="bg-rose-100 text-rose-800 border border-rose-300 text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                              <AlertTriangle size={10} /> HAZARDOUS
                            </span>
                          ) : (
                            <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded">
                              SAFE
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 text-xs border-t border-slate-200 pt-2 text-slate-700">
                          <div className="flex justify-between">
                            <span className="text-slate-500">DIAMETER:</span>
                            <span className="text-amber-700 font-bold">
                              {Math.round(ast.estimated_diameter.meters.estimated_diameter_min)}-
                              {Math.round(ast.estimated_diameter.meters.estimated_diameter_max)}m
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">MISS DISTANCE:</span>
                            <span className="text-indigo-600 font-bold">{kmDist} km</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">LUNAR DISTANCE:</span>
                            <span className="text-purple-700 font-bold">
                              {approach?.miss_distance?.lunar ? Number(approach.miss_distance.lunar).toFixed(1) : "N/A"} LD
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">VELOCITY:</span>
                            <span className="text-emerald-700 font-bold">{velocity} km/h</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* JPL Fireball Table */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 font-mono">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase">
                    <Flame size={16} className="text-orange-600" /> JPL Meteorite Fireball Impact Research Log
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase">
                          <th className="py-2 px-3">Date & Time</th>
                          <th className="py-2 px-3">Coordinates</th>
                          <th className="py-2 px-3">Energy (Joules)</th>
                          <th className="py-2 px-3">Velocity (km/s)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-700">
                        {fireballs.slice(0, 6).map((f, i) => (
                          <tr key={i} className="hover:bg-slate-100">
                            <td className="py-2 px-3 text-indigo-600 font-bold">{f.date}</td>
                            <td className="py-2 px-3">{f.lat}°, {f.lon}°</td>
                            <td className="py-2 px-3 text-amber-700 font-bold">{f.energy || "N/A"}</td>
                            <td className="py-2 px-3 text-emerald-700 font-bold">{f.vel || "N/A"}</td>
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
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Globe size={20} className="text-indigo-600" /> DSCOVR Earth Satellite Camera (EPIC)
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">Full-disc Earth photos captured 1,000,000 miles away by DSCOVR satellite.</p>
            </div>

            {loadingEpic ? (
              <div className="h-80 bg-slate-100 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">
                Retrieving DSCOVR Earth Snapshots...
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start font-mono">
                <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[400px]">
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
                          selectedEpic?.id === item.id ? "border-indigo-600 bg-indigo-50" : "border-slate-200 bg-slate-50"
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
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm font-mono">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Sun size={20} className="text-amber-600" /> Space Weather & Heliophysics Matrix (DONKI)
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">Database of Solar Flares, Coronal Mass Ejections, and Geomagnetic Disturbances.</p>
            </div>

            {loadingDonki ? (
              <div className="h-64 bg-slate-100 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">
                Connecting to Space Weather Radar...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {solarFlares.map((f) => (
                  <div key={f.flrID} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold px-2.5 py-0.5 rounded">
                        CLASS {f.classType} FLARE
                      </span>
                      <span className="text-[10px] text-slate-500">{f.beginTime}</span>
                    </div>
                    <div className="space-y-1 text-xs text-slate-700">
                      <div>PEAK TIME: <span className="text-indigo-600 font-bold">{f.peakTime}</span></div>
                      <div>SOLAR REGION: <span className="text-purple-700 font-bold">{f.sourceLocation || "Active Region"}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 7: EXOPLANETS ARCHIVE ================= */}
        {activeTab === "exoplanets" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Radio size={20} className="text-purple-600" /> Exoplanet Archive Database
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">Confirmed extrasolar planets discovered outside our Solar System.</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search planet or star..."
                  value={exoSearch}
                  onChange={(e) => setExoSearch(e.target.value)}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg px-3 py-2 outline-none focus:border-indigo-600"
                />
                <select
                  value={exoMethodFilter}
                  onChange={(e) => setExoMethodFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg px-3 py-2 outline-none"
                >
                  <option value="all">All Methods</option>
                  <option value="transit">Transit</option>
                  <option value="radial">Radial Velocity</option>
                  <option value="imaging">Direct Imaging</option>
                </select>
              </div>
            </div>

            {loadingExo ? (
              <div className="h-64 bg-slate-100 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">
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
                      <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-300">
                        {p.disc_year}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs border-t border-slate-200 pt-2 text-slate-700">
                      <div className="flex justify-between">
                        <span className="text-slate-500">METHOD:</span>
                        <span className="text-indigo-600 font-bold">{p.discoverymethod}</span>
                      </div>
                      {p.pl_rade && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">RADIUS:</span>
                          <span className="text-amber-700 font-bold">{p.pl_rade} Earth Radii</span>
                        </div>
                      )}
                      {p.pl_orbper && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">ORBIT PERIOD:</span>
                          <span className="text-emerald-700 font-bold">{Number(p.pl_orbper).toFixed(1)} Days</span>
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
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Search size={20} className="text-indigo-600" /> Global Space Image & Video Library
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">Search over 140,000 space mission photos across Hubble, James Webb, Mars Rovers & Apollo.</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. James Webb, Mars, Nebula..."
                  value={mediaQuery}
                  onChange={(e) => setMediaQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchNASAImages(mediaQuery)}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg px-3 py-2 outline-none focus:border-indigo-600 w-56"
                />
                <button
                  onClick={() => fetchNASAImages(mediaQuery)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Search
                </button>
              </div>
            </div>

            {loadingMedia ? (
              <div className="h-64 bg-slate-100 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">
                Searching Astronomical Photo Vault...
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mediaList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setModalImage({ url: item.href, title: item.title, desc: item.description })}
                    className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden group hover:border-indigo-600 transition cursor-pointer flex flex-col justify-between"
                  >
                    <div className="h-40 overflow-hidden bg-slate-950 relative">
                      <img src={item.href} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
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
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm font-mono">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Flame size={20} className="text-orange-600" /> Earth Observatory Natural Event Tracker (EONET)
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">Live tracking of Wildfires, Volcanoes, Storms, and Icebergs.</p>
            </div>

            {loadingEonet ? (
              <div className="h-64 bg-slate-100 rounded-xl animate-pulse flex items-center justify-center text-xs text-slate-400">
                Fetching Earth Events Data...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {eonetEvents.map((evt) => (
                  <div key={evt.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-slate-900 text-xs">{evt.title}</h3>
                      <span className="bg-orange-100 text-orange-800 text-[9px] font-bold px-2 py-0.5 rounded border border-orange-300">
                        {evt.categories?.[0]?.title || "EVENT"}
                      </span>
                    </div>
                    {evt.geometry?.[0] && (
                      <div className="text-[11px] text-slate-500">
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
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm font-mono">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Cpu size={20} className="text-emerald-600" /> Space Technology & Engineering Projects
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">Database of active space technology research projects and engineering patents.</p>
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
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:underline pt-1"
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
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative font-sans">
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-3 right-3 bg-slate-900 text-white p-2 rounded-full hover:bg-slate-800 transition z-10 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="p-4 bg-slate-950 flex items-center justify-center max-h-[60vh]">
                <img src={modalImage.url} alt={modalImage.title} className="max-h-[60vh] object-contain" />
              </div>

              <div className="p-6 space-y-3 overflow-y-auto">
                <h3 className="text-xl font-black text-slate-900">{modalImage.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{modalImage.desc}</p>
                <div className="pt-2 flex justify-end">
                  <a
                    href={modalImage.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg inline-flex items-center gap-1.5"
                  >
                    <Download size={14} /> Open Full Resolution Image
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= BESPOKE STANDALONE GLOBAL SPACE RESEARCH FOOTER ================= */}
      <footer className="bg-white border-t border-slate-200 text-slate-600 py-10 px-4 text-xs font-sans mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                <Orbit size={14} />
              </div>
              <span className="font-bold text-slate-900 tracking-tight text-sm">
                Global Space Observatory Data Consortium
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
              Serving global open data for astronomical research, orbital space telemetry, planetary science, and software engineering. Data integrated from NASA Open Data APIs, ESA Science Archives, ISRO Data Feeds, and NORAD Satellite Catalog.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded border border-slate-200">
              STATION: GOLDSTONE DSS-14
            </span>
            <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded border border-slate-200">
              STATION: MADRID DSS-63
            </span>
            <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded border border-slate-200">
              STATION: CANBERRA DSS-43
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
