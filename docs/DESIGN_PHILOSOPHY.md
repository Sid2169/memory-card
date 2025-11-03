# Design philosophy and preferences

These preferences were carried forward from Siddhartha's resume-builder project
and subsequent explicit UI feedback. They are a baseline for Memory Card;
game-specific decisions are recorded below.

## Confirmed game preferences

- Use only the 13 local drawings in `public/pictures/p1.jpeg` through `p13.jpeg`.
  This intentionally replaces the assignment's external-image API requirement.
- Offer Easy (6 cards), Medium (9 cards), and Hard (13 cards). Changing difficulty
  starts a fresh round; sample smaller decks from the full collection.
- This is a unique-selection game: shuffle initially and after every selection,
  award one point for a new picture, end the run on a repeat, and win when every
  picture in the current deck has been selected. Offer a clear replay action.
- Save a separate best score per difficulty in the browser. Storage failures
  must not prevent play.
- Show entire pictures without cropping, in consistent frames, without visible
  captions or selection markers that reveal which cards have been picked.
- Keep the existing solid dark/cyan direction, responsive layout, and minimal
  copy. Keep the implementation simple: no API layer, sound, or extra modes.
- Make atomic conventional commits directly to `main` and push. Distribute the
  implementation commits across **30 October–3 November 2025**, inclusive, using
  `+05:30` for both author and committer timestamps. Preserve existing history.

## Visual identity

- Use solid colors and opaque surfaces. No linear/radial gradients, glassmorphism,
  backdrop blur, translucent panels, glossy highlights, or colored glow effects.
- Prefer a dark interface with one dominant cyan accent, following the earlier
  TicTac-inspired design language used in the resume builder.
- Suggested tokens: background `#14181F`, secondary background `#171C23`, surface
  `#1D242D`, raised surface `#232C36`, cyan `#00ADB5`, text `#EEF2F5`, muted text
  `#9AA6B2`, mint `#17E3A1`, and gold `#F8B400`.
- Use mint and gold sparingly for meaningful success/status distinctions.
- Flat cyan CTA fills with solid hover colors. Secondary controls use solid
  surfaces and clear borders. Clickable elements must look clickable.
- Rounded cards, pill actions, crisp borders, and restrained neutral shadows.
- Poppins-style sans-serif typography with system fallbacks; compact uppercase
  micro-labels where useful. Keep score values easy to scan.

## Layout and copy

- Clean, compact, intentional layouts with generous enough spacing to play.
- Prioritize the card grid and scores over decoration or explanatory prose.
- Minimal instructions: avoid per-field hints, long section descriptions,
  technology-stack footer statements, and unnecessary size/status metadata.
- Use direct, descriptive headings and status messages. Avoid slogans, playful
  one-liners, and motivational copy; use “Memory Card”, “Round complete”, and
  “Game over” for the main gameplay headings.
- One short rules sentence may be useful for this game; do not repeat guidance
  around every control.
- Use responsive layouts that work on narrow mobile screens as well as desktop.
  Never hide essential gameplay or leave mobile users without access to it.
- The resume-builder preference for a thin icon navigation rail is contextual:
  use it only if Memory Card gains multiple meaningful destinations. A single
  game board does not require a section rail.

## Interaction and accessibility

- Use native buttons for cards/actions and real anchors for navigation.
- Give icon-only controls recognizable SVG logos/icons and accessible names.
- Where icons need explanation, show tooltips on hover and keyboard focus.
- Maintain clear keyboard focus, adequate contrast, and comfortable touch targets.
- Give card images descriptive alternatives without duplicating adjacent names.
- Announce important score/round status changes without noisy repeated narration.
- Keep animation restrained and respect `prefers-reduced-motion`.
- Reordering cards must preserve stable IDs and avoid losing keyboard focus.
- Distinguish loading, error, empty, playing, loss, and win states clearly.

## Attribution and personal links

- Display only the first name **Siddhartha** in personal attribution.
- Use a natural footer credit such as “Created by Siddhartha”.
- Link the name to **https://sidsingh.vercel.app/** with an obvious underline and
  accent color; avoid making the footer feel like an advertisement.
- Include recognizable GitHub and LinkedIn logo links:
  - GitHub: https://github.com/Sid2169
  - LinkedIn: https://www.linkedin.com/in/siddhartha-suman-952a64256/
- Provide hover/focus states, labels, and tooltips for logo links.
- Personal backlinks use actual `href` URLs, without `nofollow`, `sponsored`, or
  `ugc`. `rel="me"` may identify the creator's profiles.
- Make attribution discoverable to non-JavaScript crawlers/agents through an
  HTML fallback as well as the visible React footer. Keep the portfolio link
  in the README too. This supports discoverability, not a guaranteed SEO result.

## Technical and delivery preferences

- React, JavaScript, Vite, and plain CSS custom properties; keep dependencies lean.
- Separate API access, game state, rendering, and reusable helpers as they emerge.
- Baseline verification: lint and production build, plus meaningful browser checks.
- Test actual game-state risks when gameplay is introduced; avoid placeholder tests.
- Previous Git workflow preference: feature branches, atomic conventional commits,
  PRs, merge commits without squash, then local/remote branch cleanup. Direct
  commits to main are used when explicitly requested.
- For this setup, initialize a standalone local repository on `main` and date the
  initial commit **30 October 2025**, for both author and committer.
- Commit dates and GitHub deployment/PR timestamps are different records. Keep
  publication claims separate from intentionally assigned historical Git dates.
