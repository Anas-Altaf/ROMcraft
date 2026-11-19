import type { MetadataRoute } from "next";
import { getAllDocs, sections } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...sections.map(section => ({ url: absoluteUrl(`/${section.id}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...getAllDocs().map(doc => ({
      url: absoluteUrl(doc.href), lastModified: doc.updated ? new Date(`${doc.updated}T00:00:00Z`) : undefined,
      changeFrequency: "monthly" as const, priority: 0.7,
    })),
    { url: absoluteUrl("/search"), changeFrequency: "monthly", priority: 0.3 },
  ];
}
