import { NextResponse } from "next/server";

const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action") || "apod";
  const date = searchParams.get("date");
  const query = searchParams.get("query") || "mars";

  try {
    if (action === "apod") {
      const dateQuery = date ? `&date=${date}` : "";
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}${dateQuery}`;
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error(`APOD fetch status ${res.status}`);
      const data = await res.json();
      return NextResponse.json({ success: true, data });
    }

    if (action === "asteroids") {
      const today = new Date().toISOString().split("T")[0];
      const startDate = date || today;
      const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=${NASA_API_KEY}`;
      const res = await fetch(url, { next: { revalidate: 1800 } });
      if (!res.ok) throw new Error(`Asteroids fetch status ${res.status}`);
      const data = await res.json();
      return NextResponse.json({ success: true, data });
    }

    if (action === "epic") {
      const url = `https://api.nasa.gov/EPIC/api/natural?api_key=${NASA_API_KEY}`;
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error(`EPIC status ${res.status}`);
      const data = await res.json();

      // Transform images with ready-to-render image URLs
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

      return NextResponse.json({ success: true, data: formatted });
    }

    if (action === "donki") {
      const resFlr = await fetch(`https://api.nasa.gov/DONKI/FLR?api_key=${NASA_API_KEY}`, { next: { revalidate: 1800 } });
      const resCme = await fetch(`https://api.nasa.gov/DONKI/CME?api_key=${NASA_API_KEY}`, { next: { revalidate: 1800 } });
      const flares = resFlr.ok ? await resFlr.json() : [];
      const cmes = resCme.ok ? await resCme.json() : [];

      return NextResponse.json({
        success: true,
        data: {
          flares: Array.isArray(flares) ? flares.slice(-10).reverse() : [],
          cmes: Array.isArray(cmes) ? cmes.slice(-10).reverse() : [],
        },
      });
    }

    if (action === "iss") {
      const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544", { cache: "no-store" });
      if (!res.ok) throw new Error(`ISS status ${res.status}`);
      const data = await res.json();
      return NextResponse.json({ success: true, data });
    }

    if (action === "exoplanets") {
      const url = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+top+20+pl_name,hostname,discoverymethod,disc_year,pl_orbper,pl_rade,pl_bmasse+from+ps+order+by+disc_year+desc&format=json";
      const res = await fetch(url, { next: { revalidate: 86400 } });
      if (!res.ok) throw new Error(`Exoplanets status ${res.status}`);
      const data = await res.json();
      return NextResponse.json({ success: true, data });
    }

    if (action === "images") {
      const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;
      const res = await fetch(url, { next: { revalidate: 3600 } });
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
      return NextResponse.json({ success: true, data: items });
    }

    if (action === "eonet") {
      const url = "https://eonet.gsfc.nasa.gov/api/v3/events?limit=15";
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error(`EONET status ${res.status}`);
      const data = await res.json();
      return NextResponse.json({ success: true, data: data.events || [] });
    }

    if (action === "techport") {
      const url = `https://api.nasa.gov/techport/api/projects?api_key=${NASA_API_KEY}`;
      const res = await fetch(url, { next: { revalidate: 86400 } });
      if (!res.ok) throw new Error(`Techport status ${res.status}`);
      const data = await res.json();
      const projects = (data.projects || []).slice(0, 20);
      return NextResponse.json({ success: true, data: projects });
    }

    if (action === "fireballs") {
      const url = "https://ssd-api.jpl.nasa.gov/fireball.api?limit=15";
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error(`Fireballs status ${res.status}`);
      const data = await res.json();
      const fields = data.fields || [];
      const rows = data.data || [];

      // Convert arrays to readable objects
      const fireballs = rows.map((row: any[]) => {
        const obj: any = {};
        fields.forEach((f: string, idx: number) => {
          obj[f] = row[idx];
        });
        return obj;
      });

      return NextResponse.json({ success: true, data: fireballs });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error(`[NASA API Error - ${action}]:`, error.message);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch NASA data" },
      { status: 500 }
    );
  }
}
