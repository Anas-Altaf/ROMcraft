import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  // Do not expose unfinished localhost/provisional domains to search engines.
  const publicSite = /^https:\/\//.test(siteOrigin) && !siteOrigin.includes(".example");
  return {
    rules: publicSite ? [{ userAgent: "*", allow: "/" }] : [{ userAgent: "*", disallow: "/" }],
    ...(publicSite ? { sitemap: `${siteOrigin}/sitemap.xml`, host: siteOrigin } : {}),
  };
}
