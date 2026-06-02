import { useEffect } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { Cursor } from './TerminalFrame';
import { TWIC_ISSUE_INTRO } from '../content/twic-issue';

/**
 * Floor-level TWiC "Issue Intro" overlay — fires once on first entry into
 * twic-1, above the room-1 IntroOverlay. Dismissed on Space/Enter or any move
 * (the MOVE reducer doesn't clear `twicIssueShown`, so we attach our own
 * dismissal listener; the room-1 IntroOverlay then takes over beneath).
 */
export function TwicIssueIntroOverlay() {
  const state = useGame();
  const dispatch = useGameDispatch();

  const visible =
    state.gamePhase === 'playing' &&
    state.currentLevel === 'twic-1' &&
    state.twicIssueShown;

  useEffect(() => {
    if (!visible) return;
    const dismiss = () => dispatch({ type: 'DISMISS_TWIC_ISSUE_INTRO' });
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        dismiss();
      }
    };
    // Capture so it runs before the game's movement handler eats the space.
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [visible, dispatch]);

  if (!visible) return null;
  const accent = LEVEL_CONFIGS['twic-1'].theme.accentColor;

  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.78)' }}
      onClick={() => dispatch({ type: 'DISMISS_TWIC_ISSUE_INTRO' })}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: 620,
          padding: '26px 32px',
          background: '#0F1217',
          border: `1.5px solid ${accent}`,
          fontFamily: "'JetBrains Mono', monospace",
          color: '#E8E8E8',
        }}
      >
        <div style={{ color: accent, fontSize: 11, letterSpacing: '0.16em', marginBottom: 14 }}>
          THIS WEEK IN CLAUDE · {TWIC_ISSUE_INTRO.publishDate}
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.04em', marginBottom: 14 }}>
          THE WEEKLY RUNDOWN
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.65, color: '#D4D4D8', marginBottom: 18 }}>
          {TWIC_ISSUE_INTRO.framing}
        </div>
        <div style={{ color: '#7D7D7D', fontSize: 12 }}>
          <span style={{ color: accent }}>{'>'}</span> press{' '}
          <span style={{ color: '#E8E8E8' }}>SPACE</span> to enter the issue
          <Cursor />
        </div>
      </div>
    </div>
  );
}
