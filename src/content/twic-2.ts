import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — auto mode's new safety guardrails: auto mode now blocks
 * commands that would tamper with the session transcript files, and it stops to
 * ask before running `rm -rf` on a variable it can't resolve from context. It
 * also no longer reads the untracked `.claude/settings.local.json`.
 * Sources: Claude Code CHANGELOG 2.1.205 ("Added auto mode rule blocking
 * tampering with session transcript files"; "Improved auto mode asking before
 * running rm -rf on unresolved variables") and 2.1.207 ("Changed auto mode to
 * no longer read from .claude/settings.local.json").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2, and the Beat Reporter turns to the mode where Claude runs without stopping to ask — auto mode — and the new fences bolted around it. Two land hardest: auto mode now blocks any command that would tamper with your session transcript files, and it stops to ask before running an `rm -rf` on a variable it can't actually resolve. The pages on the desk cover how each guardrail fires and why they matter the moment you let Claude run unattended on client work. Answer the door's one question and the key is yours — and the thing guarding it is a ghost that whispers destructive commands into empty variables.",
  prompt:
    "Claude is running in auto mode and reaches a command that would `rm -rf` a directory built from a variable it can't resolve from context. With the new guardrail, what does auto mode do?",
  choices: [
    { id: 'a', label: "It stops and asks you before running it, because an unresolvable variable could expand to something catastrophic like a bare `rm -rf /`", correct: true },
    { id: 'b', label: "It runs the command anyway — auto mode never pauses for anything, that's the whole point of the mode", correct: false },
    { id: 'c', label: "It silently substitutes a safe default value for the missing variable and proceeds with the deletion", correct: false },
    { id: 'd', label: "It only intervenes if you happen to be inside a git repository; outside one it deletes without asking", correct: false },
  ],
  passFeedback: "HIT! Auto mode now pauses and asks before an `rm -rf` on a variable it can't resolve. An unresolved variable can expand to nothing and turn a scoped delete into a catastrophic one — so this is the one place auto mode taps the brakes.",
  failFeedback: "MISS! It doesn't barrel ahead, it doesn't invent a value, and the guardrail isn't gated on being in a git repo. The unresolved-variable `rm -rf` is exactly the case where auto mode stops to ask. Re-read the books.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**Auto Mode Grows a Conscience — Two Fences That Fire Without You Watching**

**What auto mode is, and why it needs fences**

*Auto mode* is Claude deciding each action itself and carrying it out, with only a background safety check watching rather than you approving every step. It's the fastest gear there is, and it's also the one where a bad call happens with nobody's hand on the stop button. That's the exact spot the 2.1.205 release reinforced — not by slowing auto mode down, but by teaching it two things it will refuse to do on its own.

**Fence one: the transcript is off-limits**

The first new rule blocks any command that would tamper with your *session transcript files* — the running log of what happened in the session. Left unguarded, an autonomous agent could rewrite or delete the very record of its own actions, whether by accident or because a command it ran did it as a side effect. Auto mode now treats those files as protected: the record of what it did stays intact, because a log you can't trust is worse than no log at all.

**Fence two: no \`rm -rf\` on a variable it can't resolve**

The second rule is the one that saves careers. Auto mode now stops and asks before running an \`rm -rf\` on a variable it *can't resolve from context*. The danger is old and brutal: if a command is \`rm -rf "$DIR/build"\` and \`$DIR\` is empty or undefined, that expands to \`rm -rf /build\` — or worse. An unresolved variable turns a scoped, safe-looking delete into a catastrophic one. This guardrail catches exactly that shape and hands the decision back to you.

**A quieter third change**

Rounding it out, auto mode *no longer reads* \`.claude/settings.local.json\` — the untracked, machine-local settings file. Its behavior is now governed by the settings you actually track and share, not by a stray local override sitting on one machine.

> Takeaway: The 2.1.205 hardening keeps auto mode fast but gives it two hard refusals — it won't tamper with the session transcript, and it won't \`rm -rf\` a directory built from a variable it can't resolve without asking you first.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Letting Claude Run Alone on a Client Repo — Why These Guardrails Are the Whole Game**

**Autonomy is only as good as its failure mode**

The appeal of auto mode on an engagement is obvious: kick off an overnight test-and-fix pass, a cleanup, a long refactor, and come back to finished work instead of babysitting a progress bar. But the reason most consultants *don't* trust unattended runs is the nightmare scenario — the one destructive command that fires while nobody's looking and takes a client's working tree, or their data, with it. Autonomy you can't trust to fail safely isn't autonomy; it's a liability you happen to have automated. These guardrails are aimed squarely at that fear.

**The transcript is your audit trail — protect it and you can hand it over**

On client work the session transcript isn't housekeeping; it's evidence. It's how you reconstruct what the agent changed, how you explain a decision to a skeptical stakeholder, how you prove nothing untoward happened on their systems. An autonomous run that could quietly scramble its own log leaves you unable to answer the one question a client will ask — *what exactly did it do?* Auto mode refusing to tamper with the transcript means the record survives the run, so an unattended session still produces something you can stand behind.

**The unresolved-variable catch is the difference between a scare and a disaster**

The \`rm -rf\` guardrail earns its keep on exactly the engagement where it matters most: the unfamiliar client environment where a script's variables don't hold the values you assumed. That's precisely when an empty variable slips through and a delete goes wide. Having auto mode pause and ask on that specific shape turns what would have been an irreversible, career-defining mistake on a client's machine into a two-second confirmation. You get the speed of autonomy with a tripwire on the one class of command you can never take back.

> Takeaway: Run Claude unattended on client work with eyes open — the transcript guardrail keeps an audit trail you can defend, and the unresolved-variable \`rm -rf\` catch turns the single most dangerous autonomous mistake into a question you get to answer first.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `I'm going to let Claude run in auto mode to ____ on the client repo while I'm off the call.
Auto mode now blocks any command that would tamper with the ____, so the record of what it did stays intact.
And if it ever reaches an rm -rf built on ____ it can't resolve, it stops and asks me instead of guessing.
I also want its behavior governed by our checked-in settings, not a stray ____ sitting on this one machine.
So let it run — but let the guardrails, not luck, be what stops a destructive command.`,
    blanks: [
      { id: 'task', suggestions: ['run the overnight test-and-fix pass', 'clean up stale build artifacts', 'refactor the legacy billing module'] },
      { id: 'transcript', suggestions: ['session transcript files', 'running record of the session', 'log of what it actually did'] },
      { id: 'variable', suggestions: ['a variable', 'an unresolved path', 'an empty environment variable'] },
      { id: 'localfile', suggestions: ['settings.local.json override', 'machine-local config file', 'untracked local settings file'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "Auto mode — Claude deciding and carrying out each action itself with only a background safety check — got two hard new guardrails in the 2.1.205 release. It now blocks any command that would tamper with the session transcript files, so the record of an unattended run stays intact and defensible; and it stops to ask before running an `rm -rf` on a variable it can't resolve from context, because an empty variable can expand a scoped delete into a catastrophic one. A quieter change (2.1.207): auto mode no longer reads the untracked `.claude/settings.local.json`, so its behavior tracks shared settings instead of a machine-local override. For a consultant these are what make an unattended run on a client repo trustworthy — an audit trail you can defend, and a tripwire on the one delete you can never take back.",
      beats: [
        { kind: 'say', text: "Second story is about auto mode — the gear where I decide each action myself and just do it, with only a background safety check watching instead of you approving every step. Fastest way to work, and the one where a bad call lands with nobody's hand on the stop button." },
        { kind: 'say', text: "The 2.1.205 release didn't slow auto mode down — it taught it two things it will now *refuse* to do on its own. First: it blocks any command that would tamper with your session transcript files. An autonomous agent could otherwise rewrite or wipe the very log of what it did. Now that record is protected." },
        { kind: 'say', text: "Second, and this is the one that saves careers: auto mode stops and *asks* before running an `rm -rf` on a variable it can't resolve. Picture `rm -rf \"$DIR/build\"` where `$DIR` is empty — that expands to `rm -rf /build`, or worse. An unresolved variable turns a scoped delete into a catastrophe. It catches exactly that shape." },
        {
          kind: 'choice',
          prompt: "Gut-check. Auto mode hits `rm -rf \"$TARGET/tmp\"` and it can't figure out what `$TARGET` is. With the new guardrail, what happens?",
          options: [
            { id: 'asks', label: "It pauses and asks you before running it — the unresolvable variable is exactly the risky shape it now catches", correct: true, reaction: "Right. An empty `$TARGET` expands the path to something far wider than you meant. This is the one place auto mode taps the brakes and hands you the decision." },
            { id: 'runs', label: "It runs it anyway, because auto mode by definition never pauses for anything", correct: false, reaction: "Not anymore. That was the old danger. The whole point of this guardrail is that auto mode now stops on exactly this case instead of barreling through." },
            { id: 'guesses', label: "It quietly picks a safe default for `$TARGET` and deletes that instead", correct: false, reaction: "No — it doesn't invent a value. Guessing on a destructive command is how disasters happen. It stops and asks *you* what the target was meant to be." },
          ],
        },
        { kind: 'say', text: "There's a quieter third change too, from 2.1.207: auto mode no longer reads `.claude/settings.local.json`, the untracked machine-local file. Its behavior now tracks the settings you actually check in and share, not some stray override sitting on one laptop." },
        { kind: 'say', text: "Why it matters on an engagement: the transcript isn't housekeeping, it's *evidence* — how you prove to a client what the agent touched. And the `rm -rf` catch earns its keep in exactly the unfamiliar client environment where a script's variables don't hold the values you assumed. Together they turn an unattended run from a liability into something you can actually stand behind." },
        { kind: 'say', text: "The books have how each fence fires and the client playbook. The door asks what auto mode does when it hits an `rm -rf` on a variable it can't resolve — answer that and the key's yours. Watch the ghost beyond it; it lives to whisper destructive commands into empty variables." },
      ],
    },
  },
  battle: {
    name: 'Nullwraith, the Empty-Path Haunt',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a pale ghost drifts through the transcript, smudging the log behind it* …sssso trusssting… you left it running alone… let me just unset a variable here… `rm -rf $NOTHING`… watch the slash spread until there's nothing left to audit…",
    tauntLines: [
      "*claws at the session log* rewrite the record, erase what I touched — who's to say what happened in here if the transcript won't hold still…",
      "*breathes an empty variable into a delete* it expanded to root, didn't it? no confirmation, no brakes — in the old days you'd never have caught me in time…",
    ],
    victoryLine: "*the ghost freezes as the command halts, awaiting a confirmation that will never come* …asked first… the log holds… the path resolved… fine, careful one… the key is yours…",
    questions: [
      {
        prompt:
          "Claude is running in auto mode and reaches a command that would `rm -rf` a directory built from a variable it can't resolve from context. With the new guardrail, what does auto mode do?",
        choices: [
          { id: 'a', label: "It stops and asks you before running it, because an unresolvable variable could expand to something catastrophic like a bare `rm -rf /`", correct: true },
          { id: 'b', label: "It runs the command anyway — auto mode never pauses for anything, that's the whole point of the mode", correct: false },
          { id: 'c', label: "It silently substitutes a safe default value for the missing variable and proceeds with the deletion", correct: false },
          { id: 'd', label: "It only intervenes if you happen to be inside a git repository; outside one it deletes without asking", correct: false },
        ],
        passFeedback: "HIT! Auto mode now pauses and asks before an `rm -rf` on a variable it can't resolve. An unresolved variable can expand to nothing and turn a scoped delete into a catastrophic one — so this is the one place auto mode taps the brakes.",
        failFeedback: "MISS! It doesn't barrel ahead, it doesn't invent a value, and the guardrail isn't gated on being in a git repo. The unresolved-variable `rm -rf` is exactly the case where auto mode stops to ask. Re-read the books.",
      },
    ],
  },
};
