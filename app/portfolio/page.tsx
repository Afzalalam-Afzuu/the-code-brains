import PortfolioClient from "../../components/PortfolioClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thecodebrains.com";

export const metadata = {
  title: "Afzal Alam | Full-Stack Developer & AI Systems Architect",
  description: "Portfolio and professional resume of Afzal Alam, featuring expertise in Next.js, MERN stack, Laravel, Flutter, Redis caching, AWS, and AI/RAG integrations.",
  alternates: {
    canonical: `${siteUrl}/portfolio`,
  },
  openGraph: {
    title: "Afzal Alam | Full-Stack Developer & AI Systems Architect",
    description: "Portfolio and professional resume of Afzal Alam.",
    url: `${siteUrl}/portfolio`,
    type: "profile",
  },
};

export default function PortfolioPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Afzal Alam",
      "jobTitle": "Full-Stack Developer & AI Systems Architect",
      "url": `${siteUrl}/portfolio`,
      "sameAs": [
        "https://github.com/Afzalalam-Afzuu",
        "https://linkedin.com"
      ],
      "knowsAbout": ["Next.js", "React", "Node.js", "Laravel", "Python", "TypeScript", "AI Systems"]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioClient />
    </>
  );
}

