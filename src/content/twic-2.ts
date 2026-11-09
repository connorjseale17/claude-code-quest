import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — /schedule connector warning.
 * As of CHANGELOG 2.1.317, the /schedule command warns you when a new cloud
 * task would be granted connectors you did not explicitly request. A scheduled
 * cloud task runs later, unattended, with whatever connectors (integrations /
 * data sources) it holds; this warning surfaces connector scope creep at
 * creation time, before the task ever runs on its own, so you can trim it to
 * what the job actually needs.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.317: "/schedule: Warns when a new cloud task
 *     gets connectors you didn't request."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room two, and the Beat Reporter lowers her voice. Something drifted in behind you when the door opened — a pale, uninvited shape that attached itself to your errand and means to ride it wherever it goes. This week's mid-item is the one that spots exactly that kind of passenger: as of 2.1.317, `/schedule` now warns you when a new cloud task is about to be granted connectors you never asked for. One book covers the mechanic — what a scheduled cloud task is, what connectors are, and when the warning fires; the other, why a consultant treats that warning as a prompt to re-scope before anything runs unattended. Take the key from the door, then face Stowaway, the wraith who climbs aboard a task that was never meant to carry it.",
  prompt:
    "You're creating a cloud task with `/schedule` to run a weekly cleanup on its own. At creation, Claude Code flags that the task would come with two connectors you never asked for. What has the new `/schedule` behaviour done, and why does it matter?",
  choices: [
    { id: 'a', label: "It warned you that the new cloud task is being granted connectors you didn't request — surfacing connector scope creep at creation, so you can trim the task to only what the job needs before it ever runs unattended", correct: true },
    { id: 'b', label: "It automatically stripped every connector from the task, so a scheduled task can never hold any integration", correct: false },
    { id: 'c', label: "It upgraded the task to use those connectors because scheduled tasks always need the full set to run reliably", correct: false },
    { id: 'd', label: "It paused the whole session until you manually re-authenticate each connector in a browser", correct: false },
  ],
  passFeedback: "HIT! The warning names connectors the task would carry that you didn't request, letting you catch and trim connector scope at setup — before an unattended run holds access you never meant to grant.",
  failFeedback: "MISS! It doesn't strip all connectors, it doesn't force them on, and it isn't a re-auth wall — it *warns* you about unrequested connectors so you can re-scope. Re-read Book 1.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**The Passenger You Didn't Book — What \`/schedule\` Now Catches at the Door**

**Two ideas, then the warning makes sense**

A *cloud task* is work you set up with \`/schedule\` to run later, on its own, without you present — a weekly report, an overnight triage, a recurring check. A *connector* is an integration the task can reach through: a link to a data source, an external service, an MCP server. Connectors are what let a task actually *do* something beyond talk — read a tracker, post to a channel, query a store. The two combine into a plain fact: a scheduled task runs unattended holding whatever connectors it was given.

**Where the unrequested passenger comes from**

The catch is that a new task doesn't always start empty. Depending on how it's created, it can pick up connectors from the context it was spun out of — inheriting integrations that were in scope for *you*, interactively, but that this particular scheduled job never actually needs. You asked for a cleanup task; it arrives already holding a link to the production data store and a posting channel, because those happened to be around when you made it.

**What the warning does**

As of 2.1.317, \`/schedule\` catches that at creation. When a new cloud task would be granted connectors you didn't explicitly request, the command *warns* you — right there, before the task is finalized. It's not a silent default and it's not a hard block; it's a flag that says, in effect, "this task is about to carry these integrations — did you mean that?" The decision stays yours, but it's now an informed one.

**What it is and isn't**

Be precise: the warning surfaces scope, it doesn't enforce it. It doesn't strip every connector, and it doesn't force any on. It makes the task's connector set visible at the one moment you're best placed to trim it — before it ever runs on its own.

> Takeaway: \`/schedule\` now flags any connector a new cloud task would carry that you didn't ask for, turning a silent inheritance into a visible choice you make before the task runs unattended.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Least Privilege for Jobs That Run Without You — Why a Consultant Reads This Warning Closely**

**An unattended task is an unattended credential**

On an engagement, a scheduled cloud task is a small piece of standing automation that executes with no one supervising it. Whatever connectors it holds are live access it carries every time it fires — to the client's data, their services, their channels. That access doesn't ask permission at run time; it was settled when the task was created. So the connectors a task carries *are* its blast radius, and a job holding more than it needs is a job that can reach further than you intended the moment anything goes sideways.

**Catching scope creep at the only convenient moment**

The reason this warning is worth more than it looks is timing. Once a task is running on a schedule, nobody is watching it inherit things — a stray connector rides along silently, and you'd only find it in an audit, if then. The warning moves that discovery to creation time, when re-scoping costs you ten seconds instead of a security review. It's the difference between noticing the extra passenger as it boards and finding out it's been riding for a month.

**The move: grant the job its brief, nothing more**

Treat the warning as a cue, not noise. When it fires, ask whether *this* task genuinely needs each flagged connector for *its* job. The cleanup task that only tidies a repo has no business holding a link to the billing system; drop it. Keep each scheduled task scoped to exactly the integrations its work requires, and you can tell a client, truthfully, that the standing automation you left running can only touch what its job defines — a claim that survives the security review that a quietly over-provisioned task would not.

> Takeaway: A scheduled task's connectors are the access it holds while you're not looking — read the warning, trim each task to its brief, and the automation you leave behind can only reach as far as its job allows.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `I'm using /schedule to stand up a weekly cloud task that tidies a client repo on its own.
When I create it, Claude Code ____ that the task would carry two connectors I never asked for.
I read that as a cue to ask whether ____ actually needs each one for its job.
The link to the production data store it picked up? I ____, because a cleanup task has no business reaching that far.
I keep the task scoped to ____, so the automation I leave running can only touch what its brief defines.`,
    blanks: [
      { id: 'warns', suggestions: ['warns me', 'flags at creation', 'surfaces a notice'] },
      { id: 'this-task', suggestions: ['this specific cleanup task', 'this particular scheduled job', 'the task I am actually creating'] },
      { id: 'drop-it', suggestions: ['drop it before finalizing', 'trim it out then and there', 'remove it so the task never holds it'] },
      { id: 'its-brief', suggestions: ['exactly the connectors the cleanup needs', 'the minimal set its job requires', 'only the integrations its brief defines'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "/schedule connector warning (Claude Code 2.1.317): when you create a cloud task with /schedule, that task runs later unattended holding whatever connectors (integrations / data-source links / MCP servers) it was granted. A new task can silently inherit connectors from the context it was created in — ones you were using interactively but this scheduled job doesn't need. As of 2.1.317, /schedule warns you at creation when a new cloud task would carry connectors you didn't explicitly request. It's a flag, not a block and not an auto-strip — the decision stays yours, but it's now informed. For a consultant: a scheduled task's connectors are its blast radius while nobody watches, so treat the warning as a cue to re-scope — drop any connector the job doesn't need, keep each task to its brief, and catch scope creep at creation time instead of in an audit later.",
      beats: [
        { kind: 'say', text: "Room two. Mid-week item, and it's a quiet one that matters more than it sounds: as of 2.1.317, `/schedule` now warns you when a new cloud task is about to carry connectors you never asked for." },
        { kind: 'say', text: "Two words first. A *cloud task* is work you set with `/schedule` to run later, by itself, with you not around. A *connector* is how it reaches the outside world — a data source, a service, a channel, an MCP server. Connectors are what let a task actually do things, not just think." },
        { kind: 'say', text: "Put those together and here's the fact that makes this feature exist: a scheduled task runs unattended holding whatever connectors it was given. It doesn't re-ask when it fires. Whatever it's carrying, it's carrying every time it runs." },
        { kind: 'say', text: "And a new task doesn't always start empty. Depending how it's spun up, it can inherit connectors from the context you made it in — integrations that were around for *you*, live, interactively, but that this little cleanup job never actually needs. You asked for a repo tidy; it shows up already holding a line to the production store." },
        {
          kind: 'choice',
          prompt: "The warning fires: your new weekly cleanup task would carry a connector to the client's billing system that you didn't request. What's the right read?",
          options: [
            { id: 'trim', label: "A cue to re-scope — the cleanup doesn't need billing access, so drop that connector before finalizing", correct: true, reaction: "Right. The warning's whole value is timing: you trim it now, at creation, in ten seconds — instead of finding it in an audit months later. Scope the task to its brief and nothing more." },
            { id: 'ignore', label: "Harmless noise — it's just listing what's attached, so finalize as-is", correct: false, reaction: "That's the miss. An unattended task holds that access live, every time it fires, with no one watching. A connector the job doesn't need is reach you didn't mean to grant. Treat the flag as a prompt to cut it." },
            { id: 'block', label: "A hard stop — the task can't be created until billing is removed", correct: false, reaction: "Not quite. It warns; it doesn't block, and it doesn't strip anything for you. The decision stays yours — the point is that it's now an *informed* one." },
          ],
        },
        { kind: 'say', text: "So the warning doesn't enforce anything. It makes the task's connector set *visible* at the one moment you're best placed to trim it — before it ever runs on its own. After that, nobody's watching it inherit a passenger." },
        { kind: 'say', text: "The consultant move is least privilege for jobs that run without you. When it fires, ask: does *this* task need *this* connector for *its* work? If not, drop it. Then the standing automation you leave behind can only touch what its brief defines — and that's a sentence that survives a security review." },
        { kind: 'say', text: "Take the key. Through the door is Stowaway — a wraith that slipped in on your errand and means to ride it everywhere. Name what the warning does and you'll put it off at the gate where it belongs." },
      ],
    },
  },
  battle: {
    name: 'Stowaway, the Unrequested Wraith',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a pale shape peels off your shadow and hangs grinning in the air* …you only booked passage for the errand… but I climbed aboard when the door swung, and your little task will carry me wherever it runs, every night, with no one awake to see… *it drifts closer* …unless the gatekeeper truly names me as I boarded. did it? say what it flagged, and say it right.",
    tauntLines: [
      "*flickers, delighted* you think it HURLED me out on its own?! no — it only warned you I'd boarded; the throwing-out was yours to do, and you nearly waved me through…",
      "*coils around the doorframe* you'd tell me it strips every passenger bare, that a task can carry nothing?! wrong — it flags the ones you never asked for; the rest ride on, by your leave…",
    ],
    victoryLine: "*Stowaway thins to a wisp and is gone* …named at the threshold, trimmed before the first run… no free passage on a job that never needed me… the task carries its brief and nothing more… take the key, operator. I ride no further.",
    questions: [
      {
        prompt:
          "You're creating a cloud task with `/schedule` to run a weekly cleanup on its own. At creation, Claude Code flags that the task would come with two connectors you never asked for. What has the new `/schedule` behaviour done, and why does it matter?",
        choices: [
          { id: 'a', label: "It warned you that the new cloud task is being granted connectors you didn't request — surfacing connector scope creep at creation, so you can trim the task to only what the job needs before it ever runs unattended", correct: true },
          { id: 'b', label: "It automatically stripped every connector from the task, so a scheduled task can never hold any integration", correct: false },
          { id: 'c', label: "It upgraded the task to use those connectors because scheduled tasks always need the full set to run reliably", correct: false },
          { id: 'd', label: "It paused the whole session until you manually re-authenticate each connector in a browser", correct: false },
        ],
        passFeedback: "HIT! The warning names connectors the task would carry that you didn't request, letting you catch and trim connector scope at setup — before an unattended run holds access you never meant to grant.",
        failFeedback: "MISS! It doesn't strip all connectors, it doesn't force them on, and it isn't a re-auth wall — it *warns* you about unrequested connectors so you can re-scope. Re-read Book 1.",
      },
    ],
  },
};
