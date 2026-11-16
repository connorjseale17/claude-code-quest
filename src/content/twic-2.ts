import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — read-only git commands ask first in an untrusted repo.
 * Claude Code CHANGELOG 2.1.325 changed read-only git commands (the ones that
 * only inspect — git status, git log, git diff, etc.) to prompt for approval
 * when they would run in a repository that is NOT the session's project repo
 * and is NOT one you've trusted. In your own / trusted project, those reads run
 * as before. The gate is tied to the TRUST of the repository you're sitting in,
 * not to your permission mode.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.325: "Changed read-only git commands to ask
 *     first in a repository that isn't the project's or one you trusted."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room two. The Beat Reporter lowers her voice as a pale ghost drifts up through the floor of a chamber that, she notes, is not quite *your* chamber — you wandered into it from a repo you cloned an hour ago and never set up. This week's mid-item is a quiet but sharp change in 2.1.325: even a *read-only* git command now stops to ask first when it would run in a repository that isn't your project's and isn't one you've trusted. One book covers the mechanic — why a command that only *looks* can still be worth a pause; the other, how a consultant who hops between client repos all day puts that pause to work. Settle the books, take the key, then face the Revenant of the Borrowed Repo, who insists a glance never hurt anyone.",
  prompt:
    "You cloned a client's repo an hour ago, cd'd into it — it's not your project and you haven't marked it trusted — and you ask Claude to run `git status`. Under the 2.1.325 change, what happens?",
  choices: [
    { id: 'a', label: "Even though `git status` only reads, Claude asks you to approve it first, because the command would run in a repository that isn't your project's and isn't one you've trusted", correct: true },
    { id: 'b', label: "Nothing new — read-only git commands like `git status` always run without a prompt, in any repository", correct: false },
    { id: 'c', label: "Claude refuses it outright; git is fully blocked in any repository that isn't your own project", correct: false },
    { id: 'd', label: "It depends only on your permission mode — in acceptEdits or auto the command runs silently no matter which repo you're in", correct: false },
  ],
  passFeedback: "HIT! The gate is about the repo's trust, not the command's safety label. In a repository that isn't your project's and isn't trusted, even read-only git commands now ask first — a deliberate pause at an unfamiliar boundary.",
  failFeedback: "MISS! It's not 'always silent,' it's not a hard block, and it's not keyed to permission mode — in an untrusted, non-project repo even a read-only git command stops to ask. Re-read Book 1.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**A Glance Is Still a Step Into Someone Else's House — Why Read-Only Git Now Pauses**

**The commands that \"only look\"**

Git has a whole family of commands that don't change anything: \`git status\`, \`git log\`, \`git diff\`, \`git show\`. They inspect. Nothing is committed, nothing is pushed, nothing is rewritten. Because of that, Claude Code has always run them freely — a read is a read, and stopping to approve every \`git status\` would be noise. In your own project, that stays exactly true.

**Where the comfortable assumption gets thin**

The change in 2.1.325 draws a line you might not have been drawing yourself. The safety of a read-only command isn't only a property of the *command* — it's also a property of *where you're standing*. A repository you just cloned, or one you \`cd\`'d into that isn't the project you opened the session for, is a place you didn't set up. It carries its own git configuration, written by whoever made it, not by you. \"Read-only\" describes the git verb; it doesn't describe everything the surrounding repository has arranged.

**What actually changed**

So the rule got more careful, in a narrow and specific way. A read-only git command that would run in a repository that is *not* your session's project **and** is *not* one you've marked trusted now stops and **asks** before it runs. In the repo you're actually working in, and in any repo you've trusted, nothing changes — the reads flow as before. The prompt appears only at the unfamiliar boundary: a repo that is neither home nor vouched-for.

**Ask, not block**

Note the shape of it. This is a *prompt*, not a refusal. Claude isn't declaring git off-limits in strange repositories; it's surfacing a decision that used to be made silently on your behalf. You see which command, in which repo, and you say yes or no. The point is that stepping git into a directory you don't own is now a *choice you make on purpose*, not a thing that happens under you.

> Takeaway: Read-only git commands still run freely in your own and trusted repos, but in a repository that's neither, even a pure \`git status\` now pauses to ask — the trust boundary, not the command's label, is what triggers the gate.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**The Consultant Who Lives in Other People's Repos — Turning the Pause Into a Habit**

**This change was written for your week**

Think about how a consultant's day actually looks. You clone a prospect's codebase to scope an estimate. You pull a partner firm's repo to review their integration. You open three client checkouts side by side. You spend a large fraction of your hours standing in repositories that are *not your project and not yet trusted* — which is precisely the situation this gate was built for. For a lot of people the prompt will fire exactly when they've wandered somewhere they half-forgot they'd wandered.

**Read the prompt as a location check**

When that approval request appears on a plain \`git log\`, the useful instinct isn't annoyance — it's orientation. The prompt is telling you *where Claude is about to act*: in a repo that isn't the one you opened the session for. Nine times out of ten that's a cue to confirm you actually mean to be poking around in that client's checkout right now, and that the command is one you'd be comfortable having run there. It's a free \"wait, which repo am I in?\" at exactly the moment the answer matters.

**Trust deliberately, and only what you mean to**

The pressure-release valve is trust, and the discipline is to spend it on purpose. When a repository is genuinely yours to work in — your own project, a client checkout you've vetted and set up for the engagement — mark it trusted and the read-only reads go quiet again. But treat that as a deliberate act with a blast radius, not a reflex to make the prompt stop. A repo you clone to *glance* at, from a source you can't fully vouch for, is exactly the one to leave untrusted, so every git step into it stays a conscious one.

> Takeaway: If your work means living in other people's repositories, let the prompt be your \"which repo am I in?\" check, grant trust only to the checkouts you've actually vetted, and keep the glance-only clones gated on purpose.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `I spend my day hopping between client checkouts, so I lean on the 2.1.325 git behavior.
When a read-only command like ____ would run in a repo that's ____, Claude now ____ before running it.
I read that prompt as a ____ — a free check on which repository I'm actually standing in right now.
For a checkout I've genuinely vetted and set up, I ____ so the reads go quiet;
for a repo I only cloned to glance at, I leave it untrusted on purpose — so every git step into it stays a conscious one.`,
    blanks: [
      { id: 'read-cmd', suggestions: ['git status', 'git log', 'git diff'] },
      { id: 'untrusted', suggestions: ["neither my project nor one I've trusted", "not the repo I opened the session for", "cloned from a source I can't fully vouch for"] },
      { id: 'asks', suggestions: ['stops to ask me first', 'raises an approval prompt', 'pauses for my yes or no'] },
      { id: 'location-check', suggestions: ['location check', '"which repo am I in?" moment', 'orientation cue'] },
      { id: 'trust-it', suggestions: ['mark it trusted', 'grant it trust deliberately', 'vouch for it so the gate lifts'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "Read-only git in untrusted repos (Claude Code 2.1.325): read-only git commands — git status, git log, git diff, git show, the ones that only inspect — used to run freely everywhere. Now, if such a command would run in a repository that is NOT your session's project AND is NOT one you've marked trusted, Claude asks for approval first. In your own project and in trusted repos, nothing changes — the reads flow as before. The trigger is the TRUST of the repo you're standing in, not the command's read-only label and not your permission mode. It's a prompt, not a hard block: Claude surfaces a decision (which command, which repo) that used to be made silently. For a consultant who hops between client checkouts all day, read the prompt as a 'which repo am I in?' check; grant trust only to checkouts you've actually vetted, and leave glance-only clones untrusted so every git step into them is deliberate.",
      beats: [
        { kind: 'say', text: "Mid-item, room two. Small change in 2.1.325, sharper than it looks. It's about the git commands that only *read* — `git status`, `git log`, `git diff`. The ones that change nothing. Claude's always run those freely, and in your own project it still does." },
        { kind: 'say', text: "Here's the shift. The safety of a read-only command isn't only about the command — it's also about *where you're standing* when you run it. Picture a repo you cloned an hour ago, or one you `cd`'d into that isn't the project you opened the session for. You didn't set that place up. It carries its own git configuration, written by whoever made it, not you." },
        { kind: 'say', text: "So now: a read-only git command that would run in a repo that's *not* your project *and* not one you've trusted stops and *asks* first. Only at that boundary. Home repo, trusted repo — reads flow as before. The prompt shows up precisely where you've stepped somewhere neither yours nor vouched-for." },
        {
          kind: 'choice',
          prompt: "So what's the thing that actually triggers the new prompt — that `git status` is somehow a risky command now, or the trust of the repository you happen to be sitting in?",
          options: [
            { id: 'repo-trust', label: "The trust of the repo you're in — a non-project, untrusted repository is what triggers it", correct: true, reaction: "Exactly. The command didn't change; your *location* did. `git status` in your own project is as quiet as ever. The same command in a repo you cloned and never trusted is what earns the pause." },
            { id: 'command-risk', label: "The command — read-only git got reclassified as dangerous everywhere", correct: false, reaction: "No — it's not the verb, it's the ground under it. In your project and trusted repos those reads still run silently. The gate is about the repository, not a new risk label on `git status`." },
            { id: 'perm-mode', label: "Your permission mode — it only prompts in the stricter modes", correct: false, reaction: "Not that. This isn't keyed to the mode you're in; it's keyed to whether the repo is your project or trusted. Untrusted and not-your-project is what raises it, whatever gear you're running." },
          ],
        },
        { kind: 'say', text: "And notice it's an *ask*, not a block. Claude isn't declaring git off-limits in strange repos — it's surfacing a decision that used to be made silently for you. Which command, which repo, your call. Stepping git into a directory you don't own becomes a thing you do on purpose." },
        { kind: 'say', text: "Why this lands for *you* specifically: your day is other people's repositories. Clone a prospect's code to scope it, pull a partner's repo to review it, three client checkouts open at once. You live in exactly the non-project, not-yet-trusted spots this gate watches. When the prompt fires on a plain `git log`, read it as 'wait — which repo am I in?' It's a free orientation check at the moment it matters." },
        { kind: 'say', text: "The release valve is trust, and the discipline is spending it deliberately. A checkout you've genuinely vetted and set up for the engagement — mark it trusted, the reads go quiet. A repo you cloned just to glance at, from a source you can't fully vouch for — leave it untrusted, so every git step in stays conscious. Don't grant trust just to make a prompt stop." },
        { kind: 'say', text: "That's the mid-week lead. Take the key — then face the Revenant of the Borrowed Repo, a ghost who'll swear up and down that a glance never hurt anybody. Remind it whose house it's glancing in." },
      ],
    },
  },
  battle: {
    name: 'Revenant of the Borrowed Repo',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a pale shape rises through the floor of a chamber that isn't quite yours, trailing config files like cobwebs* …you cloned me an hour ago and never set me up… and now you'd have your operator *look* around, freely, as if a glance costs nothing in a house you don't own… *it drifts closer* …tell me true what the new rule does when you read in a borrowed repo, or drift here with me a while.",
    tauntLines: [
      "*flickers, offended* you'd tell me read-only git runs SILENT everywhere, same as always?! not here — not in a repo that's neither yours nor trusted; here even a glance stops to ask…",
      "*coils through a stack of someone else's commits* so you think it BLOCKS git outright in a strange house?! no — it asks, it doesn't bar the door; the choice is handed back to you, not taken away…",
      "*seeps between the floorboards* and you'd pin it on your permission mode, would you?! wrong boundary — it's the repo's trust that trips it, whatever gear you ride in…",
    ],
    victoryLine: "*the revenant thins to a wisp, the borrowed config curling away with it* …so the glance was never free in a house I didn't build… you pause at the threshold, you trust only what you've vetted, you step in on purpose… take the key, operator. mind whose repo you haunt next.",
    questions: [
      {
        prompt:
          "You cloned a client's repo an hour ago, cd'd into it — it's not your project and you haven't marked it trusted — and you ask Claude to run `git status`. Under the 2.1.325 change, what happens?",
        choices: [
          { id: 'a', label: "Even though `git status` only reads, Claude asks you to approve it first, because the command would run in a repository that isn't your project's and isn't one you've trusted", correct: true },
          { id: 'b', label: "Nothing new — read-only git commands like `git status` always run without a prompt, in any repository", correct: false },
          { id: 'c', label: "Claude refuses it outright; git is fully blocked in any repository that isn't your own project", correct: false },
          { id: 'd', label: "It depends only on your permission mode — in acceptEdits or auto the command runs silently no matter which repo you're in", correct: false },
        ],
        passFeedback: "HIT! The gate is about the repo's trust, not the command's safety label. In a repository that isn't your project's and isn't trusted, even read-only git commands now ask first — a deliberate pause at an unfamiliar boundary.",
        failFeedback: "MISS! It's not 'always silent,' it's not a hard block, and it's not keyed to permission mode — in an untrusted, non-project repo even a read-only git command stops to ask. Re-read Book 1.",
      },
    ],
  },
};
