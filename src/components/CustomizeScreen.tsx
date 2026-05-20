import { useState, useEffect, useRef } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { TerminalFrame, Cursor } from './TerminalFrame';
import { BotIdle } from './PixelSprite';

const COLORS = [
  { hex: '#E8633D', label: 'orange' },
  { hex: '#3FB950', label: 'green' },
  { hex: '#6BA8DD', label: 'blue' },
  { hex: '#D94DFF', label: 'purple' },
  { hex: '#F0C040', label: 'gold' },
  { hex: '#FF6B8A', label: 'pink' },
  { hex: '#00D4AA', label: 'teal' },
  { hex: '#E8E8E8', label: 'white' },
];

export function CustomizeScreen() {
  const { player } = useGame();
  const dispatch = useGameDispatch();
  const [name, setName] = useState(player.name);
  const [colorIdx, setColorIdx] = useState(
    Math.max(0, COLORS.findIndex(c => c.hex === player.botColor))
  );
  const [phase, setPhase] = useState<'name' | 'color'>('name');
  const autoTypeRef = useRef(true);

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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase === 'name') {
        if (e.key === 'Enter' && name.length > 0) {
          setPhase('color');
          return;
        }
        if (e.key === 'Backspace') {
          autoTypeRef.current = false;
          setName(n => n.slice(0, -1));
          return;
        }
        if (e.key.length === 1 && name.length < 12) {
          autoTypeRef.current = false;
          setName(n => n + e.key);
        }
        return;
      }

      if (phase === 'color') {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          setColorIdx(i => (i - 1 + COLORS.length) % COLORS.length);
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          setColorIdx(i => (i + 1) % COLORS.length);
        } else if (e.key >= '1' && e.key <= '8') {
          setColorIdx(Number(e.key) - 1);
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          dispatch({ type: 'SET_PLAYER', name, botColor: COLORS[colorIdx].hex });
          dispatch({ type: 'ADVANCE_PHASE' });
        } else if (e.key === 'Backspace') {
          setPhase('name');
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, name, colorIdx, dispatch]);

  const selectedColor = COLORS[colorIdx].hex;

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
              <div style={{ fontSize: 14, paddingLeft: 12 }}>
                <span style={{ color: '#7D7D7D' }}>~/name $ </span>
                <span style={{ color: phase === 'name' ? '#E8633D' : '#E8E8E8' }}>{name}</span>
                {phase === 'name' && <Cursor />}
              </div>
              {phase === 'name' && (
                <div style={{ color: '#3A3A3A', fontSize: 11, paddingLeft: 12, marginTop: 6 }}>
                  type a name, then press ENTER
                </div>
              )}
            </div>

            {phase === 'color' && (
              <div>
                <div style={{ color: '#E8633D', fontSize: 11, letterSpacing: '0.08em', marginBottom: 8 }}>
                  COLOR
                </div>
                <div style={{ display: 'flex', gap: 8, paddingLeft: 12, marginBottom: 8 }}>
                  {COLORS.map((c, i) => (
                    <div
                      key={c.hex}
                      style={{
                        width: 32,
                        height: 32,
                        background: c.hex,
                        border: i === colorIdx ? '2px solid #E8E8E8' : '2px solid #2A2A2A',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        color: '#1A1A1A',
                        fontWeight: 700,
                      }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div style={{ color: '#7D7D7D', fontSize: 11, paddingLeft: 12 }}>
                  <span style={{ color: '#E8E8E8' }}>← →</span> or <span style={{ color: '#E8E8E8' }}>1-8</span> to select · <span style={{ color: '#E8E8E8' }}>ENTER</span> / <span style={{ color: '#E8E8E8' }}>SPACE</span> to confirm
                </div>
              </div>
            )}
          </div>

          {phase === 'color' && (
            <div style={{ color: '#7D7D7D', fontSize: 13 }}>
              <span style={{ color: '#E8633D' }}>{'>'}</span> press{' '}
              <span style={{ color: '#E8E8E8' }}>ENTER</span> to begin
              <Cursor />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center" style={{ marginLeft: 40 }}>
          <BotIdle scale={8} primaryColor={selectedColor} />
          <div style={{ color: selectedColor, fontSize: 12, marginTop: 12 }}>
            ~/{name || '...'}
          </div>
        </div>
      </div>
    </TerminalFrame>
  );
}
