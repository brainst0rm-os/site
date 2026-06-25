---
order: 2
title: Build your first Brainstorm app
summary: Twenty minutes from "I don't have an app" to "I just installed my own app." Uses the Code Editor app — you write the app inside Brainstorm.
duration: 20 min
audience: developer
status: draft
---

> **Draft.** This tutorial lands with the SDK in Stage 9 of the implementation plan. The structure here matches what the SDK will surface; the API names and exact wording fill in as the SDK stabilises.

## What you'll do

In twenty minutes you'll write a small Brainstorm app that displays a list of cities and lets you pin one to the dashboard. It's a real app: sandboxed, capability-gated, installable. You'll write it inside Brainstorm using the Code Editor app, build it, and install it into your own vault.

## What you'll need

- Brainstorm installed (see the [5-minute install tutorial](/tutorials/install-and-first-note)).
- Familiarity with TypeScript. We won't explain `import`.
- Nothing else. The Code Editor app is bundled.

## 1. Open the Code Editor app

From the dashboard, open **Code Editor**. The first time it asks where to keep your app projects — pick a folder.

Click **New app**. A small wizard collects:

- App id (e.g. `cities`)
- Display name
- The capabilities your app will ask for (just **storage** for now)

The wizard creates a project with a manifest, an entry point, and a default UI.

## 2. The shape of an app

Open `src/index.tsx`. You'll see:

```tsx
import { defineApp } from "@brainstorm/sdk";

export default defineApp({
  init() {
    // called once per window
  },
  render({ ui }) {
    return <ui.View>Hello from cities</ui.View>;
  },
});
```

The SDK gives you a small set of UI primitives, host services (storage, identity, intents), and a Yjs binding for collaborative state. We'll use one of each.

## 3. Storage: a list of cities

Replace `render` with:

```tsx
render({ ui, storage }) {
  const cities = storage.entities("cities/City/v1");
  // ...
}
```

`storage.entities` returns a live, typed handle to a collection. The shell mediates every read and write; if your app didn't declare the `storage.entities` capability in the manifest, this call would fail at install time.

## 4. UI: render the list

```tsx
return (
  <ui.View>
    <ui.List>
      {cities.map(city => (
        <ui.Row key={city.id}>{city.data.name}</ui.Row>
      ))}
    </ui.List>
    <ui.Button onPress={() => cities.create({ name: "Berlin" })}>Add Berlin</ui.Button>
  </ui.View>
);
```

That's a working app — list of cities, add a city, persisted to your vault.

## 5. Pinning to the dashboard

Cross-app intents are how apps cooperate. Add a row action that calls `intents.dispatch("dashboard.pin", { entity: city })`. The shell routes this to whichever app handles `dashboard.pin` (the Dashboard app, by default), which adds a pinned card.

## 6. Build and install

In the Code Editor app, click **Build**. The output is an installable bundle (a directory plus a manifest). Drag it onto the dashboard — the install dialog lists the capabilities your app is asking for. Approve.

Your app is now in the launcher. Open it. Add a few cities. Pin one to the dashboard.

You just wrote, built, and installed a Brainstorm app without leaving Brainstorm.

---

The full SDK reference is in [`apps/08-app-sdk.md`](https://github.com/brainstorm-app/brainstorm/blob/main/docs/apps/08-app-sdk.md). The capability model is in [`security/09-security-and-sandbox.md`](https://github.com/brainstorm-app/brainstorm/blob/main/docs/security/09-security-and-sandbox.md). Publishing to the catalog is covered in [`apps/14-app-store.md`](https://github.com/brainstorm-app/brainstorm/blob/main/docs/apps/14-app-store.md).
