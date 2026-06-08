import { useGame, useGameDispatch } from '../engine/GameContext';
import { LEVEL_CONFIGS, type LevelConfig } from '../engine/roomConfigs';
import { CONTENT } from '../content';
import { Cursor } from './TerminalFrame';
import { useRunTimer, formatRunTime } from '../hooks/useRunTimer';

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
  const elapsed = useRunTimer();
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

  // Lessons: NPCs in this level that have authored conversations.
  const conversationsForLevel = CONTENT[state.currentLevel].conversations ?? {};
  const lessonNpcIds = Object.keys(conversationsForLevel);
  const lessonsCompleted = lessonNpcIds.filter(id =>
    state.lessonsCompleted.includes(id),
  ).length;

  const numLabel = String(level.number).padStart(2, '0');

  // Run-wide stats — Quest only. TWiC has no tracked run.
  const showRunStats = state.currentTrack === 'quest' && state.runStartedAt !== null;
  const levelsCompletedCount = Object.keys(state.levelsCompletedAt).length;
  const prizesEarnedCount = state.prizesUnlocked.length;

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
          padding: '18px 22px',
          width: 420,
          fontFamily: "'JetBrains Mono', monospace",
          color: '#E8E8E8',
        }}
      >
        {/* Combined header — "PAUSED · LVL 03 · CLAUDE.md / chamber" — saves
            three sections worth of vertical space. */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 2 }}>
          <div style={{ color: accent, fontSize: 11, letterSpacing: '0.14em', fontWeight: 700 }}>
            PAUSED
          </div>
          <div style={{ color: '#3A3A3A', fontSize: 10, letterSpacing: '0.12em' }}>
            LVL {numLabel} · {level.title.toUpperCase()}
          </div>
        </div>
        <div style={{ color: '#7D7D7D', fontSize: 12, marginBottom: 14 }}>
          chamber: <span style={{ color: '#E8E8E8' }}>{chamber.name}</span>
        </div>

        {showRunStats && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: accent, fontSize: 10, letterSpacing: '0.10em', marginBottom: 4 }}>
              RUN STATS
            </div>
            <div style={{
              paddingLeft: 10,
              display: 'grid',
              gridTemplateColumns: 'auto auto auto auto auto auto auto auto',
              columnGap: 8,
              rowGap: 2,
              fontSize: 12,
              alignItems: 'baseline',
            }}>
              <span style={{ color: '#7D7D7D' }}>time</span>
              <span style={{ color: '#E8E8E8', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                {formatRunTime(elapsed)}
              </span>
              <span style={{ color: '#3A3A3A' }}>·</span>
              <span style={{ color: '#7D7D7D' }}>lvls</span>
              <span style={{ color: accent }}>{levelsCompletedCount}/7</span>
              <span style={{ color: '#3A3A3A' }}>·</span>
              <span style={{ color: '#7D7D7D' }}>prizes</span>
              <span style={{ color: accent }}>{prizesEarnedCount}</span>
            </div>
          </div>
        )}

        <div style={{ marginBottom: 14 }}>
          <div style={{ color: accent, fontSize: 10, letterSpacing: '0.10em', marginBottom: 4 }}>
            OBJECTIVE
          </div>
          <div style={{ fontSize: 13, paddingLeft: 10 }}>
            <span style={{ color: accent }}>{'>'}</span> {objective}
          </div>
        </div>

        <div style={{ paddingLeft: 10, fontSize: 12, lineHeight: 1.7, marginBottom: 12 }}>
          <div>
            <span style={{ color: '#7D7D7D' }}>lore: </span>
            <span style={{ color: seenLore === totalLore && totalLore > 0 ? '#3FB950' : accent }}>
              {seenLore}/{totalLore}
            </span>
            {totalNPCs > 0 && (
              <>
                <span style={{ color: '#3A3A3A' }}> · </span>
                <span style={{ color: '#7D7D7D' }}>npcs: </span>
                <span style={{ color: seenNPCs === totalNPCs ? '#3FB950' : accent }}>
                  {seenNPCs}/{totalNPCs}
                </span>
              </>
            )}
            {lessonNpcIds.length > 0 && (
              <>
                <span style={{ color: '#3A3A3A' }}> · </span>
                <span style={{ color: '#7D7D7D' }}>lessons: </span>
                <span style={{ color: lessonsCompleted === lessonNpcIds.length ? '#3FB950' : accent }}>
                  {lessonsCompleted}/{lessonNpcIds.length}
                </span>
              </>
            )}
          </div>
          <div>
            <span style={{ color: '#7D7D7D' }}>challenge: </span>
            <span style={{ color: levelState.challengePassed ? '#3FB950' : '#7D7D7D' }}>
              {levelState.challengePassed ? '✓' : '—'}
            </span>
            <span style={{ color: '#3A3A3A' }}> · </span>
            <span style={{ color: '#7D7D7D' }}>key: </span>
            <span style={{ color: levelState.keyCollected ? '#3FB950' : '#7D7D7D' }}>
              {levelState.keyCollected ? '✓' : '—'}
            </span>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #2A2A2A',
          paddingTop: 10,
          color: '#7D7D7D',
          fontSize: 11,
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}>
          <span>
            <span style={{ color: '#E8E8E8' }}>WASD</span> move ·{' '}
            <span style={{ color: '#E8E8E8' }}>SPACE</span> interact
          </span>
          <span>
            <span style={{ color: accent }}>{'>'}</span>{' '}
            <span style={{ color: '#E8E8E8' }}>ESC</span> resume
            <Cursor />
          </span>
        </div>
      </div>
    </div>
  );
}
