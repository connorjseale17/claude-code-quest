import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — /simplify: a cleanup-only review that finds reuse,
 * simplification, efficiency, and altitude improvements and applies the fixes.
 * Source: Claude Code CHANGELOG 2.1.154 ("`/simplify` now runs a cleanup-only
 * review (reuse, simplification, efficiency, altitude) and applies the fixes").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown. The Beat Reporter is leading with the unglamorous workhorse that landed in the Opus 4.8 release: the `/simplify` command. Point it at code that already works and it runs a cleanup-only pass — reuse, simplification, efficiency, altitude — and then applies the fixes itself instead of just listing them. Read the two pages on the desk for how the pass works and when a consultant reaches for it, then the door asks one question, and the thing guarding the key is built entirely out of the mess you left behind.",
  prompt:
    "A teammate runs `/simplify` on a module that's already passing its tests and asks you what it just did. What's the accurate answer?",
  choices: [
    { id: 'a', label: 'It ran a cleanup-only review — reuse, simplification, efficiency, altitude — and applied the fixes itself', correct: true },
    { id: 'b', label: 'It hunted for correctness bugs and security holes and printed a report for you to fix by hand', correct: false },
    { id: 'c', label: 'It reformatted whitespace and ran your linter without touching any logic', correct: false },
    { id: 'd', label: 'It deleted every file it judged unnecessary from the repository', correct: false },
  ],
  passFeedback: 'HIT! `/simplify` is a cleanup-only review across four lenses — reuse, simplification, efficiency, altitude — and it does not stop at a report: it applies the fixes for you.',
  failFeedback: "MISS! It's not a bug-or-security hunt, not a whitespace pass, and it doesn't delete files. It's a quality cleanup that finds and then applies the improvements — re-read the books.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**/simplify — The Cleanup Pass That Finishes the Job**

**A review with a narrow, deliberate scope**

Most reviews you ask for cast a wide net: correctness, bugs, security, the works. \`/simplify\`, which shipped in the Claude Opus 4.8 release, does the opposite on purpose. It *runs a cleanup-only review* — it isn't hunting for what's broken, it's hunting for what's messy. The code it looks at is assumed to already work; the question it asks is whether the same behavior could be expressed more cleanly. That narrow scope is the feature, not a limitation: you get a pass that won't get distracted re-litigating logic that's already correct.

**The four lenses it reviews through**

The command looks at code through four named lenses: *reuse, simplification, efficiency, altitude*. Reuse asks whether something here duplicates what already exists and could lean on it instead. Simplification asks whether the same result could be reached with less ceremony. Efficiency asks whether the code does wasteful work it doesn't need to. Altitude asks whether the code sits at the right level of abstraction for its neighbors, rather than dropping into needless detail. Together they cover the quiet ways a working codebase drifts toward clutter.

**It applies the fixes, it doesn't just file them**

The part that changes how you use it: \`/simplify\` *applies the fixes*. It doesn't hand you a list of suggestions to work through later — it makes the cleanup edits itself, so the review and the remediation are one step. That means the output is a diff to read, not a backlog to schedule, which is exactly why it's worth running while the context of the work is still fresh.

> Takeaway: \`/simplify\` is a cleanup-only review across reuse, simplification, efficiency, and altitude — and it closes the loop by applying the fixes, not just reporting them.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Leaving the Codebase Better Than You Found It — Where /simplify Earns Its Keep**

**The first draft is fast; the cleanup is the part that slips**

Working with Claude, you tend to get to "it works" quickly — and then the pressure to move on is enormous. The duplication you meant to factor out, the function that grew three responsibilities, the abstraction that's a notch too low for everything around it: that's the debt that never gets logged and never gets paid. \`/simplify\` is built for precisely that moment. The instant a feature passes its tests, before you context-switch away, you run the cleanup pass and let it tidy what the rush left behind.

**A professional standard, not a personal preference**

On client work, the state you leave a codebase in is part of the deliverable, whether or not anyone says so. Code that's clean — no obvious duplication, no needless complexity, consistent in altitude — is code the next person can extend without cursing your name. Running a dedicated cleanup pass before a handoff turns "it works on my machine" into "it works and it reads well," and that difference is what separates a contractor who shipped from a consultant who left the place better than they found it.

**Read the diff like you'd read any change**

Because the command applies its edits rather than proposing them, treat its output the way you'd treat any automated change: read the diff before you commit it. The pass is sharp, but it's making judgment calls about your code's shape, and you own the result. Run it, scan what it touched, confirm the behavior is unchanged by re-running the suite, and then commit a single clean refactor. Used this way it's a finishing tool — the pass you make routine right before you hand work over.

> Takeaway: Make \`/simplify\` the last thing you run before a handoff — tidy the rush out while the work is fresh, then read the diff and ship a codebase the next person thanks you for.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `The ____ feature passes its tests now, but I rushed the first draft and I want it clean before the handoff.
Run /simplify on ____ as a cleanup-only pass — I'm not asking you to hunt for bugs, just for mess.
Focus the cleanup on ____ in particular.
Apply the fixes, then show me one diff so I can ____ before we commit.
Re-run the suite afterward to prove the behavior didn't change.`,
    blanks: [
      { id: 'feature', suggestions: ['billing export', 'onboarding flow', 'reporting dashboard'] },
      { id: 'scope', suggestions: ['the src/billing directory', 'the file you just edited', 'the new module only'] },
      { id: 'lens', suggestions: ['duplication I can factor out', 'functions doing too much at once', 'abstractions sitting at the wrong level'] },
      { id: 'review', suggestions: ['read the refactor', 'sanity-check what changed', 'confirm nothing logic moved'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "/simplify (shipped in the Opus 4.8 release) runs a cleanup-only review across four lenses — reuse, simplification, efficiency, altitude — on code that already works, and it applies the fixes itself rather than just reporting them. It is not a bug or security hunt; it tidies shape, not correctness. The output is a diff to read, so review it and re-run the suite before committing. Reach for it right after a feature passes its tests and before a handoff, so the rush gets tidied while the context is still fresh.",
      beats: [
        { kind: 'say', text: "First story this week is the kind that saves you from yourself: the `/simplify` command, in since the Opus 4.8 release. You point it at code that already works, and it runs a *cleanup-only* review and then applies the fixes." },
        { kind: 'say', text: "Lean on those two words — *cleanup-only*. It isn't hunting for bugs or security holes; it assumes the logic is correct and asks a different question: could this same behavior be expressed more cleanly? That narrow scope is the whole point." },
        { kind: 'say', text: "It reviews through four named lenses: reuse, simplification, efficiency, and altitude. Duplication you could fold away, ceremony you could cut, wasteful work, and code sitting at the wrong level of abstraction for its neighbors. That's the quiet drift it's built to catch." },
        {
          kind: 'choice',
          prompt: "Gut-check before you go further. What separates `/simplify` from asking Claude for a normal code review?",
          options: [
            { id: 'bugs', label: 'Nothing — it\'s just a faster way to find bugs', correct: false, reaction: "Not it. A normal review chases correctness and security. `/simplify` deliberately skips all that and only looks at cleanup — shape, not bugs." },
            { id: 'cleanup-apply', label: 'It\'s cleanup-only in scope, and it applies the fixes instead of just listing them', correct: true, reaction: "Exactly. Two things at once: it narrows to reuse/simplification/efficiency/altitude, and it closes the loop by making the edits — so you get a diff, not a to-do list." },
            { id: 'lint', label: 'It just runs your formatter and linter', correct: false, reaction: "Deeper than that. Formatting is cosmetic; `/simplify` restructures for reuse, simplicity, and altitude — judgment calls a linter can't make." },
          ],
        },
        { kind: 'say', text: "Here's the part that changes how you work: it *applies* the fixes. You don't get a backlog of suggestions to schedule — you get a diff to read. So run it while the context of the work is still fresh, not three weeks later." },
        { kind: 'say', text: "Consultant's habit to build: make `/simplify` the last thing you run before a handoff. You get to 'it works' fast with Claude, but the cleanup is what slips. One pass tidies the rush out, and the state you leave the codebase in is part of the deliverable whether anyone says so or not." },
        { kind: 'say', text: "One discipline, though — because it applies edits, read the diff before you commit, and re-run the suite to prove the behavior didn't move. The books on the desk have the four lenses and the playbook. The door wants to know what `/simplify` actually does — answer that and the key's yours." },
      ],
    },
  },
  battle: {
    name: 'Cruft, the Bone-Hoarder',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*rises out of a heap of duplicated bones, dead branches, and copy-pasted ribs* …every shortcut you ever took, i kept… look how much mess you call 'done'…",
    tauntLines: [
      "*rattles a fistful of redundant bones* why factor anything out when you can paste it again, and again, and again…",
      "*stacks needless complexity into a teetering tower* it works, doesn't it? leave the clutter, walk away, that's what they all do…",
    ],
    victoryLine: "*collapses as the duplicate bones dissolve into a single clean pile* …you ran the cleanup pass… fine… take the key, tidy one…",
    questions: [
      {
        prompt:
          "A teammate runs `/simplify` on a module that's already passing its tests and asks you what it just did. What's the accurate answer?",
        choices: [
          { id: 'a', label: 'It ran a cleanup-only review — reuse, simplification, efficiency, altitude — and applied the fixes itself', correct: true },
          { id: 'b', label: 'It hunted for correctness bugs and security holes and printed a report for you to fix by hand', correct: false },
          { id: 'c', label: 'It reformatted whitespace and ran your linter without touching any logic', correct: false },
          { id: 'd', label: 'It deleted every file it judged unnecessary from the repository', correct: false },
        ],
        passFeedback: 'HIT! `/simplify` is a cleanup-only review across four lenses — reuse, simplification, efficiency, altitude — and it does not stop at a report: it applies the fixes for you.',
        failFeedback: "MISS! It's not a bug-or-security hunt, not a whitespace pass, and it doesn't delete files. It's a quality cleanup that finds and then applies the improvements — re-read the books.",
      },
    ],
  },
};
