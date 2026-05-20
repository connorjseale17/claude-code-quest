import { useState, useEffect, useCallback } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { LEVEL_CONFIGS, type LevelId } from '../engine/roomConfigs';
import { welcomeContent } from '../content/welcome';
import { claudemdContent } from '../content/claudemd';
import { slashContent } from '../content/slash';
import { mcpContent } from '../content/mcp';
import { subagentsContent } from '../content/subagents';
import { Cursor } from './TerminalFrame';
import type { LessonContent } from '../content/types';

const CONTENT: Record<LevelId, LessonContent> = {
  welcome: welcomeContent,
  claudemd: claudemdContent,
  slash: slashContent,
  mcp: mcpContent,
  subagents: subagentsContent,
};

export function ChallengePanel() {
  const state = useGame();
  const dispatch = useGameDispatch();
  const [displayedText, setDisplayedText] = useState('');
  const [textDone, setTextDone] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<'pass' | 'fail' | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number>(-1);

  const level = LEVEL_CONFIGS[state.currentLevel];
  const content = CONTENT[state.currentLevel];
  const accent = level.theme.accentColor;
  const fullText = content?.prompt ?? '';

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setTextDone(false);
    setSelected(null);
    setResult(null);
    setHoveredIdx(-1);

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
    }, 35);

    return () => clearInterval(id);
  }, [fullText]);

  // Skip typewriter on click/space
  const skipTypewriter = useCallback(() => {
    if (!textDone) {
      setDisplayedText(fullText);
      setTextDone(true);
    }
  }, [textDone, fullText]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Escape' || e.key === 'Enter') {
        e.preventDefault();
        if (result === 'pass') {
          dispatch({ type: 'PASS_CHALLENGE' });
        } else if (!textDone) {
          skipTypewriter();
        }
      }

      // Number keys for choice selection
      if (textDone && !result && content) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= content.choices.length) {
          handleChoice(content.choices[num - 1].id);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [textDone, result, dispatch, skipTypewriter, content]);

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
    <div
      className="absolute inset-0 z-20 flex items-center justify-end"
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={skipTypewriter}
    >
      <div
        className="flex flex-col h-full"
        style={{
          width: '55%',
          background: '#1A1A1A',
          borderLeft: `1px solid ${accent}`,
          padding: 32,
          fontFamily: "'JetBrains Mono', monospace",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ color: '#7D7D7D', fontSize: 13, marginBottom: 8 }}>
          LEVEL {numLabel} · {level.title}
        </div>

        {/* Prompt text with typewriter */}
        <div style={{ fontSize: 16, lineHeight: 1.5, marginTop: 18, color: '#E8E8E8' }}>
          {displayedText}
          {!textDone && <Cursor />}
        </div>

        {/* Choices */}
        {textDone && (
          <div style={{ marginTop: 28, fontSize: 15, lineHeight: 2.0 }}>
            {content.choices.map((choice, i) => {
              let color = '#7D7D7D';
              let marker = ' ';
              let tail = '';

              if (selected === choice.id && result === 'pass') {
                color = '#3FB950';
                marker = '>';
                tail = ' ✓';
              } else if (selected === choice.id && result === 'fail') {
                color = '#F85149';
                marker = '>';
                tail = ' ✗';
              } else if (hoveredIdx === i && !selected) {
                color = accent;
                marker = '>';
              } else if (selected && selected !== choice.id) {
                color = '#3A3A3A';
              }

              return (
                <div
                  key={choice.id}
                  className="flex gap-3 cursor-pointer"
                  style={{ color }}
                  onClick={() => !selected && handleChoice(choice.id)}
                  onMouseEnter={() => !selected && setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(-1)}
                >
                  <span style={{ width: 14, color }}>{marker}</span>
                  <span style={{ width: 22 }}>{i + 1}.</span>
                  <span className="flex-1">{choice.label}{tail}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Feedback */}
        {result === 'pass' && (
          <div
            style={{
              marginTop: 28,
              padding: '16px 18px',
              border: '1px solid rgba(63, 185, 80, 0.2)',
              background: '#0F1A12',
            }}
          >
            <div style={{ fontSize: 14, lineHeight: 1.5 }}>
              <span style={{ color: '#3FB950' }}>{content.passFeedback.split(']')[0]}]</span>
              {content.passFeedback.split(']').slice(1).join(']')}
            </div>
          </div>
        )}
        {result === 'fail' && (
          <div
            style={{
              marginTop: 28,
              padding: '16px 18px',
              border: '1px solid rgba(248, 81, 73, 0.2)',
              background: '#1A0F0F',
            }}
          >
            <div style={{ fontSize: 14, lineHeight: 1.5 }}>
              <span style={{ color: '#F85149' }}>{content.failFeedback.split(']')[0]}]</span>
              {content.failFeedback.split(']').slice(1).join(']')}
            </div>
          </div>
        )}

        <div className="flex-1" />

        {/* Footer prompt */}
        <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: 14, color: '#7D7D7D', fontSize: 13 }}>
          {result === 'pass' && (
            <>
              <span style={{ color: '#3FB950' }}>{'>'}</span> Press{' '}
              <span style={{ color: '#E8E8E8' }}>SPACE</span> to continue
              <Cursor />
            </>
          )}
          {result === 'fail' && (
            <>
              <span style={{ color: '#F85149' }}>{'>'}</span> Try again...
              <Cursor />
            </>
          )}
          {!result && textDone && (
            <>
              <span style={{ color: accent }}>{'>'}</span> select 1–{content.choices.length}
              <Cursor />
            </>
          )}
          {!result && !textDone && (
            <>
              <span style={{ color: accent }}>{'>'}</span> printing scenario
              <Cursor />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
