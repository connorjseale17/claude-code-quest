import type { LessonContent } from './types';

/** twic-2 (Feature B) — Effort Control (`/effort`). Same contract as twic-1.
 *  Source: anthropic.com/news/claude-opus-4-8 ; Claude Code CHANGELOG 2.1.154. */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2. The story is Effort Control — a dial for how hard Claude thinks. Talk to the Beat Reporter, read the books, answer the door.",
  prompt:
    "You're cranking through routine, low-stakes edits and want speed without burning your rate limits. Which way do you set the effort control?",
  choices: [
    { id: 'a', label: 'Lower effort — Claude responds faster and uses up your rate limits more slowly', correct: true },
    { id: 'b', label: 'Higher effort — Claude thinks more deeply for a better answer', correct: false },
    { id: 'c', label: 'It only changes which model is selected, so leave it alone', correct: false },
    { id: 'd', label: "Turning it down disables Claude's thinking entirely", correct: false },
  ],
  passFeedback: 'HIT! Low effort = faster answers and slower rate-limit burn.',
  failFeedback: 'MISS! Higher effort is for hard work; for routine edits you dial DOWN. Re-read the books.',
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**Effort Control — The Mechanic**

**What shipped**
A new control that sits *alongside the model selector*. It lets you choose how much effort Claude puts into a response — separate from which model you've picked.

**Which way is which**
On *higher* effort, Claude thinks more frequently and more deeply for better responses. On *lower* effort, it responds faster and uses your rate limits more slowly. In Claude Code the slider reads *Faster ↔ Smarter*; set it with \`/effort\` (e.g. \`/effort xhigh\`).

> Takeaway: Effort is a thinking-depth dial that lives next to — not inside — the model picker.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Effort Control — Why It Matters**

**The consulting angle**
Opus 4.8 ships defaulted to *high* effort, so hard work gets deep thinking out of the box. The judgment call is when to move off the default.

**How you'd apply it**
Crank it up — \`/effort xhigh\` — for the genuinely hard bites: architecture, a gnarly bug, an ambiguous brief. Ease it down for the routine grind so you answer faster and stretch your rate limits across a longer day.

> Takeaway: High effort for the few hard calls; low effort for the many easy ones.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: 'For this ____ task, set effort to ____ because ____ matters more here.',
    blanks: [
      { id: 'task', suggestions: ['routine formatting', 'architecture review', 'tricky debugging'] },
      { id: 'level', suggestions: ['lower / faster', 'xhigh', 'high'] },
      { id: 'priority', suggestions: ['speed and rate limits', 'answer quality', 'depth of reasoning'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        'Effort Control (/effort): a dial alongside the model selector that sets how hard Claude thinks. Higher = deeper thinking, better answers. Lower = faster responses that burn rate limits more slowly. Opus 4.8 defaults to high.',
      beats: [
        { kind: 'say', text: "Story two: Effort Control. It's a dial that sits *alongside the model selector* — not the model itself — for how hard Claude thinks before it answers." },
        { kind: 'say', text: "Higher effort: Claude thinks more often and more deeply for a better response. Lower effort: it answers faster and burns your rate limits more slowly. The slider reads *Faster ↔ Smarter*; you set it with `/effort xhigh` and friends." },
        { kind: 'say', text: "Opus 4.8 already defaults to high, so you mostly decide when to move *off* the default. Crank it for the hard calls; ease it down for the routine grind. The door asks which way you turn it for routine work." },
      ],
    },
  },
  battle: {
    name: 'Door Challenge · Effort Control',
    spriteKey: 'slime',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: '> The door waits. One question.',
    tauntLines: ['> Re-read and try again.'],
    victoryLine: '> The door opens. The key drops.',
    questions: [
      {
        prompt:
          "You're cranking through routine, low-stakes edits and want speed without burning your rate limits. Which way do you set the effort control?",
        choices: [
          { id: 'a', label: 'Lower effort — Claude responds faster and uses up your rate limits more slowly', correct: true },
          { id: 'b', label: 'Higher effort — Claude thinks more deeply for a better answer', correct: false },
          { id: 'c', label: 'It only changes which model is selected, so leave it alone', correct: false },
          { id: 'd', label: "Turning it down disables Claude's thinking entirely", correct: false },
        ],
        passFeedback: 'HIT! Low effort = faster responses and slower rate-limit burn. Save deep thinking for the hard problems.',
        failFeedback: 'MISS! Higher effort is for difficult work; for routine edits you dial DOWN. The control sits alongside the model selector.',
      },
    ],
  },
};
