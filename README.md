# SOLI MASALA

**Ground with tradition. Made for today.**

A customer-facing storefront prototype for SOLI Masala — a South Indian spice
brand. Handpicked spices and carefully crafted masalas, built around the real
supplied packaging artwork and a cinematic hero sequence.

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

## Prototype disclosures

* Packaging artwork, Tamil product names and the SOLI mark are supplied brand
  assets and are used as given — nothing has been redesigned or regenerated.
* Pricing, weights, availability, blend descriptions and all narrative copy are
  prototype content written for this build.
* The heritage and about narratives are deliberately non-specific: no founders,
  dates, places, facilities, certifications, awards or production figures.
* Checkout is a demonstration. No payment is processed, and no card, address or
  personal detail is collected or transmitted.
* There are no reviews, ratings or testimonials.
