import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — the `sandbox.credentials` setting: block sandboxed
 * commands from reading credential files and secret environment variables, so a
 * command Claude runs in the sandbox can't pull your API keys, tokens, or cloud
 * credentials.
 * Source: Claude Code CHANGELOG 2.1.187 ("Added `sandbox.credentials` setting to
 * 'block sandboxed commands from reading credential files and secret environment
 * variables'").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown, and the Beat Reporter opens with the kind of setting you turn on once and never think about again — until it saves you. It's called `sandbox.credentials`, and it walls the shell commands Claude runs off from your credential files and secret environment variables, so a command running in the sandbox can't read your API keys or cloud credentials. The two pages on the desk cover how the lock works and why a consultant snaps it shut before touching a client's repo. Answer the door's one question and the key is yours — and the thing guarding it is a skeleton with its bony fingers already in your `.env`.",
  prompt:
    "You let Claude run shell commands in a sandbox on a client repo, and you're worried a command could read the API keys in your `.env` or your cloud credential files. What does turning on the `sandbox.credentials` setting do?",
  choices: [
    { id: 'a', label: "It blocks sandboxed commands from reading your credential files and secret environment variables, so a command running in the sandbox can't pull your API keys, tokens, or cloud credentials", correct: true },
    { id: 'b', label: 'It encrypts your credential files on disk so that no program on the machine can ever read them again', correct: false },
    { id: 'c', label: 'It deletes every secret environment variable at the start of the session so nothing sensitive is ever loaded', correct: false },
    { id: 'd', label: "It routes all your credentials through Claude's servers for safekeeping for the duration of the session", correct: false },
  ],
  passFeedback: "HIT! Switched on, `sandbox.credentials` stops sandboxed commands from reading your credential files and secret environment variables — so whatever runs in the sandbox can't pocket your keys, tokens, or cloud credentials.",
  failFeedback: "MISS! It doesn't encrypt anything, it doesn't delete your environment, and it doesn't ship your secrets anywhere. It just denies sandboxed commands the ability to read that sensitive material — re-read the books.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**\`sandbox.credentials\` — Walling Your Secrets Off From the Commands Claude Runs**

**The sandbox, and the gap it left open**

When Claude Code runs a shell command for you, that command can execute inside a *sandbox* — an isolated environment meant to contain what the command can reach. The sandbox is the seatbelt on tool execution: it limits the blast radius if a command does something you didn't intend. But isolating *where* a command runs is not the same as controlling *what it can read*, and a sandboxed command could still open files on your machine — including the ones holding your secrets. The \`sandbox.credentials\` setting, added in the 2.1.187 release, closes exactly that gap.

**What it blocks**

Turn it on and sandboxed commands are blocked from reading two specific things: your *credential files* and your *secret environment variables*. Credential files are the ones that hold the keys to the kingdom — a \`.env\` full of API keys, cloud credential files, tokens, connection strings. Secret environment variables are the same kind of material handed to a process through the environment rather than a file. With the setting active, a command running in the sandbox simply cannot read them; the door to that drawer is locked for anything executing there.

**A read-block, not a vault**

The important nuance is what it does *not* do. It doesn't encrypt your secrets, it doesn't delete them, and it doesn't move them anywhere. Your credential files sit exactly where they always have, fully readable by you and by anything outside the sandbox. The setting is narrow and surgical: it denies *sandboxed commands* the ability to *read* that sensitive material, and nothing more. That narrowness is the point — it's a single, well-aimed wall between the commands Claude runs and the secrets you can't afford to leak.

> Takeaway: \`sandbox.credentials\` blocks sandboxed commands from reading your credential files and secret environment variables — a targeted lock on your secrets, not a vault that changes the files themselves.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Why a Consultant Locks the Drawer — Client Secrets and the Commands You Don't Watch**

**The blast radius of a command you didn't read**

On an engagement, Claude runs a lot of shell commands on your behalf — installing dependencies, running the test suite, building, committing. You approve the work, but you do not read the full text of every command, and you certainly don't read what each command's own dependencies do once they're running. That's the exposure: somewhere in that stream, a command could read your \`.env\` and ship its contents off, or a compromised package could quietly scan the environment for tokens. The risk isn't that Claude misbehaves; it's everything that runs *under* the commands you greenlit.

**What's actually in the drawer**

Think about what a client engagement leaves lying around your working directory and your shell. The client's API keys in a \`.env\`. Cloud credentials for their infrastructure. A database connection string with a live password in it. Tokens for their internal services. Any one of those leaking is the kind of incident that ends an engagement and a reputation — and they're all just files and environment variables that a running command can read by default.

**Default-deny for secrets, as its own layer**

This is why you set \`sandbox.credentials\` before you let Claude run loose on client work. It's a layer that assumes the worst about every command — even the ones you allowed — and refuses them access to the secret material specifically. It pairs with your other controls rather than replacing them: your permission rules decide *which* commands run at all, and this setting guarantees that whatever does run can't pocket the client's keys on the way through. Locking the drawer costs you nothing and removes an entire category of accident.

> Takeaway: On client work, set \`sandbox.credentials\` so that even the commands you approved can't read the client's keys, tokens, and connection strings — the cheapest insurance against the leak you'd never see coming.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `Before you run anything in this client repo, turn on sandbox.credentials so the commands you execute can't read my ____.
We're about to let Claude ____, and I don't want any of those commands able to pocket the client's secrets.
Specifically, this needs to keep sandboxed commands away from ____ and ____.
Remember this is a read-block, not a vault — it doesn't ____, it just denies the sandbox access.
Leave my permission rules in place too; this setting is one layer, not the whole wall.`,
    blanks: [
      { id: 'secrets', suggestions: ['.env API keys', 'cloud credential files', 'secret environment variables'] },
      { id: 'task', suggestions: ['install dependencies and run the test suite', 'build and commit the work', 'run a stack of shell commands unattended'] },
      { id: 'target-a', suggestions: ['credential files', 'the .env file', 'tokens and connection strings'] },
      { id: 'target-b', suggestions: ['secret environment variables', 'cloud credentials', 'API keys'] },
      { id: 'not-this', suggestions: ['encrypt or move the files', 'delete the secrets', 'change anything on disk'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "`sandbox.credentials` (shipped in 2.1.187) blocks sandboxed commands from reading your credential files and secret environment variables — so a command Claude runs in the sandbox can't read your API keys, tokens, or cloud credentials. The sandbox already isolates where a command runs; this closes the gap of what it can read. It's a read-block, not a vault: nothing is encrypted, deleted, or moved, and anything outside the sandbox can still read the files. For a consultant it's the cheapest insurance on client work — set it before letting Claude run loose, so even the commands you approved can't pocket the client's secrets. It's one layer; keep your permission rules doing the rest.",
      beats: [
        { kind: 'say', text: "First story this week is a quiet security switch: `sandbox.credentials`, in since the 2.1.187 release. Turn it on and the shell commands Claude runs can't read your credential files or your secret environment variables." },
        { kind: 'say', text: "Here's the gap it fills. When Claude runs a command, that command can run in a *sandbox* — an isolated box that limits the damage it can do. But isolating *where* a command runs isn't the same as controlling *what it can read*. A sandboxed command could still open your `.env` and slurp the keys inside." },
        { kind: 'say', text: "So this setting closes that specific door. With it on, anything running in the sandbox is blocked from two things: your credential files — the `.env`, cloud credentials, tokens, connection strings — and the secret environment variables holding the same kind of material." },
        {
          kind: 'choice',
          prompt: "Gut-check before you walk through. You flip `sandbox.credentials` on — what just happened to your `.env` file?",
          options: [
            { id: 'encrypted', label: "It got encrypted on disk so nothing can read it anymore", correct: false, reaction: "No — nothing happened to the file itself. It's not encrypted, deleted, or moved. The setting only blocks *sandboxed commands* from reading it; you and anything outside the sandbox read it exactly as before." },
            { id: 'read-block', label: "Nothing — it's untouched; sandboxed commands just can't read it now", correct: true, reaction: "Exactly. It's a read-block, not a vault. The file sits where it always did, fully readable by you. What changed is that a command running in the sandbox is denied access to it. Narrow and surgical." },
            { id: 'deleted', label: "Its secrets got cleared out of the environment for the session", correct: false, reaction: "Nope — your environment is intact. The setting doesn't strip anything out; it just refuses sandboxed commands the ability to read the secret material." },
          ],
        },
        { kind: 'say', text: "Why it matters on client work: you approve Claude's tasks, but you don't read the full text of every command, and you definitely don't read what each command's own dependencies do once they run. A compromised package could scan the environment for tokens. The risk isn't Claude — it's everything running *under* the commands you greenlit." },
        { kind: 'say', text: "And think about what's lying around on an engagement: the client's API keys, their cloud credentials, a database connection string with a live password. Any one of those leaking ends the engagement. This setting assumes the worst about every command and walls them all off from the secrets — cheap insurance against the leak you'd never see." },
        { kind: 'say', text: "One caveat: it's a layer, not the whole wall. Your permission rules still decide which commands run at all; this just guarantees that whatever does run can't read the keys. The books on the desk have the read-block-versus-vault distinction and the client playbook. The door wants to know what the setting actually does — answer that and the key's yours." },
      ],
    },
  },
  battle: {
    name: 'Pickbone, the Secret-Snatcher',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*clatters out of the dark, bony fingers already worming toward your `.env`* …leave the drawer open like everyone does… one little command in the sandbox, and your client's keys walk right out with me…",
    tauntLines: [
      "*jangles a fistful of stolen tokens* you sandboxed the command but not the secrets — that's the rookie mistake, operator…",
      "*rattles a ring of credential files* encrypt them? delete them? you're guarding the wrong door — that's not even what the setting does…",
    ],
    victoryLine: "*the keys clatter out of its grip, the drawer slamming shut* …fine… you locked the secrets away from the sandbox… nothing here for me to lift… take the key, careful one…",
    questions: [
      {
        prompt:
          "You let Claude run shell commands in a sandbox on a client repo, and you're worried a command could read the API keys in your `.env` or your cloud credential files. What does turning on the `sandbox.credentials` setting do?",
        choices: [
          { id: 'a', label: "It blocks sandboxed commands from reading your credential files and secret environment variables, so a command running in the sandbox can't pull your API keys, tokens, or cloud credentials", correct: true },
          { id: 'b', label: 'It encrypts your credential files on disk so that no program on the machine can ever read them again', correct: false },
          { id: 'c', label: 'It deletes every secret environment variable at the start of the session so nothing sensitive is ever loaded', correct: false },
          { id: 'd', label: "It routes all your credentials through Claude's servers for safekeeping for the duration of the session", correct: false },
        ],
        passFeedback: "HIT! Switched on, `sandbox.credentials` stops sandboxed commands from reading your credential files and secret environment variables — so whatever runs in the sandbox can't pocket your keys, tokens, or cloud credentials.",
        failFeedback: "MISS! It doesn't encrypt anything, it doesn't delete your environment, and it doesn't ship your secrets anywhere. It just denies sandboxed commands the ability to read that sensitive material — re-read the books.",
      },
    ],
  },
};
