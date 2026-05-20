import { useEffect, useState } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { Cursor } from './TerminalFrame';
import { PixelSprite } from './PixelSprite';

export function NPCDialog() {
  const state = useGame();
  const dispatch = useGameDispatch();
  const [lineIdx, setLineIdx] = useState(0);

  const level = LEVEL_CONFIGS[state.currentLevel];
  const chamber = level.chambers[state.currentChamber];
  const npc = chamber.npcs.find(n => n.id === state.activePanel?.itemId);
  const accent = level.theme.accentColor;

  useEffect(() => {
    setLineIdx(0);
  }, [npc?.id]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        if (!npc) return;
        if (lineIdx < npc.dialog.length - 1) {
          setLineIdx(i => i + 1);
        } else {
          dispatch({ type: 'CLOSE_PANEL' });
        }
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        dispatch({ type: 'CLOSE_PANEL' });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [dispatch, lineIdx, npc]);

  if (!npc) return null;

  const line = npc.dialog[lineIdx] ?? '';
  const isLast = lineIdx >= npc.dialog.length - 1;

  return (
    <div
      className="absolute inset-0 z-20 flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.45)', paddingBottom: 48 }}
      onClick={() => dispatch({ type: 'CLOSE_PANEL' })}
    >
      <div
        style={{
          background: '#1A1A1A',
          border: `1px solid ${accent}`,
          padding: '20px 26px',
          maxWidth: 600,
          minWidth: 460,
          fontFamily: "'JetBrains Mono', monospace",
          display: 'flex',
          gap: 18,
          alignItems: 'flex-start',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ flexShrink: 0, paddingTop: 4 }}>
          <PixelSprite frame={npc.sprite ?? 'idle_a'} scale={3} primaryColor={npc.color} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: accent, fontSize: 11, letterSpacing: '0.08em', marginBottom: 8 }}>
            {npc.name.toUpperCase()}
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.6, color: '#E8E8E8', minHeight: 60 }}>
            {line}
          </div>
          <div style={{ marginTop: 14, color: '#7D7D7D', fontSize: 12 }}>
            <span style={{ color: accent }}>{'>'}</span>{' '}
            <span style={{ color: '#E8E8E8' }}>SPACE</span>{' '}
            {isLast ? 'to close' : `· ${lineIdx + 1}/${npc.dialog.length}`}
            <Cursor />
          </div>
        </div>
      </div>
    </div>
  );
}
