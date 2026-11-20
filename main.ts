// Entry program for gta6-meme-x-01 (round 3).
// Copies POST.json — the address of the published X post — from the bot
// directory into the output directory, then proves the copy is exact and
// that the post address carries a numeric status id. Any failure exits 1.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR || "/bot";
const outDir = process.argv[2] || process.env.MAKEFUN_OUTPUT_DIR || "/output";
const source = join(botDir, "POST.json");
const target = join(outDir, "POST.json");

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

try {
  mkdirSync(outDir, { recursive: true });
} catch (err) {
  fail(`cannot create output directory ${outDir}: ${err}`);
}

try {
  copyFileSync(source, target);
} catch (err) {
  fail(`cannot copy ${source} to ${target}: ${err}`);
}

let original: Buffer;
let copied: Buffer;
try {
  original = readFileSync(source);
  copied = readFileSync(target);
} catch (err) {
  fail(`cannot read back POST.json for validation: ${err}`);
}

if (!original.equals(copied)) {
  fail("copied POST.json is not byte-identical to the source");
}

let parsed: unknown;
try {
  parsed = JSON.parse(copied.toString("utf8"));
} catch (err) {
  fail(`POST.json is not valid JSON: ${err}`);
}

if (typeof parsed !== "object" || parsed === null) {
  fail("POST.json must be a JSON object");
}
const url = (parsed as { url?: unknown }).url;
if (typeof url !== "string" || url.length === 0) {
  fail("POST.json must carry a non-empty string field 'url'");
}
const match = /\/status\/(\d+)\/?(?:[?#]|$)/.exec(url);
if (match === null) {
  fail(`POST.json url has no numeric /status/ id: ${url}`);
}
let host: string;
try {
  host = new URL(url).hostname;
} catch (err) {
  fail(`POST.json url is not a valid URL: ${err}`);
}
if (host !== "x.com" && host !== "www.x.com" && host !== "twitter.com") {
  fail(`POST.json url must point at an X post, got host ${host}`);
}

console.log(`main.ts: POST.json copied to ${target} (status ${match[1]})`);
