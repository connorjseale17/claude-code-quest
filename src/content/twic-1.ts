import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — idle compaction in the terminal.
 * Claude Code keeps a prompt cache of your conversation (lifetime ~1 hour) so a
 * new message doesn't reprocess everything already said. If a large conversation
 * (200K+ tokens) is left idle for about 54 minutes, the cache is about to expire;
 * the next message would otherwise reprocess the whole thing. Idle compaction
 * condenses the conversation *before* the cache expires, so the next message
 * works on the compacted form. The 200K minimum is tunable via
 * `CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS`; `"idleCompaction": false` (settings.json)
 * or the `/config` row turns it off; the post-compaction notice says how.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.299: "Added idle compaction in the terminal: a
 *     200K+ token conversation left idle for about 54 minutes is compacted before
 *     its one-hour prompt cache expires, so your next message doesn't reprocess
 *     it all" and "Added `CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS` to change idle
 *     compaction's 200K-token minimum; `"idleCompaction": false` in settings.json
 *     turns it off."
 *   - Claude Code CHANGELOG 2.1.302: "Added an `Idle compaction` row to `/config`
 *     for turning idle compaction off or back on; the notices shown after an idle
 *     compaction now say how to turn it off"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room one of this week's rundown, and the Beat Reporter nods at a skeleton warden slumped so long at his post that the archive behind him has gone cold — step away for an hour and he makes you re-read the entire pile from the first page before he'll let you back to work. This week's lead item is the cure for exactly that: as of 2.1.299, the terminal does *idle compaction* — a conversation past 200K tokens, left idle for about 54 minutes, is condensed just before its one-hour prompt cache expires, so your next message doesn't have to reprocess the whole thing. One book covers the mechanic — why a cooling cache is what springs the squeeze; the other, why a consultant leaves it on and tunes it instead of eating the reprocessing tax. Answer the door for the key, then face Coldcache, the warden who's never once let you back in without re-reading every page.",
  prompt:
    "Your Claude Code conversation has grown past 200K tokens. You step away for about an hour, then come back to send another message. With idle compaction on, what happened while you were gone?",
  choices: [
    { id: 'a', label: "The conversation was compacted just before its one-hour prompt cache expired — so your next message works on the condensed form instead of reprocessing all 200K tokens", correct: true },
    { id: 'b', label: "Nothing — your next message reprocesses the full 200K-token conversation from scratch before Claude can reply, exactly as before", correct: false },
    { id: 'c', label: "The conversation was deleted to free the cache, so you start the next message from an empty context", correct: false },
    { id: 'd', label: "The session was locked after an hour idle and refuses new messages until you manually run `/compact`", correct: false },
  ],
  passFeedback: "HIT! Idle compaction condenses a 200K+ token conversation that's sat idle ~54 minutes, just before its one-hour prompt cache expires — so your next message skips reprocessing the whole pile.",
  failFeedback: "MISS! It doesn't reprocess everything, delete your context, or lock you out. It compacts *ahead* of the cache expiring so the next message stays cheap. Re-read Book 1.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**The Cache Goes Cold — Why Idle Compaction Fires Before the Hour Is Up**

**The prompt cache is what keeps a long session cheap**

Claude Code holds a prompt cache of your conversation so each new message doesn't have to reprocess everything you've already said. That cache has a lifespan — about an hour. While it's warm, your next message rides on top of it: fast to answer, cheap to send, because the history is already loaded and doesn't need rebuilding from the first token.

**When the cache expires, the whole pile comes back**

The catch is idleness. Step away from a big conversation — say it's grown past 200K tokens — and leave it sitting for the better part of an hour. The cache quietly cools toward expiry. Come back after it's gone and send your next message, and there's no warm cache to build on: the entire 200K-token conversation has to be reprocessed from scratch before Claude can answer. That's slow, and on a metered plan you pay for every one of those tokens again.

**Idle compaction beats the clock**

As of 2.1.299, the terminal watches for exactly this. A conversation past 200K tokens that's been idle for about 54 minutes — just shy of the one-hour cache lifetime — is compacted *before* the cache expires. The long history is condensed down while you're away, so when you return and type, your next message works on the smaller, compacted form instead of reprocessing the lot. You can move the 200K trigger with \`CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS\`, switch the whole thing off with \`"idleCompaction": false\` in settings.json or the \`Idle compaction\` row in \`/config\`, and the notice shown after a compaction tells you how to turn it off.

> Takeaway: Idle compaction condenses a big, idle conversation just before its one-hour prompt cache expires — so your next message skips reprocessing the whole history instead of rebuilding it from scratch.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Leave It On, Then Tune It — Why a Consultant Doesn't Eat the Reprocessing Tax**

**The idle gap is the normal shape of the work**

A consultant's session isn't a steady stream of typing. You brief Claude, it works, and then you're pulled into a call, a client ping, lunch, a hallway conversation — and the session sits. Come back an hour later to a big engagement conversation and, without this feature, every single return costs you a full reprocess of everything so far. The idle gap isn't an edge case you can design around; it's the rhythm of the job, and it used to be a tax you paid over and over.

**Why the default is to leave it on**

Idle compaction turns that return from expensive to cheap, and it does the work while you're away rather than while you're waiting on a reply. For most engagements you simply leave it on and never think about it: the payoff is a faster, cheaper first message every time you step back into a long session. The one thing to understand is that compaction *condenses* history — very old detail is summarized rather than kept word-for-word. That's a fair trade when the alternative is reprocessing a quarter-million tokens to preserve detail you weren't going to reread.

**When to tune it, and when to hold it off**

Two knobs matter. If your sessions routinely run smaller than 200K but you still feel the reprocess sting after a break, lower the trigger with \`CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS\` so compaction kicks in sooner. And on the rare session where you need the full, verbatim history held across a long gap — a careful audit trail, a transcript you'll quote exactly — turn it off with \`"idleCompaction": false\` or the \`/config\` row, and accept the reprocessing cost as the price of a lossless record. The default serves speed; you override it when fidelity matters more.

> Takeaway: Leave idle compaction on so returning to a long session stays cheap; lower its trigger when you still feel the sting, and switch it off only when you truly need the verbatim history preserved.`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `On a long client engagement my Claude Code conversation has grown past ____, and I keep stepping away for ____ at a time.
Without idle compaction, every time I come back my next message has to ____ before Claude can even answer.
So I leave idle compaction on: while I'm away it ____ just before the one-hour prompt cache expires.
When my sessions run smaller but the sting is still there, I lower the trigger with ____ so it kicks in sooner.
Only on a session where I need the full verbatim history do I turn it off and eat the reprocess on purpose.`,
    blanks: [
      { id: 'size', suggestions: ['200K tokens', 'a quarter-million tokens', 'the idle-compaction threshold'] },
      { id: 'gap', suggestions: ['an hour', 'the better part of an hour', 'a long client call'] },
      { id: 'cost', suggestions: ['reprocess the whole conversation', 'rebuild the entire context from scratch', 'reprocess all 200K tokens'] },
      { id: 'action', suggestions: ['condenses the history', 'compacts the conversation', 'squeezes it down ahead of the cache expiring'] },
      { id: 'knob', suggestions: ['`CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS`', 'the idle-compact minimum setting', 'a lower token threshold'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "Idle compaction in the terminal (Claude Code 2.1.299, `/config` row in 2.1.302): Claude Code keeps a prompt cache of your conversation, lifetime about an hour, so a new message doesn't reprocess everything already said. A conversation past 200K tokens left idle ~54 minutes is compacted just before that cache expires — so your next message works on the condensed form instead of reprocessing the whole 200K-token pile from scratch. It's about beating the cache clock while you're away, not reprocessing or deleting anything. Tune the 200K minimum with `CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS`; turn it off with `\"idleCompaction\": false` in settings.json or the Idle compaction row in `/config`; the post-compaction notice says how. For a consultant: the idle gap (calls, pings, lunch) is the rhythm of the job, so leave it on and get a cheap first message back every return. Compaction condenses old detail rather than keeping it verbatim — turn it off only when you need a lossless record.",
      beats: [
        { kind: 'say', text: "Lead item, room one. It's about what happens to a long conversation while you're *not* typing — the hour you're in a call and the session's just sitting there. As of 2.1.299 that idle time stopped being a tax." },
        { kind: 'say', text: "Start with the cache. I keep a prompt cache of our conversation so each new message doesn't have to reprocess everything we've already said. It lasts about an hour. While it's warm, your next message rides on top of it — fast and cheap, because the history is already loaded." },
        { kind: 'say', text: "Here's the trap. Let a big conversation — say past 200K tokens — sit idle for the better part of an hour, and that cache cools toward expiry. Come back after it's gone, send a message, and there's nothing warm to build on: the whole 200K-token pile gets reprocessed from the first token before I can answer. Slow, and you pay for every one of those tokens again." },
        {
          kind: 'choice',
          prompt: "A 220K-token conversation has sat idle while you were on a client call. Idle compaction is on. When does it do its work — and on what?",
          options: [
            { id: 'before', label: "While you're away, just before the one-hour cache expires — it condenses the conversation so your next message skips the reprocess", correct: true, reaction: "Right. It beats the clock: compacts ahead of the cache expiring, while you're idle, so the message you send on your return rides a small, condensed history instead of rebuilding 220K tokens." },
            { id: 'onsend', label: "The moment you send your next message — it reprocesses everything first, then compacts", correct: false, reaction: "That's the old cost it's avoiding. The whole point is that it fires *before* you return and *before* the cache dies — not as a reprocess at send time." },
            { id: 'wipe', label: "It clears the conversation to free the cache, so you continue from empty", correct: false, reaction: "No — nothing is wiped. It condenses the history, keeping the thread; you don't lose the conversation, you lose the reprocessing bill." },
          ],
        },
        { kind: 'say', text: "So that's the mechanic: a conversation past 200K tokens, idle about 54 minutes — just shy of the hour — gets compacted before the cache expires. Your next message works on the condensed form, not the full pile. You can move the 200K trigger with `CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS`, and turn it off entirely with `\"idleCompaction\": false` or the Idle compaction row in `/config`." },
        { kind: 'say', text: "Why it matters for you: your day isn't steady typing. It's brief me, then a call, then a client ping, then lunch — the session sits idle constantly. Without this, every return to a big engagement conversation cost a full reprocess. Leave idle compaction on and that return is cheap, every time, for free — it works while you're away, not while you're waiting." },
        { kind: 'say', text: "One honest caveat from the books: compaction *condenses*, so very old detail gets summarized rather than kept word-for-word. For almost everything that's the right trade. The exception is a session where you need the full verbatim history across a long gap — an audit trail, a transcript you'll quote exactly. Then turn it off and eat the reprocess on purpose. Grab the key — then face Coldcache, the warden who's never once let you back without re-reading every page." },
      ],
    },
  },
  battle: {
    name: 'Coldcache, the Idle Warden',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a skeleton warden creaks upright beside an archive gone grey with dust, the cache behind him long cold* …you left… you always leave… and while you were gone the fire under your conversation died, as it always does… so now you read it again, all of it, every page from the first, before I let you back to work… what's this — a *compaction* that strikes before my cache goes cold? …then say true what fires while you're away, before I make you reprocess the whole pile once more.",
    tauntLines: [
      "*rattles, gesturing at the towering stack* you'd tell me the squeeze waits for your *return* — that you reprocess the lot first and compact *after*?! no… it fires while you are gone, before the cache dies — your next message rides the condensed form, not the full pile…",
      "*bones clatter, suddenly uncertain* you think it *wipes* the conversation to cool my cache — that you come back to nothing?! never… it condenses the history, it does not erase it — the thread survives, only the reprocessing bill dies…",
    ],
    victoryLine: "*Coldcache lowers the great stack at last, the archive warm again* …it fires *before* my cache goes cold… past 200K tokens, idle an age, condensed while you're away… you need never re-read the whole pile to come back… take the key, operator, and let no idle hour tax you again.",
    questions: [
      {
        prompt:
          "Your Claude Code conversation has grown past 200K tokens. You step away for about an hour, then come back to send another message. With idle compaction on, what happened while you were gone?",
        choices: [
          { id: 'a', label: "The conversation was compacted just before its one-hour prompt cache expired — so your next message works on the condensed form instead of reprocessing all 200K tokens", correct: true },
          { id: 'b', label: "Nothing — your next message reprocesses the full 200K-token conversation from scratch before Claude can reply, exactly as before", correct: false },
          { id: 'c', label: "The conversation was deleted to free the cache, so you start the next message from an empty context", correct: false },
          { id: 'd', label: "The session was locked after an hour idle and refuses new messages until you manually run `/compact`", correct: false },
        ],
        passFeedback: "HIT! Idle compaction condenses a 200K+ token conversation that's sat idle ~54 minutes, just before its one-hour prompt cache expires — so your next message skips reprocessing the whole pile.",
        failFeedback: "MISS! It doesn't reprocess everything, delete your context, or lock you out. It compacts *ahead* of the cache expiring so the next message stays cheap. Re-read Book 1.",
      },
    ],
  },
};
