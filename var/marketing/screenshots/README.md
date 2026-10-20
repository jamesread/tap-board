# Marketing screenshots

The PNGs in this directory are used by the project README. They are generated,
not hand-made: regenerate them all with

```bash
make -C var/marketing/screenshots   # or `make screenshots` from the repo root
```

## What `make` does

1. `build` — `npm ci` (if needed) and `npm run build` in the repo root.
2. `up` — starts a throwaway `vite preview` of `dist/` on `127.0.0.1:18400`
   (PID and log in `tmp/`, which is gitignored).
3. `shoot` — `repo-helper screenshot --config screenshots.ini`.
4. `down` — always runs, even on failure, and stops the preview server.

Tap Board has no backend, so there is no database to seed. Instead, the
setup scripts in `scripts/` drive each board into a realistic mid-game state
using the fictional data in `seed/fixtures.json` (player names, scores, life
totals). `scripts/prepare.py` replaces `Math.random` with a seeded PRNG, so
dice rolls, coin flips and first-player picks are the same on every run.

To browse the same state by hand: `make build up`, open
http://127.0.0.1:18400/, then `make down`.

## Requirements

- Node.js / npm
- `repo-helper` on `PATH`, with Chrome and a matching `chromedriver`

## Images

| File | Viewport | Notes |
|------|----------|-------|
| `home.png` | 1280×800 | Desktop hero: sidebar + two dice |
| `home-dark.png` | 1280×800 | Desktop score pad, dark theme |
| `two-dice.png`, `three-and-two.png`, `dice-pool.png`, `twenty-sided-die.png` | 390×844 | Seeded rolls |
| `counter.png`, `score-pad.png`, `life-counter.png` | 390×844 | Fixture scores |
| `turn-timer.png`, `coin-flip.png`, `first-player.png` | 390×844 | Utilities |
| `life-counter-dark.png` | 390×844 | Dark theme |

`screenshot-manifest.yaml` is generated from the `title`, `description` and
`theme` keys in `screenshots.ini` (`make manifest`, also run by `make`). It is
a well-known path read by indexers; edit `screenshots.ini`, never the YAML.

Dark sections are last in `screenshots.ini`, because repo-helper shares one
browser session (and its localStorage) across all captures; every section
pins its theme with `scripts/light.py` or `scripts/dark.py`.
