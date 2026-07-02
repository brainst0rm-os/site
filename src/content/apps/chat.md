---
order: 15
name: "Chat"
appId: "io.brainstorm.chat"
tagline: "Team channels over shared vault objects"
summary: "Channels whose messages are the same Message objects the rest of the vault uses, synced to members through collection sharing. Share a channel and it cascades to everyone on the roster — no separate chat silo."
capabilities:
  - "A rich composer with inline formatting and links; Enter sends, Shift+Enter breaks."
  - "@-mention people and pin documents or media to a message as attachment chips."
  - "A membership panel backed by a signed roster, with earlier posters shown as guests."
  - "Messages group by author within a five-minute window, with day dividers and stable per-author colors."
  - "Deterministic message ordering converges to the same transcript on every device."
screenshots:
  - src: "/screenshots/apps/chat/01-channel.webp"
    title: "A channel"
    caption: "Messages are vault objects — formatting, mentions, and attachments in the composer."
  - src: "/screenshots/apps/chat/02-members.webp"
    title: "Members"
    caption: "The membership panel, backed by a signed roster."
source: "brainstorm/docs/implementation-plan.md §Collab-C5/C6"
---
