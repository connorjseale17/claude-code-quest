import type { LessonContent } from './types';

/** Placeholder content for twic-3 (Feature C). Final room — door target is
 *  `{kind:'end'}` which routes to the TwicStampScreen via currentTrack. */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Room 3 — last beat. Feature C wraps the issue. Same shape: NPC, two books, door question. Clear it and the stamp drops.",
  prompt: 'Placeholder challenge for twic-3.',
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
      id: 'twic-3-lore-a',
      text:
        "**Feature C — The Core Concept (Placeholder)**\n\n**What shipped**\n\nPlaceholder Book 1 for twic-3.\n\n**Why it's here**\n\nBook 1 = mechanics. Book 2 = application.\n\n> Takeaway: This is Book 1. Replace with real content.",
    },
    {
      id: 'twic-3-lore-b',
      text:
        "**Feature C — Why It Matters (Placeholder)**\n\n**The consulting angle**\n\nPlaceholder Book 2 for twic-3.\n\n**How you'd apply it**\n\nReal generator output goes here.\n\n> Takeaway: This is Book 2. Replace with real content.",
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: 'Placeholder TWiC-3 practice template — Feature C unlocks ____ for ____.',
    blanks: [
      { id: 'outcome', suggestions: ['a faster review', 'cleaner handoff', 'tighter brief'] },
      { id: 'audience', suggestions: ['the team', 'a client', 'yourself'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary: 'Placeholder NPC lesson for twic-3.',
      beats: [
        { kind: 'say', text: 'Last brief of the issue. (Placeholder.)' },
        { kind: 'say', text: 'Books on the desk close the loop.' },
      ],
    },
  },
  battle: {
    name: 'Door Challenge · Feature C',
    spriteKey: 'slime',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: '> The last door. One question. Then the stamp.',
    tauntLines: ['> Almost there. Re-read and try again.'],
    victoryLine: '> The door opens. The issue is complete.',
    questions: [
      {
        prompt: 'Placeholder door question for twic-3.',
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
