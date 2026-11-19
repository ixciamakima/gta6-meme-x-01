// gta6-meme-x-01 entry: the entry is the X post itself, so this program
// does exactly one thing — it hands the house the post's address by
// copying POST.json from the repository into the output directory, where
// the gate reads it. Nothing this program writes is judged: the house
// reads the post from X (its first picture, then its text).

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(join(botDir, "POST.json"), join(outputDir, "POST.json"));
} catch (error) {
  console.error(
    `could not copy POST.json from ${botDir}: ${(error as Error).message}`,
  );
  process.exit(1);
}
