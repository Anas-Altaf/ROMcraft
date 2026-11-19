---
title: "Accessibility, performance and quality acceptance criteria"
description: "WCAG-aligned UX and reliable performance on low-end research devices."
contentType: "guide"
status: "planned"
updated: "2026-11-18"
tags: ["accessibility", "performance", "qa"]
---

# Accessibility, performance and quality acceptance criteria

> **Scope:** WCAG-aligned UX and reliable performance on low-end research devices.  
> **Evidence:** planned. See [Evidence policy](../00-start-here/evidence-and-accuracy.md).

## Accessibility

- Semantic headings (`h1` once, correctly nested), landmarks and skip-to-content link.
- Visible keyboard focus, keyboard-operable menu/search/tabs, escape handling.
- WCAG AA contrast verified for body, muted text, controls and syntax highlighting.
- Touch targets at least reasonably sized; no content relying only on color.
- Reduce-motion support, meaningful alt text and transcripts for diagrams.
- Screen-reader labels on copy buttons and context in code language selectors.

## Performance budgets (targets, verify)

- Article pages should be mostly pre-rendered HTML with little client JavaScript.
- Optimize hero/illustration delivery, reserve image aspect-ratio to avoid layout shift.
- Lazy-load noncritical diagrams; use variable/system fonts only if license allows.
- Avoid heavy live client search libraries on every page.
- Baseline Core Web Vitals: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 at p75 when measured under representative conditions.

## Testing

- TypeScript, ESLint and automated content schema checks.
- Broken links, missing headings, slug collisions, missing citations.
- Playwright mobile/desktop smoke tests (when site exists).
- axe accessibility checks and real keyboard testing.
- Responsive widths at 360, 390, 768, 1024, 1440 px.
- Lighthouse tests on representative article and search pages.

## Warning UX

High-risk code should display platform prerequisites and a 'Stop' checkpoint before destructive operations. Copy buttons must copy exact shell code without invisible prompt symbols. Differentiate PowerShell and Bash tabs clearly.
