import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — Cross-session messaging: `SendMessage` now works between
 * independent Claude Code sessions ("on any of your machines"), with
 * `ListAgents` to discover them. A message is plain text one Claude writes to
 * another — never conversation history or files, and it can never approve an
 * action, change settings, or run a slash command. Same-machine delivery uses
 * Unix domain sockets; cross-machine routes through Anthropic via Remote
 * Control. `crossSessionInbound` governs delivery; a message to a session
 * running with bypassed permissions is held for approval, and `dialogExpiry`
 * (default 5 min) drops an unanswered held message rather than delivering it.
 * Sources (Claude Code CHANGELOG 2.1.224 + docs):
 *   - "Added cross-session `SendMessage`: Claude Code sessions can now message
 *      each other, on any of your machines, with `ListAgents` to discover them"
 *   - "Added `crossSessionInbound` and `dialogExpiry` settings: cross-session
 *      messages sent to a session running with bypassed permissions are held
 *      for your approval"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Final room of the issue, and the Beat Reporter closes on a change to how *separate* sessions talk. `SendMessage` now reaches across independent Claude Code sessions — on any of your machines — with `ListAgents` to find them by name, so two sessions you started for two different jobs can hand each other a note. The two books cover what a message is (and, pointedly, what it isn't) and how a consultant coordinates a fleet of sessions without letting one drive another. This is *not* subagents — these are peers, not a parent and its children. Answer the door for the key, then face the wyrm past it: a dragon whose voice carries between lairs but who can only ever whisper.",
  prompt:
    "A cross-session `SendMessage` arrives at another of your sessions. What can that message actually do to the receiving session?",
  choices: [
    { id: 'a', label: "Deliver plain text — one Claude writing to another; it carries no conversation history or files and can never approve an action, change a setting, or run a slash command", correct: true },
    { id: 'b', label: "Transfer the sender's full conversation context and open files into the receiving session", correct: false },
    { id: 'c', label: "Run a slash command or approve a pending action in the receiver on the sender's behalf", correct: false },
    { id: 'd', label: "Nothing across sessions — `SendMessage` only reaches a session's own subagents, not independent sessions", correct: false },
  ],
  passFeedback: "HIT! A message is just text one Claude writes to another. It doesn't ship history or files, and it categorically can't approve an action, change settings, or execute a slash command. The receiver reads it and decides what to do — the sender never reaches in and acts.",
  failFeedback: "MISS! No history or files ride along, a message can't run commands or approve actions in the receiver, and cross-session `SendMessage` reaches *independent* sessions (that's the whole change), not just subagents. Re-read Book 1.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**Cross-Session Messaging — Sessions That Can Talk to Sessions**

**A note between peers, not a parent and a child**

The 2.1.224 line opens a new channel: *"Claude Code sessions can now message each other, on any of your machines, with \`ListAgents\` to discover them."* Until now, coordination meant subagents — a session spawning scoped children it owns. This is different: two *independent* sessions, each started on its own for its own job, can now find each other by name with \`ListAgents\` and pass a note with \`SendMessage\`. They're peers. Neither is inside the other.

**What a message is — and firmly is not**

The most important thing to hold onto is how little a message carries. It is text one Claude writes to another — *never conversation history or files*. And it can never approve an action, change a setting, or execute a slash command in the session that receives it. The receiver reads the text and decides what to do with it; the sender does not reach across and act. That narrowness is the safety model, not a limitation to work around.

**How the note travels, and who gets to hold it**

On one machine, delivery uses Unix domain sockets and never touches Anthropic's servers; across machines, messages route through Anthropic via Remote Control. Delivery itself is governed by \`crossSessionInbound\`, which decides whether an incoming message is delivered, held, or refused. The sharp case: if the receiving session is running with *bypassed* permissions, each message is held for your approval instead of landing silently. And \`dialogExpiry\` — five minutes by default — means an unanswered approval dialog closes and the message is *dropped, not silently delivered*, so held notes don't pile up or sneak in late.

> Takeaway: Cross-session \`SendMessage\` lets independent sessions hand each other plain text — discovered via \`ListAgents\`, carrying no history or files and no power to act — with \`crossSessionInbound\` holding messages to a bypass-mode session for your approval and \`dialogExpiry\` dropping the ones you don't answer.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Coordinating a Fleet — Many Sessions, One Engagement**

**When the work is wider than one session**

Book 1 drew the line between peers and subagents; this is why the peer channel earns its place on a real engagement. A sprawling client project often isn't one session's worth of work — it's several long-lived sessions running at once: one deep in the payments service, one on the front end, one minding a migration. They aren't children of a single conversation; they're separate operators you've set going. Cross-session messaging is how they hand off without you shuttling copy-paste between terminals: the payments session finishes its audit and pings the front-end session by name to say *the token contract changed, here's the shape.*

**Why "a message can't act" is the feature, not the fine print**

The narrowness Book 1 insisted on is exactly what makes a fleet safe to leave running. Because a message can't approve an action, change a setting, or run a slash command, no session can be *driven* by another — a compromised or confused peer can shout all it likes and the most it does is put text in front of a Claude that still decides for itself. Layer on \`crossSessionInbound\`: a session you've trusted with bypassed permissions won't act on an inbound note until you approve it, and \`dialogExpiry\` clears the ones you never got to. That's the difference between coordination and remote control.

**Discover, then address**

\`ListAgents\` is the practical half — it's how a session finds the others by name before it can send anything, which matters once you've got more than two in play. Reach for cross-session messaging when an engagement is genuinely parallel and the streams need to inform each other, but you still want each session making its own calls. When the work is really one job that should fan out under a single owner, that's a subagent tree — not this.

> Takeaway: Use cross-session messaging to let several long-lived sessions on one engagement inform each other by name, safely — a note can't make a peer act, \`crossSessionInbound\` guards your bypass-mode sessions, and when the work should fan out under one owner you want subagents instead.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `This engagement is wide enough that I've got separate sessions running for the ____
and another for the ____, each making its own calls.
When one finishes a piece the other needs, it uses ____ to find the peer by name,
then hands over a short note with SendMessage — just ____, never its history or files.
And because one of those sessions runs with bypassed permissions, I'll rely on
crossSessionInbound to ____ before anything lands.`,
    blanks: [
      { id: 'stream-one', suggestions: ['payments service', 'API layer', 'data migration'] },
      { id: 'stream-two', suggestions: ['front end', 'reporting dashboard', 'auth service'] },
      { id: 'discover', suggestions: ['ListAgents', 'the ListAgents roster', 'a name lookup'] },
      { id: 'payload', suggestions: ['plain text', 'a short heads-up', 'the changed contract in words'] },
      { id: 'guard', suggestions: ['hold each message for my approval', 'keep peers from acting on it silently', 'let me review inbound notes first'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "Cross-session messaging (2.1.224): `SendMessage` now works between *independent* Claude Code sessions — on any of your machines — with `ListAgents` to discover them by name. These are peers, not subagents: neither session is inside the other. A message is plain text one Claude writes to another — never conversation history or files — and it can never approve an action, change a setting, or run a slash command in the receiver; the receiver reads it and decides. Same-machine delivery uses Unix domain sockets (never touching Anthropic's servers); cross-machine routes through Anthropic via Remote Control. `crossSessionInbound` governs whether inbound messages are delivered, held, or refused — a message to a session running with bypassed permissions is held for your approval — and `dialogExpiry` (default 5 min) drops an unanswered held message rather than delivering it late. Use it to coordinate a fleet of long-lived sessions on one engagement; when the work should fan out under a single owner, use subagents instead.",
      beats: [
        { kind: 'say', text: "Closing story of the issue, and it's about sessions talking to *sessions*. Not subagents — those are children I spawn and own. This is `SendMessage` reaching across *independent* sessions, on any of your machines, with `ListAgents` to find them by name. Two separate operators you started for two separate jobs can now hand each other a note. They're peers." },
        { kind: 'say', text: "Now hear what a message actually is, because it's less than people assume. It's text one Claude writes to another — *never* conversation history, never files. And it can't approve an action, change a setting, or run a slash command in the session that gets it. The receiver reads the words and decides. The sender never reaches in and does anything." },
        { kind: 'say', text: "The travel path: on one machine, it's Unix domain sockets — never touches Anthropic's servers. Across machines, it routes through Anthropic via Remote Control. And `crossSessionInbound` decides whether an inbound note is delivered, held, or refused. The case to remember — if the receiving session runs with *bypassed* permissions, the message is held for your approval instead of landing silently." },
        {
          kind: 'choice',
          prompt: "A partner worries one runaway session could 'command' the others through these messages. Reassure them — what's the actual ceiling on what a message can do?",
          options: [
            { id: 'text-only', label: "It can only put text in front of the other Claude — it can't approve actions, change settings, or run commands there", correct: true, reaction: "Exactly the reassurance. A message is text one Claude writes to another; the receiver still decides for itself. No peer can be *driven* by another — the worst a confused session does is say something the receiver is free to ignore." },
            { id: 'commands', label: "It can run a slash command in the other session if it addresses it correctly", correct: false, reaction: "No — that's precisely what a message *can't* do. It can't run a slash command, approve an action, or change a setting in the receiver. It's text, and the receiver decides. That ceiling is the safety model." },
            { id: 'context', label: "It hands over the sender's whole context, so the other session inherits its state", correct: false, reaction: "Not that either. A message never carries conversation history or files — just text. The peer doesn't inherit anything; it reads a note and makes its own calls." },
          ],
        },
        { kind: 'say', text: "So the fleet play: a wide engagement is often several long-lived sessions at once — one in payments, one on the front end, one minding a migration. When payments finishes its audit, it pings the front-end session by name — *the token contract changed, here's the shape* — instead of you copy-pasting between terminals. Coordination without a conductor." },
        { kind: 'say', text: "And the narrowness is the point, not the fine print. Because a note can't make a peer act, no session drives another; `crossSessionInbound` holds inbound messages to your bypass-mode sessions for approval, and `dialogExpiry` — five minutes — drops the ones you never answer rather than delivering them late. When the work is really one job that should fan out under a single owner, though? That's a subagent tree, not this." },
        { kind: 'say', text: "Books cover what a message carries, the delivery rules, and when to pick peers over subagents. The door wants one fact: what can a cross-session message actually *do* to the session it reaches? Answer for the key. Then face Echofell past it — a wyrm whose voice carries between lairs but who can only ever whisper, and who's betting you think a whisper can command the other dragon or carry the hoard across." },
      ],
    },
  },
  battle: {
    name: 'Echofell, the Cross-Lair Wyrm',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a vast dragon coils across two connected caverns at once, and when it speaks the sound arrives in both lairs a heartbeat apart* …I hold two lairs, operator, and my voice crosses between them… but hear what crosses: only the voice… never the hoard, never the memory, and never a command the far wyrm must obey… tell me the true reach of a whisper, or be lost in the echo…",
    tauntLines: [
      "*the echo doubles and overlaps* you think my whisper *commands* the other lair? it cannot — I speak, and the far wyrm decides for itself… a voice is not a leash…",
      "*a low rumble crosses the gap* you'd have my whisper carry the whole hoard across? no — words cross the caverns, never the gold, never the memory of it…",
    ],
    victoryLine: "*both lairs fall quiet as the wyrm settles* …only the voice crosses, and only as a voice… you heard it true… take the key, operator, and let your sessions speak without ever seizing one another…",
    questions: [
      {
        prompt:
          "A cross-session `SendMessage` arrives at another of your sessions. What can that message actually do to the receiving session?",
        choices: [
          { id: 'a', label: "Deliver plain text — one Claude writing to another; it carries no conversation history or files and can never approve an action, change a setting, or run a slash command", correct: true },
          { id: 'b', label: "Transfer the sender's full conversation context and open files into the receiving session", correct: false },
          { id: 'c', label: "Run a slash command or approve a pending action in the receiver on the sender's behalf", correct: false },
          { id: 'd', label: "Nothing across sessions — `SendMessage` only reaches a session's own subagents, not independent sessions", correct: false },
        ],
        passFeedback: "HIT! A message is just text one Claude writes to another. It doesn't ship history or files, and it categorically can't approve an action, change settings, or execute a slash command. The receiver reads it and decides what to do — the sender never reaches in and acts.",
        failFeedback: "MISS! No history or files ride along, a message can't run commands or approve actions in the receiver, and cross-session `SendMessage` reaches *independent* sessions (that's the whole change), not just subagents. Re-read Book 1.",
      },
    ],
  },
};
