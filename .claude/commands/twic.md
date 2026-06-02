---
description: Run the weekly "This Week in Claude" routine end-to-end on the deployed branch.
---

Run the **This Week in Claude (TWiC)** routine fully autonomously — no
questions, no pausing for approval. Follow `docs/twic-routine.md` exactly.

Critical guardrails (STEP 0 of the runbook):

- You are filling content into an **existing** scaffolding. The four files
  `src/content/twic-1.ts`, `twic-2.ts`, `twic-3.ts`, `twic-issue.ts` MUST
  already exist. If any is missing, **STOP and report** — you are on the wrong
  branch/repo. NEVER create the rooms, levels, components, or a parallel
  scaffolding.
- Run on the branch Vercel deploys (its Production Branch — the one that
  carries the TWiC scaffolding). Push there so the live site updates.
- Preserve every fixed value: `roomId: 'twic-room-N'`, ids `twic-N-lore-a/b`,
  `twic-N-practice`, `twic-N-prize`, NPC key `twic-npc-N`, the door-challenge
  battle (`spriteKey: 'slime'`, `maxHP: 1`, one question / 4 choices / 1
  correct), and `TWIC_ISSUE_INTRO` shape `{ publishDate, framing }`. Replace
  only the prose.

Then: STEP 1 scan → STEP 2 pick 3 (or "quiet week" → stop, no push) → STEP 3
write → STEP 4 self-check (all five yes) → STEP 5 `npm run build` until green,
commit `TWiC · week of <date>`, `git push` to the deployed branch. End with the
runbook's FINAL SUMMARY.
