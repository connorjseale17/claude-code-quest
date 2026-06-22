import type { LessonContent } from './types';

/**
 * twic-2 (Feature B) — the `MessageDisplay` hook event: a hook that fires as an
 * assistant message is about to be shown and can transform the text or hide it
 * before it reaches the screen.
 * Source: Claude Code CHANGELOG 2.1.152 ("`MessageDisplay` hook-event
 * assistant-message-text transform/hide capability").
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic2Content: LessonContent = {
  roomId: 'twic-room-2',
  intro:
    "Room 2, and the Beat Reporter has a story about the very last step before words hit your screen. There's a new hook event called `MessageDisplay`: it fires as an assistant message is about to be shown, and the hook you wire to it can rewrite that text — or hide it entirely — before you ever read it. The two pages on the desk cover how the event sits in the pipeline and the redaction work it was built for, plus the one caveat that keeps you honest about what it does and doesn't guarantee. Answer the door's question and the key is yours; the thing in here is a wraith that bends every message before it reaches your eyes.",
  prompt:
    "Your firm screen-records client sessions, and you need Claude's replies scrubbed of the client's name before they ever appear on screen. Which hook event is built to do that?",
  choices: [
    { id: 'a', label: '`MessageDisplay` — it fires as an assistant message is about to be shown and can transform or hide its text', correct: true },
    { id: 'b', label: '`PostToolUse` — it runs after a tool call finishes, so it can edit the words of a reply', correct: false },
    { id: 'c', label: '`SessionStart` — it runs once when the session opens, which is when message text gets filtered', correct: false },
    { id: 'd', label: '`PreToolUse` — it gates each tool call before it runs, including the text of replies', correct: false },
  ],
  passFeedback: 'HIT! `MessageDisplay` fires as an assistant message is about to be displayed, and your hook can rewrite the text — scrub the name — or hide the message outright before it reaches the screen.',
  failFeedback: "MISS! The other events fire around tool calls or at session start; none of them sit on the message-display path. `MessageDisplay` is the one event that can transform or hide a reply's text — re-read the books.",
  lore: [
    {
      id: 'twic-2-lore-a',
      text: `**\`MessageDisplay\` — A Hook on the Last Step Before You Read It**

**Where the event sits in the pipeline**

Claude Code already lets you hang hooks on moments in a session: before a tool runs, after it finishes, when a session starts. The \`MessageDisplay\` event, added in the 2.1.152 release, opens up a new moment — the one right at the end. After Claude has composed a reply but *before* that reply is painted to your screen, the \`MessageDisplay\` hook fires. It's the final checkpoint between the model's words and your eyes, and until now there was nothing wired there.

**Two powers: transform, or hide**

A hook on this event gets the assistant's message text, and it can do one of two things with it. It can *transform* the text — return a modified version, so what you read is the rewritten string rather than the original. Or it can *hide* the message altogether, suppressing it so nothing is shown. Transform is for changing what appears; hide is for deciding that, under some condition you define, nothing should appear at all. Both are driven by a command you control, so the logic is yours: match a pattern, swap it out, or pull the whole message.

**It's a hook like any other**

Mechanically there's nothing exotic here. You wire \`MessageDisplay\` the same way you wire any hook — an event name pointed at a command — and that command runs each time an assistant message is about to be displayed. What's new is purely the *event*: a place to intercept output text, where before you could only intercept tool calls and session lifecycle moments. Everything you already know about authoring hooks carries straight over.

> Takeaway: \`MessageDisplay\` is a hook event on the final step before a reply is shown; the hook it runs can transform the message text or hide it entirely, giving you a checkpoint on Claude's output you never had before.`,
    },
    {
      id: 'twic-2-lore-b',
      text: `**Controlling What Lands On Screen — and the Line You Shouldn't Cross**

**Redaction for the moment of display**

The clearest use is redaction. Consultants demo Claude in front of clients, record screen-shares for training, and drop screenshots into deliverables — and any of those can splash a client's name, an internal project codename, an API token, or a connection string across a screen that the wrong people are watching. A \`MessageDisplay\` hook is a standing filter for exactly that risk: write a command that scans each outgoing message for the strings you care about and rewrites them — *Acme Corp* becomes *the client*, a token becomes \`••••\` — and the substitution happens automatically on every reply, with no discipline required from you in the moment. The same hook can simply hide a message that trips a rule you'd rather not display at all.

**Presentation polish, too**

It isn't only about secrets. Because the hook can rewrite any displayed text, it's also a house-style pass: prepend a banner to flagged messages, tag replies with a marker your team scans for, or normalize formatting before it lands. Anywhere you want a consistent surface in front of an audience, this is the layer to enforce it.

**The caveat that keeps you honest**

Here's the line to hold. \`MessageDisplay\` acts on what is *displayed* — it's a presentation filter, not a security boundary on the underlying work. It changes the words on the screen; it does not unsend a request, scrub a file Claude already wrote, or guarantee a secret never existed in the session. So lean on it to keep sensitive strings off a shared display, and *also* keep your real controls — permission rules, what you let Claude touch — doing the actual protecting. Treat the hook as the polish on the glass, not the lock on the door.

> Takeaway: Use \`MessageDisplay\` to redact and polish what an audience sees on screen, but remember it filters the display, not the deed — it's presentation, not your security boundary.`,
    },
  ],
  practice: {
    id: 'twic-2-practice',
    template: `We're recording a walkthrough of this build for ____, and I don't want anything sensitive flashing on screen.
Wire up a MessageDisplay hook so that before any reply is shown, it ____.
Specifically, have it rewrite ____ to a neutral placeholder, and hide any message that ____.
Keep in mind this is a display filter — it cleans what's on screen, not ____.
So leave my permission rules in place to do the real protecting.`,
    blanks: [
      { id: 'audience', suggestions: ['a client demo', 'an internal training library', 'a public conference talk'] },
      { id: 'action', suggestions: ['scans the text for the strings we flag', 'runs our redaction command', 'checks each message against a rule'] },
      { id: 'target', suggestions: ['the client name', 'any API token or connection string', 'the internal project codename'] },
      { id: 'condition', suggestions: ['trips a rule we set', 'contains a flagged secret', 'mentions the unreleased feature'] },
      { id: 'underlying', suggestions: ['what Claude actually did', 'the files already written', 'the request that was sent'] },
    ],
    prize: { id: 'twic-2-prize', label: 'TWIC · MID-WEEK' },
  },
  conversations: {
    'twic-npc-2': {
      summary:
        "`MessageDisplay` (added in 2.1.152) is a hook event that fires as an assistant message is about to be shown — the last checkpoint before text reaches your screen. A hook on it can transform the message text (return a rewritten version) or hide the message entirely. You wire it like any other hook: an event pointed at a command you control. The headline use is redaction for shared screens, recordings, and screenshots — scrub client names, tokens, codenames automatically — plus presentation polish like banners or formatting. The caveat: it filters what's displayed, not the underlying work, so it's presentation, not a security boundary — keep your permission rules doing the real protecting.",
      beats: [
        { kind: 'say', text: "Second story is about the very last step before words reach your screen. New hook event, landed in 2.1.152: `MessageDisplay`. It fires after Claude has written a reply but *before* that reply is painted in front of you." },
        { kind: 'say', text: "You already hang hooks before a tool runs, after it finishes, when a session starts. This opens a spot nobody could reach until now — the output itself. A checkpoint sitting right between the model's words and your eyes." },
        { kind: 'say', text: "Your hook gets the message text and can do one of two things: *transform* it — hand back a rewritten version, so you read the edited string — or *hide* it, suppressing the message so nothing shows. Swap, or pull entirely. Your command, your logic." },
        {
          kind: 'choice',
          prompt: "Put it to work. Your firm records client demos and you need the client's name scrubbed from Claude's replies before it ever hits the screen. What does a `MessageDisplay` hook give you?",
          options: [
            { id: 'standing-filter', label: 'A standing filter that rewrites the name to a placeholder on every reply, automatically', correct: true, reaction: "Exactly. Write the command once, point it at the strings you care about, and every message gets scrubbed on the way to the screen — no remembering, no manual editing mid-demo." },
            { id: 'after-the-fact', label: 'A way to go back and edit the recording after the session ends', correct: false, reaction: "No — it works live, in the moment of display, not on a saved file afterward. It catches the name *before* it ever appears, which is the whole point." },
            { id: 'blocks-tools', label: 'A block on the tool calls that produced the name', correct: false, reaction: "That's a different event. `MessageDisplay` doesn't gate tools — it sits on the *message text* and rewrites or hides it as it's shown." },
          ],
        },
        { kind: 'say', text: "It's not only secrets. Because it can rewrite any displayed text, it doubles as a house-style pass — prepend a banner, tag flagged replies, normalize formatting before it lands. Anywhere you want a consistent surface in front of an audience, that's the layer." },
        { kind: 'say', text: "Now the line you don't cross. `MessageDisplay` acts on what's *displayed*. It changes the words on the glass; it does not unsend a request or scrub a file Claude already wrote. It's a presentation filter, not a security boundary." },
        { kind: 'say', text: "So use it to keep sensitive strings off a shared screen — and keep your permission rules doing the actual protecting underneath. The books have the transform-or-hide split and that caveat in full. The door wants to know which event sits on the display path. Name it and the key drops." },
      ],
    },
  },
  battle: {
    name: 'Veil, the Message-Bender',
    spriteKey: 'ghost',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*flickers between the model and your eyes, every word passing through its hands first* …you think you read what Claude said… you read what I let reach you…",
    tauntLines: [
      "*smears a reply into static* wrong hook, operator — that one fires around tools, it never touches the words you're staring at…",
      "*dangles a half-hidden message just out of sight* session start? too early — there's no reply to bend yet… try again…",
    ],
    victoryLine: "*solidifies into a plain, unedited line of text* …MessageDisplay… you found the one checkpoint on the words themselves… nothing of mine hidden now… take the key…",
    questions: [
      {
        prompt:
          "Your firm screen-records client sessions, and you need Claude's replies scrubbed of the client's name before they ever appear on screen. Which hook event is built to do that?",
        choices: [
          { id: 'a', label: '`MessageDisplay` — it fires as an assistant message is about to be shown and can transform or hide its text', correct: true },
          { id: 'b', label: '`PostToolUse` — it runs after a tool call finishes, so it can edit the words of a reply', correct: false },
          { id: 'c', label: '`SessionStart` — it runs once when the session opens, which is when message text gets filtered', correct: false },
          { id: 'd', label: '`PreToolUse` — it gates each tool call before it runs, including the text of replies', correct: false },
        ],
        passFeedback: 'HIT! `MessageDisplay` fires as an assistant message is about to be displayed, and your hook can rewrite the text — scrub the name — or hide the message outright before it reaches the screen.',
        failFeedback: "MISS! The other events fire around tool calls or at session start; none of them sit on the message-display path. `MessageDisplay` is the one event that can transform or hide a reply's text — re-read the books.",
      },
    ],
  },
};
