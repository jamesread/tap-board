# Tap Board — Agent Guide

Tap Board is a touch-first web app for people playing board games. It offers simple helpers on a phone or tablet: roll dice, track scores, count turns, and similar utilities — without replacing the physical game.

The UI is built with **Vue 3** and **[PicoCrank](https://github.com/jamesread/picocrank)** (FemtoCrank CSS). There is no backend API; the app is fully static.

Hosted example: https://tap-board.5apps.com

---

## Quick start

```bash
npm ci
npm run dev      # Vite dev server (default http://localhost:5173)
npm run build    # production bundle → dist/
npm run preview  # serve dist/ locally
npm start        # node static server on PORT (default 8080), serves dist/ if present
```

Docker (preferred for production):

```bash
docker build -t tap-board .
docker run --rm -p 8080:8080 tap-board
# or: make container
```

Images are published to `ghcr.io/jamesread/tap-board` on pushes to `master`.

- Entry: `index.html` → `resources/vue/main.js` → `resources/vue/App.vue`
- Production build output: `dist/`
- `node-http-server.js` serves `dist/` when it exists, otherwise the repo root

---

## Repository layout

```
resources/
  vue/
    App.vue              # Shell: PicoCrank layout, sidebar nav, router-view
    main.js              # Vue bootstrap
    router.js            # vue-router routes (one per board)
    views/Home.vue       # Landing page
    util.js              # Shared helpers (e.g. fullscreen)
    boards/              # One Vue component per helper / “board”
      NormalDiceBoard.vue
      ThreeTwoBoard.vue
      UpDownBoard.vue
    components/          # Reusable UI pieces (Dice, DicePanel, …)
  stylesheets/
    style.css            # App-specific styles (#app layout, board layouts)
index.html
vite.config.js
Dockerfile
node-http-server.js
package.json
AGENTS.md
```

Static assets (e.g. `logo.svg`) live under `public/` for the app and at the repo root for the README.

---

## Architecture

### App shell (`resources/vue/App.vue`)

Follows the **PicoCrank app layout**:

- `Header` — title, logo, sidebar toggle
- `Navigation` — manages sidebar link state (no visual output; renders its slot)
- `#layout` — flex row containing `Sidebar` and `#content`
- `#content` — `main` plus empty `footer` (matches PicoCrank example)

Boards are selected from the sidebar via `navigation.addRouterLink(...)` in `App.vue` (registered in `onMounted` after `nextTick`). The active board is rendered with `<router-view />`.

Register new boards in `router.js` and add a matching `addRouterLink` call in `App.vue`.

**vue-router:** keep a single copy — `package.json` uses `overrides` and `vite.config.js` sets `resolve.dedupe` so PicoCrank shares the app router instance.

**Layout requirement:** Vue mounts into `#app`, which sits between `body` and the PicoCrank layout. `resources/stylesheets/style.css` must keep `#app` as a column flex container with `flex-grow: 1` so the sidebar fills the viewport below the header. See the PicoCrank `App.vue` example if layout regresses.

### Boards (`resources/vue/boards/`)

Each file is a self-contained helper screen. Examples:

| Board | Purpose |
|-------|---------|
| `NormalDiceBoard` | Single d6; tap to roll |
| `ThreeTwoBoard` | Two tap areas (3 dice / 2 dice) for asymmetric rolls |
| `UpDownBoard` | Simple +/- counter (default 50) |

Boards should be **large tap targets**, work in **portrait and landscape**, and avoid clutter — players are mid-game.

### Shared components (`resources/vue/components/`)

| Component | Role |
|-----------|------|
| `Dice` | Single die; Unicode die faces (⚀–⚅); animated roll via `roll()` |
| `DicePanel` | Tappable panel wrapping one or more `Dice` components |

`unplugin-vue-components` auto-registers components from `resources/vue/components` and `resources/vue/boards` (see `vite.config.js`).

### Styling

- **PicoCrank / FemtoCrank:** `import 'picocrank/styles.css'` in `App.vue` — global theme, header, sidebar, sections
- **App overrides:** `resources/stylesheets/style.css` — board layouts, `#app` flex fix, orientation media queries

Prefer FemtoCrank/PicoCrank primitives (`Section`, buttons, layout IDs) over bespoke CSS.

### Sidebar actions

Besides board links, the app exposes:

- **Fullscreen** — hides chrome-friendly full viewport (`util.fullscreen`)
- **Close Menu** — hides header/sidebar for a minimal board-only view (refresh to restore)

---

## Adding a new helper / board

1. Create `resources/vue/boards/YourBoard.vue` — keep it focused on one job
2. Add a route in `resources/vue/router.js`
3. Register a sidebar link in `App.vue` (`onMounted` / `nextTick`):
   ```js
   navigation.value.addRouterLink('YourBoard')
   ```
4. Add styles to `resources/stylesheets/style.css` only when PicoCrank utilities are insufficient
5. Test on a narrow viewport (phone) and both orientations

Reuse `Dice`, `DicePanel`, and PicoCrank `Section` where possible.

---

## Design principles

- **Touch-first** — big panels, minimal typing, readable at arm’s length
- **Fast to use** — one tap to roll or adjust; no account or setup
- **Offline-friendly static app** — no server round-trips during play
- **One helper per board** — add new screens rather than cramming features into one view

---

## Agent conventions

- **Edit the smallest file** that owns the behaviour — usually a board under `boards/` or a shared component
- **Match PicoCrank patterns** for page layout (`Header` → `Navigation` → `#layout` → `Sidebar` + `#content`)
- **Do not commit** unless the user asks
- **Verify** with `npm run build` after substantive changes
- **No backend** — do not add APIs, auth, or persistence unless explicitly requested
- README (`README.md`) may lag the Vue migration; treat `resources/vue/` and this file as source of truth

### Commits and releases

- **Conventional commits** — enforced locally by Husky (`commit-msg` → commitlint). Format: `type(scope): subject` (e.g. `feat(dice): add d8 board`). Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.
- **semantic-release** — on push to `master`, `.github/workflows/release.yml` analyses commits, bumps `package.json`, updates `CHANGELOG.md`, tags `v*`, and creates a GitHub Release. Release commits use `[skip ci]` to avoid duplicate workflow runs.
- **Container tags** — `build.yml` pushes `ghcr.io/jamesread/tap-board:latest` on every `master` push; semver tags (`v1.2.3`) are pushed when semantic-release creates a release tag.

---

## Useful commands

```bash
# Find board routes and sidebar registration
rg "addRouterLink|DicePanel" resources/vue/

# List helpers
ls resources/vue/boards/
```
