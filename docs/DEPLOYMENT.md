# Installation, verification, GitHub and deployment

## 1. Develop locally

This is an **already assembled Next.js application**, so you do not need to run `create-next-app` again. Its folder layout follows the official CLI's TypeScript + Tailwind + App Router + `src/` structure. If you prefer a fresh CLI base, scaffold one separately and copy this repository's `src/`, `content/`, `public/`, `scripts/`, `tests/` and configuration choices into it; do not blindly overwrite a freshly generated package lockfile.

```bash
node --version
npm --version
npm install
npm run dev
```

Node 22 or newer active LTS is a reasonable choice. Visit `http://localhost:3000`.

## 2. Set deployment origin

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the actual HTTPS origin, **not** `https://your-domain.example`. The variable enables correct canonical, sitemap and social-share URLs. Before it is set to a real HTTPS URL, `robots.txt` deliberately prevents indexing.

For GitHub/Vercel, set the same environment variable in the deployment dashboard, not in a committed `.env.local` file.

## 3. Verify before publish

```bash
npm run check:content
npm run test
npm run typecheck
npm run lint
npm run build
```

`npm run verify` performs the above checks in order. If compilation fails, fix it and repeat. Once dependencies are installed, commit `package-lock.json`, and use `npm ci` in CI.

## 4. Manual browser checks (required)

- Test 320, 375, 768, 1024 and 1440px width; no horizontal overflow outside code blocks/tables.
- Test keyboard focus, skip link, nav, mobile menu, search input and filter buttons.
- Confirm dark mode persists after refresh and has acceptable contrast.
- Search terms: `vbmeta`, `sideload`, `EFS`, `eureka`, `magisk`, `SIM`.
- Open the Galaxy A10 full runbook, a long table and a document containing PowerShell commands; test copy controls.
- Test `/sitemap.xml`, `/robots.txt`, `/feed.xml`, `/opengraph-image`, unknown 404 pages and page canonical metadata.
- Run automated Lighthouse or axe accessibility checks plus manual screen reader testing.
- Test high-contrast and reduced-motion settings.

## 5. GitHub

Review contents and run a secret scan (or GitHub secret scanning). Exclude local phone identifiers, `.env.local`, EFS images, modem artifacts, proprietary firmware and unredacted logs. Add a formal license of your choosing (this repository currently does **not** grant open-source reuse rights).

```bash
git init
git add .
git status --short
git commit -m "Initial ROMcraft Fieldnotes knowledge hub"
git branch -M main
# Create an empty GitHub repo in your account, then add its actual HTTPS/SSH URL.
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

## 6. Deploy

You can deploy to a Next.js-compatible host such as Vercel. Import the GitHub repository; it should detect the Next.js framework. Ensure environment variables are set and the production build succeeds. Check canonical URLs and security of the production domain after deployment. No database, API keys or external search service are needed for the content site.

## Build status at handoff

The authoring environment could not resolve `registry.npmjs.org` (`EAI_AGAIN`). Therefore npm dependencies and the Next.js production server were **not installed/run** here. Successful offline Markdown/link/syntax tests cannot substitute for a real `npm run build` and visual QA. Any failure discovered locally should be fixed before public launch.
