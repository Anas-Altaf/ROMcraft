---
title: "Navigation, routes and reader journeys"
description: "How the website should organize hundreds of future articles."
contentType: "guide"
status: "planned"
updated: "2026-11-18"
tags: ["navigation", "routing", "ux"]
---

# Navigation, routes and reader journeys

> **Scope:** How the website should organize hundreds of future articles.  
> **Evidence:** planned. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Primary top navigation

`Guides · Devices · ROM Atlas · Recovery Desk · Security · Lab · About` with always-available global search.

## Route strategy (Next.js App Router)

```text
/                         homepage
/guides                   generic guide library
/guides/[...slug]          deep guide
/devices                  device directory
/devices/samsung-galaxy-a10-sm-a105f
/devices/[device]/[topic] device report chapters
/roms                     ROM profiles
/roms/[slug]              individual ROM
/troubleshooting          symptom search
/security                 security references
/lab                      research notes
/search                   global search
/about                    site provenance
/changelog                editorial release history
```

## Desktop

Left nested sidebar for section navigation, central reading area at sensible line length, right sticky table of contents. Use collapsible categories and `aria-current` active document state.

## Mobile

Sticky compact top bar and search, slide-out table-of-contents/navigation, full-width content with generous tap targets; no horizontal page scrolling. Wide code and tables may scroll *inside their own containers*.

## Cross-link graph

Every device chapter links to its generic guide and to incident/rollback notes. Every ROM profile links to security provenance. Show prerequisites/next steps rather than a chronological feed alone.
