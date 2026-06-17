# warm-motion

Tasteful, **reduced-motion-aware** React interaction primitives — a cursor
spotlight, magnetic hover, scroll reveals, and view-transition helpers. Extracted
from [marekzska.space](https://marekzska.space) and used in production there.

- **Accessible by default** — every effect honours `prefers-reduced-motion` and
  bails on coarse (touch) pointers, so you never ship a dead hover affordance.
- **Owns its physics** — the magnetic pull is clamped and spring-smoothed in JS
  (no reliance on a CSS transition), and its rAF loop idles when settled.
- **Tiny & tree-shakeable** — ~1.5 kB gzipped, ESM + CJS, `react`/`react-dom`/
  `framer-motion` are peer deps.

## Install

```sh
npm i warm-motion
```

```ts
// once, near your app root:
import 'warm-motion/styles.css'
```

Peer dependencies: `react >=18`, `react-dom >=18`, `framer-motion >=11`.

## API

### `useSpotlight(options?)`
Tracks the cursor into the `--mx` / `--my` CSS variables on `:root` and toggles a
`spotlight-live` class. Combined with the stylesheet, it lights up any element
with the `.lit` class.

```tsx
useSpotlight() // options: { lerp?, staticX?, staticY? }

<h1 className="lit">Lit by the cursor</h1>
```

Map your text colours onto the spotlight:

```css
:root {
  --wm-spotlight-from: #ede6e0; /* bright */
  --wm-spotlight-to:   #8a7e7e; /* dim   */
}
```

### `useMagnetic(options?) → ref`
Attracts an element toward the cursor once it enters an activation radius. The
pull is clamped (`maxOffset`) and both follow and snap-back are spring-smoothed.

```tsx
const ref = useMagnetic<HTMLAnchorElement>({ strength: 0.35, radius: 140, maxOffset: 12 })
<a ref={ref} href="…">Contact</a>
```

### `<Reveal>`
Fades (and optionally rises) children into view once, when scrolled near. Renders
a plain wrapper with no animation under reduced motion.

```tsx
<Reveal delay={0.08} rise>
  <p>…</p>
</Reveal>
```

### `withViewTransition(update)`
Runs `update` inside a View Transition when supported, synchronously otherwise,
and skips the transition entirely under reduced motion.

```tsx
withViewTransition(() => flushSync(() => setTheme('dark')))
```

### Constants
`EASE`, `REVEAL_DURATION`, `REVEAL_RISE`, `REVEAL_STAGGER` — the shared timing the
primitives use, exported so your own motion can match.

## Behaviour matrix

| Condition | useSpotlight | useMagnetic | Reveal |
| --- | --- | --- | --- |
| reduced motion | static fallback vars | inert | no animation |
| coarse pointer | static fallback vars | inert | animates on scroll |

## Versioning

Semantic versioning. The public surface is the named exports above plus the two
`--wm-spotlight-*` CSS custom properties.

## License

MIT
