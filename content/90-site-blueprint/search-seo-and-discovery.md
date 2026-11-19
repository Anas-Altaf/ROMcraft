---
title: "Search, SEO, reference discovery and cross-linking"
description: "Make deeply technical documentation fast to find and easy to verify."
contentType: "guide"
status: "planned"
updated: "2026-11-18"
tags: ["search", "seo", "navigation"]
---

# Search, SEO, reference discovery and cross-linking

> **Scope:** Make deeply technical documentation fast to find and easy to verify.  
> **Evidence:** planned. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Search requirements

Global `Ctrl/Cmd+K` search across title, headings, aliases, model codes, error strings and command snippets. Index document content at build time; consider Pagefind for a static docs-first site or a lightweight client-side index if it remains small. Provide facets for device, ROM, Android version, content type, risk and evidence status.

## Search result preview

Title, breadcrumb, one-line matched excerpt, evidence/last verified labels; avoid massive tags. Link directly to relevant heading anchors if possible. Search must work by keyboard, have Escape close, clear focus handling, empty and no-results state.

## SEO

- Per-page metadata and canonical URLs.
- XML sitemap and robots guidance.
- JSON-LD `TechArticle`, `HowTo` where truthful, `BreadcrumbList` and `SoftwareApplication` only when appropriate.
- OpenGraph social previews with branding and technical page identity.
- Redirects for renamed slugs; stable anchors.

## Content quality

Use explicit version date and hardware model in page titles for destructive how-tos. Include source attribution for official docs. A page about a discontinued A10 build must not appear timeless or currently supported.

## Related documents

Link by normalized tags plus curated `related`, never by opaque AI similarity alone. Prioritize a device-specific guide adjacent to its generic concept.
