import type { LessonContent } from './types';

export const slashContent: LessonContent = {
  roomId: 'slash',
  intro: '[PLACEHOLDER] Welcome to the Registry, operator. Custom slash commands sleep in this archive — find the active terminal and prove you understand them.',
  prompt: '[PLACEHOLDER PROMPT] What is a custom slash command in Claude Code?',
  choices: [
    { id: 'a', label: 'A keyboard shortcut for navigation', correct: false },
    { id: 'b', label: 'A reusable, named prompt template you can summon by typing /name', correct: true },
    { id: 'c', label: 'A shell command that runs in the IDE terminal', correct: false },
    { id: 'd', label: 'A way to change Claude\'s system prompt globally', correct: false },
  ],
  passFeedback: '[PASS] Templates that earn their keep.',
  failFeedback: '[FAIL] Think reusable prompts, not shortcuts.',
  lore: [
    {
      id: 'command-sheet',
      text: '[PLACEHOLDER LORE] A slash command is a custom prompt. Write once, summon many times.',
    },
  ],
};
