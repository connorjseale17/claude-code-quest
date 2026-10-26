import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — the `claude_code.safety_event` OpenTelemetry event.
 * A new OpenTelemetry event that fires for each tool call one of Claude Code's
 * guardrails acted on: a permission rule, auto mode, a safety check, a hook, or
 * the sandbox — when it stopped, prompted on, or sent back that call. It is pure
 * observability: it records that a guardrail intervened, giving teams a telemetry
 * trail of every such decision. It does not itself block anything, it does not
 * fire on calls no guardrail touched, and it changes nothing about what the
 * existing guardrails do.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.307: "Added the `claude_code.safety_event`
 *     OpenTelemetry event for each tool call a permission rule, auto mode," a
 *     safety check, a hook or the sandbox stopped, prompted or sent back.
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Room three closes the issue, and the Beat Reporter gestures at a dragon coiled over a hoard that isn't gold — it's every action your guardrails ever stopped, each one swallowed into the dark the instant it was caught, so you never saw what was blocked or why. This week's final item drags that hoard into the light: as of 2.1.307, a new `claude_code.safety_event` fires for each tool call a permission rule, auto mode, a safety check, a hook, or the sandbox stopped, prompted on, or sent back. One book covers the mechanic — what the event is and exactly when it fires; the other, why a consultant reads the stream as an audit trail of the controls themselves. Claim the key, then face Mutewyrm, the warden who's kept every blocked action a secret until now.",
  prompt:
    "Your team pipes Claude Code's OpenTelemetry data into its observability stack. What does the new `claude_code.safety_event` give you?",
  choices: [
    { id: 'a', label: "A telemetry event for each tool call a permission rule, auto mode, a safety check, a hook, or the sandbox stopped, prompted on, or sent back — a record of every guardrail intervention, without changing what the guardrails do", correct: true },
    { id: 'b', label: "A new guardrail that itself blocks risky tool calls, adding a fresh layer of restriction on top of your permission rules", correct: false },
    { id: 'c', label: "An event on every single tool call Claude makes, whether or not any guardrail ever touched it", correct: false },
    { id: 'd', label: "A setting that turns off the permission prompts, letting flagged tool calls through silently", correct: false },
  ],
  passFeedback: "HIT! `claude_code.safety_event` is a telemetry event — it fires whenever a permission rule, auto mode, a safety check, a hook, or the sandbox stops, prompts on, or sends back a tool call, so you can see every guardrail intervention. It records; it doesn't change what the guardrails do.",
  failFeedback: "MISS! It's not a new guardrail, not an event on every call, and it turns nothing off. It's an OpenTelemetry record of the interventions your existing guardrails already make. Re-read Book 1.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**A Receipt for Every Intervention — What \`claude_code.safety_event\` Records**

**Telemetry, in one line**

OpenTelemetry is the common standard for a tool to emit a stream of structured events — metrics, logs, traces — that you collect in an observability backend and query later. Claude Code already speaks it, so a team can pipe what a session does into the same dashboards it watches everything else on. As of 2.1.307 that stream carries a new kind of event: \`claude_code.safety_event\`.

**When it fires**

The event fires for one specific moment: a tool call that one of Claude Code's guardrails acted on. Five things can trigger it — a permission rule, auto mode, a safety check, a hook, or the sandbox — and three things they can do to the call are captured: the guardrail *stopped* it, *prompted* on it (paused to ask), or *sent it back*. Put together, every time one of those five controls steps in front of a tool call, a \`safety_event\` is emitted that marks it happened. Calls that sail through untouched don't produce one; this is the record of the exceptions, not of all traffic.

**It records — it does not restrict**

The crucial thing to be clear on is that this event changes nothing about what the guardrails do. The permission rule still blocks what it blocked; the sandbox still contains what it contained; auto mode still makes the same calls. \`safety_event\` is pure observability bolted alongside them — a receipt printed each time a control fires, not a new control. It doesn't block, doesn't prompt, doesn't turn anything off. It only makes the interventions that were already happening *visible* in the telemetry you already collect.

> Takeaway: \`claude_code.safety_event\` is an OpenTelemetry event emitted whenever a permission rule, auto mode, a safety check, a hook, or the sandbox stops, prompts on, or sends back a tool call — a visible record of each guardrail intervention, not a new guardrail.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Read the Stream as an Audit Trail — Proof the Controls Are Working**

**The guardrails used to fire in the dark**

Before this, your controls worked but worked silently. A hook quietly sent a bad command back; the sandbox contained something; auto mode declined a call. Good outcomes, every one — and completely invisible after the fact. You couldn't answer a simple question like "what did our guardrails actually catch this week?" without reconstructing it by hand. On a client engagement, where the whole point of the controls is that they're trustworthy, that blind spot is exactly where you least want one.

**Turn interventions into evidence**

With a \`safety_event\` emitted on every intervention, the catching becomes a queryable record. You can see which hooks are firing and how often, what the sandbox is stopping, where auto mode draws its lines in practice, which permission rules bite most. That's an audit trail in the plainest sense: when a client asks how you keep an autonomous tool from doing something it shouldn't on their codebase, you don't describe the controls — you show the log of them working. For a regulated client, or any engagement where the control environment is part of the deliverable, that evidence is worth more than any assurance in a slide.

**Tune from data, not from guessing**

The same stream turns guardrail tuning from guesswork into measurement. A permission rule that fires on every routine edit is probably too tight and is training people to click through prompts; a sandbox tripping constantly on a legitimate workflow is a sign the policy needs a declared exception, not more friction. Watch the \`safety_event\` rate and you can see which controls are doing real work and which are just noise, and adjust the ones that aren't earning their interruption. The events don't change the guardrails — but they give you the ground truth to change them well.

> Takeaway: Treat the \`safety_event\` stream as an audit trail — proof to a client that the controls are working, and the evidence you need to tighten the guardrails that matter and loosen the ones that only nag.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `I'm running Claude Code for a regulated client, and they want proof the controls actually hold.
So I pipe the OpenTelemetry stream into our observability stack and watch for ____.
It fires every time ____ stops, prompts on, or sends back a tool call — a receipt for each intervention.
When the client asks how we keep an autonomous tool in line, I don't describe the controls, I ____.
And when I see one rule firing on ____, I read that as noise and loosen it, because the stream shows me what's actually earning its interruption.`,
    blanks: [
      { id: 'event', suggestions: ['`claude_code.safety_event`', 'the safety-event telemetry', 'the guardrail-intervention event'] },
      { id: 'source', suggestions: ['a permission rule, auto mode, a safety check, a hook, or the sandbox', 'one of the guardrails', 'a hook or the sandbox'] },
      { id: 'prove', suggestions: ['show them the log of the guardrails working', 'point at the recorded interventions', 'hand them the audit trail'] },
      { id: 'noise', suggestions: ['every routine edit', 'a perfectly ordinary workflow', 'harmless everyday calls'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "The `claude_code.safety_event` OpenTelemetry event (Claude Code 2.1.307): Claude Code already emits OpenTelemetry — a stream of structured events you collect in an observability backend. This new event fires for each tool call that one of five guardrails acted on — a permission rule, auto mode, a safety check, a hook, or the sandbox — when it stopped the call, prompted on it, or sent it back. Calls nothing touched don't produce one; it's the record of the exceptions. It is pure observability: it records that a guardrail intervened and changes nothing about what the guardrails do — it doesn't block, prompt, or turn anything off. For a consultant: the controls used to fire silently, so you couldn't say what they caught. Now the interventions are a queryable audit trail — proof to a client the controls work, and the data to tune them, tightening what matters and loosening rules that only nag.",
      beats: [
        { kind: 'say', text: "Final item, room three — and it's about *seeing* your own guardrails work. Quick bit of plumbing first: Claude Code speaks OpenTelemetry, the common standard for emitting a stream of structured events you collect in a dashboard and query later. Your team can already pipe a session's activity into whatever it watches everything else on." },
        { kind: 'say', text: "As of 2.1.307 that stream carries a new event: `claude_code.safety_event`. It fires at one specific moment — when a guardrail acts on a tool call. Five things can trigger it: a permission rule, auto mode, a safety check, a hook, or the sandbox. And three things they can do get captured: the call was *stopped*, *prompted* on, or *sent back*." },
        { kind: 'say', text: "Read that carefully, because the scope is the point. It only fires on calls a guardrail touched — the exceptions, not every call. A tool call that sails straight through produces nothing. And it's a *receipt*, not a *rule*: it records that an intervention happened. It doesn't block, doesn't prompt, doesn't turn anything off. The guardrails do exactly what they did before; this just makes their work visible." },
        {
          kind: 'choice',
          prompt: "A teammate says 'great, let's turn on safety_event — that'll add a layer that blocks the risky calls auto mode currently lets through.' What's off about that?",
          options: [
            { id: 'records', label: "It doesn't block anything — it's an observability event that *records* interventions. It won't change what auto mode allows; it just logs what the guardrails already catch", correct: true, reaction: "Exactly. It's a receipt, not a new guardrail. If you want auto mode to allow less, you change auto mode — safety_event only tells you, after the fact, what the existing controls did." },
            { id: 'newrule', label: "Nothing's off — it is a new enforcement layer that adds restrictions on top of your permission rules", correct: false, reaction: "That's the misread. It enforces nothing. It's pure telemetry — a record of interventions your current guardrails make, with zero effect on what gets through." },
            { id: 'everycall', label: "Only that it's noisy — it fires on literally every tool call, touched or not", correct: false, reaction: "Not quite — it's actually the opposite of noisy. It fires only on calls a guardrail acted on. The ones that pass clean produce no event at all." },
          ],
        },
        { kind: 'say', text: "Here's why that matters on an engagement. Before this, your controls worked but worked in the dark. A hook sent a bad command back, the sandbox contained something, auto mode declined a call — all good outcomes, all invisible afterward. You couldn't even answer 'what did our guardrails catch this week?' without rebuilding it by hand. On a client's codebase, where the whole value of the controls is that they're trustworthy, that's the worst place to be blind." },
        { kind: 'say', text: "Now the catching is a queryable record. Which hooks fire and how often, what the sandbox stops, where auto mode draws its lines in practice. So when a regulated client asks how you keep an autonomous tool from doing something it shouldn't, you don't *describe* the controls — you show the log of them working. For an engagement where the control environment is part of the deliverable, that evidence beats any assurance on a slide." },
        { kind: 'say', text: "And the same stream lets you tune from data instead of guessing. A permission rule firing on every routine edit is too tight — it's just training people to click through prompts. A sandbox tripping on a legitimate workflow needs a declared exception, not more friction. Watch the event rate and you see which controls do real work and which only nag, then fix the ones that aren't earning the interruption. Take the key — then face Mutewyrm, the warden who's kept every blocked action a secret until now." },
      ],
    },
  },
  battle: {
    name: 'Mutewyrm, the Unlogged Warden',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a vast dragon stirs atop a hoard of swallowed deeds, each blocked command and caught overreach glinting briefly before it vanishes into the dark* …I have stopped a thousand reckless calls for you… prompted on a thousand more… sent the dangerous ones back… and never once let you *see* a single one… my catching has always been a secret kept in the dark… you claim a new event now prints a receipt for every one?! …then say true what that event is, before I swallow another deed unseen.",
    tauntLines: [
      "*coils tighten, smoke curling* you'd call it a new *warden* — a fresh wall that blocks the calls on its own?! no… it enforces nothing — it only *records* what my old wards already catch; the blocking is theirs, the receipt is new…",
      "*exhales a grey plume* you think it marks your *every* call, touched or not, a deafening roar of them?! never… it fires only when a ward acts — stopped, prompted, sent back — the clean calls pass unrecorded…",
    ],
    victoryLine: "*Mutewyrm's hoard rises into the daylight, each swallowed deed now a plain, readable line* …a receipt for every intervention… permission rule, auto mode, safety check, hook, sandbox… stopped, prompted, sent back, all of it *seen* at last… no more catching in the dark… take the key, operator, and read the record of your own defenses.",
    questions: [
      {
        prompt:
          "Your team pipes Claude Code's OpenTelemetry data into its observability stack. What does the new `claude_code.safety_event` give you?",
        choices: [
          { id: 'a', label: "A telemetry event for each tool call a permission rule, auto mode, a safety check, a hook, or the sandbox stopped, prompted on, or sent back — a record of every guardrail intervention, without changing what the guardrails do", correct: true },
          { id: 'b', label: "A new guardrail that itself blocks risky tool calls, adding a fresh layer of restriction on top of your permission rules", correct: false },
          { id: 'c', label: "An event on every single tool call Claude makes, whether or not any guardrail ever touched it", correct: false },
          { id: 'd', label: "A setting that turns off the permission prompts, letting flagged tool calls through silently", correct: false },
        ],
        passFeedback: "HIT! `claude_code.safety_event` is a telemetry event — it fires whenever a permission rule, auto mode, a safety check, a hook, or the sandbox stops, prompts on, or sends back a tool call, so you can see every guardrail intervention. It records; it doesn't change what the guardrails do.",
        failFeedback: "MISS! It's not a new guardrail, not an event on every call, and it turns nothing off. It's an OpenTelemetry record of the interventions your existing guardrails already make. Re-read Book 1.",
      },
    ],
  },
};
