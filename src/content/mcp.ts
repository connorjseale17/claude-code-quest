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
      text: 'Tip: MCP is an open standard. Write the integration once, every AI client speaks to it.',
    },
    {
      id: 'connection-log',
      text: 'Tip: `stdio` transport for local tools, `http`/`sse` for remote SaaS. Pick by where it lives.',
    },
    {
      id: 'rack-a',
      text: 'Tip: MCP servers expose TOOLS (callable), RESOURCES (readable), PROMPTS (templated).',
    },
    {
      id: 'rack-b',
      text: 'Tip: typical firm stack — GitHub MCP + Slack MCP + Drive MCP + Notion MCP. Scope each tight.',
    },
    {
      id: 'rack-c',
      text: 'Tip: every MCP tool call sees what the auth token sees. Default-deny, scope narrow.',
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
