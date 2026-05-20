import type { LessonContent } from './types';

export const mcpContent: LessonContent = {
  roomId: 'mcp',
  intro: '[PLACEHOLDER] The Hub hums with external connections. MCP servers extend what Claude can reach — find the integration terminal and pick the right model of how they work.',
  prompt: '[PLACEHOLDER PROMPT] What does an MCP server give Claude Code?',
  choices: [
    { id: 'a', label: 'A second model to run prompts against', correct: false },
    { id: 'b', label: 'Access to external tools, data, and capabilities via a standardized protocol', correct: true },
    { id: 'c', label: 'A faster local cache for files', correct: false },
    { id: 'd', label: 'A login portal to other AI products', correct: false },
  ],
  passFeedback: '[PASS] Tools without walls.',
  failFeedback: '[FAIL] Think interoperability, not infrastructure.',
  lore: [
    {
      id: 'node',
      text: '[PLACEHOLDER LORE] MCP servers let Claude reach beyond its own walls.',
    },
  ],
};
