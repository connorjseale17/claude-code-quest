import type { LessonContent } from './types';

export const mcpContent: LessonContent = {
  roomId: 'mcp',
  intro: 'Operator. The Hub is where Claude reaches outside its walls. Slack. Drive. CRM. Your data warehouse. All of it through one protocol. Pick a server. Wire it up. Set your guardrails — or pay later.',
  prompt: 'Your engagement team wants Claude to read client engagement notes from Google Drive and post status updates to a private Slack channel. Which combination of MCP picture makes this safe AND functional?',
  choices: [
    { id: 'a', label: 'Two MCP servers (Drive + Slack), each with scoped OAuth, plus permission rules narrowing exactly which folders and channels Claude can touch', correct: true },
    { id: 'b', label: 'A custom REST API your team writes, wrapping both services with shared admin credentials', correct: false },
    { id: 'c', label: 'A subagent that uses WebFetch on the Drive and Slack web UIs', correct: false },
    { id: 'd', label: "A CLAUDE.md entry saying 'use Slack and Drive politely'", correct: false },
  ],
  passFeedback: "[PASS] Two servers, scoped auth, narrow rules. That's the safe pattern.",
  failFeedback: '[FAIL] MCP is the answer — not custom HTTP, not subagents. And scope the auth — every tool call sees what the token sees.',
  lore: [
    {
      id: 'broadcast',
      text: 'MCP — Model Context Protocol. Open standard. Lets any AI client talk to any tool through one shape. Anthropic ships it. So does OpenAI now. Write the integration once, every client speaks to it.',
    },
    {
      id: 'connection-log',
      text: 'Two transports. `stdio` — runs as a subprocess of Claude, good for local stuff (filesystem, your shell tools). `http`/`sse` — runs as a server you connect to, good for SaaS (Slack, GitHub, your CRM).',
    },
    {
      id: 'rack-a',
      text: 'Three primitives per MCP server. TOOLS — functions Claude can call (post-to-slack, search-github). RESOURCES — read-only data Claude can pull (a file, a doc). PROMPTS — named templates the server hands Claude.',
    },
    {
      id: 'rack-b',
      text: 'Pattern for a firm: GitHub MCP (search past work, reuse code). Slack MCP (post client status updates). Drive/Workspace MCP (read deliverable folders). Notion MCP (internal wikis). One `claude mcp add` per connection, scope it tight.',
    },
    {
      id: 'rack-c',
      text: 'Every MCP tool call returns what the auth token can see — PII, contracts, secrets, all of it. Default-deny in /permissions. Audit the server source before adding. Treat MCP servers like vendors, not features. No keys to a server you found in a gist.',
    },
  ],
  practice: {
    id: 'integrations-engineer-practice',
    template: '# 1. Connect the server\nclaude mcp add ____ --scope ____ --env ____\n\n# 2. In .claude/settings.json:\n"permissions": {\n  "allow": [ "____" ],\n  "deny":  [ "____" ]\n}\n\n# 3. Verify\n/permissions\n/mcp',
    blanks: [
      { id: 'server', suggestions: ['github', 'slack', 'gdrive'] },
      { id: 'scope', suggestions: ['user', 'project', 'local'] },
      { id: 'env', suggestions: ['GITHUB_TOKEN=...', 'SLACK_TOKEN=...', 'GDRIVE_TOKEN=...'] },
      { id: 'allow-rule', suggestions: ['mcp__slack(post_to_#client-status)', 'mcp__github(search_code)', 'mcp__gdrive(read_folder)'] },
      { id: 'deny-rule', suggestions: ['mcp__slack(*)', 'mcp__github(*)', 'mcp__gdrive(*)'] },
    ],
    prize: { id: 'integrations-engineer', label: 'INTEGRATIONS ENGINEER' },
  },
};
