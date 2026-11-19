---
title: "Website release and GitHub handoff checklist"
description: "How to install, validate, publish and maintain the documentation site with no secrets in Git."
contentType: "implementation-plan"
status: "planned"
updated: "2026-11-18"
tags: ["nextjs", "github", "deployment", "qa"]
---

# Website release and GitHub handoff checklist

> The repo ships a standalone Next.js App Router source tree. Dependency installation, complete compilation, browser verification and deployment must be performed in a network-enabled development environment.

## One-time installation

Use a modern supported Node.js LTS release (Next.js requires Node.js 20.9 or later). Extract the repository and run:

```bash
npm install
cp .env.example .env.local
# Replace the example NEXT_PUBLIC_SITE_URL with your actual https:// domain.
npm run dev
```

On Windows PowerShell, copy with `Copy-Item .env.example .env.local`. The content stays in `content/` outside `src/`, following the official Next.js App Router layout with `src/app/` route conventions.

## Quality gates before deployment

```bash
npm run check:content
npm run test
npm run typecheck
npm run lint
npm run build
```

Use `npm run verify` to execute all checks once dependencies are available. This project includes syntax/content checks that run in Node without Next.js dependencies; a full production build still needs `npm install`.

## Browser checklist

- Open homepage, all nine collection pages, at least one nested A10 article, search, 404, and a long command-heavy document.
- Test desktop (wide + 1024 px), tablet (768 px) and mobile (375 px and 320 px); no unintended horizontal overflow outside code and tables.
- Verify keyboard-only tab order, visible focus, skip-to-content link, Escape behavior, `/` and Cmd/Ctrl+K search shortcuts.
- Toggle light/dark and refresh; respect reduced-motion mode and adequate text contrast.
- Check that code-copy copies the actual command; test the ADB examples in PowerShell where appropriate, without running destructive commands.
- Check structured metadata, `/sitemap.xml`, `/robots.txt`, `/feed.xml`, `/opengraph-image` and social preview.
- Use Lighthouse or equivalent accessibility/performance checks, and manually inspect navigation landmarks and tables.

## GitHub and deployment hygiene

Before the first push inspect `git status`, `git diff --stat`, and `git ls-files`; ensure EFS, raw disk partitions, proprietary firmware, local `.env` values, terminal logs, device serials and personal paths are absent. `.gitignore` is a backup safeguard, **not a secret scanner**; already staged files still need explicit removal. Create the license policy and editorial review PR before making the repository public.

Set `NEXT_PUBLIC_SITE_URL` in your production host settings to the actual HTTPS origin. The generated robots policy deliberately disallows crawling on localhost and placeholder `.example` domains; it allows indexing when a real HTTPS origin is configured.

## Post-launch maintenance

Review external sources at least quarterly and after major Android, TWRP, Magisk, Samsung, /e/OS, or LineageOS releases. Maintain a changelog for corrections, verify link freshness and mark unsupported phone builds clearly. Security-sensitive procedures require a second reviewer before publication.
