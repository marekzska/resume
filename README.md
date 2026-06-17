# marekzska.space

Personal site of **Marek Žiška**, front-end developer in Prague — a warm-dark,
bilingual (EN/SK) one-pager. An npm-workspaces monorepo: the site **dogfoods**
its own interaction library, [`warm-motion`](./packages/warm-motion).

```
.                       the site (Vite + React 19 + Tailwind v4 + i18next)
└─ packages/warm-motion the published interaction-primitives library
```

## Develop

```sh
npm install
npm run build:lib   # build warm-motion once (the site consumes its dist)
npm run dev         # start the site
npm test            # warm-motion + site test suites
npm run build       # build lib, typecheck, build site
npm run lint
```

## Architecture & decisions

- **React 19 + Vite 8 + Tailwind v4**, no SSR. It's a single static page; a build
  step beats a server here. Fonts (Fraunces + Geist, variable) are preloaded by a
  tiny Vite plugin that derives the `<link rel=preload>` tags from the *hashed*
  bundle filenames, so preloads never go stale.
- **Design system in CSS tokens** (`src/styles/index.css`): a warm-dark palette,
  a fluid `clamp()` type scale, a radius scale, and `color-mix`-derived tokens so
  every shade descends from the base palette.
- **Motion is a library, not scattered effects.** The cursor spotlight, magnetic
  hover, scroll reveals, and view-transition helper live in `warm-motion` and are
  imported back into the site — the same code is packaged for npm and dogfooded.
- **Accessibility as architecture, not a checkbox.** `prefers-reduced-motion` is
  honoured across every animated surface (each has a real static fallback, not a
  blanket disable), pointer-capability gating means touch users get no dead hover
  effects, there's a skip link, an ember `:focus-visible` ring, `aria-pressed` on
  the language toggle, and `aria-hidden` on decorative layers.
- **i18n** (`src/lib/i18n.ts`): i18next with `localStorage` detection; switching
  language runs through the View Transitions API and syncs both `<html lang>` and
  `document.title`.

## Testing

Vitest + Testing Library + jsdom, across both workspaces. The browser-heavy hooks
are tested by mocking `matchMedia` (with live `change` notifications so
framer-motion's cached `useReducedMotion` stays in sync), `IntersectionObserver`,
and rAF via fake timers — e.g. asserting the magnetic pull clamps to `maxOffset`
and snaps back, and that every primitive no-ops under reduced motion / coarse
pointer. A data↔locale parity test guards that every project has EN + SK copy.

## CI

GitHub Actions runs build → lint → test on every push and PR. A separate
release workflow publishes `warm-motion` to npm on a GitHub Release.
