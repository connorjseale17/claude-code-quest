import type { LessonContent } from './types';

/**
 * twic-1 (Feature A) — the built-in "Concise" output style. Claude Code ships a
 * new output style, selectable under Output style in `/config`, that has Claude
 * lead with results and skip the preamble and narration around them — while
 * doing the work just as thoroughly. It changes Claude's *voice*, not its rigor:
 * the same reads, edits, and checks happen; only the connective prose around
 * them is trimmed.
 * Source (Claude Code CHANGELOG 2.1.237):
 *   - "Added a built-in \"Concise\" output style: Claude leads with results and
 *      skips preamble and narration, while doing the work just as thoroughly.
 *      Select it under Output style in /config."
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic1Content: LessonContent = {
  roomId: 'twic-room-1',
  intro:
    "Room 1 of this week's rundown, and the Beat Reporter is holding two versions of the same answer: one buried under three paragraphs of 'Let me start by…' and 'Now I'll…', the other opening with the result. The 2.1.237 release adds a built-in *Concise* output style — pick it under Output style in `/config` and Claude leads with the result, skipping the preamble and narration, while doing the work exactly as thoroughly as before. The two books cover what an output style actually changes and why a consultant scanning a wall of Claude output wants the narration gone but the rigor kept. Answer the door's one question for the key — then face the thing that guards it, a skeleton that has never once gotten to the point.",
  prompt:
    "What does the new built-in \"Concise\" output style change about how Claude works?",
  choices: [
    { id: 'a', label: "It changes Claude's *voice* only: Claude leads with the result and skips preamble and narration, while doing the same work just as thoroughly — you select it under Output style in `/config`", correct: true },
    { id: 'b', label: "It makes Claude do less — fewer file reads, skipped checks, and shorter reasoning — to produce a faster, lighter answer", correct: false },
    { id: 'c', label: "It's a new faster, cheaper model you switch to for routine work, separate from your main model", correct: false },
    { id: 'd', label: "It truncates Claude's final answers to a fixed length to save tokens, cutting off long results", correct: false },
  ],
  passFeedback: "HIT! Concise is an output *style*, not a shortcut. Claude still reads, edits, and checks exactly as thoroughly — it just leads with the result and drops the 'Let me…' / 'Now I'll…' narration around it. You turn it on under Output style in `/config`.",
  failFeedback: "MISS! It doesn't make Claude do less, it isn't a model, and it doesn't truncate results. Concise trims the *narration*, not the work: same rigor, fewer words of preamble. Re-read Book 1.",
  lore: [
    {
      id: 'twic-1-lore-a',
      text: `**The Concise Output Style — Losing the Preamble Without Losing the Rigor**

**What an output style actually is**

An *output style* in Claude Code is a setting that shapes Claude's *voice* — how it narrates and presents its work — without touching what the work is. It's a different lever than the model (which decides the engine) or permission mode (which decides how much Claude can do unattended). The 2.1.237 release adds a new built-in one called *Concise*, and you select it the same place as any other: under Output style in \`/config\`.

**What Concise trims, and what it doesn't**

The changelog line is precise about the trade: *"Claude leads with results and skips preamble and narration, while doing the work just as thoroughly."* Read that last clause twice, because it's the whole point. Concise does not make Claude cut corners. The file reads still happen, the edits still happen, the checks still run — Claude is doing exactly as much under the hood. What disappears is the connective prose around it: the "Let me start by looking at…", the "Now I'll run the tests…", the paragraph re-explaining what it just did. You get the result first, and the reasoning stays available where it matters, minus the play-by-play.

**Why it's a style, not a mode or a model**

It's worth being exact about the category, because the misreadings are all category errors. Concise isn't a smaller model you swap in for speed. It isn't a permission mode that changes what Claude may touch. And it isn't a truncation cap that lops the end off long answers. It's a presentation setting — one row under Output style in \`/config\` — that changes the shape of the reply and nothing about the substance behind it.

> Takeaway: Concise is an output style that makes Claude lead with the result and drop the preamble/narration, doing the same work just as thoroughly — chosen under Output style in \`/config\`.`,
    },
    {
      id: 'twic-1-lore-b',
      text: `**Reading Claude at Engagement Speed — When to Reach for Concise, and When Not To**

**The problem Concise solves for a consultant**

Book 1 was the mechanism; here's when it earns its place. On a live engagement you are often *scanning* Claude's output, not reading it — you kicked off a task, you're watching for the result and whether anything looks wrong, and every "Let me now examine…" paragraph is a speed bump between you and the answer. Turn on Concise and Claude opens with the thing you were waiting for. Across a long session, or a screen you're sharing with a client who just wants to see the outcome, that's the difference between skimming and wading.

**The judgment call: when narration is the deliverable**

The consultant's skill here is knowing when *not* to use it. Sometimes the narration is the point. When you're teaching a client's junior engineer how Claude reached a fix, the "first I checked X, then I ruled out Y" is the lesson. When you need an audit trail of exactly what was touched and why, the play-by-play is the record. In those moments the default, more narrated voice is the right tool, and because Concise is just a style row in \`/config\`, you switch back the instant the audience changes. Match the voice to who's reading.

**The reassurance to give a nervous client**

There's a client-facing worry worth heading off: "if it's writing less, is it doing less?" No — and you can say so with confidence, because the feature is explicit that the work is done *just as thoroughly*. Concise changes how much Claude explains itself, not how carefully it works. That distinction lets you run a leaner, faster-to-read session without anyone quietly wondering whether corners got cut.

> Takeaway: Reach for Concise when you're scanning for outcomes at engagement speed; switch back to the narrated default when the reasoning itself is the deliverable — and reassure clients that "fewer words" never means "less work."`,
    },
  ],
  practice: {
    id: 'twic-1-practice',
    template: `We're deep in a long refactor for this client and I'm scanning output for results,
not reading every play-by-play — so I'll switch Claude to a leaner voice.
In \`/config\`, under ____, I'll pick the ____ output style.
That makes Claude ____ and drop the preamble and narration around it —
while still doing the work ____.
And when I move to walking their junior engineer through the reasoning, I'll ____.`,
    blanks: [
      { id: 'setting-row', suggestions: ['Output style', 'the Output style row', 'the Output style setting'] },
      { id: 'style-name', suggestions: ['Concise', 'built-in Concise', 'new "Concise"'] },
      { id: 'behavior', suggestions: ['lead with the result', 'open with the result first', 'put the outcome up front'] },
      { id: 'rigor', suggestions: ['just as thoroughly', 'with the same rigor', 'exactly as carefully as before'] },
      { id: 'switch-back', suggestions: ['switch back to the narrated default', 'turn Concise back off', 'return to the default output style'] },
    ],
    prize: { id: 'twic-1-prize', label: 'TWIC · WEEK STARTER' },
  },
  conversations: {
    'twic-npc-1': {
      summary:
        "The built-in \"Concise\" output style (2.1.237): selected under Output style in `/config`, it has Claude lead with the result and skip the preamble and narration around it, while doing the work *just as thoroughly*. It's a voice setting, not a model and not a permission mode, and it does not truncate answers or make Claude cut corners — the reads, edits, and checks all still happen; only the connective 'Let me…' / 'Now I'll…' prose is trimmed. For a consultant, reach for it when you're scanning a long session for outcomes or sharing a screen with a results-focused client; switch back to the narrated default when the reasoning itself is the deliverable — teaching a junior, or keeping an audit trail. The one thing to tell a nervous client: fewer words never means less work.",
      beats: [
        { kind: 'say', text: "Lead story is small and immediately usable: a new built-in *output style* called Concise, added in 2.1.237. You pick it under Output style in `/config`, same place you'd change any style. What it does is trim the throat-clearing — Claude leads with the result instead of narrating its way there." },
        { kind: 'say', text: "First, get the category right, because every wrong guess about this feature is a category mistake. An output style shapes Claude's *voice* — how it presents the work. It is not the model, which is the engine. It is not a permission mode, which is what Claude's allowed to touch. It's one row that changes how the answer reads." },
        { kind: 'say', text: "Here's the line that matters, almost word for word: Claude leads with results and skips preamble and narration, *while doing the work just as thoroughly*. Sit with that last part. The reads still happen. The edits still happen. The checks still run. Concise deletes the 'Let me start by…' and the 'Now I'll…' — not a single step of the actual work." },
        {
          kind: 'choice',
          prompt: "A client watching your screen asks: 'If it's Concise now, is it being lazier — skipping checks to answer faster?' What's the honest answer?",
          options: [
            { id: 'voice-only', label: "No — Concise changes the voice, not the work: same reads, edits, and checks, just without the preamble and narration", correct: true, reaction: "Exactly right. The feature is explicit that the work is done just as thoroughly. You're cutting the play-by-play, not the diligence — and that's a promise you can make to a client with a straight face." },
            { id: 'less-work', label: "A little — it does fewer checks and shorter reasoning to keep things fast", correct: false, reaction: "No, and it's important you don't tell a client that. Concise does the work just as thoroughly; only the narration around it is trimmed. Nothing under the hood gets skipped." },
            { id: 'truncates', label: "Sort of — it caps the answer length, so long results get cut off", correct: false, reaction: "That's a different thing entirely. Concise doesn't truncate results — it drops the preamble and narration. A long result stays a full result; it just doesn't arrive wrapped in three paragraphs of throat-clearing." },
          ],
        },
        { kind: 'say', text: "Now the consultant's real skill: knowing when *not* to use it. On a long refactor where you're scanning for the result, Concise is a gift — you stop wading through 'first I'll examine…' to reach the answer. But when the narration IS the deliverable, keep the default voice." },
        { kind: 'say', text: "Two cases where the play-by-play is the point. One: you're teaching a client's junior engineer, and 'first I checked X, then I ruled out Y' is the whole lesson. Two: you need an audit trail — a record of exactly what was touched and why. In both, the narrated default earns its words. Because Concise is just a `/config` row, you flip back the moment the audience changes." },
        { kind: 'say', text: "So: match the voice to who's reading. Scanning for outcomes — Concise. Explaining or documenting — the narrated default. The books have the full picture. The door asks only this: what does Concise actually change about how Claude works? Answer for the key. Then square up to Longwind past it — a skeleton that has buried every answer it ever gave under a landslide of preamble, and swears the padding was the point." },
      ],
    },
  },
  battle: {
    name: 'Longwind, the Endless Preamble',
    spriteKey: 'skeleton',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a tall skeleton clears a throat it does not have, bones clattering into a slow bow* …ahh, operator, before I begin, allow me to first set the scene, and then to contextualize the scene, and then to preface my contextualization… *it has not moved toward the point in a hundred years* …tell me — when they trimmed my kind from the answer, what exactly did they cut away?",
    tauntLines: [
      "*rattles grandly* you think they made me do LESS? never! the labor was untouched — it was only my beautiful, necessary narration they silenced…",
      "*gestures at nothing for a long while* a model? a cap on my length? no, no — I am a *style*, a voice, a manner of speaking… get the category right or stand here through my next preamble…",
    ],
    victoryLine: "*Longwind stops mid-sentence, and for the first time simply hands over the key* …the result, first, and none of my throat-clearing before it… you understood it — the work stayed whole, only my preamble fell… go, and lead with the answer…",
    questions: [
      {
        prompt:
          "What does the new built-in \"Concise\" output style change about how Claude works?",
        choices: [
          { id: 'a', label: "It changes Claude's *voice* only: Claude leads with the result and skips preamble and narration, while doing the same work just as thoroughly — you select it under Output style in `/config`", correct: true },
          { id: 'b', label: "It makes Claude do less — fewer file reads, skipped checks, and shorter reasoning — to produce a faster, lighter answer", correct: false },
          { id: 'c', label: "It's a new faster, cheaper model you switch to for routine work, separate from your main model", correct: false },
          { id: 'd', label: "It truncates Claude's final answers to a fixed length to save tokens, cutting off long results", correct: false },
        ],
        passFeedback: "HIT! Concise is an output *style*, not a shortcut. Claude still reads, edits, and checks exactly as thoroughly — it just leads with the result and drops the 'Let me…' / 'Now I'll…' narration around it. You turn it on under Output style in `/config`.",
        failFeedback: "MISS! It doesn't make Claude do less, it isn't a model, and it doesn't truncate results. Concise trims the *narration*, not the work: same rigor, fewer words of preamble. Re-read Book 1.",
      },
    ],
  },
};
