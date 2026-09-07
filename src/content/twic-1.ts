import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — the `/skill-doctor` command. Claude Code adds a slash
 * command that reports which of your currently loaded skills have gone unused
 * and what each one costs you in context. It is a diagnostic read-out, not an
 * action: it surfaces loaded-but-unused skills and prices their context cost,
 * it does not disable, repair, or install anything.
 * Source (Claude Code CHANGELOG 2.1.261):
 *   - "Added `/skill-doctor` to show which loaded skills go unused and what they
 *      cost in context."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown, and the Beat Reporter is standing over a skeleton bent nearly double under a stack of satchels it hasn't opened in living memory. The 2.1.261 release adds a slash command, `/skill-doctor`, that looks at the skills currently loaded into your session and tells you two things: which of them have gone unused, and what each one is costing you in context. The two books cover exactly what the command reports and why a consultant on a long engagement should audit the dead weight they're carrying. Answer the door's one question for the key — then face the thing that guards it, a skeleton buried under skills it never once reached for.",
  prompt:
    "You run `/skill-doctor` in a session. What does it report?",
  choices: [
    { id: 'a', label: "Which of your currently loaded skills have gone unused, and what each one is costing you in context", correct: true },
    { id: 'b', label: "It repairs broken skill files — fixing malformed frontmatter and filling in missing required fields", correct: false },
    { id: 'c', label: "It disables every skill you aren't actively using, automatically freeing the context for you", correct: false },
    { id: 'd', label: "It scans the marketplace and installs the skills most relevant to your current task", correct: false },
  ],
  passFeedback: "HIT! `/skill-doctor` is a read-out: it names the skills you've loaded that have gone unused and prices each one's context cost. It reports the dead weight — it doesn't remove, repair, or install anything.",
  failFeedback: "MISS! It doesn't fix skill files, auto-disable anything, or install from the marketplace — it *surfaces* which loaded skills are unused and what they cost in context. Re-read Book 1.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**\`/skill-doctor\` — Weighing the Skills You Forgot You Were Carrying**

**A report, not a repair**

Despite the name, \`/skill-doctor\` doesn't operate on anything. It's a read-out. Run it and it looks at the skills currently loaded into your session and tells you two plain facts: which of them have gone *unused*, and what each one is *costing you in context*. Nothing is changed, disabled, or reinstalled — the command simply surfaces the state of what's loaded so you can decide what to do about it. Think of it as stepping on a scale, not going in for surgery.

**What "costs in context" means**

Every skill you load brings instructions with it, and those instructions take up room in the model's context window — the finite budget of text a session can hold at once. A skill you actually invoke earns that room. A skill that sits loaded and never triggers is paying rent on space it isn't using. \`/skill-doctor\` puts a number on that rent, skill by skill, and flags the ones that have gone the whole session without being called on even once.

**Reading the two columns together**

The useful signal is the *intersection* of the two facts. A skill that is both unused and expensive is the clearest candidate to stop loading. A cheap skill you never trigger barely matters; a costly skill you lean on constantly is plainly earning its keep. The command hands you the evidence to tell those cases apart instead of guessing which of a dozen loaded skills is quietly eating your window. That's the whole job: it makes an invisible cost legible, and leaves the decision to you.

> Takeaway: \`/skill-doctor\` is a diagnostic that names your loaded-but-unused skills and prices each one's context cost — it reports the dead weight, it doesn't remove it.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Trimming the Window — Why a Consultant Audits What Loads**

**The window is a budget, and you spend it every turn**

On a real engagement a session fills up fast: the client's files, the running conversation, the tools, and every skill you've pulled in along the way. The context window doesn't stretch to fit all of it — it's a fixed budget, and when it's crowded the model has less room left for the thing you actually care about, the work in front of you right now. Unused skills are the easiest line item to cut, because by definition you're getting nothing back for the space they hold.

**The long-engagement drift**

Skills accumulate quietly. You load one for an infrastructure push in week one, another for a data-cleaning pass in week three, and by week six you're carrying a stack you assembled for tasks that finished long ago. Nobody clears them out, because nobody remembers they're still loaded. \`/skill-doctor\` is the periodic check that makes that drift visible — the prompt to ask, item by item, "am I still using this?" for everything on your back.

**Trim, then confirm**

Treat the report as a to-do list, not a verdict. When it flags a costly, unused skill, stop loading it and watch whether the work still runs clean; if it turns out you need that skill again next week, it's one load away. The discipline is the same one you'd bring to a bloated dependency list: keep what earns its place, drop what doesn't, and re-check on a cadence rather than auditing once and never again. A lean window is a sharper session.

> Takeaway: Loaded context is a budget you spend on every turn — run \`/skill-doctor\` on a cadence, cut the skills that cost the most and do the least, and keep the window clear for the actual work.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `Three weeks into the engagement my session feels heavy and the answers are getting vaguer.
Before I blame the model, I'll run ____ to see what's actually loaded.
It reports which of my loaded ____ have gone ____,
and what each one is costing me in ____.
Then I'll stop loading the expensive, unused ones and ____ to make sure the work still flows.`,
    blanks: [
      { id: 'command', suggestions: ['`/skill-doctor`', 'the `/skill-doctor` command', 'skill-doctor'] },
      { id: 'thing', suggestions: ['skills', 'loaded skills', 'active skills'] },
      { id: 'unused', suggestions: ['unused', 'untriggered all session', 'uncalled'] },
      { id: 'cost', suggestions: ['context', 'the context window', 'my context budget'] },
      { id: 'confirm', suggestions: ['re-check on a cadence', 're-run `/skill-doctor` later', 'watch the next few tasks'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "`/skill-doctor` (2.1.261) is a slash command that reports on the skills currently loaded in your session: which ones have gone unused, and what each one costs you in context. It is a read-out, not an action — it changes nothing, it just surfaces the state so you can decide. The reason it matters: the context window is a fixed budget, and a loaded skill you never trigger is paying rent on space it isn't using. On a long engagement, skills accumulate for tasks that finished weeks ago and nobody clears them out; `/skill-doctor` makes that dead weight visible. The move is to run it on a cadence, stop loading the skills that are both costly and unused, and keep the window clear for the actual work.",
      beats: [
        { kind: 'say', text: "Lead story this week is a health check for your context. The command is `/skill-doctor`, and the first thing to get straight is that it doesn't *do* anything — it *tells* you something. It's a read-out, not a repair." },
        { kind: 'say', text: "What it reads out is the skills you've got loaded right now. For each one it answers two questions: has it gone unused this session, and what is it costing you in context? That second part matters — every skill you load carries instructions, and those instructions take up room in the window whether you ever call on the skill or not." },
        { kind: 'say', text: "So a skill you actually use earns its space. A skill sitting loaded and never triggering is paying rent on room it isn't using. `/skill-doctor` puts a number on that rent, skill by skill, and flags the freeloaders." },
        {
          kind: 'choice',
          prompt: "A colleague says, 'Great, so `/skill-doctor` clears out the skills I'm not using and frees my context automatically?' What's the honest correction?",
          options: [
            { id: 'reports', label: "No — it only *reports* the unused, costly skills; you decide what to stop loading", correct: true, reaction: "Right. It's a scale, not surgery. It hands you the evidence — unused, and this expensive — and leaves the trimming to you. Nothing gets disabled behind your back." },
            { id: 'auto', label: "Yes, exactly — it auto-disables anything you haven't triggered", correct: false, reaction: "That's the trap. It doesn't disable a thing. It surfaces the cost and the usage; the decision to stop loading a skill is yours to make." },
            { id: 'repair', label: "Close — it repairs the skills so they stop wasting context", correct: false, reaction: "No — 'doctor' is misleading. It doesn't fix or rewrite any skill. It's a diagnostic that names the dead weight; it never operates on it." },
          ],
        },
        { kind: 'say', text: "Here's why you'd bother. On a long engagement the session fills up — client files, the conversation, tools, and every skill you pulled in along the way. The window doesn't stretch to fit it; it's a fixed budget, and a crowded one leaves the model less room for the work you actually care about." },
        { kind: 'say', text: "And skills drift in quietly. One for an infra push in week one, another for a data pass in week three, and by week six you're hauling a stack for tasks that are long done. Nobody clears them, because nobody remembers they're loaded. This command is the check that makes that visible." },
        { kind: 'say', text: "The books have the full read. The door asks one thing: what does `/skill-doctor` actually report? Answer for the key — then square up to Ballast past it, a skeleton so buried under unopened satchels it can barely lift its own arms." },
      ],
    },
  },
  battle: {
    name: 'Ballast, the Overloaded',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a skeleton drags itself upright, hung with a dozen bulging satchels, each strap cutting into old bone — none of them opened in an age* …I carry every skill I was ever handed, operator… I have not reached into one of these in a hundred years, yet they weigh on me still… tell me true, so you understand my burden — when you run that command, what does it show you?",
    tauntLines: [
      "*a satchel splits and spills unused scrolls* you thought it would *mend* these, patch the tattered ones? no — it names them, it does not stitch them… nothing here gets repaired…",
      "*bones groan under the load* you thought it would lift the weight *for* me, cut the straps itself? no… it only tells me which sacks are dead weight and what each one costs… the cutting is a living hand's work, never the command's…",
    ],
    victoryLine: "*Ballast reads its own manifest at last, and lets the deadest sacks slide from its shoulders* …unused, and heavy — you saw which was which… a read-out, not a rescue… take the key, and audit your own load before it bends you double…",
    questions: [
      {
        prompt:
          "You run `/skill-doctor` in a session. What does it report?",
        choices: [
          { id: 'a', label: "Which of your currently loaded skills have gone unused, and what each one is costing you in context", correct: true },
          { id: 'b', label: "It repairs broken skill files — fixing malformed frontmatter and filling in missing required fields", correct: false },
          { id: 'c', label: "It disables every skill you aren't actively using, automatically freeing the context for you", correct: false },
          { id: 'd', label: "It scans the marketplace and installs the skills most relevant to your current task", correct: false },
        ],
        passFeedback: "HIT! `/skill-doctor` is a read-out: it names the skills you've loaded that have gone unused and prices each one's context cost. It reports the dead weight — it doesn't remove, repair, or install anything.",
        failFeedback: "MISS! It doesn't fix skill files, auto-disable anything, or install from the marketplace — it *surfaces* which loaded skills are unused and what they cost in context. Re-read Book 1.",
      },
    ],
  },
};
