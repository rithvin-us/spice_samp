/**
 * SOLI MASALA — hero frame pipeline
 * -------------------------------------------------------------
 * Reads the cinematic source that lives in `img/hero frames/`
 * and produces web-served WebP sequences under `public/img/hero-frames/`.
 *
 * The source directory is never modified. Nothing is deleted from `img/`.
 *
 * Usage:
 *   node scripts/process-hero-frames.mjs           # build if missing
 *   node scripts/process-hero-frames.mjs --force   # always rebuild
 *
 * Equivalent manual FFmpeg extraction (documented in docs/HERO_ASSET_PIPELINE.md):
 *   ffmpeg -i hero-source.mp4 -vf "fps=10,scale=1280:-2" -q:v 2 hero-%04d.webp
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR = path.join(root, 'img', 'hero frames');
const OUT_DIR = path.join(root, 'public', 'img', 'hero-frames');
const OUT_DIR_MOBILE = path.join(OUT_DIR, 'mobile');
const POSTER = path.join(root, 'public', 'img', 'hero-poster.webp');

/** Desktop sequence: native width, ~10fps sampling. */
const DESKTOP = { fps: 10, width: 1280, quality: 74 };
/** Mobile sequence: half the frames, portrait-friendly crop applied in CSS. */
const MOBILE = { everyNth: 2, width: 720, quality: 68 };

const force = process.argv.includes('--force');

const VIDEO_EXT = new Set(['.mp4', '.mov', '.webm', '.m4v']);
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;
const pad = (n) => String(n).padStart(4, '0');

function dirSize(dir) {
  if (!fs.existsSync(dir)) return 0;
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile())
    .reduce((sum, e) => sum + fs.statSync(path.join(dir, e.name)).size, 0);
}

function emptyDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.webp')) {
      fs.unlinkSync(path.join(dir, entry.name));
    }
  }
}

/** Locate the cinematic source: a video, or a folder of already-rendered frames. */
function findSource() {
  if (!fs.existsSync(SOURCE_DIR)) {
    throw new Error(`Source directory not found: ${SOURCE_DIR}`);
  }
  const entries = fs.readdirSync(SOURCE_DIR).sort();
  const video = entries.find((f) => VIDEO_EXT.has(path.extname(f).toLowerCase()));
  if (video) return { kind: 'video', file: path.join(SOURCE_DIR, video) };

  const frames = entries.filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()));
  if (frames.length) {
    return { kind: 'frames', files: frames.map((f) => path.join(SOURCE_DIR, f)) };
  }
  throw new Error(`No video or image frames found in ${SOURCE_DIR}`);
}

/** Explode a video into intermediate JPEGs inside the OS temp dir. */
function extractToTemp(videoFile) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'soli-hero-'));
  console.log(`  decoding with ffmpeg → ${tmp}`);
  execFileSync(
    ffmpegPath,
    [
      '-hide_banner',
      '-loglevel', 'error',
      '-i', videoFile,
      '-vf', `fps=${DESKTOP.fps},scale=${DESKTOP.width}:-2:flags=lanczos`,
      '-q:v', '2',
      path.join(tmp, 'frame-%04d.jpg'),
    ],
    { stdio: 'inherit' }
  );
  return {
    tmp,
    files: fs
      .readdirSync(tmp)
      .filter((f) => f.endsWith('.jpg'))
      .sort()
      .map((f) => path.join(tmp, f)),
  };
}

async function main() {
  const manifestPath = path.join(OUT_DIR, 'manifest.json');
  if (!force && fs.existsSync(manifestPath)) {
    const existing = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    console.log(
      `Hero frames already built (${existing.frameCount} frames). Use --force to rebuild.`
    );
    return;
  }

  console.log('SOLI MASALA — hero frame pipeline\n');
  const source = findSource();
  let sourceFiles;
  let tmpDir = null;

  if (source.kind === 'video') {
    console.log(`  source video: ${path.relative(root, source.file)}`);
    const extracted = extractToTemp(source.file);
    tmpDir = extracted.tmp;
    sourceFiles = extracted.files;
  } else {
    console.log(`  source frames: ${source.files.length} images`);
    sourceFiles = source.files;
  }

  if (!sourceFiles.length) throw new Error('No frames were produced from the source.');

  emptyDir(OUT_DIR);
  emptyDir(OUT_DIR_MOBILE);

  const meta = await sharp(sourceFiles[0]).metadata();
  console.log(`\n  ${sourceFiles.length} frames @ ${meta.width}x${meta.height}`);

  let mobileCount = 0;
  for (let i = 0; i < sourceFiles.length; i++) {
    const name = `hero-${pad(i + 1)}.webp`;
    await sharp(sourceFiles[i])
      .resize({ width: DESKTOP.width, withoutEnlargement: true })
      .webp({ quality: DESKTOP.quality, effort: 5 })
      .toFile(path.join(OUT_DIR, name));

    if (i % MOBILE.everyNth === 0) {
      mobileCount++;
      await sharp(sourceFiles[i])
        .resize({ width: MOBILE.width, withoutEnlargement: true })
        .webp({ quality: MOBILE.quality, effort: 5 })
        .toFile(path.join(OUT_DIR_MOBILE, `hero-${pad(mobileCount)}.webp`));
    }
    if ((i + 1) % 20 === 0) console.log(`  … ${i + 1}/${sourceFiles.length}`);
  }

  // Static poster used by the reduced-motion / low-capability fallback.
  await sharp(sourceFiles[0])
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(POSTER);

  const desktopMeta = await sharp(path.join(OUT_DIR, 'hero-0001.webp')).metadata();
  const mobileMeta = await sharp(path.join(OUT_DIR_MOBILE, 'hero-0001.webp')).metadata();

  const manifest = {
    generatedBy: 'scripts/process-hero-frames.mjs',
    sourceKind: source.kind,
    desktop: {
      basePath: '/img/hero-frames',
      frameCount: sourceFiles.length,
      width: desktopMeta.width,
      height: desktopMeta.height,
    },
    mobile: {
      basePath: '/img/hero-frames/mobile',
      frameCount: mobileCount,
      width: mobileMeta.width,
      height: mobileMeta.height,
    },
    poster: '/img/hero-poster.webp',
    format: 'webp',
    naming: 'hero-0001.webp (1-indexed, zero-padded to 4)',
    frameCount: sourceFiles.length,
  };
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  // Second copy inside src/ so the app imports frame counts and dimensions at
  // build time instead of fetching them at runtime.
  const srcManifest = path.join(root, 'src', 'data', 'heroManifest.json');
  fs.mkdirSync(path.dirname(srcManifest), { recursive: true });
  fs.writeFileSync(srcManifest, `${JSON.stringify(manifest, null, 2)}\n`);

  const dSize = dirSize(OUT_DIR);
  const mSize = dirSize(OUT_DIR_MOBILE);
  console.log(`\n  desktop  ${sourceFiles.length} frames  ${desktopMeta.width}x${desktopMeta.height}  ${mb(dSize)}  (avg ${kb(dSize / sourceFiles.length)})`);
  console.log(`  mobile   ${mobileCount} frames  ${mobileMeta.width}x${mobileMeta.height}  ${mb(mSize)}  (avg ${kb(mSize / mobileCount)})`);
  console.log(`  total    ${mb(dSize + mSize)}`);
  console.log(`\n  manifest → ${path.relative(root, manifestPath)}`);

  if (tmpDir) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    console.log('  temp frames cleaned up (originals in img/ untouched)');
  }
}

main().catch((err) => {
  console.error(`\nhero pipeline failed: ${err.message}`);
  process.exit(1);
});
