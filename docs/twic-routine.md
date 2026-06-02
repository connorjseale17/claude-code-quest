# This Week in Claude — weekly routine

This is the operating prompt for the recurring **This Week in Claude (TWiC)**
session. Point your scheduled Claude Code run at this file (or paste its body
as the prompt). Run start to finish, it refreshes the three TWiC rooms with the
week's three best new Claude / Claude Code features, self-heals the game wiring
if anything is missing, builds, and ships — no human in the loop.

> One-time scaffolding (the `twic-*` levels, the boss-altar sprites, the start
> flow, the splash issue tile) already lives in the repo. A normal week only
> rewrites four content files. STEP 0 below re-creates the wiring only if it has
> gone missing, so the routine is safe to run against a fresh clone.

---

## Tools

Read, Write, Edit, Bash, Grep, Glob, WebFetch. Today's date drives the issue
stamp.

---

## STEP 0 — ENSURE WIRING (self-heal, idempotent)

Confirm the scaffolding exists. If all checks pass, change nothing here and go
to STEP 1. If any check fails, re-create that piece to match the contract, then
continue.

The fixed contract (the chamber geometry + engine assume these — never rename):

- **Files (rewritten weekly):** `src/content/twic-1.ts`, `twic-2.ts`,
  `twic-3.ts`, `twic-issue.ts`.
- **Item ids per room N (1–3), preserved verbatim in the content file:**
  `twic-N-lore-a`, `twic-N-lore-b`, `twic-N-practice`, `twic-N-prize`,
  and NPC id `twic-npc-N`.
- **Boss sprite per room is PINNED** (it must match the on-map altar):
  room 1 → `vorthex`, room 2 → `grist`, room 3 → `emberling`. Keep
  `battle.spriteKey` on these values. (To change one, you must also update the
  altar `altarSprite` in `roomConfigs.ts` and the `*_map_a/_b` alias in
  `sprites.ts` — don't, unless deliberately re-theming.)

Wiring that must be present (recreate if missing — see git history / this file's
companion commit for the exact shape):

1. `src/engine/roomConfigs.ts`
   - `LevelId` union includes `'twic-1' | 'twic-2' | 'twic-3'`.
   - `THEME_TWIC` exists.
   - `buildTwicLevel()` helper + `buildTwic1/2/3Level()`, each a single 19×12
     chamber (`twic-N-room`) where `startingChamber === challengeChamber`, with:
     items `twic-N-lore-a` (paper), `twic-N-lore-b` (paper), `twic-N-practice`
     (hint_token), `twic-N-terminal` (challenge, sprite `vorthex_map_a` /
     `grist_map_a` / `emberling_map_a`); one NPC `twic-npc-N`; a `keySpawn`;
     a locked east `exit` door (`requiresLevelKey`); rooms 2 and 3 a `back`
     door west. Exits chain `twic-1 → twic-2 → twic-3 → welcome`
     (`welcome-antechamber`).
   - Both `BASE_LEVEL_CONFIGS` and `LEVEL_CONFIGS` register `twic-1/2/3`.
   - Curriculum levels are numbered 4–9 (TWiC takes 1–3).
2. `src/content/index.ts` imports `twic1/2/3Content` and registers them in
   `CONTENT` under `'twic-1' | 'twic-2' | 'twic-3'`.
3. `src/engine/GameContext.tsx` starts at `twic-1` in **two** places:
   the `startLevel` const and the `ADVANCE_PHASE` `customize` branch.
4. `src/assets/sprites.ts` defines altar aliases
   `vorthex_map_a/_b`, `grist_map_a/_b`, `emberling_map_a/_b`
   (= each sprite's `_idle_1` / `_idle_2`). `src/components/Item.tsx` lists
   those `_map_a` keys in `BESTIARY_SCALES` (5).
5. `src/components/SplashScreen.tsx` renders the dated issue tile from
   `TWIC_ISSUE_INTRO`.

Quick check: `npm run build` must pass — `Record<LevelId, …>` maps make the
compiler flag any missing `twic-*` registration.

---

## STEP 1 — SCAN

WebFetch all of:

- Official (source of truth):
  - `https://docs.claude.com/en/release-notes/claude-code`
    (follow redirects → the raw `CHANGELOG.md`)
  - `https://www.anthropic.com/news`
  - `https://www.anthropic.com/engineering`
- Reputable press:
  - `https://www.theverge.com/ai-artificial-intelligence`
  - `https://techcrunch.com/category/artificial-intelligence/`
  - `https://arstechnica.com/ai/`

(If a host is unreachable, note it and lean on the reachable official sources.)

For each candidate feature released by Anthropic for Claude, Claude Code, or
Cowork, capture: feature name, the verbatim paragraph(s) describing it, source
URL. Keep that text — you fact-check against it in STEP 4.

Skip availability changes, internal changes, bug fixes, pricing tweaks, and
platform-rollout announcements. Look for new capabilities a consultant could
put to work.

---

## STEP 2 — PICK 3

Run:

```
git log --since='6 weeks ago' --oneline -- src/content/twic-1.ts src/content/twic-2.ts src/content/twic-3.ts src/content/twic-issue.ts
```

Read recent diffs enough to know what TWiC already covered. Do not repeat
(judge by meaning, not headline), and don't re-teach the evergreen curriculum
(permission modes, CLAUDE.md, slash basics, MCP, subagents).

Choose the three features that score best on (a) teachability in one bite-sized
room, (b) broad applicability to a consulting / professional audience, and
(c) novelty.

If fewer than 3 qualify, **STOP**: leave all four files untouched, print
"quiet week — prior issue still live," do not commit, do not push.

---

## STEP 3 — WRITE

Read `src/content/welcome.ts` once as your voice reference (tone, NPC cadence,
lore-book structure). Read the existing `twic-{1,2,3,issue}.ts` for the exact
shape and the ids you MUST preserve.

Overwrite:

- `src/content/twic-1.ts` — Feature A (boss `spriteKey: 'vorthex'`)
- `src/content/twic-2.ts` — Feature B (boss `spriteKey: 'grist'`)
- `src/content/twic-3.ts` — Feature C (boss `spriteKey: 'emberling'`)
- `src/content/twic-issue.ts` — `TWIC_ISSUE_INTRO` with today's `date` and a
  1–2 sentence `framing` naming the three features.

Fill EVERY mount of `LessonContent` (see `src/content/types.ts`):

- `intro` — the arrival line for this feature.
- `prompt` / `choices` / `passFeedback` / `failFeedback` — the top-level
  question (mirror the battle question; required by the type).
- `conversations` — one NPC keyed by `twic-npc-N`, 2–5 `say` beats teaching the
  feature in plain consultant terms, plus a `summary`.
- `lore` — EXACTLY two entries:
  - `twic-N-lore-a`: the core **mechanic** of the feature.
  - `twic-N-lore-b`: **why it matters / how a consultant applies it.**
  Never duplicate teaching across the two books.
- `practice` — fill-in-the-blank business template, ids `twic-N-practice`
  (the `PracticeContent.id`) and prize `twic-N-prize`.
- `battle` — name + pinned `spriteKey` + `maxHP` + `introLine` + `tauntLines`
  + `victoryLine`, and exactly ONE question with exactly 4 choices and exactly
  one `correct: true`. No "all/none of the above," no "no correct answer."

Lore-book voice (structured-lore markup): `**Title**` at top, `**Section**`
sub-headers, blank-line-separated paragraphs, `> Takeaway: <one line>` at the
end. Inline `*italic*` and `` `code` `` allowed.

---

## STEP 4 — SELF-CHECK

Re-read all four files. Each answer must be yes; fix in place until so:

1. Every factual claim is supported by the STEP 1 source text. A plausible
   elaboration the source did NOT state counts as unsupported — rewrite or drop.
2. Each battle answer key is correct: the marked-correct is true; all three
   distractors are false.
3. The three features are genuinely distinct (no overlap).
4. In each room, lore Book 1 (mechanic) teaches something different from
   Book 2 (application).
5. `TWIC_ISSUE_INTRO.framing` accurately names the three features actually in
   the rooms, and `date` is today.

---

## STEP 5 — VERIFY + SHIP

```
npm install            # if node_modules is absent (fresh container)
npm run build          # tsc -b is the schema validator — fix content, not types
```

If the build fails on a `Record<LevelId, …>` error, the wiring regressed — go
back to STEP 0. Otherwise commit and push:

```
git add src/content/twic-1.ts src/content/twic-2.ts src/content/twic-3.ts src/content/twic-issue.ts
# plus any STEP 0 wiring files you had to repair
git commit -m "TWiC · week of YYYY-MM-DD"
git push origin main
```

Vercel auto-deploys `main`. The next session a player opens picks up the new
week: the splash shows the dated issue tile, and the three `twic-*` rooms lead
the flow.

---

## FINAL SUMMARY (always print)

- The three features picked (or "quiet week — prior issue left live").
- Source URLs read (and any that were unreachable).
- Any claims backed off during self-check, and why.
- Whether STEP 0 had to repair wiring, and what.
- Whether the push succeeded, and the commit SHA.
