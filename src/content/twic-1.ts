import type { LessonContent } from './types';

// This Week in Claude · Feature A — Dynamic Workflows (/workflows)
// Source: anthropic.com/news/claude-opus-4-8 ; Claude Code CHANGELOG 2.1.154

export const twic1Content: LessonContent = {
  roomId: 'twic-1',
  intro:
    'New this week: Dynamic Workflows. Talk to Swarm-keeper — she runs the orchestration hall where one session quietly fans out into a hundred agents. Read both books, then the boss checks whether you know what a workflow actually buys you.',
  prompt:
    'A client hands you a 300,000-line codebase and wants a framework migration done this sprint. What does a dynamic workflow let Claude do that a single linear session cannot?',
  choices: [
    { id: 'a', label: 'Plan the work, then run tens-to-hundreds of parallel subagents in one session, verifying outputs before reporting back', correct: true },
    { id: 'b', label: 'Deploy the migrated code to multiple cloud providers at once', correct: false },
    { id: 'c', label: 'Edit protected files without asking for permission', correct: false },
    { id: 'd', label: 'Switch to a larger model halfway through a single response', correct: false },
  ],
  passFeedback: '[PASS] One session, one plan, a swarm of agents under it — and Claude checks their work before it hands you the result.',
  failFeedback: '[FAIL] A dynamic workflow is about scale: plan once, fan out into parallel subagents, verify, report. The other options are unrelated.',
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**Dynamic Workflows — The Mechanic**

**What it is**
A research-preview capability where Claude *plans the work and then runs hundreds of parallel subagents in a single session*. With Opus 4.8, those agents can run for even longer before they tire out.

**How it runs**
You launch one with \`/workflows\`. Claude orchestrates tens to hundreds of *background* agents off a single plan — you don't hand-spawn each one. Before it reports back, Claude verifies the agents' outputs.

> Takeaway: One plan, a self-checking swarm of subagents, all inside one session.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Dynamic Workflows — Why It Matters**

**The job it unlocks**
Dynamic workflows are built for *large-scale tasks* — the headline example is a codebase migration across hundreds of thousands of lines of code, done in one sitting instead of babysat agent-by-agent.

**Consultant's play**
When a client engagement is wide rather than deep — a framework upgrade, a rename across a sprawling repo, a doc-by-doc audit — describe the goal once and let the workflow fan out. You manage the *plan*, not the hundred hands carrying it out.

> Takeaway: Reach for \`/workflows\` when the work is broad and repetitive at scale, not when it's a single tricky fix.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template:
      'Run a dynamic workflow to ____ across the ____ codebase.\nPlan first, then fan out into parallel subagents.\nVerify each agent\'s output before reporting back to me.',
    blanks: [
      { id: 'task', suggestions: ['migrate from Enzyme to React Testing Library', 'rename the legacy API client', 'add type annotations'] },
      { id: 'scope', suggestions: ['Acme monorepo', 'client billing service', 'whole front-end'] },
    ],
    prize: { id: 'twic-1-prize', label: 'SWARM CONDUCTOR' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        'Dynamic Workflows (research preview): Claude plans once, then runs tens-to-hundreds of parallel background subagents in a single session and verifies their output before reporting. Launch with /workflows. Best for broad, large-scale work like codebase migrations.',
      beats: [
        {
          kind: 'say',
          text: "Welcome to the orchestration hall. This week's drop is Dynamic Workflows — and it changes how big a job you can take on in one sitting.",
        },
        {
          kind: 'say',
          text: "Here's the mechanic: Claude plans the work, then runs *hundreds of parallel subagents* in a single session. You launch it with `/workflows`. You don't spawn each agent by hand — Claude orchestrates tens to hundreds of background agents off your one plan.",
        },
        {
          kind: 'say',
          text: "And it doesn't just trust them. Before Claude reports back to you, it verifies the agents' outputs. With Opus 4.8 those agents can also run longer before they wind down.",
        },
        {
          kind: 'say',
          text: "Why you care: this is built for *large-scale* work. The example everyone quotes is a codebase migration across hundreds of thousands of lines — done in one workflow instead of nursed agent-by-agent.",
        },
        {
          kind: 'say',
          text: "Consultant rule of thumb: reach for a workflow when the job is *wide* — a framework upgrade, a repo-wide rename, an audit. For a single deep fix, a normal session is still your tool. Through the door, the boss will ask what a workflow actually buys you.",
        },
      ],
    },
  },
  battle: {
    name: 'Vorthex the Unbounded',
    spriteKey: 'vorthex',
    maxHP: 3,
    playerHP: 5,
    phases: 1,
    introLine: "*splits into a dozen flickering copies* …you think you can manage what I scatter across a hundred threads…?",
    tauntLines: [
      "*forks again* one of you against a hundred of me!",
      "*hums in parallel* you can't plan for a swarm!",
      "*scatters* too wide, too fast, little operator!",
    ],
    victoryLine: "*collapses back into one* …fine… you understood the plan beneath the swarm…",
    questions: [
      {
        prompt:
          'A client hands you a 300,000-line codebase and wants a framework migration this sprint. What does a dynamic workflow let Claude do that a single linear session cannot?',
        choices: [
          { id: 'a', label: 'Plan the work, then run tens-to-hundreds of parallel subagents in one session, verifying outputs before reporting back', correct: true },
          { id: 'b', label: 'Deploy the migrated code to multiple cloud providers at once', correct: false },
          { id: 'c', label: 'Edit protected files without asking for permission', correct: false },
          { id: 'd', label: 'Switch to a larger model halfway through a single response', correct: false },
        ],
        passFeedback: 'STRIKE! Plan once, fan out into a self-checking swarm, verify, report. That is the whole point of `/workflows`.',
        failFeedback: 'MISS! A dynamic workflow scales a session into parallel subagents under one plan — it has nothing to do with multi-cloud deploys, permissions, or mid-response model swaps.',
      },
    ],
  },
};
