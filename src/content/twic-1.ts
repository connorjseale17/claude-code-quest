import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — Nested subagents to depth 3: subagents can now spawn
 * their own nested subagents up to three levels deep (previously capped at 1),
 * and stream-json forwards the deeper levels' events so a headless run can
 * still observe the whole delegation tree.
 * Sources (Claude Code CHANGELOG 2.1.219):
 *   - "Subagents can spawn nested subagents up to depth 3 (was 1)"
 *   - "Added nested subagent forwarding in stream-json for depth-2+ spawned agents"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown, and the Beat Reporter opens with a change to how work gets handed off. Subagents — the scoped workers your session delegates a job to — can now spawn subagents of their own, nested up to three levels deep, where the chain used to stop dead at one. The two books on the desk cover how far the tree descends and how a consultant maps a branching engagement onto it. Answer the door's one question for the key, and mind the thing rattling in the dark beyond it: a bonecaller that raises minions who raise minions who raise minions, three ranks down.",
  prompt:
    "The 2.1.219 changelog changed how deep subagents can nest. What is the change?",
  choices: [
    { id: 'a', label: "Subagents can now spawn their own nested subagents, up to depth 3 — where the nesting was previously capped at depth 1", correct: true },
    { id: 'b', label: "The number of subagents you can run at the same time rose from 1 to 3", correct: false },
    { id: 'c', label: "Subagents can now nest with no depth limit at all, recursing as far as the task needs", correct: false },
    { id: 'd', label: "Nesting was removed — only the main session may spawn subagents now, for safety", correct: false },
  ],
  passFeedback: "HIT! The line is precise: subagents can spawn nested subagents up to depth 3, where before the depth was 1. It's a change to nesting *depth* — a delegation tree three levels tall — not the count of parallel workers, and not an unbounded recursion.",
  failFeedback: "MISS! It's not about how many subagents run at once, it isn't unlimited, and nesting wasn't removed. The nesting *depth* rose from 1 to 3. Re-read Book 1.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**Nested Subagents — Delegation Grows a Chain of Command**

**What the 2.1.219 line actually changed**

The changelog entry is a single clause: *"Subagents can spawn nested subagents up to depth 3 (was 1)."* Read it slowly, because the number that matters is the one in the parentheses. A subagent is a separate worker the main session hands a scoped job to. Until this release the nesting depth was capped at 1 — a subagent you spawned could do its work, but it could not itself hand off to a worker of its own. This release lifts that ceiling to 3: a subagent can now spawn a subagent, which can spawn one more.

**Counting the levels**

Picture the session as the top of a tree. The main conversation spawns a subagent — that is level one, the old limit. Now that level-one worker can spawn its own subagent (level two), and *that* one can spawn another (level three). Three ranks of delegation hang below the session you're actually sitting in. Past that the chain stops: depth 3 is the floor of the descent, not an open invitation to recurse forever.

**Seeing down the tree**

A deep tree is only useful if you can watch it work, and the release adds exactly that. The companion line — *"Added nested subagent forwarding in stream-json for depth-2+ spawned agents"* — means that in headless, stream-json runs the events from agents spawned at level two and below are forwarded up to you, instead of vanishing inside their parent. So an automated pipeline that fans work out three levels deep still reports what every worker is doing, rather than going quiet the moment the nesting passes the first rank.

> Takeaway: Subagents can now spawn their own subagents up to three levels deep — a delegation tree, not a flat list — and stream-json forwards the deeper levels' events so you can still watch the whole chain work.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Decomposing an Engagement — When One Delegate Needs Delegates**

**Real work branches more than once**

Book 1 covered how deep the tree can go; this is *when* you want the depth. A large engagement rarely splits cleanly into one flat list of tasks. You hand the main session a goal — *audit this client's platform before the migration* — and the natural first cut is a few broad workstreams: the API, the data layer, the front end. But each of those is itself too big for one worker. The API stream wants to fan out again, one worker per service, and a single service audit might fan out once more, one worker per endpoint. That is three levels of branching, and until now you had to flatten it into one list by hand.

**Let the branches do their own branching**

With nesting to depth 3 you can mirror the real shape of the problem instead of pre-chewing it. The main session spawns a worker per workstream; each workstream lead spawns a worker per service; each service worker spawns one per endpoint. Every level keeps its own scoped context — the endpoint worker isn't carrying the whole platform in its head, just its endpoint — which is exactly why the deep split earns its keep: focus stays tight at the leaves while the structure stays coherent at the trunk.

**Why the forwarding matters on a client's clock**

The observability half is what makes a deep tree safe to run unattended. When you kick a three-level audit off headless and step away, stream-json forwarding of the deeper agents means the run isn't a black box: you get back a full account of what every leaf worker found, not just a tidy summary from the three top-level leads. When a partner asks how thorough the audit really was, *every endpoint got its own dedicated pass, and here is the trace* is the answer the depth buys you.

> Takeaway: Use the three-level tree to mirror an engagement that branches more than once — workstream, service, endpoint — so each worker keeps a tight scope while the deeper levels still report back for an auditable, unattended run.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `I'm scoping ____ for a client, and the job is too big for a single worker to hold.
So I'll let the main session spawn a subagent per ____,
and because subagents can now nest up to depth 3, each of those can spawn
its own worker per ____ instead of me flattening the whole tree by hand.
I'll run it headless and lean on stream-json forwarding, so the ____
still report back — not just the top-level leads.`,
    blanks: [
      { id: 'engagement', suggestions: ['a platform-migration audit', 'a full security review', 'a legacy-code assessment'] },
      { id: 'top-split', suggestions: ['workstream', 'major subsystem', 'client repo'] },
      { id: 'deep-split', suggestions: ['service', 'module', 'endpoint'] },
      { id: 'leaves', suggestions: ['deepest leaf workers', 'level-three agents', 'per-endpoint passes'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "Nested subagents changed in 2.1.219: subagents can now spawn their own nested subagents up to depth 3, where the nesting was previously capped at 1. Count it as a tree — the main session spawns a subagent (level 1), that worker can spawn one (level 2), and that one can spawn another (level 3), then the chain stops. The companion change forwards depth-2+ agents' events in stream-json, so a headless run can still observe the deeper levels instead of them vanishing inside a parent. For a consultant, the depth lets you mirror an engagement that branches more than once — workstream, then service, then endpoint — with each worker holding a tight, scoped context; and the forwarding keeps an unattended, three-level run auditable rather than a black box.",
      beats: [
        { kind: 'say', text: "Top story this week isn't a new command — it's a change to how I hand work off. Subagents are the scoped workers I spin up for a job. The 2.1.219 line says they can now spawn *nested* subagents up to depth 3. The tell is the parenthetical: *was 1*. Until now a worker I spawned couldn't hand off to a worker of its own." },
        { kind: 'say', text: "Count it as a tree. This session is the trunk. I spawn a subagent — that's level one, the old ceiling. Now that worker can spawn its own subagent, level two, and that one can spawn another, level three. Three ranks of delegation hang below the conversation you're in. Then it stops — three is the floor, not a licence to recurse forever." },
        { kind: 'say', text: "A deep tree's no good if you can't see it work, so there's a companion change: nested subagent *forwarding* in stream-json for depth-2 and below. In a headless run, the events from those deeper workers get forwarded up to you instead of disappearing inside their parent. The whole chain stays visible." },
        {
          kind: 'choice',
          prompt: "Quick check before the 'why.' What exactly went from 1 to 3?",
          options: [
            { id: 'depth', label: "The nesting *depth* — how many levels of subagents can stack below the session", correct: true, reaction: "Right. It's the height of the delegation tree. A worker can now spawn a worker that spawns a worker — three levels deep — where the nesting used to stop at one." },
            { id: 'count', label: "The *number* of subagents you can run at the same time", correct: false, reaction: "That's a different dial. This line is about nesting *depth*, not how many run in parallel. A subagent can now spawn its own subagents, three levels down." },
            { id: 'unlimited', label: "Nothing capped it before, and now it's unlimited", correct: false, reaction: "The opposite — it was capped at 1, and now it's capped at 3. Deeper, but still bounded. Three levels is the floor of the descent." },
          ],
        },
        { kind: 'say', text: "Now the payoff. Real engagements branch more than once. Say the goal is *audit this client's platform before the migration*. The first cut is a few workstreams — API, data, front end. But the API stream is too big for one worker, so it fans out per service; and a service audit fans out again, per endpoint. That's three levels — and now you can build it that way instead of flattening it in your head." },
        { kind: 'say', text: "Each level keeps its own scoped context — the endpoint worker only carries its endpoint, not the whole platform — so focus stays tight at the leaves while the shape stays coherent at the trunk. And because stream-json forwards the deep levels, a headless three-level run isn't a black box: you get an account from every leaf, not just a summary from the three leads. That's the difference between *the audit was thorough* and *here's the trace proving it*." },
        { kind: 'say', text: "The books have the level-counting and the decomposition playbook in full. The door just wants the one fact: what went from 1 to 3? Answer that for the key — then square up to the bonecaller past it. It raises minions who raise minions who raise minions, three ranks deep, and it's betting you can't tell nesting depth from a head count." },
      ],
    },
  },
  battle: {
    name: 'Marrowcall, the Thrice-Nested',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a skeleton unfolds from the dark and lifts one hand — a smaller skeleton claws up from the floor, and it raises a smaller one still, three ranks deep before the echo fades* …I do not fight alone, operator… I raise a servant, who raises a servant, who raises one more… three deep, and no deeper… name what changed, or be added to the ranks…",
    tauntLines: [
      "*the three ranks rattle in unison* you think this is a *head count*? count the depth, fool — one calls two calls three, a chain, not a crowd…",
      "*a dry laugh travels down the line of bones* 'unlimited,' you say? no — I stop at three, always three… the ceiling rose from one, it did not vanish…",
    ],
    victoryLine: "*the deepest skeleton crumbles first, then the next, then the caller himself* …a tree three levels tall… you read the depth for what it was… take the key, operator, and delegate as deep as the work demands…",
    questions: [
      {
        prompt:
          "The 2.1.219 changelog changed how deep subagents can nest. What is the change?",
        choices: [
          { id: 'a', label: "Subagents can now spawn their own nested subagents, up to depth 3 — where the nesting was previously capped at depth 1", correct: true },
          { id: 'b', label: "The number of subagents you can run at the same time rose from 1 to 3", correct: false },
          { id: 'c', label: "Subagents can now nest with no depth limit at all, recursing as far as the task needs", correct: false },
          { id: 'd', label: "Nesting was removed — only the main session may spawn subagents now, for safety", correct: false },
        ],
        passFeedback: "HIT! The line is precise: subagents can spawn nested subagents up to depth 3, where before the depth was 1. It's a change to nesting *depth* — a delegation tree three levels tall — not the count of parallel workers, and not an unbounded recursion.",
        failFeedback: "MISS! It's not about how many subagents run at once, it isn't unlimited, and nesting wasn't removed. The nesting *depth* rose from 1 to 3. Re-read Book 1.",
      },
    ],
  },
};
