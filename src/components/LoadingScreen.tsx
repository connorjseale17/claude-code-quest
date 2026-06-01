import { useEffect, useRef, useState } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { TerminalFrame, Cursor } from './TerminalFrame';
import { AnimatedSprite } from './PixelSprite';
import { pickFunFact } from '../content/funFacts';

const LOAD_MS = 5000;
const BAR_CELLS = 30;
const TYPE_INTERVAL_MS = 28;

const ACTIVITY_FRAMES = [
  'thinking',
  'idle_a',
  'walk_1',
  'walk_2',
  'walk_3',
  'walk_4',
  'thinking',
  'idle_b',
];

export function LoadingScreen() {
  const state = useGame();
  const dispatch = useGameDispatch();

  // The level we're traveling TO
  const targetLevel = state.pendingLevelTransition
    ? LEVEL_CONFIGS[state.pendingLevelTransition.levelId]
    : null;

  const accent = targetLevel?.theme.accentColor ?? '#E8633D';
  const factRef = useRef<string>(pickFunFact());
  const startRef = useRef<number>(performance.now());

  const [progress, setProgress] = useState(0); // 0..1
  const [typed, setTyped] = useState('');
  const [ready, setReady] = useState(false);

  // Progress bar tick
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      const p = Math.min(1, elapsed / LOAD_MS);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setReady(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Typewriter for fun fact
  useEffect(() => {
    const fact = factRef.current;
    let i = 0;
    setTyped('');
    const id = window.setInterval(() => {
      i++;
      if (i >= fact.length) {
        setTyped(fact);
        clearInterval(id);
      } else {
        setTyped(fact.slice(0, i));
      }
    }, TYPE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  // Continue on Space/Enter (or any tap) once ready
  useEffect(() => {
    const advance = () => {
      if (!ready) return;
      dispatch({ type: 'COMPLETE_LEVEL_TRANSITION' });
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        advance();
      }
    };
    const handleTap = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest?.('button')) return;
      advance();
    };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('click', handleTap);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('click', handleTap);
    };
  }, [ready, dispatch]);

  if (!targetLevel) return null;

  const filled = Math.round(progress * BAR_CELLS);
  const bar = '█'.repeat(filled) + '░'.repeat(BAR_CELLS - filled);
  const pct = Math.round(progress * 100);
  const numLabel = String(targetLevel.number).padStart(2, '0');

  return (
    <TerminalFrame title={`loading: level-${numLabel}`}>
      <div
        className="flex h-full flex-col items-center justify-center"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          padding: 32,
          gap: 18,
        }}
      >
        {/* Animated sprite */}
        <div style={{ paddingBottom: 8 }}>
          <AnimatedSprite
            frames={ACTIVITY_FRAMES}
            fps={4}
            scale={8}
            primaryColor={state.player.botColor}
          />
        </div>

        {/* LOADING header */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: '0.16em',
            color: accent,
          }}
        >
          LOADING
        </div>

        {/* destination subtitle */}
        <div style={{ color: '#7D7D7D', fontSize: 12, marginTop: -8 }}>
          → level {numLabel} · {targetLevel.title.toLowerCase()}
        </div>

        {/* ASCII progress bar */}
        <div
          style={{
            color: accent,
            fontSize: 14,
            letterSpacing: '0.04em',
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            marginTop: 6,
          }}
        >
          <span>[</span>
          <span style={{ minWidth: BAR_CELLS * 9 }}>{bar}</span>
          <span>]</span>
          <span style={{ color: '#E8E8E8', minWidth: 38, textAlign: 'right' }}>
            {pct}%
          </span>
        </div>

        {/* Fun fact */}
        <div style={{ maxWidth: 560, marginTop: 14 }}>
          <div style={{ color: accent, fontSize: 11, letterSpacing: '0.08em', marginBottom: 8 }}>
            ── DID YOU KNOW... ──
          </div>
          <div style={{ color: '#E8E8E8', fontSize: 14, lineHeight: 1.6, minHeight: 80 }}>
            {typed}
            {typed.length < factRef.current.length && <Cursor />}
          </div>
        </div>

        {/* Continue prompt */}
        <div style={{ marginTop: 12, fontSize: 13, minHeight: 22 }}>
          {ready ? (
            <span style={{ color: '#3FB950' }}>
              <span>{'>'}</span>{' '}
              <span style={{ color: '#E8E8E8' }}>press SPACE to continue</span>
              <Cursor />
            </span>
          ) : (
            <span style={{ color: '#3A3A3A' }}>
              <span>{'>'}</span> loading...
            </span>
          )}
        </div>
      </div>
    </TerminalFrame>
  );
}
