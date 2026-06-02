import type { LessonContent } from './types';

// This Week in Claude · Feature C — /simplify (auto-applied cleanup review)
// Source: Claude Code CHANGELOG 2.1.154 and 2.1.152 ; /simplify skill description

export const twic3Content: LessonContent = {
  roomId: 'twic-3',
  intro:
    'New this week: the `/simplify` command. Talk to the Tidewright — she sweeps freshly written code into shape before it ships. Read both books, then the boss checks that you know exactly what `/simplify` does (and what it does not).',
  prompt:
    "You've just finished a feature for a client and want the diff tidied — duplication removed, awkward bits simplified — without applying each suggestion by hand. Which command does that?",
  choices: [
    { id: 'a', label: '`/simplify` — runs a cleanup-only (quality) review of your changes and applies the fixes automatically', correct: true },
    { id: 'b', label: '`/simplify` — scans the diff for security vulnerabilities and reports them', correct: false },
    { id: 'c', label: '`/simplify` — reverts your most recent commit to a clean state', correct: false },
    { id: 'd', label: '`/simplify` — shrinks files by stripping out comments and blank lines', correct: false },
  ],
  passFeedback: '[PASS] `/simplify` is a quality pass — reuse, simplification, efficiency — and it applies the fixes for you. Bug-hunting is `/code-review`\'s job.',
  failFeedback: '[FAIL] `/simplify` is cleanup-only and auto-applies the fixes. It is not a security scan, a revert, or a comment-stripper.',
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**\`/simplify\` — The Mechanic**

**What it does**
\`/simplify\` runs a *cleanup-only* review of your changed code and applies the fixes automatically. It looks at reuse, simplification, efficiency, and altitude — and tidies them in place.

**Quality, not correctness**
It is deliberately *not* a bug hunt. Under the hood it invokes \`/code-review --fix\`, which applies findings after the review — but \`/simplify\` scopes that to quality cleanups, leaving correctness and security to a full \`/code-review\`.

> Takeaway: \`/simplify\` reviews your diff for tidiness and applies the fixes itself — no per-suggestion clicking.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**\`/simplify\` — Why It Matters**

**Where it fits the workflow**
Run \`/simplify\` on a finished change *before* you open the PR. It clears the small stuff — duplicated blocks, needless complexity, inefficient patterns — so the diff a reviewer (or a client) sees is already clean.

**Pair it correctly**
Keep two tools in mind: \`/simplify\` for *quality* (and it auto-applies), \`/code-review\` for *correctness and bugs*. Reaching for the wrong one is the classic mistake — don't expect \`/simplify\` to catch a logic error.

> Takeaway: \`/simplify\` to polish before review; \`/code-review\` to catch what's actually broken.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template:
      'I just finished the ____ feature for ____.\nRun `/simplify` on the diff to clean up ____ before I open the PR.\nLeave correctness checks for a separate `/code-review`.',
    blanks: [
      { id: 'feature', suggestions: ['checkout flow', 'reporting dashboard', 'auth refactor'] },
      { id: 'client', suggestions: ['Acme Corp', 'Globex', 'Initech'] },
      { id: 'cleanup', suggestions: ['duplicated logic', 'over-complex helpers', 'inefficient loops'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TIDE WRIGHT' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        '/simplify runs a cleanup-only (quality) review of your changes — reuse, simplification, efficiency — and applies the fixes automatically. It is not a bug or security hunt; use /code-review for correctness. Run it before opening a PR.',
      beats: [
        {
          kind: 'say',
          text: "You there — before that code ships, let me show you this week's feature: the `/simplify` command.",
        },
        {
          kind: 'say',
          text: "What it does: `/simplify` runs a *cleanup-only* review of your changed code and applies the fixes automatically. Reuse, simplification, efficiency — it tidies them in place, no clicking through each suggestion.",
        },
        {
          kind: 'say',
          text: "What it is *not*: a bug hunt. Under the hood it calls `/code-review --fix`, but scoped to quality. Correctness and security still belong to a full `/code-review`.",
        },
        {
          kind: 'say',
          text: "Consultant move: run `/simplify` on a finished change *before* you open the PR, so the diff your reviewer or client sees is already clean. Then keep the pairing straight — `/simplify` for tidiness, `/code-review` for bugs. The boss will ask you to tell them apart.",
        },
      ],
    },
  },
  battle: {
    name: 'Emberling the Untidy',
    spriteKey: 'emberling',
    maxHP: 3,
    playerHP: 5,
    phases: 1,
    introLine: "*scatters loose ends* …duplicated blocks… dead helpers… and you want to ship THIS…?",
    tauntLines: [
      "*tangles* leave the mess, nobody reads the diff anyway!",
      "*smolders* simplify? that's just deleting comments, right?",
      "*sparks* a reviewer LOVES copy-pasted logic!",
    ],
    victoryLine: "*settles into order* …fine… clean diff… you knew the right broom…",
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
        passFeedback: 'STRIKE! `/simplify` is a quality pass that auto-applies its fixes. Leave correctness and security to `/code-review`.',
        failFeedback: 'MISS! `/simplify` is cleanup-only and applies fixes for you — not a security scan, not a revert, not a comment-stripper.',
      },
    ],
  },
};
