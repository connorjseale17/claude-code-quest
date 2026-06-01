import type { LessonContent } from './types';

export const finalBossContent: LessonContent = {
  roomId: 'final-boss',
  intro:
    'Operator. The throne. THE OVERLORD reigns here — every anti-pattern made flesh, every shortcut that ever cost an engagement. Cross the chamber. End the cycle.',
  // Required-shape fallbacks (the battle replaces these for the encounter).
  prompt: '',
  choices: [{ id: 'noop', label: 'noop', correct: true }],
  passFeedback: '',
  failFeedback: '',
  lore: [],
  battle: {
    name: 'THE OVERLORD',
    spriteKey: 'dragon',
    maxHP: 6,
    playerHP: 6,
    phases: 3,
    introLine:
      "*the throne stirs* you walked past every warning. you defeated my children. now answer to ME, operator. *the chamber dims*",
    tauntLines: [
      "*roars* you LEARNED but you have not MASTERED!",
      "*shifts form* I am every shortcut you almost took!",
      "*the throne cracks* I am vibe-coding, amnesia, copy-paste, walls, AND solitude!",
      "*chamber shakes* you cannot dodge what you do not know!",
      "*howls* one more crack and you are MINE!",
    ],
    victoryLine:
      "*the throne shatters* …the cycle… is broken… *the overlord dissolves into hex* the firm endures.",
    questions: [
      // L1 — permission modes (Welcome)
      {
        prompt: "You're opening a fresh client repo you've never seen. Which permission mode?",
        choices: [
          { id: 'a', label: 'auto', correct: false },
          { id: 'b', label: 'plan', correct: true },
          { id: 'c', label: 'acceptEdits', correct: false },
          { id: 'd', label: 'bypassPermissions', correct: false },
        ],
        passFeedback: 'STRIKE! Plan first on unknown code. Read before write.',
        failFeedback: 'MISS! Unknown code = PLAN mode. Always.',
      },
      // L2 — CLAUDE.md (Claude.md)
      {
        prompt: "The single highest-ROI place to encode 'use pnpm vitest'?",
        choices: [
          { id: 'a', label: 'Every prompt', correct: false },
          { id: 'b', label: './CLAUDE.md', correct: true },
          { id: 'c', label: 'A shell alias', correct: false },
          { id: 'd', label: 'The README', correct: false },
        ],
        passFeedback: 'STRIKE! The contract. One line saves countless turns.',
        failFeedback: 'MISS! CLAUDE.md is loaded every session. It is the contract.',
      },
      // L3 — slash / hooks (Slash)
      {
        prompt: "Firm rule: lint MUST run before every commit, no exception. What GUARANTEES it?",
        choices: [
          { id: 'a', label: 'CLAUDE.md note', correct: false },
          { id: 'b', label: 'Slash command /commit', correct: false },
          { id: 'c', label: 'PreToolUse hook on git commit', correct: true },
          { id: 'd', label: 'A code reviewer subagent', correct: false },
        ],
        passFeedback: 'STRIKE! Hooks are laws. Deterministic enforcement on the event.',
        failFeedback: 'MISS! CLAUDE.md and slash commands can be skipped. Hooks fire on events.',
      },
      // L4 — MCP (MCP)
      {
        prompt: "Safe pattern to let Claude read Drive + post Slack?",
        choices: [
          { id: 'a', label: 'Two scoped MCP servers + narrow permission rules', correct: true },
          { id: 'b', label: 'Custom REST wrapper with shared admin creds', correct: false },
          { id: 'c', label: 'WebFetch the Drive and Slack UIs', correct: false },
          { id: 'd', label: 'CLAUDE.md plea to be polite', correct: false },
        ],
        passFeedback: 'STRIKE! Two servers. Scoped auth. Narrow rules. The pattern.',
        failFeedback: 'MISS! MCP solves this with scoped tokens. Custom wrappers leak.',
      },
      // L5 — subagents / routines (Subagents)
      {
        prompt: "Schedule: Friday 5pm — fetch merged PRs, summarize, post to #weekly-review. Right primitive?",
        choices: [
          { id: 'a', label: 'Foreground subagent you remember to spawn', correct: false },
          { id: 'b', label: 'Slash command you run manually', correct: false },
          { id: 'c', label: '/loop scheduled routine on Anthropic infra', correct: true },
          { id: 'd', label: 'PostToolUse hook on every PR merge', correct: false },
        ],
        passFeedback: 'STRIKE! Routines for recurring. Schedule = /loop on Anthropic infra.',
        failFeedback: 'MISS! Recurring + autonomous + scheduled = routine. Not subagent, not hook.',
      },
      // Meta — synthesis
      {
        prompt: "Which sequence is the CORRECT mental model for a Claude Code session?",
        choices: [
          { id: 'a', label: 'edit → review → plan', correct: false },
          { id: 'b', label: 'read → plan → review → write → ship', correct: true },
          { id: 'c', label: 'auto → fix forward', correct: false },
          { id: 'd', label: 'write → debug → ship → document', correct: false },
        ],
        passFeedback: 'STRIKE! Read first. Plan. Review the plan. Then write. Then ship.',
        failFeedback: 'MISS! The plan IS the first draft. Read and plan precede every keystroke.',
      },
      // Meta — context
      {
        prompt: "Which is NOT a Claude Code context-management tool?",
        choices: [
          { id: 'a', label: '/compact', correct: false },
          { id: 'b', label: '/clear', correct: false },
          { id: 'c', label: '/rewind', correct: false },
          { id: 'd', label: '/git-push', correct: true },
        ],
        passFeedback: 'STRIKE! /git-push is not a Claude Code primitive. The others manage context.',
        failFeedback: 'MISS! /compact, /clear, /rewind all manage context. /git-push is not in the set.',
      },
      // Meta — delegation
      {
        prompt: "You need to research 5 competitors in parallel. Best move?",
        choices: [
          { id: 'a', label: 'Have main agent do them in sequence', correct: false },
          { id: 'b', label: 'Spawn 5 Explore subagents in one message — run concurrent', correct: true },
          { id: 'c', label: 'Open 5 Claude sessions and tab between them', correct: false },
          { id: 'd', label: 'Pick one competitor and skip the rest', correct: false },
        ],
        passFeedback: 'STRIKE! Parallel subagents = real concurrency. Orchestrator stitches the brief.',
        failFeedback: 'MISS! N subagents in one message = N× throughput. Delegate.',
      },
    ],
  },
};
