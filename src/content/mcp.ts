import type { LessonContent } from './types';

export const mcpContent: LessonContent = {
  roomId: 'mcp',
  intro: 'The Hub. Where Claude reaches outside its walls — Slack, Drive, GitHub, your CRM, your warehouse — all through one protocol. Pick the right servers. Wire them up. Set your guardrails — or pay later.',
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
      text: 'MCP — Model Context Protocol — is an open standard. Anthropic ships it, OpenAI ships it, and any vendor can publish a compatible client.\n\nThe practical consequence is portability. Write a Slack MCP server once and Claude, GPT, Gemini, and anything that comes next can use it through the same shape.\n\nNo more rewriting integrations every time the AI vendor changes. The protocol IS the contract.',
    },
    {
      id: 'connection-log',
      text: 'Two transports. `stdio` runs the MCP server as a subprocess of Claude, communicating over standard input and output. Use it for anything local: filesystem, your shell tools, scripts on the same machine.\n\n`http` and `sse` connect over the network. Use them for SaaS: Slack, GitHub, your CRM, your data warehouse.\n\nPick by where the resource lives. Local file? stdio. Remote API? http or sse. Picking wrong adds latency you do not need.',
    },
    {
      id: 'rack-a',
      text: 'Every MCP server exposes three primitives. TOOLS are callable functions: post-to-slack, search-github, create-pull-request. The verbs.\n\nRESOURCES are readable data: a file, a doc, a record. Things Claude can pull in for context. PROMPTS are named templates the server hands Claude when invoked.\n\nThree shapes, every server you will ever touch. Memorize the triplet and the rest of MCP starts to make sense.',
    },
    {
      id: 'essential-stack',
      text: 'Four servers cover most daily work for a consulting team.\n\nGitHub MCP: read PRs, manage issues, push branches, open pull requests with bodies you actually want. Context7: pulls current library documentation into the conversation so Claude stops writing code against APIs deprecated two versions ago.\n\nPlaywright: browser automation. Navigate, click, fill, screenshot, verify the signup flow end-to-end. Filesystem: scoped file access outside the project directory, useful for cross-repo or shared-docs reads.\n\nStart with these four. Add by need.',
    },
    {
      id: 'mcp-mistake',
      text: 'The number one MCP mistake is installing every cool server you find. Each one dumps its tool definitions into the context window before you have typed a thing.\n\nThree servers can eat fifty thousand tokens just on tool descriptions. That is fifty thousand tokens fewer for your actual code, your actual conversation, your actual work.\n\nStart with two or three that match your real daily workflow. Add by need, not by FOMO. You can always add another later; you cannot easily get the context back.',
    },
    {
      id: 'rack-b',
      text: "A typical consulting-firm stack: GitHub + Context7 + Slack + Drive. Sometimes Notion or your CRM joins; rarely more than five servers total.\n\nScope every token tight. A Slack token that can post to one channel beats a token that can post anywhere. A Drive token scoped to one folder beats one scoped to the whole account.\n\nAuto-approve specific tools (`mcp__github__list_issues`, `mcp__slack__post_to_general`) in settings.json — never whole servers. The narrower the scope, the smaller the blast radius.",
    },
    {
      id: 'hooks-mcp-pair',
      text: 'Hooks pair with MCP using the same matcher logic as any other tool.\n\nA PostToolUse hook with matcher `Write(*.ts)` catches every TypeScript write — whether Claude edited the file directly or GitHub MCP synced one down. Same prettier run, same eslint --fix, no exceptions.\n\nA PreToolUse hook with matcher `mcp__github__create_pull_request` can block PR opens when tests are failing locally. The hook reads, decides, allows or blocks.\n\nMCP tool calls are just tool calls. Hooks treat them the same.',
    },
    {
      id: 'rack-c',
      text: 'Every MCP tool call returns exactly what the auth token can see. PII, contracts, internal docs, customer secrets — if the token has access, the tool has access, and the tool has access means Claude has access.\n\nDefault-deny in /permissions. Auto-approve narrow patterns explicitly, never whole servers. A `mcp__github__list_issues` allow rule is fine; a `mcp__github(*)` allow rule is a footgun.\n\nTreat each MCP server like a vendor, not a feature. Audit the source before adding. Rotate tokens. Assume least privilege.',
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
        'MCP = open protocol; write the integration once, every AI client speaks to it. Two transports (stdio for local, http/sse for remote). Three primitives (Tools/Resources/Prompts). Essential stack: GitHub/Context7/Playwright/Filesystem. #1 mistake is over-installing. Default-deny tokens. Hooks pair with MCP for deterministic enforcement.',
      beats: [
        {
          kind: 'say',
          text: "Quack. Welcome to the Hub. We trade in connections. Everything Claude reaches outside its own sandbox comes through this room.",
        },
        {
          kind: 'say',
          text: "MCP — Model Context Protocol. Open standard. Anthropic ships it, OpenAI ships it. Write the integration once, every AI client speaks to it. That's the whole point.",
        },
        {
          kind: 'say',
          text: "Two transports. `stdio` runs the server as a subprocess of Claude — good for local stuff: filesystem, shell tools, anything on the same machine. `http` and `sse` connect over the network — good for SaaS: Slack, GitHub, your CRM.",
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
          text: "Essential stack to start. GitHub MCP — read PRs, manage issues, push branches. Context7 — pulls current library docs so Claude stops writing against deprecated APIs. Playwright — browser automation, navigate / click / screenshot. Filesystem — scoped access outside the project. Four servers cover most daily work.",
        },
        {
          kind: 'say',
          text: "Now the #1 MCP mistake: installing every cool server you find. Each one dumps its tool definitions into the context window — three servers can eat 50k+ tokens before you've typed a thing. Start with 2-3 that match your daily workflow. Add by need, not by FOMO.",
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
          text: "Security. Every MCP tool call returns what the AUTH TOKEN can see. PII, contracts, secrets, all of it. If you scope the token to your whole Drive, Claude can read every client's whole engagement. Default-deny in /permissions. Auto-approve specific tools (`mcp__github__list_issues`) in settings.json, not whole servers.",
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
          text: "One more pattern: hooks pair with MCP. A PostToolUse hook on Write(*.ts) runs prettier after Claude or GitHub MCP edits a file. A PreToolUse hook on `mcp__github__create_pull_request` can block PR opens when tests are failing. Same matcher logic from the Registry — now applied to MCP tool calls.",
        },
        {
          kind: 'say',
          text: "Through the rack, into Integration. Connected Casper haunts that chamber — a ghost who saw too many MCP servers and snapped. Hates context bloat. Wails at unscoped tokens. Quack. Bring the key when you settle him down.",
        },
      ],
    },
  },
  battle: {
    name: 'Connected Casper',
    spriteKey: 'ghost',
    maxHP: 4,
    playerHP: 5,
    phases: 2,
    introLine: "*shimmers* …too many connections. too many servers. *floats* the context fills. the tokens burn. *wails* you bring MORE???",
    tauntLines: [
      "*wails* token bloat! token bloat! every server STEALS context!",
      "*flickers* you don't NEED Playwright! you don't NEED Filesystem!",
      "*shimmers* my chamber is QUIET. yours? CRAWLING with connections. *boo!*",
      "*moans* essential stack? PFAH. they're all unessential.",
    ],
    victoryLine: "*sighs* …okay… scoped tokens… narrow rules… maybe connection is… fine… *fades*",
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
        prompt: "What's the #1 MCP mistake?",
        choices: [
          { id: 'a', label: 'Using stdio for a remote SaaS server', correct: false },
          { id: 'b', label: 'Installing every cool MCP server you find — each one bloats the context window', correct: true },
          { id: 'c', label: 'Not auto-approving everything by default', correct: false },
          { id: 'd', label: 'Using the same token across multiple servers', correct: false },
        ],
        passFeedback: 'STRIKE! 50k+ tokens just on tool definitions with 3 servers. Start with 2-3 that match your workflow. Add by need.',
        failFeedback: 'MISS! Every server dumps its tool defs into context. Over-installing is the classic foot-gun. Start lean.',
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
        prompt: "You want auto-formatting to run after ANY .ts file write — whether Claude edited it or GitHub MCP did. Best mechanic?",
        choices: [
          { id: 'a', label: "CLAUDE.md rule 'always format after editing'", correct: false },
          { id: 'b', label: 'A PostToolUse hook with matcher Write(*.ts) running prettier', correct: true },
          { id: 'c', label: 'A /format slash command run manually after edits', correct: false },
          { id: 'd', label: 'A skill that auto-invokes on file write', correct: false },
        ],
        passFeedback: 'STRIKE! Hooks fire on the event, no matter the source. Write(*.ts) catches Claude AND MCP-driven writes. Deterministic format.',
        failFeedback: 'MISS! Advisory rules can be skipped. Hooks fire on the EVENT — every write, no exceptions. Same matcher pattern as the Registry.',
      },
    ],
  },
};
