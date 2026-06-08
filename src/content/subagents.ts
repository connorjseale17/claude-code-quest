import type { LessonContent } from './types';

export const subagentsContent: LessonContent = {
  roomId: 'subagents',
  intro: 'The Pool. Parallel agents, each in its own context, each with its own brief. Foreground for one-shots. Background for overnight watches. Routines for tomorrow morning. You are no longer working alone.',
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
      text: "**Brief a Subagent Like a Stranger on Day One**\n\n**The one thing that trips people up**\n\nA subagent does not share your context. It gets a fresh, empty window, and it cannot see your conversation, your scratch work, or anything the main agent has already figured out about the codebase. It walks in cold. Forget this and you'll wonder why a capable agent produced nonsense — the answer is almost always that you briefed it as if it already knew things it couldn't possibly know.\n\n**Brief it like a new hire on their first morning**\n\nGive the subagent everything a stranger would need: the goal in plain terms, the constraints that matter, the specific files it should read, and the exact shape of output you expect back. Assume nothing carries over, because nothing does.\n\n**Vague in, vague out**\n\nA loose brief like \"look into the backend\" comes back meandering and useless. A tight brief — \"read `src/api/auth.ts`, list every place we touch billing, return file paths and line numbers\" — comes back with exactly what you wanted. The subagent has no priors, so you supply them.\n\n> Takeaway: A subagent starts from zero. Hand it the goal, the constraints, the files, and the output shape — the same way you'd brief someone who just walked in.",
    },
    {
      id: 'agent-taxonomy',
      text: "**The Four Agent Roles — Staffing a Workstream**\n\n**Agents are team roles, not magic**\n\nThe cleanest way to think about agents is as roles on a project team. Four shapes show up in every well-run setup, and picking the right one for the job is exactly like deciding who to staff on a piece of work.\n\n**Orchestrator and Specialist**\n\nThe ORCHESTRATOR is the manager: it takes a high-level goal, breaks it into workstreams, delegates each to the right agent, and synthesizes the results into one coherent output. It's how you'd scope and run a project. The SPECIALIST is the subject-matter expert, deep in one domain: a code reviewer, a test writer, a security auditor, a documentation writer. You call it in for exactly its expertise.\n\n**Utility and Background**\n\nThe UTILITY agent is the generalist for routine work that doesn't need an expert: file organization, dependency bumps, commit messages, changelogs. Important, but not specialist work. The BACKGROUND agent is the monitor: it runs continuously, watches for a specific condition, and alerts you only when something fires — a failing build, an error spike, a slow endpoint.\n\n> Takeaway: Orchestrator manages, Specialist goes deep, Utility handles routine, Background watches. Match the role to the task like staffing a team.",
    },
    {
      id: 'mission-brief',
      text: "**Spawn in Parallel — Concurrency Is Free**\n\n**Real parallel work, not turns**\n\nWhen you spawn several subagents in a single message, they run truly concurrently — at the same time, not one after another on a queue. Five agents researching five competitors at once. Three agents auditing three different code paths simultaneously. Each works in its own window and reports back when done.\n\n**Watch them from one place**\n\nRunning `/agents` shows every active subagent at a glance: what each is doing, what it's waiting on, which have finished, which are blocked. You don't lose track of the team — you supervise it from a single panel and pull each result as it lands.\n\n**The throughput math**\n\nSpawn five well-scoped agents and you get roughly five times the throughput, with the orchestrator stitching the pieces into one brief at the end. The main thing that bounds this is your token budget, since every agent runs its own context and makes its own calls. Concurrency is there for the taking, so take it — just spawn deliberately rather than flooding the pool.\n\n> Takeaway: Multiple subagents in one message run in genuine parallel. Supervise from `/agents`, pull results as they finish, and let the orchestrator combine them.",
    },
    {
      id: 'git-shared-vs-local',
      text: "**Shared vs Local — What Goes in Git, What Stays on Your Machine**\n\n**Two layers, and mixing them leaks secrets**\n\nYour Claude Code setup splits into a shared layer the whole team inherits and a personal layer that's yours alone. Knowing which is which is both a teamwork question and a security one, because putting the wrong thing in the shared layer is how credentials end up in a repo.\n\n**The shared layer is the team contract**\n\nWhat lives in git is what every teammate inherits: CLAUDE.md, the settings file, the rules folder, the skills folder, the agents folder, the MCP config. Anyone who clones the repo gets the same agents, the same skills, the same standards. That's how a setup scales across a team.\n\n**The personal layer keeps you sane and safe**\n\nWhat stays local is yours: your private settings overrides in the gitignored local settings file, your user-global preferences that follow you across projects, and crucially your tokens, your scratch notes, your env files. Those never, ever go in git. The shared layer scales the team; the personal layer protects you.\n\n> Takeaway: Agents, skills, rules, and configs are shared through git; tokens, personal overrides, and secrets stay local and gitignored. Don't cross the streams.",
    },
    {
      id: 'plugin',
      text: "**Plugins — Ship Your Whole Setup to the Whole Team**\n\n**The problem at firm scale**\n\nOnce your firm has many repos all wanting the same agents, skills, hooks, and rules, keeping them in sync by hand becomes a nightmare. Copy the setup into each repo and it immediately starts to drift — twelve slightly different versions of what was supposed to be one standard.\n\n**One bundle, one install**\n\nA plugin packages your entire Claude Code setup — skills, agents, hooks, MCP configs, rules — into a single installable bundle. Push it to a GitHub repo, and a teammate installs the whole stack into their project with one command. Every move your firm has bottled lights up at once, no manual copying.\n\n**One source of truth**\n\nWhen you improve the plugin, teammates pull the update with a single reload and they're current. The plugin becomes the firm's single source of truth for how Claude Code is configured — the same idea as a shared component library, and the same payoff: improve it once, everyone benefits, nothing drifts.\n\n> Takeaway: A plugin bundles your whole setup so a team installs it in one command and updates it in one more. Single source of truth, zero drift.",
    },
    {
      id: 'routines',
      text: "**Routines and the Agent SDK — Work That Happens Without You**\n\n**Put an agent on a schedule**\n\nA routine schedules an agent to run on Anthropic's infrastructure rather than your laptop. Set it on a recurring schedule and Claude fires on its own — your machine can be closed, you can be at lunch, and the work still happens. A Friday-afternoon digest, a nightly documentation check, a Monday-morning brief.\n\n**Pick the right primitive**\n\nThis is the distinction that matters: recurring, autonomous, scheduled work is a routine. A one-shot task you kick off and watch is a foreground subagent. An action that should fire on a specific event is a hook. Reaching for a subagent when you wanted a routine means you're the cron job, remembering to spawn it every Friday. Let the schedule do that.\n\n**Triggered from your own systems**\n\nThe Agent SDK goes further, letting your own applications trigger Claude Code. A Slack message arrives, your handler invokes Claude, Claude does the work and opens a PR, and the link comes back as a reply. Message in, deliverable out, nobody at the keyboard. That's the ceiling of what this level unlocks.\n\n> Takeaway: Recurring and scheduled means a routine on Anthropic infra; one-shot means a subagent; event-driven means a hook. Routines and the SDK let work happen while you're away.",
    },
  ],
  practice: {
    id: 'orchestrator-practice',
    template:
      "Spawn a subagent of type ____ to:\n\n____\n\nContext the subagent needs (remember: it cannot see this conversation):\n- ____\n- ____\n- ____\n\nOutput I want back: ____\n\nRun it in the background and notify me when it's done.",
    blanks: [
      // Scout-bot NPC: "I run the Explore lane." Lore ('agent-taxonomy'): Explore is the search/find
      // specialist. All three suggested goals (research, audit, map) are find-and-return tasks — the
      // canonical fit is Explore. 'general-purpose' is the Utility role (routine work, not deep search);
      // 'Plan' is for architecture/build planning, not for finding things.
      { id: 'agent-type', suggestions: ['Explore', 'general-purpose', 'Plan'], correctIndex: 0 },
      // Judgment call: each suggestion is a valid, specific, well-scoped goal for an Explore subagent.
      // The lesson is "name the goal in plain terms" (roster lore); any of the three demonstrates that.
      {
        id: 'goal',
        suggestions: [
          'research every public case study Acme published in 2025–26',
          'audit our last 10 SOWs for scope-creep patterns',
          'map every place this 500-file repo touches client billing',
        ],
      },
      // Judgment call: each suggestion is a concrete piece of context a subagent would need handed in
      // because it can't see this conversation. Drilling "name specific files/docs, don't assume shared
      // context" — all three pass that test.
      {
        id: 'context-1',
        suggestions: ['the firm methodology doc', 'the list of prior engagements with this client', 'the discovery-call transcript at ./notes/2026-05-01.md'],
      },
      // Judgment call: same reasoning as context-1 — three valid specific context items, any fits the
      // "brief like a stranger" rule.
      {
        id: 'context-2',
        suggestions: ['the proposal template under ./templates/', 'the prototype repo', 'the relevant CLAUDE.md section'],
      },
      // Judgment call: same reasoning — three valid specific context items.
      {
        id: 'context-3',
        suggestions: ['the firm style guide', 'past deliverables in the shared Drive folder', 'the file paths that matter'],
      },
      // Judgment call: each is a specific, well-shaped return artifact (the roster lore's "exact shape of
      // output you expect back"). All three demonstrate the lesson; the right one depends on the goal.
      {
        id: 'output',
        suggestions: ['a one-page markdown summary with cited bullets', 'a punch list of risks ranked by severity', 'file paths and line numbers'],
      },
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
        prompt: "Goal: \"find every place we touch client billing in this 500-file repo.\" Who do you assign?",
        choices: [
          { id: 'a', label: 'An Explore subagent — it searches and returns paths and line numbers', correct: true },
          { id: 'b', label: 'The main agent — let it grep around in your live session', correct: false },
          { id: 'c', label: 'A Plan subagent', correct: false },
          { id: 'd', label: 'Do it by hand in your editor', correct: false },
        ],
        passFeedback: 'HIT! The Explore agent does the hunting in its own context and reports back clean. Your main session stays uncluttered.',
        failFeedback: 'MISS! Letting the main agent grep hundreds of files burns your live context. Delegate the search to an Explore subagent.',
      },
      {
        prompt: "You need an agent that watches the build logs and pings you only when something breaks. Which of the four roles?",
        choices: [
          { id: 'a', label: 'Orchestrator', correct: false },
          { id: 'b', label: 'Specialist', correct: false },
          { id: 'c', label: 'Utility', correct: false },
          { id: 'd', label: 'Background — runs continuously and fires on a condition', correct: true },
        ],
        passFeedback: 'HIT! Background agents are the monitors. They sit, watch, and alert on a trigger. Orchestrators delegate, Specialists go deep, Utilities do routine work.',
        failFeedback: 'MISS! Watch-and-alert is the Background role. The other three act on demand; Background waits for a condition.',
      },
      {
        prompt: "You need to profile five competitors for a pitch, fast. Best move?",
        choices: [
          { id: 'a', label: 'Have the main agent research them one after another', correct: false },
          { id: 'b', label: 'Spawn five Explore subagents in one message — they run concurrently, the orchestrator stitches the brief', correct: true },
          { id: 'c', label: 'Open five Claude sessions and tab between them by hand', correct: false },
          { id: 'd', label: 'Pick the two most important and skip the rest', correct: false },
        ],
        passFeedback: 'HIT! Subagents spawned together run in genuine parallel. Five at once is roughly five times the throughput, combined into one brief.',
        failFeedback: 'MISS! Sequential wastes the best feature of the level. Spawn them in one message and let them run concurrently.',
      },
      {
        prompt: "You spawn a subagent with \"go work on the auth stuff\" and it comes back with something unusable. Most likely cause?",
        choices: [
          { id: 'a', label: "Subagents can't handle auth code", correct: false },
          { id: 'b', label: "The brief was too vague, and the subagent can't see your conversation, so it had no context to work from", correct: true },
          { id: 'c', label: "You needed a Specialist, and those don't exist", correct: false },
          { id: 'd', label: 'The orchestrator was offline', correct: false },
        ],
        passFeedback: "HIT! A subagent starts from zero context. \"Work on the auth stuff\" gives it nothing. Name the files, the goal, the constraints, the output.",
        failFeedback: "MISS! The agent can't see your session. A vague brief plus no shared context equals garbage out. Brief it like a stranger on day one.",
      },
      {
        prompt: "Your firm has 12 repos using the same setup: shared CLAUDE.md rules, a style-check skill, a code-reviewer agent, format-on-save hooks. Most maintainable way to keep them in sync?",
        choices: [
          { id: 'a', label: 'Copy the `.claude/` directory into each repo and sync by hand', correct: false },
          { id: 'b', label: 'Build a team plugin and install it across the repos, update it in one place', correct: true },
          { id: 'c', label: 'Put everything in `~/.claude/` so it applies everywhere automatically', correct: false },
          { id: 'd', label: 'Add a hook that pulls configs from a central server on session start', correct: false },
        ],
        passFeedback: 'HIT! A plugin is the single source of truth. Update once, every project pulls the latest. Same model as a shared component library.',
        failFeedback: 'MISS! Copying drifts. The user-global folder is personal only, so teammates miss out. A plugin ships the whole stack to the whole team.',
      },
      {
        prompt: "You want a Friday 5pm digest: pull the week's merged PRs, summarize, post to #weekly-review, automatically, every week. Right primitive?",
        choices: [
          { id: 'a', label: 'A scheduled routine on Anthropic infra, set to run weekly', correct: true },
          { id: 'b', label: 'A foreground subagent you remember to spawn each Friday', correct: false },
          { id: 'c', label: 'A `/weekly-digest` slash command you run by hand', correct: false },
          { id: 'd', label: 'A PostToolUse hook on every PR merge', correct: false },
        ],
        passFeedback: 'HIT! Recurring, autonomous, scheduled equals a routine. It runs on Anthropic infra with your laptop closed.',
        failFeedback: 'MISS! A subagent needs you to spawn it; a hook fires on an event, not a clock. Scheduled recurring work is a routine.',
      },
    ],
  },
};
