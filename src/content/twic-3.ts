import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — `claude agents` background shell sessions: type `! <command>`
 * to run a shell command as a background session you can attach to and detach from.
 * Final room — door target routes to the TwicStampScreen via currentTrack.
 * Source: Claude Code CHANGELOG 2.1.154 ("`claude agents`: type `! <command>` to
 * run a shell command as a background session you can attach to and detach from").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Room 3 — last beat of the issue. The Beat Reporter saved a quiet productivity tool for the finale: inside `claude agents`, you can type `! <command>` to run a shell command as a background session you can attach to and detach from. No more sitting on your hands while a twenty-minute build crawls. Read the two books on the desk for how the background session works and when a consultant kicks one off, then settle with the wyrm in the doorway — it lives to keep you pinned, watching a progress bar. Clear it and the issue stamp drops.",
  prompt:
    "Inside `claude agents`, you type `! npm run build:all` and your build kicks off. What just happened, and what can you do next?",
  choices: [
    { id: 'a', label: 'It ran the command as a background session — you can detach and keep working, then attach later to check on it', correct: true },
    { id: 'b', label: 'It defined a new custom subagent named after the command for you to invoke later', correct: false },
    { id: 'c', label: 'It ran the command once in the foreground and blocked your session until it finished', correct: false },
    { id: 'd', label: 'It permanently aliased `!` to that command for every future session', correct: false },
  ],
  passFeedback: 'HIT! In `claude agents`, `! <command>` runs the command as a background session — you detach and keep working, then attach back whenever you want to watch its progress or output.',
  failFeedback: "MISS! It doesn't define a subagent, doesn't block the foreground, and doesn't set a permanent alias. It launches a backgrounded shell session you can attach to and detach from — re-read the books.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**! <command> — A Background Session for the Work That Takes a While**

**The escape from staring at a progress bar**

Some commands finish in a blink; others — a full build, a long test suite, a data import, a dev server — run for minutes or hold open indefinitely. Run one in the foreground and it owns your session until it's done; you're stuck watching it. The Opus 4.8 release added a cleaner path inside *\`claude agents\`*: type *\`! <command>\` to run a shell command as a background session you can attach to and detach from*. The command starts working, and you don't have to stand there while it does.

**Attach and detach, on your terms**

The two verbs are the whole feature. *Detach* and the session keeps running on its own while you go back to the rest of your work — the long job isn't blocking you anymore. *Attach* and you drop back into that same session to see its output, check how far it's gotten, or interact with it. You move in and out of the running command freely, instead of being held hostage by it from the moment it starts to the moment it ends.

**One session, many running things**

Because each backgrounded command is its own session you can step into and out of, you're no longer limited to one thing happening at a time. The build can be churning in the background while you keep reasoning through the next change; the dev server can stay up in its own session while you work against it. The model is closer to a workspace with several burners going than a single line you have to wait out.

> Takeaway: In \`claude agents\`, \`! <command>\` turns a long-running command into a background session — detach to keep working, attach to check in, and stop waiting on the foreground.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Don't Block on the Build — Keeping Momentum on Real Engagements**

**Waiting is the tax nobody budgets for**

Add up the minutes a consultant loses to foreground waiting across a week — the build that takes eight minutes, the integration suite that takes fifteen, the migration that takes half an hour — and it's real time, spent doing nothing but watching. Backgrounding those commands reclaims it. You kick off the slow thing, detach, and immediately keep moving on the part of the work that doesn't depend on it. The long job runs on its own clock instead of on yours.

**The pattern: start it, detach, work, attach to check**

In practice this becomes a rhythm. Hand off the long-running command to a background session and detach. Carry on with the next task — drafting the next change, reviewing a diff, talking through an approach. When you want to know whether the build passed or what the server logged, attach, read, and detach again. It's the same instinct as keeping a long process in its own pane: the work that takes time shouldn't hold the work that doesn't.

**Mind what you've left running**

The flip side of "out of sight" is "out of mind," so keep a little discipline. A background session is still doing real things — writing files, holding a port, hitting an API — so know what you've started and attach back to confirm it actually succeeded rather than assuming it did. Especially on client machines, treat a backgrounded command the way you'd treat any process you launched: started deliberately, checked deliberately, and not left running past the point it's useful.

> Takeaway: Background the slow commands so waiting stops eating your day — kick it off, detach, keep working, and attach to confirm it landed instead of assuming it did.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `I'm about to start ____, which takes a while, and I don't want to sit here watching it.
Inside claude agents, run it as a background session with ! so I can keep working.
Detach once it's going — I'll be ____ in the meantime.
When I ask, attach back so I can ____ without losing my place.
And remind me to confirm it actually ____ rather than assuming it did.`,
    blanks: [
      { id: 'task', suggestions: ['the full release build', 'the integration test suite', 'the overnight data migration'] },
      { id: 'meanwhile', suggestions: ['drafting the next change', 'reviewing the open diff', 'writing up the handoff notes'] },
      { id: 'check', suggestions: ['check whether it passed', 'read the latest output', 'see how far it got'] },
      { id: 'landed', suggestions: ['finished cleanly', 'succeeded end to end', 'completed without errors'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "Inside `claude agents` (shipped in the Opus 4.8 release), typing `! <command>` runs that shell command as a background session you can attach to and detach from. Detach and the long job keeps running while you work on something else; attach to check its output or progress, then detach again — so a slow build or test suite never blocks your session. The consultant pattern is start-it, detach, keep working, attach to confirm. Treat a backgrounded command like any process you launched: know what's running and attach back to verify it actually succeeded.",
      beats: [
        { kind: 'say', text: "Last beat of the issue, and it's the quiet productivity one: inside `claude agents`, type `! <command>` and it runs that shell command as a *background session* you can attach to and detach from." },
        { kind: 'say', text: "Picture the thing it kills: the full build, the long test suite, the dev server, the half-hour migration. Run any of those in the foreground and it owns your session until it's done — you're just sitting there. Background it and you're free the moment it starts." },
        { kind: 'say', text: "The two verbs are the whole feature. *Detach* and the session keeps running on its own while you go do other work. *Attach* and you drop back in to read its output, check progress, or poke at it. You move in and out freely instead of being held hostage by the command." },
        {
          kind: 'choice',
          prompt: "Quick check — when you type `! npm run build` inside claude agents, what did you just do?",
          options: [
            { id: 'subagent', label: 'Defined a new custom subagent named after the build command', correct: false, reaction: "Nope — different feature. This isn't about defining subagents. The `!` just runs a shell command as a background session you can step into and out of." },
            { id: 'background', label: 'Launched the build as a background session you can detach from and attach back to', correct: true, reaction: "Right. It's running on its own now. Detach and keep working; attach when you want to see how the build's doing. The long job runs on its clock, not yours." },
            { id: 'foreground', label: 'Ran it in the foreground, blocking until it finishes', correct: false, reaction: "That's the exact thing it saves you from. Foreground would pin you watching the bar. The `!` backgrounds it so you don't have to wait it out." },
          ],
        },
        { kind: 'say', text: "Because each backgrounded command is its own session, you're not stuck with one thing at a time. The build churns in the background while you reason through the next change; the dev server stays up in its session while you work against it. Several burners going, not one line you wait out." },
        { kind: 'say', text: "Consultant rhythm: start the slow thing, detach, keep moving on whatever doesn't depend on it, and attach to check when you care. Add up the foreground waiting across a week — builds, suites, migrations — and it's real hours. This reclaims them." },
        { kind: 'say', text: "One discipline, though: out of sight can't mean out of mind. A background session is still writing files or holding a port, so attach back and confirm it actually succeeded instead of assuming — especially on a client's machine. The books have the rest. Clear the door and the issue stamp is yours." },
      ],
    },
  },
  battle: {
    name: 'Stall, the Foreground Drake',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*coils across the only exit and starts a glacially slow countdown* …your build's running… in the foreground… so you'll just sit here with me… and watch… every… percent…",
    tauntLines: [
      "*exhales a progress bar that crawls one notch* where do you think you're going? the command isn't done, so neither are you…",
      "*blocks the door with its bulk* one thing at a time, little operator — start it, wait for it, then maybe the next… that's the only way, isn't it…?",
    ],
    victoryLine: "*slumps aside as you simply detach and walk past* …you backgrounded it… and just… left… fine, the door's yours, take the stamp…",
    questions: [
      {
        prompt:
          "Inside `claude agents`, you type `! npm run build:all` and your build kicks off. What just happened, and what can you do next?",
        choices: [
          { id: 'a', label: 'It ran the command as a background session — you can detach and keep working, then attach later to check on it', correct: true },
          { id: 'b', label: 'It defined a new custom subagent named after the command for you to invoke later', correct: false },
          { id: 'c', label: 'It ran the command once in the foreground and blocked your session until it finished', correct: false },
          { id: 'd', label: 'It permanently aliased `!` to that command for every future session', correct: false },
        ],
        passFeedback: 'HIT! In `claude agents`, `! <command>` runs the command as a background session — you detach and keep working, then attach back whenever you want to watch its progress or output.',
        failFeedback: "MISS! It doesn't define a subagent, doesn't block the foreground, and doesn't set a permanent alias. It launches a backgrounded shell session you can attach to and detach from — re-read the books.",
      },
    ],
  },
};
