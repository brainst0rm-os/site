---
order: 20
name: "Theme Editor"
appId: "io.brainstorm.theme-editor"
tagline: "Design the OS you work in"
summary: "Compose a theme from four parts — a token set, an icon pack, typography, and an optional CSS style pack — and preview it live across the shell and every open app. Themes are vault objects like everything else."
capabilities:
  - "Edit the semantic token namespace with live swatches, a color picker, and per-token reset, against a light or dark base."
  - "Pick an icon pack and set font stacks per role — UI, body, code, display — plus a density scale."
  - "A raw-CSS style pack editor whose sanitizer rejects dangerous constructs and blocks save on errors."
  - "One button previews the composition across the dashboard and every app window, then auto-reverts."
  - "WCAG contrast lint flags unreadable token pairs."
  - "Hand the style pack's CSS to the Code Editor for a full editing surface."
screenshots:
  - src: "/screenshots/apps/theme-editor/01-tokens.webp"
    title: "The token set"
    caption: "Semantic tokens with live swatches and per-token reset, over a light or dark base."
  - src: "/screenshots/apps/theme-editor/02-typography.webp"
    title: "Typography"
    caption: "Font stacks per role and a density scale, previewed live."
source: "brainstorm/docs/implementation-plan.md §9.9"
---
