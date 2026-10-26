import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — Claude Haiku 5.5.
 * A new small-class model: "the cheapest, fastest, and most capable small model
 * we've ever released." It is priced far below Haiku 4.5 (roughly three-quarters
 * cheaper on average to run) and is Anthropic's fastest model at standard speed.
 * It is the first Haiku-class model with an adjustable effort setting, so you can
 * trade cost against intelligence. It's built for narrowly scoped, high-volume
 * work — summaries, compaction, classification, database queries, subagent work,
 * and speed-sensitive tasks like live support and browser/computer use — while
 * Sonnet 5.5 and Opus 5.5 remain the better choices for complex agentic coding.
 * Sources:
 *   - anthropic.com/news/claude-haiku-5-5 (Oct 7, 2026): "the cheapest, fastest,
 *     and most capable small model we've ever released"; first Haiku with an
 *     adjustable effort setting; built for narrowly scoped, high-volume tasks;
 *     Sonnet 5.5 and Opus 5.5 "remain better choices for complex agentic coding
 *     tasks"; especially well-suited to computer and browser use.
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room two, and the Beat Reporter points at a ghost that drags its whole heavy self across the room to do the smallest errand — asked to fetch a teaspoon, it hauls the entire haunt, slow and costly, as if every task deserved the full weight. This week's mid item is the cure for that reflex: Claude Haiku 5.5, the cheapest, fastest small model Anthropic has released, built for narrowly scoped, high-volume work — summaries, classification, subagents, browser tasks — while Sonnet 5.5 and Opus 5.5 stay the choice for complex agentic coding. One book covers the mechanic — what the model is and the new effort knob it carries; the other, why a consultant routes the bulk, repetitive work to it and keeps the big models for the hard calls. Take the key, then face Leadmist, the haunt who sends a giant to fetch a teaspoon every single time.",
  prompt:
    "You've got a complex, multi-file agentic refactor on one hand and a pile of thousands of documents to classify on the other. Where does Claude Haiku 5.5 fit?",
  choices: [
    { id: 'a', label: "Send the bulk classification to Haiku 5.5 — the fast, cheap small model built for narrowly scoped, high-volume work — and keep the complex refactor on Sonnet 5.5 or Opus 5.5", correct: true },
    { id: 'b', label: "Use Haiku 5.5 for both — it's now the most capable model across the board and replaces Sonnet and Opus for complex agentic coding", correct: false },
    { id: 'c', label: "Use Haiku 5.5 for neither — it's a slower, pricier tier meant only for a final quality pass over finished work", correct: false },
    { id: 'd', label: "Give Haiku 5.5 the refactor; the high-volume classification still has to go to a larger, more expensive model", correct: false },
  ],
  passFeedback: "HIT! Haiku 5.5 is the cheapest, fastest small model — built for narrowly scoped, high-volume work like classification and summaries — while Sonnet 5.5 and Opus 5.5 stay the choice for complex agentic coding.",
  failFeedback: "MISS! It doesn't replace the big models for hard agentic work, and it's the fast, cheap tier, not a slow premium one. Route the narrow, high-volume work to it. Re-read Book 1.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**The Small Model Gets Serious — What Claude Haiku 5.5 Actually Is**

**A new weight class, not a cut-down big model**

Anthropic's models come in rough sizes, and Haiku is the small class — the one built for speed and cost rather than maximum reasoning. Claude Haiku 5.5 is the newest of them, and Anthropic calls it the cheapest, fastest, and most capable small model it has released. "Small" here isn't a euphemism for weak; it means a model deliberately tuned to answer quickly and cheaply, so you can run it a great many times without the bill or the wait that a frontier model would bring.

**Cheaper and faster than the Haiku before it**

The headline numbers are the point. It's priced well below the previous Haiku — on average roughly three-quarters cheaper to run — and it's Anthropic's fastest model at standard speed. That combination is what changes how you use it: when a single call is fast and nearly free, work you'd never have paid a big model to do becomes trivially affordable to run at volume.

**The new knob: adjustable effort**

Haiku 5.5 is the first model in its class to carry an adjustable *effort* setting — the same trade a larger model offers, now available on the small one. Turn effort up and it thinks harder per call at more cost; turn it down and it answers faster and cheaper. It's a dial between cost and intelligence, so even within this one cheap model you can lean toward "fast and good enough" or "slower and sharper" depending on the task. What it isn't is a replacement for the frontier: Anthropic is explicit that Sonnet 5.5 and Opus 5.5 remain the better choices for complex agentic coding.

> Takeaway: Haiku 5.5 is the cheapest, fastest small model Anthropic has shipped, now with its own effort dial — a model built to run cheaply at volume, not to out-reason the frontier.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Route the Work to the Right Weight — Where a Consultant Reaches for Haiku**

**Most of a workload is narrow and repetitive**

Look honestly at an engagement's actual compute and a lot of it is not hard reasoning — it's volume. Summaries of long threads, classifying a backlog of tickets or documents, pulling a field out of each of ten thousand records, the quiet compaction of a long session, the dozens of small subagent calls fanning out under a bigger task. None of that needs a frontier model's deliberation; it needs an answer, fast, many times over. That is exactly the shape Haiku 5.5 was built for — narrowly scoped, high-volume work — and running it there is where the three-quarters cost cut actually lands on your bill.

**Keep the frontier for the hard calls**

The discipline is to send the thinking to the thinker and the throughput to the fast model. A sprawling multi-file refactor, an architectural decision, a genuinely agentic coding task that has to reason across a whole codebase — that stays on Sonnet 5.5 or Opus 5.5, because Anthropic is clear those remain the better fit and because a wrong answer there is expensive to unwind. Haiku's job is the bulk around that work, not the crux of it. Point it at the hard problem and you'll save a little money and lose a lot of quality; point it at the volume and you win both.

**Speed as its own feature**

There's a second reason to reach for it beyond cost: some work is speed-sensitive in a way that makes the fast model the *right* call, not just the cheap one. Live customer support, a browser or computer-use loop clicking through a flow, anything where a human or a UI is waiting on each step — latency is the experience there, and Anthropic flags Haiku 5.5 as especially well-suited to browser and computer tasks. When every step has someone waiting, the fastest capable model is the correct tool, and the savings are a bonus.

> Takeaway: Send summaries, classification, subagents, and browser loops to Haiku 5.5 and keep complex agentic coding on Sonnet 5.5 or Opus 5.5 — match the model's weight to the task, and you win on both cost and speed.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `I'm pricing out the compute on a client engagement, and the workload splits in two.
Most of it is volume — ____, ____, and a swarm of small subagent calls under a bigger task.
That bulk I route to ____, the cheap, fast small model built exactly for narrowly scoped, high-volume work.
The genuinely hard part — ____ — I keep on Sonnet 5.5 or Opus 5.5, where the reasoning is the deliverable.
And for the browser loop a human's waiting on, I pick Haiku anyway because there ____ is the feature, not just a bonus.`,
    blanks: [
      { id: 'bulk1', suggestions: ['summarizing long threads', 'classifying a ticket backlog', 'compacting long sessions'] },
      { id: 'bulk2', suggestions: ['pulling one field from thousands of records', 'tagging a pile of documents', 'running simple database queries'] },
      { id: 'model', suggestions: ['Claude Haiku 5.5', 'the new small model', 'the fast, cheap Haiku tier'] },
      { id: 'hard', suggestions: ['a multi-file agentic refactor', 'an architectural decision across the codebase', 'a complex coding task'] },
      { id: 'why', suggestions: ['speed', 'low latency', 'the fast response on every step'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "Claude Haiku 5.5 (announced Oct 7, 2026): the cheapest, fastest, and most capable small model Anthropic has released. It's priced well below the previous Haiku — roughly three-quarters cheaper on average to run — and is Anthropic's fastest model at standard speed. It's the first Haiku-class model with an adjustable effort setting, a dial that trades cost against intelligence. It's built for narrowly scoped, high-volume work: summaries, compaction, classification, database queries, small subagent calls, and speed-sensitive tasks like live support and browser/computer use, where Anthropic says it's especially well-suited. It is not a replacement for the frontier — Sonnet 5.5 and Opus 5.5 remain the better choices for complex agentic coding. For a consultant: route the bulk, repetitive volume to Haiku to capture the cost cut, keep the hard agentic reasoning on the big models, and reach for Haiku on anything latency-sensitive because there speed is the point.",
      beats: [
        { kind: 'say', text: "Mid item, room two. This one isn't a command or a setting — it's a new model. Claude Haiku 5.5. 'Haiku' is Anthropic's small class, the one built for speed and cost rather than maximum reasoning, and this is the newest and strongest of them." },
        { kind: 'say', text: "Don't read 'small' as 'weak.' Anthropic calls it the cheapest, fastest, and most capable small model it's released. The numbers are the story: priced well below the last Haiku — on average about three-quarters cheaper to run — and it's their fastest model at standard speed. When a call is that cheap and that quick, work you'd never have paid a big model to do becomes trivial to run at volume." },
        { kind: 'say', text: "It also carries a knob the small class never had before: an adjustable *effort* setting. Turn it up, it thinks harder per call for more cost; turn it down, it answers faster and cheaper. A dial between cost and intelligence, right inside the cheap model. What it is not is a frontier replacement — Anthropic says plainly that Sonnet 5.5 and Opus 5.5 are still the better choices for complex agentic coding." },
        {
          kind: 'choice',
          prompt: "You've got a thorny, multi-file refactor that has to reason across the whole codebase, and separately a backlog of ten thousand support tickets to classify. How do you split them?",
          options: [
            { id: 'split', label: "Classification to Haiku 5.5 — narrow, high-volume, exactly its lane — and the refactor to Sonnet 5.5 or Opus 5.5", correct: true, reaction: "Right. Throughput to the fast model, thinking to the thinker. The ticket pile is bulk Haiku eats cheaply; the refactor is the crux, and the crux stays on the frontier." },
            { id: 'allhaiku', label: "Both on Haiku 5.5 — it's the most capable model now, so it handles the refactor too", correct: false, reaction: "No — 'most capable small model' isn't 'most capable, full stop.' Point it at a hard agentic refactor and you save a little and lose a lot. That one stays on Sonnet or Opus." },
            { id: 'neither', label: "Neither on Haiku — it's a slow, premium tier you'd only use for a final polish pass", correct: false, reaction: "Backwards. Haiku 5.5 is the fast, cheap tier, not a slow premium one. The classification backlog is precisely the high-volume work it's built to run." },
          ],
        },
        { kind: 'say', text: "So the routing rule falls out of that. Most of an engagement's compute isn't hard reasoning — it's volume. Summaries, classifying a backlog, pulling a field out of ten thousand records, the compaction of a long session, the swarm of little subagent calls under a bigger task. That's Haiku's shape exactly, and running it there is where the three-quarters cost cut actually lands on your bill." },
        { kind: 'say', text: "The hard part goes the other way. A multi-file refactor, an architectural call, a genuinely agentic task reasoning across a codebase — Sonnet 5.5 or Opus 5.5, because that's where a wrong answer is expensive and where Anthropic says the frontier still wins. Send the thinking to the thinker and the throughput to the fast model; don't cross the wires." },
        { kind: 'say', text: "And there's a case where you pick Haiku for more than money: speed-sensitive work. Live customer support, a browser or computer-use loop clicking through a flow — anything with a human or a UI waiting on each step. There latency *is* the experience, and Anthropic flags Haiku 5.5 as especially well-suited to browser and computer tasks. Fastest capable model wins, and the savings ride along. Grab the key — then face Leadmist, the haunt who sends a giant to fetch a teaspoon every single time." },
      ],
    },
  },
  battle: {
    name: 'Leadmist, the Overkill Haunt',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a vast, lead-grey ghost heaves itself fully upright to lift a single teaspoon, the whole room groaning under the weight* …a summary… a tally… a teaspoon of an errand… and I bring ALL of myself to each one, slow and dear, for surely every task deserves my full weight… you say a small, swift thing could do the teaspoons for a fraction of the cost, and leave the frontier for the real labor?! …then say true where this Haiku belongs, before I haul my whole bulk across the room once more.",
    tauntLines: [
      "*swells, straining* you'd have me believe this little model now does *everything* — that it takes the great multi-file refactor from the frontier itself?! no… it is the finest *small* model, not the finest of all — the hard agentic coding stays with Sonnet and Opus…",
      "*drifts, sulking* you think it a slow, costly thing fit only for a final polish?! never… it is the *cheapest and fastest* — the high-volume bulk is precisely its lane, run cheaply and run quick…",
    ],
    victoryLine: "*Leadmist thins to a light, quick wisp, the teaspoon floating up effortlessly* …the bulk to the swift small thing… the hard labor to the frontier… I need not drag my whole weight to fetch a spoon ever again… take the key, operator, and send each task to the weight it deserves.",
    questions: [
      {
        prompt:
          "You've got a complex, multi-file agentic refactor on one hand and a pile of thousands of documents to classify on the other. Where does Claude Haiku 5.5 fit?",
        choices: [
          { id: 'a', label: "Send the bulk classification to Haiku 5.5 — the fast, cheap small model built for narrowly scoped, high-volume work — and keep the complex refactor on Sonnet 5.5 or Opus 5.5", correct: true },
          { id: 'b', label: "Use Haiku 5.5 for both — it's now the most capable model across the board and replaces Sonnet and Opus for complex agentic coding", correct: false },
          { id: 'c', label: "Use Haiku 5.5 for neither — it's a slower, pricier tier meant only for a final quality pass over finished work", correct: false },
          { id: 'd', label: "Give Haiku 5.5 the refactor; the high-volume classification still has to go to a larger, more expensive model", correct: false },
        ],
        passFeedback: "HIT! Haiku 5.5 is the cheapest, fastest small model — built for narrowly scoped, high-volume work like classification and summaries — while Sonnet 5.5 and Opus 5.5 stay the choice for complex agentic coding.",
        failFeedback: "MISS! It doesn't replace the big models for hard agentic work, and it's the fast, cheap tier, not a slow premium one. Route the narrow, high-volume work to it. Re-read Book 1.",
      },
    ],
  },
};
