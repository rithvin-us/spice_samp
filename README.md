# SOLI MASALA

**Ground with tradition. Made for today.**

A customer-facing storefront prototype for SOLI Masala — a South Indian spice
brand. Handpicked spices and carefully crafted masalas, built around the real
supplied packaging artwork and a cinematic hero sequence.

[![CI](https://github.com/rithvin-us/spice_samp/actions/workflows/ci.yml/badge.svg)](https://github.com/rithvin-us/spice_samp/actions/workflows/ci.yml)
[![CodeQL](https://github.com/rithvin-us/spice_samp/actions/workflows/codeql.yml/badge.svg)](https://github.com/rithvin-us/spice_samp/actions/workflows/codeql.yml)

Live: <https://solisampleweb.vercel.app>

---

## Running it

```bash
npm install
npm run dev          # http://localhost:5173
```

```bash
npm run lint         # tsc --noEmit
npm run build        # typecheck + production build to dist/
npm run preview      # serve the production build
```

The hero frames and the transparent logo are committed, so a fresh clone runs
without any asset preprocessing. To regenerate them:

```bash
npm run hero:frames:force   # re-extract the hero sequence from the source video
npm run brand:logo          # re-cut the transparent logo from the closing frame
```

---

## Stack

| | |
|---|---|
| Build | Vite 6 + React 18 + TypeScript (strict) |
| Routing | React Router 7 |
| State | Zustand (cart, language), both persisted to `localStorage` |
| 3D | Three.js via `@react-three/fiber` + `@react-three/drei`, lazily loaded |
| Smooth scroll | Lenis (desktop pointer only) |
| Icons | lucide-react |
| Styling | Plain CSS with design tokens — no framework |

Scroll-driven sections use `position: sticky` plus a single
`requestAnimationFrame` loop rather than a scroll-animation library. That keeps
native scrolling intact and keeps ~70 KB of animation runtime out of the bundle.

---

## Routes

| Path | Page |
|---|---|
| `/` | Homepage — hero, brand statement, pantry, product spotlight, process, heritage, about |
| `/shop` | Full catalogue with filters and search (state mirrored into the URL) |
| `/products/:slug` | Product detail — viewer, purchase controls, ingredients |
| `/about` | Origin, kitchen, craft, people, future |
| `/checkout` | Demonstration checkout |

---

## Where things live

```
img/                          supplied originals — never modified by any script
  hero frames/                the source cinematic video
public/img/
  hero-frames/                generated WebP sequence (+ mobile/ subset)
  products/                   the four packs, web-named
  soli-logo.png               transparent lockup cut from the closing hero frame
src/
  data/                       products, ingredients, heritage, translations
  store/                      cartStore, languageStore
  lib/                        performance (capability tiers), animations, utils
  hooks/                      useTranslation, useCapability, useMeta
  components/                 hero, products, cart, making, heritage, layout, ui, three
  pages/                      one file per route
  styles/                     tokens → base → layout → components
scripts/                      hero frame + logo pipelines
docs/HERO_ASSET_PIPELINE.md   full hero asset documentation
docs/ANIMATION_SYSTEM.md      every animation, how it is driven, where it stops
docs/CI_CD.md                 the build/check/deploy pipeline
.github/workflows/            CI (typecheck + build) and CodeQL
```


### Adding products

Append to `src/data/products.ts`. Nothing in the UI is hard-coded to a slug or
to a catalogue length — the grid, filters, search, routes, footer and cart all
read from that array.

### Adding a 3D model

Drop a `.glb` into `public/models/` and set `modelPath` on the product.
`ProductViewer` renders the model when one is present and the supplied packaging
artwork when it is not. No other file changes.

---

## English and Tamil

One dictionary in `src/data/translations.ts`, one hook (`useT`). Page components
are never duplicated per language. Product, ingredient and narrative copy carry
both languages in their own data files as `{ en, ta }` values.

The Tamil object is type-checked against the English one, so a missing Tamil key
is a build error rather than a blank string in production.

---

## Continuous integration & deployment

**GitHub Actions is the gate, Vercel is the deploy** — they don't overlap.

* Every push and PR runs `npm run lint` (typecheck) and `npm run build` on
  Node 20 and 22 (`.github/workflows/ci.yml`), plus CodeQL security/quality
  analysis (`.github/workflows/codeql.yml`).
* Deployment is Vercel's Git integration, configured by `vercel.json`: `main`
  ships to production, every PR gets a preview URL. No deploy secret lives in
  Actions.
* Dependabot batches weekly dependency updates into a few grouped PRs
  (`.github/dependabot.yml`).

Full details, and opt-in extensions (Lighthouse budgets, release tagging), are
in **docs/CI_CD.md**.

## Prototype disclosures

* Packaging artwork, Tamil product names and the SOLI mark are supplied brand
  assets and are used as given — nothing has been redesigned or regenerated.
* Pricing, weights, availability, blend descriptions and all narrative copy are
  prototype content written for this build.
* The heritage and about narratives are deliberately non-specific: no founders,
  dates, places, facilities, certifications, awards or production figures.
* Checkout is a demonstration. No payment is processed, and no card, address or
  personal detail is collected or transmitted.
* Customer reviews, the customer marquee and all contact destinations are
  placeholder content. Every surface that renders them says so on the page, no
  real business or logo is reproduced, and no review/aggregateRating structured
  data is emitted — so the ratings cannot be indexed as genuine. Replace
  `reviews`, `clients` and `contactChannels` in `src/data/social.ts` with real,
  permissioned content before this goes near production.
