---
order: 14
name: "Web Browser"
appId: "io.brainstorm.browser"
tagline: "Browsing that saves into your vault"
summary: "Tabbed browsing over isolated, Node-less web renderers the app itself never touches — it sees metadata, never page bytes. One click clips the page into a bookmark, with the readable article body captured when the page allows it."
capabilities:
  - "Tabs with pinning, private tabs on throwaway sessions, a recently-closed ring, and full session restore across restarts."
  - "Save to vault writes a Bookmark object with the cleaned readable content attached; a blocked page degrades to a link, never a failed clip."
  - "Per-tab security state surfaced in the chrome."
  - "Find in page, and browsing history kept as vault objects with visit counts."
  - "Per-site device permissions are deny-by-default, surfaced through an explicit banner."
  - "Cookies persist encrypted under the vault key."
screenshots:
  - src: "/screenshots/apps/browser/01-tabs.webp"
    title: "A page, loaded at arm's length"
    caption: "The page paints in an isolated, Node-less renderer beside the app — the app itself gets the title, favicon, and security state, never the page's pixels or bytes."
source: "brainstorm/docs/apps/54-web-browser.md"
---
