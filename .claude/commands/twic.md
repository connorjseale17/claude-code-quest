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
- Run on `main` (the default + Vercel Production Branch). Start with
  `git checkout main && git pull origin main`. Never work on a side branch.
- Preserve every fixed value: `roomId: 'twic-room-N'`, ids `twic-N-lore-a/b`,
  `twic-N-practice`, `twic-N-prize`, NPC key `twic-npc-N`, the door-challenge
  battle (`spriteKey: 'slime'`, `maxHP: 1`, one question / 4 choices / 1
  correct), and `TWIC_ISSUE_INTRO` shape `{ publishDate, framing }`. Replace
  only the prose.

Then: STEP 1 scan → STEP 2 pick 3 (or "quiet week" → stop, no push) → STEP 3
write → STEP 4 self-check (all five yes) → STEP 5 `npm run build` until green,
commit `TWiC · week of <date>`, **`git push origin main` (never skip)**, then
**deploy with the Vercel CLI** (git push alone does NOT update the site):
`npx -y vercel@latest link --yes --project claude-code-quest --token "$VERCEL_TOKEN"`
then `npx -y vercel@latest --prod --yes --project claude-code-quest --token "$VERCEL_TOKEN"`.
Finally curl the live bundle to confirm the new feature text is served and no
"Placeholder" remains. End with the runbook's FINAL SUMMARY + live-site confirmation.
