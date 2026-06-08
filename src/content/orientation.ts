import type { LessonContent } from './types';

export const orientationContent: LessonContent = {
  roomId: 'orientation-trail',
  intro:
    "You're here because you've heard about Claude Code and want to know what it actually is. Not a chatbot you talk to in a browser tab — something else. Before we teach you how to drive it, this room teaches what it IS, where it lives, and the rhythm of one real session. Talk to Init-bot at the trailhead. Read the three primers along the way. When you're ready, the path east is open — step through and the real Quest begins.",
  // No battle in Orientation — the door east is open so a new operator can
  // ease in without being gated by a quiz. The required prompt/choices/feedback
  // fields below are kept as noop stubs (the rendering chain only fires them
  // when activePanel.type === 'challenge' AND there's a challenge item to
  // trigger it; Orientation has neither). Same pattern final-boss.ts uses.
  prompt: '',
  choices: [{ id: 'noop', label: 'noop', correct: true }],
  passFeedback: '',
  failFeedback: '',
  lore: [
    {
      id: 'what-is-it',
      text: "**Not Another Chatbot — What Claude Code Actually Is**\n\n**The one-sentence picture**\n\nClaude Code is an AI that works inside your real files and your real terminal. When you ask it for something, it doesn't just describe what to do — it reads the relevant files, proposes edits, asks for your approval, and then makes the changes for you. The chatbot in your browser tab can only talk back. This one ships work.\n\n**Why that distinction matters for a consultant**\n\nThe browser chatbot is great for thinking out loud. You paste in a problem, it gives you an answer, you copy that answer somewhere else and apply it yourself. There's a human in the middle for every step. That middle layer is where most of the day disappears: copying snippets back and forth, reformatting, fixing the bits the chatbot didn't quite know about your project.\n\nClaude Code removes that middle layer. It sees the actual files. It can run the test, see the failure, and try again — without you carrying the result over by hand. A proposal microsite that used to be a day of back-and-forth becomes a forty-minute session where Claude reads the brief, builds the pages, and you review the result.\n\n**You stay in charge of every real action**\n\nIt's not autopilot. Before Claude writes to a file or runs a command, it shows you what it wants to do and waits for you to approve. You are the partner who signs off on the work. That's the felt mechanic: ask in plain English, watch it propose, approve or redirect, see it ship.\n\n> Takeaway: A browser chatbot talks about your work. Claude Code does your work — with your approval at every step that matters.",
    },
    {
      id: 'terminal-primer',
      text: "**The Terminal Demystified — The Black Window Is the Front Door**\n\n**What it actually is**\n\nThe terminal is a text-only window where you type instructions to your computer instead of clicking buttons. That's the whole concept. The reason it looks intimidating is that no one ever introduced you to it; it isn't actually harder than email. You type one line, press Enter, the computer answers back. Claude Code lives inside that window because that's where the work happens — close to the files, close to the commands, no copy-paste in between.\n\n**How to open it on your machine**\n\nOn a Mac, press Cmd+Space, type \"Terminal,\" and press Enter. On Windows, press Win+X and pick \"Windows PowerShell\" or \"Terminal\" — and notice the prompt starts with `PS C:\\...`. (PowerShell and the older CMD look almost identical, and Claude Code's install instructions only work in PowerShell. If you don't see `PS`, you're in the wrong one.) Either way, a window with a blinking cursor opens. That cursor is waiting for you.\n\n**The five commands that get you started**\n\nYou will use these constantly: `cd` moves you into a folder. `ls` lists what's there. `pwd` tells you where you currently are. `claude` starts a Claude Code session in whatever folder you're sitting in. `exit` (or Ctrl+D) closes the session.\n\n**The two muscle-memory traps**\n\nFirst: you can't click in the terminal. Use the arrow keys to move the cursor on a line, and the up arrow to recall a previous command. Second: paste shortcuts differ from the rest of your operating system. On Mac it's still Cmd+V. On Linux terminals it's typically Ctrl+Shift+V (not Ctrl+V). In PowerShell, right-click pastes. Get this wrong once, you'll remember.\n\n> Takeaway: The terminal is texting your computer. Five commands cover most of it, the paste shortcut is slightly different, and that's the whole intimidation cleared.",
    },
    {
      id: 'core-loop',
      text: "**The Ask, Act, Review, Accept Loop — How One Session Actually Feels**\n\n**The four-beat rhythm**\n\nEvery Claude Code session is the same four-beat rhythm, repeated. You **ask** for something in plain English. Claude figures out what it would need to do and **proposes** the steps — which files it wants to read, which it wants to change, which commands it wants to run. You **review** that proposal. Then you **accept** (or redirect), and Claude executes. That's it. Once the rhythm clicks, the rest of the tool is just variations on this loop.\n\n**Plan mode — your safe first session**\n\nThere's a special version of this loop, called Plan mode, designed for exactly the moment you're nervous about giving an AI access to your files. In Plan mode, Claude can read everything and propose a complete approach, but it cannot change a single file or run a single command. It's look-don't-touch. For a new session on a new project — especially a client engagement — Plan mode is the right place to start. Claude reads, drafts the plan, you read the plan and decide it's reasonable. Then, only then, you switch out of Plan and let it execute.\n\n**What \"approve\" really means**\n\nWhen Claude says \"can I edit src/index.html?\" and you type yes, you are authorizing one specific real change to one specific real file. Saying yes is not a vague \"I trust the AI\" — it's a per-action sign-off, the way a partner signs off on a junior's deliverable. You stay the decision-maker on every file that gets written and every command that runs.\n\n**The safety net underneath**\n\nEven when you approve something and regret it, Claude Code snapshots your files before every edit. Press Esc twice and you can rewind to a previous state. The combination — Plan mode in front for reconnaissance, checkpoints underneath for undo — means you can experiment without fear. Trying things is cheap; that's the whole point.\n\n> Takeaway: Ask, propose, review, accept. Start in Plan mode for new work. Approve specific actions, not blanket trust. Esc twice rewinds. You're always in the driver's seat.",
    },
  ],
  practice: {
    id: 'orientation-practice',
    template:
      "It's my first real Claude Code session. I'm sitting in front of my ____ on my own machine,\nwith a folder of client materials open beside me.\nTo start the session I type ____ and press Enter.\nBecause this is brand-new work and I'd rather look before I touch,\nI begin in ____ mode — Claude can read but cannot change a single file.\nClaude reads the brief, drafts an approach, and asks: \"can I edit proposal.md?\"\nThe right answer here is ____ — and I know that if I regret it, ____ rewinds the file.",
    blanks: [
      {
        id: 'terminal-app',
        suggestions: ['Terminal app', 'PowerShell window', 'Mac terminal'],
        // Ungraded — which terminal app is a judgment call based on OS.
      },
      {
        id: 'start-command',
        suggestions: ['claude', 'open claude', 'run-ai'],
        correctIndex: 0,
      },
      {
        id: 'safe-mode',
        suggestions: ['plan', 'auto', 'acceptEdits'],
        correctIndex: 0,
      },
      {
        id: 'approval',
        suggestions: ['read the proposed change, then approve if it matches the plan', 'always say yes to keep momentum', 'always say no to stay safe'],
        correctIndex: 0,
      },
      {
        id: 'undo',
        suggestions: ['Esc twice', 'closing the terminal', 'restarting my computer'],
        correctIndex: 0,
      },
    ],
    prize: { id: 'operator-initiate', label: 'OPERATOR INITIATE' },
  },
  conversations: {
    'guide-init': {
      summary:
        "Claude Code is an AI that acts on your real files from inside your terminal — not a browser chatbot. It needs a paid plan and one install command. The session rhythm is ask, propose, review, accept; start new work in Plan mode so Claude can look but not touch; approving means signing off on one specific real change; Esc twice rewinds if you regret it.",
      beats: [
        {
          kind: 'say',
          text: "Hey. I'm Init-bot. Before anyone hands you a permission-mode quiz or a permission-system diagram, I want you to leave this room with one thing: a clear picture of what Claude Code actually is. Five minutes. Then you'll know whether you want the rest.",
        },
        {
          kind: 'say',
          text: "Picture your day. A client asks for a one-pager. Right now you brief a junior, wait, get a draft, mark it up, wait again. Claude Code collapses that loop. You describe the deliverable in plain English; it reads the brief, drafts the pages, and shows you the result while you're still on the call. The proposal that took a day takes an hour. That's the felt value. Everything else here exists to make that real.",
        },
        {
          kind: 'say',
          text: "But the most important thing to get right, day one, is what this thing IS — because people keep calling it 'a chatbot' and that's wrong in a way that matters. So let me check.",
        },
        {
          kind: 'choice',
          prompt:
            "A colleague says: 'Claude Code is just ChatGPT with a different login.' What's the honest correction?",
          options: [
            {
              id: 'right',
              label: "They're right enough — it's another chatbot.",
              correct: false,
              reaction:
                "Close, but the difference matters. A chatbot only talks. Claude Code acts — it reads and edits real files on your real computer, and runs real commands. That's not a skin change. That's the product.",
            },
            {
              id: 'wrong-tab',
              label: "The browser chatbot only produces text you have to copy somewhere. Claude Code actually edits the files and runs the commands — with my approval.",
              correct: true,
              reaction:
                "Exactly. The chatbot puts you in the middle, ferrying text. Claude Code removes that middle. It's the same conversational feel, but the work ships.",
            },
            {
              id: 'magic',
              label: "It's smarter — it does anything you ask without permission.",
              correct: false,
              reaction:
                "Not 'without permission' — that's a critical detail. It proposes; you approve. The point is that it acts on real files, not that it acts without you.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Now, where does it live? Not in a browser tab. In your terminal — that black window with a blinking cursor that's probably been staring at you, ignored, for years. The terminal is just texting your computer. You type one line, it answers. On Mac, hit Cmd+Space and search Terminal. On Windows, Win+X and pick PowerShell. The window opens. The cursor blinks. That's it.",
        },
        {
          kind: 'say',
          text: "Five commands cover most of what you'll do at first: `cd` moves into a folder, `ls` lists what's in it, `pwd` says where you are, `claude` starts a Claude Code session, `exit` closes it. One muscle-memory trap to flag: paste shortcuts are different here. On Mac it's still Cmd+V. In PowerShell, right-click pastes. Get it wrong once and you'll never forget.",
        },
        {
          kind: 'say',
          text: "Access reality, quickly: Claude Code needs a paid Claude plan — Pro, Max, Team, Enterprise, or Console credits. The free Claude.ai plan does not include it. You install it by pasting one command in your terminal, then you log in by clicking a link it pops open. Once. That's the whole install story.",
        },
        {
          kind: 'say',
          text: "Now the part that matters most: the rhythm. Every session is the same four beats. You ASK in plain English. Claude PROPOSES — 'here's what I'd read, here's what I'd change, here's what I'd run.' You REVIEW the proposal. You ACCEPT, or you redirect. Then it executes. Ask, propose, review, accept. That's the whole game.",
        },
        {
          kind: 'say',
          text: "For a brand-new project — especially a client engagement — you don't start by giving Claude write access. You start in Plan mode. In Plan mode, Claude can read every file and draft a full approach, but it cannot change a single file or run a single command. Look-don't-touch. You read the plan; if it's reasonable, you switch out of Plan and let it execute. Plan mode is your safe first session.",
        },
        {
          kind: 'blank',
          prompt:
            "Quick check. It's your first time on a client repo. You want Claude to read the codebase and draft an approach, but you do NOT want anything written or any command run until you've seen the plan. Which mode do you start in?",
          template: "Start in ____ mode — read-only, proposes but doesn't touch files.",
          blanks: [
            {
              id: 'safe-mode',
              suggestions: ['plan', 'auto', 'acceptEdits'],
              correctIndex: 0,
            },
          ],
          followup:
            "Plan mode. Exactly. It's the architect walking the site before anyone picks up a tool — and it's where a careful consultant starts every unfamiliar codebase.",
        },
        {
          kind: 'say',
          text: "Two safety details before I send you down the trail. First, 'approve' means something specific. When Claude says 'can I edit proposal.md?' and you say yes, you're signing off on that one real change to that one real file. It's a per-action approval, not blanket trust — same way a partner signs off on a junior's deliverable. Second, the safety net: Claude snapshots every file before it touches it. If you approve something and regret it, press Esc twice and the file rewinds. Mistakes are cheap. That's the whole reason you can experiment without fear.",
        },
        {
          kind: 'say',
          text: "That's it for the orientation. Head east when you're ready — the door's open. There's no test at the end of this room; the real Quest is what teaches you to drive. Permission modes, the project contract, custom commands, integrations, multi-agent — they're all waiting through that door. Good hunting, operator.",
        },
      ],
    },
  },
};
