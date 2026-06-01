import { useState, useEffect, useCallback } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { CONTENT } from '../content';
import { Cursor } from './TerminalFrame';
import { BlankFiller, isAllFilled } from './BlankFiller';
import { RetroChassis } from './RetroChassis';

export function PracticeTerminal() {
  const state = useGame();
  const dispatch = useGameDispatch();

  const level = LEVEL_CONFIGS[state.currentLevel];
  const lesson = CONTENT[state.currentLevel];
  const practice = lesson.practice;
  const accent = level.theme.accentColor;

  const alreadyEarned = practice
    ? state.prizesUnlocked.includes(practice.prize.id)
    : false;

  const [selections, setSelections] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const allFilled = practice ? isAllFilled(practice.blanks, selections) : false;

  const handleSubmit = useCallback(() => {
    if (!practice || !allFilled) return;
    dispatch({ type: 'UNLOCK_PRIZE', prizeId: practice.prize.id });
    setSubmitted(true);
  }, [practice, allFilled, dispatch]);

  const closePanel = useCallback(() => {
    dispatch({ type: 'CLOSE_PANEL' });
  }, [dispatch]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (alreadyEarned || submitted) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          closePanel();
        }
        return;
      }
      if (e.key === 'Enter' && allFilled) {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [alreadyEarned, submitted, allFilled, handleSubmit, closePanel]);

  if (!practice) return null;

  const numLabel = String(level.number).padStart(2, '0');
  const showCompletion = alreadyEarned || submitted;
  const completionTag = submitted ? '[PRIZE UNLOCKED]' : '[ALREADY EARNED]';

  return (
    <RetroChassis
      variant="lab"
      accent={accent}
      diskLabel="PRACTICE"
      chassisName="CLAUDY-LAB"
      topbarText={`LVL ${numLabel} · ${level.title}`}
      topbarSub="PRACTICE.DISK"
      onClose={closePanel}
    >
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ color: accent, fontSize: 10, letterSpacing: '0.14em', marginBottom: 10 }}>
          PRACTICE TERMINAL
        </div>

        <div style={{ flex: 1, overflowY: 'auto', color: '#E8E8E8' }}>
          {!showCompletion && (
            <BlankFiller
              template={practice.template}
              blanks={practice.blanks}
              selections={selections}
              onChange={setSelections}
              accent={accent}
            />
          )}

          {showCompletion && (
            <div
              className="cc-active-objective"
              style={{
                padding: '14px 16px',
                border: `1px solid ${accent}`,
                background: '#0F0F0F',
                ['--glow-color' as string]: accent,
              } as React.CSSProperties}
            >
              <div style={{ fontSize: 14, color: accent, fontWeight: 700, letterSpacing: '0.06em' }}>
                {completionTag} {practice.prize.label}
              </div>
              <div style={{ marginTop: 6, fontSize: 11, color: '#7D7D7D' }}>
                Logged to your trophy case. Check the end screen.
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            borderTop: '1px solid #1F2F25',
            paddingTop: 8,
            marginTop: 8,
            color: '#7D7D7D',
            fontSize: 11,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          {showCompletion ? (
            <span>
              <span style={{ color: accent }}>{'>'}</span>{' '}
              <span style={{ color: '#E8E8E8' }}>SPACE</span> to close
              <Cursor color={accent} />
            </span>
          ) : allFilled ? (
            <>
              <span>
                <span style={{ color: accent }}>{'>'}</span> all blanks filled
                <Cursor color={accent} />
              </span>
              <button
                onClick={handleSubmit}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  padding: '4px 14px',
                  background: accent,
                  color: '#0F0F0F',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                }}
              >
                [SUBMIT]
              </button>
            </>
          ) : (
            <span>
              <span style={{ color: accent }}>{'>'}</span> click a chip for each blank
              <Cursor color={accent} />
            </span>
          )}
        </div>
      </div>
    </RetroChassis>
  );
}
