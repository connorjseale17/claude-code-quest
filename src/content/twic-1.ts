import type { LessonContent } from './types';

/**
 * Placeholder content for twic-1 (Feature A). Fills every mount per the spec:
 *   intro, conversations[npcId], 2 lore items, practice, battle.
 * A later generator routine replaces these strings weekly; the field shapes
 * never change.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    'Room 1 of this week\'s rundown. The Beat Reporter has the brief — talk to them, then read the two pages on the desk. The door asks one question.',
  prompt: 'Placeholder challenge for twic-1.',
  choices: [
    { id: 'a', label: 'Placeholder A', correct: false },
    { id: 'b', label: 'Placeholder B', correct: true },
    { id: 'c', label: 'Placeholder C', correct: false },
    { id: 'd', label: 'Placeholder D', correct: false },
  ],
  passFeedback: 'HIT! Placeholder pass.',
  failFeedback: 'MISS! Placeholder fail.',
  lore: [
    {
      id: 'twic-1-lore-a',
      text:
        "**Feature A — The Core Concept (Placeholder)**\n\n**What shipped**\n\nThis is the placeholder Book 1 for twic-1: the core concept of the week's first feature. The generator routine will replace this text with a real two-page brief on what shipped and how it works.\n\n**Why it's here**\n\nBook 1 always answers \"what is this feature, mechanically.\" The next book answers why you'd reach for it. This split is permanent — every TWiC room has exactly these two books.\n\n> Takeaway: This is Book 1 — the core mechanic. Replace with real content.",
    },
    {
      id: 'twic-1-lore-b',
      text:
        "**Feature A — Why It Matters (Placeholder)**\n\n**The consulting angle**\n\nThis is the placeholder Book 2 for twic-1: why a consultant should care about Feature A. The generator routine fills this with a concrete application.\n\n**How you'd apply it**\n\nBook 2 always closes the loop with a real-world use: what changes about your week if you adopt this feature.\n\n> Takeaway: This is Book 2 — the application. Replace with real content.",
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: 'Placeholder TWiC-1 practice template — use the new feature to ____ for ____ in ____.',
    blanks: [
      { id: 'goal', suggestions: ['ship a preview', 'audit a doc', 'spin up a brief'] },
      { id: 'audience', suggestions: ['a client', 'the team', 'a prospect'] },
      { id: 'context', suggestions: ['under an hour', 'over coffee', 'before standup'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary: 'Placeholder NPC lesson for twic-1. Talk to the Beat Reporter to learn Feature A.',
      beats: [
        { kind: 'say', text: "Quick brief on this week's first feature. (Placeholder line — generator fills this in.)" },
        { kind: 'say', text: 'The two books on the desk go deeper. The door asks one question to confirm you read them.' },
      ],
    },
  },
  battle: {
    name: 'Door Challenge · Feature A',
    spriteKey: 'slime',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: '> The door waits. One question stands between you and the next room.',
    tauntLines: ['> Try again. The brief is on the desk.'],
    victoryLine: '> The door opens. The key drops at your feet.',
    questions: [
      {
        prompt: 'Placeholder door question for twic-1. Generator replaces this with the real check.',
        choices: [
          { id: 'a', label: 'Placeholder A', correct: false },
          { id: 'b', label: 'Placeholder B (correct)', correct: true },
          { id: 'c', label: 'Placeholder C', correct: false },
          { id: 'd', label: 'Placeholder D', correct: false },
        ],
        passFeedback: 'HIT! Placeholder door pass.',
        failFeedback: 'MISS! Placeholder door fail — re-read the books.',
      },
    ],
  },
};
