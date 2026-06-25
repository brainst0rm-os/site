---
order: 2
audience: Developers and power users
headline: An Electron shell, an IPC broker, a capability ledger, and a real SDK.
summary: If you read CHANGELOG before INSTALL.md and have opinions about CRDTs vs OT, here are the design docs. Here is the SDK. Build an app this weekend.
proof: The Code Editor app lets you write Brainstorm apps from inside Brainstorm. Sandboxed, capability-gated, with a stable contract.
channels:
  - GitHub
  - HackerNews
  - Lobsters
  - Engineering podcasts
source: brainstorm/docs/platform/46-marketing-and-promotion.md §Audience — Segment 2
---

The short version: the shell is an **Electron + IPC + capability-ledger host**. Apps are **sandboxed renderers** with declared capabilities and a fixed-depth per-app pending queue. **Yjs** is the CRDT. **SQLite + FTS5** is the store. **Block Protocol** is the interop. **Lexical** powers rich text. The full architecture is in `docs/foundations/02-architecture.md`.

## Why you might care

- **The IPC envelope is a real contract.** Every host-service call goes through `{v, msg, app, service, method, args, caps}`. The broker validates structure, verifies the preload-stamped app id, checks capabilities against the per-vault ledger, and forwards to a service handler. Fail-closed; capability misses return `Unavailable`, not approval.

- **The SDK is real.** Manifest, capabilities, host services, versioning — all in `docs/apps/08-app-sdk.md`. The Code Editor app lets you write a Brainstorm app from inside Brainstorm. Build, install, debug — all in-product. The capability surface is documented.

- **Storage is local-first, repo-pattern, and runtime-agnostic.** `bun:sqlite` under tests, `better-sqlite3` in production. No inline SQL outside repos. Yjs persistence is snapshot+tail with per-update CRC32; compaction at 256 KiB tail.

- **Workers everywhere.** `utilityProcess.fork`-based workers handle storage and Yjs. The Broker hands envelopes to a `WorkerBridge`. App authors get Web Worker / SharedWorker patterns with a Worker SDK shim.

## The hooks

- [SDK reference](https://github.com/brainstorm-app/brainstorm/blob/main/docs/apps/08-app-sdk.md)
- [Capability model](https://github.com/brainstorm-app/brainstorm/blob/main/docs/security/09-security-and-sandbox.md)
- [Shell-as-framework](https://github.com/brainstorm-app/brainstorm/blob/main/docs/apps/26-shell-as-framework.md)
- [Implementation plan](https://github.com/brainstorm-app/brainstorm/blob/main/docs/implementation-plan.md) — what's done, what's in progress
- [Open questions](https://github.com/brainstorm-app/brainstorm/blob/main/docs/reference/11-open-questions.md) — what we haven't decided yet

## Build an app this weekend

[20-minute tutorial](/tutorials/build-your-first-app) · [Source](https://github.com/brainstorm-app/brainstorm) · [Download](/download/mac)
