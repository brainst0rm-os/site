import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/*
 * Doc 46 §Principle 6 — banned phrases. The brainstorm marketing voice is
 * "plain English; concrete claims; named tradeoffs." A small linter catches
 * the standard-issue marketing fluff before it lands on a published page.
 *
 * Add to the list as new fluff is detected. Casing-insensitive substring
 * match against the literal text of each .md/.astro file in src/.
 */

const BANNED = [
	"synergise",
	"synergize",
	"unlock your productivity",
	"10x your second brain",
	"AI-powered",
	"revolutionary",
	"game-changer",
	"game-changing",
	"world-class",
	"best-in-class",
	"cutting-edge",
	"reimagine",
	"reimagining",
	"empower",
	"unleash",
	"supercharge",
];

function walk(dir: string, files: string[] = []): string[] {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		const stat = statSync(full);
		if (stat.isDirectory()) walk(full, files);
		else if (/\.(md|astro|ts|tsx)$/.test(entry)) files.push(full);
	}
	return files;
}

const SRC = new URL("../src", import.meta.url).pathname;
const files = walk(SRC);

describe("voice — banned phrases (doc 46 §Principle 6)", () => {
	for (const file of files) {
		// Skip this test file itself if it ends up in src/ for any reason.
		if (file.endsWith("content-banned-phrases.test.ts")) continue;
		it(`${file.replace(SRC, "src")} — clean`, () => {
			const text = readFileSync(file, "utf-8").toLowerCase();
			const hits = BANNED.filter((phrase) => text.includes(phrase.toLowerCase()));
			expect(hits, `banned phrases found: ${hits.join(", ")}`).toEqual([]);
		});
	}
});
