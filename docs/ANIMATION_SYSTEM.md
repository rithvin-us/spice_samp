# Animation system

A map of every moving thing on the site, how it is driven, and where it stops.
This is the reference for anyone touching motion — read it before adding a new
animation so the new one behaves like the ones already here.

The whole system rests on two rules:

1. **Motion is driven by refs and one `requestAnimationFrame` loop, never by
   React state.** Scroll progress, pointer position and frame indices are read
   and painted inside a loop; React re-renders only when something genuinely
   discrete changes (the active stage, the spotlight index). This is why the
   page stays at 60fps while scrolling — the component tree is not re-rendering
   on every frame.
2. **Every animation has an off switch, and the content underneath it does
   not.** Reduced motion, low-capability devices and touch each remove motion
   without removing a single word, price, product or link.

---

## The governor: capability tiers

Everything below is gated by `src/lib/performance.ts`, which resolves one of
four tiers **once** per session and caches it:

| Tier | Frame sequence | WebGL | Device pixel ratio | Chosen when |
|---|---|---|---|---|
| `high` | full, every frame | yes, detailed | up to 1.75× | fast desktop-class hardware |
| `medium` | reduced (every 2nd frame) | yes, simplified | up to 1.25× | mid device, or coarse pointer on a narrow screen |
| `low` | off — static poster | no | — | `save-data`, 2G, ≤2GB RAM, ≤2 cores, or no WebGL |
| `reduced` | off — static poster | no | — | `prefers-reduced-motion: reduce` |

Inputs: `navigator.deviceMemory`, `hardwareConcurrency`, `connection.saveData`,
`connection.effectiveType`, WebGL support, pointer type and viewport width.

Helpers the rest of the code calls: `allowsSequence(tier)`, `allowsWebGL(tier)`,
`dprCap(tier)`, `frameStride(tier)`, `prefersReducedMotion()`.

> **Note / opportunity.** The tier is decided at load and cached for the
> session. There is no runtime step-down if a device thermally throttles
> mid-visit. An adaptive layer (watch frame time, drop `dpr` or stride when it
> slips) would be the natural next refinement — see *Future work*.

---

## 1. Smooth scroll and reveals — `src/lib/animations.ts`

- **Lenis smooth scroll.** A short lerp (`duration: 0.9`) that takes the edge
  off wheel stepping so the pinned hero scrubs cleanly. No inertia, no scroll
  hijacking. **Disabled entirely** for touch (`pointer: coarse`) and reduced
  motion, where the OS already owns momentum.
- **`scrollTo(target, offset)`** — used for in-page hash links; falls back to
  native `scrollTo` when Lenis is off.
- **Reveal observer.** One shared `IntersectionObserver` adds `.is-visible` to
  `.reveal` elements once, then unobserves them. CSS does the rest: a 0.9s
  opacity + 1.25rem rise (`base.css`). Under reduced motion the element is
  simply visible with no transition.

This is the *only* general scroll behaviour on the site — the two cinematic
sections read their own rects instead of using a scroll-animation library, which
keeps ~70KB of runtime out of the bundle and leaves native scrolling intact.

---

## 2. The hero — scroll-scrubbed frame sequence

`src/components/hero/HeroSection.tsx` + `HeroFrameSequence.tsx`

The opening is a cinematic WebP sequence painted to a **single `<canvas>`**,
scrubbed by scroll position:

```
scroll position → normalised progress 0…1 → frame index → canvas
```

Key properties:

- **Sticky pin, not a scroll-jack.** The section is `position: sticky`; the page
  never fights the reader and nothing shifts on load.
- **No frame is ever a DOM node, and no frame change touches React state.**
  Everything happens in one rAF loop.
- **Memory-managed decode.** A moving window of 18 frames either side of the
  playhead stays decoded, plus a permanent keyframe every 8 frames as a
  fast-seek fallback; anything else is released. Decoding all ~100 frames at
  once would cost hundreds of megabytes.
- **Concurrency 6** parallel image requests, queued in travel order.
- **Poster underneath.** `manifest.poster` shows until the first frame decodes,
  and is the *entire* hero for any session where the sequence never runs.
- **Overlay copy** (wordmark, headline, CTAs) is ordinary, selectable,
  translated HTML. Its fade is written **directly to the DOM** from
  `handleProgress` — fading it through React state would re-render the section
  every frame.
- **Mobile** gets a purpose-built panel layout and a separate mobile frame set,
  not a cropped desktop frame.
- A thin **load bar** shows decode progress and disappears at 100%.

Fallback (`low` / `reduced` / no-sequence): a static `hero--static` poster with
the same overlay. Every link and word is present.

---

## 3. "From Spice to Masala" — the WebGL journey

`src/components/making/MakingOfSection.tsx` → `SpiceJourneyScene.tsx` +
`spiceGeometry.ts` + `stageFormations.ts`

The signature section, and the only WebGL scene on the homepage. It earns the
place because the subject — *separate ingredients gradually stopping being
separate* — is a transformation, which a row of static images cannot show.

**Orchestration (`MakingOfSection`).** One rAF loop reads the sticky section's
own rect and drives four things from a single progress value:

1. the WebGL scene, via a **ref** (never state);
2. the active stage index — state, but only 7 times across the whole scroll;
3. the progress rail (`--rail` custom property);
4. the real product packet, which fades/scales in near the `PACK` stage.

The scene chunk is **lazy-loaded** and only requested once the section is near
the viewport (`inView`). Below `high`, the instance count roughly halves.

**The scene (`SpiceJourneyScene`).** Six spice types as **instanced meshes**
(up to ~150 instances each on `high`, ~68 on `low` → up to ~900 lit meshes).
Each frame lerps every instance between two neighbouring **stage formations**
with a smoothstep ease, adds a slow per-instance tumble and drift so the body
stays alive while the page is still, and transitions colour raw → roasted →
blended masala. Progress arrives through a ref and is read inside `useFrame`, so
**scrolling never re-renders React**. The loop allocates nothing — dummy
`Object3D` and `Color` scratch objects are reused every frame.

**Formations (`stageFormations.ts`)** are pure data: each of the seven stages is
a function producing a position and colour per particle, sampled from the
packaging photography. The look can be tuned without touching render code.

Fallback (no WebGL / reduced): the same seven stages as a plain `<ol>` list with
all copy, plus a visually-hidden `<ol>` that always exists for assistive tech
and search — the canvas is never the only place this content lives.

---

## 4. The 3D product viewer — `src/components/three/ModelViewer.tsx`

`@react-three/drei` renders a GLTF packet with a warm key light, contact
shadows, an environment map (on `high`) and damped `OrbitControls` with gentle
auto-rotate (on `high`). **It only mounts when a product actually declares a
`modelPath`** — with no GLB present, `ProductViewer` keeps showing the supplied
packaging artwork. Nothing here fakes 3D out of a flat image.

---

## 5. Micro-interactions

| What | File | Behaviour | Off when |
|---|---|---|---|
| Trailing cursor dot | `ui/Cursor.tsx` + `.cursor` | 18px dot, light 0.2 lerp, snaps to pointer on first sight, `scale`s to 1.5 over interactive controls | touch, reduced motion |
| Magnetic button | `ui/MagneticButton.tsx` | ≤5px pull toward the pointer | touch, reduced motion |
| Reveal on scroll | `ui/RevealText.tsx` + `.reveal` | fade + 1.25rem rise, once | reduced motion (stays visible) |
| Spotlight swap | `home/ProductSpotlight.tsx` + `swap-in` / `swap-in-prev` | keyed re-mount → directional slide when the blend changes | reduced motion |
| Client marquee | `social/ClientStrip.tsx` + `client-scroll` | pure-CSS 42s loop of a duplicated track, pauses on hover | reduced motion (becomes a wrapping list) |
| Cart bump | `layout/Navbar` + `cart-bump` | nav cart icon scale-bounce when an item is added | reduced motion |
| Stage-in | `journey__stageblock` + `stage-in` | stage copy fades/rises as the active stage changes | reduced motion |
| Loading sweep | `ui/LoadingScreen.tsx` + `loading-sweep` | sweeping rule under the logo, route suspense fallback | — |

The cursor and marquee are the two worth calling out: the cursor writes only
`translate` (JS) and animates only `scale` (CSS), two independent properties, so
it can change size without ever re-centring or drifting; the marquee is a pure
CSS translation of a duplicated track, so it costs **no JavaScript and no
per-frame work**, and its duplicate is `aria-hidden`.

---

## 6. Route & scroll behaviour — `src/App.tsx` (`ScrollManager`)

- Route changes reset to the top; in-page hashes scroll to their section (with a
  60ms grace for a lazy route to mount its target).
- **Scroll-up-at-top → Home.** On any sub-page, an upward wheel/touch gesture
  while already at the top navigates back to the homepage hero. A small
  accumulator debounces it so a single nudge doesn't fire.

> **Note / opportunity.** This is the one place the site overrides native
> scrolling. It is a deliberate "pull back to the hero" gesture, but because it
> hijacks wheel-up at the top of every sub-page it can surprise a reader who
> only meant to scroll up a little (e.g. after the browser restored scroll
> position). If it ever feels accidental, raise the threshold, require a
> sustained gesture, or gate it behind an explicit affordance.

---

## Where the whole thing is strong

- **Ref + rAF discipline** keeps React out of the hot path everywhere. This is
  the single most important reason the site feels smooth.
- **Four-tier graceful degradation with full content parity** — motion is a
  progressive enhancement, never a gate on information.
- **Reduced motion is honoured in 13 separate CSS guards plus the JS**, and the
  reveal/marquee fall back to *visible content*, not blank space.
- **Bundle discipline** — Three.js and the model viewer are lazy chunks; the
  initial JS is ~97KB gzipped. Hero frames are served `immutable` (see
  `vercel.json`).
- **Accessibility** — canvases are `aria-hidden` with real text equivalents, the
  system cursor is never hidden, and there is a skip link.

## Future work

- **Adaptive runtime downgrade** — sample frame time and drop `dpr`/stride when
  it slips, instead of deciding the tier once at load.
- **Revisit scroll-up-to-Home** ergonomics (above).
- **Optional Lighthouse CI budget** for the hero/journey routes so a regression
  in motion cost shows up on a PR (see `docs/CI_CD.md`).
