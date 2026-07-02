---
order: 11
name: "Agent"
appId: "io.brainstorm.agent"
tagline: "AI that works inside your vault"
summary: "A chat surface over the shared AI broker: run a local Ollama model or bring your own key for Anthropic, OpenAI, Gemini, or GLM. Conversations are vault objects, answers cite the objects they drew from, and the agent can only act within capabilities you granted."
capabilities:
  - "Hybrid retrieval grounds every answer in your vault, with citations that open the source object."
  - "Attach context explicitly: @-mention documents and people, drop in text files, or add images for vision models."
  - "Long-term memory is opt-in and off by default — every remembered item is visible, redactable, and deletable."
  - "\"Summarize with the agent\" and \"Ask the agent about this\" appear on objects across the other apps."
  - "Save a conversation as an automation: its tool trace becomes a workflow, opened in the builder for review."
  - "Fail-closed capability model: the agent's tools are always a subset of what you granted the conversation, re-checked on every call."
screenshots:
  - src: "/screenshots/apps/agent/01-conversation.webp"
    title: "A grounded conversation"
    caption: "The agent reads the brief from the vault and drafts against it — the conversation is itself a vault object."
source: "brainstorm/docs/apps/55-agent-app.md"
---
