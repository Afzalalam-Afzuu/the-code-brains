import { getBlogs } from "@/lib/db-actions";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecodebrains.com";
  let blogs: any[] = [];

  try {
    blogs = await getBlogs();
  } catch (e) {
    console.error("Failed to fetch blogs for RSS feed", e);
  }

  const feedItemsXml = blogs
    .map(
      (blog) => `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${baseUrl}${blog.href || `/blog/${blog.slug}`}</link>
      <guid isPermaLink="true">${baseUrl}${blog.href || `/blog/${blog.slug}`}</guid>
      <description><![CDATA[${blog.excerpt || ""}]]></description>
      <pubDate>${new Date(blog.date || Date.now()).toUTCString()}</pubDate>
      <author><![CDATA[${blog.author || "TheCodeBrains Team"}]]></author>
      <category><![CDATA[${blog.tag || "Tech"}]]></category>
    </item>`
    )
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TheCodeBrains — India's Trusted Tech Reviews, Deals &amp; Buying Advice</title>
    <link>${baseUrl}</link>
    <description>Independent tech reviews, smartphone &amp; laptop buying guides, price comparisons, and verified discount coupons.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${feedItemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
