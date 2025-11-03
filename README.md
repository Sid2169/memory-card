# Memory Card

A simple picture memory game built with React, Vite, and plain CSS for
[The Odin Project's Memory Card assignment](https://www.theodinproject.com/lessons/node-path-react-new-memory-card).

**[Play the game](https://sid2169.github.io/memory-card/)** ·
[Source](https://github.com/Sid2169/memory-card)

**Creator:** [Siddhartha](https://sidsingh.vercel.app/) ·
[GitHub](https://github.com/Sid2169) ·
[LinkedIn](https://www.linkedin.com/in/siddhartha-suman-952a64256/)

## How to play

Pick each picture **once**. The cards shuffle after every pick, so remember the
picture rather than its position. Picking a picture again ends the round;
picking every picture wins. Use **Play again** to start another round, or
**Restart** during play.

| Difficulty | Pictures |
| --- | --- |
| Easy | 6 |
| Medium | 9 |
| Hard | 13 |

Changing difficulty starts a fresh round. Smaller decks are sampled from the
full collection. Your personal best is saved separately for each difficulty in
this browser; clearing site data clears those records. If browser storage is
unavailable, best scores still work for the current visit.

## Artwork and assignment scope

The game uses all 13 supplied pictures in `public/pictures/`, named `p1.jpeg`
through `p13.jpeg`. Full pictures fit within consistent card frames without
cropping. Cards have descriptive accessible names, with no visible captions or
selection markers to give away previous picks. If an image cannot load, a
descriptive text fallback keeps its card identifiable and playable.

The official assignment asks for externally fetched images. **Using local
pictures instead is a deliberate, confirmed preference for this version.**
There is no external API, API key, or fetching layer. The other core requirements
are implemented: current/best scores, randomized initial and post-click order,
unique-selection rules, styling, a public repository, and a deployed site.

## Design

Solid dark surfaces, one cyan action color, restrained success/status accents,
and minimal copy. No gradients, glass effects, or extra dependencies. The grid
adapts from desktop to two columns on narrow phones. Native buttons provide
keyboard access, visible focus, and comfortable touch targets. Focus follows
the selected picture through shuffles; a finished round focuses its result.
Score changes have a polite screen-reader announcement, and reduced-motion
preferences disable transitions.

Confirmed gameplay, design, attribution, and Git workflow preferences are
recorded in [docs/DESIGN_PHILOSOPHY.md](docs/DESIGN_PHILOSOPHY.md).

## Local development

Requires Node.js 20.19+ on the Node 20 line, or Node.js 22.12+; Node 22 is used in CI.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm test` | Game-rule and browser-storage unit tests using Node's test runner |
| `npm run lint` | ESLint checks |
| `npm run build` | Production output in `dist/` |
| `npm run preview` | Serve the production build locally |

## Structure and logic

```text
public/pictures/           The 13 original picture assets
src/
  App.jsx                 Header, game, and creator footer
  App.css                 Responsive game and layout styles
  index.css               Color tokens and global accessibility styles
  game.js                 Card data, difficulties, Fisher–Yates shuffle, round rules
  scores.js               Best-score validation and safe browser persistence
  hooks/useGame.js        React round state and score-storage synchronization
  components/
    Game.jsx              Controls, round result, announcements, and focus
    CardGrid.jsx          Picture buttons and missing-image fallback
    Scoreboard.jsx        Current score and personal best
tests/                    Game-rule and score-storage tests
.github/workflows/         GitHub Pages build and deployment
docs/                     Recorded preferences
```

Selections use stable picture IDs, never grid positions. The score is derived
from the list of unique picked IDs. A selection returns a new round without
mutating the previous one, and finished rounds ignore further selections.
Fisher–Yates shuffles copies of the deck. Event handlers create/shuffle rounds;
effects only synchronize best scores with storage. There is no game-state library
or generic service layer.

## Verification

Run `npm test`, `npm run lint`, and `npm run build`. Tests cover shuffling without
mutation or identity loss, deck sizes, unique scoring, repeat-click loss,
all-difficulty wins, completed-round guards, restarting, best-score retention,
malformed saved data, and unavailable storage.

Browser checks performed against the production build in Chromium:

- Keyboard selection and focus retention after shuffling.
- Repeat-click loss, disabled finished cards, result focus, and replay.
- Full wins at 6, 9, and 13 cards; difficulty changes and mid-round restarts.
- Best scores retained separately after reloading.
- All 13 image assets load; images fit without cropping.
- Narrow 320px/375px and tablet 768px layouts without horizontal overflow.
- Reduced-motion settings, missing-image fallbacks, and blocked localStorage.

## Deployment and commit dates

Pushes to `main` trigger the GitHub Pages workflow: install dependencies, lint,
test, build, and deploy `dist/`. Vite's `base: './'` keeps assets relative to the
project path at **https://sid2169.github.io/memory-card/**.

The initial commit has author and committer timestamps of **30 October 2025**.
Implementation commits intentionally use historical timestamps across
**30 October–3 November 2025**, inclusive, in `+05:30`. Existing commits are
preserved. Git timestamps do not establish GitHub publication or deployment dates.
