import type { LessonContent } from './types';

/** twic-3 (Feature C) — `/simplify`. Final room — door target routes to the
 *  TwicStampScreen via currentTrack.
 *  Source: Claude Code CHANGELOG 2.1.154 & 2.1.152 ; /simplify skill description. */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Room 3 — last beat. The story is the `/simplify` command. Same shape: Beat Reporter, two books, door question. Clear it and the issue stamp drops.",
  prompt:
    "You've just finished a feature for a client and want the diff tidied — duplication removed, awkward bits simplified — without applying each suggestion by hand. Which command does that?",
  choices: [
    { id: 'a', label: '`/simplify` — runs a cleanup-only (quality) review of your changes and applies the fixes automatically', correct: true },
    { id: 'b', label: '`/simplify` — scans the diff for security vulnerabilities and reports them', correct: false },
    { id: 'c', label: '`/simplify` — reverts your most recent commit to a clean state', correct: false },
    { id: 'd', label: '`/simplify` — shrinks files by stripping out comments and blank lines', correct: false },
  ],
  passFeedback: "HIT! `/simplify` is a quality pass that auto-applies its fixes. Bug-hunting is `/code-review`'s job.",
  failFeedback: 'MISS! `/simplify` is cleanup-only and auto-applies fixes — not a security scan, a revert, or a comment-stripper.',
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**\`/simplify\` — The Mechanic**

**What shipped**
\`/simplify\` runs a *cleanup-only* review of your changed code and applies the fixes automatically — reuse, simplification, efficiency, and altitude, tidied in place.

**Quality, not correctness**
It is deliberately *not* a bug hunt. Under the hood it invokes \`/code-review --fix\`, scoped to quality cleanups; correctness and security stay with a full \`/code-review\`.

> Takeaway: \`/simplify\` reviews your diff for tidiness and applies the fixes itself — no per-suggestion clicking.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**\`/simplify\` — Why It Matters**

**The consulting angle**
Run \`/simplify\` on a finished change *before* you open the PR. It clears the small stuff — duplicated blocks, needless complexity, inefficient patterns — so the diff a reviewer or client sees is already clean.

**How you'd apply it**
Keep the pairing straight: \`/simplify\` for *quality* (and it auto-applies), \`/code-review\` for *correctness and bugs*. Don't expect \`/simplify\` to catch a logic error.

> Takeaway: \`/simplify\` to polish before review; \`/code-review\` to catch what's actually broken.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: 'Run `/simplify` on the ____ before I open the PR to clean up ____, leaving correctness for ____.',
    blanks: [
      { id: 'target', suggestions: ['checkout-flow diff', 'reporting dashboard', 'auth refactor'] },
      { id: 'cleanup', suggestions: ['duplicated logic', 'over-complex helpers', 'inefficient loops'] },
      { id: 'pair', suggestions: ['a separate /code-review', 'the test suite', 'a teammate'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        '/simplify runs a cleanup-only (quality) review of your changes — reuse, simplification, efficiency — and applies the fixes automatically. It is not a bug or security hunt; use /code-review for correctness. Run it before opening a PR.',
      beats: [
        { kind: 'say', text: "Last story of the issue: the `/simplify` command. It runs a *cleanup-only* review of your changed code and applies the fixes automatically — reuse, simplification, efficiency, tidied in place." },
        { kind: 'say', text: "What it is *not*: a bug hunt. Under the hood it calls `/code-review --fix`, but scoped to quality. Correctness and security still belong to a full `/code-review`." },
        { kind: 'say', text: "Beat move: run `/simplify` on a finished change *before* you open the PR, so the diff your reviewer or client sees is already clean. The door asks you to tell `/simplify` and `/code-review` apart." },
      ],
    },
  },
  battle: {
    name: 'Door Challenge · /simplify',
    spriteKey: 'slime',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: '> The last door. One question. Then the stamp.',
    tauntLines: ['> Almost there. Re-read and try again.'],
    victoryLine: '> The door opens. The issue is complete.',
    questions: [
      {
        prompt:
          "You've just finished a feature for a client and want the diff tidied — duplication removed, awkward bits simplified — without applying each suggestion by hand. Which command does that?",
        choices: [
          { id: 'a', label: '`/simplify` — runs a cleanup-only (quality) review of your changes and applies the fixes automatically', correct: true },
          { id: 'b', label: '`/simplify` — scans the diff for security vulnerabilities and reports them', correct: false },
          { id: 'c', label: '`/simplify` — reverts your most recent commit to a clean state', correct: false },
          { id: 'd', label: '`/simplify` — shrinks files by stripping out comments and blank lines', correct: false },
        ],
        passFeedback: "HIT! `/simplify` is a quality pass that auto-applies its fixes. Leave correctness and security to `/code-review`.",
        failFeedback: 'MISS! `/simplify` is cleanup-only and applies fixes for you — not a security scan, a revert, or a comment-stripper.',
      },
    ],
  },
};
