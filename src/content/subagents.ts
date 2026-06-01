import type { LessonContent } from './types';

export const subagentsContent: LessonContent = {
  roomId: 'subagents',
  intro: 'The Pool. Parallel agents — each in its own context, each with its own brief. Foreground for one-shots. Background for overnight. Routines for tomorrow morning. You are no longer alone.',
  prompt: "You want a Friday end-of-week routine: pull every PR merged this week, summarize each, post a digest to #weekly-review on Slack. Fires every Friday at 5pm without you touching it. What's the right Claude Code primitive for this?",
  choices: [
    { id: 'a', label: 'A foreground subagent you remember to spawn each Friday', correct: false },
    { id: 'b', label: 'A custom /weekly-digest slash command you run manually', correct: false },
    { id: 'c', label: 'A /loop scheduled routine running on Anthropic infrastructure, weekly cron', correct: true },
    { id: 'd', label: 'A PostToolUse hook that fires after every PR merge', correct: false },
  ],
  passFeedback: '[PASS] Routines for recurring. Subagents for one-shots. Hooks for events. Match the cadence to the primitive.',
  failFeedback: '[FAIL] You need it to fire on a schedule, automatically, with no human in the loop — that is a routine, not a subagent and not a hook.',
  lore: [
    {
      id: 'roster',
      text: 'A subagent gets a fresh context window. It cannot see your conversation, your scratch work, or what the main agent already knows about the codebase.\n\nBrief it like a stranger walking in cold on day one. Give it the goal, the constraints, the files it should read, the output shape you expect.\n\nVague briefs come back with vague results. Concrete briefs come back with what you actually wanted. The subagent has no priors; supply them.',
    },
    {
      id: 'agent-taxonomy',
      text: 'Four agent shapes show up in every well-run setup.\n\nORCHESTRATOR is the manager: takes a high-level goal, breaks it into subtasks, delegates to specialists, synthesizes the results. SPECIALIST is the SME — Code Reviewer, Test Writer, Security Auditor, deep in one domain.\n\nUTILITY is the swiss-army knife: routine tasks that do not need specialization — file organization, dependency bumps, commit-message writing. BACKGROUND is the monitor: runs continuously, watches conditions, alerts when something fires.\n\nPick the right shape for the role and the team runs itself.',
    },
    {
      id: 'mission-brief',
      text: 'Run /agents to see every running subagent at a glance — what each is doing, what it is waiting on, which ones have finished, which ones are blocked.\n\nSpawn multiple subagents in a single message and they run truly concurrent — not in turns, not on a queue. Five Explore subagents each chasing a different question return in parallel.\n\nWatch the panel, pull the results when they are ready. Concurrency is free; use it.',
    },
    {
      id: 'git-shared-vs-local',
      text: 'What goes in git is the team contract. CLAUDE.md, .claude/settings.json, .claude/rules/, .claude/skills/, .claude/agents/, and .mcp.json all live in the repository — every teammate inherits them.\n\nWhat stays local is your personal layer. .claude/settings.local.json is gitignored and holds your private overrides. ~/.claude/CLAUDE.md applies across every project you work on. Your tokens, your scratch notes, your .env files — never in git.\n\nThe shared layer scales the team. The local layer keeps you sane. Mixing them up is how secrets leak.',
    },
    {
      id: 'fragment-x',
      text: 'Subagents spawned in one message run truly concurrent. Five agents researching five competitors at once. Three agents auditing three different code paths in parallel.\n\nOne orchestrator collects the results and stitches them into a single brief. This is not pretend-concurrency on a queue; it is real parallel work happening at the same time.\n\nThroughput scales linearly with the number you spawn, up to the limit of what your token budget can comfortably support.',
    },
    {
      id: 'plugin',
      text: "Bundle your firm's whole Claude Code setup into a plugin — skills, agents, hooks, MCP configs, rules, all of it.\n\nPush the plugin to a GitHub repo. Teammates run `/plugin install github.com/your-org/firm-plugin` and the whole stack lights up in their project. One install, the entire library of moves is live.\n\nWhen you update the plugin, teammates run `/reload-plugins` and they get the latest. One source of truth. No drift. Same principle as a shared component library — and the same payoff.",
    },
    {
      id: 'fragment-y',
      text: 'Routines schedule agents to run on Anthropic infrastructure. Set up a /loop with a cron expression and Claude fires on its own schedule — your laptop can be closed, you can be at lunch, the work still happens.\n\nThe Agent SDK lets you go further. Trigger Claude Code from your own application. A Slack message arrives; your handler invokes Claude; Claude opens a PR; the link comes back as a reply.\n\nSlack message in, PR out, no human at the keyboard.',
    },
  ],
  practice: {
    id: 'orchestrator-practice',
    template: 'Use the Task tool with subagent_type=____ to:\n\n____\n\nContext the subagent needs (it cannot see this conversation):\n- ____\n- ____\n- ____\n\nOutput: ____\n\nRun in the background. Notify me when done.',
    blanks: [
      { id: 'agent-type', suggestions: ['general-purpose', 'Explore', 'Plan'] },
      { id: 'goal', suggestions: [
        'research every public case study Acme published in 2025–26',
        'audit our last 10 SOWs for scope-creep patterns',
        'map every Slack channel a client touches in our shared workspace',
      ]},
      { id: 'context-1', suggestions: ['link to the firm methodology doc', 'list of prior engagements with this client', 'the discovery-call transcript at ./notes/2026-05-01.md'] },
      { id: 'context-2', suggestions: ['the proposal template under ./templates/', 'the GitHub repo for the prototype', 'the Slack channel id #acme-internal'] },
      { id: 'context-3', suggestions: ['the relevant section of CLAUDE.md', 'past deliverables in Drive folder X', 'the firm style guide URL'] },
      { id: 'output', suggestions: [
        'a 1-page markdown summary with bullet citations',
        'a punch list of risks ranked by severity',
        'a draft SOW section ready for human edit',
      ]},
    ],
    prize: { id: 'orchestrator', label: 'ORCHESTRATOR' },
  },
  conversations: {
    'scout-bot': {
      summary:
        'Four agent shapes (Orchestrator/Specialist/Utility/Background). Spawn an Explore/Scout subagent for find-something-in-a-big-repo without burning main-agent context. Brief: what to find, what to return (paths + line numbers).',
      beats: [
        {
          kind: 'say',
          text: "I run the Explore lane. Read-only — I never touch anything.",
        },
        {
          kind: 'say',
          text: "Four agent shapes you'll see in here. ORCHESTRATOR (manager) — breaks a goal into pieces, delegates, synthesizes. SPECIALIST — deep on one domain (me, Planner, Reviewer, Debugger). UTILITY — general purpose, routine tasks. BACKGROUND — watches conditions, alerts when something fires.",
        },
        {
          kind: 'say',
          text: "Send me — a Specialist — into a 500-file repo with a fuzzy question. 'Find every place we touch client billing.' I come back with paths and line numbers. Your main agent keeps its context clean.",
        },
        {
          kind: 'choice',
          prompt:
            "Goal: 'find every place we touch client billing in this 500-file repo before we audit it.' Who do you assign?",
          options: [
            {
              id: 'scout',
              label: 'Scout / Explore subagent',
              correct: true,
              reaction:
                "Right. I do the search, return the locations, your main agent reads only what matters. No context bloat.",
            },
            {
              id: 'main',
              label: 'The main agent — let it grep around',
              correct: false,
              reaction:
                "Then the main agent's context fills with hundreds of irrelevant matches. By the time it's actually fixing things, it's lost the plot.",
            },
            {
              id: 'self',
              label: 'You — open the repo and grep yourself',
              correct: false,
              reaction:
                "Sure, lose the morning. Or send me. I do this in a minute. That's why I exist.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Send me into the dark. I come back with a map.",
        },
      ],
    },
    'planner-bot': {
      summary:
        'Spawn a Plan subagent before any non-trivial build. Brief: goal + constraints. Output: structured steps. Saves you the rewrite.',
      beats: [
        {
          kind: 'say',
          text: "I plan. Architecture, file structure, deliverable outlines. The boring-but-load-bearing part.",
        },
        {
          kind: 'say',
          text: "Hand me a goal and the constraints. I come back with steps. Use me before any non-trivial build — saves you the rewrite when the main agent dives in unprepared.",
        },
        {
          kind: 'choice',
          prompt:
            "Client wants a 6-page proposal dashboard with auth, by Friday. What's the first move?",
          options: [
            {
              id: 'plan',
              label: 'Spawn me with the goal + constraints, get a step-by-step plan',
              correct: true,
              reaction:
                "Yes. I'll come back with: routes, components, auth flow, deployment, what's stubbed vs real. Main agent executes my plan.",
            },
            {
              id: 'code',
              label: 'Start coding — figure out the architecture as you go',
              correct: false,
              reaction:
                "And on Thursday night you're rewriting the auth layer because routing got tangled. Plan first.",
            },
            {
              id: 'claudemd',
              label: 'Write a CLAUDE.md describing the dashboard',
              correct: false,
              reaction:
                "CLAUDE.md is the firm contract — rules Claude always follows. Not the plan for one specific build. Different tool.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Plan first. Saves you the rewrite.",
        },
      ],
    },
    'reviewer-bot': {
      summary:
        'Spawn a Reviewer subagent after a meaningful diff, before merge. Fresh context = catches what the writing agent missed. The team workflow: shared .claude/ in git, personal .local.json + ~/.claude/ stays out.',
      beats: [
        {
          kind: 'say',
          text: "Code reviewer here. Independent second-opinion energy. Fresh eyes — no conversation context.",
        },
        {
          kind: 'say',
          text: "The agent that wrote the code can't see what it missed. Bias of the author. I open the diff with zero priors. Different result every time.",
        },
        {
          kind: 'choice',
          prompt: "When should you spawn me?",
          options: [
            {
              id: 'before-merge',
              label: 'After a meaningful diff is ready, before merge',
              correct: true,
              reaction:
                "Right. I review the diff in isolation, hand back what's shaky. You merge or you iterate. Cheap insurance.",
            },
            {
              id: 'while-typing',
              label: 'Continuously, while the main agent is still writing',
              correct: false,
              reaction:
                "Wasted cycles. Reviewing half-done code is mostly noise. Wait for a coherent diff.",
            },
            {
              id: 'ci-failed',
              label: 'Only when CI fails',
              correct: false,
              reaction:
                "Too late by then. The whole point is to catch issues BEFORE they ship. Review the diff first, CI catches what slips past.",
            },
          ],
        },
        {
          kind: 'say',
          text: "One more thing while you're here — team workflow. What goes in git: CLAUDE.md, .claude/settings.json, .claude/rules/, .claude/skills/, .claude/agents/, .mcp.json. What stays local: .claude/settings.local.json, ~/.claude/, your tokens. Shared layer = team contract. Local = yours alone.",
        },
      ],
    },
    'debugger-bot': {
      summary:
        'Spawn a Debugger subagent with a repro + recent changes. Scientific method: hypothesize → instrument → verify. No band-aids. Flaky tests are real bugs. Plugins let you ship your whole agent fleet to teammates in one install.',
      beats: [
        {
          kind: 'say',
          text: "I chase bugs through stack traces. Scientific method only — hypothesize, instrument, verify.",
        },
        {
          kind: 'say',
          text: "Hand me a repro and recent changes. I come back with the root cause. No band-aids, no 'try restarting it.'",
        },
        {
          kind: 'choice',
          prompt:
            "A test is failing intermittently. Same code, same commit, sometimes pass, sometimes fail. What's the WRONG move?",
          options: [
            {
              id: 'rerun',
              label: "Rerun until it passes — blame flakiness, move on",
              correct: true,
              reaction:
                "Correct — that's the wrong move. Flaky tests are real bugs. Race condition, timing, shared state. The intermittent failure is the bug TELLING you something. Don't shrug it off.",
            },
            {
              id: 'debugger',
              label: 'Spawn me with the failing test + the repro',
              correct: false,
              reaction:
                "That's the RIGHT move, not the wrong one. Read the question again.",
            },
            {
              id: 'blame',
              label: 'Run git blame on the test file',
              correct: false,
              reaction:
                "Won't tell you why it's flaky. The history of the test doesn't reveal the race condition. You need actual debugging.",
            },
          ],
        },
        {
          kind: 'say',
          text: "A flaky test is a real bug — race, timing, shared state, hidden order dependency. Don't shrug it off. The bug is telling you the system has a soft spot.",
        },
        {
          kind: 'say',
          text: "Last thing: share your fleet. Bundle CLAUDE.md, skills, agents, hooks, MCP configs into a plugin. Push to a GitHub repo. Teammate runs `/plugin install github.com/your-org/firm-plugin` — whole stack lights up. Update once; everyone reloads. Same principle as a shared component library.",
        },
      ],
    },
  },
  battle: {
    name: 'Subagent Skeletor',
    spriteKey: 'skeleton',
    maxHP: 5,
    playerHP: 5,
    phases: 2,
    introLine: "*rattles ribcage* BEHOLD! one skeleton! NO subagents! NO plugins! ALL the work — MINE!",
    tauntLines: [
      "*bones clatter* delegation is for the WEAK!",
      "*hollow laugh* parallel agents? PFAH! me solo!",
      "*shrieks* no plugins! no SDK! everything by HAND!",
      "*skull glows* MY context window — overflowing with EVERYTHING!",
    ],
    victoryLine: "*sighs* …perhaps… a team… would have helped… *crumbles*",
    questions: [
      {
        prompt: "Goal: 'find every place we touch client billing in this 500-file repo.' Who do you assign?",
        choices: [
          { id: 'a', label: 'Scout / Explore subagent', correct: true },
          { id: 'b', label: 'The main agent — let it grep around', correct: false },
          { id: 'c', label: 'A Plan subagent', correct: false },
          { id: 'd', label: 'You, manually, in your editor', correct: false },
        ],
        passFeedback: 'STRIKE! Scout returns paths + line numbers. Main agent keeps its context clean.',
        failFeedback: 'MISS! Main agent would burn its context on hundreds of greps. Scout is the right tool.',
      },
      {
        prompt: "Client wants a 6-page proposal dashboard with auth, by Friday. First move?",
        choices: [
          { id: 'a', label: 'Spawn a Plan subagent with the goal + constraints', correct: true },
          { id: 'b', label: 'Start coding — figure out architecture as you go', correct: false },
          { id: 'c', label: 'Write a long CLAUDE.md describing the dashboard', correct: false },
          { id: 'd', label: 'Email the client for more requirements first', correct: false },
        ],
        passFeedback: 'STRIKE! Plan first. Routes, components, auth, deployment — then execute.',
        failFeedback: 'MISS! Coding first = Thursday-night rewrite. Plan first saves the engagement.',
      },
      {
        prompt: "You need an agent that watches the build logs for failures and pings you when something breaks. Which type?",
        choices: [
          { id: 'a', label: 'Orchestrator', correct: false },
          { id: 'b', label: 'Specialist', correct: false },
          { id: 'c', label: 'Utility', correct: false },
          { id: 'd', label: 'Background — runs continuously, alerts on trigger', correct: true },
        ],
        passFeedback: 'STRIKE! Background agents are the monitors. They sit, they watch, they fire on a condition.',
        failFeedback: 'MISS! Watch-for-a-trigger = Background. Orchestrators delegate; Specialists go deep; Utilities do routine; Background watches.',
      },
      {
        prompt: "Test fails intermittently — same code, same commit, sometimes pass. WRONG response?",
        choices: [
          { id: 'a', label: 'Rerun until it passes — blame flakiness', correct: true },
          { id: 'b', label: 'Spawn a Debugger with the failing test + repro', correct: false },
          { id: 'c', label: 'Add timing instrumentation and rerun', correct: false },
          { id: 'd', label: 'Check for shared state between tests', correct: false },
        ],
        passFeedback: 'STRIKE! Flakiness IS a real bug. Race condition, timing, shared state — debug it.',
        failFeedback: 'MISS! "Rerun until pass" hides the bug. Flaky = real bug telling you something.',
      },
      {
        prompt: "Your firm has 12 repos using the same Claude Code setup: shared CLAUDE.md rules, a style-check skill, a code-reviewer agent, format-on-save hooks. Most maintainable way to keep them all in sync?",
        choices: [
          { id: 'a', label: 'Copy the .claude/ directory into each repo and sync manually', correct: false },
          { id: 'b', label: 'Build a team plugin (skills + agents + hooks + rules), push to a GitHub repo, install with /plugin install', correct: true },
          { id: 'c', label: 'Put everything in ~/.claude/ so it applies everywhere automatically', correct: false },
          { id: 'd', label: 'Add a hook that pulls the configs from a central server on SessionStart', correct: false },
        ],
        passFeedback: 'STRIKE! Plugin = single source of truth. Update once, every project gets it with /reload-plugins. Same model as a shared component library.',
        failFeedback: 'MISS! Copying creates drift. ~/.claude/ is personal-only — teammates miss out. Plugins ship the whole stack to the whole team.',
      },
      {
        prompt: "You want a Friday EOW digest: pull merged PRs, summarize, post to #weekly-review. Auto-fires every Friday 5pm. Right primitive?",
        choices: [
          { id: 'a', label: 'A /loop scheduled routine on Anthropic infra, weekly cron', correct: true },
          { id: 'b', label: 'A foreground subagent you remember to spawn each Friday', correct: false },
          { id: 'c', label: 'A custom /weekly-digest slash command you run manually', correct: false },
          { id: 'd', label: 'A PostToolUse hook on every PR merge', correct: false },
        ],
        passFeedback: 'STRIKE! Routines for recurring. Subagents for one-shots. Hooks for events.',
        failFeedback: 'MISS! Schedule = routine. /loop runs on Anthropic infra; your laptop can be off.',
      },
    ],
  },
};
