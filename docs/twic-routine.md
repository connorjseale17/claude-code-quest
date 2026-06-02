# This Week in Claude — weekly routine (operational runbook)

The companion to the design spec in `docs/future/this-week-in-claude.md`. This
is the exact, repeatable process the weekly routine runs. **It only replaces
strings in four already-existing content files — it never builds scaffolding.**

The scaffolding (the `twic-1/2/3` levels, `PathSelectScreen`,
`TwicIssueIntroOverlay`, `TwicStampScreen`, `THEME_NEWSROOM`, the
`track: 'twic'` wiring) already lives in the engine. The routine fills content.

---

## STEP 0 — TARGET + GUARDRAIL (do this first, every run)

1. **Run on `main`.** `main` is the repo's default branch and Vercel's
   Production Branch — it is the codebase the live site builds from. Start the
   run with `git checkout main && git pull origin main`. Do NOT create or work
   on a side branch, and do NOT run against any branch that lacks the
   scaffolding — that was the historical failure (content shipped to the wrong
   codebase and never reached the site).
2. **Verify the four content files already exist:**
   `src/content/twic-1.ts`, `twic-2.ts`, `twic-3.ts`, `twic-issue.ts`.
   If ANY is missing, **STOP and alert** — the routine must never re-create
   scaffolding or invent a parallel set of rooms. A missing file means you are
   on the wrong branch/repo.
3. **Scope discipline — write content only.** The TWiC room **structure** is
   a BASE STANDARD locked outside this routine's scope. These files are
   OFF-LIMITS:
   - `src/engine/layoutOverrides.ts` (canonical TWiC chamber layouts).
   - `src/engine/roomConfigs.ts` (LevelId union, `buildTwicRoom()`, mounts).
   - Any component file (`src/components/*.tsx`), `src/App.tsx`, or other
     engine files beyond reading for reference.

   You may **read** these for context; you must **never write to them**.
   Tile maps, item positions, NPC placement, key spawn, door target, and
   decorations are frozen — every future TWiC issue inherits them as-is.
   If a feature seems to need new geometry, pick a different feature this
   week instead of touching structure.

**Fixed contract — preserve verbatim, change only the prose:**

| Slot | Fixed value (do not change) |
|------|------------------------------|
| `roomId` | `twic-room-1` / `twic-room-2` / `twic-room-3` |
| lore ids | `twic-N-lore-a`, `twic-N-lore-b` |
| practice id / prize id | `twic-N-practice` / `twic-N-prize` |
| NPC conversation key | `twic-npc-N` (NPC name "Beat Reporter" lives in roomConfigs) |
| battle | one "Door Challenge" question, `maxHP: 1`, exactly 4 choices, exactly one `correct: true`. Per-room `spriteKey` is locked (matches in-room boss in layoutOverrides.ts — out of routine scope): twic-1 → `'skeleton'`, twic-2 → `'ghost'`, twic-3 → `'dragon'`. Never `'slime'`. |
| `TWIC_ISSUE_INTRO` | shape `{ publishDate: 'YYYY-MM-DD', framing: string }` |

You replace: `intro`, top-level `prompt`/`choices`/feedback, the two `lore`
texts, the `practice` template/blanks, the `conversations[twic-npc-N]` beats,
the battle question text + choices, and `TWIC_ISSUE_INTRO.{publishDate,framing}`.
Prize labels (`TWIC · WEEK STARTER` / `MID-WEEK` / `ISSUE COMPLETE`) are
progression stamps — leave them.

---

## STEP 1 — SCAN

WebFetch (official first): the Claude Code release notes / `CHANGELOG.md`,
`anthropic.com/news`, `anthropic.com/engineering`; then press
(theverge.com/ai, techcrunch.com/category/artificial-intelligence,
arstechnica.com/ai). Capture each candidate feature's name, verbatim
description, and source URL. Skip bug fixes, availability/rollout, pricing,
internal changes. Note any unreachable host.

## STEP 2 — PICK 3

`git log --since='6 weeks ago' --oneline -- src/content/twic-1.ts src/content/twic-2.ts src/content/twic-3.ts src/content/twic-issue.ts`

Dedup against recent TWiC weeks AND the evergreen Quest curriculum (permission
modes, CLAUDE.md, slash basics, MCP, subagents). Pick the 3 best on
teachability / broad applicability / novelty. Fewer than 3 qualify → **STOP**,
print "quiet week — prior issue still live," do not commit or push.

## STEP 3 — WRITE (match Quest depth + format; never Quest content)

Read `src/content/welcome.ts` end to end before writing. It is the reference
for **how deep, how structured, and how polished** each mount point must be —
**not** a source of teaching content. Every word about a TWiC feature is
original to that feature. Do NOT copy or paraphrase lore, examples, scenarios,
or phrasing from `welcome.ts` or any other Quest file (`claudemd.ts`,
`slash.ts`, `mcp.ts`, `subagents.ts`, `final-boss.ts`). Read for *craft*;
write your own *substance*.

Re-read the four TWiC files for the fixed shape. Overwrite them, mapping
Feature A → `twic-1`, B → `twic-2`, C → `twic-3`. For every mount, hit the
depth bar — underwriting any one mount fails this PRD.

**Per mount-point bar:**

- **`intro`** — 3–4 sentences setting arrival; name the Beat Reporter, point
  at the books and the boss. Not a one-liner.
- **`lore[0]` (mechanic) and `lore[1]` (application)** — each **280–450
  words**, structured: `**Specific Title**` (scene-setting, not generic) →
  `**Named Sub-heading**` → 2–4 sentence body → another `**Named
  Sub-heading**` → body → (optional third section) → `> Takeaway:` one-line
  declarative close. Inline `*italic*` / `` `code` `` allowed. The two books
  must not duplicate teaching — Book 2 picks up from where Book 1 ends.
- **`conversations[twic-npc-N]`** — **6–9 beats**, mostly `kind: 'say'`,
  with **at least one mid-lesson `kind: 'choice'` beat** (3 options, exactly
  one `correct: true`, each option carries a 1–3 sentence `reaction`). Close
  with a `say` beat that tees up the boss. `summary` recaps the lesson's
  3–4 key points.
- **`practice.template`** — multi-line scene-set business prompt (**5–8
  lines**), 3–5 blanks, each with **3 distinct suggestions**. Must require
  using the TWiC feature meaningfully. Keep `prize.id` / `prize.label`.
- **`battle`** — schema locked (`spriteKey: 'slime'`, `maxHP: 1`, one
  question, four choices, one correct). Upgrade the surrounds: a thematic
  boss `name` tied to the feature (NOT "Door Challenge · {Feature}"), an
  in-character `introLine`, 2–3 themed `tauntLines`, a `victoryLine`. The
  question's `passFeedback` starts with `HIT!`; `failFeedback` starts with
  `MISS!`. Distractors are real misreadings — never "all/none of the above."
- **Top-level `prompt` / `choices` / `passFeedback` / `failFeedback`** —
  mirror `battle.questions[0]` verbatim.
- **`TWIC_ISSUE_INTRO.framing`** — 2–3 sentences naming all three features
  with a one-clause hook per feature; reads like the first paragraph of an
  industry newsletter. `publishDate` = today (ISO `YYYY-MM-DD`).

References for shape/depth (not substance): `welcomeContent.intro`, its
five lore entries, `welcomeContent.conversations['guide-bot']` (10-beat arc
with two `choice` beats), `welcomeContent.practice`, `welcomeContent.battle`
(named boss "Sloppy the Glob," atmospheric lines, HIT!/MISS! feedback).

## STEP 4 — SELF-CHECK

All must be yes; fix in place until so.

**Correctness:** (1) every claim supported by STEP 1 source text; (2) each
battle's marked-correct is true and all 3 distractors are false; (3) top-level
`prompt`/`choices`/feedback mirror `battle.questions[0]` verbatim; (4) the
three features are distinct; (5) Book 1 ≠ Book 2 in each room; (6) `framing`
names the three actual features and `publishDate` is today.

**Depth + format:** (7) each `intro` is 3–4 sentences; (8) each lore book is
≥250 words (aim 280–450) with the full `**Title**` / `**Section**` /
`> Takeaway:` structure; (9) each NPC has 6–9 beats with at least one
`choice` beat carrying per-option reactions; (10) each `practice.template` is
5+ lines with 3–5 blanks × 3 suggestions; (11) each `battle.name` is a
thematic boss name and `introLine`/`tauntLines`/`victoryLine` are in
character; `passFeedback`/`failFeedback` start with `HIT!`/`MISS!`;
(12) `TWIC_ISSUE_INTRO.framing` is 2–3 sentences with a hook per feature.

**No-bleed:** (13) no teaching content, lore, examples, scenarios, or
phrasing copied or paraphrased from `welcome.ts` or any Quest content file.

## STEP 5 — VERIFY + SHIP

```
npm install            # if node_modules absent
npm run build          # tsc validates the LessonContent shapes; fix content, not types

# Prove the built artifact carries the new content (and dropped the placeholder):
grep -q "<a feature name you just wrote>" dist/assets/*.js && echo "content in bundle ✓"

git add src/content/twic-1.ts src/content/twic-2.ts src/content/twic-3.ts src/content/twic-issue.ts
git commit -m "TWiC · week of $(date +%F)"
git push origin main          # NEVER skip this. Production deploys from main.
```

**Deploy (proven path — git push alone does NOT update the site; the Vercel
CLI does).** Requires `VERCEL_TOKEN` in the run environment. Project is
`claude-code-quest`. Two `.vercel.app` domains serve it, and **both are
registered production domains**, so a single `--prod` updates both:
`claudecodequest.vercel.app` (the clean public URL — share this one) and
`claude-code-quest-sigma.vercel.app` (the original production domain):

```
npx -y vercel@latest link --yes --project claude-code-quest --token "$VERCEL_TOKEN"
npx -y vercel@latest --prod   --yes --project claude-code-quest --token "$VERCEL_TOKEN"
```

Vercel builds on its servers and re-points BOTH production domains at the new
build automatically — no manual `alias set` step. (History: until 2026-06-02
`claudecodequest.vercel.app` was an unregistered alias that stayed stale and
sat behind Vercel's SSO 401 wall; it was promoted to a production domain to
fix both. Don't re-introduce an `alias set` step — it's redundant now.) If
`$VERCEL_TOKEN` is absent, STOP and report that the content is on `main` but
undeployed.

**Verify the LIVE site on the clean public URL (don't trust the deploy
message alone):**

```
URL=https://claudecodequest.vercel.app
A=$(curl -fsSL "$URL/" | grep -oE '/assets/index-[A-Za-z0-9_-]+\.js' | head -1)
curl -fsSL "$URL$A" | grep -q "<a feature name you wrote>" && echo "LIVE ✓"
curl -fsSL "$URL$A" | grep -q "Placeholder" && echo "STILL STALE — investigate"
```

The PATH SELECT tile should read `UPDATED · {today}` and the three rooms the
new features.

## FINAL SUMMARY (always print)

Three features (or "quiet week"); source URLs (and any unreachable); claims
backed off in self-check; whether STEP 0 aborted; push result + commit SHA.
