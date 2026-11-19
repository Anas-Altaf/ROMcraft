import type { Metadata } from "next";

/** Set NEXT_PUBLIC_SITE_URL in deployment to your real HTTPS origin. */
// NEXT_PUBLIC_SITE_URL should include the repository subpath on GitHub Pages:
// https://OWNER.github.io/REPO. It is used for canonical and sharing URLs.
export const siteOrigin = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
export const siteName = "ROMcraft Fieldnotes";
export const siteDescription = "Recovery-first Android field guides, custom-ROM analysis, device-specific evidence and safe rollback research.";

export function absoluteUrl(pathname: string) {
  return `${siteOrigin}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function pageMetadata(title: string, description: string, pathname: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(pathname) },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      type: "article",
      siteName,
      url: absoluteUrl(pathname),
      images: [{ url: absoluteUrl("/og-card.png"), width: 1200, height: 630, alt: "ROMcraft Fieldnotes" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/og-card.png")] },
  };
}

export function structuredDataJson(value: unknown) {
  // JSON-LD is embedded in a script tag; avoid closing the script with hostile text.
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
