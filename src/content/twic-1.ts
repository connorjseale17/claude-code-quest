import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — Self-hosted environments: `claude self-hosted-runner`
 * turns your own machines or containers into the compute where Claude Code
 * cloud sessions execute, instead of Anthropic-hosted infrastructure. Session
 * orchestration, queueing, and model inference stay with Anthropic; repository
 * checkouts, build artifacts, and secrets stay on machines you provision.
 * Sources (Claude Code CHANGELOG 2.1.224 + docs/en/self-hosted-environments):
 *   - "Added self-hosted environments: `claude self-hosted-runner` turns your
 *      own machines or containers into a place Claude Code web, mobile, and
 *      desktop sessions can run, on Team and Enterprise plans"
 *   - Runner modes: fixed (keep a set running) and on-demand (autoscaling
 *      orchestrator starts runners as sessions queue).
 *   - "A runner serves one user at a time" — locks to the first session's
 *      account so checked-out code never mixes between users.
 *   - "Repository checkouts, build artifacts, secrets, and any files a session
 *      creates or modifies stay on the machines you provision."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown, and the Beat Reporter leads with a change to *where* your work runs, not what it does. Claude Code cloud sessions — the ones you fire off from the web, the apps, or `claude --cloud` — used to execute only on Anthropic's infrastructure; now a single command, `claude self-hosted-runner`, turns your own machines or containers into the place they run. The two books cover how a runner claims and executes a session, and why a consultant under a client's compliance rules would want the execution behind their own network boundary. Answer the door's one question for the key — then face the revenant past it, a skeleton that only has power on ground it holds.",
  prompt:
    "What does `claude self-hosted-runner` actually change about a Claude Code session?",
  choices: [
    { id: 'a', label: "It runs Claude Code *cloud* sessions — the ones started from the web, the apps, or `claude --cloud` — on machines or containers your organization operates, instead of on Anthropic's infrastructure", correct: true },
    { id: 'b', label: "It routes model inference to your own GPUs, so prompts and responses never reach Anthropic's API at all", correct: false },
    { id: 'c', label: "It moves your everyday terminal and IDE sessions off your laptop onto a shared company server", correct: false },
    { id: 'd', label: "It's a local sandbox mode that cuts off all network access for the duration of a session", correct: false },
  ],
  passFeedback: "HIT! Self-hosting moves *execution* of cloud sessions inside your network. A runner you deploy claims the session, clones the repo, and runs a Claude Code process on your host. Orchestration and model inference still go to Anthropic — it's where the work runs that changes.",
  failFeedback: "MISS! Inference still uses the Anthropic API; terminal and IDE sessions already run on your own machine and aren't touched; and it isn't a network-off sandbox. What moves is where *cloud* sessions execute. Re-read Book 1.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**Self-Hosted Environments — Bringing the Session Home**

**One command, a new place to run**

The 2.1.224 line is plain: *"\`claude self-hosted-runner\` turns your own machines or containers into a place Claude Code web, mobile, and desktop sessions can run."* The key word is *cloud* session — any session that runs somewhere other than a developer's own machine: the ones started from claude.ai, the mobile and desktop apps, \`claude --cloud\`, and scheduled routines. By default those execute on Anthropic's infrastructure. Self-hosting moves that execution inside your network without changing how a developer starts a session.

**Three parts: environment, runner, session**

Self-hosting has three pieces. An *environment* is a named destination you create in claude.ai admin settings — it groups a set of runners. A *runner* is a long-lived process you deploy on hosts inside your network; the idea is a self-hosted CI runner. A *session* is one Claude Code task. When a developer starts a session, an environment picker lists yours alongside Anthropic's; pick yours and the control plane places the session on your environment's queue, a runner claims it, clones the chosen repository, and spawns a Claude Code process on your host to run it.

**Fixed fleets and on-demand runners**

You size capacity two ways. Keep a *fixed* set of runners always polling, and sessions distribute across them. Or run the *on-demand* autoscaling orchestrator, a second process you host that starts a runner as sessions queue and lets each exit when its work finishes, so capacity tracks demand. Either way one rule holds: a runner serves one user at a time — the first session locks it to that account — so one user's checked-out code never mixes with another's.

> Takeaway: \`claude self-hosted-runner\` runs Claude Code cloud sessions on infrastructure you operate — a runner claims a queued session, clones the repo, and executes it on your host — while Anthropic still handles queueing and routing.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Why a Consultant Self-Hosts — Compliance, Reach, and a Ready Runner**

**When "runs on their infrastructure" is a clause in the contract**

Book 1 covered the machinery; this is when you reach for it. Most teams are better served by Anthropic-hosted environments that need no infrastructure to run. Self-hosting earns its operational cost in one situation: a client whose network, tooling, or compliance rules require session execution to stay on infrastructure *they* control. When the engagement letter says repository checkouts and build artifacts may not leave the client's boundary, self-hosting is how you say yes without an exception.

**What actually stays inside the wall**

The line worth quoting to a nervous security lead is precise: *"Repository checkouts, build artifacts, secrets, and any files a session creates or modifies stay on the machines you provision."* Be equally precise about what still leaves — the conversation itself, prompts, responses, and tool results, goes to \`api.anthropic.com\` for model inference, and Anthropic stores the transcript so the session can resume elsewhere. Self-hosting relocates *execution*, not inference. Naming that split honestly is what keeps the client's trust when you set it up.

**Reach into the client's own systems**

There's an upside beyond compliance. Because the session runs inside the client's network, it can reach internal services, databases, and registries that were never exposed to the public internet — the very systems a migration or an audit needs to touch. And you build the runner image once, pre-installing the compilers, SDKs, and internal CLIs the engagement needs, so every session starts ready to build instead of spending its first ten minutes installing toolchains.

> Takeaway: Self-host when a client's compliance or network reality demands it — checkouts and artifacts stay on their infrastructure, sessions can reach internal systems directly, and a prepared runner image means every session starts build-ready; just be clear that inference still goes to Anthropic.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `The client's security policy says our tooling may not copy their ____ outside their network.
So instead of Anthropic-hosted sessions, I'll stand up a self-hosted environment
and deploy a ____ on hosts inside their network to execute the sessions.
I'll run it ____ so capacity tracks demand instead of idling.
Their code checkout and build artifacts stay on their machines; only the ____
still goes to Anthropic for model inference — and I'll say so plainly up front.`,
    blanks: [
      { id: 'protected-asset', suggestions: ['source repositories', 'build artifacts', 'proprietary datasets'] },
      { id: 'compute-unit', suggestions: ['runner', 'set of runners', 'runner fleet'] },
      { id: 'scaling-mode', suggestions: ['on-demand with the autoscaling orchestrator', 'as a fixed fleet', 'with runners that exit when work finishes'] },
      { id: 'leaves-boundary', suggestions: ['conversation — prompts, responses, and tool results', 'session transcript', 'model-inference traffic'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "Self-hosted environments (2.1.224): `claude self-hosted-runner` turns your own machines or containers into the place Claude Code *cloud* sessions run — the ones from the web, the apps, `claude --cloud`, and scheduled routines — instead of Anthropic-hosted infrastructure. Terminal and IDE sessions already run on the developer's machine and aren't affected. Three parts: an environment (named destination you create in claude.ai settings, grouping runners), a runner (long-lived process on your hosts, like a self-hosted CI runner, that claims a queued session, clones the repo, and spawns a Claude Code process), and the session itself. Size capacity as a fixed fleet or with the on-demand autoscaling orchestrator; a runner serves one user at a time so checkouts never mix. Compliance payoff: repository checkouts, build artifacts, secrets, and created files stay on machines you provision — but the conversation still goes to api.anthropic.com for inference, so it relocates execution, not inference. It's public beta on Team and Enterprise, off by default.",
      beats: [
        { kind: 'say', text: "Lead story this week is about *place*, not features. When you start a cloud session — from the web, the phone, `claude --cloud`, a scheduled routine — it runs on Anthropic's infrastructure by default. The 2.1.224 line hands you another option: `claude self-hosted-runner` turns your own machines or containers into a place those sessions can run." },
        { kind: 'say', text: "Three parts. An *environment* is a named destination you create in claude.ai admin settings — it groups your runners. A *runner* is a long-lived process you deploy on hosts inside your network; think self-hosted CI runner. And a *session* is one task. Start a session, pick your environment from the picker, and the control plane queues it; a runner claims it, clones your repo, and spawns a Claude Code process on your host." },
        { kind: 'say', text: "Two ways to size it. Keep a *fixed* set of runners always polling and sessions spread across them. Or run the *on-demand* orchestrator — it starts a runner as sessions queue and each one exits when its work is done, so capacity tracks demand. One rule underneath both: a runner serves one user at a time, so nobody's checkout bleeds into anyone else's." },
        {
          kind: 'choice',
          prompt: "Careful with this one — a partner will ask it. Does self-hosting mean the model runs on your hardware too?",
          options: [
            { id: 'exec-only', label: "No — execution moves to your network, but inference still goes to Anthropic's API", correct: true, reaction: "Exactly. Repo checkouts, build artifacts, and files stay on your machines; the conversation still goes to api.anthropic.com for model inference. It relocates *execution*, not inference — and saying that plainly is what keeps a client's trust." },
            { id: 'full-local', label: "Yes — prompts and responses never leave your network once you self-host", correct: false, reaction: "That's the trap. Self-hosting keeps checkouts and artifacts on your infrastructure, but the conversation still travels to api.anthropic.com for inference. Don't oversell it — name the split." },
            { id: 'no-network', label: "It cuts the session off the network entirely, like a local sandbox", correct: false, reaction: "No — a self-hosted session still reaches out. It polls Anthropic for work and calls the API for inference; the point is *where it executes*, not blocking the network." },
          ],
        },
        { kind: 'say', text: "So the compliance pitch is honest and specific. The line to quote is *repository checkouts, build artifacts, secrets, and any files a session creates or modifies stay on the machines you provision.* What still leaves is the conversation — for inference — and the transcript Anthropic stores so you can resume elsewhere. When a client's contract says their code can't leave their walls, that's how you say yes." },
        { kind: 'say', text: "And there's a bonus beyond compliance. Because the session runs *inside* their network, it can reach internal services, databases, and registries that were never exposed to the public internet — exactly what a migration or audit needs. Build the runner image once with the compilers, SDKs, and internal CLIs the job needs, and every session starts build-ready." },
        { kind: 'say', text: "The books have the full setup — the three parts, the two scaling modes, the one-user-per-runner rule, and the exact what-stays-here list. The door wants only this: what does self-hosting actually move? Answer for the key. Then square up to Homeground past it — a lich with real power only on ground it holds, betting you'll confuse *where a session runs* with *where the model lives*." },
      ],
    },
  },
  battle: {
    name: 'Homeground, the Onprem Lich',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a robed skeleton rises where the torchlight can't reach, one bony hand resting on a cold iron phylactery bolted to the floor* …you cross into ground I hold, operator… here the work runs on MY bones, in MY crypt, by MY rules… but do not mistake the crypt for the mind… name what my ground actually keeps, or stay in it forever…",
    tauntLines: [
      "*the phylactery pulses and the walls draw in* you think I host the *thinking* too? no — the thoughts still fly to the far tower… I keep the bones, not the mind…",
      "*a dry rattle rolls through the crypt* your little laptop sessions were never mine to take — those run where you sit… it is the *summoned* work I claim on my ground…",
    ],
    victoryLine: "*the lich sinks back toward its phylactery, ground yielding* …you knew the crypt from the mind… checkouts stay, inference flies… take the key, operator, and host your work where the contract demands…",
    questions: [
      {
        prompt:
          "What does `claude self-hosted-runner` actually change about a Claude Code session?",
        choices: [
          { id: 'a', label: "It runs Claude Code *cloud* sessions — the ones started from the web, the apps, or `claude --cloud` — on machines or containers your organization operates, instead of on Anthropic's infrastructure", correct: true },
          { id: 'b', label: "It routes model inference to your own GPUs, so prompts and responses never reach Anthropic's API at all", correct: false },
          { id: 'c', label: "It moves your everyday terminal and IDE sessions off your laptop onto a shared company server", correct: false },
          { id: 'd', label: "It's a local sandbox mode that cuts off all network access for the duration of a session", correct: false },
        ],
        passFeedback: "HIT! Self-hosting moves *execution* of cloud sessions inside your network. A runner you deploy claims the session, clones the repo, and runs a Claude Code process on your host. Orchestration and model inference still go to Anthropic — it's where the work runs that changes.",
        failFeedback: "MISS! Inference still uses the Anthropic API; terminal and IDE sessions already run on your own machine and aren't touched; and it isn't a network-off sandbox. What moves is where *cloud* sessions execute. Re-read Book 1.",
      },
    ],
  },
};
