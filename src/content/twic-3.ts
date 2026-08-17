import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — Bash tool memory limit: opt-in memory cgroup support for
 * Bash tool commands on Linux, configured via the `CLAUDE_CODE_TOOL_MEMORY_LIMIT`
 * environment variable. A memory cgroup is a Linux kernel mechanism that caps
 * the memory a group of processes may use; scoping it to Bash tool commands puts
 * a ceiling on what a single command Claude runs can consume, so a runaway
 * command is contained (and ultimately killed by the cgroup) instead of eating
 * the host's memory. Off unless the env var is set; Linux-only, because cgroups
 * are a Linux facility.
 * Sources (Claude Code CHANGELOG 2.1.233):
 *   - "Added opt-in memory cgroup support for Bash tool commands on Linux
 *      (`CLAUDE_CODE_TOOL_MEMORY_LIMIT`)"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Final room of the issue, and the Beat Reporter closes on a guardrail for the moments you're not watching: a ceiling on how much memory a single Bash command can eat. Set `CLAUDE_CODE_TOOL_MEMORY_LIMIT` and Claude Code runs Bash tool commands inside a Linux *memory cgroup* — a kernel-enforced cap on what that command's processes may consume — so a build or a script that balloons gets contained instead of swallowing the host's RAM. The two books cover how the cgroup limit works and that it's opt-in and Linux-only, and why a consultant leaving unattended runs going on a shared box should switch it on. This is *not* a cap on how many commands run — it's a cap on how hungry one command can get. Answer the door for the key, then face the wyrm past it: a dragon with a bottomless appetite, collared at last by a chain it cannot outgrow.",
  prompt:
    "What does setting `CLAUDE_CODE_TOOL_MEMORY_LIMIT` do?",
  choices: [
    { id: 'a', label: "Runs Bash tool commands inside a Linux memory cgroup with a ceiling you set, so a single command that balloons is capped and killed by the cgroup instead of consuming the host's memory — opt-in, and Linux-only", correct: true },
    { id: 'b', label: "Caps how many Bash commands Claude may run in a session, refusing new ones once the count is reached", correct: false },
    { id: 'c', label: "Limits the size of the model's context window so a long transcript can't exhaust memory", correct: false },
    { id: 'd', label: "Turns on by default and enforces one memory limit across every process on the machine, not just Claude's commands", correct: false },
  ],
  passFeedback: "HIT! It's a per-command *memory* ceiling. Set the env var and Bash tool commands run inside a Linux memory cgroup capped at your value; a command that exceeds it is contained and killed by the cgroup rather than eating the host's RAM. It's opt-in — off until you set it — and Linux-only, because cgroups are a Linux facility.",
  failFeedback: "MISS! It doesn't count commands, it has nothing to do with the model's context window, and it isn't on by default or machine-wide. It's an opt-in, Linux-only memory cgroup scoped to Bash tool commands. Re-read Book 1.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**A Ceiling on Appetite — The Bash Memory Cgroup**

**One env var, one guardrail**

The 2.1.233 line is spare: *"Added opt-in memory cgroup support for Bash tool commands on Linux (\`CLAUDE_CODE_TOOL_MEMORY_LIMIT\`)."* Unpack it a piece at a time. *Bash tool commands* are the commands Claude runs on your behalf through its Bash tool — builds, test suites, scripts, data crunching. *Memory cgroup* is a Linux kernel feature: a *control group* is a labeled set of processes, and a memory cgroup puts a hard ceiling on how much memory the processes in that set may collectively use. Setting \`CLAUDE_CODE_TOOL_MEMORY_LIMIT\` tells Claude Code to run each Bash command inside such a group, capped at the value you chose.

**What the kernel does when a command hits the ceiling**

The reason a cgroup is stronger than a polite request is that the *kernel* enforces it, not the command. As a command's processes approach the limit the kernel reclaims what it can, and if the group genuinely tries to exceed its ceiling the cgroup's out-of-memory killer terminates a process inside that group. Crucially, the pressure and the kill stay *inside* the group — the ceiling is on that command's slice, so the rest of the host isn't dragged into the memory crunch one greedy command creates.

**Opt-in, and Linux-only, on purpose**

Two qualifiers in the line matter. It's *opt-in*: nothing changes until you set the environment variable, so existing setups keep their current behavior and you decide where a cap belongs. And it's *Linux*: cgroups are a Linux kernel facility, so this is a server-and-container guardrail — the kind of place unattended runs actually live — not something your macOS laptop session gets. You pick the ceiling deliberately, high enough that legitimate work finishes and low enough that a runaway is caught before it hurts the box.

> Takeaway: \`CLAUDE_CODE_TOOL_MEMORY_LIMIT\` runs each Bash tool command inside a kernel-enforced Linux memory cgroup capped at the value you set, so a command that balloons is contained and killed within its own group instead of exhausting the host — and it stays off until you opt in.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Guarding the Box You Left Running — Memory Limits for Unattended Work**

**The failure this prevents**

Book 1 was the mechanism; here's the incident it's built to stop. The whole point of Claude Code on a server is work that runs while you're not watching — a scheduled routine, a long migration, an overnight test sweep. Those runs shell out constantly, and any one command can balloon: a test that leaks, a build that tries to hold a huge artifact in memory, a data step that loads a file far bigger than expected. Unbounded, that one command can devour the host's RAM, at which point the whole session dies, the machine starts thrashing, and on a shared box everyone else's work suffers with it. A per-command memory ceiling turns that catastrophe into a single failed command.

**Why "contained to one command" is the whole value**

The reason to reach for the cgroup rather than just hoping is *blast radius*. Without it, a memory blowup is a property of the machine — it takes down whatever else is running. With it, the blowup is a property of the one command that caused it: that command's group hits its ceiling, the cgroup kills it, and the session, the host, and any neighbors keep going. On a self-hosted runner or a shared build box — exactly the environments where you least want a surprise — that containment is the difference between "one job failed, retry it" and "the box is down, page someone."

**Setting a ceiling you can defend**

Treat the limit as a capacity decision, not a guess. Look at what the engagement's commands legitimately need at peak — the real build, the real test run — and set the ceiling comfortably above that but well below the host's total, leaving headroom for everything else sharing the machine. Bake \`CLAUDE_CODE_TOOL_MEMORY_LIMIT\` into the environment your unattended sessions inherit so every command is capped without anyone remembering to do it by hand. It's the seatbelt you put on before the long drive, not after the swerve.

> Takeaway: Switch on the Bash memory cgroup wherever unattended runs live — a runaway command is then contained and killed within its own ceiling instead of taking the host and its neighbors down, and a limit set above real peak need but below the host's total keeps the guardrail invisible until the day it saves you.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `I've got unattended sessions running on a shared ____, and my worry is one command
ballooning and taking the whole box down with it.
So I'll set ____ in the environment those sessions inherit,
which runs each Bash command inside a Linux ____ capped at my value.
I'll pick a ceiling above what the real ____ needs at peak but well below the host's total,
so a runaway is killed within its own group instead of exhausting the machine.`,
    blanks: [
      { id: 'host', suggestions: ['build box', 'self-hosted runner', 'server'] },
      { id: 'env-var', suggestions: ['`CLAUDE_CODE_TOOL_MEMORY_LIMIT`', 'the memory-limit env var', 'the Bash memory ceiling'] },
      { id: 'mechanism', suggestions: ['memory cgroup', 'kernel-enforced control group', 'per-command memory group'] },
      { id: 'workload', suggestions: ['build and test run', 'migration step', 'data-processing job'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "Bash tool memory limit (2.1.233): setting `CLAUDE_CODE_TOOL_MEMORY_LIMIT` runs each Bash tool command inside a Linux *memory cgroup* — a kernel-enforced control group that caps the memory the command's processes may use — at a ceiling you choose. If a command balloons past that ceiling, the kernel reclaims and ultimately the cgroup's OOM killer terminates a process in *that group*, so the pressure and the kill stay contained to the one command instead of exhausting the host. It's opt-in (nothing changes until you set the env var) and Linux-only (cgroups are a Linux facility), which makes it a server-and-container guardrail. It is NOT a cap on how many commands run, has nothing to do with the model's context window, and isn't machine-wide. For a consultant, it's the guardrail for unattended runs on shared or self-hosted boxes: a runaway build, leaking test, or oversized data step becomes one failed command rather than a downed machine. Set the ceiling above real peak need but below the host's total, and bake the env var into the environment unattended sessions inherit.",
      beats: [
        { kind: 'say', text: "Closing story of the issue is a seatbelt for the runs you don't watch. The 2.1.233 line: opt-in memory cgroup support for Bash tool commands on Linux, via `CLAUDE_CODE_TOOL_MEMORY_LIMIT`. In plain terms — you can now put a ceiling on how much memory a single command Claude runs is allowed to eat." },
        { kind: 'say', text: "Here's the mechanism. A *cgroup* — control group — is a Linux kernel feature: label a set of processes, and a memory cgroup caps how much memory that set may collectively use. Set the env var and Claude Code runs each Bash command inside such a group, capped at your value. The kernel enforces it, not the command — so it's a real ceiling, not a polite ask." },
        { kind: 'say', text: "And when a command hits the ceiling, the kill stays *inside* its own group. The kernel reclaims what it can, and if the command truly tries to blow past the cap, the cgroup's OOM killer takes a process in that group down. The rest of the host isn't dragged into the crunch. That containment is the entire point." },
        {
          kind: 'choice',
          prompt: "Careful — someone will mix this up with the session caps we talked about in earlier weeks. What does `CLAUDE_CODE_TOOL_MEMORY_LIMIT` actually limit?",
          options: [
            { id: 'per-cmd-mem', label: "The memory a single Bash command may use — capped by a Linux cgroup, so a runaway command is killed within its own group", correct: true, reaction: "Exactly. It's a *memory* ceiling on each command's own process group, kernel-enforced. Not a count of commands, not the model's context — the RAM one command can eat before the cgroup stops it." },
            { id: 'cmd-count', label: "The number of Bash commands Claude may run in a session before it's cut off", correct: false, reaction: "That's a different kind of cap — a count. This one is about *memory per command*: how much RAM a single command can consume before the cgroup kills it. Nothing here counts commands." },
            { id: 'context', label: "The model's context-window size, so a long transcript can't run the machine out of memory", correct: false, reaction: "No — 'memory' here is host RAM used by a shell command, not the model's context. The cgroup bounds what a Bash command's processes consume; the context window is untouched." },
          ],
        },
        { kind: 'say', text: "So the engagement play: turn it on wherever unattended runs live. A scheduled routine, an overnight test sweep, a long migration — those shell out constantly, and any one command can balloon: a leaking test, a build hoarding an artifact, a data step loading a file far bigger than expected. Unbounded, that command eats the host's RAM and the whole box goes down. Bounded, it's one failed command you retry." },
        { kind: 'say', text: "Two qualifiers to remember. It's *opt-in* — off until you set the variable, so you decide where a cap belongs — and *Linux-only*, because cgroups are a Linux thing. That makes it a server-and-container guardrail, not something your laptop session gets. Set the ceiling above what the real build and test need at peak, but well below the host's total, and bake the env var into the environment your unattended sessions inherit." },
        { kind: 'say', text: "Books have the mechanism and the how-to-size-it. The door wants one fact: what does setting `CLAUDE_CODE_TOOL_MEMORY_LIMIT` do? Answer for the key. Then face Gormand past it — a bottomless wyrm that swears no chain can hold its appetite, betting you'll confuse a ceiling on *how much one command eats* with a count of *how many* it gets to swallow." },
      ],
    },
  },
  battle: {
    name: 'Gormand, the Bottomless Wyrm',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*an immense dragon uncoils over a hoard it is still, impossibly, swallowing — stone, torchlight, the very air — a heavy iron collar hanging open at its throat* …I eat, operator, and I do not stop… every command a mouth, every mouth mine… but they've forged me a collar with a number on it… tell me what that number truly holds back, or be swallowed with the rest of the room…",
    tauntLines: [
      "*the wyrm gulps down a shadow and swells* you think the collar counts my *bites*? no — I may take as many as I like… it binds only how much any one of them may hold…",
      "*a rumbling, sated growl* my appetite is not your little scroll of memory, operator — I devour the room's stone, not the reporter's words… bound the RAM, not the tale…",
    ],
    victoryLine: "*the collar snaps shut and the wyrm's swallowing stops at the brim* …a ceiling on each mouthful, and the kill kept to the mouth that overreached… you named the chain true… take the key, operator, and let no single command eat the whole box…",
    questions: [
      {
        prompt:
          "What does setting `CLAUDE_CODE_TOOL_MEMORY_LIMIT` do?",
        choices: [
          { id: 'a', label: "Runs Bash tool commands inside a Linux memory cgroup with a ceiling you set, so a single command that balloons is capped and killed by the cgroup instead of consuming the host's memory — opt-in, and Linux-only", correct: true },
          { id: 'b', label: "Caps how many Bash commands Claude may run in a session, refusing new ones once the count is reached", correct: false },
          { id: 'c', label: "Limits the size of the model's context window so a long transcript can't exhaust memory", correct: false },
          { id: 'd', label: "Turns on by default and enforces one memory limit across every process on the machine, not just Claude's commands", correct: false },
        ],
        passFeedback: "HIT! It's a per-command *memory* ceiling. Set the env var and Bash tool commands run inside a Linux memory cgroup capped at your value; a command that exceeds it is contained and killed by the cgroup rather than eating the host's RAM. It's opt-in — off until you set it — and Linux-only, because cgroups are a Linux facility.",
        failFeedback: "MISS! It doesn't count commands, it has nothing to do with the model's context window, and it isn't on by default or machine-wide. It's an opt-in, Linux-only memory cgroup scoped to Bash tool commands. Re-read Book 1.",
      },
    ],
  },
};
