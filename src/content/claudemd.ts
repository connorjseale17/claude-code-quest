import type { LessonContent } from './types';

export const claudemdContent: LessonContent = {
  roomId: 'claudemd',
  intro: 'The Archives. Talk to Archivist Owl — she runs the contracts your firm sets up before every Claude session. Lore in the Stacks adds detail. The Vault holds the boss battle.',
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
      text: 'CLAUDE.md belongs in the repository root, alongside the README and the package manifest. Claude reads it every session before any task.\n\nIt is the behavioral contract of the project. Build commands, test commands, naming, repository etiquette, the non-obvious things a new consultant joining the project would need on day one — they all live here.\n\nKeep it tight. Fifty to one hundred and fifty lines is the sweet spot; bloated CLAUDE.md gets ignored, and the most important rules get lost in the noise.',
    },
    {
      id: 'log',
      text: 'Run /init at the start of any project. Claude scans the repository — the languages, the build files, the conventions it can see — and drafts a starter CLAUDE.md you can prune.\n\nDo not accept what /init produces verbatim. Half the value is in the editing: remove what Claude can already infer from the code, and add the things it cannot infer — the firm-specific conventions, the deploy story, the way your team writes commit messages.\n\nA pruned CLAUDE.md is the contract; the raw /init output is just a first draft.',
    },
    {
      id: 'formula',
      text: 'Every good CLAUDE.md answers three questions. WHY: what is this project, who is it for, what problem does it solve? This gives Claude decision-making context for the dozen small choices every build requires.\n\nWHAT: the architecture, the stack, the key directories and files. Where things live and how they connect. HOW: build commands, test commands, lint commands, conventions, things to avoid.\n\nSame three-part formula you use to brief Claude on any task. Learn it once, write it everywhere.',
    },
    {
      id: 'fragment-a',
      text: 'The loading hierarchy resolves conflicts by specificity. Managed enterprise policy first, then ~/.claude/CLAUDE.md (your global preferences), then CLAUDE.md in parent directories, then the project root, then subdirectories, then .claude/rules/*.md.\n\nMost-specific wins: a subdirectory rule overrides the project root, which overrides your user-global. Managed policy is the only layer that cannot be overridden.\n\nThe practical takeaway: avoid writing contradictions. If two files disagree, Claude may pick one arbitrarily.',
    },
    {
      id: 'fragment-b',
      text: '/compact preserves the conversation. It summarizes the older turns into a compressed memory and frees up the window so you can keep going without losing the thread.\n\n/clear nukes the conversation entirely. File edits stay on disk, but the chat history is gone. Use it between unrelated tasks.\n\nPick by intent: still in the same engagement, just running out of room → /compact. Switching engagements entirely → /clear. Different tools, different moments.',
    },
    {
      id: 'auto-memory-warn',
      text: 'Auto-memory writes itself between sessions. Claude jots what it learned — naming patterns, dependencies it mapped, conventions it figured out.\n\nQuality varies. Some notes are gold; others are misremembered or simply wrong. Treat them like notes a new hire took on their first week: useful when correct, dangerous when stale.\n\nRun /memory to read what auto-memory captured. Review, correct, prune. A wrong auto-memory line is worse than no line at all, because Claude will trust it next session.',
    },
    {
      id: 'fragment-c',
      text: '/memory shows what Claude has figured out on its own across sessions — the conventions, build steps, and patterns it inferred from your repository.\n\nIt is also where the loaded CLAUDE.md files appear, so you can verify the hierarchy is resolving the way you expect.\n\nPromote the useful auto-memory bits to CLAUDE.md so the whole team gets them; delete the noise so it does not lead the next session astray.',
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
        'CLAUDE.md is a behavioral contract Claude reads every session. Three-part formula: WHY / WHAT / HOW. Loading hierarchy: most-specific wins. Three homes (~/global, ./team, ./local). /compact and /clear manage context. Auto-memory needs review.',
      beats: [
        {
          kind: 'say',
          text: "Hoo. The Archives. Every engagement lives or dies by the contract in here. Sit. We need to talk about CLAUDE.md.",
        },
        {
          kind: 'say',
          text: "CLAUDE.md is the contract Claude reads before every task. Build commands. Test commands. Naming. The non-obvious things a new consultant joining the project would need on day one.",
        },
        {
          kind: 'say',
          text: "Three-part formula. WHY: project purpose, audience, priorities. WHAT: architecture, stack, key files. HOW: build, test, lint commands and code style. Same shape you brief me in.",
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
          text: "Loading hierarchy: managed-policy first, then ~/.claude/CLAUDE.md, then parent directories, then project root, then subdirectories, then .claude/rules/*.md. Most specific wins. Don't write contradictions.",
        },
        {
          kind: 'choice',
          prompt:
            "You want a personal rule 'always run lint before suggesting a commit' but you don't want it imposed on teammates. Where does it go?",
          options: [
            {
              id: 'team',
              label: './CLAUDE.md',
              correct: false,
              reaction:
                "That's the team contract — every teammate sees it. Your discipline isn't their burden. Wrong file.",
            },
            {
              id: 'local',
              label: './CLAUDE.local.md',
              correct: true,
              reaction:
                "Right. Gitignored, just you. Teammates do their own thing. Specific overrides general — that's the hierarchy at work.",
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
          text: "Context controls. /compact when the window fills but you want to keep going. /clear between unrelated tasks. /rewind to a checkpoint if Claude wandered. /btw for one-off questions that shouldn't pollute the history.",
        },
        {
          kind: 'blank',
          prompt: "You're three hours into a feature, context is full, but you're close to done. What command?",
          template: '/____ — keeps the conversation, summarizes the old turns.',
          blanks: [{ id: 'command', suggestions: ['compact', 'clear', 'rewind', 'btw'] }],
          followup:
            "Compact. Summarizes the old turns into compressed memory, frees the window, you keep going. /clear would nuke everything. Different tool, different moment.",
        },
        {
          kind: 'say',
          text: "Last thing: auto-memory. Claude writes itself notes between sessions. Quality varies. Treat it like a new hire's notes — review with /memory, correct the inaccuracies, prune noise. A wrong auto-memory line is worse than no line.",
        },
        {
          kind: 'say',
          text: "Through the north door — the Stacks. Bonus lore in there. The Vault past that holds The Memory Warlock, an old wraith who remembers nothing and casts memory-rot. Hoo. Bring the key when you take him down.",
        },
      ],
    },
  },
  battle: {
    name: 'The Memory Warlock',
    spriteKey: 'warlock',
    maxHP: 3,
    playerHP: 5,
    phases: 1,
    introLine: "…another one? remind me… who… who are you again? *the warlock's staff trembles* no matter. i shall forget you too.",
    tauntLines: [
      "*incants* who… who are you again?",
      "*staff cracks* memory-rot upon you!",
      "context-vapor! be gone!",
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
        failFeedback: "MISS! CLAUDE.md is the contract Claude reads every session. Bake what it can't infer.",
      },
      {
        prompt: "In the CLAUDE.md loading hierarchy, which wins when two files conflict?",
        choices: [
          { id: 'a', label: '~/.claude/CLAUDE.md (your global preferences)', correct: false },
          { id: 'b', label: 'Whichever was loaded first', correct: false },
          { id: 'c', label: 'The most-specific file (subdirectory > project root > parent > user-global)', correct: true },
          { id: 'd', label: 'Claude picks randomly each session', correct: false },
        ],
        passFeedback: 'STRIKE! Most-specific wins. Subdir overrides project root overrides parent dir overrides ~/.claude. Managed policy alone is unoverridable.',
        failFeedback: 'MISS! The hierarchy resolves by specificity. Closest-to-the-code file wins. Avoid writing contradictions in the first place.',
      },
      {
        prompt: "You want 'always run lint before suggesting a commit' for yourself only — not your teammates. Where does it live?",
        choices: [
          { id: 'a', label: './CLAUDE.md (team contract)', correct: false },
          { id: 'b', label: './CLAUDE.local.md (gitignored, just you)', correct: true },
          { id: 'c', label: '~/.claude/CLAUDE.md (global preferences)', correct: false },
          { id: 'd', label: 'A README footnote', correct: false },
        ],
        passFeedback: 'STRIKE! .local.md is gitignored. Yours alone. Teammates do their own thing.',
        failFeedback: 'MISS! ./CLAUDE.md is the team contract. Your discipline ≠ their burden. Use .local.md.',
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
        prompt: "Claude's auto-memory writes itself between sessions. What's the right way to use it?",
        choices: [
          { id: 'a', label: 'Trust everything Claude saves — it learned it for a reason', correct: false },
          { id: 'b', label: 'Run /memory, review the notes, correct inaccuracies, prune noise', correct: true },
          { id: 'c', label: 'Delete it after every session to keep things clean', correct: false },
          { id: 'd', label: 'Disable it entirely — CLAUDE.md is enough', correct: false },
        ],
        passFeedback: 'STRIKE! Treat it like a new hire\'s notes — review, correct, prune. Promote useful bits to CLAUDE.md.',
        failFeedback: 'MISS! Quality varies. A wrong auto-memory line is worse than no line. Review with /memory and curate.',
      },
    ],
  },
};
