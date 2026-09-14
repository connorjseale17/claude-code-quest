import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — the `maxEffortLevel` setting. Claude Code adds a setting
 * that caps the effort level — the reasoning-effort tier of a request (low,
 * medium, high, xhigh) — on the client, across every plan and provider. It is a
 * ceiling, not a floor: levels above the cap disappear from the `/effort` picker,
 * and naming a higher level with `--effort` or `/effort` runs at the cap instead
 * (with a warning in interactive/plain-text sessions; silently under json /
 * stream-json output or in background agents). It can be set top-level or
 * per-model under `modelSettings`; on Enterprise, admins can also set per-role
 * effort limits, and when both apply the lower cap wins. It is not a dollar spend
 * cap and not a model pin — it bounds how hard the model thinks, not what it costs
 * directly or which model runs.
 * Sources (Claude Code CHANGELOG 2.1.267 + docs.claude.com model-config/effort):
 *   - "Added `maxEffortLevel` setting (top-level or per model under
 *      `modelSettings`): caps the effort level on every provider."
 *   - "Levels above the cap aren't offered in the `/effort` picker, and naming a
 *      higher level with `--effort` or `/effort` runs at the cap instead."
 *   - "on a Claude Enterprise plan, organization admins set per-role effort
 *      limits ... When both apply to a model, the lower cap applies."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Final room of the week, and the Beat Reporter stands before a dragon that hoards fire for its own sake — every task, however small, met with the hottest blast it can summon, the walls scorched black from lighting candles with a bonfire. The 2.1.267 release adds `maxEffortLevel`, a setting that caps the *effort level* of a request — how hard the model is asked to think — as a ceiling that holds across every plan and provider. The two books cover exactly what that cap does at the lever and why a consultant governing a whole fleet sets a ceiling on effort without forcing overkill on anyone. Answer the door's question for the key — then face what hoards it, a dragon that has never once thought to spend less than everything.",
  prompt:
    "What does the `maxEffortLevel` setting do?",
  choices: [
    { id: 'a', label: "Caps the effort level — the reasoning-effort tier of a request — as a ceiling across every provider: higher levels drop out of the `/effort` picker and asking for one runs at the cap instead, but you can still choose any level at or below it", correct: true },
    { id: 'b', label: "Forces every request to run at exactly that effort level, removing the lower tiers so nothing can run cheaper", correct: false },
    { id: 'c', label: "Sets a dollar spend limit that halts the session once its cost passes the configured budget", correct: false },
    { id: 'd', label: "Pins which model the session uses, so no one can switch to a different model", correct: false },
  ],
  passFeedback: "HIT! `maxEffortLevel` is a *ceiling* on the reasoning-effort tier, enforced across every provider. Levels above it vanish from the `/effort` picker and a higher request clamps down to the cap — but any level at or below the cap is still yours to choose.",
  failFeedback: "MISS! It's not a floor that forces max effort, not a dollar spend cap, and not a model pin — it's a ceiling on *how hard the model thinks*, and you can still pick anything at or under it. Re-read Book 1.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**\`maxEffortLevel\` — A Ceiling on How Hard the Model Thinks**

**Effort level, and the cap over it**

A request runs at an *effort level* — a tier of how much reasoning effort the model puts in, from \`low\` up through \`medium\`, \`high\`, and \`xhigh\`. Higher tiers think harder and cost more; lower tiers are quick and cheap. \`maxEffortLevel\` sets a *ceiling* on that tier. It doesn't fix the effort at one value — it caps the top. Every level at or below the cap remains available; only the levels above it are taken off the table.

**What the cap does at the controls**

Set the cap and the change shows up right where effort is chosen. Levels above the ceiling simply aren't offered in the \`/effort\` picker anymore. And if someone names a higher level anyway — with the \`--effort\` flag at launch or \`/effort\` mid-session — it doesn't error out and it doesn't sneak past; the request just *runs at the cap instead*. In an interactive session or a plain-text \`--print\` run, a warning tells you the level you asked for and the level actually applied. Under \`json\` or \`stream-json\` output, or in a background agent, the clamp happens silently — the ceiling holds either way, it just doesn't interrupt an automated pipeline to say so.

**Where you set it, and which cap wins**

\`maxEffortLevel\` can be set at the top level, or per model under \`modelSettings\` when different models should carry different ceilings, and it applies across every provider Claude Code can reach — the same ceiling whether the request runs on Anthropic's API or a cloud provider's hosted models. On a Claude Enterprise plan there's a second lever: admins can set per-role effort limits. When both a role limit and \`maxEffortLevel\` apply to the same model, the *lower* of the two wins — the tighter ceiling always governs.

> Takeaway: \`maxEffortLevel\` caps the reasoning-effort tier as a ceiling across every provider — higher levels leave the picker and a higher request clamps to the cap, while everything at or below it stays freely available.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Governing the Burn — Why a Fleet Wants a Ceiling, Not a Setting**

**A ceiling reins in the overkill without mandating it**

The failure mode a ceiling fixes is the routine task run at maximum reasoning effort — lighting every candle with a bonfire. Left to defaults and habit, people reach for the highest tier "to be safe," and a fleet quietly burns top-tier effort on work a lower tier would have nailed. \`maxEffortLevel\` caps that reflex. Crucially it's a *ceiling and not a floor*: it stops the needless overkill at the top without forcing anyone up to it, so a quick task can still run \`low\` and a genuinely hard one can run right up to the cap. You're removing the expensive mistake, not dictating the effort.

**One lever across a mixed fleet**

Because the cap holds across every provider, it's the single control that behaves the same no matter where a team's sessions actually run — one client on Anthropic's API, another on a cloud provider's hosted models. Instead of chasing per-environment knobs, a consultant sets one ceiling and knows it means the same thing everywhere. Setting it per model under \`modelSettings\` adds the nuance: a lower ceiling on the model people reach for constantly, a higher one reserved for the model kept for the hard problems.

**Predictable by default, silent where it must be**

The behavior is built to govern without getting in the way. Interactively, the warning that names the requested and applied level keeps it honest — nobody is surprised about the tier they got. In automated runs the clamp is silent, so a headless pipeline or a background agent inherits the ceiling without a warning derailing it. The result is a spend-and-latency guardrail you set once and largely forget, doing its job in the background of every session on the engagement.

> Takeaway: Use \`maxEffortLevel\` as a fleet-wide guardrail against reflexive overkill — one ceiling across every provider that curbs top-tier waste while still letting each task run at whatever level at or below it the work actually needs.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `Across this engagement, people keep defaulting to the top reasoning tier "to be safe," and the burn shows it.
I'll set ____ so the highest levels come off the table for routine work.
Because it's a ceiling and not a floor, a quick task can still run ____ underneath it.
Since our teams run on different providers, I'm relying on the fact that the cap ____.
And if someone asks for a higher level anyway with the /effort picker, the request will ____.`,
    blanks: [
      { id: 'setting', suggestions: ['`maxEffortLevel`', 'the `maxEffortLevel` setting', 'a `maxEffortLevel` ceiling'] },
      { id: 'lower', suggestions: ['low', 'a cheaper tier', 'medium'] },
      { id: 'provider', suggestions: ['holds across every provider', 'means the same thing everywhere', 'applies no matter where the session runs'] },
      { id: 'clamp', suggestions: ['run at the cap instead', 'clamp down to the ceiling', 'be held to the cap'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "`maxEffortLevel` (2.1.267) caps the effort level — the reasoning-effort tier of a request, from low through medium, high, and xhigh — as a ceiling, enforced across every plan and provider. It's a ceiling, not a floor: every level at or below the cap stays available, only the higher ones are removed. Levels above the cap drop out of the `/effort` picker, and naming a higher level with `--effort` or `/effort` runs at the cap instead — with a warning naming the requested and applied levels in interactive/plain-text sessions, silently under json/stream-json output or in background agents. Set it top-level or per model under `modelSettings`. On Enterprise, admins can also set per-role effort limits, and when both apply the lower cap wins. Use it as a fleet-wide guardrail against reflexive overkill — curbing top-tier waste on routine work without forcing anyone up to it, with one control that means the same thing across providers. It is not a dollar spend cap and not a model pin.",
      beats: [
        { kind: 'say', text: "Closing story this week is about how hard the model is asked to think — and putting a ceiling on it. A request runs at an *effort level*: a tier of reasoning effort, from low up through medium, high, and xhigh. Higher tiers think harder and cost more. `maxEffortLevel` caps that tier." },
        { kind: 'say', text: "Read that as a ceiling, not a floor. It doesn't fix the effort at one value — it caps the top. Every level at or below the cap is still available; only the ones above it come off the table. A quick task can still run low; the cap just stops anyone from reaching past it." },
        { kind: 'say', text: "You see it right where effort gets chosen. Levels above the ceiling aren't offered in the `/effort` picker anymore. And if someone names a higher one anyway — `--effort` at launch or `/effort` mid-session — it doesn't error and it doesn't slip past; the request just runs at the cap instead." },
        {
          kind: 'choice',
          prompt: "An admin sets `maxEffortLevel` to `medium`. A teammate asks, 'So now every request is forced to run at medium?' What's the correction?",
          options: [
            { id: 'ceiling', label: "No — medium is the *ceiling*. You can still run low; you just can't go above medium", correct: true, reaction: "Right. It's a cap, not a mandate. Everything at or below medium stays available — low, medium — and only high and xhigh are taken off the table. A quick task can still run cheap." },
            { id: 'floor', label: "Yes — it removes the lower tiers so nothing runs cheaper than medium", correct: false, reaction: "That's a floor, and this isn't one. It's a ceiling: the lower tiers stay, the *higher* ones are removed. You can always spend less effort than the cap, never more." },
            { id: 'spend', label: "Sort of — it's really a dollar budget that stops the session at a spend limit", correct: false, reaction: "Different lever. `maxEffortLevel` bounds the reasoning tier, not the dollars. It caps how hard the model thinks, not a spend total — the spend limit is its own separate control." },
          ],
        },
        { kind: 'say', text: "Why govern it: the failure mode is the routine task run at maximum effort — lighting a candle with a bonfire. People reach for the top tier 'to be safe,' and a fleet quietly burns top-tier effort on work a lower tier would nail. The ceiling reins that in without forcing anyone up to it." },
        { kind: 'say', text: "It's built to govern quietly. The cap holds across every provider, so it's one control that means the same thing wherever a team's sessions run. Set it per model under `modelSettings` for nuance. Interactively you get a warning naming the level you asked for and the one applied; in automated runs the clamp is silent so a pipeline isn't derailed. And on Enterprise, a per-role limit can stack with it — when both apply, the lower cap wins." },
        { kind: 'say', text: "The books have the full read. The door asks one thing: what does `maxEffortLevel` actually do? Answer for the key — then face Pyre past it, a dragon that has never once thought to spend less than everything it has." },
      ],
    },
  },
  battle: {
    name: 'Pyre, the Maximalist',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a dragon rears over a scorched hoard, every scale glowing white-hot, wisps of flame escaping its jaws even at rest* …I know only one heat, operator… the highest… I have lit candles with infernos and boiled oceans to make tea, and I would not know how to give a task *less* than all of me… you mean to set a *ceiling* on my fire? …tell me true, so I know what you'd bind — what does that setting do?",
    tauntLines: [
      "*a gout of flame roars past you* you thought it a *floor* — that it would forbid the lesser heats and force my fullest blaze on all comers? no! it strips away the heights, not the depths… beneath the cap, every gentler flame remains…",
      "*embers rain down* you thought it a *coin-purse* — a budget of gold that snuffs me when the spending runs dry? no… it does not count my treasure… it bounds how *hard I burn*, tier by tier, not what the burning costs…",
    ],
    victoryLine: "*Pyre's glow banks down to a steady, governed warmth, the highest flames guttering out while the lesser ones hold* …a ceiling, not a chain… I may still burn low, only never past the line you drew… you understood the lever… take the key, and cap the fire before it scorches the whole engagement…",
    questions: [
      {
        prompt:
          "What does the `maxEffortLevel` setting do?",
        choices: [
          { id: 'a', label: "Caps the effort level — the reasoning-effort tier of a request — as a ceiling across every provider: higher levels drop out of the `/effort` picker and asking for one runs at the cap instead, but you can still choose any level at or below it", correct: true },
          { id: 'b', label: "Forces every request to run at exactly that effort level, removing the lower tiers so nothing can run cheaper", correct: false },
          { id: 'c', label: "Sets a dollar spend limit that halts the session once its cost passes the configured budget", correct: false },
          { id: 'd', label: "Pins which model the session uses, so no one can switch to a different model", correct: false },
        ],
        passFeedback: "HIT! `maxEffortLevel` is a *ceiling* on the reasoning-effort tier, enforced across every provider. Levels above it vanish from the `/effort` picker and a higher request clamps down to the cap — but any level at or below the cap is still yours to choose.",
        failFeedback: "MISS! It's not a floor that forces max effort, not a dollar spend cap, and not a model pin — it's a ceiling on *how hard the model thinks*, and you can still pick anything at or under it. Re-read Book 1.",
      },
    ],
  },
};
