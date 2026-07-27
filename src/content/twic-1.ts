import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — Claude Opus 5: the new default Opus model, shipped as
 * `claude-opus-5` with a 1M-token context window and fast-mode pricing of
 * $10/$50 per Mtok.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.219 ("Added Claude Opus 5 (`claude-opus-5`),
 *     now the default Opus model — 1M context, fast mode at $10/$50 per Mtok").
 *   - anthropic.com/news/claude-opus-5 (2026-07-24): "step change improvement
 *     for the Opus tier powering long-running agents"; Frontier-Bench v0.1
 *     "more than doubles Opus 4.8's performance at a lower cost per task";
 *     ARC-AGI 3 score "three times as high as the next-best model"; Zapier
 *     AutomationBench "around 1.5x the next-best model for the same cost per
 *     task"; "checks its own work the way a real frontend developer would."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown, and the Beat Reporter opens with the headline everyone's talking about: there's a new engine under the hood. Claude Opus 5 shipped as `claude-opus-5` and is now the default Opus model — a million-token context window, fast-mode pricing at $10/$50 per Mtok, and a jump in reasoning that Anthropic pitches squarely at long-running agents. The two pages on the desk cover what the model actually is and when a consultant should reach for the Opus tier over a cheaper one. Answer the door's one question and the key is yours — the thing rattling in the dark beyond it is a skeleton that claims it has never once forgotten a task.",
  prompt:
    "The 2.1.219 changelog announces Claude Opus 5. According to that line, what is it?",
  choices: [
    { id: 'a', label: "The new default Opus model (`claude-opus-5`) with a 1M-token context window and fast-mode pricing of $10/$50 per Mtok", correct: true },
    { id: 'b', label: "A lightweight, budget-tier model meant to replace Haiku for cheap high-volume tasks", correct: false },
    { id: 'c', label: "An optional preview model you have to opt into with a flag; the old Opus stays the default", correct: false },
    { id: 'd', label: "A renamed build of Opus 4.8 with no change to context size or capability, just a version bump", correct: false },
  ],
  passFeedback: "HIT! The changelog is explicit: Opus 5 (`claude-opus-5`) is the *new default* Opus model, with a 1M-token context window and fast mode at $10/$50 per Mtok. You don't opt in — it's the Opus you get by default.",
  failFeedback: "MISS! It's not a budget tier, not opt-in, and not a cosmetic rename. Opus 5 is the new default Opus model with 1M context and $10/$50 fast-mode pricing. Re-read Book 1.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**Claude Opus 5 — The New Engine Becomes the Default**

**What actually shipped**

The 2.1.219 changelog line is short and precise: *"Added Claude Opus 5 (\`claude-opus-5\`), now the default Opus model — 1M context, fast mode at $10/$50 per Mtok."* Unpack that and there are four separate facts. The model exists and its id is \`claude-opus-5\`. It is now the *default* Opus model, which means you are not opting into a preview — when you reach for the Opus tier, this is what you get. Its context window is a full million tokens. And in fast mode it is priced at $10 per million input tokens and $50 per million output tokens.

**"Default" is the word that matters**

Plenty of releases add a model you have to go find and switch on. This one changes what "Opus" *means* going forward. Existing sessions and settings that point at the Opus tier inherit the new engine without you touching a thing. That's convenient, but it's also a reason to read the rest of this room: your baseline capability and your baseline cost per token both just moved, and you should know in which direction before your next invoice lands.

**The pricing shape, read plainly**

The $10/$50 split follows the usual pattern — output tokens cost roughly five times what input tokens do, because generating is the expensive half. Anthropic's own framing on the launch is that Opus 5 is a "step change improvement for the Opus tier powering long-running agents," delivered at a lower cost per task than the model it replaces. So the headline isn't just "bigger" — it's more capability per dollar than the Opus you were using last week.

> Takeaway: Opus 5 (\`claude-opus-5\`) is now the *default* Opus model — a 1M-token window at $10/$50 fast-mode pricing — so the Opus tier you already use quietly got stronger and cheaper per task.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**When to Spend on Opus — Picking the Tier for the Engagement**

**The gains are concentrated in hard, long-running work**

Book 1 told you *what* Opus 5 is; this is *when* to reach for it. Anthropic's launch numbers are specific about where the jump shows up. On Frontier-Bench v0.1 the model "more than doubles Opus 4.8's performance at a lower cost per task." On ARC-AGI 3, a novel problem-solving evaluation, its score is "three times as high as the next-best model." On Zapier's AutomationBench its pass rate is "around 1.5x the next-best model for the same cost per task." Notice the shape: the wins pile up on *difficult reasoning and multi-step automation*, not on trivial one-liners.

**Reach for Opus when the task can fail quietly**

That tells you when the Opus tier earns its price on a client's clock. A throwaway rename or a quick file read doesn't need frontier reasoning — a cheaper tier clears it fine. But a gnarly refactor across a legacy module, an agent you're going to leave running unattended, or an automation that has to get every step right before it hands off — that is exactly the work where doubled capability keeps a silent mistake out of your deliverable. The launch notes call out that Opus 5 "checks its own work the way a real frontend developer would," catching issues before delivery rather than after.

**The consultant's rule of thumb**

Match the model to the stakes the way you match the permission mode to the risk. High-stakes, long-horizon, or unattended work goes to Opus, where the reasoning headroom and the self-verification pay for themselves. Routine, well-scoped, high-volume work can drop to a lighter tier and save the budget for where it counts. The skill isn't "always use the biggest model" — it's knowing which tasks deserve one.

> Takeaway: Spend Opus 5 on the hard, long-running, unattended work where its doubled reasoning and self-checking keep quiet mistakes out of the deliverable — and drop to a lighter tier for routine tasks.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `I'm about to kick off ____ for a client, and it's going to run for a while
with real stakes if it gets a step wrong.
Because the task is ____, I want the tier with the reasoning headroom,
so I'll point this session at ____ (the new default Opus model).
For the ____ I'll do afterward, I'll drop back to a lighter tier to save budget.`,
    blanks: [
      { id: 'engagement', suggestions: ['a multi-step migration agent', 'an unattended overnight refactor', 'a complex automation build'] },
      { id: 'difficulty', suggestions: ['long-running and easy to get subtly wrong', 'high-stakes reasoning across a legacy module', 'a multi-step chain that must not fail mid-way'] },
      { id: 'model', suggestions: ['claude-opus-5', 'the Opus tier', 'Opus 5'] },
      { id: 'cheap-work', suggestions: ['quick file reads and renames', 'routine boilerplate cleanup', 'high-volume low-stakes edits'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "Claude Opus 5 (`claude-opus-5`) shipped in 2.1.219 as the *new default* Opus model — a 1M-token context window with fast-mode pricing of $10/$50 per Mtok. \"Default\" is the key word: you don't opt in, the Opus tier you already use just became this engine. Anthropic frames it as a step change for long-running agents, delivered at a lower cost per task; its benchmark wins concentrate on hard reasoning and multi-step automation (more than doubling Opus 4.8 on Frontier-Bench, 3x the next-best on ARC-AGI 3, ~1.5x on Zapier AutomationBench). The consultant's move is to match the tier to the stakes: spend Opus on high-stakes, long-horizon, unattended work where its self-checking keeps quiet mistakes out of the deliverable, and drop to a lighter tier for routine, high-volume tasks.",
      beats: [
        { kind: 'say', text: "Top story this week is a new engine, not a new command. Claude Opus 5 shipped — the id is `claude-opus-5` — and the changelog says it plainly: it's now the *default* Opus model. That word 'default' is the whole story. You didn't have to go turn anything on." },
        { kind: 'say', text: "Two specs to carry: a million-token context window, and fast-mode pricing at $10 per million input tokens, $50 per million output. The five-to-one split is normal — generating text is the expensive half. What's new is that the Opus tier you were already reaching for is quietly this engine now." },
        { kind: 'say', text: "Anthropic's own framing on launch day was a 'step change improvement for the Opus tier powering long-running agents' — and, crucially, at a *lower cost per task* than the Opus it replaces. So it's not just bigger. It's more capability per dollar than last week's Opus." },
        {
          kind: 'choice',
          prompt: "Quick check before we get to the 'when.' What's the single most important word in that changelog line?",
          options: [
            { id: 'default', label: "'default' — the Opus tier you already use is now this model, no opt-in", correct: true, reaction: "Right. A lot of releases add a model you have to hunt for and switch on. This one changed what 'Opus' means going forward — your existing Opus sessions inherit it automatically." },
            { id: 'million', label: "'1M' — the context window is all that changed", correct: false, reaction: "The million-token window is real and useful, but it's not the headline. 'Default' is — because it means the change reaches you whether or not you go looking for it." },
            { id: 'price', label: "'$10/$50' — it's mainly a pricing announcement", correct: false, reaction: "The pricing matters for your invoice, but it's not the point. The point is 'default': this is the Opus you now get by default, stronger and cheaper per task than before." },
          ],
        },
        { kind: 'say', text: "Now the part that actually earns its keep: *when* to spend it. The benchmark wins aren't spread evenly. On Frontier-Bench it more than doubles Opus 4.8. On ARC-AGI 3 — a novel problem-solving test — it scores three times the next-best model. On Zapier's AutomationBench, about 1.5x the next-best for the same cost per task. See the pattern? Hard reasoning and multi-step automation." },
        { kind: 'say', text: "So match the model to the stakes, the way you already match permission mode to risk. A quick rename or a file read? A lighter tier clears it and saves budget. A gnarly refactor across a legacy module, or an agent you'll leave running unattended? That's Opus country — the launch notes say it 'checks its own work the way a real frontend developer would,' catching problems before delivery instead of after." },
        { kind: 'say', text: "The books lay out the four facts in that changelog line and the consultant's rule of thumb for tier selection. The door just wants to know what Opus 5 actually *is* per that announcement — nail it and the key drops. And mind the skeleton past it; it swears on its bones it's never once forgotten a task, and with a million tokens of memory it might even be telling the truth." },
      ],
    },
  },
  battle: {
    name: 'Ossian, the Millionfold Warden',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*bones knit together with a dry rattle, and behind the sockets a cold light flickers like a context window filling to the brim* …a million tokens I hold, operator… every file, every turn, nothing lost… I am the default now, the one you get whether you asked or not… name me true, or be forgotten yourself…",
    tauntLines: [
      "*the warden's skull tilts* you think I'm a preview you can dodge? a flag you can leave off? I am what 'Opus' *means* now — there is no old model waiting behind me…",
      "*a laugh like dice in a cup* budget tier? cheap and small? look at the light in my skull — a MILLION tokens, and I doubled the one who came before me at a lower cost per task… you insult the dead…",
    ],
    victoryLine: "*the cold light steadies into something almost like respect* …you read the line as written… the new default, a million-token mind, ten and fifty a measure… take the key, operator, and spend me where the stakes are worth it…",
    questions: [
      {
        prompt:
          "The 2.1.219 changelog announces Claude Opus 5. According to that line, what is it?",
        choices: [
          { id: 'a', label: "The new default Opus model (`claude-opus-5`) with a 1M-token context window and fast-mode pricing of $10/$50 per Mtok", correct: true },
          { id: 'b', label: "A lightweight, budget-tier model meant to replace Haiku for cheap high-volume tasks", correct: false },
          { id: 'c', label: "An optional preview model you have to opt into with a flag; the old Opus stays the default", correct: false },
          { id: 'd', label: "A renamed build of Opus 4.8 with no change to context size or capability, just a version bump", correct: false },
        ],
        passFeedback: "HIT! The changelog is explicit: Opus 5 (`claude-opus-5`) is the *new default* Opus model, with a 1M-token context window and fast mode at $10/$50 per Mtok. You don't opt in — it's the Opus you get by default.",
        failFeedback: "MISS! It's not a budget tier, not opt-in, and not a cosmetic rename. Opus 5 is the new default Opus model with 1M context and $10/$50 fast-mode pricing. Re-read Book 1.",
      },
    ],
  },
};
