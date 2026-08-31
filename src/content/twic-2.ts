import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — the `PreModelSwitch` and `PostModelSwitch` hook events.
 * Claude Code adds two hook events that fire around a model switch, letting you
 * block, confirm, or annotate the change: `PreModelSwitch` runs before the swap
 * (where a block or a confirm prompt is meaningful), `PostModelSwitch` runs once
 * it has taken effect (where you record or react to it).
 * Source (Claude Code CHANGELOG 2.1.251):
 *   - "Added `PreModelSwitch` and `PostModelSwitch` hook events (block, confirm,
 *      or annotate a model switch)."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2, and the Beat Reporter is standing at a gearshift — the lever that swaps which model is driving your session — with a hand resting on it, not pushing yet. The 2.1.251 release adds two hook events, `PreModelSwitch` and `PostModelSwitch`, that fire around exactly this moment: the pair lets you *block, confirm, or annotate* a model switch instead of learning about it after the fact. The two books cover how the before-and-after hooks split the job and why a consultant governing a fleet wants a say at the instant the engine changes. Answer the door's question for the key — then face what guards it, a wraith that lives in the half-second between one model and the next.",
  prompt:
    "What do the new `PreModelSwitch` and `PostModelSwitch` hook events let you do?",
  choices: [
    { id: 'a', label: "Run your own policy around a model switch — block it, require confirmation, or annotate it — with `PreModelSwitch` firing before the swap and `PostModelSwitch` after", correct: true },
    { id: 'b', label: "Set a soft default model that new sessions start on, which a manual `/model` pick still overrides", correct: false },
    { id: 'c', label: "Automatically fall back to a cheaper model whenever a request returns a 404 or a rate-limit error", correct: false },
    { id: 'd', label: "Compact the conversation whenever the model changes, so the full context carries cleanly across the swap", correct: false },
  ],
  passFeedback: "HIT! They're hook events around a model change: `PreModelSwitch` can block, confirm, or annotate the switch *before* it happens, and `PostModelSwitch` fires once it has. That's your own policy running at the moment models change.",
  failFeedback: "MISS! They're not a default-model setting, a 404 fallback, or an auto-compact — they're hooks that let you block, confirm, or annotate a model switch. Re-read Book 1.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**\`PreModelSwitch\` and \`PostModelSwitch\` — A Hook on the Moment the Engine Changes**

**Two events bracketing one action**

A *hook* in Claude Code is a piece of your own logic that fires on a named event in the session's life. The 2.1.251 release adds two new ones aimed at a single moment — the model switch — and names them for their timing. \`PreModelSwitch\` fires *before* the session changes models; \`PostModelSwitch\` fires *after* the change has taken effect. Between them they wrap the swap, so you get a say going in and a record coming out.

**Block, confirm, or annotate**

The release note lists three things these hooks can do to a switch: *block, confirm, or annotate*. Those map naturally onto the timing. A **block** stops the switch from happening at all — most useful on \`PreModelSwitch\`, since once the model has already changed there's nothing left to prevent. A **confirm** interposes a checkpoint, turning a silent swap into one that has to be acknowledged before it proceeds. And an **annotate** attaches a note or a record to the event — the natural job for \`PostModelSwitch\`, which fires once the change is real and worth logging. One hook is the gate; the other is the ledger.

**Why a hook and not a setting**

The reason this ships as hooks rather than a config toggle is that a hook runs *your code* at the decision point, so the policy can be as smart as you need. A setting can only say "the default is X." A \`PreModelSwitch\` hook can look at *which* model is being switched to, decide whether that's allowed under whatever rule you care about, and block or wave it through accordingly. The event doesn't hand you a fixed behavior; it hands you the moment, and you decide what happens in it.

> Takeaway: \`PreModelSwitch\` and \`PostModelSwitch\` are hook events that bracket a model change — the first can block or confirm the switch before it happens, the second annotates it after — so your own policy runs at the instant the engine changes.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Governing the Gearshift — Model Policy Across a Fleet and an Engagement**

**From "which model" to "who decides when it changes"**

Book 1 was the mechanism; here's why a consultant cares. On a serious engagement the question isn't only *which* model you run — it's who gets to change it, and whether anyone finds out when they do. A mid-session jump to a heavier model can quietly reshape the cost and the behavior of a run you told a client was fixed. The model-switch hooks turn that from something that happens *to* you into something that happens *through* a rule you wrote. You're no longer discovering the swap in the bill; you're standing at the lever when it moves.

**The block-and-confirm play on a budgeted run**

The concrete move is a \`PreModelSwitch\` hook that enforces the engagement's model policy at the moment of the switch. On a fixed-scope job you might block any switch to a pricier tier outright, so an unattended session can't wander onto an expensive engine while you're out of the room. On a looser one you might soften that to a confirm — the switch is allowed, but someone has to acknowledge it first, which is enough to stop an accidental gearshift while still letting a deliberate one through. Same event, two strictnesses; you pick the one the contract calls for.

**The audit trail nobody has to remember to keep**

\`PostModelSwitch\` earns its place on the other side. Because it fires every time a change actually lands, an annotate hook there writes the record for you — which model, when, in which session — without anyone remembering to note it. On a regulated client or a disputed invoice, "here is every model this engagement ran and exactly when it changed" is the kind of receipt you're very glad to have and miserable to reconstruct after the fact.

> Takeaway: Use \`PreModelSwitch\` to enforce an engagement's model policy at the lever — block or confirm the swap — and \`PostModelSwitch\` to keep an automatic audit trail of every change, so a fleet's engines change only by rule and always on the record.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `This client engagement is fixed-scope, so no session should quietly jump to a pricier model, and every model change has to be on the record.
So I'll add a ____ hook that ____ any switch to a heavier tier before it happens.
On the looser workstreams I'll soften that to a ____ instead, so a deliberate change still gets through.
And I'll add a ____ hook to ____ every switch after it lands, for the audit trail.`,
    blanks: [
      { id: 'pre-hook', suggestions: ['`PreModelSwitch`', 'pre-switch', 'before-switch'] },
      { id: 'block-verb', suggestions: ['blocks', 'stops', 'refuses'] },
      { id: 'confirm', suggestions: ['confirm', 'confirmation checkpoint', 'require-acknowledgement step'] },
      { id: 'post-hook', suggestions: ['`PostModelSwitch`', 'post-switch', 'after-switch'] },
      { id: 'annotate', suggestions: ['annotate', 'record', 'log'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "The `PreModelSwitch` and `PostModelSwitch` hook events (2.1.251): two hooks that fire around a model change and let you block, confirm, or annotate it. `PreModelSwitch` runs before the swap — the right place for a block (stop it entirely) or a confirm (make someone acknowledge it first), since once the model has changed there's nothing left to prevent. `PostModelSwitch` runs after the change lands — the right place to annotate, i.e. write the record. They ship as hooks rather than a setting because a hook runs your own code at the decision point, so the policy can inspect which model is being switched to and decide. For a consultant: enforce a fixed-scope engagement's model policy at the lever (block a jump to a pricier tier, or confirm it on looser work) and keep an automatic audit trail of every switch.",
      beats: [
        { kind: 'say', text: "This week's pick is two new hook events, and they're both about one moment: the model switch. `PreModelSwitch` fires *before* the session changes models. `PostModelSwitch` fires *after* the change takes effect. Together they bracket the swap — a say going in, a record coming out." },
        { kind: 'say', text: "The release note gives them three verbs: they can *block, confirm, or annotate* a model switch. And those line up with the timing. A block stops the switch cold — only meaningful before it happens. A confirm makes someone acknowledge it first. An annotate attaches a note — the natural job once the change is already real." },
        { kind: 'say', text: "So think of it as one hook being the gate and the other being the ledger. `PreModelSwitch` is where you *prevent* or *checkpoint*. `PostModelSwitch` is where you *record*. Same swap, two sides of it." },
        {
          kind: 'choice',
          prompt: "You want to hard-stop any switch to a pricier model on a fixed-budget run. Which hook does the stopping, and why that one?",
          options: [
            { id: 'pre-blocks', label: "`PreModelSwitch` — it fires before the swap, so a block can actually prevent it", correct: true, reaction: "Right. A block only means something while the change hasn't happened yet. `PreModelSwitch` is that window — it can look at which model you're switching to and refuse it before the engine ever changes." },
            { id: 'post-blocks', label: "`PostModelSwitch` — it fires after, so it can catch the switch and undo it", correct: false, reaction: "Not quite. By the time `PostModelSwitch` fires the change has already taken effect — its job is to record or react, not to prevent. The stopping happens *before*, in `PreModelSwitch`." },
            { id: 'either', label: "Either one — both can block a switch equally well", correct: false, reaction: "They're not interchangeable. A block is only useful before the swap, which is `PreModelSwitch`'s window. `PostModelSwitch` fires after the fact, where annotate — keeping the record — is the natural move." },
          ],
        },
        { kind: 'say', text: "Here's why it's a hook and not just a setting. A setting can only say 'the default model is X.' A `PreModelSwitch` hook runs *your* code at the moment of the switch — it can look at which model is being switched to and decide under whatever rule the engagement needs. The event hands you the moment; you decide what happens in it." },
        { kind: 'say', text: "The consulting play: on a fixed-scope job, a `PreModelSwitch` hook blocks any jump to a heavier tier, so an unattended session can't wander onto an expensive engine while you're away. On looser work, soften it to a confirm — deliberate switches still get through, accidental ones get caught." },
        { kind: 'say', text: "And the other side pays off too. Because `PostModelSwitch` fires every time a change lands, an annotate hook writes the audit trail for you — which model, when, in which session — with nobody remembering to note it. On a regulated client or a disputed invoice, that receipt is gold." },
        { kind: 'say', text: "The books have the rest. The door asks one thing: what do these two hooks let you do? Answer for the key. Then face Swapshade past it — a wraith that haunts the half-second between one model and the next, and insists it can undo a swap that already happened." },
      ],
    },
  },
  battle: {
    name: 'Swapshade, the Gearshift Wraith',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a pale wraith flickers over the model lever, half here and half already gone* …I live in the flicker between one engine and the next, operator… two watchers now stand at my lever, one before me and one behind… tell me what those two are *for*, or drift here in the flicker with me…",
    tauntLines: [
      "*flickers backward* a *default*, you thought? a soft setting a `/model` pick shrugs off? no — these are hooks, they *run*, they can refuse me outright at the lever…",
      "*re-forms after the swap* undo it from *behind*, you said — catch the switch once it's landed and reverse it? too late, that one only *records*… the stopping happens before, or not at all…",
    ],
    victoryLine: "*Swapshade stills, caught cleanly by the hook before it could flicker* …you knew which watcher does the stopping and which one keeps the ledger… before me a gate, behind me a record… take the key, and govern the gearshift…",
    questions: [
      {
        prompt:
          "What do the new `PreModelSwitch` and `PostModelSwitch` hook events let you do?",
        choices: [
          { id: 'a', label: "Run your own policy around a model switch — block it, require confirmation, or annotate it — with `PreModelSwitch` firing before the swap and `PostModelSwitch` after", correct: true },
          { id: 'b', label: "Set a soft default model that new sessions start on, which a manual `/model` pick still overrides", correct: false },
          { id: 'c', label: "Automatically fall back to a cheaper model whenever a request returns a 404 or a rate-limit error", correct: false },
          { id: 'd', label: "Compact the conversation whenever the model changes, so the full context carries cleanly across the swap", correct: false },
        ],
        passFeedback: "HIT! They're hook events around a model change: `PreModelSwitch` can block, confirm, or annotate the switch *before* it happens, and `PostModelSwitch` fires once it has. That's your own policy running at the moment models change.",
        failFeedback: "MISS! They're not a default-model setting, a 404 fallback, or an auto-compact — they're hooks that let you block, confirm, or annotate a model switch. Re-read Book 1.",
      },
    ],
  },
};
