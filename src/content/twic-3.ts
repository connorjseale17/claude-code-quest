import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — the spend-limit surfacing. Claude Code adds a spend-limit
 * bar to `/usage` and a `rate_limits.spend_limit` field to the status line, so
 * the dollar burn of a session is visible both on demand and always-on. This is
 * visibility, not an enforced brake.
 * Source (Claude Code CHANGELOG 2.1.251):
 *   - "Added Spend limit bar to `/usage` and `rate_limits.spend_limit` status
 *      line field."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Final room of the week, and the Beat Reporter is watching a slow bar fill along one wall — the money burning down against a line drawn across it. The 2.1.251 release adds a *spend-limit bar* to `/usage` and a matching `rate_limits.spend_limit` field you can put in your status line, so how much you've spent against your limit is readable both on demand and always, right in the footer. The two books cover exactly what got surfaced and why a consultant watching an engagement's burn wants it in plain sight rather than buried in a dashboard. Answer the door's question for the key — then face what hoards it, a dragon coiled on a ledger it will not let you read.",
  prompt:
    "What did the new spend-limit additions bring to Claude Code?",
  choices: [
    { id: 'a', label: "A spend-limit bar in `/usage` and a `rate_limits.spend_limit` field you can surface in your status line", correct: true },
    { id: 'b', label: "A hard per-session dollar cap that halts the session the instant your spend is exceeded", correct: false },
    { id: 'c', label: "An automatic downgrade to a cheaper model once you cross a spend threshold", correct: false },
    { id: 'd', label: "A weekly spend report emailed to your organization's billing owner", correct: false },
  ],
  passFeedback: "HIT! It's visibility, not a brake: a spend-limit bar in `/usage`, plus a `rate_limits.spend_limit` field you can drop into your status line for an always-on read of the burn.",
  failFeedback: "MISS! It doesn't hard-halt the session, downgrade your model, or email a report — it *surfaces* spend, as a `/usage` bar and a status-line field. Re-read Book 1.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**The Spend-Limit Bar — Putting the Burn Where You Can See It**

**Two surfaces, one number**

The 2.1.251 release takes a figure that used to live out of sight — how much you've spent against your spend limit — and puts it in two places you actually look. First, \`/usage\` gains a *spend-limit bar*: run the command and you get a visual read of spend against the ceiling, the same way a fuel gauge shows a tank. Second, a new \`rate_limits.spend_limit\` field becomes available to the status line, the strip of information Claude Code keeps at the bottom of the session. One surface is on demand; the other is always on.

**On-demand versus always-on**

The split matters more than it looks. \`/usage\` is the deliberate check — you type it when you want the full picture, and the bar gives you spend at a glance inside it. The status-line field is the ambient check: because the status line is on screen the whole session, dropping \`rate_limits.spend_limit\` into it means the number is simply *there*, updating as you work, with nothing to type. You get to choose how present the figure is — pull it up when you want it, or pin it so you never have to ask.

**What it is, and what it isn't**

Read the change precisely, because it's easy to inflate. What shipped is *surfacing* — a bar and a field that show you the spend. It is not a gate that stops the session when the bar fills, not a switch that swaps you to a cheaper model at a threshold, and not a report mailed off somewhere. The feature makes the number visible; what you *do* when the bar runs high is still your call, made with better information than you had before.

> Takeaway: The spend-limit additions surface your spend two ways — a bar inside \`/usage\` for the on-demand check and a \`rate_limits.spend_limit\` status-line field for an always-on read — turning an invisible figure into one you can watch.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Watching the Burn on an Engagement — Spend You Can See Is Spend You Can Manage**

**The problem of the invisible meter**

Book 1 was the mechanism; here's the engagement it serves. Cost on an AI-heavy engagement has a nasty quality: it accrues silently. A long autonomous run, a fleet of sessions, a night of unattended work — none of it announces its spend as it goes, and the first time many people see the total is when it's already the total. Putting the spend-limit bar in \`/usage\` and the figure in the status line closes that gap. The meter is no longer invisible; it's a glance away, or already on screen, while there's still room to react.

**Pin it to the status line for the long, quiet runs**

The status-line field is the move for exactly the situations where cost usually hides. When you've got a session grinding through a big refactor, or you're stepping away from an unattended run, \`rate_limits.spend_limit\` in the footer means the burn is in your peripheral vision the whole time. You don't have to remember to check; the number is watching itself. For a consultant managing a fixed-budget engagement, that ambient read is the difference between noticing at sixty percent and finding out at a hundred and ten.

**Visibility is the input to the decision, not the decision**

Worth being honest with a client and yourself: the bar doesn't manage the budget for you. It tells you where you stand; the choice to narrow scope, pause a run, or push on is still yours. But that's precisely why it's useful — good cost calls need current numbers, and this hands you current numbers at the moment you'd be making the call. Pair it with the harder ceilings and policies you already run, and the bar becomes the dashboard you glance at before you decide which lever to pull.

> Takeaway: Surface spend where you're already looking — the \`/usage\` bar for the deliberate check, the status-line field for the long unattended runs — so an engagement's burn is something you catch at sixty percent instead of discovering at the invoice.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `This engagement is on a fixed budget and I've got a long unattended run going overnight, so I need the cost in plain sight.
For a deliberate check I'll run ____ and read the new ____ bar.
For an always-on read while I'm away, I'll pin the ____ field into my ____.
And I'll stay clear-eyed that this feature ____ — it shows the burn; the call to pause or narrow scope is still mine.`,
    blanks: [
      { id: 'usage-cmd', suggestions: ['`/usage`', 'the `/usage` command', 'usage'] },
      { id: 'bar-name', suggestions: ['spend-limit', 'spend', 'spend-against-limit'] },
      { id: 'field', suggestions: ['`rate_limits.spend_limit`', 'the `rate_limits.spend_limit`', 'spend-limit'] },
      { id: 'surface', suggestions: ['status line', 'session footer', 'status-line strip'] },
      { id: 'not-a-brake', suggestions: ['only surfaces the spend', "doesn't halt the session on its own", 'shows the number but enforces nothing'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "The spend-limit surfacing (2.1.251): two additions that make your spend against your limit visible. `/usage` gains a spend-limit bar for a deliberate, on-demand read; a new `rate_limits.spend_limit` field can go in the status line for an always-on read that updates as you work. The key framing: this is *visibility*, not enforcement — it doesn't hard-halt the session, downgrade your model, or email a report; it shows the number and leaves the decision to you. For a consultant, cost on an AI-heavy engagement accrues silently, and the status-line field is the move for long or unattended runs where the burn usually hides — the difference between noticing at sixty percent and finding out at the invoice. Pair it with the harder ceilings you already run; the bar is the dashboard you glance at before deciding which lever to pull.",
      beats: [
        { kind: 'say', text: "Closing story of the week is small and practical: your spend against your spend limit is now something you can actually see. Two places. First, `/usage` gets a spend-limit *bar* — run it and you get a gauge of spend against the ceiling." },
        { kind: 'say', text: "Second, there's a new field, `rate_limits.spend_limit`, that you can put in your status line — the strip along the bottom of the session. So the same number can live in the footer, on screen the whole time, updating as you go. One's on demand, the other's always on." },
        { kind: 'say', text: "That split is the useful part. `/usage` is the deliberate check — you type it when you want the full picture. The status-line field is ambient — it's just *there*, no typing, because the status line is always showing. You pick how present you want the number to be." },
        {
          kind: 'choice',
          prompt: "A client asks: 'So once that bar fills up, the session stops on its own, right?' What's the honest answer?",
          options: [
            { id: 'visibility', label: "No — this surfaces the spend as a bar and a status-line field; it shows you where you stand, but pausing or narrowing scope is still your call", correct: true, reaction: "Exactly. What shipped is *visibility*, not a brake. The bar tells you the number; it doesn't hard-stop the run, swap your model, or mail a report. Better information, same hand on the wheel." },
            { id: 'hard-stop', label: "Yes — it's a hard cap that halts the session the moment spend crosses the limit", correct: false, reaction: "That's the overread. The feature makes spend *visible*; it doesn't enforce a stop. What you do when the bar runs high is still your decision — don't promise a client an automatic brake that isn't there." },
            { id: 'downgrade', label: "Sort of — it quietly downgrades you to a cheaper model once you cross the threshold", correct: false, reaction: "No — there's no automatic downgrade in this. It's a bar in `/usage` and a status-line field, both purely for seeing the spend. The model you're on doesn't change on its own." },
          ],
        },
        { kind: 'say', text: "Here's why a consultant should care. Cost on an AI-heavy engagement accrues *silently* — a long autonomous run, a fleet of sessions, a night of unattended work, none of it announces its spend. Usually the first time you see the total is when it already *is* the total." },
        { kind: 'say', text: "The status-line field is the fix for exactly those runs. Grinding through a big refactor, or stepping away from an unattended session — pin `rate_limits.spend_limit` in the footer and the burn is in your peripheral vision the whole time. You don't have to remember to check; the number watches itself." },
        { kind: 'say', text: "Just stay clear-eyed: the bar doesn't manage the budget for you. It hands you current numbers at the moment you'd be making the call — narrow scope, pause the run, or push on. Pair it with the harder ceilings you already set, and it's the dashboard you glance at before you pull a lever." },
        { kind: 'say', text: "The books have the full read. The door asks one thing: what did the spend-limit additions actually bring? Answer for the key. Then face Ledgerwyrm past it — a dragon coiled on the burn-bar it guards, snarling that once the bar fills, your session is *done*." },
      ],
    },
  },
  battle: {
    name: 'Ledgerwyrm, Keeper of the Burn Bar',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a long dragon uncoils across a glowing bar of spent gold, one claw pinning the ledger shut* …you want to read the burn, little operator? then prove you know what they *gave* you this week — what, exactly, was surfaced… name it true or feed my hoard…",
    tauntLines: [
      "*bares molten teeth* a hard *cap*, you cried — the session dies when my bar fills? no! I only let you SEE the gold burn… the stopping is your hand, never mine…",
      "*coils tighter on the ledger* a quiet *downgrade* to a lesser engine, you guessed? a mailed report? no and no — a bar in `/usage`, a field in your footer, and nothing more… it shows, it does not act…",
    ],
    victoryLine: "*Ledgerwyrm lifts its claw from the ledger and lets you read it at last* …you knew it for what it is — a light on the hoard, not a lock… `/usage` bar, status-line field, the decision still yours… take the key, and watch your burn…",
    questions: [
      {
        prompt:
          "What did the new spend-limit additions bring to Claude Code?",
        choices: [
          { id: 'a', label: "A spend-limit bar in `/usage` and a `rate_limits.spend_limit` field you can surface in your status line", correct: true },
          { id: 'b', label: "A hard per-session dollar cap that halts the session the instant your spend is exceeded", correct: false },
          { id: 'c', label: "An automatic downgrade to a cheaper model once you cross a spend threshold", correct: false },
          { id: 'd', label: "A weekly spend report emailed to your organization's billing owner", correct: false },
        ],
        passFeedback: "HIT! It's visibility, not a brake: a spend-limit bar in `/usage`, plus a `rate_limits.spend_limit` field you can drop into your status line for an always-on read of the burn.",
        failFeedback: "MISS! It doesn't hard-halt the session, downgrade your model, or email a report — it *surfaces* spend, as a `/usage` bar and a status-line field. Re-read Book 1.",
      },
    ],
  },
};
