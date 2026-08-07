import type { LessonContent } from './types';

/**
 * Claude Cowork Quest — Module 7: The Engagement Keep (capstone).
 * Run a full engagement: parallel sub-agents, scheduling, governance + client
 * confidentiality. Ids match buildCowork7Level() in roomConfigs.ts.
 */
export const cowork7Content: LessonContent = {
  roomId: 'engagement-keep',
  intro:
    "The Engagement Keep — a royal-purple war room where banners of parallel agents hang over live dashboards and the firm's governance crest. Managing Partner Vega is handing you a live engagement: real client, real money, real deadline. The Engagement Overlord guards the gate, daring you to run it all unsupervised with raw client data in play. Power and governance, together, or you don't pass.",
  prompt:
    "A partner drops a competitive-landscape engagement on you: profile six rivals, build a market-sizing model, and ship a weekly client update. You want to move fast inside Cowork. What's the right way to run the six competitor profiles?",
  choices: [
    { id: 'a', label: "Paste all six company names into one giant prompt and hope Cowork keeps them straight.", correct: false },
    { id: 'b', label: "Break the work into subtasks and spawn one parallel sub-agent per competitor, then track them all with /tasks.", correct: true },
    { id: 'c', label: "Profile them one at a time in a single task, finishing each before starting the next.", correct: false },
    { id: 'd', label: "Open six separate Claude Desktop windows and alt-tab between them by hand.", correct: false },
  ],
  passFeedback:
    "[PASS] One workstream, one sub-agent. Cowork splits complex work into subtasks and runs sub-agents in parallel — six profiles at once, all visible in /tasks. That's the engagement manager move: delegate the lanes, supervise from one panel.",
  failFeedback:
    "[FAIL] Sequential wastes Cowork's best feature, and one mega-prompt blurs six distinct briefs into mush. Break it into subtasks, spawn a sub-agent per competitor, and monitor them together in /tasks.",
  lore: [
    {
      id: 'parallel-agents',
      text: `**Run the Engagement Like an EM — Parallel Sub-Agents**

A real engagement is never one task. It's a competitor scan, a market-sizing model, a stakeholder-interview synthesis, and a client deck — different workstreams, different deadlines. Cowork is built for exactly this. It breaks a complex goal into smaller subtasks and runs multiple sub-agents at the same time, each in its own context, each on its own lane.

The clean pattern is the one any EM would recognize: one named workstream per agent. Six competitors? Spawn one sub-agent per competitor and they research concurrently — genuine parallel work, not one-after-another on a queue. Each comes back with its own clean profile, and the main session stitches them into a single landscape.

A long-running sub-agent doesn't have to hold you hostage. Press Ctrl+B to background it and it keeps working while you move on. To supervise the team, type /tasks — it lists every active sub-agent: what each is doing, what's finished, what's stuck. You run the room from one panel.

> Takeaway: Split the engagement into subtasks, spawn one parallel sub-agent per workstream, Ctrl+B to background the slow ones, /tasks to supervise them all.`,
    },
    {
      id: 'schedule-recurring',
      text: `**Schedule the Recurring Deliverable — and Mind the Awake-App Catch**

Every engagement has a heartbeat deliverable: the weekly client status, the Monday pipeline pull, the end-of-sprint summary. You don't want to remember to run it. In Cowork you type /schedule inside a task — or use the Scheduled sidebar — and Claude turns it into a recurring job: "every Friday at 4pm, pull this week's progress and draft the client update."

Here's the part the marketing skips. Unlike a cloud cron job, a Cowork schedule only runs while your computer is awake and the desktop app is open. Close the lid Thursday night, fly to a client site, and Friday's report quietly doesn't happen. This is a desktop agent living on *your* machine, not a server humming in a data center. Plan for it: leave the machine awake, or treat the schedule as a helpful nudge rather than a guarantee.

A recurring job that runs in "act without asking" mode while you're away is a different animal — no human at the keyboard to catch a bad action or a prompt-injection. For scheduled client work, keep approvals on.

> Takeaway: /schedule recurring deliverables, but remember they only fire while the machine is awake and the app is open — and never leave unattended autonomy running on client work.`,
    },
    {
      id: 'governance-gap',
      text: `**The Governance Gap You Have to Say Out Loud**

Your compliance team assumes everything is logged. With Cowork, that assumption is wrong, and it's the single most important fact in this whole quest. As of 2026, Cowork activity does NOT appear in Audit Logs, the Compliance API, or Data Exports — on any plan, including Enterprise. The file reads, the connector calls, the scheduled runs: none of it lands in the central record your security team relies on.

A Cowork session's history lives on the laptop it ran on. There's no server-side conversation archive to pull six months later for an audit or an e-discovery request. If the machine is wiped, the trail is gone. For a regulated client, that's not a footnote — it's a blocker.

The one enterprise-grade visibility channel is OpenTelemetry. Cowork can emit events — tool and connector calls, files touched, whether each action was approved manually or automatically — to a SIEM like Splunk. But an admin has to wire it up first; it isn't on by default, and even then it's event metadata, not a full transcript.

> Takeaway: Cowork is invisible to Audit Logs, the Compliance API, and Data Exports — history is local. OpenTelemetry-to-SIEM is the only central visibility, and only if an admin turns it on.`,
    },
    {
      id: 'admin-levers',
      text: `**The Admin Levers That Make It Safe at Team Scale**

When Cowork went GA on April 9, 2026, Anthropic shipped the controls a firm needs to deploy it responsibly across a team. You should know they exist, because "can I even run this client's data through Cowork?" is often an admin question, not yours alone.

RBAC (Role-Based Access Controls) lets admins group users — manually or via SCIM from your identity provider — and define exactly which Claude capabilities each role can use. Group Spend Limits cap per-team budget from the admin console, so an enthusiastic analyst can't run up a five-figure month. Expanded Usage Analytics surfaces session counts and per-user activity in the dashboard and Analytics API. And Per-Tool Connector Controls let an admin allow read but block write on a connector — Claude can *read* the client's Drive but not *delete* from it.

These are the difference between a personal tool and a governed one. Before you push a sensitive engagement through Cowork, the honest question is: what RBAC role am I in, is OTel logging on, and is spend capped?

> Takeaway: RBAC, Group Spend Limits, Usage Analytics, and Per-Tool Connector Controls (GA, April 9 2026) gate Team/Enterprise use — know your role and your controls before running client data.`,
    },
    {
      id: 'de-identify',
      text: `**Client Confidentiality — De-Identify Before You Delegate**

Before a single connector touches anything, scrub the client. Replace the real name with a code — "Project Atlas," not "Northwind Bank." Swap exact financials for ranges or indexed figures. Mask deal terms. You're not being paranoid; you're doing what every engagement letter already requires, just at the moment the data meets an AI agent. De-identified data that leaks is an embarrassment; named client financials that leak is a breach.

Don't point Cowork at your whole Documents folder. Create a dedicated working folder for the engagement, drop in only the de-identified materials it needs, and grant access to that folder alone. Cowork's permissions are folder-scoped — it reads, edits, and creates only inside what you grant.

Given the audit gap, regulated or highly sensitive workloads — anything that must be reconstructable for a regulator — should stay off Cowork until your firm confirms audit coverage via OpenTelemetry. When in doubt, keep it out.

> Takeaway: De-identify client names, codes, and financials before any connector runs; scope Cowork to a dedicated working folder; and keep regulated workloads off until audit coverage is confirmed.`,
    },
  ],
  practice: {
    id: 'engagement-practice',
    template:
      "ENGAGEMENT BRIEF — Project ____ (working folder: ./engagements/atlas/)\n\n" +
      "1. PARALLEL WORKSTREAMS: Break this competitive landscape into subtasks and spawn one ____ per competitor (6 total). Each returns a one-page profile to the working folder. I'll track them all with ____.\n\n" +
      "2. CONFIDENTIALITY: Before any connector runs, ____ the client — code-name only, financials as ranges. Grant access to the dedicated working folder only, nothing wider.\n\n" +
      "3. RECURRING DELIVERABLE: Use ____ to draft the client status update every Friday at 4pm — remembering it only fires while my machine is awake and the app is open. Keep approvals ON.\n\n" +
      "4. GOVERNANCE POSTURE: Confirm my ____ role permits this, and that OpenTelemetry is wired to our SIEM — the firm's only central record, since Cowork activity isn't in the Audit Logs.",
    blanks: [
      { id: 'codename', suggestions: ["Atlas (a code-name)", "Northwind Bank (the real client)", "TODO"], correctIndex: 0 },
      { id: 'primitive', suggestions: ["parallel sub-agent", "browser tab", "email thread"], correctIndex: 0 },
      { id: 'monitor', suggestions: ["/tasks", "/help", "/clear"], correctIndex: 0 },
      { id: 'deidentify', suggestions: ["de-identify", "publish", "screenshot"], correctIndex: 0 },
      { id: 'schedule', suggestions: ["/schedule (or the Scheduled sidebar)", "a sticky note", "act-without-asking mode"], correctIndex: 0 },
      { id: 'governance', suggestions: ["RBAC", "guest", "no"], correctIndex: 0 },
    ],
    prize: { id: 'engagement-operator', label: 'ENGAGEMENT OPERATOR' },
  },
  conversations: {
    'partner-vega': {
      summary:
        "Vega hands over a live engagement: orchestrate parallel sub-agents (one per competitor, /tasks to track, Ctrl+B to background), schedule the weekly client update knowing it only runs while the machine is awake, and — non-negotiable — de-identify the client before any connector touches it, because Cowork activity isn't in Audit Logs or the Compliance API (OpenTelemetry to a SIEM is the only central trail).",
      beats: [
        { kind: 'say', text: "Sit. I'm handing you Project Atlas — live client, six competitors to profile, a market model, and a weekly update they expect every Friday. You'll run it in Cowork. The question I'm actually testing is whether you can coordinate power without losing the firm its license." },
        { kind: 'say', text: "First, throughput. Six competitor profiles. I don't want them trickling out one by one while the deadline burns. In Cowork you break the engagement into subtasks and spawn sub-agents that run in parallel — one lane each. Ctrl+B backgrounds a slow one, /tasks shows you the whole room at a glance." },
        { kind: 'say', text: "Now the part juniors get wrong. Before any connector — Drive, Gmail, the model — touches Atlas, what do you do with the client's identity?" },
        {
          kind: 'choice',
          prompt: "Before any connector touches Project Atlas, what's the move?",
          options: [
            { id: 'deidentify', label: "De-identify it — code-name the client, range the financials, mask the deal terms — then point Cowork at a dedicated working folder.", correct: true, reaction: "That's the instinct that keeps you employed. De-identified data in a tight folder scope: small blast radius, no named-client leak. Now you may delegate." },
            { id: 'local-vm', label: "Nothing — Cowork runs locally in a VM, so the client name never really leaves the building.", correct: false, reaction: "Local execution is not de-identification. The moment a connector calls Drive or Gmail, that named client and those raw figures are in play. Scrub first. Always." },
            { id: 'ask-permission', label: "Email the client to ask permission to use their real name in the prompts.", correct: false, reaction: "Overthinking it the wrong way. You don't ask permission to do your job carefully — you just de-identify by default. Code the name, range the numbers, move." },
          ],
        },
        { kind: 'say', text: "And one more reality you must carry into every client conversation. Cowork's activity history is LOCAL — it does not show up in our Audit Logs, the Compliance API, or Data Exports. So tell me: how does the firm get any central visibility into what Cowork did on this engagement?" },
        {
          kind: 'choice',
          prompt: "Cowork activity isn't in our Audit Logs or Compliance API. How does the firm get central visibility?",
          options: [
            { id: 'otel', label: "Have an admin wire up OpenTelemetry so Cowork streams its events to our SIEM, like Splunk.", correct: true, reaction: "Exactly. OTel is the only enterprise-grade window in. It emits the tool calls, the files touched, whether each action was auto-approved — straight to the SIEM. Without it, you're flying dark on a regulated client." },
            { id: 'compliance-api', label: "Pull the session transcript from the Compliance API after the engagement closes.", correct: false, reaction: "There's nothing to pull. Cowork is excluded from the Compliance API and Data Exports entirely. The history sits on the laptop and nowhere else. OTel-to-SIEM is the only central trail." },
            { id: 'manual-export', label: "Export the chat history to a shared Drive folder each Friday.", correct: false, reaction: "A manual export is a courtesy, not a governance control — it's incomplete, it's gameable, and a regulator won't accept it. You need machine-emitted telemetry. That's OpenTelemetry." },
          ],
        },
        { kind: 'say', text: "Good. De-identify first, OpenTelemetry for the trail, folder-scoped access, approvals on. That's not bureaucracy — that's how you get to use the power at all. Atlas is yours. Don't make me regret it." },
      ],
    },
  },
  battle: {
    name: 'The Engagement Overlord',
    spriteKey: 'dragon',
    maxHP: 5,
    playerHP: 5,
    phases: 1,
    introLine: "So. The whole engagement, unsupervised. Real client. Raw financials. Act-without-asking ON. No de-identification, no audit trail. RUN IT ALL — or admit you're not ready for power.",
    tauntLines: [
      "Governance is for cowards! SHIP THE NAMED CLIENT DATA!",
      "Why log it? Why scope it? Just let it RUN!",
      "Audit trails slow you down — the deadline is TONIGHT!",
    ],
    victoryLine: "...Power AND governance. You ran the room AND kept the firm's license. ...Fine. The Keep is yours, Operator.",
    questions: [
      {
        prompt: "You have six competitors to profile under deadline. What's the right orchestration in Cowork?",
        choices: [
          { id: 'a', label: "One task, six companies, profiled strictly one after another.", correct: false },
          { id: 'b', label: "Break it into subtasks and spawn one parallel sub-agent per competitor; track them with /tasks.", correct: true },
          { id: 'c', label: "One mega-prompt listing all six names at once.", correct: false },
          { id: 'd', label: "Six separate Claude Desktop windows you alt-tab between.", correct: false },
        ],
        passFeedback: "HIT! One workstream, one sub-agent, all running in parallel and visible in /tasks. That's the engagement-manager move.",
        failFeedback: "MISS! Sequential burns the deadline and a mega-prompt blurs six briefs. Spawn a sub-agent per competitor and supervise from /tasks.",
      },
      {
        prompt: "A sub-agent is doing a slow, deep market-sizing pull and you want to start the next lane. What do you do?",
        choices: [
          { id: 'a', label: "Wait at the screen until it finishes before touching anything else.", correct: false },
          { id: 'b', label: "Kill it and restart smaller so it returns faster.", correct: false },
          { id: 'c', label: "Press Ctrl+B to background it — it keeps working while you move on, and you check it later in /tasks.", correct: true },
          { id: 'd', label: "Close the app to free up the machine; it'll resume on its own.", correct: false },
        ],
        passFeedback: "HIT! Ctrl+B backgrounds the sub-agent so it runs while you advance other lanes. /tasks shows you where it landed.",
        failFeedback: "MISS! You don't have to babysit a slow lane, and closing the app stops it cold. Ctrl+B to background, /tasks to monitor.",
      },
      {
        prompt: "You set a /schedule for the Friday 4pm client update. Friday, you're at the client site with your laptop closed. What happens?",
        choices: [
          { id: 'a', label: "It doesn't run — Cowork schedules only fire while the machine is awake and the desktop app is open.", correct: true },
          { id: 'b', label: "It runs on Anthropic's servers and emails the client automatically.", correct: false },
          { id: 'c', label: "It queues and fires the moment you reopen the lid, timestamped for 4pm.", correct: false },
          { id: 'd', label: "It runs in a cloud VM since Cowork executes in an isolated sandbox.", correct: false },
        ],
        passFeedback: "HIT! Cowork lives on YOUR machine. No awake laptop, no open app, no scheduled run. Plan for it on client travel days.",
        failFeedback: "MISS! This isn't a cloud cron. A Cowork schedule needs the computer awake and the app open. Lid closed means the update silently doesn't happen.",
      },
      {
        prompt: "Six months from now, compliance asks for a full record of everything Cowork did on a regulated engagement. Where is it?",
        choices: [
          { id: 'a', label: "In the Audit Logs, like every other Claude product.", correct: false },
          { id: 'b', label: "In the Compliance API, retrievable by user and date.", correct: false },
          { id: 'c', label: "In a server-side conversation archive Anthropic retains for one year.", correct: false },
          { id: 'd', label: "Only wherever you sent it via OpenTelemetry — Cowork isn't in Audit Logs, the Compliance API, or Data Exports; raw history is local to the machine.", correct: true },
        ],
        passFeedback: "HIT! This is THE governance fact. Cowork is excluded from Audit Logs, Compliance API, and Data Exports. History is local; OTel-to-SIEM is the only central trail — and only if an admin set it up first.",
        failFeedback: "MISS! Cowork activity is NOT in Audit Logs, the Compliance API, or Data Exports. The trail lives on the laptop. The only enterprise visibility is OpenTelemetry to a SIEM.",
      },
      {
        prompt: "You're about to run Project Atlas — a named bank's confidential financials — through Cowork connectors. What's the right first move?",
        choices: [
          { id: 'a', label: "Turn on 'act without asking' so the engagement runs end-to-end with no interruptions.", correct: false },
          { id: 'b', label: "De-identify the client (code-name, ranged figures), scope Cowork to a dedicated working folder, and confirm OTel logging is on before any connector runs.", correct: true },
          { id: 'c', label: "Point Cowork at your full Documents folder so it has all the context it might need.", correct: false },
          { id: 'd', label: "Run it as-is — Cowork's local VM keeps the data on your machine anyway.", correct: false },
        ],
        passFeedback: "HIT! De-identify first, scope tight, confirm the audit trail. That's how you wield the power without betting the firm's license on it.",
        failFeedback: "MISS! Named financials, no de-identification, broad folder access, and unattended autonomy is exactly the breach the Overlord wants. Scrub the client, scope the folder, confirm OTel — then run.",
      },
    ],
  },
};
