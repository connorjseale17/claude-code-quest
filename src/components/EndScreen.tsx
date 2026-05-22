import { Cursor } from './TerminalFrame';
import { PixelSprite } from './PixelSprite';
import { useGame } from '../engine/GameContext';
import { LEVEL_CONFIGS, type LevelId } from '../engine/roomConfigs';
import { CONTENT } from '../content';

export function EndScreen() {
  const state = useGame();

  const trophies = (Object.keys(LEVEL_CONFIGS) as LevelId[])
    .sort((a, b) => LEVEL_CONFIGS[a].number - LEVEL_CONFIGS[b].number)
    .map(id => CONTENT[id].practice?.prize)
    .filter((p): p is { id: string; label: string } => Boolean(p));

  const earnedCount = trophies.filter(t => state.prizesUnlocked.includes(t.id)).length;

  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-6"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        color: '#E8E8E8',
        padding: '24px 0',
      }}
    >
      <PixelSprite frame="victory" scale={6} />

      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.02em' }}>
        <span style={{ color: '#E8633D' }}>{'>'}</span> QUEST COMPLETE
      </div>

      <div style={{ fontSize: 14, lineHeight: 1.6, textAlign: 'center', maxWidth: 520, color: '#7D7D7D' }}>
        You walked the welcome antechamber, the claude.md archives, the slash command registry, the MCP server network, and the subagent briefing room.
        <br />
        <span style={{ color: '#E8E8E8' }}>All five levels cleared.</span>
      </div>

      <div
        style={{
          width: 380,
          border: '1px solid #2A2A2A',
          padding: '14px 20px',
          background: '#0F0F0F',
        }}
      >
        <div style={{ color: '#E8633D', fontSize: 11, letterSpacing: '0.12em', marginBottom: 10 }}>
          TROPHIES EARNED · {earnedCount}/{trophies.length}
        </div>
        {trophies.map(t => {
          const earned = state.prizesUnlocked.includes(t.id);
          return (
            <div
              key={t.id}
              style={{
                fontSize: 13,
                lineHeight: 1.8,
                color: earned ? '#E8E8E8' : '#3A3A3A',
              }}
            >
              <span style={{ color: earned ? '#3FB950' : '#3A3A3A', marginRight: 8 }}>
                [{earned ? 'X' : ' '}]
              </span>
              {t.label}
            </div>
          );
        })}
      </div>

      <div style={{ color: '#7D7D7D', fontSize: 13, textAlign: 'center' }}>
        <span style={{ color: '#E8633D' }}>{'>'}</span> built entirely with claude code · thanks for playing
        <Cursor />
      </div>
    </div>
  );
}
