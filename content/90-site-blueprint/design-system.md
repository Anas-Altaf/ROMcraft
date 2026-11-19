---
title: "Modern visual and responsive design system"
description: "Typography, tokens, color, spacing, content blocks and mobile behavior."
contentType: "guide"
status: "planned"
updated: "2026-11-18"
tags: ["design-system", "responsive", "accessibility"]
---

# Modern visual and responsive design system

> **Scope:** Typography, tokens, color, spacing, content blocks and mobile behavior.  
> **Evidence:** planned. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Token suggestions (review in real browser)

```css
:root {
  --bg: #f7f9fc;
  --surface: #ffffff;
  --text: #17212f;
  --muted: #536174;
  --border: #dce4ed;
  --accent: #007e88;
  --accent-strong: #00616a;
  --radius-card: 16px;
  --measure: 74ch;
}
.dark {
  --bg: #0d141f;
  --surface: #151f2c;
  --text: #edf4fc;
  --muted: #aebdd0;
  --border: #2b3b4d;
  --accent: #65dae1;
  --accent-strong: #a1f0f3;
}
```

These are **provisional design tokens**, not tested contrast ratios. Validate WCAG contrast, especially muted text, buttons, syntax highlighting and warning panels.

## Responsive grid

- **<640 px:** one reading column, overlay navigation, full-width cards and responsive code tables.
- **640–1023 px:** optional mini sidebar, centered article area.
- **≥1024 px:** 280 px left sidebar + flexible prose column + 220 px on-page TOC if viewport allows.

Use CSS Grid with minmax and clamp, not fixed overflow-prone widths. Reading body approximately 16–18 px, line height 1.65–1.8, with fluid headings and 70–80 character measure.

## Components

Hero with scope and status, technical spec table, evidence badge, sticky code-copy toolbar, operating-system tabs, expected/observed output, 'Stop here' warning, failure decision tree, checksum snippet, update timeline, related guides, source citations and fast keyboard search.

## Motion and theme

Honor `prefers-reduced-motion`; store theme preference only with user approval where needed. No large blurred gradients behind dense technical tables. Use subtle transitions and explicit focus outlines.
