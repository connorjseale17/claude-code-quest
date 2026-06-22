import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — `/usage` per-category breakdown: see your usage split
 * across skills, subagents, plugins, and MCP servers, so you can tell which
 * part of your setup is driving you toward your limits.
 * Final room — door target routes to the TwicStampScreen via currentTrack.
 * Source: Claude Code CHANGELOG 2.1.149 ("`/usage` per-category breakdown
 * (skills/subagents/plugins/MCP-server) limits-usage driving") and 2.1.174
 * (VSCode `/usage` dialog per-skill/agent/plugin/MCP cost breakdown).
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Final room of the issue. The Beat Reporter closes the week with the question every heavy user eventually asks: where is all my usage actually going? The `/usage` command now answers it with a per-category breakdown — your consumption split across skills, subagents, plugins, and MCP servers, so you can see which part of your setup is driving you toward your limits. The two pages on the desk cover how to read that itemized view and how a consultant uses it to find and trim the expensive piece, then the door asks its question — and curled around the key is a wyrm sitting on a hoard it never bothered to count.",
  prompt:
    "You run `/usage` mid-session and it shows a per-category breakdown. What is that breakdown actually telling you?",
  choices: [
    { id: 'a', label: 'Where your consumption is going — split across skills, subagents, plugins, and MCP servers — so you can see which part of your setup is driving you toward your limits', correct: true },
    { id: 'b', label: 'A client-ready invoice in dollars for the engagement, itemized and ready to send', correct: false },
    { id: 'c', label: 'How much of the current message\'s context window is still free', correct: false },
    { id: 'd', label: "A leaderboard of which people on your team account used Claude the most this month", correct: false },
  ],
  passFeedback: 'HIT! `/usage` splits your own consumption by category — skills, subagents, plugins, MCP servers — so you can see exactly which part of your setup is eating into your limits.',
  failFeedback: "MISS! It isn't a client invoice, it isn't your context window, and it isn't a per-person leaderboard. It's a per-category breakdown of your own usage against your limits — re-read the books.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**\`/usage\` — Reading the Itemized Bill of Your Own Session**

**From one number to a breakdown**

For a long time, usage was a single undifferentiated figure: you were some percentage of the way through your limits, with no clue what got you there. The \`/usage\` command now itemizes it. Run it in a session and instead of one lump total you get a *per-category breakdown* — your consumption sorted into buckets, so the question shifts from "how much have I used" to "what used it." That second question is the one you can actually act on.

**The four categories it splits across**

The breakdown sorts your usage into the parts of your setup that do the consuming: *skills, subagents, plugins, and MCP servers*. Each line tells you how much of your total a given category is responsible for. A skill that fires constantly, a subagent you spin up for every task, a chatty MCP server that pulls in a wall of context on each call — they all show up here as their own line items, instead of hiding inside one anonymous total. It's the difference between a credit-card balance and an itemized statement.

**Where you can read it**

It meets you where you work. In the terminal, \`/usage\` brings up the breakdown inline. In the editor integration, the VS Code \`/usage\` dialog shows the same per-skill, per-agent, per-plugin, per-MCP cost split in a panel. Either way it's reading the same thing — your usage, decomposed — so you can glance at it without leaving the session you're in.

> Takeaway: \`/usage\` turns one anonymous usage total into an itemized breakdown across skills, subagents, plugins, and MCP servers, so you can see not just how much you've used but exactly what used it.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Finding the Expensive Part of Your Setup — Before It Finds You**

**The long engagement and the creeping limit**

On a multi-week engagement you live in Claude Code, and usage adds up. There's a particular bad afternoon where you bump your limits mid-task and the work stalls — and if all you have is a single percentage, you're flying blind about what to cut. The \`/usage\` breakdown turns that panic into a diagnosis. Open it, read the line items, and the hog is usually obvious: one MCP server pulling a huge payload on every call, or a skill firing far more often than its value justifies. You can't trim what you can't see; \`/usage\` is the seeing.

**Measure before you cut**

The discipline the breakdown rewards is the same one good engineers apply to performance: profile before you optimize. It's tempting to guess which plugin or server is the costly one and rip it out — and easy to guess wrong, killing something cheap while the real culprit keeps eating. Run \`/usage\` first. Let the itemized view name the actual top consumer, *then* decide: disable it, swap it for something lighter, or scope it down so it only loads when the task needs it. The reading comes before the surgery.

**Justifying what you keep**

There's a quieter use that matters on client work. Not every expensive line item is waste — sometimes the costly MCP server is exactly the one earning its keep, and the breakdown lets you say so with evidence instead of a shrug. When a partner asks why this engagement is burning through capacity, "the data-warehouse connector accounts for most of it, and it's the reason we ship analysis in hours not days" is a defensible answer. \`/usage\` gives you the receipts to defend the budget, not just the warning that you're near it.

> Takeaway: Run \`/usage\` to profile your setup before you trim it — let the itemized breakdown name the real top consumer, then cut, swap, or justify it on evidence instead of a guess.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `We're three weeks into this engagement and I keep bumping my limits mid-task — I need to know what's eating them.
Run /usage and pull up the per-category breakdown across ____.
Tell me which single ____ is the top consumer right now.
Before we cut anything, confirm it with the numbers — I don't want to ____ and leave the real culprit running.
Once we know the hog, we decide whether to ____.`,
    blanks: [
      { id: 'categories', suggestions: ['skills, subagents, plugins, and MCP servers', 'every category in my setup', 'the four usage buckets'] },
      { id: 'lineitem', suggestions: ['MCP server', 'skill', 'plugin'] },
      { id: 'mistake', suggestions: ['guess wrong', 'rip out something cheap', 'optimize blind'] },
      { id: 'decision', suggestions: ['disable it, swap it, or scope it down', 'trim it or justify keeping it', 'load it only when the task needs it'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "`/usage` (per-category breakdown shipped in 2.1.149) turns a single usage total into an itemized view, splitting your consumption across skills, subagents, plugins, and MCP servers so you can see what's driving you toward your limits. It reads inline in the terminal and in the VS Code `/usage` dialog. The consultant's move is to profile before you cut: when a long engagement bumps your limits, run `/usage`, let the breakdown name the real top consumer, then disable, swap, or scope it down — instead of guessing and ripping out the wrong thing. The same receipts let you justify an expensive line item that's genuinely earning its keep.",
      beats: [
        { kind: 'say', text: "Last story of the week answers a question every heavy user hits eventually: where is all my usage actually going? `/usage` now shows a per-category breakdown instead of one anonymous total." },
        { kind: 'say', text: "It sorts your consumption into the parts of your setup that do the consuming — skills, subagents, plugins, and MCP servers. Each gets its own line, so a chatty MCP server or a skill that fires constantly can't hide inside the lump sum anymore. Credit-card balance versus itemized statement." },
        { kind: 'say', text: "And it meets you where you work: inline in the terminal, or in the VS Code `/usage` dialog with the same per-skill, per-agent, per-plugin, per-MCP split. Same reading, wherever you're sitting." },
        {
          kind: 'choice',
          prompt: "Quick check before the door. You're three weeks into an engagement and you keep bumping your limits mid-task. What's the right first move?",
          options: [
            { id: 'profile', label: 'Run `/usage`, read the breakdown, and let it name the actual top consumer before cutting anything', correct: true, reaction: "Exactly. Profile before you optimize. The itemized view tells you which server or skill is the hog, so you cut the right thing instead of guessing." },
            { id: 'guess', label: 'Disable whichever plugin you *think* is heaviest and hope it helps', correct: false, reaction: "That's the trap. Guess wrong and you kill something cheap while the real culprit keeps eating. Read the breakdown first — the numbers name the hog." },
            { id: 'wait', label: 'Just wait for the limits to reset and carry on', correct: false, reaction: "And bump them again tomorrow. The breakdown exists so you don't have to keep stalling — find the consumer, then trim or scope it down." },
          ],
        },
        { kind: 'say', text: "So the discipline is the one good engineers use on performance: measure before you cut. Let `/usage` name the real top consumer, *then* decide — disable it, swap it for something lighter, or scope it so it only loads when the task needs it." },
        { kind: 'say', text: "One more angle that matters on client work: not every expensive line is waste. Sometimes the costly MCP server is the one earning its keep — and the breakdown lets you say so with evidence. 'The data-warehouse connector is most of it, and it's why we ship analysis in hours' is a defensible answer when a partner asks." },
        { kind: 'say', text: "That's the issue. The books on the desk have the four categories and the profile-before-you-cut playbook. The door wants to know what that per-category breakdown is really telling you — answer it, and the wyrm gives up the last key of the week." },
      ],
    },
  },
  battle: {
    name: 'Tally, the Unaccounted Wyrm',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*coils tighter around a hoard it has never once counted* …you burned through all of it and you still can't tell me where it went… good… stay blind, and the pile stays mine…",
    tauntLines: [
      "*fans gold across the floor in one undifferentiated heap* an invoice? a context window? you're naming the wrong pile — that's not what the breakdown counts…",
      "*snorts smoke over the coins* keep guessing which plugin is the heavy one… guess wrong and you'll trim the cheap one while I keep eating…",
    ],
    victoryLine: "*the hoard sorts itself into neat, labeled stacks — skills, subagents, plugins, servers* …you read the itemized pile… now you know exactly what was eating it… take the key, accountant…",
    questions: [
      {
        prompt:
          "You run `/usage` mid-session and it shows a per-category breakdown. What is that breakdown actually telling you?",
        choices: [
          { id: 'a', label: 'Where your consumption is going — split across skills, subagents, plugins, and MCP servers — so you can see which part of your setup is driving you toward your limits', correct: true },
          { id: 'b', label: 'A client-ready invoice in dollars for the engagement, itemized and ready to send', correct: false },
          { id: 'c', label: 'How much of the current message\'s context window is still free', correct: false },
          { id: 'd', label: "A leaderboard of which people on your team account used Claude the most this month", correct: false },
        ],
        passFeedback: 'HIT! `/usage` splits your own consumption by category — skills, subagents, plugins, MCP servers — so you can see exactly which part of your setup is eating into your limits.',
        failFeedback: "MISS! It isn't a client invoice, it isn't your context window, and it isn't a per-person leaderboard. It's a per-category breakdown of your own usage against your limits — re-read the books.",
      },
    ],
  },
};
