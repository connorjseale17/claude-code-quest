import { useCallback } from 'react';
import { useGameDispatch } from '../engine/GameContext';
import { TypewriterSplash, type TypewriterSection } from './TypewriterSplash';

/**
 * The wrap-up bookend to the Origin Splash. Plays after Level 6's boss falls,
 * before the Certification Page. Same interaction model as the Origin Splash
 * (typewriter, click-to-advance, skip, fade-out exit) — see TypewriterSplash.
 *
 * Content reflects the actual curriculum across the six levels (welcome.ts,
 * claudemd.ts, slash.ts, mcp.ts, subagents.ts, final-boss.ts). If the levels
 * change later, update these strings to match — keep it true to what the game
 * actually teaches, never claim something the levels don't cover.
 */
const WRAPUP_SECTIONS: TypewriterSection[] = [
  {
    title: 'You Crossed It',
    text: "You did it. Six levels, five bosses, and one final synthesis test in the throne room. You walked in not sure what Claude Code was. You're walking out with a way of working. The gap you stepped over on the title screen — between an idea and something you can actually ship — you just crossed it. Welcome to the other side.",
  },
  {
    title: 'The Dial, The Brief, The Contract',
    text: "You learned to set the trust dial — Plan when the stakes are high, Accept Edits when you trust the direction, Auto for the low-stakes loops, Shift+Tab to change gears mid-session. You learned to brief like you'd brief a sharp new hire: name the deliverable, the client, the stack. And you learned to make that briefing permanent — CLAUDE.md, the project contract that turns one-time prompts into how the project always works.",
  },
  {
    title: 'Custom Commands, Connected Tools',
    text: "You built your own commands and skills, so the work your firm does every week stops being typed from scratch every week. You learned where hooks belong — the law, not the advice. And you opened the doors: MCP servers that let Claude talk to GitHub, your docs, your warehouse, your browser, your real tools. Claude stopped being text in a window and started being a colleague in the room.",
  },
  {
    title: 'A Team You Can Run',
    text: "You learned to stop working alone. One Explore subagent reading the whole repo while your main context stays clean. A Critic checking what the Generator built. Three researchers, three briefs, in parallel. You stopped thinking in one conversation and started thinking in fleets — agents you spawn, brief, and have report back. That is the math change the consulting world is just starting to grasp.",
  },
  {
    title: 'The Synthesis',
    text: "The Gatekeeper wasn't a new lesson. He was the test that you carry all the others at once. You know to reach for the cheapest fix for the friction first — a CLAUDE.md line beats a hundred prompts, a hook beats reminding yourself, a subagent beats burning your main context. Lowest-friction tool first, heavier ones only when the work demands it. That is the dial. It is yours now.",
  },
  {
    title: 'Make It Official',
    text: "You are no longer someone who has heard of Claude Code. You are someone who runs it. The proposal that used to take a day, the prototype you used to describe in a deck, the audit you used to outsource — you can ship those before lunch now. The keys you didn't have at the start of this run? You have them. You've earned this. Let's make it official.",
  },
];

export function WrapUpSplash() {
  const dispatch = useGameDispatch();
  const advance = useCallback(() => dispatch({ type: 'DISMISS_WRAP_UP' }), [dispatch]);
  return (
    <TypewriterSplash
      sections={WRAPUP_SECTIONS}
      frameTitle="claude-code-quest --complete"
      onAdvanceFinal={advance}
      onSkip={advance}
      skipLabel="SKIP →"
      finalAdvanceHint="click or press SPACE for your certificate"
    />
  );
}
