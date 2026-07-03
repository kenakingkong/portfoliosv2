# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Nuxt 3 / Vue 3 personal portfolio site, hosted on Vercel. Content-managed sections (dev, art, design) are backed by Firebase Realtime Database; blog-style content (field notes, tutorials) is authored as Markdown via `@nuxt/content`.

## Commands

```bash
pnpm install       # install deps (pnpm is the package manager — pnpm-lock.yaml is authoritative)
pnpm run dev       # start dev server
pnpm run build     # build for production
pnpm run preview   # preview the production build
pnpm run lint      # eslint --ext .js,.md,.vue ./
```

There is no test suite in this repo. Note: `pnpm run lint` invokes eslint but there is no eslint config file checked in — expect this to fail until one is added.

## Architecture

### Data flow: DB-backed pages (dev, art, design)

These pages follow a consistent three-layer pattern:

1. **`server/api/{dev,art,design}.ts`** — Nitro event handlers that read from Firebase Realtime Database via `server/db/index.ts` (`db.ref(tableName).once("value")`), one handler per page, each pulling from multiple RTDB tables/refs in parallel and returning a combined object keyed by table name.
2. **`models/*.ts`** — TypeScript interfaces for each RTDB entity (e.g. `IDevProject`, `IArtItem`, `IDesignSet`), re-exported from `models/index.ts`. Many extend `ISortable` (`{ title, sort }`), and API handlers sort by `sort` descending before returning.
3. **Pages** (`pages/dev.vue`, `pages/art.vue`, `pages/design.vue`) — call `useFetch('/api/...')` once, then `provide()` the resulting state (wrapped in `readonly()`) down to child components, which `inject()` it rather than fetching independently.

**Always use `useFetch`, not `useAsyncData`, for calls into this project's own `/api` routes** — the codebase does this consistently.

`server/db/index.ts` initializes the Firebase Admin SDK from a base64-encoded service account in `FIREBASE_SERVICE_ACCOUNT_BASE64` (decoded at runtime) — not from the `portfolios-350309-firebase-adminsdk-*.json` file in the repo root, which is gitignored and only for local reference.

`/api` routes are Vercel serverless functions — each invocation is a stateless, ephemeral execution context. Do not add module-level or config-level in-process caching to server routes; if caching is needed, it requires an external store (e.g. Vercel KV), not in-memory state.

### Content-backed pages (field-notes, tutorials)

`content/field-notes/*.md` and `content/tutorials/*.md` are queried directly via `@nuxt/content`'s `queryContent()` inside `useAsyncData()` (this is the one place `useAsyncData` is correct, since there's no `/api` fetch involved — `queryContent` is a content-module query, not a network request). Index pages (`pages/field-notes/index.vue`, `pages/tutorials/index.vue`) list/sort entries; `[slug].vue` pages resolve a single entry with `.findOne()` and 404 via `createError` if not found.

### Contact form

`server/api/contact.ts` forwards submissions to an Airtable base (endpoint and base ID hardcoded in the handler) using `AIRTABLE_TOKEN` from runtime config — this is the one server route that doesn't touch Firebase.

### Shared head/meta

`composables/useMyHead.ts` is the single entry point for page `<head>`/meta/OG/Twitter tags and also injects the Google Tag Manager script tag. Every page calls `useMyHead(title?, description?, type?, image?)` once near the top of `<script setup>` rather than calling `useHead` directly.

### Routing quirks

`nuxt.config.ts` `routeRules` prerenders `/`, `/field-notes/**`, and `/tutorials/**`, and 301-redirects the legacy `/case-studies` paths to `/field-notes`.
