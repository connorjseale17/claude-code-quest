# Future feature — "This Week in Claude" (a self-updating learning path)

> **Status:** design idea, not implemented. Captured here so we don't lose it.
> Owner: Connor. Last update: 2026-06-01.

## The two paths (locked naming)

The game is **Claude Code Quest**. Inside it, the player picks between two paths:

- **The Quest** — the canonical 5-level curriculum + final-boss throne room.
  Locks down the fundamentals. This is what we already have, and what a learner
  gets certified on.
- **This Week in Claude** *(TWiC, in code/internal use)* — a parallel path
  that **auto-refreshes weekly** with the three most recent Claude Code
  features. Same engine, same feel; new lessons every week.

Use these names consistently in UI copy, code identifiers, and marketing.
Internal shorthand is fine (`twic`), but anything player-facing should be
the full name.

## The product pitch

Most learning content about Claude Code goes stale within weeks — Anthropic
ships new features (skills, routines, MCP servers, new permission modes,
plugins, etc.) constantly, and a curriculum frozen in time is wrong by the
time it ships.

**The Quest** teaches the canon. **This Week in Claude** keeps you on the
frontier — *because the curriculum is the one being updated by Claude Code
itself.*

**The hook:** the only Claude Code course where "This Week in Claude" is
literally a thing, refreshed weekly by the very routines feature the canon
teaches in Level 5.

## How a user experiences it

1. **Title screen offers two paths:**
   - **THE QUEST** — fundamentals, 5 levels + boss.
   - **THIS WEEK IN CLAUDE** — three mini-levels of the most recent updates,
     refreshed weekly. Tagged with the publish date: `UPDATED · 2026-06-01`.
2. **TWiC is a single short floor** with three rooms (one per featured
   update), visually distinct from The Quest (different theme — a
   "newsroom" / "ticker" aesthetic). Each room teaches one feature in
   the same shape as the canon: NPC lesson → lore tips → practice
   terminal → boss battle with quiz questions.
3. **The hub shows the publish date** of the current week's curriculum so
   it feels alive.
4. **Completion stamp** with the week's date — collectible / shareable
   ("I finished *This Week in Claude · 2026-06-01*").

## The routine that makes it work

A `/loop`-style routine scheduled on Anthropic infra (or a cron-triggered
GitHub Action — see "Implementation surface" below). Weekly, it:

1. **Scans for updates.** Sources, in priority order:
   - Anthropic Engineering blog RSS / posts tagged "Claude Code"
   - Claude Code changelog (verify the canonical docs URL at build time)
   - Claude Code GitHub releases (`anthropics/claude-code` releases)
   - Anthropic announcement channels
2. **Selects the 3 most impactful new features** since the last run.
   Heuristics:
   - Prefer items framed as "new feature" over "bug fix" or "internal change."
   - De-prioritize anything that overlaps the canon (permission modes,
     CLAUDE.md, slash commands, MCP, subagents) — those live in The Quest.
   - De-duplicate against the previous N weeks' featured items (see
     "Dedup ledger" below).
3. **Researches each feature.** Spawns a sub-agent per feature that fetches
   the relevant docs / release notes / blog post and produces a small
   structured brief: name, one-line summary, key concepts (2-4 bullets),
   why-it-matters, a worked example, and 3 boss-battle quiz questions
   (correct answer + 3 distractors + pass/fail feedback).
4. **Generates curriculum content.** Maps each brief into the existing
   `LessonContent` shape — `intro`, NPC `conversations[]` beats, `lore[]`
   hint tips, optional `practice` block, and the `battle` (3 questions,
   modest HP).
5. **Writes the new content** into the appropriate template slot
   (`src/content/twic/week-YYYY-MM-DD.ts` and a `current.ts` pointer),
   opens a PR, and merges it (auto-merge gated on `npm run build` +
   `npm run lint`).
6. **Vercel auto-deploys** from the merge — the next session a player
   opens picks up the new curriculum automatically.

## Architecture (in this codebase)

The engine already has everything we need, which is why this is mostly
*content + routine* rather than a real refactor.

- **`LevelId` union and `LEVEL_CONFIGS`** in `src/engine/roomConfigs.ts`
  already support arbitrary level ids. Add three sibling level ids:
  `'twic-1'`, `'twic-2'`, `'twic-3'`.
- **Template chambers** — pre-built blank rooms with placeholder content,
  one NPC sprite/position, a challenge item, a key spawn, and an exit door.
  The routine fills the content; the geometry never moves. Stable chamber
  ids like `twic-room-1`.
- **Content** lives in `src/content/twic/`:
  - `current.ts` — exports the active week's three `LessonContent` entries.
  - `archive/week-2026-06-01.ts` etc. — past weeks for history + the
    dedup ledger.
  - The existing `src/content/index.ts` `CONTENT` map picks up the three
    new keys with no schema change.
- **Title-screen path picker** — new `PathSelectScreen` (or extend
  `InstructionsScreen`) with two prominent buttons:
  - `THE QUEST` → starts at the `welcome` level (current default).
  - `THIS WEEK IN CLAUDE` → starts at `twic-1`.
  Both paths use the same player customize step (name + bot color).
- **Dedup ledger** — `src/content/twic/seen.json`, written by the routine.
  Lists every feature already taught (by canonical name + a content hash).
  Routine refuses to re-feature anything in the ledger within the last
  N weeks (e.g. 12).
- **Visual treatment** — a unique theme for the TWiC hub (e.g.
  `THEME_NEWSROOM` with cyan/white), plus an `UPDATED · {date}` tag in
  the HUD sourced from the build-time timestamp of `current.ts`.

## Implementation surface (when we build it)

Phased — each phase is independently shippable:

**Phase 1 — Template rooms + manual path picker (the foundation).**
- Add three blank `twic-1/2/3` chambers with placeholder content.
- `PathSelectScreen` with "The Quest" / "This Week in Claude" buttons.
- Author one round of TWiC content by hand to prove the loop end-to-end.
- Ship. The game now has both paths even before any automation.

**Phase 2 — The research/authoring agent (run locally on demand).**
- A `scripts/twic-update.ts` script:
  - Reads `seen.json`.
  - Spawns research sub-agents against the docs / blog / changelog.
  - Has them return Zod-validated structured briefs.
  - Generates `LessonContent` from each brief via the Claude API
    (use the `claude-api` skill).
  - Writes `current.ts`, archives the previous week, updates `seen.json`.
- Run manually first (`tsx scripts/twic-update.ts`); confirm the output
  looks like content we'd be proud to ship.

**Phase 3 — Schedule it.**
- Either a GitHub Action on a weekly cron — simplest, doesn't need
  Anthropic-infra access. Auto-opens a PR.
- Or, to dogfood: a Claude Code routine (`/loop 1w …`) using the
  Routines feature. More on-brand.
- Either way: the PR must pass `npm run build` + `npm run lint` before
  merge. If the agent produces broken content, the merge fails and we
  get a notification — never silently ship bad content.

**Phase 4 — Polish.**
- Human-in-the-loop **preview UI**: a hidden `/twic-preview` route that
  renders next week's draft before merge.
- An **archive viewer** in-game: replay past weeks of TWiC.
- A "**WHAT'S NEW THIS WEEK**" splash that runs once after a refresh.

## Risk + open questions

- **Content quality.** A model generating its own quiz questions can get
  a feature subtly wrong. *Mitigation:* Zod schema validation, require
  a source URL per fact, preview-then-merge for the first 4-6 weeks until
  we trust the pipeline.
- **Source freshness.** Anthropic's docs URL structure may change. Routine
  should fail loudly (open an issue, not merge garbage) if it can't fetch
  a primary source.
- **Game-feel consistency.** Auto-generated bosses might feel
  characterless. *Mitigation:* a small library of pre-written villains
  ("the Stale-Docs Wraith", "the Outdated Tutorial Goblin", "the Patchnote
  Phantom") that the agent picks from rather than inventing a new one
  every week.
- **Accuracy / legal.** If Claude misreads release notes, we ship
  misinformation. Require a source URL per question and surface it as a
  footer ("based on {date} release notes — verify at {url}").
- **Dedup logic.** Features evolve and get renamed. The ledger should
  match on a canonical-name field the agent assigns, not just a hash of
  the raw blog title.

## Why this matters

Most "AI courses" sell a fixed snapshot of how AI worked 6 months ago.
This product makes the **fact of AI moving fast** into a feature, not a
flaw. The pitch:

> **Claude Code Quest.** Lock down the fundamentals in *The Quest*.
> Stay current with *This Week in Claude*, refreshed every week — by
> the very Claude Code routines you just learned about.

**The Quest** proves you know the canon. **This Week in Claude** proves
you're keeping up with the frontier. Together, that's "I am current on
Claude Code in 2026" in a way no static course can claim.

And: a routine that publishes new lessons every week is excellent
**dogfooding** of the very routines feature The Quest teaches in Level 5.
The product is, by construction, a live demonstration that Claude Code
can build and maintain real software autonomously.
