---
order: 19
name: "Preview"
appId: "io.brainstorm.preview"
tagline: "Quick previews for almost any file"
summary: "A fast previewer that dispatches each file to a per-format renderer: images, RAW and HEIC photos, PDF, video, audio, text, Markdown, code, Office documents, and 3D models. Every renderer loads lazily, so opening stays quick."
capabilities:
  - "Images pan and zoom without upscaling, with rotate and flip; HEIC decodes in place and RAW shows the camera's embedded JPEG."
  - "PDF with page navigation, zoom, and safe external links; audio with ID3 tags, bitrate, and sample rate in the inspector."
  - "DOCX, XLSX, and PPTX open as sanitized, read-only text and tables."
  - "glTF, GLB, and OBJ models spin under orbit controls."
  - "Arrow through neighboring files on a filmstrip, or browse the vault's files from the built-in sidebar."
  - "The inspector edits the file's real vault properties and comments — the same object everywhere."
screenshots:
  - src: "/screenshots/apps/preview/01-image.webp"
    title: "An image, previewed"
    caption: "Pan and zoom without upscaling; arrow through neighboring files on the filmstrip."
  - src: "/screenshots/apps/preview/02-inspector.webp"
    title: "The inspector"
    caption: "Edit the file's real vault properties and comments right next to the preview."
source: "brainstorm/docs/implementation-plan.md §9.20"
---
