import { useState, useEffect, useRef } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { TerminalFrame, Cursor } from './TerminalFrame';
import { BotIdle } from './PixelSprite';
import { COLORS } from '../lib/palette';

export function CustomizeScreen() {
  const { player } = useGame();
  const dispatch = useGameDispatch();
  const [name, setName] = useState(player.name);
  const [colorIdx, setColorIdx] = useState(
    Math.max(0, COLORS.findIndex(c => c.hex === player.botColor))
  );
  const [phase, setPhase] = useState<'name' | 'color'>('name');
  const inputRef = useRef<HTMLInputElement>(null);
  const autoTypeRef = useRef(true);

  // "operator" typewriter intro (only when there's no saved name yet).
  useEffect(() => {
    if (player.name) {
      autoTypeRef.current = false;
      return;
    }
    autoTypeRef.current = true;
    const target = 'operator';
    let idx = 0;
    let timeout: number;
    const tick = () => {
      if (!autoTypeRef.current) return;
      idx++;
      if (idx <= target.length) {
        setName(target.slice(0, idx));
        timeout = window.setTimeout(tick, 70);
      }
    };
    timeout = window.setTimeout(tick, 400);
    return () => { autoTypeRef.current = false; clearTimeout(timeout); };
  }, [player.name]);

  // Focus the name input on mount so the OS keyboard pops up on mobile,
  // and arrow/enter shortcuts work as the user expects on desktop.
  useEffect(() => {
    if (phase === 'name') {
      const id = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
  }, [phase]);

  // Keyboard shortcuts for the color phase (and Enter to advance from name).
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase === 'name') {
        if (e.key === 'Enter' && name.trim().length > 0) {
          e.preventDefault();
          autoTypeRef.current = false;
          setPhase('color');
        }
        return;
      }
      // phase === 'color'
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setColorIdx(i => (i - 1 + COLORS.length) % COLORS.length);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setColorIdx(i => (i + 1) % COLORS.length);
      } else if (e.key >= '1' && e.key <= '8') {
        setColorIdx(Number(e.key) - 1);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        confirm();
      } else if (e.key === 'Backspace') {
        setPhase('name');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, name, colorIdx]);

  function confirm() {
    dispatch({ type: 'SET_PLAYER', name: name.trim() || 'operator', botColor: COLORS[colorIdx].hex });
    dispatch({ type: 'ADVANCE_PHASE' });
  }

  const selectedColor = COLORS[colorIdx].hex;
  const nameReady = name.trim().length > 0;

  return (
    <TerminalFrame title="select-your-bot">
      <div
        className="flex h-full"
        style={{ padding: 32, fontFamily: "'JetBrains Mono', monospace" }}
      >
        <div className="flex flex-col justify-between flex-1">
          <div>
            <div style={{ color: '#7D7D7D', fontSize: 12, marginBottom: 8 }}>
              $ ./configure --player
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 28, letterSpacing: '0.02em' }}>
              <span style={{ color: '#E8633D' }}>{'>'}</span>
              <span style={{ color: '#E8E8E8' }}> CUSTOMIZE YOUR BOT</span>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ color: '#E8633D', fontSize: 11, letterSpacing: '0.08em', marginBottom: 8 }}>
                NAME
              </div>
              <div style={{ fontSize: 14, paddingLeft: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#7D7D7D' }}>~/name $ </span>
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  maxLength={12}
                  value={name}
                  disabled={phase !== 'name'}
                  onFocus={() => { autoTypeRef.current = false; }}
                  onChange={e => { autoTypeRef.current = false; setName(e.target.value); }}
                  onKeyDown={e => {
                    // Stop the input's own Enter from bubbling to the window
                    // listener — handled here so we can advance phase cleanly.
                    if (e.key === 'Enter' && name.trim().length > 0) {
                      e.preventDefault();
                      setPhase('color');
                    }
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: phase === 'name' ? '#E8633D' : '#E8E8E8',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 14,
                    padding: 0,
                    width: 160,
                    caretColor: '#E8633D',
                  }}
                />
                {phase === 'name' && <Cursor />}
              </div>
              {phase === 'name' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingLeft: 12, marginTop: 12 }}>
                  <div style={{ color: '#3A3A3A', fontSize: 11 }}>
                    type a name, then continue →
                  </div>
                  <button
                    onClick={() => nameReady && setPhase('color')}
                    disabled={!nameReady}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      padding: '6px 14px',
                      background: nameReady ? '#E8633D' : '#1A1A1A',
                      color: nameReady ? '#0F0F0F' : '#3A3A3A',
                      border: `1px solid ${nameReady ? '#E8633D' : '#2A2A2A'}`,
                      cursor: nameReady ? 'pointer' : 'not-allowed',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                    }}
                  >
                    NEXT →
                  </button>
                </div>
              )}
            </div>

            {phase === 'color' && (
              <div>
                <div style={{ color: '#E8633D', fontSize: 11, letterSpacing: '0.08em', marginBottom: 8 }}>
                  COLOR
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingLeft: 12, marginBottom: 12 }}>
                  {COLORS.map((c, i) => (
                    <button
                      key={c.hex}
                      onClick={() => setColorIdx(i)}
                      aria-label={c.label}
                      style={{
                        width: 44,
                        height: 44,
                        background: c.hex,
                        border: i === colorIdx ? '3px solid #E8E8E8' : '2px solid #2A2A2A',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        color: '#1A1A1A',
                        fontWeight: 700,
                        padding: 0,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div style={{ color: '#7D7D7D', fontSize: 11, paddingLeft: 12, marginBottom: 14 }}>
                  tap a color, or use <span style={{ color: '#E8E8E8' }}>← →</span> / <span style={{ color: '#E8E8E8' }}>1-8</span> on keyboard
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 12 }}>
                  <button
                    onClick={() => setPhase('name')}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      padding: '6px 12px',
                      background: '#1A1A1A',
                      color: '#7D7D7D',
                      border: '1px solid #2A2A2A',
                      cursor: 'pointer',
                      letterSpacing: '0.06em',
                    }}
                  >
                    ← BACK
                  </button>
                  <button
                    onClick={confirm}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13,
                      padding: '8px 18px',
                      background: '#E8633D',
                      color: '#0F0F0F',
                      border: '1px solid #E8633D',
                      cursor: 'pointer',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                    }}
                  >
                    START QUEST →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center" style={{ marginLeft: 40 }}>
          <BotIdle scale={8} primaryColor={selectedColor} />
          <div style={{ color: selectedColor, fontSize: 12, marginTop: 12 }}>
            ~/{name.trim() || '...'}
          </div>
        </div>
      </div>
    </TerminalFrame>
  );
}
