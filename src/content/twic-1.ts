import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — GitLab merge request support: the `--worktree` flag and
 * the `claude agents` view now accept GitLab *merge request* URLs, the same way
 * they already accepted GitHub pull request URLs. Passing an MR URL to
 * `--worktree` checks that MR's branch out into an isolated git worktree — a
 * separate working directory sharing the repo's history — so you can review and
 * run it without disturbing your current checkout; the session then appears in
 * the `claude agents` view alongside your other agent sessions. Companion
 * GitLab items landed the same window: plugin marketplaces now clone bare
 * `gitlab.com` repo URLs like `github.com` URLs, and secret redaction covers
 * GitLab token families with the `glab` CLI config store sandbox-protected.
 * Sources (Claude Code CHANGELOG 2.1.233 + 2.1.232):
 *   - "Added GitLab merge request URL support to the `--worktree` flag and the
 *      `claude agents` view"
 *   - "Added GitLab support to plugin marketplaces: bare `gitlab.com` repo URLs
 *      now clone like `github.com` URLs"
 *   - "Added secret redaction for GitLab token families and full redaction of
 *      routable tokens; the `glab` CLI config store gets sandbox protection"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown, and the Beat Reporter opens with a small line that quietly widens the door: GitLab has arrived in Claude Code. The `--worktree` flag and the `claude agents` view — which already knew how to take a GitHub pull request URL — now take a GitLab *merge request* URL too, so the review flow you had on one platform is the review flow you have on both. The two books cover how `--worktree` turns an MR URL into an isolated checkout you can review, and why a consultant working a GitLab-hosted client can now stop leaving Claude Code to do it. Answer the door's one question for the key — then face the revenant past it, a skeleton that guards a bridge between two hosts and swears only one of them is real.",
  prompt:
    "What did the 2.1.233 release add for GitLab merge requests?",
  choices: [
    { id: 'a', label: "GitLab *merge request* URL support in the `--worktree` flag and the `claude agents` view — so an MR checks out into an isolated worktree you can review, and the session shows up among your agents, exactly as GitHub PRs already did", correct: true },
    { id: 'b', label: "Automatic merging of a GitLab MR once its pipeline passes and it has the required approvals", correct: false },
    { id: 'c', label: "A replacement for GitLab CI runners that executes the project's `.gitlab-ci.yml` pipelines on Claude Code's own infrastructure", correct: false },
    { id: 'd', label: "Only plugin-marketplace cloning of `gitlab.com` URLs — nothing that touches reviewing merge requests", correct: false },
  ],
  passFeedback: "HIT! The `--worktree` flag and the `claude agents` view learned to take a GitLab MR URL, the same surfaces that already took GitHub PR URLs. Pass an MR URL and its branch checks out into an isolated worktree for review; the session appears among your agents. It's the existing review flow, now on GitLab too.",
  failFeedback: "MISS! It doesn't auto-merge, it isn't a CI-runner replacement, and it's more than a marketplace tweak. What shipped is MR URL support in `--worktree` and the `claude agents` view — checkout-and-review, not merge-and-ship. Re-read Book 1.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**GitLab Merge Requests — The Same Review Flow, Now on the Other Host**

**One line, but it opens a second platform**

The 2.1.233 entry is short: *"Added GitLab merge request URL support to the \`--worktree\` flag and the \`claude agents\` view."* To read it you need to know what those two surfaces already did for GitHub. \`--worktree\` takes a change-request URL and checks that request's branch out into a *git worktree* — a second working directory that shares the same repository history but sits apart from your current checkout — so you can read, run, and poke at someone's proposed change without disturbing what you're working on. Until now that trick knew GitHub pull requests. Now it knows GitLab *merge requests* too. Same flag, same behavior, second host.

**Where the session shows up**

The other half of the line is the \`claude agents\` view — the roster of your background and agent sessions. A worktree you spun up from an MR URL surfaces there as a session you can jump back into, so a review you started doesn't vanish into a stray terminal tab. GitLab MR sessions now sit in that list next to your GitHub ones; the view stopped caring which host the change came from.

**The rest of GitLab arriving at once**

This didn't land alone. In the same window plugin marketplaces learned to clone bare \`gitlab.com\` repo URLs exactly like \`github.com\` URLs, so a team distributing internal tooling off GitLab isn't a second-class case. And secret redaction grew to cover GitLab token families — with full redaction of routable tokens and sandbox protection for the \`glab\` CLI's config store — so a GitLab credential doesn't leak into a transcript the way an unguarded token might.

> Takeaway: \`--worktree\` and the \`claude agents\` view now accept GitLab merge request URLs, giving MRs the same isolated-worktree review flow GitHub PRs already had — and marketplace cloning plus token redaction round out GitLab as a first-class host.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Meeting the Client Where Their Code Lives — GitLab Without Leaving Claude Code**

**Not every client is on GitHub**

Book 1 was the mechanism; this is when it matters. A large share of enterprise and public-sector clients self-host GitLab or run GitLab.com, not GitHub — often precisely because they want their SCM inside their own boundary. Before this, reviewing one of their merge requests through Claude Code meant friction: clone by hand, check out the branch yourself, and you'd lost the worktree isolation and the agent-session bookkeeping you get for free on GitHub. The change erases that gap. Paste the MR URL into \`--worktree\` and you're reviewing their proposed change in an isolated checkout, no manual plumbing.

**Why the worktree, specifically, matters on an engagement**

The isolation is the part a careful consultant values. Because the MR lands in its own worktree rather than on top of your working tree, you can review a client's change — run their tests against it, read the diff, try a fix — while whatever you were already doing stays untouched a directory away. Juggle three open MRs across two client repos and each is its own session in the \`claude agents\` view, not a pile of stashes you're afraid to pop. That's the difference between reviewing at a client's pace and reviewing at the pace of your git housekeeping.

**The credential story that comes with it**

There's a trust dividend in the companion items. A GitLab-hosted client's tokens are exactly the kind of secret you don't want surfacing in a shared transcript or a shipped log; the new GitLab token redaction and the sandbox-protected \`glab\` config store mean those credentials are handled with the same care GitHub's already were. When a client asks whether using Claude Code against their GitLab is safe, "it redacts your token families and isolates the \`glab\` config" is a concrete, quotable answer.

> Takeaway: Reach for GitLab MR support the moment a client's code lives on GitLab — you review their merge requests in an isolated worktree, track each as its own agent session, and lean on the new token redaction to keep their credentials out of your transcripts.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `This client hosts everything on GitLab, so the review that used to mean manual cloning
is now a single command: I pass the ____ straight to the \`--worktree\` flag.
That checks the change out into an ____ so my current work stays untouched a directory away.
I can find the review later in the ____, where it sits beside my GitHub sessions.
And because their credentials shouldn't leak, I'll lean on the new ____ that landed alongside it.`,
    blanks: [
      { id: 'input-url', suggestions: ['GitLab merge request URL', 'MR link', "client's merge request URL"] },
      { id: 'isolation', suggestions: ['isolated git worktree', 'separate working directory', 'worktree of its own'] },
      { id: 'roster', suggestions: ['`claude agents` view', 'agents roster', 'list of agent sessions'] },
      { id: 'cred-guard', suggestions: ['GitLab token redaction', 'sandbox-protected `glab` config store', 'redaction of routable tokens'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "GitLab merge request support (2.1.233): the `--worktree` flag and the `claude agents` view now accept GitLab *merge request* URLs, exactly as they already accepted GitHub pull request URLs. Passing an MR URL to `--worktree` checks that MR's branch out into an isolated git worktree — a separate working directory sharing the repo's history — so you can review and run the proposed change without disturbing your current checkout; the session then shows up in the `claude agents` view next to your GitHub ones. It's the existing review flow extended to a second host, not auto-merge and not a CI-runner replacement. Companion GitLab items landed the same window: plugin marketplaces now clone bare `gitlab.com` repo URLs like `github.com` URLs, and secret redaction covers GitLab token families with full redaction of routable tokens and sandbox protection for the `glab` CLI config store. For a consultant, this means a GitLab-hosted client's merge requests get first-class, isolated review inside Claude Code, with their credentials kept out of transcripts.",
      beats: [
        { kind: 'say', text: "Lead story this week is a two-word addition that opens a whole platform: *merge requests*. The 2.1.233 line reads plainly — GitLab merge request URL support was added to the `--worktree` flag and the `claude agents` view. If you've reviewed a GitHub pull request through Claude Code, you already know this flow. It just learned a second host." },
        { kind: 'say', text: "Here's what `--worktree` actually does with that URL. It takes the change's branch and checks it out into a *git worktree* — a second working directory that shares the repository's history but sits apart from your current checkout. So you can read the diff, run their tests, try a fix, all without touching whatever you had open. Before this, a GitLab MR meant doing that plumbing by hand." },
        { kind: 'say', text: "And the review doesn't get lost. The `claude agents` view — your roster of agent sessions — now lists MR-based sessions too, right alongside your GitHub ones. The view stopped caring which host the change came from. Three open reviews across two repos become three named sessions, not three terminal tabs you're afraid to close." },
        {
          kind: 'choice',
          prompt: "A partner asks: 'So Claude now merges our GitLab MRs for us once they're approved?' Set them straight — what did this actually add?",
          options: [
            { id: 'review-flow', label: "Checkout-and-review: an MR URL now checks out into an isolated worktree, surfaced as an agent session — the same review flow GitHub PRs had", correct: true, reaction: "Exactly. It's about *reviewing* a merge request in isolation, not merging it. `--worktree` checks the branch out, the `claude agents` view tracks the session, and the decision to merge stays entirely yours." },
            { id: 'auto-merge', label: "Yes — once the pipeline passes and approvals are in, Claude merges the MR automatically", correct: false, reaction: "No — nothing here auto-merges. What shipped is MR URL support in `--worktree` and the agents view: checkout and review. Merging is still a human call." },
            { id: 'ci-runner', label: "It runs their `.gitlab-ci.yml` pipelines on Claude's infrastructure instead of GitLab's runners", correct: false, reaction: "Not that at all. This doesn't touch CI. It's the review flow — check the MR out into a worktree and read it — extended from GitHub to GitLab." },
          ],
        },
        { kind: 'say', text: "The worktree isolation is the part I'd sell to a careful reviewer. Because the MR lands in its *own* working directory, you review a client's change — run it, diff it, patch it — while everything you were already doing sits untouched one directory over. That's reviewing at the client's pace instead of the pace of your git stash-juggling." },
        { kind: 'say', text: "It didn't arrive alone, either. Plugin marketplaces now clone bare `gitlab.com` URLs just like `github.com` ones, so a team shipping internal tooling off GitLab isn't second-class. And secret redaction grew to cover GitLab token families — full redaction of routable tokens, plus sandbox protection for the `glab` CLI's config store — so a GitLab credential doesn't bleed into a transcript." },
        { kind: 'say', text: "That last part is your answer when a GitLab-hosted client asks whether this is safe: it redacts your token families and isolates the `glab` config. Concrete, quotable, true. The books have the full picture. The door wants only this: what did 2.1.233 add for merge requests? Answer for the key. Then square up to Mergewright past it — a revenant guarding a bridge between two hosts, betting you'll swear only GitHub is real." },
      ],
    },
  },
  battle: {
    name: 'Mergewright, the Two-Host Revenant',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a gaunt skeleton hauls itself upright astride a stone bridge that spans two gorges at once, a rusted request-branch clutched in each hand* …you'd cross to review a change, operator? then tell me true — for I have guarded but ONE gate for years, and now a second has opened beneath me… name what the flag learned to carry across, or stand at the near bank forever…",
    tauntLines: [
      "*the bridge groans and one gorge darkens* you think it *merges* what crosses? no — I only let you look… the sealing of the seam is never mine to do…",
      "*bones rattle against the far rail* you'd have me run their pipelines on some far tower's fire? I am a bridge, not a forge… I carry the request to a room of its own, nothing more…",
    ],
    victoryLine: "*Mergewright lowers both branches and the second span steadies* …a merge request, checked out to its own ground, tracked among your agents… you named it true and both banks hold… take the key, operator, and review where the client's code actually lives…",
    questions: [
      {
        prompt:
          "What did the 2.1.233 release add for GitLab merge requests?",
        choices: [
          { id: 'a', label: "GitLab *merge request* URL support in the `--worktree` flag and the `claude agents` view — so an MR checks out into an isolated worktree you can review, and the session shows up among your agents, exactly as GitHub PRs already did", correct: true },
          { id: 'b', label: "Automatic merging of a GitLab MR once its pipeline passes and it has the required approvals", correct: false },
          { id: 'c', label: "A replacement for GitLab CI runners that executes the project's `.gitlab-ci.yml` pipelines on Claude Code's own infrastructure", correct: false },
          { id: 'd', label: "Only plugin-marketplace cloning of `gitlab.com` URLs — nothing that touches reviewing merge requests", correct: false },
        ],
        passFeedback: "HIT! The `--worktree` flag and the `claude agents` view learned to take a GitLab MR URL, the same surfaces that already took GitHub PR URLs. Pass an MR URL and its branch checks out into an isolated worktree for review; the session appears among your agents. It's the existing review flow, now on GitLab too.",
        failFeedback: "MISS! It doesn't auto-merge, it isn't a CI-runner replacement, and it's more than a marketplace tweak. What shipped is MR URL support in `--worktree` and the `claude agents` view — checkout-and-review, not merge-and-ship. Re-read Book 1.",
      },
    ],
  },
};
