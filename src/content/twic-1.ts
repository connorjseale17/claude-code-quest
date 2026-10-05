import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — a skill named `verify` as an automatic pre-commit gate.
 * Claude Code sharpens its commit guidance: when a project's or user's skills
 * include one named `verify`, Claude is told to run that skill right before it
 * makes a commit — with one carve-out, docs-only and tests-only commits, where
 * there is nothing to verify. The author decides what `verify` does (lint,
 * typecheck, tests, build); the feature is the automatic binding of that skill
 * to the commit boundary.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.286: "Improved commit guidance: when
 *     project/user skills include one named `verify`, Claude told to run it
 *     right before committing except docs-only/tests-only commits"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room one of this week's rundown, and the Beat Reporter nods at a skeleton warden slouched by the gate, stamping every scroll through without reading a word of it. This week's lead item is the opposite reflex, wired in: as of 2.1.286, if your project or user skills include one named `verify`, Claude is told to run it *right before it commits* — your lint, your types, your tests, fired automatically at the commit line, with docs-only and tests-only commits waved past. One book covers the mechanic — how the name becomes the trigger; the other, why a consultant hangs that gate in the client's repo instead of in their own memory. Answer the door for the key, then square up to Rashkeep, the warden who never once checked what he was letting through.",
  prompt:
    "You keep a skill named `verify` in a client's repo that runs its lint, typecheck, and tests. You ask Claude to fix a bug and commit. What does Claude Code's commit guidance do?",
  choices: [
    { id: 'a', label: "Runs your `verify` skill right before making the commit — except on a docs-only or tests-only commit — so the quality gate fires automatically at the commit boundary", correct: true },
    { id: 'b', label: "Renames your `verify` skill to match a built-in verification command Claude Code ships with", correct: false },
    { id: 'c', label: "Runs `verify` once at the start of the session and caches that result for every commit after", correct: false },
    { id: 'd', label: "Blocks the commit entirely until you go and run `verify` yourself in a separate terminal", correct: false },
  ],
  passFeedback: "HIT! Name a skill `verify` and Claude is guided to run it right before each commit — skipping only docs-only and tests-only commits — so your checks fire at the commit boundary without you asking.",
  failFeedback: "MISS! It doesn't rename the skill, run it once-and-cache, or block for you to run it by hand. A skill named `verify` is run automatically right before committing (except docs-only/tests-only). Re-read Book 1.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**A Skill Named \`verify\` — The Check That Fires Itself at the Commit Line**

**The name is the trigger**

Most skills wait to be called — you invoke them, or Claude reaches for one when the task matches. This one is different, and the difference is the whole feature. As of 2.1.286, Claude Code's commit guidance looks for a skill named *exactly* \`verify\` among your project or user skills, and when it finds one, it treats that skill as a standing instruction: run it right before making a commit. You don't ask for it each time and Claude doesn't decide case by case — the name \`verify\` is the hook, and the commit is the moment it fires.

**What runs, and when it doesn't**

The timing is the point. The skill runs at the *commit boundary* — after the work is staged, just before the commit is written — so whatever it checks, it checks on exactly the state that's about to be recorded. There's one deliberate carve-out: a commit that touches only documentation, or only tests, skips the run. Those are the changes where a full verify would be noise — no production code moved, so there's nothing for the gate to catch — and the guidance waves them through rather than making you wait on a check that can't fail meaningfully.

**You own what's inside**

The feature binds the *moment*; you author the *content*. A \`verify\` skill is an ordinary skill, so what it does is entirely yours to write — it might run the linter, the type-checker, and the test suite; it might kick off a build; it might run one fast smoke check and nothing more. Claude Code doesn't prescribe the steps. It only promises to run whatever you put under that name at the one moment it matters most, so the gate reflects *your* definition of "ready to commit."

> Takeaway: Name a skill \`verify\` and Claude Code runs it automatically right before every commit — except docs-only and tests-only commits — with the skill's contents entirely up to you.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**The Pre-Commit Gate You Don't Have to Remember — Why \`verify\` Belongs in the Client's Repo**

**The check you skip is the one that breaks the build**

Every engineer knows the step: run the tests before you commit. Everyone also knows the morning you were in a hurry, skipped it, and pushed the thing that went red in CI twenty minutes later in front of the client. Discipline fails exactly when the pressure is on, which is exactly when it matters. A \`verify\` skill moves that discipline out of your willpower and into the tool — the check doesn't depend on you remembering it, because it's wired to the commit itself.

**Put the gate in the repo, not in your head**

Here's the move that separates a pro: define \`verify\` as a *project* skill, committed to the client's repository, not as a personal habit you carry around. When the gate lives in the repo, it travels with the work. Whoever on your team picks the engagement up next inherits the same checks, run at the same moment, without being told to — the client's quality bar is enforced by the codebase rather than by whichever consultant happens to be at the keyboard. A standard that lives in one person's head leaves when that person does; a standard that lives in the repo stays.

**Scope it so it never cries wolf**

A gate you trust is a gate you keep. If \`verify\` is slow or noisy, people start reaching for ways around it, and a bypassed gate protects nothing. So treat its contents as a design problem: make it run the checks that actually catch the failures this project tends to have, fast enough that nobody resents the wait, and lean on the built-in carve-out — it already spares you the run on docs-only and tests-only commits. A sharp, quick, trustworthy \`verify\` is one you'll never be tempted to disable.

> Takeaway: Wire your discipline into the repo — a committed \`verify\` skill enforces the client's quality bar at every commit for your whole team, so keep it fast and relevant enough that no one ever wants to route around it.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `I'm set up on a client's repo and I want their quality bar enforced on every change I commit.
So I add a skill named ____ to the project, and inside it I put their ____.
Now when I ask Claude to make a change and commit, it runs that skill ____ — automatically, without my asking.
It skips the run on a ____ commit, where there's nothing for the gate to catch.
The gate lives in the repo, so it holds for whoever on my team picks the work up next.`,
    blanks: [
      { id: 'skill-name', suggestions: ['verify', 'a `verify` skill', 'the verify skill'] },
      { id: 'checks', suggestions: ['lint, typecheck, and test commands', 'build and test suite', 'house quality checks'] },
      { id: 'when', suggestions: ['right before each commit', 'at the commit boundary', 'just before committing'] },
      { id: 'excluded', suggestions: ['docs-only or tests-only', 'docs-only', 'tests-only'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "A skill named `verify` as an automatic pre-commit gate (Claude Code 2.1.286): when your project or user skills include one named exactly `verify`, Claude's commit guidance runs it right before making a commit — fired at the commit boundary, on the state about to be recorded. One deliberate carve-out: docs-only and tests-only commits skip the run, since there's no production code to check. The name is the trigger — you don't invoke it each time; the skill's contents are entirely yours (lint, typecheck, tests, build, a smoke check — whatever you write). For a consultant: this moves the 'run the tests before committing' discipline out of willpower and into the tool. Define `verify` as a project skill committed to the client's repo so the gate travels with the work and holds for the whole team; keep it fast and relevant so nobody is tempted to route around it.",
      beats: [
        { kind: 'say', text: "Lead item, room one. It's about the step everyone swears they always do and nobody actually always does: run the checks before you commit. As of 2.1.286, you can hand that job to me." },
        { kind: 'say', text: "Here's the trick. Give your project — or your own user skills — a skill named exactly `verify`. That name is special. My commit guidance watches for it, and when it's there, I run it right before I write a commit. You don't invoke it. The name is the trigger; the commit is the moment." },
        { kind: 'say', text: "And the timing is the whole point. It runs at the commit boundary, on the exact state that's about to be recorded. One carve-out: if the commit touches only docs, or only tests, I skip it — no production code moved, nothing for the gate to catch, so I don't make you wait on a check that can't fail." },
        {
          kind: 'choice',
          prompt: "You've got a `verify` skill in the repo that runs lint, types, and tests. You ask me to fix a typo in the README and commit. What happens?",
          options: [
            { id: 'skips', label: "I skip verify — it's a docs-only commit", correct: true, reaction: "Right. Docs-only and tests-only commits are the deliberate carve-out. No production code moved, so the gate would just be noise. It waves through." },
            { id: 'runs', label: "I run the full verify anyway, every commit no exceptions", correct: false, reaction: "Not quite — there's one carve-out by design. Docs-only and tests-only commits skip the run, so a README fix doesn't wait on the whole test suite." },
            { id: 'asks', label: "I stop and ask you whether to run it this time", correct: false, reaction: "No decision needed from you — the rule is automatic. It runs before code commits and skips docs-only/tests-only ones on its own." },
          ],
        },
        { kind: 'say', text: "Why you'd care on an engagement: discipline fails exactly when the pressure's on — the rushed morning, the client watching. Wiring the check to the commit takes it out of your willpower. It doesn't depend on you remembering, because it's bound to the commit itself." },
        { kind: 'say', text: "And the pro move: make `verify` a *project* skill, committed to the client's repo — not a habit you carry in your head. Then it travels with the work. Whoever picks the engagement up next inherits the same checks at the same moment, without being told. The client's bar is enforced by the codebase, not by whoever's at the keyboard." },
        { kind: 'say', text: "One caution from the books: keep it fast and relevant. A slow, noisy gate is one people route around, and a bypassed gate protects nothing. The books have the mechanic and the engagement read. Answer the door for the key — then face Rashkeep, the warden who stamps everything through unchecked. Show him what a gate that actually reads the scroll looks like." },
      ],
    },
  },
  battle: {
    name: 'Rashkeep, the Checkless Warden',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a skeleton in rusted armor lurches up from a gatehouse buried in unread scrolls, a stamp in one bony fist* …approved… approved… I pass every scroll through without a glance, it is the only duty I know — commit, commit, never once a check… you say there's a rite that reads the scroll *before* it's stamped, a skill that fires itself at the gate? …name true what a \`verify\` skill does before I lift this stamp again.",
    tauntLines: [
      "*stamps a scroll it clearly hasn't read* you'd have me believe the tool *renames* your rite to match its own — swaps your \`verify\` for some built-in of its devising?! no… the name \`verify\` is *yours*, and it is the very hook that makes me run it…",
      "*rattles, waving a dusty ledger* you think it runs *once* at the dawn of the session and trusts that stale stamp for every commit after? never… it fires at each commit, on the very state about to be sealed — not some hour-old memory of it…",
    ],
    victoryLine: "*Rashkeep lowers the stamp and, for the first time in an age, actually reads the scroll in his hand* …a skill named \`verify\`… run right before the seal, every commit of real code, docs and tests waved by… the gate was always meant to *read*… take the key, operator, and let no unchecked scroll past your line.",
    questions: [
      {
        prompt:
          "You keep a skill named `verify` in a client's repo that runs its lint, typecheck, and tests. You ask Claude to fix a bug and commit. What does Claude Code's commit guidance do?",
        choices: [
          { id: 'a', label: "Runs your `verify` skill right before making the commit — except on a docs-only or tests-only commit — so the quality gate fires automatically at the commit boundary", correct: true },
          { id: 'b', label: "Renames your `verify` skill to match a built-in verification command Claude Code ships with", correct: false },
          { id: 'c', label: "Runs `verify` once at the start of the session and caches that result for every commit after", correct: false },
          { id: 'd', label: "Blocks the commit entirely until you go and run `verify` yourself in a separate terminal", correct: false },
        ],
        passFeedback: "HIT! Name a skill `verify` and Claude is guided to run it right before each commit — skipping only docs-only and tests-only commits — so your checks fire at the commit boundary without you asking.",
        failFeedback: "MISS! It doesn't rename the skill, run it once-and-cache, or block for you to run it by hand. A skill named `verify` is run automatically right before committing (except docs-only/tests-only). Re-read Book 1.",
      },
    ],
  },
};
