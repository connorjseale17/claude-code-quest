import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — AGENTS.md support. Claude Code adds a fallback for a
 * project's standing instructions: in a project with no CLAUDE.md, it reads a
 * file named AGENTS.md instead and treats it as the project's instructions.
 * CLAUDE.md still takes precedence where it exists; AGENTS.md fills the gap when
 * it doesn't. You choose which file the tool uses under "Project instructions"
 * in `/config`. AGENTS.md is a cross-tool open format (not a Claude invention),
 * now stewarded by the Agentic AI Foundation under the Linux Foundation, and a
 * growing set of coding agents already read it. Not yet on Bedrock/Vertex/Foundry.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.277: "Added AGENTS.md support: in a project with
 *     no CLAUDE.md, Claude Code reads AGENTS.md instead; change it under
 *     'Project instructions' in `/config` (not yet on Bedrock, Vertex or Foundry)"
 *   - agents.md: "a simple, open format for guiding coding agents" — "a dedicated,
 *     predictable place to provide the context and instructions to help AI coding
 *     agents work on your project"; holds "build steps, tests, and conventions that
 *     might clutter a README"; "a cross-tool open format" now "stewarded by the
 *     Agentic AI Foundation under the Linux Foundation"; read by Codex, Jules,
 *     Aider, Copilot's coding agent, Cursor, Zed, and 20+ others.
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room one of this week's rundown, and the Beat Reporter is perched on a desk stacked with identical briefs, watching a skeleton copy the same note out by hand for the hundredth time. The 2.1.277 release gives Claude Code a fallback for its standing orders: in a project with no CLAUDE.md, it now reads the repo's `AGENTS.md` — a cross-tool open brief a growing ecosystem of agents already follow — and treats it as the project's instructions. The two books cover how that fallback resolves and why a consultant inheriting a client's repo suddenly starts a step ahead. Answer the door for the key, then square up to Scrivener, a skeleton that never learned one shared note could serve every reader.",
  prompt:
    "You open a client repo that has an AGENTS.md file but no CLAUDE.md. What does Claude Code do with it?",
  choices: [
    { id: 'a', label: "Reads AGENTS.md as the project's instructions in place of CLAUDE.md — the same shared brief a growing set of coding agents already follow", correct: true },
    { id: 'b', label: "Ignores it — Claude Code only reads a file named CLAUDE.md, so you must rename or convert it first", correct: false },
    { id: 'c', label: "Reads it, but AGENTS.md always overrides a CLAUDE.md wherever the two conflict", correct: false },
    { id: 'd', label: "Refuses to start until you pick one file, since it can't tell which set of instructions to trust", correct: false },
  ],
  passFeedback: "HIT! With no CLAUDE.md present, AGENTS.md is exactly the file Claude Code falls back to — the same cross-tool open brief other agents read. You inherit the repo's conventions with no setup.",
  failFeedback: "MISS! Ignoring AGENTS.md was the pre-2.1.277 behavior, and precedence runs the other way — CLAUDE.md wins where it exists; AGENTS.md is the fallback, not an override. Re-read Book 1.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**AGENTS.md — The Briefing Claude Reads When There's No CLAUDE.md**

**The fallback the tool reaches for**

Claude Code has always read a CLAUDE.md at a project's root — the standing brief that names the build steps, the test command, and the conventions this codebase expects. As of 2.1.277 it has a fallback: in a project with *no* CLAUDE.md, Claude Code reads a file named \`AGENTS.md\` instead and treats it as the project's instructions. CLAUDE.md still wins wherever it exists; \`AGENTS.md\` is what fills the gap when it doesn't. You choose which file the tool uses under **Project instructions** in \`/config\`.

**What AGENTS.md actually is**

\`AGENTS.md\` isn't a Claude invention. It's a cross-tool open format for guiding coding agents — *a dedicated, predictable place to provide the context and instructions to help AI agents work on your project* — now stewarded by the Agentic AI Foundation under the Linux Foundation. It holds the agent-facing detail that would clutter a README: how to build, how to run the tests, the conventions a newcomer would otherwise guess wrong. A growing ecosystem already reads it — Codex, Jules, Aider, Copilot's coding agent, Cursor, Zed, and more.

**One note, many readers**

Because the format is shared, a single \`AGENTS.md\` at a repo's root briefs every agent that speaks it. Claude Code joining that list means a repo already carrying an \`AGENTS.md\` from another tool now gets a Claude that arrives pre-briefed, with nothing to port over. (One caveat: it isn't on Bedrock, Vertex, or Foundry yet.)

> Takeaway: With no CLAUDE.md present, Claude Code reads the repo's \`AGENTS.md\` — the same shared, open brief a growing set of coding agents already follow.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Write the Brief Once — Why a Consultant Leans on the Shared File**

**The repo you didn't set up**

Half of consulting is walking into a codebase someone else built. If that team already runs an AI coding agent, the odds are rising that the repo carries an \`AGENTS.md\` — the conventions, the build, the *don't touch the legacy billing module* already written down for a machine to read. Before, a Claude Code session ignored that and started cold unless you authored a CLAUDE.md yourself. Now it reads the note that's already there, so you inherit the client's own house rules on day one instead of rediscovering them by breaking something.

**One file for a mixed toolchain**

The other direction matters just as much. When *you* author the brief, putting it in \`AGENTS.md\` means it serves whatever agent the client's team reaches for — not only your Claude Code session. A mixed shop running Claude, Copilot, and Cursor against the same repo can share one source of truth instead of three drifting copies that quietly disagree about the test command. You maintain the engagement's conventions in one place, and every tool that speaks the format stays in sync.

**Precedence is a feature, not a footnote**

Keep the order straight: a CLAUDE.md, where it exists, still takes precedence — \`AGENTS.md\` is the fallback, not an override. So a repo can carry a shared \`AGENTS.md\` for the whole toolchain *and* a Claude-specific CLAUDE.md for the handful of things only your session needs, and the two don't fight. That's the clean split a serious engagement wants: shared conventions in the open file, Claude-only nuance in the dedicated one.

> Takeaway: Read AGENTS.md to inherit a client's existing conventions with zero setup; author it to brief a whole mixed toolchain from one file — and let CLAUDE.md carry only what's Claude's alone.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `I'm picking up a client's repo that already carries an ____ left by their existing coding agent.
Because the repo has ____, Claude Code will read that file as the project's instructions with no setup from me.
It already spells out the ____ this codebase expects, so my session arrives pre-briefed instead of guessing.
If I later need Claude-only nuance, I'll add a ____, which takes precedence wherever it exists.
And because the format is ____, that one brief keeps every agent the team runs in sync.`,
    blanks: [
      { id: 'agents-file', suggestions: ['AGENTS.md file', 'agent brief', 'shared instructions file'] },
      { id: 'no-claudemd', suggestions: ['no CLAUDE.md', 'no Claude-specific brief', 'no CLAUDE.md of its own'] },
      { id: 'conventions', suggestions: ['build steps and test commands', 'conventions and gotchas', 'setup and house rules'] },
      { id: 'claude-file', suggestions: ['CLAUDE.md', 'dedicated CLAUDE.md', 'Claude-only CLAUDE.md'] },
      { id: 'open-format', suggestions: ['a cross-tool open format', 'an open standard', 'shared across agents'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "AGENTS.md support (Claude Code 2.1.277): in a project with no CLAUDE.md, Claude Code now reads a file named AGENTS.md instead and treats it as the project's instructions. CLAUDE.md still takes precedence wherever it exists — AGENTS.md is the fallback, not an override. You pick which file the tool uses under Project instructions in /config. AGENTS.md is a cross-tool open format (stewarded by the Agentic AI Foundation under the Linux Foundation), holding build steps, test commands, and conventions; a growing ecosystem already reads it (Codex, Jules, Aider, Copilot's coding agent, Cursor, Zed, and more). For a consultant: inheriting a repo that already carries an AGENTS.md means Claude arrives pre-briefed with no porting; authoring the brief in AGENTS.md serves a mixed toolchain from one file, while a CLAUDE.md carries Claude-only nuance. Not yet on Bedrock, Vertex, or Foundry.",
      beats: [
        { kind: 'say', text: "Lead item this week is small in the changelog and big in practice: where I get my standing orders for a project. You know CLAUDE.md — the root file that tells me the build, the tests, the conventions. As of 2.1.277, there's a fallback." },
        { kind: 'say', text: "In a project with no CLAUDE.md, I now read a file called `AGENTS.md` instead, and treat it as the project's instructions. CLAUDE.md still wins wherever it exists — AGENTS.md just fills the gap when it doesn't. You pick which file I use under Project instructions in `/config`." },
        { kind: 'say', text: "Here's what makes it more than a rename. `AGENTS.md` isn't ours. It's a cross-tool open format for briefing coding agents — build steps, test commands, conventions, the stuff that'd clutter a README — and a whole ecosystem already reads it: Codex, Jules, Aider, Copilot's coding agent, Cursor, Zed. It's stewarded under the Linux Foundation now." },
        {
          kind: 'choice',
          prompt: "You open a client repo. It has an AGENTS.md from their existing agent, but no CLAUDE.md. What do I do with it?",
          options: [
            { id: 'reads-it', label: "Read AGENTS.md as the project's instructions", correct: true, reaction: "Right. No CLAUDE.md means AGENTS.md is exactly what I read. You inherit their house rules on day one — no porting, no cold start." },
            { id: 'ignores', label: "Ignore it — you only read CLAUDE.md", correct: false, reaction: "Not anymore. That was true before 2.1.277. Now, with no CLAUDE.md, AGENTS.md is precisely the file I fall back to." },
            { id: 'override', label: "Read it, and let it override any CLAUDE.md", correct: false, reaction: "Careful — precedence runs the other way. CLAUDE.md wins where it exists; AGENTS.md is the fallback, not the override." },
          ],
        },
        { kind: 'say', text: "Why you'd care on an engagement: half the job is a repo you didn't set up. If their team runs any AI agent, odds are the conventions are already written in an AGENTS.md. I read it now, so I arrive pre-briefed instead of guessing and breaking the legacy module they warned you about." },
        { kind: 'say', text: "And when *you* write the brief, putting it in AGENTS.md means it serves every tool the client runs — Claude, Copilot, Cursor — from one file, instead of three copies drifting out of sync. Keep Claude-only nuance in a CLAUDE.md; the two don't fight." },
        { kind: 'say', text: "The books have the full read — the mechanic in one, the engagement play in the other. The door asks one thing. Answer it for the key, then face what's past it: Scrivener, a skeleton that never learned to read the shared note, and rewrites the same brief in a private hand for every soul who enters." },
      ],
    },
  },
  battle: {
    name: 'Scrivener, the Note-Hoarder',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a skeleton looks up from a desk buried in identical notes, quill still scratching* …a fresh one, are you… I keep a brief for each of you, you see — a separate note, a separate hand, for every tool that darkens my door… what's that? one file the whole guild can read? …tell me true before I believe such a thing — in a project with no CLAUDE.md, what do I read instead?",
    tauntLines: [
      "*sweeps a stack of duplicate notes to the floor* you'd have me *ignore* the shared file — read only my own hand, my own CLAUDE.md, and nothing else? that was the old rite… behind the times, and proud of it…",
      "*the quill snaps* you say the shared note *overrides* my careful CLAUDE.md?! never — where mine exists, mine wins… the other is a fallback, a gap-filler, not a usurper…",
    ],
    victoryLine: "*Scrivener sets down the quill and reads the single note the whole guild already shares* …one file… every reader… I hoarded copies for centuries and they only ever drifted apart… take the key, operator, and brief them all at once…",
    questions: [
      {
        prompt:
          "You open a client repo that has an AGENTS.md file but no CLAUDE.md. What does Claude Code do with it?",
        choices: [
          { id: 'a', label: "Reads AGENTS.md as the project's instructions in place of CLAUDE.md — the same shared brief a growing set of coding agents already follow", correct: true },
          { id: 'b', label: "Ignores it — Claude Code only reads a file named CLAUDE.md, so you must rename or convert it first", correct: false },
          { id: 'c', label: "Reads it, but AGENTS.md always overrides a CLAUDE.md wherever the two conflict", correct: false },
          { id: 'd', label: "Refuses to start until you pick one file, since it can't tell which set of instructions to trust", correct: false },
        ],
        passFeedback: "HIT! With no CLAUDE.md present, AGENTS.md is exactly the file Claude Code falls back to — the same cross-tool open brief other agents read. You inherit the repo's conventions with no setup.",
        failFeedback: "MISS! Ignoring AGENTS.md was the pre-2.1.277 behavior, and precedence runs the other way — CLAUDE.md wins where it exists; AGENTS.md is the fallback, not an override. Re-read Book 1.",
      },
    ],
  },
};
