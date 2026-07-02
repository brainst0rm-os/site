---
order: 9
name: "Graph"
appId: "io.brainstorm.graph"
tagline: "See the shape of your vault"
summary: "Every object and typed link, drawn live on a WebGL canvas with the physics running in a worker. Three view kinds — full vault, local neighborhood, shortest path — and pattern filters that match multi-subject shapes, not just single types."
capabilities:
  - "Pattern filters describe subjects, typed edges, and per-subject conditions; the query compiles to SQL and stays live."
  - "Local mode walks 1–10 hops from a root in either or both directions; path mode finds the shortest paths between two objects."
  - "History animation replays the vault over time with a density histogram and a scrubber."
  - "Force, radial, hierarchy, and circular layouts; drag nodes, or drag from a handle to create a real typed link."
  - "An editable inspector changes a node's properties inline without leaving the canvas."
  - "Export as JSON, Graphviz DOT, GraphML, or SVG; embed a live graph inside a note."
screenshots:
  - src: "/screenshots/apps/graph/01-graph.webp"
    title: "The whole vault"
    caption: "Every object and typed link drawn live; mentions and relations become edges."
  - src: "/screenshots/apps/graph/02-filters.webp"
    title: "Pattern filters"
    caption: "Filter by type and condition; the match summary updates live as you refine."
source: "brainstorm/docs/apps/graph/00-overview.md"
---
