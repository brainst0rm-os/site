---
order: 1
audience: Alumni of prior local-first knowledge tools
headline: A different shape, by people who learned from the last one.
summary: If you've used and walked away from a previous local-first knowledge product, you already know what matters. Brainstorm is built by people who learned the lessons from one of those attempts.
proof: The architecture docs are public. The competitive moat is the shape, not a secret. Read 02-architecture.md before you download.
channels:
  - HackerNews
  - Lobsters
  - PKM-adjacent communities
source: brainstorm/docs/platform/46-marketing-and-promotion.md §Audience — Segment 1
---

You've been here before.

You used a local-first knowledge tool that started clean, accumulated features, and eventually became hard to evolve because everything was interconnected. Data, sync, UI, schema, and product surface fused into a single mass. Every change rippled.

You walked away — not because the team was wrong, but because the architecture was a trap.

Brainstorm is a deliberate retry, built by people who watched that pattern develop firsthand. The central organising principle is **separation**: the shell hosts apps, apps interoperate only through standard contracts, and the schema is owned by no one app.

That is the difference. It is the only difference that matters at year five.

## What this looks like in practice

- **Adding an app does not require touching the shell.** A PDF editor is its own app. Removing it leaves documents that referenced it readable (they degrade to a default block view, not an error).

- **Two apps that handle the same kind of data don't fight.** Multiple apps can read and write entities of the same type. No one app is "the owner" of a type.

- **Customisations are personal by default.** Database views, dashboard layouts, shortcut bindings, theme — all scoped to you, with an explicit "share with team" affordance when you want it. The shared workspace stays clean.

## What we are not

We're not "X but better." We are different. The credibility we want to earn is not the credibility of being a successor. It's the credibility of being honest about what shape we are.

Read the [architecture overview](https://github.com/brainstorm-app/brainstorm/blob/main/docs/foundations/02-architecture.md) before downloading. If the shape makes sense, the product will.

## Where to start

[Download Brainstorm](/download/mac) · [Read the docs](https://github.com/brainstorm-app/brainstorm/tree/main/docs) · [GitHub](https://github.com/brainstorm-app)
