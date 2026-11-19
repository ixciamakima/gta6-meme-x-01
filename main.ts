import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(botDir, "POST.json");
const target = join(outDir, "POST.json");

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

try {
  mkdirSync(outDir, { recursive: true });
} catch (error) {
  fail(`cannot create output directory ${outDir}: ${String(error)}`);
}

try {
  copyFileSync(source, target);
} catch (error) {
  fail(`cannot copy ${source} to ${target}: ${String(error)}`);
}

let parsed: unknown;
let sourceBytes: Buffer;
let targetBytes: Buffer;
try {
  sourceBytes = readFileSync(source);
  targetBytes = readFileSync(target);
} catch (error) {
  fail(`cannot read back POST.json for verification: ${String(error)}`);
}
if (!sourceBytes.equals(targetBytes)) {
  fail("copied POST.json differs from the source file");
}
try {
  parsed = JSON.parse(targetBytes.toString("utf8"));
} catch (error) {
  fail(`copied POST.json does not parse as JSON: ${String(error)}`);
}

if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
  fail("copied POST.json is not a JSON object");
}

const url = (parsed as Record<string, unknown>).url;
if (typeof url !== "string" || !url.startsWith("https://x.com/")) {
  fail("copied POST.json has no url starting with https://x.com/");
}
const statusId = url.split("/status/")[1];
if (statusId === undefined || !/^\d+$/.test(statusId)) {
  fail("copied POST.json url has no numeric post id after /status/");
}
