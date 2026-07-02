---
order: 13
name: "Mailbox"
appId: "io.brainstorm.mailbox"
tagline: "Email that lives in your vault"
summary: "A full mail client — folder rail, message list, reading pane, composer — where every message is a vault object you can search, link, and automate. Connect Gmail via OAuth or any IMAP/SMTP account; credentials are sealed shell-side and never touch the app."
capabilities:
  - "Read, compose, reply, and forward; sending is idempotent, so a retry can never double-send."
  - "HTML mail renders in a sandboxed frame that blocks remote images by default — tracking pixels don't fire unless you opt in."
  - "Choose a sync window from 30 days to everything, with server-authoritative flags and vault-local tags."
  - "Threads, attachments as file objects, and per-message tags."
  - "Other apps and the Agent can pre-seed a compose, reply, or forward through intents."
  - "Senders resolve to existing Contacts people — linked, never auto-created."
screenshots:
  - src: "/screenshots/apps/mailbox/01-connect.webp"
    title: "Connect an account"
    caption: "Mail arrives once you connect an account; until then the app holds nothing at all."
  - src: "/screenshots/apps/mailbox/02-accounts.webp"
    title: "Bring any account"
    caption: "Gmail via OAuth or plain IMAP/SMTP — either way the credentials are sealed shell-side and never touch the app."
source: "brainstorm/docs/apps/53-mailbox.md"
---
