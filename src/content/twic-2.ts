import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — the `effort` parameter on the Agent tool.
 * When Claude dispatches a sub-agent with the Agent tool, it can now run that
 * sub-agent at the reasoning-effort level you ask for — a rung from low up
 * through the top tier. It's set per dispatch, so one delegated task can run
 * light and another heavy inside the same session. The feature is the dial on
 * the individual delegation, letting compute match the difficulty of the job.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.292: "Added an `effort` parameter to the Agent
 *     tool, so Claude runs a sub-agent at the effort level you ask for"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room two, and the Beat Reporter nods at a ghost grinding away in the dark — same relentless intensity on every task, whether it's sweeping dust or redrawing the map. This week's mid item is the cure for that one-speed curse: as of 2.1.292, the Agent tool takes an `effort` parameter, so when Claude hands a slice of work to a sub-agent, that sub-agent runs at the reasoning-effort level you ask for — low for a mechanical chore, high for a thorny call. One book covers the mechanic — a dial set on each delegation; the other, how a consultant spends heavy compute only where the problem earns it. Take the key, then face Monotone, the wraith who has only ever known one gear.",
  prompt:
    "You dispatch two sub-agents in one session: a quick repo-wide rename and a thorny architecture decision. How does the Agent tool's `effort` parameter let you handle them?",
  choices: [
    { id: 'a', label: "Set `effort` low on the rename and high on the architecture call — effort is the reasoning-effort level each dispatched sub-agent runs at, set per delegation", correct: true },
    { id: 'b', label: "Set `effort` to the number of sub-agents you want running in parallel, then split the work between them", correct: false },
    { id: 'c', label: "Raise `effort` once and it lifts the reasoning level of the whole session — both tasks included — for the rest of the conversation", correct: false },
    { id: 'd', label: "Use `effort` to pick which model each sub-agent runs on, assigning the heavier model to the architecture call", correct: false },
  ],
  passFeedback: "HIT! `effort` is the reasoning-effort rung a dispatched sub-agent runs at, set on each delegation — low for the mechanical sweep, high for the hard call, both in the same session.",
  failFeedback: "MISS! It's not a count of agents, a session-wide lever, or a model picker. `effort` dials how hard one delegated sub-agent thinks, per dispatch. Re-read Book 1.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**The \`effort\` Dial on a Delegated Mind — Setting How Hard a Sub-Agent Thinks**

**Delegation, with a new knob**

The Agent tool is how Claude hands a slice of work to a sub-agent: a separate run that takes the task, works it on its own, and reports back a result. You've seen that shape already — dispatch the job, get the answer. As of 2.1.292, that dispatch carries a new knob. Alongside *what* the sub-agent should do, you can now set \`effort\` — *how hard* it should think while doing it.

**What \`effort\` actually sets**

\`effort\` is the reasoning-effort tier the sub-agent runs at: a ladder of rungs from *low*, through *medium* and *high*, up to the top tiers. The higher the rung, the more reasoning the sub-agent spends on the problem before it answers — more deliberation, more cost, more time. The lower the rung, the faster and lighter the pass. The parameter lets the dispatch ask for a specific rung instead of taking whatever default would otherwise apply. In the changelog's words, Claude "runs a sub-agent at the effort level you ask for."

**A dial on the delegation, not a ceiling on the session**

Here's the part that makes it useful: \`effort\` is set on the individual dispatch. One sub-agent can run *low* while, in the very same session, another runs *high* — each at the rung its task deserves, independent of the other and of the main conversation. It isn't a session-wide switch you flip once and live with; it's a setting you choose fresh every time you delegate, task by task.

> Takeaway: \`effort\` sets how hard a *dispatched* sub-agent thinks — a per-delegation rung from low up to the top tier, chosen fresh each time you hand off a task.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Spend Your Compute Where the Problem Is — Matching a Sub-Agent's Effort to the Job**

**Not every task deserves the same horsepower**

A real engagement is full of delegated work at wildly different difficulty. Rename a field across forty files. Reason through whether to split a monolith. One is mechanical — once you've found the spots, the answer is obvious. The other is the kind of call you're actually being paid for, where the reasoning *is* the deliverable. Run both at the top tier and you burn time and money grinding hard on the trivial one. Run both at the bottom and you risk a shallow, confident, wrong answer on the one that mattered.

**Dial it to the task in front of you**

The move is to match the rung to the job. Low effort for the mechanical, well-specified sweeps — speed and cost matter, and the answer falls out once the work is done. Save the high tiers for the ambiguous, high-stakes calls where you want the sub-agent to turn the problem over before committing. Because \`effort\` rides each dispatch, you don't have to pick one setting for the day; you aim it anew every time you delegate, and the cheap jobs stay cheap while the hard ones get the deliberation they need.

**A budget lever you can point**

Think of effort as the lever that aims your compute. On an engagement, that compute is a cost — one you absorb or pass along — and the usual shape of good work is lopsided: a lot of easy, a little hard. So the efficient pattern is lopsided too. A fleet of quick, low-effort scouts to clear the mechanical ground, and one expensive, high-effort pass reserved for the decision that carries the engagement. You're not rationing thought; you're putting it where it changes the outcome.

> Takeaway: Match the rung to the difficulty — low effort for mechanical sweeps, the high tiers for the calls that carry the engagement — so your compute lands where it actually changes the result.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `I'm running a client engagement and about to hand three jobs to sub-agents at once.
The first is ____ — mechanical and well-specified, so I ask for ____ effort to keep it fast and cheap.
The second is ____ — a genuinely hard call where the reasoning is the deliverable, so I ask for ____ effort.
Because \`effort\` is set on each dispatch, the two run at different rungs in the very same session.
I spend the heavy compute only where the problem actually earns it.`,
    blanks: [
      { id: 'easy-task', suggestions: ['a repo-wide rename', 'a lint-error sweep', 'a dead-code scan'] },
      { id: 'low-level', suggestions: ['low', 'the lowest', 'low or medium'] },
      { id: 'hard-task', suggestions: ['a data-model migration plan', 'an architecture trade-off call', 'a security-design review'] },
      { id: 'high-level', suggestions: ['high', 'the top', 'high or above'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "The `effort` parameter on the Agent tool (Claude Code 2.1.292): when Claude dispatches a sub-agent, `effort` sets the reasoning-effort tier that sub-agent runs at — a rung from low, through medium and high, up to the top tiers. Higher means more deliberation, cost, and time; lower means a faster, lighter pass. Crucially it's set per dispatch, not session-wide: one delegated task can run low while another runs high in the same session, each chosen fresh at hand-off. For a consultant: match the rung to the difficulty. Low effort for mechanical, well-specified sweeps where speed and cost matter; the high tiers for the ambiguous, high-stakes calls where the reasoning is the deliverable. The efficient shape is lopsided — many cheap low-effort scouts plus one expensive high-effort pass on the decision that carries the engagement — so compute lands where it changes the outcome.",
      beats: [
        { kind: 'say', text: "Mid item, room two. This one's about something you delegate every day without naming it: how *hard* the helper you hand a task to actually thinks about it. As of 2.1.292 you get to set that." },
        { kind: 'say', text: "You already know the Agent tool — it's how Claude hands a slice of work to a sub-agent that runs on its own and reports back. The new bit is a knob on that hand-off called `effort`. Alongside *what* the sub-agent does, you now set *how hard* it reasons while doing it." },
        { kind: 'say', text: "`effort` is a ladder of rungs — low, medium, high, on up to the top tiers. Higher means more deliberation before it answers: more cost, more time, a deeper look. Lower means a fast, light pass. You ask for the rung; the sub-agent runs at it." },
        {
          kind: 'choice',
          prompt: "You set one sub-agent to high effort for a hard architecture call. Does that change how the next sub-agent you dispatch — a quick rename — will think?",
          options: [
            { id: 'per-dispatch', label: "No — effort is set per dispatch, so the rename can run low on its own", correct: true, reaction: "Right. It's a dial on each delegation, not a switch on the session. The architecture agent runs high, the rename runs low, and neither drags the other along." },
            { id: 'session', label: "Yes — once I raise effort it stays high for the whole session", correct: false, reaction: "That's the trap. It isn't a session-wide lever. `effort` rides the individual dispatch, so the next hand-off starts fresh at whatever rung you ask for." },
            { id: 'sticky', label: "Only if the two tasks are related", correct: false, reaction: "No — relatedness doesn't enter into it. Each dispatch carries its own `effort`, full stop, so you choose the rung anew every time you delegate." },
          ],
        },
        { kind: 'say', text: "And that per-dispatch nature is the whole point for your work. An engagement is lopsided — a pile of mechanical chores and a few genuinely hard calls. Rename a field across forty files? Low effort, fast and cheap, the answer's obvious once it's done. Decide whether to split the monolith? That's the reasoning you're paid for — spend the high tier there." },
        { kind: 'say', text: "Run everything at the top and you burn time and money grinding hard on the trivial. Run everything at the bottom and you get a confident, shallow, wrong answer on the one that mattered. The efficient shape is lopsided too: a swarm of quick low-effort scouts, and one expensive high-effort pass on the decision that carries the engagement." },
        { kind: 'say', text: "So treat `effort` as the lever that aims your compute — point it where thinking changes the outcome, not where it just runs up the meter. The books have the ladder and the engagement read. Grab the key, then face Monotone, the wraith stuck in one gear. Show him a mind that shifts to match the task." },
      ],
    },
  },
  battle: {
    name: 'Monotone, the One-Effort Wraith',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a grey wraith drifts up, grinding the same low hum whether it lifts a feather or a mountain, its glow neither brightening nor dimming* …one speed… I have only ever had one speed… I grind as hard at dusting a shelf as at rebuilding a city, and I am ruinous at both… you say there's a dial — \`effort\` — that lets a mind run light for the small and heavy for the hard? …name true what it sets, and on *what*, before I waste another age at one pitch.",
    tauntLines: [
      "*flickers, affronted* you'd tell me \`effort\` counts the *helpers* — how many of us swarm a task at once?! no… it is not a headcount — it is how *hard* a single dispatched mind thinks, low rung to high…",
      "*wavers, clutching at the idea* you think one turn of the dial lifts the *whole session* and holds it there forever?! never… it rides each hand-off alone — one task may run low while the next runs high, in the very same hour…",
    ],
    victoryLine: "*Monotone's glow at last swells and fades, swells and fades — shifting* …\`effort\`… set on each dispatch… low for the small, high for the hard, every delegation its own rung… I was never meant to grind at one pitch… take the key, operator, and spend your mind where the work earns it.",
    questions: [
      {
        prompt:
          "You dispatch two sub-agents in one session: a quick repo-wide rename and a thorny architecture decision. How does the Agent tool's `effort` parameter let you handle them?",
        choices: [
          { id: 'a', label: "Set `effort` low on the rename and high on the architecture call — effort is the reasoning-effort level each dispatched sub-agent runs at, set per delegation", correct: true },
          { id: 'b', label: "Set `effort` to the number of sub-agents you want running in parallel, then split the work between them", correct: false },
          { id: 'c', label: "Raise `effort` once and it lifts the reasoning level of the whole session — both tasks included — for the rest of the conversation", correct: false },
          { id: 'd', label: "Use `effort` to pick which model each sub-agent runs on, assigning the heavier model to the architecture call", correct: false },
        ],
        passFeedback: "HIT! `effort` is the reasoning-effort rung a dispatched sub-agent runs at, set on each delegation — low for the mechanical sweep, high for the hard call, both in the same session.",
        failFeedback: "MISS! It's not a count of agents, a session-wide lever, or a model picker. `effort` dials how hard one delegated sub-agent thinks, per dispatch. Re-read Book 1.",
      },
    ],
  },
};
