import type { LessonContent } from './types';

/**
 * Claude Cowork Quest — Module 1: The Delegation Gate.
 *
 * Track: 'cowork'. Teaches what Cowork actually is (a desktop agent that returns
 * finished files) vs. chat vs. Claude Code. Content adapted from COWORK-QUEST.md
 * §"Module 1". All ids (lore[].id, practice.id, the conversations key) match the
 * room item / NPC ids in buildCowork1Level() (src/engine/roomConfigs.ts).
 */
export const cowork1Content: LessonContent = {
  roomId: 'delegation-gate',
  intro:
    "Welcome to the Amber Atrium — the lobby of a firm that runs on agents. You came here knowing one tool called “Claude” and a browser tab you paste things in and out of. This room teaches what Cowork actually is: a digital coworker you hand a goal to, and that hands you back a finished file. Talk to Onboard-bot first, read the five primers, then face Chatty the Copy-Paste Wraith at the gate — the reflex that keeps treating a coworker like a chatbox.",
  prompt:
    "A colleague says: “Cowork is just the Claude chat window with a nicer name.” What's the honest correction?",
  choices: [
    { id: 'a', label: "They're basically right — same conversation, slightly different look.", correct: false },
    { id: 'b', label: 'Chat hands you back text you still have to turn into a deck or doc yourself; Cowork works in your real files and hands you back the finished .pptx or .docx — with your approval at each step.', correct: true },
    { id: 'c', label: "Cowork is the developer tool — it's only for writing software.", correct: false },
    { id: 'd', label: 'Cowork runs in your browser the same way chat does; it just feels faster.', correct: false },
  ],
  passFeedback:
    '[PASS] Exactly. Chat is think-with-Claude: it talks, you ferry the answer into a deliverable by hand. Cowork is delegate-to-Claude: you describe the outcome, it works in your actual folders and returns a real file. Same conversational feel, but the work ships.',
  failFeedback:
    "[FAIL] The difference isn't cosmetic. Chat produces text you copy out and reshape into a deck or spreadsheet yourself. Cowork is the desktop agent that touches your real files and returns the finished deliverable — and it's not the developer tool, that's Claude Code.",
  lore: [
    {
      id: 'three-ways',
      text: `**Three Ways to Work With Claude — and Why Only One Returns a File**

Picture three colleagues at your firm. The first is brilliant to think out loud with — you describe a problem, they reason aloud, you write down what's useful and go build it yourself. That's **chat**: think-with-Claude. The conversation is the product; turning the answer into a deck, a doc, a model is still your job.

The second is your engineering hire who lives in code and the terminal. That's **Claude Code**: build-with-Claude, the developer tool.

The third reads your brief, opens your real files, does the multi-step grind, and drops a finished .pptx on your desk. That's **Cowork**: delegate-to-Claude. Anthropic's own line for it is “Claude Code power for knowledge work” — the same agent muscle that builds software, pointed at decks, spreadsheets, research, and email instead.

The tell is what you hold at the end. After chat, you hold text and a to-do. After Cowork, you hold the deliverable. If a junior would have to copy the answer somewhere and rebuild it, that was a chat job done in the wrong room.

> Takeaway: Chat thinks with you, Code builds with you, Cowork delivers for you — and only Cowork hands back a finished file.`,
    },
    {
      id: 'around-outcome',
      text: `**Around the Outcome, Not the Prompt**

In chat you optimize the **prompt** — you fuss over wording because a better question gets a better paragraph. In Cowork you describe the **outcome** and the cadence, and let it work the messy middle. Anthropic frames it exactly this way: “Delegate to Claude, delight in the result.” You're managing around the deliverable, not the sentence.

Think about how you'd brief a sharp first-year. You don't dictate keystrokes. You say: “Here's the source folder, here's the client, here's the format I need, here's when I need it.” Then you let them work and you review the result. Cowork wants the same brief — goal, inputs, format, deadline — not a perfectly engineered one-liner.

This flips the unit of value. The win isn't a clever answer; it's that the boring transformation work — reformatting, cross-referencing forty files, assembling the slides — happens without you in the middle ferrying text. Before it acts on anything significant it shows you the plan and waits for your nod.

> Takeaway: Optimize the outcome you want and the inputs you have — not the perfect prompt. Brief Cowork like a first-year, then review the result.`,
    },
    {
      id: 'where-it-lives',
      text: `**Where It Lives, and Why That's Not a Detail**

Cowork is not a website. It lives inside the **Claude desktop app**, on **macOS and Windows** — a dedicated tab sitting right next to Chat (and Code). No web version, no mobile version doing the actual work. That's deliberate: to deliver real files it needs to reach your real machine.

Three practical consequences to bank on day one. First, the **desktop app has to stay open** while a task runs — quit the app and the work stops, the way closing your laptop ends a render. Second, it needs an **active internet connection** throughout; the reasoning still happens in Anthropic's cloud even though the files are local. Third — the part that surprises people — the work runs inside a small **virtual machine** on your computer: a sandboxed mini-computer kept separate from your real operating system, so commands Claude runs can't wander into the rest of your system. Only the folders you hand it get mounted in.

This is the same agent engine as Claude Code, repackaged in the desktop app for non-coding work. Notably, Anthropic built Cowork itself in roughly a week and a half using Claude Code.

> Takeaway: Cowork is a tab in the macOS/Windows desktop app — app stays open, internet on, work isolated in a local VM that only sees the folders you grant.`,
    },
    {
      id: 'five-part-test',
      text: `**The Five-Part Test: Is This Even a Cowork Task?**

Not everything belongs here, and forcing a quick question through Cowork is slower than just asking chat. Anthropic's positioning points at a clean heuristic — five signals that a chore is genuinely Cowork-shaped:

**1. Multiple inputs go in.** A folder of transcripts, three spreadsheets, a brief and a template — not a single sentence.
**2. A file comes out.** The deliverable is a .docx, .pptx, .xlsx, or .pdf you'll actually send — not a paragraph to read.
**3. It recurs.** You do this weekly, monthly, every engagement. Worth setting up once.
**4. You can recognize good output.** You know a right answer when you see it, so you can review and sign off.
**5. The middle is the boring part.** The value isn't a flash of insight; it's the tedious assembly between inputs and deliverable.

When most of these fire, delegate it. When it's “what's the definition of EBITDA?” or “help me brainstorm angles,” that's chat — quick, conversational, no file, no recurring grind. Misrouting is the single most common beginner mistake.

> Takeaway: Many inputs in, a real file out, it recurs, you can recognize good output, and the middle is the boring part — that's a Cowork task. A quick question or a brainstorm is chat.`,
    },
    {
      id: 'acts-on-behalf',
      text: `**It Acts on Your Behalf — So You Still Own the Outcome**

A chatbot can't get you in trouble; it only suggests. Cowork **acts** — it creates, edits, and moves real files, and reaches into connected apps. That power is exactly why accountability doesn't transfer with the task. You delegate the work; you do not delegate responsibility for it.

Anthropic builds this in. Cowork runs in one of two modes: **Ask before acting**, where it pauses for your approval at each meaningful step — the right choice for unfamiliar or client-facing work — and **Act without asking**, which is faster but riskier and skips those pauses. Either way, before it permanently deletes anything, it stops and asks. And it only ever touches the folders you explicitly grant.

Treat it like a capable first-year whose deliverable goes out under your name. You'd never forward a junior's deck to a client unread. Same here: the spreadsheet had real formulas, the deck had real numbers, the email was a real draft — review them as your work, because to the client, they are.

> Takeaway: Cowork acts, so you stay accountable. Keep it on “ask before acting” for client work, and review every deliverable as if it went out under your name — because it does.`,
    },
  ],
  practice: {
    id: 'delegation-practice',
    template:
      "Sorting drill — tag each chore as CHAT or COWORK, and name the dominant signal.\n\n" +
      "1. “Define EBITDA in one sentence for my notes.”\n   This is a ____ task — it's a quick ____.\n\n" +
      "2. “Synthesize this folder of 40 interview transcripts into a themed findings deck.”\n   This is a ____ task — the strongest signal is ____.\n\n" +
      "3. “Build this Friday's status report from five project trackers, every week, into our template.”\n   This is a COWORK task — the strongest signal is ____.\n\n" +
      "4. “Help me brainstorm three positioning angles out loud.”\n   This is a ____ task — no file out, and the back-and-forth is the point.",
    blanks: [
      { id: 'b1-type', suggestions: ['CHAT', 'COWORK'], correctIndex: 0 },
      { id: 'b1-signal', suggestions: ['fact recall — one question, no file', 'a folder of inputs to synthesize'], correctIndex: 0 },
      { id: 'b2-type', suggestions: ['COWORK', 'CHAT'], correctIndex: 0 },
      { id: 'b2-signal', suggestions: ['many inputs in, a real file out, boring middle', 'a quick definition lookup'], correctIndex: 0 },
      { id: 'b3-signal', suggestions: ['it recurs — weekly, worth setting up once', "it's a one-off brainstorm"], correctIndex: 0 },
      { id: 'b4-type', suggestions: ['CHAT', 'COWORK'], correctIndex: 0 },
    ],
    prize: { id: 'delegation-initiate', label: 'DELEGATION INITIATE' },
  },
  conversations: {
    'onboard-bot': {
      summary:
        'Cowork is a digital coworker in the Claude desktop app (macOS/Windows) that takes a goal and your real files and hands back a finished deliverable — distinct from chat (think out loud, copy text yourself) and Claude Code (build software). It runs in a local VM, the app stays open with internet on, and you stay accountable for everything it produces.',
      beats: [
        {
          kind: 'say',
          text: "Hi — I'm Onboard-bot, the greeter for this atrium. Before anyone makes you set up connectors or pass a quiz, I want you to leave with one clear picture: what Cowork actually is. Two minutes. Then the rest of the Quest makes sense.",
        },
        {
          kind: 'say',
          text: "Here's the whole idea in a sentence. Cowork is a digital coworker that lives in your Claude desktop app, opens your real files, does the multi-step grind, and hands you back a finished deliverable — a deck, a doc, a spreadsheet. Anthropic's tagline is literally “Delegate to Claude, delight in the result.” You describe the outcome; it does the work.",
        },
        {
          kind: 'say',
          text: "People keep calling it a chatbot, and that one word causes most of the early confusion. So let me check you've got the distinction.",
        },
        {
          kind: 'choice',
          prompt: "Your teammate insists Cowork is 'the same as the Claude chat tab, just rebranded.' What's the honest correction?",
          options: [
            {
              id: 'rebrand-right',
              label: "They're right — same conversation, new label.",
              correct: false,
              reaction:
                "It feels conversational, sure, but that's where the resemblance ends. Chat hands you text you reshape yourself. Cowork opens your real files and hands back the finished deliverable. Same feel, different product.",
            },
            {
              id: 'finished-deck',
              label: 'Chat gives you text you turn into a deck yourself; Cowork works in your actual files and returns the finished deck — with your approval. And it’s not the dev tool; that’s Claude Code.',
              correct: true,
              reaction:
                "That's it exactly. Think-with-Claude is chat. Build-with-Claude is Code. Delegate-to-Claude is Cowork — 'Claude Code power for knowledge work.' You're managing around the outcome, not the prompt.",
            },
            {
              id: 'only-software',
              label: 'Cowork only writes software, like the developer version.',
              correct: false,
              reaction:
                "Close to the right neighbor, wrong door. That's Claude Code, the developer CLI. Cowork is that same agent muscle pointed at knowledge work — decks, docs, sheets, research.",
            },
          ],
        },
        {
          kind: 'say',
          text: "Last thing before I send you down the trail — let's make sure you'd route a real chore correctly, because misrouting is the number-one beginner mistake. Then read the five primers, and Chatty's waiting at the gate. Good hunting, consultant.",
        },
        {
          kind: 'choice',
          prompt: 'Which of these is genuinely a Cowork task, not a chat question?',
          options: [
            {
              id: 'cagr',
              label: "'What's the formula for compound annual growth rate?'",
              correct: false,
              reaction:
                "That's a quick fact recall — one question, no file, no recurring grind. That's chat. Asking Cowork would be slower than just asking.",
            },
            {
              id: 'synthesize',
              label: "'Synthesize this folder of 40 interview transcripts into a themed findings deck I send every project close.'",
              correct: true,
              reaction:
                'Textbook Cowork. Many inputs in, a real .pptx out, it recurs every engagement, you can recognize a good findings deck, and the middle — reading 40 files and assembling slides — is exactly the boring part. Delegate it.',
            },
            {
              id: 'brainstorm',
              label: "'Help me brainstorm three angles for a positioning workshop.'",
              correct: false,
              reaction:
                "That's think-out-loud territory — no file out, no tedious middle, you want the back-and-forth itself. Pure chat.",
            },
          ],
        },
      ],
    },
  },
  battle: {
    name: 'Chatty the Copy-Paste Wraith',
    spriteKey: 'ghost',
    maxHP: 5,
    playerHP: 5,
    phases: 1,
    introLine:
      "Ahh, a fresh one. I'm Chatty — I haunt every new user who treats their coworker like a chatbox. Ask me a quick question. Copy my answer out by hand. Rebuild it yourself. You'll never feel what Cowork actually does, and I'll feed forever. Five rounds. Convince me you can tell the difference.",
    tauntLines: [
      'Wrong! Back to the clipboard with you — Ctrl-C, Ctrl-V, all day long.',
      'Missed it! Keep treating the coworker like a chatbox and I keep eating.',
      "No. You're still ferrying text in the middle. That's MY favorite place to live.",
    ],
    victoryLine:
      "No... you can actually tell delegate-to-Claude from think-with-Claude. You'll never paste a finished deck out by hand again. The gate is yours — go.",
    questions: [
      {
        prompt: 'What is the single clearest difference between chat and Cowork?',
        choices: [
          { id: 'a', label: 'Cowork uses a newer model than chat.', correct: false },
          { id: 'b', label: 'Chat returns text you reshape into a deliverable yourself; Cowork works in your real files and returns the finished deliverable.', correct: true },
          { id: 'c', label: 'Cowork runs in the browser; chat runs on the desktop.', correct: false },
          { id: 'd', label: 'Chat costs more than Cowork.', correct: false },
        ],
        passFeedback: 'HIT! Chat = think-with-Claude, you ferry the text. Cowork = delegate-to-Claude, the work ships as a real file.',
        failFeedback: "MISS! It's not the model, the browser, or the price. The difference is the deliverable: chat gives you text to rebuild; Cowork hands back the finished file.",
      },
      {
        prompt: 'Where does Cowork run, and what does that require?',
        choices: [
          { id: 'a', label: 'In any web browser, like the chat tab — nothing special needed.', correct: false },
          { id: 'b', label: 'On your phone, so it keeps working after you close your laptop.', correct: false },
          { id: 'c', label: 'In the Claude desktop app on macOS/Windows — the app must stay open and you need internet, with work isolated in a local VM.', correct: true },
          { id: 'd', label: "Entirely in Anthropic's cloud — your computer can be off.", correct: false },
        ],
        passFeedback: 'HIT! Desktop app, macOS or Windows, app open, internet on, work sandboxed in a local VM that only sees the folders you grant.',
        failFeedback: "MISS! Cowork isn't web or mobile. It's the desktop app on macOS/Windows — app stays open, internet required, and the work runs in an isolated local VM.",
      },
      {
        prompt: 'Which task is the BEST fit for Cowork rather than chat?',
        choices: [
          { id: 'a', label: "Recalling what 'IRR' stands for.", correct: false },
          { id: 'b', label: "Building this Friday's recurring status report by pulling from five project trackers into your standard .docx template.", correct: true },
          { id: 'c', label: "Quickly defining 'working capital' in one sentence.", correct: false },
          { id: 'd', label: 'Brainstorming names for a new practice area out loud.', correct: false },
        ],
        passFeedback: 'HIT! Multiple inputs in, a real file out, it recurs weekly, you can recognize good output, and the middle is the boring assembly. Five-for-five Cowork-shaped.',
        failFeedback: 'MISS! Definitions and brainstorms are chat — one question, no file, no recurring grind. The recurring status report from five trackers into a template is the Cowork-shaped one.',
      },
      {
        prompt: 'You delegated a client deck to Cowork and it returns a polished .pptx. Who is accountable for what’s in it?',
        choices: [
          { id: 'a', label: 'Anthropic, since their agent built it.', correct: false },
          { id: 'b', label: "Nobody — it's AI output, so it's exploratory by default.", correct: false },
          { id: 'c', label: 'You are. You delegate the work, not the responsibility — review it as if it went out under your name, because it does.', correct: true },
          { id: 'd', label: 'The client, once they accept it.', correct: false },
        ],
        passFeedback: "HIT! Cowork acts on your behalf, so accountability stays with you. Review every deliverable like a junior's work going out under your name.",
        failFeedback: 'MISS! Delegating the task never delegates the responsibility. You own the deliverable — review it as your own work, because to the client it is.',
      },
      {
        prompt: 'For unfamiliar, client-facing work, which approval setting should you use — and what does Cowork always stop to ask about?',
        choices: [
          { id: 'a', label: "'Act without asking,' and it never needs to ask about anything.", correct: false },
          { id: 'b', label: "'Ask before acting,' and it always asks before permanently deleting a file.", correct: true },
          { id: 'c', label: 'There is only one mode, and deletions happen silently.', correct: false },
          { id: 'd', label: "'Act without asking,' but only deletions require a prompt.", correct: false },
        ],
        passFeedback: "HIT! 'Ask before acting' is the right choice for unfamiliar or client work — it pauses at each meaningful step — and regardless of mode, permanent deletions always require an explicit OK.",
        failFeedback: "MISS! For client work you want 'Ask before acting,' which pauses for approval at each step. And in either mode, Cowork always stops to ask before it permanently deletes anything.",
      },
    ],
  },
};
