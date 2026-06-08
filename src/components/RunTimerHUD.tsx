import { useGame } from '../engine/GameContext';
import { useRunTimer, formatRunTime } from '../hooks/useRunTimer';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';

/** Inline mm:ss readout for the TerminalFrame's title-bar right slot — sits
 *  where the fake `━ ▢ ✕` glyphs used to live. Renders nothing during
 *  non-Quest tracks or before a run has started, so the title bar just
 *  collapses the slot. Always visible during gameplay (the title bar stays
 *  put even when boss/lore/npc panels are open). */
export function RunTimerHUD() {
  const state = useGame();
  const elapsed = useRunTimer();

  if (state.currentTrack !== 'quest') return null;
  if (state.runStartedAt === null) return null;

  const accent = LEVEL_CONFIGS[state.currentLevel].theme.accentColor;

  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        letterSpacing: '0.08em',
        display: 'flex',
        alignItems: 'baseline',
        gap: 6,
      }}
    >
      <span style={{ color: '#7D7D7D' }}>time</span>
      <span style={{ color: accent, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
        {formatRunTime(elapsed)}
      </span>
    </div>
  );
}
