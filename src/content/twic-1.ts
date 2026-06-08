import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — Dynamic Workflows: Claude plans a large task and fans out
 * hundreds of parallel subagents in a single session.
 * Source: Anthropic "Introducing Claude Opus 4.8" (Dynamic Workflows research
 * preview) + Claude Code CHANGELOG 2.1.160 (trigger keyword renamed
 * `workflow` -> `ultracode`).
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown. The Beat Reporter is buzzing — the headline that shipped with Opus 4.8 is Dynamic Workflows, where Claude takes one enormous task, plans the whole thing, and unleashes hundreds of parallel subagents in a single session. Read the two pages on the desk to see how the fan-out works and where a consultant points it. Then the door asks one question, and the thing guarding the key has opinions about scale.",
  prompt:
    "You hand Claude a single instruction: migrate a 400,000-line codebase off a deprecated API, kickoff to merge. Instead of grinding file by file, it plans the work and spins up hundreds of subagents that run at the same time inside one session. What capability is this?",
  choices: [
    { id: 'a', label: 'Dynamic Workflows — Claude plans the large task itself and runs hundreds of parallel subagents in a single session', correct: true },
    { id: 'b', label: 'The same as hand-defining custom subagents and invoking them one at a time', correct: false },
    { id: 'c', label: 'Auto permission mode letting Claude act without stopping to ask', correct: false },
    { id: 'd', label: 'Opening hundreds of separate Claude Code sessions in parallel terminal tabs yourself', correct: false },
  ],
  passFeedback: 'HIT! Dynamic Workflows is the research-preview capability where Claude plans a big job and fans out hundreds of parallel subagents in one session — enough to carry a codebase-scale migration from kickoff to merge.',
  failFeedback: 'MISS! This is not you wiring up subagents by hand, not a permission mode, and not you juggling terminal tabs. Claude does the planning and the fan-out itself — re-read the books.',
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**Dynamic Workflows — One Instruction, a Hundred Hands**

**The ceiling this lifts**

A normal Claude Code session is essentially one worker holding a single thread of attention. That worker is excellent, but it moves through a job mostly in sequence, and the bigger the job the longer the line. *Dynamic Workflows*, the research-preview capability that arrived alongside Claude Opus 4.8, removes that ceiling. Hand Claude a task too large for one pass and it will *plan the work and run hundreds of parallel subagents in a single session* — decomposing the goal itself and farming the pieces out, rather than asking you to chop the job up first.

**What the fan-out looks like in practice**

The example Anthropic leads with is the kind that used to mean a quarter and a war room: a *codebase-scale migration across hundreds of thousands of lines of code, from kickoff to merge*. Claude reads the shape of the problem, drafts a plan, then spawns a swarm of subagents that each own a slice and work concurrently. Because the subagents run together instead of in a queue, wall-clock time stops scaling with the size of the task the way it does for a lone session.

**The keyword that turns it on**

Inside Claude Code the trigger has a name. As of release 2.1.160 the dynamic-workflow keyword was *renamed from \`workflow\` to \`ultracode\`* — so \`ultracode\` is the dial that tells Claude this is a job worth planning and parallelizing, not a one-shot edit. It sits at the heavy end of the effort range, reserved for work whose scale actually justifies the planning overhead.

> Takeaway: Dynamic Workflows lets Claude turn a single oversized instruction into its own plan and hundreds of subagents running at once — you bring the goal, it brings the parallelism.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Pointing the Swarm — When a Consultant Reaches for ultracode**

**The jobs that have been stuck in the backlog**

Every engagement has the task nobody schedules: the framework upgrade across three hundred files, the rename that touches every module, the dead-API sweep that's been "next quarter" for a year. They're not hard — they're *big*, and bigness is what burns a junior's week. Dynamic Workflows is built for exactly this shape. When the work is large, mechanical, and decomposable, that's the signal to let Claude plan it and fan it out instead of pairing on it edit by edit.

**Scope it like you'd scope a crew**

You don't point a hundred-person crew at a vague brief, and you shouldn't point a hundred subagents at one either. The leverage comes from a sharp goal and clear boundaries: which directories are in play, what "done" means, what the merge gate is. Claude does the planning, but the quality of the plan still tracks the quality of the framing — name the target state and the constraints, then let the swarm carry the load.

**Match the tool to the size of the task**

Because it's a research preview and the heavy end of the effort range, \`ultracode\` is not the gear for a two-file tweak — the planning overhead would dwarf the work. Reserve it for the genuinely large jobs and review the result the way you'd review any big merge: read the diff, run the suite, sanity-check the edges. Used on the right task it collapses a week of grunt migration into a single supervised session; used on the wrong one it's a sledgehammer for a thumbtack.

> Takeaway: Save Dynamic Workflows for the large, decomposable jobs that have been clogging the backlog — sharp goal in, supervised swarm out.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `This is a big, mechanical job, so plan it as a Dynamic Workflow and fan it out.
Goal: migrate the ____ off the deprecated ____ across the whole repo.
Scope it to ____ and leave everything else untouched.
"Done" means ____ — that's the merge gate.
Plan the work yourself, run the subagents in parallel, then show me one diff to review.`,
    blanks: [
      { id: 'target', suggestions: ['Acme billing service', 'client data layer', 'internal reporting app'] },
      { id: 'api', suggestions: ['v1 payments SDK', 'legacy auth library', 'old charting package'] },
      { id: 'scope', suggestions: ['the src/ and tests/ trees', 'the services/billing directory', 'everything except vendored code'] },
      { id: 'done', suggestions: ['the full test suite passes', 'zero references to the old API remain', 'the type-check and lint are clean'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "Dynamic Workflows (research preview, shipped with Opus 4.8): hand Claude one oversized task and it plans the work itself and runs hundreds of parallel subagents in a single session — enough to carry a codebase-scale migration across hundreds of thousands of lines from kickoff to merge. In Claude Code the trigger keyword was renamed from `workflow` to `ultracode` (2.1.160), and it sits at the heavy end of the effort range. Reach for it on large, decomposable jobs with a sharp goal; review the result like any big merge.",
      beats: [
        { kind: 'say', text: "Big lead this week, straight out of the Opus 4.8 launch: Dynamic Workflows. The pitch is simple and kind of wild — you hand Claude one enormous task and it *plans the work and runs hundreds of parallel subagents in a single session*." },
        { kind: 'say', text: "The headline example is a `codebase-scale migration across hundreds of thousands of lines of code, from kickoff to merge`. Not you slicing it up — Claude reads the shape of the job, drafts the plan, then spawns a swarm where each subagent owns a slice and they all run at once." },
        { kind: 'say', text: "That's the part that matters: the subagents run *concurrently*, not in a line. So wall-clock time stops scaling with the size of the task the way it does for a single worker grinding through sequentially." },
        {
          kind: 'choice',
          prompt: "Quick gut-check. What's the actual difference between Dynamic Workflows and just defining a few custom subagents yourself?",
          options: [
            { id: 'self-define', label: 'No difference — it\'s the same as me writing subagent definitions and calling them', correct: false, reaction: "Not quite. With hand-defined subagents you do the decomposing and the delegating. Dynamic Workflows has Claude plan the whole task and fan out the swarm itself — that's the leap." },
            { id: 'claude-plans', label: 'Claude does the planning and the fan-out itself, spinning up hundreds in one session', correct: true, reaction: "Exactly. You bring one big goal; Claude turns it into its own plan and hundreds of parallel subagents. The orchestration moves from your hands to its own." },
            { id: 'permission', label: 'It\'s a permission setting that lets Claude skip approvals', correct: false, reaction: "Different axis entirely. Permission modes govern *whether* Claude can act without asking; Dynamic Workflows is about *how much* it can plan and parallelize in one shot." },
          ],
        },
        { kind: 'say', text: "In Claude Code there's a keyword for it. As of 2.1.160 the dynamic-workflow trigger was renamed from `workflow` to `ultracode` — that's the dial that says 'this job is big enough to plan and parallelize,' and it lives at the heavy end of the effort range." },
        { kind: 'say', text: "Consultant's caveat: it's a research preview and it's a sledgehammer. Point it at the large, mechanical, decomposable jobs — the framework upgrade across three hundred files, the dead-API sweep that's been 'next quarter' forever. Give it a sharp goal and clear boundaries, not a two-file tweak." },
        { kind: 'say', text: "And review the output like any big merge: read the diff, run the suite, check the edges. The books on the desk have the mechanics and the playbook. The door wants to know what this capability actually *is* — answer that and the key's yours." },
      ],
    },
  },
  battle: {
    name: 'The Hundredfold Husk',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*rattles apart into a hundred clattering copies, all moving at once* …one of me for every file you've got… still think you'll do this by hand…?",
    tauntLines: [
      "*a hundred skulls grin in unison* one at a time, mortal, one bone at a time, the way you've always done it…",
      "*scatters across the chamber* you can't be everywhere — but I can, that's the whole point you keep missing…",
    ],
    victoryLine: "*the copies snap back into a single heap* …fine… you understood the swarm… take the key before I reassemble…",
    questions: [
      {
        prompt:
          "You hand Claude a single instruction: migrate a 400,000-line codebase off a deprecated API, kickoff to merge. Instead of grinding file by file, it plans the work and spins up hundreds of subagents that run at the same time inside one session. What capability is this?",
        choices: [
          { id: 'a', label: 'Dynamic Workflows — Claude plans the large task itself and runs hundreds of parallel subagents in a single session', correct: true },
          { id: 'b', label: 'The same as hand-defining custom subagents and invoking them one at a time', correct: false },
          { id: 'c', label: 'Auto permission mode letting Claude act without stopping to ask', correct: false },
          { id: 'd', label: 'Opening hundreds of separate Claude Code sessions in parallel terminal tabs yourself', correct: false },
        ],
        passFeedback: 'HIT! Dynamic Workflows is the research-preview capability where Claude plans a big job and fans out hundreds of parallel subagents in one session — enough to carry a codebase-scale migration from kickoff to merge.',
        failFeedback: 'MISS! This is not you wiring up subagents by hand, not a permission mode, and not you juggling terminal tabs. Claude does the planning and the fan-out itself — re-read the books.',
      },
    ],
  },
};
