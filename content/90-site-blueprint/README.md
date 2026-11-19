---
title: "Website blueprint overview"
description: "Product goal, quality bar, principles and phased handoff to Next.js."
contentType: "guide"
status: "planned"
updated: "2026-11-18"
tags: ["website", "product", "ux"]
---

# Website blueprint overview

> **Scope:** Product goal, quality bar, principles and phased handoff to Next.js.  
> **Evidence:** planned. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Product ambition

ROMcraft Fieldnotes should become a **premium-feeling, searchable research library** rather than a chronological unstructured blog. Pages must be accessible, mobile-first and designed for readers following risky device operations.

## Audiences

- Enthusiasts learning Android modding.
- Technicians recovering Samsung phones.
- Researchers validating unofficial ROMs.
- Device maintainers documenting compatibility.
- Beginners who need plain language and commands that can be copied safely.

## Phase boundaries (updated November 18, 2026)

**Phase 1:** Markdown corpus and device field report extracted and preserved.

**Phase 2 (source delivered):** standalone Next.js App Router source code, TypeScript configuration, Tailwind pipeline, static article pages, full-text client search, accessible responsive UI, metadata, sitemap, RSS and content checks prepared. Folder conventions match the official `create-next-app` defaults, but the CLI itself was not executed in this environment because npm registry resolution was unavailable.

**Phase 3 (needs network-enabled computer):** `npm install`, full lint/type/build verification, browser/mobile accessibility testing and deployment. Until then, this is **build-ready source, not a verified production build**.

See [Release and GitHub handoff](release-handoff.md).

## Design principles

Documentation credibility, excellent typography, rich but calm visual hierarchy, fast search, concise code blocks, copy button, explicit risk labels, responsive tables, consistent breadcrumb trails, dark/light mode, no unnecessary animation and a visibly maintained changelog.
