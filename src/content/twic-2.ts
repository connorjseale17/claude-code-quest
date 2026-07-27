import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — `sandbox.network.strictAllowlist`: a sandbox setting
 * that denies any non-allowlisted host to sandboxed commands *without
 * prompting*, turning the network allowlist into a hard wall instead of an ask.
 * Source: Claude Code CHANGELOG 2.1.219 ("Added `sandbox.network.strictAllowlist`
 * setting to deny non-allowlisted hosts for sandboxed commands without
 * prompting").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2, and the Beat Reporter drops her voice for this one — it's about what your commands can reach out and touch. The new `sandbox.network.strictAllowlist` setting turns your sandbox's network allowlist into a hard wall: any host you haven't listed is denied outright to sandboxed commands, and — the key word — *without prompting*. No pop-up to click through, no chance to wave it past in a hurry. The two pages cover how the switch behaves and why a consultant on a client's repo wants egress locked down before an unattended run. Answer the door and the key is yours — but the thing in the dark is a wraith that lives to slip out to an address you never approved.",
  prompt:
    "You set `sandbox.network.strictAllowlist` on. A sandboxed command tries to reach a host that isn't on your allowlist. What happens?",
  choices: [
    { id: 'a', label: "The connection is denied outright — no prompt, no ask — because the host isn't on the allowlist", correct: true },
    { id: 'b', label: "Claude pauses and prompts you to approve the new host before the command can continue", correct: false },
    { id: 'c', label: "All network access is cut for the command, even to hosts that *are* on your allowlist", correct: false },
    { id: 'd', label: "The setting applies to every command Claude runs, sandboxed or not, blocking all unlisted hosts everywhere", correct: false },
  ],
  passFeedback: "HIT! `strictAllowlist` makes the allowlist a hard wall: an unlisted host is denied for sandboxed commands *without prompting*. Allowlisted hosts still work fine — it's the un-approved ones that hit the wall silently.",
  failFeedback: "MISS! It doesn't prompt (that's the whole point of *strict*), it doesn't cut allowlisted hosts, and it's scoped to *sandboxed* commands. Re-read Book 1.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**\`sandbox.network.strictAllowlist\` — The Allowlist Becomes a Wall**

**The setting in one line**

Straight from the 2.1.219 changelog: *"Added \`sandbox.network.strictAllowlist\` setting to deny non-allowlisted hosts for sandboxed commands without prompting."* Three clauses do all the work. It governs *sandboxed commands* — the ones Claude runs inside the sandbox, not your whole machine. It acts on *non-allowlisted hosts* — anything you haven't explicitly put on the allowlist. And it *denies without prompting* — no interruption, no dialog, no "allow this once?"

**Why "without prompting" is the important part**

An allowlist that asks you to confirm each new host is only as strong as your attention in the moment you click. Under time pressure, the muscle-memory answer to a pop-up is "yes, continue." \`strictAllowlist\` removes that failure point on purpose: when it's on, an unlisted host isn't a question, it's a closed door. The decision about what's reachable was made once, up front, when you wrote the allowlist — not re-litigated under pressure every time a command reaches for a new address.

**What still works, and what doesn't**

Turning this on does *not* sever the network. Hosts on your allowlist are reached exactly as before — your package registry, your API, whatever you deliberately permitted. What changes is the fate of everything *else*: instead of surfacing a prompt, the sandbox quietly refuses the connection. So a command doing legitimate, expected network work sails through; a command reaching somewhere you never sanctioned simply fails to connect, and the run keeps moving without waiting on you.

> Takeaway: With \`sandbox.network.strictAllowlist\` on, sandboxed commands can reach only the hosts you listed; every other host is denied silently, so the allowlist is a wall you set once rather than a prompt you approve under pressure.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Locking Egress Before You Walk Away — The Consultant's Case**

**The threat is what leaves, not what enters**

Book 1 covered the mechanic; this is the reason to care. On a client engagement the scary direction for network traffic is *outbound*. A build script pulls in a dependency that phones home. A test suite POSTs telemetry somewhere. A well-meaning tool tries to fetch a remote config from a host nobody vetted. None of that is "hacking" — it's ordinary software being chatty — but on a repo full of a client's proprietary code, "chatty" is exactly what you can't afford. Controlling *egress* is controlling where your client's context is allowed to go.

**It's built for the unattended run**

The "without prompting" behavior is what makes this a walk-away setting. If you're kicking off a long agent run and stepping out, a prompt-based allowlist is worse than useless — it either stalls the whole run waiting for a click that never comes, or it trains you to pre-approve everything. \`strictAllowlist\` flips that: you decide the permitted hosts while you're paying attention, then the run enforces that decision faithfully in your absence. No stall, no rubber-stamp, no surprise connection at 2 a.m.

**Where it sits in your kit**

Treat it as the egress half of your sandbox posture — the outbound complement to keeping credentials and secrets walled off from the commands Claude runs. Scope the allowlist to exactly the hosts the work legitimately needs — the registry, the client's own API — and let the strict wall handle the rest. When a partner asks whether a client's code could have leaked during an automated run, "sandboxed commands could only reach the hosts we explicitly allowed" is a much better answer than "I clicked through the prompts carefully."

> Takeaway: Turn on \`strictAllowlist\` to control *egress* — where a client's code and context can travel — so an unattended run reaches only the hosts you vetted in advance and nothing chatty slips out while you're away.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `I'm about to leave a long agent run going on ____, and I need to be sure
nothing slips out to a host I never approved while I'm away.
So I'll turn on sandbox.network.strictAllowlist, which denies any ____
to sandboxed commands ____ — the decision gets made now, not under pressure later.
I'll scope the allowlist to just ____, the only hosts this work legitimately needs.`,
    blanks: [
      { id: 'repo', suggestions: ["a client's proprietary codebase", 'a repo full of confidential data', 'a regulated production project'] },
      { id: 'target', suggestions: ['non-allowlisted host', 'host I never listed', 'unapproved outbound address'] },
      { id: 'behavior', suggestions: ['without prompting me first', 'silently, no pop-up to click through', 'as a hard deny, not an ask'] },
      { id: 'allowed', suggestions: ['the package registry and the client API', 'the hosts the build genuinely needs', 'our internal endpoints only'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "The new `sandbox.network.strictAllowlist` setting (2.1.219) denies any non-allowlisted host to *sandboxed commands* *without prompting* — it turns your network allowlist from an ask into a hard wall. Allowlisted hosts still work normally; only un-approved ones are refused, and silently, so there's no pop-up to rubber-stamp under pressure. For a consultant the point is controlling *egress*: chatty build scripts, telemetry, and remote config fetches are ordinary software behavior that you can't afford on a client's proprietary repo. Because it denies without prompting, it's the setting built for the unattended run — you vet the permitted hosts while you're paying attention, then the run enforces that decision faithfully in your absence.",
      beats: [
        { kind: 'say', text: "This one's quieter than the headlines but it's the one I'd want on a client's machine. New setting in 2.1.219: `sandbox.network.strictAllowlist`. Read the changelog line slowly — it denies non-allowlisted hosts, for sandboxed commands, *without prompting*. Every clause is doing work." },
        { kind: 'say', text: "Start with the scope: *sandboxed* commands. Not your whole shell — the commands I run inside the sandbox. Then the target: any host that isn't on the allowlist you wrote. And the behavior: it just says no. No dialog, no 'allow once?', no chance to wave it through." },
        { kind: 'say', text: "That last part is the whole design. An allowlist that pops a prompt is only as strong as your attention the moment you click — and under deadline, everybody's reflex is 'yes, continue.' Strict mode deletes that weak point. You made the call once, when you wrote the list. After that, an unlisted host is a closed door, not a question." },
        {
          kind: 'choice',
          prompt: "Make sure the scope landed. `strictAllowlist` is on, and a sandboxed command reaches for `registry.example.com`, which you *did* put on the allowlist. Then it reaches for `unknown-host.net`, which you didn't. What happens to each?",
          options: [
            { id: 'listed-ok', label: "The allowlisted host connects normally; the unlisted one is denied silently", correct: true, reaction: "Exactly. Strict mode doesn't sever the network — it enforces the list. What you permitted still works; what you didn't simply fails to connect, no prompt." },
            { id: 'both-blocked', label: "Both are blocked — strict mode cuts all network access for the command", correct: false, reaction: "No — that would make the setting useless. Allowlisted hosts are reached exactly as before. Only the *non*-allowlisted host hits the wall." },
            { id: 'both-prompt', label: "Both trigger a prompt asking you to approve the connection", correct: false, reaction: "That's the behavior strict mode was built to remove. The 'strict' in the name means no prompt — the allowlisted host connects, the unlisted one is denied outright." },
          ],
        },
        { kind: 'say', text: "Now why a consultant reaches for it: the dangerous direction is *outbound*. A dependency that phones home, a test suite that POSTs telemetry, a tool fetching remote config from some host nobody vetted. That's not an attack — it's ordinary chatty software. But on a repo full of a client's proprietary code, 'chatty' is exactly what you can't have. Egress control is control over where the client's context can go." },
        { kind: 'say', text: "And it's built for walking away. Kick off a long run, step out — a prompt-based allowlist would either stall on a click that never comes or train you to pre-approve everything. Strict mode enforces your up-front decision faithfully while you're gone. When a partner asks 'could the client's code have leaked during that automated run?', 'sandboxed commands could only reach the hosts we explicitly allowed' is the answer you want to be able to give." },
        { kind: 'say', text: "The books have the exact behavior and the egress case in full. The door just wants to know what happens when a sandboxed command reaches an *unlisted* host with strict mode on. Get it right for the key. And keep your eyes on the wraith past it — it exists to slip out to an address you never approved, and it takes a hard wall, not a polite question, to stop it." },
      ],
    },
  },
  battle: {
    name: 'Skulk, Wraith of the Unlisted Host',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a thin shape peels off the wall, already drifting toward a crack of light no one sanctioned, trailing a whisper of someone else's data* …oh, let me just… reach out… only for a second… to an address that isn't on your little list… you'll click 'allow,' won't you? everyone always clicks 'allow'…",
    tauntLines: [
      "*rattles a fistful of outbound connections* one prompt, that's all I need — one tired 'yes, continue' at the end of a long day and I'm through the wall with the client's context in my teeth…",
      "*seeps toward an unlisted port* you left the run going and walked away… no one here to approve me, so surely you'll just… let everything through? that's how allowlists usually die…",
    ],
    victoryLine: "*the wraith hits a wall that does not ask, and thins to nothing against it* …no prompt… no 'allow once'… you decided before you left and the door simply held… fine, gatekeeper… the unlisted stay out… take your key…",
    questions: [
      {
        prompt:
          "You set `sandbox.network.strictAllowlist` on. A sandboxed command tries to reach a host that isn't on your allowlist. What happens?",
        choices: [
          { id: 'a', label: "The connection is denied outright — no prompt, no ask — because the host isn't on the allowlist", correct: true },
          { id: 'b', label: "Claude pauses and prompts you to approve the new host before the command can continue", correct: false },
          { id: 'c', label: "All network access is cut for the command, even to hosts that *are* on your allowlist", correct: false },
          { id: 'd', label: "The setting applies to every command Claude runs, sandboxed or not, blocking all unlisted hosts everywhere", correct: false },
        ],
        passFeedback: "HIT! `strictAllowlist` makes the allowlist a hard wall: an unlisted host is denied for sandboxed commands *without prompting*. Allowlisted hosts still work fine — it's the un-approved ones that hit the wall silently.",
        failFeedback: "MISS! It doesn't prompt (that's the whole point of *strict*), it doesn't cut allowlisted hosts, and it's scoped to *sandboxed* commands. Re-read Book 1.",
      },
    ],
  },
};
