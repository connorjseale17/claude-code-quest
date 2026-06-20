# Fork Handoff Guide

How to hand this codebase to a Claude instance and have it reconfigure the
game for a different team, topic, or brand. The engine is fixed — you are
swapping content, theming, and branding only.

---

## Quick start (copy-paste to your Claude)

> I've forked `claude-code-quest`. I need you to re-skin it for
> **[YOUR TOPIC]**. Read `docs/fork-handoff.md` in the repo — it tells you
> exactly which files to touch and what the TypeScript types enforce.

That single sentence, plus this doc, is enough for Claude to do the work.

---

## What you're changing vs. what you're not

| Layer | Change? | Notes |
|-------|---------|-------|
| Lesson prose (lore, quizzes, NPC dialogue) | **Yes** | This is the main job |
| Boss names, lines, sprites | **Yes** | Cosmetic — pick from the bestiary |
| Practice exercises (fill-in-the-blank) | **Yes** | Template + blanks + suggestions |
| Level titles, subtitles | **Yes** | In `roomConfigs.ts` level builders |
| Theme colors | **Yes** | 5 hex values per level |
| Credits | **Yes** | Single file, `src/credits.ts` |
| Game title / branding strings | **Yes** | Search-replace (see § Branding below) |
| Chamber geometry (tile grids, walls) | **No** | Locked in `layoutOverrides.ts` |
| Game engine (state machine, rendering) | **No** | React components, collision, phases |
| Firebase config | **Maybe** | Point to your own project if needed |

---

## File map

### Content files (the main job)

All in `src/content/`. Each file exports a `LessonContent` object.

| File | Level | Topic (current) |
|------|-------|-----------------|
| `orientation.ts` | 0 | Claude Code basics |
| `welcome.ts` | 1 | Permission modes & briefing |
| `claudemd.ts` | 2 | CLAUDE.md system prompt |
| `slash.ts` | 3 | Slash commands & skills |
| `mcp.ts` | 4 | Model Context Protocol |
| `subagents.ts` | 5 | Subagents & routines |
| `final-boss.ts` | 6 | Capstone battle |
| `twic-1.ts` | 7 | Weekly room 1 (rotating) |
| `twic-2.ts` | 8 | Weekly room 2 (rotating) |
| `twic-3.ts` | 9 | Weekly room 3 (rotating) |

**To reskin:** Rewrite the exports in each file. The TypeScript compiler
enforces the shape — if it builds, it runs.

**Registry:** `src/content/index.ts` maps `LevelId → LessonContent`. If you
add or remove levels, update both this file and the `LevelId` union in
`src/engine/roomConfigs.ts`.

### Type definitions (read-only reference)

`src/content/types.ts` — Do not edit. Read this first so you know what
fields exist. Key types:

```
LessonContent
├── roomId: string
├── intro: string                    (3–4 sentences, narrative scene-setter)
├── prompt: string                   (main quiz question)
├── choices: { id, label, correct }[]  (4 options, exactly 1 correct)
├── passFeedback: string             (shown on correct answer)
├── failFeedback: string             (shown on wrong answer)
├── lore: { id, text }[]             (2–5 lore books, 280–450 words each,
│                                     markdown with **bold**, sub-headings,
│                                     and a > Takeaway line)
├── practice?: PracticeContent       (fill-in-the-blank exercise)
│   ├── id: string
│   ├── template: string             (prose with __blank__ markers)
│   ├── blanks: { id, suggestions[], correctIndex? }[]
│   └── prize: { id, label }         (trophy name on end screen)
├── conversations?: Record<npcId, NPCConversation>
│   ├── beats: ConversationBeat[]    (6–9 beats, mix of say/choice/blank)
│   └── summary: string             (1–2 sentence recap)
└── battle?: BossBattle
    ├── name: string                 (boss display name)
    ├── spriteKey: string            (see § Bestiary below)
    ├── maxHP: number
    ├── introLine / tauntLines[] / victoryLine
    ├── questions: BattleQuestion[]  (1 per HP, same shape as top-level)
    └── art?: { src, width? }        (optional PNG override)
```

### Room configs

`src/engine/roomConfigs.ts` — Level metadata, themes, chamber wiring.

Each level is built by a `buildLevelX()` function that returns a
`LevelConfig`. You can safely change:

- `title` and `subtitle` (HUD display strings)
- `theme` object (5 hex colors — see § Themes)
- NPC `name`, `dialog[]`, `color` inside chamber configs
- Item, NPC, decoration positions (if you're also editing overrides)

**Do not** change `LevelId` values, door wiring, or chamber IDs unless you
are also updating `layoutOverrides.ts`, `content/index.ts`, and every
cross-reference.

### Layout overrides

`src/engine/layoutOverrides.ts` — Committed chamber geometry produced by
the in-game Layout Editor. **Do not hand-edit.** If you need new layouts,
use the Layout Editor mode in-game and export.

### Credits

`src/credits.ts` — Array of `{ role, name }` objects. Shown on boot screen
and certification page. Replace with your team.

### Sprites

`src/assets/sprites.ts` — Pixel-art sprite definitions (palette-grid
format). Each sprite is a 2D array of single-character palette codes.

**Bestiary sprites available for bosses:**

| `spriteKey` | Visual | Palette codes |
|-------------|--------|---------------|
| `slime` | Green blob | `a`–`d` |
| `warlock` | Robed mage | `e`–`h` |
| `goblin` | Armed goblin | `i`–`l` |
| `ghost` | Floating specter | `m`–`p` |
| `skeleton` | Armored skeleton | `q`–`t` |
| `dragon` | Winged dragon | `u`–`x` |

Each has `_a` and `_b` animation frames. Set `spriteKey: 'slime'` in a
`BossBattle` and the engine handles idle animation, attack, hurt, and
defeat phases automatically.

**NPC sprites:** `idle_a` (default Claude-bot), `owl`, `cat`, `duck`.

You can add new sprites by adding entries to the `FRAMES` object and
extending the `PIXEL_PALETTE` if you need new colors.

---

## Themes

Each level has a `Theme` object with 5 hex colors:

```typescript
{
  wallColor:   '#2D1B4E',  // chamber wall fill
  wallShadow:  '#1A0F2E',  // wall edge shadow
  floorColor:  '#1E1433',  // floor tile fill
  floorDot:    '#3D2A5E',  // subtle grid dots
  accentColor: '#9B59B6',  // UI glow, active objectives
}
```

Pre-built themes (usable as-is or as starting points):

| Const | Colors | Used by |
|-------|--------|---------|
| `THEME_AMBER` | Warm gold | Level 0 |
| `THEME_ORANGE` | Deep orange | Level 1 |
| `THEME_PURPLE` | Royal purple | Level 2 |
| `THEME_GREEN` | Forest green | Level 3 |
| `THEME_TEAL` | Cyan-teal | Level 4 |
| `THEME_PINK` | Hot pink | Level 5 |
| `THEME_CRIMSON` | Blood red | Level 6 |
| `THEME_NEWSROOM` | Cool gray-blue | TWiC rooms |

---

## Branding strings

The game title `claude-code-quest` appears in these locations. Do a
project-wide search-replace:

| File | String | Context |
|------|--------|---------|
| `src/components/BootScreen.tsx` | `claude-code-quest@latest` | Fake npm install line |
| `src/components/BootScreen.tsx` | `claude-code-quest init` | Fake CLI command |
| `src/components/BootScreen.tsx` | `claude-code-quest --v1.0` | Terminal frame title |
| `src/components/BootScreen.tsx` | `claude-code-quest · built by` | Credits header |
| `src/components/BootScreen.tsx` | `~/claude-code-quest $` | Terminal prompt (×2) |
| `src/components/SplashScreen.tsx` | `Welcome to Claude Code Quest.` | Splash intro |
| `src/components/SplashScreen.tsx` | `claude-code-quest --v1.0` | Terminal frame title |
| `src/components/SplashScreen.tsx` | `~/claude-code-quest` | Path display |
| `src/components/PathSelectScreen.tsx` | `claude-code-quest --select-path` | Terminal frame title |
| `src/components/WrapUpSplash.tsx` | `claude-code-quest --complete` | Terminal frame title |
| `src/components/CertificationPage.tsx` | `claude-code-quest --certificate` | Terminal frame title |
| `src/components/CertificationPage.tsx` | `Claude Code Quest Certificate` | PDF `<title>` |
| `src/components/TerminalFrame.tsx` | `claude-code-quest --v1.0` | Default title prop |
| `src/components/RotatePrompt.tsx` | `claude-code-quest plays in landscape` | Mobile rotation prompt |
| `src/App.tsx` | `claude-code-quest --complete` | Terminal frame title |
| `src/credits.ts` | `Claude Code Quest credits` | Comment (cosmetic) |

Also update:
- `src/components/EndScreen.tsx` — Victory copy ("THE OVERLORD HAS FALLEN",
  "Six bosses. One operator. The firm endures.", level names in the summary)
- `src/components/SplashScreen.tsx` — The `SPLASH_LINES` array (narrative
  intro text)
- `package.json` — `name` field

---

## Content authoring guidelines

These conventions keep the game feeling consistent:

### Lore books
- 2–5 per level, 280–450 words each
- Structure: bold title, 1-sentence subtitle, 3–4 headed sections, closing
  `> Takeaway:` blockquote
- Lore book 1 = mechanics/how-it-works; Lore book 2 = application/when-to-use
- Use markdown: `**bold**`, `*italic*`, `` `code` ``, `>` blockquotes

### NPC conversations
- 6–9 beats per NPC
- At least 1 `choice` beat (interactive branch)
- `say` beats: 2–4 sentences of NPC dialogue
- `choice` beats: 2–3 options, exactly 1 correct, each with a `reaction`
- End with a `summary` (1–2 sentences, key points)

### Boss battles
- `introLine`: in-character taunt (1–2 sentences)
- `tauntLines`: 2–3 random wrong-answer taunts
- `victoryLine`: defeat speech (in-character)
- Questions: `passFeedback` starts with "HIT!", `failFeedback` starts with
  "MISS!" — this drives the battle animation
- `maxHP` = number of questions (1 question per hit point)

### Practice exercises
- Template: 5–8 lines of prose with `__blank__` markers
- 3–5 blanks, each with 3 `suggestions`
- Set `correctIndex` for graded blanks; omit for open-ended
- `prize.label`: ALL CAPS trophy name (shown on end screen)

### Top-level prompt/choices
- Must mirror `battle.questions[0]` exactly (same prompt text, same choices)
- This is the fallback for levels without a boss

---

## Adding or removing levels

1. **Add a LevelId** to the union in `src/engine/roomConfigs.ts` (line ~12)
2. **Write a builder function** (`buildYourLevel()`) following the pattern of
   existing builders. Returns a `LevelConfig`.
3. **Register it** in the `LEVEL_CONFIGS` object at the bottom of
   `roomConfigs.ts`
4. **Write the content file** in `src/content/your-level.ts`, exporting a
   `LessonContent`
5. **Register content** in `src/content/index.ts`
6. **Wire doors**: update the previous level's exit door to target your new
   level, and your level's exit to target the next (or `{ kind: 'end' }`)
7. **Build**: `npm run build` — TypeScript will catch any missing fields

To remove a level, reverse the process. The compiler will flag every
dangling reference.

---

## The TWiC track (weekly content)

If your fork doesn't need a weekly-refresh track, you can:

1. Remove `twic-1`, `twic-2`, `twic-3` from the `LevelId` union
2. Remove their builders from `roomConfigs.ts`
3. Remove their content files and registry entries
4. Remove `twic` from the `PathSelectScreen` track options

If you keep it, follow the routine in `docs/twic-routine.md` — it's a
proven, repeatable content-swap process that only touches 4 files.

---

## Firebase (optional)

The game uses Firebase for:
- Anonymous auth (automatic, no user signup)
- Leaderboard (run times, prize counts)
- Feedback collection (in-game ratings)

To point at your own Firebase project:
1. Create a Firestore database (can be named or default)
2. Set env vars in `.env` (see `.env.example`)
3. If using a named database, update `FIRESTORE_DATABASE_ID` in
   `src/lib/firebase.ts`
4. Deploy `firestore.rules` and `firestore.indexes.json` with
   `firebase deploy --only firestore:rules,firestore:indexes`

To remove Firebase entirely:
- Delete `src/lib/firebase.ts`, `src/lib/tracking.ts`
- Remove the `useLeaderboard` hook and `LeaderboardCard` component
- Remove `FeedbackButton` from pause menu and end screens
- Remove Firebase deps from `package.json`

---

## Build & deploy

```bash
npm install          # install deps
npm run dev          # local dev server (Vite, hot reload)
npm run build        # production build (TypeScript checks + bundle)
npx vercel --prod    # deploy to Vercel (or your platform)
```

The TypeScript compiler is your safety net. If `npm run build` passes,
the game will run. Every content type, every level config, every NPC
conversation is type-checked at build time.

---

## Checklist for a complete reskin

- [ ] Read `src/content/types.ts` (understand the shape)
- [ ] Rewrite all 7 quest content files (`orientation` through `final-boss`)
- [ ] Decide on TWiC: keep (rewrite 3 rooms) or remove
- [ ] Update level titles/subtitles in `roomConfigs.ts`
- [ ] Choose theme colors per level
- [ ] Replace credits in `src/credits.ts`
- [ ] Search-replace branding strings (see § Branding above)
- [ ] Update end-screen victory copy in `EndScreen.tsx`
- [ ] Update splash intro lines in `SplashScreen.tsx`
- [ ] Update `package.json` name
- [ ] Update Firebase config (or remove Firebase)
- [ ] `npm run build` — fix any type errors
- [ ] Play through all levels to verify flow
- [ ] Deploy
