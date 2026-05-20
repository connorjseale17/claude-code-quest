import type { LessonContent } from './types';

export const claudemdContent: LessonContent = {
  roomId: 'claudemd',
  intro: '[PLACEHOLDER] Room 2. Find the artifact. Answer the question. Keep moving.',
  prompt: '[PLACEHOLDER PROMPT] What is a CLAUDE.md file for?',
  choices: [
    { id: 'a', label: 'Storing API keys', correct: false },
    { id: 'b', label: 'Giving Claude project context and rules', correct: true },
    { id: 'c', label: 'A changelog', correct: false },
    { id: 'd', label: 'Decoration', correct: false },
  ],
  passFeedback: '[PASS] Context is everything.',
  failFeedback: '[FAIL] Not quite. Think about what Claude needs to know before it starts coding.',
  lore: [
    {
      id: 'old-note',
      text: '[PLACEHOLDER LORE] Scrawled on the note: "I once shipped without a CLAUDE.md. Never again."',
    },
  ],
};
