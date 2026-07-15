// lib/blog-data.ts

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
  href: string; // URL path of the blog post
}

export const blogPosts: BlogPost[] = [
  {
    slug: "jotform-ai-agents",
    title: "Jotform AI Agents: Build Custom AI Assistants to Automate Your Business Workflows",
    excerpt: "Discover how to build conversational AI agents that automate customer data entry, lead qualification, and document generation without code.",
    tag: "AI & AUTOMATION",
    author: "Dev Kapoor",
    date: "Jul 15, 2026",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=480&h=270&fit=crop",
    readTime: "6 Min Read",
    href: "/blog/jotform-ai-agents"
  },
  {
    slug: "best-android-antivirus",
    title: "The best Android antivirus apps in 2026",
    excerpt: "The top Android antivirus apps guard against malware and typically bundle in a VPN, password manager, and phishing protection to secure your personal mobile files.",
    tag: "ANTIVIRUS",
    author: "Priya Sharma",
    date: "Jul 8, 2026",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=480&h=270&fit=crop",
    readTime: "12 Min Read",
    href: "/browse" // Links to the generic browse search for now
  },
  {
    slug: "best-laptops-2026",
    title: "Best laptops in 2026, tested by our team",
    excerpt: "From ultraportables with all-day battery life to power-packed creator workstations, these are the laptops we'd actually recommend spending your hard-earned money on.",
    tag: "LAPTOPS",
    author: "Karan Malhotra",
    date: "Jul 11, 2026",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=480&h=270&fit=crop",
    readTime: "10 Min Read",
    href: "/browse"
  },
  {
    slug: "best-qled-tvs-2026",
    title: "Best QLED TVs for bright living rooms in 2026",
    excerpt: "If your living room gets a lot of natural sunlight, OLED can struggle with glare. These QLED sets battle bright light best without washed-out color contrast.",
    tag: "OLED TVS",
    author: "Neha Verma",
    date: "Jul 4, 2026",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=480&h=270&fit=crop",
    readTime: "8 Min Read",
    href: "/browse"
  }
];
