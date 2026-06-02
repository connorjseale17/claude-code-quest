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

**Fixed contract — preserve verbatim, change only the prose:**

| Slot | Fixed value (do not change) |
|------|------------------------------|
| `roomId` | `twic-room-1` / `twic-room-2` / `twic-room-3` |
| lore ids | `twic-N-lore-a`, `twic-N-lore-b` |
| practice id / prize id | `twic-N-practice` / `twic-N-prize` |
| NPC conversation key | `twic-npc-N` (NPC name "Beat Reporter" lives in roomConfigs) |
| battle | one "Door Challenge" question, `spriteKey: 'slime'`, `maxHP: 1`, exactly 4 choices, exactly one `correct: true` |
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

## STEP 3 — WRITE

Read `src/content/welcome.ts` for voice, and the current four TWiC files for
shape. Overwrite the four files, mapping Feature A→twic-1, B→twic-2, C→twic-3,
keeping every fixed value in the STEP 0 table. Lore books use structured-lore
markup (`**Title**`, `**Section**`, blank-line paragraphs, `> Takeaway:` line;
inline `*italic*` / `` `code` `` allowed); Book A = mechanic, Book B =
application — no duplication. NPC beats are 2–4 `say` beats in the Beat Reporter
voice. Update `TWIC_ISSUE_INTRO.framing` to name all three features + today's
`publishDate`.

## STEP 4 — SELF-CHECK

All must be yes, fix in place until so: (1) every claim supported by STEP 1
source text; (2) each battle's marked-correct is true and all 3 distractors are
false; (3) the three features are distinct; (4) Book A ≠ Book B in each room;
(5) `framing` names the three actual features and `publishDate` is today.

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

**Deploy (do not assume git-push is enough — confirm one of these is true):**
- **Preferred:** the GitHub repo is connected to Vercel with Production Branch
  = `main`, so the push above auto-builds and deploys. No secrets needed.
- **Fallback (CLI):** if the project is not git-connected, deploy explicitly
  with `npx vercel --prod --yes` — this requires `VERCEL_TOKEN` (and the linked
  `.vercel/project.json`, which is gitignored) available in the run
  environment. If neither is configured, STOP and report that the content is on
  `main` but cannot be deployed from here.

Then confirm the live site (`https://claude-code-quest-sigma.vercel.app`):
the PATH SELECT tile shows `UPDATED · {today}` and the three rooms read the new
features.

## FINAL SUMMARY (always print)

Three features (or "quiet week"); source URLs (and any unreachable); claims
backed off in self-check; whether STEP 0 aborted; push result + commit SHA.
