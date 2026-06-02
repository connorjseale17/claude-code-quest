import type { LessonContent } from './types';

/** Placeholder content for twic-2 (Feature B). Identical contract to twic-1. */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2. Feature B is on deck — same shape, different brief. Talk to the Beat Reporter, read the books, answer the door.",
  prompt: 'Placeholder challenge for twic-2.',
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
      id: 'twic-2-lore-a',
      text:
        "**Feature B — The Core Concept (Placeholder)**\n\n**What shipped**\n\nPlaceholder Book 1 for twic-2: the mechanics of the week's second feature.\n\n**Why it's here**\n\nBook 1 = what the feature is. Book 2 = when to reach for it.\n\n> Takeaway: This is Book 1 — the core mechanic. Replace with real content.",
    },
    {
      id: 'twic-2-lore-b',
      text:
        "**Feature B — Why It Matters (Placeholder)**\n\n**The consulting angle**\n\nPlaceholder Book 2 for twic-2: how a consultant would actually use Feature B.\n\n**How you'd apply it**\n\nReal generator output goes here.\n\n> Takeaway: This is Book 2 — the application. Replace with real content.",
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: 'Placeholder TWiC-2 practice template — apply Feature B to ____ inside ____ this ____.',
    blanks: [
      { id: 'task', suggestions: ['draft a memo', 'rewrite a deck', 'tidy a repo'] },
      { id: 'context', suggestions: ['the current engagement', 'an internal tool', 'a personal project'] },
      { id: 'cadence', suggestions: ['week', 'sprint', 'morning'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary: 'Placeholder NPC lesson for twic-2.',
      beats: [
        { kind: 'say', text: 'Feature B in one breath. (Placeholder.)' },
        { kind: 'say', text: 'Books on the desk fill in the rest.' },
      ],
    },
  },
  battle: {
    name: 'Door Challenge · Feature B',
    spriteKey: 'slime',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: '> The door waits. One question.',
    tauntLines: ['> Re-read and try again.'],
    victoryLine: '> The door opens. The key drops.',
    questions: [
      {
        prompt: 'Placeholder door question for twic-2.',
        choices: [
          { id: 'a', label: 'Placeholder A', correct: false },
          { id: 'b', label: 'Placeholder B (correct)', correct: true },
          { id: 'c', label: 'Placeholder C', correct: false },
          { id: 'd', label: 'Placeholder D', correct: false },
        ],
        passFeedback: 'HIT! Placeholder door pass.',
        failFeedback: 'MISS! Placeholder door fail.',
      },
    ],
  },
};
