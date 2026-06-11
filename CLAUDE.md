# Vapor Connection MJM — Site

Speculative rebuild of vaporconnectionmjm.com to pitch to the owner. Concept: **"The Shop at Night"** — neon storefront energy, dark OLED base + ember orange (their logo colors), conversion-built for foot traffic.

## Status
- ✅ v2 built, verified (4 breakpoints, 0 console errors), pushed to GitHub (Botsmithgo/vapor-connection-mjm, private)
- ⛔ NOT deployed publicly — Youssef said GitHub only, no Vercel (account's Vercel projects have SSO protection; sort hosting at sale time)
- 🎯 Pitch asset: `../outputs/pitch-vapor-connection.html` (self-contained, images embedded)

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
