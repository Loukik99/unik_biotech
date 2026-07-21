import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, "..", "unik", "agriculture (5).jpg");
const OUT_DIR = path.resolve(__dirname, "public", "unik");
const SLUG = "sugarcane-harvesting";
const WIDTHS = [640, 1024, 1600, 2000, 2560];

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const input = sharp(SRC, { failOn: "none" });
  const meta = await input.metadata();
  const maxW = meta.width || 2560;
  const usableWidths = WIDTHS.filter((w) => w <= maxW);
  if (usableWidths.length === 0) usableWidths.push(maxW);

  for (const w of usableWidths) {
    const base = sharp(SRC, { failOn: "none" }).rotate().resize({ width: w, withoutEnlargement: true });

    await base
      .clone()
      .webp({ quality: 72, effort: 5 })
      .toFile(path.join(OUT_DIR, `${SLUG}-${w}.webp`));

    await base
      .clone()
      .jpeg({ quality: 78, mozjpeg: true, progressive: true })
      .toFile(path.join(OUT_DIR, `${SLUG}-${w}.jpg`));

    console.log(`✓ ${SLUG}-${w}`);
  }

  console.log(`\nDone. All files written to ${OUT_DIR}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});