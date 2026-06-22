import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — `--safe-mode`: launch Claude Code with your own
 * customizations switched off, so you run a vanilla session. Also available as
 * the `CLAUDE_CODE_SAFE_MODE` environment variable for non-interactive runs.
 * Source: Claude Code CHANGELOG 2.1.169 ("`--safe-mode` flag and
 * `CLAUDE_CODE_SAFE_MODE` environment variable for customization disabling").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown. The Beat Reporter is opening with a quiet escape hatch most people don't notice until they badly need it: `--safe-mode`. Launch Claude Code with that flag — or set the matching `CLAUDE_CODE_SAFE_MODE` environment variable — and your own customizations stand down for the run, so you get a plain, vanilla session with nothing you've layered on top. Read the two pages on the desk for how the switch works and why a consultant keeps a clean room handy, then the door asks one question, and the thing guarding the key is wearing every plugin and hook you ever installed.",
  prompt:
    "A colleague says Claude is acting strangely in their repo and can't tell whether it's Claude itself or something in their own setup. They relaunch with `--safe-mode`. What does that actually do?",
  choices: [
    { id: 'a', label: 'It starts the session with their own customizations — skills, hooks, plugins, custom commands — switched off, so they see vanilla Claude Code and can tell whether their config was the cause', correct: true },
    { id: 'b', label: 'It permanently deletes their skills, hooks, and plugins from disk so they have to reinstall everything', correct: false },
    { id: 'c', label: 'It drops Claude into a read-only mode where it can look at files but is forbidden from editing them', correct: false },
    { id: 'd', label: 'It forces the session onto a smaller, safer model for the rest of the run', correct: false },
  ],
  passFeedback: 'HIT! Safe mode boots a vanilla session — your customizations switched off for that run — so anything strange that disappears was coming from your own config, not Claude itself.',
  failFeedback: "MISS! It doesn't delete anything, it isn't a read-only mode, and it doesn't swap models. It just launches with your customizations stood down — re-read the books.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**\`--safe-mode\` — Booting Claude Code With Your Customizations Switched Off**

**A clean room you can launch on demand**

Over time, a working Claude Code setup stops being plain. You accumulate *skills* you wrote, *hooks* that fire on edits and commits, *plugins* you installed from a marketplace, *custom slash commands*, and a settings file tuned to your taste. All of that makes you faster — until the day something behaves oddly and you can't tell whether the culprit is Claude or the scaffolding you built around it. \`--safe-mode\`, which shipped in the 2.1.169 release, is the switch that answers that question: it launches a session with your customizations *stood down*, leaving you with a plain, vanilla Claude Code.

**One flag, or one environment variable**

There are two ways in, and they map to two situations. The \`--safe-mode\` flag is the interactive route — you type it when you start Claude and the session you land in is the bare tool. The \`CLAUDE_CODE_SAFE_MODE\` environment variable is the same idea for the times you aren't typing the command yourself: a CI job, a script, a scheduled run, anywhere the launch is wired up ahead of time. Set the variable and every session that process spawns starts clean, no flag required.

**It stands customizations down — it doesn't tear them out**

The important nuance: safe mode is a *launch choice*, not a destructive one. Nothing is deleted. Your skills, hooks, plugins, and commands are all still on disk exactly where you left them; safe mode simply declines to load them for this run. Quit and relaunch without the flag and your whole setup is back, untouched. That's what makes it cheap to reach for — there's no cleanup afterward, no reinstalling, no risk to the configuration you spent months building.

> Takeaway: \`--safe-mode\` (and \`CLAUDE_CODE_SAFE_MODE\`) boots a vanilla Claude Code with your customizations switched off for that run only — a clean room you can step into and out of with nothing lost.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Keeping a Clean Room — Where \`--safe-mode\` Earns Its Keep**

**Isolating the variable when something goes wrong**

The first time safe mode pays for itself is a debugging moment. Claude does something unexpected — a hook rewrites a file you didn't want touched, a skill keeps firing on the wrong cue, output comes out mangled — and you're stuck guessing whether the tool is broken or your own setup is. Relaunch with \`--safe-mode\` and the question resolves itself in seconds. If the strange behavior *vanishes* in the clean room, it lived in your customizations, and now you know where to look. If it *persists*, your config is innocent and the issue is elsewhere. That's the oldest move in troubleshooting — remove the variables one layer at a time — packaged as a single flag.

**Reproducing what a client actually sees**

On an engagement, your personal setup is a liability when you're trying to reproduce someone else's experience. The client's developer hits a problem in their repo, but you can't trust your own session to mirror theirs, because yours is wrapped in skills and hooks they've never installed. Safe mode lets you stand in their shoes: a vanilla Claude Code, the same baseline they're running, with none of your private tooling coloring the result. "Works on my machine" stops being an excuse when you can drop to the same clean floor they're standing on.

**A trustworthy baseline for handoffs and demos**

There's a third use that's less about bugs and more about honesty. When you demo Claude Code to a client, or hand a repo to their team, you want them to see what *they'll* get, not a performance propped up by your custom commands. Running the demo in safe mode guarantees the thing on screen is the stock tool, reproducible by anyone. It's the difference between showing off your rig and showing the client the floor they'll actually walk in on.

> Takeaway: Reach for safe mode whenever you need to trust the result — debugging your own setup, reproducing a client's session, or demoing the stock tool — and you remove every private variable in one move.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `Something's off — Claude keeps ____ in this repo and I can't tell if it's the tool or my own setup.
Before we debug anything else, relaunch with --safe-mode so my ____ stand down and we're on a vanilla session.
If the behavior ____ in the clean room, we know it was my config and we go hunting there.
If it ____ even in safe mode, my setup is innocent and we look elsewhere.
Either way, nothing of mine gets deleted — safe mode just declines to load it for this run.`,
    blanks: [
      { id: 'symptom', suggestions: ['rewriting files I never asked it to touch', 'firing a hook at the wrong moment', 'producing mangled output'] },
      { id: 'customizations', suggestions: ['hooks and skills', 'plugins and custom commands', 'layered customizations'] },
      { id: 'vanishes', suggestions: ['disappears', 'stops happening', 'clears up'] },
      { id: 'persists', suggestions: ['still happens', 'persists', 'shows up anyway'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "`--safe-mode` (shipped in 2.1.169) launches Claude Code with your own customizations — skills, hooks, plugins, custom commands, tuned settings — switched off, so you get a vanilla session. The `CLAUDE_CODE_SAFE_MODE` environment variable does the same for non-interactive runs like CI. It's a launch choice, not a destructive one: nothing is deleted, and relaunching without the flag brings your whole setup back. Reach for it to isolate whether your own config is causing odd behavior, to reproduce the vanilla session a client actually sees, and to demo or hand off the stock tool honestly.",
      beats: [
        { kind: 'say', text: "First story this week is a small switch with an outsized payoff: `--safe-mode`, in since the 2.1.169 release. Start Claude with that flag and your customizations stand down — you land in a plain, vanilla session." },
        { kind: 'say', text: "Think about everything you've layered on over time: skills you wrote, hooks that fire on edits and commits, plugins from a marketplace, custom slash commands, a settings file tuned just so. Safe mode loads *none* of it. Bare tool, nothing on top." },
        { kind: 'say', text: "Two doors into the same room. The `--safe-mode` flag is for when you're typing the command yourself. The `CLAUDE_CODE_SAFE_MODE` environment variable is for when you're not — a CI job, a script, a scheduled run. Set the variable and every session that process starts comes up clean." },
        {
          kind: 'choice',
          prompt: "Gut-check before you walk through. You panic for a second — does `--safe-mode` mean your skills and plugins are gone?",
          options: [
            { id: 'deleted', label: 'Yes — it wipes them so I\'d have to reinstall everything', correct: false, reaction: "Breathe — no. Nothing's deleted. Safe mode is a launch choice; it just declines to *load* your setup for this run. It's all still on disk." },
            { id: 'launch-choice', label: 'No — it just doesn\'t load them this run; relaunching without the flag brings everything back', correct: true, reaction: "Exactly. It's stood down, not torn out. Quit, relaunch without the flag, and your whole rig is back untouched. That's what makes it cheap to reach for." },
            { id: 'readonly', label: 'It also stops Claude from editing files, like a read-only mode', correct: false, reaction: "Different thing entirely. Safe mode is about *your customizations*, not permissions. Claude can still read and write — it's just doing it as the stock tool." },
          ],
        },
        { kind: 'say', text: "Here's where it earns its keep. Something acts up — a hook touches a file it shouldn't, output comes out garbled — and you can't tell if it's Claude or your own scaffolding. Relaunch in safe mode. If the weirdness vanishes, it lived in your config. If it persists, your setup's innocent. You removed every variable in one flag." },
        { kind: 'say', text: "On client work it's even better. Their developer hits a snag in their repo, but your session is wrapped in tooling they've never installed, so you can't trust yours to mirror theirs. Safe mode puts you on the same vanilla floor they're standing on — 'works on my machine' stops being an excuse." },
        { kind: 'say', text: "And when you demo or hand off, run it clean so the client sees the stock tool, not a show propped up by your custom commands. The books on the desk have the flag-versus-variable split and the clean-room playbook. The door wants to know what `--safe-mode` actually does — answer that and the key's yours." },
      ],
    },
  },
  battle: {
    name: 'Snarl, the Config-Draped Skeleton',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*clatters upright under a heap of borrowed plugins, dangling hooks, and half-loaded skills* …you can't even tell what's me anymore… is it the tool talking, or all this junk you bolted on…?",
    tauntLines: [
      "*shakes a fistful of tangled hooks* peel one off and you still won't know which layer lied to you…",
      "*rattles a stack of installed plugins like loose ribs* keep every customization loaded, keep guessing forever — that's how I like you…",
    ],
    victoryLine: "*the borrowed plugins and hooks slough off, leaving plain white bone* …safe mode… you stripped me back to vanilla and saw the truth… take the key, clean one…",
    questions: [
      {
        prompt:
          "A colleague says Claude is acting strangely in their repo and can't tell whether it's Claude itself or something in their own setup. They relaunch with `--safe-mode`. What does that actually do?",
        choices: [
          { id: 'a', label: 'It starts the session with their own customizations — skills, hooks, plugins, custom commands — switched off, so they see vanilla Claude Code and can tell whether their config was the cause', correct: true },
          { id: 'b', label: 'It permanently deletes their skills, hooks, and plugins from disk so they have to reinstall everything', correct: false },
          { id: 'c', label: 'It drops Claude into a read-only mode where it can look at files but is forbidden from editing them', correct: false },
          { id: 'd', label: 'It forces the session onto a smaller, safer model for the rest of the run', correct: false },
        ],
        passFeedback: 'HIT! Safe mode boots a vanilla session — your customizations switched off for that run — so anything strange that disappears was coming from your own config, not Claude itself.',
        failFeedback: "MISS! It doesn't delete anything, it isn't a read-only mode, and it doesn't swap models. It just launches with your customizations stood down — re-read the books.",
      },
    ],
  },
};
