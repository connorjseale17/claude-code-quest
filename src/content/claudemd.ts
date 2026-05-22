import type { LessonContent } from './types';

export const claudemdContent: LessonContent = {
  roomId: 'claudemd',
  intro: "Operator. Context is the bottleneck. The Archives hold the contracts your firm runs on — what Claude must obey before every task. Read fast. Don't skip the Stacks. The Vault closes when the contract is signed.",
  prompt: "Your firm's repos all use pnpm and vitest. You start a new Claude session, ask for a quick code change, and Claude wastes three turns running `npm test`, failing, and looking around. What's the single highest-ROI fix?",
  choices: [
    { id: 'a', label: 'Tell Claude in the prompt every time', correct: false },
    { id: 'b', label: 'Add `Run tests with: pnpm vitest` to CLAUDE.md and check it in', correct: true },
    { id: 'c', label: "Switch to npm to match Claude's defaults", correct: false },
    { id: 'd', label: 'Wait for Claude to learn it automatically via auto-memory', correct: false },
  ],
  passFeedback: '[PASS] CLAUDE.md = one hour writing, countless hours saved. A behavioral contract Claude reads every session.',
  failFeedback: "[FAIL] CLAUDE.md is loaded every session — bake the things Claude can't infer from the code.",
  lore: [
    {
      id: 'old-note',
      text: "CLAUDE.md is a behavioral contract. Bash commands Claude can't guess (pnpm, not npm). Code style. Repo etiquette. Architectural calls specific to your firm. Skip anything Claude can figure out by reading code.",
    },
    {
      id: 'log',
      text: 'Run /init at the start of any project. It scans the repo and drafts a CLAUDE.md you can prune. Hour spent on it = countless hours saved re-explaining.',
    },
    {
      id: 'fragment-a',
      text: 'Three homes. `~/.claude/CLAUDE.md` — your global preferences, every session. `./CLAUDE.md` — checked in, every teammate. `./CLAUDE.local.md` — gitignored, just you. More specific overrides less specific.',
    },
    {
      id: 'fragment-b',
      text: "/clear between unrelated tasks. /compact when you want to keep going but the window is full. /rewind to a checkpoint if Claude went off the rails. /btw for one-off questions that shouldn't pollute history.",
    },
    {
      id: 'fragment-c',
      text: 'Auto-memory lives at `~/.claude/projects/<project>/memory/`. Claude jots what it learns — naming patterns, dependencies, conventions. Run /memory to see what it figured out. Promote the useful bits to CLAUDE.md.',
    },
  ],
  practice: {
    id: 'contract-auditor-practice',
    template: 'Review my CLAUDE.md at ./CLAUDE.md.\n1. Cut anything ____ could figure out from reading the code.\n2. For each remaining rule, ask: would removing this cause ____? If not, delete it.\n3. Suggest ____ items I am probably missing (test, lint, deploy, brand voice).\n4. Flag any line that reads more like ____ than a rule Claude should obey.',
    blanks: [
      { id: 'reader', suggestions: ['Claude', 'a competent reader', 'any new teammate'] },
      { id: 'failure-mode', suggestions: ['Claude to make a specific mistake', 'a wasted turn', 'a wrong default'] },
      { id: 'count', suggestions: ['3–5', '5–8', '2–4'] },
      { id: 'genre', suggestions: ['documentation', 'a tutorial', 'a changelog'] },
    ],
    prize: { id: 'contract-auditor', label: 'CONTRACT AUDITOR' },
  },
};
