# brainstorm-site

The marketing surface for [Brainstorm](../brainstorm) — the local-first OS-shell knowledge product.

- Plan: [`docs/implementation-plan.md`](docs/implementation-plan.md)
- Bootstrap for Claude Code: [`CLAUDE.md`](CLAUDE.md)
- Source of truth for product claims: [`../brainstorm/docs/`](../brainstorm/docs/)
  ([`46-marketing-and-promotion.md`](../brainstorm/docs/platform/46-marketing-and-promotion.md) is the canonical spec for this site)

## Run

```sh
bun install
bun run dev          # astro dev (port 4321)
bun run build        # static build to dist/
bun run preview      # serve dist/ locally
bun run typecheck    # astro check + tsc --noEmit
bun run lint         # biome check .
bun run format       # biome format --write .
```

## Status

**Phase 0 — stealth / placeholder.** No marketing copy. The site exists to claim the domain and route curious developers to the GitHub repo and the docs. See [`docs/implementation-plan.md`](docs/implementation-plan.md) for the four-phase launch sequence anchored to the [brainstorm](../brainstorm) implementation stages.
