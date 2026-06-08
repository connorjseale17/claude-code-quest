import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — OpenTelemetry resource attributes as metric labels:
 * Claude Code now attaches OTel resource attributes as labels on the metrics it
 * emits, so usage telemetry can be sliced by those dimensions.
 * Source: Claude Code CHANGELOG 2.1.161 ("OpenTelemetry resource attributes now
 * included as metric labels for custom slicing").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2, and the Beat Reporter has put down the keyboard for the dashboard. The story here is observability: Claude Code's OpenTelemetry metrics now carry their resource attributes as labels, which means one undifferentiated usage total can finally be sliced by the dimensions you care about. Read the desk's two pages — the first for how the labeling works, the second for why a consultant who bills by engagement should care a great deal. Then the door asks its question, and the thing guarding the key is hard to see until you've learned to look.",
  prompt:
    "Your token-usage metric is one big number, and finance wants spend broken out per client engagement. Claude Code is already exporting OpenTelemetry. What does the 2.1.161 change actually let you do?",
  choices: [
    { id: 'a', label: 'Resource attributes now ride along as metric labels, so you set a per-engagement attribute and slice the same totals by that label in your dashboard', correct: true },
    { id: 'b', label: 'Claude Code now auto-generates a separate itemized invoice per client with no setup on your end', correct: false },
    { id: 'c', label: 'It replaces OpenTelemetry export with a built-in billing system that tracks spend for you', correct: false },
    { id: 'd', label: 'You run a separate Claude Code install per client so each one keeps its own numbers apart', correct: false },
  ],
  passFeedback: 'HIT! 2.1.161 attaches resource attributes as labels on the emitted metrics, so a single total becomes sliceable — tag the session by engagement and group the same number per client.',
  failFeedback: 'MISS! Claude Code does not invoice for you, does not replace OpenTelemetry, and you do not need a separate install per client. The change turns resource attributes into labels you can slice by — re-read Book 1.',
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**Telemetry You Can Slice — Resource Attributes Become Labels**

**Claude Code already emits metrics**

Claude Code can export operational telemetry over *OpenTelemetry* (OTel) — the open standard most observability backends speak. The metrics cover things like token usage, tool calls, and session activity, and they ship to whatever your team already runs: Datadog, Grafana, Honeycomb. On its own, though, a raw counter tells you something happened without telling you *where* or *for whom*. "Ten thousand tokens" is a number with no handle to grab.

**Resource attributes, and what 2.1.161 added**

In OTel, *resource attributes* are the descriptors attached to whatever is producing the telemetry — identifiers like the service name, the host, and the session and user context. Release 2.1.161 made Claude Code *include those resource attributes as labels on the metrics it emits, for custom slicing*. A label is a dimension your backend can group and filter by, so the moment an attribute rides along as a label, every metric carrying it can be broken down by that dimension on a dashboard.

**From one number to a breakdown**

The shift is from a single undifferentiated total to the same total made *cuttable*. Before, token spend was one line that blended every session together. After, the identical spend can be grouped by whichever resource attributes are set — totalled per service, filtered down to one host, compared session against session. Nothing about the underlying number changed. What changed is that you can now slice it along the dimensions the attributes describe, which is the difference between a figure and an answer.

> Takeaway: Resource attributes now ride along as metric labels, turning Claude Code's usage totals from a single blended number into something you can group and filter by the dimensions you set.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**The Invoice Line Item — Attributing Claude Usage to a Client**

**Why a blended total is a problem you can feel**

For a consultant, "how much Claude did we use" is rarely the real question. The real question is "how much on the Acme engagement, versus internal R&D, versus the pitch we're not billing for." A single blended number can't answer that, which means it can't back an invoice line, can't prove ROI to a skeptical client, and can't tell you which engagement is quietly eating your token budget. Labels are what turn the telemetry into something finance and the client will actually accept.

**Set the attributes so the labels mean something**

The leverage is in setting the resource attributes deliberately. Tag each session with the things you'll want to slice by later — client, project, engagement code, team — and those become the labels you group on. Decide the scheme once, up front, the way you'd decide a billing-code structure, because a label you didn't set is a slice you can't make. The feature hands you the dimension; choosing a clean, consistent set of dimensions is the part that stays your job.

**Mind the unlabeled bucket**

There's a discipline cost worth naming. A session that runs with no attributes set doesn't vanish — its usage lands somewhere, and if you're not deliberate it lands silently in the wrong place and distorts the very breakdown you built the dashboard to trust. So give the untagged a home on purpose: a visible "internal / unbilled" bucket beats an invisible leak into a client's column. Slicing is only as honest as the attributes underneath it.

> Takeaway: Set resource attributes as deliberately as billing codes — clean per-engagement tags turn Claude usage into a defensible breakdown, while an untagged session is a slice you can't bill and shouldn't hide.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `I want a usage dashboard that proves ROI per client, not one undifferentiated total.
Turn on Claude Code's OpenTelemetry export and ship the metrics to ____.
Set the resource attributes so each session is tagged by ____.
Build a view that slices ____ by that label, so I can break it down per engagement.
Default-tag anything untagged as ____ so it stays visible instead of leaking into a client's column.`,
    blanks: [
      { id: 'backend', suggestions: ['our Grafana stack', 'Datadog', 'the team Honeycomb instance'] },
      { id: 'attribute', suggestions: ['client and project name', 'the engagement code', 'team and environment'] },
      { id: 'metric', suggestions: ['token spend', 'tool-call volume', 'active session time'] },
      { id: 'fallback-bucket', suggestions: ['internal / unbilled', 'overhead', 'needs-review'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "Claude Code exports usage telemetry over OpenTelemetry (token spend, tool calls, session activity). As of 2.1.161, OTel resource attributes — the descriptors on whatever produced the telemetry, like service, host, session/user — are attached as labels on the emitted metrics, so a single blended total becomes sliceable by those dimensions in your backend. For a consultant this is cost attribution: tag each session by client/engagement and the same total breaks down per client for invoicing and ROI. Set the attributes deliberately like billing codes, and give untagged sessions a visible bucket so they don't leak into the wrong column.",
      beats: [
        { kind: 'say', text: "Different beat this week — less keyboard, more dashboard. Claude Code already ships usage telemetry over OpenTelemetry: token spend, tool calls, session activity, out to whatever you run — Datadog, Grafana, Honeycomb." },
        { kind: 'say', text: "The gap was that a raw counter is a number with no handle. 'Ten thousand tokens' — fine, but where? For whom? You couldn't cut it apart, so it just sat there as one blended total." },
        { kind: 'say', text: "Release 2.1.161 changed that. In OTel, *resource attributes* are the descriptors on whatever produced the telemetry — service, host, session and user context. Now those attributes ride along as *labels* on the metrics. And a label is a dimension your backend can group and filter by." },
        {
          kind: 'choice',
          prompt: "So what did the underlying token-usage number actually become after this change?",
          options: [
            { id: 'sliceable', label: 'The same total, but now sliceable by whatever attributes you set', correct: true, reaction: "Right. The number didn't shrink or change — it became cuttable. Group it per service, filter to one host, compare session to session. A figure turned into an answer." },
            { id: 'smaller', label: 'A smaller, more accurate number than before', correct: false, reaction: "No — the measurement is identical. What changed is your ability to break the same total apart along the dimensions the attributes describe." },
            { id: 'realtime', label: 'A real-time stream instead of a batched metric', correct: false, reaction: "That's not what shipped. The change is about labels for slicing, not the cadence of the export. Same metric, now group-able and filter-able." },
          ],
        },
        { kind: 'say', text: "Here's why we care. 'How much Claude did we use' is never the real question — 'how much on the Acme engagement versus internal R&D' is. Tag each session by client or engagement code, and the same spend breaks down per client. That's an invoice line and an ROI story, not a mystery." },
        { kind: 'say', text: "Set the attributes as deliberately as billing codes — a label you didn't set is a slice you can't make. And give untagged sessions a home on purpose, a visible 'internal / unbilled' bucket. An untagged session doesn't vanish; left alone it leaks into the wrong column and poisons the breakdown." },
        { kind: 'say', text: "Both books are on the desk — mechanics on one page, the billing playbook on the other. The door wants to know what 2.1.161 actually *lets you do*. Get that right and the key's yours." },
      ],
    },
  },
  battle: {
    name: 'The Unlabeled Wraith',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a shape that won't resolve, numbers smearing through it with no name attached* …count me if you can… one big blur of usage and not a single label to grab… whose was it? you'll never tell…",
    tauntLines: [
      "*the figures blend and double* every session pooled into one fog — bill THAT to a client, I dare you…",
      "*flickers between forms* no attributes, no slice, no answer — you're squinting at a total that means nothing…",
    ],
    victoryLine: "*the haze snaps into crisp, tagged columns* …you labeled me… now you can see exactly whose I was… fine, the key's at the bottom of the breakdown…",
    questions: [
      {
        prompt:
          "Your token-usage metric is one big number, and finance wants spend broken out per client engagement. Claude Code is already exporting OpenTelemetry. What does the 2.1.161 change actually let you do?",
        choices: [
          { id: 'a', label: 'Resource attributes now ride along as metric labels, so you set a per-engagement attribute and slice the same totals by that label in your dashboard', correct: true },
          { id: 'b', label: 'Claude Code now auto-generates a separate itemized invoice per client with no setup on your end', correct: false },
          { id: 'c', label: 'It replaces OpenTelemetry export with a built-in billing system that tracks spend for you', correct: false },
          { id: 'd', label: 'You run a separate Claude Code install per client so each one keeps its own numbers apart', correct: false },
        ],
        passFeedback: 'HIT! 2.1.161 attaches resource attributes as labels on the emitted metrics, so a single total becomes sliceable — tag the session by engagement and group the same number per client.',
        failFeedback: 'MISS! Claude Code does not invoice for you, does not replace OpenTelemetry, and you do not need a separate install per client. The change turns resource attributes into labels you can slice by — re-read Book 1.',
      },
    ],
  },
};
