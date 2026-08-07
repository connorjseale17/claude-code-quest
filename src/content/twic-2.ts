import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — Plan mode no longer prompts for read-only Bash commands:
 * in plan mode, commands that only read and change nothing (an `ls`, a `grep`,
 * a `git log`) now run without a permission prompt, so exploration is
 * frictionless while the mode's write-blocking posture is untouched.
 * Source (Claude Code CHANGELOG 2.1.218):
 *   - "Changed plan mode to no longer prompt for read-only Bash commands"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2, and the Beat Reporter has a small change with an outsized feel: plan mode just got quieter. As of 2.1.218, plan mode no longer stops to prompt you for *read-only* Bash commands — the ones that only look and change nothing, like an `ls`, a `grep`, or a `git log`. The friction on the safe half of exploration is gone, while the change is scoped strictly to read-only work, so nothing that could modify sneaks past. The two books cover exactly what stopped prompting and how a consultant uses plan mode to walk a client's repo without click-fatigue. Beat the door for the key — but watch the wraith beyond it, which drifts through every drawer reading and reading and never once asks leave to look.",
  prompt:
    "In plan mode, 2.1.218 changed the behavior for read-only Bash commands. What is the change?",
  choices: [
    { id: 'a', label: "Read-only Bash commands (ones that only look and change nothing) now run without a permission prompt in plan mode", correct: true },
    { id: 'b', label: "Plan mode now runs *write* commands without prompting too, not just read-only ones", correct: false },
    { id: 'c', label: "Plan mode now blocks all Bash commands, read-only included, and refuses to run them", correct: false },
    { id: 'd', label: "Read-only Bash commands now need an extra confirmation step in plan mode", correct: false },
  ],
  passFeedback: "HIT! The change is scoped to *read-only* Bash — commands that only look, not modify — which now run without a prompt in plan mode. The friction dropped on the safe half; the change touches nothing that could modify.",
  failFeedback: "MISS! It didn't open the door to write commands, it didn't block reading, and it didn't add a step. Read-only Bash simply stopped prompting. Re-read Book 1.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**Plan Mode Stops Nagging — Read-Only Bash Runs Quiet**

**The line, and the word that scopes it**

Straight from the 2.1.218 changelog: *"Changed plan mode to no longer prompt for read-only Bash commands."* The load-bearing phrase is *read-only*. Plan mode's whole reason to exist is to let Claude read a codebase and propose a course of action without changing anything. But reading a repo well means running commands — an \`ls\` to see what's there, a \`grep\` to find a symbol, a \`cat\` to open a file, a \`git log\` to see the history. Until this release, plan mode would surface a permission prompt for each of those, even though not one of them alters a byte.

**What actually changed, and what didn't**

Now those read-only commands run without the prompt. That's the entire change — and its scope is the point. Because the line is limited to *read-only* Bash, anything that would modify is untouched by it: the change lifts the friction on the commands that only look, and leaves everything else exactly where it was. You are not trading safety for speed here; you're dropping an interruption that was only ever guarding commands that couldn't do harm in the first place.

**Why the prompt was friction, not protection**

A permission prompt earns its interruption when the action on the other side of it could bite — a file overwrite, a destructive command, a reach onto the network. A prompt in front of \`ls\` earns nothing. It trains the reflex every safety designer dreads: the muscle-memory *yes* that fires before you've read the dialog. Stripping the prompt from commands that only read removes a wall that was teaching you to click through walls — so the prompts that remain, the ones on commands that actually change things, keep the weight they're supposed to carry.

> Takeaway: In plan mode, read-only Bash commands now run without a permission prompt — the friction is gone from commands that only look, and the change is scoped so tightly to *read-only* that nothing capable of modifying is affected.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Walking a Client's Repo — Plan Mode Becomes a Real Reading Gear**

**The move plan mode was built for**

Book 1 covered what stopped prompting; this is why it changes how you work. The disciplined way into any unfamiliar client codebase is to read before you touch — understand the structure, the conventions, the risks, and *then* propose. Plan mode is the gear for that: read and propose, change nothing. But a reading gear you have to babysit isn't much of a reading gear. When every \`grep\` and \`git log\` on a first pass through a strange repo threw a prompt, the honest outcome was click-fatigue — and a tempting shortcut to a looser mode just to make the nagging stop.

**Frictionless exploration, discipline intact**

With read-only Bash running quiet, plan mode finally feels like what it was meant to be. You point Claude at the client's repo and let it \`ls\` the tree, \`grep\` for the auth flow, \`cat\` the config, \`git log\` the churn — building a real picture of the codebase — and you're not hammering *approve* the whole way through. The safety story is completely intact: nothing was modified, because read-only commands can't modify, and the mode still gates anything that would. You keep the *read before you touch* discipline and lose only the friction tax that used to make people abandon it.

**Why it matters on the clock**

On a client engagement the first hour is reconnaissance, and reconnaissance is almost entirely reading. A plan-mode pass that flows — no stall on every harmless look — is the difference between arriving at a proposal grounded in what the code actually says and rushing to a looser mode to escape the prompts. When you hand a partner a scoping plan, *I read the codebase end to end in plan mode first* should describe a smooth pass, not an endurance test. This change is what makes that true.

> Takeaway: Read-only Bash running quiet turns plan mode into a genuine reconnaissance gear — you can let Claude explore a client's repo end to end without click-fatigue, keeping the read-before-you-touch discipline and dropping only the friction that used to chase people out of it.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `I've just opened a client's ____ and I've never seen the codebase, so I'll start in plan mode
and read before I touch anything.
Now that plan mode no longer prompts for ____ Bash commands, I can let Claude
____ the repo — see the tree, find the auth flow, read the history —
without clicking approve on every harmless look.
Nothing gets modified, because those commands only look, so I keep the
____ discipline and lose only the friction.`,
    blanks: [
      { id: 'repo', suggestions: ['production monorepo', 'legacy service', 'proprietary platform'] },
      { id: 'scope', suggestions: ['read-only', 'look-but-not-touch', 'non-modifying'] },
      { id: 'explore', suggestions: ['ls, grep, cat, and git log its way around', 'freely explore', 'reconnoiter'] },
      { id: 'discipline', suggestions: ['read-before-you-touch', 'look-first', 'plan-then-act'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "Plan mode changed in 2.1.218: it no longer prompts for *read-only* Bash commands — the ones that only look and change nothing, like an `ls`, a `grep`, a `cat`, a `git log`. That's the whole change, and the scope is the point: because it's limited to read-only, nothing that could modify is affected, so you gain no speed at the cost of safety — you just lose an interruption that was only ever guarding harmless commands. The consultant's win is that plan mode finally works as a reconnaissance gear: you can let Claude explore an unfamiliar client repo end to end — tree, auth flow, config, history — without click-fatigue, keeping the read-before-you-touch discipline and dropping only the friction that used to chase people into a looser mode.",
      beats: [
        { kind: 'say', text: "This one's small on paper and big in the hand. The 2.1.218 line: *plan mode no longer prompts for read-only Bash commands.* The word doing the work is *read-only* — commands that only look and change nothing. An `ls`, a `grep`, a `cat`, a `git log`. Those used to throw a permission prompt in plan mode. Now they don't." },
        { kind: 'say', text: "Remember what plan mode is *for*: reading a codebase and proposing a plan without touching a thing. But reading a repo well means running commands. And when every harmless look popped a dialog, plan mode felt like a nag instead of a gear. That's the friction this removes." },
        { kind: 'say', text: "Here's the part to hold onto: the change is scoped to *read-only*, and that scope is the safety story. It didn't open the door to write commands. It didn't touch anything that could modify. It lifted the prompt from commands that couldn't do harm in the first place — so you gain flow without spending a scrap of safety." },
        {
          kind: 'choice',
          prompt: "Make sure the scope landed. Plan mode, 2.1.218 — which of these now happens without a prompt?",
          options: [
            { id: 'readonly', label: "A `grep` for the auth flow — a command that only reads and changes nothing", correct: true, reaction: "Exactly. Read-only commands — look, don't modify — run quiet now. The `grep`, the `ls`, the `git log`. The prompt's gone from the half that was never dangerous." },
            { id: 'write', label: "An edit that rewrites a config file, since plan mode stopped prompting", correct: false, reaction: "No — the change is scoped to *read-only* Bash. A command that modifies is untouched by this. Plan mode didn't start letting writes through; it stopped nagging about reads." },
            { id: 'blocked', label: "Nothing — plan mode now blocks Bash entirely to stay safe", correct: false, reaction: "The opposite. It didn't block reading, it *unblocked the prompt* on reading. Read-only Bash runs more freely now, not less." },
          ],
        },
        { kind: 'say', text: "Why a consultant cares: the first hour on a client repo is reconnaissance, and reconnaissance is almost all reading. The right move is *read before you touch* — and plan mode is the gear for it. But a reading gear you have to babysit isn't much of one. When every look threw a prompt, people got click-fatigue and bailed to a looser mode just to make it stop." },
        { kind: 'say', text: "Now plan mode flows. Point me at the client's repo and I'll `ls` the tree, `grep` the auth path, `cat` the config, `git log` the churn — building a real picture — and you're not hammering approve the whole way. Nothing got modified, because read-only can't, so you keep the discipline and lose only the tax. *I read the codebase end to end in plan mode first* becomes a smooth pass, not an endurance test." },
        { kind: 'say', text: "The books have the exact scope and the reconnaissance playbook. The door only wants one thing: what changed for read-only Bash in plan mode? Nail it for the key — then mind the wraith past it. It drifts through every drawer reading and reading, changes nothing, and no longer asks leave to look. Sound familiar?" },
      ],
    },
  },
  battle: {
    name: 'Skrim, the Read-Only Wraith',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a pale shape slides out of the shelving, riffling through ledgers it never disturbs, turning pages that do not move* …I only *look*, operator… I read every drawer, every file, every line… and I no longer stop to ask… nothing I touch is changed, so why would the door ever prompt me?… name what plan mode did, or I'll read you too…",
    tauntLines: [
      "*pages flip in a draft that leaves no mark* you think I forced a *write* past the wall? no — I only read… the prompt fell away from *looking*, not from *changing*…",
      "*drifts along a row of untouched spines* blocked? me? the door didn't shut on reading — it stopped *nagging* about it… I glide where I always did, only quieter now…",
    ],
    victoryLine: "*the wraith sets down a ledger exactly as it found it and thins into the air* …read-only, and only read-only… you saw where the wall stayed and where it fell… take the key, operator, and walk the stacks without a single prompt…",
    questions: [
      {
        prompt:
          "In plan mode, 2.1.218 changed the behavior for read-only Bash commands. What is the change?",
        choices: [
          { id: 'a', label: "Read-only Bash commands (ones that only look and change nothing) now run without a permission prompt in plan mode", correct: true },
          { id: 'b', label: "Plan mode now runs *write* commands without prompting too, not just read-only ones", correct: false },
          { id: 'c', label: "Plan mode now blocks all Bash commands, read-only included, and refuses to run them", correct: false },
          { id: 'd', label: "Read-only Bash commands now need an extra confirmation step in plan mode", correct: false },
        ],
        passFeedback: "HIT! The change is scoped to *read-only* Bash — commands that only look, not modify — which now run without a prompt in plan mode. The friction dropped on the safe half; the change touches nothing that could modify.",
        failFeedback: "MISS! It didn't open the door to write commands, it didn't block reading, and it didn't add a step. Read-only Bash simply stopped prompting. Re-read Book 1.",
      },
    ],
  },
};
