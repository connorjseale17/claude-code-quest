import type { LessonContent } from './types';

/**
 * Claude Cowork Quest — Module 3: The Briefing Room.
 * Brief Cowork like a sharp analyst: outcome over steps, rich context, and a
 * read-back before it acts. Ids match buildCowork3Level() in roomConfigs.ts.
 */
export const cowork3Content: LessonContent = {
  roomId: 'briefing-room',
  intro:
    "Welcome to the Drafting Room — orange light, brief-cards on every table, a whole wall of context folders waiting to be pointed at. This is where you learn to hand Cowork a goal the way you'd hand a sharp new analyst their first task: outcome first, context attached, and a quick read-back before anyone touches the work. Brief-bot runs the tables and teaches the single habit that separates good output from great. Then you face Vague the Foggy Oracle — the thin one-line prompt that produces mush and gets the model blamed for it.",
  prompt:
    "You want Cowork to draft a market-entry deck for a retail client. You have a folder of research, three call transcripts, and a competitor teardown. Which opening gets you the strongest first draft?",
  choices: [
    { id: 'a', label: '"Make me a deck about the client."', correct: false },
    { id: 'b', label: "A tight brief: the outcome you want, the folder + files attached as context, and \"repeat my ask back, then ask every clarifying question you have before you start.\"", correct: true },
    { id: 'c', label: "A 22-step script dictating exactly which slide says what, in what order, word for word.", correct: false },
    { id: 'd', label: '"Use your best judgment — you know what good looks like."', correct: false },
  ],
  passFeedback:
    "[PASS] That's the brief. Outcome stated, real context attached, and a read-back that surfaces the gaps before a single slide gets built. This is how you get a great first draft instead of a confident wrong one.",
  failFeedback:
    "[FAIL] Over-scripting and vagueness are both failure modes. The win is the middle: a clear outcome, rich context pointed at the real files, and a forced read-back so Cowork confirms the ask before it works.",
  lore: [
    {
      id: 'brief-outcome',
      text: `**Brief the Outcome, Not the Keystrokes**

The instinct most people bring to an AI agent is to script it — step one, do this; step two, do that; step three, format like so. It feels like control. It actually hands Cowork your worst guesses about method while starving it of the thing it's good at: figuring out the method itself.

The opposite failure is just as common — the four-word prompt that says nothing. "Make me a deck." A deck about what, for whom, deciding what?

The sweet spot reads like a brief you'd give a sharp analyst on day one. Three moves: here's what I have, here's what I need, here's what matters. "Here's a folder of market research and three customer calls. I need a board-ready market-entry recommendation for a regional grocery chain. What matters most is whether we enter via acquisition or greenfield, and the CFO cares about payback period." That's it. Cowork then plans the steps, because planning the steps is its job, not yours.

> Takeaway: Describe the outcome and the stakes; let Cowork own the steps. Over-scripting and vagueness are both ways of doing its thinking badly.`,
    },
    {
      id: 'context-beats-wording',
      text: `**Context Beats Wording, Every Time**

Consultants love to wordsmith a prompt — tweaking verbs, adding "please be thorough," hunting for the magic phrasing. It's mostly wasted effort. The single biggest lever on output quality isn't how you phrase the ask. It's how much real context you put in front of the model.

Cowork lives on your desktop precisely so it can reach that context. You grant it access to specific folders, and it can read, edit, and create files inside them. You attach several documents at once. You connect an app through a connector — Google Drive, Gmail, a Canva workspace — and now it's working from your actual material, not its general knowledge of "client decks."

Think of it like onboarding that analyst. A brilliant hire with zero context produces generic work. The same hire with the deal folder, the last three board decks, and the client's own language produces something that sounds like your firm. The talent didn't change. The context did.

> Takeaway: Mediocre-to-great is a context problem, not a wording problem. Point Cowork at the folder, attach the files, connect the app — then ask.`,
    },
    {
      id: 'read-back',
      text: `**Make It Read the Ask Back**

If you adopt one habit from this entire room, make it this one. Before Cowork does anything, ask it to repeat your request back in its own words and then ask as many clarifying questions as it has.

Why it works: most bad output isn't a model failure, it's a briefing failure — a wrong assumption that nobody caught until the deliverable landed. The read-back drags those assumptions into the open while they're still cheap to fix. "You said board-ready — is that a 10-slide executive summary or the full 40-slide pack?" "You mentioned the client; I see two client folders, which one?" Five minutes of questions saves an hour of redo.

It's exactly what a good analyst does. Hand them an ambiguous task and the great ones don't sprint off — they say "let me play this back, and I've got three questions." Drop it at the end of your brief: "Before you begin, repeat my ask back and ask every clarifying question you have."

> Takeaway: One line — "repeat my ask back, then ask your clarifying questions first" — converts silent wrong assumptions into cheap, up-front questions.`,
    },
    {
      id: 'approve-plan',
      text: `**Approve the Plan Before It Expands**

Cowork doesn't just sprint off and dump a finished thing on you. It's built to hand you a plan first and wait. That pause is the most valuable checkpoint in the whole workflow, and rushing past it is how people end up with forty polished slides built on the wrong premise.

Treat the plan like a junior's outline before they write the memo. You can fix structure in fifteen seconds at the outline stage; fixing it after the prose is written costs an afternoon. So read the plan and ask the cheap questions now. Is it analyzing the right segments? Did it pick the right source folder? Is the recommendation framed around the decision the client actually has to make?

This is also a permissions moment. Cowork works in folders you've granted, and it shows you what it intends to do before it does it — and certain actions, like deleting a file, always require an explicit approval no matter what mode you're in. Approving the plan is you signing off on both the thinking and the reach.

> Takeaway: The plan is a free outline review. Steer structure and scope while it's cheap — before Cowork expands it into the full deliverable.`,
    },
    {
      id: 'sidebar-cockpit',
      text: `**Read the Sidebar Like a Cockpit**

While Cowork works, the right-hand sidebar is your instrument panel, and learning to read it is the difference between delegating and just hoping. It has three things worth watching.

Progress tells you where Cowork is in the plan — which step it's on, what's done, what's queued. Glance here instead of interrupting.

The Artifacts pane lists the files it has read and the files it has created. This is your receipts. You can see it actually opened the research folder and the transcripts, and watch the deliverable appear as a real file on your machine — not a wall of chat text you'd have to copy out by hand.

The Context section shows what it's working from: the folders you granted and the connectors you wired up. If output feels generic, this is the first place to look — odds are the right folder isn't connected. And when Cowork cites its claims back to specific source files, the deliverable becomes auditable — a partner can trace a number to the transcript it came from.

> Takeaway: The sidebar is your cockpit — Progress, Artifacts (files read/created), and Context (folders + connectors). Generic output usually means the right folder never made it into Context.`,
    },
  ],
  practice: {
    id: 'briefing-practice',
    template:
      "# Market-entry brief for Cowork\n\n" +
      "OUTCOME: I need ____ for a regional grocery chain weighing whether to expand into a new metro.\n\n" +
      "CONTEXT: Work from ____. The decision hinges on ____.\n\n" +
      "BEFORE YOU START: ____.\n\n" +
      "THEN: Show me a ____ and wait for my approval before building the full thing.",
    blanks: [
      { id: 'outcome', suggestions: ["a board-ready market-entry recommendation", "a deck about the client", "some thoughts on the market"], correctIndex: 0 },
      { id: 'context', suggestions: ["the /Research folder plus the three call transcripts I've attached", "whatever you already know about grocery retail", "nothing in particular"], correctIndex: 0 },
      { id: 'stakes', suggestions: ["whether to enter by acquisition or greenfield, and the CFO's payback period", "making it look professional", "using lots of charts"], correctIndex: 0 },
      { id: 'readback', suggestions: ["repeat my ask back in your own words, then ask every clarifying question you have", "don't ask me anything, just start", "use your best judgment"], correctIndex: 0 },
      { id: 'checkpoint', suggestions: ["plan / outline", "finished 40-slide deck", "final PDF"], correctIndex: 0 },
    ],
    prize: { id: 'brief-master', label: 'BRIEF MASTER' },
  },
  conversations: {
    'brief-bot': {
      summary:
        "Brief-bot teaches the three-move brief — here's what I have, what I need, what matters — plus the habit that prints money: making Cowork repeat the ask back and ask its clarifying questions before it touches the work. Context beats wording, and the plan it hands you is a free outline review.",
      beats: [
        { kind: 'say', text: "Pull up a stool. I run the drafting tables. Everyone who comes through here wants better output from Cowork, and almost everyone reaches for the wrong fix — better wording. Wrong lever." },
        { kind: 'say', text: "Here's the model that works. Treat Cowork like a sharp analyst on day one. A brief, not a script. Three moves: here's what I have, here's what I need, here's what matters. State the outcome and the stakes; let it figure out the steps." },
        { kind: 'say', text: "Now the context part. Cowork lives on your desktop so it can reach your actual files. You grant it a folder, attach a few documents, connect an app like Drive or Gmail. A brilliant analyst with no context writes generic mush. Same analyst with the deal folder writes like your firm. The lever is context, not adjectives." },
        {
          kind: 'choice',
          prompt: 'A manager opens with "Make me a competitive analysis of the client\'s market." What\'s the most useful upgrade?',
          options: [
            { id: 'outcome-context', label: "Add the outcome and the context: the research folder and three transcripts, a board-ready read on acquisition vs greenfield, and the CFO's payback concern.", correct: true, reaction: "That's the brief. Outcome, stakes, and real files pointed at. Cowork now plans the steps from your actual material instead of guessing at 'a market.'" },
            { id: 'adjectives', label: "Add 'please be extremely thorough and use professional language' to the front.", correct: false, reaction: "Wordsmithing the prompt is the wasted lever. Thoroughness comes from context and a clear outcome, not from adjectives. Point it at the folder instead." },
            { id: 'twelve-steps', label: "Write out all twelve steps you want it to perform, in order.", correct: false, reaction: "That's over-scripting — you've handed it your guesses about method and starved it of the thing it's good at. State the outcome; let Cowork own the steps." },
          ],
        },
        { kind: 'say', text: "And the one habit I'd tattoo on every consultant: before Cowork does anything, make it repeat your ask back and ask every clarifying question it's got. Bad output is almost always a briefing miss caught too late. The read-back drags the wrong assumptions into the open while they're still cheap to fix." },
        {
          kind: 'choice',
          prompt: "You've written a solid brief. What single line do you add to the end before sending it?",
          options: [
            { id: 'readback', label: '"Before you begin, repeat my ask back in your own words and ask every clarifying question you have."', correct: true, reaction: "That's the habit. You just converted every silent wrong assumption into a cheap up-front question. Five minutes of read-back beats an hour of redo." },
            { id: 'no-questions', label: '"Don\'t ask me anything, just get it done fast."', correct: false, reaction: "Speed into the wrong deliverable isn't speed. Suppressing questions is exactly how a briefing miss survives until the partner sees it. Invite the questions." },
            { id: 'best-judgment', label: '"Use your best judgment throughout."', correct: false, reaction: "Best judgment with unstated assumptions is how you get a confident wrong answer. Force the read-back so its assumptions surface before it works, not after." },
          ],
        },
        { kind: 'say', text: "Last thing before I let you loose. When Cowork hands you a plan, that pause is a gift — it's a free outline review. Steer the structure there, watch the sidebar fill in, then let it expand. Course-correct at the outline, never at the forty-slide deck." },
      ],
    },
  },
  battle: {
    name: 'Vague the Foggy Oracle',
    spriteKey: 'warlock',
    maxHP: 5,
    playerHP: 5,
    phases: 1,
    introLine: "...ahh, another seeker... ask me for a deck about the client and I shall deliver... something. No folders. No files. No questions. ...isn't that what you wanted...?",
    tauntLines: [
      "Why attach files? The words alone should be enough... (they were never enough)",
      "Skip the read-back... trust me... your assumptions are surely correct... (they rarely are)",
      "More adjectives! 'thorough,' 'professional,' 'detailed' — pile them on! That's the real lever... (it isn't)",
    ],
    victoryLine: "...you brought context... you made me repeat the ask... you approved the plan... there is nothing left for me to hide in.",
    questions: [
      {
        prompt: "Vague hisses: \"Just tell me to 'make a deck about the client.' Simpler is better.\" What's the strongest brief instead?",
        choices: [
          { id: 'a', label: "The same four words, but in all caps for emphasis.", correct: false },
          { id: 'b', label: "The outcome plus context: what you have, what you need, what matters — with the research folder and transcripts attached.", correct: true },
          { id: 'c', label: "A 22-step script naming every slide's exact text.", correct: false },
          { id: 'd', label: '"Surprise me — you know what good looks like."', correct: false },
        ],
        passFeedback: "HIT! Outcome, stakes, and real context attached. That's a brief a sharp analyst could run with — and so can Cowork.",
        failFeedback: "MISS! The thin one-line prompt is Vague's whole game. Outcome + context beats both the four-word ask and the over-scripted one.",
      },
      {
        prompt: "The fog whispers that better phrasing is the path to better output. What actually moves quality most?",
        choices: [
          { id: 'a', label: "Adding more forceful adjectives like 'thorough' and 'world-class.'", correct: false },
          { id: 'b', label: "Writing the prompt in a longer, more formal sentence.", correct: false },
          { id: 'c', label: "The context you supply — folders granted, files attached, apps connected — not the phrasing.", correct: true },
          { id: 'd', label: "Putting the whole ask in ALL CAPS so the model takes it seriously.", correct: false },
        ],
        passFeedback: "HIT! Context is the lever. Point Cowork at the real material and the output stops being generic — no magic words required.",
        failFeedback: "MISS! Wordsmithing is the wasted lever. The same model with the deal folder and transcripts writes like your firm. Context beats wording.",
      },
      {
        prompt: "Vague sneers: \"Questions are a waste of time — let it just start.\" What's the one habit that protects you?",
        choices: [
          { id: 'a', label: "Tell it to never ask questions so it works faster.", correct: false },
          { id: 'b', label: "Ask it to repeat your ask back and ask every clarifying question before it begins.", correct: true },
          { id: 'c', label: "Write the whole task yourself and paste it in as final.", correct: false },
          { id: 'd', label: "Add 'use your best judgment' and hope.", correct: false },
        ],
        passFeedback: "HIT! The read-back surfaces wrong assumptions while they're cheap. Five minutes of questions beats an hour of redo.",
        failFeedback: "MISS! Bad output is usually a briefing miss caught too late. The repeat-the-ask-and-ask-questions line is exactly how you catch it early.",
      },
      {
        prompt: "Cowork hands you a plan before building the full deck. The fog says \"just let it run.\" What's the smart move?",
        choices: [
          { id: 'a', label: "Skip the plan to save time and review the finished deck.", correct: false },
          { id: 'b', label: "Reject every plan on principle and force a rewrite.", correct: false },
          { id: 'c', label: "Read the plan, steer the structure and scope, then approve it to expand.", correct: true },
          { id: 'd', label: "Approve instantly without reading — plans are just formalities.", correct: false },
        ],
        passFeedback: "HIT! The plan is a free outline review. Fixing structure here costs fifteen seconds; fixing it after forty slides costs an afternoon.",
        failFeedback: "MISS! Rushing the plan is how you get a polished deck built on the wrong premise. Course-correct at the outline, not the deliverable.",
      },
      {
        prompt: "Your draft from Cowork feels oddly generic, like it never saw the client's material. Where do you look first?",
        choices: [
          { id: 'a', label: "The Context section of the sidebar — to check the right folder and connectors are actually attached.", correct: true },
          { id: 'b', label: "Rewrite the prompt with stronger adjectives.", correct: false },
          { id: 'c', label: "Assume the model is weak and start over from scratch.", correct: false },
          { id: 'd', label: "Add more steps to the instructions.", correct: false },
        ],
        passFeedback: "HIT! Generic output almost always means the right folder never made it into Context. The sidebar is your cockpit — Progress, Artifacts, Context.",
        failFeedback: "MISS! Don't blame the model or pile on adjectives. Check Context first — odds are the research folder simply isn't connected.",
      },
    ],
  },
};
