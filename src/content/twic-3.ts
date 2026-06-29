import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — the `attribution.sessionUrl` setting: omit the claude.ai
 * session link from the commits and pull requests Claude creates, so a client's
 * git history stays a clean record of the work instead of a trail of links back
 * to your private sessions.
 * Final room — door target routes to the TwicStampScreen via currentTrack.
 * Source: Claude Code CHANGELOG 2.1.183 ("Added `attribution.sessionUrl` setting
 * to omit claude.ai session link from commits/PRs").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Final room of the issue, and the Beat Reporter closes on the marks Claude leaves behind in your git history. There's a setting, `attribution.sessionUrl`, that lets you omit the claude.ai session link from the commits and pull requests Claude creates — so a client's repository keeps a clean record about the work, not a trail of links back to your private sessions. The two pages on the desk cover what Claude signs its commits with and why a consultant trims that link on someone else's repo. Answer the last question of the week and the key is yours — but coiled around it is a wyrm that brands everything it touches with its own mark.",
  prompt:
    "You're committing work into a client's repository and you don't want a link back to your personal claude.ai session showing up in the commit history. Which setting handles that?",
  choices: [
    { id: 'a', label: "`attribution.sessionUrl` — set it to omit the claude.ai session link from the commits and PRs Claude creates", correct: true },
    { id: 'b', label: '`sandbox.credentials` — it strips identifying links out of any command output', correct: false },
    { id: 'c', label: '`--safe-mode` — it removes all attribution by disabling your customizations', correct: false },
    { id: 'd', label: 'There is no setting; you have to manually edit every commit message after the fact', correct: false },
  ],
  passFeedback: "HIT! `attribution.sessionUrl` is the switch: set it and the claude.ai session link is omitted from the commits and PRs Claude creates, so the link to your private session never enters the history.",
  failFeedback: "MISS! `sandbox.credentials` is about secrets, `--safe-mode` is about customizations, and you don't have to hand-edit commits. The setting that drops the session link is `attribution.sessionUrl` — re-read the books.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**\`attribution.sessionUrl\` — Dropping the Session Link From Your Commits**

**What Claude signs its work with**

When Claude Code helps you create a commit or open a pull request, it doesn't do it anonymously — it adds *attribution* marking the work as Claude-assisted. Part of that attribution has been a link back to the *claude.ai session* that produced the change: a URL pointing at the conversation behind the commit. It's a reasonable default — the link is a breadcrumb back to how a change came to be — but it's not always something you want written into the permanent record of a repository.

**What the setting does**

\`attribution.sessionUrl\`, added in the 2.1.183 release, is the switch for exactly that. Set it to omit the claude.ai session link from the commits and pull requests Claude creates. The change still gets made and still gets committed; what drops out is the session URL specifically — the pointer back to your private conversation no longer rides along in the commit message or the PR.

**A targeted omission**

What makes it easy to reach for is how narrow it is. It isn't a blanket "turn off all attribution" lever, and it doesn't change anything about how Claude writes the actual code or the commit. It removes one component — the session link — and leaves the rest of your workflow exactly as it was. You decide where that link belongs: keep it on your own projects, where the breadcrumb is handy, and omit it where the repository's history should stay free of it.

> Takeaway: \`attribution.sessionUrl\` omits the claude.ai session link from the commits and PRs Claude creates — a narrow switch that drops the pointer to your private session without touching anything else.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Clean Git History on Someone Else's Repo**

**The commit log is a deliverable too**

When you work in a client's repository, you're not just handing over code — you're writing into their permanent record. Every commit you make lives in their git history, readable by their engineers, their auditors, and whoever inherits the project years from now. That history is itself part of what you deliver, and it should read as a clean account of the work. A string of commits each carrying a URL back to *your* private claude.ai session is noise in that record at best, and at worst it's internal tooling detail leaking into a place you don't control.

**Why the link doesn't belong there**

On your own projects, a session link is a useful breadcrumb. On a client's repo it's the opposite: it ties their history to your personal accounts, invites questions you'd rather not field during a handoff, and clutters a log that should be about *their* change, not the conversation you had to produce it. The professional default on someone else's repository is to leave behind a record about the work and nothing more.

**Set it before the first commit**

So \`attribution.sessionUrl\` becomes part of how you set up for client work: flip it on for that repository before you let Claude commit, and the session links never enter the history in the first place — far cleaner than scrubbing them out of commit messages after the fact. Keep the default where the breadcrumb helps you; turn it off where the history isn't yours to clutter.

> Takeaway: On a client's repository, omit the session link so the git history stays a clean account of the work — set it before the first commit, not after.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `We're about to start committing into the client's repository, so before Claude makes a single commit, turn on attribution.sessionUrl.
That keeps ____ out of their git history entirely.
Their commit log is part of what we hand over, so it should read as ____ and nothing more.
Set this now rather than ____ later — once the links are in the history, they're a pain to remove.
On our own projects we can keep the breadcrumb; here, the ____ isn't ours to clutter.`,
    blanks: [
      { id: 'link', suggestions: ['the claude.ai session link', 'pointers back to my private session', 'the session URL'] },
      { id: 'record', suggestions: ['a clean account of the work', 'a record about their change', 'the work itself'] },
      { id: 'action', suggestions: ['scrubbing links out of commit messages', 'editing every commit by hand', 'cleaning up the history'] },
      { id: 'history', suggestions: ["client's history", 'commit log', 'repository record'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "`attribution.sessionUrl` (shipped in 2.1.183) omits the claude.ai session link from the commits and pull requests Claude creates. When Claude helps make a commit or open a PR, it adds attribution, and part of that has been a URL back to the claude.ai session behind the change. This setting drops that link specifically — the code and commit still happen, the pointer to your private conversation just doesn't ride along. It's narrow: not a blanket attribution kill-switch, and it doesn't change the code. The consultant's move is to set it on a client's repo before the first commit, so their git history stays a clean account of the work instead of a trail of links to your personal sessions; keep the default where the breadcrumb actually helps you.",
      beats: [
        { kind: 'say', text: "Last story of the week is about the marks I leave in your git history. New setting in the 2.1.183 release: `attribution.sessionUrl`. Turn it on and the claude.ai session link is omitted from the commits and pull requests I create." },
        { kind: 'say', text: "Here's the background. When I help you make a commit or open a PR, I don't do it anonymously — I add attribution marking the work as Claude-assisted. Part of that has been a link back to the claude.ai *session* that produced the change. A breadcrumb to how the change came to be." },
        { kind: 'say', text: "On your own projects that breadcrumb is handy. But it's not always something you want written into a repository's permanent record — and that's exactly what this setting controls. Flip it on and the session URL stops riding along in the commit message and the PR. The code and the commit still happen; just the link drops out." },
        {
          kind: 'choice',
          prompt: "Put it in context. You're committing into a *client's* repo and you don't want links back to your private sessions in their history. What's the right move?",
          options: [
            { id: 'set-it', label: 'Set `attribution.sessionUrl` on that repo before the first commit, so the links never enter the history', correct: true, reaction: "Exactly. Set it up front and the session links never land in their log at all — far cleaner than scrubbing them out of commit messages after the fact." },
            { id: 'manual', label: "There's no setting — you just hand-edit each commit message afterward", correct: false, reaction: "No need, and that's the painful way. `attribution.sessionUrl` does it for you, and doing it before the first commit beats cleaning up later." },
            { id: 'safe-mode', label: 'Launch with `--safe-mode` to strip the attribution', correct: false, reaction: "Wrong switch — that's about disabling your customizations, not your commit attribution. The one you want is `attribution.sessionUrl`." },
          ],
        },
        { kind: 'say', text: "Why it matters: a client's commit log is part of what you deliver. Their engineers read it, their auditors read it, whoever inherits the project years from now reads it. It should be a clean account of the work — not a string of commits each pointing at *your* private claude.ai conversation." },
        { kind: 'say', text: "So make it part of how you set up for client work: flip it on for their repo before I commit anything, and the history stays about their change. Keep the default on your own projects, where the breadcrumb earns its place. Match the setting to whose record it is." },
        { kind: 'say', text: "That's the issue. The books on the desk have what the attribution carries and the before-the-first-commit playbook. The door wants to know which setting drops the session link from your commits — answer it, and the wyrm gives up the last key of the week." },
      ],
    },
  },
  battle: {
    name: 'Sigil, the Branding Wyrm',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*uncoils over a hoard of commits, each one stamped with a link back to its lair* …every change you make through me carries my mark home… your client's history, signed in my name… and you never even noticed…",
    tauntLines: [
      "*drags a claw down the commit log, leaving session links in the wound* sandbox your secrets all you like — wrong drawer; this is about what I write into their record…",
      "*snorts smoke over a pull request* `--safe-mode`? that strips your customizations, not my signature — you're naming the wrong switch…",
    ],
    victoryLine: "*the brand fades from every commit, the log clean at last* …`attribution.sessionUrl`… you cut the link to your session out of their history… nothing of mine left in their record… take the last key of the week…",
    questions: [
      {
        prompt:
          "You're committing work into a client's repository and you don't want a link back to your personal claude.ai session showing up in the commit history. Which setting handles that?",
        choices: [
          { id: 'a', label: "`attribution.sessionUrl` — set it to omit the claude.ai session link from the commits and PRs Claude creates", correct: true },
          { id: 'b', label: '`sandbox.credentials` — it strips identifying links out of any command output', correct: false },
          { id: 'c', label: '`--safe-mode` — it removes all attribution by disabling your customizations', correct: false },
          { id: 'd', label: 'There is no setting; you have to manually edit every commit message after the fact', correct: false },
        ],
        passFeedback: "HIT! `attribution.sessionUrl` is the switch: set it and the claude.ai session link is omitted from the commits and PRs Claude creates, so the link to your private session never enters the history.",
        failFeedback: "MISS! `sandbox.credentials` is about secrets, `--safe-mode` is about customizations, and you don't have to hand-edit commits. The setting that drops the session link is `attribution.sessionUrl` — re-read the books.",
      },
    ],
  },
};
