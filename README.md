<div align="center">
  <img alt="project logo" src="logo.svg" width="128" />
  <h1>Tap Board</h1>

  <p>A touch-first web app with simple helpers for board-game players — roll dice, track scores, count life totals, time turns, and more.</p>

  [![Maturity Badge](https://img.shields.io/badge/maturity-Production-brightgreen)](#none)
  [![Demo](https://img.shields.io/badge/demo-tap--board.5apps.com-blue)](https://tap-board.5apps.com)
  [![Container](https://img.shields.io/badge/container-ghcr.io-blue)](https://github.com/jamesread/tap-board/pkgs/container/tap-board)
  [![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
  [![Vue](https://img.shields.io/badge/Vue-3-42b883)](https://vuejs.org/)
</div>

![screenshot](screenshot.png)

Built with Vue 3 and [PicoCrank](https://github.com/jamesread/picocrank). The app is fully static; no backend is required.

## Examples

Each helper is a full-screen board with large tap targets, designed for use on a phone or tablet during play.

**Two dice** — tap anywhere to roll; the sum is shown below

![Two dice](screenshots/two-dice.png)

**Life counter** — track life totals for two or more players

![Life counter](screenshots/life-counter.png)

**Turn timer** — preset countdowns for timed turns

![Turn timer](screenshots/turn-timer.png)

**Three and two** — asymmetric dice panels (e.g. 3 red / 2 black)

![Three and two](screenshots/three-and-two.png)

## Hosted version

There is a hosted, up-to-date version at https://tap-board.5apps.com

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

Screenshots are captured with [repo-helper](https://github.com/jamesread/repo-common) using `screenshots.ini`:

```bash
docker run --rm -p 8765:8080 ghcr.io/jamesread/tap-board:latest &
repo-helper screenshot --config screenshots.ini
```
