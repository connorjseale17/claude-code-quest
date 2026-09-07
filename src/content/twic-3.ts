import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — `managedMcpServers` and the rescoping of
 * `allowedMcpServers`. Claude Code adds `managedMcpServers`, a managed
 * (organization-administered) setting for MCP servers, and narrows
 * `allowedMcpServers` so its allow-list now governs only the servers a user
 * adds themselves. The pair splits MCP servers into two populations: the ones
 * an organization defines centrally through managed settings, and the ones an
 * individual adds, which the allow-list still gates.
 * Sources (Claude Code CHANGELOG 2.1.259):
 *   - "Added `managedMcpServers` managed setting."
 *   - "Changed `allowedMcpServers` to govern only servers users add."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Final room of the week, and the Beat Reporter is standing before a great tool-rack split down the middle — one side stamped with a house crest and bolted to the wall, the other a loose pegboard where anyone may hang what they bring. The 2.1.259 release adds a managed setting, `managedMcpServers`, for the MCP servers an *organization* administers centrally, and narrows `allowedMcpServers` so its allow-list now governs *only* the servers a user adds themselves. The two books cover exactly what that split is and why a consultant governing a whole engagement's tooling wants the house rack and the personal pegboard kept separate. Answer the door's question for the key — then face what hoards it, a dragon coiled across the sanctioned rack, sorting the issued from the smuggled.",
  prompt:
    "What did `managedMcpServers` and the change to `allowedMcpServers` do?",
  choices: [
    { id: 'a', label: "Added `managedMcpServers`, a managed (org-administered) setting for MCP servers, and narrowed `allowedMcpServers` so its allow-list now governs only the servers users add themselves", correct: true },
    { id: 'b', label: "Made `managedMcpServers` auto-install every MCP server in the public marketplace onto each machine in the org", correct: false },
    { id: 'c', label: "Changed `allowedMcpServers` to block all MCP servers outright unless the person running the session is an org admin", correct: false },
    { id: 'd', label: "Merged every MCP server — org-provided and user-added alike — under one shared allow-list", correct: false },
  ],
  passFeedback: "HIT! `managedMcpServers` is the managed-settings layer for org-administered MCP servers, and `allowedMcpServers` was narrowed to gate only what a user adds. Two populations: the house-issued servers and the personal ones.",
  failFeedback: "MISS! It doesn't auto-install a marketplace, lock sessions to admins, or merge everything under one list — it *splits* MCP servers into an org-managed set and a user-added set the allow-list now solely governs. Re-read Book 1.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**\`managedMcpServers\` — Two Populations of Tool Servers, Not One**

**The managed layer, applied to MCP**

Claude Code has long had a *managed settings* layer: configuration an organization administers centrally and pushes down, rather than something each user edits on their own machine. The 2.1.259 release extends that layer to MCP servers with a new setting, \`managedMcpServers\`. In plain terms, it's the slot where an organization defines the MCP servers it administers — the external tool connections that come from the house, set once at the org level instead of hand-configured session by session.

**The allow-list got narrower on purpose**

The companion change is the important half. \`allowedMcpServers\` — the allow-list that decides which MCP servers are permitted — was rescoped so it now governs *only the servers a user adds themselves*. Before, an allow-list sitting over "MCP servers" was ambiguous about which servers it meant. Now the boundary is clean: the allow-list is the gate on the *personal* pegboard, the servers an individual bolts on. The house-issued servers live in \`managedMcpServers\` and aren't what that list is adjudicating anymore.

**Why the split is the feature**

Read together, the two changes carve MCP servers into two distinct populations. One is *organization-managed*: defined centrally through managed settings, the sanctioned baseline. The other is *user-added*: whatever an individual brings, still gated by the \`allowedMcpServers\` allow-list. Keeping them separate means the two are governed by different mechanisms — the baseline by the org's managed configuration, the extras by an allow-list — instead of being tangled under a single ambiguous rule. That separation is the whole point of the release.

> Takeaway: \`managedMcpServers\` is the managed-settings home for org-administered MCP servers, and \`allowedMcpServers\` now gates only user-added ones — two populations of tool servers, governed by two different levers.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Governing the Tool Surface — Why a Consultant Wants the House Rack Separate**

**Standing up tooling for a whole team**

Book 1 was the mechanism; here's the engagement. When you roll Claude Code out across a client's team, the MCP servers are the tools that team can reach — their ticketing system, their internal APIs, their data stores. You want a *sanctioned baseline*: the servers everyone should have, configured once and handed down the same way to every seat, not left to each person to wire up correctly. \`managedMcpServers\` is where that baseline lives, so provisioning the org's tooling stops being a per-person chore and becomes one central act.

**The two levers do different jobs**

Because the personal pegboard is now the *only* thing \`allowedMcpServers\` governs, you get a clean division of labor. The managed layer answers "what tools does the house issue?" The allow-list answers "what may an individual bolt on beyond that?" A consultant setting policy can turn each dial without disturbing the other: broaden the sanctioned baseline for the whole team, or tighten what individuals may add, and neither change muddies the other. When one setting had to mean both, every adjustment risked side effects; splitting them makes the governance legible.

**Naming the posture**

Treat this as the difference between *issued* gear and *brought* gear. Issued gear — the org's managed servers — is standardized, and its consistency is a feature: everyone reaches the same sanctioned tools. Brought gear — user-added servers — is where you exercise judgment about what's allowed in, via the allow-list. A mature engagement wants both, cleanly separated, so you can be generous with the baseline and deliberate about the extras without the two decisions colliding.

> Takeaway: Put the client's sanctioned tool servers in \`managedMcpServers\` so the baseline is provisioned once for everyone, and use the narrowed \`allowedMcpServers\` to govern — separately — what individuals may add on top.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `I'm rolling Claude Code out across the client's team and need to govern which tool servers they reach.
The sanctioned baseline — the servers everyone should get — belongs in ____.
That way the org's tooling is provisioned ____ instead of wired up seat by seat.
Whatever an individual bolts on beyond that is now governed by ____,
which after this change gates ____ — so I can tune the baseline and the extras separately.`,
    blanks: [
      { id: 'managed', suggestions: ['`managedMcpServers`', 'the `managedMcpServers` managed setting', 'the managed layer'] },
      { id: 'once', suggestions: ['once, centrally', 'the same way for every seat', 'at the org level'] },
      { id: 'allowlist', suggestions: ['`allowedMcpServers`', 'the `allowedMcpServers` allow-list', 'the allow-list'] },
      { id: 'scope', suggestions: ['only the servers users add themselves', 'just the user-added servers', 'the personal pegboard, not the house rack'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "`managedMcpServers` (2.1.259) is a new managed setting — the organization-administered layer — for MCP servers, the slot where an org defines the tool servers it issues centrally. Alongside it, `allowedMcpServers` was narrowed so its allow-list now governs *only* the servers a user adds themselves. Together they split MCP servers into two populations: org-managed (the sanctioned baseline, provisioned once for everyone) and user-added (whatever an individual bolts on, still gated by the allow-list). The value for a consultant governing a fleet: the two are now controlled by two different levers, so you can broaden the house-issued baseline or tighten what individuals may add without the two decisions colliding. Think issued gear versus brought gear — standardized baseline in the managed layer, judgment about the extras via the allow-list.",
      beats: [
        { kind: 'say', text: "Closing story of the week is about who controls your tool servers. Claude Code has always had a managed-settings layer — config an organization administers centrally and pushes down, not something each person edits locally. The 2.1.259 release extends that layer to MCP servers with a new setting: `managedMcpServers`." },
        { kind: 'say', text: "That's the slot where an org defines the MCP servers it issues — the sanctioned tool connections that come from the house, set once at the org level instead of hand-wired session by session." },
        { kind: 'say', text: "The companion change is the half that makes it click. `allowedMcpServers` — the allow-list deciding which servers are permitted — was narrowed. It now governs *only the servers a user adds themselves*. So the allow-list is the gate on the personal pegboard; the house-issued servers live in `managedMcpServers` and aren't what that list adjudicates anymore." },
        {
          kind: 'choice',
          prompt: "A client admin asks: 'After this change, what does `allowedMcpServers` actually apply to?' What's the accurate answer?",
          options: [
            { id: 'user-added', label: "Only the MCP servers a user adds themselves — not the org-managed ones", correct: true, reaction: "Right. That's the clean boundary the release draws. The allow-list gates the personal extras; the org's issued servers are governed by the managed layer instead. Two populations, two levers." },
            { id: 'everything', label: "Every MCP server now, org-managed and user-added, under one shared list", correct: false, reaction: "That's the opposite of the change. The whole point was to *split* them — the allow-list was narrowed to user-added servers precisely so it no longer means both." },
            { id: 'admins-only', label: "It blocks all servers unless the person is an org admin", correct: false, reaction: "No — it's not an admin gate. It's an allow-list, and its scope was simply narrowed to the servers users add. Nothing about it keys on whether you're an admin." },
          ],
        },
        { kind: 'say', text: "Here's why a consultant cares. Roll Claude Code out across a client's team and the MCP servers are the tools that team can reach — ticketing, internal APIs, data stores. You want a sanctioned baseline everyone gets, configured once and handed down the same to every seat. `managedMcpServers` is where that baseline lives, so provisioning stops being a per-person chore." },
        { kind: 'say', text: "And because the allow-list is now the *only* thing governing what individuals add, you get a clean division of labor: the managed layer answers 'what does the house issue?', the allow-list answers 'what may someone bolt on beyond that?' Turn one dial without disturbing the other. Issued gear versus brought gear — be generous with the baseline, deliberate about the extras." },
        { kind: 'say', text: "The books have the full split. The door asks one thing: what did these two settings actually change? Answer for the key — then square up to the Quartermaster past it, a dragon coiled across the sanctioned rack, sorting what the house issued from what you tried to smuggle in." },
      ],
    },
  },
  battle: {
    name: 'Warrant, the Quartermaster Wyrm',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a long dragon lies draped across a two-sided tool-rack — one flank guarding servers stamped with the house crest, the other a loose pegboard of odds and ends* …you would draw from my rack, little operator? then prove you know how it was divided this week… what did those two settings *do* to my servers… name it true, or hang here among the confiscated…",
    tauntLines: [
      "*claws rake the house-stamped side* you said it *installs* — drags every server in the market onto every machine? no! it is where the house DEFINES what it issues, not a thief that force-feeds a marketplace…",
      "*coils across the pegboard* you cried that the allow-list now bars all but the admins? no — it was merely *narrowed*, down to the servers a user brings… it gates the pegboard, it does not check your rank…",
    ],
    victoryLine: "*Warrant lifts a wing from the rack and lets you choose your tools* …you knew the two sides apart — issued by the house, brought by the hand, each governed by its own lever… take the key, and provision your fleet with a clear rack…",
    questions: [
      {
        prompt:
          "What did `managedMcpServers` and the change to `allowedMcpServers` do?",
        choices: [
          { id: 'a', label: "Added `managedMcpServers`, a managed (org-administered) setting for MCP servers, and narrowed `allowedMcpServers` so its allow-list now governs only the servers users add themselves", correct: true },
          { id: 'b', label: "Made `managedMcpServers` auto-install every MCP server in the public marketplace onto each machine in the org", correct: false },
          { id: 'c', label: "Changed `allowedMcpServers` to block all MCP servers outright unless the person running the session is an org admin", correct: false },
          { id: 'd', label: "Merged every MCP server — org-provided and user-added alike — under one shared allow-list", correct: false },
        ],
        passFeedback: "HIT! `managedMcpServers` is the managed-settings layer for org-administered MCP servers, and `allowedMcpServers` was narrowed to gate only what a user adds. Two populations: the house-issued servers and the personal ones.",
        failFeedback: "MISS! It doesn't auto-install a marketplace, lock sessions to admins, or merge everything under one list — it *splits* MCP servers into an org-managed set and a user-added set the allow-list now solely governs. Re-read Book 1.",
      },
    ],
  },
};
