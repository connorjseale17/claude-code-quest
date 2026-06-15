import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — /cd: move a running session to a new working directory
 * without breaking it, keeping the conversation and context intact.
 * Source: Claude Code CHANGELOG 2.1.169 ("Added `/cd` command to move a session
 * to a new working directory without breaking").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2. The Beat Reporter's mid-week story is the small quality-of-life fix that anyone juggling more than one repo will feel immediately: the new `/cd` command. It moves your running session to a different working directory without breaking it — same conversation, same context, new folder. No more quitting and relaunching just to work somewhere else. Read the two pages for how the move works and why a consultant living across client repos reaches for it, then face the thing in the doorway — it haunts the space between folders and would love to strand you in the wrong one.",
  prompt:
    "You're mid-session in one repo and you need Claude to start operating in a different project directory — without losing the conversation you've built up. What do you do?",
  choices: [
    { id: 'a', label: 'Use `/cd` to move the session to the new working directory — it keeps running, conversation and context intact', correct: true },
    { id: 'b', label: 'Quit Claude and relaunch it from the other directory', correct: false },
    { id: 'c', label: 'Run `cd` as a shell command and the session will follow you into the new folder', correct: false },
    { id: 'd', label: "You can't — a session is pinned to one directory for its whole lifetime", correct: false },
  ],
  passFeedback: 'HIT! `/cd` moves the running session to a new working directory without breaking it — you keep the whole conversation and just point Claude at a different folder.',
  failFeedback: "MISS! You don't have to relaunch, a shell `cd` doesn't move the session, and a session isn't pinned for life. `/cd` relocates the live session and keeps your context — re-read the books.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**/cd — Move the Session, Keep the Conversation**

**The anchor that used to come with a session**

When you start Claude Code, the session is anchored to the directory you launched it in. That's where it reads files, where its commands run, where "the project" is. The trouble shows up the moment your work moves somewhere else — a sibling repo, a different subproject, the folder one level up. Until now the session couldn't simply follow you. Release 2.1.169 added the *\`/cd\` command to move a session to a new working directory without breaking it*, and "without breaking it" is the whole point: the session relocates instead of having to be torn down.

**Why "without breaking" is the headline**

Before this, your two options for working elsewhere were both bad. You could quit and relaunch Claude from the new directory — and lose the entire conversation you'd built up, every bit of context you'd established. Or you could try to \`cd\` in a shell and discover the session didn't come with you; it was still anchored where it started. \`/cd\` removes that choice between context and location. The session stays alive, the thread stays intact, and the working directory changes underneath it.

**What changes after you move**

Once you've run \`/cd\`, the new directory is where the session lives: file lookups and commands resolve against it, the same way they did against the original. Everything you and Claude have discussed carries over — you've moved the workshop, not started a new one. That continuity is exactly what makes it more than a convenience: the cost of changing location drops to a single command, so location stops being a reason to break your flow.

> Takeaway: \`/cd\` relocates a live session to a new working directory and keeps the conversation, so changing folders no longer means losing your context.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**One Session, Many Repos — Working the Way an Engagement Actually Sprawls**

**Client work rarely sits in one folder**

A real engagement is almost never a single tidy directory. There's the API repo and the frontend repo; the monorepo with a dozen subprojects; the throwaway scratch folder next to the real one. Over a single working session you cross those boundaries constantly. \`/cd\` is built for exactly that sprawl. You can carry one continuous session — and all the context you've loaded into it about the client, the goal, the constraints — across every directory the work touches, instead of starting cold each time you change rooms.

**The pattern: pivot without losing the thread**

The move it enables is a clean pivot. You finish a change in one repo, you \`/cd\` into the next, and you keep going with everything you'd already established still in play — no re-explaining the engagement, no re-establishing what "done" means, no warm-up. That continuity compounds: the longer a session runs and the more context it accumulates, the more expensive a restart would have been, and the more \`/cd\` saves you by making the restart unnecessary.

**Mind which room you're standing in**

The flip side of moving freely is that you have to track where you are. After a \`/cd\`, Claude's file operations and commands target the *new* directory — which is the point, but it also means a command you'd have run safely in one repo could land somewhere you didn't intend in another. Build a small habit around it: when you move, confirm the working directory before you ask for anything that writes or runs, especially on a client's machine. Move deliberately, and check the room you've moved into.

> Takeaway: Use \`/cd\` to carry one context-rich session across all the repos an engagement spans — pivot without re-explaining, but always confirm which directory you've landed in before you act.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `I've been working with you in ____ and built up a lot of context I don't want to lose.
Now I need to pivot to ____, which lives in a different directory.
Use /cd to move this session over there without restarting — keep everything we've discussed.
Once we're in the new directory, ____ so I know your file operations point at the right place.
If I ask you to jump back later, ____ instead of spinning up a fresh session.`,
    blanks: [
      { id: 'origin', suggestions: ['the API repo', 'the parent workspace folder', "this client's main project"] },
      { id: 'target', suggestions: ['the frontend repo', 'a sibling microservice', "the new engagement's codebase"] },
      { id: 'confirm', suggestions: ['confirm the working directory', 'show me where we are', 'list what\'s in it'] },
      { id: 'jumpback', suggestions: ['/cd back to the original', 'move the session back', 'switch directories again'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "/cd (Claude Code 2.1.169) moves a running session to a new working directory without breaking it — the conversation and context carry over, so you don't restart. It replaces the old bad choice between quitting and relaunching (losing the thread) or running a shell `cd` that didn't move the session at all. After the move, Claude's file operations and commands target the new directory. For consultants it means carrying one context-rich session across all the repos an engagement spans; the discipline is to confirm which directory you've landed in before running anything that writes.",
      beats: [
        { kind: 'say', text: "Mid-week story is a small one that anyone with more than one repo open will feel right away: the `/cd` command, new in 2.1.169. It moves your running session to a different working directory *without breaking it*." },
        { kind: 'say', text: "Here's the friction it kills. A session is anchored to wherever you launched it — that's where it reads files and runs commands. The second your work moves to another folder, that anchor was a problem." },
        { kind: 'say', text: "Your old options were both bad: quit and relaunch Claude in the new directory, and lose the whole conversation you'd built up — or try a shell `cd` and find the session didn't follow you, it was still anchored where it started. `/cd` ends that trade-off. The session relocates and the context comes with it." },
        {
          kind: 'choice',
          prompt: "Quick check. You're deep in a session and want to start working in a sibling repo. You run a plain `cd ../other-repo` in a shell. What happens to your Claude session?",
          options: [
            { id: 'follows', label: 'It follows the shell into the new directory automatically', correct: false, reaction: "That's the trap — it doesn't. A shell `cd` moves the shell, not the session; Claude's still anchored where it launched. Moving the session is exactly what `/cd` is for." },
            { id: 'stays', label: 'Nothing — the session stays anchored where it launched; you need `/cd` to actually move it', correct: true, reaction: "Right. The shell and the session are different things. `/cd` is the command that relocates the session itself, conversation and all." },
            { id: 'crashes', label: 'It breaks the session and you lose your context', correct: false, reaction: "It won't crash — it just ignores the shell move and stays put. To actually relocate without losing context, that's `/cd`." },
          ],
        },
        { kind: 'say', text: "After you `/cd`, the new directory is where the session lives — file lookups and commands resolve against it now, exactly like they did against the old one. You've moved the workshop, not started a new one." },
        { kind: 'say', text: "Consultant angle: an engagement never sits in one folder. API repo, frontend repo, the monorepo with a dozen subprojects. `/cd` lets you carry one continuous session — all the context about the client and the goal — across every directory the work touches, instead of starting cold each time." },
        { kind: 'say', text: "One discipline, though: track which room you're standing in. After a move, commands target the *new* directory, so confirm where you are before you ask for anything that writes or runs — especially on a client's machine. The books have the rest. The door wants to know how you relocate a live session without losing your context — answer that and the key's yours." },
      ],
    },
  },
  battle: {
    name: 'The Lost-Path Wraith',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*coalesces in the dead space between two folders* …lost, are we? wrong directory, wrong repo… and to leave, you'll have to abandon everything you've built…",
    tauntLines: [
      "*drifts you toward the wrong path* relaunch, then — start over, lose the thread, that's the only way out you know…",
      "*scrambles the folders around you* a shell step won't save you here; your session never followed, it never does…",
    ],
    victoryLine: "*unravels as the path snaps straight* …you moved the session and kept the thread… of course… take the key and go…",
    questions: [
      {
        prompt:
          "You're mid-session in one repo and you need Claude to start operating in a different project directory — without losing the conversation you've built up. What do you do?",
        choices: [
          { id: 'a', label: 'Use `/cd` to move the session to the new working directory — it keeps running, conversation and context intact', correct: true },
          { id: 'b', label: 'Quit Claude and relaunch it from the other directory', correct: false },
          { id: 'c', label: 'Run `cd` as a shell command and the session will follow you into the new folder', correct: false },
          { id: 'd', label: "You can't — a session is pinned to one directory for its whole lifetime", correct: false },
        ],
        passFeedback: 'HIT! `/cd` moves the running session to a new working directory without breaking it — you keep the whole conversation and just point Claude at a different folder.',
        failFeedback: "MISS! You don't have to relaunch, a shell `cd` doesn't move the session, and a session isn't pinned for life. `/cd` relocates the live session and keeps your context — re-read the books.",
      },
    ],
  },
};
