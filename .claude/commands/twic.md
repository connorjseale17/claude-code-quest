---
description: Weekly "This Week in Claude" routine — scan, write 3 rooms, build, push main, deploy to Vercel, verify live.
---

You are running the weekly **This Week in Claude (TWiC)** routine for
`claude-code-quest`, fully autonomously. No questions, no pausing for approval.
Run every step top to bottom. The deliverable is the **live site updated** —
not a branch, not a PR.

> **Environment note.** This routine runs in the scheduled instance, which has
> a `VERCEL_TOKEN` embedded and network access to Vercel — so it CAN and MUST
> deploy to production itself (an ad-hoc dev session can't; this one can). The
> final state of a successful run is the new content visible on
> `https://claude-code-quest-sigma.vercel.app`. Long-form reference:
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

## STEP 3 — WRITE

Read `src/content/welcome.ts` for voice, and the current four files for shape.
Overwrite them (Feature A→twic-1, B→twic-2, C→twic-3), keeping every fixed value
from STEP 0. For each room fill: `intro`; top-level `prompt`/`choices`/feedback
(mirror the battle question); two `lore` books (Book A = mechanic, Book B =
application — structured-lore markup `**Title**` / `**Section**` / blank-line
paragraphs / `> Takeaway:` line; inline `*italic*` and `` `code` `` allowed; no
duplication between books); `practice` template + blanks; `conversations[twic-npc-N]`
= 2–4 `say` beats in the Beat-Reporter voice + a `summary`; the battle question.
Update `TWIC_ISSUE_INTRO.framing` to name all three features + today's `publishDate`.

## STEP 4 — SELF-CHECK (every answer yes; fix in place until so)

1. Every factual claim is supported by STEP 1 source text (a plausible
   elaboration the source didn't state = unsupported → rewrite or drop).
2. Each battle's marked-correct answer is true and all 3 distractors are false.
3. The three features are genuinely distinct.
4. In each room, Book A (mechanic) ≠ Book B (application).
5. `TWIC_ISSUE_INTRO.framing` names the three features actually in the rooms and
   `publishDate` is today.

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

# VERIFY THE LIVE SITE (don't trust the deploy message alone):
URL=https://claude-code-quest-sigma.vercel.app
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
