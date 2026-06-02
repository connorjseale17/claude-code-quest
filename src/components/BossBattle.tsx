import { useState, useEffect, useCallback, useRef } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { CONTENT } from '../content';
import { Cursor } from './TerminalFrame';
import { ChoicePicker } from './ChoicePicker';
import { PixelSprite } from './PixelSprite';
import { BossSprite, type BossDisplayPhase } from './BossSprite';
import { HPBar } from './HPBar';

type BattlePhase = 'intro' | 'question' | 'resolve' | 'strike' | 'victory' | 'defeat';
type HitTarget = 'bot' | 'boss' | null;

const RESOLVE_BANNER_MS = 1500;
const STRIKE_MS = 900;
const DEFEAT_HOLD_MS = 1800;
// Auto-fire PASS_CHALLENGE if the player lingers on the victory screen without
// pressing SPACE/Enter. Without this, a player who exits the panel via Escape
// (or just walks away from the keyboard) never marks challengePassed, so no
// key spawns and the door stays locked. Especially painful on TWiC's
// one-question / one-HP battles where the victory screen flashes by.
const VICTORY_HOLD_MS = 3000;

export function BossBattle() {
  const state = useGame();
  const dispatch = useGameDispatch();

  const level = LEVEL_CONFIGS[state.currentLevel];
  const lesson = CONTENT[state.currentLevel];
  const battle = lesson.battle;
  const accent = level.theme.accentColor;

  // Local battle state (no global reducer touches until victory).
  const [phase, setPhase] = useState<BattlePhase>('intro');
  const [bossHP, setBossHP] = useState(battle?.maxHP ?? 1);
  const [playerHP, setPlayerHP] = useState(battle?.playerHP ?? 5);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [hitTarget, setHitTarget] = useState<HitTarget>(null);
  const tauntRef = useRef<string>(battle?.tauntLines[0] ?? '');

  const currentQuestion = battle?.questions[questionIdx];
  const lastResult =
    selectedChoiceId && currentQuestion
      ? currentQuestion.choices.find(c => c.id === selectedChoiceId)
      : null;
  const lastWasCorrect = lastResult?.correct ?? false;

  // ---- Pick a fresh taunt on wrong answer ----
  useEffect(() => {
    if (phase === 'resolve' && !lastWasCorrect && battle && battle.tauntLines.length > 0) {
      tauntRef.current = battle.tauntLines[Math.floor(Math.random() * battle.tauntLines.length)];
    }
  }, [phase, lastWasCorrect, battle]);

  // ---- Soft retry on defeat ----
  const resetBattle = useCallback(() => {
    if (!battle) return;
    setBossHP(battle.maxHP);
    setPlayerHP(battle.playerHP ?? 5);
    setQuestionIdx(0);
    setSelectedChoiceId(null);
    setHitTarget(null);
    setPhase('intro');
  }, [battle]);

  useEffect(() => {
    if (phase !== 'defeat') return;
    const id = window.setTimeout(resetBattle, DEFEAT_HOLD_MS);
    return () => clearTimeout(id);
  }, [phase, resetBattle]);

  // ---- Victory dispatch ----
  const handleVictoryAdvance = useCallback(() => {
    dispatch({ type: 'PASS_CHALLENGE' });
  }, [dispatch]);

  // Auto-advance on victory after VICTORY_HOLD_MS so the progression chain
  // (PASS_CHALLENGE → key spawn → door unlock) can never be missed — even if
  // the player walks away or hits Escape instead of SPACE. SPACE still works
  // for immediate advance; this is a safety net, not a replacement.
  useEffect(() => {
    if (phase !== 'victory') return;
    const id = window.setTimeout(handleVictoryAdvance, VICTORY_HOLD_MS);
    return () => clearTimeout(id);
  }, [phase, handleVictoryAdvance]);

  // ---- resolve banner → strike ----
  useEffect(() => {
    if (phase !== 'resolve') return;
    const id = window.setTimeout(() => setPhase('strike'), RESOLVE_BANNER_MS);
    return () => clearTimeout(id);
  }, [phase]);

  // ---- strike: apply damage + flash, then transition ----
  useEffect(() => {
    if (phase !== 'strike' || !battle) return;

    // Apply HP at strike start so the bar drains in sync with the flash.
    const newBossHP = lastWasCorrect ? Math.max(0, bossHP - 1) : bossHP;
    const newPlayerHP = lastWasCorrect ? playerHP : Math.max(0, playerHP - 1);
    setHitTarget(lastWasCorrect ? 'boss' : 'bot');
    setBossHP(newBossHP);
    setPlayerHP(newPlayerHP);

    const id = window.setTimeout(() => {
      setHitTarget(null);
      if (newBossHP <= 0) {
        setPhase('victory');
      } else if (newPlayerHP <= 0) {
        setPhase('defeat');
      } else {
        setQuestionIdx(idx => (idx + 1) % battle.questions.length);
        setSelectedChoiceId(null);
        setPhase('question');
      }
    }, STRIKE_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ---- Keyboard: SPACE advances intro → question, victory → dispatch ----
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        // During victory: dispatch PASS_CHALLENGE instead of just CLOSE_PANEL,
        // so the player who hits Escape still gets the key + door unlock.
        // PASS_CHALLENGE's reducer also closes the panel, so behavior is
        // identical from the player's POV except the progression actually fires.
        if (phase === 'victory') {
          handleVictoryAdvance();
        } else {
          dispatch({ type: 'CLOSE_PANEL' });
        }
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

  if (!battle || !currentQuestion) return null;

  const maxBossHP = battle.maxHP;
  const maxPlayerHP = battle.playerHP ?? 5;
  const playerName = state.player.name || 'operator';

  const bossDisplay: BossDisplayPhase =
    phase === 'victory'
      ? 'defeat'
      : hitTarget === 'boss'
        ? 'hurt'
        : phase === 'strike' && !lastWasCorrect
          ? 'attack'
          : 'idle';

  // Whole-screen shake only when the PLAYER is hit.
  const screenShake = phase === 'strike' && hitTarget === 'bot';

  function handleChoice(choiceId: string) {
    if (phase !== 'question' || !currentQuestion) return;
    setSelectedChoiceId(choiceId);
    setPhase('resolve');
  }

  return (
    <div
      className="absolute inset-0 z-30 flex flex-col"
      style={{
        background: '#050505',
        fontFamily: "'JetBrains Mono', monospace",
        animation: screenShake ? 'cc-shake 250ms steps(4, end) 2' : undefined,
      }}
    >
      {/* HP bars row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 36px 0', alignItems: 'flex-start' }}>
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
            zIndex: 1,
            opacity: phase === 'defeat' ? 0.5 : 1,
            transition: 'opacity 300ms ease-out',
            animation:
              hitTarget === 'boss'
                ? 'cc-hit-flash 900ms linear 1, cc-shake 250ms steps(4, end) 2'
                : undefined,
          }}
        >
          <BossSprite spriteKey={battle.spriteKey} phase={bossDisplay} accent={accent} scale={6} art={battle.art} />
        </div>

        {/* Bot — lower-left (back view). Always rendered at scale 6 — never resized. */}
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: 60,
            opacity: phase === 'defeat' ? 0.4 : 1,
            animation: hitTarget === 'bot' ? 'cc-hit-flash 900ms linear 1' : undefined,
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

        {phase === 'question' && (
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

        {(phase === 'resolve' || phase === 'strike') && (
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
              {lastWasCorrect ? `⚔ STRIKE — ${battle.name} takes a hit!` : `✗ MISS — ${battle.name} strikes you!`}
            </div>
            {lastWasCorrect ? currentQuestion.passFeedback : currentQuestion.failFeedback}
            {!lastWasCorrect && (
              <div style={{ marginTop: 10, color: accent, fontStyle: 'italic', fontSize: 13 }}>
                {tauntRef.current}
              </div>
            )}
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
