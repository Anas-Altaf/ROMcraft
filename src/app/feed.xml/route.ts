export const dynamic = "force-static";
import { getAllDocs } from "@/lib/content";
import { absoluteUrl, siteDescription, siteName } from "@/lib/seo";
const xmlEscape = (s: string) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
export function GET() {
  const items = [...getAllDocs()].sort((a,b)=>b.updated.localeCompare(a.updated)).slice(0,40);
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${xmlEscape(siteName)}</title><description>${xmlEscape(siteDescription)}</description><link>${absoluteUrl("/")}</link><language>en</language>${items.map(d=>`<item><title>${xmlEscape(d.title)}</title><link>${absoluteUrl(d.href)}</link><guid isPermaLink="true">${absoluteUrl(d.href)}</guid><description>${xmlEscape(d.description)}</description>${d.updated ? `<pubDate>${new Date(`${d.updated}T00:00:00Z`).toUTCString()}</pubDate>` : ""}</item>`).join("")}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type":"application/rss+xml; charset=utf-8", "Cache-Control":"public, max-age=3600" } });
}
