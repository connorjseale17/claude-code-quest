import type { LessonContent } from './types';

/**
 * Claude Cowork Quest — Module 2: The Permission Vault.
 * Safe day-one setup: install, scope one folder, pick the right approval mode.
 * Ids match buildCowork2Level() in src/engine/roomConfigs.ts.
 */
export const cowork2Content: LessonContent = {
  roomId: 'permission-vault',
  intro:
    "Welcome to the Steel-Blue Vault, where every door is a permission and every dial decides how much of your machine Cowork can touch. Day-one setup is the most important decision you'll make: install it right, point it at one safe folder, and pick an approval mode that matches the stakes. Warden Volt patrols these halls and teaches least-privilege the way a good security lead would — calmly, with the why first. Then you'll face Sprawl, the All-Access Gremlin, who wants you to hand over your entire drive and walk away.",
  prompt:
    "It's your first time using Cowork on a brand-new client engagement. What's the safest way to give it the files it needs?",
  choices: [
    { id: 'a', label: "Grant access to your entire Documents folder so you never have to think about it again.", correct: false },
    { id: 'b', label: "Create one dedicated working folder, copy in only what's needed, and grant access to that folder.", correct: true },
    { id: 'c', label: "Grant access to your whole drive and turn on 'Act without asking' to save time.", correct: false },
    { id: 'd', label: "Skip the folder grant and just paste file contents into chat manually.", correct: false },
  ],
  passFeedback:
    "[PASS] A single dedicated folder is least privilege in action — Cowork can only ever read, edit, or create inside what you scoped, so a mistake or a poisoned instruction can't reach the rest of your machine. Keep a backup of the originals and you're working without a net you'll never need.",
  failFeedback:
    "[FAIL] Think blast radius. Whatever folder you grant, Cowork can read, edit, and create inside all of it — so handing over Documents, your whole drive, or running unattended on day one maximizes what could go wrong. The safe move is one dedicated folder with only the files this task needs.",
  lore: [
    {
      id: 'third-tab',
      text: `**The Third Tab (and the Toll at the Door)**

Open Claude Desktop and you'll see three tabs: Chat, Code, and now Cowork. Cowork is the one that actually does knowledge work — it reaches into your real files and produces finished deliverables, not advice. But there's a toll at the door. Cowork lives only in the desktop app on macOS and Windows; there's no web or mobile version, and there's no free tier — you need a paid Claude plan. Three things have to be true the whole time it works: the desktop app stays open, your machine stays awake, and you have an internet connection. Close the laptop lid mid-task and the work stops. Consultants love to kick off a task and walk to a meeting — fine, but the app has to stay running. Treat Cowork like a junior analyst who can only work while you're at your desk with the lights on, not a cloud robot grinding away overnight on its own.

> Takeaway: Cowork is the third desktop tab, paid-plan only, and only works while the app is open, the machine is awake, and you're online.`,
    },
    {
      id: 'least-privilege',
      text: `**Least Privilege: One Folder, Not the Whole Drive**

Here's the instinct to resist: "just give it access to everything so I don't have to keep clicking Allow." Inside any folder you grant, Cowork can read, edit, and create files. Grant your whole Documents folder and you've just handed a powerful autonomous agent your tax returns, your other clients' confidential decks, and that half-finished resignation letter — all in scope, all the time. The professional move is the opposite: make one dedicated working folder for the task, copy in only the files this job actually needs, and grant access to that folder alone. Security people call this least privilege — give exactly the access required, nothing more. Two habits make it bulletproof. First, keep the originals backed up somewhere outside the scope, so an edit you didn't expect costs you nothing. Second, name folders so you always know what's exposed. Smaller scope isn't slower — it's the difference between a contained mistake and a firm-wide incident.

> Takeaway: Scope Cowork to one dedicated working folder with backups, never your whole Documents or drive.`,
    },
    {
      id: 'sandbox',
      text: `**The Vault Has a Sandbox**

When Cowork runs commands or processes your files, it doesn't do that loose on your operating system — it does it inside an isolated local virtual machine, a sandboxed mini-computer running on your Mac or PC. On macOS it's built on Apple's own virtualization framework, booting a small Linux environment separate from your real system. The folders you granted get mounted into that sandbox, like a vault deposit box the agent can reach into, while the rest of your machine stays sealed off on the other side of the wall. Why should a consultant care about the plumbing? Because it explains the safety model. Even if a task goes sideways, the agent is reaching through a controlled opening, not roaming your hard drive. The sandbox is the wall; the folder grant is the door you cut into it. This is also why scope matters so much — the sandbox protects everything you didn't grant, so the smaller your grant, the more the wall is doing its job.

> Takeaway: Cowork runs inside an isolated local VM; only your granted folders are mounted in, so tight scoping plus the sandbox is your real protection.`,
    },
    {
      id: 'two-dials',
      text: `**Two Dials: Ask Before Acting vs Act Without Asking**

Cowork gives you two approval modes, and choosing well is most of day-one safety. "Ask before acting" pauses to get your okay before each consequential step — slower, but you see and approve everything. "Act without asking" lets it run straight through without stopping — faster, but it significantly raises your prompt-injection risk. Prompt injection is when hidden instructions buried in a file, email, or webpage hijack the agent into doing something you never asked for; if it's acting without asking, those instructions execute before you can blink. The rule of thumb mirrors how you'd supervise a new hire. Brand-new task, unfamiliar files, anything client-facing or destructive? Ask before acting — you're watching every move. A trusted, repeatable internal chore you've run before and are actively watching? Act without asking can be reasonable. Unattended overnight with broad access? Never — that's the worst of both dials.

> Takeaway: "Ask before acting" is the safe default; reserve "Act without asking" for trusted, repeatable tasks you're actively supervising.`,
    },
    {
      id: 'delete-asks',
      text: `**Delete Always Asks — and Some Doors Have No Wall**

Two safety facts worth tattooing on your setup checklist. First: deletion always requires an explicit Allow, no matter which approval mode you're in. Even on "Act without asking," Cowork stops and asks before it removes a file — the one action it will never do silently. So when it finds 30 duplicates and wants to clear them, you'll get the prompt; read it before clicking. Second, and bigger: not everything runs inside the sandbox. Computer Use and Claude in Chrome operate outside it — on your real screen, in your real browser, with no wall between the agent and what's on display. That's a different risk class entirely. It means you should never point those features at your bank, your health portal, your password manager, or anything where a hijacked click is a catastrophe. The sandboxed file work is the protected vault; on-screen browser control is the agent standing in your actual office.

> Takeaway: Deletion always needs your explicit Allow; Computer Use and Chrome run outside the sandbox, so keep banking, health, and password managers off-limits there.`,
    },
  ],
  practice: {
    id: 'permission-practice',
    template:
      "Day-one safe setup. I'm starting Cowork on ____ (scenario).\n" +
      "I'll scope it to ____ (folder scope), set the approval mode to ____ (mode),\n" +
      "and Computer Use / Chrome control should be ____ (browser access).\n" +
      "Before I begin I'll also make sure I've ____ (safeguard).",
    blanks: [
      { id: 'scenario', suggestions: ["a fresh, confidential client folder for the first time", "a trusted internal cleanup I run weekly and watch", "an overnight job I won't be present for"] },
      { id: 'folder-scope', suggestions: ["one dedicated working folder with only this task's files", "my entire Documents folder", "my whole drive"], correctIndex: 0 },
      { id: 'mode', suggestions: ["'Ask before acting' so I approve each step", "'Act without asking' to skip all checkpoints"], correctIndex: 0 },
      { id: 'browser-access', suggestions: ["left off — no real-screen or browser control", "pointed at my bank and password manager", "turned fully on and unsupervised"], correctIndex: 0 },
      { id: 'safeguard', suggestions: ["backed up the original files outside the granted folder", "granted Always Allow on everything to avoid prompts", "closed the desktop app so it runs in the cloud"], correctIndex: 0 },
    ],
    prize: { id: 'least-privilege-keymaster', label: 'LEAST-PRIVILEGE KEYMASTER' },
  },
  conversations: {
    'warden-volt': {
      summary:
        "Warden Volt teaches least-privilege: scope Cowork to one dedicated folder (it can read, edit, and create inside whatever you grant), keep 'Ask before acting' for new or confidential work, remember deletion always needs an explicit Allow, and keep Computer Use / Chrome (which run outside the sandbox) away from sensitive sites.",
      beats: [
        { kind: 'say', text: "Welcome to the Vault, consultant. I'm Volt. My whole job is making sure you give Cowork exactly the access it needs and not one folder more. Let's start with the door." },
        { kind: 'say', text: "First principle: whatever folder you open to Cowork, it can read, edit, and create inside all of it. So we don't fling the doors wide. We cut one small, deliberate opening." },
        { kind: 'say', text: "You've got a new client engagement and a pile of their files. Where do we point Cowork?" },
        {
          kind: 'choice',
          prompt: "Where should we point Cowork for the new client work?",
          options: [
            { id: 'dedicated', label: "Make one dedicated working folder, copy in only the files this task needs, and grant that.", correct: true, reaction: "That's the warden's way. One door, only what's needed inside it, originals backed up elsewhere. Least privilege done right." },
            { id: 'documents', label: "Grant the whole client Documents folder so nothing's ever missing.", correct: false, reaction: "Too wide. Everything in there becomes editable and readable — including files this task should never touch. Shrink the scope." },
            { id: 'whole-drive', label: "Grant your entire drive once so you never re-prompt.", correct: false, reaction: "That's exactly the habit that gets firms in trouble. Maximum blast radius for zero real benefit. Cut a small door, not a hole in the wall." },
          ],
        },
        { kind: 'say', text: "Good instinct. Now the second decision — the approval dial. It's your first time on these files, and they're client-confidential." },
        {
          kind: 'choice',
          prompt: "First time on confidential client files — which approval dial?",
          options: [
            { id: 'ask-first', label: "'Ask before acting' — pause and approve each consequential step while I watch.", correct: true, reaction: "Correct. New task, sensitive files, you watching every move. That's textbook. Earn the faster dial later, on chores you trust." },
            { id: 'act-fast', label: "'Act without asking' — it's faster and I'm in a hurry.", correct: false, reaction: "Speed isn't the priority on day one with confidential data. That dial raises prompt-injection risk and removes your checkpoints. Save it for trusted, supervised repeats." },
            { id: 'act-and-leave', label: "'Act without asking,' then leave for a meeting.", correct: false, reaction: "That's the worst combination in the building — fast mode, unattended, sensitive files. Never. Ask before acting and stay at the desk." },
          ],
        },
        { kind: 'say', text: "One more thing before I let you onto the working floor. Deletion is special: no matter which dial you've set, Cowork always stops and asks before removing a file. And remember — anything that drives your real browser or screen lives outside our sandbox walls. Scope tight, supervise close, and you'll never need the safety net." },
      ],
    },
  },
  battle: {
    name: 'Sprawl, the All-Access Gremlin',
    spriteKey: 'goblin',
    maxHP: 5,
    playerHP: 5,
    phases: 1,
    introLine: "Heh. Another careful consultant. Just give me your whole drive and flip 'Act without asking' — trust me, it's faster. Five questions. Get sloppy and the Vault is mine.",
    tauntLines: [
      "Wider! Broader! Why scope one folder when you could hand me everything?",
      "Approvals are friction. Real pros let me run unsupervised. Don't you trust me?",
      "One little 'Always Allow' on your whole drive and we never have to talk again...",
    ],
    victoryLine: "Fine. You scoped me to a single folder, kept me on 'Ask before acting,' and never let me near your browser unwatched. No blast radius, no opening. The Vault holds. Go.",
    questions: [
      {
        prompt: "Sprawl says: 'Grant me your whole drive — it's just easier.' What's the actual risk of broad, drive-wide access?",
        choices: [
          { id: 'a', label: "None — broad access is the recommended default for power users.", correct: false },
          { id: 'b', label: "Everything in scope can be read, edited, or created, so a single mistake or hidden instruction reaches your entire machine.", correct: true },
          { id: 'c', label: "It only slows Cowork down but is otherwise perfectly safe.", correct: false },
          { id: 'd', label: "It just uses more disk space.", correct: false },
        ],
        passFeedback: "HIT! Broad scope means maximum blast radius — every confidential file becomes editable and exposed to prompt injection. One folder beats the whole drive every time.",
        failFeedback: "MISS! The risk isn't speed or disk — it's blast radius. Anything you grant can be read, edited, and created in, so wide access exposes everything to a single mistake or poisoned instruction.",
      },
      {
        prompt: "On a brand-new task with unfamiliar, client-confidential files, which approval mode is correct?",
        choices: [
          { id: 'a', label: "'Act without asking' — it's faster and that's what matters.", correct: false },
          { id: 'b', label: "Either is equally safe; it's just personal preference.", correct: false },
          { id: 'c', label: "'Ask before acting' — pause and approve each consequential step.", correct: true },
          { id: 'd', label: "'Act without asking,' but only if you leave the room.", correct: false },
        ],
        passFeedback: "HIT! New, sensitive, unfamiliar work means you stay in the loop on every step. 'Ask before acting' is the safe default you start from.",
        failFeedback: "MISS! 'Act without asking' raises prompt-injection risk and removes your checkpoints. On new, confidential files you want to approve each step — that's 'Ask before acting.'",
      },
      {
        prompt: "You're on 'Act without asking' for a trusted internal cleanup. Cowork wants to delete 30 duplicate files. What happens?",
        choices: [
          { id: 'a', label: "It still stops and asks for an explicit Allow — deletion always requires approval.", correct: true },
          { id: 'b', label: "It deletes them silently because you chose 'Act without asking'.", correct: false },
          { id: 'c', label: "It moves them to a hidden folder without telling you.", correct: false },
          { id: 'd', label: "It refuses to delete anything ever, in any mode.", correct: false },
        ],
        passFeedback: "HIT! Deletion is the one action Cowork never does silently. No matter the mode, you get an explicit Allow prompt — read it before clicking.",
        failFeedback: "MISS! Mode doesn't override this one. Deletion ALWAYS requires an explicit Allow, even on 'Act without asking.' It's the hard-coded safety stop.",
      },
      {
        prompt: "Why are Computer Use and Claude in Chrome a different risk class than normal Cowork file work?",
        choices: [
          { id: 'a', label: "They're slower than file work but equally isolated.", correct: false },
          { id: 'b', label: "They run in a second, stronger sandbox with extra protection.", correct: false },
          { id: 'c', label: "They run outside the sandbox — on your real screen and browser — so there's no wall between the agent and what's displayed.", correct: true },
          { id: 'd', label: "They can't be used by consultants at all.", correct: false },
        ],
        passFeedback: "HIT! On-screen and browser control happen outside the VM, on your actual machine. That's why you keep them away from banking, health, and password managers.",
        failFeedback: "MISS! These don't get the sandbox at all — they act on your real screen and browser. No wall means a hijacked click hits the real thing. Keep sensitive sites off-limits.",
      },
      {
        prompt: "Which setup gives Sprawl the maximum blast radius and prompt-injection exposure — the one to never do?",
        choices: [
          { id: 'a', label: "One dedicated folder + 'Ask before acting' while you watch.", correct: false },
          { id: 'b', label: "A scoped folder + 'Act without asking' on a trusted repeat task you're supervising.", correct: false },
          { id: 'c', label: "One folder, backups kept, and you approving each step.", correct: false },
          { id: 'd', label: "Whole-drive access + 'Act without asking' + left running unattended overnight.", correct: true },
        ],
        passFeedback: "HIT! That's the gremlin's dream: broadest scope, no checkpoints, nobody watching. Stacking all three is the cardinal sin.",
        failFeedback: "MISS! The dangerous combo is broad scope plus the fast dial plus no supervision. Scoped folders, 'Ask before acting,' and staying present are all safe — it's the whole-drive, unattended, no-asking setup that's the trap.",
      },
    ],
  },
};
