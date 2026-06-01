import type { LessonContent } from './types';

export const finalBossContent: LessonContent = {
  roomId: 'final-boss',
  intro:
    'The throne. The Gatekeeper waits here — the last test, the synthesis. Sloppy left a slime trail. The Memory Warlock forgot his own staff. Green Goblin dropped his pebbles. Connected Casper still wails about token bloat. Subagent Skeletor finally asked for help. Now: cross the chamber. End the cycle.',
  // Required-shape fallbacks (the battle replaces these for the encounter).
  prompt: '',
  choices: [{ id: 'noop', label: 'noop', correct: true }],
  passFeedback: '',
  failFeedback: '',
  lore: [
    {
      id: 'complexity-maxim',
      text: 'The one rule that governs all of this: only add complexity when you feel friction. Not before.\n\nStart with CLAUDE.md and plain prompts. That alone covers more daily work than people expect. Notice what you keep repeating, the workarounds you reach for, the manual steps that grate. Automate that specific thing.\n\nEvery hook, MCP server, skill, agent, plugin earns its way into your setup by solving a real friction you actually have. The creator of Claude Code himself runs a surprisingly minimal stack. Speculative complexity is the cheapest way to slow yourself down.\n\nFriction first, automation second. Always.',
    },
  ],
  battle: {
    name: 'The Gatekeeper',
    spriteKey: 'dragon',
    maxHP: 6,
    playerHP: 6,
    phases: 3,
    introLine:
      "*the throne stirs* my children fell — the Glob, the Warlock, the Goblin, the Ghost, the Skeletor. all of them. you stand alone now. *the chamber dims* one more keeper. then the cycle ends.",
    tauntLines: [
      "*roars* you LEARNED but you have not LIVED it!",
      "*shifts form* I am every shortcut you almost took!",
      "*the throne cracks* I am sloppy. I am forgetful. I am unbottled. I am unconnected. I am alone.",
      "*chamber shakes* maxims without practice are NOTHING!",
      "*howls* one more crack and you are MINE!",
    ],
    victoryLine:
      "*the throne shatters* …the cycle… is broken… *the gatekeeper dissolves into hex* go. add complexity only when you feel friction. the firm endures.",
    questions: [
      // L1 — permission modes (Welcome / Sloppy the Glob)
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
      // L2 — CLAUDE.md (Memory Warlock)
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
      // L3 — slash / hooks (Green Goblin)
      {
        prompt: "Firm rule: lint MUST run before every commit, no exception. What GUARANTEES it?",
        choices: [
          { id: 'a', label: 'CLAUDE.md note', correct: false },
          { id: 'b', label: 'Slash command /commit', correct: false },
          { id: 'c', label: 'PreToolUse hook on Bash(git commit *)', correct: true },
          { id: 'd', label: 'A code reviewer subagent', correct: false },
        ],
        passFeedback: 'STRIKE! Hooks are laws. Deterministic enforcement on the event.',
        failFeedback: 'MISS! CLAUDE.md and slash commands can be skipped. Hooks fire on events.',
      },
      // L4 — MCP (Connected Casper)
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
      // L5 — subagents / routines (Subagent Skeletor)
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
      // Synthesis — mental model
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
      // Synthesis — the one rule
      {
        prompt: "You just installed Claude Code on a fresh project. Following the one rule that governs all of this — what do you build first?",
        choices: [
          { id: 'a', label: 'CLAUDE.md + custom hooks + 4 MCP servers + a style-check skill + a reviewer agent + a team plugin', correct: false },
          { id: 'b', label: 'Plain prompts and a basic CLAUDE.md. Add a tool only when you notice yourself repeating the same workaround.', correct: true },
          { id: 'c', label: 'Install the most popular team plugin you can find and inherit its whole stack', correct: false },
          { id: 'd', label: 'Skip CLAUDE.md, run /init, accept whatever it generates verbatim', correct: false },
        ],
        passFeedback: 'STRIKE! Only add complexity when you feel friction. Every hook, server, skill, agent, plugin earns its way in by solving a real problem you actually have.',
        failFeedback: 'MISS! Start lean. The creator of Claude Code himself runs a minimal setup. Friction-driven complexity beats speculative complexity, every time.',
      },
      // Synthesis — delegation
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
