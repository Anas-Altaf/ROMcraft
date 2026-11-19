---
title: "Article page layout specification"
description: "A textual wireframe for desktop and mobile pages."
contentType: "guide"
status: "planned"
updated: "2026-11-18"
tags: ["wireframe", "ui", "content"]
---

# Article page layout specification

> **Scope:** A textual wireframe for desktop and mobile pages.  
> **Evidence:** planned. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Desktop page

```text
┌─────────────────────────────────────────────────────────────────────┐
│ ROMcraft   Guides  Devices  ROM Atlas  Security     Search   Theme │
├───────────────────┬────────────────────────────────┬────────────────┤
│ NAV TREE          │ Breadcrumb                     │ ON THIS PAGE   │
│   Overview        │ H1: TWRP on Galaxy A10          │ Prerequisites  │
│   Safety          │ [Field-tested] [High risk]      │ Preparation    │
│   Samsung A10     │ Intro + model/firmware summary  │ Install        │
│   Android Basics  │ ┌ Required backups ──────────┐ │ Recovery       │
│                   │ │ Read before flashing        │ │ References     │
│                   │ └─────────────────────────────┘ │                │
│                   │ Commands / expected outputs     │                │
│                   │ Checkpoints / failure routing   │                │
│                   │ Citations / related guides      │                │
└───────────────────┴────────────────────────────────┴────────────────┘
```

## Mobile page

Single-column title, readable lead, expandable summary, persistent search, in-article section jump and inline risk callouts. A top-level menu opens the category tree. Code panels scroll inside their boxes without causing whole-page horizontal scrolling. Device tables become stacked key/value cards only when needed to preserve clarity.

## Structured states

Every procedure page: `prerequisites → risk → commands → expected output → actual observation → troubleshooting → rollback → provenance`. Code examples clearly mark whether commands are **read-only** or **destructive**.

## Tone

Concise summaries above rich long-form details. Let researchers drill down; never hide failure modes behind collapsed panels or marketing graphics.
