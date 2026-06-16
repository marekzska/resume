# copy-deck.md

Locked as **draft-in-place**. Final red-pen happens in Code, once the copy sits
in the real layout under the real lighting. Structure here is build-ready: keys
map directly to `locales/en.json` and `locales/sk.json` for react-i18next.

Voice: dry, honest, self-deprecating without being a downer, declaratives that
stop early. Never over-explains a joke or a point. English default, Slovak is a
true localization (not a literal translation — same voice in Slovak).

Note on diacritics: SK strings require latin-ext font subset. Verify every
č ž š ě ř í á é ú ô ľ ň ď ť renders in Fraunces and Geist.

---

## i18n key structure

```
nav.work / nav.approach / nav.about / nav.contact
hero.name / hero.stance
work.title
work.askura.desc / work.almiro.desc / work.aplik.desc
work.viewSite                      // "View site" / "Pozrieť stránku"
approach.title / approach.p1 / approach.p2 / approach.p3
about.title / about.p1 / about.p2 / about.p3
contact.title / contact.line / contact.email / contact.github
```

Work item stack tags are DATA (data/work.ts), not copy — not translated.
URLs are data. Only prose is translated.

---

## ENGLISH (default)

### Nav
- `nav.work`: Work
- `nav.approach`: Approach
- `nav.about`: About
- `nav.contact`: Contact

### Hero
- `hero.name`: Marek Žiška
- `hero.stance`: I build the front end. Faithfully. On time. Without drama.

### Work
- `work.title`: Work
- `work.askura.desc`: A site for a pest-control company — Next.js, CMS-driven blog, built from the designs and shipped end to end. A clean, working website. It does its job.
- `work.almiro.desc`: A multilingual site for a fertilizer manufacturer. Internationalization was part of the build — the kind of i18n work I do regularly.
- `work.aplik.desc`: A React web app for an industrial client in Slovakia. More going on under the hood than the surface lets on.
- `work.viewSite`: View site

### Approach
- `approach.title`: How I work
- `approach.p1`: I plan before I build. Probably more than is normal — I'll spend hours deciding exactly what a thing should be before I write a line of it. It sounds tedious. It means I rarely have to throw work away.
- `approach.p2`: I'm not the developer who reinvents what already exists. If there's a good library, I use it. If there isn't, I build it carefully and don't leave a mess. Clean code, no clutter, nothing that's there just to look clever.
- `approach.p3`: What you can actually count on: I finish what I start. I hit deadlines. I don't make drama when something breaks — I just fix it. I'm still getting better, and I know it. But the parts that matter on a team — showing up, shipping, being easy to work with — those you don't have to worry about.

### About
- `about.title`: Off the clock
- `about.p1`: I'm based in Prague, originally from Bratislava. I write — used to do it more, comedy mostly, the kind where a robot vacuum becomes a personal enemy. Some of that instinct ended up here, in how this site talks.
- `about.p2`: I cook properly. I make playlists like other people keep diaries. I like one warm lamp in the corner and no overhead lights — which, now that I've built this, is apparently also how I design.
- `about.p3`: That's it. No mission statement. If you've read this far, you probably already know whether we'd get along.

### Contact
- `contact.title`: Get in touch
- `contact.line`: Open to remote front-end work. If the project's interesting and the stack is modern, write to me.
- `contact.email`: marekzska@gmail.com
- `contact.github`: GitHub

---

## SLOVAK (toggle)

### Nav
- `nav.work`: Práca
- `nav.approach`: Prístup
- `nav.about`: O mne
- `nav.contact`: Kontakt

### Hero
- `hero.name`: Marek Žiška
- `hero.stance`: Staviam frontend. Spoľahlivo. Načas. Bez drámy.

### Work
- `work.title`: Práca
- `work.askura.desc`: Stránka pre firmu na deratizáciu a dezinsekciu — Next.js, blog cez CMS, postavená podľa návrhov a dotiahnutá od začiatku do konca. Čistá, funkčná stránka. Robí, čo má.
- `work.almiro.desc`: Viacjazyčná stránka pre výrobcu hnojív. Súčasťou bola aj internacionalizácia — ten typ i18n práce, ktorý robím bežne.
- `work.aplik.desc`: React webová aplikácia pre priemyselného klienta na Slovensku. Pod kapotou sa deje viac, než povrch napovedá.
- `work.viewSite`: Pozrieť stránku

### Approach
- `approach.title`: Ako pracujem
- `approach.p1`: Najprv plánujem, potom staviam. Asi viac, než je zdravé — viem stráviť hodiny rozhodovaním, čo presne má daná vec byť, ešte predtým, než napíšem jediný riadok. Znie to zdĺhavo. Znamená to, že málokedy musím prácu zahodiť.
- `approach.p2`: Nie som vývojár, čo vymýšľa už vymyslené. Keď existuje dobrá knižnica, použijem ju. Keď neexistuje, napíšem ju poriadne a nenechám za sebou neporiadok. Čistý kód, žiadny balast, nič, čo tam je len naoko.
- `approach.p3`: Na čo sa dá naozaj spoľahnúť: dokončím, čo začnem. Termíny držím. Keď sa niečo pokazí, nerobím drámu — proste to opravím. Stále sa zlepšujem a viem o tom. Ale tie veci, na ktorých v tíme záleží — že prídem, že odovzdám, že sa so mnou dá vyjsť — o tie strach mať nemusíš.

### About
- `about.title`: Mimo práce
- `about.p1`: Žijem v Prahe, pôvodom z Bratislavy. Píšem — kedysi viac, väčšinou humor, ten typ, kde sa z robotického vysávača stane osobný nepriateľ. Časť toho inštinktu skončila aj tu, v tom, ako tieto stránky znejú.
- `about.p2`: Varím poriadne. Robím playlisty tak, ako si iní píšu denník. Mám rád jednu teplú lampu v rohu a žiadne svetlo zhora — čo je, ako som teraz zistil, zhodou okolností aj spôsob, akým navrhujem.
- `about.p3`: To je celé. Žiadne veľké poslanie. Ak si dočítal až sem, asi už vieš, či by sme si sadli.

### Contact
- `contact.title`: Ozvi sa
- `contact.line`: Otvorený remote frontend práci. Ak je projekt zaujímavý a stack moderný, napíš mi.
- `contact.email`: marekzska@gmail.com
- `contact.github`: GitHub

---

## Red-pen checklist (for the in-Code pass)

Things Marek flagged to re-decide once it's real and lit:
- [ ] Comedy / robot-vacuum reference in `about.p1` — keep, or too personal for a dev site?
- [ ] "I'm still getting better, and I know it" in `approach.p3` — keep the admission, or does it read as too much self-deprecation in a hiring context?
- [ ] Bratislava/Prague origin detail — keep?
- [ ] Work descriptions — honest-understated is the intent ("a clean, working website. It does its job."). Check it doesn't tip into selling the work short. Honest ≠ self-deprecating about the work.
- [ ] Stance closer — locked as a clean stop after "drama." (No "that's the whole pitch." tag — decided.)
- [ ] SK voice — confirm it reads as the same dry person in Slovak, not a stiff translation. Marek is native; he's the judge.
