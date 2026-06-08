import type { LessonContent } from './types';

export const claudemdContent: LessonContent = {
  roomId: 'claudemd',
  intro: 'The Archives. Talk to Archivist Owl — she runs the contracts your firm sets up before every Claude session. Lore in the Stacks adds detail. The Vault holds the boss battle.',
  prompt: "Your firm's repos all use pnpm and vitest. You start a new Claude session, ask for a quick code change, and Claude wastes three turns running `npm test`, failing, and looking around. What's the single highest-ROI fix?",
  choices: [
    { id: 'a', label: 'Tell Claude in the prompt every time', correct: false },
    { id: 'b', label: 'Add `Run tests with: pnpm vitest` to CLAUDE.md and check it in', correct: true },
    { id: 'c', label: "Switch to npm to match Claude's defaults", correct: false },
    { id: 'd', label: 'Wait for Claude to learn it automatically via auto-memory', correct: false },
  ],
  passFeedback: '[PASS] CLAUDE.md = one hour writing, countless hours saved. A behavioral contract Claude reads every session.',
  failFeedback: "[FAIL] CLAUDE.md is loaded every session — bake the things Claude can't infer from the code.",
  lore: [
    {
      id: 'old-note',
      text: "**CLAUDE.md — The Contract Claude Reads Every Session**\n\n**What it is**\n\nCLAUDE.md is a single markdown file that lives in your project's root folder, right next to the README. Before Claude does anything in a session, it reads this file. Think of it as the briefing document you hand an agent at the start of every mission, the standing context that means you don't re-explain the project each time you sit down.\n\n**What goes in it**\n\nThe things a capable new consultant would need on day one and couldn't guess from the code alone: what the project is, how it's built, how to run and test it, and the firm-specific conventions that matter. Build commands, test commands, naming rules, the deploy story, things to avoid. If Claude keeps making the same wrong assumption, the fix is almost always a line in here.\n\n**Keep it tight**\n\nThis file is not documentation and it's not a wiki. Every line competes for Claude's attention, and a bloated CLAUDE.md gets skimmed, with the important rules lost in the noise. Aim for roughly fifty to a hundred and fifty lines. Production teams often run their root file even leaner. If a line doesn't change what Claude does, cut it.\n\n> Takeaway: CLAUDE.md is the behavioral contract of the project. Capture what Claude can't infer, keep it short enough that every line earns its place.",
    },
    {
      id: 'formula',
      text: "**The WHY / WHAT / HOW Formula — How to Structure a CLAUDE.md That Works**\n\n**Three questions every good file answers**\n\nA strong CLAUDE.md isn't a random pile of rules. It answers three questions in order, and the same shape works for any project your firm runs.\n\n**WHY: the context behind the decisions**\n\nWhat is this project, who is it for, and what problem does it solve? This is the part people skip, and it's the most valuable. When Claude hits an ambiguous choice mid-build, the WHY is what lets it decide the way you would. \"This is an incident-response dashboard for ops teams, speed and clarity matter more than polish\" answers a dozen unasked questions.\n\n**WHAT: where everything lives**\n\nThe architecture, the stack, the key directories and the important files. Not every file, just the map a newcomer needs to find their way around and understand how the pieces connect.\n\n**HOW: the commands and conventions**\n\nHow Claude builds it, tests it, and lints it, plus the conventions to follow and the patterns to avoid. Crucially, this is how Claude verifies its own work — give it the test command and it can check itself instead of handing you something broken.\n\n> Takeaway: WHY, WHAT, HOW. The same three-part shape works for every project. Learn it once, write it everywhere.",
    },
    {
      id: 'log',
      text: "**Run /init First — Then Earn Your Keep by Editing**\n\n**What /init does**\n\nAt the start of any project, run `/init`. Claude scans the repository, the languages, the build files, the conventions it can detect, and drafts a starter CLAUDE.md for you. It's a genuine head start, a blank-page problem solved in about a minute.\n\n**Don't ship the raw output**\n\nHere's the part people miss: the draft is a first draft, not the contract. Half the value of CLAUDE.md is in the editing. Cut everything Claude could already figure out by reading the code — that's just noise restating the obvious. Then add the things it cannot infer: the firm-specific conventions, the deploy process, the way your team writes commit messages, the client constraints.\n\n**The test for every line**\n\nFor each line in the draft, ask: would removing this cause Claude to make a specific mistake? If yes, keep it. If no, it's filler. A pruned, deliberate CLAUDE.md beats a long auto-generated one every time.\n\n> Takeaway: `/init` writes the first draft; you write the contract. The editing is where the value is.",
    },
    {
      id: 'fragment-a',
      text: "**Project vs User vs Managed — The Loading Hierarchy**\n\n**More than one CLAUDE.md can apply at once**\n\nCLAUDE.md isn't a single file, it's a stack of layers that load together, each scoped to a different reach. Knowing which layer to write in is the difference between a rule that helps just you and one that helps the whole team.\n\n**The layers, broadest to most specific**\n\nManaged enterprise policy loads first, set by IT, and cannot be overridden. Then your personal global file at `~/.claude/CLAUDE.md`, which follows you across every project on your machine. Then any CLAUDE.md in parent directories, useful in a monorepo. Then the project root file, the main one, shared with the whole team through git. Then files in subdirectories, the most specific of all.\n\n**Most-specific wins**\n\nWhen two layers say different things, the more specific one takes priority: a subdirectory rule beats the project root, which beats your user-global, which beats nothing. Managed policy is the only layer nobody can override. The practical warning: don't write contradictions across layers. If two files genuinely conflict, Claude may pick one arbitrarily, and you've created a coin-flip instead of a rule.\n\n> Takeaway: Personal preferences go in your user-global file; team rules go in the project root; the closest file to the code wins.",
    },
    {
      id: 'local-file',
      text: "**CLAUDE.local.md — Your Rules, Not the Team's**\n\n**The problem it solves**\n\nSometimes you want a rule that applies to you alone and shouldn't burden your teammates. \"Always run lint before you suggest a commit\" might be your personal discipline, but forcing it into the shared project contract makes it everyone's rule whether they want it or not.\n\n**How it works**\n\n`CLAUDE.local.md` sits in the project but is automatically kept out of git, so it never gets shared or committed. It's the place for your private local settings: a personal workflow preference, a local sandbox URL, testing notes, anything specific to your machine or your habits that the team doesn't need.\n\n**The three-way choice**\n\nSo there are three homes for a rule, and picking right matters. Team rule that belongs to the project — the shared root CLAUDE.md. Personal preference across all your projects — your user-global file. Personal preference for this one project only — `CLAUDE.local.md`. Your discipline shouldn't become your teammates' burden.\n\n> Takeaway: If a rule is yours alone and tied to one project, `CLAUDE.local.md` keeps it out of the team's way and out of git.",
    },
    {
      id: 'fragment-b',
      text: "**/compact vs /clear — Managing the Context Window**\n\n**Why the window matters**\n\nClaude holds the whole conversation in a limited working memory called the context window. As a session runs long, that memory fills, and a too-full window makes Claude slower and sloppier — it starts losing track of earlier decisions and repeating itself. Two commands keep it healthy, and they do opposite things.\n\n**`/compact`: keep going, lighter**\n\n`/compact` compresses the conversation. It summarizes the older turns into a tight memory and frees up room so you can keep working without losing the thread of what you've decided. Reach for it when you're still deep in the same piece of work and just running low on space. You can even steer it, telling it what to be sure to preserve.\n\n**`/clear`: wipe and start fresh**\n\n`/clear` wipes the conversation entirely. Your file edits stay safely on disk, but the chat history is gone. Use it when you finish one task and move to an unrelated one — a clean slate so the last job's context doesn't bleed into the next.\n\n**Pick by intent**\n\nSame engagement, just out of room — compact. Switching to a different engagement entirely — clear. The rule of thumb: one context window for one task.\n\n> Takeaway: `/compact` preserves and summarizes so you can continue; `/clear` wipes so you can start clean. Choose by whether you're continuing or switching.",
    },
    {
      id: 'auto-memory-warn',
      text: "**Auto-Memory — Useful, But Trust It Like a New Hire's Notes**\n\n**What it is**\n\nSeparately from CLAUDE.md, which you write, Claude keeps its own notes between sessions — this is auto-memory. It jots down things it figured out: naming patterns, dependencies it mapped, conventions it inferred from your repo. The goal is continuity, so it doesn't relearn the same project from scratch every time.\n\n**The catch: quality varies**\n\nTreat these notes exactly like the notes a new hire took in their first week. Some are gold. Others are misremembered, half-right, or simply wrong — and a wrong note is worse than no note, because Claude will confidently trust it next session and act on it. Auto-memory is a convenience, not a source of truth.\n\n**Review, correct, prune**\n\nRun `/memory` to see what auto-memory has captured. Read it, fix the inaccuracies, and delete the noise so it can't mislead the next session. When a note is genuinely good and the whole team should rely on it, promote it into CLAUDE.md where it becomes part of the shared contract instead of one person's private memory.\n\n> Takeaway: Auto-memory builds continuity for free, but curate it. Review with `/memory`, fix what's wrong, and promote the keepers into CLAUDE.md.",
    },
    {
      id: 'fragment-c',
      text: "**The Difference Between the Two Memories**\n\n**Two systems, often confused**\n\nLevel 2 has two ways of remembering across sessions, and mixing them up leads to messy setups. CLAUDE.md is the one you author deliberately. Auto-memory is the one Claude writes itself. They serve different jobs.\n\n**CLAUDE.md describes the project**\n\nStack, architecture, commands, conventions — the durable facts about how this project works. It's stable, intentional, shared with the team through git, and it's the right place for anything you want to be true every session for everyone.\n\n**Auto-memory describes the working relationship**\n\nThe evolving, in-the-moment stuff: preferences Claude picked up, decisions made along the way, things specific to a point in time. It's personal and it drifts. The `/memory` command is also where you can see which CLAUDE.md files actually loaded, handy for confirming the hierarchy resolved the way you expected.\n\n> Takeaway: Write the durable project facts into CLAUDE.md; let auto-memory hold the evolving relationship, and curate it. Don't confuse the deliberate contract with the running notes.",
    },
  ],
  practice: {
    id: 'contract-auditor-practice',
    template:
      'Review my CLAUDE.md at ./CLAUDE.md against the WHY / WHAT / HOW structure.\n1. Cut anything ____ could already figure out from reading the code.\n2. For each remaining rule, ask: would removing this cause ____? If not, delete it.\n3. Tell me which of WHY, WHAT, or HOW is ____, and draft the missing piece.\n4. Flag any line that reads more like ____ than a rule Claude should obey.',
    blanks: [
      // Lore ('log' book): "Cut everything Claude could already figure out by reading the code."
      // The contract is for Claude specifically; "a competent reader" / "any new teammate" generalize away from the canonical lesson.
      { id: 'reader', suggestions: ['Claude', 'a competent reader', 'any new teammate'], correctIndex: 0 },
      // Lore ('log' book): "would removing this cause Claude to make a specific mistake? If yes, keep it."
      // Verbatim test phrasing — the other two are weaker symptoms, not the canonical test.
      { id: 'failure-mode', suggestions: ['Claude to make a specific mistake', 'a wasted turn', 'a wrong default'], correctIndex: 0 },
      // Judgment call: any real CLAUDE.md might have a section that's thinnest, missing entirely, or overstuffed —
      // the lesson asks the auditor to NAME whichever it is. No single correct chip here. Leave ungraded.
      { id: 'gap', suggestions: ['thinnest', 'missing entirely', 'overstuffed'] },
      // Lore ('old-note' book): "This file is not documentation and it's not a wiki."
      // 'documentation' is the canonical anti-pattern in the lore; tutorial/changelog are weaker distractors.
      { id: 'genre', suggestions: ['documentation', 'a tutorial', 'a changelog'], correctIndex: 0 },
    ],
    prize: { id: 'contract-auditor', label: 'CONTRACT AUDITOR' },
  },
  conversations: {
    'archivist-bot': {
      summary:
        'CLAUDE.md is a behavioral contract Claude reads every session. Three-part formula: WHY / WHAT / HOW. Loading hierarchy: most-specific wins. Three homes (~/global, ./team, ./local). /compact and /clear manage context. Auto-memory needs review.',
      beats: [
        {
          kind: 'say',
          text: "Hoo. The Archives. Every engagement lives or dies by the contract in here. Sit. We need to talk about CLAUDE.md.",
        },
        {
          kind: 'say',
          text: "CLAUDE.md is the contract Claude reads before every task. Build commands. Test commands. Naming. The non-obvious things a new consultant joining the project would need on day one.",
        },
        {
          kind: 'say',
          text: "Three-part formula. WHY: project purpose, audience, priorities. WHAT: architecture, stack, key files. HOW: build, test, lint commands and code style. Same shape you brief me in.",
        },
        {
          kind: 'choice',
          prompt:
            "Your firm uses pnpm and vitest. New session — Claude tries `npm test`, fails, looks around, tries again. What's the highest-ROI fix?",
          options: [
            {
              id: 'prompt-it',
              label: 'Tell Claude in every prompt',
              correct: false,
              reaction:
                "Then you tie the knot every conversation. Once a session, at least. Probably more. Tedious and easy to forget.",
            },
            {
              id: 'claudemd',
              label: 'Add `Run tests with: pnpm vitest` to CLAUDE.md, check it in',
              correct: true,
              reaction:
                "Exactly. One line in the contract. Every teammate, every session — Claude obeys. One hour writing CLAUDE.md saves countless hours of re-explaining.",
            },
            {
              id: 'switch-npm',
              label: "Switch to npm to match Claude's defaults",
              correct: false,
              reaction:
                "Bend the tool to the firm, not the firm to the tool. The whole point of CLAUDE.md is to encode YOUR conventions.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Run /init at the start of any project. Claude scans the repo and drafts a CLAUDE.md you can prune. Don't accept it blindly — half the value is in the editing.",
        },
        {
          kind: 'say',
          text: "Loading hierarchy: managed-policy first, then ~/.claude/CLAUDE.md, then parent directories, then project root, then subdirectories, then .claude/rules/*.md. Most specific wins. Don't write contradictions.",
        },
        {
          kind: 'choice',
          prompt:
            "You want a personal rule 'always run lint before suggesting a commit' but you don't want it imposed on teammates. Where does it go?",
          options: [
            {
              id: 'team',
              label: './CLAUDE.md',
              correct: false,
              reaction:
                "That's the team contract — every teammate sees it. Your discipline isn't their burden. Wrong file.",
            },
            {
              id: 'local',
              label: './CLAUDE.local.md',
              correct: true,
              reaction:
                "Right. Gitignored, just you. Teammates do their own thing. Specific overrides general — that's the hierarchy at work.",
            },
            {
              id: 'global',
              label: '~/.claude/CLAUDE.md',
              correct: false,
              reaction:
                "That's broader — every project you work on. Use it for habits you keep everywhere. For one project, .local.md is the right scope.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Context controls. /compact when the window fills but you want to keep going. /clear between unrelated tasks. /rewind to a checkpoint if Claude wandered. /btw for one-off questions that shouldn't pollute the history.",
        },
        {
          kind: 'blank',
          prompt: "You're three hours into a feature, context is full, but you're close to done. What command?",
          template: '/____ — keeps the conversation, summarizes the old turns.',
          blanks: [{ id: 'command', suggestions: ['compact', 'clear', 'rewind', 'btw'] }],
          followup:
            "Compact. Summarizes the old turns into compressed memory, frees the window, you keep going. /clear would nuke everything. Different tool, different moment.",
        },
        {
          kind: 'say',
          text: "Last thing: auto-memory. Claude writes itself notes between sessions. Quality varies. Treat it like a new hire's notes — review with /memory, correct the inaccuracies, prune noise. A wrong auto-memory line is worse than no line.",
        },
        {
          kind: 'say',
          text: "Through the north door — the Stacks. Bonus lore in there. The Vault past that holds The Memory Warlock, an old wraith who remembers nothing and casts memory-rot. Hoo. Bring the key when you take him down.",
        },
      ],
    },
  },
  battle: {
    name: 'The Memory Warlock',
    spriteKey: 'warlock',
    maxHP: 3,
    playerHP: 5,
    phases: 1,
    introLine: "…another one? remind me… who… who are you again? *the warlock's staff trembles* no matter. i shall forget you too.",
    tauntLines: [
      "*incants* who… who are you again?",
      "*staff cracks* memory-rot upon you!",
      "context-vapor! be gone!",
    ],
    victoryLine: "…ah. i remember now. you are the one who keeps the contract. … *crumbles to dust*",
    questions: [
      {
        prompt: "Your firm uses pnpm + vitest. Claude keeps wasting turns trying `npm test`. Highest-ROI fix?",
        choices: [
          { id: 'a', label: 'Tell Claude in every single prompt', correct: false },
          { id: 'b', label: 'Add `Run tests with: pnpm vitest` to CLAUDE.md and check it in', correct: true },
          { id: 'c', label: "Switch the firm to npm to match Claude's defaults", correct: false },
          { id: 'd', label: 'Wait for auto-memory to figure it out', correct: false },
        ],
        passFeedback: 'HIT! One line in the contract. Every session, every teammate, Claude reads it and obeys.',
        failFeedback: "MISS! CLAUDE.md is read every session. Bake in what Claude can't infer instead of repeating yourself.",
      },
      {
        prompt: "A teammate's CLAUDE.md lists the stack and every build command but never says what the project is for. What's most likely to go wrong?",
        choices: [
          { id: 'a', label: 'Nothing — commands are all Claude really needs', correct: false },
          { id: 'b', label: "Claude won't be able to run the tests", correct: false },
          { id: 'c', label: 'On ambiguous choices Claude guesses badly, because it has the WHAT and HOW but no WHY to decide with', correct: true },
          { id: 'd', label: 'The file will be too short to load', correct: false },
        ],
        passFeedback: 'HIT! WHY is the decision-making context. Without it, Claude has the map and the tools but no sense of what matters.',
        failFeedback: "MISS! WHAT and HOW aren't enough. WHY is what lets Claude make the dozen small judgment calls a build requires.",
      },
      {
        prompt: "In the CLAUDE.md loading hierarchy, which file wins when two of them conflict?",
        choices: [
          { id: 'a', label: '`~/.claude/CLAUDE.md`, your global preferences', correct: false },
          { id: 'b', label: 'Whichever was loaded first', correct: false },
          { id: 'c', label: 'The most-specific file — subdirectory beats project root beats parent beats user-global', correct: true },
          { id: 'd', label: 'Claude picks randomly every session on purpose', correct: false },
        ],
        passFeedback: 'HIT! Most-specific wins, and managed enterprise policy is the only layer nobody can override.',
        failFeedback: "MISS! The hierarchy resolves by specificity — the file closest to the code wins. Better still: don't write contradictions at all.",
      },
      {
        prompt: "You want 'always run lint before suggesting a commit' for yourself only on this one project, not for your teammates. Where does it go?",
        choices: [
          { id: 'a', label: '`./CLAUDE.md`, the team contract', correct: false },
          { id: 'b', label: '`./CLAUDE.local.md`, gitignored, just you', correct: true },
          { id: 'c', label: '`~/.claude/CLAUDE.md`, your global preferences', correct: false },
          { id: 'd', label: 'A footnote in the README', correct: false },
        ],
        passFeedback: "HIT! `.local.md` stays out of git. Your rule, this project, nobody else's burden.",
        failFeedback: "MISS! The shared root file makes it everyone's rule. User-global applies to all your projects. You wanted this project, you alone — that's `.local.md`.",
      },
      {
        prompt: "Three hours into a feature, the context window is nearly full, but you're close to done and want to keep the thread. Which command?",
        choices: [
          { id: 'a', label: '`/clear` — start fresh', correct: false },
          { id: 'b', label: '`/compact` — summarize the old turns and keep going', correct: true },
          { id: 'c', label: '`/init` — regenerate CLAUDE.md', correct: false },
          { id: 'd', label: 'Just keep going and hope it holds', correct: false },
        ],
        passFeedback: 'HIT! `/compact` frees the window without nuking the conversation. Same task, just out of room.',
        failFeedback: "MISS! `/clear` would wipe the thread you're trying to keep. `/compact` preserves and summarizes. Different tools for different moments.",
      },
      {
        prompt: "Claude's auto-memory has written itself some notes between sessions. What's the right way to treat them?",
        choices: [
          { id: 'a', label: 'Trust everything — Claude saved it for a reason', correct: false },
          { id: 'b', label: 'Run `/memory`, review the notes, correct what\'s wrong, prune the noise, promote the keepers to CLAUDE.md', correct: true },
          { id: 'c', label: 'Delete all of it after every session to stay clean', correct: false },
          { id: 'd', label: 'Disable it — CLAUDE.md is enough on its own', correct: false },
        ],
        passFeedback: "HIT! Treat it like a new hire's first-week notes. Curate it, and a wrong line is worse than no line.",
        failFeedback: 'MISS! Quality varies, so review with `/memory`. The good notes get promoted into the shared contract; the bad ones get cut before they mislead next session.',
      },
    ],
  },
};
