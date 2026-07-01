import { createClient } from "@libsql/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const turso = createClient({
	url: process.env.TURSO_DATABASE_URL ?? "",
	authToken: process.env.TURSO_AUTH_TOKEN ?? "",
});

// biome-ignore lint/style/noDefaultExport: Vercel serverless functions are discovered via their default export.
export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return res.status(405).json({ ok: false, error: "method_not_allowed" });
	}

	const body = (req.body ?? {}) as Record<string, unknown>;
	const email = String(body.email ?? "")
		.trim()
		.toLowerCase();
	const wantsJson = String(req.headers.accept ?? "").includes("application/json");

	if (!EMAIL_RE.test(email) || email.length > 254) {
		return wantsJson
			? res.status(400).json({ ok: false, error: "invalid_email" })
			: res.redirect(303, "/?error=invalid#email");
	}

	try {
		await turso.execute(
			`create table if not exists newsletter (
				email text primary key,
				created_at text not null default (datetime('now'))
			)`,
		);
		await turso.execute({
			sql: "insert or ignore into newsletter (email) values (?)",
			args: [email],
		});
	} catch {
		return wantsJson
			? res.status(500).json({ ok: false, error: "server_error" })
			: res.redirect(303, "/?error=server#email");
	}

	return wantsJson ? res.status(200).json({ ok: true }) : res.redirect(303, "/joined");
}
