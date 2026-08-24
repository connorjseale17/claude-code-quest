import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — the `/claude-api upgrade` command. It migrates Python
 * projects from the `anthropic` SDK 0.x line to 1.x, handling the mechanical
 * breaking changes of that upgrade. It ships alongside a refreshed `claude-api`
 * skill whose Python reference was updated for 1.x — including that timeouts now
 * use `anthropic.Timeout` rather than `httpx.Timeout`. It's a targeted SDK
 * migration, not a CLI updater and not a general dependency bumper.
 * Source (Claude Code CHANGELOG 2.1.239):
 *   - "Added `/claude-api upgrade` to migrate Python projects from `anthropic`
 *      0.x to 1.x, and updated the skill's Python reference for 1.x (timeouts
 *      use `anthropic.Timeout`, not `httpx.Timeout`)"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Final room of the issue, and the Beat Reporter is holding a client's dusty Python integration still pinned to the `anthropic` SDK's 0.x line. The 2.1.239 release adds a command, `/claude-api upgrade`, that migrates a Python project from `anthropic` 0.x to 1.x — and it lands with the bundled `claude-api` skill's Python reference refreshed for 1.x, right down to the detail that timeouts now use `anthropic.Timeout` instead of `httpx.Timeout`. The two books cover what the command actually migrates and why a consultant inheriting an aging API integration reaches for it first. Answer the door's one question for the last key — then face the wyrm past it, a dragon coiled on a hoard of code that time forgot.",
  prompt:
    "What does the new `/claude-api upgrade` command do?",
  choices: [
    { id: 'a', label: "It migrates a Python project from the `anthropic` SDK's 0.x line to 1.x, handling that upgrade's breaking changes — and ships with the `claude-api` skill's Python reference refreshed for 1.x (e.g. timeouts now use `anthropic.Timeout`, not `httpx.Timeout`)", correct: true },
    { id: 'b', label: "It upgrades the Claude Code CLI itself to the newest released version", correct: false },
    { id: 'c', label: "It upgrades your Anthropic API plan or billing tier to unlock higher rate limits", correct: false },
    { id: 'd', label: "It's a general command that bumps every outdated dependency in any Python project to its latest version", correct: false },
  ],
  passFeedback: "HIT! `/claude-api upgrade` is a targeted migration: it moves a Python project off the `anthropic` SDK 0.x line onto 1.x and handles the breaking changes — like timeouts shifting from `httpx.Timeout` to `anthropic.Timeout`, now documented in the refreshed `claude-api` skill reference.",
  failFeedback: "MISS! It's not a CLI updater, not a billing/plan change, and not a bump-everything dependency tool. It specifically migrates a Python project from the `anthropic` SDK 0.x to 1.x. Re-read Book 1.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**\`/claude-api upgrade\` — A Guided Path from \`anthropic\` 0.x to 1.x**

**What it migrates, exactly**

The 2.1.239 release adds a command, \`/claude-api upgrade\`, and its job is narrow and concrete: it migrates a **Python** project from the \`anthropic\` SDK's **0.x** line to **1.x**. Major-version SDK jumps like this one carry breaking changes — the shapes of calls, the names of helpers, the way configuration is passed all shift between 0.x and 1.x. The command exists to walk a project across that gap mechanically, instead of leaving you to find every changed call by hand and hope you caught them all.

**The refreshed reference that ships with it**

The command didn't arrive alone. The same release *"updated the skill's Python reference for 1.x"* — the bundled \`claude-api\` skill that Claude leans on when it writes or fixes Anthropic API code. That matters because a migration is only as good as the knowledge behind it: if the reference still described 0.x, an "upgrade" could quietly reintroduce old patterns. Refreshing it means the guidance Claude applies while upgrading is itself current to 1.x.

**A concrete breaking change, named**

The changelog even names one of the traps, and it's a telling one: in 1.x, *timeouts use \`anthropic.Timeout\`, not \`httpx.Timeout\`.* On the surface that's a one-line swap, but it's exactly the kind of change a hand migration misses — the code still imports \`httpx\`, still constructs a \`Timeout\`, still *looks* right, and only fails at the edge. That the command and its reference know this specific shift is a sign of what \`/claude-api upgrade\` is really doing: catching the small, easy-to-miss breakages, not just the obvious ones.

> Takeaway: \`/claude-api upgrade\` migrates a Python project from the \`anthropic\` SDK 0.x to 1.x — handling breaking changes like \`httpx.Timeout\` → \`anthropic.Timeout\` — backed by a \`claude-api\` skill reference refreshed for 1.x.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Inheriting Someone Else's API Code — Making the Migration Somebody's Job Instead of Nobody's**

**The engagement this is built for**

Book 1 was the mechanism; here's the room you'll use it in. A consultant is forever inheriting integrations they didn't write: a client's internal tool, a script from a contractor who's long gone, a service pinned to \`anthropic\` 0.x because upgrading it never made it to the top of anyone's list. The upgrade keeps getting deferred precisely because it's tedious and risky — a manual hunt through every API call for what changed, with production behavior on the line. \`/claude-api upgrade\` turns that dreaded afternoon into a command, which is often the difference between the migration happening and staying on the someday pile.

**Why the "just as good on the boring parts" matters**

The value here isn't cleverness; it's coverage. The reason a 0.x→1.x jump gets put off is the fear of the *missed* change — the one call in an obscure module that nobody remembers, the \`httpx.Timeout\` that still parses fine and breaks only under load. A tool that systematically applies the known breaking changes across the project addresses exactly that fear: it doesn't get bored on file forty, and it's working from a reference that was just refreshed for 1.x. You still review the diff — that's non-negotiable — but you're reviewing a complete first pass, not authoring one from a blank page.

**Where your judgment still has to live**

Name the boundary, because owning a client's code means owning the review. A migration command produces a diff; it does not absolve you of reading it, running the project's tests against 1.x, and confirming behavior didn't drift on the paths that matter. Treat \`/claude-api upgrade\` as a fast, thorough first draft of the migration — one that frees your attention for the genuinely judgment-heavy parts (does the new timeout policy suit this workload? did any 0.x behavior we relied on change?) instead of spending it hunting mechanical swaps.

> Takeaway: Reach for \`/claude-api upgrade\` when you inherit a client's \`anthropic\` 0.x Python integration — it turns a deferred, error-prone hand-migration into a reviewable first-pass diff, so your judgment goes to behavior and tests, not to hunting changed calls.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `I've inherited this client's Python service, and it's still pinned to the old
\`anthropic\` ____ line — the upgrade everyone kept deferring.
Instead of hunting every changed call by hand, I'll run ____.
It migrates the project up to ____, handling the breaking changes —
like timeouts moving to ____ instead of \`httpx.Timeout\`.
Then I'll still ____ before I call it done.`,
    blanks: [
      { id: 'old-line', suggestions: ['0.x', '0.x SDK', 'legacy 0.x'] },
      { id: 'command', suggestions: ['`/claude-api upgrade`', 'the `/claude-api upgrade` command', '/claude-api upgrade'] },
      { id: 'new-line', suggestions: ['1.x', 'the 1.x SDK', 'anthropic 1.x'] },
      { id: 'new-timeout', suggestions: ['`anthropic.Timeout`', 'anthropic.Timeout', "the SDK's own Timeout"] },
      { id: 'review-step', suggestions: ['review the diff and run the tests against 1.x', 'read the diff and run the test suite', 'confirm behavior on the paths that matter'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "`/claude-api upgrade` (2.1.239): a command that migrates a *Python* project from the `anthropic` SDK's 0.x line to 1.x, handling the major-version breaking changes mechanically. It ships with the bundled `claude-api` skill's Python reference refreshed for 1.x — including that timeouts now use `anthropic.Timeout`, not `httpx.Timeout`. It is specifically that SDK migration: not a Claude Code CLI updater, not a billing/plan change, and not a general bump-every-dependency tool. For a consultant, it's the tool for an inherited integration still pinned to 0.x — it turns a deferred, error-prone hand-migration into a reviewable first-pass diff. You still review that diff and run the project's tests against 1.x; the command frees your judgment for behavior and workload questions instead of hunting mechanical swaps.",
      beats: [
        { kind: 'say', text: "Closing story of the issue, and it's one you'll actually reach for: a new command, `/claude-api upgrade`, added in 2.1.239. Its job is narrow and concrete — it migrates a *Python* project from the `anthropic` SDK's 0.x line up to 1.x." },
        { kind: 'say', text: "Why a command for this at all? Because a major-version SDK jump is a minefield of breaking changes. Between 0.x and 1.x, call shapes shift, helpers get renamed, config moves around. Doing it by hand means hunting every changed call across the project and praying you caught them all. This walks the project across that gap instead." },
        { kind: 'say', text: "And it didn't ship alone — the same release refreshed the bundled `claude-api` skill's Python reference for 1.x. That's the knowledge Claude uses when it writes or fixes Anthropic API code. A migration is only as good as the reference behind it; if that reference still described 0.x, an 'upgrade' could quietly drag old patterns back in. Now it's current." },
        {
          kind: 'choice',
          prompt: "A colleague sees `/claude-api upgrade` and asks: 'Oh, is that how I update Claude Code to the latest version?' Set them straight — what does it actually upgrade?",
          options: [
            { id: 'sdk-migration', label: "Neither the CLI nor your plan — it migrates a Python project from the `anthropic` SDK 0.x to 1.x, handling that upgrade's breaking changes", correct: true, reaction: "Exactly. It's an SDK *migration* command for your project's code, not a CLI self-update and not a billing change. Think 'move my Python integration onto anthropic 1.x,' not 'update the tool.'" },
            { id: 'cli-update', label: "Yes — it updates the Claude Code CLI itself to the newest release", correct: false, reaction: "No — it doesn't touch the CLI. It migrates a *Python project's* use of the `anthropic` SDK from 0.x to 1.x. Different target entirely: your code, not the tool." },
            { id: 'plan-upgrade', label: "It upgrades your Anthropic API plan to get higher rate limits", correct: false, reaction: "Not billing at all. It's a code migration — it moves a Python project off `anthropic` 0.x onto 1.x. Nothing to do with your plan or limits." },
          ],
        },
        { kind: 'say', text: "The changelog even names one of the traps, and it's the perfect example of why you want a tool for this: in 1.x, timeouts use `anthropic.Timeout`, not `httpx.Timeout`. That's a one-line swap that a hand migration sails right past — the code still imports `httpx`, still builds a `Timeout`, still *looks* correct, and only bites at the edge, under load. Knowing that specific shift is the whole value." },
        { kind: 'say', text: "Here's the engagement it's built for. You inherit a client's service — a contractor's old script, an internal tool — still pinned to `anthropic` 0.x because upgrading it never reached the top of anyone's list. It's deferred precisely because it's tedious and risky. This command turns that dreaded afternoon into one invocation, and it doesn't get bored on file forty the way a human does." },
        { kind: 'say', text: "But own the boundary: a migration command gives you a diff, not a discharge. You still read it, run the project's tests against 1.x, and confirm behavior didn't drift where it matters. Treat it as a fast, thorough first pass so your judgment goes to the real questions — does the new timeout policy fit this workload? — not to hunting swaps. The books have the rest. The last door asks: what does `/claude-api upgrade` actually do? Answer for the final key. Then face Deprecatrix past it — a wyrm curled on a hoard of 0.x code, hissing that the old versions were always better." },
      ],
    },
  },
  battle: {
    name: 'Deprecatrix, the Hoard of Zero-Point-X',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a vast dragon uncoils atop a glittering mound of outdated code, every scale stamped with a version long past end-of-life* …you'd take my hoard from me, operator? this beautiful 0.x, hand-tuned, load-bearing, NEVER to be touched… *smoke curls from its nostrils* …name the command that dares migrate my treasure to 1.x, if you truly mean to climb.",
    tauntLines: [
      "*a gout of flame* the CLI? you think that spell updates the *tool*? no — it comes for my code, my precious Python, and drags it up a major version…",
      "*claws rake the hoard* a billing rite? a plan upgrade? fool — it buys no limits… it MIGRATES, it rewrites my calls, it moves my very `httpx.Timeout` to `anthropic.Timeout` where I cannot follow…",
    ],
    victoryLine: "*Deprecatrix sinks against the emptied mound as the last key rolls free* …migrated… 0.x to 1.x, every changed call caught, even the timeout I hid best… the hoard is current now, and the issue is yours to close… go, operator…",
    questions: [
      {
        prompt:
          "What does the new `/claude-api upgrade` command do?",
        choices: [
          { id: 'a', label: "It migrates a Python project from the `anthropic` SDK's 0.x line to 1.x, handling that upgrade's breaking changes — and ships with the `claude-api` skill's Python reference refreshed for 1.x (e.g. timeouts now use `anthropic.Timeout`, not `httpx.Timeout`)", correct: true },
          { id: 'b', label: "It upgrades the Claude Code CLI itself to the newest released version", correct: false },
          { id: 'c', label: "It upgrades your Anthropic API plan or billing tier to unlock higher rate limits", correct: false },
          { id: 'd', label: "It's a general command that bumps every outdated dependency in any Python project to its latest version", correct: false },
        ],
        passFeedback: "HIT! `/claude-api upgrade` is a targeted migration: it moves a Python project off the `anthropic` SDK 0.x line onto 1.x and handles the breaking changes — like timeouts shifting from `httpx.Timeout` to `anthropic.Timeout`, now documented in the refreshed `claude-api` skill reference.",
        failFeedback: "MISS! It's not a CLI updater, not a billing/plan change, and not a bump-everything dependency tool. It specifically migrates a Python project from the `anthropic` SDK 0.x to 1.x. Re-read Book 1.",
      },
    ],
  },
};
