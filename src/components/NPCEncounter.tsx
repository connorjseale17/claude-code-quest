import { useState, useEffect, useCallback, useMemo } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { CONTENT } from '../content';
import type { ConversationBeat, ConversationChoice } from '../content/types';
import { Cursor } from './TerminalFrame';
import { PixelSprite } from './PixelSprite';
import { ChoicePicker } from './ChoicePicker';
import { BlankFiller, isAllFilled } from './BlankFiller';

type Phase = 'recap-or-skip' | 'in-conversation';

const RECAP_CHOICES: ConversationChoice[] = [
  { id: 'recap', label: 'Run the full lesson again', correct: true, reaction: '' },
  { id: 'skip', label: 'Just the summary', correct: true, reaction: '' },
];

export function NPCEncounter() {
  const state = useGame();
  const dispatch = useGameDispatch();

  const level = LEVEL_CONFIGS[state.currentLevel];
  const chamber = level.chambers[state.currentChamber];
  const lesson = CONTENT[state.currentLevel];
  const accent = level.theme.accentColor;

  const npcId = state.activePanel?.itemId ?? '';
  const npc = chamber.npcs.find(n => n.id === npcId);
  const conversation = lesson.conversations?.[npcId];
  const alreadyCompleted = state.lessonsCompleted.includes(npcId);

  // Fallback for NPCs without authored conversations: their existing
  // `dialog: string[]` runs as sequential `say` beats in the new visual frame.
  const fallbackBeats: ConversationBeat[] = useMemo(
    () => (npc?.dialog ?? []).map<ConversationBeat>(text => ({ kind: 'say', text })),
    [npc],
  );

  const initialPhase: Phase =
    conversation && alreadyCompleted ? 'recap-or-skip' : 'in-conversation';
  const initialBeats: ConversationBeat[] = conversation
    ? conversation.beats
    : fallbackBeats;

  const [phase, setPhase] = useState<Phase>(initialPhase);
  const [beats, setBeats] = useState<ConversationBeat[]>(initialBeats);
  const [beatIdx, setBeatIdx] = useState(0);
  const [picked, setPicked] = useState<ConversationChoice | null>(null);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [blankSubmitted, setBlankSubmitted] = useState(false);

  // Reset per-beat state when the beat changes
  useEffect(() => {
    setPicked(null);
    setSelections({});
    setBlankSubmitted(false);
  }, [beatIdx, phase]);

  const currentBeat = phase === 'in-conversation' ? beats[beatIdx] : null;
  const isLastBeat = beatIdx >= beats.length - 1;

  const closePanel = useCallback(() => {
    dispatch({ type: 'CLOSE_PANEL' });
  }, [dispatch]);

  const advance = useCallback(() => {
    if (isLastBeat) {
      // Mark the lesson completed if it was a real conversation (not just
      // a re-summary path or the un-authored fallback).
      const wasRealConversation =
        conversation && beats === conversation.beats && !alreadyCompleted;
      if (wasRealConversation) {
        dispatch({ type: 'MARK_LESSON_COMPLETED', npcId });
      }
      closePanel();
      return;
    }
    setBeatIdx(i => i + 1);
  }, [isLastBeat, conversation, beats, alreadyCompleted, dispatch, npcId, closePanel]);

  const pickRecapOrSkip = useCallback(
    (choiceId: string) => {
      if (!conversation) return;
      if (choiceId === 'recap') {
        setBeats(conversation.beats);
      } else {
        setBeats([{ kind: 'say', text: conversation.summary }]);
      }
      setBeatIdx(0);
      setPhase('in-conversation');
    },
    [conversation],
  );

  // Keyboard advance
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closePanel();
        return;
      }
      if (e.key !== ' ' && e.key !== 'Enter' && e.key !== 'e' && e.key !== 'E') return;
      // Recap-or-skip phase: choice handled by ChoicePicker (number keys)
      if (phase === 'recap-or-skip') return;
      if (!currentBeat) return;
      e.preventDefault();
      if (currentBeat.kind === 'say') {
        advance();
      } else if (currentBeat.kind === 'choice') {
        if (picked) advance();
      } else if (currentBeat.kind === 'blank') {
        if (blankSubmitted) {
          advance();
        } else if (isAllFilled(currentBeat.blanks, selections)) {
          setBlankSubmitted(true);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, currentBeat, picked, blankSubmitted, selections, advance, closePanel]);

  if (!npc) return null;

  const playerName = state.player.name || 'operator';
  const subText = (s: string) => s.replaceAll('operator', playerName);

  // ---- Render ----

  return (
    <div
      className="absolute inset-0 z-30 flex flex-col"
      style={{
        background: level.theme.floorColor,
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* Scene area */}
      <div className="flex-1 relative overflow-hidden">
        {/* NPC sprite, upper-right, large */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            right: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <PixelSprite
            frame={npc.sprite ?? 'idle_a'}
            scale={6}
            primaryColor={npc.color}
          />
          <div
            style={{
              marginTop: 8,
              fontSize: 11,
              letterSpacing: '0.12em',
              color: accent,
            }}
          >
            {npc.name.toUpperCase()}
          </div>
        </div>

        {/* Bot back-view, lower-left, large */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <PixelSprite
            frame="bot_back"
            scale={6}
            primaryColor={state.player.botColor}
          />
          <div
            style={{
              marginTop: 8,
              fontSize: 11,
              letterSpacing: '0.12em',
              color: '#7D7D7D',
            }}
          >
            {playerName.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Dialog box */}
      <div
        style={{
          minHeight: '40%',
          maxHeight: '55%',
          background: '#0A0A0A',
          borderTop: `2px solid ${accent}`,
          padding: '20px 28px 18px',
          color: '#E8E8E8',
          overflowY: 'auto',
        }}
      >
        {phase === 'recap-or-skip' && (
          <RecapOrSkip
            npcName={npc.name}
            accent={accent}
            onPick={pickRecapOrSkip}
          />
        )}

        {phase === 'in-conversation' && currentBeat && (
          <BeatView
            beat={currentBeat}
            beatIdx={beatIdx}
            beatTotal={beats.length}
            npcName={npc.name}
            accent={accent}
            picked={picked}
            onPick={setPicked}
            selections={selections}
            onSelectionsChange={setSelections}
            blankSubmitted={blankSubmitted}
            onSubmitBlank={() => setBlankSubmitted(true)}
            subText={subText}
            advance={advance}
          />
        )}
      </div>
    </div>
  );
}

// ===========================================================================
// Sub-views
// ===========================================================================

function RecapOrSkip({
  npcName,
  accent,
  onPick,
}: {
  npcName: string;
  accent: string;
  onPick: (id: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div>
      <div style={{ color: accent, fontSize: 11, letterSpacing: '0.12em', marginBottom: 10 }}>
        {npcName.toUpperCase()}
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 18 }}>
        Welcome back, operator. Want me to run the full lesson again, or just give you the summary?
      </div>
      <ChoicePicker
        choices={RECAP_CHOICES.map(c => ({ id: c.id, label: c.label }))}
        accent={accent}
        selectedId={selectedId}
        onSelect={id => {
          setSelectedId(id);
          // Tiny delay so the highlight registers before the view changes.
          setTimeout(() => onPick(id), 120);
        }}
      />
      <div style={{ marginTop: 18, color: '#7D7D7D', fontSize: 12 }}>
        <span style={{ color: accent }}>{'>'}</span> pick 1 or 2
        <Cursor />
      </div>
    </div>
  );
}

type BeatViewProps = {
  beat: ConversationBeat;
  beatIdx: number;
  beatTotal: number;
  npcName: string;
  accent: string;
  picked: ConversationChoice | null;
  onPick: (choice: ConversationChoice | null) => void;
  selections: Record<string, string>;
  onSelectionsChange: (s: Record<string, string>) => void;
  blankSubmitted: boolean;
  onSubmitBlank: () => void;
  subText: (s: string) => string;
  advance: () => void;
};

function BeatView({
  beat,
  beatIdx,
  beatTotal,
  npcName,
  accent,
  picked,
  onPick,
  selections,
  onSelectionsChange,
  blankSubmitted,
  onSubmitBlank,
  subText,
  advance,
}: BeatViewProps) {
  return (
    <div>
      <div style={{ color: accent, fontSize: 11, letterSpacing: '0.12em', marginBottom: 10 }}>
        {npcName.toUpperCase()}
      </div>

      {beat.kind === 'say' && (
        <SayBeat
          text={subText(beat.text)}
          beatIdx={beatIdx}
          beatTotal={beatTotal}
          accent={accent}
        />
      )}

      {beat.kind === 'choice' && (
        <ChoiceBeat
          beat={beat}
          accent={accent}
          picked={picked}
          onPick={onPick}
          subText={subText}
        />
      )}

      {beat.kind === 'blank' && (
        <BlankBeat
          beat={beat}
          accent={accent}
          selections={selections}
          onSelectionsChange={onSelectionsChange}
          blankSubmitted={blankSubmitted}
          onSubmitBlank={onSubmitBlank}
          subText={subText}
          advance={advance}
        />
      )}
    </div>
  );
}

function SayBeat({
  text,
  beatIdx,
  beatTotal,
  accent,
}: {
  text: string;
  beatIdx: number;
  beatTotal: number;
  accent: string;
}) {
  return (
    <div>
      <div style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 14, whiteSpace: 'pre-wrap' }}>
        {text}
      </div>
      <div style={{ color: '#7D7D7D', fontSize: 12 }}>
        <span style={{ color: accent }}>{'>'}</span>{' '}
        <span style={{ color: '#E8E8E8' }}>SPACE</span> to continue · {beatIdx + 1}/{beatTotal}
        <Cursor />
      </div>
    </div>
  );
}

function ChoiceBeat({
  beat,
  accent,
  picked,
  onPick,
  subText,
}: {
  beat: Extract<ConversationBeat, { kind: 'choice' }>;
  accent: string;
  picked: ConversationChoice | null;
  onPick: (c: ConversationChoice | null) => void;
  subText: (s: string) => string;
}) {
  const correctOption = beat.options.find(o => o.correct);
  return (
    <div>
      <div style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 14, whiteSpace: 'pre-wrap' }}>
        {subText(beat.prompt)}
      </div>
      <ChoicePicker
        choices={beat.options.map(o => ({ id: o.id, label: o.label }))}
        accent={accent}
        selectedId={picked?.id ?? null}
        result={picked ? (picked.correct ? 'pass' : 'fail') : null}
        onSelect={id => {
          const opt = beat.options.find(o => o.id === id);
          if (opt) onPick(opt);
        }}
        enableNumberKeys={!picked}
      />
      {picked && (
        <div
          style={{
            marginTop: 18,
            padding: '12px 14px',
            background: picked.correct ? '#0F1A12' : '#1A0F0F',
            border: `1px solid ${picked.correct ? 'rgba(63,185,80,0.25)' : 'rgba(248,81,73,0.25)'}`,
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          {subText(picked.reaction)}
          {!picked.correct && correctOption && (
            <div style={{
              marginTop: 10,
              paddingTop: 10,
              borderTop: '1px dashed rgba(248,81,73,0.25)',
              color: '#E8E8E8',
              fontSize: 13,
            }}>
              <span style={{ color: '#3FB950', fontWeight: 700 }}>correct answer: </span>
              {correctOption.label}
            </div>
          )}
        </div>
      )}
      <div style={{ marginTop: 14, color: '#7D7D7D', fontSize: 12 }}>
        {picked ? (
          <>
            <span style={{ color: accent }}>{'>'}</span>{' '}
            <span style={{ color: '#E8E8E8' }}>SPACE</span> to continue
            <Cursor />
          </>
        ) : (
          <>
            <span style={{ color: accent }}>{'>'}</span> pick 1–{beat.options.length}
            <Cursor />
          </>
        )}
      </div>
    </div>
  );
}

function BlankBeat({
  beat,
  accent,
  selections,
  onSelectionsChange,
  blankSubmitted,
  onSubmitBlank,
  subText,
}: {
  beat: Extract<ConversationBeat, { kind: 'blank' }>;
  accent: string;
  selections: Record<string, string>;
  onSelectionsChange: (s: Record<string, string>) => void;
  blankSubmitted: boolean;
  onSubmitBlank: () => void;
  subText: (s: string) => string;
  advance: () => void;
}) {
  const allFilled = isAllFilled(beat.blanks, selections);

  return (
    <div>
      <div style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 14, whiteSpace: 'pre-wrap' }}>
        {subText(beat.prompt)}
      </div>

      {!blankSubmitted && (
        <>
          <BlankFiller
            template={beat.template}
            blanks={beat.blanks}
            selections={selections}
            onChange={onSelectionsChange}
            accent={accent}
          />
          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={onSubmitBlank}
              disabled={!allFilled}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                padding: '6px 16px',
                background: allFilled ? accent : '#1A1A1A',
                color: allFilled ? '#0F0F0F' : '#3A3A3A',
                border: `1px solid ${allFilled ? accent : '#3A3A3A'}`,
                cursor: allFilled ? 'pointer' : 'not-allowed',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              [SUBMIT]
            </button>
          </div>
        </>
      )}

      {blankSubmitted && (
        <div
          style={{
            marginTop: 6,
            padding: '12px 14px',
            background: '#0F1A12',
            border: '1px solid rgba(63,185,80,0.25)',
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          {subText(beat.followup)}
        </div>
      )}

      <div style={{ marginTop: 14, color: '#7D7D7D', fontSize: 12 }}>
        {blankSubmitted ? (
          <>
            <span style={{ color: accent }}>{'>'}</span>{' '}
            <span style={{ color: '#E8E8E8' }}>SPACE</span> to continue
            <Cursor />
          </>
        ) : allFilled ? (
          <>
            <span style={{ color: accent }}>{'>'}</span>{' '}
            <span style={{ color: '#E8E8E8' }}>SPACE</span> or click [SUBMIT]
            <Cursor />
          </>
        ) : (
          <>
            <span style={{ color: accent }}>{'>'}</span> click a chip for each blank
            <Cursor />
          </>
        )}
      </div>
    </div>
  );
}
