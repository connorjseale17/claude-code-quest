import { useGame, useGameDispatch } from '../engine/GameContext';
import { LEVEL_CONFIGS, type LevelConfig } from '../engine/roomConfigs';
import { Cursor } from './TerminalFrame';

function getObjective(
  level: LevelConfig,
  levelState: { challengePassed: boolean; keyCollected: boolean },
  inChallengeChamber: boolean,
): string {
  if (!levelState.challengePassed) {
    return inChallengeChamber
      ? 'answer the glowing terminal challenge'
      : `find the boss terminal in ${level.chambers[level.challengeChamber].name}`;
  }
  if (!levelState.keyCollected) {
    return inChallengeChamber
      ? 'pick up the level key'
      : `return to ${level.chambers[level.challengeChamber].name} for the key`;
  }
  return 'walk through the unlocked exit door';
}

export function PauseMenu() {
  const state = useGame();
  const dispatch = useGameDispatch();
  if (!state.paused) return null;

  const level = LEVEL_CONFIGS[state.currentLevel];
  const chamber = level.chambers[state.currentChamber];
  const levelState = state.levels[state.currentLevel];
  const accent = level.theme.accentColor;

  const objective = getObjective(
    level,
    levelState,
    chamber.id === level.challengeChamber,
  );

  // Lore + NPC progress across all chambers in current level
  const levelChambers = Object.values(level.chambers);
  const totalLore = levelChambers.reduce(
    (sum, c) => sum + c.items.filter(i => i.type === 'lore').length,
    0,
  );
  const seenLore = levelChambers.reduce(
    (sum, c) => sum + (state.chambers[c.id]?.loreSeen.length ?? 0),
    0,
  );
  const totalNPCs = levelChambers.reduce((sum, c) => sum + c.npcs.length, 0);
  const seenNPCs = levelChambers.reduce(
    (sum, c) => sum + (state.chambers[c.id]?.npcSeen.length ?? 0),
    0,
  );

  const numLabel = String(level.number).padStart(2, '0');

  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.7)' }}
      onClick={() => dispatch({ type: 'TOGGLE_PAUSE' })}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#1A1A1A',
          border: `1px solid ${accent}`,
          padding: '28px 36px',
          minWidth: 440,
          maxWidth: 560,
          fontFamily: "'JetBrains Mono', monospace",
          color: '#E8E8E8',
        }}
      >
        <div style={{ color: accent, fontSize: 11, letterSpacing: '0.12em', marginBottom: 14 }}>
          ── PAUSED ──
        </div>

        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
          LEVEL {numLabel} · {level.title}
        </div>
        <div style={{ color: '#7D7D7D', fontSize: 13, marginBottom: 22 }}>
          chamber: <span style={{ color: '#E8E8E8' }}>{chamber.name}</span>
        </div>

        <div style={{ marginBottom: 22 }}>
          <div style={{ color: accent, fontSize: 11, letterSpacing: '0.08em', marginBottom: 6 }}>
            CURRENT OBJECTIVE
          </div>
          <div style={{ fontSize: 14, paddingLeft: 12 }}>
            <span style={{ color: accent }}>{'>'}</span> {objective}
          </div>
        </div>

        <div style={{ marginBottom: 22, paddingLeft: 12, fontSize: 13, lineHeight: 1.9 }}>
          <div>
            <span style={{ color: '#7D7D7D' }}>lore fragments: </span>
            <span style={{ color: seenLore === totalLore && totalLore > 0 ? '#3FB950' : accent }}>
              {seenLore}/{totalLore}
            </span>
          </div>
          {totalNPCs > 0 && (
            <div>
              <span style={{ color: '#7D7D7D' }}>characters met: </span>
              <span style={{ color: seenNPCs === totalNPCs ? '#3FB950' : accent }}>
                {seenNPCs}/{totalNPCs}
              </span>
            </div>
          )}
          <div>
            <span style={{ color: '#7D7D7D' }}>challenge: </span>
            <span style={{ color: levelState.challengePassed ? '#3FB950' : '#7D7D7D' }}>
              {levelState.challengePassed ? '✓ complete' : '— pending'}
            </span>
          </div>
          <div>
            <span style={{ color: '#7D7D7D' }}>key: </span>
            <span style={{ color: levelState.keyCollected ? '#3FB950' : '#7D7D7D' }}>
              {levelState.keyCollected ? '✓ collected' : '— locked'}
            </span>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #2A2A2A',
          paddingTop: 14,
          marginBottom: 14,
          color: '#7D7D7D',
          fontSize: 12,
          lineHeight: 1.8,
        }}>
          <div style={{ color: accent, fontSize: 11, letterSpacing: '0.08em', marginBottom: 6 }}>
            CONTROLS
          </div>
          <div><span style={{ color: '#E8E8E8' }}>WASD</span> / <span style={{ color: '#E8E8E8' }}>arrows</span> — move</div>
          <div><span style={{ color: '#E8E8E8' }}>SPACE</span> / <span style={{ color: '#E8E8E8' }}>ENTER</span> — interact</div>
          <div><span style={{ color: '#E8E8E8' }}>ESC</span> — pause / resume</div>
        </div>

        <div style={{ color: '#7D7D7D', fontSize: 13 }}>
          <span style={{ color: accent }}>{'>'}</span> press{' '}
          <span style={{ color: '#E8E8E8' }}>ESC</span> to resume
          <Cursor />
        </div>
      </div>
    </div>
  );
}
