import { useState, useEffect, useCallback } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { CONTENT } from '../content';
import { Cursor } from './TerminalFrame';
import { ChoicePicker } from './ChoicePicker';
import { RetroChassis } from './RetroChassis';

export function ChallengeTerminal() {
  const state = useGame();
  const dispatch = useGameDispatch();
  const [displayedText, setDisplayedText] = useState('');
  const [textDone, setTextDone] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<'pass' | 'fail' | null>(null);
  const [bootReady, setBootReady] = useState(false);

  const level = LEVEL_CONFIGS[state.currentLevel];
  const content = CONTENT[state.currentLevel];
  const accent = level.theme.accentColor;
  const fullText = content?.prompt ?? '';

  // Typewriter — only runs after boot completes
  useEffect(() => {
    if (!bootReady) return;
    setDisplayedText('');
    setTextDone(false);
    setSelected(null);
    setResult(null);

    let i = 0;
    const id = setInterval(() => {
      i++;
      if (i >= fullText.length) {
        setDisplayedText(fullText);
        setTextDone(true);
        clearInterval(id);
      } else {
        setDisplayedText(fullText.slice(0, i));
      }
    }, 28);

    return () => clearInterval(id);
  }, [bootReady, fullText]);

  // Detect bootReady transition by polling — the chassis switches into the
  // 'ready' phase internally, but doesn't notify us. The cheapest reliable
  // signal is: once children are rendered, we know we're ready. So just set
  // bootReady on first render of our content.
  useEffect(() => {
    if (!bootReady) {
      const id = window.setTimeout(() => setBootReady(true), 0);
      return () => clearTimeout(id);
    }
  }, [bootReady]);

  const skipTypewriter = useCallback(() => {
    if (!textDone) {
      setDisplayedText(fullText);
      setTextDone(true);
    }
  }, [textDone, fullText]);

  const closePanel = useCallback(() => {
    dispatch({ type: 'CLOSE_PANEL' });
  }, [dispatch]);

  useEffect(() => {
    if (!bootReady) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        if (result === 'pass') {
          e.preventDefault();
          dispatch({ type: 'PASS_CHALLENGE' });
        } else if (!textDone) {
          e.preventDefault();
          skipTypewriter();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [bootReady, textDone, result, dispatch, skipTypewriter]);

  if (!content) return null;

  function handleChoice(choiceId: string) {
    setSelected(choiceId);
    const choice = content.choices.find(c => c.id === choiceId);
    if (choice?.correct) {
      setResult('pass');
    } else {
      setResult('fail');
      setTimeout(() => {
        setSelected(null);
        setResult(null);
      }, 1500);
    }
  }

  const numLabel = String(level.number).padStart(2, '0');

  return (
    <RetroChassis
      variant="mac"
      accent={accent}
      diskLabel="BOSS BATTLE"
      chassisName="CLAUDY-MAC"
      topbarText={`LVL ${numLabel} · ${level.title}`}
      topbarSub="BOSS.BATTLE"
      onClose={closePanel}
    >
      <div onClick={skipTypewriter} style={{ cursor: 'default', height: '100%' }}>
        {/* Prompt */}
        <div style={{ fontSize: 13, lineHeight: 1.5, color: '#E8E8E8', marginBottom: 14, whiteSpace: 'pre-wrap' }}>
          {displayedText}
          {!textDone && <Cursor color={accent} />}
        </div>

        {/* Choices */}
        {textDone && (
          <ChoicePicker
            choices={content.choices.map(c => ({ id: c.id, label: c.label }))}
            accent={accent}
            selectedId={selected}
            result={result}
            onSelect={handleChoice}
            enableNumberKeys={textDone && !result}
          />
        )}

        {/* Feedback */}
        {result === 'pass' && (
          <div
            style={{
              marginTop: 12,
              padding: '8px 10px',
              border: '1px solid rgba(63, 185, 80, 0.3)',
              background: '#0F1A12',
              fontSize: 12,
              lineHeight: 1.4,
            }}
          >
            <span style={{ color: '#3FB950' }}>{content.passFeedback.split(']')[0]}]</span>
            {content.passFeedback.split(']').slice(1).join(']')}
          </div>
        )}
        {result === 'fail' && (
          <div
            style={{
              marginTop: 12,
              padding: '8px 10px',
              border: '1px solid rgba(248, 81, 73, 0.3)',
              background: '#1A0F0F',
              fontSize: 12,
              lineHeight: 1.4,
            }}
          >
            <span style={{ color: '#F85149' }}>{content.failFeedback.split(']')[0]}]</span>
            {content.failFeedback.split(']').slice(1).join(']')}
          </div>
        )}

        {/* Footer hint */}
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: 16,
            right: 16,
            borderTop: '1px solid #1F2F25',
            paddingTop: 6,
            color: '#3A4A40',
            fontSize: 11,
          }}
        >
          {result === 'pass' && (
            <>
              <span style={{ color: '#3FB950' }}>{'>'}</span>{' '}
              <span style={{ color: '#7FA890' }}>SPACE</span> to continue
            </>
          )}
          {result === 'fail' && (
            <>
              <span style={{ color: '#F85149' }}>{'>'}</span> try again…
            </>
          )}
          {!result && textDone && (
            <>
              <span style={{ color: accent }}>{'>'}</span> select 1–{content.choices.length}
            </>
          )}
          {!result && !textDone && (
            <>
              <span style={{ color: accent }}>{'>'}</span> printing scenario
            </>
          )}
        </div>
      </div>
    </RetroChassis>
  );
}
