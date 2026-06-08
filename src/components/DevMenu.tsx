import { useEffect } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { LEVEL_CONFIGS, type LevelId } from '../engine/roomConfigs';

interface DevMenuProps {
  open: boolean;
  onClose: () => void;
  onLayoutMode: () => void;
}

const LEVEL_ORDER = (Object.keys(LEVEL_CONFIGS) as LevelId[]).sort(
  (a, b) => LEVEL_CONFIGS[a].number - LEVEL_CONFIGS[b].number,
);

export function DevMenu({ open, onClose, onLayoutMode }: DevMenuProps) {
  const state = useGame();
  const dispatch = useGameDispatch();

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Capture-phase + stopImmediate so this doesn't also toggle the pause menu.
        e.preventDefault();
        e.stopImmediatePropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [open, onClose]);

  if (!open) return null;

  const warp = (levelId: LevelId) => {
    dispatch({ type: 'DEV_WARP_LEVEL', levelId });
    onClose();
  };

  const btn: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    textAlign: 'left',
    padding: '7px 10px',
    background: '#141414',
    color: '#E8E8E8',
    border: '1px solid #2A2A2A',
    cursor: 'pointer',
    width: '100%',
  };

  return (
    <div
      className="absolute inset-0 z-50"
      style={{ background: 'rgba(0,0,0,0.55)' }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: 44,
          left: 12,
          width: 280,
          maxHeight: '88%',
          overflowY: 'auto',
          background: '#0A0A0A',
          border: '1px solid #E8633D',
          padding: '14px 16px',
          fontFamily: "'JetBrains Mono', monospace",
          color: '#E8E8E8',
          boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ color: '#E8633D', fontSize: 11, letterSpacing: '0.18em', fontWeight: 700 }}>
            ⚙ MENU
          </span>
          <span
            onClick={onClose}
            style={{ cursor: 'pointer', color: '#7D7D7D', fontSize: 14, lineHeight: 1 }}
          >
            ✕
          </span>
        </div>

        <div style={{ color: '#7D7D7D', fontSize: 10, letterSpacing: '0.12em', marginBottom: 6 }}>
          JUMP TO LEVEL
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
          {LEVEL_ORDER.map(id => {
            const cfg = LEVEL_CONFIGS[id];
            const isCurrent = id === state.currentLevel && state.gamePhase === 'playing';
            return (
              <button
                key={id}
                onClick={() => warp(id)}
                style={{
                  ...btn,
                  borderColor: isCurrent ? '#E8633D' : '#2A2A2A',
                  color: isCurrent ? '#E8633D' : '#E8E8E8',
                }}
              >
                {String(cfg.number).padStart(2, '0')} · {cfg.title}
                {isCurrent ? '  ◄' : ''}
              </button>
            );
          })}
        </div>

        <div style={{ color: '#7D7D7D', fontSize: 10, letterSpacing: '0.12em', marginBottom: 6 }}>
          SHORTCUTS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button
            onClick={() => {
              dispatch({ type: 'DEV_UNLOCK_CURRENT' });
              onClose();
            }}
            style={{ ...btn, borderColor: '#3FB950', color: '#3FB950' }}
          >
            🔓 Unlock exit (pass challenge + key)
          </button>
          <button
            onClick={() => {
              dispatch({ type: 'GAME_OVER' });
              onClose();
            }}
            style={{ ...btn, borderColor: '#E8B341', color: '#E8B341' }}
          >
            🏁 Complete game (→ end screen)
          </button>
          <button
            onClick={() => {
              onLayoutMode();
              onClose();
            }}
            style={{ ...btn, borderColor: '#6BA8DD', color: '#6BA8DD' }}
          >
            ✎ Layout Mode (edit map)
          </button>
          <button
            onClick={() => {
              try {
                localStorage.removeItem('ccq-player');
                localStorage.removeItem('ccq-prizes');
                localStorage.removeItem('ccq-lessons');
                localStorage.removeItem('ccq-layout-draft');
              } catch { /* ignore */ }
              window.location.reload();
            }}
            style={{ ...btn, borderColor: '#FF6B8A', color: '#FF6B8A' }}
          >
            🗑 Reset player (clear saved name + color)
          </button>
        </div>

        <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1px solid #2A2A2A', color: '#5A5A5A', fontSize: 10, lineHeight: 1.5 }}>
          Jump warps to a level's start. Unlock opens the current
          level's exit door so you can walk through. Press ESC or click
          away to close.
        </div>
      </div>
    </div>
  );
}
