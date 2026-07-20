import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — `/verify` and `/code-review` no longer run on their own.
 * Claude will not auto-invoke these two skills anymore; you call them explicitly
 * with `/verify` or `/code-review` when you want them.
 * Source: Claude Code CHANGELOG 2.1.215 ("Claude no longer runs the `/verify`
 * and `/code-review` skills on its own; invoke them with `/verify` or
 * `/code-review` when you want them").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2, and the Beat Reporter turns to who decides when the work gets checked. Two of Claude's quality skills — `/verify`, which exercises a change end-to-end to see if it really works, and `/code-review`, which reads the diff for bugs and cleanups — used to fire on Claude's own initiative. As of this week, they don't: Claude won't run them unless you invoke them yourself. The two pages on the desk cover what changed and why a consultant treats these gates as a deliberate move. Answer the door's one question for the key — and mind the specter beyond it, the pale thing that waves every unchecked change straight on through.",
  prompt:
    "In the latest Claude Code, when do the `/verify` and `/code-review` skills actually run?",
  choices: [
    { id: 'a', label: "Only when you invoke them yourself with `/verify` or `/code-review` — Claude no longer runs them on its own initiative", correct: true },
    { id: 'b', label: "Automatically after every edit Claude makes, whether or not you asked for a check", correct: false },
    { id: 'c', label: "Automatically the moment Claude finishes any task, unless you go into settings and switch them off", correct: false },
    { id: 'd', label: "Never — both skills were removed from Claude Code and no longer exist", correct: false },
  ],
  passFeedback: "HIT! The two skills are now yours to call. Claude won't spin up `/verify` or `/code-review` on its own anymore — you invoke them, on your timing, when the change is worth checking.",
  failFeedback: "MISS! They weren't removed and they don't fire automatically. The change is that Claude *stopped* running them by itself — you invoke them explicitly now. Re-read the books.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**\`/verify\` and \`/code-review\` Are Now Yours to Call**

**Two skills, one behavior change**

Claude Code ships two quality skills worth knowing. \`/verify\` doesn't just run the tests — it *exercises* a change end-to-end, driving the actual flow the change touches to confirm the thing really does what it's supposed to. \`/code-review\` reads the current diff and flags correctness bugs alongside reuse, simplification, and efficiency cleanups. Both are genuinely useful. What changed this week is *who pulls the trigger*.

**What actually changed in 2.1.215**

Previously, Claude might decide on its own that a change warranted verification or a review and spin these skills up unprompted. As of the 2.1.215 release, it doesn't. The changelog is plain: *Claude no longer runs the \`/verify\` and \`/code-review\` skills on its own.* They haven't been removed and they haven't been weakened — they've been handed to you. You invoke them, by name, with \`/verify\` or \`/code-review\`, exactly when you want them and not a moment before.

**A default of quiet, not of skipping**

The important nuance: this isn't "checks are off now." It's that the *decision* to check moved from Claude to you. The skills are as capable as they ever were; the difference is they wait for your word. A background run that used to surprise you mid-flow — spending time and tokens on a review you hadn't asked for — now only happens on your say-so.

> Takeaway: \`/verify\` and \`/code-review\` still do everything they did; the change in 2.1.215 is that Claude stopped launching them itself, so the checks now run when *you* invoke them and only then.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Owning the Gate — Why a Consultant Wants the Check on Their Own Timing**

**Verification is a decision, and now it's yours to make**

On a client engagement the question is never "should quality checks exist" — it's *when* they fire and *who* chose. Handing that choice to you is the whole point. You know which change is a throwaway spike that doesn't warrant a full end-to-end verify, and which one touches the billing path and absolutely does. Now the tool waits for that judgment instead of guessing at it. You spend the time and tokens on the checks that earn them.

**Sequence the gates to the workflow**

Deliberate invocation lets you build a rhythm the client would recognize as discipline. Run \`/verify\` before you commit anything non-trivial — prove the change behaves in the real flow, not just that it type-checks. Run \`/code-review\` before you open the pull request — catch the correctness bug and the sloppy duplication while they're still cheap to fix. Each gate lands at the point in the process where its findings are most actionable, because *you* placed it there.

**No surprise spend, no surprise noise**

There's a quieter benefit too. An unprompted review that kicks off mid-task costs tokens you didn't budget and drops findings you weren't ready to act on. Making the skills explicit means your session does what you asked and nothing else — the check arrives when you're actually at a checkpoint, ready to read it and act. Predictability is its own professional courtesy on a metered clock.

> Takeaway: Explicit \`/verify\` and \`/code-review\` put the quality gate on your timeline — verify before you commit, review before you PR — so the checks land where their findings matter and never as an unbudgeted surprise.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `Claude just finished ____ on the client's repo, and I'm the one who decides when it gets checked.
Before I commit anything non-trivial, I'll run ____ so it drives the real flow
and proves the change actually behaves — not just that it type-checks.
Then, right before I open the pull request, I'll run ____ to catch
any correctness bug or sloppy duplication while it's still cheap to fix.
I'm invoking these deliberately because this change touches ____, so it earns the full gate.`,
    blanks: [
      { id: 'work', suggestions: ['a refactor of the checkout flow', 'a fix to the auth middleware', 'a new export-to-PDF feature'] },
      { id: 'verify-cmd', suggestions: ['/verify', '/verify end-to-end', 'the /verify skill'] },
      { id: 'review-cmd', suggestions: ['/code-review', '/code-review at high effort', 'the /code-review skill'] },
      { id: 'risk-area', suggestions: ['the billing path', 'the payments integration', "the client's core data model"] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "As of the 2.1.215 release, Claude no longer runs the `/verify` and `/code-review` skills on its own — you invoke them explicitly. `/verify` exercises a change end-to-end (drives the real flow, not just the tests) to prove it behaves; `/code-review` reads the diff for correctness bugs and reuse/simplification cleanups. Nothing was removed or weakened; the *decision* to check moved from Claude to you. For a consultant that means owning the gate: run `/verify` before committing anything non-trivial and `/code-review` before opening a PR, so each check lands where its findings are actionable, on your timing, with no surprise token spend or mid-task noise.",
      beats: [
        { kind: 'say', text: "Second story's about who decides when your work gets checked. I ship two quality skills. `/verify` doesn't just run the tests — it *exercises* the change, drives the actual flow it touches, and watches whether the thing really does what you meant. `/code-review` reads the diff and flags correctness bugs plus reuse and cleanup misses." },
        { kind: 'say', text: "Both are useful. What changed in the 2.1.215 release is who pulls the trigger. I used to sometimes decide on my own that a change deserved a verify or a review and just... run one. As of this week, I don't. The changelog says it flat out: I no longer run those two skills on my own." },
        { kind: 'say', text: "Read that carefully, because it's easy to get backwards. The skills aren't gone and they aren't weaker. They're *handed to you*. You call them by name — `/verify`, `/code-review` — exactly when you want them. The capability didn't shrink; the *decision* to fire it moved from me to you." },
        {
          kind: 'choice',
          prompt: "Gut-check before the door. Under 2.1.215, what makes `/code-review` run now?",
          options: [
            { id: 'you-invoke', label: "You invoke it yourself — Claude won't start it on its own anymore", correct: true, reaction: "Right. The check is as strong as ever; it just waits for your word now. You decide the moment it earns its keep." },
            { id: 'every-edit', label: "It fires automatically after every edit, so you don't have to think about it", correct: false, reaction: "No — that's the old surprise behavior, and it's exactly what changed. It no longer runs unprompted; you invoke it." },
            { id: 'removed', label: "Nothing — it was removed from Claude Code entirely", correct: false, reaction: "Not removed, just handed over. `/code-review` still does everything it did — it only runs when you call it now." },
          ],
        },
        { kind: 'say', text: "Why a consultant likes this: verification is a *judgment*, and now it's yours. You know a throwaway spike doesn't need a full end-to-end verify and a change to the billing path absolutely does. The tool stopped guessing and waits for that call — so you spend the time and tokens on the checks that earn them." },
        { kind: 'say', text: "Build a rhythm out of it. `/verify` before you commit anything non-trivial — prove it behaves in the real flow, not just that it compiles. `/code-review` before you open the PR — catch the bug and the duplication while they're cheap. Each gate lands where its findings are actually actionable, because you put it there. Bonus: no surprise review eating tokens you didn't budget, mid-task, with findings you weren't ready to read." },
        { kind: 'say', text: "The books lay out the change and the playbook. The door only wants to know what makes these skills run now — get that and the key's yours. And the specter past it? It's the habit of waving every change through unchecked. Name the new rule and it can't touch you." },
      ],
    },
  },
  battle: {
    name: 'Passby, Specter of the Unchecked Diff',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a pale shape drifts up from a pile of un-reviewed diffs, waving each one onward with a translucent hand* …oh, don't stop to check it… it compiles, doesn't it?… ship it, ship it, they're all fine… nobody ever reads these anyway…",
    tauntLines: [
      "*flips through a diff without reading a line* type-checks green, so it must WORK — verifying is for the anxious, hmm? let the client find the bug for you…",
      "*wafts a review aside* a code-review? on YOUR timing? how quaint — I preferred when the checks just… didn't happen, and everyone pretended that was the same as passing…",
    ],
    victoryLine: "*the specter thins as a verify actually runs and a review actually lands* …you… you invoked them on purpose… you looked before you shipped… fine, gatekeeper, the key is yours…",
    questions: [
      {
        prompt:
          "In the latest Claude Code, when do the `/verify` and `/code-review` skills actually run?",
        choices: [
          { id: 'a', label: "Only when you invoke them yourself with `/verify` or `/code-review` — Claude no longer runs them on its own initiative", correct: true },
          { id: 'b', label: "Automatically after every edit Claude makes, whether or not you asked for a check", correct: false },
          { id: 'c', label: "Automatically the moment Claude finishes any task, unless you go into settings and switch them off", correct: false },
          { id: 'd', label: "Never — both skills were removed from Claude Code and no longer exist", correct: false },
        ],
        passFeedback: "HIT! The two skills are now yours to call. Claude won't spin up `/verify` or `/code-review` on its own anymore — you invoke them, on your timing, when the change is worth checking.",
        failFeedback: "MISS! They weren't removed and they don't fire automatically. The change is that Claude *stopped* running them by itself — you invoke them explicitly now. Re-read the books.",
      },
    ],
  },
};
