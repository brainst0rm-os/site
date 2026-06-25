import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/*
 * Every content collection item that makes a product claim must cite a
 * brainstorm design doc in its `source:` frontmatter. The schema marks
 * `source` required on capabilities, segments, and compare. This test
 * additionally verifies the source field LOOKS like a brainstorm path
 * (starts with "brainstorm/docs/" or is a github.com URL into the repo).
 */

function frontmatter(text: string): Record<string, string> | null {
	const match = text.match(/^---\n([\s\S]*?)\n---/);
	const body = match?.[1];
	if (!body) return null;
	const out: Record<string, string> = {};
	for (const line of body.split("\n")) {
		const colon = line.indexOf(":");
		if (colon === -1) continue;
		const key = line.slice(0, colon).trim();
		const value = line
			.slice(colon + 1)
			.trim()
			.replace(/^"|"$/g, "");
		out[key] = value;
	}
	return out;
}

function walkMd(dir: string, files: string[] = []): string[] {
	let entries: string[];
	try {
		entries = readdirSync(dir);
	} catch {
		return files;
	}
	for (const entry of entries) {
		const full = join(dir, entry);
		const stat = statSync(full);
		if (stat.isDirectory()) walkMd(full, files);
		else if (entry.endsWith(".md")) files.push(full);
	}
	return files;
}

const CONTENT = new URL("../src/content", import.meta.url).pathname;
const SOURCE_REQUIRED = ["capabilities", "segments", "compare"];

describe("content citations", () => {
	for (const collection of SOURCE_REQUIRED) {
		const dir = join(CONTENT, collection);
		const files = walkMd(dir);
		if (files.length === 0) continue;
		describe(collection, () => {
			for (const file of files) {
				it(`${file.replace(CONTENT, "content")} — has valid source citation`, () => {
					const text = readFileSync(file, "utf-8");
					const fm = frontmatter(text);
					expect(fm, "must have frontmatter").toBeTruthy();
					const source = fm?.source;
					expect(source, "source: required").toBeTruthy();
					const valid =
						source?.startsWith("brainstorm/docs/") ||
						source?.startsWith("https://github.com/brainstorm-app/brainstorm/");
					expect(valid, `source must cite brainstorm docs (got: ${source})`).toBe(true);
				});
			}
		});
	}
});
