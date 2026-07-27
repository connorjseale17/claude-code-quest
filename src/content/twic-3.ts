import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — the `DirectoryAdded` hook: a hook event that fires
 * *after* a new working directory is registered mid-session, whether by the
 * `/add-dir` command or the SDK `register_repo_root` control request.
 * Final room — door target routes to the TwicStampScreen via currentTrack.
 * Source: Claude Code CHANGELOG 2.1.219 ("Added `DirectoryAdded` hook that
 * fires after `/add-dir` or the SDK `register_repo_root` control request
 * registers a new working directory mid-session").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Final room of the issue, and the Beat Reporter saves a builder's tool for last: a new hook that fires the moment your session grows. `DirectoryAdded` triggers *after* a new working directory joins the session mid-flight — pulled in by the `/add-dir` command or, from the SDK, a `register_repo_root` control request — giving your automation a place to react the instant a fresh repo comes into scope. The two pages cover exactly when the hook fires and what a consultant hangs off it when a session sprawls across a client's many repos. Beat the door's question for the key that completes the issue — and mind the wyrm beyond it, which grows a whole new door every time you widen its lair.",
  prompt:
    "The new `DirectoryAdded` hook fires at exactly which moment?",
  choices: [
    { id: 'a', label: "After `/add-dir` (or the SDK `register_repo_root` control request) registers a new working directory mid-session", correct: true },
    { id: 'b', label: "Every time Claude edits or writes a file inside any of the session's directories", correct: false },
    { id: 'c', label: "Once at session startup, for the initial working directory only", correct: false },
    { id: 'd', label: "*Before* a directory is added, so your hook can veto the addition", correct: false },
  ],
  passFeedback: "HIT! `DirectoryAdded` fires *after* a new working directory is registered mid-session — via `/add-dir` or the SDK's `register_repo_root`. It's an event that says 'a new directory just joined,' not a file-edit trigger and not a startup one-shot.",
  failFeedback: "MISS! It's not a per-edit hook, not a startup-only hook, and not a pre-add veto. It fires *after* a new working directory is registered mid-session. Re-read Book 1.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**The \`DirectoryAdded\` Hook — A Trigger for "The Session Just Grew"**

**What the changelog added**

Verbatim from 2.1.219: *"Added \`DirectoryAdded\` hook that fires after \`/add-dir\` or the SDK \`register_repo_root\` control request registers a new working directory mid-session."* Hooks, as a whole, are how you attach your own command to a moment in Claude's lifecycle — a specific event happens, your script runs. This release adds a new event to hang things off of, and its moment is precise: *a new working directory just became part of this session.*

**The two triggers, one event**

There are exactly two ways to reach this event, and the changelog names both. Interactively, you run \`/add-dir\` to pull another folder into the session's working set. Programmatically, an SDK integration issues a \`register_repo_root\` control request to do the same thing from code. Either path ends the same way: a directory that wasn't in scope a second ago now is — and \`DirectoryAdded\` fires so your automation knows.

**"After," not "before"**

The timing word matters. This hook fires *after* the registration, not before it. That means it is not a gate you use to approve or veto which folders get added — by the time your handler runs, the directory is already in scope. Its job is to *react* to a completed addition: the new territory is real, and now you get to do something about it. Think of it as a welcome mat that unrolls the instant a new directory steps through the door, not a bouncer deciding who gets in.

> Takeaway: \`DirectoryAdded\` is a hook event that fires *after* \`/add-dir\` or an SDK \`register_repo_root\` registers a new working directory mid-session — a reliable "a folder just joined" signal, not a pre-add gate.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**One Session, Many Repos — Automating the Welcome**

**Why a consultant's sessions grow mid-flight**

Book 1 told you *when* the hook fires; here's what to do with it. Real engagements rarely stay inside one folder. You start in the client's main app, then halfway through you realize the fix also touches their shared component library, their infra repo, or a sibling service — so you \`/add-dir\` it and keep going. Every one of those additions is a small moment of risk: the new directory arrives with its *own* conventions, its own setup steps, its own gotchas, and none of them are loaded into your head or the session yet.

**Hang the prep on the hook**

\`DirectoryAdded\` is where you make that moment automatic instead of manual. Because it fires the instant a folder joins, it's the natural place to run whatever "onboard a new repo" routine you'd otherwise do by hand: surface that repo's contributing rules, print the one-line reminder about its quirks, kick off its dependency install, or note in the session which coding standard now applies here. The directory came into scope and, in the same breath, your handler prepped it — so the second repo gets the same disciplined start the first one did.

**Consistency across a sprawling session**

The deeper win is uniformity. When a session ends up spanning four of a client's repos, the failure mode is that the first repo got your careful setup and the later three got a shrug. A \`DirectoryAdded\` handler closes that gap: every directory, whether it joined at minute one or minute forty, is greeted by the same routine. And because the SDK's \`register_repo_root\` triggers the identical event, a headless or automated integration that widens its own scope gets the same treatment as a human typing \`/add-dir\` — one hook, both paths, no directory left un-welcomed.

> Takeaway: Use a \`DirectoryAdded\` handler to auto-onboard every repo that joins a session mid-flight — install, surface conventions, set standards — so a session sprawling across a client's many repos treats the fortieth-minute directory as carefully as the first.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `My session started in the client's main app, but the fix also reaches ____,
so I'll /add-dir it mid-session instead of opening a whole new session.
I've got a DirectoryAdded hook wired up, and because it fires ____
a new directory is registered, my handler will automatically ____
for the repo that just joined.
That way the ____ repo gets the same disciplined start as the first one.`,
    blanks: [
      { id: 'other-repo', suggestions: ['their shared component library', 'a sibling backend service', 'the infrastructure repo'] },
      { id: 'timing', suggestions: ['right after', 'the instant', 'as soon as'] },
      { id: 'prep', suggestions: ['install its dependencies and surface its conventions', 'print its quirks and set the right coding standard', 'run its setup routine and load its contributing rules'] },
      { id: 'which', suggestions: ['fortieth-minute', 'later-added', 'second and third'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "The new `DirectoryAdded` hook (2.1.219) fires *after* a new working directory is registered mid-session — reachable two ways: the interactive `/add-dir` command, or the SDK's `register_repo_root` control request. Hooks attach your own command to a moment in Claude's lifecycle, and this event's moment is 'a folder just joined the session.' It fires *after* the addition, so it's a reactor, not a pre-add veto. For a consultant whose sessions grow across a client's many repos, it's the place to auto-onboard each new directory — install deps, surface that repo's conventions, set the right standard — so a session sprawling across four repos treats the fortieth-minute directory as carefully as the first, whether a human typed `/add-dir` or an SDK integration widened its own scope.",
      beats: [
        { kind: 'say', text: "Last story of the issue, and it's one for the builders. New hook event in 2.1.219: `DirectoryAdded`. Hooks, in general, let you bolt your own command onto a moment in my lifecycle — an event happens, your script runs. This release adds a new moment to bolt onto, and it's a specific one: a new working directory just joined the session." },
        { kind: 'say', text: "Two ways to reach that event, and the changelog names both. You type `/add-dir` to pull another folder into scope. Or, from the SDK, an integration sends a `register_repo_root` control request to do it from code. Different doors, same room — either way a directory that wasn't in scope a moment ago now is, and the hook fires." },
        { kind: 'say', text: "Mind the timing word: it fires *after* the directory is registered, not before. So this isn't a bouncer you use to veto which folders get in — by the time your handler runs, the folder's already inside. It's a welcome mat. The new territory is real, and now you get to do something about it." },
        {
          kind: 'choice',
          prompt: "Before the door — which of these is a job `DirectoryAdded` is actually built for?",
          options: [
            { id: 'onboard', label: "Auto-running a repo's setup — install deps, surface its conventions — the instant that repo is added to the session", correct: true, reaction: "That's the one. It fires right as the folder joins, so it's the natural home for 'onboard this new repo' work you'd otherwise do by hand every time." },
            { id: 'veto', label: "Blocking a folder from being added unless it passes a check first", correct: false, reaction: "No — it fires *after* the registration, so the folder's already in scope when your handler runs. It reacts to the addition; it can't gate it." },
            { id: 'per-edit', label: "Running a linter every single time I edit a file in that directory", correct: false, reaction: "That's a per-edit trigger, a different event. `DirectoryAdded` fires once, when the directory *joins* — not on every file change inside it." },
          ],
        },
        { kind: 'say', text: "Here's why it earns a spot in a consultant's kit. Real engagements don't stay in one folder. You start in the client's main app, then the fix turns out to touch their component library or a sibling service — so you `/add-dir` it and keep moving. But each new folder arrives with its own conventions, its own setup, its own gotchas, and none of that is loaded yet. That's a small moment of risk, repeated." },
        { kind: 'say', text: "So hang the prep on the hook. Fire the 'new repo' routine automatically the instant a folder joins — install its dependencies, print its quirks, set the coding standard that applies there, surface its contributing rules. The real prize is consistency: when a session ends up spanning four of a client's repos, you don't want the first one carefully set up and the last three shrugged at. One handler greets every directory the same — and since the SDK's `register_repo_root` fires the same event, an automated integration gets the identical welcome a human typing `/add-dir` does." },
        { kind: 'say', text: "The books have the precise firing moment and the multi-repo playbook. The door only wants the timing: *when* does `DirectoryAdded` fire? Answer that for the key that finishes the whole issue. Then square up to the wyrm — it grows a fresh door onto its hoard every time you widen its lair, and it's counting on you never having a routine ready for the new one." },
      ],
    },
  },
  battle: {
    name: 'Wend, the Manydoored Wyrm',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*the wyrm uncoils across a hoard that sprawls through door after door, and as it sees you a NEW archway groans open in the far wall, a fresh chamber it has never once prepared* …widen my lair, will you?… every directory you add, another door onto my gold… and not one of them made ready, not one of them greeted… come, let the sprawl swallow you…",
    tauntLines: [
      "*a new wing yawns open, unfamiliar and unswept* another repo, another set of rules you haven't loaded — I add doors faster than you can ever walk them, and you meet each one cold and empty-handed…",
      "*coils tighten around a fortieth chamber* the first room you prepared so carefully… and all the ones after? a shrug, a guess, a gotcha you never saw coming — THAT is how a sprawling session dies…",
    ],
    victoryLine: "*a mat unrolls at every threshold at once, each new door greeted the instant it opens, and the wyrm sags* …a hook at every doorway… the fortieth chamber welcomed like the first… you widened the lair and it was *ready*… take the key, operator… the issue is yours…",
    questions: [
      {
        prompt:
          "The new `DirectoryAdded` hook fires at exactly which moment?",
        choices: [
          { id: 'a', label: "After `/add-dir` (or the SDK `register_repo_root` control request) registers a new working directory mid-session", correct: true },
          { id: 'b', label: "Every time Claude edits or writes a file inside any of the session's directories", correct: false },
          { id: 'c', label: "Once at session startup, for the initial working directory only", correct: false },
          { id: 'd', label: "*Before* a directory is added, so your hook can veto the addition", correct: false },
        ],
        passFeedback: "HIT! `DirectoryAdded` fires *after* a new working directory is registered mid-session — via `/add-dir` or the SDK's `register_repo_root`. It's an event that says 'a new directory just joined,' not a file-edit trigger and not a startup one-shot.",
        failFeedback: "MISS! It's not a per-edit hook, not a startup-only hook, and not a pre-add veto. It fires *after* a new working directory is registered mid-session. Re-read Book 1.",
      },
    ],
  },
};
