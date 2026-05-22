# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Vue 3 + Vite + TypeScript SPA that tracks reading progress for books. All book data lives in the browser's `localStorage` (via `@vueuse/core`'s `useStorage`) — there is no backend database. The app was developed on Glitch and is deployed to Netlify; a handful of Netlify Functions provide server-side rendered OG/sharing images via headless Chrome.

## Common commands

- `npm run dev` — Vite dev server with `--host` (LAN-accessible).
- `npm run build` — runs `./v.sh` (stamps a build timestamp into `public/v.js`), then `vue-tsc --noEmit && vite build`. Output goes to `build/`, **not** `dist/` (see `vite.config.ts`).
- `npm run typecheck` — `vue-tsc --noEmit` only.
- `npm run lint` — Rome check + format (read-only).
- `npm run fix` — Rome `--apply-suggested` + `--write` (autofix). Primary formatter/linter is **Rome** (`rome.json`), not ESLint. The `esfix`/`eslint`/`format` scripts are legacy alternatives.
- `npm test` — `vitest` then a production build. `npm run coverage` for a one-shot run with coverage.
- Single test: `npx vitest run src/stores/counter.test.ts` (or `npx vitest src/stores/counter.test.ts` for watch mode).
- `npm run fn` — `netlify functions:serve` (requires `netlify login`); use for working on `netlify/functions/`. Pair with the docker setup in `.docker/` via `./docker-run.sh` (exposes 3000 and 9999) if you don't want to install the Netlify CLI locally.

## Architecture

### State: a single Pinia store backed by localStorage

`src/stores/books.ts` is the heart of the app. `useBooksState` exposes:
- `books` — persisted to localStorage under the key `"books"`.
- `nextId` — persisted under `"books_nextid"`; monotonic, never reused.
- Getters for filtered/sorted views and `getBookById`.
- Actions: `addBook`, `updateBook`, `deleteBook`, `toggleCompleted`, `updateProgress` (appends to `book.history` and updates `book.progress`), `updateHistory`, `overwriteBooks` (used by import; recomputes `nextId` from the max existing id).

`Book` and `Progress` interfaces are defined in this file and are the canonical shape used across the app. Other stores (`copy.ts`, `paste.ts`, `download.ts`, `readfile.ts`, `openbd.ts`, `standalone.ts`, `date.ts`) are small focused helpers — e.g., `openbd.ts` fetches book metadata by ISBN from openBD.

ISBN validation/conversion (`validateIsbn`, `isbn13to10`) also lives in `books.ts` and is used by the barcode-scanning flow.

### Views and routing

`src/router/index.ts` declares the routes. Top-level views in `src/views/`:
- `HomeView` — list of books (the only eagerly-imported view).
- `NewView`, `EditView/:id`, `HistoryView/:id` — CRUD + per-book progress history.
- `StatsView` — aggregate visualizations (`src/components/stats/`, built on d3 and `vue3-calendar-heatmap`).
- `ImportExportView` — JSON import/export of the entire library (`src/components/ImportExport/`).
- `AboutView`, `NotFound`.

All non-home views are lazy-loaded via dynamic `import()`.

### Book input flows

Adding a book uses three input methods, found in `src/components/book/`:
- Manual entry (`NewBookForm.vue` / `BookForm.vue`).
- Barcode scan via `BarcodeReader.vue` (uses `barcode-detector` with a `quagga` fallback).
- QR/ISBN scan via `QRCodeReader.vue` (`vue-qrcode-reader`).

Scanned codes are validated with `validateIsbn` and resolved to metadata through the openBD store.

### Netlify Functions (`netlify/functions/`)

These are Node serverless functions, not part of the Vite build:
- `image.js` / `html.js` — generate OG/sharing images. `image.js` launches headless Chrome (`chrome-aws-lambda` + `puppeteer-core`) and screenshots `/.netlify/functions/html?isbn=...`. `chrome-aws-lambda` is listed in `netlify.toml` as `external_node_modules` so it isn't bundled.
- `upload.js` — Cloudinary upload.
- `name.js`, `chart.js`, `s.ts`, `axios.mjs` — smaller helpers.

When testing functions locally, `image.js` switches to `http://localhost:9999` when `NETLIFY_LOCAL=true`, otherwise it uses `process.env.URL`.

### Build quirks

- `vite.config.ts` sets `build.outDir` to `build/` (Glitch's static-hosting convention — see `"glitch": { "projectType": "generated_static" }` in `package.json`).
- `v.sh` writes the current Unix timestamp into `public/v.js` by substituting the literal `"VERSION_STR"` in `v.js`. Run via `npm run build`; you generally don't invoke it directly.
- `@` is aliased to `./src`.
- Tests use `happy-dom` (configured in `vite.config.ts`, not a separate vitest config) and `globals: true` (no need to import `test`/`expect`).
