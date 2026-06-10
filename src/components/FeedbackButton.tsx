import { useCallback, useEffect, useState } from 'react';
import { useGame } from '../engine/GameContext';
import { recordFeedback } from '../lib/tracking';
import { Cursor } from './TerminalFrame';

/**
 * Where the feedback widget was opened from. Stored on the Firestore doc so we
 * can slice responses by surface (mid-run pause vs. either end screen).
 */
export type FeedbackSource = 'pause' | 'quest-end' | 'twic-end';

/**
 * A single themed button that opens a self-contained feedback overlay
 * (1–5 rating + free-text comment) and writes one doc to the `feedback`
 * collection. Reused by the pause menu and both end screens — the only props
 * are visual (accent) and provenance (source/label). All run context (track,
 * handle, runId, current level) is read from game state here so callers stay
 * one-liners.
 */
export function FeedbackButton({
  accent,
  source,
  label = '✎ LEAVE FEEDBACK',
}: {
  accent: string;
  source: FeedbackSource;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.12em',
          padding: '9px 20px',
          background: 'transparent',
          color: accent,
          border: `1px solid ${accent}`,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          transition: 'background 120ms ease, color 120ms ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = accent;
          e.currentTarget.style.color = '#0A0A0A';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = accent;
        }}
      >
        {label}
      </button>
      {open && (
        <FeedbackModal accent={accent} source={source} onClose={() => setOpen(false)} />
      )}
    </>
  );
}

type SubmitState = 'idle' | 'submitting' | 'done' | 'error';

function FeedbackModal({
  accent,
  source,
  onClose,
}: {
  accent: string;
  source: FeedbackSource;
  onClose: () => void;
}) {
  const state = useGame();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<SubmitState>('idle');

  // Esc closes the overlay. Capture-phase + stopPropagation so it doesn't also
  // reach the game's global key handlers (which would, e.g., resume from pause
  // underneath us). Disabled mid-submit so a stray Esc can't orphan the write.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && status !== 'submitting') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose, status]);

  const submit = useCallback(async () => {
    if (rating < 1 || status === 'submitting') return;
    setStatus('submitting');
    const ok = await recordFeedback({
      rating,
      comment,
      source,
      track: state.currentTrack,
      handle: state.player.name || null,
      runId: state.runId,
      level: source === 'pause' ? state.currentLevel : null,
    });
    setStatus(ok ? 'done' : 'error');
  }, [rating, comment, source, status, state]);

  const display = hover || rating;

  return (
    <div
      // Fixed + inset:0 covers the whole (transform-scaled) game canvas, sitting
      // above the pause menu / end screens. Backdrop click closes; stopPropagation
      // keeps the click from bubbling to a pause-menu backdrop beneath it.
      onClick={e => {
        e.stopPropagation();
        if (status !== 'submitting') onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.82)',
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#141414',
          border: `1px solid ${accent}`,
          padding: '22px 26px',
          width: 460,
          maxWidth: '92vw',
          color: '#E8E8E8',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <span style={{ color: accent, fontSize: 12, letterSpacing: '0.16em', fontWeight: 700 }}>
            LEAVE FEEDBACK
          </span>
          <span style={{ color: '#3A3A3A', fontSize: 10, letterSpacing: '0.12em' }}>
            INTERNAL TEST
          </span>
        </div>

        {status === 'done' ? (
          <div style={{ padding: '14px 0 6px' }}>
            <div style={{ fontSize: 15, marginBottom: 8 }}>
              <span style={{ color: accent }}>{'>'}</span> thanks — logged it.
            </div>
            <div style={{ color: '#7D7D7D', fontSize: 12, lineHeight: 1.6 }}>
              Your notes go straight to the team. You can close this and keep going.
            </div>
            <div style={{ marginTop: 18, textAlign: 'right' }}>
              <ModalButton accent={accent} onClick={onClose} label="CLOSE" />
            </div>
          </div>
        ) : (
          <>
            <div style={{ color: '#7D7D7D', fontSize: 11, letterSpacing: '0.10em', marginBottom: 8 }}>
              HOW'S IT FEELING SO FAR?
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  aria-label={`${n} out of 5`}
                  style={{
                    width: 44,
                    height: 44,
                    fontSize: 22,
                    lineHeight: 1,
                    background: 'transparent',
                    border: `1px solid ${n <= display ? accent : '#2A2A2A'}`,
                    color: n <= display ? accent : '#3A3A3A',
                    cursor: 'pointer',
                    transition: 'color 80ms ease, border-color 80ms ease',
                  }}
                >
                  {n <= display ? '★' : '☆'}
                </button>
              ))}
            </div>

            <div style={{ color: '#7D7D7D', fontSize: 11, letterSpacing: '0.10em', marginBottom: 8 }}>
              ANYTHING ELSE? (OPTIONAL)
            </div>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              // Keep keystrokes from reaching the game's global movement/pause
              // listeners while typing.
              onKeyDown={e => e.stopPropagation()}
              maxLength={2000}
              rows={4}
              placeholder="What worked, what was confusing, what you'd change…"
              autoFocus
              style={{
                width: '100%',
                background: '#0F0F0F',
                border: '1px solid #2A2A2A',
                color: '#E8E8E8',
                padding: '10px 12px',
                fontFamily: 'inherit',
                fontSize: 13,
                lineHeight: 1.5,
                resize: 'vertical',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = accent; }}
              onBlur={e => { e.currentTarget.style.borderColor = '#2A2A2A'; }}
            />

            {status === 'error' && (
              <div style={{ color: '#F85149', fontSize: 11, marginTop: 10 }}>
                Couldn't reach the server — check your connection and try again.
              </div>
            )}

            <div
              style={{
                marginTop: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ color: '#3A3A3A', fontSize: 11 }}>
                <span style={{ color: accent }}>{'>'}</span> ESC to close
                <Cursor />
              </span>
              <div style={{ display: 'flex', gap: 10 }}>
                <ModalButton accent="#3A3A3A" onClick={onClose} label="CANCEL" muted />
                <ModalButton
                  accent={accent}
                  onClick={submit}
                  label={status === 'submitting' ? 'SENDING…' : 'SUBMIT'}
                  disabled={rating < 1 || status === 'submitting'}
                  filled
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ModalButton({
  accent,
  onClick,
  label,
  disabled,
  filled,
  muted,
}: {
  accent: string;
  onClick: () => void;
  label: string;
  disabled?: boolean;
  filled?: boolean;
  muted?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.12em',
        padding: '9px 18px',
        background: filled ? (disabled ? '#3A3A3A' : accent) : 'transparent',
        color: filled ? '#0A0A0A' : muted ? '#9A9A9A' : accent,
        border: `1px solid ${filled ? (disabled ? '#3A3A3A' : accent) : muted ? '#2A2A2A' : accent}`,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {label}
    </button>
  );
}
