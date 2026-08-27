# Hero asset pipeline

The SOLI hero is a **frame sequence**, not a `<video>` element. A canvas paints one
frame per animation tick, with the frame index driven by how far the reader has
scrolled through the hero section.

---

## Source

```
img/hero frames/hero_section_video_to_be_converted_to_frames.mp4
```

| | |
|---|---|
| Container | MP4 (H.264 High, yuv420p) |
| Resolution | 1280 × 720 |
| Frame rate | 24 fps |
| Duration | 10.01 s |
| Audio | AAC stereo (unused — discarded during extraction) |

The folder name contains a space, so it is never exposed to the browser. Nothing
in `img/` is modified, renamed or deleted by any script in this repository.

### What the footage shows

| Progress | Content |
|---|---|
| 0.00 – 0.25 | Whole cardamom, dried chilli and cinnamon on a wooden surface; blurred kitchen behind |
| 0.25 – 0.45 | A hand grinding spices in a stone mortar |
| 0.45 – 0.60 | Ground masala thrown from the mortar, SOLI packet entering frame |
| 0.60 – 0.80 | The Chicken Masala packet, centred, on a dressed kitchen table |
| 0.80 – 1.00 | The sequence resolves onto the SOLI MASALA lockup over flat cream |

The final frame's background is `#f5e7de`, which is the site's `--cream` token.
That is deliberate: the section directly below the hero opens on the same colour,
so the film hands over to the page without a visible seam.

---

## Web location

```
public/img/hero-frames/                hero-0001.webp … hero-0100.webp   (1280 × 720)
public/img/hero-frames/mobile/         hero-0001.webp … hero-0050.webp   (720 × 405)
public/img/hero-poster.webp            static first frame
public/img/hero-frames/manifest.json   generated description of both sets
src/data/heroManifest.json             same manifest, imported at build time
```

Browser URLs:

```
/img/hero-frames/hero-0001.webp
/img/hero-frames/mobile/hero-0001.webp
```

Naming is `hero-` + a 1-indexed, zero-padded 4-digit number + `.webp`. The
sequence is contiguous with no gaps in either set.

| Set | Frames | Size | Total | Avg/frame |
|---|---|---|---|---|
| Desktop | 100 | 1280 × 720 | 3.06 MB | 31 KB |
| Mobile | 50 | 720 × 405 | 0.76 MB | 15 KB |

---

## Regenerating

```bash
npm run hero:frames          # builds only if the manifest is missing
npm run hero:frames:force    # always rebuilds
```

`scripts/process-hero-frames.mjs` decodes the video with the bundled
`ffmpeg-static` binary (no system FFmpeg required), samples it at 10 fps, and
re-encodes each frame to WebP with `sharp`. Intermediate JPEGs go to the OS temp
directory and are deleted afterwards.

The script also accepts a folder of **already-rendered stills** instead of a
video — if `img/hero frames/` contains `.png`/`.jpg`/`.webp` files, those are used
directly. This is the path to take when replacing the sequence with a
professionally rendered one.

### Equivalent manual FFmpeg extraction

```bash
ffmpeg -i hero-source.mp4 -vf "fps=10,scale=1280:-2" -q:v 2 hero-%04d.webp
```

Documentation only — FFmpeg is never invoked at runtime, and the deployed site
has no dependency on it.

---

## Replacing the sequence later

1. Put the new video (or the new stills) in `img/hero frames/`.
2. Run `npm run hero:frames:force`.
3. Nothing else. Frame counts and dimensions are read from the regenerated
   manifest, so a 60-frame or a 240-frame sequence works with no code change.

If the new footage does not end on a light background, change `--cream` in
`src/styles/tokens.css`, or the `.statement` background, so the handover below
the hero still matches.

---

## Rendering

`src/components/hero/HeroFrameSequence.tsx`

```
scroll position → normalised progress 0…1 → frame index → canvas
```

* One `<canvas>`. No frame ever becomes a DOM node.
* One `requestAnimationFrame` loop. No React state changes while scrubbing —
  the loading readout is throttled and updates a handful of times in total.
* The pin is `position: sticky`, not a scroll-animation library's pin, so the
  page's own scrolling is never taken over and nothing shifts on load.

### Memory

Decoding 100 frames at 1280 × 720 at once would cost several hundred megabytes,
so frames are held in a **moving window** around the playhead (±18) plus a
permanently retained keyframe every 8th frame. Frames outside that window are
released. The keyframes mean a fast scroll-back always has *something* to draw
while the window refills, so the canvas never goes blank.

### Loading

* Frame 1 is `<link rel="preload">`ed in `index.html` and requested first.
* At most 6 requests are in flight at once.
* Frames are queued in the direction of travel, so scrolling down prefetches
  ahead and scrolling up prefetches behind.
* Until the first frame decodes, `hero-poster.webp` is shown underneath, so
  there is no blank hero at any point.

---

## Mobile

The desktop set is 16:9. Covering a tall phone screen with it would crop away
roughly half the width and cut the closing SOLI lockup in half, so the mobile
composition is different by design rather than by scaling:

* a cinematic 3:2 panel with the sequence inside it,
* the wordmark, headline and both calls to action below it in cream.

The 720 px set (every second frame) is used there — half the frames and a
quarter of the pixels.

The layout switches on `(min-width: 48rem) and (min-aspect-ratio: 4/3)`, so a
tablet held in portrait also gets the panel rather than a badly cropped film.

---

## Capability tiers

| Tier | Hero |
|---|---|
| `high` | Every frame, DPR up to 2 |
| `medium` | Every 2nd frame, DPR up to 1.5 |
| `low` | Static poster, no sequence |
| `reduced` | Static poster, no sequence (`prefers-reduced-motion`) |

At `low` and `reduced` the hero section collapses to viewport height — there is
no long scroll to travel through — and the headline, supporting copy and both
calls to action stay exactly where they are. See `src/lib/performance.ts`.
