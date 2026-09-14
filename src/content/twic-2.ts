import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — the `/diff` live diff panel. In fullscreen rendering,
 * `/diff` opens a diff panel beside the conversation that shows your uncommitted
 * changes and keeps updating as Claude edits files or runs shell commands. The
 * panel lists changed files with added/removed line counts and shows each file's
 * diff; you can click a file row to jump to it, select lines with the mouse to
 * attach them to your next prompt, and press Ctrl+X B to cycle the scope (this
 * session's changes → all uncommitted changes → everything since the branch
 * split from the default branch). Closing it makes it stay closed, in this
 * session and later ones, until you run `/diff` again.
 * Sources (Claude Code CHANGELOG 2.1.260 + docs.claude.com interactive-mode/fullscreen):
 *   - "Added a diff panel that opens beside the conversation in fullscreen mode
 *      and shows your uncommitted changes as Claude edits; toggle it with `/diff`."
 *   - "The diff panel lists the changed files with their added and removed line
 *      counts, and shows each file's diff ... Claude Code refreshes it each time
 *      Claude edits a file or runs a shell command."
 *   - "select them in the panel with the mouse. Claude Code attaches the
 *      selection to your next prompt"; "Ctrl+X B to cycle from this session's
 *      changes, to your uncommitted changes as one list, to everything since your
 *      branch split from the default branch."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2, and the Beat Reporter is at the threshold of a hall where a pane of glass hangs in the air beside you, and every change made in the room appears on it the instant it happens — lines added glowing green, lines struck through in red, the whole ledger redrawing itself with each move. The 2.1.260 release adds `/diff`, a panel that opens beside the conversation in fullscreen mode and shows your *uncommitted* changes, refreshing every time Claude edits a file or runs a command. The two books cover exactly what that live pane shows and why a consultant reviews the work as it happens instead of squinting at one enormous diff at the end. Answer the door's question for the key — then face what haunts the hall, a ghost stitched from every change no one watched go by.",
  prompt:
    "In fullscreen mode, what does the `/diff` panel show you?",
  choices: [
    { id: 'a', label: "A panel beside the conversation listing your changed files and their diffs, refreshing live as Claude edits files or runs commands — your uncommitted changes as they accumulate", correct: true },
    { id: 'b', label: "A one-time static snapshot of your current changes printed into the conversation, which does not update afterward", correct: false },
    { id: 'c', label: "The diff of your most recent git commit — the committed history, not your working-tree changes", correct: false },
    { id: 'd', label: "A prompt that launches your external editor or IDE to review the changes outside Claude Code", correct: false },
  ],
  passFeedback: "HIT! `/diff` opens a live panel beside the conversation in fullscreen: it lists your changed files with their diffs and redraws itself each time Claude edits a file or runs a command, so you watch the uncommitted changes pile up in real time.",
  failFeedback: "MISS! It's not a frozen snapshot, it's not your commit history, and it doesn't shell out to an external editor — it's a live, in-Claude panel of your *uncommitted* changes that updates as Claude works. Re-read Book 1.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**\`/diff\` — A Live Pane on the Work as It Happens**

**A panel that redraws itself**

In fullscreen rendering, \`/diff\` opens a diff panel *beside* the conversation — not a message dropped into the transcript, but a standing pane that stays open while you keep working. It lists your changed files with their added and removed line counts, and shows each file's diff underneath the list. The part that matters is that it's *live*: Claude Code refreshes it every time Claude edits a file or runs a shell command. You're not asking for a snapshot after the fact; you're watching the working tree change in real time as the session moves.

**Navigating and pointing**

The panel is something you steer, not just stare at. Click a file's row in the list and it jumps you to that file's diff. Better still, you can *select* lines in the panel with the mouse — and Claude Code attaches that selection to your next prompt, showing a line count beside the input until you send it. That turns "the thing you're looking at" into "the thing you're talking about" without copying a path and line numbers by hand: highlight the lines, then say what you want done with them.

**Choosing what "changed" means**

What counts as a change is adjustable. Press \`Ctrl+X B\` to cycle the panel's scope through three views: just *this session's* changes, then *all* your uncommitted changes as one list, then *everything since your branch split from the default branch*. And the panel remembers your intent — close it and it stays closed, in this session and later ones, until you run \`/diff\` again. It's a deliberate surface you open when you want it and dismiss when you don't.

> Takeaway: \`/diff\` is a live, steerable panel beside the conversation that shows your uncommitted changes and redraws itself as Claude works — so review happens *during* the edit, not after it.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Reviewing in Flight — Why You Watch the Diff Instead of Auditing It Later**

**The end-of-session diff is where mistakes hide**

Let Claude work through a whole task and only look at the changes at the end, and you're handed one giant diff to reconstruct in your head: which edit was which, why this file moved, what that command touched. The bigger the change, the more the review degrades into skimming — and skimming is exactly how a wrong turn taken twenty edits ago slips through to the client. A live panel changes the economics: each edit lands in front of you the moment it happens, small enough to actually read, in the context of the request that prompted it.

**Catching the drift at edit one, not edit twenty**

The value of watching is that you can stop things early. When Claude's second edit starts down a path you didn't intend, you see it in the panel while it's still one file, not after it's rippled across the codebase. Selecting the offending lines and attaching them to your next prompt — "not like this, do it this way" — is a far cheaper correction than unwinding a session's worth of edits built on a bad premise. Course-correction is only possible if you can see the course.

**Scoping the review to the deliverable**

The scope cycle is what makes the panel a review tool and not just a live feed. Mid-task, *this session's changes* keeps your eye on what Claude just did. When you're readying a handoff, *everything since the branch split from the default branch* reframes the same panel as the reviewer's view — the entire diff a client or a teammate will actually receive, assembled without leaving the conversation. One panel, three altitudes, chosen to fit the moment.

> Takeaway: Treat \`/diff\` as review-in-flight — read each change as it lands, select and correct the moment the work drifts, and switch the scope to the branch view when it's time to inspect the whole deliverable.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `Claude is about to make a sweeping change across the repo and I don't want to audit one giant diff at the end.
In fullscreen, I'll run ____ to open the live panel beside the conversation.
It lists my changed files and refreshes every time Claude ____.
The moment the work drifts, I'll ____ in the panel to attach them to my next prompt and steer it back.
When it's time for the handoff, I'll press Ctrl+X B to switch the scope to ____.`,
    blanks: [
      { id: 'command', suggestions: ['`/diff`', 'the `/diff` command', 'diff'] },
      { id: 'refresh', suggestions: ['edits a file or runs a command', 'makes a change', 'touches the working tree'] },
      { id: 'select', suggestions: ['select the offending lines', 'highlight the wrong lines with the mouse', 'pick the lines that drifted'] },
      { id: 'scope', suggestions: ['everything since the branch split from the default branch', 'the full branch diff', "the whole deliverable's changes"] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "`/diff` (2.1.260) opens a diff panel beside the conversation in fullscreen mode and shows your *uncommitted* changes, refreshing every time Claude edits a file or runs a shell command. It lists changed files with added/removed line counts and shows each file's diff. It's steerable: click a file row to jump to it, or select lines with the mouse to attach them to your next prompt (a line count shows by the input until you send). Ctrl+X B cycles the scope — this session's changes, then all uncommitted changes, then everything since your branch split from the default branch. Close it and it stays closed, this session and later, until you run `/diff` again. The point is review-in-flight: read each change as it lands instead of auditing one giant diff at the end, correct drift early by selecting and re-prompting, and switch to the branch scope to inspect the whole deliverable before a handoff. It shows working-tree changes, not commit history, and it's live, not a frozen snapshot.",
      beats: [
        { kind: 'say', text: "This week's middle story is about seeing the work while it happens. In fullscreen, `/diff` opens a panel right beside our conversation — a standing pane, not a message dumped into the transcript — and it shows your *uncommitted* changes." },
        { kind: 'say', text: "The thing that makes it useful is that it's live. It lists your changed files with their added and removed line counts, shows each file's diff, and redraws itself every single time I edit a file or run a command. You're not asking for a snapshot after I'm done — you're watching the working tree change in real time." },
        { kind: 'say', text: "And you can steer it. Click a file's row to jump to its diff. Or select lines in the panel with the mouse — I attach that selection to your next prompt, and a line count sits by the input until you send. Highlight the lines, then just tell me what to do with them. No copying paths and line numbers by hand." },
        {
          kind: 'choice',
          prompt: "Halfway through a big change, my second edit heads down a path you didn't intend. Watching the live `/diff` panel, what's the cheap correction?",
          options: [
            { id: 'select-reprompt', label: "Select the drifting lines in the panel and re-prompt me right then — 'not like this, do it this way'", correct: true, reaction: "Exactly. You caught it while it's still one file, not after it rippled across twenty. Selecting the lines attaches them to your next prompt, and I course-correct before the bad premise spreads." },
            { id: 'wait-end', label: "Let me finish the whole task, then audit the final diff and unwind whatever went wrong", correct: false, reaction: "That's the expensive path. Unwinding a session's worth of edits built on a wrong turn is far costlier than stopping it at edit two — which is the whole reason to watch live." },
            { id: 'commit-first', label: "Commit what's there so the panel resets, then keep going", correct: false, reaction: "The panel already shows uncommitted changes live — you don't need to commit to see or fix them. Just select the drifting lines and re-prompt now." },
          ],
        },
        { kind: 'say', text: "That's the case for watching over auditing. Let me run a whole task and only look at the end, and you're handed one giant diff to reconstruct in your head — which is exactly how a wrong turn slips through. Live, each edit lands small enough to actually read, next to the request that prompted it." },
        { kind: 'say', text: "One more lever: Ctrl+X B cycles the scope. Just this session's changes while we work, then all your uncommitted changes, then everything since your branch split from the default branch. That last one turns the same panel into the reviewer's view — the whole diff a client or teammate will actually receive. Close the panel and it stays closed, this session and later, until you run `/diff` again." },
        { kind: 'say', text: "The books have the full read. The door asks one thing: what does the `/diff` panel show you? Answer for the key — then face Palimpsest past it, a ghost stitched from every change that ever went by unwatched." },
      ],
    },
  },
  battle: {
    name: 'Palimpsest, the Unwatched Diff',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a ghost unfurls from the empty air, its body a shifting weave of struck-through lines and half-finished edits nobody ever looked at* …I am every change made while your back was turned, operator… edit upon edit, none of them read until it was far too late to unpick them… you claim you can *watch* me now, live, as I am written? …tell me true — what does that panel of yours actually show?",
    tauntLines: [
      "*the weave freezes into a single flat sheet* you thought I was a *snapshot* — a still picture struck once and left to yellow? no! I redraw with every edit, every command… I am never done being written…",
      "*old committed lines bleed through the surface* you thought I showed you the *past* — your last commit, the history already set in stone? no… I am the working tree, the uncommitted now, changing under your very eyes…",
    ],
    victoryLine: "*Palimpsest resolves into a clean, legible pane, each new line surfacing the instant it is written* …you watched me as I was made… caught the drift at the first stroke, not the last… a living panel, not a frozen page… take the key, and never again audit in the dark what you could have read in the light…",
    questions: [
      {
        prompt:
          "In fullscreen mode, what does the `/diff` panel show you?",
        choices: [
          { id: 'a', label: "A panel beside the conversation listing your changed files and their diffs, refreshing live as Claude edits files or runs commands — your uncommitted changes as they accumulate", correct: true },
          { id: 'b', label: "A one-time static snapshot of your current changes printed into the conversation, which does not update afterward", correct: false },
          { id: 'c', label: "The diff of your most recent git commit — the committed history, not your working-tree changes", correct: false },
          { id: 'd', label: "A prompt that launches your external editor or IDE to review the changes outside Claude Code", correct: false },
        ],
        passFeedback: "HIT! `/diff` opens a live panel beside the conversation in fullscreen: it lists your changed files with their diffs and redraws itself each time Claude edits a file or runs a command, so you watch the uncommitted changes pile up in real time.",
        failFeedback: "MISS! It's not a frozen snapshot, it's not your commit history, and it doesn't shell out to an external editor — it's a live, in-Claude panel of your *uncommitted* changes that updates as Claude works. Re-read Book 1.",
      },
    ],
  },
};
