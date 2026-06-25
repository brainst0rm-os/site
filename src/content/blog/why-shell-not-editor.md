---
date: 2026-05-20
title: Why Brainstorm is a shell, not an editor
summary: Knowledge-tool monocultures eventually buckle under their own weight. The shape that survives a decade of feature growth is the shape that lets unrelated features grow independently.
kind: decision
tags:
  - architecture
  - design-decision
source: brainstorm/docs/foundations/01-vision.md
---

There's a well-trodden path for a knowledge tool: start with one strong primitive (a document, a block, an object), add features to it as users ask, and watch the surface area expand until every concept is a first-class shell concept. The block editor accumulates databases. The database accumulates queries. The query language accumulates layouts. By the third year, the codebase looks like a city built around a single street.

Brainstorm starts from the opposite premise: **the shell holds nothing about meaning, only about hosting.**

## What that means

The shell knows how to launch an app, give it a window, broker its access to shared services, persist its state, sync it across devices, and uninstall it cleanly. It does not know what an app does. There is no `Page`, `Task`, or `Note` concept in the shell.

Apps own their concepts. Apps interoperate by speaking a common interop language — typed entities, embeddable blocks, host-mediated intents — and never by sharing internals.

## Why this shape

Three properties fall out of it:

1. **Adding a feature does not require touching the shell.** A new app is a new app — install, use, uninstall. The shell does not grow when the product grows.

2. **Removing a feature does not require migrations.** If you uninstall the PDF editor, the rest of the system keeps working. Documents that used to embed a PDF degrade to a default block view, not an error.

3. **Two apps that handle the same kind of data don't fight.** Multiple apps can read and write entities of the same type. No one app is the "owner" of a type. Schema is owned by data, not apps.

## What we give up

A monolithic editor with a single document model can do some things a host-of-apps cannot, easily — instant cross-block transformations, a single undo stack across the whole product, a unified search bar that knows everything.

Brainstorm trades those for a model where adding a feature next year doesn't require editing six other features.

We think this trade is right for a product whose ambition is decade-scale durability. The full case is in [01-vision.md](https://github.com/brainstorm-app/brainstorm/blob/main/docs/foundations/01-vision.md).
