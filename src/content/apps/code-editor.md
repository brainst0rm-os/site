---
order: 17
name: "Code Editor"
appId: "io.brainstorm.code-editor"
tagline: "A real editor for code-shaped notes"
summary: "Edits snippets, configs, and other code-shaped objects in the vault with a genuinely capable editor: Shiki highlighting, multi-cursor, folding, diagnostics, and diffs. It opens any source-code MIME the vault hands it."
capabilities:
  - "Shiki syntax highlighting with lazily loaded per-language grammars and light/dark themes."
  - "Multi-cursor and select-next-occurrence, bracket matching, auto-close pairs, code folding, and word wrap."
  - "Quick-open (Cmd/Ctrl+P) and a fuzzy command palette (Cmd/Ctrl+Shift+P)."
  - "Built-in diagnostics with inline squiggles, gutter change markers, and unified or side-by-side diffs against the saved baseline."
  - "Prettier formatting for web languages, on save or on demand."
  - "A collaborative Y.Text buffer on the same local-first substrate as everything else, with virtualized rendering for large files."
screenshots:
  - src: "/screenshots/apps/code-editor/01-editor.webp"
    title: "Editing a snippet"
    caption: "Shiki highlighting and diagnostics over a collaborative buffer that is a vault object."
source: "brainstorm/docs/implementation-plan.md §9.7"
---
