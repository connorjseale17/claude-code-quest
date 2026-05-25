import type { LessonContent } from './types';

export const slashContent: LessonContent = {
  roomId: 'slash',
  intro: 'Operator. The Registry archives every command the firm wrote once and now runs forever. Slash commands. Skills. Hooks. Each one buys back time. Find them. Read them. Then prove you know which is which.',
  prompt: "Your firm has a hard rule: `pnpm lint` must run before any commit, no exceptions, no matter who's at the keyboard. Which Claude Code mechanic GUARANTEES it happens — even if Claude or the operator forgets?",
  choices: [
    { id: 'a', label: "Add 'always lint before commit' to CLAUDE.md", correct: false },
    { id: 'b', label: 'A custom /commit slash command that includes the lint step', correct: false },
    { id: 'c', label: 'A PreToolUse hook that runs lint before any Bash(git commit *)', correct: true },
    { id: 'd', label: 'A subagent that reviews every commit after the fact', correct: false },
  ],
  passFeedback: '[PASS] CLAUDE.md is advice. Skills are recipes. Hooks are laws. Deterministic enforcement = hooks.',
  failFeedback: '[FAIL] Advisory rules can be ignored. Slash commands only fire when invoked. Need a guarantee? Hook.',
  lore: [
    {
      id: 'command-sheet',
      text: 'Tip: a slash command is just a markdown file in `.claude/commands/`. The body IS the prompt.',
    },
    {
      id: 'index',
      text: 'Tip: skills auto-invoke when their description matches. Slash commands fire on demand.',
    },
    {
      id: 'card-a',
      text: "Tip: bottle your firm's deliverables — /draft-proposal, /summarize-call, /qbr-deck.",
    },
    {
      id: 'card-b',
      text: 'Tip: hooks GUARANTEE actions. Format on save, lint before commit, block writes to /client-data.',
    },
    {
      id: 'card-c',
      text: "Tip: permission rules are tool-specific allow/ask/deny. Layer with whichever mode you're in.",
    },
  ],
  practice: {
    id: 'command-architect-practice',
    template: '# .claude/commands/draft-proposal.md\n\nDraft a ____ for $ARGUMENTS.\nPull discovery notes from ____.\nUse the firm ____ methodology as the structural backbone.\nOutput in the ____ template under ./templates/.\n\nAsk me to review before any external send.',
    blanks: [
      { id: 'deliverable', suggestions: ['proposal', 'engagement letter', 'statement of work'] },
      { id: 'source', suggestions: ['./notes/', 'Notion MCP', 'Drive MCP'] },
      { id: 'methodology', suggestions: ['Pyramid Principle', 'MECE', 'firm-specific'] },
      { id: 'format', suggestions: ['Word', 'Google Docs', 'PDF'] },
    ],
    prize: { id: 'command-architect', label: 'COMMAND ARCHITECT' },
  },
  conversations: {
    'clerk-bot': {
      summary:
        'Slash commands are markdown files in `.claude/commands/`. Skills auto-invoke; commands fire on demand. Hooks GUARANTEE actions (CLAUDE.md is advice, slash commands are recipes, hooks are laws). Permission rules pin specific tools allow/ask/deny.',
      beats: [
        {
          kind: 'say',
          text: "Mrrow. Welcome to the Registry, operator. Three drawers in here: commands, skills, hooks. Each one bottles work your firm already did so you don't redo it.",
        },
        {
          kind: 'say',
          text: 'Drawer one: slash commands. A markdown file in `.claude/commands/<name>.md`. The body IS the prompt. Type `/name` and Claude expands it. Pipe arguments in with `$ARGUMENTS`.',
        },
        {
          kind: 'say',
          text: "Drawer two: skills. Same shape, but with frontmatter. Claude auto-invokes a skill when its description matches the task. Still works as `/name` for manual fire. Skills can bundle helper files — instructions, templates, scripts.",
        },
        {
          kind: 'choice',
          prompt:
            "You have a firm-wide playbook for drafting client proposals. You want Claude to pick it up automatically when you say 'draft a proposal for Acme.' What's the right shape?",
          options: [
            {
              id: 'skill',
              label: 'A skill with a description that matches "draft proposal"',
              correct: true,
              reaction:
                "Right. Skills auto-invoke when their description matches. You don't have to remember to type `/draft-proposal` — Claude picks it up.",
            },
            {
              id: 'command',
              label: 'A slash command — type /draft-proposal every time',
              correct: false,
              reaction:
                'Works, but you have to remember to invoke it. Skills are better when the task is something Claude should recognize on its own.',
            },
            {
              id: 'claudemd',
              label: 'A long passage in CLAUDE.md describing the playbook',
              correct: false,
              reaction:
                "CLAUDE.md is for rules every session. Stuffing a playbook in there bloats the contract. A skill is the right home.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Drawer three: hooks. Different beast. Hooks fire on EVENTS — `PreToolUse`, `PostToolUse`, etc. — and run shell commands or HTTP calls. They GUARANTEE the action happens. Different from CLAUDE.md (advisory) and slash commands (only fire when invoked).",
        },
        {
          kind: 'choice',
          prompt:
            "Your firm has a hard rule: `pnpm lint` must run before any commit, no exceptions, no matter who's at the keyboard. Which mechanic GUARANTEES it?",
          options: [
            {
              id: 'claudemd',
              label: "Add 'always lint before commit' to CLAUDE.md",
              correct: false,
              reaction:
                "Advisory. Claude reads it, usually follows it, but 'usually' fails a firm-wide rule. Not a guarantee.",
            },
            {
              id: 'slash',
              label: 'A custom /commit slash command with the lint step',
              correct: false,
              reaction:
                "Only fires when invoked. Operator types `git commit` directly and the lint is skipped. Not a guarantee.",
            },
            {
              id: 'hook',
              label: 'A PreToolUse hook that runs lint before any Bash(git commit *)',
              correct: true,
              reaction:
                "Yes. Hook fires on the EVENT. Doesn't matter who typed what — lint runs, or the commit is blocked. THAT'S the guarantee.",
            },
            {
              id: 'subagent',
              label: 'A subagent that reviews every commit after the fact',
              correct: false,
              reaction:
                "After the fact = too late. Bad commit is already in history. Hook BEFORE the action is the only guarantee.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Bottle your firm's deliverables in skills. /draft-proposal, /summarize-call, /qbr-deck. One per move your firm sells. Versioned in git, evolves with your practice. New consultant onboards = they just use the skills.",
        },
        {
          kind: 'blank',
          prompt: "Draft a skill that auto-pulls discovery notes and outputs in the firm's proposal template. Fill in.",
          template:
            '# .claude/skills/draft-proposal/SKILL.md\nDraft a ____ for $ARGUMENTS.\nPull discovery notes from ____.\nOutput in the ____ template under ./templates/.\nAsk me to review before any send.',
          blanks: [
            { id: 'deliverable', suggestions: ['proposal', 'engagement letter', 'statement of work'] },
            { id: 'source', suggestions: ['./notes/', 'Notion MCP', 'Drive MCP'] },
            { id: 'format', suggestions: ['Word', 'Google Docs', 'PDF'] },
          ],
          followup:
            "That's the shape. Skill takes the brief, pulls context, lays it into your template, asks for review. Three minutes of authoring, hours of leverage per use.",
        },
        {
          kind: 'say',
          text: "Last thing: permission rules. They pin specific tools as allow/ask/deny. `Bash(npm test)` → allow, no nag. `Bash(git push *)` → ask every time. `Bash(rm -rf *)` → deny, full stop. Layered on top of whichever mode you're in.",
        },
        {
          kind: 'say',
          text: 'Recap: commands you summon, skills auto-invoke, hooks guarantee. Permission rules pin specific tools. Three drawers, four tools, one library of your firm. Mrrow.',
        },
        {
          kind: 'say',
          text: "Through the registry, into Execution. Boss terminal in there. Lore on the way has bonus tips. Off you go.",
        },
      ],
    },
  },
};
