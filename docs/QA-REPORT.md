# QA and implementation status — November 18, 2026

## Complete in source

- Standalone Next.js **16.4.6** source tree with official `src/app` folder conventions, TypeScript, React 19, Tailwind CSS 4 and ESLint config.
- Markdown content pipeline for **67 articles** across nine collections with nested device routes.
- Responsive homepage, categories and articles; mobile navigation; light/dark theme; breadcrumbs, left sidebar, mobile TOC, related and sequential links.
- Full-text on-page search over article text and command examples with keyboard shortcuts, category filters and query URLs.
- Accessible controls, skip link, semantic landmarks, focus styles, reduced-motion styles and scrollable tables/code.
- Canonical pages, robots, sitemap, manifest, RSS, Open Graph image, article and breadcrumb JSON-LD.
- CI workflow, documentation and safety policy, link/privacy checks, Node tests and a release handoff guide.

## Verification completed offline

| Check | Result |
|---|---|
| Markdown/frontmatter/internal links | PASS — 67 articles, zero findings |
| Private device serial, local Windows user paths, IMEI-like tokens in articles | PASS — no matches |
| Source repository contains raw firmware ZIP, disk images, APK, captures or logs | PASS — none found |
| Built-in Node tests | PASS — 10 tests |
| TypeScript/TSX **syntax transpilation only** | PASS — 20 source files, zero parser diagnostics |
| CSS parse | PASS — PostCSS parsed globals.css |
| Official-source spot check | Partial: TWRP, Magisk, /e/OS community and crDroid; not every community link could be fetched |

## Not executable in the authoring environment

The npm registry could not be resolved (`EAI_AGAIN`). **`npm install`, `npm run typecheck`, `npm run lint`, and `npm run build` have not passed** and the full application was not run in a browser. A direct headless Chromium static-preview attempt also did not complete in this restricted container. These missing tests are explicit handoff gates, not presumed successes.

## Required acceptance on your local machine

1. `npm install` and commit generated `package-lock.json`.
2. `npm run verify` must exit successfully. Fix any detected TypeScript/ESLint/Next.js failures.
3. Mobile and desktop visual and keyboard accessibility check, with Lighthouse or axe, on actual Next.js pages.
4. Set a real HTTPS `NEXT_PUBLIC_SITE_URL`; check sitemap, robots, canonical URLs and OG image.
5. Final editorial peer review of all dangerous flash and restore procedures; verify external release links again before public publication.
6. Choose and add a formal license before publishing reusable source/docs.
