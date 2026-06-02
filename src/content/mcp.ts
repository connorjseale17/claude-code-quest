import type { LessonContent } from './types';

export const mcpContent: LessonContent = {
  roomId: 'mcp',
  intro: 'The Hub. Where Claude reaches outside its walls — Slack, Drive, GitHub, your CRM, your warehouse — all through one protocol. Pick the right servers. Wire them up. Set your guardrails, or pay later.',
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
      text: "**MCP — One Protocol to Connect Everything**\n\n**The mental model**\n\nMCP, the Model Context Protocol, is a standard the way HTTP or USB-C is a standard. An MCP server is an adapter that translates one specific service — GitHub, Slack, a database, your CRM — into a shape Claude Code can understand. Claude Code is the client that plugs into those adapters. That's the whole architecture.\n\n**The GPT Actions parallel**\n\nIf you built a GPT Action, you already get this. There, you wrote an OpenAPI schema yourself and pointed the GPT at an endpoint. MCP is the same idea with the hard part removed: someone wrote the adapter once, and you just point Claude at it in a config file. You configure a connection instead of authoring an integration.\n\n**Why \"open standard\" matters to you**\n\nBecause the protocol is open, the same MCP server works across every AI client that speaks it, not just Claude. Write or adopt a Slack server once and it keeps working even if your firm changes AI vendors next year. You're investing in a connection that outlives any one tool. The protocol is the contract.\n\n> Takeaway: MCP is the universal adapter between Claude and your tools. Configure the connection once; it's portable across clients and built by the community, not by you.",
    },
    {
      id: 'connection-log',
      text: "**Local or Remote — Picking the Right Transport**\n\n**Two ways a server connects**\n\nAn MCP server reaches Claude over one of two transports, and which one you use depends entirely on where the thing it connects to actually lives. Get this right and connections are fast; get it wrong and you add latency for no reason.\n\n**`stdio`: for anything local**\n\nThe `stdio` transport runs the MCP server as a subprocess right on your machine, talking to Claude over standard input and output. Use it for local resources: the filesystem, your shell tools, scripts on the same computer. No network, no token, no round-trip.\n\n**`http` and `sse`: for anything remote**\n\nThe `http` and `sse` transports connect over the network. Use them for software-as-a-service: Slack, GitHub, your CRM, your data warehouse — anything that lives on someone else's servers and answers over the internet.\n\n> Takeaway: Local resource — use `stdio`. Remote API — use `http` or `sse`. Match the transport to where the data lives.",
    },
    {
      id: 'rack-a',
      text: "**Tools, Resources, Prompts — The Three Things Every Server Exposes**\n\n**One triplet, every server**\n\nHowever complex an MCP server looks, it offers Claude exactly three kinds of thing. Learn this triplet and every server you ever touch suddenly makes sense, because they're all built from the same three parts.\n\n**The three primitives**\n\nTOOLS are callable functions — the verbs: `post-to-slack`, `search-github`, `create-pull-request`. They *do* something. RESOURCES are readable data: a file, a doc, a database record — things Claude can pull in as context. PROMPTS are named templates the server hands Claude when invoked, pre-written instructions for a common task.\n\n**Why it helps to know this**\n\nWhen you add a new server and wonder what it can do, you're really asking three questions: what can it do (tools), what can it read (resources), and what templates does it offer (prompts). The triplet is the map for reading any server's capabilities at a glance.\n\n> Takeaway: Every MCP server is tools (verbs), resources (readable data), and prompts (templates). Memorize the triplet and MCP stops being mysterious.",
    },
    {
      id: 'essential-stack',
      text: "**The Starter Stack — Four Servers That Cover Most Work**\n\n**Don't boil the ocean, start here**\n\nA consulting team gets most of its daily value from a small handful of servers. Rather than browse a catalog, start with these four and add only when a real need shows up.\n\n**The four**\n\nGitHub MCP handles the git workflow: read and open pull requests, manage issues, push branches. Context7 pulls a library's current documentation into the conversation, which stops Claude writing code against an API that changed two versions ago. Playwright drives a real browser — navigate, click, fill a form, screenshot — useful for verifying a flow end to end. Filesystem gives scoped access to files outside the project folder, handy for shared docs in another repo.\n\n**The principle underneath**\n\nEach of these maps to a concrete, frequent task. That's the test for adding any server: does it match something you actually do most weeks? If not, it waits.\n\n> Takeaway: GitHub, Context7, Playwright, Filesystem cover most consulting work. Add a fifth server only when a real, recurring need appears.",
    },
    {
      id: 'mcp-mistake',
      text: "**The #1 MCP Mistake — Installing Everything**\n\n**The trap**\n\nThe most common MCP mistake is collecting servers like trophies — installing every interesting one you stumble across. It feels like building capability. It's actually quietly taxing every session you run.\n\n**The hidden cost**\n\nEach connected server dumps its tool definitions into Claude's context window before you've typed a single word. A few servers can consume tens of thousands of tokens just describing what they *could* do. That's context taken away from your actual code, your actual conversation, your actual work — and it slows startup too.\n\n**The discipline**\n\nStart with two or three servers that match your real workflow. Add by need, never by fear of missing out. Adding a server later is trivial; clawing back a bloated, sluggish context mid-engagement is not. (Newer tool-search features lazy-load definitions to ease this, but lean-by-default is still the right habit.)\n\n> Takeaway: More servers is not more power — it's more overhead. Run the few you actually use and add deliberately.",
    },
    {
      id: 'rack-b',
      text: "**Scope Every Token Tight**\n\n**A realistic firm stack**\n\nA typical consulting setup is something like GitHub, Context7, Slack, and Drive — occasionally Notion or a CRM, rarely more than five servers total. But the number of servers matters less than how tightly each one is scoped.\n\n**Narrow beats broad, every time**\n\nA Slack token that can post to one channel is far safer than one that can post anywhere. A Drive token scoped to a single client folder beats one with run of the whole account. The scope of the token is the scope of the damage if anything goes wrong, so make it as small as the job allows.\n\n**Auto-approve tools, never servers**\n\nYou can auto-approve specific MCP tools so Claude doesn't prompt every time — things like `mcp__github__list_issues` or a single Slack post action. Approve named tools, never a whole server. The narrower the allow rule, the smaller the blast radius.\n\n> Takeaway: Least privilege applies to every token and every allow rule. Scope to the one channel, the one folder, the one action — never the whole account.",
    },
    {
      id: 'rack-c',
      text: "**Treat Every Server Like a Vendor, Not a Feature**\n\n**The thing to internalize about MCP and client data**\n\nThis is the most important page in the level for a consultant. An MCP tool call returns exactly what its auth token can see — no more, no less. If the token can reach client PII, contracts, internal docs, or customer secrets, then the tool can, and that means Claude can. Connecting a server is granting access, full stop.\n\n**Default-deny, approve narrowly**\n\nSet your permissions to deny by default and approve specific, narrow patterns explicitly. An allow rule for `mcp__github__list_issues` is reasonable. An allow rule for the whole GitHub server is a footgun that hands over everything the token can touch. Be specific or be exposed.\n\n**The vendor mindset**\n\nBefore you add a server, treat it the way procurement treats a new vendor: check the source, understand what it can reach, rotate the credentials, assume least privilege. A careless MCP server on a client engagement is a data-handling incident waiting to happen — the same risk we covered with confidential deliverables, in a new disguise.\n\n> Takeaway: A server's reach equals its token's reach. Default-deny, approve narrow named tools, audit the source, and treat every server like a vendor you're vetting.",
    },
    {
      id: 'hooks-mcp-pair',
      text: "**MCP Calls Are Just Tool Calls — So Hooks Catch Them Too**\n\n**The connection back to Level 3**\n\nHere's a detail that ties MCP to the hooks you already met: as far as Claude Code is concerned, an MCP tool call is just another tool call. That means the same hook machinery, the same matchers, applies to MCP actions exactly as it does to Claude's own edits.\n\n**Catching writes from any source**\n\nA PostToolUse hook with matcher `Write(*.ts)` runs your formatter on every TypeScript file write — whether Claude edited the file directly or GitHub MCP synced one down from the repo. Same formatter, same result, regardless of how the file got written. The hook doesn't care about the source, only the event.\n\n**Gating MCP actions**\n\nYou can also gate the MCP calls themselves. A PreToolUse hook matching `mcp__github__create_pull_request` can block a PR from opening while local tests are failing. The hook reads the situation and allows or blocks — the same law-not-advice enforcement you'd apply to any other action.\n\n> Takeaway: MCP tool calls obey the same hooks as everything else. Use PostToolUse to clean up after MCP-driven writes and PreToolUse to gate risky MCP actions.",
    },
  ],
  practice: {
    id: 'integrations-engineer-practice',
    template:
      '# 1. Connect the server\nclaude mcp add ____ --scope ____ --env ____\n\n# 2. In .claude/settings.json, default-deny then allow narrowly:\n"permissions": {\n  "allow": [ "____" ],\n  "deny":  [ "____" ]\n}\n\n# 3. Verify the wiring and the guardrails\n/mcp\n/permissions',
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
        prompt: "You want Claude to read and write files in a folder on the consultant's own laptop. Which MCP transport?",
        choices: [
          { id: 'a', label: 'stdio — run the filesystem server as a local subprocess', correct: true },
          { id: 'b', label: 'http — hit a remote MCP server', correct: false },
          { id: 'c', label: 'sse — stream over server-sent events', correct: false },
          { id: 'd', label: "WebFetch the file's URL", correct: false },
        ],
        passFeedback: 'HIT! Local resource, local subprocess. No network, no token, no overhead.',
        failFeedback: 'MISS! stdio for local, http or sse for remote. The files are right there on the machine.',
      },
      {
        prompt: "MCP is an open standard. What's the practical payoff for a firm?",
        choices: [
          { id: 'a', label: 'It locks you into one AI vendor', correct: false },
          { id: 'b', label: 'Adopt a server once and any MCP-speaking client can use it, even if you switch AI tools later', correct: true },
          { id: 'c', label: 'It only works over the stdio transport', correct: false },
          { id: 'd', label: 'It requires a paid plan to connect anything', correct: false },
        ],
        passFeedback: 'HIT! Open standard means portable. The integration outlives any single AI vendor choice.',
        failFeedback: 'MISS! Open standard equals portability. One server, many clients, no rewrite when the tooling changes.',
      },
      {
        prompt: "A new MCP server lists `post_message`, a readable `#general` channel history, and a \"weekly-update\" template. Which primitives are those, in order?",
        choices: [
          { id: 'a', label: 'Resource, tool, prompt', correct: false },
          { id: 'b', label: 'Tool, resource, prompt', correct: true },
          { id: 'c', label: 'Prompt, tool, resource', correct: false },
          { id: 'd', label: "They're all tools", correct: false },
        ],
        passFeedback: 'HIT! `post_message` is a tool (a verb), the channel history is a resource (readable data), the template is a prompt. The triplet, every server.',
        failFeedback: 'MISS! Tools are verbs, resources are readable data, prompts are templates. `post_message` acts, history is read, the template is a prompt.',
      },
      {
        prompt: "Your team wants Claude to read client notes from Drive AND post status to a private Slack channel. Safest shape?",
        choices: [
          { id: 'a', label: 'Two MCP servers, each with a tightly scoped token and narrow allow rules', correct: true },
          { id: 'b', label: 'One custom REST wrapper using a shared admin credential for both', correct: false },
          { id: 'c', label: 'A subagent that WebFetches the Drive and Slack web UIs', correct: false },
          { id: 'd', label: 'A CLAUDE.md note asking Claude to use Drive and Slack carefully', correct: false },
        ],
        passFeedback: 'HIT! Two scoped servers, narrow rules, least privilege. The token scoped to one folder and one channel is the safe pattern.',
        failFeedback: 'MISS! A shared admin credential hands over everything. Two narrowly scoped servers beat one wide-open wrapper.',
      },
      {
        prompt: "You add a GitHub MCP server with a token that has full org access, then allow the whole server in permissions. A consultant asks Claude an innocent question. What's the real exposure?",
        choices: [
          { id: 'a', label: 'None — Claude only sees what you explicitly paste', correct: false },
          { id: 'b', label: 'Only the current repo is reachable', correct: false },
          { id: 'c', label: 'Anything the token can reach across the whole org is now reachable by the tool, and therefore by Claude', correct: true },
          { id: 'd', label: "The token's scope doesn't affect what Claude can see", correct: false },
        ],
        passFeedback: "HIT! A server's reach equals its token's reach. Wide token plus whole-server allow equals the whole org exposed. Scope down and default-deny.",
        failFeedback: 'MISS! The tool can see everything the token can. Broad token plus broad allow rule means broad exposure. Least privilege, always.',
      },
      {
        prompt: "You want auto-formatting to run after ANY `.ts` write, whether Claude edited the file or GitHub MCP synced it down. Best mechanism?",
        choices: [
          { id: 'a', label: "A CLAUDE.md rule saying \"always format after editing\"", correct: false },
          { id: 'b', label: 'A PostToolUse hook with matcher `Write(*.ts)` running the formatter', correct: true },
          { id: 'c', label: 'A `/format` slash command you run by hand afterward', correct: false },
          { id: 'd', label: 'A skill set to auto-invoke on file writes', correct: false },
        ],
        passFeedback: 'HIT! MCP calls are just tool calls. The `Write(*.ts)` hook fires on the event no matter who triggered it. Deterministic formatting from any source.',
        failFeedback: "MISS! Advice can be skipped. The hook fires on the write event itself, catching Claude's edits and MCP-driven ones alike.",
      },
    ],
  },
};
