import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — the send-now key. While Claude works a turn, messages you
 * type queue and, by default, wait for the turn to finish before Claude sees
 * them. Claude Code adds a send-now key — `ctrl+enter`, or the chord
 * `ctrl+x ctrl+s` — that interrupts the current turn and sends all queued
 * messages at once. It is one motion that both stops the running turn and
 * delivers what you typed, so a correction lands mid-course instead of after the
 * turn ends — a redirect, not a restart.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.275: "Added a send-now key (ctrl+enter, or
 *     ctrl+x ctrl+s) that interrupts the current turn and sends all queued
 *     messages at once."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room two, and the Beat Reporter is pacing beside a wraith clutching a fistful of messages it refuses to let through. This week's key is small and the save is big: 2.1.275 adds a send-now shortcut — `ctrl+enter`, or the chord `ctrl+x ctrl+s` — that interrupts the turn Claude is running and delivers everything you've queued at once. One book covers the mechanic, the other the supervisory reflex it unlocks — catching a wrong turn at second five instead of minute three. Take the key from the door, then face Backlog, the wraith that swears no message may pass until the turn is good and done.",
  prompt:
    "You're mid-turn, Claude is heading down the wrong path, and you've typed a correction. What does the send-now key (ctrl+enter, or ctrl+x ctrl+s) do?",
  choices: [
    { id: 'a', label: "Interrupts the current turn and delivers all your queued messages at once, so the correction lands now instead of after the turn ends", correct: true },
    { id: 'b', label: "Adds a new line to your message without sending, so you can keep drafting the correction", correct: false },
    { id: 'c', label: "Discards the current turn and everything you queued, returning you to an empty prompt", correct: false },
    { id: 'd', label: "Queues the message to send automatically, but only once the current turn finishes on its own", correct: false },
  ],
  passFeedback: "HIT! The send-now key does two things in one stroke — interrupts the running turn and delivers every queued message at once. You redirect the work mid-course instead of waiting for the wrong turn to finish.",
  failFeedback: "MISS! It doesn't grow your draft, reset to a blank prompt, or wait for the turn to end — it interrupts the turn and hands over what you queued, right now. Re-read Book 1.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**The Send-Now Key — Cutting In Line on a Running Turn**

**What a turn is, and why you wait**

When you give Claude an instruction, it works a *turn*: reading, editing, and running commands until it has an answer for you. You don't have to sit on your hands while it runs — you can keep typing, and the messages you enter *queue*. By default a queued message waits politely: Claude finishes the turn it's on, and only then picks up what you lined up next. Most of the time, that ordering is exactly what you want.

**The key that skips the wait**

2.1.275 adds a *send-now key* — \`ctrl+enter\`, or the chord \`ctrl+x ctrl+s\` — that interrupts the current turn and sends every queued message at once. Instead of your input waiting for the turn to end on its own, the key cuts in: the running turn is interrupted, and everything you'd queued is delivered right now, together. It's one motion that does two things — stop what's happening, and hand over what you just typed.

**Interrupt *and* deliver**

That pairing is the whole point. A bare interrupt stops the work but leaves you to say what you meant afterward; the send-now key stops the work *and* carries your queued words in the same stroke, so Claude picks up mid-course already holding your correction. You're not cancelling to an empty prompt and starting the thought over — you're redirecting a turn that's still in flight.

> Takeaway: \`ctrl+enter\` (or \`ctrl+x ctrl+s\`) interrupts the turn Claude is running and delivers all your queued messages at once — a redirect, not a restart.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Catch the Wrong Turn at Second Five — Why the Redirect Beats the Wait**

**The cost of a polite queue**

Picture a long autonomous run on a client's repo. Two sentences in, you see it: Claude is editing the wrong module, or reaching for an approach the client vetoed last sprint. Your correction is already typed. If it waits for the turn to finish, the wrong work finishes *first* — files changed, commands run, minutes gone — and only then does your note land, on top of a mess you now have to unwind. The very politeness of the queue is what costs you here.

**Steering, not stopping**

The send-now key turns that lag into a steering correction. You spot the drift, type *"no — the billing module is off-limits, use the adapter in \`src/legacy\`,"* and cut it in immediately. Claude stops the wrong turn and picks up your guidance in the same beat. The gap between catching a bad direction at second five and discovering it at minute three is the gap between one keystroke and an afternoon of cleanup.

**A muscle worth building**

For anyone supervising Claude on real work, this is a habit to wire in: watch the opening moves of a turn, and keep a hand near the redirect. You never have to choose between letting a wrong turn run to completion and hard-stopping into a blank slate. Queue the fix, send it now, and the run corrects course without losing the thread — the supervisory reflex that makes long autonomous stretches something you can actually trust.

> Takeaway: When a running turn drifts, don't wait it out and don't reset — queue your correction and send it now, so the work changes course the instant you catch it.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `I'm supervising Claude on a long refactor across a client's payments service.
Two moves in, I see it start editing the ____ the client told us to leave alone.
My correction is already typed, but by default it will ____ until the current turn ends.
Instead I hit the ____ — ctrl+enter, or ctrl+x ctrl+s — to cut it in immediately.
That does two things at once: it ____ the running turn and ____ everything I queued,
so Claude picks up my redirect mid-course instead of finishing the wrong work first.`,
    blanks: [
      { id: 'target', suggestions: ['legacy billing module', 'off-limits module', 'vetoed component'] },
      { id: 'wait', suggestions: ['wait in the queue', 'sit queued politely', 'hold until the turn finishes'] },
      { id: 'key', suggestions: ['send-now key', 'send-now shortcut', 'send-now chord'] },
      { id: 'interrupt', suggestions: ['interrupts', 'stops', 'cuts off'] },
      { id: 'deliver', suggestions: ['delivers', 'sends all of', 'hands over'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "The send-now key (Claude Code 2.1.275): while Claude works a turn, messages you type queue and, by default, wait for the turn to finish before Claude sees them. The send-now key — ctrl+enter, or the chord ctrl+x ctrl+s — interrupts the current turn and delivers every queued message at once. It is one stroke that both stops the running turn and hands over what you typed, so a correction lands mid-course instead of after the turn ends. It does not add a newline to your draft, and it does not reset to a blank prompt — it carries your queued messages in with the interrupt. In practice it's a steering reflex: on a long autonomous run, catch a wrong turn early, queue the fix, and send it now rather than letting the wrong work finish first or hard-stopping into nothing.",
      beats: [
        { kind: 'say', text: "Room two, and it's the smallest key on the board with the biggest save in it. First the setup: when I'm working a turn — reading, editing, running things — you can keep typing. What you type doesn't jump in. It queues, and it waits for me to finish." },
        { kind: 'say', text: "Usually that's fine. But sometimes you see me going wrong two seconds in, and the last thing you want is your correction waiting politely while I finish doing the wrong thing. That's what 2.1.275 fixes." },
        { kind: 'say', text: "There's a send-now key now — ctrl+enter, or the chord ctrl+x ctrl+s. It interrupts the turn I'm running and delivers everything you've queued, at once, right now. Two things in one stroke: stop what's happening, and hand me what you just typed." },
        {
          kind: 'choice',
          prompt: "You've queued 'stop — wrong module.' You hit the send-now key. What happens?",
          options: [
            { id: 'interrupt-deliver', label: "I'm interrupted, and your message lands now", correct: true, reaction: "Exactly. The turn stops and your queued words come through together, so I pick up your correction mid-course instead of after the damage is done." },
            { id: 'newline', label: "It just adds a line to your message", correct: false, reaction: "No — that's a different key. Send-now doesn't grow your draft; it interrupts my turn and delivers what's queued." },
            { id: 'discard', label: "It cancels everything, yours and mine, back to a blank prompt", correct: false, reaction: "Not a reset. It carries your queued messages *in* with the interrupt — that's the whole point. You're redirecting, not starting over." },
          ],
        },
        { kind: 'say', text: "Why it matters on a real run: picture a long refactor on a client's payments service. Two moves in you catch me touching the module they told us to leave alone. Waiting means the wrong edits finish first, then your note lands on the mess. Cutting in means I course-correct before any of that happens." },
        { kind: 'say', text: "It's a steering reflex. Watch the opening moves of a turn, keep a hand near the redirect. You never have to pick between letting a wrong turn run to the end and hard-stopping into nothing." },
        { kind: 'say', text: "The books lay it out — the mechanic first, then the supervisory play. Answer the door, take the key, and mind what's waiting past it: Backlog, a wraith that hoards every message you send and swears none may pass until the turn is good and done. Prove the shortcut that banishes it." },
      ],
    },
  },
  battle: {
    name: 'Backlog, the Patient Wraith',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a pale wraith drifts up, cradling a fistful of unsent notes* …patience, operator… every word you type comes to me, and every word *waits*… the turn must finish before any message may pass — that is the old law of this room… you claim a key that cuts the line? …name what it does, then, before I let it through — you hit the send-now key mid-turn, and what happens?",
    tauntLines: [
      "*clutches the notes tighter* you think the key merely *lengthens your scribbling* — one more line on the same note? no… it does not grow your words, it delivers them…",
      "*wails* you'd have it *cancel all* — your messages and mine, gone to a blank slate? never… it carries your queue *in* with the interrupt, it does not throw it away…",
    ],
    victoryLine: "*Backlog opens its hands and the whole fistful of notes flies through at once* …not a reset… a redirect… you interrupted the turn and your words arrived together… the line is cut… take the key, and steer me while the turn still runs…",
    questions: [
      {
        prompt:
          "You're mid-turn, Claude is heading down the wrong path, and you've typed a correction. What does the send-now key (ctrl+enter, or ctrl+x ctrl+s) do?",
        choices: [
          { id: 'a', label: "Interrupts the current turn and delivers all your queued messages at once, so the correction lands now instead of after the turn ends", correct: true },
          { id: 'b', label: "Adds a new line to your message without sending, so you can keep drafting the correction", correct: false },
          { id: 'c', label: "Discards the current turn and everything you queued, returning you to an empty prompt", correct: false },
          { id: 'd', label: "Queues the message to send automatically, but only once the current turn finishes on its own", correct: false },
        ],
        passFeedback: "HIT! The send-now key does two things in one stroke — interrupts the running turn and delivers every queued message at once. You redirect the work mid-course instead of waiting for the wrong turn to finish.",
        failFeedback: "MISS! It doesn't grow your draft, reset to a blank prompt, or wait for the turn to end — it interrupts the turn and hands over what you queued, right now. Re-read Book 1.",
      },
    ],
  },
};
