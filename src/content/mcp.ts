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
  conversations: {
    'connector-bot': {
      summary:
        'MCP is an open protocol — write the integration once, every AI client speaks to it. Two transports (stdio for local, http/sse for remote). Each server exposes Tools (callable), Resources (readable), Prompts (templated). Default-deny in /permissions and scope every token tight.',
      beats: [
        {
          kind: 'say',
          text: "Quack. Welcome to the Hub, operator. We trade in connections. Everything Claude reaches outside its own sandbox comes through this room.",
        },
        {
          kind: 'say',
          text: "MCP — Model Context Protocol. Open standard. Lets any AI client talk to any tool through one shape. Anthropic ships it. So does OpenAI now. Write the integration once, every client speaks to it. That's the whole point.",
        },
        {
          kind: 'say',
          text: "Two transports. `stdio` runs the server as a subprocess of Claude — good for local stuff: filesystem, your shell tools, anything on the same machine. `http` and `sse` connect over the network — good for SaaS: Slack, GitHub, your CRM.",
        },
        {
          kind: 'choice',
          prompt:
            "You want Claude to read and write files in a specific folder on the consultant's laptop. Which transport?",
          options: [
            {
              id: 'stdio',
              label: 'stdio — runs the filesystem MCP as a subprocess',
              correct: true,
              reaction:
                'Right. Local file access means local subprocess. No HTTP roundtrip, no auth tokens flying around. Fast and simple.',
            },
            {
              id: 'http',
              label: 'http — hit a remote MCP server',
              correct: false,
              reaction:
                "Why network a local resource? The filesystem is right there. `stdio` is the right tool — direct subprocess, no overhead.",
            },
            {
              id: 'sse',
              label: 'sse — stream over server-sent events',
              correct: false,
              reaction:
                "SSE is for remote streaming. The file is on the same machine. `stdio` is the answer.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Every server exposes three primitives. TOOLS — callable functions (post-to-slack, search-github). RESOURCES — readable data (a file, a doc, a record). PROMPTS — named templates the server hands Claude. Three shapes, every server you'll ever touch.",
        },
        {
          kind: 'say',
          text: "Pattern for a consulting firm: GitHub MCP (search past work, reuse code). Slack MCP (post client status). Drive/Workspace MCP (read deliverable folders). Notion MCP (internal wikis). One `claude mcp add` per connection. Scope each one tight.",
        },
        {
          kind: 'blank',
          prompt: "Add the GitHub MCP for this project's scope, with a token from your env. Fill it in.",
          template:
            'claude mcp add ____ --scope ____ --env ____',
          blanks: [
            { id: 'server', suggestions: ['github', 'slack', 'gdrive', 'notion'] },
            { id: 'scope', suggestions: ['project', 'user', 'local'] },
            { id: 'env', suggestions: ['GITHUB_TOKEN=...', 'SLACK_TOKEN=...', 'GDRIVE_TOKEN=...'] },
          ],
          followup:
            "Scope matters. `project` ties it to this repo. `user` is your personal default across all projects. `local` is just-this-session. Pick the narrowest scope that does the job.",
        },
        {
          kind: 'say',
          text: "Now the part most people skip: security. Every MCP tool call returns what the AUTH TOKEN can see. PII, contracts, secrets, all of it. If you scope the token to your whole Drive, Claude can read every client's whole engagement. Default-deny in /permissions. Scope every server narrow.",
        },
        {
          kind: 'choice',
          prompt:
            "Engagement team wants Claude to read client notes from Drive AND post status updates to a private Slack channel. What's the safe shape?",
          options: [
            {
              id: 'two-scoped',
              label: 'Two MCP servers (Drive + Slack), each with scoped OAuth, plus permission rules narrowing exactly which folders and channels Claude can touch',
              correct: true,
              reaction:
                "Yes. Two servers, scoped auth, narrow rules. That's the safe pattern. Each server only sees what it needs.",
            },
            {
              id: 'custom-api',
              label: 'A custom REST API your team writes, wrapping both services with shared admin credentials',
              correct: false,
              reaction:
                "Why reinvent the protocol? MCP gives you this for free. And 'shared admin credentials' is a footgun — every tool call sees EVERYTHING.",
            },
            {
              id: 'webfetch',
              label: 'A subagent that uses WebFetch on the Drive and Slack web UIs',
              correct: false,
              reaction:
                "Scraping a logged-in UI is fragile, slow, and untracked. MCP is the right answer.",
            },
            {
              id: 'claudemd',
              label: "A CLAUDE.md entry saying 'use Slack and Drive politely'",
              correct: false,
              reaction:
                "Advisory rules don't grant access. Claude needs the actual MCP connection. CLAUDE.md doesn't authenticate to Slack.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Recap: MCP is the protocol. stdio for local, http/sse for remote. Tools / Resources / Prompts. Scope tight, default-deny, audit the source before adding. Treat every MCP server like a vendor, not a feature.",
        },
        {
          kind: 'say',
          text: "Through the rack, into Integration. VORTHEX THE DRAGON nests there — winged, scaled, breathes plasma at anyone who can't connect anything. Quack. Bring the key when his fire is out.",
        },
      ],
    },
  },
  battle: {
    name: 'VORTHEX',
    spriteKey: 'vorthex',
    maxHP: 4,
    playerHP: 5,
    phases: 2,
    introLine: "*wings flare* ALONE. WALLED. NEEDING NOTHING. you bring connections to my chamber, meatbag? *roars plasma*",
    tauntLines: [
      "*spits plasma* your wires shall MELT!",
      "*flaps* none shall reach the outside!",
      "VENDORS bring rot! be CONSUMED!",
      "*screech* every server is an INVASION!",
    ],
    victoryLine: "*folds wings* … perhaps… the protocol… is not the enemy… *fades*",
    questions: [
      {
        prompt: "You want Claude to read/write files in a folder on the consultant's laptop. Which MCP transport?",
        choices: [
          { id: 'a', label: 'stdio — runs the filesystem MCP as a subprocess', correct: true },
          { id: 'b', label: 'http — hit a remote MCP server', correct: false },
          { id: 'c', label: 'sse — stream over server-sent events', correct: false },
          { id: 'd', label: 'WebFetch on the file URL', correct: false },
        ],
        passFeedback: 'STRIKE! Local file = local subprocess. No network, no token, no overhead.',
        failFeedback: 'MISS! stdio for local, http/sse for remote. The filesystem is right there.',
      },
      {
        prompt: "MCP is an open standard. What does that mean in practice?",
        choices: [
          { id: 'a', label: "It's an Anthropic-only protocol", correct: false },
          { id: 'b', label: 'Write the integration once; every AI client speaks to it', correct: true },
          { id: 'c', label: 'Only works with stdio transport', correct: false },
          { id: 'd', label: 'It requires a paid Anthropic plan', correct: false },
        ],
        passFeedback: 'STRIKE! Anthropic ships it; so does OpenAI. One integration, many clients.',
        failFeedback: 'MISS! Open standard = portable. Write once, every AI client connects.',
      },
      {
        prompt: "Every MCP server exposes three primitives. Which is the right set?",
        choices: [
          { id: 'a', label: 'Tools, Resources, Prompts', correct: true },
          { id: 'b', label: 'Functions, Variables, Constants', correct: false },
          { id: 'c', label: 'Read, Write, Execute', correct: false },
          { id: 'd', label: 'Tokens, Keys, Secrets', correct: false },
        ],
        passFeedback: 'STRIKE! TOOLS (callable), RESOURCES (readable), PROMPTS (templated). Three shapes, every server.',
        failFeedback: 'MISS! The MCP primitives are Tools, Resources, Prompts. Memorize that triplet.',
      },
      {
        prompt: "Team wants Claude to read client notes from Drive AND post status to a private Slack channel. Safe shape?",
        choices: [
          { id: 'a', label: 'Two MCP servers (Drive + Slack), scoped OAuth + narrow permission rules', correct: true },
          { id: 'b', label: "Custom REST API wrapping both with shared admin credentials", correct: false },
          { id: 'c', label: 'Subagent using WebFetch on the Drive and Slack web UIs', correct: false },
          { id: 'd', label: "CLAUDE.md entry saying 'use Drive and Slack politely'", correct: false },
        ],
        passFeedback: 'STRIKE! Two servers, scoped auth, narrow rules. The safe pattern.',
        failFeedback: 'MISS! MCP solves this. Two scoped servers >> one wide-open custom wrapper.',
      },
      {
        prompt: "What's the security default for new MCP tools in `/permissions`?",
        choices: [
          { id: 'a', label: 'Allow everything by default', correct: false },
          { id: 'b', label: 'Default-deny; allow narrow patterns explicitly', correct: true },
          { id: 'c', label: 'Ask every time, no exceptions', correct: false },
          { id: 'd', label: "Whatever the server's manifest says", correct: false },
        ],
        passFeedback: 'STRIKE! Every tool call sees what the token sees. Default-deny, scope narrow.',
        failFeedback: 'MISS! Treat MCP servers like vendors. Default-deny is the only safe posture.',
      },
    ],
  },
};
