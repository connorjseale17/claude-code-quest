import type { LessonContent } from './types';

export const finalBossContent: LessonContent = {
  roomId: 'final-boss',
  intro:
    "The throne. The Gatekeeper waits here, the last test, the synthesis. Sloppy left a slime trail. The Memory Warlock forgot his own staff. Green Goblin dropped his pebbles. Connected Casper still wails about token bloat. Subagent Skeletor finally asked for help. Now: cross the chamber. Prove you carry all of it. End the cycle.",
  // Required-shape fallbacks (the battle replaces these for the encounter).
  prompt: '',
  choices: [{ id: 'noop', label: 'noop', correct: true }],
  passFeedback: '',
  failFeedback: '',
  lore: [
    {
      id: 'complexity-maxim',
      text: "**The One Rule That Governs Everything — Friction First, Automation Second**\n\n**The maxim**\n\nIf you remember one thing from the whole Quest, make it this: only add complexity when you feel friction, never before. Every other lesson — the modes, the contract, the hooks, the servers, the agents — sits underneath this single rule.\n\n**Start embarrassingly simple**\n\nBegin with plain prompts and a basic CLAUDE.md. That alone handles far more daily work than people expect. Then pay attention to where it actually hurts: the instruction you keep retyping, the workaround you keep reaching for, the manual step that grates every time. *That* specific, real, recurring pain is the only thing that earns a tool.\n\n**Every tool must pay its way**\n\nA hook, an MCP server, a skill, an agent, a plugin — each one is a liability until it solves a friction you genuinely have. Speculative complexity, the elaborate setup you build because it seems professional, is the cheapest way to slow yourself down. Even the people who build Claude Code run surprisingly minimal setups. Earn each piece.\n\n> Takeaway: Friction first, automation second, always. Start lean, add a tool only when a real, repeated pain demands it, and let every piece of your setup justify its existence.",
    },
    {
      id: 'the-loop',
      text: "**The Mental Model — Read, Plan, Review, Build, Ship Safely**\n\n**The shape of every good session**\n\nUnderneath all six levels is one repeatable loop, and the Gatekeeper is really testing whether it's become instinct. It runs: read before you touch anything, plan the approach, review that plan, then build, then ship — and at every step the permission mode matches the risk in front of you.\n\n**Why the order is the lesson**\n\nThe sequence is deliberate. Reading first means you act on what's actually there, not what you assumed. Planning before building means the plan becomes your first draft, where mistakes are cheap to fix. Reviewing the plan catches the wrong turn before a single file changes. Only then do you write. People who skip to writing pay for it on the back end, every time.\n\n**Shipping is a judgment call, not a reflex**\n\nThe final step carries its own discipline. Before anything leaves your hands, you ask whether it's confidential. A throwaway demo can go up as a quick preview link; anything carrying a client's data, name, or numbers gets packaged and sent through a secure channel like the sensitive document it is. Speed where it's safe, care where it counts.\n\n> Takeaway: Read, plan, review, build, ship — with the mode matched to the risk and the sharing matched to the sensitivity. That loop is the whole Quest in one breath.",
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
      // q1 — L1 permission modes
      {
        prompt: "You're opening a fresh client repo you've never seen. Which permission mode do you start in?",
        choices: [
          { id: 'a', label: 'auto', correct: false },
          { id: 'b', label: 'plan', correct: true },
          { id: 'c', label: 'acceptEdits', correct: false },
          { id: 'd', label: 'bypassPermissions', correct: false },
        ],
        passFeedback: 'HIT! Unknown code, read before you write. Plan mode reads and proposes without changing a thing.',
        failFeedback: 'MISS! auto and acceptEdits both change files. New repo plus unknown stakes equals plan mode first.',
      },
      // q2 — L2 CLAUDE.md ROI
      {
        prompt: "Your firm uses pnpm vitest and Claude keeps reaching for npm. The single highest-ROI place to fix it for good?",
        choices: [
          { id: 'a', label: 'Repeat it in every prompt', correct: false },
          { id: 'b', label: 'One line in `./CLAUDE.md`', correct: true },
          { id: 'c', label: 'A shell alias on your machine', correct: false },
          { id: 'd', label: 'A note in the README', correct: false },
        ],
        passFeedback: 'HIT! CLAUDE.md is the contract Claude reads every session, for every teammate. One line, countless turns saved.',
        failFeedback: "MISS! Repeating yourself doesn't scale and a README isn't loaded as instruction. Bake it into CLAUDE.md.",
      },
      // q3 — L3 hooks as guarantee
      {
        prompt: "Firm rule: lint MUST run before every commit, no exceptions. What actually GUARANTEES it?",
        choices: [
          { id: 'a', label: 'A note in CLAUDE.md', correct: false },
          { id: 'b', label: 'A `/commit` slash command', correct: false },
          { id: 'c', label: 'A PreToolUse hook on `Bash(git commit *)`', correct: true },
          { id: 'd', label: 'A code-reviewer subagent', correct: false },
        ],
        passFeedback: 'HIT! Hooks are law. The lint runs or the commit is blocked, every time, no judgment involved.',
        failFeedback: 'MISS! Advice can be skipped and a slash command only fires when you remember it. A guarantee needs a hook.',
      },
      // q4 — L4 MCP scoping
      {
        prompt: "Safe pattern to let Claude read client notes from Drive and post status to Slack?",
        choices: [
          { id: 'a', label: 'Two MCP servers, each with a tightly scoped token and narrow allow rules', correct: true },
          { id: 'b', label: 'One custom REST wrapper sharing an admin credential', correct: false },
          { id: 'c', label: 'WebFetch the Drive and Slack web UIs', correct: false },
          { id: 'd', label: 'A CLAUDE.md note asking Claude to be careful', correct: false },
        ],
        passFeedback: "HIT! Two scoped servers, least privilege, narrow rules. A server's reach is its token's reach, so keep both small.",
        failFeedback: 'MISS! A shared admin credential exposes everything. Two narrowly scoped servers are the safe pattern.',
      },
      // q5 — L1 carry-forward: confidential sharing
      {
        prompt: "You've built a client-confidential proposal full of their internal numbers. They want to review it by Friday. How does it reach them?",
        choices: [
          { id: 'a', label: 'Push it to a public hosting URL and send the link', correct: false },
          { id: 'b', label: 'Email them the raw source files', correct: false },
          { id: 'c', label: "Package it as a zip and share it through your firm's secure channel for confidential documents", correct: true },
          { id: 'd', label: 'Host it publicly behind a hard-to-guess URL', correct: false },
        ],
        passFeedback: 'HIT! Client-confidential never touches the open internet. Seal it and send it like any sensitive document.',
        failFeedback: 'MISS! A hidden URL is still public. Anything confidential ships as a secure package, not a live link.',
      },
      // q6 — L2 context management
      {
        prompt: "Three hours into a build, the context window is nearly full but you're close to done and want to keep the thread. Which command?",
        choices: [
          { id: 'a', label: '`/clear` to start fresh', correct: false },
          { id: 'b', label: '`/compact` to summarize the old turns and keep going', correct: true },
          { id: 'c', label: '`/init` to regenerate CLAUDE.md', correct: false },
          { id: 'd', label: 'Push on and hope it holds', correct: false },
        ],
        passFeedback: 'HIT! `/compact` frees the window without nuking the conversation. Same task, just out of room.',
        failFeedback: "MISS! `/clear` would wipe the thread you're trying to keep. `/compact` preserves and summarizes.",
      },
      // q7 — L5 routines
      {
        prompt: "Every Friday at 5pm: fetch the week's merged PRs, summarize them, post to #weekly-review, automatically. Right primitive?",
        choices: [
          { id: 'a', label: 'A foreground subagent you remember to spawn', correct: false },
          { id: 'b', label: 'A slash command you run by hand', correct: false },
          { id: 'c', label: 'A scheduled routine on Anthropic infra', correct: true },
          { id: 'd', label: 'A PostToolUse hook on every PR merge', correct: false },
        ],
        passFeedback: 'HIT! Recurring, autonomous, scheduled equals a routine. It runs with your laptop closed.',
        failFeedback: 'MISS! A subagent needs spawning and a hook fires on an event, not a clock. Scheduled work is a routine.',
      },
      // q8 — L5 parallel subagents
      {
        prompt: "You need to profile five competitors for a pitch, fast. Best move?",
        choices: [
          { id: 'a', label: 'Have the main agent work through them one by one', correct: false },
          { id: 'b', label: 'Spawn five Explore subagents in one message, run concurrently, orchestrator stitches the brief', correct: true },
          { id: 'c', label: 'Open five Claude sessions and tab between them', correct: false },
          { id: 'd', label: 'Profile one and skip the other four', correct: false },
        ],
        passFeedback: 'HIT! Subagents spawned together run in genuine parallel. Five at once, combined into one brief.',
        failFeedback: 'MISS! Sequential wastes the point. Spawn them in one message and let them run at the same time.',
      },
      // q9 — L3 advice/recipe/law mechanism match
      {
        prompt: "Three rules: a mild preference for British spelling, a detailed proposal-writing procedure, and an absolute ban on writing `.env` files. Correct home for each, in order?",
        choices: [
          { id: 'a', label: 'Hook, skill, CLAUDE.md', correct: false },
          { id: 'b', label: 'CLAUDE.md (advice), skill (recipe), hook (law)', correct: true },
          { id: 'c', label: 'CLAUDE.md, hook, skill', correct: false },
          { id: 'd', label: 'Skill, skill, skill', correct: false },
        ],
        passFeedback: 'HIT! Match the mechanism to the stakes. Preference is advice, procedure is a recipe, inviolable rule is law.',
        failFeedback: 'MISS! Advice for the preference, a skill for the procedure, a blocking hook for the ban. The strength of the rule picks the tool.',
      },
      // q10 — L6 friction-first maxim
      {
        prompt: "Fresh project, Claude Code just installed. Following the one rule that governs all of this, what do you build first?",
        choices: [
          { id: 'a', label: 'CLAUDE.md plus custom hooks plus four MCP servers plus a skill plus a reviewer agent plus a team plugin', correct: false },
          { id: 'b', label: 'Plain prompts and a basic CLAUDE.md, then add a tool only when you catch yourself repeating a workaround', correct: true },
          { id: 'c', label: 'Install the most popular team plugin you can find and inherit its whole stack', correct: false },
          { id: 'd', label: 'Skip CLAUDE.md, run `/init`, and accept whatever it generates as-is', correct: false },
        ],
        passFeedback: 'HIT! Friction first. Every hook, server, skill, agent, and plugin earns its place by solving a real, repeated pain.',
        failFeedback: 'MISS! Start lean. Even the people who built Claude Code run minimal setups. Speculative complexity only slows you down.',
      },
    ],
  },
};
