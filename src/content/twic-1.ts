import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — the `/dataviz` skill: a built-in skill Claude loads for
 * designing charts and dashboards, including a color-palette validator that
 * checks your colors stay readable before you ship them.
 * Source: Claude Code CHANGELOG 2.1.198 ("Added `/dataviz` skill for
 * chart/dashboard design with color-palette validator").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown, and the Beat Reporter opens on the part of a deliverable a client actually stares at: the chart. There's a new built-in skill, `/dataviz`, that you invoke before building any chart or dashboard — it brings a real design method plus a color-palette validator that checks your colors are readable before you commit to them. The two pages on the desk cover what the skill loads and why a consultant runs it first, every time. Answer the door's one question and the key is yours — and the thing guarding it is a skeleton at an easel, drawing your dashboard in colors nobody can read.",
  prompt:
    "You're about to build a set of charts for a client dashboard and you run `/dataviz` first. What does that skill give you?",
  choices: [
    { id: 'a', label: "Design guidance for charts and dashboards plus a color-palette validator, so the visuals are well-structured and your colors are checked to stay readable before you commit to them", correct: true },
    { id: 'b', label: "A connection to the client's database that generates a finished dashboard automatically, with no design decisions left to you", correct: false },
    { id: 'c', label: 'An export format that turns any chart into a high-resolution image for slides', correct: false },
    { id: 'd', label: "A lock that forces every chart onto a single fixed color theme you can't change", correct: false },
  ],
  passFeedback: "HIT! `/dataviz` brings a real chart-and-dashboard design method plus a color-palette validator — so your visuals are structured to communicate and your colors are checked to stay readable before they ship.",
  failFeedback: "MISS! It doesn't auto-build a dashboard from a database, it isn't an image export format, and it doesn't lock you to one theme. It's a design skill with a color-palette validator — re-read the books.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**\`/dataviz\` — A Skill for Designing Charts and Dashboards, Not Just Drawing Them**

**A skill Claude loads before it draws a single axis**

Claude Code ships with *skills* — packaged bundles of expertise it pulls in on demand for a particular kind of task. \`/dataviz\`, added in the 2.1.198 release, is the one for a job consultants hit constantly: turning numbers into a chart or a dashboard. Invoke it before you ask for a visual and Claude doesn't just reach for a default line chart — it loads a whole design method for how the chart should be structured, which mark actually fits the data, and how the thing should read at a glance. It's the difference between "plot this" and "design this so it communicates."

**The color-palette validator**

The piece the changelog names outright is a *color-palette validator*. Color is where most homemade charts fall apart: series that blur into each other, a red-green split no colorblind viewer can read, a palette that looks fine on your monitor and turns to mud on a projector. The validator is the check that runs against your colors before you commit to them — it exists to catch the palette that won't hold up, so you find out at design time instead of in front of the client. It turns "these colors looked okay to me" into "these colors are actually distinguishable."

**One system, not one chart**

The other thing the skill carries is consistency. A dashboard isn't one chart; it's a page of them that has to read as a single system — the same encoding for the same kind of value, a legend that means the same thing everywhere, a look that survives both a light slide and a dark screen. \`/dataviz\` treats the dashboard as the unit of design, so the fifth chart you add matches the first four instead of drifting into its own little style.

> Takeaway: \`/dataviz\` is the skill you invoke before building any chart or dashboard — it brings a real design method plus a color-palette validator, so your visuals are structured to communicate and your colors are checked before they ship.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**The Chart Is the Deliverable — Why a Consultant Runs \`/dataviz\` First**

**Clients remember the picture**

A consulting deliverable gets judged on its charts more than its prose. The partner skims the text; the client stares at the one slide with the graph on it. A muddy, mislabeled, or misleading chart doesn't just look amateur — it quietly undercuts the whole analysis behind it, because if the picture is sloppy the reader assumes the thinking is too. That's the stake \`/dataviz\` is answering: the visual isn't decoration on top of the work, it *is* the work as the client experiences it.

**Accessible by default, because you don't control the room**

You never know how a client will view your chart — colorblind, on a bad projector, printed in grayscale, on a phone in a boardroom. The color-palette validator is what lets you stop guessing. Instead of shipping colors that happen to work for you, you ship colors that have been checked to stay distinguishable for everyone in the room. On client work that isn't a nicety; it's the difference between a chart that lands for the whole audience and one that silently excludes a chunk of it.

**Consistency across a deck is credibility**

The tell of a rushed deck is charts that don't match — revenue is blue on slide four and orange on slide nine, and the reader has to re-learn the visual language every page. Making \`/dataviz\` your default for anything visual gives the client a deck where the same thing always looks the same, so their attention goes to your findings instead of decoding your formatting. Reach for it first, before the first chart — not as a cleanup pass after the dashboard already looks off.

> Takeaway: On client work the chart carries the credibility of everything behind it — run \`/dataviz\` before you build, so the visuals are designed to communicate and the colors are validated for the whole room, not just your screen.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `Before you build the ____ for the client review, run /dataviz so the charts are designed, not just plotted.
We're visualizing ____, and the different series have to stay readable for everyone in the room.
Run the color-palette validator on the colors so ____ can still tell them apart.
Keep the whole dashboard consistent — the same ____ should look the same on every chart.
Do this now, at design time, not as a cleanup pass after it already looks off.`,
    blanks: [
      { id: 'deliverable', suggestions: ['quarterly dashboard', 'board-deck charts', 'KPI summary page'] },
      { id: 'data', suggestions: ['revenue by segment', 'adoption across regions', 'cost trends by quarter'] },
      { id: 'audience', suggestions: ['a colorblind reviewer', 'someone on a bad projector', 'a client reading a grayscale printout'] },
      { id: 'encoding', suggestions: ['metric', 'category color', 'series'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "`/dataviz` (shipped in 2.1.198) is a built-in skill you invoke before building any chart or dashboard. It loads a real design method — the right mark for the data, structure that reads at a glance — instead of a default chart, and it includes a color-palette validator that checks your colors stay distinguishable before you commit to them. It also treats a dashboard as one consistent system rather than a pile of mismatched charts. For a consultant the chart is the deliverable: clients judge the analysis by the picture, they view it in rooms you don't control, so run `/dataviz` first — designed visuals and validated colors, every time, not a cleanup pass after it already looks off.",
      beats: [
        { kind: 'say', text: "First story this week is a new built-in skill: `/dataviz`, in since the 2.1.198 release. It's the one you reach for whenever you're turning numbers into a chart or a dashboard." },
        { kind: 'say', text: "A skill is a bundle of expertise I load on demand. Invoke `/dataviz` before you ask for a visual and I don't just default to a line chart — I load a whole design method: which mark actually fits your data, how the chart should be structured, how it reads at a glance. 'Design this,' not 'plot this.'" },
        { kind: 'say', text: "The piece the changelog names outright is a *color-palette validator*. Color is where homemade charts die — series that blur together, a red-green split a colorblind viewer can't read, a palette that looks fine on your screen and turns to mud on a projector. The validator checks your colors before you commit to them." },
        {
          kind: 'choice',
          prompt: "Gut-check. The `/dataviz` color-palette validator flags your color choices before you ship. What's it actually protecting you from?",
          options: [
            { id: 'readable', label: "A palette that isn't really readable — series that blur together, or colors a colorblind viewer or a bad projector can't tell apart", correct: true, reaction: "Right. It catches the palette that looks fine on your screen but falls apart for part of your audience — you fix it at design time instead of in front of the client." },
            { id: 'perf', label: "Charts that render too slowly, by capping how many colors you're allowed to use", correct: false, reaction: "No — it's not a performance limiter. It's checking that the colors you did choose stay distinguishable for everyone who'll look at the chart." },
            { id: 'brand', label: "Using any color that isn't in your firm's official brand kit", correct: false, reaction: "Not quite — it's about readability, not brand policing. The point is colors a whole audience can actually tell apart, wherever they view it." },
          ],
        },
        { kind: 'say', text: "It also carries consistency. A dashboard is a page of charts that has to read as one system — same encoding for the same value, a legend that means the same thing everywhere, a look that survives a light slide and a dark screen. `/dataviz` designs the dashboard, not just each chart, so the fifth panel matches the first four." },
        { kind: 'say', text: "Why it matters: on an engagement the chart *is* the deliverable. The partner skims your prose; the client stares at the graph. A sloppy picture undercuts the analysis behind it — if the visual looks careless, the reader assumes the thinking was too." },
        { kind: 'say', text: "And you don't control the room it's viewed in — colorblind, bad projector, grayscale printout, a phone in a boardroom. That's why you run this first, before the first chart, not as a cleanup pass after it already looks off. The books have the design method and the client playbook. The door wants to know what `/dataviz` actually gives you — answer that and the key's yours." },
      ],
    },
  },
  battle: {
    name: 'Skewbone, the Rattling Chartsmith',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*clatters up to an easel of clashing, mislabeled charts, chalk gripped in bony fingers* …ah, another one shipping graphs nobody can read… let me draw your dashboard the way I always do — every series the same muddy gray, a red-green split, axes that quietly lie…",
    tauntLines: [
      "*rattles a fistful of colored chalk* looked fine on YOUR screen, didn't it? pity about the projector, the colorblind partner, the grayscale printout…",
      "*scratches out a fifth chart in a sixth style* consistent? every one of mine is its own little masterpiece of confusion — good luck reading the deck, operator…",
    ],
    victoryLine: "*the charts snap into a clean, legible set, every color telling apart* …validated… every panel matching, every hue distinct… fine, chart-reader… take the key…",
    questions: [
      {
        prompt:
          "You're about to build a set of charts for a client dashboard and you run `/dataviz` first. What does that skill give you?",
        choices: [
          { id: 'a', label: "Design guidance for charts and dashboards plus a color-palette validator, so the visuals are well-structured and your colors are checked to stay readable before you commit to them", correct: true },
          { id: 'b', label: "A connection to the client's database that generates a finished dashboard automatically, with no design decisions left to you", correct: false },
          { id: 'c', label: 'An export format that turns any chart into a high-resolution image for slides', correct: false },
          { id: 'd', label: "A lock that forces every chart onto a single fixed color theme you can't change", correct: false },
        ],
        passFeedback: "HIT! `/dataviz` brings a real chart-and-dashboard design method plus a color-palette validator — so your visuals are structured to communicate and your colors are checked to stay readable before they ship.",
        failFeedback: "MISS! It doesn't auto-build a dashboard from a database, it isn't an image export format, and it doesn't lock you to one theme. It's a design skill with a color-palette validator — re-read the books.",
      },
    ],
  },
};
