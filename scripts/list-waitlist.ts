import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
	console.error(
		"Missing TURSO_DATABASE_URL and/or TURSO_AUTH_TOKEN.\n" +
			"Set them in the environment before running, e.g.\n" +
			"  TURSO_DATABASE_URL=… TURSO_AUTH_TOKEN=… bun run waitlist",
	);
	process.exit(1);
}

const turso = createClient({ url, authToken });

const result = await turso.execute(
	"select email, created_at from waitlist order by created_at",
);

for (const row of result.rows) {
	console.log(`${row.created_at}\t${row.email}`);
}

console.log(`\n${result.rows.length} email${result.rows.length === 1 ? "" : "s"} on the waitlist.`);
