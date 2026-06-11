# Vapor Connection MJM — Site

Speculative rebuild of vaporconnectionmjm.com to pitch to the owner. Concept: **"The Shop at Night"** — neon storefront energy, dark OLED base + ember orange (their logo colors), conversion-built for foot traffic.

## Status
- ✅ v2 built, verified (4 breakpoints, 0 console errors)
- ✅ **LIVE (public): https://botsmithgo.github.io/vapor-connection-mjm/**
- ✅ Repo: [Botsmithgo/vapor-connection-mjm](https://github.com/Botsmithgo/vapor-connection-mjm) — **public** (only `site/` code, no research)
- 🎯 Pitch asset: `../outputs/pitch-vapor-connection.html` (self-contained, images embedded)
- ⛔ No Vercel (per Youssef). Netlify was a temp test, now removed.

## Deploy (GitHub Pages, static export)
Hosted via the `gh-pages` branch (deploy-from-branch). To redeploy after changes:
```bash
NEXT_PUBLIC_BASE_PATH=/vapor-connection-mjm GH_PAGES=true npm run build
touch out/.nojekyll
npx gh-pages@6 -d out -b gh-pages --dotfiles -m "Deploy"
```
- `GH_PAGES=true` → sets Next basePath/assetPrefix to `/vapor-connection-mjm`
- `NEXT_PUBLIC_BASE_PATH` → consumed by `src/lib/asset.ts` to prefix `next/image` src (basePath is NOT auto-applied to unoptimized static-export images — that's why this helper exists; wrap every public image path in `asset()`)
- `.nojekyll` is required so GitHub serves the `_next/` folder
- Pages source: `gh-pages` branch, `/` root (set via GitHub API)

## Run
```bash
npm run dev    # port 3000 — or preview_start name "vapor-connection" (root launch.json)
npm run build  # static export, must stay clean
```

## Stack
Next.js 16 (Turbopack) · Tailwind v4 (`@theme` in globals.css — no config file) · Motion 12 (`motion/react`) · Lucide · next/font (Barlow, Barlow Condensed, Tilt Neon).

## Architecture notes
- **All business facts** live in `src/data/business.ts` (hours, deals, reviews, categories). FL HB 1007: disposable brand names stay here for fast edits.
- **Store timezone is America/Chicago** (Cantonment FL = Central). `src/lib/hours.ts` computes open/closed; consumed by NeonOpenSign, OpenNowBadge, TonightBanner, ThursdayCountdown.
- **Hero entrances are CSS keyframes** (`.anim-rise`) — Motion 12 + React 19 hydration trap forbids Motion `initial` on page-load elements. Scroll reveals use Motion `whileInView` (AnimatedSection/StaggerItem).
- Signature components: `NeonOpenSign` (live neon sign), `FloatingProducts` (mouse-parallax cluster), `VelocityTicker` (scroll-velocity marquee), `ThursdayCountdown`, `VaporHaze` + `SmokeWisps` (atmosphere), `GlowCard` (mouse-follow glow), beam-ring CSS on flagship deal card.
- Compliance: `AgeGate` (21+, sessionStorage), `FdaWarning` (top band + footer repeat), `JsonLd` (Store schema). Copy rules: NO quit-smoking/health claims, no "safer than," nothing youth-appealing.

## Backlog (post-sale)
1. Hosting + domain: deploy, consolidate vaporconnectionmjm.com + dead mjmvaporconnection.com (301s), fix BBB listing
2. Replace approximate geo coords in JsonLd with exact pin; pull named-staff quotes from Google Maps reviews
3. Wire EmailClub form to an ESP (no SMS — carriers block vape SMS under CTIA SHAFT)
4. Owner photo shoot (storefront, wall, staff) to replace category renders
5. GA4 + meta pixel; Lighthouse pass on production URL
6. Optional: /deals page permalink, Sanity CMS if owner wants self-serve

## Research
All findings in `../.research/` — start with `research-report.md` and `redesign-plan.md`. Before/after screenshots in `../.research/screenshots/`.
