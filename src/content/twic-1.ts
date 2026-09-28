import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — `/doctor prompt-audit`. Claude Code adds a subcommand of
 * `/doctor` that audits a project's CLAUDE.md file(s) for "older model patterns"
 * — standing instructions written against how a previous model generation
 * behaved that no longer help (or now hurt). The audit reports its findings for
 * you to act on; it does not silently rewrite the brief. The report leads with
 * two categories: stale paths/commands and thinking keywords.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.283: "Added `/doctor prompt-audit` command to
 *     audit CLAUDE.md files for older model patterns"
 *   - Claude Code CHANGELOG 2.1.283: "Improved `prompt-audit` reporting stale
 *     paths/commands and thinking keywords first"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room one of this week's rundown, and the Beat Reporter waves you past a skeleton bent over a mildewed grimoire, reciting the same incantations it learned a hundred model-generations ago. The 2.1.283 release adds a command for exactly that problem: `/doctor prompt-audit` reads your project's CLAUDE.md and flags the *older-model patterns* still lurking in it — stale paths and commands, leftover thinking keywords — so the brief you hand every session stays current instead of quietly rotting. One book covers what the audit scans and reports; the other, why a consultant treats standing instructions as a living document worth pruning. Answer the door for the key, then square up to Cruftbones, a scribe who never once reread its own scroll.",
  prompt:
    "You run `/doctor prompt-audit` on a client's CLAUDE.md. What does it do?",
  choices: [
    { id: 'a', label: "Scans the CLAUDE.md for older-model patterns — leading with stale paths/commands and thinking keywords — and reports what it finds so you can prune it", correct: true },
    { id: 'b', label: "Rewrites the CLAUDE.md in place, deleting anything it judges outdated without asking you first", correct: false },
    { id: 'c', label: "Runs the project's test suite to confirm the instructions in the file still build", correct: false },
    { id: 'd', label: "Benchmarks the repo against several models and picks the cheapest one for the session", correct: false },
  ],
  passFeedback: "HIT! `/doctor prompt-audit` reads your standing instructions and surfaces the older-model cruft — stale paths and commands, leftover thinking keywords — for you to prune. It reports; you decide what goes.",
  failFeedback: "MISS! It audits and reports, it doesn't silently rewrite your brief, run tests, or pick a model. It flags older-model patterns so you can clear them yourself. Re-read Book 1.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**\`/doctor prompt-audit\` — Checking Your Standing Orders for Fossils**

**Why a brief goes stale in the first place**

A CLAUDE.md is written at a moment in time, against the model you were using *then*. It carries the workarounds that model needed, the phrasings that nudged it the right way, the paths and commands the repo had on the day you wrote it. Models move on — they get better at reading a codebase, they handle reasoning differently, they stop needing the hand-holding an earlier one did. Your standing instructions don't move with them. What was a useful nudge a year ago can become dead weight, or worse, a instruction that actively steers a newer model wrong.

**What the command scans**

As of 2.1.283, \`/doctor prompt-audit\` is the tool for finding that rot. It's a subcommand of \`/doctor\` that reads your project's CLAUDE.md file(s) and flags *older-model patterns* — the guidance that was tuned for a previous generation. The report leads with two categories. *Stale paths and commands*: references to files, scripts, or invocations that have since moved or changed, so the brief points the model at things that aren't there anymore. And *thinking keywords*: the older prompting idioms that told the model how hard to think, which newer models manage without being told.

**A report, not a rewrite**

Read what it does carefully, because it's easy to over-hope here. \`/doctor prompt-audit\` *audits* and *reports* — it hands you a list of what looks stale and where. It doesn't reach in and rewrite your CLAUDE.md for you, and it doesn't delete anything on its own. You stay the editor: the command finds the fossils, you decide which ones to clear and which to keep.

> Takeaway: \`/doctor prompt-audit\` scans your CLAUDE.md for older-model patterns — stale paths/commands and thinking keywords first — and reports them for you to prune, without rewriting the file itself.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Prune the Brief Like Code — Why Stale Instructions Tax Every Turn**

**The CLAUDE.md you inherited**

Half of consulting is picking up a repo someone else set up, and if that team ran an AI coding agent, the odds are good you've inherited a CLAUDE.md too. Nobody wrote it yesterday. It was tuned a year ago, for whatever model that team used then, and it's been accreting one-off notes ever since. Before you lean on it, that file deserves the same suspicion you'd give any inherited config: run the audit on it *first*, and see what's pointing at a script that got renamed two refactors ago.

**Context is a budget you're already spending**

Here's the part that's easy to miss: every line of that brief ships to the model on *every* turn. A stale instruction isn't inert — it's a tax. It fills context that could hold something useful, and a thinking keyword written for an older generation can quietly pull a current model off its natural stride. You pay that cost silently, turn after turn, and never see the invoice. The audit is what puts the invoice in front of you: here is what your standing orders are costing you, and here is what you can safely cut.

**Make it a ritual, not a one-off**

The move that separates a pro is treating the brief as a living document. A CLAUDE.md is never *done* — it drifts the moment the codebase or the model underneath it changes. So wire the audit into your rhythm: run it when you inherit a repo, run it again after a model upgrade, run it whenever a session starts behaving oddly for no reason you can name. Cheap to run, and it keeps the one file every session reads honest.

> Takeaway: Treat your CLAUDE.md as code that rots — audit an inherited or aging brief before you trust it, and re-run the audit after every model upgrade to stop stale guidance from taxing every turn.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `I've just inherited a client's repo, and its ____ was last touched over a year ago.
Before I trust it, I run ____ to see what's gone stale in it.
The report leads with ____ — references the codebase no longer has — and with older ____ the brief still carries.
The command doesn't rewrite the file for me; it ____, and I decide what to cut.
I'll make this a ritual: run it on any inherited brief, and again after every model upgrade.`,
    blanks: [
      { id: 'brief-file', suggestions: ['CLAUDE.md', 'standing brief', 'project instructions file'] },
      { id: 'command', suggestions: ['/doctor prompt-audit', 'the prompt-audit', 'the /doctor audit'] },
      { id: 'stale-first', suggestions: ['stale paths and commands', 'dead paths and invocations', 'references that moved'] },
      { id: 'keywords', suggestions: ['thinking keywords', 'reasoning-nudge phrasings', 'older prompting idioms'] },
      { id: 'reports', suggestions: ['reports what it finds', 'surfaces the findings', 'flags the older-model patterns'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "`/doctor prompt-audit` (Claude Code 2.1.283): a subcommand of /doctor that audits your project's CLAUDE.md file(s) for older-model patterns — standing instructions tuned for a previous model generation that no longer help or now hurt. The report leads with two categories: stale paths/commands (references the codebase no longer has) and thinking keywords (older prompting idioms that told the model how hard to think, which newer models handle without being told). It audits and reports — it does not silently rewrite the file or delete anything; you stay the editor. For a consultant: every line of a CLAUDE.md ships to the model on every turn, so stale guidance is a silent context tax; run the audit on an inherited or aging brief before trusting it, and again after any model upgrade. Treat the brief as a living document.",
      beats: [
        { kind: 'say', text: "Lead item this week is about the one file every session of mine reads before it does anything: your CLAUDE.md, the standing brief. Here's the thing nobody tells you — that file goes stale, and it goes stale silently." },
        { kind: 'say', text: "You wrote it against whatever model you had at the time. The workarounds that model needed, the phrasings that nudged it, the paths the repo had that day. Models move on. The brief doesn't. A year later it's still whispering instructions tuned for a version that no longer exists." },
        { kind: 'say', text: "So 2.1.283 gives you a broom: `/doctor prompt-audit`. It's a subcommand of `/doctor` — it reads your CLAUDE.md and flags the older-model patterns still in it. The report leads with two things: stale paths and commands, meaning references to files or scripts that moved; and thinking keywords, the old idioms that told a model how hard to think, back when you had to." },
        {
          kind: 'choice',
          prompt: "You run `/doctor prompt-audit` on an inherited CLAUDE.md and it turns up plenty. What has it actually done for you?",
          options: [
            { id: 'reports', label: "Handed you a report of the stale patterns to prune yourself", correct: true, reaction: "Right. It audits and reports — stale paths, old thinking keywords, laid out for you. You're still the editor. It finds the fossils; you decide which ones go." },
            { id: 'rewrites', label: "Rewritten the file, deleting whatever it judged outdated", correct: false, reaction: "No — and be glad it doesn't. It reports; it never reaches in and rewrites your brief on its own. The cuts are your call." },
            { id: 'tests', label: "Run the test suite to check the instructions still build", correct: false, reaction: "Different tool entirely. prompt-audit reads the brief for older-model patterns; it doesn't run your tests." },
          ],
        },
        { kind: 'say', text: "Why you'd care on an engagement: half the job is a repo you didn't set up, and if their team ran an agent, you've inherited their CLAUDE.md too. It was tuned for a model from a year ago and pointing at a script that got renamed two refactors back. Audit it before you trust it." },
        { kind: 'say', text: "And remember the cost. Every line of that brief ships to me on every single turn. A stale instruction isn't harmless — it fills context that could hold something useful, and an old thinking keyword can pull a current model off its stride. The audit puts that invoice in front of you." },
        { kind: 'say', text: "The books have the mechanic and the engagement read both. Answer the door for the key, then face what's guarding it: Cruftbones, a scribe who's recited the same ancient scroll for so long it never noticed the world moved on. Prove you know what the audit does — and it might, at last, reread its own brief." },
      ],
    },
  },
  battle: {
    name: 'Cruftbones, the Fossil Scribe',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a skeleton looks up from a grimoire so old the ink has gone to dust, still mouthing the incantations* …a live one… I have read these same orders every morning for a thousand years — think harder, step by step, run the old script at the old path… what's that? a spell that reads my scroll and tells me which lines have rotted? …name what your \`/doctor prompt-audit\` truly does before I believe a broom could touch my sacred cruft.",
    tauntLines: [
      "*snaps the grimoire shut, bone-dust rising* you'd have it *rewrite my scroll for me* — reach in and delete my ancient orders unbidden?! never… it reports what it finds, and the cutting is the operator's hand, not the tool's…",
      "*rattles indignantly* you think it *runs the tests*, that it proves my instructions still build? no — it reads the brief itself, for older-model patterns, stale paths and thinking keywords… it audits my words, it does not compile them…",
    ],
    victoryLine: "*Cruftbones finally rereads its own scroll and sees a hundred dead paths staring back* …stale… every line tuned for a model long gone… you were right — the audit only *showed* me; the pruning was always mine to do… take the key, operator, and keep your own brief honest…",
    questions: [
      {
        prompt:
          "You run `/doctor prompt-audit` on a client's CLAUDE.md. What does it do?",
        choices: [
          { id: 'a', label: "Scans the CLAUDE.md for older-model patterns — leading with stale paths/commands and thinking keywords — and reports what it finds so you can prune it", correct: true },
          { id: 'b', label: "Rewrites the CLAUDE.md in place, deleting anything it judges outdated without asking you first", correct: false },
          { id: 'c', label: "Runs the project's test suite to confirm the instructions in the file still build", correct: false },
          { id: 'd', label: "Benchmarks the repo against several models and picks the cheapest one for the session", correct: false },
        ],
        passFeedback: "HIT! `/doctor prompt-audit` reads your standing instructions and surfaces the older-model cruft — stale paths and commands, leftover thinking keywords — for you to prune. It reports; you decide what goes.",
        failFeedback: "MISS! It audits and reports, it doesn't silently rewrite your brief, run tests, or pick a model. It flags older-model patterns so you can clear them yourself. Re-read Book 1.",
      },
    ],
  },
};
