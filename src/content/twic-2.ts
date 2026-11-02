import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — the `ultrathink` keyword now runs a turn at xhigh effort.
 * In the interactive terminal (and, as of 2.1.316, the VS Code chat box to
 * match), including the word `ultrathink` in your prompt runs that turn at xhigh
 * effort on the current 5-series models — Opus 5.5, Sonnet 5.5, Haiku 5.5, and
 * Fable 5.1 — through Anthropic's API. Typed while Claude is already working, it
 * raises the effort for the rest of that turn. The keyword shows in a rainbow
 * only where it can actually raise effort (not when quoted or part of a file
 * path), which is your confirmation it registered. A new environment variable,
 * CLAUDE_CODE_DISABLE_ULTRATHINK, turns the keyword off entirely.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.311: "Changed `ultrathink` in the interactive
 *     terminal to run its turn at xhigh effort on Opus 5.5, Sonnet 5.5, Haiku
 *     5.5 and Fable 5.1 through Anthropic's API; typed while Claude is working,
 *     it raises the rest of that turn."
 *   - 2.1.311: "Changed the `ultrathink` rainbow to appear only where the
 *     keyword can raise effort, and not when the word is quoted or part of a
 *     file path."
 *   - 2.1.316: "Added `CLAUDE_CODE_DISABLE_ULTRATHINK`, which turns the
 *     `ultrathink` keyword off"; and [VSCode] "Changed `ultrathink` to run its
 *     turn at `xhigh` effort and show in a rainbow in the chat box, as in the
 *     terminal."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room two, and the Beat Reporter nods toward a ghost that answers before the question has finished forming — every query gets the first wisp of a thought that drifts through it, the same shallow pass whether you asked for the time or for a load-bearing architecture call. This week's mid item hands you the dial it never had: type `ultrathink` in your prompt and that one turn runs at *xhigh* effort — Claude's deep-reasoning gear — on the current 5-series models through Anthropic's API, and you can even throw the word in mid-turn to raise the rest of it. One book covers the mechanic — what the keyword does, how you know it took, and the switch an admin uses to turn it off; the other, why a consultant spends the extra thinking on the hard calls and not the easy ones. Take the key, then face Wisp, the phantom who hands you its first thought every single time.",
  prompt:
    "You hit a genuinely hard architectural trade-off mid-session and you want Claude to reason as deeply as it can before it answers. What does putting `ultrathink` in your prompt actually do?",
  choices: [
    { id: 'a', label: "Runs that turn at xhigh effort — Claude's deep-reasoning gear — on the current 5-series models through Anthropic's API, and if you type it while Claude is already working it raises the effort for the rest of that turn", correct: true },
    { id: 'b', label: "Switches Claude to a larger, more expensive model for the turn; the reasoning depth is unchanged", correct: false },
    { id: 'c', label: "Permanently pins every future turn in the session to maximum effort until you restart", correct: false },
    { id: 'd', label: "Just adds the word to your prompt as emphasis — it has no real effect on how hard Claude reasons", correct: false },
  ],
  passFeedback: "HIT! `ultrathink` raises *that turn* to xhigh effort on the current 5-series models through Anthropic's API, and typed mid-turn it lifts the rest of that turn — the rainbow on the word is your tell that it registered.",
  failFeedback: "MISS! It doesn't swap the model, it isn't a permanent global pin, and it isn't just emphasis — it dials the current turn's reasoning depth up to xhigh. Re-read Book 1.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**One Word That Shifts the Gear — \`ultrathink\` and the xhigh Setting**

**Effort is a dial, not a fixed trait**

Claude doesn't think at one fixed depth. How much reasoning it spends on a turn is an *effort* level, and a higher level means it works the problem harder before it answers. Most turns run at a sensible middle gear — right for the bulk of what you ask. The trouble is the occasional question that deserves far more thought than the gear it happens to land in, and you had no clean way to say "really chew on this one."

**What the keyword does**

Now you do. Include the word \`ultrathink\` anywhere in your prompt and that turn runs at *xhigh* effort — a deep-reasoning gear well above the everyday middle. It applies to the current 5-series models — Opus 5.5, Sonnet 5.5, Haiku 5.5, and Fable 5.1 — through Anthropic's API, in the terminal and, as of 2.1.316, the VS Code chat box to match. The lift is scoped to *that turn*: it isn't a mode you enter or a global setting you flip, just a one-shot request for more thinking on the thing in front of you.

**Mid-turn, and how you know it took**

You can also type \`ultrathink\` while Claude is already working, and it raises the effort for the rest of that turn — useful the moment a task turns out deeper than it looked. Your confirmation is visual: the word shows up in a *rainbow* only where it can actually raise effort, and stays plain when it's quoted or sitting inside a file path. If the rainbow doesn't appear, the keyword didn't register — a real tell, not decoration.

**The off switch**

For teams that don't want it in play, \`CLAUDE_CODE_DISABLE_ULTRATHINK\` turns the keyword off entirely, so the word is treated as ordinary text.

> Takeaway: \`ultrathink\` is a one-turn request for xhigh-effort reasoning on the current 5-series models — scoped to that turn, usable mid-turn, confirmed by the rainbow, and switchable off with an environment variable.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Spend the Deep Thinking Where It Pays — Hard Calls, Not Easy Ones**

**Thinking isn't free, so aim it**

Deeper reasoning costs more — more time, and more of the budget a long session burns. That's exactly why a blunt "always think as hard as possible" is the wrong instinct: you'd pay the premium on a rename and a reformat as readily as on the decision that actually carries risk. \`ultrathink\` is valuable *because* it's selective. It lets you leave the everyday gear where it belongs and reach for the deep one only when the question earns it.

**What earns it on an engagement**

The calls worth the premium are the ones where being wrong is expensive and hard to walk back: the architecture decision the rest of the build will lean on, a thorny migration plan, a security boundary, a trade-off between two designs with real consequences either way. For those, the extra minutes of reasoning are nothing against the cost of a confident wrong answer that ships. For "rename this variable" or "reformat this file," they're pure waste.

**Catching it mid-task**

Because you can drop the word in while Claude is working, you don't have to predict depth up front. Start a task at the normal gear; the moment it reveals a genuinely tricky knot — an edge case nobody scoped, a dependency that changes the shape of the answer — type \`ultrathink\` and the rest of the turn gets the harder read. Watch for the rainbow so you know it landed. It's the consultant's instinct to slow down exactly where the stakes spike, made into a single word.

> Takeaway: Reserve \`ultrathink\` for the decisions that are costly to get wrong, drop it in mid-task the moment a job turns thorny, and leave the routine work at its normal gear so the deep thinking lands where it actually pays.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `I'm deep in a client build and the work is a mix of easy and genuinely hard.
For routine edits — a rename, a reformat — I leave the session at its ____, because the deep gear there is just wasted spend.
But I've hit ____, the kind of call that's expensive to get wrong, so I put ____ in my prompt to run that one turn at xhigh effort.
I'll know it took when the word shows up ____ rather than as plain text.
And if a task I started normally suddenly turns thorny, I can ____ to lift the rest of that turn instead of restarting.`,
    blanks: [
      { id: 'normal-gear', suggestions: ['normal middle effort', 'everyday reasoning gear', 'default effort level'] },
      { id: 'hard-call', suggestions: ['a load-bearing architecture decision', 'a thorny data migration plan', 'a security-boundary trade-off'] },
      { id: 'keyword', suggestions: ['ultrathink', 'the ultrathink keyword', 'the word that raises the turn to xhigh'] },
      { id: 'rainbow', suggestions: ['in a rainbow', 'highlighted in rainbow colors', 'as a rainbow keyword, not plain text'] },
      { id: 'mid-turn', suggestions: ['type ultrathink mid-turn', 'drop the keyword in while Claude is working', 'add ultrathink to the running turn'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "The `ultrathink` keyword now raises a turn's effort (Claude Code 2.1.311, with VS Code parity in 2.1.316). Claude's reasoning depth is an 'effort' level; most turns run at a sensible middle gear. Putting the word `ultrathink` in your prompt runs THAT turn at xhigh effort — a deep-reasoning gear — on the current 5-series models (Opus 5.5, Sonnet 5.5, Haiku 5.5, Fable 5.1) through Anthropic's API. It's scoped to that one turn, not a mode or a permanent setting. You can also type it mid-turn to raise the rest of the turn. The keyword shows in a rainbow only where it can actually raise effort (not when quoted or in a file path), so the rainbow is your confirmation it registered. CLAUDE_CODE_DISABLE_ULTRATHINK turns it off. For a consultant: deeper thinking costs more time and budget, so spend it selectively — on the expensive-to-get-wrong calls (architecture, migrations, security boundaries), not on renames and reformats — and drop the word in mid-task the moment a job turns thorny.",
      beats: [
        { kind: 'say', text: "Mid item, room two. One word: `ultrathink`. Put it in your prompt and it changes how hard Claude thinks on that turn. Landed in 2.1.311, and 2.1.316 brought the VS Code chat box in line with the terminal." },
        { kind: 'say', text: "Background first. Claude's reasoning depth is a dial called *effort*. Higher effort means it works the problem harder before answering. Most turns sit at a sensible middle gear — right for the bulk of what you throw at it. The gap was the occasional question that deserved way more thought than the gear it happened to land in." },
        { kind: 'say', text: "`ultrathink` closes that gap. Drop the word anywhere in your prompt and that turn runs at *xhigh* effort — the deep-reasoning gear, well above the everyday middle. It's on the current 5-series models — Opus 5.5, Sonnet 5.5, Haiku 5.5, Fable 5.1 — through Anthropic's API. And it's scoped to *that turn*: not a mode you enter, not a global switch you forget you flipped." },
        { kind: 'say', text: "Two details that make it practical. One: you can type it *while I'm already working*, and it lifts the effort for the rest of that turn — handy when a task turns out deeper than it looked. Two: you'll know it took because the word shows up in a *rainbow*, and only where it can actually raise effort. Quote it or bury it in a file path and it stays plain. No rainbow, no lift." },
        {
          kind: 'choice',
          prompt: "You've got a morning of work: renaming a dozen variables, reformatting a file, and one genuinely load-bearing call about how to structure a data migration. Where do you spend `ultrathink`?",
          options: [
            { id: 'migration', label: "On the migration-structure call — leave the renames and reformat at the normal gear", correct: true, reaction: "Exactly. Deep thinking costs time and budget, so you aim it at the decision that's expensive to get wrong. The mechanical edits don't need it; the migration does." },
            { id: 'everything', label: "On everything, so all the work gets the best possible reasoning", correct: false, reaction: "That's the trap. You'd pay the xhigh premium on a rename as readily as on the migration. The point of the keyword is that it's *selective* — spend the deep gear where being wrong is costly." },
            { id: 'nothing', label: "Nowhere — renames and reformats are the bulk of the work, so the normal gear is fine throughout", correct: false, reaction: "Half right: the renames and reformat are fine at the normal gear. But the migration-structure call is exactly the expensive-to-get-wrong decision `ultrathink` exists for. Spend it there." },
          ],
        },
        { kind: 'say', text: "So on an engagement, the calls that earn the premium are the ones costly and hard to walk back — the architecture the build leans on, a thorny migration, a security boundary, a design trade-off with real stakes either way. The extra minutes are nothing against a confident wrong answer shipping. For 'rename this variable,' they're pure waste." },
        { kind: 'say', text: "And one for the admins: if a team doesn't want the keyword in play at all, `CLAUDE_CODE_DISABLE_ULTRATHINK` turns it off, and the word goes back to being ordinary text. Worth knowing it's a dial you can remove, not just one you can reach for." },
        { kind: 'say', text: "The habit to build: start a task at the normal gear, and the instant it reveals a genuinely tricky knot, drop in `ultrathink` and watch for the rainbow. Slow down exactly where the stakes spike — that's the whole move. Take the key, then face Wisp, the phantom who hands you its first thought every single time." },
      ],
    },
  },
  battle: {
    name: 'Wisp, the First-Thought Phantom',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a pale ghost drifts up, already answering before you've finished arriving* …a question? here, take my first thought, it's the only one I keep… the time, the weather, the fate of your whole architecture — all get the same thin wisp, why would I spend more?… you say you can tell me to *think harder* on just the one that matters?! …then say how, before I hand you another half-formed hunch.",
    tauntLines: [
      "*flickers* you'd have me believe the one word swaps me for some *bigger* phantom?! no — same ghost, deeper thought; it lifts the effort, not the model…",
      "*wavers, dimming* you think it pins *every* turn to the deep gear forever?! never — it's the one turn, this turn; drop the word again next time you mean it…",
    ],
    victoryLine: "*Wisp steadies, and for once holds the question a long moment before it speaks* …so I may keep my thin wisp for the trifles… and spend the deep gear only where being wrong would cost you… xhigh on the turn that earns it, the rainbow my proof it took… take the key, operator, and aim my thinking where it pays.",
    questions: [
      {
        prompt:
          "You hit a genuinely hard architectural trade-off mid-session and you want Claude to reason as deeply as it can before it answers. What does putting `ultrathink` in your prompt actually do?",
        choices: [
          { id: 'a', label: "Runs that turn at xhigh effort — Claude's deep-reasoning gear — on the current 5-series models through Anthropic's API, and if you type it while Claude is already working it raises the effort for the rest of that turn", correct: true },
          { id: 'b', label: "Switches Claude to a larger, more expensive model for the turn; the reasoning depth is unchanged", correct: false },
          { id: 'c', label: "Permanently pins every future turn in the session to maximum effort until you restart", correct: false },
          { id: 'd', label: "Just adds the word to your prompt as emphasis — it has no real effect on how hard Claude reasons", correct: false },
        ],
        passFeedback: "HIT! `ultrathink` raises *that turn* to xhigh effort on the current 5-series models through Anthropic's API, and typed mid-turn it lifts the rest of that turn — the rainbow on the word is your tell that it registered.",
        failFeedback: "MISS! It doesn't swap the model, it isn't a permanent global pin, and it isn't just emphasis — it dials the current turn's reasoning depth up to xhigh. Re-read Book 1.",
      },
    ],
  },
};
