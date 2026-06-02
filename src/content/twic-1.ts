import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — Dynamic Workflows (`/workflows`).
 * Source: anthropic.com/news/claude-opus-4-8 ; Claude Code CHANGELOG 2.1.154.
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown. The Beat Reporter has the story on Dynamic Workflows — talk to them, read the two pages on the desk, then the door asks one question.",
  prompt:
    'A client hands you a 300,000-line codebase and wants a framework migration this sprint. What does a dynamic workflow let Claude do that a single linear session cannot?',
  choices: [
    { id: 'a', label: 'Plan the work, then run tens-to-hundreds of parallel subagents in one session, verifying outputs before reporting back', correct: true },
    { id: 'b', label: 'Deploy the migrated code to multiple cloud providers at once', correct: false },
    { id: 'c', label: 'Edit protected files without asking for permission', correct: false },
    { id: 'd', label: 'Switch to a larger model halfway through a single response', correct: false },
  ],
  passFeedback: 'HIT! Plan once, fan out into a self-checking swarm, verify, report.',
  failFeedback: 'MISS! A dynamic workflow scales one session into parallel subagents under a single plan — re-read the books.',
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**Dynamic Workflows — The Mechanic**

**What shipped**
A research-preview capability where Claude *plans the work and then runs hundreds of parallel subagents in a single session*. With Opus 4.8, those agents can run for even longer before they wind down.

**How it runs**
You launch one with \`/workflows\`. Claude orchestrates tens to hundreds of *background* agents off a single plan — you don't hand-spawn each one — and verifies their outputs before reporting back.

> Takeaway: One plan, a self-checking swarm of subagents, all inside one session.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Dynamic Workflows — Why It Matters**

**The consulting angle**
Dynamic workflows are built for *large-scale* tasks — the headline example is a codebase migration across hundreds of thousands of lines, done in one sitting instead of babysat agent-by-agent.

**How you'd apply it**
When an engagement is *wide* rather than deep — a framework upgrade, a repo-wide rename, a doc-by-doc audit — describe the goal once and let the workflow fan out. You manage the plan, not the hundred hands.

> Takeaway: Reach for \`/workflows\` when the work is broad and repetitive at scale, not for a single tricky fix.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: 'Run a dynamic workflow to ____ across the ____, planning first then fanning out into parallel subagents, ____.',
    blanks: [
      { id: 'task', suggestions: ['migrate from Enzyme to RTL', 'rename the legacy API client', 'add type annotations'] },
      { id: 'scope', suggestions: ['Acme monorepo', 'client billing service', 'whole front-end'] },
      { id: 'check', suggestions: ['verifying each output before reporting back', 'and report a summary', 'opening a PR per package'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        'Dynamic Workflows (research preview, /workflows): Claude plans once, then runs tens-to-hundreds of parallel background subagents in a single session and verifies their output before reporting. Best for broad, large-scale work like codebase migrations.',
      beats: [
        { kind: 'say', text: "This week's lead story: Dynamic Workflows. The mechanic — Claude plans the work, then runs *hundreds of parallel subagents* in a single session. You kick it off with `/workflows`." },
        { kind: 'say', text: "You don't spawn each agent by hand. Claude orchestrates tens to hundreds of background agents off your one plan, and verifies their outputs before it reports back to you." },
        { kind: 'say', text: "Why it's news: this is for *large-scale* work — the example everyone cites is a codebase migration across hundreds of thousands of lines, done in one workflow instead of nursed agent-by-agent." },
        { kind: 'say', text: "Beat rule of thumb: reach for a workflow when the job is wide — a framework upgrade, a repo-wide rename, an audit. The books on the desk have the details; the door asks what a workflow actually buys you." },
      ],
    },
  },
  battle: {
    name: 'Door Challenge · Dynamic Workflows',
    spriteKey: 'slime',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: '> The door waits. One question stands between you and the next room.',
    tauntLines: ['> Try again. The brief is on the desk.'],
    victoryLine: '> The door opens. The key drops at your feet.',
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
        passFeedback: 'HIT! Plan once, fan out into a self-checking swarm, verify, report. That is the whole point of `/workflows`.',
        failFeedback: 'MISS! It scales a session into parallel subagents under one plan — not multi-cloud deploys, permissions, or mid-response model swaps.',
      },
    ],
  },
};
