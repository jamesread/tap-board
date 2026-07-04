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

- Entry: `index.html` → `resources/vue/main.js` → `resources/vue/App.vue`
- Production build output: `dist/`
- `node-http-server.js` serves `dist/` when it exists, otherwise the repo root

---

## Repository layout

```
resources/
  vue/
    App.vue              # Shell: PicoCrank layout, sidebar nav, board switching
    main.js              # Vue bootstrap
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
node-http-server.js
package.json
AGENTS.md
```

Static assets referenced from the app (e.g. `favicon.png`) live at the project root or under `public/` as added.

---

## Architecture

### App shell (`resources/vue/App.vue`)

Follows the **PicoCrank app layout**:

- `Header` — title, logo, sidebar toggle
- `Navigation` — manages sidebar link state (no visual output; renders its slot)
- `#layout` — flex row containing `Sidebar` and `#content`
- `#content` — `main` plus empty `footer` (matches PicoCrank example)

Boards are selected from the sidebar via `navigation.addCallback(...)`. The active board is rendered with `<component :is="activeBoard" />`.

Register new boards in the `boards` map and add a sidebar entry in `onMounted`.

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
2. Import it in `App.vue` and add to the `boards` map
3. Register a sidebar callback in `onMounted`:
   ```js
   navigation.value.addCallback('YourBoard', () => selectBoard('YourBoard'), { icon: DiceIcon })
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
- README (`README.adoc`) may lag the Vue migration; treat `resources/vue/` and this file as source of truth

---

## Useful commands

```bash
# Find board and component usage
rg "selectBoard|DicePanel|addCallback" resources/vue/

# List helpers
ls resources/vue/boards/
```
