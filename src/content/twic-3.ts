import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — the findings-by-severity card on the Code Review
 * analytics page.
 * Code Review is the automated reviewer that comments on GitHub pull requests.
 * As of 2.1.316 its analytics page gained a findings-by-severity card that shows
 * three things for the selected period: the total number of findings, a daily
 * chart of findings stacked by severity, and each severity's own count. It is
 * reporting/observability — it aggregates what the reviewer has been finding; it
 * does not change how Code Review reviews or raise its strictness.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.316: "[Code Review] Added a findings-by-severity
 *     card to the Code Review analytics page, showing the period's total
 *     findings, a daily chart stacked by severity, and each severity's count."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Room three closes the issue, and the Beat Reporter points at a dragon slumped over a hoard that isn't treasure — it's every finding Code Review has ever raised, thousands of them, swept into one undifferentiated heap where a typo and a security hole sit side by side and no one can tell the shape of the pile or whether it's growing. This week's final item sorts that hoard into the light: as of 2.1.316, the Code Review analytics page has a *findings-by-severity* card showing the period's total findings, a daily chart stacked by severity, and each severity's own count. One book covers the mechanic — exactly what the card shows and that it only reports, never re-reviews; the other, why a consultant reads it as the trend line of a codebase's health. Claim the key, then face Heapwyrm, the dragon who's kept every finding in one unsorted pile until now.",
  prompt:
    "Your client asks whether code quality across the team's pull requests is getting better or worse. You open the new findings-by-severity card on the Code Review analytics page. What does it give you?",
  choices: [
    { id: 'a', label: "The period's total findings, a daily chart of findings stacked by severity, and each severity's own count — so you can read the trend and the mix of serious-versus-minor issues at a glance", correct: true },
    { id: 'b', label: "A raw, per-pull-request list of every comment Code Review has ever left, with no aggregation and no trend over time", correct: false },
    { id: 'c', label: "A control that raises Code Review's strictness automatically whenever the finding count climbs", correct: false },
    { id: 'd', label: "A single combined finding count for the period, with no breakdown by severity", correct: false },
  ],
  passFeedback: "HIT! The card aggregates the period's findings three ways — a total, a daily chart stacked by severity, and a per-severity count — so you can see both the trend and the serious-versus-minor mix. It reports; it doesn't change how reviews run.",
  failFeedback: "MISS! It isn't a raw per-PR list, it isn't a strictness control, and it isn't a single number without the severity split — it's an aggregated, severity-broken, day-by-day view of findings. Re-read Book 1.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**From a Heap of Comments to a Picture of the Week — The Findings-by-Severity Card**

**What Code Review already did, and what was missing**

Code Review is the automated reviewer that reads your pull requests on GitHub and leaves comments before anything merges — a second set of eyes on every change. It's been doing that one PR at a time, which is exactly right in the moment but tells you nothing about the whole. A single review answers "is *this* change sound?" It can't answer "are we finding more problems this week than last, and are they the serious kind?"

**The three things the card shows**

As of 2.1.316 the Code Review *analytics page* has a new *findings-by-severity* card that answers precisely that, three ways for the period you've selected. First, the *total findings* — one number for how much the reviewer flagged over the window. Second, a *daily chart stacked by severity* — each day a bar, each bar split into its severity bands, so the trend over the period and its makeup are visible at once. Third, *each severity's count* — the totals broken out, so you can see how many were the serious ones and how many the minor.

**It reports — it doesn't re-review**

The important boundary: this card is *observability*. It summarizes findings the reviewer already produced; it does not change how Code Review reviews, and it doesn't raise strictness because a number went up. Turning the dial on review depth is a different control entirely. This one is the instrument panel, not the engine — it shows you what's been happening without touching what happens next.

> Takeaway: The findings-by-severity card turns Code Review's stream of per-PR comments into a period view — a total, a daily severity-stacked trend, and a per-severity count — and it only reports, it never re-reviews.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Read the Trend, Not Just the Ticket — What the Card Tells a Consultant**

**A number a client actually asks for**

"Is our code getting better or worse?" is a question every engagement eventually faces, and until now the honest answer was a shrug and a pile of individual review comments. The findings-by-severity card gives you something you can put in front of a client: a line you can point to. A total that's trending down over successive periods, with the serious-severity band shrinking fastest, is a story about a team tightening up — and it's drawn from the reviewer's own record, not your impression of it.

**Severity is where the signal lives**

The breakdown matters more than the headline count. A rising total made entirely of low-severity style nits is noise; a flat total that's quietly shifting *toward* the serious band is a warning you'd want to catch early. Because the card stacks each day by severity, that shift is visible as a change in the shape of the bars, not buried in an average. Read the mix, not just the height.

**Where it fits in the rhythm of an engagement**

Treat the card as a standing check — a glance at the start of a week, a figure for the status update, a before-and-after when you introduce a new practice and want to show it moved the needle. The daily granularity also lets you line a spike up against something real: a big merge, a new contributor, a rushed release. The card won't tell you *why* a day spiked, but it tells you *which* day, which is where the investigation starts.

> Takeaway: Read the card as a health trend, not a scoreboard — watch the severity mix more than the raw count, and use the daily view to tie a spike to the event that caused it.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `My client wants to know whether the team's code quality is actually improving, not just hear me say it.
I open the ____ and point at the card drawn from Code Review's own record.
Instead of reading comments one pull request at a time, I show them ____ for the quarter, then the daily chart so the trend is a line they can see.
The part I lean on is ____, because a total that's quietly shifting toward the serious band matters more than one made of style nits.
When one day spikes, I use the ____ to line it up against a real event — a rushed release, a new contributor — since the card shows the day, not the cause.
I'm careful to frame it as ____: it reports what the reviewer found; it doesn't change how strict the reviews are.`,
    blanks: [
      { id: 'analytics-page', suggestions: ['Code Review analytics page', 'Code Review analytics dashboard', 'analytics page for Code Review'] },
      { id: 'total', suggestions: ["the period's total findings", 'the one headline finding count', 'the total number of findings for the window'] },
      { id: 'severity-mix', suggestions: ['the per-severity breakdown', 'the mix of serious versus minor findings', "each severity's own count"] },
      { id: 'daily-view', suggestions: ['daily stacked-by-severity chart', 'day-by-day view', 'daily granularity of the chart'] },
      { id: 'observability', suggestions: ['observability, not a strictness control', 'a report, not a change to how reviews run', 'a read-only trend view'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "The findings-by-severity card on the Code Review analytics page (Claude Code 2.1.316). Code Review is the automated reviewer that comments on your GitHub pull requests, one PR at a time. The new card aggregates what it's been finding across a selected period, three ways: the total findings, a daily chart of findings stacked by severity, and each severity's own count. It's observability — it summarizes findings the reviewer already produced; it does NOT change how reviews run or raise strictness when the count climbs (that's a separate control). For a consultant: it answers the 'is our code getting better or worse?' question with a line drawn from the reviewer's own record. Watch the severity mix more than the raw total — a count quietly shifting toward the serious band is the real warning. Use the daily granularity to line a spike up against a real event (a rushed release, a new contributor); the card shows which day spiked, not why.",
      beats: [
        { kind: 'say', text: "Final item, room three — and it closes the issue. It's a new card on the Code Review *analytics* page, landed in 2.1.316. Quick refresher: Code Review is the automated reviewer that reads your GitHub pull requests and leaves comments before anything merges." },
        { kind: 'say', text: "Here's the gap it fills. Code Review works one PR at a time — perfect for 'is *this* change sound?' But it couldn't tell you anything about the whole: are we finding more problems this week than last, and are they the serious kind? The comments were there, just scattered across hundreds of pull requests." },
        { kind: 'say', text: "The new *findings-by-severity* card pulls them together, three ways, for whatever period you pick. One: the *total findings* — a single number for the window. Two: a *daily chart stacked by severity* — a bar per day, each split into its severity bands, so you see the trend and its makeup at once. Three: *each severity's count* — broken out, so you know how many were serious and how many minor." },
        {
          kind: 'choice',
          prompt: "Over the last month the card's total findings is roughly flat — but the serious-severity band in the daily bars has been quietly growing while the low-severity band shrinks. What's the read?",
          options: [
            { id: 'warning', label: "A warning worth catching early — the mix is shifting toward serious issues even though the headline total isn't moving", correct: true, reaction: "Right. That's why the severity breakdown matters more than the count. A flat total hides a drift toward the serious band; the stacked bars make that drift visible. You'd want to act on this before the total ever moves." },
            { id: 'fine', label: "Nothing to worry about — the total is flat, so quality is holding steady", correct: false, reaction: "That's the trap the card exists to defeat. A flat *total* can hide a dangerous shift in the *mix*. Serious findings rising while nits fall is a warning, not a steady state." },
            { id: 'stricter', label: "It means Code Review automatically got stricter, which is why serious findings went up", correct: false, reaction: "No — the card only reports. It doesn't change how reviews run or raise strictness. The rising serious band is a real change in what's being found, not the tool tightening on its own." },
          ],
        },
        { kind: 'say', text: "That exchange is the whole lesson: read the *mix*, not just the height. A rising total that's all style nits is noise. A flat total drifting toward the serious band is the thing to catch. Because each day is stacked by severity, that shift shows up as a change in the *shape* of the bars, not buried in an average." },
        { kind: 'say', text: "One boundary to hold onto: this card is *observability*. It summarizes findings the reviewer already produced — it does not re-review anything, and it does not crank up strictness because a number climbed. Review depth is a different control. This is the instrument panel, not the engine." },
        { kind: 'say', text: "Why a consultant leans on it: 'is our code getting better or worse?' is a question every engagement hits, and now you can answer with a line, not a shrug. A total trending down with the serious band shrinking fastest is a story about a team tightening up — and it's the reviewer's own record, not your impression. Glance at it weekly, drop a figure in the status update, show a before-and-after when you introduce a new practice." },
        { kind: 'say', text: "And the daily granularity earns its keep when a day spikes: line it up against something real — a big merge, a rushed release, a new contributor finding their feet. The card tells you *which* day, not *why* — but which day is where the investigation starts. Claim the key, then face Heapwyrm, the dragon who's kept every finding in one unsorted pile until now." },
      ],
    },
  },
  battle: {
    name: 'Heapwyrm, Keeper of the Unsorted Pile',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a vast dragon stirs atop a mountain of findings, every one raised by the reviewer and none ever sorted — a typo glittering beside a gaping security hole, all one heap to its slitted eyes* …more findings for the hoard?… I keep them all, operator, every comment the reviewer ever flung, piled where none can tell the grave from the trivial… you say there is now a *card* that sorts my pile by day and by severity?! …then speak true what it shows me, before I bury another week in the dark.",
    tauntLines: [
      "*claws rake the heap* you'd tell me it dumps every comment back as a raw list, one pull request at a time?! no — it *aggregates*: a total, a daily trend, a count per severity, the whole pile made a picture…",
      "*smoke curls* you think the card reached in and made the reviewer *stricter*, that it changed the reviewing itself?! wrong beast — it only *reports*; it shows what was found, it does not touch what happens next…",
    ],
    victoryLine: "*Heapwyrm rears back as the hoard sorts itself into neat daily bands before its eyes, serious apart from slight* …so my pile has a *shape* at last… a total, a day-by-day trend, each severity told from the next… and it only shows, never re-reviews… take the key, operator, and read the mix, not the mountain.",
    questions: [
      {
        prompt:
          "Your client asks whether code quality across the team's pull requests is getting better or worse. You open the new findings-by-severity card on the Code Review analytics page. What does it give you?",
        choices: [
          { id: 'a', label: "The period's total findings, a daily chart of findings stacked by severity, and each severity's own count — so you can read the trend and the mix of serious-versus-minor issues at a glance", correct: true },
          { id: 'b', label: "A raw, per-pull-request list of every comment Code Review has ever left, with no aggregation and no trend over time", correct: false },
          { id: 'c', label: "A control that raises Code Review's strictness automatically whenever the finding count climbs", correct: false },
          { id: 'd', label: "A single combined finding count for the period, with no breakdown by severity", correct: false },
        ],
        passFeedback: "HIT! The card aggregates the period's findings three ways — a total, a daily chart stacked by severity, and a per-severity count — so you can see both the trend and the serious-versus-minor mix. It reports; it doesn't change how reviews run.",
        failFeedback: "MISS! It isn't a raw per-PR list, it isn't a strictness control, and it isn't a single number without the severity split — it's an aggregated, severity-broken, day-by-day view of findings. Re-read Book 1.",
      },
    ],
  },
};
