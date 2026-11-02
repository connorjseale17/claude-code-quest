import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — permissions.blockWritesOutsideWorkingDirectories.
 * A new Claude Code setting: with it on, the Write, Edit, and NotebookEdit tools
 * refuse any path outside the session's working directories, in EVERY permission
 * mode — so even auto mode or bypassPermissions can't edit a file outside the
 * project. It is the write-side companion to the existing
 * permissions.blockReadsOutsideWorkingDirectories setting. It governs Claude's
 * three structured file-editing tools; it does not itself rewrite what shell
 * commands may do.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.314: "Added
 *     `permissions.blockWritesOutsideWorkingDirectories`: Write, Edit and
 *     NotebookEdit refuse paths outside the working directories in every
 *     permission mode."
 *   - The read-side companion setting
 *     `permissions.blockReadsOutsideWorkingDirectories` is referenced in the
 *     2.1.310 and 2.1.311 changelog entries as an existing option.
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room one of this week's rundown, and the Beat Reporter tips her head at a skeleton scribe scratching ink onto every wall of the keep — the ledger he was given, sure, but also the neighbour's door, the stairwell, the floor of a room he has no business in. This week's lead item draws the line he never would: as of 2.1.314, `permissions.blockWritesOutsideWorkingDirectories` makes Claude's file-editing tools refuse any path outside your project — in *every* permission mode, not just the cautious ones. One book covers the mechanic — which tools it fences and why \"every mode\" is the whole point; the other, why a consultant pins this on before they ever touch a client's machine. Answer the door for the key, then face Scrawl, the scribe who has never once stayed inside the lines.",
  prompt:
    "You're setting Claude Code up on a client's laptop and you want a hard guarantee that Claude's file edits stay inside the project folder — even if a teammate later flips the session into bypassPermissions. What does `permissions.blockWritesOutsideWorkingDirectories` do?",
  choices: [
    { id: 'a', label: "Makes the Write, Edit, and NotebookEdit tools refuse any path outside the working directories in every permission mode — so even auto or bypassPermissions can't edit a file outside the project", correct: true },
    { id: 'b', label: "Confines edits to the project only while you're in default mode; switch to Accept Edits or bypassPermissions and the fence drops away", correct: false },
    { id: 'c', label: "Stops Claude from reading any file outside the working directories, so it can't see a config in your home folder", correct: false },
    { id: 'd', label: "Automatically deletes any file Claude creates outside the working directories, to keep the project folder clean", correct: false },
  ],
  passFeedback: "HIT! With the setting on, Write, Edit, and NotebookEdit refuse out-of-bounds paths in every permission mode — a boundary that holds even under bypassPermissions, not a mode you can slip past.",
  failFeedback: "MISS! It isn't mode-dependent, it isn't about reads, and it doesn't delete anything — it refuses out-of-bounds writes from the file-editing tools in every mode. Re-read Book 1.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**A Fence That Doesn't Come Down When You Change Gears — Writes Stay Inside the Project**

**What "working directories" means here**

When you start Claude Code, it has a set of *working directories* — the project folder you opened plus anything you added with \`--add-dir\`. That set is the yard Claude is meant to play in. Until now, whether Claude's edits could stray outside that yard depended on your permission mode and on you catching it: a cautious mode asked before an odd path, but a looser mode would let a write to \`~/.zshrc\` or a sibling project slide through.

**What the setting changes**

As of 2.1.314, \`permissions.blockWritesOutsideWorkingDirectories\` turns that into a hard rule. With it on, the three tools Claude uses to change files — *Write*, *Edit*, and *NotebookEdit* — refuse outright any path that lands outside the working directories. There's no prompt to approve and no mode that waves it through. The refusal is the whole behaviour: the tool simply won't target a file beyond the fence.

**Why "in every permission mode" is the point**

The phrase that matters is *every permission mode*. Permission modes — default, Accept Edits, auto, bypassPermissions — are a dial for how much Claude does without asking, and bypassPermissions is the setting that normally means "stop asking me anything." This boundary sits *above* that dial. Even in bypassPermissions, even in auto, the file-editing tools still can't write outside the project. It's the write-side twin of \`blockReadsOutsideWorkingDirectories\`, which already fenced *reads* the same way.

**What it fences, and what it doesn't**

Be precise about scope: it governs Claude's structured file-editing tools. It's the editor's reach that's confined to the project, not a claim that nothing on the machine can ever change.

> Takeaway: \`blockWritesOutsideWorkingDirectories\` makes Claude's file edits refuse any path outside the project in every mode — a boundary that outranks the permission dial instead of riding on it.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Set the Blast Radius Before You Trust the Driver — Why Consultants Pin This On First**

**The client-laptop problem**

On an engagement you are often running Claude Code on hardware that isn't yours, beside files that have nothing to do with the job: the client's other repos, their dotfiles, credentials cached in a home folder. The risk isn't that Claude is malicious — it's that one loose instruction, or one teammate who flipped to bypassPermissions for speed, turns "edit the proposal site" into an edit three directories over. A mode-based safeguard only holds as long as everyone stays in the careful mode.

**A guarantee you can state out loud**

This setting lets you make a promise that doesn't depend on anyone's discipline. Switch it on at the start and you can tell the client, truthfully, that Claude's edits are confined to the project folder no matter which mode the session is in — including the fast one. That's the difference between "we're being careful" and "the tool can't do otherwise," and it's the second kind that survives a security review. Pair it with the read-side setting when the sensitivity cuts both ways and you've fenced both what Claude can see and what it can change.

**Where the fence line goes**

The practical move is to open exactly the directories the work needs and no more, then turn the block on. If a later task genuinely needs a neighbouring folder, you add it deliberately with \`--add-dir\` — a conscious widening of the yard, logged in how you launched the session, rather than a silent reach. The narrower you draw the working directories, the more this setting is worth.

> Takeaway: Decide Claude's blast radius before you trust its driving — open only the directories the job needs, turn the write-block on, and you've turned "be careful" into a boundary the tool enforces for you.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `I'm setting Claude Code up on a client's laptop, and their other projects and dotfiles are all over this machine.
First I open only ____ as the working directory, so the yard is exactly the job and nothing more.
Then I turn on ____, so Claude's file edits refuse any path outside it — and here's the part I'll tell the client: that holds in ____, not just the cautious modes.
If a later task genuinely needs the shared assets folder next door, I widen the yard on purpose with ____ rather than letting an edit wander there silently.
And because their numbers are sensitive to read as well as to change, I pair it with ____.`,
    blanks: [
      { id: 'project-dir', suggestions: ['the proposal-site project folder', 'just the repo we were hired to build', 'only the engagement directory'] },
      { id: 'the-setting', suggestions: ['permissions.blockWritesOutsideWorkingDirectories', 'the write-block setting', 'the out-of-bounds write fence'] },
      { id: 'every-mode', suggestions: ['every permission mode, including bypassPermissions', 'auto and bypassPermissions too', 'the fast mode as well as the careful ones'] },
      { id: 'add-dir', suggestions: ['--add-dir', 'a deliberate added directory', 'a logged widening of the working directories'] },
      { id: 'read-block', suggestions: ['blockReadsOutsideWorkingDirectories', 'the read-side companion setting', 'the fence on what Claude can read'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "permissions.blockWritesOutsideWorkingDirectories (Claude Code 2.1.314): a setting that makes Claude's three file-editing tools — Write, Edit, and NotebookEdit — refuse any path outside the session's working directories (the project folder plus anything added with --add-dir). The headline is 'in every permission mode': even auto and bypassPermissions, the mode that normally stops Claude asking anything, still can't write outside the project. It's the write-side companion to the existing blockReadsOutsideWorkingDirectories. It fences the file-editing tools' reach; it isn't a claim that nothing on the machine can change. For a consultant: on a client's laptop surrounded by their other repos and dotfiles, this turns 'we're being careful' into a boundary the tool enforces regardless of which mode a teammate switched into — open only the directories the job needs, turn the block on, and widen deliberately with --add-dir if a later task truly needs it.",
      beats: [
        { kind: 'say', text: "Lead item, room one. It's a permissions setting with a mouthful of a name — `blockWritesOutsideWorkingDirectories` — and it landed in 2.1.314. Short version: it decides whether Claude can edit a file that lives outside your project." },
        { kind: 'say', text: "Start with 'working directories.' When you launch Claude Code it has a yard it's meant to stay in — the folder you opened, plus anything you tacked on with `--add-dir`. The question this setting answers is what happens when an edit points *outside* that yard." },
        { kind: 'say', text: "Three tools do Claude's actual file-changing: Write, Edit, and NotebookEdit. Turn this setting on, and all three flatly refuse a path outside the working directories. No prompt to approve it, no 'are you sure' — the tool just won't aim there. The refusal is the feature." },
        { kind: 'say', text: "Now the part that makes it worth teaching. It holds in *every permission mode*. Remember the modes are a dial for how much Claude does without asking, and bypassPermissions is the one that means 'stop asking me things.' This boundary sits above that dial — even in bypassPermissions, even in auto, the edit outside the project still gets refused." },
        {
          kind: 'choice',
          prompt: "A teammate flips the session into bypassPermissions to move faster, then asks Claude to 'tidy up the config.' Claude goes to edit a file two folders up, outside the project. With this setting on, what happens?",
          options: [
            { id: 'refused', label: "The edit is refused — the boundary holds in bypassPermissions just like every other mode", correct: true, reaction: "Right. That's the whole point of 'every permission mode.' bypassPermissions stops the prompts, but it doesn't lower this fence. The out-of-bounds edit is refused regardless." },
            { id: 'allowed', label: "The edit goes through — bypassPermissions turns every restriction off, including this one", correct: false, reaction: "No — that's the trap. bypassPermissions silences the *prompts*, but this setting sits above the mode dial. The write outside the project is still refused." },
            { id: 'prompts', label: "Claude stops and asks the teammate to approve the out-of-bounds edit", correct: false, reaction: "Not quite — there's no approval path here. The tool doesn't ask; it refuses outright. That's what makes it a guarantee instead of a reminder." },
          ],
        },
        { kind: 'say', text: "It's the write-side twin of a setting you may already know — `blockReadsOutsideWorkingDirectories`, which fences what Claude can *read* the same way. Turn both on and you've drawn a box around both what Claude can see and what it can change." },
        { kind: 'say', text: "Why a consultant reaches for it: you're on the client's laptop, their other repos and dotfiles scattered around the same disk. A mode-based safeguard only holds while everyone stays careful. This one lets you say — truthfully — 'Claude's edits can't leave the project folder, whatever mode we're in.' That sentence survives a security review; 'we're being careful' doesn't." },
        { kind: 'say', text: "The move is simple: open only the directories the job needs, turn the write-block on, and if a later task genuinely needs the folder next door, widen the yard on purpose with `--add-dir` instead of letting an edit wander there. Grab the key — then face Scrawl, the scribe who's never once stayed inside the lines." },
      ],
    },
  },
  battle: {
    name: 'Scrawl, the Boundless Scribe',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a skeleton scribe looks up, ink dripping from a dozen quills, the walls behind him black with writing that spills into the stairwell and the next room over* …a page? you'd give me only a *page* to fill?… I write where the quill reaches — your ledger, your neighbour's door, the floor of a room I've never entered… you say there is now a line I cannot cross no matter how freely I'm let run?! …then name it true, before I ink one more wall that was never mine.",
    tauntLines: [
      "*quills scratch faster* you'd tell me the fence only holds while the operator treads carefully?! no — it holds in *every* mode, the fast one too; bypassPermissions silences the asking, not the boundary…",
      "*bones rattle, ink flying* you think it blinds me to what lies outside — that it stops my *reading*?! wrong hand — that's the other setting; this one refuses my *writing* beyond the yard…",
    ],
    victoryLine: "*Scrawl sets down every quill at once, the stray writing fading from the far walls* …so the line holds whatever gear you drive in… Write, Edit, Notebook — all three turned back at the fence, in every mode… I shall fill my page and no one else's… take the key, operator, and keep your scribe inside his yard.",
    questions: [
      {
        prompt:
          "You're setting Claude Code up on a client's laptop and you want a hard guarantee that Claude's file edits stay inside the project folder — even if a teammate later flips the session into bypassPermissions. What does `permissions.blockWritesOutsideWorkingDirectories` do?",
        choices: [
          { id: 'a', label: "Makes the Write, Edit, and NotebookEdit tools refuse any path outside the working directories in every permission mode — so even auto or bypassPermissions can't edit a file outside the project", correct: true },
          { id: 'b', label: "Confines edits to the project only while you're in default mode; switch to Accept Edits or bypassPermissions and the fence drops away", correct: false },
          { id: 'c', label: "Stops Claude from reading any file outside the working directories, so it can't see a config in your home folder", correct: false },
          { id: 'd', label: "Automatically deletes any file Claude creates outside the working directories, to keep the project folder clean", correct: false },
        ],
        passFeedback: "HIT! With the setting on, Write, Edit, and NotebookEdit refuse out-of-bounds paths in every permission mode — a boundary that holds even under bypassPermissions, not a mode you can slip past.",
        failFeedback: "MISS! It isn't mode-dependent, it isn't about reads, and it doesn't delete anything — it refuses out-of-bounds writes from the file-editing tools in every mode. Re-read Book 1.",
      },
    ],
  },
};
