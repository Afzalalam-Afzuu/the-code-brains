// lib/nav-data.ts
// All navigation is 100% static — no CMS, no API calls.
// Add/remove links here and the mega-menu + generated listing pages update automatically.

export interface NavLink {
  label: string;
  href: string; // e.g. "/phones/best-picks"
  disabled?: boolean;
}

export interface NavColumn {
  heading: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  slug: string;
  columns?: NavColumn[]; // present = shows a mega menu on hover/click
  href?: string; // used only when there is no mega menu (Wordle & Games, Browse)
}

export const navData: NavItem[] = [
  {
    label: "Phones",
    slug: "phones",
    columns: [
      {
        heading: "Best Picks",
        links: [
          { label: "Best Phones", href: "/phones/best-picks" },
          { label: "Best Camera Phones", href: "/phones/best-camera-phones" },
          { label: "Best Budget Phones", href: "/phones/best-budget-phones" },
          { label: "Best Foldable Phones", href: "/phones/best-foldable-phones" },
        ],
      },
      {
        heading: "Reviews & News",
        links: [
          { label: "Phone Reviews", href: "/phones/reviews" },
          { label: "Phone News", href: "/phones/news" },
          { label: "Phone Deals", href: "/phones/deals" },
          { label: "Phone How-Tos", href: "/phones/how-tos" },
        ],
      },
      {
        heading: "Brands",
        links: [
          { label: "iPhone", href: "/phones/iphone" },
          { label: "Samsung Galaxy", href: "/phones/samsung-galaxy" },
          { label: "Google Pixel", href: "/phones/google-pixel" },
          { label: "OnePlus", href: "/phones/oneplus" },
        ],
      },
    ],
  },
  {
    label: "TV & Audio",
    slug: "tv-audio",
    columns: [
      {
        heading: "TVs",
        links: [
          { label: "TV Best Picks", href: "/tv-audio/tv-best-picks" },
          { label: "TV Deals", href: "/tv-audio/tv-deals" },
          { label: "OLED TVs", href: "/tv-audio/oled-tvs" },
          { label: "QLED TVs", href: "/tv-audio/qled-tvs" },
        ],
      },
      {
        heading: "Audio",
        links: [
          { label: "Audio Best Picks", href: "/tv-audio/audio-best-picks" },
          { label: "Audio Deals", href: "/tv-audio/audio-deals" },
          { label: "Audio Reviews", href: "/tv-audio/audio-reviews" },
        ],
      },
      {
        heading: "Headphones",
        links: [
          { label: "Earbuds", href: "/tv-audio/earbuds" },
          { label: "Over-Ear Headphones", href: "/tv-audio/over-ear-headphones" },
        ],
      },
      {
        heading: "Speakers",
        links: [
          { label: "Bluetooth Speakers", href: "/tv-audio/bluetooth-speakers" },
          { label: "Soundbars", href: "/tv-audio/soundbars" },
        ],
      },
    ],
  },
  {
    label: "Computing",
    slug: "computing",
    columns: [
      {
        heading: "Laptops",
        links: [
          { label: "Best Laptops", href: "/computing/best-laptops" },
          { label: "Best Gaming Laptops", href: "/computing/best-gaming-laptops" },
          { label: "Laptop Deals", href: "/computing/laptop-deals" },
        ],
      },
      {
        heading: "Accessories",
        links: [
          { label: "Best Monitors", href: "/computing/best-monitors" },
          { label: "Best Keyboards", href: "/computing/best-keyboards" },
          { label: "Best Mice", href: "/computing/best-mice" },
        ],
      },
    ],
  },
  {
    label: "AI",
    slug: "ai",
    columns: [
      {
        heading: "AI Tools",
        links: [
          { label: "Best AI Chatbots", href: "/ai/best-ai-chatbots" },
          { label: "AI News", href: "/ai/news" },
          { label: "AI How-Tos", href: "/ai/how-tos" },
        ],
      },
    ],
  },
  {
    label: "Learning",
    slug: "learning",
    columns: [
      {
        heading: "Online Courses",
        links: [
          { label: "Udemy", href: "/learning/udemy" },
          { label: "Coursera", href: "/learning/coursera", disabled: true },
        ],
      },
    ],
  },
  {
    label: "Blog",
    slug: "blog",
    href: "/blog",
  },
  {
    label: "Home",
    slug: "home",
    columns: [
      {
        heading: "Smart Home",
        links: [
          { label: "Best Smart Speakers", href: "/home/best-smart-speakers" },
          { label: "Best Robot Vacuums", href: "/home/best-robot-vacuums" },
          { label: "Best Video Doorbells", href: "/home/best-video-doorbells" },
        ],
      },
    ],
  },
  {
    label: "Wordle & Games",
    slug: "wordle-games",
    href: "/wordle-games",
  },
  {
    label: "Browse",
    slug: "browse",
    href: "/browse",
  },
];

// Flat list of every href in the nav — used by generateStaticParams so every
// link in the header has a working, statically-generated page behind it.
export const allNavHrefs: string[] = navData.flatMap((item) => {
  if (item.columns) {
    return item.columns.flatMap((col) => col.links.filter((l) => !l.disabled).map((l) => l.href));
  }
  return item.href ? [item.href] : [];
});
