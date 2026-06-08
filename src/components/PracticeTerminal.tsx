import { useState, useEffect, useCallback, useMemo } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { CONTENT } from '../content';
import { Cursor } from './TerminalFrame';
import { BlankFiller, isAllFilled } from './BlankFiller';
import { RetroChassis } from './RetroChassis';
import type { PracticeBlank } from '../content/types';

const HIT_GREEN = '#3FB950';
const MISS_RED = '#F85149';

/**
 * Grade selections against the practice's graded blanks.
 * Only blanks with `correctIndex` defined are graded; ungraded blanks just
 * need to be filled.
 */
function gradePractice(
  blanks: PracticeBlank[],
  selections: Record<string, string>,
): {
  correctness: Record<string, boolean>;
  hasGraded: boolean;
  allGradedCorrect: boolean;
} {
  const correctness: Record<string, boolean> = {};
  let hasGraded = false;
  let allGradedCorrect = true;
  for (const b of blanks) {
    if (typeof b.correctIndex !== 'number') continue;
    hasGraded = true;
    const expected = b.suggestions[b.correctIndex];
    const picked = selections[b.id];
    const ok = picked !== undefined && picked === expected;
    correctness[b.id] = ok;
    if (!ok) allGradedCorrect = false;
  }
  return { correctness, hasGraded, allGradedCorrect };
}

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
  // Sticky set of graded-blank ids the player has ever answered correctly in
  // this session. Lets a previously-correct ✓ persist across TRY AGAIN so the
  // player isn't asked to re-pick something they already nailed.
  const [lockedCorrectIds, setLockedCorrectIds] = useState<Set<string>>(new Set());
  // The pending MISS state: non-null between an incorrect submit and the next
  // user action (TRY AGAIN, or re-picking a wrong blank). Drives the MISS!
  // banner and the inline red ✗ on wrong blanks.
  const [pendingMiss, setPendingMiss] = useState<{
    wrongIds: Set<string>;
  } | null>(null);

  const allFilled = practice ? isAllFilled(practice.blanks, selections) : false;

  // Per-blank correctness passed to BlankFiller:
  //   true  → green ✓, chip row locked
  //   false → red ✗ (only while the player hasn't re-picked yet)
  //   absent → no per-blank UI
  const effectiveCorrectness = useMemo(() => {
    const map: Record<string, boolean> = {};
    for (const id of lockedCorrectIds) map[id] = true;
    if (pendingMiss) {
      for (const id of pendingMiss.wrongIds) {
        // Only show ✗ while the wrong selection is still the user's choice.
        // If they've already cleared / re-picked, drop the ✗ — no stale red.
        if (selections[id]) map[id] = false;
      }
    }
    return Object.keys(map).length ? map : undefined;
  }, [lockedCorrectIds, pendingMiss, selections]);

  const handleSubmit = useCallback(() => {
    if (!practice || !allFilled) return;
    const { correctness, hasGraded, allGradedCorrect } = gradePractice(
      practice.blanks,
      selections,
    );

    if (!hasGraded) {
      // Legacy ungraded practice — preserve existing behavior.
      dispatch({ type: 'UNLOCK_PRIZE', prizeId: practice.prize.id });
      setSubmitted(true);
      return;
    }

    // Update sticky correct set first so HIT! also reflects newly-correct picks.
    setLockedCorrectIds(prev => {
      const next = new Set(prev);
      for (const [id, ok] of Object.entries(correctness)) {
        if (ok) next.add(id);
      }
      return next;
    });

    if (allGradedCorrect) {
      dispatch({ type: 'UNLOCK_PRIZE', prizeId: practice.prize.id });
      setSubmitted(true);
      setPendingMiss(null);
    } else {
      const wrongIds = new Set<string>();
      for (const [id, ok] of Object.entries(correctness)) {
        if (!ok) wrongIds.add(id);
      }
      setPendingMiss({ wrongIds });
    }
  }, [practice, allFilled, selections, dispatch]);

  const handleTryAgain = useCallback(() => {
    if (!practice || !pendingMiss) return;
    // Clear the selections that were graded wrong; keep correct picks intact.
    const next = { ...selections };
    for (const id of pendingMiss.wrongIds) {
      delete next[id];
    }
    setSelections(next);
    setPendingMiss(null);
  }, [practice, pendingMiss, selections]);

  const closePanel = useCallback(() => {
    dispatch({ type: 'CLOSE_PANEL' });
  }, [dispatch]);

  // When the player edits a blank that's currently flagged ✗, drop the ✗ flag
  // for that blank so the UI doesn't look frozen. We do NOT clear the whole
  // pendingMiss here — the MISS! banner stays until the player either hits
  // TRY AGAIN or has re-picked every wrong blank (computed via showMiss below).
  const handleSelectionsChange = useCallback(
    (next: Record<string, string>) => {
      setSelections(next);
    },
    [],
  );

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

  // MISS banner persists while there's at least one wrong blank still showing
  // its wrong pick. Once all wrong blanks are re-filled with anything new,
  // the banner clears and the player can SUBMIT again.
  const showMiss =
    !!pendingMiss &&
    practice.blanks.some(
      b => pendingMiss.wrongIds.has(b.id) && selections[b.id],
    );

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
            <>
              <BlankFiller
                template={practice.template}
                blanks={practice.blanks}
                selections={selections}
                onChange={handleSelectionsChange}
                accent={accent}
                correctness={effectiveCorrectness}
              />

              {showMiss && (
                <div
                  style={{
                    marginTop: 16,
                    padding: '14px 16px',
                    background: '#1A0F0F',
                    border: `1px solid rgba(248,81,73,0.3)`,
                    fontSize: 14,
                    lineHeight: 1.5,
                  }}
                >
                  <div style={{ color: MISS_RED, fontWeight: 700, marginBottom: 6, letterSpacing: '0.06em' }}>
                    ✗ MISS!
                  </div>
                  <div style={{ color: '#E8E8E8', fontSize: 13 }}>
                    Re-pick the chips marked <span style={{ color: MISS_RED, fontWeight: 700 }}>✗</span>.
                    Your correct picks (<span style={{ color: HIT_GREEN, fontWeight: 700 }}>✓</span>) are locked in.
                  </div>
                </div>
              )}
            </>
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
              {submitted && lockedCorrectIds.size > 0 && (
                <div style={{ color: HIT_GREEN, fontWeight: 700, marginBottom: 8, letterSpacing: '0.06em' }}>
                  ✓ HIT!
                </div>
              )}
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
          ) : showMiss ? (
            <>
              <span>
                <span style={{ color: MISS_RED }}>{'>'}</span> fix the{' '}
                <span style={{ color: MISS_RED, fontWeight: 700 }}>✗</span> blanks
                <Cursor color={MISS_RED} />
              </span>
              <button
                onClick={handleTryAgain}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  padding: '4px 14px',
                  background: '#0F0F0F',
                  color: MISS_RED,
                  border: `1px solid ${MISS_RED}`,
                  cursor: 'pointer',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                }}
              >
                [TRY AGAIN]
              </button>
            </>
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
