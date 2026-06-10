import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { Cursor, TerminalFrame } from './TerminalFrame';
import { PixelSprite } from './PixelSprite';
import { TWIC_ISSUE_INTRO } from '../content/twic-issue';
import { useGameDispatch } from '../engine/GameContext';
import { PlayAgainButton } from './PlayAgainButton';
import { FeedbackButton } from './FeedbackButton';

/**
 * Terminal end-state for the TWiC track. Player landed here by walking through
 * twic-3's `{kind:'end'}` exit. Pure stamp + date, no trophy/lesson tally (those
 * belong to the Quest). Offers "play again" back to path-select.
 */
export function TwicStampScreen() {
  const accent = LEVEL_CONFIGS['twic-1'].theme.accentColor;
  const dispatch = useGameDispatch();

  return (
    <TerminalFrame title="this-week-in-claude --complete" accent>
      <div
        className="flex flex-col items-center justify-center h-full gap-6"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: '#E8E8E8',
          padding: '32px 24px',
        }}
      >
        <PixelSprite frame="victory" scale={5} />

        <div style={{ color: accent, fontSize: 12, letterSpacing: '0.18em' }}>
          ── ISSUE FILED ──
        </div>

        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: '0.04em',
            textAlign: 'center',
            lineHeight: 1.25,
          }}
        >
          <span style={{ color: accent }}>{'>'}</span> THIS WEEK IN CLAUDE
          <br />
          <span style={{ fontSize: 16, color: '#9A9A9A', letterSpacing: '0.12em' }}>
            · {TWIC_ISSUE_INTRO.publishDate} ·
          </span>
        </div>

        <div
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            textAlign: 'center',
            maxWidth: 560,
            color: '#9A9A9A',
          }}
        >
          You walked the three rooms, talked to every Beat Reporter, read every brief, and answered every door.
          <br />
          <span style={{ color: '#E8E8E8' }}>The issue is closed. Next one drops next week.</span>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <PlayAgainButton accent={accent} onClick={() => dispatch({ type: 'RESTART_RUN' })} />
          <FeedbackButton accent={accent} source="twic-end" />
        </div>

        <div style={{ color: '#7D7D7D', fontSize: 13, textAlign: 'center', marginTop: 4 }}>
          <span style={{ color: accent }}>{'>'}</span> built with claude code
          <Cursor />
        </div>
      </div>
    </TerminalFrame>
  );
}
