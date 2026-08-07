import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { Cursor, TerminalFrame } from './TerminalFrame';
import { PixelSprite } from './PixelSprite';
import { useGameDispatch } from '../engine/GameContext';
import { PlayAgainButton } from './PlayAgainButton';
import { FeedbackButton } from './FeedbackButton';

/**
 * Terminal end-state for the Cowork track. Player landed here by walking through
 * a cowork level's `{kind:'end'}` exit. Light, Cowork-branded stamp — no cert,
 * no leaderboard, no trophy tally (deliberately kept separate from the Quest).
 * Offers "play again" back to path-select. Mirrors TwicStampScreen.
 */
export function CoworkStampScreen() {
  const accent = LEVEL_CONFIGS['cowork-1'].theme.accentColor;
  const dispatch = useGameDispatch();

  return (
    <TerminalFrame title="claude-cowork-quest --complete" accent>
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
          ── MODULE CLEARED ──
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
          <span style={{ color: accent }}>{'>'}</span> CLAUDE COWORK QUEST
          <br />
          <span style={{ fontSize: 16, color: '#9A9A9A', letterSpacing: '0.12em' }}>
            · ALL SEVEN MODULES CLEARED ·
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
          From the Delegation Gate to the Engagement Keep — you can set Cowork up safely, brief it like a sharp analyst, wire the connectors, forge real deliverables, review against prompt injection, and run a whole governed engagement.
          <br />
          <span style={{ color: '#E8E8E8' }}>You're a Claude Cowork operator now. Go delegate something real.</span>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <PlayAgainButton accent={accent} onClick={() => dispatch({ type: 'RESTART_RUN' })} />
          <FeedbackButton accent={accent} source="cowork-end" />
        </div>

        <div style={{ color: '#7D7D7D', fontSize: 13, textAlign: 'center', marginTop: 4 }}>
          <span style={{ color: accent }}>{'>'}</span> built with claude code
          <Cursor />
        </div>
      </div>
    </TerminalFrame>
  );
}
