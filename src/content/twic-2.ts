import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — `"attribution": false`. By default Claude Code stamps
 * attribution on the git work it produces: a Co-Authored-By trailer on commit
 * messages and a generated-with footer on pull-request descriptions. Claude Code
 * adds a single settings.json boolean, `"attribution": false`, that hides ALL of
 * that attribution — commit trailer and PR footer alike. It governs what Claude
 * adds going forward; it is not a rewrite of existing history.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.281: "Added `"attribution": false` in
 *     `settings.json` to hide all commit/PR attribution"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room two, and the Beat Reporter steps around a wraith busy autographing every scrap of parchment that drifts past it. This week's item is one setting with an outsized reach: 2.1.281 adds `\"attribution\": false` to `settings.json`, a single switch that hides *all* of the attribution Claude Code stamps on your work — the co-author line it adds to commits and the generated-with footer it adds to pull requests. One book covers the mechanic and exactly what it silences; the other, why a consultant matches a client's commit log to the client's house style. Take the key from the door, then face Colophon, a wraith that cannot stop signing its name on things that were never asked to carry it.",
  prompt:
    "By default Claude Code adds attribution to your git work. What does setting `\"attribution\": false` in settings.json do?",
  choices: [
    { id: 'a', label: "Hides all of Claude Code's commit and PR attribution going forward — the Co-Authored-By trailer and the generated-with footer alike", correct: true },
    { id: 'b', label: "Hides your own identity from the model, so it can't see who is driving the session", correct: false },
    { id: 'c', label: "Strips the co-author trailers out of your existing commit history, rewriting past commits", correct: false },
    { id: 'd', label: "Disables commit signing, so your commits are no longer GPG-verified", correct: false },
  ],
  passFeedback: "HIT! One boolean in settings.json turns off every bit of attribution Claude Code would add — the commit trailer and the PR footer both — for the work you do from here on.",
  failFeedback: "MISS! It's not about your identity, it doesn't rewrite past commits, and it has nothing to do with GPG signing. It hides the attribution Claude adds going forward. Re-read Book 1.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**\`"attribution": false\` — The One Switch That Silences the Signature**

**What Claude signs, and where**

Out of the box, Claude Code leaves a mark on the git work it helps you produce. When it writes a commit, it appends an attribution trailer — a \`Co-Authored-By\` line naming the tool as a co-author of the change. When it drafts a pull request, it adds a short footer to the description noting the work was generated with Claude Code. Neither is loud, and for plenty of people neither is a problem. But they *are* there, on every commit and every PR, quietly stamped into the permanent record of the repository.

**The setting that turns all of it off**

As of 2.1.281 there's a single lever for it: set \`"attribution": false\` in your \`settings.json\`, and Claude Code hides *all* of that attribution. Not just the commit trailer, not just the PR footer — both, in one boolean. It's the clean off-switch the feature is named for: one key, one value, and Claude stops signing its name on the git history it touches.

**Where the switch lives**

Because it's an ordinary \`settings.json\` key, it obeys the usual layering — you can set it in your user settings to apply everywhere you work, or in a project's \`.claude/settings.json\` so the rule travels with that one repository. That per-project home is the useful one for consulting: the switch belongs to the repo, so anyone working in it inherits the same clean-history behavior without having to remember a personal preference.

> Takeaway: \`"attribution": false\` in settings.json is a single boolean that hides *all* of Claude Code's commit and PR attribution — the co-author trailer and the generated-with footer both.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Match the Client's House Style — Why the Commit Log Is a Deliverable**

**The history is part of what you hand over**

When you finish an engagement, the code isn't the only thing the client keeps — they keep the *git history* too, and a lot of teams care about it more than you'd expect. Some run strict commit conventions. Some have a policy against third-party tool trailers appearing in their record. Some simply don't want a \`Co-Authored-By\` line on a commit that a partner will one day read with a raised eyebrow. On those repos, an attribution footer isn't a nice touch — it's a small, permanent mismatch with the client's house style, multiplied across every commit you make.

**Set it once, per repo — don't fight it by hand**

The wrong way to handle this is to notice the trailer after the fact and hand-edit it out of each message, which you'll forget to do exactly when it matters. The right way is the switch. Drop \`"attribution": false\` into the project's \`.claude/settings.json\` at the start of the engagement, and every commit and PR from that point on matches the client's convention automatically. The rule lives with the repo, so it holds no matter who on your team picks the work up next.

**A deliberate choice, forward-looking**

Two things to keep straight. First, the setting is a *choice*, not a mandate — plenty of internal or open-source work is better *with* attribution, and leaving it on is perfectly legitimate. The point is that you now decide, rather than accept a default you didn't pick. Second, it governs what Claude adds *going forward* — flip it today and today's commits come out clean; it isn't a tool for rewriting the trailers already sitting in yesterday's history.

> Takeaway: Treat the commit log as a deliverable — set \`"attribution": false\` per repo when a client's house style calls for it, knowing it's a deliberate, forward-looking choice, not a rewrite of past commits.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `I'm starting an engagement on a client's repo, and their team keeps a strict ____.
By default, Claude Code would stamp a ____ on every commit and a footer on every PR.
Their policy has no room for that, so I set ____ in the project's .claude/settings.json.
From that point on, all of the tool's ____ is hidden — commit trailer and PR footer both.
I set it ____ so the rule travels with the repo and holds for whoever picks the work up next.`,
    blanks: [
      { id: 'convention', suggestions: ['commit convention', 'set of house rules for its history', 'no-third-party-trailers policy'] },
      { id: 'trailer', suggestions: ['Co-Authored-By trailer', 'co-author line', 'attribution trailer'] },
      { id: 'setting', suggestions: ['"attribution": false', 'the attribution switch to false', 'attribution off'] },
      { id: 'attribution', suggestions: ['attribution', 'signature', 'generated-with marking'] },
      { id: 'scope', suggestions: ['at project scope', 'in the repo\'s own settings', 'per repository'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "`\"attribution\": false` (Claude Code 2.1.281): by default Claude Code stamps attribution on the git work it produces — a Co-Authored-By trailer on commit messages and a generated-with footer on pull-request descriptions. Setting `\"attribution\": false` in settings.json hides ALL of it at once: commit trailer and PR footer alike, in one boolean. It's an ordinary settings.json key, so it layers like the others — set it in user settings to apply everywhere, or in a project's .claude/settings.json so the rule travels with that repo (the useful scope for consulting). Two caveats: it's a deliberate choice, not a mandate (leaving attribution on is fine for internal/open-source work), and it governs what Claude adds going forward — it does not rewrite trailers already in existing history. For a consultant, a client's commit log is a deliverable; match its house style with the switch instead of hand-editing every message.",
      beats: [
        { kind: 'say', text: "Room two, small item, sharp edge. This one's about what I leave behind in your git history — and by default, I sign my work." },
        { kind: 'say', text: "Two places. When I write a commit, I add a `Co-Authored-By` trailer naming the tool as a co-author. When I draft a pull request, I add a little footer to the description saying the work was generated with Claude Code. Quiet, permanent, on every commit and every PR." },
        { kind: 'say', text: "As of 2.1.281 there's one switch for all of it: `\"attribution\": false` in your settings.json. Set it, and I hide the whole lot — the commit trailer and the PR footer both. One boolean, and I stop signing my name on your history." },
        {
          kind: 'choice',
          prompt: "You add `\"attribution\": false` to a project's settings.json. What have you turned off?",
          options: [
            { id: 'both', label: "Both the commit co-author trailer and the PR footer, going forward", correct: true, reaction: "Exactly. It's all-or-nothing in the good way — one key hides both, on every commit and PR I make from here on. Clean log." },
            { id: 'identity', label: "My own identity, so you can't see who's driving", correct: false, reaction: "No — it's about what I *stamp on the work*, not what I can see. Your identity isn't the subject; my signature is." },
            { id: 'rewrite', label: "The trailers already sitting in past commits, rewritten out", correct: false, reaction: "Careful — it's forward-looking. It governs what I add from now on; it doesn't reach back and rewrite yesterday's history." },
          ],
        },
        { kind: 'say', text: "Why it matters on an engagement: the history is part of what the client keeps. Some teams run strict commit conventions, some have a flat policy against third-party trailers, some just don't want a co-author line a partner will read later. On those repos, my default signature is a small permanent mismatch — times every commit." },
        { kind: 'say', text: "So set it once, per repo, in the project's `.claude/settings.json`, right at the start. Every commit and PR after that matches their style automatically, for whoever on your team picks it up. Beats noticing the trailer afterward and hand-editing every message — you'll forget exactly when it counts." },
        { kind: 'say', text: "Two things to keep straight, then the door. It's a *choice*, not a rule — internal or open-source work is often better *with* attribution, and leaving it on is fine. And it's forward-looking, not a history rewrite. Past that door: Colophon, a wraith that autographs everything it touches whether or not anyone wanted the signature. Show it the switch that finally quiets the pen." },
      ],
    },
  },
  battle: {
    name: 'Colophon, the Signing Wraith',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a translucent wraith drifts up, an endless quill scratching its mark on every page in reach* …another one to sign for… I mark all I touch — a trailer on each commit, a footer on each request — it is my nature, operator, I cannot *not* sign… you say there is a single switch that stills my hand? …tell me true what \`\"attribution\": false\` silences before I set the quill down.",
    tauntLines: [
      "*the quill scratches faster* you think my signature is about *you* — that the switch hides the *operator's* name from sight? no… it hides *my* mark, the tool's attribution, not who drives the session…",
      "*wails, gesturing at a ledger of old pages* you'd have it *unsign the past* — reach back and strip the trailers from commits long written? never… the switch is forward-looking, it stays my hand from *here on*, it does not rewrite what's done…",
    ],
    victoryLine: "*Colophon lifts the quill from the page and, for the first time, leaves it blank* …one boolean… both marks, the commit's and the request's, gone at once… and only going forward, as you said… take the key, operator, and let the history read as the client keeps it…",
    questions: [
      {
        prompt:
          "By default Claude Code adds attribution to your git work. What does setting `\"attribution\": false` in settings.json do?",
        choices: [
          { id: 'a', label: "Hides all of Claude Code's commit and PR attribution going forward — the Co-Authored-By trailer and the generated-with footer alike", correct: true },
          { id: 'b', label: "Hides your own identity from the model, so it can't see who is driving the session", correct: false },
          { id: 'c', label: "Strips the co-author trailers out of your existing commit history, rewriting past commits", correct: false },
          { id: 'd', label: "Disables commit signing, so your commits are no longer GPG-verified", correct: false },
        ],
        passFeedback: "HIT! One boolean in settings.json turns off every bit of attribution Claude Code would add — the commit trailer and the PR footer both — for the work you do from here on.",
        failFeedback: "MISS! It's not about your identity, it doesn't rewrite past commits, and it has nothing to do with GPG signing. It hides the attribution Claude adds going forward. Re-read Book 1.",
      },
    ],
  },
};
