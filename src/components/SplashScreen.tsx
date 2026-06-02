import { useState, useEffect, useCallback, useRef } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { TerminalFrame, Cursor } from './TerminalFrame';
import { BotIdle } from './PixelSprite';
import { TWIC_ISSUE_INTRO } from '../content/twic-issue';

const LINES = [
  '> Welcome to Claude Code Quest.',
  '> A game about the tool that built it.',
  '> This week\'s drop first, then the curriculum.',
];

export function SplashScreen() {
  const { player } = useGame();
  const dispatch = useGameDispatch();
  const [currentLine, setCurrentLine] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [allDone, setAllDone] = useState(false);
  const cancelRef = useRef(false);

  const skipAll = useCallback(() => {
    cancelRef.current = true;
    setCurrentLine(LINES.length);
    setCharIdx(0);
    setAllDone(true);
  }, []);

  useEffect(() => {
    if (currentLine >= LINES.length) {
      setAllDone(true);
      return;
    }

    cancelRef.current = false;
    const line = LINES[currentLine];
    let idx = 0;
    let timeout: number;

    const tick = () => {
      if (cancelRef.current) return;
      idx++;
      if (idx >= line.length) {
        setCharIdx(idx);
        timeout = window.setTimeout(() => {
          if (cancelRef.current) return;
          setCurrentLine(c => c + 1);
          setCharIdx(0);
        }, 200);
      } else {
        setCharIdx(idx);
        timeout = window.setTimeout(tick, 35);
      }
    };

    timeout = window.setTimeout(tick, 35);
    return () => {
      cancelRef.current = true;
      clearTimeout(timeout);
    };
  }, [currentLine]);

  const completedLines = LINES.slice(0, currentLine);

  useEffect(() => {
    const advance = () => {
      if (allDone) {
        dispatch({ type: 'ADVANCE_PHASE' });
      } else {
        skipAll();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      // Ignore modifier-only keys
      if (e.key === 'Meta' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Shift') return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      e.preventDefault();
      advance();
    };
    const handleTap = (e: MouseEvent) => {
      // Don't hijack real button taps (dev menu chrome, etc.)
      if ((e.target as HTMLElement)?.closest?.('button')) return;
      advance();
    };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('click', handleTap);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('click', handleTap);
    };
  }, [allDone, dispatch, skipAll]);

  const partialLine = currentLine < LINES.length
    ? LINES[currentLine].slice(0, charIdx)
    : null;

  return (
    <TerminalFrame title="claude-code-quest --v1.0" accent>
      <div className="crt-scanlines flex h-full" style={{ padding: 32 }}>
        <div
          className="flex flex-col justify-between flex-1"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <div>
            <div style={{ color: '#7D7D7D', fontSize: 12, marginBottom: 4 }}>
              Last login: Thu May 15 09:42:01 on ttys001
            </div>
            <div style={{ color: '#7D7D7D', fontSize: 12, marginBottom: 28 }}>
              ~/claude-code-quest
            </div>

            <div style={{ fontSize: 18, lineHeight: 2.0 }}>
              {completedLines.map((line, i) => (
                <div key={i}>
                  <span style={{ color: '#E8633D' }}>{line.slice(0, 1)}</span>
                  <span style={{ color: '#E8E8E8' }}>{line.slice(1)}</span>
                </div>
              ))}
              {partialLine !== null && (
                <div>
                  <span style={{ color: '#E8633D' }}>{partialLine.slice(0, 1)}</span>
                  <span style={{ color: '#E8E8E8' }}>{partialLine.slice(1)}</span>
                  <Cursor />
                </div>
              )}
            </div>
          </div>

          <div>
            {/* This Week in Claude — the dated issue tile. Refreshed weekly by
                the TWiC content routine via TWIC_ISSUE_INTRO. */}
            <div
              style={{
                border: '1px solid #5AA9FF',
                borderLeftWidth: 4,
                padding: '10px 16px',
                marginBottom: 16,
                maxWidth: 520,
                background: 'rgba(45,108,192,0.08)',
              }}
            >
              <div style={{ color: '#5AA9FF', fontSize: 11, letterSpacing: '0.14em', marginBottom: 6 }}>
                ▦ {TWIC_ISSUE_INTRO.title.toUpperCase()} · {TWIC_ISSUE_INTRO.date}
              </div>
              <div style={{ color: '#A9C7E8', fontSize: 12, lineHeight: 1.5 }}>
                {TWIC_ISSUE_INTRO.framing}
              </div>
            </div>

            <div
              style={{
                border: '1px solid #E8633D',
                padding: '14px 20px',
                display: 'inline-block',
                marginBottom: 20,
                opacity: allDone ? 1 : 0.3,
                transition: 'opacity 0.3s',
              }}
            >
              <span style={{ color: '#E8633D', fontSize: 14 }}>{'>'}</span>
              <span style={{ color: '#E8E8E8', fontSize: 14, marginLeft: 8 }}>
                PRESS ANY KEY TO START
              </span>
              {allDone && <Cursor />}
            </div>

            <div style={{ color: '#3A3A3A', fontSize: 11 }}>
              v1.0 · desktop only · dark forever
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center" style={{ marginLeft: 40 }}>
          <BotIdle scale={12} primaryColor={player.botColor} />
          <div style={{ color: '#7D7D7D', fontSize: 11, marginTop: 12 }}>~/bot</div>
        </div>
      </div>
    </TerminalFrame>
  );
}
