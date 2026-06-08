import { useCallback } from 'react';
import { useGameDispatch } from '../engine/GameContext';
import { TypewriterSplash, type TypewriterSection } from './TypewriterSplash';

// Per the PRD, copy is final for v1. Do not auto-generate or vary.
// Six discrete beats; advanced one at a time via click/tap/keyboard.
const ORIGIN_SECTIONS: TypewriterSection[] = [
  {
    title: 'The Old Way',
    text: "Not long ago, getting a computer to do something new meant one of two things. You either learned to write code yourself, slowly, over years. Or you described what you wanted to someone who could, and waited. The gap between having an idea and shipping it was wide, and most people in business never crossed it. They had the ideas. They just didn't have the keys.",
  },
  {
    title: 'The Shift',
    text: "Then language models learned to write software. Not perfectly, not magically, but well enough that the bottleneck moved. Suddenly the scarce skill wasn't typing code. It was knowing what to ask for, and knowing what good looked like when it came back. The keys were handed to anyone who could describe a problem clearly. That includes you.",
  },
  {
    title: 'What Claude Code Is',
    text: "Claude Code is an AI that works the way a capable colleague does. It lives where the real work happens — your files, your tools, your terminal — and it reads, writes, builds, and ships alongside you. It is not a chatbot you copy answers out of. It does the work in place, checks itself, and hands you something finished. Think less “search engine,” more “the sharpest junior on the team who never sleeps.”",
  },
  {
    title: 'Why This Matters For You',
    text: "For a consultant, this changes the math of the job. The proposal that took a day takes an hour. The prototype you used to describe in a deck, you now hand the client as something they can click. The research, the first drafts, the repetitive build work — all of it compresses. What's left is the part that was always the real value: judgment, taste, knowing which problem is worth solving. The tool handles the typing. You handle the thinking.",
  },
  {
    title: 'The Journey Ahead',
    text: "Over the next seven levels you'll learn to drive it properly. How to control what it can and can't touch. How to give it the context that makes it sharp instead of generic. How to bend it to your firm's way of working, connect it to your real tools, and put whole teams of these agents to work at once. By the end you won't just know what Claude Code is. You'll know how to make it earn its place in how you work.",
  },
  {
    title: 'Begin',
    text: "The gap between your ideas and what you can ship is closing. This is how you cross it. Step in.",
  },
];

export function OriginSplash() {
  const dispatch = useGameDispatch();
  const dismiss = useCallback(() => dispatch({ type: 'DISMISS_ORIGIN' }), [dispatch]);
  return (
    <TypewriterSplash
      sections={ORIGIN_SECTIONS}
      frameTitle="before you begin"
      onAdvanceFinal={dismiss}
      onSkip={dismiss}
      skipLabel="SKIP INTRO →"
      finalAdvanceHint="click or press SPACE to begin"
    />
  );
}
