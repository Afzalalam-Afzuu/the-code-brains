import { MetadataRoute } from 'next';
import { allNavHrefs } from '@/lib/nav-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thecodebrains.com';
  const lastModified = new Date();

  const staticPages = [
    '',
    '/browse',
    '/blog',
    '/join',
    '/search',
    '/wordle-games',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  const categoryPages = allNavHrefs.map((href) => ({
    url: `${baseUrl}${href}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages];
}
