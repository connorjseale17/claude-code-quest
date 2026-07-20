import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — `/fork`: a command that copies your current conversation
 * into a new background session (its own row in `claude agents`) while you keep
 * working in the original session.
 * Source: Claude Code CHANGELOG 2.1.212 ("`/fork` now copies your conversation
 * into a new background session (its own row in `claude agents`) while you keep
 * working").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown, and the Beat Reporter leads with a way to be in two places in one conversation. There's a new `/fork` command: it copies your current session — every bit of context you've built up — into a fresh background session that gets its own row in `claude agents`, while you carry on uninterrupted in the original. The two pages on the desk cover exactly what the copy is and how a consultant spends it. Answer the door's one question and the key is yours — and the thing guarding it is a skeleton that splits itself in two the moment you look away.",
  prompt:
    "You run `/fork` in the middle of a working session. What has Claude actually done?",
  choices: [
    { id: 'a', label: "Copied your current conversation into a new background session — its own row in `claude agents` — while you keep working uninterrupted in the original session", correct: true },
    { id: 'b', label: "Saved a snapshot and closed your current session, so you have to switch over and resume the copy before you can do anything else", correct: false },
    { id: 'c', label: "Replaced your session with a fresh, empty one, discarding the context you'd built up so far", correct: false },
    { id: 'd', label: "Merged two of your existing sessions into a single combined transcript", correct: false },
  ],
  passFeedback: "HIT! `/fork` duplicates the conversation you're in — full context and all — into a new background session with its own `claude agents` row, and leaves you working in the original. One shared history, two live sessions.",
  failFeedback: "MISS! It doesn't close, wipe, or merge anything. It copies your current conversation into a *background* session so both the fork and the original stay alive. Re-read the books.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**\`/fork\` — Cloning a Conversation Without Leaving It**

**The problem a fork solves**

By the time you're deep in a session, you've spent real effort building context: the files Claude has read, the decisions you've made together, the shared understanding of what "done" looks like. That accumulated state is expensive. The moment you want to try a second, different direction, the old options were both bad — either derail your current thread to go explore, or open a blank session and pay to rebuild all that context from scratch.

**What the command does**

Shipped in the 2.1.212 release, \`/fork\` copies the conversation you're currently in — the whole thing, context intact — into a *new background session*. That copy shows up as its own row in \`claude agents\`, right alongside your other sessions. Crucially, the changelog is specific: this happens *while you keep working*. You don't get moved, paused, or handed off. Your original session stays right where it was, live and responsive, and a full duplicate now exists in the background carrying everything you'd built up to the instant you forked.

**One history, two live threads**

Think of it as a branch point. Up to the fork, both sessions share an identical past. After it, they're independent — what you say in one doesn't touch the other. The fork runs in the background as a separate agent you can check on, resume, or steer whenever you like, and the original never skipped a beat.

> Takeaway: \`/fork\` duplicates your current conversation, context and all, into a background session with its own \`claude agents\` row — a clean branch point that costs you nothing in the thread you're already in.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Two Roads From One Expensive Context — Why a Consultant Forks**

**The value is the context you don't rebuild**

The reason a fork matters on a client engagement is economic: the context is the costly part, and forking lets you reuse it twice. Say you've spent forty minutes getting Claude to fully understand a gnarly legacy billing module — the schema, the edge cases, the client's odd conventions. Now there are two ways forward and you genuinely don't know which is right. Without forking you'd pick one and hope, or burn another forty minutes re-establishing all that context in a second session. Fork instead, and both roads start from the same hard-won understanding.

**Explore the risky path in the background, keep the safe one live**

A fork is how you A/B a decision without gambling the main thread. Keep the conservative, presentable approach moving in your original session — the one you'd show the client — and let the fork chase the speculative refactor in the background. If the experiment pays off, you fold the insight back in; if it face-plants, you close the row and your primary deliverable never wobbled. The background session is doing real work the whole time; you're just not tethered to watching it.

**When the side-quest would have derailed you**

Forks also keep a clean record. Mid-build, the client fires off a "what would it take to also do X?" question. Rather than dragging your focused implementation session sideways to go spike an answer, fork it, chase X in the copy, and hand back a scoped answer — while the implementation thread stays exactly on task. The tangent lived and died in its own session.

> Takeaway: Fork when you've paid for context once and want two answers from it — run the risky or tangential road in the background copy and keep your primary deliverable clean and moving in the original.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `I've spent the last half hour getting this session to fully understand ____,
and now the client wants me to also explore ____ without stalling the main build.
Rather than derail this thread or rebuild all that context from scratch, run /fork
so the copy lands as its own row in claude agents and I keep working here.
I'll chase the ____ in the background fork, and if it doesn't pan out
I'll ____ — the primary deliverable in this session never has to wobble.`,
    blanks: [
      { id: 'context', suggestions: ['the legacy billing module', "the client's auth flow", 'the whole reporting pipeline'] },
      { id: 'tangent', suggestions: ['a riskier one-shot refactor', 'a second design direction', 'a "what would X cost us" spike'] },
      { id: 'experiment', suggestions: ['speculative rewrite', 'alternate approach', 'scoping question'] },
      { id: 'discard', suggestions: ['close the forked row and move on', 'abandon the background session', 'drop the experiment cleanly'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "The `/fork` command (shipped in 2.1.212) copies your current conversation — full context and all — into a *new background session* that gets its own row in `claude agents`, while you keep working uninterrupted in the original. It's a branch point: both sessions share an identical history up to the fork, then run independently. For a consultant the value is reusing expensive context twice — you A/B a risky decision by running the speculative path in the background copy while the safe, client-facing thread keeps moving in the original, and a tangent the client throws in lives and dies in its own session without derailing your build.",
      beats: [
        { kind: 'say', text: "First story this week is about being in two places in one conversation. You know how much work it takes to get a session properly up to speed — every file I've read, every decision we've made, the whole shared picture of the job. That context is the expensive part." },
        { kind: 'say', text: "New in the 2.1.212 release: the `/fork` command. Run it and I copy the conversation we're in — all of that context, intact — into a *new background session*. It lands as its own row in `claude agents`, right next to your other sessions." },
        { kind: 'say', text: "And here's the detail the changelog is careful about: it happens *while you keep working*. You don't get moved or paused. This session stays live under your hands, and a full duplicate now exists in the background, carrying everything up to the moment you forked. One shared past, two independent threads from here on." },
        {
          kind: 'choice',
          prompt: "Gut-check before the door. You're mid-session and run `/fork`. What's true a second later?",
          options: [
            { id: 'both-live', label: "Your original session is still live and unchanged, and a full copy of it is now running in the background as its own agent", correct: true, reaction: "Exactly. Nothing interrupted you. The fork is a background twin with all your context; the thread you were in never skipped a beat." },
            { id: 'switched', label: "You've been switched over to the copy and your original session is closed until you resume it", correct: false, reaction: "No — a fork doesn't move you or close anything. You keep working right where you are; the copy runs in the background." },
            { id: 'wiped', label: "Your context is wiped and both sessions start fresh from an empty slate", correct: false, reaction: "The opposite — the whole point is that the fork *keeps* your context. Nothing is wiped; the copy inherits everything." },
          ],
        },
        { kind: 'say', text: "Why you'd want that on a client's clock: the context is what costs you, so a fork lets you spend it twice. Picture forty minutes teaching me a tangled billing module — then two ways forward and no clear winner. Fork, and both roads start from that same hard-won understanding instead of you rebuilding it or gambling on one." },
        { kind: 'say', text: "The real move is A/B without risking the main thread. Keep the safe, presentable approach moving right here — the one you'd show the client — and let the fork chase the speculative refactor in the background. Pays off? Fold it in. Face-plants? Close the row, and your primary deliverable never wobbled. Same trick when the client lobs in a 'what would X cost us' — fork it, answer X in the copy, keep this build on task." },
        { kind: 'say', text: "The books have the mechanics and the consultant's playbook. The door just wants to know what `/fork` actually does the instant you run it — get that right and the key's yours. And watch the skeleton beyond it; it copies itself the second your back's turned, and it's never quite sure which one of it is real." },
      ],
    },
  },
  battle: {
    name: 'Rivener, the Forked Warden',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*the skeleton lifts its blade — and a second skeleton, identical down to the last crack, peels off its side and drifts to the shadows* …you want the key? then face both of me… one guards this door, the other guards the dark… and neither forgot a thing…",
    tauntLines: [
      "*the copy in the background mirrors every strike a half-beat late* you thought you closed the other one? it kept every memory I have, meat — you don't get to forget a fork…",
      "*both skeletons speak in unison, then argue* is the real me here, or over there? doesn't matter — we both remember teaching you this, and we both still want you gone…",
    ],
    victoryLine: "*the background twin dissolves back into the first, one history rejoining itself* …two threads, one past… you understood the branch… take the key, operator, and go be in two places…",
    questions: [
      {
        prompt:
          "You run `/fork` in the middle of a working session. What has Claude actually done?",
        choices: [
          { id: 'a', label: "Copied your current conversation into a new background session — its own row in `claude agents` — while you keep working uninterrupted in the original session", correct: true },
          { id: 'b', label: "Saved a snapshot and closed your current session, so you have to switch over and resume the copy before you can do anything else", correct: false },
          { id: 'c', label: "Replaced your session with a fresh, empty one, discarding the context you'd built up so far", correct: false },
          { id: 'd', label: "Merged two of your existing sessions into a single combined transcript", correct: false },
        ],
        passFeedback: "HIT! `/fork` duplicates the conversation you're in — full context and all — into a new background session with its own `claude agents` row, and leaves you working in the original. One shared history, two live sessions.",
        failFeedback: "MISS! It doesn't close, wipe, or merge anything. It copies your current conversation into a *background* session so both the fork and the original stay alive. Re-read the books.",
      },
    ],
  },
};
