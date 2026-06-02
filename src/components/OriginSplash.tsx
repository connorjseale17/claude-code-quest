import { useState, useEffect, useRef, useCallback } from 'react';
import { useGameDispatch } from '../engine/GameContext';
import { TerminalFrame, Cursor } from './TerminalFrame';

// Per the PRD, copy is final for v1. Do not auto-generate or vary.
// Six discrete beats; advanced one at a time via click/tap/keyboard.
type Section = { title: string; text: string };
const SECTIONS: Section[] = [
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
    text: "Over the next six levels you'll learn to drive it properly. How to control what it can and can't touch. How to give it the context that makes it sharp instead of generic. How to bend it to your firm's way of working, connect it to your real tools, and put whole teams of these agents to work at once. By the end you won't just know what Claude Code is. You'll know how to make it earn its place in how you work.",
  },
  {
    title: 'Begin',
    text: "The gap between your ideas and what you can ship is closing. This is how you cross it. Step in.",
  },
];

const TYPE_INTERVAL_MS = 18; // ~7s for a 400-char section; click-to-complete handles impatient users
const SECTION_FADE_MS = 280;
const EXIT_FADE_MS = 700;
const ACCENT = '#E8633D';

export function OriginSplash() {
  const dispatch = useGameDispatch();
  const [sectionIdx, setSectionIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [sectionVisible, setSectionVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  // Ref so the click/keyboard handler reads fresh state without re-binding listeners
  // every keystroke of the typewriter.
  const stateRef = useRef({ typed: '', sectionIdx: 0, isExiting: false });
  stateRef.current = { typed, sectionIdx, isExiting };

  const currentSection = SECTIONS[sectionIdx];
  const isComplete = typed === currentSection.text;

  // ---- Section fade-in + typewriter ----
  useEffect(() => {
    setSectionVisible(false);
    setTyped('');
    if (isExiting) return;
    // Quick fade-in lead so each beat has a moment of breath before it types.
    const fadeId = window.setTimeout(() => setSectionVisible(true), 60);
    let i = 0;
    const text = SECTIONS[sectionIdx].text;
    const typeId = window.setInterval(() => {
      i++;
      if (i >= text.length) {
        setTyped(text);
        clearInterval(typeId);
      } else {
        setTyped(text.slice(0, i));
      }
    }, TYPE_INTERVAL_MS);
    return () => {
      clearTimeout(fadeId);
      clearInterval(typeId);
    };
  }, [sectionIdx, isExiting]);

  // ---- Advance: complete in-progress typewriter on click, else next section.
  // On the final section's advance, fade the whole screen out, then dismiss.
  const advance = useCallback(() => {
    const s = stateRef.current;
    if (s.isExiting) return;
    const text = SECTIONS[s.sectionIdx].text;
    if (s.typed !== text) {
      setTyped(text); // skip typewriter on this section
      return;
    }
    if (s.sectionIdx < SECTIONS.length - 1) {
      setSectionIdx(s.sectionIdx + 1);
    } else {
      setIsExiting(true);
      window.setTimeout(() => dispatch({ type: 'DISMISS_ORIGIN' }), EXIT_FADE_MS);
    }
  }, [dispatch]);

  const skipAll = useCallback(() => {
    if (stateRef.current.isExiting) return;
    setIsExiting(true);
    window.setTimeout(() => dispatch({ type: 'DISMISS_ORIGIN' }), EXIT_FADE_MS);
  }, [dispatch]);

  // ---- Keyboard: Space/Enter advance; Escape skips the whole intro ----
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        advance();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        skipAll();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [advance, skipAll]);

  return (
    <TerminalFrame title="before you begin">
      <div
        onClick={advance}
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px 64px 32px',
          fontFamily: "'JetBrains Mono', monospace",
          color: '#E8E8E8',
          opacity: isExiting ? 0 : 1,
          transition: `opacity ${EXIT_FADE_MS}ms ease`,
          cursor: 'pointer',
          background: '#070707',
          userSelect: 'none',
        }}
      >
        {/* Skip control — top-right, stops propagation so click doesn't advance */}
        <button
          data-skip
          onClick={e => { e.stopPropagation(); skipAll(); }}
          style={{
            position: 'absolute',
            top: 18,
            right: 22,
            background: 'transparent',
            border: '1px solid #2A2A2A',
            color: '#7D7D7D',
            padding: '5px 12px',
            fontSize: 10,
            fontFamily: 'inherit',
            cursor: 'pointer',
            letterSpacing: '0.14em',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#E8E8E8'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#7D7D7D'; }}
        >
          SKIP INTRO →
        </button>

        {/* Section number + title (small, accent, cinematic header) */}
        <div
          style={{
            color: ACCENT,
            fontSize: 11,
            letterSpacing: '0.18em',
            marginBottom: 18,
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(6px)',
            transition: `opacity ${SECTION_FADE_MS}ms ease, transform ${SECTION_FADE_MS}ms ease`,
          }}
        >
          ── SECTION {sectionIdx + 1} OF {SECTIONS.length} · {currentSection.title.toUpperCase()} ──
        </div>

        {/* Typed body. Reserve min-height so layout doesn't jump as text grows. */}
        <div
          style={{
            fontSize: 17,
            lineHeight: 1.75,
            maxWidth: 760,
            minHeight: 200,
            color: '#E8E8E8',
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: `opacity ${SECTION_FADE_MS}ms ease ${SECTION_FADE_MS / 2}ms, transform ${SECTION_FADE_MS}ms ease ${SECTION_FADE_MS / 2}ms`,
          }}
        >
          {typed}
          {!isComplete && <Cursor />}
        </div>

        {/* Advance hint — pulses subtly when ready to continue */}
        <div
          style={{
            marginTop: 28,
            fontSize: 12,
            letterSpacing: '0.06em',
            minHeight: 22,
            color: isComplete ? '#3FB950' : '#3A3A3A',
            opacity: sectionVisible ? 1 : 0,
            transition: `opacity ${SECTION_FADE_MS}ms ease ${SECTION_FADE_MS}ms`,
          }}
        >
          {isComplete ? (
            sectionIdx < SECTIONS.length - 1 ? (
              <>
                <span style={{ animation: 'cc-glow 1.4s ease-in-out infinite' }}>▶</span>{' '}
                <span style={{ color: '#E8E8E8' }}>click or press SPACE to continue</span>
              </>
            ) : (
              <>
                <span style={{ animation: 'cc-glow 1.4s ease-in-out infinite' }}>▶</span>{' '}
                <span style={{ color: '#E8E8E8' }}>click or press SPACE to begin</span>
              </>
            )
          ) : (
            <>typing… <span style={{ color: '#7D7D7D' }}>(click to complete)</span></>
          )}
        </div>
      </div>
    </TerminalFrame>
  );
}
