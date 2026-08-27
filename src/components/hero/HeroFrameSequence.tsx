import { useEffect, useRef, useState } from 'react';
import manifest from '../../data/heroManifest.json';
import { clamp, pad4 } from '../../lib/utils';
import { frameStride } from '../../lib/performance';
import type { CapabilityTier } from '../../types';

/**
 * Hero frame sequence
 * -------------------------------------------------------------
 *   scroll position  →  normalised progress 0…1  →  frame index  →  canvas
 *
 * A single <canvas> renders the cinematic sequence supplied in
 * `img/hero frames/` (converted to WebP by scripts/process-hero-frames.mjs).
 * No frame ever becomes a DOM node and no frame change touches React state —
 * progress is read and painted inside one requestAnimationFrame loop.
 *
 * Memory: decoding 100 frames at once would cost hundreds of megabytes, so
 * images are held in a moving window around the current frame plus a permanent
 * set of keyframes. Anything outside is released for the browser to reclaim,
 * which keeps a fast scroll-back from ever showing an empty canvas.
 */

/** Frames either side of the playhead kept decoded. */
const WINDOW = 18;
/** Every Nth frame is retained permanently as a fallback for fast seeks. */
const KEYFRAME_EVERY = 8;
/** Parallel image requests. */
const CONCURRENCY = 6;

interface Props {
  /** Element whose scroll travel drives playback. */
  progressRef: React.RefObject<HTMLElement>;
  tier: CapabilityTier;
  useMobileSet: boolean;
  onProgress?: (progress: number) => void;
  onReady?: () => void;
}

export default function HeroFrameSequence({
  progressRef,
  tier,
  useMobileSet,
  onProgress,
  onReady,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scroller = progressRef.current;
    if (!canvas || !scroller) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const set = useMobileSet ? manifest.mobile : manifest.desktop;
    const stride = useMobileSet ? 1 : frameStride(tier);
    // Indices into the on-disk sequence that this session will actually use.
    const indices: number[] = [];
    for (let i = 0; i < set.frameCount; i += stride) indices.push(i);
    if (indices[indices.length - 1] !== set.frameCount - 1) {
      indices.push(set.frameCount - 1);
    }
    const total = indices.length;

    const src = (slot: number) => `${set.basePath}/hero-${pad4(indices[slot] + 1)}.webp`;
    const isKeyframe = (slot: number) =>
      slot % KEYFRAME_EVERY === 0 || slot === 0 || slot === total - 1;

    const images: (HTMLImageElement | null)[] = new Array(total).fill(null);
    const state: Uint8Array = new Uint8Array(total); // 0 idle · 1 loading · 2 ready
    let inFlight = 0;
    let doneCount = 0;
    let disposed = false;
    let current = -1;
    let lastDrawn = -1;
    let direction = 1;
    let rafId = 0;
    let reportedProgress = -1;

    /* ------------------------------------------------------------ loading */

    const request = (slot: number) => {
      if (disposed || slot < 0 || slot >= total || state[slot] !== 0) return;
      if (inFlight >= CONCURRENCY) return;
      state[slot] = 1;
      inFlight++;
      const img = new Image();
      img.decoding = 'async';
      if (slot === 0) img.fetchPriority = 'high';
      img.onload = () => {
        inFlight--;
        if (disposed) return;
        images[slot] = img;
        state[slot] = 2;
        doneCount++;
        // Throttle the loading readout — it drives a progress rule, not frames.
        if (doneCount === total || doneCount % 5 === 0) setLoaded(doneCount);
        if (slot === 0 && !ready) {
          setReady(true);
          onReady?.();
        }
        lastDrawn = -1; // allow an immediate repaint with the better frame
        pump();
      };
      img.onerror = () => {
        inFlight--;
        state[slot] = 0;
        pump();
      };
      img.src = src(slot);
    };

    /** Queue the frames the playhead is about to need, in travel order. */
    const pump = () => {
      if (disposed) return;
      const head = current < 0 ? 0 : current;
      const order: number[] = [];
      for (let d = 0; d <= WINDOW; d++) {
        order.push(head + d * direction);
        if (d) order.push(head - d * direction);
      }
      for (let slot = 0; slot < total; slot += KEYFRAME_EVERY) order.push(slot);
      for (const slot of order) {
        if (inFlight >= CONCURRENCY) break;
        request(slot);
      }
    };

    /** Drop decoded frames the playhead has left behind. */
    const release = () => {
      if (current < 0) return;
      for (let slot = 0; slot < total; slot++) {
        if (state[slot] !== 2 || isKeyframe(slot)) continue;
        if (Math.abs(slot - current) > WINDOW * 2) {
          const img = images[slot];
          if (img) img.src = '';
          images[slot] = null;
          state[slot] = 0;
          doneCount--;
        }
      }
    };

    /* ------------------------------------------------------------ drawing */

    let cssW = 0;
    let cssH = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, tier === 'high' ? 2 : 1.5);
      cssW = rect.width;
      cssH = rect.height;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastDrawn = -1;
    };

    /** Nearest decoded frame at or before `slot`, else the nearest after it. */
    const resolve = (slot: number): number => {
      if (state[slot] === 2) return slot;
      for (let d = 1; d < total; d++) {
        if (slot - d >= 0 && state[slot - d] === 2) return slot - d;
        if (slot + d < total && state[slot + d] === 2) return slot + d;
      }
      return -1;
    };

    const draw = (slot: number) => {
      const use = resolve(slot);
      if (use < 0 || use === lastDrawn) return;
      const img = images[use];
      if (!img) return;

      // Cover-fit: the canvas box shape is set by CSS and differs between the
      // full-bleed desktop stage and the mobile panel.
      const scale = Math.max(cssW / img.naturalWidth, cssH / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (cssW - w) / 2, (cssH - h) / 2, w, h);
      lastDrawn = use;
    };

    /* ------------------------------------------------------- playback loop */

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const rect = scroller.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const progress = travel <= 0 ? 0 : clamp(-rect.top / travel);

      if (Math.abs(progress - reportedProgress) > 0.002) {
        reportedProgress = progress;
        onProgress?.(progress);
      }

      const slot = Math.min(total - 1, Math.round(progress * (total - 1)));
      if (slot !== current) {
        direction = slot >= current ? 1 : -1;
        current = slot;
        pump();
        release();
      }
      draw(slot);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    request(0);
    pump();
    rafId = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      observer.disconnect();
      for (const img of images) if (img) img.src = '';
      images.length = 0;
    };
    // `ready` is intentionally excluded: it is set from inside this effect and
    // re-running would rebuild the whole image cache.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressRef, tier, useMobileSet]);

  const set = useMobileSet ? manifest.mobile : manifest.desktop;
  const pct = Math.round((loaded / set.frameCount) * 100);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="hero__canvas"
        aria-hidden="true"
        style={{ opacity: ready ? 1 : 0 }}
      />
      {/* Poster underneath: visible until the first frame decodes, and the
          entire hero visual for anyone the sequence never starts for. */}
      <img
        src={manifest.poster}
        alt=""
        aria-hidden="true"
        className="hero__poster"
        style={{ opacity: ready ? 0 : 1 }}
      />
      <div
        className="hero__loadbar"
        style={{ scale: `${clamp(pct / 100)} 1`, opacity: pct >= 100 ? 0 : 1 }}
        aria-hidden="true"
      />
    </>
  );
}
