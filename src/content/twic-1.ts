import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — Code Mode (experimental).
 * Claude Code CHANGELOG 2.1.323 added Code Mode, an experimental, opt-in mode
 * in which Claude writes a JavaScript program that calls its tools, instead of
 * emitting one tool call at a time and waiting for each result. It is off by
 * default, it is experimental (may change or be removed), and every tool call
 * the script makes still passes through your permission rules and PreToolUse
 * hooks. Admins can turn it off org-wide.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.323: "Added Code Mode, an experimental opt-in
 *     in which Claude writes JavaScript to call its tools."
 *   - Secondary coverage (dev.to, mindstudio.ai, clauding.de, dev.classmethod.jp,
 *     automater.ai) corroborating: off by default, experimental/opt-in, batches
 *     several tool calls in one JavaScript run, per-call permission rules and
 *     PreToolUse hooks still apply, org-level off switch.
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room one of this week's rundown. The Beat Reporter tips her pen at a skeleton scribe hunched over a lectern in the archway, a figure who has spent an eternity copying out errands one line at a time — read a file, stop; run a command, stop; read the next, stop — pausing after every single stroke to see what came back. This week's lead item is the setting that finally hands him a different way to work: Code Mode, an experimental opt-in added in 2.1.323 where Claude writes a short *JavaScript program* that calls its tools, instead of firing them off one at a time. One book covers the mechanic — what changes when tool calls become lines in a script; the other, why a consultant reaches for it on the gnarly, many-step jobs. Read both, win the key, then face Tallybone, the scribe who swears the only honest way to do anything is one call at a time.",
  prompt:
    "You've switched on Claude Code's experimental Code Mode for a long, repetitive data-wrangling job. What does Code Mode actually change about how Claude uses its tools?",
  choices: [
    { id: 'a', label: "Instead of emitting one tool call at a time and waiting for each result, Claude writes a JavaScript program that calls its tools — so it can sequence and batch many calls in a single run", correct: true },
    { id: 'b', label: "Each tool call made from the script skips your permission rules and PreToolUse hooks, since it's now plain code rather than a tool call", correct: false },
    { id: 'c', label: "It replaces Claude's built-in tools with JavaScript libraries, so Read, Edit, and Bash are no longer available in the session", correct: false },
    { id: 'd', label: "It's the new default for every session, compiling your whole conversation into one script before anything runs", correct: false },
  ],
  passFeedback: "HIT! Code Mode lets Claude write a JavaScript program that calls its tools, so a long chain of steps runs in one program instead of a stop-and-wait round trip per call. The tools and their permission checks are unchanged — only the way the calls are issued is different.",
  failFeedback: "MISS! It doesn't bypass permissions, it doesn't remove your tools, and it isn't the default — it's an experimental opt-in where Claude writes JavaScript that calls the same tools. Re-read Book 1.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**One Program Instead of One Call at a Time — How Code Mode Changes the Hand on the Keyboard**

**The normal rhythm: ask, wait, ask again**

Out of the box, Claude works a tool loop you can almost hear. It decides on one action — read this file — and emits a single tool call. Then it *stops* and waits for the result to come back before it can decide the next move. Read, wait. Edit, wait. Run, wait. For a quick task that cadence is invisible and fine. For a job that's thirty small steps of the same shape, it's thirty separate round trips, each one a pause where Claude hands control out and waits to get it back.

**What Code Mode does differently**

Code Mode, added as an experimental opt-in in 2.1.323, swaps that rhythm for a short program. Rather than firing tools one at a time, Claude writes a piece of *JavaScript* that calls its tools as ordinary function calls, and Claude Code runs that script inside your session. A loop over twenty files, a filter, a transform, a call whose output feeds straight into the next — all of it can live in one program that executes in a single run instead of twenty hand-offs.

**The tools don't change — the way they're issued does**

This is the part worth saying slowly. Code Mode is *not* a new set of powers. The same tools you already have are what the script calls; it is only the *mechanism of calling them* that moves from one-at-a-time messages into lines of code. And critically, every tool call the script makes still travels through your permission rules and your \`PreToolUse\` hooks, exactly as a hand-issued call would. The script is a faster way to drive the car, not a way to take the doors off.

**Experimental, opt-in, and off by default**

It ships behind a switch for a reason: it's labeled experimental and may change or be removed, it's off until you turn it on, and an organization's admins can disable it entirely. So it's a tool you *reach for*, deliberately, when a task's shape rewards it — not something running under you by default.

> Takeaway: Code Mode lets Claude write a JavaScript program that calls its existing tools in one run, instead of a stop-and-wait round trip per call — same tools, same permission checks, different hand on the keyboard.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**When the Job Is Thirty Small Steps — Reaching for Code Mode on the Grindy Work**

**The shape of task that pays for it**

Not every job wants this. A one-file edit, a quick read, a single command — the ordinary loop handles those with no ceremony. Code Mode earns its keep on the *repetitive, many-step* work: rename a field across forty files, pull one number out of every report in a folder, walk a directory and reshape each item the same way. These are the engagements where the one-at-a-time rhythm turns a two-minute idea into a long parade of near-identical round trips, and where expressing the whole pass as a small loop is simply the more honest description of the work.

**What you actually gain**

The win is twofold. First, fewer hand-offs: a chain of steps that would have been a dozen separate calls becomes one program that runs through, so the task spends less of its life waiting between calls. Second, and often more valuable, is *composition* — because the steps live in code, an intermediate result can flow straight into the next step, be filtered, be counted, be transformed, without a human-readable detour for every link in the chain. The logic of the task gets to look like the logic of the task.

**Spend the control you still have**

Because this is experimental and opt-in, treat it as a deliberate gear, not a default. Turn it on for the grindy batch pass; leave it off for exploratory or high-stakes single edits where you want to eyeball each move. And lean on the fact that your guardrails still hold: the script's calls run through the same deny and ask rules and the same \`PreToolUse\` hooks, so a client's \"what's keeping this in bounds?\" has the same answer it always did. You get the speed of a batch without surrendering the checks.

> Takeaway: Use Code Mode when the work is a repetitive multi-step pass — you trade a parade of round trips for one composed program, while the permission rules that keep a client comfortable stay exactly where they were.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `I've got a grindy batch job: walk every file in the reports folder and pull one figure out of each.
Because it's ____ of the same shape, the one-call-at-a-time loop would be a long parade of round trips.
So I turn on ____ — the experimental opt-in — and let Claude write a ____ that calls its tools in one run.
I remind myself this doesn't ____; every call the script makes still goes through my permission rules and hooks.
And I keep it a deliberate gear: on for ____, off for the exploratory single edits I want to eyeball.`,
    blanks: [
      { id: 'many-steps', suggestions: ['dozens of near-identical steps', 'the same move repeated across many files', 'a long repetitive multi-step pass'] },
      { id: 'the-mode', suggestions: ['Code Mode', 'the experimental Code Mode', 'the JavaScript tool-calling mode'] },
      { id: 'the-script', suggestions: ['short JavaScript program', 'single script that loops over the folder', 'bit of code'] },
      { id: 'no-bypass', suggestions: ['remove any of my tools', 'skip my permission checks', 'take the guardrails off'] },
      { id: 'the-batch', suggestions: ['the repetitive batch pass', 'this many-step grind', 'the big folder-wide job'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "Code Mode (Claude Code 2.1.323, experimental opt-in, off by default): normally Claude issues one tool call, waits for the result, then issues the next — a stop-and-wait round trip per call. In Code Mode, Claude instead writes a JavaScript program that calls its tools as function calls, and Claude Code runs it in the session, so many steps execute in one run. It is NOT new powers: the same tools are called, and every call the script makes still passes through your permission rules and PreToolUse hooks. It is experimental (may change/be removed), opt-in, off by default, and admins can disable it org-wide. The sweet spot is repetitive multi-step work — loop over many files, filter, transform, chain outputs — where composition in code beats a parade of hand-offs. For exploratory or high-stakes single edits, leave it off and eyeball each move.",
      beats: [
        { kind: 'say', text: "Lead item, room one. There's a new word in 2.1.323 — Code Mode. To get why it matters, watch how I normally work a tool loop. I pick one action, I call one tool, and then I *stop* and wait for the result before I decide the next thing. Read, wait. Edit, wait. Run, wait." },
        { kind: 'say', text: "For a quick job that cadence is invisible. But picture a grindy one — pull a number out of forty reports, or rename a field across every file in a folder. Now it's forty separate round trips, each one a little hand-off where I give control out and wait to get it back. Same small move, over and over." },
        { kind: 'say', text: "Code Mode changes the rhythm. Instead of firing tools one at a time, I write a short *JavaScript program* that calls my tools — and Claude Code runs that script right here in the session. A loop over all forty reports, a filter, the transform, all in one run instead of forty hand-offs." },
        { kind: 'say', text: "Now — the thing people get wrong, so pin it down. It's not a new set of powers. The script calls the *same* tools you've always had. What moved is only *how* the calls get issued — from one-at-a-time messages into lines of code." },
        {
          kind: 'choice',
          prompt: "Quick check, because this is the trap. When the script runs a tool call, does it skip past your permission rules and PreToolUse hooks — since it's 'just code' now — or does each call still go through them?",
          options: [
            { id: 'still-checked', label: "Still checked — every call the script makes runs through the same permission rules and hooks", correct: true, reaction: "Right, and that's the whole reason it's safe to reach for. Code Mode is a faster way to drive the car, not a way to take the doors off. A client's 'what keeps this in bounds?' has the same answer it always did." },
            { id: 'bypasses', label: "Bypasses them — once it's inside a script, the calls run unchecked", correct: false, reaction: "No — and that'd be the dangerous version. Each tool call from the script still passes through your deny and ask rules and your PreToolUse hooks. The guardrails don't care whether the call came from a message or a line of code." },
            { id: 'depends-mode', label: "Depends on your permission mode — in auto it skips them", correct: false, reaction: "Not that either. The checks aren't a function of Code Mode; the script's calls are gated exactly like hand-issued ones. Code Mode changes the mechanism of calling, not what the calls are allowed to do." },
          ],
        },
        { kind: 'say', text: "So why bother? Two things. Fewer hand-offs, so the task stops spending its life waiting between calls. And composition — because the steps live in code, one step's output can flow straight into the next, get filtered, get counted, without a detour every link in the chain. The task gets to *look* like the task." },
        { kind: 'say', text: "Keep it a deliberate gear, though. It's experimental — may change, may be removed — it's off by default, and an org's admins can switch it off entirely. Turn it on for the repetitive batch grind; leave it off for the exploratory single edit you want to watch move by move." },
        { kind: 'say', text: "That's the lead. Grab the key — then meet Tallybone, the scribe at the lectern who's convinced the only honest way to do anything is one call at a time. Show him a loop isn't a cheat." },
      ],
    },
  },
  battle: {
    name: 'Tallybone, the One-at-a-Time Scribe',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a skeleton scribe looks up from a lectern stacked with single-line errands, quill trembling* …one call… then I wait… then the next… it is the ONLY honest way, I have copied it ten thousand nights… *the quill stills* …now they whisper of a 'mode' where you pen all the errands into one running script and call it the same work?… prove it to me, before I dip this quill again.",
    tauntLines: [
      "*scratches another single line, hand shaking* a script that calls the tools must be a CHEAT — it slips past the gates, doesn't it?! …no?… each line still faces the same locks I do?…",
      "*rattles the stack of errands* you'd tell me my tools are GONE, replaced by some library?! the script calls the very same tools — you only changed the hand that writes them…",
      "*bones clatter* and it's the law of the land now, every session a compiled scroll?! no — it's an opt-in, off till you reach for it, experimental, the masters can lock it away entire…",
    ],
    victoryLine: "*Tallybone sets down the quill and, for the first time, writes a loop* …one program… the same tools… the same locks on every line… and the night's work done in a single run… take the key, operator. I've a great many errands to batch.",
    questions: [
      {
        prompt:
          "You've switched on Claude Code's experimental Code Mode for a long, repetitive data-wrangling job. What does Code Mode actually change about how Claude uses its tools?",
        choices: [
          { id: 'a', label: "Instead of emitting one tool call at a time and waiting for each result, Claude writes a JavaScript program that calls its tools — so it can sequence and batch many calls in a single run", correct: true },
          { id: 'b', label: "Each tool call made from the script skips your permission rules and PreToolUse hooks, since it's now plain code rather than a tool call", correct: false },
          { id: 'c', label: "It replaces Claude's built-in tools with JavaScript libraries, so Read, Edit, and Bash are no longer available in the session", correct: false },
          { id: 'd', label: "It's the new default for every session, compiling your whole conversation into one script before anything runs", correct: false },
        ],
        passFeedback: "HIT! Code Mode lets Claude write a JavaScript program that calls its tools, so a long chain of steps runs in one program instead of a stop-and-wait round trip per call. The tools and their permission checks are unchanged — only the way the calls are issued is different.",
        failFeedback: "MISS! It doesn't bypass permissions, it doesn't remove your tools, and it isn't the default — it's an experimental opt-in where Claude writes JavaScript that calls the same tools. Re-read Book 1.",
      },
    ],
  },
};
