# Erasmo Concepcion — Portfolio

A cinematic, motion-driven personal portfolio for Erasmo Concepcion — AI builder & Pursuit Fellow. Built to tell a story: *an educator and marketer turned AI builder, making tools that give people back something they lost.*

## Design

Editorial, gallery-grade layout in a strict three-value palette — warm paper grey, near-black ink, and one loud flat accent (electric indigo) — with the motion language reverse-engineered in Erasmo's own [ui-animation-library](https://github.com/99thDragon/ui-animation-library) (originally studied from thelinestudio.com).

**Story chapters:** counter preloader → typographic hero → *The Thread* (the tutor→marketer→AI-builder throughline) → *Selected Work* (six real projects, VoiceKeeper leading with a voice-equalizer motif) → *42 Paper Planes* (the job-search data story) → *About* (portrait under an "acetate" cel-sheet) → *Contact*.

**Motion patterns used:** FPS preloader, Lenis smooth scroll + custom scrollbar, masked split-line reveals, sticky trailing cursor with labels, live NYC studio clock, sound equalizer, and a fullscreen nav overlay.

## How to Run

Just open `index.html` in your browser (needs internet — GSAP + Lenis load from CDN).

For local development with the Browser pane, a dev server is configured:
```bash
python -m http.server 5500
```
then open `http://localhost:5500`.

## Structure

- `index.html` — the single-page story (SEO meta, OG/Twitter cards, inline SVG favicon).
- `job-search.html` — "42 Paper Planes," a standalone interactive SVG data visualization, linked as a chapter.
- `style.css` — the full design system: palette tokens, one motion language, all section layouts, responsive + `prefers-reduced-motion`.
- `js/main.js` — progressive-enhancement orchestration. Patterns adapted from `ui-animation-library`; the page is fully readable with **no JS** and with **reduced motion** (motion only turns on when GSAP is present and the user hasn't asked for reduced motion).
- `assets/images/Avatar.jpg` — optimized portrait (~54 KB).

## Accessibility & performance

- Every animation has a `prefers-reduced-motion` fallback; content is never hidden behind motion that can't run.
- Skip link, `aria-hidden` on decorative elements, keyboard-dismissable nav (Esc).
- Transforms/opacity only; the equalizer pauses when the tab is hidden.
