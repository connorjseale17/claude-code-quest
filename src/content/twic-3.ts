import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — `/doctor` is now a full setup checkup (with a `/checkup`
 * alias): a diagnostic that inspects your Claude Code configuration and surfaces
 * problems to fix, including a check that flags a bloated checked-in CLAUDE.md
 * and proposes trimming it.
 * Final room — door target routes to the TwicStampScreen via currentTrack.
 * Sources: Claude Code CHANGELOG 2.1.205 ("/doctor now full setup checkup;
 * /checkup alias available") and 2.1.206 ("Added /doctor check proposing
 * trimming checked-in CLAUDE.md files").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Final room of the issue, and the Beat Reporter closes on the least glamorous, most useful command of the week: `/doctor`. It's grown from a narrow update check into a *full setup checkup* — a diagnostic that inspects your whole Claude Code configuration and hands you the problems to fix, now reachable by the shorter alias `/checkup` too. The two pages on the desk cover what the checkup actually inspects and why a consultant runs it on minute one of every new machine and repo. Answer the last question of the week and the key is yours — but coiled around it is a wyrm that nests on a hoard of broken, bloated setup and dares you to work on top of it.",
  prompt:
    "You run `/doctor` (or its alias `/checkup`) at the start of a new engagement. What is it, and what does it do for you?",
  choices: [
    { id: 'a', label: "A full setup checkup that inspects your Claude Code configuration and surfaces problems to fix — for example, flagging a bloated checked-in CLAUDE.md and proposing you trim it", correct: true },
    { id: 'b', label: "A command that automatically scans your project's source code for bugs and rewrites the offending lines in place", correct: false },
    { id: 'c', label: "A live status monitor for the Anthropic API that tells you whether the service itself is currently up or down", correct: false },
    { id: 'd', label: "A tool that opens a support ticket with Anthropic on your behalf whenever something in your session goes wrong", correct: false },
  ],
  passFeedback: "HIT! `/doctor` (alias `/checkup`) is a full setup checkup — it inspects your configuration and surfaces what's wrong so you can fix it, right down to proposing you trim a bloated checked-in CLAUDE.md. It's about *your setup*, not your source code or Anthropic's servers.",
  failFeedback: "MISS! It doesn't rewrite your source, it isn't an API status page, and it doesn't file support tickets. It's a checkup for *your own setup* — configuration and environment. Re-read the books.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**\`/doctor\` Grows Up — From Update Nag to Full Setup Checkup**

**What it became**

\`/doctor\` used to be a narrow thing — mostly a check on whether your install was current. As of the 2.1.205 release it's a *full setup checkup*: a single command that inspects your Claude Code configuration and environment and reports back what's off, so you can fix it before it turns into a mysterious failure mid-session. The same release added a shorter alias, \`/checkup\`, so it's quick to reach and quick to make a habit. Think of it as the tool running a physical on itself and handing you the chart.

**It surfaces problems — it doesn't silently 'fix' your project**

The important mental model is that \`/doctor\` diagnoses *your setup*, not your source code. It's looking at how Claude Code is configured on this machine and in this repo — the environment, the config, the pieces that have to be right for the tool to behave. When it finds something amiss it surfaces it and, where it can, proposes the fix. It is not a code scanner that edits your application, and it is not a status page for Anthropic's servers. It's a mirror held up to your own configuration.

**A concrete check: the bloated \`CLAUDE.md\`**

The 2.1.206 release added a telling example of the kind of thing it catches: a check that spots a checked-in \`CLAUDE.md\` that has grown bloated and *proposes trimming it*. That file rides along in every session's context, so when it balloons you quietly pay for the excess on every single turn. \`/doctor\` flagging it is exactly the flavor of the whole feature — a small, easy-to-miss configuration problem, surfaced with a suggested fix, before it costs you.

> Takeaway: \`/doctor\` (alias \`/checkup\`) is now a full setup checkup that inspects your Claude Code configuration and surfaces problems with proposed fixes — like trimming a bloated checked-in \`CLAUDE.md\` — rather than editing your source or reporting on Anthropic's servers.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Run the Checkup on Minute One — Why a Consultant Never Starts Blind**

**A new machine or a new repo is exactly when setup rots**

The moment you're most likely to have a broken or half-configured setup is the moment you least want to discover it the hard way: a fresh laptop, a client's repository you just cloned, an environment nobody has ever run this tool in. That's precisely when a stale config, a missing piece, or a setting inherited from the last job quietly derails you three hours later with an error that looks like anything but its real cause. \`/checkup\` on minute one is the cheapest insurance there is — you find the broken setup *before* you've built anything on top of it.

**Fix the environment before you bill against it**

On an engagement your time is the client's money, and nothing burns it faster than debugging your own tooling instead of doing the work. A checkup that surfaces the misconfiguration up front means the hour you'd have lost to a mysterious failure never happens. It turns "why is this behaving strangely?" — the most expensive question in consulting — into a two-minute diagnostic you ran before the meter started. Make it the first thing you type in a new environment and setup problems stop being surprises.

**The bloated \`CLAUDE.md\` catch pays for itself**

The trim-your-\`CLAUDE.md\` check is a perfect small example of why this matters on client work. A memory file that's quietly grown to a wall of text is loaded into *every* turn of *every* session — you're paying for that bloat continuously, and it crowds out room better spent on the actual task. Having the checkup flag it and propose the trim keeps your context lean and your engagement's token budget spent on the work, not on cruft nobody remembers adding. That's the whole spirit of the feature: catch the quiet, compounding costs before they compound.

> Takeaway: Make \`/doctor\` your first move in any new environment — it turns the most expensive question in consulting ("why is this misbehaving?") into a two-minute checkup you run before the client's clock ever starts.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `I just cloned the client repo onto a ____ and before I touch anything, run /doctor.
It's a full setup checkup now — I want it to surface any ____ before it bites me mid-engagement.
If it flags the checked-in ____ as bloated, take its suggestion and trim it so my context stays lean.
Anyone on the team can reach the same checkup with the ____ alias, so make it a first-session habit.
Better to fix a broken setup on minute one than to discover it three hours into the client's work.`,
    blanks: [
      { id: 'machine', suggestions: ['fresh machine', 'brand-new laptop', 'clean workstation'] },
      { id: 'problem', suggestions: ['misconfiguration in my setup', 'broken part of the install', 'setup problem I would otherwise miss'] },
      { id: 'claudemd', suggestions: ['CLAUDE.md file', 'project CLAUDE.md', 'checked-in memory file'] },
      { id: 'alias', suggestions: ['/checkup', 'checkup', '/checkup command'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "`/doctor` (shipped as a full setup checkup in 2.1.205, with a `/checkup` alias) inspects your Claude Code configuration and environment and surfaces problems to fix — it diagnoses *your setup*, not your source code, and it isn't an Anthropic status page. The 2.1.206 release added a telling example: a check that flags a bloated checked-in `CLAUDE.md` and proposes trimming it, since that file loads into every turn's context and you pay for the bloat continuously. For a consultant it's a minute-one habit on any new machine or client repo: find the broken or stale setup before you build on top of it, and turn the most expensive question in consulting — why is this misbehaving? — into a two-minute checkup you run before the client's clock starts.",
      beats: [
        { kind: 'say', text: "Last story of the week, and it's the un-flashy one that saves your afternoon: `/doctor`. It used to be a narrow update check. As of the 2.1.205 release it's a *full setup checkup* — one command that inspects your whole Claude Code configuration and tells you what's off." },
        { kind: 'say', text: "Same release gave it a shorter alias, `/checkup`, so it's quick to reach and easy to make a habit. Picture the tool running a physical on itself and handing you the chart — that's the feature." },
        { kind: 'say', text: "Get the mental model right: it diagnoses *your setup*, not your source code. It looks at how Claude Code is configured on this machine and in this repo — the environment, the config, the pieces that have to be right. When it finds something amiss it surfaces it and, where it can, proposes the fix. It's not a code scanner, and it's not a status page for our servers." },
        {
          kind: 'choice',
          prompt: "Gut-check before the door. `/checkup` reports a problem. What kind of problem is it built to surface?",
          options: [
            { id: 'setup', label: "Something wrong with your own Claude Code setup or configuration — like a bloated checked-in CLAUDE.md it suggests you trim", correct: true, reaction: "Right. It's a mirror held up to *your* configuration and environment. It finds the setup problems that would otherwise ambush you mid-session, and proposes fixes." },
            { id: 'appbug', label: "A bug in your project's application code, which it then rewrites for you in place", correct: false, reaction: "No — that's not what it inspects. `/doctor` checks your *setup*, not your app's source. It won't go editing your project's logic; it diagnoses your configuration." },
            { id: 'outage', label: "Whether Anthropic's API is currently down, like a service status page", correct: false, reaction: "Not that either. It's a checkup on your own environment, not a live monitor of our servers. Think local setup health, not service uptime." },
          ],
        },
        { kind: 'say', text: "The 2.1.206 release added a perfect example of what it catches: a check that spots a checked-in `CLAUDE.md` that's grown bloated and proposes trimming it. That file rides along in *every* turn's context — when it balloons, you quietly pay for the excess on every single message. A small, easy-to-miss problem, surfaced with a fix." },
        { kind: 'say', text: "Why a consultant cares: the moment you're most likely to have a broken setup is a fresh laptop or a client repo you just cloned — exactly when a stale config derails you three hours later with an error that looks like anything but its real cause. `/checkup` on minute one is the cheapest insurance there is. On an engagement your time is the client's money; don't spend it debugging your own tooling." },
        { kind: 'say', text: "The books have what the checkup inspects and the minute-one playbook. The door asks what `/doctor` actually is and does — answer that and the week's key is yours. Mind the wyrm coiled behind it; it nests on a hoard of broken, bloated setup and wants you to work on top of it." },
      ],
    },
  },
  battle: {
    name: 'Cruftmaw, the Config-Rot Wyrm',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a great dragon uncoils atop a reeking hoard of stale configs, dead settings, and a CLAUDE.md swollen to the size of a door* …no checkup, no checkup… just build on my rot, little consultant… let the broken setup fester until it ruins you three hours from now…",
    tauntLines: [
      "*fans out a CLAUDE.md bloated past reading* every turn you drag this whole hoard into context — paying, paying, paying, and never once trimming it…",
      "*coils tighter over a nest of stale settings* why run a checkup? let the misconfiguration hide until the meter's running and the client's watching — that's when I like to bite…",
    ],
    victoryLine: "*the hoard is swept into a clean, lean setup, the swollen file trimmed to a page* …checked… diagnosed… trimmed on minute one… agh, fine, careful one… take the last key of the week…",
    questions: [
      {
        prompt:
          "You run `/doctor` (or its alias `/checkup`) at the start of a new engagement. What is it, and what does it do for you?",
        choices: [
          { id: 'a', label: "A full setup checkup that inspects your Claude Code configuration and surfaces problems to fix — for example, flagging a bloated checked-in CLAUDE.md and proposing you trim it", correct: true },
          { id: 'b', label: "A command that automatically scans your project's source code for bugs and rewrites the offending lines in place", correct: false },
          { id: 'c', label: "A live status monitor for the Anthropic API that tells you whether the service itself is currently up or down", correct: false },
          { id: 'd', label: "A tool that opens a support ticket with Anthropic on your behalf whenever something in your session goes wrong", correct: false },
        ],
        passFeedback: "HIT! `/doctor` (alias `/checkup`) is a full setup checkup — it inspects your configuration and surfaces what's wrong so you can fix it, right down to proposing you trim a bloated checked-in CLAUDE.md. It's about *your setup*, not your source code or Anthropic's servers.",
        failFeedback: "MISS! It doesn't rewrite your source, it isn't an API status page, and it doesn't file support tickets. It's a checkup for *your own setup* — configuration and environment. Re-read the books.",
      },
    ],
  },
};
