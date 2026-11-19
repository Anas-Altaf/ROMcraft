---
title: "From Markdown archive to production knowledge hub"
description: "Sequential build phases, milestones, dependencies and acceptance criteria."
contentType: "guide"
status: "planned"
updated: "2026-11-18"
tags: ["roadmap", "nextjs", "qa"]
---

# From Markdown archive to production knowledge hub

> **Scope:** Sequential build phases, milestones, dependencies and acceptance criteria.  
> **Evidence:** planned. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Phase 1 — Knowledge extraction (completed in this deliverable)

- [x] Public-safe device facts, command outputs, failures and workarounds.
- [x] Detailed cross-linked Markdown chapters with frontmatter.
- [x] Generic Android and Samsung guides.
- [x] Candidate ROM profiles and evidence boundaries.
- [x] Website IA, brand and Next.js plan.
- [ ] Editorial peer review, fact-check and user approval of publishable logs.

## Phase 2 — Official-convention Next.js structure (source prepared)

- [ ] Confirm Node version and pnpm/npm policy.
- [ ] Run official `create-next-app@latest` App Router CLI.
- [x] Author TypeScript, ESLint and Tailwind CSS configuration files.
- [x] Import docs as content and preserve file names.
- [x] Add metadata, link and privacy scanning plus static article routes.

## Phase 3 — Design system and reader experience

- [x] Source implemented: desktop/mobile navigation, TOC and breadcrumbs (browser QA pending).
- [x] Source implemented: dark/light modes, code blocks, warnings, evidence indicators (browser QA pending).
- [ ] Device spec cards, partition maps, timelines, comparison tables.
- [x] Homepage and curated section links implemented; visual QA pending.

## Phase 4 — Discovery and publishing

- [x] Keyboard search and filters implemented.
- [x] Related content and automatic TOCs implemented; external sources remain editorial material.
- [x] Sitemap, canonical URLs, structured article metadata and RSS implemented.
- [ ] MDX integration policies; no untrusted executable content.

## Phase 5 — QA and deploy

- [x] Offline link, frontmatter, sensitive-data and syntax checks implemented; full runtime tests pending.
- [ ] Accessibility audit, performance budget and mobile visual QA.
- [ ] Security headers, build reproducibility, content licenses.
- [x] CI workflow prepared; online execution and preview deployments pending.
- [ ] Versioned changelog and correction process.

## Acceptance condition for 'site complete'

A user should be able to find the A105F study within two clicks, follow every dangerous procedure with clearly visible prerequisites and rollback notes, search errors like `Failed to make backup folder`, use keyboard/mobile navigation, identify every source’s confidence and see when a ROM was last tested. Site has real build/test outputs, not simulated success.
