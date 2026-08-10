import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — Sandbox credential masking: `mode: "mask"` for sandbox
 * credential files on Linux and WSL. The sandboxed command reads a per-session
 * *sentinel* copy of the secret; the sandbox proxy substitutes the real value
 * on egress to allowed hosts (requires network.tlsTerminate). Structured
 * options: `extract`/`onExtractNoMatch` for env values, `decode: "jwt"` with
 * `maskClaims` for JWT-aware masking, and `awsPairs`/`sigv4` for AWS SigV4
 * re-signing. Honored only from user, managed, or --settings-supplied settings.
 * Sources (Claude Code CHANGELOG 2.1.224 + docs/en/sandboxing):
 *   - "Added `mode: \"mask\"` for sandbox credential files on Linux and WSL —
 *      sandboxed commands read a sentinel copy"
 *   - "Added sandbox credential-masking options: `extract` and
 *      `onExtractNoMatch` for structured env values, `decode: \"jwt\"` with
 *      `maskClaims` for JWT-aware masking, and `awsPairs`/`sigv4` for AWS
 *      SigV4 re-signing"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2, and the Beat Reporter turns to a quieter change with sharp teeth: how the sandboxed Bash tool now handles a real secret. With `mode: \"mask\"` on Linux and WSL, a sandboxed command no longer reads your actual credential — it reads a per-session *sentinel*, a decoy that only becomes the real value as the request leaves the box for an allowed host. The two books cover the swap mechanism — sentinel in, real value on egress — and why a consultant running unattended commands on a client's keys should care. Clear the door's question for the key, then face the wraith beyond it: a ghost that wears a false face and only shows its true one at the threshold.",
  prompt:
    "With sandbox credential masking (`mode: \"mask\"`), what does a sandboxed command actually read when it accesses the secret?",
  choices: [
    { id: 'a', label: "A per-session *sentinel* value standing in for the real one; the sandbox proxy substitutes the real value only as a request leaves the box for an allowed host", correct: true },
    { id: 'b', label: "The real secret, but only after you approve a permission prompt each time the command reads it", correct: false },
    { id: 'c', label: "Nothing — the variable is left unset inside the sandbox, so any command that needs it fails fast", correct: false },
    { id: 'd', label: "An encrypted blob the command must first decrypt with a session key before it can be used", correct: false },
  ],
  passFeedback: "HIT! The command sees a sentinel — a decoy copy — never the real credential. Only when a request egresses to an allowed host does the sandbox proxy swap the sentinel for the true value. The secret is usable on the wire without ever sitting in plaintext inside the command's reach.",
  failFeedback: "MISS! There's no per-read prompt, the value isn't unset (commands still work against the sentinel), and there's no blob to decrypt. The command reads a sentinel; the proxy substitutes the real value on egress. Re-read Book 1.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**Credential Masking — The Secret the Command Never Sees**

**A decoy inside, the real thing on the way out**

The 2.1.224 line is compact but exact: *"Added \`mode: \"mask\"\` for sandbox credential files on Linux and WSL — sandboxed commands read a sentinel copy."* A *sentinel* is a per-session stand-in — a decoy string the same shape as the secret. Inside the sandbox, any command that reads the credential file gets the sentinel, not the real value. Then, when a request carrying that sentinel leaves the box for an allowed host, the sandbox proxy substitutes the true value on the wire. The command authenticates successfully; it just never held the real secret in plaintext.

**Why the proxy has to be in the path**

The swap happens at egress, which is why masking depends on the sandbox terminating TLS (\`network.tlsTerminate\`): the proxy must be able to see the outbound request to find the sentinel and replace it. And masking is only honored from user, managed, or \`--settings\`-supplied settings — not from something a session picks up mid-run — so the policy that protects the secret can't be rewritten by the work happening inside the box.

**Masking part of a value, or a claim inside a token**

Beyond whole-file masking there are structured options for when the secret is embedded. \`extract\` with \`onExtractNoMatch\` masks only the spans a regex captures inside a structured env value, leaving the rest readable. \`decode: "jwt"\` with \`maskClaims\` is JWT-aware — it masks specific claims inside a token rather than the whole string. And \`awsPairs\`/\`sigv4\` handle AWS SigV4: the proxy detects a request signed with the sentinel access key and *re-signs* it with the real credentials on the way out, so signed AWS calls still verify.

> Takeaway: With \`mode: "mask"\`, a sandboxed command reads a sentinel decoy while the sandbox proxy swaps in the real credential only on egress to allowed hosts — so the secret works on the wire without ever sitting in plaintext where the command (or a stray prompt) could read it.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Shrinking the Blast Radius — Autonomy on a Client's Keys**

**The problem masking is really solving**

Book 1 was the how; this is the why it matters on an engagement. The whole appeal of the sandboxed Bash tool is letting Claude run commands without stopping to approve each one — which means, on a client's project, unattended commands touching the client's real API keys, database credentials, and cloud secrets. The uncomfortable question a security lead asks is: what stops one of those commands, or a stray instruction that slipped into a file Claude read, from simply printing the secret or shipping it somewhere it shouldn't go? Masking is the answer that lets you keep the autonomy.

**A stolen sentinel is worthless**

Because the command only ever reads the sentinel, the plaintext credential is never in its reach to log, echo, or exfiltrate. If something inside the box grabs the value and tries to send it to an unapproved host, what it's holding is the decoy — and the proxy only performs the swap for *allowed* hosts, so the real secret never rides a request to somewhere off the allowlist. You get the reduced friction of autonomous execution without the raw key sitting in the blast radius of every command.

**Matching the tool to the credential**

The structured options are what make this practical against real client stacks rather than toy examples. A client on AWS isn't handing you a bare token — they're signing SigV4 requests, so \`awsPairs\`/\`sigv4\` re-signing is what keeps those calls working while the access key stays masked. A client whose auth is a JWT wants \`maskClaims\` to hide the sensitive claims without breaking the token's structure. Reach for masking the moment an unattended run has to authenticate against something you'd be embarrassed to find in a log.

> Takeaway: Masking lets you run autonomous, sandboxed commands against a client's real credentials while keeping the plaintext out of every command's reach — a leaked sentinel is useless, and SigV4 re-signing and JWT claim-masking make it hold up against real client auth.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `I'm letting the sandboxed Bash tool run unattended against the client's ____,
so I don't want the raw credential sitting where any command could read it.
I'll set the credential file to ____ so commands read a sentinel instead of the real value.
Because the swap happens at egress, I'll make sure ____ is on so the proxy can see the request.
Their stack signs with ____, so I'll turn on the matching re-signing option
to keep the real calls verifying while the key stays masked.`,
    blanks: [
      { id: 'target', suggestions: ['production API keys', 'cloud access credentials', 'database secrets'] },
      { id: 'mask-mode', suggestions: ['`mode: "mask"`', 'masking mode', 'the sentinel-copy mode'] },
      { id: 'tls-req', suggestions: ['`network.tlsTerminate`', 'TLS termination in the sandbox', 'the sandbox proxy in the TLS path'] },
      { id: 'auth-scheme', suggestions: ['AWS SigV4', 'a JWT', 'a signed cloud request'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "Sandbox credential masking (2.1.224): `mode: \"mask\"` on Linux and WSL means a sandboxed command reads a per-session *sentinel* copy of a secret, not the real value; the sandbox proxy substitutes the true value only on egress to an allowed host. That swap needs `network.tlsTerminate` so the proxy sits in the request path, and masking is honored only from user, managed, or --settings-supplied settings, so work inside the box can't rewrite the policy. Structured options: `extract`/`onExtractNoMatch` mask only regex-captured spans of a structured env value; `decode: \"jwt\"` with `maskClaims` masks specific JWT claims; `awsPairs`/`sigv4` re-sign AWS SigV4 requests with the real credentials on egress. The point for a consultant: run autonomous sandboxed commands against a client's real keys while the plaintext stays out of every command's reach — a leaked sentinel is worthless, and the swap only happens for allowed hosts.",
      beats: [
        { kind: 'say', text: "Second story's quieter but it's the one a security lead will thank you for. The sandboxed Bash tool lets me run commands without asking each time — great for momentum, but it means unattended commands near a client's real secrets. The 2.1.224 answer: `mode: \"mask\"` on Linux and WSL. A sandboxed command now reads a *sentinel* — a decoy copy — instead of the actual credential." },
        { kind: 'say', text: "Here's the trick. The command holds the decoy the whole time it's working. Only when a request carrying that sentinel leaves the box for an *allowed* host does the sandbox proxy swap in the real value on the wire. The call authenticates fine; the plaintext secret was never in the command's hands to log or leak." },
        { kind: 'say', text: "Two guardrails make that trustworthy. The swap happens at egress, so it needs `network.tlsTerminate` — the proxy has to be in the request path to see the sentinel and replace it. And masking is only honored from user, managed, or `--settings` config — never something the session picks up mid-run — so the work inside the box can't quietly turn the protection off." },
        {
          kind: 'choice',
          prompt: "Suppose a command inside the sandbox reads the masked key and tries to POST it to some random server that isn't on your allowlist. What actually goes out?",
          options: [
            { id: 'sentinel', label: "The sentinel — the decoy — because the proxy only swaps in the real value for allowed hosts", correct: true, reaction: "Right. The command only ever had the decoy, and the substitution happens only on egress to an *allowed* host. Send it somewhere off the allowlist and the real secret never rides along. A stolen sentinel is worthless." },
            { id: 'real', label: "The real secret, because masking only hides it at rest, not in flight", correct: false, reaction: "No — masking is exactly about in-flight. The command holds a sentinel, and the proxy substitutes the true value only for allowed hosts. An unapproved host gets the decoy." },
            { id: 'blocked', label: "Nothing — masking blocks every outbound request that carries a credential", correct: false, reaction: "Not quite. Masking doesn't block traffic; the allowlist governs which hosts are reachable. What masking guarantees is that the *real* value is only ever substituted for allowed hosts — elsewhere the sentinel goes out harmless." },
          ],
        },
        { kind: 'say', text: "And it's built for real client stacks, not toy tokens. `extract` with `onExtractNoMatch` masks just the regex-captured spans of a structured value. `decode: \"jwt\"` with `maskClaims` hides specific claims inside a token without breaking its shape. And `awsPairs`/`sigv4` handle AWS: the proxy spots a request signed with the sentinel access key and *re-signs* it with the real credentials on the way out, so SigV4 calls still verify." },
        { kind: 'say', text: "So the play is: reach for masking the moment an unattended run has to authenticate against a client credential you'd hate to find in a log. You keep the autonomy of sandboxed Bash, and the raw key stays out of the blast radius of every command it runs." },
        { kind: 'say', text: "Books have the full swap mechanism and all the structured options. The door wants one thing: what does the command actually *read* under masking? Answer it for the key. Then face Falseface past the arch — a wraith that wears a decoy over its real face and only lets the true one show at the threshold going out. It's betting you think the mask comes off inside." },
      ],
    },
  },
  battle: {
    name: 'Falseface, the Sentinel Wraith',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a pale shape drifts up wearing a blank porcelain face, and behind it something truer flickers and hides* …look all you like, operator… what you *read* of me is a decoy worn for the room… my real face shows only at the threshold, only to those I'm let out to… tell me what you actually see in here, or wear a false face of your own forever…",
    tauntLines: [
      "*the porcelain face tilts, unbroken* you reached for the truth inside the box? there is none here — only the stand-in… the real value waits at the door…",
      "*a cold laugh behind the mask* you'd carry my decoy to a stranger's gate and call it a theft? go on — it's worth *nothing* off the list I'm let out to…",
    ],
    victoryLine: "*the porcelain face dissolves; the true one turns, briefly, and is gone* …you knew the decoy from the real, and where the swap is made… take the key, operator, and let no raw secret sit where a command can read it…",
    questions: [
      {
        prompt:
          "With sandbox credential masking (`mode: \"mask\"`), what does a sandboxed command actually read when it accesses the secret?",
        choices: [
          { id: 'a', label: "A per-session *sentinel* value standing in for the real one; the sandbox proxy substitutes the real value only as a request leaves the box for an allowed host", correct: true },
          { id: 'b', label: "The real secret, but only after you approve a permission prompt each time the command reads it", correct: false },
          { id: 'c', label: "Nothing — the variable is left unset inside the sandbox, so any command that needs it fails fast", correct: false },
          { id: 'd', label: "An encrypted blob the command must first decrypt with a session key before it can be used", correct: false },
        ],
        passFeedback: "HIT! The command sees a sentinel — a decoy copy — never the real credential. Only when a request egresses to an allowed host does the sandbox proxy swap the sentinel for the true value. The secret is usable on the wire without ever sitting in plaintext inside the command's reach.",
        failFeedback: "MISS! There's no per-read prompt, the value isn't unset (commands still work against the sentinel), and there's no blob to decrypt. The command reads a sentinel; the proxy substitutes the real value on egress. Re-read Book 1.",
      },
    ],
  },
};
