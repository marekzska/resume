# build-order.md

The sequence. Build in this order so each step stands on a finished one, and so
every diff is small enough to actually read. This is the workflow: plan locked,
now build in sane order, read each diff as it lands, ask *why* when something's
unclear — not just "fix it."

Each step ends at a point where the site runs and you can see the result. No
step leaves the app broken for the next one.

---

## Step 0 — Scaffold
- `npm create vite@latest` → React + TypeScript.
- Install: tailwindcss + postcss + autoprefixer, framer-motion, i18next +
  react-i18next + i18next-browser-languagedetector, lucide-react, clsx,
  tailwind-merge, @fontsource-variable/fraunces, @fontsource/geist-sans.
- Init Tailwind. Confirm dev server runs on a blank page.
- shadcn: init, but pull components only when first needed (likely just Button).
**Done when:** blank Vite app runs, Tailwind class on a div works.

## Step 1 — Tokens & global styles
- Write `styles/index.css`: Tailwind layers + the `:root` block with the four
  colors + derived vars (the ONLY place hex lives).
- Extend `tailwind.config` to expose tokens as utilities (canvas, ember, parchment, muted).
- Import fonts (latin + latin-ext). Set `--canvas` as body bg, `--parchment` as body text.
- Drop in the type scale (clamp values for display/h1).
**Done when:** blank page is warm near-black, a test heading renders in Fraunces, body in Geist, Slovak diacritics (č ž š ľ ô ď) render correctly.

## Step 2 — `cn` helper + Reveal wrapper + MotionConfig
- `lib/cn.ts` (clsx + tailwind-merge).
- `components/Reveal.tsx` — the reusable Framer reveal (rise + fade, once, reduced-motion-aware).
- Wrap `App` in `<MotionConfig reducedMotion="user">`.
**Done when:** a test element wrapped in `<Reveal>` fades/rises in on scroll, and does NOT animate when OS reduced-motion is on.

## Step 3 — The Spotlight (signature — do it early, it sets the mood)
- `hooks/useSpotlight.ts` — pointer tracking, eased lag via rAF, writes `--mx`/`--my`.
  Reduced-motion + touch → static peripheral position, no rAF.
- `components/Spotlight.tsx` — the fixed gradient layer reading those vars.
- Tune opacity DOWN until it's felt-not-seen (§5 of design-tokens).
**Done when:** moving the cursor drags a soft warm glow with visible lag; reduced-motion/touch shows a static corner glow; it never looks like a flashlight.

## Step 4 — Layout shell: Header + main scaffold
- `components/Header.tsx` — wordmark + nav links + slot for LanguageToggle (toggle
  wired in Step 7; static EN text for now). Backdrop blur appears after scroll.
- `main` with five empty `<section>` placeholders (Hero/Work/Approach/About/Contact),
  each with correct section padding and scroll-anchor ids.
**Done when:** header is fixed, links scroll to the right sections, spacing/rhythm feels generous and correct on mobile + desktop.

## Step 5 — Hero (movement 1)
- `components/Hero.tsx` — `display` name + `lead` stance line. Calm on-load entrance
  (fade + slight rise, ~0.8s), nav links fade in after.
- This is where the spotlight breathes — confirm the negative space lets it show.
**Done when:** hero reads as composed-and-stopped; entrance is calm; glow is most alive here.

## Step 6 — Work (movement 2, the CENTERPIECE) — spend the most time here
- `data/work.ts` — typed array: { key, url, stack[] }, order Askura → Almiro → Aplik.
- `components/WorkItem.tsx` — title (h2), desc (body), View-site link (external-link
  icon), stack tags (mono-ish, muted, tracked-out). The "lights up on entry" treatment.
- `components/Work.tsx` — section title + the three items as deliberate panels scrolled into.
- UNDERSTATED: no loud client logos as headlines. Low profile.
**Done when:** three work panels each catch the light as they enter; links open the live sites; it reads as "three things shown with care," not a thumbnail grid.

## Step 7 — i18n wiring + LanguageToggle
- `lib/i18n.ts` — init i18next, EN default, language detector → localStorage, SK resource.
- `locales/en.json` + `locales/sk.json` — fill from copy-deck.md (all keys).
- Replace every hardcoded string in Header/Hero/Work with `useTranslation` keys.
- `components/LanguageToggle.tsx` — EN | SK, switches language, persists choice.
**Done when:** toggle flips the whole site EN↔SK, choice survives reload, SK reads as the same dry voice (Marek judges), no missing-key warnings.

## Step 8 — Approach + About (movements 3 & 4)
- `components/Approach.tsx` + `components/About.tsx` — copy via i18n keys, Reveal-wrapped.
- Text blocks cap at ~42rem width for readability.
**Done when:** both read in Marek's voice, sit well under the lighting, breathe.

## Step 9 — Contact (movement 5, the lit endpoint)
- `components/Contact.tsx` — email (mailto), live-site links, GitHub link to
  github.com/marekzska (NO commit metrics, no repo claims). The ONE
  `--ember-strong` full-fill button. Hover = slight lift + glow intensify.
- No separate footer chrome; this section ends the page.
**Done when:** the eye comes to rest here; the single red button is the only solid-color element; everything upstream has led the eye to this point.

## Step 10 — Polish & passes
- **Reduced-motion pass:** toggle OS setting, walk the whole page. Every reveal/glow
  has a correct static state. Nothing janky, nothing missing.
- **Responsive pass:** real phone width (~380px) → desktop. Clamp values behave.
  Touch glow is the static peripheral one.
- **A11y pass:** semantic landmarks (header/main/section), heading order, link labels
  (the View-site/external links have accessible text, not bare icons), color contrast
  of `--muted` on `--canvas` is legible, focus states visible, language toggle reachable.
- **Performance pass:** fonts subset + preloaded, no layout shift, Lighthouse sanity check.
  This site should load instantly — that's part of the work-sample.
- **Slop sweep:** read every file. No comments. No magic hex outside tokens. No `any`.
  No dead code. No component doing two jobs. The restraint of the design means any
  mess is visible — find it and cut it.
**Done when:** Marek can read every diff/file and stand behind it. That's the bar.

## Step 11 — Deploy
- Push to GitHub. Import to Vercel. Deploy → live `.vercel.app` URL immediately.
- Attach custom domain when bought (`marekzska.it` pending clean registration; `.dev` fallback).
  Deploy-agnostic build means base path needs no special config for a root domain.
**Done when:** it's live, the domain resolves, HTTPS is on.

---

## The one rule that matters more than the order

Read the diff before you accept it. Not religiously, not all of it — but enough
that nothing enters the codebase you couldn't explain out loud. When something's
unclear, ask **why this and not that**, not just "make it work." Every diff you
read is a free lesson in how a clean implementation handles the thing you just
specified. You already have the expensive half of the discipline (the planning).
This is the cheap half you've been skipping. This project is where you add it.
