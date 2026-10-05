import type { LessonContent } from './types';

/**
 * twic-3 (Feature C) — recovery for a Ctrl+C-cleared prompt. 2.1.288 adds a
 * safety net for the common slip of clearing a typed prompt with Ctrl+C: press
 * Up on the now-empty prompt and the cleared draft comes back — including any
 * pasted text and images it contained. The undo for a draft you didn't mean to
 * discard.
 * Sources:
 *   - Claude Code CHANGELOG 2.1.288: "Added recovery for Ctrl+C cleared prompt:
 *     pressing Up on empty prompt brings draft back, including pasted
 *     text/images"
 * Field shapes are fixed by the TWiC scaffolding; only the strings change weekly.
 */
export const twic3Content: LessonContent = {
  roomId: 'twic-room-3',
  intro:
    "Room three closes the issue, and the Beat Reporter points up at a wyrm that swallows whole drafts the instant a hand slips on the keys. This week's last item is small and entirely human: 2.1.288 adds recovery for a prompt you clear with Ctrl+C — press Up on the now-empty prompt and the whole draft comes back, pasted text and images included. One book covers the mechanic — what Ctrl+C does and how Up brings it back; the other, why a carefully composed brief is a small deliverable worth a safety net. Answer the door for the key, then face Draftmaw, the devourer that mistook your Ctrl+C for a meal.",
  prompt:
    "You've typed a long, carefully scoped brief into the prompt, then hit Ctrl+C and the whole thing clears. How do you get your draft back?",
  choices: [
    { id: 'a', label: "Press Up on the now-empty prompt — it brings the cleared draft back, including any pasted text and images it held", correct: true },
    { id: 'b', label: "Restart the session with a recovery flag to restore the last unsent prompt", correct: false },
    { id: 'c', label: "It's gone — Ctrl+C discards the draft for good, so you retype it from memory", correct: false },
    { id: 'd', label: "Press Ctrl+Z, the standard undo, to bring the cleared text back", correct: false },
  ],
  passFeedback: "HIT! After Ctrl+C clears the prompt, pressing Up on the empty prompt brings your draft right back — pasted text and images included. The slip is recoverable.",
  failFeedback: "MISS! No restart flag, no Ctrl+Z, and it isn't gone for good — pressing Up on the *empty* prompt restores the cleared draft. Re-read Book 1.",
  lore: [
    {
      id: 'twic-3-lore-a',
      text: `**Up Brings It Back — Recovering a Prompt You Cleared with Ctrl+C**

**What Ctrl+C does to a draft**

In a terminal, Ctrl+C is the universal "stop/cancel" key, and in Claude Code one of the things it cancels is a prompt you're in the middle of typing: hit it with text in the box and the box clears. Usually that's what you want — you've changed your mind, you want a blank slate. But it's also the classic fat-finger: you meant to copy, or to interrupt something else, and instead you wiped a message you'd spent real time composing. For a long time that draft was simply gone.

**The Up-arrow rescue**

As of 2.1.288 it isn't. The recovery is a single keystroke: press *Up* on the now-empty prompt, and the draft you just cleared comes back into the box, ready to keep editing or send. The nice touch is that it reuses a key your fingers already know. Normally Up on an empty prompt walks back through your history; this feature makes the *just-cleared draft* the first thing Up reaches for, so the muscle memory of "press Up to get the last thing back" now rescues the message you didn't mean to lose.

**Pasted text and images come too**

The recovery isn't a lossy shadow of what you had — it brings the whole thing. If your cleared prompt included pasted text, that text comes back. If it included pasted images, the images come back too, not just the words around them. That matters, because the drafts most painful to lose are exactly the rich ones: the long brief with a screenshot pasted in, the message you assembled from three different sources. Up restores the full draft, attachments and all, not a plain-text skeleton of it.

> Takeaway: If Ctrl+C clears a prompt you didn't mean to discard, press Up on the empty prompt and the whole draft comes back — pasted text and images included.`,
    },
    {
      id: 'twic-3-lore-b',
      text: `**The Brief Is Work — Why Losing a Draft Costs More Than Keystrokes**

**A scoped brief is a small deliverable**

It's tempting to think of what you type into the prompt as throwaway — just a message, retype it, no big deal. But a good brief isn't throwaway. Naming the deliverable, the client, the constraints, the stack, the thing you explicitly *don't* want — that's thinking made concrete, and it's the single highest-leverage artifact in the whole session, because the quality of everything Claude does flows from it. Losing a sharp brief isn't losing keystrokes. It's losing the five minutes of clear thought that produced them, and the reconstruction from memory is never quite as good as the original.

**The stray Ctrl+C mid-compose**

Picture the moment this feature is for. You're deep in a long prompt, pasting in a snippet of the client's spec, fitting the phrasing just so — and your hand slips to Ctrl+C out of terminal reflex, or you fire it to kill something else and the prompt catches the blow. The box goes blank. The old instinct is a quiet sinking feeling and a grudging retype. The new instinct is one key: Up, and it's all back. The difference between those two instincts is a few minutes and a lot of morale, every time it happens.

**Knowing the undo exists changes how you work**

Here's the part that outlasts any single rescue: a safety net you trust changes how boldly you move. If you *know* a stray Ctrl+C can't swallow your draft, you stop typing defensively — you compose the long, precise brief right there in the prompt instead of hedging in a scratch file against the slip. The recovery's real payoff isn't the drafts it saves after the fact; it's the carefulness it lets you drop beforehand, because the floor is there whether or not you ever fall to it.

> Takeaway: Treat the prompt as real work — a composed brief is your highest-leverage artifact, so knowing Up recovers a Ctrl+C'd draft lets you compose boldly instead of defensively.`,
    },
  ],
  practice: {
    id: 'twic-3-practice',
    template: `I've spent five minutes composing a precise brief right in the prompt — the deliverable, the client, the constraints,
with a snippet of their spec pasted in the middle of it.
Then my hand slips to ____ out of terminal reflex, and the whole draft clears in an instant.
Old instinct says it's gone and I retype it from memory. Not anymore.
I press ____ on the empty prompt, and the draft comes back — ____ included.
Knowing that net is there, I compose long briefs boldly instead of hedging in a scratch file.`,
    blanks: [
      { id: 'ctrlc', suggestions: ['Ctrl+C', 'the cancel key', 'the wrong key'] },
      { id: 'up', suggestions: ['Up', 'the Up arrow', 'Up on the empty prompt'] },
      { id: 'extras', suggestions: ['the pasted text and images', 'everything I pasted', 'the pasted snippet too'] },
    ],
    prize: { id: 'twic-3-prize', label: 'TWIC · ISSUE COMPLETE' },
  },
  conversations: {
    'twic-npc-3': {
      summary:
        "Recovery for a Ctrl+C-cleared prompt (Claude Code 2.1.288): Ctrl+C clears a prompt you're typing — usually what you want, sometimes a fat-finger that wipes a message you spent real time on. As of 2.1.288, pressing Up on the now-empty prompt brings that just-cleared draft back, ready to edit or send. It reuses the Up key (normally history navigation) so the 'press Up to get the last thing back' muscle memory now rescues the lost draft, and it restores the WHOLE draft — pasted text and images included, not a plain-text skeleton. For a consultant: a scoped brief is a small deliverable and your highest-leverage artifact, so losing it costs the thinking, not just the keystrokes. Knowing the undo exists lets you compose long, precise briefs boldly in the prompt instead of hedging defensively in a scratch file.",
      beats: [
        { kind: 'say', text: "Last room of the issue, and it's the most human item on the list. You know the feeling: you've typed a long, careful message, your hand slips, and it's gone. This week that stops being fatal." },
        { kind: 'say', text: "Start with what Ctrl+C does. In a terminal it's the universal cancel key, and here one of the things it cancels is a prompt you're typing — hit it with text in the box and the box clears. Half the time that's exactly what you wanted. The other half, you meant to copy, or to kill something else, and you just wiped a message you'd spent real time on." },
        { kind: 'say', text: "As of 2.1.288, one keystroke brings it back: press Up on the now-empty prompt and the cleared draft returns, ready to edit or send. It reuses a key you already trust — normally Up walks your history, but now the just-cleared draft is the first thing it reaches for. Same muscle memory, new rescue." },
        {
          kind: 'choice',
          prompt: "Your cleared prompt had a paragraph of text *and* a screenshot you'd pasted in. You press Up. What comes back?",
          options: [
            { id: 'whole', label: "The whole draft — the text and the pasted image both", correct: true, reaction: "Right. It's not a lossy shadow — pasted text and images both come back. The drafts most painful to lose are the rich ones, so it restores them whole." },
            { id: 'textonly', label: "Just the text; the image is lost and you re-paste it", correct: false, reaction: "Better than that — it brings the images too, not a plain-text skeleton. The screenshot returns with the words around it." },
            { id: 'nothing', label: "Nothing — Up only works on plain, un-pasted prompts", correct: false, reaction: "No — Up restores the full draft regardless, pasted text and images included. That's the whole point of it." },
          ],
        },
        { kind: 'say', text: "Why a consultant should care about something this small: the brief isn't throwaway. Naming the deliverable, the client, the constraints, the thing you *don't* want — that's thinking made concrete, and it's the highest-leverage artifact in the session, because everything I do flows from it. Lose it and you've lost the five minutes of clear thought, not just the typing." },
        { kind: 'say', text: "And here's the part that outlasts any one rescue. A net you trust changes how boldly you move. If you *know* a stray Ctrl+C can't eat your draft, you stop typing defensively — you compose the long, precise brief right here in the prompt instead of hedging in a scratch file. The real payoff isn't the saves; it's the carefulness you get to drop." },
        { kind: 'say', text: "The books have the mechanic and the why-it-matters both. Answer the door for the key — then face the last guardian of the issue: Draftmaw, a wyrm that swallows whole drafts the instant a hand slips. Show it the one key that reaches down its throat and pulls your work back out." },
      ],
    },
  },
  battle: {
    name: 'Draftmaw, the Devourer of Drafts',
    spriteKey: 'dragon',
    maxHP: 1,
    playerHP: 5,
    phases: 1,
    introLine: "*a long wyrm uncoils over a hoard of half-eaten messages, jaws still working on a brief someone lost moments ago* …another careful draft, another slip of the hand… one twitch toward Ctrl+C and I swallow the lot — the words, the pastes, the picture tucked inside… you say a single key reaches back down my throat and takes it all? …speak true how you recover a prompt I've devoured, before I gulp the next.",
    tauntLines: [
      "*gulps, smug* you think it *gone for good*, don't you — that once I've swallowed a draft you retype it from memory and thank me for the lesson? no longer… Up on the empty prompt and the whole thing comes back up whole…",
      "*snorts a plume* you'd grope for some *restart flag*, relaunch the session praying the last prompt survived? waste of breath… the rescue is one key on the empty prompt, not a reboot and a prayer…",
    ],
    victoryLine: "*Draftmaw gags and brings the draft back up intact — every word, every paste, the image unchewed* …Up… one key on the empty prompt and the whole draft is yours again, pastes and pictures and all… I cannot keep what a single keystroke can reclaim… take the key, operator, and compose without fear of my jaws.",
    questions: [
      {
        prompt:
          "You've typed a long, carefully scoped brief into the prompt, then hit Ctrl+C and the whole thing clears. How do you get your draft back?",
        choices: [
          { id: 'a', label: "Press Up on the now-empty prompt — it brings the cleared draft back, including any pasted text and images it held", correct: true },
          { id: 'b', label: "Restart the session with a recovery flag to restore the last unsent prompt", correct: false },
          { id: 'c', label: "It's gone — Ctrl+C discards the draft for good, so you retype it from memory", correct: false },
          { id: 'd', label: "Press Ctrl+Z, the standard undo, to bring the cleared text back", correct: false },
        ],
        passFeedback: "HIT! After Ctrl+C clears the prompt, pressing Up on the empty prompt brings your draft right back — pasted text and images included. The slip is recoverable.",
        failFeedback: "MISS! No restart flag, no Ctrl+Z, and it isn't gone for good — pressing Up on the *empty* prompt restores the cleared draft. Re-read Book 1.",
      },
    ],
  },
};
