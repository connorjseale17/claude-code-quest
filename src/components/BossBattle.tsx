import { useState, useEffect, useCallback, useRef } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { CONTENT } from '../content';
import { Cursor } from './TerminalFrame';
import { ChoicePicker } from './ChoicePicker';
import { PixelSprite } from './PixelSprite';
import { BossSprite, type BossDisplayPhase } from './BossSprite';
import { HPBar } from './HPBar';
import { DodgeArena } from './DodgeArena';

type BattlePhase =
  | 'intro'
  | 'question'
  | 'resolve'
  | 'dodge'
  | 'damage'
  | 'victory'
  | 'defeat';

const RESOLVE_BANNER_MS = 1500;
const HIT_FLASH_MS = 250;
const DEFEAT_HOLD_MS = 1800;

export function BossBattle() {
  const state = useGame();
  const dispatch = useGameDispatch();

  const level = LEVEL_CONFIGS[state.currentLevel];
  const lesson = CONTENT[state.currentLevel];
  const battle = lesson.battle;
  const accent = level.theme.accentColor;

  // Local battle state (no global reducer touches until victory)
  const [phase, setPhase] = useState<BattlePhase>('intro');
  const [bossHP, setBossHP] = useState(battle?.maxHP ?? 1);
  const [playerHP, setPlayerHP] = useState(battle?.playerHP ?? 5);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [dodgeDifficulty, setDodgeDifficulty] = useState<'easy' | 'hard'>('easy');
  const [shake, setShake] = useState(false);
  const tauntRef = useRef<string>(battle?.tauntLines[0] ?? '');

  if (!battle) return null;

  const currentQuestion = battle.questions[questionIdx];
  const maxBossHP = battle.maxHP;
  const maxPlayerHP = battle.playerHP ?? 5;

  // ---- Phase derivations ----
  const lastResult = selectedChoiceId
    ? currentQuestion.choices.find(c => c.id === selectedChoiceId)
    : null;
  const lastWasCorrect = lastResult?.correct ?? false;

  const bossDisplay: BossDisplayPhase =
    phase === 'defeat' || phase === 'victory'
      ? phase === 'victory'
        ? 'defeat'   // boss defeated when player wins
        : 'attack'   // boss "wins" in defeat
      : phase === 'damage'
        ? 'attack'
        : phase === 'resolve' && lastWasCorrect
          ? 'hurt'
          : 'idle';

  // ---- Pick a fresh taunt on wrong answer ----
  useEffect(() => {
    if (phase === 'resolve' && !lastWasCorrect && battle.tauntLines.length > 0) {
      tauntRef.current = battle.tauntLines[Math.floor(Math.random() * battle.tauntLines.length)];
    }
  }, [phase, lastWasCorrect, battle.tauntLines]);

  // ---- Soft retry on defeat ----
  const resetBattle = useCallback(() => {
    setBossHP(battle.maxHP);
    setPlayerHP(battle.playerHP ?? 5);
    setQuestionIdx(0);
    setSelectedChoiceId(null);
    setDodgeDifficulty('easy');
    // Reshuffle question order subtly: just reset to 0; full shuffle is overkill for now.
    setPhase('intro');
  }, [battle.maxHP, battle.playerHP]);

  // ---- Auto-advance defeat → retry after a beat ----
  useEffect(() => {
    if (phase !== 'defeat') return;
    const id = window.setTimeout(resetBattle, DEFEAT_HOLD_MS);
    return () => clearTimeout(id);
  }, [phase, resetBattle]);

  // ---- Victory dispatch ----
  const handleVictoryAdvance = useCallback(() => {
    dispatch({ type: 'PASS_CHALLENGE' });
  }, [dispatch]);

  // ---- Phase: resolve → dodge → damage → check ----
  useEffect(() => {
    if (phase !== 'resolve') return;
    // Apply boss damage immediately on correct answer
    const id = window.setTimeout(() => {
      setPhase('dodge');
    }, RESOLVE_BANNER_MS);
    return () => clearTimeout(id);
  }, [phase]);

  // Real dodge wave (via DodgeArena callback)
  const handleDodgeResolve = useCallback((heartsLost: number) => {
    if (heartsLost > 0) {
      setShake(true);
      window.setTimeout(() => setShake(false), HIT_FLASH_MS);
    }
    const newPlayerHP = Math.max(0, playerHP - heartsLost);
    const newBossHP = lastWasCorrect ? Math.max(0, bossHP - 1) : bossHP;
    setPlayerHP(newPlayerHP);
    setBossHP(newBossHP);
    if (newBossHP <= 0) {
      setPhase('victory');
    } else if (newPlayerHP <= 0) {
      setPhase('defeat');
    } else {
      setQuestionIdx(idx => (idx + 1) % battle.questions.length);
      setSelectedChoiceId(null);
      setPhase('question');
    }
  }, [playerHP, bossHP, lastWasCorrect, battle.questions.length]);

  // ---- Keyboard: SPACE advances intro → question, and victory → dispatch ----
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        dispatch({ type: 'CLOSE_PANEL' });
        return;
      }
      if (e.key === ' ' || e.key === 'Enter') {
        if (phase === 'intro') {
          e.preventDefault();
          setPhase('question');
        } else if (phase === 'victory') {
          e.preventDefault();
          handleVictoryAdvance();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, dispatch, handleVictoryAdvance]);

  function handleChoice(choiceId: string) {
    if (phase !== 'question') return;
    setSelectedChoiceId(choiceId);
    const choice = currentQuestion.choices.find(c => c.id === choiceId);
    setDodgeDifficulty(choice?.correct ? 'easy' : 'hard');
    setPhase('resolve');
  }

  const playerName = state.player.name || 'operator';

  return (
    <div
      className="absolute inset-0 z-30 flex flex-col"
      style={{
        background: '#050505',
        fontFamily: "'JetBrains Mono', monospace",
        animation: shake ? 'cc-shake 250ms steps(4, end)' : undefined,
      }}
    >
      {/* HP bars row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px 36px 0',
          alignItems: 'flex-start',
        }}
      >
        <HPBar current={playerHP} max={maxPlayerHP} accent="#F85149" align="left" label={playerName} />
        <HPBar current={bossHP} max={maxBossHP} accent={accent} align="right" label={battle.name} />
      </div>

      {/* Scene area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Boss sprite — upper-right */}
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 60,
            opacity: phase === 'defeat' ? 0.5 : 1,
            filter: phase === 'resolve' && lastWasCorrect ? 'brightness(2)' : undefined,
            transition: 'filter 100ms linear, opacity 300ms ease-out',
          }}
        >
          <BossSprite spriteKey={battle.spriteKey} phase={bossDisplay} accent={accent} scale={6} />
        </div>

        {/* Bot — lower-left (back view) */}
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: 60,
            opacity: phase === 'defeat' ? 0.4 : 1,
          }}
        >
          <PixelSprite frame="bot_back" scale={6} primaryColor={state.player.botColor} />
        </div>

      </div>

      {/* Bottom panel */}
      <div
        style={{
          minHeight: '38%',
          maxHeight: '52%',
          background: '#0A0A0A',
          borderTop: `2px solid ${accent}`,
          padding: '18px 28px',
          color: '#E8E8E8',
          overflowY: 'auto',
        }}
      >
        <div style={{ color: accent, fontSize: 11, letterSpacing: '0.14em', marginBottom: 10 }}>
          {battle.name}
        </div>

        {phase === 'intro' && (
          <>
            <div style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 14, whiteSpace: 'pre-wrap' }}>
              {battle.introLine}
            </div>
            <div style={{ color: '#7D7D7D', fontSize: 12 }}>
              <span style={{ color: accent }}>{'>'}</span>{' '}
              <span style={{ color: '#E8E8E8' }}>SPACE</span> to engage
              <Cursor color={accent} />
            </div>
          </>
        )}

        {phase === 'question' && currentQuestion && (
          <>
            <div style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 12, color: '#E8E8E8', whiteSpace: 'pre-wrap' }}>
              {currentQuestion.prompt}
            </div>
            <ChoicePicker
              choices={currentQuestion.choices.map(c => ({ id: c.id, label: c.label }))}
              accent={accent}
              selectedId={null}
              onSelect={handleChoice}
              enableNumberKeys
            />
            <div style={{ marginTop: 10, color: '#7D7D7D', fontSize: 11 }}>
              <span style={{ color: accent }}>{'>'}</span> select 1–{currentQuestion.choices.length}
              <Cursor color={accent} />
            </div>
          </>
        )}

        {phase === 'resolve' && (
          <div
            style={{
              padding: '14px 16px',
              background: lastWasCorrect ? '#0F1A12' : '#1A0F0F',
              border: `1px solid ${lastWasCorrect ? 'rgba(63,185,80,0.3)' : 'rgba(248,81,73,0.3)'}`,
              fontSize: 14,
              lineHeight: 1.5,
            }}
          >
            <div style={{ color: lastWasCorrect ? '#3FB950' : '#F85149', fontWeight: 700, marginBottom: 6 }}>
              {lastWasCorrect ? '⚔ STRIKE' : '✗ MISS'}
            </div>
            {lastWasCorrect ? currentQuestion.passFeedback : currentQuestion.failFeedback}
            {!lastWasCorrect && (
              <div style={{ marginTop: 10, color: accent, fontStyle: 'italic', fontSize: 13 }}>
                {tauntRef.current}
              </div>
            )}
          </div>
        )}

        {phase === 'dodge' && (
          <div>
            <div
              style={{
                fontSize: 12,
                color: dodgeDifficulty === 'easy' ? '#3FB950' : '#F85149',
                textAlign: 'center',
                marginBottom: 8,
                letterSpacing: '0.2em',
                fontWeight: 700,
              }}
            >
              {dodgeDifficulty === 'easy' ? '— DODGE — easy wave —' : `— ${battle.name} ATTACKS —`}
            </div>
            <DodgeArena
              difficulty={dodgeDifficulty}
              playerColor={state.player.botColor}
              flameColor={accent}
              onResolve={handleDodgeResolve}
            />
          </div>
        )}

        {phase === 'victory' && (
          <>
            <div style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 14, whiteSpace: 'pre-wrap', color: '#3FB950' }}>
              {battle.victoryLine}
            </div>
            <div style={{ color: '#7D7D7D', fontSize: 12 }}>
              <span style={{ color: '#3FB950' }}>{'>'}</span>{' '}
              <span style={{ color: '#E8E8E8' }}>SPACE</span> to claim the key
              <Cursor color="#3FB950" />
            </div>
          </>
        )}

        {phase === 'defeat' && (
          <div
            style={{
              padding: '14px 16px',
              background: '#1A0F0F',
              border: '1px solid rgba(248,81,73,0.5)',
              fontSize: 14,
              lineHeight: 1.5,
              textAlign: 'center',
            }}
          >
            <div style={{ color: '#F85149', fontWeight: 700, marginBottom: 8, letterSpacing: '0.18em' }}>
              ── CONNECTION LOST ──
            </div>
            <div style={{ color: '#7D7D7D' }}>
              /rewind … re-engaging {battle.name.toLowerCase()} at full HP
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
