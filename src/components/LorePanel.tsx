import { useEffect } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { CONTENT } from '../content';
import { Cursor } from './TerminalFrame';

export function LorePanel() {
  const state = useGame();
  const dispatch = useGameDispatch();

  const level = LEVEL_CONFIGS[state.currentLevel];
  const lesson = CONTENT[state.currentLevel];
  const loreEntry = lesson.lore.find(l => l.id === state.activePanel?.itemId);
  const accent = level.theme.accentColor;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'e' || e.key === 'E' || e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: 'CLOSE_PANEL' });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [dispatch]);

  if (!loreEntry) return null;

  const text = loreEntry.text;

  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.5)' }}
      onClick={() => dispatch({ type: 'CLOSE_PANEL' })}
    >
      <div
        style={{
          background: '#1A1A1A',
          border: `1px solid ${accent}`,
          padding: '24px 32px',
          maxWidth: 500,
          fontFamily: "'JetBrains Mono', monospace",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ color: accent, fontSize: 11, letterSpacing: '0.08em', marginBottom: 12 }}>
          LORE FRAGMENT
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.6, color: '#E8E8E8' }}>
          {text}
        </div>
        <div style={{ marginTop: 18, color: '#7D7D7D', fontSize: 13 }}>
          <span style={{ color: accent }}>{'>'}</span> Press{' '}
          <span style={{ color: '#E8E8E8' }}>SPACE</span> or{' '}
          <span style={{ color: '#E8E8E8' }}>ENTER</span> to close
          <Cursor />
        </div>
      </div>
    </div>
  );
}
