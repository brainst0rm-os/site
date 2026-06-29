import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { POSITIONING, SITE_NAME, SITE_URL, links } from "~/content/site";

// /llms.txt (llmstxt.org) — a machine-readable map of this marketing surface for
// agents. Generated from the same constants + content the pages render, so the
// positioning sentence stays verbatim and capability copy never drifts. The full
// product documentation has its own auto-generated llms.txt on the docs site.
export const GET: APIRoute = async () => {
	const capabilities = (await getCollection("capabilities")).sort(
		(a, b) => a.data.order - b.data.order,
	);

	const sections: string[] = [
		`# ${SITE_NAME}`,
		"",
		`> ${POSITIONING}`,
		"",
		`The public site for ${SITE_NAME}. This surface is the overview and downloads; full product documentation lives on the docs site.`,
		"",
		"## Pages",
		"",
		`- [${SITE_NAME} — home](${SITE_URL}/): overview, screenshots, how it works, the roadmap, and download links`,
		`- [Downloads](${SITE_URL}/downloads): desktop builds for macOS, Windows, and Linux; every release is posted here`,
		"",
		"## How it works",
		"",
		...capabilities.map((c) => `- [${c.data.title}](${SITE_URL}/#capabilities): ${c.data.summary}`),
		"",
		"## Documentation",
		"",
		`- [Documentation](${links.docs}): using ${SITE_NAME} — vaults, apps, objects, local-first sync, and the permission model`,
		`- [Docs llms.txt](${links.docs}/llms.txt): machine-readable index of the documentation`,
		`- [Docs llms-full.txt](${links.docs}/llms-full.txt): the full documentation corpus as a single Markdown file`,
		"",
		"## Source",
		"",
		`- [GitHub](${links.github}): the Brainstorm organisation`,
		`- [Shell repository](${links.repo}): the desktop shell`,
		"",
	];

	return new Response(sections.join("\n"), {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
};
