import { useGame } from '../engine/GameContext';
import { useRunTimer, formatRunTime } from '../hooks/useRunTimer';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';

/** Small mm:ss pill that floats in the top-right of the room frame during
 *  active gameplay. Hides during boss/lore/npc/practice panels to keep the
 *  player's attention on the panel content. Quest only (TWiC runs aren't
 *  tracked). */
export function RunTimerHUD() {
  const state = useGame();
  const elapsed = useRunTimer();

  if (state.currentTrack !== 'quest') return null;
  if (state.runStartedAt === null) return null;
  if (state.activePanel) return null;
  if (state.gamePhase !== 'playing') return null;

  const accent = LEVEL_CONFIGS[state.currentLevel].theme.accentColor;

  return (
    <div
      style={{
        position: 'absolute',
        top: 12,
        right: 12,
        padding: '6px 12px',
        background: 'rgba(15, 15, 15, 0.85)',
        border: `1px solid ${accent}`,
        borderRadius: 2,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        letterSpacing: '0.08em',
        color: '#E8E8E8',
        pointerEvents: 'none',
        zIndex: 30,
      }}
    >
      <span style={{ color: '#7D7D7D' }}>time </span>
      <span style={{ color: accent, fontWeight: 700 }}>{formatRunTime(elapsed)}</span>
    </div>
  );
}
