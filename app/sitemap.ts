import { MetadataRoute } from 'next';
import { allNavHrefs } from '@/lib/nav-data';
import { getBlogs } from '@/lib/db-actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thecodebrains.com';
  const lastModified = new Date();

  // Primary static routes
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

