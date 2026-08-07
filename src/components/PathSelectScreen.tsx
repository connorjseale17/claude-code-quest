import { useEffect, useState } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { TerminalFrame, Cursor } from './TerminalFrame';
import { TWIC_ISSUE_INTRO } from '../content/twic-issue';
import { recordRunStart } from '../lib/tracking';
import { colorIdxFromHex } from '../lib/palette';

type Choice = 'quest' | 'twic' | 'cowork';

/**
 * Path-select screen — sits between CustomizeScreen and the first LoadingScreen.
 * Two tiles: THE QUEST (soft-default) and THIS WEEK IN CLAUDE (tagged with the
 * UPDATED date from the current issue). Selecting either dispatches
 * SELECT_TRACK with the right start-level info, which transitions to 'loading'.
 */
export function PathSelectScreen() {
  const { player } = useGame();
  const dispatch = useGameDispatch();
  const [focused, setFocused] = useState<Choice>('quest');

  const select = (track: Choice) => {
    const levelId =
      track === 'quest' ? 'orientation' : track === 'twic' ? 'twic-1' : 'cowork-1';
    const cfg = LEVEL_CONFIGS[levelId];
    const chamber = cfg.chambers[cfg.startingChamber];
    dispatch({
      type: 'SELECT_TRACK',
      track,
      levelId,
      chamberId: cfg.startingChamber,
      spawnX: chamber.spawnX,
      spawnY: chamber.spawnY,
    });
    // Quest-only Firestore run tracking. The returned runId arrives async;
    // SET_RUN_ID stamps it onto state for recordRunFinish on WrapUpSplash.
    // TWiC and Cowork are intentionally untracked, so their runs never write
    // into the shared Quest leaderboard.
    if (track === 'quest') {
      const colorIdx = colorIdxFromHex(player.botColor);
      void recordRunStart({ handle: player.name || 'operator', colorIdx })
        .then(runId => { if (runId) dispatch({ type: 'SET_RUN_ID', runId }); });
    }
  };

  useEffect(() => {
    // Left-to-right visual order, so ←/→ walks the tiles as they're rendered.
    const ORDER: Choice[] = ['quest', 'cowork', 'twic'];
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'a' || e.key === 'w') {
        e.preventDefault();
        setFocused(f => ORDER[Math.max(0, ORDER.indexOf(f) - 1)]);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'd' || e.key === 's') {
        e.preventDefault();
        setFocused(f => ORDER[Math.min(ORDER.length - 1, ORDER.indexOf(f) + 1)]);
      } else if (e.key === 'Tab') {
        e.preventDefault();
        setFocused(f => ORDER[(ORDER.indexOf(f) + 1) % ORDER.length]);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        select(focused);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // select uses dispatch (stable) — only `focused` matters for the Enter path.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);

  const questAccent = LEVEL_CONFIGS['orientation'].theme.accentColor;
  const twicAccent = LEVEL_CONFIGS['twic-1'].theme.accentColor;
  const coworkAccent = LEVEL_CONFIGS['cowork-1'].theme.accentColor;

  return (
    <TerminalFrame title="claude-code-quest --select-path" accent>
      <div
        className="flex flex-col items-center justify-center h-full gap-8"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: '#E8E8E8', padding: 32 }}
      >
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.18em' }}>
          <span style={{ color: '#E8633D' }}>{'>'}</span> CHOOSE YOUR PATH
        </div>

        <div style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}>
          <PathTile
            label="CODE QUEST"
            description="A 7-level curriculum on Claude Code, start to finish. The full Quest. Recommended for new learners."
            badge="7 LEVELS · CANON"
            accent={questAccent}
            focused={focused === 'quest'}
            onHover={() => setFocused('quest')}
            onClick={() => select('quest')}
          />
          <PathTile
            label="COWORK QUEST"
            description="Learn Claude Cowork across seven modules — built for consultants. Delegate the work, collect the finished files."
            badge="7 MODULES · NEW"
            accent={coworkAccent}
            focused={focused === 'cowork'}
            onHover={() => setFocused('cowork')}
            onClick={() => select('cowork')}
          />
          <PathTile
            label="THIS WEEK IN CLAUDE"
            description="Three bite-sized rooms on the latest Claude features and how to put them to work. Refreshes weekly."
            badge={`UPDATED · ${TWIC_ISSUE_INTRO.publishDate}`}
            accent={twicAccent}
            focused={focused === 'twic'}
            onHover={() => setFocused('twic')}
            onClick={() => select('twic')}
          />
        </div>

        <div style={{ color: '#7D7D7D', fontSize: 12, marginTop: 8 }}>
          <span style={{ color: '#E8633D' }}>{'>'}</span> use{' '}
          <span style={{ color: '#E8E8E8' }}>←/→</span> or{' '}
          <span style={{ color: '#E8E8E8' }}>Tab</span> to choose,{' '}
          <span style={{ color: '#E8E8E8' }}>Enter</span> to confirm
          <Cursor />
        </div>
      </div>
    </TerminalFrame>
  );
}

interface PathTileProps {
  label: string;
  description: string;
  badge: string;
  accent: string;
  focused: boolean;
  onHover: () => void;
  onClick: () => void;
  /** Greyed-out, non-selectable "coming soon" tile. */
  disabled?: boolean;
}

function PathTile({ label, description, badge, accent, focused, onHover, onClick, disabled }: PathTileProps) {
  return (
    <button
      onMouseEnter={disabled ? undefined : onHover}
      onFocus={disabled ? undefined : onHover}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
      style={{
        width: 280,
        background: disabled ? '#0B0B0B' : focused ? '#141414' : '#0F0F0F',
        border: `1.5px solid ${disabled ? '#1C1C1C' : focused ? accent : '#2A2A2A'}`,
        padding: '22px 24px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        textAlign: 'left',
        fontFamily: "'JetBrains Mono', monospace",
        color: '#E8E8E8',
        opacity: disabled ? 0.55 : 1,
        transition: 'border-color 120ms ease, background 120ms ease',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ color: disabled ? '#6A6A6A' : accent, fontSize: 11, letterSpacing: '0.12em' }}>{badge}</div>
      <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.06em', color: disabled ? '#7A7A7A' : '#E8E8E8' }}>{label}</div>
      <div style={{ fontSize: 13, lineHeight: 1.55, color: disabled ? '#565656' : '#9A9A9A' }}>{description}</div>
      <div style={{ marginTop: 6, fontSize: 12, color: focused ? accent : '#3A3A3A' }}>
        {focused ? '▶ press Enter' : ' '}
      </div>
    </button>
  );
}
