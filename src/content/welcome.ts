import type { LessonContent } from './types';

export const welcomeContent: LessonContent = {
  roomId: 'welcome',
  intro: 'Welcome, operator. Talk to Guide-bot first — he walks you through how Claude Code actually works. Then read any lore you spot on the way to the sanctum. The terminal in there checks what you learned.',
  prompt: "You're starting a Claude Code session on a brand-new client repo to scope out a proposal microsite. You've never opened the codebase. Which permission mode should you start in?",
  choices: [
    { id: 'a', label: 'auto — fastest, classifier handles the rest', correct: false },
    { id: 'b', label: 'bypassPermissions — skip the friction entirely', correct: false },
    { id: 'c', label: 'plan — read and propose before touching anything', correct: true },
    { id: 'd', label: 'acceptEdits — let Claude write, review by diff later', correct: false },
  ],
  passFeedback: '[PASS] Read, plan, then write. The plan is the first draft of the deliverable.',
  failFeedback: '[FAIL] Auto and acceptEdits both edit. New repo + unknown stakes = plan mode first.',
  lore: [
    {
      id: 'manual',
      text: 'Tip: Shift+Tab cycles permission modes. Order: PLAN, ACCEPT-EDITS, AUTO, ASK.',
    },
    {
      id: 'sticky-note',
      text: "Tip: brief Claude like you'd brief a junior consultant — what, who for, in what style.",
    },
    {
      id: 'side-note',
      text: 'Tip: Vercel free tier hosts every prototype. PR → preview URL the client can review live.',
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
        'Four permission modes (PLAN, ACCEPT-EDITS, AUTO, ASK — Shift+Tab cycles). Brief in plain English, review the plan, ship to Vercel for a preview URL the client can click.',
      beats: [
        {
          kind: 'say',
          text: "Hey, operator. Fresh session? Good. Let me walk you through the basics before you wreck a client repo.",
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
          text: "Next concept: how to brief me. Don't dump code at me. Describe the deliverable in plain English — like you'd brief a junior consultant. What, who for, in what style.",
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
            "That's the shape. Concrete deliverable, concrete client, stack, brand color. I plan. You read. You approve. Then code lands. Beats 'make me a website' by an order of magnitude.",
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
                "They can't poke around a screenshot. They'll second-guess every decision because they can't see it move. Lose-lose.",
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
                "Operator. They're a strategy partner, not an engineer. They want a URL they can click. Source code is your problem, not theirs.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Recap: plan first. Brief plainly. Ship to Vercel. That's the loop. It scales from a one-pager to a full client dashboard.",
        },
        {
          kind: 'say',
          text: "Through the east door is the sanctum. Boss terminal in there checks what you learned. Lore on the way has bonus tips — read 'em or skip 'em. Up to you. Good luck, operator.",
        },
      ],
    },
  },
};
