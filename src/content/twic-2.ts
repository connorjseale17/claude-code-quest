import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — fallbackModel: configure up to three fallback models so a
 * session keeps running when the primary is unavailable.
 * Source: Claude Code CHANGELOG 2.1.166 ("Added `fallbackModel` setting for
 * configuring up to three fallback models when primary is unavailable" +
 * "Claude Code retries once on fallback model for unexpected non-retryable API
 * errors").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2. The Beat Reporter's mid-week story is the unglamorous one that saves a deadline: a new `fallbackModel` setting. Configure a backup roster and your session keeps running when the model you asked for can't answer. Read the two pages for how the failover works and why every serious operator turns it on, then face down the thing in the doorway — it specializes in vanishing at the worst moment.",
  prompt:
    "You've set `fallbackModel` in your config. Mid-engagement, the model you normally run becomes unavailable. What does Claude Code do?",
  choices: [
    { id: 'a', label: 'It falls over to a configured fallback model — you can list up to three in priority order — so the session keeps going', correct: true },
    { id: 'b', label: 'It halts the session and waits until your primary model comes back online', correct: false },
    { id: 'c', label: 'It permanently rewrites your default to whatever model is cheapest that day', correct: false },
    { id: 'd', label: 'It keeps the same model but silently truncates your context to force the request through', correct: false },
  ],
  passFeedback: 'HIT! `fallbackModel` lets you configure up to three backups; when the primary is unavailable Claude Code reaches for the next one in the list and the work continues instead of stalling.',
  failFeedback: 'MISS! The point is continuity, not a stall, not a permanent switch, and not silent context-trimming. It steps down to a backup you chose ahead of time — re-read the books.',
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**fallbackModel — A Backup Roster for When the Lights Flicker**

**The failure it's built for**

Every model has bad moments — capacity crunches, a transient outage, an unexpected error that won't clear on retry. When that happens mid-task, a session that only knows one model has nowhere to go: it stops. Release 2.1.166 added the *\`fallbackModel\` setting for configuring up to three fallback models when the primary is unavailable*. Instead of a single point of failure you declare a roster, and Claude Code knows where to turn when the front-runner can't answer.

**How the failover behaves**

The setting holds up to three models, and the order is the priority order — your preferred backup first, then the next, then the last resort. When the primary is unavailable, Claude Code steps down the list rather than halting. There's a second, sharper behavior baked in too: *Claude Code retries once on the fallback model for unexpected non-retryable API errors*. So even a one-off error that normally wouldn't be retried gets a single automatic second attempt on a different model before it surfaces to you.

**What it doesn't do**

Worth being precise: this is a continuity feature, not a model-selection or cost feature. It doesn't quietly downgrade you to save money, it doesn't permanently change your default, and it isn't doing anything to your context window. The primary stays your primary; the fallback only steps in when the primary genuinely can't serve the request.

> Takeaway: \`fallbackModel\` turns a single model into a prioritized roster so an outage on one becomes a graceful hop to the next, not a dead stop.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Resilience You Configure Once — Why Client Work Earns a Roster**

**The cost of a stall lands on you**

On your own machine, a model hiccup is a shrug and a coffee. On a client engagement it's different: you're mid-demo, or racing a deadline, and "the tool just stopped" is not a sentence you want to say in the room. \`fallbackModel\` is the cheapest insurance against that moment. It's a one-time configuration that converts an outage from a hard stop into an invisible hop, and the client never sees the seam.

**Stack the roster by judgment, not reflex**

Because the list is a priority order, treat it like a small decision rather than a default. Lead with the model closest in capability to your primary so a failover barely changes the quality of the work, then let later entries trade down toward "just keep us moving." For a sensitive build you might weight the whole roster toward your most trusted models; for a low-stakes prototype you might prioritize whatever stays up. The point is that *you* decided the order in advance, calmly, instead of scrambling when something breaks live.

**Set it and forget it — then trust it**

This is the rare feature that asks for thirty seconds once and then disappears. Add it to the config you carry into engagements, confirm the order reflects how you'd actually want to degrade, and move on. The single automatic retry on a fallback means many transient errors resolve before you'd even notice them — which is exactly the kind of quiet reliability that separates a tool you demo on from a tool you depend on.

> Takeaway: Configure the roster once, ordered by how you'd want to degrade, and an outage on client time becomes a seam nobody in the room ever sees.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `Set up fallbackModel so a model outage never stalls me on ____.
Make my primary the model I always start with, then list up to three backups in priority order.
First backup: the model ____ to my primary, so quality barely changes.
Last resort: whatever ____, to keep the session alive at all costs.
I want the failover to be ____ — I should not have to babysit it mid-engagement.`,
    blanks: [
      { id: 'context', suggestions: ['a live client demo', 'a deadline build', 'an unattended migration'] },
      { id: 'closeness', suggestions: ['closest in capability', 'most similar in behavior', 'nearest in quality'] },
      { id: 'availability', suggestions: ['tends to stay up', 'has the most capacity', 'is least likely to be down'] },
      { id: 'mode', suggestions: ['automatic and silent', 'hands-off', 'invisible to the client'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "fallbackModel (Claude Code 2.1.166) lets you configure up to three fallback models, in priority order, that step in when your primary is unavailable — so the session keeps running instead of halting. Claude Code also retries once on the fallback for an unexpected non-retryable API error, so many transient failures clear automatically. It's a continuity feature, not a cost or model-selection one: the primary stays primary; the backups only fire on a genuine outage. Set the roster once, ordered by how you'd want to degrade, and lead with the model closest to your primary.",
      beats: [
        { kind: 'say', text: "Mid-week story — less flashy, saves more deadlines than anything else this issue: the `fallbackModel` setting, new in 2.1.166. It lets you configure *up to three* fallback models for when your primary is unavailable." },
        { kind: 'say', text: "Picture the failure it's for: a capacity crunch, a transient outage, an error that won't clear. A session that only knows one model just stops there. With a roster, Claude Code knows where to turn — it steps down your list instead of halting." },
        { kind: 'say', text: "The order is the priority order: preferred backup first, then the next, then a last resort. And there's a sharper bit too — Claude Code retries once on the fallback for an unexpected non-retryable API error. So even a one-off error gets a second swing on a different model before it ever reaches you." },
        {
          kind: 'choice',
          prompt: "Sanity check. Which of these is fallbackModel actually doing?",
          options: [
            { id: 'cost', label: 'Quietly switching me to the cheapest model to save money', correct: false, reaction: "No — it's not a cost knob. It never downgrades you to save money and never changes your default. The primary stays primary." },
            { id: 'continuity', label: 'Keeping the session alive by hopping to a backup when the primary can\'t answer', correct: true, reaction: "That's it. Pure continuity. The backup only fires when the primary genuinely can't serve the request, then hands the work forward." },
            { id: 'context', label: 'Trimming my context window to force the request through', correct: false, reaction: "Nothing to do with context. It doesn't touch your window — it changes *which model* answers, not how much it sees." },
          ],
        },
        { kind: 'say', text: "Consultant angle: on your own box an outage is a shrug. On a client demo, 'the tool just stopped' is a sentence you never want to say out loud. This setting turns that hard stop into an invisible hop — the client never sees the seam." },
        { kind: 'say', text: "Stack the roster by judgment: lead with the model closest in capability to your primary so a failover barely changes the work, then let later entries trade down toward 'just keep us moving.' You decide the order calmly, once, instead of scrambling when it breaks live." },
        { kind: 'say', text: "It's the rare set-it-and-forget-it feature — thirty seconds in your config and then it disappears. The books have the mechanics and the roster playbook. The door wants to know what Claude Code does the moment your model goes dark — nail that and the key's yours." },
      ],
    },
  },
  battle: {
    name: 'The No-Show Wraith',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*flickers translucent at the threshold* …the model you wanted? gone. vanished. now what, with no one waiting in the wings…?",
    tauntLines: [
      "*fades half out of sight* no backup, no roster, no plan — just you, stalled, watching the cursor blink…",
      "*phases through the key* outages don't wait for your deadline, and neither do I…",
    ],
    victoryLine: "*solidifies, deflating* …you had a roster ready the whole time… of course you take the key…",
    questions: [
      {
        prompt:
          "You've set `fallbackModel` in your config. Mid-engagement, the model you normally run becomes unavailable. What does Claude Code do?",
        choices: [
          { id: 'a', label: 'It falls over to a configured fallback model — you can list up to three in priority order — so the session keeps going', correct: true },
          { id: 'b', label: 'It halts the session and waits until your primary model comes back online', correct: false },
          { id: 'c', label: 'It permanently rewrites your default to whatever model is cheapest that day', correct: false },
          { id: 'd', label: 'It keeps the same model but silently truncates your context to force the request through', correct: false },
        ],
        passFeedback: 'HIT! `fallbackModel` lets you configure up to three backups; when the primary is unavailable Claude Code reaches for the next one in the list and the work continues instead of stalling.',
        failFeedback: 'MISS! The point is continuity, not a stall, not a permanent switch, and not silent context-trimming. It steps down to a backup you chose ahead of time — re-read the books.',
      },
    ],
  },
};
