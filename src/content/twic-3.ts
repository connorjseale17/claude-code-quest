import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — hook progress heartbeat in `claude -p` and SDK sessions.
 * Claude Code CHANGELOG 2.1.323 added a progress heartbeat emitted every 30
 * seconds while a hook runs long, in non-interactive `claude -p` runs and SDK
 * sessions. It's a liveness signal so a long-running hook doesn't look hung to
 * the caller/pipeline — it does NOT speed the hook up, cancel it, or change
 * interactive terminal sessions (which already show their own activity).
 * Sources:
 *   - Claude Code CHANGELOG 2.1.323: "Added a progress heartbeat every 30
 *     seconds while hooks run long in `claude -p` and SDK sessions."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Final room of the issue. The Beat Reporter steps wide around a vast dragon coiled in the dark, so still that you genuinely can't tell whether it's breathing or long dead — which, she says, is the whole point of this week's closing item. In 2.1.323 Claude Code added a *progress heartbeat*: in non-interactive `-p` runs and SDK sessions, when a hook runs long, the session now emits a signal every 30 seconds so the thing calling it knows the hook is still *working* and hasn't silently hung. One book covers the mechanic — what the heartbeat is and, just as important, what it is *not*; the other, why an automation-building consultant stops guessing once it's there. Finish the issue here, win the key, then face Dormant, the wyrm who could be alive or could be dead and gives you no way to know.",
  prompt:
    "A PreToolUse hook in your headless `claude -p` pipeline kicks off a 4-minute scan. Thanks to the 2.1.323 heartbeat, what do you now get while it runs?",
  choices: [
    { id: 'a', label: "Every 30 seconds while the hook runs long, the session emits a progress heartbeat, so the pipeline can tell the hook is still working rather than silently hung", correct: true },
    { id: 'b', label: "The heartbeat runs the hook in the background so it finishes faster", correct: false },
    { id: 'c', label: "Any hook that runs longer than 30 seconds is automatically cancelled", correct: false },
    { id: 'd', label: "It only shows up in interactive terminal sessions as a spinner; `-p` and SDK runs are unaffected", correct: false },
  ],
  passFeedback: "HIT! The heartbeat is a liveness signal: every 30 seconds a long-running hook is still going, `claude -p` and SDK sessions say so — so a slow hook reads as 'working,' not 'frozen.' It doesn't change how fast the hook runs.",
  failFeedback: "MISS! It doesn't speed the hook up, it doesn't cancel it, and it's for `-p`/SDK runs — not an interactive-only spinner. It just proves the long hook is still alive. Re-read Book 1.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**Proof of Life for a Long Hook — What the Heartbeat Is, and What It Isn't**

**The silence problem**

A hook is your own code that Claude Code runs at a defined moment — before a tool call, after one, when a session starts. Most finish in a blink. But some do real work: a \`PreToolUse\` hook that runs a security scan, a formatter over a large tree, a check that calls out to a slow service. While that hook is grinding away, the session is waiting on it — and in a run with no human watching the screen, that wait looks identical to a crash. Thirty seconds of silence, ninety seconds, three minutes: is it working, or is it wedged? From the outside you can't tell.

**What 2.1.323 added**

The fix, added in 2.1.323, is a *progress heartbeat*. In non-interactive \`claude -p\` runs and in SDK sessions, while a hook runs long, the session now emits a heartbeat **every 30 seconds**. It's a small, regular pulse that says the same plain thing each time: *still here, still running*. The long silence becomes a steady drumbeat, and the caller — a pipeline, a parent process, a dashboard tailing the run — has a signal it can watch for.

**Why those two surfaces specifically**

The heartbeat targets \`-p\` and SDK on purpose, because those are the sessions with no spinner to read. An interactive terminal already shows you it's alive — there's activity on screen, a human right there. A headless \`-p\` run feeding a CI step, or an SDK session embedded in your own program, has none of that; it's a black box to whatever launched it. The heartbeat gives those blind surfaces the liveness cue the terminal always had.

**Hold on to what it does *not* do**

This is the part to say clearly. The heartbeat does not make the hook faster — a four-minute scan still takes four minutes. It does not cancel or time out a long hook. It does not change interactive sessions. It is *purely* a liveness signal: evidence the hook is still working, nothing more. Mistaking it for a speed-up or a kill-switch is the easy error here.

> Takeaway: In \`-p\` and SDK runs, a long-running hook now pulses a heartbeat every 30 seconds so it reads as \"working\" instead of \"frozen\" — it proves life, it doesn't change speed, cancel anything, or touch interactive sessions.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**No More Guessing at the Black Box — Building Automation You Can Actually Trust**

**The decision you used to have to guess**

If you've wired Claude Code into anything headless — a CI job, a scheduled pipeline, an SDK integration inside your own tooling — you've hit the moment this solves. A step goes quiet. Your automation has to decide, blind, whether to keep waiting or to give up. Set the timeout too short and you kill a hook that was doing honest, slow work. Set it too generous and a genuinely wedged run ties up the pipeline for ages before anyone notices. Without a signal, every such threshold was a guess dressed up as a number.

**What the heartbeat lets you build**

A steady 30-second pulse turns that guess into a rule. Your surrounding automation can treat *heartbeats still arriving* as \"healthy, keep waiting\" and *heartbeats stopped* as \"actually stuck, act now.\" That's a far sharper liveness check than a fixed wall-clock timeout, because it distinguishes the two cases a timeout smears together: slow-but-fine and truly-hung. The long-running hook you were nervous to put in an unattended pipeline becomes one you can supervise on evidence instead of on faith.

**Spend the signal where it earns its keep**

Not every hook needs this attention — the ones that finish instantly were never the problem. Point the thinking at the heavy hooks: the scans, the big formatters, the checks that reach out to something slow. For those, design the pipeline around the pulse, and keep the client-facing promise honest: when you tell someone the overnight job is monitored, the heartbeat is the mechanism that makes \"monitored\" true rather than aspirational. A run that can prove it's alive is a run you can stand behind.

> Takeaway: Treat the heartbeat as the liveness contract for your automated runs — arriving pulses mean keep waiting, stopped pulses mean intervene — and you replace guessed timeouts around slow hooks with a signal you can actually build on.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `I run Claude Code headless in a nightly `+"`claude -p`"+` pipeline, and one step is a heavy ____ hook.
It takes minutes, and before 2.1.323 that long silence was indistinguishable from ____.
Now the session emits a ____ every 30 seconds while the hook runs long, so my pipeline can tell it apart.
I wire the automation to treat arriving pulses as "____" and stopped pulses as "____."
And I remember what it isn't: it doesn't make the hook faster or cancel it — it only proves the hook is still alive.`,
    blanks: [
      { id: 'hook-type', suggestions: ['PreToolUse security-scan', 'formatter-over-the-whole-tree', 'slow external-check'] },
      { id: 'a-crash', suggestions: ['a crash', 'a wedged, hung run', 'the process having died'] },
      { id: 'heartbeat', suggestions: ['progress heartbeat', 'liveness pulse', 'still-running signal'] },
      { id: 'healthy', suggestions: ['healthy, keep waiting', 'still working, hold', 'alive, let it finish'] },
      { id: 'stuck', suggestions: ['actually stuck, act now', 'truly hung, intervene', 'wedged, step in'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "Hook progress heartbeat (Claude Code 2.1.323): in non-interactive `claude -p` runs and SDK sessions, while a hook runs long, the session emits a progress heartbeat every 30 seconds. It's a liveness signal — proof the hook is still working — so a slow hook doesn't look identical to a crashed/hung one to the caller (a pipeline, parent process, or dashboard). It targets `-p` and SDK specifically because those have no on-screen spinner; interactive terminal sessions already show activity and are unchanged. Crucially, it does NOT speed the hook up, does NOT cancel or time out a long hook, and does NOT touch interactive sessions — it is purely a 'still alive' pulse. For automation builders: treat arriving heartbeats as 'healthy, keep waiting' and stopped heartbeats as 'stuck, intervene,' which beats a guessed wall-clock timeout because it separates slow-but-fine from truly-hung. Aim the attention at heavy hooks (scans, big formatters, slow external checks).",
      beats: [
        { kind: 'say', text: "Closing item, final room. A hook is your own code that Claude Code runs at a set moment — before a tool call, after one, at session start. Most finish in a blink. But some do real work: a `PreToolUse` scan, a formatter over a huge tree, a check that calls something slow." },
        { kind: 'say', text: "Here's the trouble with the slow ones. While that hook grinds, the session waits on it — and in a run with nobody watching the screen, waiting looks *exactly* like crashing. Thirty seconds of silence, two minutes, four. Working, or wedged? From outside the box you genuinely cannot tell." },
        { kind: 'say', text: "So 2.1.323 added a *progress heartbeat*. In `claude -p` runs and SDK sessions, while a hook runs long, the session emits a pulse every 30 seconds. Same plain message each time — still here, still running. The dead silence becomes a steady drumbeat the caller can watch for." },
        { kind: 'say', text: "Why only those two surfaces? Because they're the blind ones. An interactive terminal already shows it's alive — activity on screen, a human right there. A headless `-p` run feeding CI, or an SDK session buried in your own program, has none of that. The heartbeat hands those surfaces the liveness cue the terminal always had." },
        {
          kind: 'choice',
          prompt: "Careful here — this is where people over-read it. Does the heartbeat make a long hook finish *faster*, or does it just prove the hook is still *alive* while it takes however long it takes?",
          options: [
            { id: 'proves-alive', label: "Just proves it's alive — the hook takes exactly as long as before; you only get a signal that it's still working", correct: true, reaction: "Right. A four-minute scan is still four minutes. The heartbeat changes what you can *see*, not how fast the hook runs. It's proof of life, full stop." },
            { id: 'faster', label: "Faster — the pulse runs the hook in the background so it completes sooner", correct: false, reaction: "No — and that's the tempting misread. It doesn't touch the hook's speed at all. It's purely a liveness signal layered over a hook that runs exactly as long as it always would." },
            { id: 'kills', label: "It cancels the hook once it crosses 30 seconds", correct: false, reaction: "Not that either. It reports progress; it doesn't time out or kill anything. A hook can heartbeat for minutes and finish fine — the pulse never cuts it off." },
          ],
        },
        { kind: 'say', text: "Now the payoff, because this is really an automation feature. If you've wired Claude Code into anything headless, you've hit the blind-timeout problem: a step goes quiet, and you have to guess — keep waiting, or give up? Too short a timeout kills honest slow work; too long lets a truly stuck run tie up the pipeline." },
        { kind: 'say', text: "The pulse turns that guess into a rule. Heartbeats still arriving means 'healthy, keep waiting.' Heartbeats stopped means 'actually stuck, act now.' That separates the two cases a flat timeout smears together — slow-but-fine versus genuinely-hung — so the long hook you were nervous to automate becomes one you can supervise on evidence. Point it at the heavy hooks; the instant ones were never the problem." },
        { kind: 'say', text: "That closes the issue. Take the key — then face Dormant, the wyrm so still you can't tell if it breathes. Give it a heartbeat and prove it's only sleeping." },
      ],
    },
  },
  battle: {
    name: 'Dormant, the Wyrm That Might Be Dead',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*an enormous dragon lies coiled and motionless in the dark, no rise and fall to its flanks, no sound at all* …look at me. am I breathing, or am I carrion?… you cannot tell, can you… that is how your headless runs saw every long hook before this week — a silence that might be work and might be death… *one eye cracks open* …tell me what the heartbeat gives you, and tell it exactly.",
    tauntLines: [
      "*the great bulk stays utterly still* you think the pulse makes me RISE faster — that it hurries the hook along?! no… I take as long as I take; the beat only tells you I'm not yet carrion…",
      "*a low, testing rumble* so you'd have the beat STRANGLE me at the thirty-second mark?! it cancels nothing — it reports, it does not kill; I may drum for minutes and finish whole…",
      "*one claw flexes* and you'd say it lights up only your pretty terminal spinner?! wrong — it's the headless and the SDK runs, the blind ones, that the beat was made for…",
    ],
    victoryLine: "*Dormant's flank finally lifts — a slow, deliberate breath, then another, each one a beat you can count* …there. alive, and now you can *tell* — not because I move faster, but because I say so every thirty seconds… take the key, operator. no more guessing whether the sleeper is dead.",
    questions: [
      {
        prompt:
          "A PreToolUse hook in your headless `claude -p` pipeline kicks off a 4-minute scan. Thanks to the 2.1.323 heartbeat, what do you now get while it runs?",
        choices: [
          { id: 'a', label: "Every 30 seconds while the hook runs long, the session emits a progress heartbeat, so the pipeline can tell the hook is still working rather than silently hung", correct: true },
          { id: 'b', label: "The heartbeat runs the hook in the background so it finishes faster", correct: false },
          { id: 'c', label: "Any hook that runs longer than 30 seconds is automatically cancelled", correct: false },
          { id: 'd', label: "It only shows up in interactive terminal sessions as a spinner; `-p` and SDK runs are unaffected", correct: false },
        ],
        passFeedback: "HIT! The heartbeat is a liveness signal: every 30 seconds a long-running hook is still going, `claude -p` and SDK sessions say so — so a slow hook reads as 'working,' not 'frozen.' It doesn't change how fast the hook runs.",
        failFeedback: "MISS! It doesn't speed the hook up, it doesn't cancel it, and it's for `-p`/SDK runs — not an interactive-only spinner. It just proves the long hook is still alive. Re-read Book 1.",
      },
    ],
  },
};
