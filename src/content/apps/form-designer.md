---
order: 18
name: "Form Designer"
appId: "io.brainstorm.form-designer"
tagline: "Forms that create real objects"
summary: "Build a property form over any entity type, save it as a reusable Layout object, and every fill creates a real object of that type — there is no submissions inbox to shovel data out of. It also renders invoices to PDF."
capabilities:
  - "Pick a target type and compose its fields from the live vault property catalog, with per-field label overrides."
  - "Conditional visibility per field, using the same predicate language as Database filters."
  - "Fill mode validates required fields and mints a new entity on create."
  - "Forms are reusable vault objects, scoped to the type they create."
  - "An Invoice document type with line items, tax, status, and totals, rendered to PDF."
screenshots:
  - src: "/screenshots/apps/form-designer/01-builder.webp"
    title: "The builder"
    caption: "Pick a target type and compose its fields from the live property catalog."
  - src: "/screenshots/apps/form-designer/02-fill.webp"
    title: "Fill mode"
    caption: "Each fill validates required fields and creates a real object of the target type."
  - src: "/screenshots/apps/form-designer/03-invoice.webp"
    title: "Invoices"
    caption: "Line items, totals, and a live paper preview, exportable to PDF."
source: "brainstorm/docs/implementation-plan.md §8.10"
---
