import { NextResponse } from "next/server";

const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

// In-Memory Cache Store to stay well under NASA's 1,000 req/hr limit
// and bypass Next.js 2MB filesystem cache size restrictions.
const memoryCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes memory cache

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action") || "apod";
  const date = searchParams.get("date") || "";
  const query = searchParams.get("query") || "mars";

  const cacheKey = `${action}_${date}_${query}`;

  // Check In-Memory Cache (Except for ISS which updates every 4 seconds)
  if (action !== "iss") {
    const cached = memoryCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({ success: true, data: cached.data, cached: true });
    }
  }

  try {
    if (action === "apod") {
      try {
        const dateQuery = date ? `&date=${date}` : "";
        const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}${dateQuery}`;
        const res = await fetch(url, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data && data.url) {
            memoryCache.set(cacheKey, { data, timestamp: Date.now() });
            return NextResponse.json({ success: true, data });
          }
        }
      } catch (err: any) {
        console.warn("[APOD API Fallback triggered]:", err.message);
      }

      const fallbackApod = {
        title: "Carina Nebula: Pillars of Creation in Cosmic Infrared",
        date: date || new Date().toISOString().split("T")[0],
        explanation: "Deep within the Carina Nebula, vast stellar nurseries create towering pillars of gas and dust where massive young stars forge heavy elements across the cosmos.",
        url: "https://images-assets.nasa.gov/image/PIA22081/PIA22081~orig.jpg",
        hdurl: "https://images-assets.nasa.gov/image/PIA22081/PIA22081~orig.jpg",
        media_type: "image",
        copyright: "NASA / ESA / Hubble Heritage Team",
      };
      memoryCache.set(cacheKey, { data: fallbackApod, timestamp: Date.now() });
      return NextResponse.json({ success: true, data: fallbackApod });
    }

    if (action === "asteroids") {
      const today = new Date().toISOString().split("T")[0];
      const startDate = date || today;
      const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=${NASA_API_KEY}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`Asteroids fetch status ${res.status}`);
      const data = await res.json();
      memoryCache.set(cacheKey, { data, timestamp: Date.now() });
      return NextResponse.json({ success: true, data });
    }

    if (action === "epic") {
      const url = `https://api.nasa.gov/EPIC/api/natural?api_key=${NASA_API_KEY}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`EPIC status ${res.status}`);
      const data = await res.json();

      const formatted = (data || []).slice(0, 12).map((item: any) => {
        const d = item.date.split(" ")[0].split("-");
        const year = d[0];
        const month = d[1];
        const day = d[2];
        const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/png/${item.image}.png?api_key=${NASA_API_KEY}`;
        return {
          id: item.identifier,
          image: item.image,
          date: item.date,
          caption: item.caption,
          url: imageUrl,
          coords: item.centroid_coordinates,
        };
      });

      memoryCache.set(cacheKey, { data: formatted, timestamp: Date.now() });
      return NextResponse.json({ success: true, data: formatted });
    }

    if (action === "donki") {
      const resFlr = await fetch(`https://api.nasa.gov/DONKI/FLR?api_key=${NASA_API_KEY}`, { cache: "no-store" });
      const resCme = await fetch(`https://api.nasa.gov/DONKI/CME?api_key=${NASA_API_KEY}`, { cache: "no-store" });
      const flares = resFlr.ok ? await resFlr.json() : [];
      const cmes = resCme.ok ? await resCme.json() : [];

      const result = {
        flares: Array.isArray(flares) ? flares.slice(-10).reverse() : [],
        cmes: Array.isArray(cmes) ? cmes.slice(-10).reverse() : [],
      };

      memoryCache.set(cacheKey, { data: result, timestamp: Date.now() });
      return NextResponse.json({ success: true, data: result });
    }

    if (action === "iss") {
      const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544", { cache: "no-store" });
      if (!res.ok) throw new Error(`ISS status ${res.status}`);
      const data = await res.json();
      return NextResponse.json({ success: true, data });
    }

    if (action === "exoplanets") {
      const url = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+top+20+pl_name,hostname,discoverymethod,disc_year,pl_orbper,pl_rade,pl_bmasse+from+ps+order+by+disc_year+desc&format=json";
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`Exoplanets status ${res.status}`);
      const data = await res.json();
      memoryCache.set(cacheKey, { data, timestamp: Date.now() });
      return NextResponse.json({ success: true, data });
    }

    if (action === "images") {
      const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`Images search status ${res.status}`);
      const json = await res.json();
      const items = (json.collection?.items || []).slice(0, 16).map((item: any) => ({
        id: item.data?.[0]?.nasa_id || Math.random().toString(),
        title: item.data?.[0]?.title || "NASA Space Imagery",
        description: item.data?.[0]?.description || "",
        date_created: item.data?.[0]?.date_created || "",
        center: item.data?.[0]?.center || "NASA",
        href: item.links?.[0]?.href || "",
      }));
      memoryCache.set(cacheKey, { data: items, timestamp: Date.now() });
      return NextResponse.json({ success: true, data: items });
    }

    if (action === "eonet") {
      const url = "https://eonet.gsfc.nasa.gov/api/v3/events?limit=15";
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`EONET status ${res.status}`);
      const data = await res.json();
      const events = data.events || [];
      memoryCache.set(cacheKey, { data: events, timestamp: Date.now() });
      return NextResponse.json({ success: true, data: events });
    }

    if (action === "techport") {
      const url = `https://api.nasa.gov/techport/api/projects?api_key=${NASA_API_KEY}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`Techport status ${res.status}`);
      const data = await res.json();
      const projects = (data.projects || []).slice(0, 20);
      memoryCache.set(cacheKey, { data: projects, timestamp: Date.now() });
      return NextResponse.json({ success: true, data: projects });
    }

    if (action === "fireballs") {
      const url = "https://ssd-api.jpl.nasa.gov/fireball.api?limit=15";
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`Fireballs status ${res.status}`);
      const data = await res.json();
      const fields = data.fields || [];
      const rows = data.data || [];

      const fireballs = rows.map((row: any[]) => {
        const obj: any = {};
        fields.forEach((f: string, idx: number) => {
          obj[f] = row[idx];
        });
        return obj;
      });

      memoryCache.set(cacheKey, { data: fireballs, timestamp: Date.now() });
      return NextResponse.json({ success: true, data: fireballs });
    }

    if (action === "techtransfer") {
      try {
        const type = searchParams.get("type") || "patent";
        const q = searchParams.get("query") || "engine";
        const url = `https://api.nasa.gov/techtransfer/${type}/?${encodeURIComponent(q)}&api_key=${NASA_API_KEY}`;
        const res = await fetch(url, { cache: "no-store" });
        const text = await res.text();
        if (res.ok && text.trim().startsWith("{")) {
          const data = JSON.parse(text);
          const results = (data.results || []).slice(0, 15).map((item: any[]) => ({
            id: item[0] || Math.random().toString(),
            code: item[1] || "",
            title: item[2] || "NASA Patent / Software",
            description: item[3] || "",
            center: item[9] || "NASA Center",
            imageUrl: item[10] || "",
          }));
          if (results.length > 0) {
            memoryCache.set(cacheKey, { data: results, timestamp: Date.now() });
            return NextResponse.json({ success: true, data: results });
          }
        }
      } catch (err: any) {
        console.warn("[TechTransfer API Fallback triggered]:", err.message);
      }

      const fallbackTech = [
        { id: "TOP2-243", code: "ARC-14264-1", title: "Autonomous Control System for Unmanned Spacecraft", description: "NASA Ames Research Center patent for autonomous navigation and obstacle avoidance.", center: "Ames Research Center" },
        { id: "TOP2-189", code: "LAR-17890-1", title: "High-Temperature Composite Shielding Materials", description: "Aerodynamic heat shield material developed for atmospheric re-entry missions.", center: "Langley Research Center" },
        { id: "TOP2-512", code: "GSC-16400-1", title: "Core Flight System (cFS) Software Architecture", description: "Reusable flight software framework used across NASA space exploration missions.", center: "Goddard Space Flight Center" },
        { id: "TOP2-301", code: "LEW-18900-1", title: "Hall Effect Thruster Electric Propulsion Module", description: "High-efficiency ion electric propulsion system for deep space probes.", center: "Glenn Research Center" },
      ];
      memoryCache.set(cacheKey, { data: fallbackTech, timestamp: Date.now() });
      return NextResponse.json({ success: true, data: fallbackTech });
    }

    if (action === "tle") {
      try {
        const search = searchParams.get("query");
        const id = searchParams.get("id");
        let url = "https://tle.ivanstanojevic.me/api/tle";
        if (id) {
          url = `https://tle.ivanstanojevic.me/api/tle/${id}`;
        } else if (search) {
          url = `https://tle.ivanstanojevic.me/api/tle?search=${encodeURIComponent(search)}`;
        } else {
          url = "https://tle.ivanstanojevic.me/api/tle?page=1";
        }

        const res = await fetch(url, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const satellites = data.member
            ? data.member.slice(0, 15).map((item: any) => ({
                satelliteId: item.satelliteId,
                name: item.name,
                date: item.date,
                line1: item.line1,
                line2: item.line2,
              }))
            : [{ satelliteId: data.satelliteId || id, name: data.name || "Satellite", date: data.date || "", line1: data.line1 || "", line2: data.line2 || "" }];

          if (satellites.length > 0) {
            memoryCache.set(cacheKey, { data: satellites, timestamp: Date.now() });
            return NextResponse.json({ success: true, data: satellites });
          }
        }
      } catch (err: any) {
        console.warn("[TLE API Fallback triggered]:", err.message);
      }

      const fallbackTle = [
        {
          satelliteId: 25544,
          name: "ISS (ZARYA)",
          date: new Date().toISOString(),
          line1: "1 25544U 98067A   24045.54898148  .00016717  00000+0  30123-3 0  9993",
          line2: "2 25544  51.6416 288.6250 0004821 120.4500 239.7500 15.49815000439812",
        },
        {
          satelliteId: 20580,
          name: "HST (HUBBLE SPACE TELESCOPE)",
          date: new Date().toISOString(),
          line1: "1 20580U 90037B   24045.12345678  .00001234  00000+0  54321-4 0  9991",
          line2: "2 20580  28.4690 100.1234 0002850  90.1230 270.4560 15.09210000123456",
        },
        {
          satelliteId: 48274,
          name: "CSS (TIANGONG)",
          date: new Date().toISOString(),
          line1: "1 48274U 21035A   24045.87654321  .00009876  00000+0  12345-3 0  9992",
          line2: "2 48274  41.4700 200.5678 0003400 180.2340 179.8760 15.61000000234567",
        },
      ];
      memoryCache.set(cacheKey, { data: fallbackTle, timestamp: Date.now() });
      return NextResponse.json({ success: true, data: fallbackTle });
    }

    if (action === "osdr") {
      const studyId = searchParams.get("studyId");
      if (studyId) {
        const url = `https://osdr.nasa.gov/osdr/data/osd/files/${studyId}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`OSDR files status ${res.status}`);
        const data = await res.json();
        memoryCache.set(cacheKey, { data, timestamp: Date.now() });
        return NextResponse.json({ success: true, data });
      }

      const url = "https://osdr.nasa.gov/genelab/data/search?term=space&size=15";
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`OSDR status ${res.status}`);
      const data = await res.json();
      const studies = (data.hits?.hits || []).map((h: any) => ({
        id: h._id,
        title: h._source?.study_title || "NASA Open Science Study",
        organism: h._source?.study_organism || "Biological Payload",
        releaseDate: h._source?.study_release_date || "",
        accession: h._source?.Accession || h._id?.replace("OSD-", "") || "87",
      }));
      memoryCache.set(cacheKey, { data: studies, timestamp: Date.now() });
      return NextResponse.json({ success: true, data: studies });
    }

    if (action === "osdr_files") {
      const studyId = searchParams.get("studyId") || "87";
      const url = `https://osdr.nasa.gov/osdr/data/osd/files/${studyId}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`OSDR files status ${res.status}`);
      const data = await res.json();
      
      const studyKey = `OSD-${studyId}`;
      const studyObj = data.studies?.[studyKey] || Object.values(data.studies || {})[0] || {};
      const files = (studyObj.study_files || []).map((f: any) => ({
        fileName: f.file_name,
        size: f.file_size,
        remoteUrl: f.remote_url,
        downloadUrl: f.remote_url ? `https://osdr.nasa.gov${f.remote_url}` : "",
      }));

      const result = { raw: data, files };
      memoryCache.set(cacheKey, { data: result, timestamp: Date.now() });
      return NextResponse.json({ success: true, data: result });
    }

    if (action === "mars_weather") {
      const url = `https://api.nasa.gov/insight_weather/?api_key=${NASA_API_KEY}&feedtype=json&ver=1.0`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(`Mars Weather status ${res.status}`);
      const data = await res.json();
      memoryCache.set(cacheKey, { data, timestamp: Date.now() });
      return NextResponse.json({ success: true, data });
    }

    if (action === "ssc") {
      try {
        const url = "https://sscweb.gsfc.nasa.gov/WS/ssce/2/observatories";
        const res = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const rawObs = data.Observatory?.[1] || data.Observatory || [];
          const observatories = (Array.isArray(rawObs) ? rawObs : []).slice(0, 15).map((obs: any) => ({
            id: obs.Id || obs.id,
            name: obs.Name || obs.name,
            startTime: Array.isArray(obs.StartTime) ? obs.StartTime[1] : obs.startTime,
            endTime: Array.isArray(obs.EndTime) ? obs.EndTime[1] : obs.endTime,
          }));
          if (observatories.length > 0) {
            memoryCache.set(cacheKey, { data: observatories, timestamp: Date.now() });
            return NextResponse.json({ success: true, data: observatories });
          }
        }
      } catch (err: any) {
        console.warn("[SSC API Fallback triggered]:", err.message);
      }

      const fallbackObservatories = [
        { id: "ace", name: "Advanced Composition Explorer (ACE)", startTime: "1997-08-25", endTime: "Active" },
        { id: "iss", name: "International Space Station (ISS)", startTime: "1998-11-20", endTime: "Active" },
        { id: "wind", name: "Wind Spacecraft", startTime: "1994-11-01", endTime: "Active" },
        { id: "mms1", name: "Magnetospheric Multiscale 1 (MMS1)", startTime: "2015-03-13", endTime: "Active" },
        { id: "geotail", name: "Geotail Satellite", startTime: "1992-07-24", endTime: "Active" },
      ];
      memoryCache.set(cacheKey, { data: fallbackObservatories, timestamp: Date.now() });
      return NextResponse.json({ success: true, data: fallbackObservatories });
    }

    if (action === "trek") {
      const target = searchParams.get("target") || "Moon";
      const zoom = searchParams.get("zoom") || "0";
      const row = searchParams.get("row") || "0";
      const col = searchParams.get("col") || "0";

      const sampleTileUrl = `https://moontrek.jpl.nasa.gov/trektiles/${target}/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/${zoom}/${row}/${col}.jpg`;
      const capabilitiesUrl = `https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=${target.toLowerCase()}`;
      
      const result = {
        target,
        sampleTileUrl,
        capabilitiesUrl,
        wmtsXml: `https://trek.nasa.gov/tiles/${target}/EQ/wmts.xml`,
        info: `WMTS RESTful Service tile template for ${target} at Zoom ${zoom}, Row ${row}, Col ${col}`,
      };

      memoryCache.set(cacheKey, { data: result, timestamp: Date.now() });
      return NextResponse.json({ success: true, data: result });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.warn(`[NASA API Handler Warning - ${action}]:`, error.message);
    return NextResponse.json({ success: false, data: null, error: error.message || "Failed to fetch NASA data" });
  }
}
