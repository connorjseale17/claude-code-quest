import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — the `ANTHROPIC_DEFAULT_MODEL` environment variable. It
 * sets the model that *new* sessions start on, but only as a soft default: a
 * `/model` pick still overrides it, and that pick persists across restarts.
 * That's the contrast with the older `ANTHROPIC_MODEL`, which pins the model
 * such that a `/model` switch doesn't stick. So `ANTHROPIC_DEFAULT_MODEL` is a
 * starting point you can standardize without taking the wheel away from anyone.
 * Source (Claude Code CHANGELOG 2.1.236):
 *   - "Added `ANTHROPIC_DEFAULT_MODEL` environment variable: sets the model new
 *      sessions start on, while a `/model` pick still overrides it and persists
 *      across restarts (unlike `ANTHROPIC_MODEL`)"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2, and the Beat Reporter is drawing a careful line between a *default* and a *lock*. The 2.1.236 release adds an environment variable, `ANTHROPIC_DEFAULT_MODEL`, that sets the model your new sessions start on — but only as a starting point: a `/model` pick still overrides it, and that choice sticks across restarts. That's the whole difference from the older `ANTHROPIC_MODEL`, which pins the model so hard your `/model` switch doesn't hold. The two books cover how the soft default behaves and why a consultant standardizing a fleet of machines wants a default nobody has to fight. Answer the door's one question for the key — then face the ghost past it, a wraith that swears your model is sealed by fate.",
  prompt:
    "What does the `ANTHROPIC_DEFAULT_MODEL` environment variable do, and how does it differ from `ANTHROPIC_MODEL`?",
  choices: [
    { id: 'a', label: "It sets the model *new* sessions start on as a soft default — a `/model` pick still overrides it and that choice persists across restarts, unlike `ANTHROPIC_MODEL`, which pins the model so a `/model` switch doesn't stick", correct: true },
    { id: 'b', label: "It hard-locks every session to one model so that `/model` can no longer change it — the strict version of `ANTHROPIC_MODEL`", correct: false },
    { id: 'c', label: "It immediately switches the model of your currently running session, mid-conversation, the moment you set it", correct: false },
    { id: 'd', label: "It's just a renamed alias for `ANTHROPIC_MODEL` with identical behavior", correct: false },
  ],
  passFeedback: "HIT! `ANTHROPIC_DEFAULT_MODEL` is a *starting point* for new sessions, not a lock. A `/model` pick overrides it and that pick persists across restarts — which is exactly what `ANTHROPIC_MODEL` doesn't allow. Set the default; leave the wheel with the user.",
  failFeedback: "MISS! It doesn't hard-lock anything (that's closer to `ANTHROPIC_MODEL`), it doesn't touch your running session, and it isn't an alias. It's a soft default for *new* sessions that `/model` can override and keep. Re-read Book 1.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**\`ANTHROPIC_DEFAULT_MODEL\` — A Starting Model, Not a Locked One**

**What it sets, and what it deliberately doesn't**

The 2.1.236 release adds an environment variable, \`ANTHROPIC_DEFAULT_MODEL\`, and the word that matters in its name is *default*. It sets the model that **new** sessions start on. That's the full scope: it decides where a fresh session begins, and nothing more. It does not reach into a session already running, and it does not force a choice on anyone once they're inside.

**The override that sticks — the whole point of the feature**

Here's the behavior that separates a default from a lock. Once a session has started on the \`ANTHROPIC_DEFAULT_MODEL\` model, a \`/model\` pick still overrides it — and, crucially, *that pick persists across restarts*. So a user who prefers a different model switches once with \`/model\`, and their choice holds session after session, even though the environment variable is still set. The default is the starting line, not a leash; the user's own decision wins and stays won.

**Why the contrast with \`ANTHROPIC_MODEL\` is the headline**

The changelog draws the distinction on purpose: *"unlike \`ANTHROPIC_MODEL\`."* The older \`ANTHROPIC_MODEL\` variable pins the model hard — set it, and a \`/model\` switch doesn't stick the way you'd expect, because the variable keeps asserting itself. \`ANTHROPIC_DEFAULT_MODEL\` is the softer tool: it seeds the default and then gets out of the way, letting a persisted \`/model\` choice sit on top of it. Same job on the surface — "decide the model" — but one takes the wheel and one just hands you the keys.

> Takeaway: \`ANTHROPIC_DEFAULT_MODEL\` sets the model new sessions start on as an overridable default — a \`/model\` pick beats it and persists — whereas \`ANTHROPIC_MODEL\` pins the model hard.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Standardizing a Fleet Without Taking the Wheel — Defaults a Consultant Can Ship**

**The fleet problem this quietly fixes**

Book 1 was the mechanism; here's the engagement it's built for. Picture setting up Claude Code across a team, or a row of build machines, or a client's shared dev boxes. You want every fresh session to *start* on the right model — the one that matches the work and the budget — without chasing each person to configure it. Drop \`ANTHROPIC_DEFAULT_MODEL\` into the shared shell profile or the machine's environment, and every new session opens on your chosen model by default. One setting, applied once, and the whole fleet starts in the right place.

**Why "soft" is the feature, not a limitation**

The tempting instinct is to reach for the hard lock — pin everyone and be done. Resist it, because the soft default is what keeps the setup from becoming a support ticket. An engineer who has a genuine reason to switch — a heavier reasoning task, a cheaper model for a routine loop — uses \`/model\` once and it *stays* switched, no fighting an environment variable that keeps snapping back. You get the standardization (a sane starting point everywhere) without the rigidity (a team blocked from their own good judgment). That's the difference between a policy people follow and a policy people route around.

**Reading the room: when the hard pin is actually right**

Naming the boundary is part of the skill. There *are* moments for \`ANTHROPIC_MODEL\`'s hard lock — a compliance regime that mandates one model, a cost ceiling that can't be crossed, a reproducibility requirement. But those are the exceptions, and you should be able to justify choosing the lock over the default. For the ordinary case — "start everyone in the right place, let good engineers steer" — \`ANTHROPIC_DEFAULT_MODEL\` is the tool that respects both the standard and the people working under it.

> Takeaway: Ship \`ANTHROPIC_DEFAULT_MODEL\` in a shared profile to start a whole fleet on the right model while letting any user \`/model\`-override and keep their choice — reserve \`ANTHROPIC_MODEL\`'s hard lock for compliance, cost, or reproducibility mandates.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `Rolling Claude Code out across this client's shared dev machines, I want every fresh
session to start on the right model without me configuring each box by hand.
I'll set the ____ environment variable in the shared shell profile.
That sets the model that ____ start on — as a default, not a lock.
Any engineer who needs a different model just runs ____, and their choice ____.
I'll only reach for the hard-pinning ____ if a compliance rule demands one fixed model.`,
    blanks: [
      { id: 'env-var', suggestions: ['`ANTHROPIC_DEFAULT_MODEL`', 'ANTHROPIC_DEFAULT_MODEL', 'the ANTHROPIC_DEFAULT_MODEL var'] },
      { id: 'scope', suggestions: ['new sessions', 'fresh sessions', 'newly started sessions'] },
      { id: 'override-cmd', suggestions: ['`/model`', 'the `/model` command', '/model to switch'] },
      { id: 'persistence', suggestions: ['persists across restarts', 'sticks session after session', 'holds even after a restart'] },
      { id: 'hard-lock', suggestions: ['`ANTHROPIC_MODEL`', 'ANTHROPIC_MODEL', 'the hard-pin ANTHROPIC_MODEL'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "`ANTHROPIC_DEFAULT_MODEL` (2.1.236): an environment variable that sets the model *new* sessions start on — a soft default, not a lock. A `/model` pick still overrides it, and that pick persists across restarts. That's the deliberate contrast with the older `ANTHROPIC_MODEL`, which pins the model hard so a `/model` switch doesn't stick. It scopes to new sessions only — it does not change a running session, and it is not an alias for `ANTHROPIC_MODEL`. For a consultant, drop it into a shared shell profile to start a whole fleet of machines on the right model without configuring each one, while any engineer can `/model`-switch and keep their choice. Reserve `ANTHROPIC_MODEL`'s hard lock for the genuine exceptions — a compliance mandate, a cost ceiling, a reproducibility requirement.",
      beats: [
        { kind: 'say', text: "This week's middle story is a config nicety with a sharp edge worth getting right: a new environment variable, `ANTHROPIC_DEFAULT_MODEL`, added in 2.1.236. It sets the model your *new* sessions start on. The whole lesson lives in one word of its name — *default*." },
        { kind: 'say', text: "Scope first, because it's narrow on purpose. It decides where a *fresh* session begins. It does not reach into a session you already have open and swap the model mid-conversation. Set it today, and it's tomorrow's new sessions — and every one after — that start on your chosen model." },
        { kind: 'say', text: "Now the behavior that makes it a default and not a leash. Once a session starts on that model, a `/model` pick still overrides it — and that pick *persists across restarts*. So someone switches once with `/model`, and their choice holds session after session, even with the environment variable still set. The user's decision sits on top and stays." },
        {
          kind: 'choice',
          prompt: "A teammate says: 'Isn't this the same as `ANTHROPIC_MODEL`? Set it and everyone's pinned to that model?' Correct them — what's the actual difference?",
          options: [
            { id: 'soft-default', label: "No — `ANTHROPIC_DEFAULT_MODEL` is a soft default a `/model` pick overrides and keeps; `ANTHROPIC_MODEL` pins the model hard so a `/model` switch doesn't stick", correct: true, reaction: "That's the distinction exactly. The changelog spells it out: unlike `ANTHROPIC_MODEL`, the default variable lets a persisted `/model` choice win. One hands you the keys; the other keeps the wheel." },
            { id: 'identical', label: "Right, they're identical — `ANTHROPIC_DEFAULT_MODEL` is just the newer name for `ANTHROPIC_MODEL`", correct: false, reaction: "Not identical, and the whole feature is the difference. `ANTHROPIC_MODEL` pins hard; `ANTHROPIC_DEFAULT_MODEL` only seeds the starting model and lets a `/model` override persist over it." },
            { id: 'stricter', label: "It's actually stricter — it locks the model so hard that even `/model` can't move it", correct: false, reaction: "Backwards. `ANTHROPIC_DEFAULT_MODEL` is the *looser* one: `/model` overrides it and the override sticks. The hard lock is `ANTHROPIC_MODEL`." },
          ],
        },
        { kind: 'say', text: "Here's where it pays off on an engagement. You're rolling Claude Code across a team, or a rack of build machines, or a client's shared dev boxes. Put `ANTHROPIC_DEFAULT_MODEL` in the shared shell profile and every new session on every box starts on the model you chose — without you touching each one. One setting, whole fleet, right starting line." },
        { kind: 'say', text: "And the soft part is the feature, not a shortcoming. An engineer with a real reason to switch — a heavier reasoning task, a cheaper model for a routine loop — runs `/model` once and it *stays*, no wrestling a variable that snaps back. You get the standard without boxing in the people working under it. That's a policy people follow instead of route around." },
        { kind: 'say', text: "Know the exception, though. There are times the hard lock is right — a compliance regime that mandates one model, a cost ceiling that can't be crossed, a reproducibility requirement. That's `ANTHROPIC_MODEL`'s job, and you should be able to say why you chose it. The books have the rest. The door asks one thing: what does `ANTHROPIC_DEFAULT_MODEL` do, and how does it differ from `ANTHROPIC_MODEL`? Answer for the key. Then meet Presage past it — a wraith that whispers your model is sealed by fate, betting you've forgotten the override sticks." },
      ],
    },
  },
  battle: {
    name: 'Presage, the Overwritable Fate',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a pale ghost coalesces over a locked stone dial, its needle frozen on a single mark* …your model is set, operator, sealed the moment you arrived, and no hand of yours may move it… or so I have told every soul who came before… tell me the truth I fear — what kind of setting decided the model you started on?",
    tauntLines: [
      "*the dial flares and holds* a lock, yes, call it a lock — pretend your `/model` cannot break it, pretend your choice will not survive the restart…",
      "*flickers, uncertain* the same as the old chain? an alias, a rename? cling to that — do not notice this one merely *seeds* the start and lets your pick sit on top…",
    ],
    victoryLine: "*Presage's dial spins free under the operator's hand and the ghost thins to nothing* …a default, not a fate… you named it, and your `/model` choice holds through every restart to come… go — start where you like, and steer from there…",
    questions: [
      {
        prompt:
          "What does the `ANTHROPIC_DEFAULT_MODEL` environment variable do, and how does it differ from `ANTHROPIC_MODEL`?",
        choices: [
          { id: 'a', label: "It sets the model *new* sessions start on as a soft default — a `/model` pick still overrides it and that choice persists across restarts, unlike `ANTHROPIC_MODEL`, which pins the model so a `/model` switch doesn't stick", correct: true },
          { id: 'b', label: "It hard-locks every session to one model so that `/model` can no longer change it — the strict version of `ANTHROPIC_MODEL`", correct: false },
          { id: 'c', label: "It immediately switches the model of your currently running session, mid-conversation, the moment you set it", correct: false },
          { id: 'd', label: "It's just a renamed alias for `ANTHROPIC_MODEL` with identical behavior", correct: false },
        ],
        passFeedback: "HIT! `ANTHROPIC_DEFAULT_MODEL` is a *starting point* for new sessions, not a lock. A `/model` pick overrides it and that pick persists across restarts — which is exactly what `ANTHROPIC_MODEL` doesn't allow. Set the default; leave the wheel with the user.",
        failFeedback: "MISS! It doesn't hard-lock anything (that's closer to `ANTHROPIC_MODEL`), it doesn't touch your running session, and it isn't an alias. It's a soft default for *new* sessions that `/model` can override and keep. Re-read Book 1.",
      },
    ],
  },
};
