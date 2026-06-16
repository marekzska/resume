# components.md

The component map. What we build by hand, what we pull and restyle, how the
files are laid out. The rule you set: **real developer reuse — pull solved
primitives, hand-build what's actually ours.** This file draws that line
explicitly so the build doesn't drift.

---

## Stack (locked)

- **Vite + React + TypeScript** (NOT Next — no `next/*` anything).
- **Tailwind CSS** — tokens from design-tokens.md wired as CSS variables.
- **Framer Motion** — scroll reveals, hero entrance, the glow's eased motion config.
- **shadcn/ui** primitives — but RETOKENIZED. Default shadcn must not look like default shadcn.
- **react-i18next** + **i18next** — EN default, SK toggle. (This is the real, transferable i18n lib for non-Next React. Chosen deliberately to demonstrate the skill.)
- **lucide-react** — the 2–3 icons we need (mail, arrow, external-link). Nothing more.
- **clsx** + **tailwind-merge** — class composition (`cn` helper).
- **@fontsource-variable/fraunces** + **@fontsource/geist-sans** — self-hosted fonts, latin + latin-ext subsets.

Nothing else gets added without a reason that survives the "could this be a few
lines instead" question.

---

## Build vs. Borrow

### BORROW (solved problems — pulling these is correct, not lazy)
- shadcn `Button` → restyle to tokens. Used for the contact CTA and nav, maybe.
- shadcn `Tooltip` → only if a stack tag needs a hover label. Optional; skip if unused.
- Framer Motion's reveal primitives, `MotionConfig`, `useReducedMotion`.
- react-i18next's `useTranslation`, provider, language detection/switch.
- lucide icons. clsx/tailwind-merge. fontsource.

### BUILD BY HAND (these are *ours* — the soul of the thing)
- **`useSpotlight`** — the cursor-lagging warm glow + reduced-motion/touch static fallback. ~30 lines. No library does this specific restrained version. This is THE signature.
- **Layout & composition** — the five-movement scroll structure, spacing, rhythm.
- **Section reveal choreography** — how content catches the light as it enters.
- **The work panels** — the centerpiece presentation. Hand-composed, not a card library.
- **Language toggle UI** — trivial, ours, two-state, wired to i18next.

If a "build" item starts feeling like it wants a library, stop and ask. If a
"borrow" item starts needing heavy custom overrides to fit, reconsider whether
we should've built it. Hold the line in both directions.

---

## Component tree

```
<App>
  <MotionConfig reducedMotion="user">      // Framer, set once at root
    <Spotlight />                           // fixed glow layer, uses useSpotlight
    <Header />                              // wordmark + nav links + LanguageToggle
    <main>
      <Hero />                              // movement 1 — entrance
      <Work />                              // movement 2 — CENTERPIECE
        <WorkItem />  x3                    //   Askura, Almiro, Aplik
      <Approach />                          // movement 3 — how I work
      <About />                             // movement 4 — the person
      <Contact />                           // movement 5 — the lit endpoint
    </main>
  </MotionConfig>
```

Notes per component:

- **`<Spotlight />`** — renders one fixed `div` with the radial-gradient bg driven
  by CSS vars `--mx`/`--my`. All logic in `useSpotlight`. Component is dumb; hook is smart.
- **`<Header />`** — fixed. Wordmark left (Fraunces, lowercase, small). Right: nav
  anchor links (Work/Approach/About/Contact, from i18n) + `<LanguageToggle />`. Faint
  `--canvas` blur backdrop appears only after scroll past hero. Links `--muted` → `--parchment` on hover.
- **`<LanguageToggle />`** — two-state EN | SK. Minimal. Persists choice to `localStorage`
  via i18next language detector. (localStorage is FINE here — this is a real Vite app, not
  a sandboxed artifact. The artifact-storage restriction does not apply to the shipped site.)
- **`<Hero />`** — `display` name + `lead` stance line ("I build the front end.
  Faithfully. On time. Without drama."). Calm on-load entrance. The negative space here is
  where the spotlight is most visible. No portrait (locked decision).
- **`<Work />` + `<WorkItem />`** — THE centerpiece. Three items, order: Askura → Almiro
  → Aplik. Each WorkItem: title (`h2`), one honest sentence, live URL (external-link icon),
  stack tags (`mono-ish`, `--muted`, tracked-out). UNDERSTATED — no big client logos as
  headlines, low profile (employer-discretion decision). Each panel "lights up" on entry.
- **`<Approach />`** — copy from copy-deck.md. Plain, dry, honest. Reliable-finisher pitch.
- **`<About />`** — copy from copy-deck.md. Warm human texture, brief. The lamp/no-overhead
  callback is the one quiet personal beat. NOT melancholy.
- **`<Contact />`** — email, live-site links, GitHub (plain link to profile,
  github.com/marekzska — activity graph visible, NO commit metrics, no repo claims). The
  ONE full-`--ember-strong` button lives here. Eye comes to rest. This is the ending; no
  separate footer chrome.

---

## File structure

```
src/
  components/
    Spotlight.tsx
    Header.tsx
    LanguageToggle.tsx
    Hero.tsx
    Work.tsx
    WorkItem.tsx
    Approach.tsx
    About.tsx
    Contact.tsx
    Reveal.tsx            // small wrapper around Framer reveal, reused by sections
  hooks/
    useSpotlight.ts
  lib/
    cn.ts                 // clsx + tailwind-merge helper
    i18n.ts               // i18next init + config
  locales/
    en.json
    sk.json
  styles/
    index.css             // Tailwind layers + :root token block (the ONLY place hexes live)
  data/
    work.ts               // the 3 work items as typed data (title key, url, stack[])
  App.tsx
  main.tsx
```

Conventions:
- One component per file, named same as file. Small and single-purpose.
- `Reveal.tsx` exists so reveal logic isn't copy-pasted into five sections — reuse, per the rule.
- Work items live as typed DATA in `data/work.ts` (not hardcoded JSX), so adding/reordering
  is a data edit. Copy strings reference i18n keys; URLs and stack arrays are data.
- `i18n.ts` is the only place i18next is configured. Components only ever call `useTranslation`.
- `styles/index.css` `:root` is the ONLY place raw hex values appear. Everything else uses vars.

---

## Code rules (load-bearing — restating from design-tokens.md §7)

- **No comments.** Anywhere. If code needs explaining, the names are wrong.
- Small, single-purpose components. No god-components.
- The glow lives in exactly ONE hook. Nothing else knows how it works.
- Tokens centralized. No magic hex/size/duration outside the token layer.
- `prefers-reduced-motion` is a real, built path — not bolted on after.
- TypeScript: real types on props and data. No `any`. The work-item shape is a defined type.
- This is the diff Marek reads as it lands. Restrained surface = slop is obvious = the design protects the dev.
