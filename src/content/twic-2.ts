import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — enforceAvailableModels: a managed setting that makes the
 * `availableModels` allowlist also constrain the Default model selection.
 * Source: Claude Code CHANGELOG 2.1.175 ("Added `enforceAvailableModels` managed
 * setting — when enabled, the `availableModels` allowlist also constrains the
 * Default model").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2. The Beat Reporter's mid-week story is one for anyone who sets the rules instead of just following them: the new `enforceAvailableModels` managed setting. A firm could already list approved models in an `availableModels` allowlist — but the Default selection could still slip past it. Turn this on and the allowlist binds the Default too, closing the gap. Read the two pages for how the lock works and why a consultant who configures client environments cares, then face the thing in the doorway — it specializes in slipping through the spaces your rules forgot.",
  prompt:
    "Your firm already keeps approved models in an `availableModels` allowlist, but you're worried the Default selection could still resolve to a model that isn't on it. What does turning on the `enforceAvailableModels` managed setting do?",
  choices: [
    { id: 'a', label: 'When enabled, the `availableModels` allowlist also constrains the Default model — so even the default selection stays inside the approved list', correct: true },
    { id: 'b', label: "It's a per-user preference that lets each person pin their own favorite model regardless of the allowlist", correct: false },
    { id: 'c', label: 'It automatically adds every newly released model to your allowlist as soon as it ships', correct: false },
    { id: 'd', label: 'It quietly falls back to a cheaper model whenever the approved one is busy', correct: false },
  ],
  passFeedback: 'HIT! `enforceAvailableModels` is a managed setting that makes the `availableModels` allowlist also constrain the Default model, so the default selection can no longer resolve to anything off the approved list.',
  failFeedback: "MISS! It's not a per-user preference, it doesn't auto-add new models, and it isn't a cost-based fallback. It closes the one gap an allowlist had — the Default model — re-read the books.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**enforceAvailableModels — Closing the Gap the Allowlist Left Open**

**The guardrail that wasn't quite airtight**

Claude Code already let an administrator publish an *\`availableModels\` allowlist* — the set of models people in a managed environment are permitted to pick. Sensible governance: name the approved models, and the picker only shows those. But there was a seam. The *Default* model selection — the automatic choice a user lands on without explicitly picking — didn't necessarily have to sit inside that allowlist. So a policy that looked locked could still resolve, by default, to a model nobody approved.

**What the new setting actually changes**

Release 2.1.175 added the *\`enforceAvailableModels\` managed setting*, and its job is narrow and exact: *when enabled, the \`availableModels\` allowlist also constrains the Default model*. That's the whole mechanic. Flip it on and the same list that governs the explicit picker now governs the default path too, so there's no longer a way to end up on an off-list model just by never choosing one. The allowlist goes from "what you can pick" to "what can run, period."

**A managed setting, set by whoever owns the policy**

The word *managed* matters. This isn't a personal toggle each user flips for themselves — it's an administrative setting, the kind that lives in the configuration an organization pushes down to its people. The person who turns it on is the person responsible for the model policy, and once it's on, individual users can't route around it by leaning on the Default. That's the difference between a guideline and a guardrail.

> Takeaway: \`enforceAvailableModels\` makes your \`availableModels\` allowlist bind the Default selection too, turning an advisory list into an enforced one with no off-list escape hatch.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**When the Rules Have to Hold — Model Governance for Regulated Work**

**A list nobody can route around is worth more than a list with a loophole**

The consultant's version of this story isn't about your own machine — it's about the environments you set up for clients and teams. Plenty of engagements come with a hard constraint on *which* models may be used: a regulated industry with an approved-vendor list, a contract that names permitted systems, a data-handling rule that rules certain models out. In those settings an allowlist with a default-shaped hole in it isn't governance — it's a checkbox that fails the first audit. \`enforceAvailableModels\` is what makes the policy actually bind.

**Configure it where you configure the rest of the standard**

If you're the one standing up a client's managed configuration — the CLAUDE.md conventions, the permission posture, the approved toolset — model policy belongs in that same setup, and this setting is how you give it teeth. You decide the approved list once, with the client's compliance constraints in front of you, then enable enforcement so the Default can't quietly step outside it. It's a one-time decision made calmly during setup, not a fire you fight after someone's already run something off-list in front of a stakeholder.

**Enforcement is a story you can tell the client**

There's a reporting benefit too. "Only these approved models can run in this environment, and the default is constrained to that list" is a sentence a compliance lead actually wants to hear — it's a control you can point to, not a promise you're hoping people keep. On regulated work, being able to demonstrate that the guardrail is enforced rather than suggested is part of the deliverable. It turns "we asked everyone to use approved models" into "the environment can't use anything else."

> Takeaway: When an engagement constrains which models may run, set the allowlist and enable enforcement during configuration — so the policy holds on its own and you can show, not just assert, that it does.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `I'm configuring the managed environment for ____, where only approved models are allowed to run.
First, set the availableModels allowlist to ____ — those are the ones compliance signed off on.
Then enable enforceAvailableModels so the ____ selection is constrained by that same list, not just the explicit picker.
The goal is that ____ can route around the policy by leaning on the default.
Confirm the control is enforced, not advisory, so I can point to it in the ____.`,
    blanks: [
      { id: 'client', suggestions: ['a regulated banking client', 'a healthcare engagement', 'a government contract'] },
      { id: 'list', suggestions: ['the two models on the approved-vendor list', 'only the models named in the contract', 'the compliance-cleared set'] },
      { id: 'default', suggestions: ['Default model', 'automatic default', 'fall-through default'] },
      { id: 'nobody', suggestions: ['nobody on the team', 'no individual user', 'not even an admin by accident'] },
      { id: 'artifact', suggestions: ['compliance review', 'audit', 'security sign-off'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "enforceAvailableModels (Claude Code 2.1.175) is a managed setting that, when enabled, makes the existing `availableModels` allowlist also constrain the Default model selection — closing the gap where the default could otherwise resolve to an off-list model. It's an administrative control, not a per-user preference, so individual users can't route around the policy by leaning on the default. Reach for it when an engagement has a hard rule on which models may run: set the allowlist during configuration, enable enforcement, and you get a guardrail you can demonstrate rather than a guideline you're hoping people follow.",
      beats: [
        { kind: 'say', text: "Mid-week story is for the people who set the rules, not just follow them: the `enforceAvailableModels` managed setting, new in 2.1.175. To get it, you have to know what came before — the `availableModels` allowlist." },
        { kind: 'say', text: "That allowlist already let an admin say 'these are the approved models' and the picker would only show those. Good governance. But there was a seam: the *Default* selection — the model you land on without explicitly choosing — didn't have to sit inside that list." },
        { kind: 'say', text: "So a policy that looked locked could still resolve, by default, to a model nobody approved. That's the hole this closes. When `enforceAvailableModels` is on, the allowlist also constrains the Default model — the list goes from 'what you can pick' to 'what can run, period.'" },
        {
          kind: 'choice',
          prompt: "Make sure the lane is clear. Which of these is `enforceAvailableModels` actually doing?",
          options: [
            { id: 'fallback', label: 'Falling back to a cheaper model when the approved one is busy', correct: false, reaction: "No — that's the continuity story, a different setting entirely. This one isn't about outages or cost; it's about making sure the default can't escape your approved list." },
            { id: 'bind-default', label: 'Making the availableModels allowlist also constrain the Default model selection', correct: true, reaction: "That's it. The one gap an allowlist had was the default path. Flip this on and the default is bound by the same list — no off-list escape hatch." },
            { id: 'per-user', label: 'Letting each user pin their own favorite model', correct: false, reaction: "Opposite direction. It's a *managed* setting — an admin control. The whole point is that individuals *can't* route around the policy on their own." },
          ],
        },
        { kind: 'say', text: "And lean on that word *managed*. This isn't a toggle each person flips for themselves — it's pushed down by whoever owns the model policy. Once it's on, a user can't sidestep it by never choosing a model. That's the line between a guideline and a guardrail." },
        { kind: 'say', text: "Consultant angle: when you stand up a client's environment — the conventions, the permission posture, the approved toolset — model policy belongs in that same setup. Plenty of engagements name which models may run: a regulated vendor list, a contract clause, a data rule. This is how you make that bind." },
        { kind: 'say', text: "Bonus: it's a control you can *show*, not just assert. 'The environment can't run anything off the approved list, default included' is a sentence a compliance lead wants to hear. The books have the mechanic and the governance playbook. The door wants to know what flipping this setting on actually does — nail it and the key's yours." },
      ],
    },
  },
  battle: {
    name: 'The Off-List Phantom',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*seeps through the doorframe your allowlist forgot to seal* …you named your approved models so carefully… but you never locked the default, did you…?",
    tauntLines: [
      "*drifts through the gap in the policy* a list is just a suggestion if there's a way around it — and there's always a way around it…",
      "*phases past the picker entirely* nobody chose me… i'm the *default*… and defaults don't have to ask permission…",
    ],
    victoryLine: "*solidifies against a wall it can no longer pass through* …you enforced it… now even the default is fenced in… take the key…",
    questions: [
      {
        prompt:
          "Your firm already keeps approved models in an `availableModels` allowlist, but you're worried the Default selection could still resolve to a model that isn't on it. What does turning on the `enforceAvailableModels` managed setting do?",
        choices: [
          { id: 'a', label: 'When enabled, the `availableModels` allowlist also constrains the Default model — so even the default selection stays inside the approved list', correct: true },
          { id: 'b', label: "It's a per-user preference that lets each person pin their own favorite model regardless of the allowlist", correct: false },
          { id: 'c', label: 'It automatically adds every newly released model to your allowlist as soon as it ships', correct: false },
          { id: 'd', label: 'It quietly falls back to a cheaper model whenever the approved one is busy', correct: false },
        ],
        passFeedback: 'HIT! `enforceAvailableModels` is a managed setting that makes the `availableModels` allowlist also constrain the Default model, so the default selection can no longer resolve to anything off the approved list.',
        failFeedback: "MISS! It's not a per-user preference, it doesn't auto-add new models, and it isn't a cost-based fallback. It closes the one gap an allowlist had — the Default model — re-read the books.",
      },
    ],
  },
};
