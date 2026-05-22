import { useState, useEffect, useCallback, useMemo, Fragment } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { CONTENT } from '../content';
import { Cursor } from './TerminalFrame';

const BLANK_TOKEN = '____';

export function PracticePanel() {
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

  // Split template into segments separated by blanks
  const segments = useMemo(() => {
    if (!practice) return [];
    return practice.template.split(BLANK_TOKEN);
  }, [practice]);

  const allFilled = practice
    ? practice.blanks.every(b => selections[b.id])
    : false;

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
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        closePanel();
        return;
      }
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
    <div
      className="absolute inset-0 z-20 flex items-center justify-end"
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={closePanel}
    >
      <div
        className="flex flex-col h-full overflow-y-auto"
        style={{
          width: '55%',
          background: '#1A1A1A',
          borderLeft: `1px solid ${accent}`,
          padding: 32,
          fontFamily: "'JetBrains Mono', monospace",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ color: '#7D7D7D', fontSize: 13, marginBottom: 4 }}>
          LEVEL {numLabel} · {level.title}
        </div>
        <div style={{ color: accent, fontSize: 11, letterSpacing: '0.12em', marginBottom: 18 }}>
          PRACTICE TERMINAL
        </div>

        {/* Template with inline blanks */}
        <pre
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            lineHeight: 1.7,
            color: '#E8E8E8',
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {segments.map((seg, i) => {
            const blank = practice.blanks[i];
            return (
              <Fragment key={i}>
                {seg}
                {blank && (
                  <span
                    style={{
                      color: selections[blank.id] ? accent : '#7D7D7D',
                      fontWeight: 700,
                      background: '#0F0F0F',
                      padding: '0 6px',
                      borderBottom: `1px solid ${selections[blank.id] ? accent : '#3A3A3A'}`,
                    }}
                  >
                    {selections[blank.id] ?? `____${i + 1}____`}
                  </span>
                )}
              </Fragment>
            );
          })}
        </pre>

        {/* Chip suggestions per blank */}
        {!showCompletion && (
          <div style={{ marginTop: 24 }}>
            {practice.blanks.map((blank, i) => (
              <div key={blank.id} style={{ marginBottom: 14 }}>
                <div style={{ color: '#7D7D7D', fontSize: 12, marginBottom: 6 }}>
                  <span style={{ color: accent }}>{i + 1}.</span> {blank.id}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {blank.suggestions.map(s => {
                    const isSelected = selections[blank.id] === s;
                    return (
                      <button
                        key={s}
                        onClick={() =>
                          setSelections(prev => ({
                            ...prev,
                            [blank.id]: isSelected ? '' : s,
                          }))
                        }
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 12,
                          padding: '4px 10px',
                          background: isSelected ? accent : '#0F0F0F',
                          color: isSelected ? '#0F0F0F' : '#E8E8E8',
                          border: `1px solid ${isSelected ? accent : '#3A3A3A'}`,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          textAlign: 'left',
                        }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completion banner */}
        {showCompletion && (
          <div
            className="cc-active-objective"
            style={{
              marginTop: 28,
              padding: '18px 20px',
              border: `1px solid ${accent}`,
              background: '#0F0F0F',
              ['--glow-color' as string]: accent,
            } as React.CSSProperties}
          >
            <div style={{ fontSize: 16, color: accent, fontWeight: 700, letterSpacing: '0.05em' }}>
              {completionTag} {practice.prize.label}
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: '#7D7D7D' }}>
              Logged to your trophy case. Check the end screen.
            </div>
          </div>
        )}

        <div className="flex-1" />

        {/* Footer */}
        <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: 14, marginTop: 16, color: '#7D7D7D', fontSize: 13 }}>
          {showCompletion ? (
            <>
              <span style={{ color: accent }}>{'>'}</span> Press{' '}
              <span style={{ color: '#E8E8E8' }}>SPACE</span> to close
              <Cursor />
            </>
          ) : allFilled ? (
            <div className="flex items-center justify-between">
              <span>
                <span style={{ color: accent }}>{'>'}</span> all blanks filled
                <Cursor />
              </span>
              <button
                onClick={handleSubmit}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  padding: '6px 16px',
                  background: accent,
                  color: '#0F0F0F',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                }}
              >
                [SUBMIT]
              </button>
            </div>
          ) : (
            <>
              <span style={{ color: accent }}>{'>'}</span> click a chip for each blank
              <Cursor />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
