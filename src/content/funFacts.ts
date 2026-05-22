/**
 * "Did you know..." facts shown on the between-level loading screen.
 *
 * These are intentionally a mix of well-sourced wild use cases and
 * inspiring abstractions — the goal is to make players go "wait, what?"
 * and screenshot it.
 */
export const FUN_FACTS: string[] = [
  // User-provided, real-world wild use cases
  'A YouTuber strapped Claude to a Raspberry Pi with a camera and an RC car, then sent it into the frozen wilderness to explore on its own.',
  'Claude is helping JPL plan Perseverance rover routes on Mars and has cut route planning time roughly in half.',
  'A developer handed Claude full control of a tomato plant named Sol — the AI wakes every 30 minutes to make life-or-death calls about light, water, and heat with no human backup.',
  'A guy trying to pair his DJI vacuum with a PS5 controller used Claude Code to reverse engineer the protocol — and accidentally got camera-feed access to thousands of live vacuums worldwide.',
  'A former Anthropic engineer fed Claude his raw AncestryDNA file, and it spawned a swarm of sub-agents acting as specialists in cardiovascular, aging, and autoimmune genomics to produce a personalized health report.',
  'Someone left Claude Code agents running overnight and woke up to a self-built simulated civilization called "Underworld" — complete with its own laws, factions, and rebellions.',

  // Abstractions and capability nuggets
  'Claude Code can spawn sub-agents that run in parallel — entire teams of AI specialists working concurrently on the same repo.',
  'Custom slash commands let you bottle a prompt — type /review and Claude expands it into a full code-review brief.',
  'A CLAUDE.md file in your repo root acts as a contract: Claude reads it before every task and obeys what\'s inside.',
  'MCP servers let Claude reach beyond its sandbox — your filesystem, your GitHub, your database, all from the same prompt.',
  'Claude can read and reason about thousands of files in a single context — the equivalent of a small novel of source code.',
  'Plan mode lets Claude design the implementation before touching a single line — and refuse to edit until you approve.',
  'Engineers have used Claude to rewrite legacy COBOL banking code that humans were afraid to touch.',
  'A user wired Claude into their smart home and now the lights flicker red whenever a deploy fails.',

  // Consulting-flavored additions
  'A boutique strategy firm bottled their proposal-writing playbook into a single /draft-proposal skill — what used to take three consultants and a weekend now takes one Claude session and a half-hour review.',
  'Claude Code can run truly in parallel: five subagents researching five competitors at once, one orchestrator stitching the brief.',
  'Routines on Anthropic infrastructure run while your laptop is closed — every Friday at 5pm, a weekly digest lands in Slack with no one at the keyboard.',
  'Permission modes go: PLAN, ACCEPT-EDITS, AUTO, ASK. Shift+Tab to cycle. Plan first, ship last.',
  "A CLAUDE.md file at the root of your firm's project template is the cheapest leverage in the industry — one hour writing it pays back in every session forever.",
  'MCP servers let Claude post Slack updates, read Drive folders, and pull GitHub PRs — all from the same prompt, all with scoped auth.',
];

/** Returns a random fun fact. */
export function pickFunFact(): string {
  return FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
}
