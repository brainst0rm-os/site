import type { APIRoute } from "astro";
import { SITE_URL } from "~/content/site";

// A single, flat sitemap.xml for the marketing site, generated off SITE_URL so
// the domain never drifts. Only indexable routes belong here — /joined is the
// waitlist confirmation page (noindex), so it is deliberately omitted. Add a
// route below when a new public, crawlable page ships.
const routes = ["/"];

export const GET: APIRoute = () => {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `\t<url>\n\t\t<loc>${SITE_URL}${route}</loc>\n\t</url>`).join("\n")}
</urlset>
`;

	return new Response(body, {
		headers: { "Content-Type": "application/xml; charset=utf-8" },
	});
};
