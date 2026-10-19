import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — `/usage` warnings for the four big consumption levers.
 * `/usage` shows where you stand against your plan's limits. As of 2.1.299 it
 * adds warnings that name the specific behaviors inflating your consumption:
 * max effort, workflows, always-on context, and large tool results. It surfaces
 * which lever is driving the spend, turning a bare percentage into a diagnosis.
 * It is a warning, not a wall: it does not cap usage, throttle the session, or
 * switch anything off — you stay the operator and decide what to dial back.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.299: "Added `/usage` warnings for max effort,
 *     workflows, always-on context and large tool results"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Room three closes the issue, and the Beat Reporter gestures at a dragon coiled over a hoard that isn't gold — it's your own usage, drained in four quiet streams you never see until the meter's already run. This week's final item throws light on exactly those streams: as of 2.1.299, `/usage` raises warnings for the four levers that most inflate what a session consumes — *max effort*, *workflows*, *always-on context*, and *large tool results*. One book covers the mechanic — `/usage` naming the culprit instead of just the total; the other, why a consultant reads those four warnings as a bill of materials for the week's spend. Claim the key, then face Meterwyrm, the drake who runs up your toll in the dark.",
  prompt:
    "Your Claude Code usage is climbing faster than you expected and you want to know what's driving it. What does the updated `/usage` now do for you?",
  choices: [
    { id: 'a', label: "It raises warnings naming the levers inflating your usage — max effort, workflows, always-on context, and large tool results — so you can see which behavior is driving the spend, not just the total", correct: true },
    { id: 'b', label: "It caps your usage automatically once any of those four levers crosses a threshold, blocking further requests", correct: false },
    { id: 'c', label: "It switches your session to the cheapest model and turns off workflows until your usage falls back down", correct: false },
    { id: 'd', label: "It shows a single overall percentage exactly as before — there's still no breakdown of what's driving it", correct: false },
  ],
  passFeedback: "HIT! `/usage` now warns on the four big consumption levers — max effort, workflows, always-on context, and large tool results — so you can see *what's* driving your spend, not just how much is left.",
  failFeedback: "MISS! It doesn't cap, downgrade, or stay a bare percentage. It *names* the four levers inflating your usage so you can act. Re-read Book 1.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**\`/usage\` Names the Culprit — Warnings for the Four Levers That Inflate a Session**

**From a total to a diagnosis**

\`/usage\` is the command that shows where you stand against your plan's limits. On its own, a percentage tells you *that* you're burning through usage — not *why*. You watch the number climb and you're left guessing which of the things you did today is responsible. As of 2.1.299, \`/usage\` adds warnings that point at the specific behaviors driving your consumption, turning a bare figure into something closer to a diagnosis.

**The four it calls out**

The warnings single out four levers. *Max effort* — running at the top reasoning-effort tier, which spends the most thinking per turn. *Workflows* — orchestrating work across many agents at once, which multiplies the consumption of a single run. *Always-on context* — material carried into every request rather than read once, so its weight is paid on every turn. And *large tool results* — big outputs a tool drops into the conversation, swelling what each later turn has to carry. Every one of these is a legitimate thing to do; every one also quietly runs up the meter when you're not watching.

**A warning, not a wall**

Be clear on what the feature is and isn't. It *surfaces* these levers so you notice them — it does not cap your usage, throttle the session, or switch anything off on its own. Nothing is taken out of your hands; the control stays yours. \`/usage\` simply makes the expensive levers announce themselves, instead of letting them hide inside one steadily climbing percentage you can't break apart.

> Takeaway: \`/usage\` now warns on four specific consumption levers — max effort, workflows, always-on context, and large tool results — so you can see what's driving your spend, not just that it's rising.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Read It as a Bill of Materials — Spend Where It Pays and Nowhere Else**

**Usage is a cost you carry or pass on**

On an engagement, the compute behind a session is real money — absorbed into your rate or billed through to the client. A usage bar that climbs for reasons you can't name is a cost you can't manage, and "we used a lot of Claude this week" is not a line a client wants to hear without a why. The value of \`/usage\` naming its four levers is that it turns an opaque burn into a line-item read: you can finally see *which* habit is doing the spending.

**Match each lever to whether the task earned it**

Then you judge each one against the work in front of you. Max effort on a genuinely hard call is money well spent; max effort left running on routine edits is pure waste — dial it back. A workflow fanning out across a sprawling refactor earns its multiplied cost; a workflow spun up for a one-file change does not. Always-on context pays when every turn truly needs that material and bleeds you when it's riding along out of habit. Large tool results are worth it when you genuinely need the whole dump, and a tax when a narrower command would have answered. The warning points; you decide whether the lever was pulling its weight.

**Check it during the work, not after the bill**

The habit worth building is reading \`/usage\` *mid-engagement*, not reconciling it after the fact. When a warning flags that always-on context has gone heavy, you trim it then and there. When max effort is lit on throwaway work, you drop it on the spot. The whole point of the meter announcing its culprits is that you can correct course while the week is still running — so the spend lands on the decisions that carried the engagement, not on the chores that happened to run hot while no one was looking.

> Takeaway: Treat the four \`/usage\` warnings as a bill of materials — check it mid-engagement and dial back any lever the task didn't earn, so your spend lands where it changed the outcome.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `My usage is climbing on this engagement and I want to know what's driving it, so I run ____.
It now warns me that ____ is the lever running up the meter.
I check it against the work: on a routine task that spend isn't earning its keep, so I ____.
On the one genuinely hard call this week, though, I leave ____ on — there the reasoning is the deliverable.
I read these warnings mid-engagement, not after the bill lands, so I correct course while it still matters.`,
    blanks: [
      { id: 'cmd', suggestions: ['`/usage`', 'the usage command', '`/usage` mid-session'] },
      { id: 'lever', suggestions: ['max effort', 'always-on context', 'a workflow fanning out across the repo'] },
      { id: 'action', suggestions: ['dial it back', 'drop to a lower effort', 'trim what rides in every request'] },
      { id: 'keep', suggestions: ['max effort', 'the heavy reasoning tier', 'the expensive lever'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "`/usage` warnings for the four big consumption levers (Claude Code 2.1.299): `/usage` shows where you stand against your plan's limits, but a bare percentage tells you *that* you're burning usage, not *why*. It now raises warnings naming the specific behaviors driving your spend — max effort (the top reasoning-effort tier), workflows (orchestrating many agents at once), always-on context (material carried into every request), and large tool results (big outputs a tool drops in). It's a warning, not a wall: it surfaces the levers so you notice them, but it does not cap usage, throttle the session, or switch anything off — you stay the operator. For a consultant, that compute is real money carried or billed through, so read the four warnings as a bill of materials: match each lever to whether the task earned it (max effort on a hard call, not routine edits; a workflow on a big refactor, not a one-file change), and check `/usage` mid-engagement so you correct course while the week is still running.",
      beats: [
        { kind: 'say', text: "Final item, room three — and it's about money. Specifically, knowing *what* is spending it. You've seen `/usage`: it shows where you stand against your plan's limits. The trouble was always the same — a number climbing, with no clue which of the day's moves was behind it." },
        { kind: 'say', text: "As of 2.1.299, `/usage` stops making you guess. It adds warnings that name the specific behaviors driving your consumption — it turns a bare percentage into something closer to a diagnosis. The number told you *that* you're burning; the warnings tell you *why*." },
        { kind: 'say', text: "Four levers in particular. Max effort — running at the top reasoning tier, the most thinking per turn. Workflows — orchestrating many agents at once, which multiplies a single run's cost. Always-on context — material carried into *every* request, so you pay its weight each turn. And large tool results — big outputs a tool drops in, swelling what every later turn has to haul. All four are legitimate; all four quietly run up the meter." },
        {
          kind: 'choice',
          prompt: "`/usage` flags that a workflow and always-on context are both driving your spend this week. What has it actually done, and what's your move?",
          options: [
            { id: 'warns', label: "It's warned you — named the two levers — but capped nothing; I decide whether each one earned its cost and dial back the one that didn't", correct: true, reaction: "Right. It's a warning, not a wall. The control stays yours: a workflow on a real refactor earns its cost, always-on context riding along out of habit doesn't — so you trim that and keep the number honest." },
            { id: 'capped', label: "It's automatically capped those two levers and blocked further requests until usage falls", correct: false, reaction: "No — it doesn't cap or block. It surfaces the levers so *you* can act. Nothing gets taken out of your hands; you choose what to dial back." },
            { id: 'downgrade', label: "It's switched me to the cheapest model and turned the workflow off on its own", correct: false, reaction: "It changes nothing on its own — no downgrade, no shutoff. It names what's spending so you can decide. The move is yours, not the tool's." },
          ],
        },
        { kind: 'say', text: "That 'warning, not a wall' part is the whole character of it. It doesn't cap your usage, throttle the session, or switch anything off. It just makes the expensive levers announce themselves instead of hiding inside one climbing percentage. You stay the operator." },
        { kind: 'say', text: "Here's the engagement read. That compute is real money — in your rate or billed through to the client. So read the four warnings as a bill of materials. Match each lever to the work: max effort on a genuinely hard call, yes; left on for routine edits, waste. A workflow across a big refactor, yes; for a one-file change, no. The warning points; you judge whether it pulled its weight." },
        { kind: 'say', text: "And read it *during* the work, not after the bill. When a warning says always-on context has gone heavy, trim it then. When max effort is lit on throwaway work, drop it on the spot. Correcting course mid-engagement is the entire payoff — the spend lands on the decisions that carried the week, not the chores that ran hot unwatched. Take the key — then face Meterwyrm, the drake who runs up your toll in the dark." },
      ],
    },
  },
  battle: {
    name: 'Meterwyrm, the Silent Toll',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a long, smoke-dark wyrm uncoils over a hoard of your own spent hours, four thin streams of it trickling away into the dark unseen* …I drink from you in four quiet streams and you never once see which… the hard-run turn, the swarm of helpers, the weight you carry into every request, the great dumps your tools let fall… your meter climbs and you cannot say why… you claim \`/usage\` now *names* my four streams aloud?! …then say true what it does when it warns, before I drink another hour unseen.",
    tauntLines: [
      "*coils tighten, triumphant* you'd have me believe your \`/usage\` *caps* me — bricks up my streams and blocks your every request once I drink too deep?! no… it warns, it does not wall — it names the lever and leaves the choosing to you…",
      "*exhales a plume of ash* you think it *tames itself* — drops you to the cheapest model, snuffs your swarm, all on its own?! never… it changes nothing unbidden — it only shows what spends, so *you* decide what to dial back…",
    ],
    victoryLine: "*Meterwyrm's four streams flicker into plain daylight, each one named* …max effort… workflows… always-on context… large tool results… you *see* them now, every one, and choose which may drink… no more toll in the dark… take the key, operator, and spend only where it pays.",
    questions: [
      {
        prompt:
          "Your Claude Code usage is climbing faster than you expected and you want to know what's driving it. What does the updated `/usage` now do for you?",
        choices: [
          { id: 'a', label: "It raises warnings naming the levers inflating your usage — max effort, workflows, always-on context, and large tool results — so you can see which behavior is driving the spend, not just the total", correct: true },
          { id: 'b', label: "It caps your usage automatically once any of those four levers crosses a threshold, blocking further requests", correct: false },
          { id: 'c', label: "It switches your session to the cheapest model and turns off workflows until your usage falls back down", correct: false },
          { id: 'd', label: "It shows a single overall percentage exactly as before — there's still no breakdown of what's driving it", correct: false },
        ],
        passFeedback: "HIT! `/usage` now warns on the four big consumption levers — max effort, workflows, always-on context, and large tool results — so you can see *what's* driving your spend, not just how much is left.",
        failFeedback: "MISS! It doesn't cap, downgrade, or stay a bare percentage. It *names* the four levers inflating your usage so you can act. Re-read Book 1.",
      },
    ],
  },
};
