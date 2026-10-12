import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — `claude attach <name>` and `claude logs <name>`.
 * Background sessions carry both an opaque id and a human-readable name. These
 * two commands used to require the id; now part of a session's *name* works in
 * its place. `attach` reconnects you to a running session; `logs` shows its
 * output. The feature is that a recognizable fragment of the name now stands in
 * for the id, so you reach a background run by what you called it, not by a
 * cryptic string.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.290: "Added `claude attach <name>` and
 *     `claude logs <name>`: part of a session name works in place of the id"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Room three closes the issue, and the Beat Reporter gestures at a dragon coiled over a hoard — not of gold, but of long, unreadable session ids it makes you recite before it lets you back in. This week's final item is the end of that toll: as of 2.1.290, `claude attach <name>` and `claude logs <name>` take part of a session's *name* in place of its id, so you step back into a background run by what you called it. One book covers the mechanic — a name fragment doing the id's job; the other, why naming your runs well turns a juggled fleet of sessions into something you can actually keep tabs on. Claim the key, then face Idlock, the wyrm who hoards the ids to your own work.",
  prompt:
    "You left a background session running under the name `migration` and want to step back into it. How do you reattach without hunting down its full session id?",
  choices: [
    { id: 'a', label: "Run `claude attach migration` — as of 2.1.290, part of a session's name works in place of the id for both `attach` and `logs`", correct: true },
    { id: 'b', label: "You can't — `attach` still needs the exact session id; only `claude logs` was taught to accept a name", correct: false },
    { id: 'c', label: "Copy the full session id from the dashboard first; the name is only a display label and can't be used to attach", correct: false },
    { id: 'd', label: "Type the session's complete name exactly — a partial name is rejected, so it has to match character for character", correct: false },
  ],
  passFeedback: "HIT! `claude attach <name>` and `claude logs <name>` both take part of a session's name in place of its id — the name you gave it is now the handle.",
  failFeedback: "MISS! Both commands accept it, a fragment is enough rather than the full exact name, and the name isn't just a cosmetic label. Part of the name does the id's job now. Re-read Book 1.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**\`claude attach <name>\` — Part of the Name Now Does the Id's Job**

**Background sessions, and the id problem**

Claude Code can run a session in the background — a long job that keeps working while you do something else. Each of those sessions carries two labels: an *id*, assigned by the tool, and a *name*, which is the human-readable handle. To step back into a running session you'd reach for \`claude attach\`; to see what it's been doing without reattaching, \`claude logs\`. The snag was what those commands demanded: the id. And the id is an opaque string — precise, unique, and exactly the kind of thing nobody remembers or wants to retype.

**Part of the name now works in its place**

As of 2.1.290, \`claude attach <name>\` and \`claude logs <name>\` accept *part of a session's name* where the id used to be required. You pass a recognizable fragment of the name you gave the session, and Claude Code resolves it to the right one. You don't need the whole name, and you certainly don't need the id — a piece that points clearly at the session is enough.

**attach reconnects, logs tails**

The two commands do different things with that same name fragment. \`claude attach\` drops you back *into* the live session — you're reconnected, watching and steering it again. \`claude logs\` shows you the session's output without pulling you in, for when you just want to check on it in passing. Both now speak the name you actually chose, instead of the string the tool handed you.

> Takeaway: \`claude attach <name>\` and \`claude logs <name>\` let part of a session's name stand in for its id — reconnect to a background run, or read its output, by what you named it.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Name Your Runs So You Can Find Them — Keeping Tabs on a Fleet of Background Sessions**

**On a real engagement, you run more than one**

A consultant mid-engagement rarely has just one thing going. One background session grinds through a data migration. Another drafts the week's status doc. A third sits on a long test run, watching for the first red. That's three sessions in flight at once — and before this change, three opaque ids standing between you and each of them. The friction was small per-lookup and enormous in aggregate: every check-in meant finding the right cryptic string.

**The name is the handle now — so choose it well**

Because a fragment of the name reaches the session, the names you give your runs have quietly become your index. Name a session for the job it's doing — \`migration\`, \`status-doc\`, \`test-watch\` — and getting back in is a matter of typing the obvious word, not copying a hex string off a list. This rewards a small, good habit: name sessions descriptively at launch, keep the names distinct enough that a fragment points at exactly one, and your whole fleet becomes reachable by memory. The id still exists; you just stop needing to touch it.

**Low friction is what makes you actually check in**

This looks like a convenience, and it is, but the real payoff is behavioral. When reconnecting is cheap, you reconnect more. You tail the migration's logs before the client asks how it's going. You catch the test-watcher gone red twenty minutes sooner. The opaque id was a quiet tax on checking your own work, and taxed behavior happens less — so removing the tax means the oversight actually gets done. A fleet you can reach by name is a fleet you'll keep an eye on.

> Takeaway: Name your background sessions for the work they do, and part of that name is all it takes to attach or read logs — so checking in on a fleet of runs stays cheap enough that you actually do it.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `On this engagement I've got three sessions running in the background at once.
I name them for the job each is doing: ____, ____, and ____.
When I want to step back into the migration run, I use \`claude attach\` followed by ____ — part of the name, not its id.
When I just want to see what the test-watcher has been up to, I use \`claude logs\` with the same kind of name fragment.
The names are my index now, so I never hunt down a cryptic id again.`,
    blanks: [
      { id: 'name1', suggestions: ['`migration`', '`data-migration`', '`db-migrate`'] },
      { id: 'name2', suggestions: ['`status-doc`', '`report`', '`docs`'] },
      { id: 'name3', suggestions: ['`test-watch`', '`ci-watch`', '`build-watch`'] },
      { id: 'fragment', suggestions: ['`migration`', 'part of its name', 'the word migration'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "`claude attach <name>` and `claude logs <name>` (Claude Code 2.1.290): background sessions carry an opaque id and a human-readable name. These two commands used to require the id; now part of the name works in its place. `attach` reconnects you into a live session; `logs` shows its output without pulling you in. A recognizable fragment of the name is enough — not the whole name, and never the id. For a consultant juggling several background runs at once — a migration, a status doc, a test-watcher — the names you choose become your index. Name sessions descriptively and distinctly at launch, and the whole fleet is reachable by memory. The real payoff is behavioral: when reconnecting is cheap, you check in more often, catching a stuck or red run sooner than when an opaque id stood in the way.",
      beats: [
        { kind: 'say', text: "Final item, room three — and it's a small one that changes a daily annoyance. It's about getting back into a session you left running in the background." },
        { kind: 'say', text: "Set the scene. I can run a session in the background — a long job chugging away while you work on something else. Each one has two labels: an id the tool assigns, and a name, the readable handle. To jump back in you'd use `claude attach`; to peek at what it's done without reattaching, `claude logs`." },
        { kind: 'say', text: "The old catch: both wanted the id. And an id is an opaque string — unique, precise, and exactly the sort of thing nobody remembers or wants to retype. As of 2.1.290 that changes: `claude attach <name>` and `claude logs <name>` take *part of the name* in place of the id. A fragment that points clearly at the session is enough." },
        {
          kind: 'choice',
          prompt: "You named a background session `nightly-migration`. You want to tail its output in passing — not reattach, just look. What reaches it?",
          options: [
            { id: 'logs-frag', label: "`claude logs migration` — logs takes part of the name too", correct: true, reaction: "Right. Both commands learned the trick, not just attach. A fragment like `migration` points at the session, and `logs` shows its output without pulling you in." },
            { id: 'attach-only', label: "Only `claude attach` accepts a name; `logs` still needs the id", correct: false, reaction: "Not so — the change covers both. `claude logs <name>` takes the same name fragment `attach` does, so you can check output by name alone." },
            { id: 'full-id', label: "Nothing but the full session id will do for logs", correct: false, reaction: "That's the old world. As of 2.1.290 a piece of the name works for `logs` as well as `attach` — no hunting down the id to glance at output." },
          ],
        },
        { kind: 'say', text: "Why it matters on an engagement: you're rarely running just one. A migration grinding away, a status doc drafting, a test run you're watching for the first red — that's three sessions, and before this, three cryptic ids between you and each of them." },
        { kind: 'say', text: "So the names become your index. Name a session for its job — `migration`, `status-doc`, `test-watch` — keep them distinct enough that a fragment lands on exactly one, and the whole fleet is reachable from memory. The id still exists; you just stop needing to touch it." },
        { kind: 'say', text: "And the real win is behavioral: when stepping back in is cheap, you do it more. You tail the migration before the client asks, you catch the test-watcher gone red twenty minutes sooner. The id was a quiet tax on checking your own work. The books have the mechanic and the read. Take the key — then face Idlock, the wyrm hoarding the ids to your own sessions. Take them back by name." },
      ],
    },
  },
  battle: {
    name: 'Idlock, the Id-Hoarder',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a great wyrm uncoils atop a glittering hoard — not coins, but endless scales each etched with a long, unreadable id — and pins one beneath a claw* …back for your own session, are you… then recite its id, every character, as you always have, or the gate stays shut… what's that — you say a mere *name* opens it now? …then tell me true what \`claude attach <name>\` takes, before I bury your work under my hoard for good.",
    tauntLines: [
      "*lashes its tail across the hoard* you'd claim only *attach* learned your little name-trick, and that \`logs\` still crawls to me for the full id?! no… both were taught it — a name fragment reads the logs as surely as it reopens the session…",
      "*narrows a molten eye* you think my hoard is mere *decoration* — that the name is a painted label and the id still rules?! never… part of the name now does the id's whole work; you need not touch the cursed string at all…",
    ],
    victoryLine: "*Idlock's claw lifts, and the whole hoard of ids dims to irrelevance behind it* …a *name*… part of the name… \`attach\` to step back in, \`logs\` to read it from afar, and never the id again… my hoard was worthless all along… take the key, operator, and reach your every session by the name you gave it.",
    questions: [
      {
        prompt:
          "You left a background session running under the name `migration` and want to step back into it. How do you reattach without hunting down its full session id?",
        choices: [
          { id: 'a', label: "Run `claude attach migration` — as of 2.1.290, part of a session's name works in place of the id for both `attach` and `logs`", correct: true },
          { id: 'b', label: "You can't — `attach` still needs the exact session id; only `claude logs` was taught to accept a name", correct: false },
          { id: 'c', label: "Copy the full session id from the dashboard first; the name is only a display label and can't be used to attach", correct: false },
          { id: 'd', label: "Type the session's complete name exactly — a partial name is rejected, so it has to match character for character", correct: false },
        ],
        passFeedback: "HIT! `claude attach <name>` and `claude logs <name>` both take part of a session's name in place of its id — the name you gave it is now the handle.",
        failFeedback: "MISS! Both commands accept it, a fragment is enough rather than the full exact name, and the name isn't just a cosmetic label. Part of the name does the id's job now. Re-read Book 1.",
      },
    ],
  },
};
