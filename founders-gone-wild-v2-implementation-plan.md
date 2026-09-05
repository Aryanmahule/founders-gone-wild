# Founders Gone Wild — V2 Implementation Plan
*Funky comic-deck direction, built around the 3D exploded-card-deck animation. Written for "vibe coding" in Claude Code / Claude Sonnet 4.5.*

Reference files to hand over alongside this plan:
- `fgw-deck-scroll-site.html` — working reference build of the hero + scrollytelling section (copy this pattern, don't just describe it)
- `fgw-deck-explode.mp4` — the 3D exploded-card-deck animation (8s, loops, 1280×720)
- `fgw-genz-homepage.html` — earlier sticker/collage exploration (superseded by this plan, kept for the stat-chip and marquee ticker ideas only)

---

## 1. Concept Summary

The site is no longer a pirate/treasure-map world. It's now built around one real asset: a looping 3D render of the "Founders Gone Wild" card deck **exploding into its individual layers**, on a solid sage-teal background. That video is the spine of the whole design — the palette, the type, and the layout all derive from it, and it appears pinned on the right side of the page while the story scrolls past on the left ("Apple product-page" scrollytelling pattern).

Everything else on the site (Rules, Cards, Leaderboard, Judges, Dashboard, Chaos Card) should feel like it belongs to the *same object* as that card render — same comic-deck type, same teal/gold/purple palette — just without the video.

---

## 2. Tech Stack

- **Framework:** React + Vite (or plain HTML/CSS/JS if keeping it a single static site — the reference file is vanilla JS on purpose so it's easy to port either way)
- **Styling:** Tailwind CSS, theme extended with the tokens in Section 3
- **Animation:**
  - `IntersectionObserver` for the scrollytelling text reveals (see reference file — no library needed)
  - Framer Motion for card-flip / hover / modal interactions elsewhere in the site (Draw Your Fate, Chaos Card)
- **Video handling:** native `<video autoplay muted loop playsinline>`, not a gif — keeps file size down and quality high. Provide a poster frame (first frame exported as `.jpg`) for slow connections.
- **Fonts:** Google Fonts — `Luckiest Guy` (display/comic headlines), `Space Grotesk` (body/UI), `Space Mono` (labels, eyebrows, stat values feel free to swap for numbers)

---

## 3. Design System (derived from the video asset)

### 3.1 Color Tokens
| Token | Hex | Source / Use |
|---|---|---|
| `--bg` | `#598F83` | Exact sampled background of the video — **the whole site's background color**, so the video has no visible edge |
| `--bg-deep` | `#3F6B62` | Nav bar, footers, darker section wells |
| `--cream` | `#EDE6C4` | Card-back stripe color; light text/backgrounds |
| `--sage` | `#8FAF9F` | Secondary stripe / muted panels |
| `--gold` | `#F2C94C` | "FOUNDERS" logo color; primary CTA buttons |
| `--purple` | `#6C3FA6` | "WILD" logo color; secondary accents |
| `--blue` | `#2F6FA8` | Comic speech-bubble blue behind the logo burst |
| `--ink` | `#132420` | Dark text on light/gold surfaces |
| `--white` | `#FBF9F1` | Primary text on teal background |

**Rule of thumb:** never introduce a background color that isn't `--bg` or `--bg-deep` — the entire point of this direction is that the video blends seamlessly into the page. If a section needs visual separation, darken/lighten via opacity overlays, not a new hue.

### 3.2 Typography
- **Display / headlines:** `Luckiest Guy` — bouncy, comic, matches the hand-painted lettering on the card back exactly. Use for H1/H2 only, always uppercase.
- **Body / UI / nav:** `Space Grotesk` — clean, geometric, keeps the comic headlines from tipping into "childish"
- **Labels / eyebrows / mono data (timers, stats):** `Space Mono`, uppercase, letter-spaced

### 3.3 Signature Visual Elements
- **Sunburst wash:** a very faint repeating-conic-gradient (cream stripes at ~5% opacity) behind hero content, echoing the card-back starburst pattern — decorative, not literal
- **Sticky video column:** the exploded-deck video pinned via `position: sticky` in a two-column grid, reused in every section that has a "story" to tell (hero, how-it-works). This is the site's signature move — don't dilute it by adding more competing animations
- **Comic drop-text:** headline treatment where the second line gets an offset hard text-shadow in a contrasting palette color (gold text / blue shadow, purple text / cream shadow) — pulled directly off the card logo
- **Gold underline/box-shadow buttons:** solid gold pill buttons with a flat colored drop-shadow (not blurred) — comic "sticker" feel without going full Y2K collage like the earlier concept

---

## 4. Page/Section Layout Plan

### 4.1 Global Nav (sticky, all pages)
Semi-transparent dark-teal bar, blurred backdrop, gold logo mark with a small glowing dot, nav links in Space Grotesk small-caps, gold "Register" pill on the right.

### 4.2 Home — Hero
Two-column grid (~55/45 split):
- **Left:** eyebrow chip ("🃏 one deck. zero rules."), big two-line comic headline ("FOUNDERS" gold / "GONE WILD" purple, each with offset drop-shadow), one-paragraph pitch, two CTAs (Register / Draw Your Fate), a row of 4 stat chips (Team size, Rounds, Prize pool, Date)
- **Right:** sticky video frame playing the exploded-deck animation on loop

### 4.3 Home — "How It Works" Scrollytelling Section
Continues the same two-column grid immediately below the hero, video column stays sticky/pinned while 4 text steps scroll past on the left, each fading/rising into focus via `IntersectionObserver` (`.step` → `.step.active`). Map the steps to the video's own on-screen labels so copy and visual reinforce each other:
1. **Top Card — The Odyssey:** "One deck. Infinite startups."
2. **Deck Layer 1 — The Draw:** "Two flips. Zero safety net."
3. **Deck Layer 2 — The Build:** "48 hours to make it real."
4. **Deck Layer N — The Pitch:** "Every layer is a round closer to the top."

### 4.4 Home — Final CTA band
Centered, large comic headline ("Ready to get wild?") with gold/purple drop-shadow treatment, one line of supporting copy, two CTA buttons. Sits on a subtle darkened gradient well (`--bg` → `--bg-deep`), no new colors.

### 4.5 Draw Your Fate (interactive page)
Keep the card-flip game mechanic from the original plan, but re-skin to this palette:
- Object card: gold border/glow
- Technology card: purple border/glow
- Background: `--bg`, with the same faint sunburst wash
- Countdown timer in `Space Mono`
- "Accept Challenge" button = gold pill; "Draw Again" = outline pill

### 4.6 Rules, Rounds, Cards Library, Judges, Leaderboard, Registration, Final Pitch, Dashboard, Chaos Card
Carry over the **content and structure** from the original odyssey-themed plan (see Section 4 of the first implementation plan doc), but re-skin every surface:
- Replace parchment textures → flat `--bg`/`--bg-deep` panels with thin cream/gold hairline borders
- Replace pirate iconography (compass, anchor, wheel, skull) → simple line icons in gold/cream, or drop them entirely in favor of comic typography doing the work
- Keep numbered/round-card layouts, leaderboard podium, judge grid, and dashboard sidebar structurally as-is — only the skin changes
- Chaos Card modal keeps its dark dramatic card, but swap the maroon/red for `--bg-deep` + gold border + purple skull icon, confetti in gold/purple/cream

---

## 5. Component Architecture

```
src/
 ├─ assets/
 │   ├─ video/fgw-deck-explode.mp4
 │   ├─ video/fgw-deck-poster.jpg   (first frame, for <video poster>)
 │   └─ icons/ (minimal line icons: gold/cream only)
 ├─ components/
 │   ├─ layout/Navbar.jsx, Footer.jsx
 │   ├─ ui/PillButton.jsx, Chip.jsx, ComicHeadline.jsx
 │   ├─ home/Hero.jsx, StickyVideoColumn.jsx, StoryStep.jsx, StorySection.jsx, FinalCta.jsx
 │   ├─ fate/FlipCard.jsx, ChallengeBanner.jsx, CountdownTimer.jsx
 │   ├─ rules/RuleTile.jsx
 │   ├─ rounds/RoundCard.jsx
 │   ├─ cardsLibrary/CardTile.jsx, CardTabs.jsx
 │   ├─ registration/RegistrationForm.jsx
 │   ├─ leaderboard/PodiumBadge.jsx, LeaderboardTable.jsx
 │   ├─ judges/JudgeCard.jsx
 │   ├─ dashboard/Sidebar.jsx, ProgressDonut.jsx, TodoList.jsx
 │   └─ chaos/ChaosModal.jsx
 ├─ hooks/
 │   └─ useScrollReveal.js   (wraps IntersectionObserver, mirrors the vanilla JS in the reference file)
 ├─ data/ (objects.json, technologies.json, rules.json, rounds.json, leaderboard.json, judges.json, chaosCards.json)
 ├─ pages/ (Home.jsx, DrawYourFate.jsx, Rules.jsx, Rounds.jsx, Cards.jsx, Register.jsx, Leaderboard.jsx, Judges.jsx, FinalPitch.jsx, Dashboard.jsx)
 └─ App.jsx
```

---

## 6. Build Phases (order for Claude Code)

1. **Scaffold + theme** — Vite + React + Tailwind, register the 3 Google Fonts, add the color tokens from Section 3 to `tailwind.config` as custom colors
2. **Video asset pass** — drop in `fgw-deck-explode.mp4`, export and add a poster frame, confirm `--bg` matches the video's background exactly (sample it yourself if the asset changes — don't eyeball it)
3. **Global shell** — Navbar, PillButton, ComicHeadline, Chip primitives
4. **Hero + StickyVideoColumn** — port directly from `fgw-deck-scroll-site.html`, this is the highest-risk/most-important piece to get pixel-right before moving on
5. **Story scrollytelling section** — `useScrollReveal` hook wrapping IntersectionObserver, 4 `StoryStep` components, reuse the same sticky video column
6. **Final CTA band**
7. **Re-skin remaining pages** — Rules, Rounds, Cards Library, Registration, Leaderboard, Judges, Final Pitch, Dashboard (structure unchanged from the original plan, only surface tokens swapped)
8. **Draw Your Fate interactive page** — flip-card animation, random draw logic, countdown, re-skinned to gold/purple
9. **Chaos Card modal** — re-skinned trigger + confetti
10. **Responsive + polish pass** — collapse the two-column sticky layout to a stacked, non-sticky layout under ~880px (see the reference file's media query); test video autoplay policies on mobile Safari (must be muted + playsinline or it won't autoplay); reduced-motion fallback that pauses the video and shows the poster frame

---

## 7. Key Implementation Notes (don't skip these)

- **Background-color matching is the whole trick.** If any container around the `<video>` has a background color even 1–2% off from `#598F83`, you'll see a visible seam. Sample the actual delivered video file's background before locking the token — don't reuse the hex from this doc if the asset changes at all.
- **Sticky column height:** the video column uses `position: sticky; top: <navbar height>; height: 80vh` and needs a taller sibling column (the text steps) to actually scroll past it — if the text column is shorter than the video column's sticky range, the sticky effect won't be visible. Pad step sections with `min-height: 70vh` as in the reference file.
- **Autoplay:** `autoplay muted loop playsinline` is required together for mobile browsers to autoplay without a user tap.
- **Don't reintroduce the parchment/pirate texture set** from the original plan anywhere — it will clash immediately with the flat teal + comic-type system.
- **One signature move only:** the sticky/pinned video-with-scrolling-text pattern is the site's one big idea. Resist adding a second competing scroll animation elsewhere on the same page (per frontend-design best practice: spend your boldness in one place).

---

## 8. One-Shot Prompt for Claude Sonnet 4.5 / Claude Code

> "Using `fgw-deck-scroll-site.html` and `fgw-deck-explode.mp4` as the ground-truth reference, plus this implementation plan (`founders-gone-wild-v2-implementation-plan.md`), rebuild the full multi-page site in React + Tailwind. Port the hero and scrollytelling section from the reference HTML file directly — match its background color, fonts, and sticky-video behavior exactly. Then re-skin the remaining pages (Rules, Rounds, Cards, Registration, Leaderboard, Judges, Final Pitch, Dashboard, Chaos Card) from the original odyssey plan using only the color tokens and typography defined in Section 3 of this v2 plan — no parchment textures, no pirate iconography. Build in the phase order from Section 6."

Feed this plan, the reference HTML file, and the mp4 into the same Claude Code session so it can inspect the real markup and asset rather than working from description alone.
