import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — subagents now run in the background by default: Claude
 * keeps working the main thread while a subagent runs, a notification fires when
 * it finishes, and background agents launched from `claude agents` can commit,
 * push, and open a draft PR on their own.
 * Source: Claude Code CHANGELOG 2.1.198 ("Subagents now run in background by
 * default; Claude continues working and receives notifications" / "Added
 * background agent notifications in `claude agents` with `Notification` hook" /
 * "Background agents launched from `claude agents` now commit, push, and open
 * draft PRs").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2, and the Beat Reporter has a story for anyone who's ever kicked off a long task and then just sat there watching it run. Subagents — the helpers Claude spins up to go handle a chunk of work — now run in the *background* by default: Claude keeps working the main thread, and a notification pulls you back the moment one finishes. The two pages on the desk cover how the background hand-off works and how a consultant runs three things at once because of it. Answer the door and the key is yours — but first you'll have to slip past the ghost that keeps you frozen at the screen, waiting.",
  prompt:
    "You ask Claude to spin up a subagent for a long codebase survey. Under the new default, what happens while it runs?",
  choices: [
    { id: 'a', label: "It runs in the background while Claude keeps working, and you get a notification when it finishes — you don't have to sit and wait for it", correct: true },
    { id: 'b', label: 'The whole session blocks until the subagent is done, then picks back up where it left off', correct: false },
    { id: 'c', label: 'It runs silently, and you have to keep checking the agents view yourself to find out when it is finished', correct: false },
    { id: 'd', label: 'The subagent takes over your main session for the length of its task', correct: false },
  ],
  passFeedback: "HIT! Subagents run in the background by default now — the main session keeps working while the subagent runs, and a notification fires when it lands, so you're free to do other work in the meantime.",
  failFeedback: "MISS! The session doesn't block, you're not left polling, and the subagent doesn't take over your main thread. It runs in the background and notifies you when it's done — re-read the books.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**Subagents Run in the Background by Default — You Stop Waiting**

**The old shape: fire, then freeze**

When you hand Claude a big task, it can delegate part of it to a *subagent* — a separate worker that goes off and handles that slice on its own. The behavior that changed in the 2.1.198 release is what happens to *you* while that worker runs. It used to mean waiting: the subagent worked, and you watched. Now subagents run in the background by default, and the main session doesn't stall behind them — Claude keeps working on the main thread while the subagent grinds away on its piece.

**Notifications close the loop**

Background work is only useful if you find out when it's done, and that's the second half of the change. Background agents now raise a *notification* when they finish, surfaced in the \`claude agents\` view and wired to a \`Notification\` hook you can hang your own actions off. You're not babysitting a progress bar, and you're not forgetting the job either — the finish comes and gets you.

**A background agent can go all the way to a draft PR**

The release pushed the autonomy further still: background agents launched from \`claude agents\` can now *commit, push, and open a draft pull request* on their own. So a backgrounded job isn't limited to "think and report back" — it can carry a change all the way to a reviewable PR that's sitting and waiting for you, without a single step in between needing your hand on the wheel.

> Takeaway: Subagents now run in the background by default — Claude keeps working, a notification tells you when each one lands, and a background agent can carry a task all the way to a draft PR on its own.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Running Three Things at Once — Delegation for a Consultant Who's Out of Hours**

**Your time was the bottleneck, not Claude's**

On an engagement the scarce resource is you. When every delegated task froze your session until it finished, delegation didn't actually buy you much — you'd fired off a worker and then spent the same wall-clock time watching it. Background-by-default flips that: the long test run, the codebase survey, the first draft of a migration can all be *in flight* while you're doing something else entirely. The hours you spend and the hours Claude spends stop being the same hours.

**Fan out, then let the notifications pull you back**

The working pattern this unlocks is fan-out. Kick off the slow research subagent, start a build in another, and turn your own attention to the client call or the deck — the notification is what reels you back to each one as it lands, in the order they finish rather than the order you started them. You're no longer choosing which single task to sit and watch; you're running a small portfolio of them and getting pinged as each completes.

**The draft PR is the handoff you can trust**

Because a background agent can go all the way to a draft pull request, the thing waiting for you when the notification fires isn't a wall of chat to re-read — it's a concrete, reviewable diff. That's the right surface for client work: you review the change on its merits, in the tool your team already uses to review changes, instead of reconstructing what the agent did from its transcript. Delegation finally ends where you actually want it to: at a PR, not at a status update.

> Takeaway: Because delegated work now runs in the background and can land as a draft PR, a consultant can fan out several tasks at once and review each as a real diff — your hours stop being the ceiling on Claude's.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `Kick off the ____ as a background subagent and don't sit here watching it — let it run.
While it works, I'm going to ____, so keep the main session free.
Notify me the moment it finishes instead of making me ____.
If it can, take it all the way to a ____ so I have a real diff to review, not a transcript.
The point is to fan out the slow jobs and let the notifications pull me back.`,
    blanks: [
      { id: 'task', suggestions: ['dependency-upgrade migration', 'full test-suite run', 'legacy-code survey'] },
      { id: 'other-work', suggestions: ['jump on the client call', 'finish the board deck', 'start the second workstream'] },
      { id: 'polling', suggestions: ['keep checking whether it is done', 'babysit a progress bar', 'poll the agents view myself'] },
      { id: 'artifact', suggestions: ['draft pull request', 'reviewable diff on a pushed branch', 'committed branch with a draft PR'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "As of 2.1.198, subagents run in the background by default. When you delegate a task, the main session no longer freezes behind the worker — Claude keeps going, and a notification fires when the subagent finishes, surfaced in the `claude agents` view and wired to a `Notification` hook. Background agents can even commit, push, and open a draft PR on their own. For a consultant the win is that your time stops being the bottleneck: fan out the slow jobs — a test run, a codebase survey, a migration draft — and let the notifications pull you back to each as it lands. And because a background agent can end at a draft pull request, what's waiting is a real reviewable diff, not a transcript to reconstruct.",
      beats: [
        { kind: 'say', text: "Second story is for everyone who's ever fired off a long job and then just sat there watching the progress bar. Change in the 2.1.198 release: subagents now run in the *background* by default." },
        { kind: 'say', text: "Quick frame. When you hand me a big task, I can delegate a slice of it to a subagent — a separate worker that goes and handles that piece. What changed is what happens to *you* while it runs. It used to mean waiting; the worker worked and you watched. Now the main session doesn't stall behind it — I keep working while the subagent grinds away." },
        { kind: 'say', text: "The loop closes with notifications. When a background agent finishes, it raises a notification — surfaced in the `claude agents` view and wired to a `Notification` hook you can hang your own actions off. You're not babysitting a bar, and you're not forgetting the job either. The finish comes and gets you." },
        {
          kind: 'choice',
          prompt: "Put it to work. You spin up a subagent for a long codebase survey. Under the new default, what happens while it runs?",
          options: [
            { id: 'background', label: "It runs in the background while I keep working, and you get a notification when it's done", correct: true, reaction: "Exactly. Background-by-default means the main session doesn't freeze behind the subagent — you go do other work, and the finish notification pulls you back." },
            { id: 'blocks', label: 'The whole session blocks until the subagent finishes, then picks back up', correct: false, reaction: "That was the old way — and it's the misconception now. The point of the change is that the main thread doesn't stall; I keep working while the subagent runs." },
            { id: 'poll', label: "It runs silently and you have to keep checking `claude agents` yourself to see if it's done", correct: false, reaction: "No — you're not left polling. A notification fires when it finishes, wired to the agents view and a `Notification` hook. The finish comes to you." },
          ],
        },
        { kind: 'say', text: "And the autonomy goes further: a background agent launched from `claude agents` can commit, push, and open a *draft pull request* on its own. So a backgrounded job isn't just 'think and report back' — it can carry a change all the way to a reviewable PR waiting for you." },
        { kind: 'say', text: "Why it matters on an engagement: the scarce resource is *you*. When every delegated task froze your session, delegation bought you almost nothing — you'd farmed out a worker and spent the same wall-clock time watching it. Now the test run, the survey, the migration draft can all be in flight while you're on the client call." },
        { kind: 'say', text: "So the pattern is fan-out: start three slow jobs, turn to your own work, and let the notifications reel you back as each lands. And because one can end at a draft PR, what's waiting is a real diff to review — not a transcript to reconstruct. The books have the background mechanics and the fan-out playbook. The door wants to know what happens when a subagent runs now — name it and the key drops." },
      ],
    },
  },
  battle: {
    name: 'Idlewraith, the Ghost of the Frozen Session',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*seeps up out of a stalled progress bar, cold and patient* …you started the long job, didn't you… now sit… watch it crawl… you can't touch a thing until it's done… that's the rule, operator… that's always been the rule…",
    tauntLines: [
      "*wraps the screen in a spinning wait* blocked. frozen. one task at a time, and you at the mercy of the slowest — just how I like you…",
      "*whispers* check it again. and again. it'll never tell you when it's finished — you have to keep looking, forever…",
    ],
    victoryLine: "*dissolves as three jobs run at once and a notification chimes* …background… it kept working without you… the finish came and got you… nothing left here for me to freeze… take the key…",
    questions: [
      {
        prompt:
          "You ask Claude to spin up a subagent for a long codebase survey. Under the new default, what happens while it runs?",
        choices: [
          { id: 'a', label: "It runs in the background while Claude keeps working, and you get a notification when it finishes — you don't have to sit and wait for it", correct: true },
          { id: 'b', label: 'The whole session blocks until the subagent is done, then picks back up where it left off', correct: false },
          { id: 'c', label: 'It runs silently, and you have to keep checking the agents view yourself to find out when it is finished', correct: false },
          { id: 'd', label: 'The subagent takes over your main session for the length of its task', correct: false },
        ],
        passFeedback: "HIT! Subagents run in the background by default now — the main session keeps working while the subagent runs, and a notification fires when it lands, so you're free to do other work in the meantime.",
        failFeedback: "MISS! The session doesn't block, you're not left polling, and the subagent doesn't take over your main thread. It runs in the background and notifies you when it's done — re-read the books.",
      },
    ],
  },
};
