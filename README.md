# Memory Card

A React + Vite starter for [The Odin Project's Memory Card assignment](https://www.theodinproject.com/lessons/node-path-react-new-memory-card).

**Creator:** [Siddhartha](https://sidsingh.vercel.app/) · [GitHub](https://github.com/Sid2169) · [LinkedIn](https://www.linkedin.com/in/siddhartha-suman-952a64256/)

## Current status

Initial scaffold: JavaScript, React 19, Vite 7, ESLint, plain CSS, a solid-color
starter screen, and an accessible creator footer. The game logic, scoreboard,
card grid, and external API integration are planned work.

## Assignment research

The project belongs to the Full Stack JavaScript path's React course, in the
state/effects portion of the curriculum. Its learning goal is to use hooks to
manage state and fetch data from an external API.

The official assignment requires:

- A new React project with a thought-out component and folder structure.
- A scoreboard showing the current score and best score achieved so far.
- A set of cards with images and optionally informational text, fetched from an external API.
- Randomized card order on the initial mount and every time a card is clicked.
- A styled application, a GitHub repository, and a deployed site.

The intended game is a **unique-selection memory challenge**, rather than a
face-down matching-pairs game: select cards without selecting the same one twice
while their positions keep changing.

### Planned game behavior

- Give each fetched card a stable ID; track selection by ID, never grid position.
- A first-time selection increases the current score.
- Selecting an already-picked card ends the run; keep the best score and offer a restart.
- Selecting every card wins the round.
- Shuffle a copy of the deck on initial load and after selections, using Fisher–Yates.
- Fetch once per deck and reuse the data when shuffling.
- Provide loading, request-error/retry, and missing-image states.
- Use native button cards with visible keyboard focus and readable names.

These rules are the implementation plan. The exact deck size, card theme, API,
and restart/win presentation remain open decisions.

### API research

The assignment suggests Giphy or PokéAPI as examples; neither is mandatory.
[PokéAPI](https://pokeapi.co/docs/v2#pokemon) is a practical candidate because it
provides Pokémon names, IDs, and image URLs without authentication. A detail
request uses `GET https://pokeapi.co/api/v2/pokemon/{id-or-name}/`; image choices
include `sprites.front_default` and official artwork when available. Cache
responses locally, as requested by its fair-use policy, and avoid refetching on
each click. No API has been wired into this scaffold.

### Optional enhancements

Persistent best scores, selectable deck sizes/difficulty, sound, and animation
are optional extensions, not requirements stated by the official assignment.

## Local development

Requires Node.js 20.19+ on the Node 20 line, or Node.js 22.12+; Node 22 LTS is recommended.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run lint` | ESLint checks |
| `npm run build` | Production output in `dist/` |
| `npm run preview` | Serve the production build locally |

## Structure and implementation plan

```text
public/                   Favicon and footer logos
src/
  App.jsx                 Starter application shell
  App.css                 Layout and component styles
  index.css               Solid-color tokens and global styles
  main.jsx                React entry point
docs/
  DESIGN_PHILOSOPHY.md     Recorded design philosophy and preferences
```

When implementing gameplay, introduce `components/` for the scoreboard, grid,
cards, and round status; `hooks/` for fetching and round state; `services/` for
the chosen API adapter; and `utils/` for shuffling. Keep external data fetching
separate from selection/scoring transitions. Use effects for API synchronization
with cleanup, and event handlers for card selections. Avoid mutating state and
avoid putting gameplay side effects inside state updater functions.

## Design

Solid dark surfaces, cyan actions, minimal copy, responsive cards, and accessible
interaction states. No gradients or glass effects. Full preferences and personal
links are recorded in [docs/DESIGN_PHILOSOPHY.md](docs/DESIGN_PHILOSOPHY.md).

## Verification and delivery

The baseline checks are `npm run lint` and `npm run build`. Once gameplay exists,
verify repeat-click loss, unique-selection scoring, best-score retention, a full
round win, shuffled identity stability, API failures, keyboard access, and narrow
mobile layouts. Focus automated tests on those state transitions when implemented.

Vite uses `base: './'` for static project-path hosting. No remote repository or
deployment has been configured at this stage. A future static deployment should
build with `npm ci && npm run build` and publish `dist/`.

The requested initial Git commit date is **30 October 2025**, applied to both
author and committer timestamps. Git timestamps do not establish a publication
or deployment date.

## Sources

- [Official Memory Card assignment](https://www.theodinproject.com/lessons/node-path-react-new-memory-card)
- [Curriculum source](https://github.com/TheOdinProject/curriculum/blob/main/react/states_and_effects/project_memory_card.md)
- [Student example linked by the assignment](https://heldersrvio.github.io/memory-card-game/)
- [PokéAPI documentation and fair-use policy](https://pokeapi.co/docs/v2)
