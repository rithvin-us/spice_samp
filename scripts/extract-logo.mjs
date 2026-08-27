/**
 * SOLI MASALA — logo asset preparation
 * -------------------------------------------------------------
 * The supplied `img/logo.jpg` is a 200x200 JPEG on an opaque white box, which
 * cannot sit on the site's cream surfaces. The final hero frame contains the
 * same official lockup at a much larger size on a flat cream background, so we
 * cut a transparent PNG from it.
 *
 * The mark itself is never redrawn or restyled — only the background is removed
 * by flood-filling inward from the edges, which leaves the white "SOLI"
 * lettering inside the red badge intact.
 *
 * Original assets in img/ are never modified.
 *
 * Usage: node scripts/extract-logo.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = path.join(root, 'public', 'img', 'hero-frames', 'hero-0100.webp');
const OUT = path.join(root, 'public', 'img', 'soli-logo.png');

// Bounding box of the lockup inside the 1280x720 final frame.
const CROP = { left: 290, top: 95, width: 760, height: 520 };
// Background is a flat warm cream; anything close to it gets flood-filled away.
const TOLERANCE = 46;

function isBackground(r, g, b) {
  // Cream backdrop ranges from #fdf3ec at the centre to #e1c2b1 in the vignette.
  const warmCream = r > 205 && g > 175 && b > 160 && r >= g && g >= b - 6;
  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  return warmCream && spread < 60;
}

function near(a, b) {
  return (
    Math.abs(a[0] - b[0]) < TOLERANCE &&
    Math.abs(a[1] - b[1]) < TOLERANCE &&
    Math.abs(a[2] - b[2]) < TOLERANCE
  );
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    throw new Error(`Missing ${SOURCE}. Run "npm run hero:frames" first.`);
  }

  const { data, info } = await sharp(SOURCE)
    .extract(CROP)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const at = (x, y) => (y * width + x) * channels;
  const seen = new Uint8Array(width * height);
  const stack = [];

  // Seed the flood fill from every border pixel that looks like background.
  const seed = (x, y) => {
    const i = at(x, y);
    if (!seen[y * width + x] && isBackground(data[i], data[i + 1], data[i + 2])) {
      seen[y * width + x] = 1;
      stack.push(x, y);
    }
  };
  for (let x = 0; x < width; x++) {
    seed(x, 0);
    seed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    seed(0, y);
    seed(width - 1, y);
  }

  let cleared = 0;
  while (stack.length) {
    const y = stack.pop();
    const x = stack.pop();
    const i = at(x, y);
    const colour = [data[i], data[i + 1], data[i + 2]];
    data[i + 3] = 0;
    cleared++;

    const neighbours = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];
    for (const [nx, ny] of neighbours) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const key = ny * width + nx;
      if (seen[key]) continue;
      const ni = at(nx, ny);
      const nc = [data[ni], data[ni + 1], data[ni + 2]];
      if (isBackground(nc[0], nc[1], nc[2]) && near(colour, nc)) {
        seen[key] = 1;
        stack.push(nx, ny);
      }
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .trim({ threshold: 1 })
    .resize({ width: 560, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 92 })
    .toFile(OUT);

  const pct = ((cleared / (width * height)) * 100).toFixed(1);
  const size = fs.statSync(OUT).size;
  console.log(`logo → ${path.relative(root, OUT)}`);
  console.log(`  ${width}x${height}, ${pct}% background removed, ${(size / 1024).toFixed(0)} KB`);
}

main().catch((err) => {
  console.error(`logo extraction failed: ${err.message}`);
  process.exit(1);
});
