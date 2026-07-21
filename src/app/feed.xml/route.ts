import { getAllEssays } from "@/lib/content/essays";
import { siteConfig } from "@/lib/site.config";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const essays = getAllEssays();

  const items = essays
    .map((essay) => {
      const url = `${siteConfig.url}/essays/${essay.slug}`;
      return `
    <item>
      <title>${escapeXml(essay.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(essay.date).toUTCString()}</pubDate>
      <category>${escapeXml(essay.category)}</category>
      <description>${escapeXml(essay.excerpt)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} — Essays</title>
    <link>${siteConfig.url}</link>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
