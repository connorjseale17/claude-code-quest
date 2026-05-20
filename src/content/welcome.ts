import type { LessonContent } from './types';

export const welcomeContent: LessonContent = {
  roomId: 'welcome',
  intro: '[PLACEHOLDER] Welcome, operator. Walk around. Talk to anyone you find. Read everything. Then approach the glowing terminal.',
  prompt: '[PLACEHOLDER PROMPT] What\'s the first rule of working with Claude Code?',
  choices: [
    { id: 'a', label: 'Just vibe it', correct: false },
    { id: 'b', label: 'Read before you write', correct: true },
    { id: 'c', label: 'Delete node_modules and try again', correct: false },
  ],
  passFeedback: '[PASS] Nice. You\'re ready.',
  failFeedback: '[FAIL] Try again, operator.',
  lore: [
    {
      id: 'manual',
      text: '[PLACEHOLDER LORE] The manual reads: "If you\'re reading this, you\'ve already started. Good."',
    },
  ],
};
