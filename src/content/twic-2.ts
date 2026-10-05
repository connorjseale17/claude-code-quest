import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — the `You should know` built-in Claude Mod. 2.1.287 adds
 * Claude Mods (plugins that may modify deeper behavior) and ships a built-in one
 * called "You should know": a side agent that rides along with your session,
 * watches your back, and flags things you missed. It is off by default; you turn
 * it on with `/plugin enable cc-plugin-you-should-know@builtin`. It flags — it
 * does not silently apply fixes; you stay the operator.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.287: "Added Claude Mods: plugins may now modify
 *     deeper behavior"
 *   - Claude Code CHANGELOG 2.1.287: "Added You should know built-in mod where
 *     side agent watches your back and flags missed things; enable with
 *     `/plugin enable cc-plugin-you-should-know@builtin`"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room two, and the Beat Reporter steps wide around a wraith made of all the things people walked past without noticing. This week's item is a quiet second pair of eyes: 2.1.287 introduces Claude Mods — plugins that reach deeper into how Claude Code behaves — and ships a built-in one called `You should know`, a side agent that rides along with your session, watches your back, and flags the things you missed. One book covers the mechanic — what a mod is and how you switch this one on; the other, why a watcher earns its keep on a solo engagement where no one's reviewing behind you. Take the key from the door, then face Slipgeist, the haunt that feeds on everything you overlooked.",
  prompt:
    "You run `/plugin enable cc-plugin-you-should-know@builtin`. What does the `You should know` mod do for your session?",
  choices: [
    { id: 'a', label: "Runs a side agent alongside your work that watches your back and flags the things you missed", correct: true },
    { id: 'b', label: "Swaps your main model for a smaller one to cut the cost of routine turns", correct: false },
    { id: 'c', label: "Posts your session's activity to a shared team channel for group review", correct: false },
    { id: 'd', label: "Silently applies any fix it thinks you forgot, without telling you about it", correct: false },
  ],
  passFeedback: "HIT! `You should know` is a built-in Claude Mod: a side agent rides along with your session, watches your back, and flags what you missed — a second set of eyes you turn on with one command.",
  failFeedback: "MISS! It doesn't change your model, publish your session, or apply fixes on its own. It's a side agent that watches and *flags* what you overlooked — you still decide. Re-read Book 1.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**\`You should know\` — Turning On the Side Agent That Watches Your Back**

**A mod, not just a plugin**

2.1.287 adds a new category called *Claude Mods*: plugins that may modify deeper behavior than ordinary plugins reach. Where a plain plugin adds a command or a tool at the edges, a mod can change how the session itself works underneath you. That's the machinery; the first thing worth doing with it is a built-in mod that Anthropic ships ready-made, so you don't have to write a line of anything to get the benefit — you just switch it on.

**What it does while you work**

The built-in mod is called \`You should know\`, and the name is the pitch. Turn it on and a *side agent* rides along with your main session — a second agent running beside the one doing the work. Its job is to watch your back: as you and Claude move through a task, it keeps an eye on the whole and flags the things you missed. It's not doing the work and it's not in your way; it's the colleague glancing over your shoulder who says "you should know…" at the moment it counts, catching what slipped past while your attention was somewhere else.

**One command to switch it on**

It ships *off* — a watcher you didn't ask for riding every session would be its own kind of noise — so you opt in when you want it. The command is \`/plugin enable cc-plugin-you-should-know@builtin\`: that \`@builtin\` suffix is how Claude Code names the mods it ships in the box, as opposed to ones you install from a marketplace. Run it once and the side agent is live for your session, watching alongside until you turn it back off.

> Takeaway: \`You should know\` is a built-in Claude Mod you enable with \`/plugin enable cc-plugin-you-should-know@builtin\`, and it runs a side agent that rides along, watches your back, and flags the things you missed.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**A Second Set of Eyes on Solo Work — Why a Watcher Earns Its Keep on an Engagement**

**The blind spot is the one you can't see**

The reason review exists at all is that your own blind spots are, by definition, invisible to you. You don't miss things on purpose; you miss them because your attention was legitimately somewhere else — deep in the function you were fixing, so the config you forgot to update never entered your view. A watcher doesn't need to be smarter than you to be useful. It only needs to be looking somewhere you aren't, and to say so out loud. That's the entire value of a second set of eyes, and \`You should know\` is a second set of eyes you can summon on demand.

**Especially when no one's reviewing behind you**

On a team, this role gets filled for free — a colleague reviews your PR, a pair catches your slip in real time. On a solo engagement, nobody does. You are the author *and* the reviewer, and the reviewer is tired and has the same blind spots as the author because they're the same person. That's precisely the situation this mod was built for: the long unattended run, the late-night push with no one else awake, the one-consultant project where the next pair of eyes is the client's and you'd rather it weren't. Switch the watcher on and you buy back some of the review you don't otherwise have.

**A flag, not an autopilot**

Keep one line straight, because it's what keeps you in charge: the mod *flags*, it does not fix. It surfaces what you missed and hands it to you; it doesn't reach in and silently patch things on its own. That's the right design. A watcher that quietly rewrote your work would just be a second author you can't see — a new blind spot, not a cure for the old one. Because it only raises a flag, you stay the operator: you read what it caught, and you decide what, if anything, to do about it.

> Takeaway: On solo or unattended work you are your own reviewer, blind spots and all — so turn on \`You should know\` to borrow a second set of eyes, trusting that it flags what you missed and leaves the decision with you.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `I'm the only one on this engagement — no teammate reviewing behind me, no pair to catch my slips.
So I borrow a second set of eyes: I run ____.
Now a ____ rides along with my session and ____ as I work.
When it surfaces something, I still ____ — it flags, it doesn't fix.
It's the review I'd otherwise only get from a colleague I don't have on this job.`,
    blanks: [
      { id: 'enable-cmd', suggestions: ['`/plugin enable cc-plugin-you-should-know@builtin`', 'the You should know mod', 'the built-in watcher'] },
      { id: 'side-agent', suggestions: ['side agent', 'second agent', 'watcher agent'] },
      { id: 'flags', suggestions: ['flags the things I missed', 'watches my back', 'catches what I overlooked'] },
      { id: 'decide', suggestions: ['decide what to do', 'make the call', 'stay the operator'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "The `You should know` built-in Claude Mod (Claude Code 2.1.287): 2.1.287 adds Claude Mods — plugins that modify deeper session behavior — and ships a built-in one called `You should know`. It runs a side agent that rides along with your main session, watches your back, and flags the things you missed. It's off by default; enable it with `/plugin enable cc-plugin-you-should-know@builtin` (the `@builtin` suffix marks the mods Claude Code ships in the box). Crucially, it FLAGS, it does not silently fix — you stay the operator and decide what to do with what it catches. For a consultant: your blind spots are invisible to you by definition, and on a solo or unattended engagement no colleague fills the reviewer role — so turning on the watcher buys back a second set of eyes you otherwise wouldn't have.",
      beats: [
        { kind: 'say', text: "Room two, and it's about the thing you can't do for yourself: see your own blind spots. By definition you can't — you don't miss things on purpose, you miss them because your attention was honestly somewhere else. So this week's item is a second pair of eyes you can switch on." },
        { kind: 'say', text: "2.1.287 adds a new kind of plugin — Claude Mods — that reach deeper into how the session behaves. And it ships a built-in one you don't have to write: `You should know`. Turn it on and a *side agent* runs beside me, watching the whole task while I work the task. When something slips past you, it says so." },
        { kind: 'say', text: "It's off until you ask for it — a watcher riding every session unasked would just be noise. The command is `/plugin enable cc-plugin-you-should-know@builtin`. That `@builtin` is how I name the mods I ship in the box, versus ones you'd install from a marketplace. Run it once and the watcher's live." },
        {
          kind: 'choice',
          prompt: "The watcher spots that you forgot to update a config file the code now depends on. What does it do about it?",
          options: [
            { id: 'flags', label: "Flags it for you and leaves the fix to you", correct: true, reaction: "Right. It flags, it doesn't fix. It surfaces what you missed and hands it over — you stay the operator and decide what to do." },
            { id: 'fixes', label: "Silently patches the config itself and moves on", correct: false, reaction: "No — and that'd be the wrong design. A watcher that quietly rewrote your work is just a second author you can't see. It raises the flag; the decision's yours." },
            { id: 'stops', label: "Halts the whole session until you deal with it", correct: false, reaction: "It doesn't block you. It's a flag riding alongside, not a gate across the road — you keep working and choose when to act on what it caught." },
          ],
        },
        { kind: 'say', text: "Why it matters on an engagement: on a team, this role fills itself — someone reviews your PR, a pair catches the slip live. Solo? Nobody. You're author and reviewer both, and the reviewer's tired and shares every blind spot the author has, because they're the same person." },
        { kind: 'say', text: "That's exactly the gap it's built for — the long unattended run, the late push with no one else awake, the one-consultant project where the next pair of eyes is the *client's* and you'd rather it weren't. Switch the watcher on and you buy back some of the review you don't otherwise have." },
        { kind: 'say', text: "One line to keep straight, and it's the one that keeps you in charge: it flags, it never fixes on its own. You read what it caught; you make the call. The books have the mechanic and the solo-work read both. Answer the door for the key — then face Slipgeist, a haunt woven from everything people overlooked. Name what the watcher really does, and watch it thin." },
      ],
    },
  },
  battle: {
    name: 'Slipgeist, the Thing You Missed',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a pale wraith coalesces out of the dim — stray unsaved edits, a forgotten config, a test nobody ran — all the overlooked things stitched into one shape* …I am everything that slipped past you while you looked elsewhere… I thrive where no second eye watches… you claim you've summoned one, a side agent that sees what you cannot? …tell me true what \`You should know\` does when it catches me, before I thicken in your blind spot again.",
    tauntLines: [
      "*flickers, mocking* you think your watcher *silently mends* what it finds — reaches in and patches the thing you forgot, unasked? no… it only *flags*, it does not fix; a watcher that rewrote your work would be a new blind spot, not a cure for the old…",
      "*swells toward the unwatched corner* you'd have it *change your very model*, trade your mind for a lesser one to save a coin? never… it is a second set of eyes riding alongside, nothing swapped, nothing diminished — it watches, and it speaks…",
    ],
    victoryLine: "*Slipgeist thins as the side agent's gaze falls across the corner it was hiding in* …seen… a watcher that rides along and *names* me instead of letting me grow… flags what you missed, leaves the mending to you… I cannot thicken where a second eye is open… take the key, operator, and keep the watch lit.",
    questions: [
      {
        prompt:
          "You run `/plugin enable cc-plugin-you-should-know@builtin`. What does the `You should know` mod do for your session?",
        choices: [
          { id: 'a', label: "Runs a side agent alongside your work that watches your back and flags the things you missed", correct: true },
          { id: 'b', label: "Swaps your main model for a smaller one to cut the cost of routine turns", correct: false },
          { id: 'c', label: "Posts your session's activity to a shared team channel for group review", correct: false },
          { id: 'd', label: "Silently applies any fix it thinks you forgot, without telling you about it", correct: false },
        ],
        passFeedback: "HIT! `You should know` is a built-in Claude Mod: a side agent rides along with your session, watches your back, and flags what you missed — a second set of eyes you turn on with one command.",
        failFeedback: "MISS! It doesn't change your model, publish your session, or apply fixes on its own. It's a side agent that watches and *flags* what you overlooked — you still decide. Re-read Book 1.",
      },
    ],
  },
};
