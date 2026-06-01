import type { LessonContent } from './types';

export const welcomeContent: LessonContent = {
  roomId: 'welcome',
  intro: 'Welcome, operator. Talk to Guide-bot first — he walks you through how Claude Code actually works. Read any lore you spot along the way. The boss battle in the sanctum checks what you picked up.',
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
      text: 'Tip: Shift+Tab cycles permission modes. Order: PLAN → ACCEPT-EDITS → AUTO → ASK.',
    },
    {
      id: 'sticky-note',
      text: "Tip: brief Claude like a junior consultant — concrete deliverable, concrete client, concrete stack.",
    },
    {
      id: 'cli-primer',
      text: 'The terminal is just text-mode chat with your computer. `cd` to move, `ls` to list, `git status` to see what changed. Claude Code lives in there, and it can text the computer too.',
    },
    {
      id: 'side-note',
      text: 'Tip: Vercel free tier hosts every prototype. PR → preview URL the client can poke live, no source code email required.',
    },
    {
      id: 'briefing-formula',
      text: 'Brief Claude in three parts. WHY: who is it for + what problem. WHAT: stack + the files that matter. HOW: build, test, ship commands. Skip a leg and Claude guesses.',
    },
  ],
  practice: {
    id: 'proposal-architect-practice',
    template: 'Build a one-page ____ for ____ using ____.\nUse ____ as the primary color.\nDeploy to Vercel preview. Use plan mode first.',
    blanks: [
      { id: 'deliverable', suggestions: ['proposal microsite', 'landing page', 'client dashboard'] },
      { id: 'client', suggestions: ['Acme Corp', 'Globex', 'Initech'] },
      { id: 'stack', suggestions: ['Next.js', 'static HTML', 'React + Vite'] },
      { id: 'brand-color', suggestions: ['#B23A1D', '#0B5394', '#2F4858'] },
    ],
    prize: { id: 'proposal-architect', label: 'PROPOSAL ARCHITECT' },
  },
  conversations: {
    'guide-bot': {
      summary:
        'The terminal is text-mode chat with your computer; Claude Code lives there. Four permission modes (PLAN, ACCEPT-EDITS, AUTO, ASK — Shift+Tab cycles). Brief in WHY / WHAT / HOW. Ship to Vercel for a preview URL the client can click.',
      beats: [
        {
          kind: 'say',
          text: "Hey. Fresh session? Good. Let me walk you through the basics before we touch real code.",
        },
        {
          kind: 'say',
          text: "Foundations first. The terminal is just text-mode chat with your computer. `cd` moves you. `ls` lists. `git status` shows what changed. Claude Code lives in there, and it can text the computer too.",
        },
        {
          kind: 'say',
          text: "Claude Code has four permission modes. PLAN reads, never edits. ACCEPT-EDITS writes for you (review by diff later). AUTO runs anything, a safety classifier watches. ASK confirms every action.",
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
                "Right. PLAN reads the codebase, drafts an approach, never touches a file. You read the plan first. Then approve. The plan IS the first draft of the deliverable.",
            },
            {
              id: 'auto',
              label: 'auto',
              correct: false,
              reaction:
                "Risky on unfamiliar code. AUTO runs commands; you don't want a runaway agent in a repo you've never seen. The right move is PLAN first.",
            },
            {
              id: 'accept-edits',
              label: 'acceptEdits',
              correct: false,
              reaction:
                "Still edits without confirmation. On unfamiliar code you read before you write. The right move is PLAN first.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Shift+Tab cycles the modes. Rules of thumb: PLAN for new work. ACCEPT-EDITS once you know the shape. AUTO for long, boring loops you trust the direction on. ASK for anything irreversible.",
        },
        {
          kind: 'say',
          text: "Next concept: how to brief me. Three parts. WHY — who is it for and what problem. WHAT — the stack and the files that matter. HOW — build, test, ship commands. Skip a leg and I guess.",
        },
        {
          kind: 'blank',
          prompt: "Try briefing me on a client microsite. Fill in the blanks below.",
          template:
            'Build a one-page ____ for ____ using ____.\nUse ____ as the primary color. Plan mode first.',
          blanks: [
            { id: 'deliverable', suggestions: ['proposal microsite', 'landing page', 'one-pager'] },
            { id: 'client', suggestions: ['Acme Corp', 'Globex', 'Initech'] },
            { id: 'stack', suggestions: ['Next.js', 'static HTML', 'React + Vite'] },
            { id: 'brand-color', suggestions: ['#B23A1D', '#0B5394', '#2F4858'] },
          ],
          followup:
            "That's the shape. Concrete deliverable. Concrete client. Stack. Brand color. I plan; you read; you approve; code lands. Beats 'make me a website' by an order of magnitude.",
        },
        {
          kind: 'say',
          text: "Last piece: the deploy loop. Vite + React → push to GitHub → import to Vercel. Live URL in about 90 seconds. Free tier covers every prototype your firm will ever ship.",
        },
        {
          kind: 'choice',
          prompt:
            "A client wants a proposal microsite by EOW. Where does it live so they can poke around it?",
          options: [
            {
              id: 'localhost',
              label: 'localhost while you build, screenshots for the client',
              correct: false,
              reaction:
                "They can't poke a screenshot. They'll second-guess every decision because they can't see it move. Lose-lose.",
            },
            {
              id: 'vercel',
              label: 'push to GitHub, import to Vercel, send them the preview URL',
              correct: true,
              reaction:
                "Yes. Vercel auto-deploys on every push. Each PR gets its own preview URL. The client clicks, the client reviews, you iterate. The deliverable lives on the internet from day one.",
            },
            {
              id: 'email-source',
              label: 'email them the source code',
              correct: false,
              reaction:
                "They're a strategy partner, not an engineer. They want a URL they can click. Source code is your problem, not theirs.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Recap: terminal is text-chat with the machine. PLAN first. Brief in WHY / WHAT / HOW. Ship to Vercel. That loop scales from a one-pager to a full client dashboard.",
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
        prompt: "You just opened a brand-new client repo. Never touched the codebase. Which permission mode do you start in?",
        choices: [
          { id: 'a', label: 'auto — fastest, classifier handles the rest', correct: false },
          { id: 'b', label: 'bypassPermissions — skip the friction entirely', correct: false },
          { id: 'c', label: 'plan — read and propose before touching anything', correct: true },
          { id: 'd', label: 'acceptEdits — let Claude write, review by diff later', correct: false },
        ],
        passFeedback: 'STRIKE! Read first, write second. The plan IS the first draft of the deliverable.',
        failFeedback: 'MISS! Auto and acceptEdits both edit. New repo + unknown stakes = plan mode first.',
      },
      {
        prompt: "Which keyboard shortcut cycles through the four permission modes?",
        choices: [
          { id: 'a', label: 'Ctrl+P', correct: false },
          { id: 'b', label: 'Shift+Tab', correct: true },
          { id: 'c', label: '/plan toggle', correct: false },
          { id: 'd', label: 'Esc twice', correct: false },
        ],
        passFeedback: 'STRIKE! Shift+Tab. PLAN → ACCEPT-EDITS → AUTO → ASK, repeat.',
        failFeedback: 'MISS! Shift+Tab is the cycle. Muscle-memorize it.',
      },
      {
        prompt: "You're briefing Claude on a client one-pager. Which framing produces the most reliable build?",
        choices: [
          { id: 'a', label: '"Make me a website."', correct: false },
          { id: 'b', label: '"Use Next.js, deploy to Vercel."', correct: false },
          { id: 'c', label: 'WHY: a proposal microsite for Acme. WHAT: Next.js + Tailwind, one route. HOW: pnpm dev, pnpm build, Vercel preview on push.', correct: true },
          { id: 'd', label: 'Paste the brand guidelines PDF and hit enter.', correct: false },
        ],
        passFeedback: 'STRIKE! WHY / WHAT / HOW. Same three-part formula CLAUDE.md uses. Skip a leg and Claude guesses.',
        failFeedback: 'MISS! "Make me a website" leaves every decision to chance. WHY (who + problem), WHAT (stack + key files), HOW (commands). All three.',
      },
      {
        prompt: "Client wants to poke around your proposal microsite by EOW. Where does it live?",
        choices: [
          { id: 'a', label: 'localhost — screenshots for the client', correct: false },
          { id: 'b', label: 'email them the source code', correct: false },
          { id: 'c', label: 'push to GitHub, import to Vercel, send them the preview URL', correct: true },
          { id: 'd', label: 'a USB stick by courier', correct: false },
        ],
        passFeedback: 'STRIKE! Vercel auto-deploys on every push. Each PR = its own preview URL. The client clicks; the client reviews.',
        failFeedback: 'MISS! Strategy partners want a URL they can click. Source code is YOUR problem, not theirs.',
      },
    ],
  },
};
