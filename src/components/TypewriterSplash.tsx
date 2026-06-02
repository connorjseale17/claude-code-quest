import { useState, useEffect, useRef, useCallback } from 'react';
import { TerminalFrame, Cursor } from './TerminalFrame';

/**
 * Reusable typewriter / sectioned-screen engine. Both the Origin Splash
 * (before Level 1) and the Wrap-Up Splash (after Level 6) are thin wrappers
 * around this — same interaction model, different sections, different exit.
 *
 * Interaction model (per the Origin Splash PRD, mirrored by Wrap-Up PRD):
 *  - Typewriter reveal per section
 *  - Click / tap / SPACE / Enter on an in-progress section completes it
 *    instantly; on a finished section advances to the next
 *  - Escape (and a Skip button) skip the whole sequence
 *  - Final advance fades the screen to black, then calls onAdvanceFinal
 */

export type TypewriterSection = { title: string; text: string };

export interface TypewriterSplashProps {
  sections: TypewriterSection[];
  /** Title shown in the TerminalFrame chrome. */
  frameTitle: string;
  /** Fired after the exit fade completes — typically dispatches a phase change. */
  onAdvanceFinal: () => void;
  /** Fired when the Skip button is clicked (Escape also triggers it). */
  onSkip: () => void;
  /** Per-character typing speed. Default 18ms ≈ 7s for a 400-char section. */
  typeIntervalMs?: number;
  /** Section-to-section fade-in duration. Default 280ms. */
  sectionFadeMs?: number;
  /** Whole-screen exit fade duration before onAdvanceFinal fires. Default 700ms. */
  exitFadeMs?: number;
  /** Override the Skip button label. Default "SKIP INTRO →". */
  skipLabel?: string;
  /** Override the "press SPACE" hint shown after the final section types out.
   *  Default "click or press SPACE to begin". */
  finalAdvanceHint?: string;
}

const ACCENT = '#E8633D';

export function TypewriterSplash({
  sections,
  frameTitle,
  onAdvanceFinal,
  onSkip,
  typeIntervalMs = 18,
  sectionFadeMs = 280,
  exitFadeMs = 700,
  skipLabel = 'SKIP INTRO →',
  finalAdvanceHint = 'click or press SPACE to begin',
}: TypewriterSplashProps) {
  const [sectionIdx, setSectionIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [sectionVisible, setSectionVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Ref so the keyboard handler reads fresh state without re-binding listeners
  // on every keystroke of the typewriter.
  const stateRef = useRef({ typed: '', sectionIdx: 0, isExiting: false });
  stateRef.current = { typed, sectionIdx, isExiting };

  const currentSection = sections[sectionIdx];
  const isComplete = typed === currentSection.text;

  // ---- Section fade-in + typewriter ----
  useEffect(() => {
    setSectionVisible(false);
    setTyped('');
    if (isExiting) return;
    const fadeId = window.setTimeout(() => setSectionVisible(true), 60);
    let i = 0;
    const text = sections[sectionIdx].text;
    const typeId = window.setInterval(() => {
      i++;
      if (i >= text.length) {
        setTyped(text);
        clearInterval(typeId);
      } else {
        setTyped(text.slice(0, i));
      }
    }, typeIntervalMs);
    return () => {
      clearTimeout(fadeId);
      clearInterval(typeId);
    };
  }, [sectionIdx, isExiting, sections, typeIntervalMs]);

  const advance = useCallback(() => {
    const s = stateRef.current;
    if (s.isExiting) return;
    const text = sections[s.sectionIdx].text;
    if (s.typed !== text) {
      setTyped(text); // skip typewriter on the current section
      return;
    }
    if (s.sectionIdx < sections.length - 1) {
      setSectionIdx(s.sectionIdx + 1);
    } else {
      setIsExiting(true);
      window.setTimeout(onAdvanceFinal, exitFadeMs);
    }
  }, [sections, onAdvanceFinal, exitFadeMs]);

  const skipAll = useCallback(() => {
    if (stateRef.current.isExiting) return;
    setIsExiting(true);
    window.setTimeout(onSkip, exitFadeMs);
  }, [onSkip, exitFadeMs]);

  // Keyboard: SPACE/Enter advance; Escape skips
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
    <TerminalFrame title={frameTitle}>
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
          transition: `opacity ${exitFadeMs}ms ease`,
          cursor: 'pointer',
          background: '#070707',
          userSelect: 'none',
        }}
      >
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
          {skipLabel}
        </button>

        <div
          style={{
            color: ACCENT,
            fontSize: 11,
            letterSpacing: '0.18em',
            marginBottom: 18,
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(6px)',
            transition: `opacity ${sectionFadeMs}ms ease, transform ${sectionFadeMs}ms ease`,
          }}
        >
          ── SECTION {sectionIdx + 1} OF {sections.length} · {currentSection.title.toUpperCase()} ──
        </div>

        <div
          style={{
            fontSize: 17,
            lineHeight: 1.75,
            maxWidth: 760,
            minHeight: 200,
            color: '#E8E8E8',
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: `opacity ${sectionFadeMs}ms ease ${sectionFadeMs / 2}ms, transform ${sectionFadeMs}ms ease ${sectionFadeMs / 2}ms`,
          }}
        >
          {typed}
          {!isComplete && <Cursor />}
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 12,
            letterSpacing: '0.06em',
            minHeight: 22,
            color: isComplete ? '#3FB950' : '#3A3A3A',
            opacity: sectionVisible ? 1 : 0,
            transition: `opacity ${sectionFadeMs}ms ease ${sectionFadeMs}ms`,
          }}
        >
          {isComplete ? (
            sectionIdx < sections.length - 1 ? (
              <>
                <span style={{ animation: 'cc-glow 1.4s ease-in-out infinite' }}>▶</span>{' '}
                <span style={{ color: '#E8E8E8' }}>click or press SPACE to continue</span>
              </>
            ) : (
              <>
                <span style={{ animation: 'cc-glow 1.4s ease-in-out infinite' }}>▶</span>{' '}
                <span style={{ color: '#E8E8E8' }}>{finalAdvanceHint}</span>
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
