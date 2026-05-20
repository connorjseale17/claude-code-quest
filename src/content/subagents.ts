import type { LessonContent } from './types';

export const subagentsContent: LessonContent = {
  roomId: 'subagents',
  intro: '[PLACEHOLDER] The Mission Lobby is full of agents waiting for assignment. Subagents work in parallel — pick the correct mental model and seal the deal.',
  prompt: '[PLACEHOLDER PROMPT] When should you spawn a subagent via the Task tool?',
  choices: [
    { id: 'a', label: 'Always — it makes everything faster', correct: false },
    { id: 'b', label: 'For independent, well-scoped work you can hand off with a self-contained prompt', correct: true },
    { id: 'c', label: 'Only for security-sensitive actions', correct: false },
    { id: 'd', label: 'Never — subagents are a debugging tool only', correct: false },
  ],
  passFeedback: '[PASS] Delegate the parts, keep the plot.',
  failFeedback: '[FAIL] Think parallel branches with crisp briefs.',
  lore: [
    {
      id: 'briefing',
      text: '[PLACEHOLDER LORE] Subagents work in parallel. Dispatch wisely.',
    },
  ],
};
