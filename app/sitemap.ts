import { MetadataRoute } from 'next';
import { allNavHrefs } from '@/lib/nav-data';
import { getBlogs } from '@/lib/db-actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thecodebrains.com';
  const lastModified = new Date();

  // Primary static routes & Web Tools Sitelink Candidates
  const staticRoutes = [
    '',
    '/browse',
    '/blog',
    '/compare',
    '/coupons',
    '/portfolio',
    '/learning/udemy',
    '/join',
    '/search',
    '/wordle-games',
    '/tools',
    '/tools/ai-chat',
    '/tools/ai-email-writer',
    '/tools/ai-bio-generator',
    '/tools/ai-cover-letter-generator',
    '/tools/ai-sql-generator',
    '/tools/ai-regex-generator',
    '/tools/age-calculator',
    '/tools/qr-generator',
    '/tools/image-compressor',
    '/tools/password-generator',
    '/tools/text-tools',
    '/tools/unit-converter',
    '/tools/color-palette',
    '/tools/emi-calculator',
    '/tools/bmi-calculator',
    '/tools/json-formatter',
    '/tools/base64-converter',
    '/tools/ip-checker',
    '/tools/pdf-tools',
    '/tools/merge-pdf',
    '/tools/split-pdf',
    '/tools/compress-pdf',
    '/tools/jpg-to-pdf',
    '/tools/pdf-to-word',
    '/tools/dummy-json',
  ];

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1.0 : 0.9,
  }));

  // Category & subcategory pages from navigation structure
  const categoryPages = allNavHrefs
    .filter((href) => !staticRoutes.includes(href))
    .map((href) => ({
      url: `${baseUrl}${href}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  // Dynamic Blog Posts from Supabase / DB
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getBlogs();
    blogPages = blogs.map((blog) => ({
      url: `${baseUrl}${blog.href || `/blog/${blog.slug}`}`,
      lastModified: blog.date ? new Date(blog.date) : lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    }));
  } catch (err) {
    console.error('Failed to fetch blogs for sitemap:', err);
  }

  // De-duplicate URLs
  const sitemapMap = new Map<string, MetadataRoute.Sitemap[number]>();
  [...staticPages, ...categoryPages, ...blogPages].forEach((item) => {
    sitemapMap.set(item.url, item);
  });

  return Array.from(sitemapMap.values());
}

