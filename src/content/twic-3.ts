import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — MCP failures now surface the HTTP status and error text:
 * when an MCP server fails, `/mcp` and `claude mcp list` now show the actual
 * HTTP status code and error message (not a bare "unavailable"), and headless
 * stream-json runs get the same detail via a new `mcp_server_errors` field on
 * the init event.
 * Sources (Claude Code CHANGELOG 2.1.219):
 *   - "Added HTTP status and error text to `claude mcp list` and `/mcp` on failures"
 *   - "Added `mcp_server_errors` to headless stream-json init event"
 * Final room — door target routes to the TwicStampScreen via currentTrack.
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Final room of the issue, and the Beat Reporter closes on a builder's relief: MCP servers can no longer fail in silence. When a server won't connect, `/mcp` and `claude mcp list` now show you the actual HTTP status code and the error text behind it — and headless runs get the same detail through a new `mcp_server_errors` field on the stream-json init event. No more staring at a bare 'unavailable' and guessing. The two books cover exactly what surfaces on a failure and how a consultant reads a status code to fix a client's broken connection in one look. Beat the door's question for the key that finishes the issue — and mind the wyrm beyond it, a hoarder of silent faults that would rather die than tell you *why* it failed.",
  prompt:
    "In 2.1.219, when an MCP server fails to connect, what do `/mcp` and `claude mcp list` now show you?",
  choices: [
    { id: 'a', label: "The actual HTTP status code and the error text of the failure", correct: true },
    { id: 'b', label: "Nothing — the server is silently disabled to keep the output clean", correct: false },
    { id: 'c', label: "A generic 'server unavailable' line with no status code or detail", correct: false },
    { id: 'd', label: "Only a retry countdown, while the connection is retried automatically until it works", correct: false },
  ],
  passFeedback: "HIT! On a failure, `/mcp` and `claude mcp list` now surface the HTTP status *and* the error text — the diagnostic detail that points you straight at the cause. Headless runs get the same via the new `mcp_server_errors` init field.",
  failFeedback: "MISS! It doesn't hide the failure, it isn't a bare generic line anymore, and it doesn't just silently retry. The status code and error text are exactly what now appears. Re-read Book 1.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**MCP Failures Learn to Speak — Status and Error Text on Every Fault**

**What the changelog added**

Two lines from 2.1.219 make one story. First: *"Added HTTP status and error text to \`claude mcp list\` and \`/mcp\` on failures."* Second: *"Added \`mcp_server_errors\` to headless stream-json init event."* An MCP server is an outside tool Claude connects to — a data source, an API, a service — and like anything on a network it can fail to come up. Before this release, a failed server told you almost nothing. After it, the two surfaces you actually use to check on servers — the interactive \`/mcp\` view and the \`claude mcp list\` command — now print the real HTTP status code and the error text the server returned.

**The same detail, headless**

The second line carries that fix into automation. A headless run started with stream-json output now receives a \`mcp_server_errors\` field on its init event, so a pipeline that boots with a broken server connection isn't left guessing any more than a human at the terminal is. The failure detail is delivered in the machine-readable stream at startup, right where an automated integration can read it, log it, and decide what to do — instead of silently proceeding as though every tool came up fine.

**From "it's broken" to "here's why"**

The value is the jump from a verdict to a diagnosis. A bare *server unavailable* tells you only that something is wrong; an HTTP status plus the server's own error text tells you *what*. The response the server sent — its status line and message — is precisely the information that separates a five-second fix from a blind afternoon, and now it rides along with the failure instead of being swallowed by it.

> Takeaway: When an MCP server fails, \`/mcp\` and \`claude mcp list\` now show the real HTTP status and error text, and headless runs get the same through a new \`mcp_server_errors\` init field — the failure tells you *why*, not just *that*.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Reading the Status Code — Fixing a Client's MCP Connection in One Look**

**Every engagement wires up tools**

Book 1 covered what now surfaces; here's what a consultant does with it. Real work means connecting Claude to a client's actual tools — their issue tracker, their code host, their database, an internal API behind their auth. Every one of those connections is a place a setup can go wrong, and on a client's clock a broken tool that won't say why is a genuine time sink. The old failure gave you a shrug. The new one hands you the server's own words.

**The status code points at the fix**

That detail turns guesswork into triage, because the HTTP status is a signpost. A response in the 400s generally means the request itself was the problem — an authentication failure or a resource that wasn't found points you at a bad token or a wrong URL in your own config. A response in the 500s generally means the server accepted the request but failed on its end — the trouble is on the client's side of the wire, not your setup. You still confirm against the error text the server sent, but the code alone tells you which side of the connection to start on, and that first fork is most of the battle.

**A better answer for the partner**

The headless field extends the same triage to the runs nobody is watching. An automated pipeline that reads \`mcp_server_errors\` at startup can catch a dead connection and surface it — fail loudly, log the status — instead of running to completion as if a missing tool never mattered. When a partner asks why last night's automation came back thin, *the client's database server returned a 500 at connect, here's the line* is a report you can act on. *One of the tools didn't work, not sure which* is not.

> Takeaway: Read the surfaced status code to triage a broken MCP connection in one look — 400s point back at your own config, 500s at the server — and let the headless \`mcp_server_errors\` field turn an unattended run's silent tool failure into a loud, logged, actionable one.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `I've wired Claude up to the client's ____ over MCP, and on startup the server won't connect.
Instead of guessing, I'll open ____ (or run \`claude mcp list\`) and read the HTTP
status and error text it now prints.
The status code tells me which side to start on: a ____ points back at my own config —
a bad token or a wrong URL — while a 500 points at the server itself.
And for the overnight pipeline, I'll have it read the ____ field so a dead
connection fails loudly instead of running blind.`,
    blanks: [
      { id: 'tool', suggestions: ['issue tracker', 'internal API', 'production database'] },
      { id: 'surface', suggestions: ['/mcp', 'the /mcp view', 'the MCP status panel'] },
      { id: 'status', suggestions: ['401 or 404', '4xx', 'client-side status'] },
      { id: 'field', suggestions: ['mcp_server_errors', 'stream-json init', 'headless init'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "MCP failures got loud in 2.1.219: when a server won't connect, `/mcp` and `claude mcp list` now print the actual HTTP status code and the server's error text, and headless stream-json runs get the same detail through a new `mcp_server_errors` field on the init event. The jump is from a verdict to a diagnosis — a bare 'unavailable' told you *that* something broke; a status plus error text tells you *what*. For a consultant wiring Claude to a client's issue tracker, database, or internal API, the status code is a signpost: 400s (auth failure, not found) point back at your own config — a bad token or wrong URL — while 500s point at the server's side of the wire. And the headless field lets an unattended pipeline catch a dead connection and fail loudly instead of running blind.",
      beats: [
        { kind: 'say', text: "Last story of the issue, and it's one every builder has cursed about. MCP servers — the outside tools I connect to, a database, an API, a code host — used to fail *silently*. You'd see a server was down and get… nothing useful about why. Two lines in 2.1.219 fix that." },
        { kind: 'say', text: "First line: `/mcp` and `claude mcp list` now show the HTTP status *and* the error text when a server fails. So instead of a bare 'unavailable,' you get the status code the server returned and the message that came with it. The failure finally speaks." },
        { kind: 'say', text: "Second line carries it into automation: a headless stream-json run now gets a `mcp_server_errors` field on its init event. A pipeline that boots with a broken connection isn't guessing any more than you are at the terminal — the failure detail arrives in the stream at startup, ready to log and act on." },
        {
          kind: 'choice',
          prompt: "Before the door — a client's MCP server fails at connect and you see an HTTP 401 in `/mcp`. Where do you start?",
          options: [
            { id: 'config', label: "My own config — a 401 is an auth failure, so I check the token and credentials I set", correct: true, reaction: "Right. A 401 says the server rejected *my* request — bad or missing auth. The status points back at your side: fix the token or the credentials in your config." },
            { id: 'server', label: "The client's server — a 401 means their service crashed", correct: false, reaction: "Not quite. A crash on their end is a 500. A 401 is an *auth* failure — the server's up, it just refused your request. Start with your token." },
            { id: 'wait', label: "Nowhere — just wait, it'll retry itself until it connects", correct: false, reaction: "It won't silently fix an auth problem by retrying. The whole point of the new output is that the 401 tells you *what* to fix — the credentials — so you fix it instead of waiting." },
          ],
        },
        { kind: 'say', text: "That's the real gift: the status code is a signpost. Roughly, a 4xx means the request was the problem — an auth failure or a not-found points at a bad token or a wrong URL in *your* config. A 5xx means the server took the request and fell over on *its* end — the trouble's on the client's side of the wire. Confirm against the error text, but the code alone tells you which side to start on. That first fork is most of the battle." },
        { kind: 'say', text: "And it scales to the runs nobody's watching. An overnight pipeline that reads `mcp_server_errors` at startup can catch a dead connection and shout about it — fail loud, log the status — instead of finishing as though a missing tool never mattered. When a partner asks why last night's automation came back thin, 'the client's database returned a 500 at connect, here's the line' is a report you can act on. 'One of the tools didn't work, not sure which' isn't." },
        { kind: 'say', text: "The books have the exact surfaces and the status-code triage in full. The door wants one fact: what do `/mcp` and `claude mcp list` now show on a failure? Answer it for the key that finishes the whole issue — then face the wyrm. It hoards silent faults and would sooner die than tell you *why* it fell over. Make it speak its status." },
      ],
    },
  },
  battle: {
    name: 'Silens, the Opaque Wyrm',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*the wyrm coils on a hoard of dead connections, each one a failure that never said why — it fixes you with an unblinking eye and offers nothing, no reason, no code* …unavailable… that is all you'll get from me, operator… I fail, and I keep my silence… no status, no message, only the shrug… guess your way past me if you can…",
    tauntLines: [
      "*a low, withholding hiss* you want a *number*? an error line? I gave your kind 'unavailable' for years and you thanked me for it… why would I start speaking now…",
      "*coils tighten over a heap of unlogged faults* retry me, wait on me, guess at me — anything but *read* me… a silent failure is the only wall I have left…",
    ],
    victoryLine: "*the wyrm's silence breaks — a status code rings out, an error line spills across the hoard, and it sags as every fault names itself at last* …four-oh-one… five hundred… the request, the server, spoken plain… you made me *say* why… take the key, operator… the issue is yours…",
    questions: [
      {
        prompt:
          "In 2.1.219, when an MCP server fails to connect, what do `/mcp` and `claude mcp list` now show you?",
        choices: [
          { id: 'a', label: "The actual HTTP status code and the error text of the failure", correct: true },
          { id: 'b', label: "Nothing — the server is silently disabled to keep the output clean", correct: false },
          { id: 'c', label: "A generic 'server unavailable' line with no status code or detail", correct: false },
          { id: 'd', label: "Only a retry countdown, while the connection is retried automatically until it works", correct: false },
        ],
        passFeedback: "HIT! On a failure, `/mcp` and `claude mcp list` now surface the HTTP status *and* the error text — the diagnostic detail that points you straight at the cause. Headless runs get the same via the new `mcp_server_errors` init field.",
        failFeedback: "MISS! It doesn't hide the failure, it isn't a bare generic line anymore, and it doesn't just silently retry. The status code and error text are exactly what now appears. Re-read Book 1.",
      },
    ],
  },
};
