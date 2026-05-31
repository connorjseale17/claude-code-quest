import type { LessonContent } from './types';

export const claudemdContent: LessonContent = {
  roomId: 'claudemd',
  intro: 'Operator. The Archives. Talk to Archivist Owl — she runs the contracts your firm sets up before every Claude session. Lore in the Stacks adds detail. Vault holds the challenge.',
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
      text: 'Tip: CLAUDE.md belongs in repo root. Claude reads it every session before any task.',
    },
    {
      id: 'log',
      text: 'Tip: /init drafts a starter CLAUDE.md from the repo. Prune the noise before checking in.',
    },
    {
      id: 'fragment-a',
      text: 'Tip: ~/.claude/CLAUDE.md = global preferences. ./CLAUDE.md = team contract. ./CLAUDE.local.md = just you.',
    },
    {
      id: 'fragment-b',
      text: 'Tip: /compact preserves the conversation; /clear nukes it. Pick by intent.',
    },
    {
      id: 'fragment-c',
      text: 'Tip: /memory shows what Claude figured out on its own. Promote useful bits to CLAUDE.md.',
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
  conversations: {
    'archivist-bot': {
      summary:
        'CLAUDE.md is a behavioral contract Claude reads every session. Three homes (~/global, ./team, ./local). /compact, /clear, /rewind, /btw manage context. Auto-memory lives at ~/.claude/projects/.',
      beats: [
        {
          kind: 'say',
          text: "Hoo. The Archives. Every engagement lives or dies by the contract in here. Sit. We need to talk about CLAUDE.md.",
        },
        {
          kind: 'say',
          text: "CLAUDE.md is the contract Claude reads before every task. Bash commands Claude can't guess. Code style. Naming. Repo etiquette. The non-obvious things a new consultant joining the project would need on day one.",
        },
        {
          kind: 'choice',
          prompt:
            "Your firm uses pnpm and vitest. New session — Claude tries `npm test`, fails, looks around, tries again. What's the highest-ROI fix?",
          options: [
            {
              id: 'prompt-it',
              label: 'Tell Claude in every prompt',
              correct: false,
              reaction:
                "Then you tie the knot every conversation. Once a session, at least. Probably more. Tedious and easy to forget.",
            },
            {
              id: 'claudemd',
              label: 'Add `Run tests with: pnpm vitest` to CLAUDE.md, check it in',
              correct: true,
              reaction:
                "Exactly. One line in the contract. Every teammate, every session — Claude obeys. One hour writing CLAUDE.md saves countless hours of re-explaining.",
            },
            {
              id: 'switch-npm',
              label: "Switch to npm to match Claude's defaults",
              correct: false,
              reaction:
                "Bend the tool to the firm, not the firm to the tool. The whole point of CLAUDE.md is to encode YOUR conventions.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Run /init at the start of any project. Claude scans the repo and drafts a CLAUDE.md you can prune. Don't accept it blindly — half the value is in the editing.",
        },
        {
          kind: 'say',
          text: "Three homes for CLAUDE.md. `~/.claude/CLAUDE.md` is your global preferences — every session, every project. `./CLAUDE.md` is checked in — every teammate sees it. `./CLAUDE.local.md` is gitignored — just you.",
        },
        {
          kind: 'choice',
          prompt:
            "You want a personal rule 'always run lint before suggesting a commit' but you don't want it imposed on teammates. Where?",
          options: [
            {
              id: 'team',
              label: './CLAUDE.md',
              correct: false,
              reaction:
                "That's the team contract. Your teammates didn't ask for your lint discipline. Wrong file.",
            },
            {
              id: 'local',
              label: './CLAUDE.local.md',
              correct: true,
              reaction:
                "Right. Gitignored, just you. Teammates do their own thing. Specific overrides general.",
            },
            {
              id: 'global',
              label: '~/.claude/CLAUDE.md',
              correct: false,
              reaction:
                "That's broader — every project you work on. Use it for habits you keep everywhere. For one project, .local.md is the right scope.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Now context controls. /compact when the window fills but you want to keep going. /clear between unrelated tasks. /rewind to a checkpoint if Claude wandered. /btw for one-off questions that shouldn't pollute the history.",
        },
        {
          kind: 'blank',
          prompt: "You're three hours into a feature, context is full, but you're close to done. What command?",
          template: '/____ — keeps the conversation, summarizes the old turns.',
          blanks: [{ id: 'command', suggestions: ['compact', 'clear', 'rewind', 'btw'] }],
          followup:
            "Compact. Summarizes the old turns into a compressed memory, frees the window, you keep going. /clear would nuke everything. Different tool, different moment.",
        },
        {
          kind: 'say',
          text: "Last thing: auto-memory. Lives at `~/.claude/projects/<project>/memory/`. Claude jots what it learned — naming patterns, dependencies, conventions. Run /memory to see what it figured out. Promote the useful bits to CLAUDE.md.",
        },
        {
          kind: 'say',
          text: "Through the north door — the Stacks. Bonus lore in there. The Vault past that holds MORDRANG THE SORCERER, an old wraith who remembers nothing and casts memory-rot. Hoo. Bring the key when you take him down.",
        },
      ],
    },
  },
  battle: {
    name: 'MORDRANG',
    spriteKey: 'mordrang',
    maxHP: 3,
    playerHP: 5,
    phases: 1,
    introLine: "…another one? remind me… who… who are you again? *the sorcerer's staff trembles* no matter. i shall forget you too.",
    tauntLines: [
      "*incants* who… who are you again?",
      "*staff cracks* memory-rot upon you!",
      "context-vapor! be gone, stranger!",
    ],
    victoryLine: "…ah. i remember now. you are the one who keeps the contract. … *crumbles to dust*",
    questions: [
      {
        prompt: "Your firm uses pnpm + vitest. Claude wastes turns trying `npm test`. Highest-ROI fix?",
        choices: [
          { id: 'a', label: 'Tell Claude in every prompt', correct: false },
          { id: 'b', label: 'Add `Run tests with: pnpm vitest` to CLAUDE.md, check it in', correct: true },
          { id: 'c', label: "Switch the firm to npm to match Claude's defaults", correct: false },
          { id: 'd', label: 'Wait for auto-memory to figure it out', correct: false },
        ],
        passFeedback: 'STRIKE! One line in the contract. Every session, every teammate, Claude obeys.',
        failFeedback: 'MISS! CLAUDE.md is the contract Claude reads every session. Bake what it can\'t infer.',
      },
      {
        prompt: "You want a personal rule 'always lint before suggesting a commit' WITHOUT imposing it on teammates. Where?",
        choices: [
          { id: 'a', label: './CLAUDE.md (team contract)', correct: false },
          { id: 'b', label: './CLAUDE.local.md (gitignored, just you)', correct: true },
          { id: 'c', label: '~/.claude/CLAUDE.md (global preferences)', correct: false },
          { id: 'd', label: 'A README footnote', correct: false },
        ],
        passFeedback: 'STRIKE! .local.md is gitignored. Yours alone. Teammates do their own thing.',
        failFeedback: 'MISS! .CLAUDE.md is the team contract. Your discipline ≠ their burden. Use .local.md.',
      },
      {
        prompt: "Three hours into a feature, context window is full, but you're close to done. What command?",
        choices: [
          { id: 'a', label: '/clear — start fresh', correct: false },
          { id: 'b', label: '/compact — summarize old turns, keep going', correct: true },
          { id: 'c', label: '/rewind — go back to a checkpoint', correct: false },
          { id: 'd', label: '/btw — ask a side question', correct: false },
        ],
        passFeedback: 'STRIKE! /compact frees the window without nuking the conversation.',
        failFeedback: 'MISS! /clear nukes everything. /compact preserves and summarizes. Different tools.',
      },
      {
        prompt: "What does Claude's auto-memory at `~/.claude/projects/<project>/memory/` store?",
        choices: [
          { id: 'a', label: 'Your API keys', correct: false },
          { id: 'b', label: 'Conventions and patterns Claude figured out on its own', correct: true },
          { id: 'c', label: 'Backups of every prompt you sent', correct: false },
          { id: 'd', label: 'Output of every shell command', correct: false },
        ],
        passFeedback: 'STRIKE! Run /memory to see it. Promote the useful bits to CLAUDE.md.',
        failFeedback: 'MISS! It\'s a learned-conventions cache. Not a key vault, not a log dump.',
      },
    ],
  },
};
