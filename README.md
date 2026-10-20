<div align="center">
  <img alt="project logo" src="logo.svg" width="128" />
  <h1>Tap Board</h1>

  <p>A touch-first web app with simple helpers for board-game players — roll dice, track scores, count life totals, time turns, and more.</p>

  [![Maturity Badge](https://img.shields.io/badge/maturity-Production-brightgreen)](#none)
  [![Demo](https://img.shields.io/badge/demo-GitHub%20Pages-blue)](https://jamesread.github.io/tap-board/)
  [![Container](https://img.shields.io/badge/container-ghcr.io-blue)](https://github.com/jamesread/tap-board/pkgs/container/tap-board)
  [![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
</div>

![Tap Board on desktop, rolling two dice](var/marketing/screenshots/home.png)

Built with Vue 3 and [PicoCrank](https://github.com/jamesread/picocrank). The app is fully static; no backend is required.

## Examples

Each helper is a full-screen board with large tap targets, designed for use on a phone or tablet during play.

### Dice

Tap anywhere on a board to roll.

| Two dice | Three & two | Dice pool | Twenty-sided die |
|---|---|---|---|
| <img alt="Two dice" src="var/marketing/screenshots/two-dice.png" width="200" /> | <img alt="Three & two" src="var/marketing/screenshots/three-and-two.png" width="200" /> | <img alt="Dice pool" src="var/marketing/screenshots/dice-pool.png" width="200" /> | <img alt="Twenty-sided die" src="var/marketing/screenshots/twenty-sided-die.png" width="200" /> |

### Scoring

Tap a player's name to rename them; press and hold `+` / `−` to change values quickly.

| Counter | Score pad | Life counter |
|---|---|---|
| <img alt="Counter" src="var/marketing/screenshots/counter.png" width="200" /> | <img alt="Score pad" src="var/marketing/screenshots/score-pad.png" width="200" /> | <img alt="Life counter" src="var/marketing/screenshots/life-counter.png" width="200" /> |

### Utilities

| Turn timer | Coin flip | First player |
|---|---|---|
| <img alt="Turn timer" src="var/marketing/screenshots/turn-timer.png" width="200" /> | <img alt="Coin flip" src="var/marketing/screenshots/coin-flip.png" width="200" /> | <img alt="First player" src="var/marketing/screenshots/first-player.png" width="200" /> |

### Dark mode

Use the theme toggle in the header to switch between light and dark.

| Desktop | Phone |
|---|---|
| <img alt="Score pad in dark mode on desktop" src="var/marketing/screenshots/home-dark.png" width="600" /> | <img alt="Life counter in dark mode on a phone" src="var/marketing/screenshots/life-counter-dark.png" width="200" /> |

## Hosted version

There is a hosted, up-to-date version at https://jamesread.github.io/tap-board/ — deployed from `master` by the `pages` workflow.

## Running with Docker

Pre-built images are published to [GitHub Container Registry](https://github.com/jamesread/tap-board/pkgs/container/tap-board):

```bash
docker pull ghcr.io/jamesread/tap-board:latest
docker run --rm -p 8080:8080 ghcr.io/jamesread/tap-board:latest
```

Open [localhost:8080](http://localhost:8080).

### Build locally

```bash
docker build -t tap-board .
docker run --rm -p 8080:8080 tap-board
```

Or use the Makefile:

```bash
make container    # build and run locally
make publish      # build and push to ghcr.io (requires login)
```

## Screenshots

Screenshots use fictional game state and are regenerated with `make screenshots`
(see [`var/marketing/screenshots`](var/marketing/screenshots/README.md)).
