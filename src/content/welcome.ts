import type { LessonContent } from './types';

export const welcomeContent: LessonContent = {
  roomId: 'welcome',
  intro: 'Welcome, operator. Before we ride: four modes. PLAN reads, never edits. ACCEPT-EDITS writes without asking. AUTO runs everything with a safety classifier watching. ASK is the cautious default. Shift+Tab cycles them. Pick the one that matches the risk. Read the lore. Then the terminal.',
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
      text: 'Four modes, one cycle. Shift+Tab. PLAN: read and propose. ACCEPT-EDITS: edit your repo without asking. AUTO: run anything, classifier blocks the dangerous bits. ASK: confirm every action. Plan first on a new repo. Auto for long boring loops. Ask for the irreversible.',
    },
    {
      id: 'sticky-note',
      text: "Describe the deliverable in plain English. 'One-page proposal microsite for Acme. Brand color #B23A1D. Three sections: problem, approach, fee structure.' Claude plans. You read the plan. You approve. Then code.",
    },
    {
      id: 'side-note',
      text: 'Vite + React → push to GitHub → import to Vercel → live URL in 90 seconds. Free tier covers every prototype. /deploy from the Vercel plugin pushes from inside Claude Code. Use for proposal microsites, client dashboards, RFP responses.',
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
};
