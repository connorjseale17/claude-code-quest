import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — /effort: choose how much reasoning Claude applies, with the
 * chosen level able to persist as the default for new sessions.
 * Final room — door target routes to the TwicStampScreen via currentTrack.
 * Source: Anthropic "Introducing Claude Opus 4.8" (Effort Control) + Claude Code
 * CHANGELOG 2.1.162 ("`/effort` confirms when chosen level persists as default
 * for new sessions").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Room 3 — last beat of the issue. The Beat Reporter saved a quiet power tool for the finale: the `/effort` control. It's a dial for how hard Claude thinks about a response, and it can lock in as your default for new sessions. Read the two books on the desk for how the dial works and when a consultant turns it up or down, then settle with the wyrm in the doorway. Clear it and the issue stamp drops.",
  prompt:
    "Your teammate asks what the `/effort` control actually does. What's the accurate answer?",
  choices: [
    { id: 'a', label: 'It selects an effort level that sets how much reasoning Claude applies — higher levels trigger deeper reasoning — and the level can persist as your default for new sessions', correct: true },
    { id: 'b', label: 'It caps how many files Claude is allowed to edit in a single turn', correct: false },
    { id: 'c', label: 'It sets the permission mode that governs whether Claude can act without asking', correct: false },
    { id: 'd', label: 'It only changes output speed and has no effect on the depth of the answer', correct: false },
  ],
  passFeedback: 'HIT! `/effort` picks how much reasoning Claude puts into a response — higher means deeper thinking — and `/effort` confirms when the chosen level sticks as your default for new sessions.',
  failFeedback: "MISS! It's not an edit cap, not a permission mode, and not a cosmetic speed toggle. It's the reasoning-depth dial, and higher settings mean more thinking — re-read the books.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**The /effort Dial — Telling Claude How Hard to Think**

**One control, a spectrum of thinking**

Not every request deserves the same amount of deliberation. Renaming a variable and architecting a migration are not the same weight of problem, and spending maximum reasoning on the trivial one is just slower for no gain. The *Effort Control* that shipped with Claude Opus 4.8 makes that tradeoff explicit: you *select an effort level that determines how much effort Claude puts into a response*, and *higher settings trigger deeper reasoning*. In Claude Code you reach it with the \`/effort\` command.

**How you set it and how it sticks**

\`/effort\` lets you pick the level for your work, and it isn't just a one-shot. As of release 2.1.162, *\`/effort\` confirms when the chosen level persists as the default for new sessions* — so you can dial in a setting and have it carry forward, rather than re-choosing every time you start up. The heavy end of the range is where the most demanding work lives; the lighter end is for the quick, low-stakes turns where speed beats deliberation.

**Reasoning depth, not the other knobs**

It's easy to mistake \`/effort\` for a different control, so be precise about its lane. It is not the permission mode that decides *whether* Claude can act, and it is not an edit cap or a purely cosmetic speed toggle. It governs *how much thinking* goes into the answer. Turn it up and Claude reasons more deeply before it responds; turn it down and it moves faster on problems that don't need the extra deliberation.

> Takeaway: \`/effort\` is the reasoning-depth dial — pick how hard Claude thinks, and let the right setting persist as your default.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Spending Reasoning Wisely — The Consultant's Effort Budget**

**Effort is a budget, so spend it where it pays**

Think of reasoning depth the way you think of your own attention across a day: finite, and best spent on the problems that reward it. The hard architectural call, the gnarly bug, the migration plan a client will live with for years — those earn the heavy end of \`/effort\`. The routine renames, the boilerplate, the throwaway scaffolding — those don't, and burning maximum deliberation on them just costs you time. Matching the dial to the stakes is the whole skill.

**Set a sane default, then flex per task**

Because the chosen level can persist as your default, pick the setting that fits the *bulk* of your work and let it ride — for most consultants that's a solid middle gear. Then treat \`/effort\` as something you reach for deliberately: nudge it up before you ask Claude to reason through the one decision that really matters in the engagement, and ease it back down for the long tail of small edits afterward. The default carries the average; your hand on the dial handles the exceptions.

**A dial you can defend**

There's a quiet professional benefit to thinking in effort levels: it makes your process legible. When you can say "I ran the architecture review at high effort and the cleanup at a lighter one," you're describing a deliberate use of the tool, not a black box. On client work that kind of intentionality is part of the deliverable — it shows you matched the rigor to the risk instead of treating every task as identical.

> Takeaway: Treat \`/effort\` as a budget — heavy reasoning on the decisions that matter, a lighter touch on the routine, and a default that fits the middle.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `Help me set my /effort budget for this engagement.
Make my default a ____ level, since that fits most of the work.
When I'm about to ____, turn the effort up so you reason it through carefully.
When I'm just ____, ease it back down so we move fast.
Confirm whenever a level I pick will ____ for new sessions.`,
    blanks: [
      { id: 'default', suggestions: ['middle', 'balanced', 'moderate'] },
      { id: 'hard-task', suggestions: ['design the migration plan', 'debug the tricky failure', 'make an architecture call'] },
      { id: 'easy-task', suggestions: ['renaming variables', 'fixing typos', 'scaffolding boilerplate'] },
      { id: 'persist', suggestions: ['persist as my default', 'carry forward', 'stick going forward'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "The /effort control (Effort Control shipped with Opus 4.8) lets you select how much reasoning Claude applies to a response — higher levels trigger deeper reasoning, lighter levels move faster. As of Claude Code 2.1.162, /effort confirms when the chosen level persists as the default for new sessions, so a setting can carry forward. It's the reasoning-depth dial, not a permission mode, edit cap, or speed-only toggle. Treat effort as a budget: heavy reasoning on the decisions that matter, a lighter touch on the routine, and a sensible default for the middle.",
      beats: [
        { kind: 'say', text: "Last beat of the issue, and it's a quiet power tool: the `/effort` control. It came in with Opus 4.8's Effort Control — you select an effort level that determines how much effort Claude puts into a response, and higher settings trigger deeper reasoning." },
        { kind: 'say', text: "The mental model is a dial, not a switch. Renaming a variable and architecting a migration aren't the same weight of problem. Crank effort for the hard one; ease it down for the trivial one, where deep deliberation just costs you time for no gain." },
        { kind: 'say', text: "And it's not a one-shot. As of 2.1.162, `/effort` confirms when the level you pick *persists as the default for new sessions* — so you can dial in a setting and have it carry forward instead of re-choosing every startup." },
        {
          kind: 'choice',
          prompt: "Make sure you've got the lane right. Which of these is `/effort` controlling?",
          options: [
            { id: 'permission', label: 'Whether Claude is allowed to act without asking me', correct: false, reaction: "That's the permission mode — a different control entirely. `/effort` doesn't govern *whether* Claude acts; it governs how hard it thinks before it answers." },
            { id: 'reasoning', label: 'How much reasoning Claude puts into a response', correct: true, reaction: "Right. Higher effort means deeper reasoning, lower means a faster, lighter pass. That's the whole lane — depth of thinking." },
            { id: 'speed', label: 'Just the output speed, with no effect on the answer', correct: false, reaction: "Not quite — it's not cosmetic. Changing effort changes how deeply Claude reasons, which is exactly what shapes the answer, not just how fast it prints." },
          ],
        },
        { kind: 'say', text: "Consultant framing: treat effort like a budget. The hard architectural call, the gnarly bug, the plan a client lives with for years — those earn the heavy end. The boilerplate and the renames don't. Matching the dial to the stakes is the whole skill." },
        { kind: 'say', text: "Practically: set your default to whatever fits the *bulk* of your work — a solid middle gear for most people — and let it persist. Then nudge `/effort` up before the one decision that really matters, and ease it back for the long tail of small edits." },
        { kind: 'say', text: "There's a bonus: thinking in effort levels makes your process legible. 'Ran the architecture review at high effort, the cleanup at a lighter one' is a defensible, deliberate use of the tool. The books have the rest. Clear the door and the issue stamp is yours." },
      ],
    },
  },
  battle: {
    name: 'Cinder, the Half-Effort Wyrm',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*cracks one eye open, barely lifting its head* …a question? ugh… i'll give it the least possible thought and we both go home early…",
    tauntLines: [
      "*exhales a thin, lazy wisp of smoke* why think hard when a shrug usually passes…",
      "*overcorrects, breathing a wall of flame at a pebble* fine, MAXIMUM effort on the easiest thing — that's how it works, right…?",
    ],
    victoryLine: "*sits up, genuinely engaged for once* …oh. you actually matched the effort to the question… take the stamp, you've earned it…",
    questions: [
      {
        prompt:
          "Your teammate asks what the `/effort` control actually does. What's the accurate answer?",
        choices: [
          { id: 'a', label: 'It selects an effort level that sets how much reasoning Claude applies — higher levels trigger deeper reasoning — and the level can persist as your default for new sessions', correct: true },
          { id: 'b', label: 'It caps how many files Claude is allowed to edit in a single turn', correct: false },
          { id: 'c', label: 'It sets the permission mode that governs whether Claude can act without asking', correct: false },
          { id: 'd', label: 'It only changes output speed and has no effect on the depth of the answer', correct: false },
        ],
        passFeedback: 'HIT! `/effort` picks how much reasoning Claude puts into a response — higher means deeper thinking — and `/effort` confirms when the chosen level sticks as your default for new sessions.',
        failFeedback: "MISS! It's not an edit cap, not a permission mode, and not a cosmetic speed toggle. It's the reasoning-depth dial, and higher settings mean more thinking — re-read the books.",
      },
    ],
  },
};
