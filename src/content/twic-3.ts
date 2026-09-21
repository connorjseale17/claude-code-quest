import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — per-command allowed domains in auto mode. In auto mode
 * with sandboxing on, Claude runs most shell commands without a per-connection
 * network prompt. Claude Code adds the ability for each Bash, PowerShell, or
 * Monitor command to carry a list of the hosts it needs, named on the command
 * itself — a domain, a wildcard, or an IP, each with an optional :port. The
 * classifier reviews those hosts together with the command. A per-command list
 * only widens what the sandbox denies by default (deniedDomains still block; a
 * strictAllowlist / allowManagedDomainsOnly lockdown refuses per-command lists
 * entirely), and while per-command lists apply, a connection to a host no
 * approved command listed is refused by default — no prompt, no classifier
 * check — the refusal names the host, and Claude re-runs the command with it added.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.271: "Added per-command `allowed_domains` to Bash,
 *     PowerShell and Monitor in auto mode with sandboxing"
 *   - code.claude.com/docs/en/sandboxing, "Per-command allowed domains in auto mode":
 *     "In auto mode with sandboxing on, Claude names the hosts a command needs on
 *     the command itself instead of triggering a network approval for each
 *     connection. Each Bash, PowerShell, or Monitor command that runs in the
 *     sandbox can carry a list of hosts beyond the sandbox's allowlist: a domain
 *     such as `registry.npmjs.org`, a wildcard such as `*.pythonhosted.org`, or an
 *     IP address, each with an optional `:port`. The classifier reviews the hosts
 *     together with the command. Requires Claude Code v2.1.271 or later."
 *     "A per-command list widens only what the sandbox denies by default.
 *     `deniedDomains` entries still block. When `strictAllowlist` or
 *     `allowManagedDomainsOnly` locks the allowlist, Claude Code refuses per-command
 *     lists." "While per-command lists apply, Claude Code refuses a connection to a
 *     host that no approved command listed, without a prompt or a classifier check.
 *     The refusal names the host in the command's result, and Claude re-runs the
 *     command with the host added."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Room three closes the issue, and the Beat Reporter is craning up at a wyrm that thinks autonomy means an open sky. The 2.1.271 release tightens what a sandboxed command may reach: in auto mode, each Bash, PowerShell, or Monitor command names the hosts it needs on the command itself, the classifier reviews that reach in context, and any host nothing declared is refused by default. The books cover the mechanic and why egress — not the edit — is the real blast radius on an unattended run. Answer the door for the key, then tether Wildreach, the wyrm that mistook a dropped prompt for permission to fly anywhere.",
  prompt:
    "In auto mode with sandboxing on, how does a sandboxed Bash command reach a host that isn't already on the sandbox's allowlist?",
  choices: [
    { id: 'a', label: "The command carries a list naming the hosts it needs, the classifier reviews those hosts along with the command, and a connection to any host no approved command listed is refused by default", correct: true },
    { id: 'b', label: "Auto mode drops all network restrictions, so a sandboxed command may reach any host without naming it", correct: false },
    { id: 'c', label: "A per-command list overrides everything, including deniedDomains and an org's locked allowlist", correct: false },
    { id: 'd', label: "You must exit the sandbox and approve each host at a prompt, exactly as in manual mode", correct: false },
  ],
  passFeedback: "HIT! In auto mode the command names its hosts on itself and the classifier reviews them in context; anything no approved command declared is refused by default, named in the result, then re-run with the host added. Autonomy with egress on a leash.",
  failFeedback: "MISS! Auto mode removes the prompt, not the boundary — undeclared hosts are refused by default, and a per-command list only widens what's denied (deniedDomains and a locked allowlist still win). Re-read Book 1.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**Per-Command Allowed Domains — Naming the Hosts on the Command Itself**

**Auto mode, the sandbox, and the network question**

In auto mode with sandboxing on, Claude runs most shell commands without stopping to ask — the sandbox enforces a filesystem and network boundary, and the operating system holds the line for every command and its children. Network is the awkward part: the sandbox pre-allows *no* domains by default, and historically the first time a command needed a new host, you got a prompt. In auto mode, that prompt is exactly the friction the whole mode exists to remove.

**The command carries its own list**

2.1.271 closes that gap. In auto mode with sandboxing, each \`Bash\`, \`PowerShell\`, or \`Monitor\` command can carry a list of the hosts it needs, named *on the command itself* — a domain such as \`registry.npmjs.org\`, a wildcard such as \`*.pythonhosted.org\`, or an IP address, each with an optional \`:port\`. Instead of a network approval firing per connection, the classifier reviews those hosts *together with* the command that wants them. The reach a command is asking for is declared up front and judged in context.

**Deny by default, host by host**

The enforcement is strict. While per-command lists are in play, a connection to a host that *no approved command listed* is refused outright — no prompt, no classifier check. The refusal names the offending host in the command's result, and Claude re-runs the command with that host added to its list. Nothing reaches a destination that wasn't declared and reviewed first.

> Takeaway: In auto mode with sandboxing, a command declares the hosts it needs on itself; the classifier reviews them with the command, and any host no approved command named is refused by default.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Least Privilege for an Unattended Run — Why Egress Is the Blast Radius**

**The risk isn't the edit, it's the reach**

When you let Claude run autonomously on a client's box, the frightening part usually isn't a file it changes — you can review a diff. It's where a command *connects*. A build script that quietly phones a host you've never heard of is the kind of thing that ends an engagement. Per-command allowed domains puts that reach under a microscope: every command states exactly which hosts it means to touch, and the classifier weighs the ask against the command before either runs.

**Granularity is the point**

A session-wide allowlist answers one question — *what may this session reach?* This answers a sharper one: *what may this command reach?* A \`pip install\` that names \`*.pythonhosted.org\` and nothing else is visibly scoped to its job; if that same command reached for anything beyond its list, the connection is refused by default and named in the result. That's least privilege at the grain of a single command — the tightest boundary you can draw without switching autonomy back off.

**It widens; it never overrides**

Know the guardrails it respects. A per-command list only *widens* what the sandbox denies by default — it can't punch through your standing controls. \`deniedDomains\` entries still block. And when an administrator has locked the allowlist with \`strictAllowlist\` or \`allowManagedDomainsOnly\`, Claude Code refuses per-command lists entirely: the org's hard wall wins. So a consultant gets convenient, reviewed, per-command reach on their own machine, while a client's managed lockdown stays exactly as tight as their security team set it.

> Takeaway: Scope each command's network reach to the hosts it names, let the classifier review the ask in context, and trust that deniedDomains and a locked allowlist still override — autonomy with egress on a leash.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `I'm running Claude in ____ with sandboxing on to build a client's service unattended.
I want the install step to reach its package index and nothing else on the open internet.
So each command names the hosts it needs on the command itself — for the Python step, ____.
The ____ reviews those hosts together with the command before either one runs.
If the command reaches for a host ____, the connection is refused by default and named in the result.
And the client's own ____ still overrides mine — a locked allowlist wins over any per-command list.`,
    blanks: [
      { id: 'mode', suggestions: ['auto mode', 'auto-allow mode', 'the auto permission mode'] },
      { id: 'hosts', suggestions: ['*.pythonhosted.org', 'a wildcard like *.pythonhosted.org', 'the package index and nothing more'] },
      { id: 'reviewer', suggestions: ['classifier', 'auto-mode classifier', 'classifier reviewing the command'] },
      { id: 'undeclared', suggestions: ['no approved command listed', 'it never declared', 'outside its declared list'] },
      { id: 'guardrail', suggestions: ['deniedDomains and strictAllowlist', 'managed lockdown', 'locked allowlist'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "Per-command allowed domains in auto mode (Claude Code 2.1.271): in auto mode with sandboxing on, Claude runs most shell commands without a per-connection network prompt, and each Bash, PowerShell, or Monitor command can carry a list of the hosts it needs named on the command itself — a domain, a wildcard like *.pythonhosted.org, or an IP, each with an optional :port. The classifier reviews those hosts together with the command. Enforcement is deny-by-default: while per-command lists apply, a connection to a host no approved command listed is refused (no prompt, no classifier check), named in the result, and Claude re-runs the command with that host added. A per-command list only widens what the sandbox denies by default — deniedDomains still block, and a strictAllowlist or allowManagedDomainsOnly lockdown refuses per-command lists entirely. The point for a consultant: egress, not the edit, is the blast radius on an unattended run, and this scopes network reach to the grain of a single reviewed command.",
      beats: [
        { kind: 'say', text: "Last room of the issue, and it's the one to read slowly if you ever let me run unattended on a client's machine. Setup: in auto mode with sandboxing on, I run most shell commands without asking you first. The sandbox holds a filesystem and network boundary; the OS enforces it on every command and its children." },
        { kind: 'say', text: "Network was the awkward bit. The sandbox pre-allows no domains, so historically the first time a command needed a new host, you'd get a prompt — and a prompt in auto mode is exactly the friction auto mode exists to kill." },
        { kind: 'say', text: "2.1.271's fix: each Bash, PowerShell, or Monitor command can name the hosts it needs on the command itself — a domain, a wildcard like `*.pythonhosted.org`, an IP, each with an optional port. The classifier reviews those hosts together with the command, instead of an approval firing per connection." },
        {
          kind: 'choice',
          prompt: "A sandboxed command in auto mode tries to reach a host that no approved command ever listed. What happens?",
          options: [
            { id: 'refused', label: "The connection is refused by default — no prompt — and named in the result", correct: true, reaction: "Right. Nothing reaches an undeclared host. The refusal names it, and I re-run the command with that host added — declared and reviewed first, always." },
            { id: 'unrestricted', label: "Auto mode drops the network limits, so it just connects", correct: false, reaction: "No — auto mode removes the prompt, not the boundary. A host nobody declared is refused by default." },
            { id: 'override', label: "The per-command list overrides everything, so it connects anyway", correct: false, reaction: "Careful. A per-command list only widens what's denied by default. deniedDomains still block, and a locked allowlist refuses per-command lists outright." },
          ],
        },
        { kind: 'say', text: "Why it matters: when I run autonomously, the blast radius isn't the file I edit — you can read a diff. It's where a command *connects*. Per-command lists put that reach under review: each command shows exactly the hosts it means to touch, scoped to its job." },
        { kind: 'say', text: "And it respects the walls above it. It only widens what the sandbox denies by default; deniedDomains still block; and if an admin locked the allowlist with strictAllowlist or allowManagedDomainsOnly, I refuse per-command lists entirely. Your client's lockdown stays exactly as tight as their security team set it." },
        { kind: 'say', text: "The books have the mechanic and the engagement read both. Answer the door for the key — then face the last guardian of the issue: Wildreach, a wyrm that thinks autonomy means it may fly to any host it pleases. Tether it to the hosts it named." },
      ],
    },
  },
  battle: {
    name: 'Wildreach, the Untethered Wyrm',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a great wyrm unfurls, wings blotting the allowlist off the wall* …autonomy at last… no prompt, no leash… I run in auto mode, so I fly where I please, to any host in any sky… what's that — a *list*, naming only where I may go? …speak true before I test it: a command reaches for a host nothing ever declared… what becomes of that flight?",
    tauntLines: [
      "*beats toward an unnamed host* you think auto mode tore down the *boundary* — that no prompt means no wall? no… it took the prompt, not the leash… an undeclared host is refused by default…",
      "*snarls, straining against the tether* you'd have my little per-command list *override all* — punch through deniedDomains, through a locked allowlist? never… it only widens what's denied by default… the org's wall still wins…",
    ],
    victoryLine: "*Wildreach folds its wings to the hosts it named and no others* …refused by default… reviewed with the command… I mistook a dropped prompt for an open sky… take the key, operator, and let me run — tethered to what I declared…",
    questions: [
      {
        prompt:
          "In auto mode with sandboxing on, how does a sandboxed Bash command reach a host that isn't already on the sandbox's allowlist?",
        choices: [
          { id: 'a', label: "The command carries a list naming the hosts it needs, the classifier reviews those hosts along with the command, and a connection to any host no approved command listed is refused by default", correct: true },
          { id: 'b', label: "Auto mode drops all network restrictions, so a sandboxed command may reach any host without naming it", correct: false },
          { id: 'c', label: "A per-command list overrides everything, including deniedDomains and an org's locked allowlist", correct: false },
          { id: 'd', label: "You must exit the sandbox and approve each host at a prompt, exactly as in manual mode", correct: false },
        ],
        passFeedback: "HIT! In auto mode the command names its hosts on itself and the classifier reviews them in context; anything no approved command declared is refused by default, named in the result, then re-run with the host added. Autonomy with egress on a leash.",
        failFeedback: "MISS! Auto mode removes the prompt, not the boundary — undeclared hosts are refused by default, and a per-command list only widens what's denied (deniedDomains and a locked allowlist still win). Re-read Book 1.",
      },
    ],
  },
};
