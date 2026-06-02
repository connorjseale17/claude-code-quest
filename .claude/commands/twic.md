---
description: 'TWiC weekly routine — scan releases, write the 3 rooms + issue intro, build, push main, deploy, verify live.'
argument-hint: ''
allowed-tools: Read, Write, Edit, Bash, Grep, Glob, WebFetch
---

You are running the weekly **This Week in Claude (TWiC)** routine for
`claude-code-quest`, fully autonomously. No questions, no pausing for approval.
Run every step top to bottom. The deliverable is the **live site updated** —
not a branch, not a PR.

> **Environment note.** This routine runs in the scheduled instance, which has
> a `VERCEL_TOKEN` embedded and network access to Vercel — so it CAN and MUST
> deploy to production itself (an ad-hoc dev session can't; this one can). The
> final state of a successful run is the new content visible on
> `https://claudecodequest.vercel.app` (the clean public URL — keep its alias
> moved to the latest deploy, see STEP 5). Long-form reference:
> `docs/twic-routine.md`.

---

## STEP 0 — TARGET + GUARDRAILS (do first, every run)

- `git checkout main && git pull origin main`. Work **only** on `main` — it is
  the repo default and Vercel's Production Branch. Never create or switch to a
  side branch. (Historical failure: content shipped to a side branch / parallel
  codebase and never reached the site.)
- Confirm these four files **already exist**:
  `src/content/twic-1.ts`, `twic-2.ts`, `twic-3.ts`, `twic-issue.ts`.
  If any is missing → **STOP and report** "scaffolding missing — wrong
  checkout." NEVER create rooms, levels, components, or rebuild scaffolding.
- You **edit only those four files** (prose only). Preserve every fixed value:

  | Slot | Fixed — do not change |
  |------|------------------------|
  | `roomId` | `twic-room-1` / `twic-room-2` / `twic-room-3` |
  | lore ids | `twic-N-lore-a`, `twic-N-lore-b` |
  | practice / prize id | `twic-N-practice` / `twic-N-prize` (keep prize labels) |
  | NPC key | `twic-npc-N` (NPC name "Beat Reporter" lives in roomConfigs) |
  | battle | ONE door-challenge question, `spriteKey: 'slime'`, `maxHP: 1`, exactly 4 choices, exactly one `correct: true` |
  | `TWIC_ISSUE_INTRO` | shape `{ publishDate: 'YYYY-MM-DD', framing: string }` |

## STEP 1 — SCAN

WebFetch, official first:
- `https://docs.claude.com/en/release-notes/claude-code` (follow redirects to the raw `CHANGELOG.md`)
- `https://www.anthropic.com/news`
- `https://www.anthropic.com/engineering`

then press: `theverge.com/ai-artificial-intelligence`,
`techcrunch.com/category/artificial-intelligence/`, `arstechnica.com/ai/`.

For each candidate Claude / Claude Code / Cowork feature capture: name, the
verbatim describing paragraph(s), source URL. Skip bug fixes, availability /
rollout, pricing, internal changes. Note any unreachable host.

## STEP 2 — PICK 3

```
git log --since='6 weeks ago' --oneline -- src/content/twic-1.ts src/content/twic-2.ts src/content/twic-3.ts src/content/twic-issue.ts
```

Read recent diffs; dedup vs prior weeks AND vs the Quest curriculum (permission
modes, CLAUDE.md, slash commands, MCP, subagents). Pick the 3 best on
teachability / broad applicability / novelty. **If fewer than 3 qualify: STOP**
— leave all four files untouched, print "quiet week — prior issue still live,"
do not commit, push, or deploy.

## STEP 3 — WRITE (match Quest depth + format; never Quest content)

**Read `src/content/welcome.ts` end to end before writing anything in this step.**
It is your reference for **how deep, how structured, and how polished** each
mount point must be — NOT a source of teaching content. Every word you write
about a TWiC feature must be original to that feature. Do not copy or
paraphrase lore, examples, lines, phrasing, or worked scenarios from
`welcome.ts` or any other Quest file (`claudemd.ts`, `slash.ts`, `mcp.ts`,
`subagents.ts`, `final-boss.ts`). Read for *craft*, write your own *substance*.

Also re-read the current four TWiC files for the fixed shape (ids, NPC key,
prize id, `spriteKey: 'slime'`, `maxHP: 1`, etc. from STEP 0).

Overwrite all four files, mapping Feature A → `twic-1.ts`, B → `twic-2.ts`,
C → `twic-3.ts`. For EVERY mount below, hit the depth bar. Underwriting any
one mount fails this PRD.

**`intro`** — 3–4 sentences. Set the scene of arrival, name the Beat Reporter,
point at the books and the boss. Not a one-line label. (Reference shape:
`welcomeContent.intro`.)

**`lore[0]` (Book 1 = mechanic) and `lore[1]` (Book 2 = application)** —
each ~**280–450 words**, structured-lore markup mandatory:

```
**Specific bolded title** (scene-setting subtitle, not generic —
e.g. NOT "What Shipped" but something like "The Four Permission Modes —
Who's Holding the Steering Wheel")

**Named bold sub-heading** (name a phase of the explanation, not a
generic label)

2–4 sentence body paragraph. Inline *italic* and `code` welcome.

**Another named bold sub-heading**

Another body paragraph.

(Optional third **sub-heading** + paragraph for richer features.)

> Takeaway: one declarative sentence the reader carries away.
```

Book 1 = how the TWiC feature works mechanically inside the tool. Book 2 =
why it matters and how a consultant would apply it in a real engagement.
**Books must not duplicate teaching** — if Book 1 says "X does Y," Book 2
picks up from there, not repeats it. (Reference: any of welcome's five
lore entries — `manual`, `cli-primer`, `from-gpts`, `sticky-note`,
`side-note`.)

**`conversations[twic-npc-N]`** — aim for **6–9 beats**, mostly
`kind: 'say'`, with **at least one mid-lesson `kind: 'choice'` beat** that
quizzes the player on what they just heard. The choice beat: 3 options,
exactly one `correct: true`, each with a 1–3 sentence `reaction` that
lands the point regardless of which option the player picked. Close with a
`say` beat that tees up the boss / door. The `summary` is the recap if the
player re-engages — capture the lesson's 3–4 key points in plain language.
(Reference: `welcomeContent.conversations['guide-bot']` — note the 10-beat
arc with two `choice` beats and a closing tee-up.)

**`practice`** — `template` is a **multi-line scene-set business prompt**,
5–8 lines, putting the TWiC feature in a real consulting context.
**3–5 blanks, each with 3 distinct suggestions.** The exercise must require
using the TWiC feature meaningfully, not "pick any noun." Keep the existing
`prize.id` / `prize.label`. (Reference: `welcomeContent.practice`.)

**`battle`** — schema stays locked (`spriteKey: 'slime'`, `maxHP: 1`, ONE
question, 4 choices, exactly one `correct: true`). Upgrade everything
around the schema:

- `name`: an evocative thematic boss name tied to the feature (NOT
  "Door Challenge · {Feature}"). Quest examples: `Sloppy the Glob`,
  `The Gatekeeper`. Pick a slime variant that nods to the TWiC feature.
- `introLine`: an in-character one-liner as the fight opens (NOT
  "> The door waits."). Voice it.
- `tauntLines`: 2–3 in-character lines flung on wrong answers, themed to
  the feature's misconceptions.
- `victoryLine`: a closing line as the boss falls and the key drops.
- `questions[0].passFeedback`: starts with `HIT!`, then 1–2 sentences
  anchoring what the correct answer actually means.
- `questions[0].failFeedback`: starts with `MISS!`, then names the
  specific misconception and points back at the books.

The question itself tests the room's TWiC feature specifically. Three
real distractors — each a plausible misreading of the feature. No
"all of the above" / "none of the above" / "no correct answer."
(Reference: `welcomeContent.battle`.)

**Top-level `prompt` / `choices` / `passFeedback` / `failFeedback`** —
mirror `battle.questions[0]` verbatim. Keep them in sync.

**`TWIC_ISSUE_INTRO.framing` (in `twic-issue.ts`)** — 2–3 sentences naming
all three features with a one-clause hook for each. Reads like the first
paragraph of an industry newsletter framing why the week matters for a
consultant. Not "This week shipped three things." `publishDate` = today,
ISO `YYYY-MM-DD`.

## STEP 4 — SELF-CHECK (every answer yes; fix in place until so)

**Correctness:**
1. Every factual claim is supported by STEP 1 source text (a plausible
   elaboration the source didn't state = unsupported → rewrite or drop).
2. Each battle's marked-correct answer is true; all 3 distractors are false.
3. Top-level `prompt`/`choices`/feedback mirror `battle.questions[0]` verbatim.
4. The three features are genuinely distinct (no overlap across rooms).
5. In each room, Book 1 (mechanic) and Book 2 (application) do not duplicate.
6. `TWIC_ISSUE_INTRO.framing` names the three features actually in the rooms;
   `publishDate` is today.

**Depth + format (the new gate):**
7. Each `intro` is 3–4 sentences, not a label.
8. Each lore book is **at minimum 250 words** (aim 280–450) AND uses the full
   `**Title**` / `**Named Section**` / paragraphs / `> Takeaway:` structure.
9. Each NPC has **6–9 beats** AND at least one `choice` beat with three
   options and per-option `reaction` strings.
10. Each `practice.template` is 5+ lines with 3–5 blanks; each blank has 3
    distinct suggestions.
11. Each `battle.name` is a thematic boss name (not "Door Challenge · ..."),
    `introLine` / `tauntLines` / `victoryLine` are in-character, and
    `passFeedback` / `failFeedback` start with `HIT!` / `MISS!`.
12. `TWIC_ISSUE_INTRO.framing` is 2–3 sentences naming all three features with
    a hook per feature, not a bare placeholder.

**No-bleed gate:**
13. No teaching content, lore, examples, scenarios, or phrasing copied or
    paraphrased from `welcome.ts` or any Quest content file. The Quest is the
    format reference; substance is original to TWiC.

## STEP 5 — BUILD, PUSH, DEPLOY, VERIFY

```bash
npm install                       # if node_modules is absent
npm run build                     # tsc -b is the schema validator — fix content, not types

# Prove the build carries the new content and dropped the placeholder:
grep -q "<a feature name you wrote>" dist/assets/*.js && echo "in bundle ✓"
grep -qi placeholder dist/assets/*.js && echo "WARN: placeholder still present"

git add src/content/twic-1.ts src/content/twic-2.ts src/content/twic-3.ts src/content/twic-issue.ts
git commit -m "TWiC · week of $(date +%F)"
git push origin main              # never skip — but a push alone does NOT update the site

# DEPLOY (this instance has $VERCEL_TOKEN embedded — use it):
npx -y vercel@latest link --yes --project claude-code-quest --token "$VERCEL_TOKEN"
npx -y vercel@latest --prod --yes --project claude-code-quest --token "$VERCEL_TOKEN"
# No manual alias step. BOTH claudecodequest.vercel.app and
# claude-code-quest-sigma.vercel.app are registered PRODUCTION domains, so
# `--prod` auto-points both at this new build. (claudecodequest was promoted to
# a production domain on 2026-06-02; before that it was an unregistered alias
# that stayed stale AND sat behind Vercel's SSO 401 wall. Don't re-add an
# `alias set` step — it's redundant now.)

# VERIFY THE LIVE SITE on the clean public URL humans actually use (not sigma):
URL=https://claudecodequest.vercel.app
A=$(curl -fsSL "$URL/" | grep -oE '/assets/index-[A-Za-z0-9_-]+\.js' | head -1)
curl -fsSL "$URL$A" | grep -q "<a feature name you wrote>" && echo "LIVE ✓" || echo "LIVE CHECK FAILED"
curl -fsSL "$URL$A" | grep -q "Placeholder" && echo "STILL STALE — investigate"
```

If `$VERCEL_TOKEN` is unset (you're not in the scheduled instance), STOP after
the push and report that the content is on `main` but undeployed — do not claim
success.

## STEP 6 — FINAL SUMMARY (always print)

The three features (or "quiet week — prior issue still live"); source URLs read
(+ any unreachable); any claims backed off in self-check and why; build result;
push commit SHA; **deploy result + the live-bundle verification** (the routine
is not done until the live site serves the new content).
