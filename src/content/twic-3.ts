import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — Plugins: `claude plugin init` scaffolds a plugin, plugins
 * placed in `.claude/skills` auto-load without a marketplace, and `/plugin list`
 * shows installed plugins with enable/disable filtering.
 * Final room — door target routes to the TwicStampScreen via currentTrack.
 * Source: Claude Code CHANGELOG 2.1.157 ("Plugins in `.claude/skills` directories
 * automatically load without marketplace requirement"; "`claude plugin init
 * <name>` scaffolds new plugins") and 2.1.163 ("`/plugin list` command introduced
 * with enable/disable filtering").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Final room of the issue, and the Beat Reporter saves the packaging story for last. The theme is distribution: Claude Code's plugin tooling got cheap enough that bundling your commands and skills into one installable unit is now a quick afternoon, not a project. `claude plugin init` scaffolds the whole thing, plugins in `.claude/skills` load with no marketplace step, and `/plugin list` lets you see and toggle what's active. Read both pages on the desk, then face the door — the thing coiled around this last key has been hoarding capabilities for a very long time.",
  prompt:
    "You want to stop re-wiring the same slash commands and skills on every client engagement, and instead hand a teammate one installable bundle they can drop in and use immediately. Which move fits the new plugin tooling?",
  choices: [
    { id: 'a', label: 'Run `claude plugin init` to scaffold a plugin, bundle the commands and skills into it, and drop it in `.claude/skills`, where it auto-loads with no marketplace step', correct: true },
    { id: 'b', label: 'Paste each slash command into the teammate\'s settings.json by hand every time you start an engagement', correct: false },
    { id: 'c', label: 'Publish to a public marketplace, since that is the only way a plugin is allowed to load', correct: false },
    { id: 'd', label: 'Define them all as subagents so they fan out and run automatically', correct: false },
  ],
  passFeedback: 'HIT! `claude plugin init` scaffolds the bundle, and a plugin in `.claude/skills` auto-loads with no marketplace step — one installable unit instead of re-wiring the pieces on every engagement.',
  failFeedback: 'MISS! Hand-pasting is the toil plugins remove, the marketplace is no longer required for `.claude/skills`, and subagents are a different feature with no bundling or distribution. Re-read Book 1.',
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**Plugins — Bundling Your Capabilities Into One Installable Unit**

**The package that sits above the pieces**

Slash commands, skills, hooks, and MCP servers are the individual capabilities you hand Claude Code. A *plugin* is the container that gathers them into one named, versionable unit you can share — instead of asking every teammate to wire the loose pieces up by hand. Think of it as the difference between emailing around five config snippets with setup instructions and handing someone a single thing they install once.

**Scaffolding and auto-loading made it cheap**

Two recent changes dropped the cost of building one. \`claude plugin init <name>\` *scaffolds a new plugin* — it lays down the directory structure and manifest so you start from a working skeleton rather than a blank folder (2.1.157). And plugins placed in a \`.claude/skills\` directory *load automatically, with no marketplace requirement* — drop the folder in and it's live in your session, no publishing step to clear first (2.1.157). The \`/plugin\` command also picked up argument autocomplete, so driving it is less of a memory test.

**Seeing and toggling what's loaded**

Once plugins are in play you need to know what's active. \`/plugin list\` *(2.1.163)* shows your installed plugins and supports *enable/disable filtering*, so you can survey everything that's loaded and toggle individual pieces on or off without uninstalling them. That on/off control matters more than it sounds: it's how you keep one bundle but tune which parts of it apply right now.

> Takeaway: A plugin packages your commands and skills into one installable unit — \`claude plugin init\` scaffolds it, \`.claude/skills\` auto-loads it with no marketplace, and \`/plugin list\` lets you see and toggle what's active.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Shipping Your Firm in a Box — Plugins as a Distribution Channel**

**The repeatability tax**

Every engagement starts with the same quiet overhead: re-explaining the house standards, re-adding the same review commands, re-pointing Claude at the same conventions. Done by hand, that ritual is slightly different — and slightly wrong — every time. A plugin collapses it. Package your firm's commands, skills, and standards once, and onboarding a new project or a new teammate becomes "install this," not a checklist someone half-remembers.

**A tight build-and-test loop**

The new tooling makes the authoring loop genuinely fast. Scaffold with \`claude plugin init\` so you're not assembling a manifest from scratch, drop the result into \`.claude/skills\` to exercise it live in your own session with no marketplace round-trip, and run \`/plugin list\` to confirm it actually loaded. You're testing the real thing the client team will receive, in the same place they'll run it — not a mock-up you hope behaves the same.

**Govern it without forking it**

Distribution raises an obvious worry: what if a client team needs most of your bundle but not one particular piece? The enable/disable filtering on \`/plugin list\` is the answer. They keep the single plugin you shipped and simply toggle off the part that doesn't fit their context, rather than forking your work into a divergent copy you'll never be able to update cleanly. One source of truth, locally adjustable — which is exactly what makes it safe to ship the same bundle to every client.

> Takeaway: Package your firm's standards as a plugin once and distribution becomes "install this" — scaffold, test live from \`.claude/skills\`, and let teams toggle pieces off instead of forking.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `Our team keeps re-explaining the same standards on every engagement — let's package them once.
Run ____ to scaffold a new plugin from a working skeleton.
Bundle ____ into it so a client team gets everything in one install.
Drop it in \`.claude/skills\` to test it live this session, with no marketplace step.
Run ____ to confirm it loaded, and toggle off any piece that doesn't fit the client.
Version it so we can ____ when the standards change.`,
    blanks: [
      { id: 'init-cmd', suggestions: ['`claude plugin init firm-standards`', '`claude plugin init acme-pack`', '`claude plugin init delivery-kit`'] },
      { id: 'bundle', suggestions: ['our slash commands and review skills', 'the house conventions and hooks', 'our standard MCP setup and commands'] },
      { id: 'list-cmd', suggestions: ['`/plugin list`', '`/plugin list` with the enabled filter', '`/plugin`'] },
      { id: 'version', suggestions: ['ship the update to every client at once', 'roll back a bad change cleanly', 'track what each client is running'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "A plugin bundles slash commands, skills, hooks, and MCP servers into one named, installable unit. New tooling makes them cheap: `claude plugin init <name>` scaffolds a working skeleton (2.1.157), plugins in `.claude/skills` auto-load with no marketplace requirement (2.1.157), `/plugin` got argument autocomplete, and `/plugin list` shows installed plugins with enable/disable filtering (2.1.163). For a consultant it's a distribution channel: package the firm's standards once, onboard with 'install this,' test live from `.claude/skills`, and let client teams toggle off pieces instead of forking the bundle.",
      beats: [
        { kind: 'say', text: "Last room, and it's the packaging story. You already know the pieces — slash commands, skills, hooks, MCP servers. A *plugin* is the box that bundles them into one named, installable unit you can hand to someone instead of mailing five snippets and a setup guide." },
        { kind: 'say', text: "What changed is the cost of building one. `claude plugin init <name>` scaffolds it — directory structure and manifest laid down, so you start from a working skeleton, not an empty folder. That's 2.1.157." },
        { kind: 'say', text: "And here's the part that makes the loop fast: a plugin dropped into `.claude/skills` loads automatically, with *no marketplace requirement*. No publishing step to clear — drop the folder in and it's live in your session. `/plugin list` from 2.1.163 then shows what's installed, with enable/disable filtering so you can toggle pieces without uninstalling." },
        {
          kind: 'choice',
          prompt: "A teammate needs your bundle of commands and skills on a new engagement. What's the fastest path that the new tooling actually enables?",
          options: [
            { id: 'init-drop', label: 'Scaffold with `claude plugin init`, then drop it in `.claude/skills` where it auto-loads', correct: true, reaction: "Exactly. Init gives you the skeleton, `.claude/skills` loads it with no marketplace round-trip, and `/plugin list` confirms it's live. One install instead of re-wiring the pieces by hand." },
            { id: 'marketplace', label: 'Publish it to a public marketplace first, because that\'s required for it to load', correct: false, reaction: "Not anymore — 2.1.157 specifically removed the marketplace requirement for plugins in `.claude/skills`. You can load and test entirely locally." },
            { id: 'paste', label: 'Paste each command into their settings.json by hand', correct: false, reaction: "That's exactly the toil plugins exist to remove. Bundle once, install once — don't re-key the same setup on every engagement." },
          ],
        },
        { kind: 'say', text: "For us, that's a distribution channel. Every engagement starts with the same overhead — re-explaining standards, re-adding the same review commands. Package the firm's standards as a plugin once and onboarding becomes 'install this,' not a checklist someone half-remembers." },
        { kind: 'say', text: "And the build loop is tight: scaffold with init, test it live from `.claude/skills` in your own session, confirm with `/plugin list`. You're exercising the real thing the client will receive, in the same place they'll run it." },
        { kind: 'say', text: "One more, because distribution always raises it: what if a client needs most of the bundle but not one piece? The enable/disable filtering lets them toggle that part off and keep the rest — no forking your work into a copy you can never update. The door wants the fastest path to a shareable bundle. Name it and the issue's yours." },
      ],
    },
  },
  battle: {
    name: 'Packwyrm, Hoarder of a Hundred Skills',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*uncoils over a glittering hoard of loose commands, skills, and configs, none of them sorted* …all mine… every capability you'll ever need, scattered across my pile… come reassemble it by hand, little operator…",
    tauntLines: [
      "*sweeps a claw through the hoard, scattering it further* paste them one by one, the way you always have — I'll outlast your patience…",
      "*snorts smoke* no bundle, no box, no install — just my mountain of pieces and your tweezers…",
    ],
    victoryLine: "*the hoard collapses into a single neat, labeled crate* …you packaged it… one install and the whole pile travels… take the key, it's bundled in there with the rest…",
    questions: [
      {
        prompt:
          "You want to stop re-wiring the same slash commands and skills on every client engagement, and instead hand a teammate one installable bundle they can drop in and use immediately. Which move fits the new plugin tooling?",
        choices: [
          { id: 'a', label: 'Run `claude plugin init` to scaffold a plugin, bundle the commands and skills into it, and drop it in `.claude/skills`, where it auto-loads with no marketplace step', correct: true },
          { id: 'b', label: 'Paste each slash command into the teammate\'s settings.json by hand every time you start an engagement', correct: false },
          { id: 'c', label: 'Publish to a public marketplace, since that is the only way a plugin is allowed to load', correct: false },
          { id: 'd', label: 'Define them all as subagents so they fan out and run automatically', correct: false },
        ],
        passFeedback: 'HIT! `claude plugin init` scaffolds the bundle, and a plugin in `.claude/skills` auto-loads with no marketplace step — one installable unit instead of re-wiring the pieces on every engagement.',
        failFeedback: 'MISS! Hand-pasting is the toil plugins remove, the marketplace is no longer required for `.claude/skills`, and subagents are a different feature with no bundling or distribution. Re-read Book 1.',
      },
    ],
  },
};
