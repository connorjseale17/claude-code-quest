import type { LessonContent } from './types';

// This Week in Claude · Feature B — Effort Control (/effort)
// Source: anthropic.com/news/claude-opus-4-8 ; Claude Code CHANGELOG 2.1.154

export const twic2Content: LessonContent = {
  roomId: 'twic-2',
  intro:
    'New this week: Effort Control. Talk to the Dial-tender — he guards the slider that decides how hard Claude thinks before it answers. Read both books, then the boss tests whether you know which way to turn it.',
  prompt:
    "You're cranking through a batch of routine, low-stakes edits and you want speed without burning through your rate limits. Which way do you set the effort control?",
  choices: [
    { id: 'a', label: 'Lower effort — Claude responds faster and uses up your rate limits more slowly', correct: true },
    { id: 'b', label: 'Higher effort — Claude thinks more deeply for a better answer', correct: false },
    { id: 'c', label: 'It only changes which model is selected, so leave it alone', correct: false },
    { id: 'd', label: 'Turning it down disables Claude\'s thinking entirely', correct: false },
  ],
  passFeedback: '[PASS] Low effort = faster answers and slower rate-limit burn. Save the deep thinking for the hard problems.',
  failFeedback: '[FAIL] Higher effort is for difficult work. For routine tasks, dial DOWN for speed and to conserve rate limits.',
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**Effort Control — The Mechanic**

**What it is**
A new control that sits *alongside the model selector*. It lets you choose how much effort Claude puts into a response — separate from which model you've picked.

**Which way is which**
On *higher* effort, Claude thinks more frequently and more deeply to give better responses. On *lower* effort, Claude responds faster and uses up your rate limits more slowly. In Claude Code the slider reads *Faster ↔ Smarter*, and you can set it from the prompt with \`/effort\` (e.g. \`/effort xhigh\` for the hardest tasks).

> Takeaway: Effort is a thinking-depth dial that lives next to — not inside — the model picker.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Effort Control — Why It Matters**

**Match the dial to the stakes**
Opus 4.8 ships defaulted to *high* effort, so hard work gets deep thinking out of the box. The judgment call is when to move off the default.

**Consultant's play**
Crank it up — \`/effort xhigh\` — for the genuinely hard bites: architecture decisions, a gnarly bug, an ambiguous client brief. Ease it down for the routine grind: boilerplate, formatting passes, obvious edits — you get answers faster and stretch your rate limits across a longer day.

> Takeaway: High effort for the few hard calls; low effort for the many easy ones, to stay fast and frugal.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template:
      'For this ____ task, set effort to ____.\nReason: ____ matters more here than the opposite.\nKeep the model the same — I just want a different thinking depth.',
    blanks: [
      { id: 'task-kind', suggestions: ['architecture review', 'routine formatting', 'tricky debugging'] },
      { id: 'level', suggestions: ['xhigh', 'lower / faster', 'high'] },
      { id: 'priority', suggestions: ['answer quality', 'speed and rate limits', 'depth of reasoning'] },
    ],
    prize: { id: 'twic-2-prize', label: 'EFFORT DIALER' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        'Effort Control: a dial alongside the model selector that sets how hard Claude thinks. Higher = deeper thinking, better answers. Lower = faster responses that burn rate limits more slowly. Set it with /effort (e.g. /effort xhigh). Opus 4.8 defaults to high.',
      beats: [
        {
          kind: 'say',
          text: "Mind the slider. This week's feature is Effort Control — a way to tell Claude how hard to think before it answers.",
        },
        {
          kind: 'say',
          text: "It lives *alongside the model selector* — it's not the model itself. On higher effort, Claude thinks more often and more deeply for a better response. On lower effort, it answers faster and burns your rate limits more slowly.",
        },
        {
          kind: 'say',
          text: "In Claude Code the slider reads *Faster ↔ Smarter*, and you can set it from the prompt — `/effort xhigh` for the hardest tasks. Opus 4.8 already defaults to high effort, so you mostly decide when to move *off* that default.",
        },
        {
          kind: 'say',
          text: "Consultant move: crank it for the few hard calls — architecture, a nasty bug, a vague brief. Ease it down for the routine grind so you stay fast and stretch your rate limits. Same model, different depth. The boss will ask which way you turn it for routine work.",
        },
      ],
    },
  },
  battle: {
    name: 'Grist the Grinder',
    spriteKey: 'grist',
    maxHP: 3,
    playerHP: 5,
    phases: 1,
    introLine: "*grinds slowly* …max effort on everything… that's the only way… isn't it…?",
    tauntLines: [
      "*overthinks* why answer fast when you can answer SLOW!",
      "*burns rate limits* deeper! deeper! always deeper!",
      "*stalls* a simple edit deserves a thousand thoughts!",
    ],
    victoryLine: "*eases off* …oh… you can turn me DOWN… that's… efficient…",
    questions: [
      {
        prompt:
          "You're cranking through routine, low-stakes edits and want speed without burning your rate limits. Which way do you set the effort control?",
        choices: [
          { id: 'a', label: 'Lower effort — Claude responds faster and uses up your rate limits more slowly', correct: true },
          { id: 'b', label: 'Higher effort — Claude thinks more deeply for a better answer', correct: false },
          { id: 'c', label: 'It only changes which model is selected, so leave it alone', correct: false },
          { id: 'd', label: 'Turning it down disables Claude\'s thinking entirely', correct: false },
        ],
        passFeedback: 'STRIKE! Low effort = faster responses and slower rate-limit burn. Save the deep thinking for the hard problems.',
        failFeedback: 'MISS! Higher effort is for difficult work; for routine edits you dial DOWN. The control sits alongside the model selector — it does not swap models or switch off thinking.',
      },
    ],
  },
};
