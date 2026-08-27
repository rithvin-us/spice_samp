import * as THREE from 'three';

/**
 * Real silhouettes for the six spices in the blend.
 *
 * Flat round sprites read as confetti — the giveaway is that everything shares
 * one outline and takes no light. These are actual geometries, lit and shaded,
 * so a peppercorn looks knobbly, a chilli tapers, a curry leaf is a thin blade
 * that catches light on one side, and turmeric is a broken chunk of rhizome.
 *
 * All are deliberately low-poly: at a few hundred instances the silhouette and
 * the shading do the work, not the triangle count.
 */

export interface SpiceType {
  id: string;
  colour: string;
  geometry: THREE.BufferGeometry;
  /** Non-uniform scale baked per type, so one seed is long and another round. */
  ratio: THREE.Vector3;
  roughness: number;
  /** Leaves are thin and must be visible from behind. */
  doubleSided?: boolean;
}

/** A pointed leaf blade, built from two mirrored curves. */
function leafGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.5);
  shape.quadraticCurveTo(0.34, -0.16, 0.2, 0.34);
  shape.quadraticCurveTo(0.12, 0.46, 0, 0.5);
  shape.quadraticCurveTo(-0.12, 0.46, -0.2, 0.34);
  shape.quadraticCurveTo(-0.34, -0.16, 0, -0.5);
  const geo = new THREE.ShapeGeometry(shape, 8);
  geo.computeVertexNormals();
  return geo;
}

/** A dried chilli: tapered, slightly bent, closed at the tip. */
function chilliGeometry(): THREE.BufferGeometry {
  const geo = new THREE.ConeGeometry(0.3, 1.5, 7, 4);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  // Bend it along its length so it is never a perfect cone.
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const t = (y + 0.75) / 1.5;
    pos.setX(i, pos.getX(i) + Math.sin(t * 2.4) * 0.16);
    // Taper the shoulders in so it reads as a pod rather than a spike.
    const shrink = 0.72 + 0.28 * Math.sin(t * Math.PI);
    pos.setX(i, pos.getX(i) * shrink);
    pos.setZ(i, pos.getZ(i) * shrink);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

/** A broken piece of dried rhizome — irregular, not a tidy box. */
function chunkGeometry(): THREE.BufferGeometry {
  const geo = new THREE.BoxGeometry(0.7, 0.5, 1, 2, 1, 2);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const n = Math.sin(pos.getX(i) * 31.1 + pos.getY(i) * 17.7 + pos.getZ(i) * 11.3);
    pos.setXYZ(
      i,
      pos.getX(i) * (1 + n * 0.22),
      pos.getY(i) * (1 + n * 0.18),
      pos.getZ(i) * (1 + n * 0.2)
    );
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

export function buildSpiceTypes(): SpiceType[] {
  return [
    {
      id: 'coriander',
      colour: '#c39a58',
      // Ribbed round seed — the icosahedron's facets read as the ridges.
      geometry: new THREE.IcosahedronGeometry(0.5, 1),
      ratio: new THREE.Vector3(1, 0.92, 1),
      roughness: 0.85,
    },
    {
      id: 'cumin',
      colour: '#8a6a3c',
      geometry: new THREE.SphereGeometry(0.5, 7, 5),
      ratio: new THREE.Vector3(0.36, 0.36, 1.25),
      roughness: 0.9,
    },
    {
      id: 'chilli',
      colour: '#a8231a',
      geometry: chilliGeometry(),
      ratio: new THREE.Vector3(1, 1, 1),
      roughness: 0.55,
    },
    {
      id: 'pepper',
      colour: '#4a3a30',
      geometry: new THREE.DodecahedronGeometry(0.5, 0),
      ratio: new THREE.Vector3(1, 0.96, 1),
      roughness: 0.78,
    },
    {
      id: 'turmeric',
      colour: '#d99327',
      geometry: chunkGeometry(),
      ratio: new THREE.Vector3(1, 1, 1),
      roughness: 0.82,
    },
    {
      id: 'curryLeaf',
      colour: '#5f7a3c',
      geometry: leafGeometry(),
      ratio: new THREE.Vector3(1.15, 1.5, 1),
      roughness: 0.62,
      doubleSided: true,
    },
  ];
}

/** Soft radial texture used for the ground shadow — avoids shipping an image. */
export function radialShadowTexture(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(74,49,35,0.26)');
    g.addColorStop(0.5, 'rgba(74,49,35,0.08)');
    g.addColorStop(1, 'rgba(74,49,35,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
