import * as THREE from 'three';

/**
 * Particle formations for the seven stages of "From Spice to Masala".
 *
 * Each stage is a pure function producing a position and a colour for every
 * particle. The scene lerps between neighbouring stages, so the whole sequence
 * is one continuous body of spice changing state — scattered seed becoming
 * sorted, roasted, ground, blended and finally packed — rather than seven
 * separate scenes cutting between each other.
 *
 * Kept as data so the look can be tuned without touching render code.
 */

/** Whole-spice colours, sampled from the packaging photography. */
const SPICE_COLOURS = [
  '#b08a4a', // coriander
  '#8a6a3c', // cumin
  '#b4291d', // chilli
  '#3d332c', // pepper
  '#dfa02b', // turmeric
  '#5f7a3c', // curry leaf
];

/** What everything becomes once blended. */
const MASALA = new THREE.Color('#a8391f');
const ROASTED = new THREE.Color('#7a3a1c');

export interface Formation {
  positions: Float32Array;
  colours: Float32Array;
  /** Per-particle size multiplier. */
  scales: Float32Array;
}

const rand = (seed: number) => {
  // Deterministic pseudo-random so the formations are stable across reloads.
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const empty = (count: number): Formation => ({
  positions: new Float32Array(count * 3),
  colours: new Float32Array(count * 3),
  scales: new Float32Array(count),
});

const paint = (f: Formation, i: number, colour: THREE.Color) => {
  f.colours[i * 3] = colour.r;
  f.colours[i * 3 + 1] = colour.g;
  f.colours[i * 3 + 2] = colour.b;
};

const place = (f: Formation, i: number, x: number, y: number, z: number, scale: number) => {
  f.positions[i * 3] = x;
  f.positions[i * 3 + 1] = y;
  f.positions[i * 3 + 2] = z;
  f.scales[i] = scale;
};

/** Which of the six spices a given particle belongs to. */
const groupOf = (i: number) => i % SPICE_COLOURS.length;

/* ------------------------------------------------------------------ stages */

/** 01 SOURCE — loose on the ground, still carrying the field. */
function source(count: number): Formation {
  const f = empty(count);
  for (let i = 0; i < count; i++) {
    const a = rand(i) * Math.PI * 2;
    const r = Math.sqrt(rand(i + 900)) * 2.6;
    place(
      f,
      i,
      Math.cos(a) * r,
      -1.15 + rand(i + 40) * 0.28,
      Math.sin(a) * r * 0.55,
      0.7 + rand(i + 7) * 0.7
    );
    paint(f, i, new THREE.Color(SPICE_COLOURS[groupOf(i)]));
  }
  return f;
}

/** 02 SELECT — sorted by hand into six distinct piles. */
function select(count: number): Formation {
  const f = empty(count);
  const groups = SPICE_COLOURS.length;
  for (let i = 0; i < count; i++) {
    const g = groupOf(i);
    const angle = (g / groups) * Math.PI * 2;
    const cx = Math.cos(angle) * 1.85;
    const cz = Math.sin(angle) * 0.9;
    const a = rand(i + 12) * Math.PI * 2;
    const r = Math.sqrt(rand(i + 55)) * 0.42;
    place(
      f,
      i,
      cx + Math.cos(a) * r,
      -1.0 + rand(i + 3) * 0.3,
      cz + Math.sin(a) * r * 0.6,
      0.75 + rand(i + 9) * 0.6
    );
    paint(f, i, new THREE.Color(SPICE_COLOURS[g]));
  }
  return f;
}

/** 03 ROAST — lifted in the heat of a pan, colours deepening. */
function roast(count: number): Formation {
  const f = empty(count);
  for (let i = 0; i < count; i++) {
    const a = rand(i + 21) * Math.PI * 2;
    const r = Math.sqrt(rand(i + 66)) * 1.5;
    const lift = rand(i + 88);
    place(
      f,
      i,
      Math.cos(a) * r,
      -0.9 + lift * 1.5,
      Math.sin(a) * r * 0.7,
      0.7 + rand(i + 13) * 0.5
    );
    const base = new THREE.Color(SPICE_COLOURS[groupOf(i)]);
    paint(f, i, base.lerp(ROASTED, 0.35 + lift * 0.3));
  }
  return f;
}

/** 04 GRIND — broken down against stone, spread into a flat disc. */
function grind(count: number): Formation {
  const f = empty(count);
  for (let i = 0; i < count; i++) {
    const a = rand(i + 31) * Math.PI * 2;
    const r = Math.sqrt(rand(i + 77)) * 2.1;
    place(
      f,
      i,
      Math.cos(a) * r,
      -1.1 + rand(i + 5) * 0.12,
      Math.sin(a) * r * 0.62,
      0.34 + rand(i + 17) * 0.3 // fragments are markedly finer
    );
    const base = new THREE.Color(SPICE_COLOURS[groupOf(i)]);
    paint(f, i, base.lerp(ROASTED, 0.45));
  }
  return f;
}

/** 05 BLEND — the moment separate spices stop being separate. */
function blend(count: number): Formation {
  const f = empty(count);
  for (let i = 0; i < count; i++) {
    const t = rand(i + 41);
    const turn = t * Math.PI * 6;
    const r = 0.25 + t * 1.55;
    place(
      f,
      i,
      Math.cos(turn) * r,
      -0.85 + t * 1.25,
      Math.sin(turn) * r * 0.6,
      0.36 + rand(i + 19) * 0.28
    );
    const base = new THREE.Color(SPICE_COLOURS[groupOf(i)]);
    // Individual identity survives only at the edges of the swirl.
    paint(f, i, base.lerp(MASALA, 0.62 + t * 0.34));
  }
  return f;
}

/** 06 PACK — collapsed into the block the packet is filled from. */
function pack(count: number): Formation {
  const f = empty(count);
  for (let i = 0; i < count; i++) {
    place(
      f,
      i,
      (rand(i + 51) - 0.5) * 1.5,
      -1.0 + rand(i + 61) * 1.75,
      (rand(i + 71) - 0.5) * 0.5,
      0.34 + rand(i + 23) * 0.2
    );
    paint(f, i, MASALA.clone().lerp(new THREE.Color('#8f2c17'), rand(i + 81) * 0.5));
  }
  return f;
}

/** 07 SERVE — settled, calm, out of the way of the product. */
function serve(count: number): Formation {
  const f = empty(count);
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + rand(i + 91) * 0.4;
    const r = 2.35 + rand(i + 101) * 0.5;
    place(
      f,
      i,
      Math.cos(a) * r,
      -1.2 + rand(i + 111) * 0.18,
      Math.sin(a) * r * 0.5,
      0.3 + rand(i + 27) * 0.24
    );
    paint(f, i, MASALA.clone().lerp(new THREE.Color('#c1663d'), rand(i + 121) * 0.6));
  }
  return f;
}

const BUILDERS = [source, select, roast, grind, blend, pack, serve];

export const STAGE_COUNT = BUILDERS.length;

export const buildFormations = (count: number): Formation[] =>
  BUILDERS.map((build) => build(count));
