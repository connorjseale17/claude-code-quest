import { useEffect, useState } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { TerminalFrame, Cursor } from './TerminalFrame';
import { TWIC_ISSUE_INTRO } from '../content/twic-issue';
import { recordRunStart } from '../lib/tracking';

type Choice = 'quest' | 'twic';

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
    if (track === 'quest') {
      const cfg = LEVEL_CONFIGS['orientation'];
      const chamber = cfg.chambers[cfg.startingChamber];
      dispatch({
        type: 'SELECT_TRACK',
        track: 'quest',
        levelId: 'orientation',
        chamberId: cfg.startingChamber,
        spawnX: chamber.spawnX,
        spawnY: chamber.spawnY,
      });
      // Fire-and-forget: kick off the Firestore run-start write. The returned
      // runId arrives async; SET_RUN_ID stamps it onto state for the eventual
      // recordRunFinish call on WrapUpSplash mount. Quest-only — TWiC is
      // intentionally untracked.
      void recordRunStart({ handle: player.name || 'operator', colorIdx: 0 })
        .then(runId => { if (runId) dispatch({ type: 'SET_RUN_ID', runId }); });
    } else {
      const cfg = LEVEL_CONFIGS['twic-1'];
      const chamber = cfg.chambers[cfg.startingChamber];
      dispatch({
        type: 'SELECT_TRACK',
        track: 'twic',
        levelId: 'twic-1',
        chamberId: cfg.startingChamber,
        spawnX: chamber.spawnX,
        spawnY: chamber.spawnY,
      });
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'w' || e.key === 'a') {
        e.preventDefault();
        setFocused('quest');
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 's' || e.key === 'd') {
        e.preventDefault();
        setFocused('twic');
      } else if (e.key === 'Tab') {
        e.preventDefault();
        setFocused(f => (f === 'quest' ? 'twic' : 'quest'));
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

  return (
    <TerminalFrame title="claude-code-quest --select-path" accent>
      <div
        className="flex flex-col items-center justify-center h-full gap-8"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: '#E8E8E8', padding: 32 }}
      >
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.18em' }}>
          <span style={{ color: '#E8633D' }}>{'>'}</span> CHOOSE YOUR PATH
        </div>

        <div style={{ display: 'flex', gap: 32, alignItems: 'stretch' }}>
          <PathTile
            label="THE QUEST"
            description="A 7-level curriculum on Claude Code, start to finish. The full Quest. Recommended for new learners."
            badge="7 LEVELS · CANON"
            accent={questAccent}
            focused={focused === 'quest'}
            onHover={() => setFocused('quest')}
            onClick={() => select('quest')}
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
}

function PathTile({ label, description, badge, accent, focused, onHover, onClick }: PathTileProps) {
  return (
    <button
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={onClick}
      style={{
        width: 320,
        background: focused ? '#141414' : '#0F0F0F',
        border: `1.5px solid ${focused ? accent : '#2A2A2A'}`,
        padding: '22px 24px',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: "'JetBrains Mono', monospace",
        color: '#E8E8E8',
        transition: 'border-color 120ms ease, background 120ms ease',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ color: accent, fontSize: 11, letterSpacing: '0.12em' }}>{badge}</div>
      <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.06em' }}>{label}</div>
      <div style={{ fontSize: 13, lineHeight: 1.55, color: '#9A9A9A' }}>{description}</div>
      <div style={{ marginTop: 6, fontSize: 12, color: focused ? accent : '#3A3A3A' }}>
        {focused ? '▶ press Enter' : ' '}
      </div>
    </button>
  );
}
