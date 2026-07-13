import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — the "Dynamic workflow size" setting: a control in
 * /config that sets an advisory small/medium/large guideline for how many
 * agents Claude fans a dynamic workflow out into. It's a default posture,
 * not an enforced hard cap.
 * Source: Claude Code CHANGELOG 2.1.202 ("Added a 'Dynamic workflow size'
 * setting in /config for controlling how large Claude generally makes dynamic
 * workflows (small/medium/large agent counts) — an advisory guideline, not an
 * enforced cap").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown, and the Beat Reporter starts with the throttle on Claude's biggest jobs. Dynamic workflows fan a single task out into a swarm of parallel agents — and there's now a `Dynamic workflow size` setting in `/config` that lets you tell Claude how large to make that swarm by default: small, medium, or large. The two pages on the desk cover exactly what the knob does and why a consultant on a metered engagement reaches for it. Answer the door's one question and the key is yours — and the thing guarding it is a skeleton that answers every job by raising ten times the bones it needs.",
  prompt:
    "You open `/config` and set the new `Dynamic workflow size` to `small`. What have you actually changed about how Claude runs dynamic workflows?",
  choices: [
    { id: 'a', label: "You've set an advisory small/medium/large guideline for how many agents Claude generally fans a workflow out into — a default posture, not a hard cap Claude is forbidden to exceed when the task truly needs it", correct: true },
    { id: 'b', label: "You've set an enforced ceiling that hard-caps the agent count and makes the workflow error out the moment it would spawn one agent past the limit", correct: false },
    { id: 'c', label: "You've made each individual agent run faster by handing it more compute, without changing how many agents there are", correct: false },
    { id: 'd', label: "You've switched dynamic workflows off entirely, so tasks now run in a single agent instead of fanning out at all", correct: false },
  ],
  passFeedback: "HIT! The setting is an *advisory* guideline for how large Claude makes a dynamic workflow by default — small, medium, or large. It shapes the default posture; it doesn't hard-cap the count or forbid Claude from scaling up when a task genuinely demands it.",
  failFeedback: "MISS! It isn't an enforced ceiling, it doesn't touch per-agent speed, and it doesn't turn workflows off. It's an advisory size guideline — small/medium/large — for how many agents Claude fans out by default. Re-read the books.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**\`Dynamic workflow size\` — A Throttle on How Big Claude Builds the Swarm**

**What a dynamic workflow is, in one breath**

A *dynamic workflow* is Claude planning a large task itself and then fanning it out into many agents running in parallel — a codebase-wide audit becomes twenty agents each taking a slice, all at once. It's how one session chews through work that would take a single agent hours. The power is the fan-out. The question this week's feature answers is: *how wide* should that fan-out be?

**The new setting, and where it lives**

Shipped in the 2.1.202 release, \`Dynamic workflow size\` is a setting you'll find in \`/config\`. It offers three levels — *small*, *medium*, and *large* — and each one nudges how many agents Claude generally spins up when it decides to run a workflow. Pick *large* and Claude leans toward a broad swarm; pick *small* and it keeps the fan-out lean. You set it once and it becomes the default posture for the workflows that follow, instead of you eyeballing the size of every job as it starts.

**Advisory, not a hard cap — this is the important part**

The changelog is precise about one thing: this is *an advisory guideline, not an enforced cap*. That distinction is the whole feature. A hard cap would be a wall — hit the limit and the workflow errors out. This isn't that. It's a default lean. Claude treats your setting as the size it should generally aim for, and it can still go bigger when a task genuinely needs the extra agents. You're setting the resting posture of the fan-out, not bolting a ceiling over it.

> Takeaway: \`Dynamic workflow size\` in \`/config\` is a small/medium/large dial for how wide Claude generally fans a dynamic workflow out — a default posture it aims for, not a hard limit it's forbidden to cross.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Every Agent Costs — Why a Consultant Tunes the Swarm Before Turning It Loose**

**A wide fan-out is a fast bill**

Parallel agents are wonderful right up until you remember each one is spending tokens and eating into your rate limit at the same moment. A workflow that fans out into thirty agents can burn through a metered engagement's budget in a single pass. On your own time that's fine; on a client's clock, or on a plan with a ceiling you share across a whole team, an un-tuned swarm is how you find yourself throttled at the worst possible moment. The \`Dynamic workflow size\` setting is the lever that lets you decide that trade-off *before* the fan-out, not while you're watching the usage meter spike.

**Match the size to the job, not to the reflex**

The move is to fit the dial to the work in front of you. A quick first-pass sweep of one module doesn't need a legion — set it *small* and let a handful of agents cover it cheaply. A genuine codebase-wide migration or an exhaustive audit is exactly what a broad swarm is for — set it *large* and let Claude bring the whole crew. *Medium* is the sensible resting default for the everyday middle. The point is a deliberate posture per engagement instead of accidentally running every task at maximum width because that's whatever the default happened to be.

**Advisory means you keep the ceiling off**

Because the setting is a guideline and not a wall, you get the safety of a lean default without giving up the ability to go big when it counts. Set it *small* for a budget-conscious engagement and the one task that truly warrants a hundred agents can still scale up — Claude isn't boxed in by a hard cap you'd have to remember to lift. You're steering the common case toward frugality while leaving the rare, heavy job free to spend what it needs.

> Takeaway: Treat the swarm's width as a budget decision — set the size small for cheap sweeps and large for the genuinely big jobs, knowing the advisory dial steers the default without ever locking out the task that truly needs to scale.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `I'm about to run a dynamic workflow to ____ across the whole client codebase.
Before it fans out, open /config and set the Dynamic workflow size to ____,
because this is ____ and I don't want to burn the shared rate-limit budget in one pass.
Remember the setting is an advisory default, not a hard cap — if some part of the job
genuinely needs more agents, Claude can still ____, so I'm setting the posture, not a ceiling.`,
    blanks: [
      { id: 'task', suggestions: ['audit every external API call', 'migrate the whole test suite', 'hunt down dead code'] },
      { id: 'size', suggestions: ['small', 'medium', 'large'] },
      { id: 'constraint', suggestions: ['a quick first-pass sweep', 'a metered engagement on a tight budget', 'an exploratory scan I may re-run several times'] },
      { id: 'escalate', suggestions: ['scale past the guideline', 'fan out wider where it matters', 'bring the whole crew for the hard slices'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "The `Dynamic workflow size` setting (shipped in 2.1.202) lives in `/config` and sets how large Claude generally makes a dynamic workflow — the number of parallel agents it fans a task out into — with three levels: small, medium, large. The critical detail is that it's an *advisory guideline, not an enforced cap*: it shapes the default posture, but Claude can still scale past it when a task genuinely needs to. For a consultant it's a budget lever — every agent spends tokens and rate limit, so you set it small for cheap sweeps and large for real codebase-wide jobs, matching the swarm's width to the engagement instead of running everything at maximum by accident.",
      beats: [
        { kind: 'say', text: "First story this week is a throttle on my biggest jobs. When I hit a task too large for one agent, I can plan a *dynamic workflow* — fan it out into a swarm of agents all working in parallel. A codebase-wide audit becomes twenty agents each taking a slice." },
        { kind: 'say', text: "New in the 2.1.202 release: there's now a `Dynamic workflow size` setting in `/config`. Three levels — small, medium, large. It tells me how wide to make that fan-out by default. Set it large and I lean toward a broad swarm; set it small and I keep the crew lean." },
        { kind: 'say', text: "Here's the part to hold onto. The changelog calls it an *advisory guideline, not an enforced cap*. It's not a wall the workflow slams into and errors out. It's a default lean — the size I generally aim for. If a task genuinely needs more agents than your setting suggests, I can still scale up. You're setting the resting posture, not bolting on a ceiling." },
        {
          kind: 'choice',
          prompt: "Gut-check before the door. You set `Dynamic workflow size` to `small`. A task later turns out to genuinely need a big swarm. What happens?",
          options: [
            { id: 'scales', label: "Claude can still fan out wider than 'small' for that task — the setting is an advisory default, not a hard limit", correct: true, reaction: "Right. Small is the posture I lean toward, not a wall. The rare heavy job can still scale past it — you get a lean default without locking out the task that truly needs more." },
            { id: 'errors', label: "The workflow errors out the moment it would exceed the 'small' agent count", correct: false, reaction: "No — that would be an enforced cap, and this isn't one. The changelog is explicit: it's advisory. I can go bigger when the work demands it." },
            { id: 'peragent', label: "Nothing changes about the count — 'small' just slows each agent down to save budget", correct: false, reaction: "Not quite. The setting is about how *many* agents I fan out into, not how fast each one runs. It shapes the width of the swarm, not per-agent speed." },
          ],
        },
        { kind: 'say', text: "Why a consultant cares: every agent I spawn is spending tokens and eating your rate limit at the same instant. A thirty-agent fan-out can drain a metered engagement's budget in one pass. This dial is where you make that trade-off *before* the swarm launches, not while you watch the usage meter spike." },
        { kind: 'say', text: "So match the size to the job. Quick sweep of one module — set it small, a handful of agents covers it cheaply. Real codebase-wide migration or an exhaustive audit — set it large, that's what the broad swarm is for. Medium's your everyday resting default. Deliberate posture per engagement beats running everything at maximum by accident." },
        { kind: 'say', text: "The books have the mechanics and the budget playbook. The door wants to know what the setting actually changes when you dial it to small — get that right and the key's yours. Mind the skeleton on the other side; it never met a job it wouldn't raise an army for." },
      ],
    },
  },
  battle: {
    name: 'Marrow, Warden of the Overswarm',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a lone skeleton rattles its jaw, and the floor answers with a hundred more clawing up from the dirt* …a task, you say? one small task? THEN RISE, ALL OF YOU — why send ten bones when I can send ten thousand… let the swarm blot out the budget…",
    tauntLines: [
      "*more skeletons keep climbing up regardless* a cap? there is no cap here, meat — I raise until the rate-limit screams and the engagement runs dry…",
      "*legions mill about doing nothing, tokens bleeding* efficiency? every one of these does a sliver of the work and bills you for the whole army — good luck explaining THAT invoice…",
    ],
    victoryLine: "*the horde sinks back into the ground until only a lean handful remains, exactly as many as the job required* …sized to the work… advisory, not endless… fine, throttle-hand… take the key…",
    questions: [
      {
        prompt:
          "You open `/config` and set the new `Dynamic workflow size` to `small`. What have you actually changed about how Claude runs dynamic workflows?",
        choices: [
          { id: 'a', label: "You've set an advisory small/medium/large guideline for how many agents Claude generally fans a workflow out into — a default posture, not a hard cap Claude is forbidden to exceed when the task truly needs it", correct: true },
          { id: 'b', label: "You've set an enforced ceiling that hard-caps the agent count and makes the workflow error out the moment it would spawn one agent past the limit", correct: false },
          { id: 'c', label: "You've made each individual agent run faster by handing it more compute, without changing how many agents there are", correct: false },
          { id: 'd', label: "You've switched dynamic workflows off entirely, so tasks now run in a single agent instead of fanning out at all", correct: false },
        ],
        passFeedback: "HIT! The setting is an *advisory* guideline for how large Claude makes a dynamic workflow by default — small, medium, or large. It shapes the default posture; it doesn't hard-cap the count or forbid Claude from scaling up when a task genuinely demands it.",
        failFeedback: "MISS! It isn't an enforced ceiling, it doesn't touch per-agent speed, and it doesn't turn workflows off. It's an advisory size guideline — small/medium/large — for how many agents Claude fans out by default. Re-read the books.",
      },
    ],
  },
};
