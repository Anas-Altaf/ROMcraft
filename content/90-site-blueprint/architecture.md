---
title: "Next.js implementation architecture"
description: "Official scaffolding path and design for a content-first App Router knowledge hub."
contentType: "guide"
status: "planned"
updated: "2026-11-18"
tags: ["nextjs", "architecture", "app-router"]
---

# Next.js implementation architecture

> **Scope:** Official scaffolding path and design for a content-first App Router knowledge hub.  
> **Evidence:** planned. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Official project structure and reproducible setup

Inside WSL Ubuntu or a clean local project directory:

```bash
npx create-next-app@latest romcraft-web --typescript --eslint --tailwind --app --src-dir --import-alias '@/*'
```

Check current Node requirements before running; official Next.js installation documentation currently identifies Node.js **20.9+** as baseline. Use the CLI-provided recommended setup and verify installed versions rather than pinning arbitrary obsolete packages. [Official guide](https://nextjs.org/docs/app/getting-started/installation).

## Recommended folder architecture

```text
romcraft-web/
  src/
    app/
      (site)/page.tsx
      guides/[...slug]/page.tsx
      devices/[...slug]/page.tsx
      roms/[slug]/page.tsx
      search/page.tsx
      layout.tsx
      globals.css
    components/
      layout/      # Header, Footer, Sidebar, TableOfContents
      content/     # Markdown, MDX, CodePanel, Warning, Evidence, Tabs
      search/      # SearchOverlay, SearchResults, FilterChips
      device/      # SpecGrid, PartitionMap, FlashTimeline
    lib/
      content.ts   # parse and validate frontmatter
      navigation.ts
      search.ts
      seo.ts
      schemas.ts
  content/          # import/mirror Phase-1 Markdown without changing content
  public/           # optimized original diagrams and authorized images
  tests/
```

## Content pipeline

Use `gray-matter` + Markdown/MDX parser and schema validation (e.g. Zod), respecting the frontmatter contract. Static pre-render content routes by slug. Prefer server components for article data and client components only for navigation interactivity, theme, search overlay and copy controls.

## Security

Treat Markdown and MDX as potentially executable: MDX can run imported JSX; render trusted repository-managed MDX only. If external user submissions are enabled, sanitize and process plain Markdown separately. Avoid raw HTML or arbitrary code execution in build. Prevent source maps containing secrets. Do not mirror proprietary ROM binaries.

## Why App Router

App Router supports layouts, metadata, dynamic routes and static generation; it fits a documentation library. Use official Next.js API conventions and avoid over-architecting before prototype validation.

## Current implementation boundary

The standalone repository now contains a Next.js App Router application with the equivalent official folder conventions. It has not undergone `npm install` or a full production build in the offline authoring environment. The official CLI command remains an alternative way to regenerate the base scaffold, but is not required for using the delivered repository. See [Release handoff](release-handoff.md).
