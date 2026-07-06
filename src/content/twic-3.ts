import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — Claude Sonnet 5 as the default model, arriving with a
 * native 1M-token context window: a much larger working memory, so far more of
 * your files, instructions, and conversation stay in view at once.
 * Final room — door target routes to the TwicStampScreen via currentTrack.
 * Source: Claude Code CHANGELOG 2.1.197 ("Introduced Claude Sonnet 5 as default
 * model with native 1M-token context window").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Final room of the issue, and the Beat Reporter closes on the model doing the work itself. Claude Sonnet 5 is now the default, and it arrives with a native 1M-token context window — a much larger span of everything Claude can hold in view at once. The two pages on the desk cover what a context window actually is and why a consultant can now point Claude at a whole codebase or a stack of client documents without it losing the thread. Answer the last question of the week and the key is yours — but coiled around it is a wyrm that gnaws away everything you told it more than a page ago.",
  prompt:
    "Sonnet 5 ships as the default with a native 1M-token context window. In practical terms, what does that larger context window let you do?",
  choices: [
    { id: 'a', label: 'Keep far more in view at once — whole codebases, long documents, and lengthy sessions — so Claude can reason across all of it without losing the earlier parts', correct: true },
    { id: 'b', label: 'Get faster responses, since a bigger context window is really just a speed setting', correct: false },
    { id: 'c', label: "Store your files permanently on Anthropic's servers between sessions", correct: false },
    { id: 'd', label: 'Skip giving Claude instructions entirely, because it now knows your whole project by default', correct: false },
  ],
  passFeedback: "HIT! A 1M-token context window is a much larger working memory — more of your files, instructions, and conversation stay in view at once, so Claude can reason across the whole thing instead of shedding the earliest parts.",
  failFeedback: "MISS! A bigger window isn't a speed setting, it isn't permanent cross-session storage, and it doesn't replace your instructions. It's room to hold more at once — re-read the books.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**Claude Sonnet 5 and the Native 1M-Token Context Window**

**What a context window is**

Everything Claude can "see" at one moment — your instructions, the files you've shown it, the whole back-and-forth of the session — lives inside its *context window*. Think of it as working memory: the model reasons over what's in the window and nothing outside it. It's measured in *tokens* (roughly the chunks text gets split into), and it has a ceiling. When a session runs past that ceiling, the oldest material has to fall out to make room. A bigger window is a bigger desk — more of the job spread out in front of the model at once.

**What "native 1M" changes**

Sonnet 5, introduced in the 2.1.197 release as the new default model, ships with a *native* 1M-token context window. That's a very large ceiling: whole codebases, long specifications, and hours of conversation can sit inside it together. "Native" is the operative word — the large window is how the model is built to work, not a bolt-on you have to arrange or a trick that degrades as you fill it. Sessions that used to bump the ceiling and start shedding their own early context now have far more room before that's ever a concern.

**More in view, fewer things forgotten**

The practical mechanic is simple: the more that fits in the window, the less Claude has to forget mid-task. A constraint you set at the start of a long session is still there at the end. A file you showed it an hour ago is still in view when it matters. The bigger window doesn't make the model *think* differently so much as give it more of the problem to think about at the same time.

> Takeaway: Sonnet 5 is the new default model with a native 1M-token context window — a much larger working memory, so more of your files, instructions, and conversation stay in view at once instead of falling out as the session grows.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**Point It at the Whole Thing — What 1M Tokens of Context Buys a Consultant**

**Stop chopping the work into pieces**

The old habit around a small window was rationing: feed Claude one file at a time, summarize the last document before opening the next, keep the session short so it wouldn't forget its own beginning. Every one of those workarounds costs you fidelity — a summary is lossy, and a model reasoning over three files it saw separately misses what it would catch seeing them together. A 1M-token window retires most of that ceremony. You can put the whole thing in front of it and let it reason across the lot.

**The cases that were painful are now ordinary**

Think about the analyses that used to strain a session: reviewing an entire unfamiliar codebase for a technical due-diligence, cross-referencing a long contract against its stack of amendments, reconciling a client's requirements doc against the actual implementation. Each of those wants the model to hold *many* documents at once and spot the connections between them — exactly what a narrow window couldn't do. With room to load them all together, the connection-finding that was the whole point of the engagement becomes something Claude can do in a single pass.

**Long sessions stay coherent**

There's a quieter win too. A long working session — a full day threading a single deliverable — no longer drifts as its early context silently falls out the back. The decisions you made in the morning, the constraints the client handed you, the direction you set: all still in view in the afternoon. You spend less time re-briefing Claude on things it should already know, because with this much room, it still does.

> Takeaway: A 1M-token window lets a consultant point Claude at whole codebases and stacks of client documents at once — the cross-referencing that was the point of the work stops being something you have to chop up to fit.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `Now that we're on Sonnet 5 with its 1M-token context window, stop feeding me one piece at a time.
For this ____, load the whole set at once — I can hold all of it in view.
I need to cross-reference ____ against ____, and I can only spot the connections if I see them together.
Don't pre-summarize to save room; a summary is lossy and there's space for the ____.
Keep the session going, too — the constraints you set this morning stay in view this afternoon.`,
    blanks: [
      { id: 'engagement', suggestions: ['due-diligence review', 'contract analysis', 'codebase audit'] },
      { id: 'source-a', suggestions: ['the requirements doc', 'the master contract', 'the whole repository'] },
      { id: 'source-b', suggestions: ['the actual implementation', 'the stack of amendments', 'the client spec'] },
      { id: 'full-thing', suggestions: ['full documents', 'raw files', 'complete originals'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "Claude Sonnet 5 (the new default model as of 2.1.197) arrives with a native 1M-token context window. The context window is the model's working memory — everything it can see at once, measured in tokens, with a ceiling past which the oldest material falls out. A native 1M-token window is a very large ceiling: whole codebases, long documents, and hours of conversation fit together, so Claude forgets less mid-task. For a consultant it retires the rationing — no more feeding one file at a time or pre-summarizing to save room. You can point it at an entire codebase or a stack of client documents and let it cross-reference them in one pass, and a full day's session stays coherent instead of drifting as its early context drops out. It's more room, not more speed, and not permanent cross-session storage.",
      beats: [
        { kind: 'say', text: "Last story of the week is about the model doing the work. Claude Sonnet 5 is the new default as of the 2.1.197 release, and it arrives with a *native* 1M-token context window." },
        { kind: 'say', text: "Start with what a context window even is. It's my working memory — everything I can see at one moment: your instructions, the files you've shown me, the whole conversation. It's measured in tokens, and it has a ceiling. Run a session past that ceiling and the oldest material falls out to make room. A bigger window is a bigger desk." },
        { kind: 'say', text: "'Native 1M' means that desk is now enormous — whole codebases, long specs, hours of conversation can sit on it together. Native is the key word: the big window is how the model is built to work, not a bolt-on. Sessions that used to hit the ceiling and start shedding their own beginning now have far more room before that's ever a worry." },
        {
          kind: 'choice',
          prompt: "Gut-check before the door. The bigger window is a much larger working memory. In practice, what does that let you do?",
          options: [
            { id: 'hold-more', label: "Keep far more in view at once — whole codebases, long docs, a full day's session — so I can reason across all of it", correct: true, reaction: "Right. More of the problem sits in front of me at the same time, so I forget less mid-task and can connect things I'd otherwise only see one at a time." },
            { id: 'faster', label: 'Get faster answers, since window size is really a speed setting', correct: false, reaction: "No — the window is about how much I can hold, not how fast I answer. What you gain is room, not raw speed." },
            { id: 'persist', label: 'Have me remember your project across sessions with nothing loaded', correct: false, reaction: "Not quite — the window is working memory for what's currently loaded, not permanent cross-session storage. What changed is how much fits in view at once." },
          ],
        },
        { kind: 'say', text: "Here's what it buys you on an engagement. The old habit around a small window was rationing — one file at a time, summarize before you open the next, keep sessions short. Every one of those costs fidelity: a summary is lossy, and I miss connections across files I only saw separately. This much room retires most of that." },
        { kind: 'say', text: "So the cases that used to strain a session become ordinary. Review an entire unfamiliar codebase for due-diligence. Cross-reference a long contract against its amendments. Reconcile a requirements doc against the actual implementation. All of those want me holding many documents at once — exactly what a narrow window couldn't do." },
        { kind: 'say', text: "And a long day stays coherent: the decisions you made this morning, the constraints the client gave you, all still in view this afternoon, instead of quietly dropping out the back. The books have the context-window mechanics and the point-it-at-everything playbook. The door wants to know what the bigger window lets you do — answer it, and the wyrm gives up the last key of the week." },
      ],
    },
  },
  battle: {
    name: 'Truncil, the Context-Gnawing Wyrm',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*coils around a shrinking hoard of half-remembered facts, chewing at the far end* …tell me everything, operator… I'll hold as much as I please and let the rest slip down my throat… what was it you said an hour ago? gone… repeat yourself…",
    tauntLines: [
      "*swallows the oldest file whole* summarize it for me, would you? chop it smaller? feed it one page at a time? that's how I've always kept you small…",
      "*forgets the constraint you set at the very start* faster, you think a bigger gullet makes me? no — it just means more of your work vanishes before I ever answer…",
    ],
    victoryLine: "*the hoard swells to a million tokens and nothing slips* …native… it all stays in view now… the whole codebase, the whole day, held at once… nothing left for me to gnaw… take the last key of the week…",
    questions: [
      {
        prompt:
          "Sonnet 5 ships as the default with a native 1M-token context window. In practical terms, what does that larger context window let you do?",
        choices: [
          { id: 'a', label: 'Keep far more in view at once — whole codebases, long documents, and lengthy sessions — so Claude can reason across all of it without losing the earlier parts', correct: true },
          { id: 'b', label: 'Get faster responses, since a bigger context window is really just a speed setting', correct: false },
          { id: 'c', label: "Store your files permanently on Anthropic's servers between sessions", correct: false },
          { id: 'd', label: 'Skip giving Claude instructions entirely, because it now knows your whole project by default', correct: false },
        ],
        passFeedback: "HIT! A 1M-token context window is a much larger working memory — more of your files, instructions, and conversation stay in view at once, so Claude can reason across the whole thing instead of shedding the earliest parts.",
        failFeedback: "MISS! A bigger window isn't a speed setting, it isn't permanent cross-session storage, and it doesn't replace your instructions. It's room to hold more at once — re-read the books.",
      },
    ],
  },
};
