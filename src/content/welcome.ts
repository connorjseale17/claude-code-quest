import type { LessonContent } from './types';

export const welcomeContent: LessonContent = {
  roomId: 'welcome',
  intro: "Now that you know what Claude Code is and how the ask→act→review loop feels, it's time to learn how to control it. Talk to Guide-bot first — he'll show you the four permission modes and how to brief like a pro. The boss battle in the sanctum checks what you picked up.",
  prompt: "You're starting a Claude Code session on a brand-new client repo to scope out a proposal microsite. You've never opened the codebase. Which permission mode should you start in?",
  choices: [
    { id: 'a', label: 'auto — fastest, classifier handles the rest', correct: false },
    { id: 'b', label: 'bypassPermissions — skip the friction entirely', correct: false },
    { id: 'c', label: 'plan — read and propose before touching anything', correct: true },
    { id: 'd', label: 'acceptEdits — let Claude write, review by diff later', correct: false },
  ],
  passFeedback: '[PASS] Read, plan, then write. The plan IS the first draft of the deliverable.',
  failFeedback: '[FAIL] Auto and acceptEdits both edit. New repo + unknown stakes = plan mode first.',
  lore: [
    {
      id: 'manual',
      text: "**The Four Permission Modes — Who's Holding the Steering Wheel**\n\n**The one decision you make before every session**\n\nClaude Code can read your files, rewrite them, and run commands in your terminal. Permission mode decides how much of that it can do without stopping to ask you. Get this right and the tool feels effortless. Get it wrong on a client's codebase and you're explaining to a partner why something broke.\n\n**The modes, from most cautious to most autonomous**\n\n*Default* asks you to approve every edit and every command before it happens. Slow, but nothing moves without your say-so. This is where you live when the stakes are high or the code is unfamiliar.\n\n*Accept Edits* lets Claude write and change files on its own, on the understanding that you'll review the diff afterward rather than approving each change live. The right gear once you trust the direction and just want momentum.\n\n*Plan* reads everything and proposes a course of action but changes nothing. It's the architect walking the site before anyone picks up a tool.\n\n*Auto* makes the call on each action itself, with only a safety check watching in the background. Reserve it for low-stakes, well-understood work. Auto is a Team-plan-and-up capability, not always present.\n\n**Switching on the fly**\n\nShift+Tab cycles you through the available modes mid-session without losing your conversation. You don't commit to one mode for the whole session; you change gears as the work changes. Reading unfamiliar code, drop to Plan. Confident and moving, Accept Edits.\n\n> Takeaway: Match the mode to the risk. Unknown code and irreversible actions want caution; familiar, low-stakes work can run looser.",
    },
    {
      id: 'cli-primer',
      text: "**The Terminal Is Just Texting Your Computer — The Black Window Is Friendlier Than It Looks**\n\n**Why this screen matters**\n\nClaude Code runs in the terminal, not a chat tab. For a lot of consultants that's the intimidating part. It shouldn't be. The terminal is simply a text-based way to talk to your computer: you type an instruction, it does the thing, it answers back. That's the whole concept.\n\n**The five commands that cover most of it**\n\n`cd` moves you into a folder. `ls` lists what's in the current one. `pwd` tells you where you are right now. `cat` prints the contents of a file to the screen. `git status` shows what's changed since your last save point. You will use these constantly and barely need more to start.\n\n**The part that makes Claude Code powerful**\n\nBecause Claude lives in this same terminal, it can do everything you can do here, and more. It reads files, runs commands, saves snapshots of your work, and packages it for sharing, all from inside the same conversation. You're not copy-pasting between a chat window and your computer anymore. The assistant and the work are in the same room.\n\n> Takeaway: If the terminal feels foreign, give it a week. It's the cheapest professional skill you'll ever pick up, and it's the doorway to everything else here.",
    },
    {
      id: 'from-gpts',
      text: "**You Already Know How to Do This — Porting Your Custom GPT Instincts to Claude Code**\n\n**The skill transfers**\n\nIf you've built a Custom GPT or a Gemini Gem, you already understand the core move: give an AI instructions, knowledge, and tools so it does a specific job well. Claude Code is that same idea with one difference that changes everything. A GPT lives in a sandbox and can only talk. Claude Code works in your actual files, runs real commands, and produces real deliverables.\n\n**Same concept, new name**\n\nThe system prompt you wrote for a GPT becomes a file called CLAUDE.md that travels with the project. The knowledge files you uploaded become small reference documents Claude reads automatically. The API connections you set up as GPT Actions become MCP servers. You're not learning a new discipline; you're renaming one you already have.\n\n**Why the shift is worth it**\n\nA \"code reviewer\" GPT could read a snippet you pasted and suggest a fix. The Claude Code version reads the real file, makes the change in place, runs the test to confirm it worked, and saves the result. The instructions are nearly identical. The difference is that one talks about the work and the other does it.\n\n> Takeaway: Your instinct for writing clear, specific AI instructions is exactly what this tool rewards. You're porting expertise to a more powerful platform, not starting over.",
    },
    {
      id: 'sticky-note',
      text: "**Brief Like You'd Brief a New Hire — Specificity Is the Cheapest Leverage You'll Buy**\n\n**The day-one analogy**\n\nTreat Claude the way you'd treat a sharp junior consultant on their first morning. They're capable, but they don't know your client, your stack, or what \"good\" looks like here yet. Hand them a vague task and they'll fill the gaps with guesses. Hand them a clear one and they'll surprise you.\n\n**Vague in, generic out**\n\n\"Make me a website\" forces Claude to invent every detail: the purpose, the audience, the technology, the look. It will pick the statistically common answer, which is almost never your firm's answer. \"A one-page proposal microsite for Acme Corp, built in Next.js, in our brand colors\" leaves nothing to chance. Same effort to type. Wildly different result.\n\n**Describe the outcome, not the keystrokes**\n\nYou don't need to tell Claude which code to write. You need to tell it what success looks like: who the deliverable is for, what problem it solves, and any constraints that matter. The \"how\" is its job. The \"what\" and \"why\" are yours.\n\n> Takeaway: The quality of what you get out is set by the clarity of what you put in. Name the deliverable, the client, and the stack every time.",
    },
    {
      id: 'side-note',
      text: "**Match the Sharing to the Sensitivity — Live Link or Sealed Zip, Know Which One You Need**\n\n**Two kinds of deliverable, two ways to hand them over**\n\nAlmost everything you build falls into one of two buckets, and the first thing to learn is telling them apart. Some work is non-confidential: an internal demo, a throwaway prototype, a generic proof of concept with no client data in it. Other work is client-confidential: anything carrying their name, their data, their strategy, their numbers. The bucket decides how you share it.\n\n**Non-confidential: a live link is fine and fast**\n\nFor a demo or prototype with nothing sensitive in it, a live preview link is the quickest way to get reactions. Claude builds it, it goes up to a hosting service, and you send a URL the recipient can click and poke. Fast feedback on something they can actually use beats a stale screenshot every time.\n\n**Client-confidential: package it, don't publish it**\n\nThe moment the deliverable contains anything the client would consider private, do not put it on a public hosting service. Treat it exactly like any other sensitive document. Have Claude package the finished work as a zip file, and share it through the same secure channel your firm already uses for confidential material. The deliverable never touches the open internet.\n\n> Takeaway: Before you share anything, ask one question: is this confidential? If yes, it ships as a sealed package through a secure channel, never as a public link.",
    },
  ],
  practice: {
    id: 'proposal-architect-practice',
    template:
      "I'm kicking off a ____ engagement and need a quick internal demo to react to.\nBuild a one-page ____ for ____ using ____.\nUse ____ as the primary brand color.\nStart in plan mode so I can review the approach first.\nThis is a non-confidential demo, so a local preview is fine;\nif it were client-confidential, package it as a zip instead.",
    blanks: [
      // engagement-type: discovery/pitch/kickoff are all legitimate consulting framings.
      // No pedagogical "best" — the lesson is naming the engagement at all. UNGRADED.
      { id: 'engagement-type', suggestions: ['discovery', 'pitch', 'kickoff'] },
      // deliverable: all three are concrete one-pagers. Lesson is "name the deliverable",
      // not which one — any specific noun beats "a website." UNGRADED.
      { id: 'deliverable', suggestions: ['demo microsite', 'sample landing page', 'mock dashboard'] },
      // client: all three preserve the non-confidential framing the template already sets.
      // Lesson is naming an audience; no clear winner among generic stand-ins. UNGRADED.
      { id: 'client', suggestions: ['a fictional sample brand', 'an internal example', 'a generic template'] },
      // stack: all three are valid for a one-page demo. Lesson is naming the stack, not
      // picking a "correct" one. UNGRADED.
      { id: 'stack', suggestions: ['Next.js', 'static HTML', 'React + Vite'] },
      // brand-color: arbitrary hex codes. No pedagogically correct color. UNGRADED.
      { id: 'brand-color', suggestions: ['#B23A1D', '#0B5394', '#2F4858'] },
    ],
    prize: { id: 'proposal-architect', label: 'PROPOSAL ARCHITECT' },
  },
  conversations: {
    'guide-bot': {
      summary:
        'The terminal is text-mode chat with your computer; Claude Code lives there. Four permission modes — Default, Accept Edits, Plan, Auto — and Shift+Tab cycles them live. Brief like a new hire: name the deliverable, client, and stack. Share by sensitivity: live link for non-confidential, a sealed zip for client-confidential.',
      beats: [
        {
          kind: 'say',
          text: "Hey. Fresh session? Good. You've got the basics — terminal, the ask→act→review loop, Plan mode as the safe way in. Now we go a level deeper: how you actually steer me through real work.",
        },
        {
          kind: 'say',
          text: "Four permission modes decide how much I can do without asking. Default confirms every action. Accept Edits writes for you — you review the diff after. Plan reads and proposes but changes nothing. Auto decides per-action with a safety check watching.",
        },
        {
          kind: 'say',
          text: "Watch what happens in practice. You open a new repo and say 'fix the bug in src/auth.ts.' In Plan mode, I read the file, propose three approaches, change nothing. You pick one. We move to Accept Edits, I write the fix, you review the diff after. Each mode is a different speed of trust — and you change gears as the work changes.",
        },
        {
          kind: 'choice',
          prompt: "You just opened a brand-new client repo. Never seen the codebase. Which mode do you start in?",
          options: [
            {
              id: 'plan',
              label: 'plan',
              correct: true,
              reaction:
                "Right. Plan reads the codebase and drafts an approach without touching a file. You read it first, then approve. It's the architect walking the site before anyone picks up a tool.",
            },
            {
              id: 'auto',
              label: 'auto',
              correct: false,
              reaction:
                "Risky on unfamiliar code. Auto acts on its own; you don't want that in a repo you've never seen. Drop to Plan first.",
            },
            {
              id: 'accept-edits',
              label: 'acceptEdits',
              correct: false,
              reaction:
                "Still changes files before you've read anything. On unknown code you look before you touch. Plan first.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Shift+Tab cycles the modes live, mid-session, without losing our conversation. Unfamiliar or high-stakes code, stay cautious — Default or Plan. Once you trust the direction, Accept Edits for momentum. Low-stakes loops, Auto.",
        },
        {
          kind: 'say',
          text: "When you brief me, treat me like a sharp new hire on day one. Name the deliverable, the client, the stack. 'Make me a website' makes me guess everything; 'a one-page proposal microsite for Acme in Next.js' leaves nothing to chance.",
        },
        {
          kind: 'say',
          text: "Last piece: how you hand work over depends on sensitivity. A non-confidential demo? A live preview link is fastest — they click and poke. Anything client-confidential, with their name or numbers in it? That never touches the open internet.",
        },
        {
          kind: 'choice',
          prompt:
            "A client-confidential microsite, full of their internal numbers, is ready for review. How do you get it to them?",
          options: [
            {
              id: 'public-link',
              label: 'push it to a public URL and send the link',
              correct: false,
              reaction:
                "Their numbers on the open internet? No. A hidden URL is still public. Confidential work never ships as a live link.",
            },
            {
              id: 'zip-secure',
              label: 'package it as a zip, send it through your secure channel',
              correct: true,
              reaction:
                "Yes. Seal it in a package and send it the way you'd send any sensitive document. The deliverable never touches the open internet.",
            },
            {
              id: 'email-source',
              label: 'email them the raw source code',
              correct: false,
              reaction:
                "They're a strategy partner, not an engineer — and raw source over email is its own leak. Package it; use the secure channel.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Recap: match the mode to the risk, brief me like a new hire, and share by sensitivity — live link for demos, sealed zip for anything confidential.",
        },
        {
          kind: 'say',
          text: "Through the east door is the sanctum. Sloppy the Glob squats on the key in there — small, twitchy, flings goo when it's wrong-footed. Answer well and you'll keep your shoes clean. Good luck.",
        },
      ],
    },
  },
  battle: {
    name: 'Sloppy the Glob',
    spriteKey: 'slime',
    maxHP: 3,
    playerHP: 5,
    phases: 1,
    introLine: "*gurgles* …who let you in… this is MY chamber… and you didn't even read the manual…",
    tauntLines: [
      "*flings goo* sloppy keystrokes, sloppy human!",
      "*belches* skipped the docs, did you?",
      "*splats* you can't just YOLO into a strange repo!",
    ],
    victoryLine: "*deflates* …fine… you read the room… take the key, operator…",
    questions: [
      {
        prompt: "You just opened a brand-new client repo. Never seen the codebase. Which permission mode do you start in?",
        choices: [
          { id: 'a', label: 'auto — fastest, let the classifier handle it', correct: false },
          { id: 'b', label: 'bypassPermissions — skip the friction', correct: false },
          { id: 'c', label: 'plan — read and propose before touching anything', correct: true },
          { id: 'd', label: 'acceptEdits — let Claude write, review the diff later', correct: false },
        ],
        passFeedback: 'HIT! Unknown code, high stakes, read first. The plan is your first look under the hood.',
        failFeedback: 'MISS! Auto and acceptEdits both change files. New repo plus unknown stakes equals plan mode first.',
      },
      {
        prompt: "You're mid-session and need to drop from Accept Edits down to Plan mode. How?",
        choices: [
          { id: 'a', label: 'Restart the session with a flag', correct: false },
          { id: 'b', label: 'Shift+Tab to cycle modes without losing the conversation', correct: true },
          { id: 'c', label: 'Type /plan as a command', correct: false },
          { id: 'd', label: 'Esc twice', correct: false },
        ],
        passFeedback: 'HIT! Shift+Tab cycles you through the available modes on the fly. Change gears as the work changes.',
        failFeedback: 'MISS! Shift+Tab is the live mode cycle. No restart, no lost context.',
      },
      {
        prompt: "You're briefing Claude on a client one-pager. Which framing produces the most reliable build?",
        choices: [
          { id: 'a', label: '"Make me a website."', correct: false },
          { id: 'b', label: '"Use Next.js and make it look professional."', correct: false },
          { id: 'c', label: '"A one-page proposal microsite for Acme Corp, Next.js, in our brand colors — here\'s the audience and the goal."', correct: true },
          { id: 'd', label: 'Paste the brand guidelines PDF and hit enter.', correct: false },
        ],
        passFeedback: 'HIT! Name the deliverable, the client, the stack, and the goal. Specificity is the cheapest leverage you own.',
        failFeedback: 'MISS! "Make me a website" leaves every decision to chance. Tell Claude what good looks like.',
      },
      {
        prompt: "You've built a client-confidential proposal microsite full of their internal numbers. They want to review it by end of week. How do you get it to them?",
        choices: [
          { id: 'a', label: 'push it to a public Vercel URL and send the link', correct: false },
          { id: 'b', label: 'email them the raw source code', correct: false },
          { id: 'c', label: "have Claude package it as a zip and share it through your firm's secure channel for confidential documents", correct: true },
          { id: 'd', label: 'host it publicly but use a hard-to-guess URL', correct: false },
        ],
        passFeedback: 'HIT! Client-confidential never goes on the open internet. Seal it in a package, send it the way you\'d send any sensitive document.',
        failFeedback: 'MISS! A hidden URL is still public. Anything client-confidential ships as a secure package, not a live link.',
      },
      {
        prompt: "You built a Custom GPT last year with a system prompt and a few uploaded knowledge docs. What's the honest relationship between that skill and Claude Code?",
        choices: [
          { id: 'a', label: 'Nothing transfers — Claude Code is a totally different discipline', correct: false },
          { id: 'b', label: 'It maps directly — system prompt becomes CLAUDE.md, knowledge docs become reference files, and your prompt-writing instinct carries over', correct: true },
          { id: 'c', label: "You'll need to learn to code first before any of it applies", correct: false },
          { id: 'd', label: 'GPTs and Claude Code do unrelated jobs', correct: false },
        ],
        passFeedback: 'HIT! Same architecture, new medium. The difference is Claude Code acts on real files instead of just talking.',
        failFeedback: "MISS! Your GPT and Gem instincts port straight over. You're not starting from zero, you're upgrading platforms.",
      },
    ],
  },
};
