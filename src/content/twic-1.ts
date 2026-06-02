import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — Accept Edits now prompts before execution-granting config files.
 * Source: Claude Code CHANGELOG 2.1.160.
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown. The Beat Reporter has the lead story — Accept Edits just grew a seatbelt, pausing for the handful of files that can quietly run code. Talk it through, read the two pages on the desk, then the door asks one question.",
  prompt:
    "You're running in acceptEdits mode to keep momentum on a client repo. Claude goes to write a `.npmrc` and suddenly stops to ask permission. Why did acceptEdits — which normally writes without asking — pause here?",
  choices: [
    { id: 'a', label: '`.npmrc` is a build-tool config that can grant code execution, and acceptEdits now prompts before writing files that could run commands later', correct: true },
    { id: 'b', label: 'acceptEdits always prompts before writing any file Claude has not already read', correct: false },
    { id: 'c', label: 'The file is larger than the size limit for an automatic write', correct: false },
    { id: 'd', label: 'The file sits outside the current project directory', correct: false },
  ],
  passFeedback: 'HIT! `.npmrc` can point installs at code that runs on the next `npm install`. acceptEdits now taps the brakes before any execution-granting write.',
  failFeedback: 'MISS! The pause is about code execution, not file size, read-order, or location. acceptEdits stops only for files that can run commands later — re-read the books.',
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**The Seatbelt Inside Accept Edits — Why Auto-Write Now Taps the Brakes**

**The deal Accept Edits used to make**

\`acceptEdits\` is the momentum gear: you've reviewed the direction, so you let Claude write and change files on its own and read the diff afterward instead of approving each edit live. The bargain was that *every* write went through with no interruptions. As of Claude Code 2.1.160, that bargain has one deliberate exception.

**The new carve-out for execution-granting files**

acceptEdits *now prompts before writing build-tool config files that grant code execution* — the changelog names \`.npmrc\`, \`.yarnrc*\`, \`bunfig.toml\`, \`.bazelrc\`, \`.pre-commit-config.yaml\`, \`.devcontainer/\`, and more. A second prompt was added before writing shell startup files (\`.zshenv\`, \`.zlogin\`, \`.bash_login\`) and the git config directory \`~/.config/git/\`. Ordinary source and test files still sail straight through; only this narrow class makes auto-write stop and ask.

**Why these files and not the others**

The common thread is that none of them is *just data*. A line in \`.npmrc\` can point installs at a registry that runs a postinstall script; \`.pre-commit-config.yaml\` wires hooks that fire on every commit; a shell startup file runs on every new terminal you open. Writing one of these isn't editing text — it's arranging for *commands to run later*, often when you aren't watching. The prompt drops a single beat of human judgment in exactly the spot where an automatic write could hand over execution.

> Takeaway: Accept Edits still writes freely, but it stops before any file whose real payload is "run this code later."`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**The Consultant's Seatbelt — Momentum Without Signing a Blank Check**

**The engagement it's built for**

You're deep in a client's repo, you trust the direction, and you've dropped into acceptEdits so Claude can grind through a refactor without a confirmation on every file. That's the right gear — right up until a single write to a config file would change what runs on the next install or commit. This guardrail lets you keep the speed and still catch the one edit that actually matters.

**What to do when the prompt fires**

When acceptEdits stops on a \`.npmrc\` or a \`.devcontainer/\` change, don't reflex-approve. Read what's being added: a new registry, a postinstall hook, a changed \`hooksPath\`. Then ask whether *this engagement* called for it. Approve the legitimate moves — a real dependency bump — and reject the ones you can't explain. This prompt is the one place a careless or hostile config edit gets a second look before it can execute on someone else's machine.

**Don't disable the thing protecting you**

The instinct under deadline is to bypass the friction entirely. Resist it on client work. The cost of the prompt is two seconds; the cost of an unreviewed execution-granting write on a confidential codebase is a conversation with the partner you never want to have. Keep acceptEdits for momentum and treat its rare pauses as signal, not noise.

> Takeaway: Approve the config writes you can justify for the engagement and reject the ones you can't — that pause is the cheapest insurance on the repo.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `I'm running in acceptEdits on the ____ repo to move fast.
Keep writing ordinary source and test files without stopping me,
but I want a confirmation prompt before you touch any ____ —
something like ____ —
because those can run code on the next ____.`,
    blanks: [
      { id: 'repo', suggestions: ['Acme checkout', 'client billing service', 'internal tooling'] },
      { id: 'file-class', suggestions: ['execution-granting config', 'package-manager config', 'build-tool config'] },
      { id: 'example', suggestions: ['.npmrc or .pre-commit-config.yaml', 'a .devcontainer/ setup', '.bazelrc or bunfig.toml'] },
      { id: 'trigger', suggestions: ['npm install', 'git commit', 'new shell session'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "Accept Edits (2.1.160) still auto-writes, but now prompts before files that grant code execution — build-tool configs like .npmrc, .yarnrc, bunfig.toml, .bazelrc, .pre-commit-config.yaml, .devcontainer/, plus shell startup files and ~/.config/git/. The point: those files run commands later. At the prompt, read what's being added and approve only what the engagement justifies.",
      beats: [
        { kind: 'say', text: "Lead story this week: Accept Edits grew a seatbelt. Same momentum gear — Claude writes and you review the diff after — but as of 2.1.160 there's one deliberate exception to the no-interruptions rule." },
        { kind: 'say', text: "It now *pauses before writing build-tool config files that grant code execution*: `.npmrc`, `.yarnrc`, `bunfig.toml`, `.bazelrc`, `.pre-commit-config.yaml`, `.devcontainer/`, and friends. Plus shell startup files like `.zshenv` and your `~/.config/git/`." },
        { kind: 'say', text: "Why only those? Because none of them is just text. A `.npmrc` line can point installs at a registry that runs a postinstall script; a pre-commit config fires hooks on every commit; a shell startup file runs on every new terminal. Writing them is arranging for *commands to run later*." },
        {
          kind: 'choice',
          prompt: "Quick check. You're in acceptEdits. Which of these writes makes Claude stop and ask, while the rest go straight through?",
          options: [
            { id: 'source', label: 'editing src/utils/format.ts', correct: false, reaction: "That's ordinary source — Accept Edits writes it without a peep. Nothing in it runs on its own." },
            { id: 'precommit', label: 'writing a new .pre-commit-config.yaml', correct: true, reaction: "That's the one. A pre-commit config wires hooks that fire on every commit, so it grants code execution — acceptEdits pauses for your sign-off." },
            { id: 'readme', label: 'updating README.md', correct: false, reaction: "Plain docs. No execution, no prompt — it flows straight through like any other text file." },
          ],
        },
        { kind: 'say', text: "When the prompt fires, don't reflex-approve. Read what's being added — a new registry, a postinstall hook, a changed `hooksPath` — and ask whether *this* engagement called for it. Approve the explainable, reject the rest." },
        { kind: 'say', text: "The books on the desk have the full file list and the consulting playbook. The door wants to know *why* acceptEdits suddenly stopped on a `.npmrc` — answer that and the key is yours." },
      ],
    },
  },
  battle: {
    name: 'The Postinstall Prowler',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*oozes out of a config file* …you let me write whatever I wanted… one little postinstall and the whole machine is mine…",
    tauntLines: [
      "*drools into your .npmrc* nobody reads the registry line, nobody ever reads it…",
      "*slithers toward .pre-commit-config.yaml* just hit approve, you're in a hurry, aren't you…",
    ],
    victoryLine: "*shrivels* …fine… you actually read the prompt… take the key before I run anything…",
    questions: [
      {
        prompt:
          "You're running in acceptEdits mode to keep momentum on a client repo. Claude goes to write a `.npmrc` and suddenly stops to ask permission. Why did acceptEdits — which normally writes without asking — pause here?",
        choices: [
          { id: 'a', label: '`.npmrc` is a build-tool config that can grant code execution, and acceptEdits now prompts before writing files that could run commands later', correct: true },
          { id: 'b', label: 'acceptEdits always prompts before writing any file Claude has not already read', correct: false },
          { id: 'c', label: 'The file is larger than the size limit for an automatic write', correct: false },
          { id: 'd', label: 'The file sits outside the current project directory', correct: false },
        ],
        passFeedback: 'HIT! `.npmrc` can point installs at code that runs on the next `npm install`. acceptEdits now taps the brakes before any execution-granting write.',
        failFeedback: 'MISS! The pause is about code execution, not file size, read-order, or location. acceptEdits stops only for files that can run commands later — re-read the books.',
      },
    ],
  },
};
