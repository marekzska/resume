# design-tokens.md

The single source of truth for every visual value. Nothing in the codebase
hardcodes a hex, a font size, or a duration that isn't defined here first.
If a value is needed that isn't here, it gets added here before it gets used.

Core principle: **one lamp, no overhead lights.** Warm light glowing inside
darkness. One accent per view. Restraint is the aesthetic — adding is easy,
stopping is the skill.

---

## 1. Color

Four values. That's the whole palette. Resist adding a fifth.

| Token            | Hex        | Role                                                        |
|------------------|------------|-------------------------------------------------------------|
| `--canvas`       | `#0E0B0C`  | Page background. Warm near-black, faint red-brown undertone. NOT pure `#000` (cold/cheap). |
| `--ember`        | `#B23A48`  | The glow. Deep wine/ember red. The "lamp." Used sparingly — one accent per view. |
| `--ember-strong` | `#C2424E`  | Only for the single full-fill moment (contact button). The one place red is solid. |
| `--parchment`    | `#EDE6E0`  | Primary text. Warm off-white, like paper under lamplight. NOT `#FFF` (harsh/overhead). |
| `--muted`        | `#8A7E7E`  | Secondary text, captions, stack tags. Dusty rose-grey. |

Derived (compute from above, don't invent new hues):
- `--ember-glow`: `--ember` at low alpha for the spotlight gradient (see §5).
- `--hairline`: `--parchment` at ~8% alpha. For the only borders that exist (thin dividers, link underlines).
- `--canvas-raised`: `--canvas` lightened ~3% for the rare panel that needs to sit *barely* above the background. Use almost never.

Tailwind: extend `theme.colors` with these as CSS variables (`canvas`,
`ember`, `parchment`, `muted`) so utilities work but the values live in one
`:root` block. Dark mode is the *only* mode — do not build a light theme.

---

## 2. Typography

Two families. Editorial serif for display (the "crisp bones" confidence),
neutral grotesk for everything functional (the quiet structure). The contrast
between them IS the design tension, made typographic.

- **Display / headings:** `Fraunces` (variable, optical-size on). Large, warm, confident.
  - Fallback stack: `Fraunces, "Times New Roman", serif`
- **Body / UI:** `Geist` (or `Inter` if Geist tooling annoys). Quiet, legible.
  - Fallback stack: `Geist, Inter, system-ui, sans-serif`

Load via `@fontsource-variable/fraunces` and `@fontsource/geist-sans` (Vite-friendly,
self-hosted, no FOUT from third-party CDNs). Subset to `latin` + `latin-ext`
(latin-ext is REQUIRED — Slovak diacritics: č ž š ě ř í á é ú ô ľ ň d').

### Type scale (rem, 1rem = 16px)

| Token        | Size        | Line-height | Family   | Use                                  |
|--------------|-------------|-------------|----------|--------------------------------------|
| `display`    | 4.5–7rem (clamp) | 1.0    | Fraunces | Hero name only                       |
| `h1`         | 2.5–3.5rem (clamp) | 1.1  | Fraunces | Section titles                       |
| `h2`         | 1.5rem      | 1.2         | Fraunces | Work-item titles, sub-headers        |
| `lead`       | 1.25rem     | 1.5         | Geist    | Hero stance line, section intros     |
| `body`       | 1rem        | 1.6         | Geist    | Paragraph copy                       |
| `small`      | 0.875rem    | 1.5         | Geist    | Captions, stack tags, footer         |
| `mono-ish`   | 0.8125rem   | 1.5         | Geist    | Stack tags (tracked-out, uppercase)  |

Hero `display` uses `clamp(4.5rem, 10vw, 7rem)`. Section `h1` uses
`clamp(2.5rem, 6vw, 3.5rem)`. Everything else fixed.

Letter-spacing: tight on Fraunces display (`-0.02em`), normal on body,
tracked-out on stack tags (`0.08em`, uppercase).

---

## 3. Spacing & rhythm

Base unit: `4px`. Use the Tailwind default scale (multiples of 4). The thing
that matters more than the scale is **generosity** — this design breathes.
Sections are tall. Negative space is the point; it's the darkness the lamp
sits in.

- Section vertical padding: `clamp(6rem, 14vh, 10rem)` top and bottom.
- Max content width: `72rem` (`max-w-6xl`), but text blocks cap at `42rem` (`max-w-2xl`) for readability.
- Horizontal page gutter: `clamp(1.5rem, 5vw, 4rem)`.
- The page is intentionally NOT full-bleed busy. One column, centered-ish, lots of room.

---

## 4. Layout shell

- Single page, vertical scroll, five movements (see components.md / copy-deck.md).
- Fixed top bar: minimal. Left = wordmark `marek žiška` (lowercase, Fraunces, small).
  Right = section links (Work / Approach / About / Contact) + language toggle (EN/SK).
  Links fade in after hero, are `--muted`, go `--parchment` on hover. No background
  on the bar until scrolled, then a faint `--canvas` blur backdrop.
- No footer chrome beyond the contact section. The contact section IS the ending.

---

## 5. The spotlight (signature interaction)

The soul of the site. A soft, warm, low-opacity radial glow that **lags behind
the cursor** — like carrying one small lamp through a dark room. As it moves,
different elements catch the light. This is "one peripheral glow, no overhead
light" shipped as code.

Spec:
- A single fixed-position radial-gradient layer, `pointer-events: none`, sits above
  the canvas but below content (`z-index` between bg and text).
- Gradient: `radial-gradient(circle at var(--mx) var(--my), var(--ember-glow), transparent 40%)`.
- Size: large and soft — the glow radius should feel like ~40vmax, very diffuse. No hard edge.
- Opacity: LOW. Target ~0.10–0.14 at center. It should be *felt*, not stared at.
  If it looks like a flashlight, it's too strong. If you're not sure it's there, it's right.
- **Lag:** the glow position eases toward the pointer, it does not snap. Lerp factor
  ~0.08–0.12 per frame via `requestAnimationFrame`. The lag is what makes it feel
  like a physical light being carried, not a cursor attachment.
- This is NOT a cursor trail. No particles, no copies, no juvenile effects. One slow soft light.

Reduced motion / touch:
- `prefers-reduced-motion: reduce` → no follow, no rAF. The glow becomes a STATIC
  peripheral position: anchored off to one side (e.g. top-right or upper-left),
  fixed. This is literally "one warm lamp in the corner" — the static fallback is
  itself on-brand, not a degraded experience.
- Touch devices (no fine pointer): same static peripheral glow. Don't chase touch points.
- Implementation lives in ONE hook: `useSpotlight` (see components.md). Nothing
  else in the app knows how the glow works.

---

## 6. Motion (Framer Motion)

Restraint, again. Motion supports reading; it never performs.

- **Section reveal:** on scroll into view, content rises ~16px and fades in over
  ~0.6s, `ease: [0.22, 1, 0.36, 1]` (gentle, confident, no bounce). Stagger children ~0.08s.
  Trigger once (`viewport={{ once: true, margin: "-15%" }}`).
- **Work panels:** the centerpiece. Each "lights up" as it enters — content reveal
  PLUS a subtle increase in its own warmth (e.g. a faint ember hairline or a slight
  parchment-brightening of its title). Subtle. The light finds it.
- **Hero:** name and stance line do a single calm entrance on load (no scroll trigger).
  Fade + slight rise, slightly slower (~0.8s). Nav links fade in after, ~0.4s delay.
- **Contact:** the eye's resting point. The full-`--ember-strong` button is the only
  element with a hover state that uses real color shift (slight lift + glow intensify).
- ALL of the above is gated by `prefers-reduced-motion`. Reduced motion → content is
  simply present, no transforms, no fades. Build the reduced path as a real path,
  not an afterthought.

Global: respect `prefers-reduced-motion` via a single `useReducedMotion()`
(Framer's built-in) read once and threaded down, OR Framer's `MotionConfig
reducedMotion="user"` at the root. Prefer the latter — set it once at the root.

---

## 7. Non-negotiables (these are also in components.md but repeated because they're load-bearing)

- No comments in code.
- No hardcoded hex/size/duration outside this token layer.
- One mode: dark. No light theme.
- The glow is felt, not loud. When in doubt, dial it DOWN.
- One accent per view. If two reds are fighting, kill one.
