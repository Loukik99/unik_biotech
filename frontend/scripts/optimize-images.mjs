/**
 * One-off image optimizer for the editorial homepage.
 *
 * Reads the raw photography from ../unik (2–6 MB each) and writes
 * web-optimized, responsive variants (webp + jpg at several widths)
 * into public/unik with clean, web-safe filenames.
 *
 * Run:  node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(__dirname, "..", "..", "unik");
const OUT_DIR = path.resolve(__dirname, "..", "public", "unik");

// Map the original "Agri  (N).jpeg" files to descriptive, web-safe slugs.
const NAME_BY_INDEX = {
  1: "paddy-transplanting",
  2: "tea-pickers-hills",
  3: "tea-plucking",
  4: "tea-plantation",
  5: "wheat-golden",
  6: "mustard-farmer",
  7: "mustard-field",
  8: "rice-spraying",
  9: "farmer-valley",
  10: "grain-drying",
  11: "aerial-fields",
  12: "rice-macro",
  13: "wheat-panorama",
  14: "tea-harvest-path",
};

const WIDTHS = [640, 1024, 1600, 2000, 2560];

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const entries = await fs.readdir(SRC_DIR);
  const jpegs = entries.filter((f) => /\.jpe?g$/i.test(f));

  const manifest = [];

  for (const file of jpegs) {
    const match = file.match(/\((\d+)\)/);
    if (!match) {
      console.warn(`Skipping (no index): ${file}`);
      continue;
    }
    const idx = Number(match[1]);
    const slug = NAME_BY_INDEX[idx];
    if (!slug) {
      console.warn(`Skipping (unmapped index ${idx}): ${file}`);
      continue;
    }

    const srcPath = path.join(SRC_DIR, file);
    const input = sharp(srcPath, { failOn: "none" });
    const meta = await input.metadata();
    const maxW = meta.width || 2560;

    const usableWidths = WIDTHS.filter((w) => w <= maxW);
    if (usableWidths.length === 0) usableWidths.push(maxW);

    for (const w of usableWidths) {
      const base = sharp(srcPath, { failOn: "none" })
        .rotate()
        .resize({ width: w, withoutEnlargement: true });

      await base
        .clone()
        .webp({ quality: 72, effort: 5 })
        .toFile(path.join(OUT_DIR, `${slug}-${w}.webp`));

      await base
        .clone()
        .jpeg({ quality: 78, mozjpeg: true, progressive: true })
        .toFile(path.join(OUT_DIR, `${slug}-${w}.jpg`));
    }

    manifest.push({ slug, index: idx, width: meta.width, height: meta.height, widths: usableWidths });
    console.log(`✓ ${file} → ${slug} (${meta.width}×${meta.height})`);
  }

  await fs.writeFile(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ${manifest.length} images → ${OUT_DIR}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
