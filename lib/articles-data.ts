// lib/articles-data.ts
// Fully static content for every listing page. No fetch, no CMS.

export interface Article {
  id: string;
  tag: string; // small colored pill, e.g. "ANTIVIRUS"
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string; // solid-color placeholder key, see ArticleThumb component
}

export interface CategoryPage {
  title: string; // page H1, e.g. "Phones Best Picks"
  breadcrumb: string[]; // e.g. ["Phones", "Phones Best Picks"]
  articles: Article[];
}

// Hand-written content for the pages we want to look fully "real".
const curated: Record<string, CategoryPage> = {
  "/phones/best-picks": {
    title: "Phones Best Picks",
    breadcrumb: ["Phones", "Phones Best Picks"],
    articles: [
      {
        id: "1",
        tag: "ANTIVIRUS",
        title: "The best Android antivirus apps in 2026",
        excerpt:
          "The top Android antivirus apps guard against malware and typically bundle in a VPN, password manager and phishing protection.",
        author: "Priya Sharma",
        date: "Jul 8, 2026",
        image: "rose",
      },
      {
        id: "2",
        tag: "ONEPLUS PHONES",
        title: "Best OnePlus phones in 2026",
        excerpt:
          "Looking for a flagship Android phone without the flagship price tag? Here's every OnePlus model worth buying right now.",
        author: "Arjun Mehta",
        date: "Jul 2, 2026",
        image: "slate",
      },
      {
        id: "3",
        tag: "PHONES",
        title: "I love big phones and I cannot lie — here are the best you can buy right now",
        excerpt:
          "Big screens, bigger batteries. These are the best phones with 6.5-inch-plus displays for binge-watching and gaming.",
        author: "Priya Sharma",
        date: "Jul 2, 2026",
        image: "amber",
      },
      {
        id: "4",
        tag: "PHONES",
        title: "Best phones 2026 tested — our top picks ranked",
        excerpt:
          "We buy, test and rank every major phone launch so you don't have to. Here's this year's definitive list.",
        author: "Dev Kapoor",
        date: "Jun 29, 2026",
        image: "teal",
      },
    ],
  },
  "/tv-audio/tv-best-picks": {
    title: "TV Best Picks",
    breadcrumb: ["TV & Audio", "TV Best Picks"],
    articles: [
      {
        id: "1",
        tag: "OLED TVS",
        title: "Best OLED TVs in 2026 — tested and ranked",
        excerpt:
          "Inky blacks, punchy contrast. Here are the OLED TVs worth your money this year, from budget to reference-grade.",
        author: "Neha Verma",
        date: "Jul 10, 2026",
        image: "slate",
      },
      {
        id: "2",
        tag: "TV DEALS",
        title: "The best TV deals live right now",
        excerpt:
          "We track prices across every major retailer so you know exactly when a discount is actually worth grabbing.",
        author: "Rohan Gupta",
        date: "Jul 9, 2026",
        image: "amber",
      },
      {
        id: "3",
        tag: "QLED TVS",
        title: "Best QLED TVs for bright rooms in 2026",
        excerpt:
          "If your living room gets a lot of sunlight, these QLED sets fight glare best without sacrificing color.",
        author: "Neha Verma",
        date: "Jul 4, 2026",
        image: "rose",
      },
    ],
  },
  "/computing/best-laptops": {
    title: "Best Laptops",
    breadcrumb: ["Computing", "Best Laptops"],
    articles: [
      {
        id: "1",
        tag: "LAPTOPS",
        title: "Best laptops in 2026, tested by our team",
        excerpt:
          "From ultraportables to creator workstations, these are the laptops we'd actually buy with our own money.",
        author: "Karan Malhotra",
        date: "Jul 11, 2026",
        image: "teal",
      },
      {
        id: "2",
        tag: "GAMING LAPTOPS",
        title: "Best gaming laptops for every budget",
        excerpt:
          "High refresh rates and serious GPUs without needing a second mortgage — here's what we'd recommend.",
        author: "Karan Malhotra",
        date: "Jul 6, 2026",
        image: "slate",
      },
    ],
  },
};

const palette = ["rose", "slate", "amber", "teal", "indigo", "emerald"];

// Turns "/phones/best-camera-phones" into a readable "Best Camera Phones" title.
function titleFromHref(href: string): string {
  const parts = href.split("/").filter(Boolean);
  const last = parts[parts.length - 1] ?? "";
  return last
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function categoryFromHref(href: string): string {
  const parts = href.split("/").filter(Boolean);
  const first = parts[0] ?? "";
  return first
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Any nav link that doesn't have hand-written content above still gets a
// working, fully static page with generated placeholder articles.
export function getCategoryPage(href: string): CategoryPage {
  if (curated[href]) return curated[href];

  const title = titleFromHref(href);
  const category = categoryFromHref(href);

  const articles: Article[] = Array.from({ length: 4 }).map((_, i) => ({
    id: String(i + 1),
    tag: category.toUpperCase(),
    title: `${title}: our top pick${i === 0 ? "s" : ""} for 2026`,
    excerpt: `Independent testing and hands-on reviews to help you choose the right ${title.toLowerCase()} for your needs and budget.`,
    author: "Editorial Team",
    date: "Jul 2026",
    image: palette[i % palette.length],
  }));

  return { title, breadcrumb: [category, title], articles };
}
