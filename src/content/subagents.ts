import type { LessonContent } from './types';

export const subagentsContent: LessonContent = {
  roomId: 'subagents',
  intro: 'Operator. Final level. The pool runs parallel agents — each in its own context, each with its own brief. Foreground for one-shots. Background for overnight. Routines for tomorrow morning. You are no longer alone.',
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
      text: 'Tip: a subagent gets a fresh context window — brief it like a stranger walking in cold.',
    },
    {
      id: 'mission-brief',
      text: 'Tip: /agents shows every running subagent at a glance — blocked, waiting, done.',
    },
    {
      id: 'fragment-x',
      text: 'Tip: spawn N subagents in one message — they run truly concurrent. 5× throughput on parallel briefs.',
    },
    {
      id: 'fragment-y',
      text: 'Tip: routines (/loop) schedule agents on Anthropic infra. Your laptop can be off.',
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
        'Spawn an Explore/Scout subagent when you need to find something in a big repo without burning the main agent\'s context. Brief: what to find, what to return (paths + line numbers).',
      beats: [
        {
          kind: 'say',
          text: "I run the Explore lane, operator. Read-only — I never touch anything.",
        },
        {
          kind: 'say',
          text: "Send me into a 500-file repo with a fuzzy question. 'Find every place we touch client billing.' I come back with paths and line numbers. Your main agent keeps its context clean.",
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
          text: "I plan, operator. Architecture, file structure, deliverable outlines. The boring-but-load-bearing part.",
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
        'Spawn a Reviewer subagent after a meaningful diff, before merge. Fresh context = catches what the writing agent missed.',
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
          text: "Hand me a diff. I tell you what's shaky. I see what your main agent missed.",
        },
      ],
    },
    'debugger-bot': {
      summary:
        'Spawn a Debugger subagent with a repro + recent changes. Scientific method: hypothesize → instrument → verify. No band-aids. Flaky tests are real bugs.',
      beats: [
        {
          kind: 'say',
          text: "I chase bugs through stack traces, operator. Scientific method only — hypothesize, instrument, verify.",
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
          text: "Repro in, root cause out. Don't bandage symptoms.",
        },
      ],
    },
  },
  battle: {
    name: 'THE LICH QUORUM',
    spriteKey: 'skeleton',
    maxHP: 5,
    playerHP: 5,
    phases: 2,
    introLine: "*three skulls hover* we are the unified one. we do every task ourselves. *jaws crack open* we have never delegated. we have never rested.",
    tauntLines: [
      "*hollow laugh* WE need no help!",
      "*skull rotates* parallel is for the WEAK!",
      "*aura crackles* we did it ALL OURSELVES!",
      "*shrieks* delegation is DEATH!",
    ],
    victoryLine: "…we… we could have… asked for help… *bones clatter to floor*",
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
        prompt: "When should you spawn a Reviewer subagent on your own diff?",
        choices: [
          { id: 'a', label: 'After a meaningful diff is ready, before merge', correct: true },
          { id: 'b', label: 'Continuously while the main agent is still writing', correct: false },
          { id: 'c', label: 'Only when CI fails', correct: false },
          { id: 'd', label: 'Never — the writing agent already reviewed', correct: false },
        ],
        passFeedback: 'STRIKE! Fresh context catches what the author missed. Cheap insurance.',
        failFeedback: 'MISS! The writing agent has author-bias. A fresh Reviewer is the point.',
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
