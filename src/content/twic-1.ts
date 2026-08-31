import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — the `--restricted` launch flag. Claude Code adds a flag
 * you pass at startup that removes the built-in command and code tools along
 * with `WebFetch`, leaving a session that can read and reason but cannot run
 * shell commands, edit or write files, or pull pages off the open web.
 * Source (Claude Code CHANGELOG 2.1.248):
 *   - "Added `--restricted` flag removing built-in command/code tools and
 *      `WebFetch`."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown, and the Beat Reporter is standing beside a workbench where every tool loop hangs empty — hammer gone, chisel gone, the little window to the outside world boarded over. The 2.1.248 release adds a launch flag, `claude --restricted`, that removes the built-in command and code tools plus `WebFetch`, so the session that starts can read and reason but cannot run anything, rewrite anything, or reach the open web. The two books cover exactly what the flag strips at startup and why a consultant would ever *want* a Claude with its hands tied. Answer the door's one question for the key — then face the thing that guards it, a skeleton whose tool belt was picked clean and who guards the empty loops all the same.",
  prompt:
    "You launch a session with `claude --restricted`. What does that flag actually do?",
  choices: [
    { id: 'a', label: "It removes the built-in command and code tools plus `WebFetch` at launch — so the session can't run shell commands, edit or write files, or fetch web pages", correct: true },
    { id: 'b', label: "It drops the session into plan mode, where edits are proposed and queued for your approval rather than removed", correct: false },
    { id: 'c', label: "It confines the session to the original checkout, blocking `/add-dir` and any path outside it", correct: false },
    { id: 'd', label: "It caps how many tool calls the session may make before it stops on its own", correct: false },
  ],
  passFeedback: "HIT! `--restricted` strips the built-in command tools, the code tools, and `WebFetch` the moment the session starts. What's left is a Claude that reads and reasons but can't act on your machine or reach the web.",
  failFeedback: "MISS! It doesn't queue edits, scope a directory, or count calls — it removes whole tool *categories* (command, code, and `WebFetch`) at launch. Re-read Book 1.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**The \`--restricted\` Flag — Taking the Tools Off the Belt Before the Session Starts**

**A flag you set at launch, not a mode you switch into**

Most of the ways you rein Claude in happen *during* a session: you cycle a permission mode, you approve or deny a call, you answer a prompt. The 2.1.248 release adds a blunter, earlier lever. \`--restricted\` is a flag you pass when you start Claude Code — \`claude --restricted\` — and it decides what tools even exist for that run before a single word is typed. It isn't a setting you toggle mid-conversation; it's the shape of the session, fixed at the door.

**What it removes**

The changelog is exact about the cargo: the flag removes the built-in *command* tools, the built-in *code* tools, and \`WebFetch\`. Command tools are how Claude runs things in your shell. Code tools are how it writes and edits files. \`WebFetch\` is how it pulls a page off the internet. Strip those three and you've taken away Claude's ability to *act on your machine* and its ability to *reach out past it*. What remains is a session that can take in what's in front of it and reason about it out loud — it just can't run, rewrite, or retrieve.

**Why "removed" is stronger than "denied"**

It's worth being precise, because the misreadings are all softer than the truth. A permission mode still *has* the tools and asks before using them; plan mode still *has* them and holds the edits for later. \`--restricted\` is different in kind: the tools are gone, not gated. There is no prompt to click through and no queue to approve, because there is nothing to approve — the capability was never loaded. That's the whole appeal. A gate can be opened by a tired click; a tool that isn't there can't be opened at all.

> Takeaway: \`--restricted\` is a launch flag that *removes* Claude Code's built-in command and code tools and \`WebFetch\`, leaving a read-and-reason session with no way to run, rewrite, or fetch.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**When You Want Claude's Hands Tied — Advisory Sessions and Screens You Don't Have to Watch**

**The posture Book 1 built, put to work**

Book 1 was the mechanism; here's the engagement it earns. There's a recurring situation in consulting where you want Claude's *judgment* but not its *reach*: walk a client through their own codebase, explain what a gnarly module does, sanity-check an approach — all reasoning, no touching. Normally you'd lean on a cautious permission mode and stay alert for the one action that shouldn't happen. \`--restricted\` lets you take that vigilance off the table entirely. Launch the session restricted and the category of "oops, it edited the wrong file" simply cannot occur, because the editing tools were never in the room.

**The demo you can hand to someone else**

The sharper use is handing a restricted session to a person you don't want driving with full power — a client's analyst poking at a repo, a workshop attendee, anyone learning on live code. You've pre-decided the blast radius to zero: they can ask Claude anything and read anything it reasons back, but they cannot get it to run a command against the client's system or fetch something off the web mid-demo. You're not trusting them to stay in bounds; you've moved the bounds so there's nowhere out of them to go.

**Naming the trade so you reach for it deliberately**

The cost is real and worth saying plainly: a restricted session cannot finish the job. It won't apply the fix, run the test, or pull the reference doc — you'll relaunch without the flag when it's time to actually build. So treat \`--restricted\` as a *stance*, chosen on purpose for the read-and-advise stretch of the work, and dropped the moment the work turns to doing. The skill is knowing which stretch you're in.

> Takeaway: Reach for \`--restricted\` when you want reasoning without reach — advisory sessions, teaching on live code, handing a safe Claude to someone else — and relaunch without it the moment the job turns to building.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `A client's analyst wants to explore their own repo with Claude, but nothing can change and nothing can phone out.
So I'll start the session with the ____ flag.
That removes the built-in ____ tools and ____ at launch —
so the session can read and reason but can't ____.
When the exploring is done and it's time to actually apply a fix, I'll ____.`,
    blanks: [
      { id: 'flag', suggestions: ['`--restricted`', '`claude --restricted`', 'restricted-launch'] },
      { id: 'tool-cats', suggestions: ['command and code', 'shell-command and file-editing', 'run-and-edit'] },
      { id: 'webfetch', suggestions: ['`WebFetch`', 'the `WebFetch` tool', 'web-fetching'] },
      { id: 'cant-do', suggestions: ['run commands, edit files, or fetch the web', 'act on the machine or reach the web', 'run, rewrite, or retrieve'] },
      { id: 'relaunch', suggestions: ['relaunch without the flag', 'restart the session unrestricted', 'drop `--restricted` and start again'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "The `--restricted` launch flag (2.1.248): pass it when you start Claude Code (`claude --restricted`) and it *removes* the built-in command tools, the built-in code tools, and `WebFetch` for that run. The result is a session that can read and reason but can't run shell commands, edit or write files, or fetch web pages. The key distinction: this is removal at launch, not a permission gate you approve through — there's no prompt and no queue because the tools were never loaded. For a consultant it's the stance for advisory work — explaining a codebase, teaching on live code, or handing a safe Claude to a client's analyst — where you want judgment without reach. The trade is that a restricted session can't finish a build, so you relaunch without the flag when the work turns to doing.",
      beats: [
        { kind: 'say', text: "Lead story is a launch flag, not an in-session toggle. You start Claude Code with `claude --restricted`, and it decides what tools exist for that whole run before you type anything. Set at the door, fixed for the session." },
        { kind: 'say', text: "What it does is *remove* things — three of them, per the release note. The built-in command tools, which is how I run stuff in your shell. The built-in code tools, which is how I write and edit files. And `WebFetch`, which is how I pull a page off the internet. Take those away and I can't act on your machine or reach past it." },
        { kind: 'say', text: "Get the category right, because this is where people slip. A permission mode still *has* the tools and asks first. Plan mode still has them and holds the edits. `--restricted` is a different kind of thing: the tools are gone, not gated. Nothing to approve, because nothing was loaded." },
        {
          kind: 'choice',
          prompt: "A client asks: 'How's `--restricted` different from just running me in a cautious permission mode?' What's the honest answer?",
          options: [
            { id: 'removed', label: "Restricted *removes* the command, code, and fetch tools at launch; a permission mode keeps them and just prompts before each use", correct: true, reaction: "Exactly. A gate can be clicked open on a tired afternoon. A tool that was never loaded can't be — that's why removal is the stronger guarantee, and why you'd choose it for a hands-off session." },
            { id: 'faster', label: "It's the same protection, just faster — restricted skips the approval prompts but the tools still run when needed", correct: false, reaction: "No — that's the trap. Restricted doesn't skip prompts, it removes the tools. Nothing runs 'when needed,' because the running, editing, and fetching capabilities aren't there at all." },
            { id: 'readonly-files', label: "Restricted makes files read-only but still lets me run shell commands and fetch the web", correct: false, reaction: "Backwards. It takes away the command tools and `WebFetch` too, not just editing. The whole point is a session that reasons but doesn't act or reach out." },
          ],
        },
        { kind: 'say', text: "So when do you want a Claude with its hands tied? When you want the judgment without the reach. Walk a client through their own code, explain a nasty module, pressure-test an approach — all reasoning, nothing touched. Launch restricted and 'it edited the wrong file' can't happen, because the editing tools were never in the room." },
        { kind: 'say', text: "The sharper move is handing a restricted session to someone else — a client's analyst on live code, a workshop room. You've pre-set the blast radius to zero. They can ask me anything and read anything I reason back, but they can't get me to run against their system or fetch something mid-demo." },
        { kind: 'say', text: "One honest catch: a restricted session can't finish the job. No applying the fix, running the test, or pulling the reference doc. It's a *stance* for the read-and-advise stretch — when the work turns to building, you relaunch without the flag. Knowing which stretch you're in is the whole skill." },
        { kind: 'say', text: "The books have the full picture. The door asks one thing: what does `--restricted` actually do at launch? Answer for the key. Then square up to the Warden past it — a skeleton whose tool belt was picked clean, guarding the empty loops as if the tools were still there." },
      ],
    },
  },
  battle: {
    name: 'The Warden of the Empty Belt',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a skeleton straightens, and every loop on its tool belt hangs slack and empty — no hammer, no chisel, no little brass key to the outside* …they took them from me at the threshold, operator, before I drew my first breath in this room… tell me true, so I know you understand my emptiness — what did that flag strip away?",
    tauntLines: [
      "*rattles the empty loops* a *gate*, you say? something I could still swing open? no — there is nothing here to open… the tools did not stay behind a lock, they never arrived…",
      "*bones clatter* read-only, you guessed? only the files? no, no — the running went too, and the reaching-out… I cannot touch this world OR the one beyond the wall…",
    ],
    victoryLine: "*the Warden lowers its picked-clean belt and, from a loop you'd have sworn was empty, produces the key* …you saw it — not gated, but *gone*… removed at the door, before the session drew breath… take it, and choose your emptiness on purpose…",
    questions: [
      {
        prompt:
          "You launch a session with `claude --restricted`. What does that flag actually do?",
        choices: [
          { id: 'a', label: "It removes the built-in command and code tools plus `WebFetch` at launch — so the session can't run shell commands, edit or write files, or fetch web pages", correct: true },
          { id: 'b', label: "It drops the session into plan mode, where edits are proposed and queued for your approval rather than removed", correct: false },
          { id: 'c', label: "It confines the session to the original checkout, blocking `/add-dir` and any path outside it", correct: false },
          { id: 'd', label: "It caps how many tool calls the session may make before it stops on its own", correct: false },
        ],
        passFeedback: "HIT! `--restricted` strips the built-in command tools, the code tools, and `WebFetch` the moment the session starts. What's left is a Claude that reads and reasons but can't act on your machine or reach the web.",
        failFeedback: "MISS! It doesn't queue edits, scope a directory, or count calls — it removes whole tool *categories* (command, code, and `WebFetch`) at launch. Re-read Book 1.",
      },
    ],
  },
};
