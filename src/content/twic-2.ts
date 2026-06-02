import type { LessonContent } from './types';

/** twic-2 (Feature B) — Claude-managed git worktrees (mid-session switching + unlocked cleanup).
 *  Same contract as twic-1. Source: Claude Code CHANGELOG 2.1.157. */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2. The story is git worktrees — separate working folders for the same repo, now something Claude can hop between mid-session and tidy up when it's done. Talk to the Beat Reporter, read the two books, then answer the door.",
  prompt:
    "A client wants you to spike a risky framework swap without disturbing the half-built demo on your main checkout. How does a Claude-managed git worktree let you do that?",
  choices: [
    { id: 'a', label: 'It gives the spike its own checked-out folder on its own branch, backed by the same repo, so your main checkout stays untouched while Claude works the experiment', correct: true },
    { id: 'b', label: 'It compresses every branch into a single directory to save disk space', correct: false },
    { id: 'c', label: 'It lets two people edit the same files at once over the network', correct: false },
    { id: 'd', label: 'It merges all of your branches together before the spike begins', correct: false },
  ],
  passFeedback: 'HIT! A worktree is a separate desk for the same project. The spike lives in its own folder on its own branch; your demo never moves.',
  failFeedback: 'MISS! Worktrees are about isolation, not compression, real-time collaboration, or auto-merging. Each one is a separate checkout of the same repo — re-read the books.',
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**One Repo, Many Desks — How Claude-Managed Worktrees Work**

**What a worktree actually is**

A git worktree is a second working directory backed by the same repository. Normally a clone gives you exactly one checked-out branch at a time, so switching branches means stashing or committing whatever is in flight. A worktree breaks that limit: each one is its own folder with its own checked-out branch, all sharing a single underlying repo and history. You can have the main branch open in one and an experiment open in another, side by side, with neither touching the other's files.

**What Claude does with them**

Claude Code can create and manage its own worktrees and step into them with \`EnterWorktree\`. As of 2.1.157, \`EnterWorktree\` *can now switch between Claude-managed worktrees mid-session* — Claude can move from one isolated workspace to another without restarting the session or losing the conversation. That makes it practical to keep several lines of work, each in its own folder, alive from a single sitting.

**Cleanup got friendlier**

The other 2.1.157 change is pure housekeeping. *Worktrees managed by Claude are now left unlocked when the agent finishes, so* \`git worktree remove\`*/*\`prune\` *can clean them up.* Before, a finished worktree could sit locked and resist an ordinary teardown; now the standard git commands sweep them away. The feature no longer accumulates clutter you have to fight.

> Takeaway: A worktree is a separate desk for the same project — Claude can now hop between its desks mid-session and sweep them up with plain git when it's done.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Spikes That Don't Touch the Deliverable — Worktrees on an Engagement**

**Isolation is the whole selling point**

The consulting use is risk containment. You have a half-built demo on your main checkout and the client asks, "could we do this in a different framework?" Instead of stashing your work and gambling the spike in the same directory, you let Claude run the experiment in its own worktree. The demo stays exactly as you left it; the spike lives in a separate folder on its own branch. If it flops, you delete the folder and nothing of value was ever at risk.

**Parallel tracks from one session**

Because Claude can now switch between worktrees mid-session, you can keep more than one track moving without spinning up separate sessions. One worktree carries the safe, shippable work; another holds the speculative rewrite; a third might host a throwaway reproduction of a client's bug. You move between them as the conversation calls for it, and each stays insulated from the others' changes.

**Leave the site clean**

Treat teardown as part of the job. When a spike is settled — merged or abandoned — remove its worktree with \`git worktree remove\` and let \`git worktree prune\` clear the stragglers. Because Claude now leaves its worktrees unlocked, that cleanup is one command, not a wrestling match. A tidy repo at hand-off is part of the deliverable.

> Takeaway: Run risky or parallel work in its own worktree so the deliverable is never the thing you're experimenting on — then sweep the experiments away when they're done.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `Set up a Claude-managed worktree so you can ____
on the ____ branch, while my main checkout keeps
the in-progress demo exactly as it is.
Switch into the worktree mid-session to do the work,
and when you're done, leave it ____ so I can clean up with ____.`,
    blanks: [
      { id: 'task', suggestions: ['spike the React 19 upgrade', 'try the risky billing refactor', 'rebuild the export pipeline'] },
      { id: 'branch', suggestions: ['spike/react-19', 'experiment/billing', 'feature/export-v2'] },
      { id: 'end-state', suggestions: ['unlocked', 'unlocked for cleanup', 'ready to prune'] },
      { id: 'cleanup', suggestions: ['git worktree remove', 'git worktree prune', 'a single git command'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "Git worktrees are separate working folders backed by the same repo, each on its own branch, so multiple branches stay checked out side by side. Claude manages its own (EnterWorktree) and, as of 2.1.157, can switch between them mid-session and leaves them unlocked when finished so git worktree remove/prune can clean them up. Use them to isolate risky or parallel work from the main deliverable.",
      beats: [
        { kind: 'say', text: "Story two: git worktrees. A worktree is a second working folder backed by the *same* repo — its own checked-out branch in its own directory. No stashing to switch branches; you just have them open side by side." },
        { kind: 'say', text: "Claude can create and step into its own worktrees with `EnterWorktree`. New in 2.1.157: it can now *switch between those worktrees mid-session* — moving between isolated workspaces without restarting or losing the conversation." },
        { kind: 'say', text: "Second change is cleanup. Claude's worktrees are now *left unlocked when it finishes*, so a plain `git worktree remove` or `prune` clears them. They used to sit locked and fight teardown — not anymore." },
        {
          kind: 'choice',
          prompt: "Quick check. You've got a live demo half-built on your main checkout and the client asks for a risky framework spike. Why reach for a worktree?",
          options: [
            { id: 'isolate', label: 'so the spike runs in its own folder on its own branch, leaving my main checkout untouched', correct: true, reaction: "Exactly. Same repo, separate desk. The demo stays put while the experiment lives somewhere it can't hurt anything." },
            { id: 'merge', label: 'so the demo and the spike share files and merge automatically', correct: false, reaction: "No — the whole point is isolation. Worktrees keep the two apart; nothing merges on its own." },
            { id: 'compress', label: 'so both branches compress into a single directory', correct: false, reaction: "Worktrees aren't about saving space. They're about keeping separate branches checked out at once without clobbering each other." },
          ],
        },
        { kind: 'say', text: "On an engagement that means risk containment: spike the scary idea in its own worktree, keep the deliverable on your main checkout, and delete the folder if the spike flops. Run a couple of tracks at once and switch between them as the work calls for it." },
        { kind: 'say', text: "The books cover the mechanics and the consulting playbook. The door asks how a worktree lets you spike without disturbing your demo — answer it and the key drops." },
      ],
    },
  },
  battle: {
    name: 'Snarl, the Branch-Tangler',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*knots two branches together with a wet slap* …one directory… all your work in one pile… stash it, lose it, mix it all up…",
    tauntLines: [
      "*smears your demo into the spike* who needs separate folders, hmm? let it all touch…",
      "*tangles a third branch in* you'll never untangle which change went where…",
    ],
    victoryLine: "*comes apart at the seams* …ugh… separate desks… you kept them apart… take the key…",
    questions: [
      {
        prompt:
          "A client wants you to spike a risky framework swap without disturbing the half-built demo on your main checkout. How does a Claude-managed git worktree let you do that?",
        choices: [
          { id: 'a', label: 'It gives the spike its own checked-out folder on its own branch, backed by the same repo, so your main checkout stays untouched while Claude works the experiment', correct: true },
          { id: 'b', label: 'It compresses every branch into a single directory to save disk space', correct: false },
          { id: 'c', label: 'It lets two people edit the same files at once over the network', correct: false },
          { id: 'd', label: 'It merges all of your branches together before the spike begins', correct: false },
        ],
        passFeedback: 'HIT! A worktree is a separate desk for the same project. The spike lives in its own folder on its own branch; your demo never moves.',
        failFeedback: 'MISS! Worktrees are about isolation, not compression, real-time collaboration, or auto-merging. Each one is a separate checkout of the same repo — re-read the books.',
      },
    ],
  },
};
