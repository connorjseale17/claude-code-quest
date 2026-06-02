import type { LessonContent } from './types';

/** twic-3 (Feature C) — Plugins auto-load from .claude/skills + `claude plugin init`.
 *  Final room — door target routes to the TwicStampScreen via currentTrack.
 *  Source: Claude Code CHANGELOG 2.1.157. */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Room 3 — last beat. The story is plugins: package a workflow once and it now rides along in the repo, no marketplace required. Same shape as the rooms before it — Beat Reporter, two books, one door question. Clear it and the issue stamp drops.",
  prompt:
    "You've packaged a repeatable engagement workflow as a plugin and committed it to the project's `.claude/skills` directory. A teammate clones the repo and opens Claude Code. What happens to your plugin?",
  choices: [
    { id: 'a', label: 'It loads automatically — as of 2.1.157, plugins in `.claude/skills` are picked up with no marketplace required', correct: true },
    { id: 'b', label: 'Nothing until they publish it to a marketplace and install it from there', correct: false },
    { id: 'c', label: 'Nothing until they run a build step to compile the plugin first', correct: false },
    { id: 'd', label: 'It loads only if they paste its contents into their CLAUDE.md', correct: false },
  ],
  passFeedback: 'HIT! Drop a plugin in `.claude/skills` and Claude Code loads it on its own. The repo carries its own tooling — no marketplace, no install dance.',
  failFeedback: 'MISS! The whole change is that local `.claude/skills` plugins auto-load — no marketplace, no build step, no copy-paste into CLAUDE.md. Re-read the books.',
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**From Marketplace-Only to Drop-In — How \`.claude/skills\` Plugins Load**

**What a plugin is**

A plugin is a packaged bundle of capability that extends Claude Code — skills, commands, and the like, wrapped so it can travel as a single unit. The point of packaging is reuse: build a workflow once, hand the bundle around, and everyone who has it gets the same behavior without rebuilding it from a blank slate. Think of it as the difference between re-explaining a process every time and handing someone the finished playbook.

**The old path and the new one**

Until recently, getting a plugin in front of Claude generally meant going through a marketplace — publish it, then install from there. That's fine for tools meant for the world, but heavy for something you only want on one project. As of 2.1.157, the marketplace is no longer the only road. *Plugins in* \`.claude/skills\` *directories are now automatically loaded, no marketplace required.* Drop a plugin into that folder and Claude Code picks it up on its own the next time the project opens.

**Scaffolding and discovery**

Two companion changes round it out. \`claude plugin init <name>\` *scaffolds a new plugin in* \`.claude/skills\`, so you get a working skeleton in the right place instead of assembling the structure by hand. And \`/plugin\` *gained argument autocomplete* for subcommands, installed plugin names, and plugins from known marketplaces — managing what's loaded is now less guesswork and more tab-complete.

> Takeaway: A plugin no longer has to come from a marketplace — scaffold it with \`claude plugin init\`, drop it in \`.claude/skills\`, and it loads on its own.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Ship the Workflow With the Repo — Plugins on a Team Engagement**

**Package the thing you do every week**

Every consultant has a workflow they repeat — an onboarding checklist, a house-style review pass, a weekly status build. A plugin lets you capture that once instead of re-explaining it each engagement, or worse, doing it slightly differently every time. Scaffold it with \`claude plugin init\`, fill in the steps, and you have a reusable unit instead of a habit living only in your head — one a new teammate can pick up without a walkthrough.

**Make it travel with the project**

Here is where the no-marketplace change earns its keep. Commit the plugin into the project's \`.claude/skills\` directory and it rides along in the repo. A teammate clones, opens Claude Code, and the plugin is simply *there* — loaded automatically, no publish step, no install dance, no waiting on a marketplace review. The repo carries its own tooling, so everyone on the engagement works the same way by default.

**When a marketplace still makes sense**

Drop-in loading is for *this project's* people and *this project's* workflow. If you've built something genuinely general — useful across many clients and teams — a marketplace is still the right channel for wide distribution, and \`/plugin\` autocomplete now makes pulling those in painless. Local for the engagement, marketplace for the world.

> Takeaway: Commit a plugin to \`.claude/skills\` and your workflow ships with the repo for the whole team — reserve the marketplace for tools meant for everyone.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `Scaffold a plugin with ____ so our ____ workflow
is packaged once instead of re-explained each engagement.
Commit it into the project's ____ directory,
and it ____ for every teammate who clones the repo —
no marketplace step, no install dance.`,
    blanks: [
      { id: 'command', suggestions: ['claude plugin init', 'claude plugin init engagement-kit', 'the plugin scaffolder'] },
      { id: 'workflow', suggestions: ['client-onboarding', 'house-style review', 'weekly-report'] },
      { id: 'dir', suggestions: ['.claude/skills', '.claude/skills/', 'the .claude/skills folder'] },
      { id: 'behavior', suggestions: ['auto-loads', 'loads automatically', 'is picked up on open'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "A plugin is a packaged bundle of capability (skills, commands) that extends Claude Code. As of 2.1.157, plugins in .claude/skills auto-load with no marketplace required; `claude plugin init <name>` scaffolds one there; and /plugin gained argument autocomplete. Commit a plugin to .claude/skills to ship a workflow with the repo for the whole team; reserve marketplaces for tools meant for everyone.",
      beats: [
        { kind: 'say', text: "Last story of the issue: plugins. A plugin is a packaged bundle of capability — skills, commands — wrapped so it travels as one unit. Build a workflow once, share the bundle, everyone gets the same behavior." },
        { kind: 'say', text: "The old way to get one loaded usually meant a marketplace: publish, then install from there. That's no longer the only road." },
        { kind: 'say', text: "As of 2.1.157, *plugins in `.claude/skills` auto-load — no marketplace required*. `claude plugin init <name>` scaffolds a new one right in that folder, and `/plugin` now autocompletes its subcommands and installed names." },
        {
          kind: 'choice',
          prompt: "Quick check before the last door. You commit a plugin into the project's `.claude/skills`, a teammate clones the repo and opens Claude Code. What happens?",
          options: [
            { id: 'autoload', label: 'it loads automatically — no marketplace required', correct: true, reaction: "Right. As of 2.1.157, `.claude/skills` plugins are picked up on their own. The repo carries its own tooling." },
            { id: 'marketplace', label: 'nothing until they publish it to a marketplace and install it', correct: false, reaction: "That's the old way. The whole change is that local `.claude/skills` plugins load without any marketplace step." },
            { id: 'build', label: 'nothing until they compile it with a build step', correct: false, reaction: "No build step. Drop it in `.claude/skills` and Claude Code loads it as-is." },
          ],
        },
        { kind: 'say', text: "So on a team engagement: package the workflow you repeat, commit it to `.claude/skills`, and everyone who clones works the same way by default. Save the marketplace for the genuinely general tools meant for the whole world." },
        { kind: 'say', text: "That's the issue. The books have the full mechanic and the playbook. Clear the last door — it asks what happens when a teammate clones a repo with your plugin in `.claude/skills` — and the issue stamp is yours." },
      ],
    },
  },
  battle: {
    name: 'Tollbooth, the Marketplace Slime',
    spriteKey: 'slime',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*oozes across the doorway, rattling a coin tin* …no plugin passes without a marketplace toll… publish first… install second… pay up…",
    tauntLines: [
      "*blocks the path* you can't just *drop* a skill in a folder! where's your marketplace listing?!",
      "*jiggles smugly* compile it, publish it, install it — that's the only way, surely…",
    ],
    victoryLine: "*deflates over its coin tin* …fine… `.claude/skills` loads on its own now… the toll's abolished… take the key…",
    questions: [
      {
        prompt:
          "You've packaged a repeatable engagement workflow as a plugin and committed it to the project's `.claude/skills` directory. A teammate clones the repo and opens Claude Code. What happens to your plugin?",
        choices: [
          { id: 'a', label: 'It loads automatically — as of 2.1.157, plugins in `.claude/skills` are picked up with no marketplace required', correct: true },
          { id: 'b', label: 'Nothing until they publish it to a marketplace and install it from there', correct: false },
          { id: 'c', label: 'Nothing until they run a build step to compile the plugin first', correct: false },
          { id: 'd', label: 'It loads only if they paste its contents into their CLAUDE.md', correct: false },
        ],
        passFeedback: 'HIT! Drop a plugin in `.claude/skills` and Claude Code loads it on its own. The repo carries its own tooling — no marketplace, no install dance.',
        failFeedback: 'MISS! The whole change is that local `.claude/skills` plugins auto-load — no marketplace, no build step, no copy-paste into CLAUDE.md. Re-read the books.',
      },
    ],
  },
};
