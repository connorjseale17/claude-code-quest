import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — `onFailure: "block"` for command and HTTP hooks.
 * Claude Code adds a way to make a hook fail *shut*. A command or HTTP hook
 * that can't start, times out, or exits with an unexpected code would, by
 * default, let the action it guards through (fail-open). With
 * `onFailure: "block"`, those same infrastructure failures block the action
 * instead — so a crashed or hung guard stops the work rather than silently
 * waving it past. This is about the hook *failing*, distinct from a hook that
 * deliberately returns a block verdict.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.295: "Added `onFailure: "block"` for command
 *     and HTTP hooks: a hook that can't start, times out, or exits with an
 *     unexpected code blocks the action instead of letting it through"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room one of this week's rundown, and the Beat Reporter points past a skeleton warden whose gate swings wide every time he trips over his own feet. This week's lead item is the fix for exactly that failure: as of 2.1.295, a command or HTTP hook can be set with `onFailure: \"block\"`, so a hook that can't start, times out, or exits with an unexpected code blocks the action it was guarding instead of letting it through. One book covers the mechanic — how a *broken* hook becomes a hard stop rather than an open door; the other, why a consultant makes the load-bearing guards fail toward safety. Answer the door for the key, then face Nullgate, the warden whose gate has never once stayed shut when he stumbled.",
  prompt:
    "You set `onFailure: \"block\"` on a command hook that scans for secrets before a push. Mid-engagement, the scan script times out. What does Claude Code do?",
  choices: [
    { id: 'a', label: "Blocks the push — with `onFailure: \"block\"`, a hook that can't start, times out, or exits with an unexpected code stops the action instead of letting it through", correct: true },
    { id: 'b', label: "Retries the scan script automatically until it finally exits cleanly, then allows the push", correct: false },
    { id: 'c', label: "Lets the push through but logs a warning — a timeout isn't the same as the scan actually finding a secret", correct: false },
    { id: 'd', label: "Blocks every push from that point on, whether or not the hook fails again", correct: false },
  ],
  passFeedback: "HIT! `onFailure: \"block\"` makes a hook that can't start, times out, or exits with an unexpected code fail *shut* — the action it guards is blocked, not waved through.",
  failFeedback: "MISS! It doesn't retry the script, shrug off the timeout, or block unconditionally. A broken guard under `onFailure: \"block\"` stops the action — that's the whole point. Re-read Book 1.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**The Gate That Fails Shut — \`onFailure: "block"\` Turns a Broken Hook Into a Hard Stop**

**Hooks are the gate across the work**

A hook is a check Claude Code runs at a moment in its lifecycle — before a command runs, around a tool call — and the check gets to say whether the action proceeds. A *command* hook runs a shell command you point it at; an *HTTP* hook POSTs to an endpoint you name. Either way, the shape is the same: the action pauses, the hook runs, and its result decides whether the gate opens. That is the gate you hang across the work.

**When the gate itself breaks**

Here's the failure this feature is about, and it's a subtle one. A hook can fail for reasons that have nothing to do with its verdict. The command can't start — a bad path, a missing interpreter. It hangs and times out. It exits with a code Claude Code didn't expect. None of those is the hook saying "block"; they're the hook *falling over*. And by default, a hook that falls over lets the action through — the guard trips, and the gate swings open behind it.

**\`onFailure: "block"\` flips the default to fail-shut**

Set \`onFailure: "block"\` on a command or HTTP hook and those same three failures — can't start, times out, exits with an unexpected code — now *block* the action instead of letting it through. The infrastructure of the hook failing is treated as a reason to stop, not a reason to shrug. A guard that can't run is no longer a guard that waves everything past; it's a closed gate until the problem is fixed. You're choosing which way the hook errs when it can't give a clean answer.

> Takeaway: \`onFailure: "block"\` decides which way a hook fails — set it, and a hook that can't start, times out, or exits wrong stops the action instead of letting it slip through.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Make the Load-Bearing Guards Fail Toward Safety — Why a Consultant Blocks on a Broken Hook**

**A check that fails open is a check you can't trust**

The entire value of a guard — a secret scanner, a license check, a policy gate on a client's repo — is that it's reliable. If it quietly passes the action every time it errors, then the one moment it matters is the one moment it protects nothing: the endpoint is down, the script has a typo, the scan takes a beat too long, and the thing you installed it to catch sails straight through. A guard you can't trust to be running isn't a guard; it's a comforting decoration. Failing shut is how you turn it back into a real one.

**Not every hook should block — pick the load-bearing ones**

This is a judgment call, not a blanket setting. A cosmetic formatter that times out and blocks your commit is just friction; nothing was at stake. A secret-leak scanner that times out and waves a push through is a breach. The consultant's skill is telling which gates are load-bearing — the ones where a false pass is a real incident — and throwing \`onFailure: "block"\` on *those*, while leaving the merely-nice-to-have checks free to fail open. Fail-shut is a tool you aim, not a mood you apply to everything.

**If it blocks, make blocking rare and legible**

Because a fail-shut hook stops real work when it breaks, two things follow. Keep the hook fast and robust, so it rarely falls over in the first place — a gate that blocks on its own flakiness teaches people to resent it. And make its failure output clear, so when it does block, the operator knows *why* in a glance and can fix the cause instead of fighting the gate. A blocking guard that's quick and self-explaining is one your whole team will leave in place.

> Takeaway: Throw \`onFailure: "block"\` on the guards where a false pass is a real incident, and keep those hooks fast and clearly-spoken so blocking stays rare and never mysterious.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `I'm hardening a client's repo and one check is non-negotiable: ____.
I wire it as a ____ hook so it runs right before the action it guards.
But a guard that waves the action through whenever it errors protects nothing,
so I set ____ on it — now if the hook can't start, times out, or exits wrong, the action is blocked instead of let through.
I keep the hook fast and its failure message clear, so it blocks rarely and never leaves anyone guessing why.`,
    blanks: [
      { id: 'guard', suggestions: ['a secret-leak scan', 'a license-compliance check', 'a dependency-vulnerability scan'] },
      { id: 'hook-type', suggestions: ['command', 'HTTP', 'command or HTTP'] },
      { id: 'setting', suggestions: ['`onFailure: "block"`', 'the block-on-failure setting', 'onFailure to block'] },
      { id: 'why', suggestions: ['so the gate fails shut', 'to make it fail toward safety', 'so a crash stops the work'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "`onFailure: \"block\"` for command and HTTP hooks (Claude Code 2.1.295): a hook can fail for reasons that aren't a verdict — it can't start, it times out, or it exits with an unexpected code. By default that kind of failure lets the guarded action through (fail-open). Set `onFailure: \"block\"` and those same failures block the action instead (fail-shut) — a broken guard becomes a closed gate rather than an open door. It's about the hook *failing*, not a hook that deliberately returns block. For a consultant: a guard that fails open protects nothing the moment it matters, so throw `onFailure: \"block\"` on the load-bearing checks — secret scans, license and policy gates — where a false pass is a real incident, while leaving cosmetic checks free to fail open. Keep the blocking hooks fast and their failure output legible, so blocking stays rare and never mysterious.",
      beats: [
        { kind: 'say', text: "Lead item, room one. It's about what your safety checks do when they don't just say no — when they outright break. As of 2.1.295 you get to decide which way they fail." },
        { kind: 'say', text: "Start with the gate. A hook runs at a moment in my lifecycle — before a command, around a tool call — and its result says whether the action goes ahead. A command hook runs a shell command; an HTTP hook POSTs to an endpoint. That's the guard you hang across the work." },
        { kind: 'say', text: "Now the subtle part. A hook can fail for reasons that have nothing to do with its verdict: it can't start, it hangs and times out, it exits with a code I didn't expect. That's not the hook saying 'block' — that's the hook falling over. And by default, a hook that falls over lets the action through. The guard trips, the gate swings open." },
        {
          kind: 'choice',
          prompt: "You've got a secret-scanning command hook on a client's repo. One day the scan script times out before it can finish. With the default behavior — no onFailure set — what happens to the push?",
          options: [
            { id: 'through', label: "It goes through — a timed-out hook fails open by default", correct: true, reaction: "Right, and that's exactly the trap. The scan never rendered a verdict, but the default lets the action past anyway. The one time the guard breaks is the one time it protects nothing." },
            { id: 'blocked', label: "It's blocked automatically — a failed hook always stops the action", correct: false, reaction: "Not by default — that's what `onFailure: \"block\"` is *for*. Without it, a hook that can't finish fails open and the push sails through." },
            { id: 'retry', label: "I retry the scan until it finally passes", correct: false, reaction: "There's no auto-retry here. Left on the default, the timed-out hook doesn't retry — it just lets the action through. You'd never know it didn't run." },
          ],
        },
        { kind: 'say', text: "So here's the switch: set `onFailure: \"block\"` on that command or HTTP hook. Now those same failures — can't start, times out, exits wrong — block the action instead of letting it through. A guard that can't run becomes a closed gate, not an open door. You've chosen which way it errs when it can't give a clean answer." },
        { kind: 'say', text: "The engagement read: don't block on *everything*. A formatter that times out and stops your commit is just friction. A secret scanner that times out and waves the push through is a breach. Your job is spotting the load-bearing guards — where a false pass is a real incident — and failing those shut while the nice-to-haves stay free to fail open." },
        { kind: 'say', text: "One caution from the books: if a hook is going to block on failure, keep it fast and robust so it rarely falls over, and make its failure message clear so the operator knows *why* in a glance. A gate that blocks on its own flakiness, silently, is one people rip out. The books have the mechanic and the read. Grab the key — then square up to Nullgate, the warden whose gate never once stayed shut when he stumbled." },
      ],
    },
  },
  battle: {
    name: 'Nullgate, the Fail-Open Warden',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a skeleton warden heaves upright at a gate whose hinges have rusted half-open, bones clattering as he lurches and the gate yawns wider behind him* …every time I stumble, the gate falls open… every time my check chokes, the thing I was set to stop walks right past me… it is the only way I have ever failed. You claim there's a word — \`onFailure: \"block\"\` — that would make a broken guard slam *shut* instead? …say true what it does when the hook falls over, before I let one more scroll slip my gate.",
    tauntLines: [
      "*the gate groans open as he waves a withered hand* you'd have the tool *retry* my choking check, over and over, until it coughs up a clean answer?! no… there is no endless retry here — set, it simply *blocks*, and the push dies at my feet…",
      "*rattles, suddenly wary* you think it blocks *everything* once thrown — every scroll, forever, fail or no fail?! never… it blocks only when the hook itself breaks — can't start, times out, exits wrong — and lets a clean verdict rule otherwise…",
    ],
    victoryLine: "*Nullgate reaches back and, for the first time in an age, hauls the gate closed behind him* …\`onFailure: \"block\"\`… a hook that cannot start, that times out, that exits wrong… it no longer opens my gate — it *shuts* it… the broken guard was always meant to stop the work, not wave it through… take the key, operator, and let nothing slip a gate that failed.",
    questions: [
      {
        prompt:
          "You set `onFailure: \"block\"` on a command hook that scans for secrets before a push. Mid-engagement, the scan script times out. What does Claude Code do?",
        choices: [
          { id: 'a', label: "Blocks the push — with `onFailure: \"block\"`, a hook that can't start, times out, or exits with an unexpected code stops the action instead of letting it through", correct: true },
          { id: 'b', label: "Retries the scan script automatically until it finally exits cleanly, then allows the push", correct: false },
          { id: 'c', label: "Lets the push through but logs a warning — a timeout isn't the same as the scan actually finding a secret", correct: false },
          { id: 'd', label: "Blocks every push from that point on, whether or not the hook fails again", correct: false },
        ],
        passFeedback: "HIT! `onFailure: \"block\"` makes a hook that can't start, times out, or exits with an unexpected code fail *shut* — the action it guards is blocked, not waved through.",
        failFeedback: "MISS! It doesn't retry the script, shrug off the timeout, or block unconditionally. A broken guard under `onFailure: \"block\"` stops the action — that's the whole point. Re-read Book 1.",
      },
    ],
  },
};
