import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — per-session consumption caps: a session-wide limit on
 * WebSearch tool calls (default 200, tunable) and a per-session cap on subagent
 * spawns (default 200, override with env var). Hard backstops against runaway
 * consumption within a single session — distinct from the *advisory* Dynamic
 * workflow size setting.
 * Final room — door target routes to the TwicStampScreen via currentTrack.
 * Sources: Claude Code CHANGELOG 2.1.212 ("Added session-wide limit on WebSearch
 * tool calls (default 200, tunable)"; "Added per-session cap on subagent spawns
 * (default 200, override with env var)").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Final room of the issue, and the Beat Reporter closes on the circuit breaker. Claude now enforces two hard per-session ceilings: a session-wide limit on WebSearch calls (default 200, tunable) and a cap on how many subagents a single session can spawn (default 200, overridable). These are real walls, not gentle nudges — they exist so a session that goes sideways can't quietly torch your rate limit. The two pages on the desk cover the mechanism and why an unattended run on a client's clock needs it. Answer the door's one question for the last key — and beyond it waits a dragon that just keeps spawning more of itself until something finally makes it stop.",
  prompt:
    "What do the new session-wide WebSearch limit and per-session subagent-spawn cap actually do?",
  choices: [
    { id: 'a', label: "Set hard per-session ceilings — a default of 200 WebSearch calls and 200 subagent spawns per session — that halt runaway consumption, with both adjustable (the search limit tunable, the spawn cap overridable via env var)", correct: true },
    { id: 'b', label: "Set advisory targets Claude leans toward but is free to exceed whenever a task genuinely needs more searches or subagents", correct: false },
    { id: 'c', label: "Cap how many Claude Code sessions you're allowed to have open at once across your whole account", correct: false },
    { id: 'd', label: "Speed up web searches and subagents by running them in parallel batches of 200 at a time", correct: false },
  ],
  passFeedback: "HIT! Both are *hard* per-session ceilings — 200 WebSearch calls and 200 subagent spawns by default — that stop a single session from consuming without bound. They're adjustable: the search limit is tunable and the spawn cap is overridable with an env var.",
  failFeedback: "MISS! These aren't advisory (that's the Dynamic workflow size setting), they don't limit your open-session count, and they don't batch for speed. They're hard per-session consumption caps — 200 each by default, adjustable. Re-read the books.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**Two Hard Ceilings Per Session — The Backstop, Not the Suggestion**

**What shipped**

The 2.1.212 release added two consumption caps that live at the level of a single session. The first is a *session-wide limit on WebSearch tool calls*, defaulting to 200 and described in the changelog as *tunable*. The second is a *per-session cap on subagent spawns*, also defaulting to 200, which you can *override with an env var*. Both count within one session and both stop it cold when it hits the number.

**Hard cap, not advisory posture — hold this distinction**

A few weeks back the newsletter covered \`Dynamic workflow size\`, an *advisory* dial for how wide Claude fans a workflow out — a default lean it could still exceed. These new limits are the opposite kind of thing. They are *hard* ceilings. When a session has made 200 WebSearch calls or spawned 200 subagents, it does not politely lean toward stopping; it is stopped. That's the entire point of a backstop: it holds precisely in the case where every softer guideline has already failed and something is genuinely running away.

**Adjustable, but that's the floor and ceiling — not a bypass**

Both numbers move. Raise the subagent cap through its env var when you're knowingly running a massive, legitimate migration; tune the WebSearch limit down when a research task on a metered client plan should never make hundreds of calls. What you're adjusting is *where* the wall stands, not *whether* there's a wall. Even lifted, the ceiling is still a ceiling — a session can't spawn without bound the way it could before these landed.

> Takeaway: The WebSearch limit and subagent-spawn cap are hard, per-session ceilings (200 each by default, both adjustable) — a backstop that halts a runaway session, categorically different from an advisory guideline it could talk its way past.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**The Unattended Run — Why a Consultant Wants a Wall They Never Hit**

**A loop you're not watching is the expensive kind**

The whole promise of autonomous work is that you walk away — kick off a job on a client repo and go do something else. That's also exactly when a runaway is most dangerous, because there's no human in the loop to notice the session has started spawning subagents in a cycle or firing off web search after web search chasing its own tail. Left unbounded, that's the horror story: you come back to a drained rate limit, a blown budget on a shared team plan, and an awkward conversation about the invoice. A hard per-session cap is the smoke detector that goes off while you're out of the room.

**You'll almost never touch the ceiling — that's the design**

Here's the reassuring part: 200 subagent spawns or 200 web searches in a *single session* is an enormous amount of legitimate work. A normal engagement, even an ambitious one, rarely comes anywhere near it. So the cap isn't a leash you'll feel day to day. It's insurance against the pathological case — the infinite loop, the misfiring agent, the prompt that accidentally told Claude to search forever. You get the safety without the friction, because the wall sits far past where honest work ends.

**Tune it to the engagement's risk profile**

Because both limits adjust, you can right-size the backstop to the client. On a tight, metered plan where a surprise spend would be a genuine problem, tune the WebSearch limit *down* so the session trips the breaker early rather than late. On a sanctioned, large-scale codebase migration you're actively supervising, raise the subagent cap so a legitimate heavy job isn't stopped short. The default protects you out of the box; the adjustability lets you match the wall to what's actually at stake.

> Takeaway: These caps are the guardrail for work you walk away from — set generously enough that real engagements never feel them, adjustable enough to tighten on a metered client or loosen for a sanctioned big job, and always there to stop a loop you aren't watching.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `I'm about to kick off ____ on the client's repo and then step away for a couple of hours.
Because no one will be watching it, I want the hard per-session backstop in place:
the WebSearch limit and the subagent-spawn cap, 200 each by default.
Since this is ____, I'll tune the WebSearch limit ____ so a runaway trips the breaker early,
and leave the subagent cap where it is — a normal job never comes near 200 spawns anyway.
The point is a wall I'll almost certainly never hit, that still stops ____ if the session loops.`,
    blanks: [
      { id: 'job', suggestions: ['an overnight test-suite migration', 'a long research sweep of vendor docs', 'an unattended dependency upgrade'] },
      { id: 'plan-type', suggestions: ['a tightly metered client plan', 'a shared team rate limit', 'a fixed-budget engagement'] },
      { id: 'direction', suggestions: ['down below the default', 'to a conservative number', 'well under 200'] },
      { id: 'runaway', suggestions: ['a spawn loop', 'an endless search cycle', 'a misfiring agent'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "The 2.1.212 release added two hard per-session consumption caps: a session-wide WebSearch call limit (default 200, tunable) and a per-session subagent-spawn cap (default 200, overridable via env var). Unlike the *advisory* Dynamic workflow size dial, these are real ceilings — a session that hits the number is stopped, not nudged. For a consultant they're the backstop for unattended work: kick off a long job on a client repo, walk away, and a spawn loop or endless-search cycle can't silently drain a shared rate limit or blow the budget. The defaults sit far past where honest work ends, so you rarely feel them; adjust them to fit the client — tune the search limit down on a metered plan, raise the spawn cap for a sanctioned big migration.",
      beats: [
        { kind: 'say', text: "Last story of the issue, and it's the circuit breaker. The 2.1.212 release gave a single session two hard ceilings. One's a session-wide limit on WebSearch calls — default 200, and it's tunable. The other's a cap on how many subagents one session can spawn — also default 200, and you can override it with an env var." },
        { kind: 'say', text: "Now, don't file these next to the `Dynamic workflow size` dial from a few weeks back. That one was *advisory* — a lean I could still exceed. These are the opposite. They're *hard*. Hit 200 web searches or 200 spawns in a session and I don't gently wind down — I stop. That's what a backstop is for: the moment every softer guideline has already failed and something's genuinely run away." },
        { kind: 'say', text: "Both numbers move, but read what you're moving. Raise the spawn cap for a massive migration you meant to run; tune the search limit down for a metered client where hundreds of calls would be absurd. You're setting *where the wall stands*, not whether there is one. Even lifted, a ceiling is still a ceiling." },
        {
          kind: 'choice',
          prompt: "Gut-check before the last door. Your session hits 200 subagent spawns and the task 'still wants more.' What happens?",
          options: [
            { id: 'stops', label: "It's stopped at the cap — this is a hard per-session ceiling, not an advisory lean it can exceed", correct: true, reaction: "Right. That's the whole value of a backstop: it holds exactly when a run has gone sideways. If you truly need more for a sanctioned job, you raise the cap deliberately — the session doesn't get to blow past it on its own." },
            { id: 'exceeds', label: "It quietly goes past 200 because the cap is just a guideline Claude leans toward", correct: false, reaction: "No — you're thinking of the advisory `Dynamic workflow size` setting. These caps are hard. A session at the limit is stopped, not nudged." },
            { id: 'account', label: "Your other open sessions get shut down to make room under an account-wide total", correct: false, reaction: "Not that either. The cap is *per session*, not a budget shared across your account. One session hitting 200 doesn't touch the others." },
          ],
        },
        { kind: 'say', text: "Why this matters most when you're *not* watching: the whole point of autonomous work is you walk away. That's also when a loop is deadliest — nobody's there to notice me spawning subagents in a cycle or searching my own tail. Come back to a drained rate limit and a blown budget on a shared plan, and that's an invoice conversation you don't want. The cap is the smoke detector going off while you're out of the room." },
        { kind: 'say', text: "And the reassuring part: 200 spawns or 200 searches in *one* session is a mountain of legitimate work. A real engagement almost never gets near it, so day to day you won't feel the leash at all. It's insurance against the pathological case — the infinite loop, the prompt that accidentally said 'search forever.' Tune it down for a metered client, up for a supervised migration, and otherwise forget it's there." },
        { kind: 'say', text: "That's the issue. The books have the mechanism and the walk-away playbook; the door wants to know what these caps actually do. Get it right and the last key's yours. Then mind the wyrm past it — it spawns another of itself every few seconds and won't stop on its own. Only a hard wall ever does." },
      ],
    },
  },
  battle: {
    name: 'Glut, the Uncapped Wyrm',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*the dragon rears, and from its shadow a smaller copy claws free — then another, then another, each already spawning its own* …more… always more… why send one wyrm when the session allows infinite… search everything, spawn everything, STOP for nothing…",
    tauntLines: [
      "*whelps multiply faster than they can act, rate limit bleeding* a cap? I acknowledge no cap — I'll spawn the two-hundred-and-first just to watch the meter scream…",
      "*fires off search after pointless search* every query chases the last, every spawn births a spawn — and you walked away and left me to it, didn't you? how's that invoice looking…",
    ],
    victoryLine: "*at the two-hundredth spawn the horde freezes mid-air and crumbles, the wyrm stopped cold against a wall it cannot cross* …a hard ceiling… it actually… held… fine, gatekeeper… the issue is yours…",
    questions: [
      {
        prompt:
          "What do the new session-wide WebSearch limit and per-session subagent-spawn cap actually do?",
        choices: [
          { id: 'a', label: "Set hard per-session ceilings — a default of 200 WebSearch calls and 200 subagent spawns per session — that halt runaway consumption, with both adjustable (the search limit tunable, the spawn cap overridable via env var)", correct: true },
          { id: 'b', label: "Set advisory targets Claude leans toward but is free to exceed whenever a task genuinely needs more searches or subagents", correct: false },
          { id: 'c', label: "Cap how many Claude Code sessions you're allowed to have open at once across your whole account", correct: false },
          { id: 'd', label: "Speed up web searches and subagents by running them in parallel batches of 200 at a time", correct: false },
        ],
        passFeedback: "HIT! Both are *hard* per-session ceilings — 200 WebSearch calls and 200 subagent spawns by default — that stop a single session from consuming without bound. They're adjustable: the search limit is tunable and the spawn cap is overridable with an env var.",
        failFeedback: "MISS! These aren't advisory (that's the Dynamic workflow size setting), they don't limit your open-session count, and they don't batch for speed. They're hard per-session consumption caps — 200 each by default, adjustable. Re-read the books.",
      },
    ],
  },
};
