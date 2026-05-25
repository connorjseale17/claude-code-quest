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
};
