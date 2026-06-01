# Future feature — The Quick-Learning Path (a self-updating curriculum)

> **Status:** design idea, not implemented. Captured here so we don't lose it.
> Owner: Connor. Last update: 2026-06-01.

## The product pitch

Most learning content about Claude Code goes stale within weeks — Anthropic ships
new features (skills, routines, MCP servers, new permission modes, plugins, etc.)
constantly, and a curriculum frozen in time is wrong by the time it ships.

Claude Code Quest already teaches the **traditional** curriculum: the 5-level
quest with bosses, NPCs, lore, and a final throne-room battle. That's the
"core canon" — what you sell, what people get certified on.

The **Quick-Learning Path** is a parallel game mode that **auto-refreshes
weekly**. A scheduled routine scans for the three most recent Claude Code
updates, contextualizes them, generates a tiny self-contained mini-level
about each one, and slots them into pre-built template rooms. When you
return to the game, the quick-learning side has changed — same engine,
same feel, new lessons.

**The hook:** the only Claude Code course that's *never* out of date,
because Claude Code itself is the one updating it.

## How a user experiences it

1. Title screen offers two paths:
   - **Quest** (canonical 5 levels + final boss — what we already have).
   - **Quick Learning** (3 mini-levels reflecting the most recent Claude
     Code updates, refreshed weekly).
2. Quick Learning is a single short floor with three rooms (one per update),
   visually distinct from the main quest (different theme — maybe a
   "newsroom" / "ticker" aesthetic). Each room teaches one feature in the
   same shape as the main quest: NPC lesson → lore tips → practice
   terminal → boss-style battle with quiz questions.
3. The top of the quick-learning hub shows the **publish date** of the
   current week's curriculum ("UPDATED · 2026-06-01") so it feels alive.
4. After completing the path, the player gets a stamp showing which
   week's curriculum they finished — collectible / shareable.

## The routine that makes it work

A `/loop`-style routine scheduled on Anthropic infra (or a cron-triggered
GitHub Action — see "implementation surface" below). Weekly, it:

1. **Scans for updates.** Sources, in priority order:
   - Anthropic Engineering blog RSS / posts tagged "Claude Code"
   - Claude Code changelog (`code.claude.com/docs/en/changelog` or
     equivalent — verify the canonical URL at build time)
   - Claude Code GitHub releases (`anthropics/claude-code` releases)
   - Anthropic Twitter/X handle for "shipped today" announcements
2. **Selects the 3 most impactful new features** since the last run. Heuristics:
   - Prefer items tagged or framed as "new feature" over "bug fix" or
     "internal change."
   - De-prioritize anything that overlaps the canonical 5-module canon
     (permission modes, CLAUDE.md basics, slash commands, MCP, subagents)
     — those are already taught in the main quest.
   - De-duplicate against the previous N weeks' featured items (see §
     "Dedup ledger" below).
3. **Researches each feature.** Spawns a sub-agent per feature that fetches
   the relevant docs / release notes / blog post and produces a small
   structured brief: name, one-line summary, key concepts (2-4 bullets),
   why-it-matters, a worked example, and 3 boss-battle quiz questions
   with correct answer + 3 distractors + pass/fail feedback.
4. **Generates curriculum content.** Maps the brief into the existing
   `LessonContent` shape — `intro`, NPC conversation `beats[]`, `lore[]`
   hint tips, optional `practice` block, and the `battle` (3 questions,
   modest HP).
5. **Writes the new content** into the appropriate template slot
   (`src/content/quick-learning/week-YYYY-MM-DD.ts` and a `current.ts`
   pointer file), opens a PR, and merges it (auto-merge gated on the
   existing build/lint).
6. **Vercel auto-deploys** from the merge — the next session a player
   opens picks up the new curriculum automatically.

## Architecture (in this codebase)

The engine already has everything we need, which is why this can be
mostly *content + routine* rather than a major refactor.

- **`LevelId` union and `LEVEL_CONFIGS`** in `src/engine/roomConfigs.ts`
  already support arbitrary level ids. Add a `'quick-learning'`
  level (or three sibling ids `'ql-1'`/`'ql-2'`/`'ql-3'`).
- **Template chambers** — pre-built blank rooms with placeholder
  `loreText`, NPC sprites/positions, challenge item, key spawn, exit
  door. The routine fills in the content; the geometry never moves.
  Each chamber has a stable id like `ql-room-1` etc.
- **Content** lives in `src/content/quick-learning/`:
  - `current.ts` — exports the active week's `LessonContent[]`.
  - `archive/week-2026-06-01.ts` etc. — past weeks for historical
    reference and to drive the dedup ledger.
  - `index.ts` already accepts `Record<LevelId, LessonContent>`, so
    plugging in extra entries is one line.
- **Title-screen path picker** — extend `InstructionsScreen` (or insert a
  new `PathSelectScreen` before customize) with two buttons:
  "QUEST" and "QUICK LEARNING." Selecting Quick Learning sets
  `currentLevel` to the first quick-learning chamber instead of `welcome`.
- **Dedup ledger** — a JSON file (`src/content/quick-learning/seen.json`)
  the routine reads + writes; lists every feature already taught in
  prior weeks (by canonical name + a hash). Routine refuses to re-pick
  a feature that's in the ledger within the last N weeks (e.g. 12).
- **Visual treatment** — a unique theme for the quick-learning hub
  (e.g. `THEME_NEWSROOM` with cyan/white) and a "UPDATED · {date}" tag
  in the HUD, sourced from the build-time timestamp of `current.ts`.

## Implementation surface (when we build it)

Phased — each phase is independently shippable:

**Phase 1 — Template rooms + manual path picker (the foundation).**
- Add three blank `quick-learning` chambers with placeholder content.
- Path-select screen ("Quest" / "Quick Learning") on title.
- Author one round of curriculum content by hand to prove the loop end-to-end.
- Ship. The game now has two paths even before any automation.

**Phase 2 — The research/authoring agent (run locally on demand).**
- A `scripts/quick-learning-update.ts` script:
  - Reads `seen.json`.
  - Spawns research sub-agents (`Task` tool with `subagent_type=Explore`)
    against the doc / blog / changelog sources.
  - Has them return structured briefs (Zod-validated).
  - Generates `LessonContent` from each brief via a Claude API call
    (use the `claude-api` skill).
  - Writes `current.ts` + archives the previous week.
  - Updates `seen.json`.
- Run manually first (`tsx scripts/quick-learning-update.ts`); confirm
  the output looks like content we'd be proud to ship.

**Phase 3 — Schedule it.**
- Either a GitHub Action on a weekly cron (`schedule: cron: '0 13 * * 1'`)
  that runs the script and opens an auto-merge PR — simplest and
  doesn't need Anthropic-infra access.
- Or, if we want to dogfood: a Claude Code routine (`/loop 1w …`) using
  the Routines feature on Anthropic infra. More on-brand.
- Either way: the PR must pass `npm run build` + `npm run lint` before
  merge. If the agent produces broken content, the merge fails and we
  get a notification.

**Phase 4 — Polish.**
- Human-in-the-loop preview UI: a `/quick-learning-preview` page that
  renders next week's draft before it merges.
- An archive viewer in-game: "see past weeks" lets the player replay
  older curricula.
- "What's new this week" splash that runs once after a refresh.

## Risk + open questions

- **Content quality.** A model generating its own curriculum can write
  bad questions or get a feature subtly wrong. Mitigation: structured
  schema validation (Zod), require the agent to cite a source URL
  per fact, preview-then-merge for the first 4-6 weeks until we trust it.
- **Source freshness.** Anthropic's docs URL structure may change.
  Routine should fail loudly (open an issue, not merge garbage) if it
  can't fetch a primary source.
- **Game-feel consistency.** Auto-generated bosses might feel
  characterless. Mitigation: a small library of pre-written villains
  ("the Stale-Docs Wraith", "the Outdated Tutorial Goblin") the agent
  picks from rather than inventing a new boss every week.
- **Legal / accuracy.** We're claiming a feature works a certain way —
  if Claude misreads release notes, we ship misinformation. Require
  a source URL per question and include it as a footer ("based on
  {date} release notes — verify at {url}").
- **Dedup logic.** Features evolve (e.g. "skills" got renamed mid-2025).
  Ledger should match on a canonical-name field the agent assigns,
  not just a hash of the raw blog title.

## Why this matters (the strategic angle)

Most "AI courses" sell a fixed snapshot of how AI worked 6 months ago.
This product makes the **fact of AI moving fast** into a feature, not
a flaw. The pitch writes itself:

> *Claude Code Quest. The only Claude Code course that's never out of
> date — because Claude Code is the one keeping it current.*

The traditional path proves you know the canon and gets you certified.
The quick-learning path proves you're keeping up with the frontier.
Together, that's "I am current on Claude Code in 2026" in a way no
static course can claim.

Also: a routine that publishes new lessons every week is excellent
**dogfooding** of the very routines feature the main quest teaches in
Level 5. The product is, by construction, a demonstration that Claude
Code can build and maintain real software autonomously.
