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
};
