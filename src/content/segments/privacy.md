---
order: 3
audience: Privacy-conscious individuals
headline: Your data on your disk. No account. End-to-end encryption where possible.
summary: For journalists, lawyers, therapists, researchers, and people who simply do not want their notes scraped for training. A product you can use confidently without becoming a cryptographer.
proof: The threat model is published. The credentials, encryption, and AI brokering designs are public. Independent security review summaries land at stage boundaries.
channels:
  - Privacy-focused publications
  - Professional associations
  - Digital-rights blog circuit
source: brainstorm/docs/platform/46-marketing-and-promotion.md §Audience — Segment 3
---

Brainstorm is built so that the people designing it cannot read what you write — and so that we couldn't comply with a request to hand it over even if we wanted to.

## What that means concretely

- **Local-first by default.** Your vault is a directory on your disk. We don't have a copy. We don't have access. There is nothing to subpoena.

- **No account required.** You can use Brainstorm for a decade without creating an account. The optional hosted relay (Plus / Pro plans, v2) is end-to-end encrypted between your devices; the relay can route ciphertext, not read it.

- **AI calls are brokered.** Every AI call goes through the shell's AI broker, which enforces per-app budgets and provenance. The local model bundled with the shell runs offline — no plaintext leaves your machine unless you authorise it.

- **Credentials live in the OS keystore.** Apps cannot reach the keystore directly; only the credential broker in the main process can. The threat model is documented.

## What we will not claim

We don't claim "untraceable" — nothing on a networked device is. We don't claim "fully anonymous" — DNS and your IP are still visible. We don't claim "your data is *yours*" with three exclamation marks. Crypto-maximalist marketing sounds like every shovelware privacy app.

We use precise language because precise language is less common in this space and reads as more credible.

## What to read before trusting us

- [Security and sandbox model](https://github.com/brainstorm-app/brainstorm/blob/main/docs/security/09-security-and-sandbox.md)
- [Identity, organisations, and encryption](https://github.com/brainstorm-app/brainstorm/blob/main/docs/security/16-identity-orgs-encryption.md)
- [Credential storage](https://github.com/brainstorm-app/brainstorm/blob/main/docs/security/29-credentials-storage.md)
- [AI foundations](https://github.com/brainstorm-app/brainstorm/blob/main/docs/platform/22-ai-foundations.md)

If something there doesn't match what the running product does, file an issue. We'll fix one or the other.

## Where to start

[Download Brainstorm](/download/mac) · [Read the docs](https://github.com/brainstorm-app/brainstorm/tree/main/docs)
