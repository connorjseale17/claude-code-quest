import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — Glob patterns in permission deny rules: a single wildcard
 * in the tool-name position of a `deny` rule now matches a whole family of tools.
 * Source: Claude Code CHANGELOG 2.1.166 ("Glob pattern support added to deny
 * rules for tool names").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown. The Beat Reporter has the governance beat today: permission deny rules just learned to speak in wildcards. As of release 2.1.166 you can drop a glob into the tool-name slot of a deny rule, so one pattern fences off an entire family of tools instead of a brittle line-by-line list. Read the two pages on the desk for how the mechanism works and how a consultant fences a client engagement with it — then the door asks one question, and the thing guarding the key is very particular about who gets past the gate.",
  prompt:
    "You want to guarantee Claude can never call any tool from the GitHub MCP server on this engagement, and you don't want the block to spring a leak when that server adds new tools next month. What's the right move with the 2.1.166 deny-rule change?",
  choices: [
    { id: 'a', label: 'Add a single glob deny rule like `mcp__github__*` to settings.json — it matches every current and future tool from that server', correct: true },
    { id: 'b', label: 'List each GitHub tool by its exact name in the deny array and update that list by hand whenever the server changes', correct: false },
    { id: 'c', label: 'Switch to plan permission mode so Claude cannot run any tools at all', correct: false },
    { id: 'd', label: 'Move the GitHub tools into the allow list so at least they are tracked in one place', correct: false },
  ],
  passFeedback: 'HIT! A glob in a deny rule — `mcp__github__*` — blocks the whole family in one line and keeps matching new tools the server adds, because it was never about the individual names.',
  failFeedback: 'MISS! A hand-listed deny rots the moment the server grows, a permission mode is not a targeted family block, and the allow list permits rather than forbids. 2.1.166 lets one glob pattern fence the whole family — re-read Book 1.',
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**Deny by Pattern — Drawing the Line With a Single Wildcard**

**Where deny rules actually live**

Claude Code's permission system is more than the live modes you cycle with Shift+Tab. Underneath sits a standing rulebook in \`settings.json\`: an \`allow\` list and a \`deny\` list that declare, *regardless of which mode you're in*, what is permitted and what is forbidden outright. A deny rule always wins — even in the most permissive mode, a denied tool stays denied. The catch, until recently, was that each rule had to name a tool more or less exactly, so fencing off a whole category meant a long, brittle list with one line per tool.

**What 2.1.166 changed**

Release 2.1.166 added *glob pattern support to deny rules for tool names*. The tool-name position now accepts a wildcard, so a single pattern can stand in for an entire family of tools instead of a line apiece. A pattern like \`mcp__github__*\` matches every tool exposed by the GitHub MCP server; a broader \`mcp__*\` fences off every MCP tool at once. The match is on the tool name itself — you describe the *shape* of what you want blocked and let the glob do the enumerating for you.

**Why a wildcard beats a list**

A hand-maintained deny list rots. A server ships three new tools next month and your careful block now has three new holes you didn't know to plug. A pattern has no such failure mode: it matches those new tools the instant they appear, because it was never tied to the individual names. You write the intent once — *"nothing from this server"* — and the rule keeps meaning exactly that as the surface underneath it grows and shifts.

> Takeaway: A glob in a deny rule turns "block these named tools" into "block this whole family" — one pattern that stays correct as the toolset grows.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Fencing the Engagement — Deny Globs as Client Guardrails**

**The blast radius nobody scoped**

On a client engagement the risk that bites you is rarely Claude editing a file you watched it edit. It's a tool you forgot was even connected. An MCP server wired up for one narrow task can expose a dozen actions, and *"I didn't realize it could do that"* is not a sentence you want to say to a client's security lead. A glob deny rule is how you draw the fence *before* the first session runs, instead of explaining a surprise after it happens.

**Think in boundaries, not tools**

The move is to stop enumerating tools and start naming boundaries. If the rule for this engagement is "Claude may read our repo but must never reach our cloud," you don't hunt down every individual cloud action — you deny the one pattern that covers that server and move on. Because the rule expresses a boundary rather than a list, it reads like a policy a non-engineer stakeholder could actually nod along to: this family is off-limits, full stop.

**A fence that survives the toolset growing**

Check that \`settings.json\` into the repo and the guardrail travels with the work — every teammate's session inherits the same fence with nothing to remember and nothing to re-key. And when the client's platform team adds new tools to that server mid-engagement, your pattern already covers them; the boundary you promised on day one is still the boundary on day ninety. That durability is the real deliverable. A static list is a snapshot that's wrong the moment anything moves; a pattern is a commitment that holds.

> Takeaway: Express each engagement's limits as a glob deny pattern, check it into the repo, and the boundary holds for every teammate and every new tool the server grows.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `We're starting an engagement on ____ and I want the permission fence set before anyone runs a session.
In settings.json, add a deny rule that blocks ____ using a single glob pattern, not a tool-by-tool list.
The rule should keep meaning "____" even after that server adds new tools next month.
Leave ____ allowed so the actual work can still happen.
Check the settings file into the repo so every teammate's session inherits the same guardrail.`,
    blanks: [
      { id: 'target', suggestions: ['the Acme client repo', 'a regulated fintech codebase', 'a healthcare data project'] },
      { id: 'deny-target', suggestions: ['every tool from the cloud MCP server', 'all MCP tools at once', 'the entire GitHub MCP toolset'] },
      { id: 'intent', suggestions: ['nothing from that server can run', 'no cloud actions are reachable', 'that whole family stays blocked'] },
      { id: 'allowed', suggestions: ['local file reads and edits', 'the test runner and linter', 'read-only access to the repo'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "Permission deny rules in settings.json forbid tools regardless of mode, and a deny always wins. As of 2.1.166 the tool-name slot of a deny rule accepts a glob, so one pattern (e.g. `mcp__github__*`, or `mcp__*` for all MCP tools) blocks a whole family instead of a brittle line-per-tool list. The win is durability: a pattern matches new tools the moment a server adds them, so a hand-listed deny can't spring leaks. For a consultant, express each engagement's limits as a boundary pattern, check settings.json into the repo, and the fence travels to every teammate and survives the toolset growing.",
      beats: [
        { kind: 'say', text: "Governance beat this week, and it's a small change with real teeth. You know the permission *modes* you cycle with Shift+Tab? Sitting underneath them is a standing rulebook in `settings.json` — an `allow` list and a `deny` list that hold no matter what mode you're in." },
        { kind: 'say', text: "Key fact about deny: it always wins. Even in the most permissive mode, a tool on the deny list stays blocked. The annoyance, until now, was that you basically had to name each tool exactly — so fencing off a whole category meant a long, fragile list." },
        { kind: 'say', text: "Release 2.1.166 fixed that. The tool-name slot of a deny rule now takes a glob. So `mcp__github__*` blocks every tool from the GitHub MCP server in one line, and `mcp__*` fences off every MCP tool at once. You describe the shape, the wildcard does the enumerating." },
        {
          kind: 'choice',
          prompt: "Here's the gut-check. Why is a glob deny rule actually better than a hand-written list of the same tools — beyond just being shorter?",
          options: [
            { id: 'durable', label: 'It keeps matching new tools the server adds later, so it can\'t spring a leak', correct: true, reaction: "That's the heart of it. A list is a snapshot that's wrong the moment the server grows; a pattern is a commitment that still holds when three new tools show up next month." },
            { id: 'faster', label: 'It makes Claude run faster by checking fewer rules', correct: false, reaction: "Not the point — this isn't a performance feature. The value is that the pattern stays correct as the toolset changes, where a static list quietly develops holes." },
            { id: 'override', label: 'It overrides the allow list in a way exact names can\'t', correct: false, reaction: "Deny already beats allow regardless of how the rule is written. The glob's advantage is durability — it matches tools that don't exist yet, so the boundary doesn't rot." },
          ],
        },
        { kind: 'say', text: "For us on an engagement, that durability *is* the deliverable. The thing that bites you isn't the edit you watched — it's a tool you forgot was connected. Draw the fence as a pattern before the first session, and 'I didn't know it could do that' stops being a sentence you have to say." },
        { kind: 'say', text: "Think in boundaries, not tools. 'Claude reads our repo but never touches our cloud' becomes one deny pattern covering that server — a policy a non-engineer stakeholder could nod along to. Check the settings file into the repo and every teammate inherits the same fence." },
        { kind: 'say', text: "The books on the desk have the mechanism and the consulting playbook. The door wants to know the *right* way to block a whole tool family without it leaking later — answer that and the key's yours." },
      ],
    },
  },
  battle: {
    name: 'Glob-Bones, Warden of the Wildcard',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*bones rattle into a lattice across the doorway, each one carved with a tool name* …name them all, mortal… every tool you'd keep out… miss one and I let it through…",
    tauntLines: [
      "*a new bone clatters into the gate* the server grew overnight and your little list didn't — see the gap? I do…",
      "*grinning sockets swivel* you can't write fast enough to fence a thing that keeps changing shape…",
    ],
    victoryLine: "*the lattice collapses into a tidy heap* …one pattern… you fenced the whole family with one pattern… take the key, warden's beaten at the warden's game…",
    questions: [
      {
        prompt:
          "You want to guarantee Claude can never call any tool from the GitHub MCP server on this engagement, and you don't want the block to spring a leak when that server adds new tools next month. What's the right move with the 2.1.166 deny-rule change?",
        choices: [
          { id: 'a', label: 'Add a single glob deny rule like `mcp__github__*` to settings.json — it matches every current and future tool from that server', correct: true },
          { id: 'b', label: 'List each GitHub tool by its exact name in the deny array and update that list by hand whenever the server changes', correct: false },
          { id: 'c', label: 'Switch to plan permission mode so Claude cannot run any tools at all', correct: false },
          { id: 'd', label: 'Move the GitHub tools into the allow list so at least they are tracked in one place', correct: false },
        ],
        passFeedback: 'HIT! A glob in a deny rule — `mcp__github__*` — blocks the whole family in one line and keeps matching new tools the server adds, because it was never about the individual names.',
        failFeedback: 'MISS! A hand-listed deny rots the moment the server grows, a permission mode is not a targeted family block, and the allow list permits rather than forbids. 2.1.166 lets one glob pattern fence the whole family — re-read Book 1.',
      },
    ],
  },
};
