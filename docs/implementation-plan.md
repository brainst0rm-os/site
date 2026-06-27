# Brainstorm site — implementation plan

> The marketing surface for [Brainstorm](../../brainstorm). Lives in this repo so a marketing-copy change does not require a shell-binary release, but every claim is sourced from a design doc in `../brainstorm/docs/`. If marketing copy contradicts a design doc, **the design doc wins** (per [`46-marketing-and-promotion.md §Composition`](../../brainstorm/docs/platform/46-marketing-and-promotion.md)).

## 1. Source of truth

All product claims, positioning, pricing numbers, and tone are sourced from `../brainstorm/docs/`. The load-bearing docs for this site are:

- [`platform/46-marketing-and-promotion.md`](../../brainstorm/docs/platform/46-marketing-and-promotion.md) — the canonical spec for the site. Positioning sentence, six capability tiles, four launch phases, anti-patterns, metrics. Read this before any copy change.
- [`platform/43-monetisation-strategy.md`](../../brainstorm/docs/platform/43-monetisation-strategy.md) — what's free forever, what's paid, what we refuse to monetise.
- [`platform/44-pricing.md`](../../brainstorm/docs/platform/44-pricing.md) — the concrete numbers behind the pricing page.
- [`platform/60-developer-docs.md`](../../brainstorm/docs/platform/60-developer-docs.md) — the DocsHub spec; defines the eventual `docs.brainstorm.app` mirror as a sibling artifact of the in-shell `DocsPack/v1`.
- [`foundations/01-vision.md`](../../brainstorm/docs/foundations/01-vision.md) — the principles every page implicitly stands on.

The site is a **sibling artifact** of `docs/` — same Markdown source for the docs portal, same positioning sentence as the GitHub README and the in-shell help. **Zero drift by construction.**

## 2. Goals & non-goals

### Goals
- Tell the brainstorm story with the **exact** voice and vocabulary of `../brainstorm/docs/` — no marketing rewrite layer.
- Hit the perf/privacy bar that doc 46 commits to publicly (Lighthouse 100×4, <100 KB hero, no third-party trackers, renders identically without JS).
- Provide a credible visual identity that signals "designed in public, OS-shaped, low-poly weather-as-metaphor" within 200 ms of first paint.
- Scale gracefully from the **Phase 0 placeholder** (today) to the **Phase 3 v1 launch** (end of brainstorm Stage 13) without rewrites.

### Non-goals (v1)
- A "talk to sales" surface, lead-capture modal, exit-intent overlay, or any pattern from doc 46 §`What we don't do`.
- Account / billing / downloads UI — those live on `developers.brainstorm.app` per [`47-marketplace.md`](../../brainstorm/docs/apps/47-marketplace.md).
- A blog CMS — posts are Markdown files committed to this repo, same as the brainstorm docs.
- i18n in v1 — English-only through Phase 3 per `46 §OQ-MK-7`.
- Mobile-first design — desktop is the primary surface; mobile works but doesn't pretend to be a separate experience (consistent with the product itself being desktop-only in v1).

## 3. Visual identity

Synthesised from three sources, distilled into a single shading language that ports across icon, hero scene, in-page accents, and OG images.

### 3.1 The brand thread

Walking the icon evolution in `../brainstorm/docs/art/icon/`:

| File       | Era      | Shape                                                    | What it taught us                                                          |
| ---------- | -------- | -------------------------------------------------------- | -------------------------------------------------------------------------- |
| `icon0/1`  | earliest | low-poly brain + lightning bolt, pink/blue duotone, navy | the **low-poly brain** is the core metaphor                                |
| `icon2`    |          | brain + stormcloud + bolt                                | too literal; weather as metaphor works, weather as illustration does not   |
| `icon3–6`  | middle   | blue low-poly brain with cyan glow + bolt                | **deep navy + cyan glow** is the palette; faceted geometry is the texture  |
| `icon7`    |          | pure wireframe blue brain on navy                        | the **wireframe** is its own asset — the structure underneath              |
| `icon8/9`  | current  | simplified lightning bolt on navy with cyan radial glow  | shipping form trades brain for bolt; the bolt is the brand mark            |

And `../brainstorm/docs/art/wallpaper/stormy-sea.png` — a painterly low-poly stormy sea at night, lightning over deep water, a lone low-poly tree. This is the **mood**: weather as a metaphor for thought; faceted/low-poly as the texture of structure-being-built.

### 3.2 The shading language

One material, three asset families.

```
material:
  base color    paper-white (#f4f6fb) for hero geometry
                cyan accent (#1ea8d6) for emissive highlights
  surface       meshStandardMaterial, flatShading, roughness 0.32, metalness 0.18
  lighting      key directional (#ffffff, intensity 3.4) + hemisphere fill +
                bottom rim (#ffffff @ 0.18)
  tonemap       ACES filmic, exposure ~1.05
  post          bloom (intensity 0.7, threshold 0.55) + vignette (offset 0.18,
                darkness 0.9) — only above mobile cutoff

palette:
  --bg-deep     #0d1626  (navy base — from icon.svg bgGrad bottom)
  --bg-mid      #1b2a44  (navy top — from icon.svg bgGrad top)
  --paper       #f4f6fb  (off-white for type and hero geometry)
  --cyan-core   #e8fbff  (bolt tip — icon.svg boltGrad 0%)
  --cyan-mid    #5cc8ee  (bolt body — icon.svg boltGrad 70%)
  --cyan-deep   #2b9bd1  (bolt root — icon.svg boltGrad 100%)
  --cyan-glow   #1ea8d6  (radial halo — icon.svg bgGlow)
  --fog-1       rgba(244,246,251,0.36)  (faint label text)
  --fog-2       rgba(244,246,251,0.56)  (body dim)
  --fog-3       rgba(244,246,251,0.78)  (body)
  --hairline    rgba(244,246,251,0.08)  (1px borders)
```

### 3.3 Type

- **Sans:** `Inter` (variable). System fallback `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Self-hosted, subset to Latin Extended, preload one weight (500). One additional weight (700) async-loaded.
- **Mono:** `JetBrains Mono` (variable, weight 400). Used only for eyebrow labels and inline code. Self-hosted, subset to ASCII + box-drawing.
- **Serif italic accent:** `Instrument Serif` italic, used sparingly for the *one* phrase per page that wants emphasis (e.g., *"install it, it works, your data stays yours."*). Borrows from `mysite`'s discipline.

Tracking: hero `letter-spacing: -0.04em`; body `0`; eyebrow `0.3em` uppercase.

### 3.4 Hero scene (progressive enhancement)

The mysite hero pattern (`../mysite/src/three/Scene.tsx`, `Form.tsx`) is the technical reference. We adopt the same shading + lighting + postprocessing recipe, but the **geometry** is brainstorm-specific:

- A **faceted icosahedron** (paper-white, flat-shaded) with simplex-noise vertex displacement — the same "living form" mysite uses for its hero, restated as the **mind under thought**: it breathes (low-amplitude noise) with occasional spikes (idea formation).
- A **wireframe brain mesh** below it, in cyan, at low opacity — references `icon7`. Rotates slowly on its own axis. Reveals the structure under the surface.
- A single **cyan glow** behind both — references `icon.svg` `bgGlow`. Radial gradient, soft.
- On scroll, the icosahedron decomposes into **drifting tetrahedra shards** (mysite `Shards.tsx` pattern) — the same "structure breaking and re-forming" motion the wallpaper hints at.

**Hard rule for the hero scene** (resolves the doc-46 tension):
- The scene is a **below-fold progressive enhancement**, not the above-fold hero.
- Above the fold: positioning sentence in `<h1>`, two `<a>` links, one static SVG (the wireframe brain from `icon7` as an inline SVG, <8 KB). **Zero JS framework. Renders identically without JS.** Loads under 30 KB total.
- The 3D scene mounts inside the hero section as a `client:visible` Astro island, **after** the LCP element has painted. Gated on:
  1. `prefers-reduced-motion: no-preference`
  2. `navigator.connection?.effectiveType` is not `slow-2g`/`2g`/`save-data`
  3. Not a coarse pointer / narrow viewport (mobile gets the static SVG only)
  4. `IntersectionObserver` in-view
- The scene bundle is code-split and lazy. It does not block LCP. Lighthouse 100/100/100/100 is preserved because the perf budget only counts what's loaded by the time the hero text has painted.

### 3.5 Static asset family (no JS required)

Even with the 3D scene gated, every page has a static visual.

- **Inline SVG hero mark** — wireframe brain from `icon7`, redrawn as a 24 KB inline SVG (no PNG). Three weights: full (hero), simplified (nav), single-glyph (favicon).
- **Section dividers** — `◇──────────●──────────◇` ASCII-art-style rules borrowed from `mysite/README.md`'s aesthetic, rendered as inline SVG. Tie the editorial / brutalist register of the docs to the visual brand.
- **OG images** — pre-rendered at build time: 1200×630, navy gradient, cyan glow, wireframe brain mark, positioning sentence in Inter 500. One per page; rebuilt only when the source changes. Generated by a small build script using `satori` + `resvg`.

## 4. Tech stack

| Concern              | Choice                                        | Why                                                                                |
| -------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------- |
| Framework            | **Astro 4**                                    | Zero JS by default; islands for the 3D scene only; native MD/MDX content collections (DocsHub-4 path); SSR adapter available if needed later. |
| Runtime              | **Bun**                                       | Consistency with `../brainstorm` (per its `CLAUDE.md`).                            |
| Language             | **TypeScript strict**                         | `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` — match brainstorm. |
| Lint + format        | **Biome**                                     | One tool, matches brainstorm. No ESLint, no Prettier.                              |
| Styles               | **Vanilla CSS + CSS custom properties**       | Variables defined once (§3.2); no Tailwind runtime; no CSS-in-JS. Astro scoped styles for component-local rules. |
| 3D                   | **three.js + @react-three/{fiber,drei,postprocessing}** in a `client:visible` React island | Reuse mysite patterns directly. Only ships when the hero island hydrates.        |
| Content              | **Astro Content Collections** (`.md` / `.mdx`) | The blog, capability tiles, comparison rows, and (later) the docs mirror all live as typed Markdown. |
| Forms                | **`<form action="…" method="POST">`** to Buttondown or self-hosted Listmonk | Newsletter signup as a plain HTML form. No client-side framework required.        |
| Analytics            | **Plausible** (self-hosted in v2) or **none** in Phase 0 | No GA, no Hotjar, no pixels per doc 46 §Principle 7.                              |
| Testing              | **Vitest** (unit, content schemas) + **Playwright** (visual regression on hero, comparison pages, pricing) | Matches brainstorm.                                                                |
| Performance budgets  | **`lighthouse-ci`** + **`size-limit`**         | Per-route budgets enforced in CI. Hero route hard cap: 100 KB total transfer.    |
| Hosting              | **Cloudflare Pages** (static) → **Workers** if SSR needed later | Static-only in Phase 0–3; Workers as a v2 escape hatch. No vendor lock.            |
| Domain               | OQ-MK-1 (deferred to brainstorm)              | We don't pick the TLD; we render whatever `brainstorm.app` / `.dev` / etc. is.   |

**Dependency hygiene:** anything beyond the list above requires a justification in the PR description. The `mysite` portfolio shipped with 8 prod deps total; we aim for similar.

## 5. Repo layout

```
brainstorm-site/
├── CLAUDE.md                       ← this repo's bootstrap doc for future Claude instances
├── README.md                       ← public-facing repo readme (one paragraph + links)
├── docs/
│   ├── implementation-plan.md      ← this file
│   ├── design.md                   ← visual identity expansion (filled in Site-1.2)
│   ├── content-style.md            ← voice + vocabulary rules; quotes brainstorm conventions
│   └── _review/                    ← per-phase audits (parallel to brainstorm/docs/_review)
├── public/
│   ├── favicon.svg                 ← single-glyph cyan bolt on navy (icon8/9 simplified)
│   ├── og/                         ← pre-rendered per-page OG images (build artifact)
│   └── art/                        ← inline-SVG hero mark sources, ASCII dividers
├── src/
│   ├── content/
│   │   ├── config.ts               ← Astro content collection schemas (zod)
│   │   ├── capabilities/           ← six tiles (md, one per tile)
│   │   ├── compare/                ← /compare/<slug> per-product pages
│   │   ├── segments/               ← per-audience landing copy
│   │   ├── blog/                   ← design-decision posts + stage-transition retros
│   │   ├── changelog/              ← per-release 200-word summaries
│   │   └── releases/               ← per-release download manifests (platform assets)
│   ├── pages/
│   │   ├── index.astro             ← Phase-aware hero (placeholder → real)
│   │   ├── downloads.astro         ← latest release + per-platform builds + archive
│   │   ├── compare/[slug].astro    ← renders src/content/compare/
│   │   ├── segments/[slug].astro   ← renders src/content/segments/
│   │   ├── pricing.astro           ← renders ../brainstorm/docs/platform/44-pricing.md (Phase 4)
│   │   ├── changelog.astro         ← reverse-chron index of src/content/changelog/
│   │   ├── blog/index.astro
│   │   └── blog/[slug].astro
│   ├── layouts/
│   │   ├── Base.astro              ← <html>, <head>, font preloads, analytics-or-not
│   │   └── Article.astro           ← long-form (blog, compare, segment)
│   ├── components/
│   │   ├── Hero.astro              ← above-fold hero (zero JS)
│   │   ├── HeroScene.tsx           ← 3D island (client:visible, gated)
│   │   ├── BrainMark.astro         ← inline SVG, three weights
│   │   ├── Divider.astro           ← ◇──────●──────◇ inline SVG
│   │   ├── CapabilityTile.astro    ← one of the six tour tiles
│   │   ├── ComparisonMatrix.astro  ← renders 46 §differentiation matrix
│   │   ├── Footer.astro            ← repo + docs + newsletter form + privacy note
│   │   └── ChromeMarks.astro       ← corner registration marks (mysite pattern)
│   ├── three/
│   │   ├── Scene.tsx               ← Canvas wrapper, mobile detection, gating
│   │   ├── BrainForm.tsx           ← faceted icosahedron + wireframe brain + cyan glow
│   │   └── Shards.tsx              ← drifting tetrahedra on scroll
│   ├── styles/
│   │   ├── tokens.css              ← :root custom properties (§3.2)
│   │   ├── reset.css               ← minimal modern reset
│   │   ├── typography.css          ← font-face, scale, tracking
│   │   └── prose.css               ← long-form article styles
│   └── lib/
│       ├── content-schemas.ts      ← shared zod shapes
│       ├── og.ts                   ← satori-based OG image builder
│       └── analytics.ts            ← Plausible script tag helper (or null in Phase 0)
├── scripts/
│   ├── build-og.ts                 ← regenerate public/og/
│   └── docs-mirror.ts              ← (DocsHub-4 / Phase 4) pulls ../brainstorm/docs/ + renders
├── tests/
│   ├── unit/                       ← content schema validation, helpers
│   └── visual/                     ← Playwright screenshots per route × viewport
├── astro.config.mjs
├── biome.json                      ← shares root with brainstorm where possible
├── package.json
├── tsconfig.json                   ← extends ../brainstorm/tsconfig.base.json if available
├── .size-limit.json                ← per-route transfer budgets
└── lighthouserc.json               ← CI thresholds
```

## 6. Iteration ladder

Naming mirrors brainstorm's plan: **`Site-N.M`** where `N` is a phase (0–4 matching doc 46) and `M` is the in-phase iteration. Each iteration is PR-sized, lands behind a green CI, and updates this plan file in the same turn.

### Phase 0 — Stealth / placeholder (now, brainstorm Stages 0–7)

The product is being built; the design docs are public. The site exists only to claim the domain and route curious developers to the GitHub repo and the docs. **No marketing copy.**

| Iter        | Subject                                                                                                        | Done when                                                                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Site-0.1** ✓ | Scaffold Astro + Bun + Biome + strict-TS                                                                    | DONE. Astro 4.16, Bun runtime, Biome 1.9 (tab indent), strict TS (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`). Build / lint / typecheck all green. Sitemap integration deferred to Site-0.4 (compatibility issue with @astrojs/sitemap 3.7 on Astro 4.16; manual sitemap.xml in `public/` for now). |
| **Site-0.2** ✓ | Tokens + typography + base layout                                                                           | DONE. `src/styles/{tokens,reset,typography,global}.css`. Palette derived directly from `../brainstorm/docs/art/icon/icon.svg` (navy bg-gradient + cyan glow + bolt gradient). Body carries the radial cyan halo + linear navy gradient as page chrome. System-font stack for Phase 0 (Inter self-host deferred — zero font request keeps placeholder under 30 KB). `Base.astro` slot layout with full `<head>` (canonical, OG, twitter, theme-color). |
| **Site-0.3** ✓ | Static hero (placeholder)                                                                                   | DONE. Hand-drawn low-poly faceted SVG mark (`BrainMark.astro`, ~3 KB) with cyan glow halo + bolt accent — references the icon0–9 lineage. Phase-0 eyebrow, "Brainstorm" wordmark, italic "*local-first OS*" lede, plain-English sub, GitHub + docs CTAs, pulsing status dot. Corner registration marks (`CornerMarks.astro`). Footer with newsletter form (action="#" stub until Site-0.6) + GitHub/docs/changelog links + colophon. Renders identically without JS. Build = 10 KB raw / 2.6 KB gzipped HTML; CSS 11 KB / 2.9 KB gzipped. Total transfer ~6 KB gzipped — well under the 30 KB Phase 0 budget. |
| **Site-0.4** ✓ | Favicon, robots, sitemap                                                                                    | DONE. `public/favicon.svg` (927 B) — the simplified cyan-bolt-on-navy from `icon9`. `robots.txt` (allow-all + sitemap pointer). Manual `sitemap.xml` (one route for now; switches to `@astrojs/sitemap` once we add more pages or resolve the integration's Astro-4.16 compat issue). Favicon wired in `Base.astro` (`type="image/svg+xml"` + `mask-icon`). OG image generation deferred — needs `satori`/`resvg` dep weight that doesn't pay off until Phase 1 has real per-page metadata. |
| **Site-0.5** | Perf + a11y CI gates                                                                                           | `lighthouse-ci` runs on every PR; thresholds 100/100/100/100; `.size-limit.json` caps `/` at 100 KB transfer. PR fails if budget regresses.             |
| **Site-0.6** | Newsletter integration                                                                                         | Form POSTs to a chosen provider (decision: Buttondown for Phase 0–1; Listmonk self-hosted from Phase 3). No JS required. Double opt-in confirmed.       |
| **Site-0.7** | Hero scene island (progressive enhancement)                                                                    | `HeroScene.tsx` mounts below fold via `client:visible` per §3.4 gating rules. Bundle code-split. LCP unchanged. Reduced-motion + save-data + coarse-pointer all fall back to static. |
| **Site-0.8** | Deploy to staging                                                                                              | A Cloudflare Pages preview environment lives at a stable URL. Domain (OQ-MK-1) still TBD upstream.                                                       |

**Phase 0 exit criteria:** the placeholder site is live, Lighthouse-perfect, ships under 30 KB without the scene + under 100 KB with it, renders correctly with JS disabled, and **the newsletter form is the only CTA**.

### Phase 1 — Alpha (brainstorm Stage 8, Notes app shipped)

Audience: developer / power user. Posture: "alpha, format stable, API isn't; help us find bugs."

| Iter        | Subject                                                                                            |
| ----------- | -------------------------------------------------------------------------------------------------- |
| **Site-1.1** | Real hero (positioning sentence verbatim from `46 §Layer 1`)                                       |
| **Site-1.2** | Capability tiles 1–6 (from `46 §Layer 2`), each linking to the matching design doc                 |
| **Site-1.3** | "Alpha" banner component; state honestly what works and what doesn't                              |
| **Site-1.4** | GitHub README mirror — same hero copy lives at `../brainstorm/README.md`; add a CI cross-check     |
| **Site-1.5** | Changelog page; first entry is the Stage-8 ship note (200 words)                                  |
| **Site-1.5b** ✓ | `/downloads` page + `releases` content collection                                              | DONE. Separate `/downloads` page renders the latest release with per-platform build cards (macOS / Windows / Linux, recognisable inline-SVG glyphs, per-asset size + download link) and a reverse-chron archive of previous releases. Releases are typed Markdown in `src/content/releases/` (`version`, `date`, `channel`, `status` draft/published, `highlights`, `assets[{platform,label,href,size}]`); `Platform`/`ReleaseChannel` enums in `src/content/releases.ts`. Honest empty state (→ waitlist) until a real build is published; the seeded entry is a `draft` template. OS auto-detect highlights the matching card (progressive enhancement; renders identically without JS). Wired into header + footer nav, sitemap, and `/llms.txt`. |
| **Site-1.6** | Blog scaffold + one **design-decision post** ("Why we built a shell, not an editor")              |
| **Site-1.7** | Visual regression baseline (Playwright) on `/`, `/changelog`, `/blog`, blog post                  |
| **Site-1.8** | Phase 1 audit (`docs/_review/<date>-phase-1-audit.md`): perf, a11y, copy-vs-design-docs check     |

### Phase 2 — Beta (brainstorm Stage 11, Database + Files + AI broker shipped)

Audience expands to alumni-of-prior-tools + privacy-conscious. Per-product comparison pages publish.

| Iter        | Subject                                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| **Site-2.1** | `ComparisonMatrix` component rendering `46 §differentiation matrix` row-by-row from content collection      |
| **Site-2.2** | `/compare/<slug>` template; first three comparison pages drafted (subjects TBD; honest fills only)         |
| **Site-2.3** | Per-segment landing: `/segments/power-user`, `/segments/alumni` (the first two per `46 §Audience`)         |
| **Site-2.4** | Privacy posture page or a `/privacy` long-form linking to the security design docs                          |
| **Site-2.5** | Plausible (self-hosted) wired in; server-side only; documented privacy policy                              |
| **Site-2.6** | Newsletter migration Buttondown → Listmonk self-hosted; double opt-in preserved                            |
| **Site-2.7** | Phase 2 audit; competitor outreach (per `46 §OQ-MK-8`) — one-week heads-up before each `/compare/<x>` ship |

### Phase 3 — v1 (end of brainstorm Stage 13)

Full primary segment list. Press notes. "1.0. Free local product, forever."

| Iter        | Subject                                                                                            |
| ----------- | -------------------------------------------------------------------------------------------------- |
| **Site-3.1** | Drop "Alpha"/"Beta" banners; v1 hero + capability tour reflect the shipped feature set            |
| **Site-3.2** | "Install Brainstorm and take your first note" — 5-minute tutorial as a long-form page             |
| **Site-3.3** | "Build your first Brainstorm app" — 20-minute tutorial; ends with an installable bundle           |
| **Site-3.4** | Two remaining segment pages: `/segments/privacy`, `/segments/team-waitlist`                       |
| **Site-3.5** | Press kit page (`/press`) — logo SVGs, screenshots, founder bio, contact                          |
| **Site-3.6** | Refresh all `/compare/<x>` pages against current shipped facts                                    |
| **Site-3.7** | Public metrics dashboard component (renders the quarterly numbers per `46 §Metrics`)              |
| **Site-3.8** | Phase 3 launch-day rehearsal: a11y, perf, no-JS render, dead-link sweep, social-preview audit     |

### Phase 4 — Commercial launch (brainstorm Stage 14, v2)

Plus / Pro / Team / Enterprise plans land. The site grows the pricing page and an enterprise landing.

| Iter        | Subject                                                                                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Site-4.1** | `/pricing` — renders `../brainstorm/docs/platform/44-pricing.md` directly; no marketing rewrite layer                                                       |
| **Site-4.2** | `/enterprise` — published price, no "contact sales for pricing"                                                                                            |
| **Site-4.3** | Trial mechanics page (matches `43 §Free → paid conversion mechanics` exactly)                                                                              |
| **Site-4.4** | DocsHub-4 docs mirror at `/docs/*` (or a sibling domain) — `scripts/docs-mirror.ts` pulls `../brainstorm/docs/`, renders as static HTML, ships an "edit this page" GitHub anchor. CI runs on every brainstorm `main` merge. |
| **Site-4.5** | Phase 4 audit + commercial-surface privacy review                                                                                                          |

## 7. Cross-cutting requirements

These apply to every iteration; CI enforces them.

### Performance
- Hero route transfer budget: **100 KB total** (HTML + CSS + above-fold images + font subset). Hard fail in CI.
- Other static pages: **150 KB**.
- Long-form / docs mirror: **200 KB**.
- Lighthouse: **100/100/100/100** on `/`, `/changelog`, `/blog`, `/pricing` (when it ships). 95+ elsewhere.
- LCP < 1.0 s on a fast-3G profile; FID/INP < 100 ms (the hero never blocks input).

### Accessibility
- Every page has a meaningful `<title>` and `<meta description>`.
- Single `<h1>` per page, semantic heading order.
- All interactive elements keyboard-reachable; visible focus rings using `--cyan-core`.
- Color-contrast AA minimum on body, AAA on hero copy.
- `prefers-reduced-motion` disables every transition, animation, and the 3D scene.
- `prefers-color-scheme: light` — we ship dark-mode-first (matches the icon family); a light theme is **deferred** to Phase 3 if at all.

### Privacy
- No third-party scripts. Period. (No GA, no Hotjar, no Facebook Pixel, no Intercom, no Segment.)
- Self-hosted fonts. No Google Fonts CDN.
- Self-hosted images. No Unsplash hotlinks.
- Cookie banner: **only if** we use cookies. Phase 0–2 ships **zero cookies**; no banner.
- `Content-Security-Policy` header forbids cross-origin script + font + style + connect by default.

### Content discipline
- Every claim cites a design doc. PRs that introduce a claim without a `../brainstorm/docs/...` link are rejected.
- No "synergise", no "unlock", no "10x", no "AI-powered" as the headline. The voice rules in `46 §Principle 6` are CI-checkable: a small linter flags banned phrases.
- No emojis in copy. Inline SVG glyphs are the substitute when a visual marker is needed.
- Positioning sentence is verbatim everywhere it appears.

### Build hygiene
- `bun run typecheck` + `bun run lint` + `bun run build` + `bun run test` + `bun run lh` (Lighthouse) + `bun run size` (size-limit) all green on every PR.
- `bun run visual` regenerates Playwright snapshots; diffs require explicit human approval.
- The implementation plan is updated in the **same turn** an iteration lands. Same workflow rule as brainstorm.

## 8. Composition with the brainstorm repo

| Question                                                       | Answer                                                                                                                    |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Should the site be a workspace package inside brainstorm?      | **No.** Different release cadence, different audience, different CI. Sibling repo, not nested package.                    |
| Should the site import from `../brainstorm/packages/*`?        | **No.** The site has no runtime dependency on the shell. It may read `../brainstorm/docs/*.md` at *build time* (docs mirror, pricing render). |
| What if `../brainstorm` isn't checked out?                     | Site builds, but the docs-mirror page is replaced by a "docs coming soon" stub. CI in the site repo doesn't require the brainstorm repo to be present. |
| Should the site share tokens with `@brainstorm/tokens`?        | **Not in v1.** The shell tokens are app-design tokens (dashboard, app windows); the site tokens are editorial / brand. Different problems, different surfaces. Re-evaluate in Phase 3. |
| Where does the in-shell help live?                             | Inside the brainstorm shell, as a bundled `DocsPack/v1` (per `60-developer-docs.md`). The site's docs mirror is the **public** render of the same Markdown — not a substitute for the in-shell pack. |

## 9. Open questions (site-local)

Added to a future `docs/open-questions.md` once we hit the second one. Mirroring brainstorm's `OQ-N` convention with the `OQ-SITE-N` prefix.

- **OQ-SITE-1** — Newsletter provider for Phase 0–1: **Buttondown** (paid, hosted, plain-text-friendly, GDPR-clean) vs **ConvertKit** (more features, bigger surface) vs **wait for Listmonk self-host**. Lean: Buttondown; migrate to Listmonk in Phase 2.
- **OQ-SITE-2** — Hosting target: **Cloudflare Pages** vs **Netlify** vs **GitHub Pages**. Lean: Cloudflare Pages (good CSP control, free tier sufficient, no vendor analytics).
- **OQ-SITE-3** — Does the docs mirror live at `/docs` on the marketing domain or at a sibling `docs.brainstorm.[tld]`? `60-developer-docs.md` references the sibling pattern. Lean: sibling subdomain when it ships (Phase 4).
- **OQ-SITE-4** — When does the 3D hero scene first appear? Phase 0 (now, but gated and lazy) vs Phase 1 (with the real copy). Lean: ship the **gated lazy** scene in Phase 0 so the perf/gating story is exercised early; the geometry is content-light enough to be re-skinned without churn.
- **OQ-SITE-5** — Light-theme alternate. Lean: ship dark-only through Phase 3; revisit when there's data.
- **OQ-SITE-6** — Pricing render method: at build time from `../brainstorm/docs/platform/44-pricing.md` (drift-free, brittle if doc structure changes) vs a small JSON schema both the doc and the page consume. Lean: parse the doc's tables at build time; fail the build on parse failure.

## 10. Glossary (site-local)

- **Phase 0–4** — brainstorm marketing launch phases per `46 §Launch sequence`. Anchored to brainstorm implementation stages (8 / 11 / 13 / 14).
- **Hero scene** — the optional below-fold 3D island. Distinct from the above-fold "hero" (text + static SVG).
- **Capability tile** — one of the six Layer-2 tiles per `46 §Layer 2`.
- **Differentiation matrix** — the canonical comparison source per `46`. Comparison pages render from it.
- **DocsPack / DocsHub** — per `60-developer-docs.md`. Site is the web mirror of the same source.

## 11. What this plan does not promise

- A finished site at any specific date — every iteration is gated on a brainstorm stage shipping the capability it claims.
- A particular performance number on a slow client — we measure under controlled conditions; field perf varies.
- A guarantee that comparison-page subjects will engage with the heads-up offer. We send it; they answer or don't.
- A guarantee that all OG images render correctly in every social platform's preview cache. We pre-render and validate the major ones; the long tail varies.
