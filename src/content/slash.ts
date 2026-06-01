import type { LessonContent } from './types';

export const slashContent: LessonContent = {
  roomId: 'slash',
  intro: 'The Registry. Every command your firm wrote once and now runs forever lives here. Three drawers: slash commands, skills, hooks. Each one buys back time. Find them. Read them. Then prove you know which is which.',
  prompt: "Your firm has a hard rule: `pnpm lint` must run before any commit, no exceptions, no matter who's at the keyboard. Which Claude Code mechanic GUARANTEES it happens — even if Claude or the operator forgets?",
  choices: [
    { id: 'a', label: "Add 'always lint before commit' to CLAUDE.md", correct: false },
    { id: 'b', label: 'A custom /commit slash command that includes the lint step', correct: false },
    { id: 'c', label: 'A PreToolUse hook that runs lint before any Bash(git commit *)', correct: true },
    { id: 'd', label: 'A subagent that reviews every commit after the fact', correct: false },
  ],
  passFeedback: '[PASS] CLAUDE.md is advice. Skills are recipes. Hooks are laws. Deterministic enforcement = hooks.',
  failFeedback: '[FAIL] Advisory rules can be ignored. Slash commands only fire when invoked. Need a guarantee? Hook.',
  lore: [
    {
      id: 'command-sheet',
      text: 'A slash command is a markdown file at `.claude/commands/<name>.md`. The body of the file IS the prompt. Type `/name` and Claude expands the contents into the conversation as if you had typed it yourself.\n\nPipe arguments through `$ARGUMENTS`. A command called `review-pr` with body "Review the PR at $ARGUMENTS for our team style and security checks" becomes `/review-pr #142` at the prompt.\n\nVersioned in git, shared with the team. Three minutes of authoring, hours of leverage per use.',
    },
    {
      id: 'index',
      text: 'Skills live at `.claude/skills/<name>/SKILL.md`. Same shape as a slash command, but with YAML frontmatter on top and a folder of supporting files alongside.\n\nThe magic is the description field. When Claude reads a task that matches a skill description, it AUTO-invokes the skill — no slash needed. "Draft a proposal for Acme" wakes up `/draft-proposal` because the skill description matches.\n\nSkills can bundle templates, examples, reference files, even spawn subagents. Slash commands cannot. When in doubt, write a skill.',
    },
    {
      id: 'card-a',
      text: "Bottle your firm's deliverables one skill at a time. /draft-proposal for the proposal microsite. /summarize-call for discovery notes. /qbr-deck for the quarterly review.\n\nOne skill per move your firm sells. Each is versioned in git, evolves with your practice, and is invoked the same way by every consultant.\n\nNew consultant onboards? They do not learn the moves from scratch. They just use the skills.",
    },
    {
      id: 'hierarchy',
      text: 'The hierarchy resolves three different shapes of "follow this rule" in three different ways.\n\nCLAUDE.md is ADVICE. Claude reads it every session and usually follows. Skill is a RECIPE. Claude follows when the task description matches and the recipe applies. Hook is LAW. Hook runs every time the event fires, no AI judgment involved.\n\nPick by how non-negotiable the rule is. A preference goes in CLAUDE.md; a procedure goes in a skill; an inviolable guarantee goes in a hook.',
    },
    {
      id: 'hooks-intro',
      text: 'Hooks fire on lifecycle events and run shell commands. PreToolUse fires before any tool — Write, Bash, MCP — and CAN BLOCK the tool call entirely. PostToolUse fires after, useful for formatters or linters.\n\nSessionStart fires when Claude opens; SessionEnd when it closes. Pull latest from git on start, send a summary to Slack on end.\n\nMatchers target specific cases. `Bash(git commit *)` catches only git commits. `Write(*.ts)` catches only TypeScript writes. `Write(.env*)` catches every flavor of dotenv file. Specific matchers keep hooks fast.',
    },
    {
      id: 'card-b',
      text: 'A PostToolUse hook on `Write(*.ts)` runs prettier and eslint --fix on every TypeScript file Claude touches. Format-on-save, deterministic edition.\n\nNo AI judgment. Claude wrote a file, the hook ran the formatter, the formatter rewrote it cleanly. No "Claude usually formats." No drift between teammates.\n\nThe same matcher pattern works for `Write(*.py)` plus ruff, `Write(*.go)` plus gofmt, anything you can run from the command line.',
    },
    {
      id: 'defense-in-depth',
      text: 'Critical rules deserve multiple layers. To make sure no one — Claude or human — ever commits .env files or API keys, you do not pick one mechanism. You stack them.\n\nLayer one: a PreToolUse hook with matcher `Write(.env*)` set to block. Hard enforcement, deterministic. Layer two: .gitignore listing the .env files. Git-level safety net. Layer three: a line in CLAUDE.md reminding Claude why those files are off-limits, so the reasoning travels.\n\nNo single layer is enough. This is the same principle security engineers use: never rely on one control.',
    },
    {
      id: 'card-c',
      text: "In a skill's frontmatter, `allowed-tools: Read, Grep, Glob` limits which Claude Code tools that skill can invoke. Read views file contents. Grep searches for text patterns. Glob finds files matching wildcards.\n\nWith only those three, the skill literally cannot write files or run shell commands. That is a permission boundary on the skill itself, separate from the session permission mode.\n\nSame idea as restricting GPT Actions to certain API endpoints. Fence each skill to exactly the tools it needs.",
    },
  ],
  practice: {
    id: 'command-architect-practice',
    template: '# .claude/skills/draft-proposal/SKILL.md\n---\nname: draft-proposal\ndescription: Draft a ____ for $ARGUMENTS using the firm\'s discovery notes.\nallowed-tools: Read, Glob, Write\n---\n\nPull discovery notes from ____.\nUse the firm ____ methodology as the structural backbone.\nOutput in the ____ template under ./templates/.\n\nAsk me to review before any external send.',
    blanks: [
      { id: 'deliverable', suggestions: ['proposal', 'engagement letter', 'statement of work'] },
      { id: 'source', suggestions: ['./notes/', 'Notion MCP', 'Drive MCP'] },
      { id: 'methodology', suggestions: ['Pyramid Principle', 'MECE', 'firm-specific'] },
      { id: 'format', suggestions: ['Word', 'Google Docs', 'PDF'] },
    ],
    prize: { id: 'command-architect', label: 'COMMAND ARCHITECT' },
  },
  conversations: {
    'clerk-bot': {
      summary:
        'Three drawers: commands, skills, hooks. Commands you summon by typing. Skills auto-invoke by description match. Hooks fire on lifecycle events (PreToolUse/PostToolUse/SessionStart/SessionEnd). Hierarchy: CLAUDE.md = advice, skill = recipe, hook = law. Defense in depth for non-negotiable rules. allowed-tools fences each skill.',
      beats: [
        {
          kind: 'say',
          text: "Mrrow. Welcome to the Registry. Three drawers in here: commands, skills, hooks. Each one bottles work your firm already did so you don't redo it.",
        },
        {
          kind: 'say',
          text: 'Drawer one: slash commands. A markdown file at `.claude/commands/<name>.md`. The body IS the prompt. Type `/name`, Claude expands it. Pipe arguments with `$ARGUMENTS`.',
        },
        {
          kind: 'say',
          text: "Drawer two: skills. Same shape, but with frontmatter and a folder of supporting files. Claude AUTO-invokes a skill when its description matches the task. Still works as `/name` for manual fire.",
        },
        {
          kind: 'choice',
          prompt:
            "You have a firm-wide playbook for drafting client proposals. You want Claude to pick it up automatically when you say 'draft a proposal for Acme.' What's the right shape?",
          options: [
            {
              id: 'skill',
              label: 'A skill with a description that matches "draft proposal"',
              correct: true,
              reaction:
                "Right. Skills auto-invoke when their description matches. You don't have to remember to type `/draft-proposal` — Claude picks it up.",
            },
            {
              id: 'command',
              label: 'A slash command — type /draft-proposal every time',
              correct: false,
              reaction:
                'Works, but you have to remember to invoke it. Skills are better when the task is something Claude should recognize on its own.',
            },
            {
              id: 'claudemd',
              label: 'A long passage in CLAUDE.md describing the playbook',
              correct: false,
              reaction:
                "CLAUDE.md is for rules every session. Stuffing a playbook in there bloats the contract. A skill is the right home.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Drawer three: hooks. Different beast. Hooks fire on EVENTS — PreToolUse (before any tool, can BLOCK), PostToolUse (after, can format/notify), SessionStart, SessionEnd. They run shell commands. They GUARANTEE the action.",
        },
        {
          kind: 'say',
          text: "Here's the hierarchy. CLAUDE.md is ADVICE — Claude usually follows. A skill is a RECIPE — Claude follows when context matches. A hook is LAW — runs every time, no AI judgment. Pick by how non-negotiable the rule is.",
        },
        {
          kind: 'choice',
          prompt:
            "Your firm has a hard rule: `pnpm lint` must run before any commit, no exceptions, no matter who's at the keyboard. Which mechanic GUARANTEES it?",
          options: [
            {
              id: 'claudemd',
              label: "Add 'always lint before commit' to CLAUDE.md",
              correct: false,
              reaction:
                "Advisory. Claude reads it, usually follows it, but 'usually' fails a firm-wide rule. Not a guarantee.",
            },
            {
              id: 'slash',
              label: 'A custom /commit slash command with the lint step',
              correct: false,
              reaction:
                "Only fires when invoked. Someone types `git commit` directly and the lint is skipped. Not a guarantee.",
            },
            {
              id: 'hook',
              label: 'A PreToolUse hook with matcher Bash(git commit *)',
              correct: true,
              reaction:
                "Yes. Hook fires on the EVENT. Doesn't matter who typed what — lint runs, or the commit is blocked. THAT'S the guarantee.",
            },
            {
              id: 'subagent',
              label: 'A subagent that reviews every commit after the fact',
              correct: false,
              reaction:
                "After the fact = too late. Bad commit is already in history. Hook BEFORE the action is the only guarantee.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Better still: defense in depth. The really critical rules — never commit secrets, for example — deserve multiple layers. PreToolUse hook (hard block) + .gitignore (git-level safety net) + a line in CLAUDE.md (Claude's reasoning context). Belt, suspenders, and a sticky note.",
        },
        {
          kind: 'say',
          text: "Now: bottle your firm's deliverables in skills. /draft-proposal, /summarize-call, /qbr-deck. One per move your firm sells. Versioned in git, evolves with your practice. New consultant onboards = they just use the skills.",
        },
        {
          kind: 'blank',
          prompt: "Draft a skill that auto-pulls discovery notes and outputs in the firm's proposal template. Fill in.",
          template:
            '# .claude/skills/draft-proposal/SKILL.md\nDraft a ____ for $ARGUMENTS.\nPull discovery notes from ____.\nOutput in the ____ template under ./templates/.\nAsk me to review before any send.',
          blanks: [
            { id: 'deliverable', suggestions: ['proposal', 'engagement letter', 'statement of work'] },
            { id: 'source', suggestions: ['./notes/', 'Notion MCP', 'Drive MCP'] },
            { id: 'format', suggestions: ['Word', 'Google Docs', 'PDF'] },
          ],
          followup:
            "That's the shape. Skill takes the brief, pulls context, lays it into your template, asks for review. Three minutes of authoring, hours of leverage per use.",
        },
        {
          kind: 'say',
          text: "Last thing: `allowed-tools` in skill frontmatter. Lists which Claude Code tools that skill can invoke — Read, Grep, Glob, Write, Bash. Restricting it = a permission boundary on that skill specifically. A reviewer skill with `allowed-tools: Read, Grep, Glob` literally cannot write files. Like fencing a GPT Action to certain endpoints.",
        },
        {
          kind: 'say',
          text: "Through the registry, into Execution. Green Goblin waits there — small, mean, hoards the commands. Doesn't bottle anything. Refuses to let YOU bottle anything. Bring proof you know advice from recipe from law. Mrrow.",
        },
      ],
    },
  },
  battle: {
    name: 'Green Goblin',
    spriteKey: 'goblin',
    maxHP: 4,
    playerHP: 5,
    phases: 1,
    introLine: "*cackles* you again?! me HOARDS the commands! me hoards the hooks! NONE FOR YOU!",
    tauntLines: [
      "*scuttles* re-type! re-type! re-type EVERY time!",
      "*snickers* CLAUDE.md? *spits* JUST advice! me ignore advice!",
      "*throws pebble* no skills! no hooks! you do it MANUAL!",
    ],
    victoryLine: "*grumbles* …fine… take them… bottle them… ship them…",
    questions: [
      {
        prompt: "Firm rule: `pnpm lint` MUST run before any commit, no exceptions. Which mechanic GUARANTEES it?",
        choices: [
          { id: 'a', label: "Add 'always lint before commit' to CLAUDE.md", correct: false },
          { id: 'b', label: 'A custom /commit slash command with the lint step', correct: false },
          { id: 'c', label: 'A PreToolUse hook with matcher Bash(git commit *)', correct: true },
          { id: 'd', label: 'A subagent that reviews every commit after the fact', correct: false },
        ],
        passFeedback: 'STRIKE! Hooks fire on EVENTS. The lint runs or the commit is blocked. THAT is a guarantee.',
        failFeedback: 'MISS! Advisory rules can be skipped. Slash commands only fire when invoked. Need certainty? Hook.',
      },
      {
        prompt: "Where does a custom slash command live?",
        choices: [
          { id: 'a', label: 'In CLAUDE.md as a rule', correct: false },
          { id: 'b', label: 'In ~/.claude/skills/ only', correct: false },
          { id: 'c', label: 'In `.claude/commands/<name>.md` — the body IS the prompt', correct: true },
          { id: 'd', label: 'Hardcoded in the Claude binary', correct: false },
        ],
        passFeedback: 'STRIKE! Markdown file in `.claude/commands/`. Versioned in git. Pipe args with $ARGUMENTS.',
        failFeedback: 'MISS! Slash commands are markdown files in `.claude/commands/`. The body is the prompt.',
      },
      {
        prompt: "You want Claude to auto-pick up 'draft a proposal for Acme' WITHOUT typing a slash command. Best shape?",
        choices: [
          { id: 'a', label: 'A skill with a description matching "draft proposal"', correct: true },
          { id: 'b', label: 'A slash command — type /draft-proposal every time', correct: false },
          { id: 'c', label: 'A long passage in CLAUDE.md', correct: false },
          { id: 'd', label: 'A hook that watches your prompts', correct: false },
        ],
        passFeedback: 'STRIKE! Skills auto-invoke when their description matches. No incantation needed.',
        failFeedback: "MISS! Skills auto-invoke; commands need typing. You wanted automatic — that's skills.",
      },
      {
        prompt: "In a skill's frontmatter, `allowed-tools: Read, Grep, Glob` does what?",
        choices: [
          { id: 'a', label: 'Lists shell commands the skill can run', correct: false },
          { id: 'b', label: "Limits which Claude Code tools that skill can invoke — a permission boundary on that skill", correct: true },
          { id: 'c', label: 'Installs those tools if they\'re missing', correct: false },
          { id: 'd', label: 'Lists tools the skill recommends you use', correct: false },
        ],
        passFeedback: 'STRIKE! Read/Grep/Glob = view, search, match. With those three only, the skill literally cannot write files or run shell commands.',
        failFeedback: 'MISS! It\'s a permission boundary. Restricting tools = restricting what the skill can do.',
      },
      {
        prompt: "Your team must NEVER commit .env files or API keys to the repo. What gives you the strongest protection?",
        choices: [
          { id: 'a', label: "Add 'NEVER commit .env' to CLAUDE.md and trust Claude", correct: false },
          { id: 'b', label: 'A skill that checks for secrets before committing', correct: false },
          { id: 'c', label: 'Defense in depth: PreToolUse hook blocking writes to .env*, .gitignore for the files, and a CLAUDE.md reminder', correct: true },
          { id: 'd', label: 'A subagent that scans commits after the fact', correct: false },
        ],
        passFeedback: 'STRIKE! Defense in depth. The hook is hard enforcement. The .gitignore is the git-level net. CLAUDE.md gives Claude the reasoning. No single layer is enough.',
        failFeedback: "MISS! Advice can be skipped. Skills only fire when invoked. Post-hoc scans are too late. Multiple layers — that's the model.",
      },
    ],
  },
};
