import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — `/rewind` reaching back across a `/clear`: the command can
 * now resume your conversation from a point before you ran `/clear`, so the
 * cleared context is recoverable and `/clear` is no longer a one-way door.
 * Source: Claude Code CHANGELOG 2.1.191 ("Added `/rewind` support for resuming
 * conversation from before `/clear` was run").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2, and the Beat Reporter has a story for anyone who's ever hit a command and immediately wished they hadn't. `/rewind` can now resume your conversation from a point *before* you ran `/clear` — so the context you wiped to tidy up isn't gone for good, and `/clear` stops being a one-way door. The two pages on the desk cover how that reach-back works and how a consultant clears without fear because of it. Answer the door and the key is yours — but in here drifts the ghost of every thread you thought you'd erased.",
  prompt:
    "Twenty minutes into a session you run `/clear` to tidy up, then realize you've thrown away context you still needed. What can `/rewind` now do for you?",
  choices: [
    { id: 'a', label: "Resume the conversation from a point before you ran `/clear`, so the context you wiped comes back and `/clear` is no longer a point of no return", correct: true },
    { id: 'b', label: 'Undo the last file Claude edited on disk, reverting the change in your working tree', correct: false },
    { id: 'c', label: 'Reconnect a dropped network session and replay the API request that failed', correct: false },
    { id: 'd', label: 'Roll the model back to a previous version for the rest of the session', correct: false },
  ],
  passFeedback: "HIT! `/rewind` can now land you on a point before the `/clear`, pulling the wiped conversation back into the session — so clearing is recoverable instead of final.",
  failFeedback: "MISS! It doesn't revert a file on disk, reconnect a network session, or swap models. It resumes your *conversation* from before the `/clear` — re-read the books.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**\`/rewind\` — Reaching Back Across a \`/clear\`**

**What \`/clear\` used to cost you**

\`/clear\` wipes the current conversation so you can start fresh. It's a genuinely useful move — a long session accumulates context you no longer need, and clearing gives you a clean slate without quitting and relaunching. But it came with a quiet cost: once you cleared, the conversation you cleared away was gone for that session. If it turned out you still needed something from before the wipe, there was no walking it back. \`/clear\` was a one-way door.

**The new reach of \`/rewind\`**

\`/rewind\` is the command for returning to an earlier point in your session — stepping the conversation back to a state it was already in. The change that landed in the 2.1.191 release is *how far back it can reach*: \`/rewind\` now supports resuming the conversation from a point **before** you ran \`/clear\`. The wiped context isn't truly destroyed; \`/rewind\` can land you on the far side of the clear and bring that earlier conversation back into the session.

**\`/clear\` becomes reversible**

Put those two together and the relationship between the commands changes. \`/clear\` is still your clean slate, but it's no longer irreversible — \`/rewind\` can cross the boundary it draws. The clear you ran to tidy up, or the one you fired a beat too soon, is now something you can step back through instead of a mistake you have to live with for the rest of the session.

> Takeaway: \`/rewind\` can now resume your conversation from before a \`/clear\`, so clearing is no longer a one-way door — the context you wiped is reachable again.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Clearing Without Fear — Recovering Context Mid-Engagement**

**Why you reach for \`/clear\` in the first place**

Deep into an engagement, a single session can run for hours. The context fills with dead ends, abandoned approaches, and detail from tasks you finished long ago, and all of that noise makes Claude slower to steer and easier to confuse. \`/clear\` is how you cut it back — wipe the clutter, keep working in the same session with a fresh, focused context. The only thing that ever made it nerve-wracking was the finality: clear at the wrong moment and you'd lose a thread you needed.

**The recovery move**

That fear is what the new reach of \`/rewind\` retires. You clear to refocus and a beat later realize you've thrown out a decision, a constraint, or a chunk of reasoning you still needed — so you \`/rewind\` back across the clear, and the earlier conversation is in front of you again. The same move covers the simple slip: the \`/clear\` fired by reflex or muscle memory, recovered in seconds instead of reconstructed from your notes.

**Clear more freely, because it's cheap now**

The deeper shift is in how aggressively you can manage your own context. When clearing was a one-way door, the safe play was to hesitate and let context bloat rather than risk losing something. Now that \`/rewind\` can undo it, \`/clear\` becomes a cheap, low-stakes tool you reach for the moment a session gets cluttered — knowing that if you cut too deep, the earlier thread is one command away. Aggressive context hygiene stops being a gamble.

> Takeaway: Because \`/rewind\` can walk back a \`/clear\`, you can clear aggressively to keep a long session sharp — and recover in seconds on the times you cut too deep.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `I just ran /clear to tidy up this session and immediately realized I ____.
Don't panic — use /rewind to resume from a point before the clear, and the ____ comes back.
What I specifically need back is ____, so rewind far enough to land before I wiped it.
The lesson: /clear isn't a one-way door anymore, so I can ____ without fear.
From now on, treat clearing as cheap — if I cut too deep, rewind across it.`,
    blanks: [
      { id: 'mistake', suggestions: ['threw out context I still needed', 'cleared a beat too soon', "wiped a decision we weren't done with"] },
      { id: 'recovered', suggestions: ['earlier conversation', 'wiped context', 'thread I cleared'] },
      { id: 'needed', suggestions: ['the constraints we agreed on earlier', 'the approach we picked an hour ago', 'the reasoning behind the last change'] },
      { id: 'habit', suggestions: ['clear aggressively to keep the session focused', 'cut clutter the moment it builds up', 'manage my own context without hesitating'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "`/rewind` (capability shipped in 2.1.191) can now resume your conversation from a point before you ran `/clear`. `/clear` wipes the conversation for a fresh slate, but it used to be a one-way door — the cleared context was gone for the session. Now `/rewind` reaches across that boundary, landing you before the clear and bringing the earlier conversation back. The practical effect: `/clear` is reversible, so you can clear aggressively to keep a long engagement focused and recover in seconds when you cut too deep. It's about the *conversation*, not files on disk, network sessions, or model versions.",
      beats: [
        { kind: 'say', text: "Second story is for everyone who's ever fired a command and instantly regretted it. New capability in the 2.1.191 release: `/rewind` can now resume your conversation from a point *before* you ran `/clear`." },
        { kind: 'say', text: "Quick refresher. `/clear` wipes the current conversation so you start fresh — handy when a long session fills up with clutter. But it used to come with a sting: once you cleared, the conversation you cleared was gone for that session. A one-way door." },
        { kind: 'say', text: "`/rewind` is the command for stepping back to an earlier point in the session. What changed is how far back it reaches — it can now land you on the far side of a `/clear`, pulling that wiped conversation back. The context wasn't truly destroyed; rewind can cross the boundary the clear drew." },
        {
          kind: 'choice',
          prompt: "Put it to work. You `/clear` to tidy up, then realize you've thrown away a decision you still needed. You reach for `/rewind` — what does it bring back?",
          options: [
            { id: 'conversation', label: 'The conversation from before the clear, decision and all', correct: true, reaction: "Exactly. Rewind lands you on a point before the `/clear`, so the wiped thread — including that decision — is back in the session. The clear was recoverable after all." },
            { id: 'file', label: 'The last file Claude edited, reverted on disk', correct: false, reaction: "Different thing. `/rewind` here is about your *conversation*, not your working tree. It's bringing back the cleared context, not undoing a file change." },
            { id: 'model', label: 'The model version you were using earlier', correct: false, reaction: "No — it doesn't touch the model. It resumes the conversation from before the clear. That's the boundary it now crosses." },
          ],
        },
        { kind: 'say', text: "Here's why it matters on a long engagement. Sessions run for hours, context fills with dead ends and finished tasks, and that noise makes me slower to steer. `/clear` is how you cut it back — but the finality is what made people hesitate and let it bloat instead." },
        { kind: 'say', text: "That hesitation is what this retires. Cleared too eagerly, or by reflex? `/rewind` back across it and you're whole again in seconds, instead of reconstructing the thread from your notes. The accidental clear stops being a disaster." },
        { kind: 'say', text: "So the real shift is in how you work: clear *aggressively* now, because it's cheap. Keep the session sharp, and if you ever cut too deep, the earlier thread is one command away. The books have the reach-back mechanics and the clear-without-fear playbook. The door wants to know what `/rewind` can now do — name it and the key drops." },
      ],
    },
  },
  battle: {
    name: 'Revenant, the Ghost of the Cleared Thread',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*drifts up out of the blank screen, half-formed from words you swore you erased* …you ran `/clear` and called me gone… but nothing you wipe ever really leaves, operator…",
    tauntLines: [
      "*flickers, rearranging into the wrong memory* undo an edit? reconnect a session? no — I'm the conversation you cleared, and you're reaching for the wrong trick…",
      "*smears backward through the thread* roll the model back? that won't bring me back either — there's one command that crosses the clear, and that's not it…",
    ],
    victoryLine: "*settles into the exact thread you lost, whole again* …`/rewind`… you reached back across the clear and pulled me through… nothing erased after all… take the key…",
    questions: [
      {
        prompt:
          "Twenty minutes into a session you run `/clear` to tidy up, then realize you've thrown away context you still needed. What can `/rewind` now do for you?",
        choices: [
          { id: 'a', label: "Resume the conversation from a point before you ran `/clear`, so the context you wiped comes back and `/clear` is no longer a point of no return", correct: true },
          { id: 'b', label: 'Undo the last file Claude edited on disk, reverting the change in your working tree', correct: false },
          { id: 'c', label: 'Reconnect a dropped network session and replay the API request that failed', correct: false },
          { id: 'd', label: 'Roll the model back to a previous version for the rest of the session', correct: false },
        ],
        passFeedback: "HIT! `/rewind` can now land you on a point before the `/clear`, pulling the wiped conversation back into the session — so clearing is recoverable instead of final.",
        failFeedback: "MISS! It doesn't revert a file on disk, reconnect a network session, or swap models. It resumes your *conversation* from before the `/clear` — re-read the books.",
      },
    ],
  },
};
