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
      text: "**Slash Commands — Bottle a Prompt, Run It Forever**\n\n**The idea in one line**\n\nA slash command is a saved prompt you trigger by typing `/name`. Under the hood it's just a markdown file at `.claude/commands/<name>.md`, and the body of that file *is* the prompt. When you type the command, Claude expands the file's contents into the conversation exactly as if you'd typed the whole thing yourself.\n\n**Passing in arguments**\n\nCommands aren't frozen — they take input. The `$ARGUMENTS` placeholder catches whatever you type after the command name. A command called `review-pr` whose body reads \"Review the PR at $ARGUMENTS for our team style and security checks\" becomes `/review-pr #142` at the prompt, and Claude fills in the rest.\n\n**Why consultants love them**\n\nEvery consultant types the same few paragraphs to kick off the same few tasks. A slash command turns that repeated paragraph into three keystrokes, and because it's a file checked into git, the whole team runs the identical prompt. Three minutes to author, hours of leverage every time it's used.\n\n> Takeaway: If you keep typing the same instruction to start the same work, that's a slash command. Write it once, share it through git, run it forever.",
    },
    {
      id: 'index',
      text: "**Skills — Commands That Wake Themselves Up**\n\n**Same shape, more power**\n\nA skill lives at `.claude/skills/<name>/SKILL.md`. It looks a lot like a slash command, but with two upgrades: a block of YAML configuration at the top (the frontmatter) and a folder of supporting files alongside it. Slash commands and skills have largely merged, and skills are the recommended path because they can do things commands can't.\n\n**The magic is the description**\n\nThe frontmatter has a `description` field, and that's the key difference. When Claude reads a task that matches a skill's description, it invokes the skill automatically — no slash required. Write a skill described as \"draft a client proposal,\" and \"draft a proposal for Acme\" wakes it up on its own. The skill activates because the work matches, not because you remembered to call it.\n\n**What skills can carry**\n\nA skill can bundle templates, example files, and reference docs next to it, pulled in with an `@filename` mention in the body. It can even spawn sub-agents. A plain slash command can't do any of that. When you're unsure which to build, build a skill.\n\n> Takeaway: Slash commands fire when you type them; skills fire when the task matches their description. The auto-trigger is what makes skills the stronger default.",
    },
    {
      id: 'card-a',
      text: "**One Skill per Move Your Firm Sells**\n\n**Bottle the deliverables, not just the chores**\n\nThe obvious use for skills is small chores, but the real leverage is bottling your firm's actual deliverables. A skill for the proposal microsite. One for turning a discovery call into structured notes. One for the quarterly business review deck. Each captures how your best people do that specific piece of work.\n\n**Why this compounds**\n\nEvery skill is versioned in git and evolves as your practice does. Improve the proposal skill once and every consultant's next proposal gets better. The firm's know-how stops living only in senior people's heads and starts living in tools the whole team invokes the same way.\n\n**The onboarding payoff**\n\nA new consultant doesn't learn your firm's moves from scratch by shadowing for months. They use the skills from day one and produce work shaped like the firm's standard, because the standard is encoded in the skill. The skill library becomes institutional memory you can actually run.\n\n> Takeaway: Build one skill per repeatable thing your firm sells. The library turns individual expertise into shared, runnable capability.",
    },
    {
      id: 'hierarchy',
      text: "**Advice, Recipe, Law — Which Mechanism for Which Rule**\n\n**Three ways to say \"follow this\"**\n\nCLAUDE.md, skills, and hooks all shape Claude's behavior, but they enforce at very different strengths, and picking the wrong one is the most common setup mistake. The trick is matching the mechanism to how non-negotiable the rule actually is.\n\n**The three strengths**\n\nCLAUDE.md is ADVICE. Claude reads it every session and usually follows it, but it's guidance and it can be missed. A skill is a RECIPE. Claude follows it when the task matches the description and the recipe applies — structured, but still AI-judged. A hook is LAW. It runs every single time its event fires, with no AI judgment involved at all. It cannot be talked out of it.\n\n**How to choose**\n\nA preference or a default goes in CLAUDE.md. A repeatable procedure goes in a skill. An inviolable guarantee — the thing that must happen every time no matter what — goes in a hook. Match the tool to the stakes and your setup stops fighting you.\n\n> Takeaway: Advice for preferences, recipe for procedures, law for guarantees. The strength of the rule decides the mechanism.",
    },
    {
      id: 'hooks-intro',
      text: "**Hooks — Automation You Already Understand**\n\n**You've seen this pattern before**\n\nA hook is a script that runs automatically when a specific event happens, and you already know the pattern from elsewhere. A git pre-commit hook that lints before every commit. A Zapier rule that posts to Slack when a row hits a spreadsheet. An iOS shortcut that starts your playlist when you reach the gym. Event happens, script runs, no thinking required.\n\n**The lifecycle events**\n\nClaude Code hooks fire on session events. PreToolUse fires *before* Claude uses any tool, and crucially it can block that tool call entirely. PostToolUse fires *after*, ideal for formatters and linters. SessionStart fires when Claude opens, good for pulling the latest from git. SessionEnd fires when it closes, good for posting a summary.\n\n**Matchers keep them precise**\n\nA matcher targets exactly which cases a hook catches. `Bash(git commit *)` fires only on commits. `Write(*.ts)` fires only on TypeScript writes. `Write(.env*)` catches every flavor of env file. Specific matchers mean hooks fire only when they should and stay out of the way otherwise.\n\n> Takeaway: Hooks are deterministic event-driven automation, the same pattern as git hooks or Zapier. PreToolUse can block; PostToolUse can clean up.",
    },
    {
      id: 'card-b',
      text: "**Format-on-Save, the Deterministic Edition**\n\n**A concrete, everyday hook**\n\nThe single most popular hook is automatic formatting. A PostToolUse hook with the matcher `Write(*.ts)` runs Prettier and ESLint with the fix flag on every TypeScript file Claude touches. Claude writes the file, the hook immediately reformats it to spec, and you never think about formatting again.\n\n**Why a hook beats a reminder**\n\nYou could put \"always format your code\" in CLAUDE.md, but that's advice Claude might skip. The hook removes judgment from the equation entirely. There's no \"Claude usually formats\" and no drift between teammates, because the formatter runs the same way on every write regardless of who's driving.\n\n**It generalizes to any language**\n\nThe same matcher pattern works anywhere you have a command-line formatter. `Write(*.py)` with ruff. `Write(*.go)` with gofmt. Anything you can run from a terminal can be wired to a write event. One small config block buys consistent formatting forever.\n\n> Takeaway: A PostToolUse formatter hook makes clean formatting automatic and identical across the team — no reminders, no drift.",
    },
    {
      id: 'defense-in-depth',
      text: "**Defense in Depth — Never Trust One Control**\n\n**Some rules are too important for a single layer**\n\nThe principle here is borrowed straight from security engineering: for a rule that absolutely must hold, you don't pick the one best mechanism, you stack several so a failure in any one is caught by the next. Keeping secrets like `.env` files and API keys out of the repo is the classic example.\n\n**Three layers, stacked**\n\nLayer one is a PreToolUse hook with the matcher `Write(.env*)` set to block — hard, deterministic enforcement that stops the write before it happens. Layer two is `.gitignore` listing those files — a git-level net in case something slips past. Layer three is a line in CLAUDE.md explaining why those files are off-limits, so Claude carries the reasoning and doesn't fight the rule.\n\n**Why all three**\n\nNo single layer is sufficient. The hook can be misconfigured, the gitignore can miss a filename, the CLAUDE.md note can be skimmed. Together they cover each other's blind spots. This is the same instinct that keeps a single leaked credential from becoming a breach.\n\n> Takeaway: For the rules that really matter, stack enforcement: a blocking hook, a gitignore net, and the reasoning in CLAUDE.md. Never rely on one control.",
    },
    {
      id: 'card-c',
      text: "**allowed-tools — Fencing a Skill to Exactly What It Needs**\n\n**A permission boundary on the skill itself**\n\nIn a skill's frontmatter, the `allowed-tools` field limits which Claude Code tools that skill is allowed to use. Write `allowed-tools: Read, Grep, Glob` and the skill can do those three things and nothing else. Read views file contents, Grep searches for text patterns, Glob finds files matching a wildcard.\n\n**Why fence it**\n\nWith only those three tools, the skill literally cannot write files or run shell commands, no matter what its prompt says. That's a hard boundary on the skill, separate from and stricter than the session's permission mode. A review or analysis skill that should only ever *look* at code gets fenced so it can never accidentally change it.\n\n**The familiar parallel**\n\nThis is the same idea as restricting a GPT Action to only certain API endpoints. You give each skill exactly the reach its job requires and not one tool more. Least privilege, applied per skill.\n\n> Takeaway: `allowed-tools` caps what a skill can do, independent of session mode. Fence each skill to the minimum it needs so it can't overstep.",
    },
  ],
  practice: {
    id: 'command-architect-practice',
    template:
      "# .claude/skills/draft-proposal/SKILL.md\n---\nname: draft-proposal\ndescription: Draft a ____ for $ARGUMENTS using the firm's discovery notes.\nallowed-tools: ____\n---\n\nPull discovery notes from ____.\nUse the firm ____ methodology as the structural backbone.\nOutput into the template under ./templates/.\n\nAsk me to review before anything leaves the building.",
    blanks: [
      { id: 'deliverable', suggestions: ['proposal', 'engagement letter', 'statement of work'] },
      { id: 'allowed-tools', suggestions: ['Read, Glob, Write', 'Read, Grep, Glob', 'Read, Write'] },
      { id: 'source', suggestions: ['./notes/', 'a connected notes tool', 'the discovery folder'] },
      { id: 'methodology', suggestions: ['Pyramid Principle', 'MECE', 'firm-specific'] },
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
        prompt: "Firm rule: `pnpm lint` MUST run before any commit, no exceptions. Which mechanism actually GUARANTEES it?",
        choices: [
          { id: 'a', label: "Add \"always lint before commit\" to CLAUDE.md", correct: false },
          { id: 'b', label: 'A custom `/commit` slash command that includes the lint step', correct: false },
          { id: 'c', label: 'A PreToolUse hook with matcher `Bash(git commit *)`', correct: true },
          { id: 'd', label: 'A subagent that reviews each commit after the fact', correct: false },
        ],
        passFeedback: "HIT! Hooks are law. The lint runs or the commit is blocked, every time, no judgment. That's a guarantee.",
        failFeedback: 'MISS! Advice can be skipped and a slash command only fires when you remember it. A non-negotiable rule belongs in a hook.',
      },
      {
        prompt: "You have three rules: a gentle preference for British spelling, a detailed proposal-writing procedure, and an absolute ban on writing to `.env` files. Best home for each, in order?",
        choices: [
          { id: 'a', label: 'Hook, hook, hook', correct: false },
          { id: 'b', label: 'CLAUDE.md (advice), skill (recipe), hook (law)', correct: true },
          { id: 'c', label: 'CLAUDE.md, CLAUDE.md, skill', correct: false },
          { id: 'd', label: 'Skill, hook, CLAUDE.md', correct: false },
        ],
        passFeedback: 'HIT! Match the mechanism to the stakes. Preference is advice, procedure is a recipe, inviolable rule is law.',
        failFeedback: 'MISS! Advice for the preference, a skill for the procedure, a blocking hook for the ban. Strength of rule picks the tool.',
      },
      {
        prompt: "You want Claude to pick up \"draft a proposal for Acme\" automatically, WITHOUT anyone typing a slash command. Best shape?",
        choices: [
          { id: 'a', label: 'A skill whose description matches proposal-drafting work', correct: true },
          { id: 'b', label: 'A slash command you type `/draft-proposal` every time', correct: false },
          { id: 'c', label: 'A long passage buried in CLAUDE.md', correct: false },
          { id: 'd', label: 'A hook that watches your prompts for the word "proposal"', correct: false },
        ],
        passFeedback: 'HIT! Skills auto-invoke when their description matches the task. No incantation needed.',
        failFeedback: 'MISS! Commands need typing; you asked for automatic. The auto-trigger is exactly what skills give you.',
      },
      {
        prompt: "A skill's frontmatter says `allowed-tools: Read, Grep, Glob`. What can that skill NOT do?",
        choices: [
          { id: 'a', label: "It can't read more than three files", correct: false },
          { id: 'b', label: "It can't write files or run shell commands — those tools aren't in its list", correct: true },
          { id: 'c', label: "It can't be invoked manually, only automatically", correct: false },
          { id: 'd', label: 'Nothing is restricted; the field is just documentation', correct: false },
        ],
        passFeedback: "HIT! Read, Grep, Glob means look, search, match. With only those, the skill physically can't write or run commands. A hard boundary on the skill.",
        failFeedback: '`MISS! allowed-tools` is a permission fence. Leave Write and Bash off the list and the skill simply cannot do them.',
      },
      {
        prompt: "You want to make sure NO ONE — Claude or human — ever commits a `.env` file. Which approach is strongest?",
        choices: [
          { id: 'a', label: 'A strongly worded rule in CLAUDE.md', correct: false },
          { id: 'b', label: 'Just a `.gitignore` entry', correct: false },
          { id: 'c', label: 'A blocking PreToolUse hook on `Write(.env*)`, PLUS `.gitignore`, PLUS a CLAUDE.md note — layered', correct: true },
          { id: 'd', label: 'A subagent that scans commits for secrets afterward', correct: false },
        ],
        passFeedback: 'HIT! Defense in depth. The hook hard-blocks, gitignore is the net, CLAUDE.md carries the reasoning. No single control is trusted alone.',
        failFeedback: "MISS! Any one layer can fail. Stack the hook, the gitignore, and the reminder so each covers the others' blind spots.",
      },
      {
        prompt: "Where does a custom slash command actually live, and what's in the file?",
        choices: [
          { id: 'a', label: 'A rule inside CLAUDE.md', correct: false },
          { id: 'b', label: 'Hardcoded into the Claude Code binary', correct: false },
          { id: 'c', label: 'A markdown file at `.claude/commands/<name>.md` — the body of the file IS the prompt', correct: true },
          { id: 'd', label: 'A JSON entry in `.gitignore`', correct: false },
        ],
        passFeedback: "HIT! Markdown file in `.claude/commands/`, the body is the prompt, args pipe in through `$ARGUMENTS`, and it's versioned in git.",
        failFeedback: "MISS! Slash commands are markdown files in `.claude/commands/`. Open the file and you're looking at the prompt itself.",
      },
    ],
  },
};
