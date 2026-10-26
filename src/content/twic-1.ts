import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — review levels in Code Review.
 * Claude's Code Review (the automated reviewer that comments on GitHub pull
 * requests) gained three review levels: Quick, Standard (the default), and Deep.
 * An organization owner sets a default level for the whole org, and individual
 * repositories can be given their own level, so review depth is matched to a
 * repo's stakes instead of one depth applying everywhere. A separate admin
 * option lets Code Review cover every repository in a GitHub organization,
 * including repos added later, without selecting them one at a time.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.304: "Added review levels to Code Review:
 *     Owners choose Quick, Standard (the default), or Deep for the organization"
 *     and individual repositories can be given their own level.
 *   - Claude Code CHANGELOG 2.1.304: "Added an option in Code Review admin
 *     settings to review every repository in a GitHub organization," including
 *     ones added later, without selecting them one by one.
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room one of this week's rundown, and the Beat Reporter nods at a skeleton clerk who reviews every pull request at exactly the same grinding pace — a one-line typo fix and a rewrite of the payments path both get the same stamp, no more, no less. This week's lead item retires that one-speed habit: as of 2.1.304, Claude's Code Review has three *review levels* — Quick, Standard, and Deep — set as a default for your whole organization and overridable on any single repository. One book covers the mechanic — the three tiers and where you set them; the other, why a consultant tunes review depth to each repo's stakes instead of reviewing everything the same. Answer the door for the key, then face Rote, the auditor who's never once changed his pace for anyone.",
  prompt:
    "Your client runs Claude's Code Review across a GitHub organization whose repositories range from a throwaway docs site to the core payments service. How do the new review levels let you match review depth to each repo?",
  choices: [
    { id: 'a', label: "Set an org-wide default — Quick, Standard, or Deep — and give individual high-stakes repos their own level, so each repo is reviewed at the depth its risk warrants", correct: true },
    { id: 'b', label: "There's a single fixed review depth for the whole org; you can choose whether a review runs, but not how thorough it is", correct: false },
    { id: 'c', label: "Depth is chosen fresh by the author on every pull request; there's no organization or per-repository setting", correct: false },
    { id: 'd', label: "Only Deep is assignable; Quick and Standard run automatically and can't be pinned to a specific repo", correct: false },
  ],
  passFeedback: "HIT! Code Review now has three levels — Quick, Standard (the default), and Deep — set as an org-wide default and overridable per repository, so review depth matches each repo's stakes.",
  failFeedback: "MISS! It isn't one fixed depth, a per-PR author choice, or Deep-only. Owners pick an org default and can override it on any single repo. Re-read Book 1.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**Three Speeds for the Reviewer — Quick, Standard, and Deep, Set Where It Counts**

**Code Review used to run at one depth**

Code Review is the automated reviewer that reads your pull requests on GitHub and leaves comments — a second set of eyes on every change before it merges. Until now it ran at a single thoroughness: every PR, in every repository, got the same pass. A one-character config tweak and a reworking of the auth layer were read with identical weight, which meant either over-reviewing the trivial or under-reviewing the dangerous, with no way to tell the two apart.

**The three levels**

As of 2.1.304 the reviewer has three *review levels*. *Quick* is a fast, light pass — the right touch for low-stakes changes where you mainly want a sanity check. *Standard* is the default, the balanced middle you'd reach for on ordinary work. *Deep* is the thorough read, slower and more exhaustive, for the changes where a missed defect is expensive. The level doesn't decide *whether* a review happens; it decides *how hard* the reviewer looks.

**Where you set it**

An organization owner picks one of the three as the default for the whole org, so every repository inherits a sensible baseline without per-repo fiddling. From there, any individual repository can be given its own level, overriding the default where its stakes differ. The org default is the floor everyone stands on; the per-repo override is how you lift the handful of repos that deserve a harder look — or drop the ones that don't need one.

> Takeaway: Code Review now has Quick, Standard, and Deep levels — an org-wide default you set once, overridable on any single repository, so the reviewer's thoroughness is a dial, not a constant.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Tune Depth to Stakes — and Make Sure No Repo Slips the Net**

**Not every repo earns the same scrutiny**

On a client's engagement the repositories in front of you are rarely equal. The marketing site, a scratch prototype, an internal tooling repo — a Quick pass is plenty; a Deep review there just burns time and buries the PR in comments nobody needed. The payments service, the auth layer, anything touching customer data or money — that's where you want Deep, where the cost of a slow, exhaustive read is trivial against the cost of a defect reaching production. Review levels let you say exactly that, repo by repo, instead of accepting one depth as a compromise that serves none of them well.

**Set the default low, lift the dangerous**

The move most engagements want is a sensible org default — Standard, or even Quick for a portfolio of mostly low-risk repos — and then a deliberate list of the few repositories bumped to Deep. That keeps the everyday noise down while guaranteeing the changes that actually matter get the thorough treatment. It's the same instinct a good reviewer brings by hand; the levels just make it a setting the whole org inherits rather than a habit that lives in one person's head.

**Catch the repos you'd otherwise forget**

There's a companion admin option worth pairing with this: Code Review can be set to cover *every* repository in the GitHub organization, including ones created later, without anyone selecting them one at a time. On a growing client org that closes the gap where a brand-new repo ships for weeks with no automated review simply because nobody remembered to switch it on. Turn on org-wide coverage so nothing escapes the net, then use the levels to decide how hard each one is read.

> Takeaway: Default the org to a light level, lift only the high-stakes repos to Deep, and turn on org-wide coverage so a new repository is reviewed from day one instead of whenever someone remembers it.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `I'm standing up Claude's Code Review across a client's GitHub org, and the repos aren't equal.
For the whole organization I set the default level to ____, so every repo inherits a sane baseline.
On ____, where a missed defect is expensive, I override the default and pin it to ____.
On the throwaway docs site I'd rather drop it to ____, since all I want there is a quick sanity check.
Then I turn on ____ so a repo someone spins up next month is reviewed from day one, not whenever we remember it.`,
    blanks: [
      { id: 'default', suggestions: ['Standard', 'Quick', 'a light baseline level'] },
      { id: 'critical-repo', suggestions: ['the payments service', 'the auth layer', 'anything touching customer data'] },
      { id: 'deep', suggestions: ['Deep', 'the thorough review level', 'the most exhaustive pass'] },
      { id: 'quick', suggestions: ['Quick', 'the fast, light pass', 'the lightest level'] },
      { id: 'org-wide', suggestions: ['org-wide coverage of every repository', 'the review-every-repo admin option', 'automatic coverage of repos added later'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "Review levels in Code Review (Claude Code 2.1.304): Code Review, the automated reviewer that comments on your GitHub pull requests, used to run at one fixed thoroughness for everything. It now has three levels — Quick (a fast, light pass), Standard (the default, balanced), and Deep (a slow, exhaustive read). An org owner sets a default level for the whole organization, and any individual repository can be given its own level that overrides the default. The level changes how hard the reviewer looks, not whether it runs. For a consultant: not every repo earns the same scrutiny, so default the org to a light level and lift only the high-stakes repos (payments, auth, customer data) to Deep. A companion admin option covers every repository in the org, including ones added later, so no new repo ships unreviewed because someone forgot to enable it.",
      beats: [
        { kind: 'say', text: "Lead item, room one. It's about the automated reviewer — Code Review, the one that reads your pull requests on GitHub and leaves comments before anything merges. As of 2.1.304 it stopped treating every change the same." },
        { kind: 'say', text: "Here's the old shape of it. The reviewer ran at one depth, full stop. A one-character typo fix and a rewrite of the payments path got read with exactly the same weight. So you were either over-reviewing the trivial stuff or under-reviewing the dangerous stuff — no way to aim the attention where it mattered." },
        { kind: 'say', text: "Now there are three *review levels*. Quick is a fast, light pass — a sanity check for low-stakes changes. Standard is the default, the balanced middle for ordinary work. Deep is the slow, thorough read for changes where a missed defect gets expensive. Important bit: the level decides how *hard* the reviewer looks, not *whether* it looks at all." },
        {
          kind: 'choice',
          prompt: "An org owner wants a light default across the org but a harder look on the one repo that handles payments. What do the review levels let them do?",
          options: [
            { id: 'both', label: "Set the org default to a light level, then override just the payments repo to Deep so it alone gets the exhaustive read", correct: true, reaction: "Exactly. The org default is the floor every repo inherits; the per-repo override is how you lift the handful that deserve more. Light everywhere, Deep where it counts." },
            { id: 'onlyorg', label: "Only set one level for the whole org — there's no way to treat a single repo differently", correct: false, reaction: "Not quite. The org default is just the baseline. Any individual repository can be given its own level that overrides it — that's the whole point of per-repo." },
            { id: 'perpr', label: "Nothing at the repo level — depth is picked fresh on each pull request by whoever opens it", correct: false, reaction: "No — it's not a per-PR author choice. Owners set an org default and override per repository. The depth is a setting the repo inherits, not something re-decided every PR." },
          ],
        },
        { kind: 'say', text: "So mechanically: org owner picks the default — Quick, Standard, or Deep — and every repo inherits it. Then any single repo can be pinned to its own level, overriding that default. The default is the floor; the override is how you raise or lower the exceptions." },
        { kind: 'say', text: "Why it matters on an engagement: your client's repos aren't equal. The marketing site and a scratch prototype want Quick — a Deep review there just buries the PR in comments nobody asked for. The payments service, the auth layer, anything near customer money — that's Deep, because a slow read is nothing against a defect reaching production. Levels let you say that repo by repo." },
        { kind: 'say', text: "One more thing to pair with it: there's an admin option to review *every* repository in the org, including ones spun up later, without picking them one by one. On a growing client org that closes the gap where a fresh repo ships unreviewed for weeks because nobody flipped the switch. Turn on org-wide coverage, then use the levels to set how hard each one's read. Grab the key — then face Rote, the auditor who's never once changed his pace for anyone." },
      ],
    },
  },
  battle: {
    name: 'Rote, the One-Depth Auditor',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a skeleton clerk looks up from an endless ledger, stamping each page at the exact same grinding pace* …a typo, a rewrite of the vault door — all one to me… I read every change at the one speed I have ever had, no faster for the dangerous, no lighter for the trifling… you say there are now *three* speeds, and that I might be told which to use per repository?! …then say true how the levels are set, before I stamp another thousand pages the same.",
    tauntLines: [
      "*rattles, ledger snapping shut* you'd tell me a single depth rules the whole org and cannot be changed?! no… an owner sets a *default*, yes — but any one repository may be given its own level over the top of it…",
      "*bones clatter* you think the author picks the depth fresh on every pull request?! never… it is no per-PR whim — the level is set for the org and overridden per repository, a setting the repo inherits…",
    ],
    victoryLine: "*Rote sets down the stamp at last, sorting the ledger into three neat piles* …Quick for the trifles… Standard for the rest… Deep for the vault door… an org default, and a level per repository over it… I need never read all things the same again… take the key, operator, and aim the attention where it earns its keep.",
    questions: [
      {
        prompt:
          "Your client runs Claude's Code Review across a GitHub organization whose repositories range from a throwaway docs site to the core payments service. How do the new review levels let you match review depth to each repo?",
        choices: [
          { id: 'a', label: "Set an org-wide default — Quick, Standard, or Deep — and give individual high-stakes repos their own level, so each repo is reviewed at the depth its risk warrants", correct: true },
          { id: 'b', label: "There's a single fixed review depth for the whole org; you can choose whether a review runs, but not how thorough it is", correct: false },
          { id: 'c', label: "Depth is chosen fresh by the author on every pull request; there's no organization or per-repository setting", correct: false },
          { id: 'd', label: "Only Deep is assignable; Quick and Standard run automatically and can't be pinned to a specific repo", correct: false },
        ],
        passFeedback: "HIT! Code Review now has three levels — Quick, Standard (the default), and Deep — set as an org-wide default and overridable per repository, so review depth matches each repo's stakes.",
        failFeedback: "MISS! It isn't one fixed depth, a per-PR author choice, or Deep-only. Owners pick an org default and can override it on any single repo. Re-read Book 1.",
      },
    ],
  },
};
