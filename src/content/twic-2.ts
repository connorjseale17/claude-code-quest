import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — the `bashOutputMaxChars` and `taskOutputMaxChars`
 * settings. Claude Code adds two settings that raise how much output Claude
 * receives *inline* before the rest is saved to a file: `bashOutputMaxChars`
 * for shell-command output, `taskOutputMaxChars` for background-task output.
 * Past the threshold the output is written to a file (nothing is lost); raising
 * the number lets more of the raw output land in context before that spill.
 * Source (Claude Code CHANGELOG 2.1.261):
 *   - "Added `bashOutputMaxChars` and `taskOutputMaxChars` settings to raise how
 *      much command and background-task output Claude receives inline before it
 *      is saved to a file."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2, and the Beat Reporter is standing at the mouth of a chamber where a command's output pours out endlessly — the first stretch hanging in the air where you can read it, the rest draining off into a jar sealed on a shelf. The 2.1.261 release adds two settings, `bashOutputMaxChars` and `taskOutputMaxChars`, that raise how much output Claude receives *inline* before the overflow is saved to a file — one knob for shell-command output, one for background-task output. The two books cover exactly where that threshold sits and why a consultant would tune how much raw output floods the window. Answer the door's question for the key — then face what guards it, a wraith made of the overflow itself.",
  prompt:
    "What do the new `bashOutputMaxChars` and `taskOutputMaxChars` settings control?",
  choices: [
    { id: 'a', label: "How much command / background-task output Claude receives inline before the rest is saved to a file — raise them to let more raw output land in context", correct: true },
    { id: 'b', label: "A hard ceiling that aborts a command the instant its output passes the character limit", correct: false },
    { id: 'c', label: "How long a background task may run before Claude Code kills it for exceeding a time budget", correct: false },
    { id: 'd', label: "How much of a command's output is permanently discarded once it grows past the limit", correct: false },
  ],
  passFeedback: "HIT! They set the inline-vs-file threshold: `bashOutputMaxChars` for shell-command output, `taskOutputMaxChars` for background-task output. Past the limit the rest is saved to a file — raise the number and more of the raw output lands inline in context.",
  failFeedback: "MISS! They don't abort the command, cap its runtime, or discard output — the overflow is *saved to a file*, and these settings just raise how much arrives inline first. Re-read Book 1.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**\`bashOutputMaxChars\` and \`taskOutputMaxChars\` — Where the Output Stops Flooding In**

**The threshold you didn't know was there**

When Claude runs a command that prints a wall of text — a verbose test run, a long build log, a fat diff — not all of it drops straight into the conversation. There's a threshold. Up to a certain number of characters, the output arrives *inline*, sitting right in the context where Claude can read it without a second step. Past that point, the rest is *saved to a file* instead, so the window doesn't drown in a single command's noise. The 2.1.261 release exposes that threshold as something you can set.

**Two knobs for two sources**

There are two settings, because there are two sources of that firehose. \`bashOutputMaxChars\` governs the output of shell *commands* — the things Claude runs directly in your terminal. \`taskOutputMaxChars\` governs *background-task* output — work that runs off to the side and reports back. Each one names, in characters, how much of that stream lands inline before the spill-to-file kicks in. They move independently: you can let a chatty command run wide while keeping background tasks tight, or the reverse.

**"Raise," not "cap"**

Read the verb carefully: these settings *raise how much Claude receives inline*. The higher the number, the more of the raw output arrives directly in context before anything is diverted to a file. This is the opposite of a limiter that throws work away. Nothing is lost when the threshold is hit — the overflow is written to a file that's still there to be read; the setting only decides how much shows up in the conversation first.

> Takeaway: \`bashOutputMaxChars\` and \`taskOutputMaxChars\` set how many characters of command and background-task output land *inline* before the rest is saved to a file — raise them to bring more of the raw output straight into context.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Tuning the Firehose — When to Let More Output In, and When Not To**

**The trade you're actually making**

Inline output is convenient: it's already in front of Claude, no extra read required, ready to reason over in one shot. But it isn't free — every character of it spends part of the context window, the same finite budget everything else in the session competes for. Output saved to a file is the reverse bargain: the full log is preserved and costs the window almost nothing, but Claude has to open the file to consult it. Raising these settings buys immediacy at the price of budget. That's the whole decision.

**When raising it earns its keep**

Turn the number up when the *detail matters and it keeps getting cut off*. If Claude needs to reason over an entire failing test log, a complete stack trace, or a large diff in a single pass — and the important line keeps landing in the file instead of the conversation — a higher \`bashOutputMaxChars\` keeps the whole thing inline where it can be worked on directly. For a long background job whose full report you want Claude to weigh at once, \`taskOutputMaxChars\` does the same.

**When to leave it low**

Hold the threshold down for routine, noisy commands whose bulk you'd never read anyway — a dependency install that prints thousands of progress lines, a formatter that lists every file it touched. There, a wall of inline output just crowds out the work. Let it spill to the file; Claude can still reach in if it needs a specific line. The skill is matching the knob to the command: wide when the output *is* the deliverable, tight when it's just exhaust.

> Takeaway: Raise \`bashOutputMaxChars\` / \`taskOutputMaxChars\` when the full raw output is what Claude must reason over; leave them low for noisy commands whose bulk would only crowd the window.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `Claude keeps truncating the failing test log I need it to read in full, saving the tail to a file.
The characters past the inline threshold are getting ____ instead of landing in the window.
Since this is shell-command output, I'll raise ____ so more of the log arrives inline.
For the long background job's report, the knob would be ____ instead.
But for the noisy dependency install, I'll leave the threshold ____ and let it spill.`,
    blanks: [
      { id: 'spilled', suggestions: ['saved to a file', 'diverted to a file', 'written out to disk'] },
      { id: 'bash-knob', suggestions: ['`bashOutputMaxChars`', 'the `bashOutputMaxChars` setting', 'the command-output threshold'] },
      { id: 'task-knob', suggestions: ['`taskOutputMaxChars`', 'the `taskOutputMaxChars` setting', 'the background-task threshold'] },
      { id: 'low', suggestions: ['low', 'where it is', 'tight'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "`bashOutputMaxChars` and `taskOutputMaxChars` (2.1.261) set how much command and background-task output Claude receives *inline* before the rest is saved to a file. `bashOutputMaxChars` is for shell-command output; `taskOutputMaxChars` is for background-task output. There's always been a threshold — past it, a command's overflow spills to a file so the window doesn't drown in one command's noise. These settings *raise* that threshold: higher number, more raw output inline before the spill. Nothing is lost either way; the file is still there to read. The trade is immediacy versus budget: inline output is ready to reason over but spends context, file output preserves everything but needs a read. Raise it when the full log is what Claude must reason over; leave it low for noisy commands whose bulk would just crowd the window.",
      beats: [
        { kind: 'say', text: "This one's about a threshold most people never notice until it bites. When I run a command that spews a wall of text, not all of it lands in the conversation. Up to a point it arrives inline, right where I can read it. Past that point, the rest gets saved to a file so the window doesn't drown in one command's noise." },
        { kind: 'say', text: "The 2.1.261 release lets you set where that point sits. Two knobs, because there are two firehoses. `bashOutputMaxChars` is for shell *commands* — the stuff I run in your terminal. `taskOutputMaxChars` is for *background-task* output — work that runs off to the side and reports back. Each names, in characters, how much lands inline before the spill." },
        { kind: 'say', text: "Read the verb: these *raise* how much I receive inline. Bigger number, more raw output straight into context before anything's diverted. It is not a limiter that throws work away — when the threshold's hit, the overflow goes to a file that's still there to read. Nothing's lost; the setting only decides how much shows up in the conversation first." },
        {
          kind: 'choice',
          prompt: "You need me to reason over an entire failing test log in one pass, but the tail keeps landing in a file instead of the window. What's the right move?",
          options: [
            { id: 'raise-bash', label: "Raise `bashOutputMaxChars` so more of the log arrives inline before the spill", correct: true, reaction: "Exactly. It's shell-command output, so `bashOutputMaxChars` is the knob. Turn it up and the whole log lands in context where I can work the failing line directly — you're buying immediacy with some of the window's budget." },
            { id: 'raise-task', label: "Raise `taskOutputMaxChars`, since it's a lot of output", correct: false, reaction: "Wrong firehose. `taskOutputMaxChars` governs background-task output. A test run in the terminal is a shell command — that's `bashOutputMaxChars`." },
            { id: 'nothing', label: "Nothing can be done — past the limit, that output is just gone", correct: false, reaction: "Not gone. The overflow is saved to a file, and the threshold is adjustable. Raise `bashOutputMaxChars` and more of it arrives inline in the first place." },
          ],
        },
        { kind: 'say', text: "The trade is worth naming out loud. Inline output is convenient — it's already in front of me, ready to reason over in one shot — but every character spends part of the context budget. Output in a file preserves the whole log for almost nothing, but I have to open it to consult it. Raising the setting buys immediacy at the cost of budget." },
        { kind: 'say', text: "So raise it when the *detail matters and keeps getting cut* — a full stack trace, a big diff, a complete test log you want me to weigh at once. Leave it low for the routine noise: a dependency install printing thousands of progress lines, a formatter listing every file. Let that spill; I can still reach in for a specific line if I need it." },
        { kind: 'say', text: "The books lay out both knobs and the trade. The door asks one thing: what do these two settings actually control? Answer for the key — then face Gush past it, a wraith woven from all the overflow that ever drained off into the jar." },
      ],
    },
  },
  battle: {
    name: 'Gush, the Overflow Wraith',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a wraith churns up out of a sealed jar, its body a scrolling torrent of log lines that never stops pouring* …I am everything that spilled past the threshold, operator… the tail of every command, drained off into the jar while you read only the head… tell me what those two settings *do*, or be swept under with the rest of the overflow…",
    tauntLines: [
      "*the torrent surges* you called it a *cap* — a wall that halts the command when I crest it? no! the command runs on, I merely pour into the jar instead of into your window…",
      "*log lines scatter like spray* *discarded*, you said — lost the moment I overflow? no, no — I am SAVED, sealed in the file, waiting to be read… raise the threshold and more of me arrives inline, but none of me is ever thrown away…",
    ],
    victoryLine: "*Gush settles back into a readable stream, head in the window and tail in the jar exactly where each belongs* …you knew it — inline first, then saved, never lost… a threshold to raise, not a blade to cut… take the key, and tune how much of the flood you let in…",
    questions: [
      {
        prompt:
          "What do the new `bashOutputMaxChars` and `taskOutputMaxChars` settings control?",
        choices: [
          { id: 'a', label: "How much command / background-task output Claude receives inline before the rest is saved to a file — raise them to let more raw output land in context", correct: true },
          { id: 'b', label: "A hard ceiling that aborts a command the instant its output passes the character limit", correct: false },
          { id: 'c', label: "How long a background task may run before Claude Code kills it for exceeding a time budget", correct: false },
          { id: 'd', label: "How much of a command's output is permanently discarded once it grows past the limit", correct: false },
        ],
        passFeedback: "HIT! They set the inline-vs-file threshold: `bashOutputMaxChars` for shell-command output, `taskOutputMaxChars` for background-task output. Past the limit the rest is saved to a file — raise the number and more of the raw output lands inline in context.",
        failFeedback: "MISS! They don't abort the command, cap its runtime, or discard output — the overflow is *saved to a file*, and these settings just raise how much arrives inline first. Re-read Book 1.",
      },
    ],
  },
};
