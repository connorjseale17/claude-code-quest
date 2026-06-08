import { Fragment } from 'react';

export const BLANK_TOKEN = '____';

export type BlankFillerBlank = {
  id: string;
  suggestions: string[];
  correctIndex?: number;
};

export type BlankFillerProps = {
  template: string;
  blanks: BlankFillerBlank[];
  selections: Record<string, string>;
  onChange: (next: Record<string, string>) => void;
  accent: string;
  /**
   * Optional per-blank correctness map keyed by blank.id.
   * - `true`  → render green ✓ next to the blank's chip row (graded, correct).
   * - `false` → render red ✗ next to the blank's chip row (graded, incorrect).
   * - missing/undefined → no per-blank feedback (ungraded blank, or pre-submit).
   * When a blank's correctness is `true`, its chips become non-interactive
   * (the player has locked it in). Incorrect-graded blanks stay clickable so
   * the player can re-pick on TRY AGAIN without losing their right answers.
   */
  correctness?: Record<string, boolean | undefined>;
};

const HIT_GREEN = '#3FB950';
const MISS_RED = '#F85149';

export function BlankFiller({
  template,
  blanks,
  selections,
  onChange,
  accent,
  correctness,
}: BlankFillerProps) {
  const segments = template.split(BLANK_TOKEN);

  return (
    <div>
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
          const blank = blanks[i];
          const verdict = blank ? correctness?.[blank.id] : undefined;
          const blankColor =
            verdict === true
              ? HIT_GREEN
              : verdict === false
              ? MISS_RED
              : selections[blank?.id ?? ''] ? accent : '#7D7D7D';
          return (
            <Fragment key={i}>
              {seg}
              {blank && (
                <span
                  style={{
                    color: blankColor,
                    fontWeight: 700,
                    background: '#0F0F0F',
                    padding: '0 6px',
                    borderBottom: `1px solid ${blankColor === '#7D7D7D' ? '#3A3A3A' : blankColor}`,
                  }}
                >
                  {selections[blank.id] ?? `____${i + 1}____`}
                </span>
              )}
            </Fragment>
          );
        })}
      </pre>

      <div style={{ marginTop: 18 }}>
        {blanks.map((blank, i) => {
          const verdict = correctness?.[blank.id];
          const locked = verdict === true;
          return (
            <div key={blank.id} style={{ marginBottom: 12 }}>
              <div
                style={{
                  color: '#7D7D7D',
                  fontSize: 12,
                  marginBottom: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span>
                  <span style={{ color: accent }}>{i + 1}.</span> {blank.id}
                </span>
                {verdict === true && (
                  <span style={{ color: HIT_GREEN, fontWeight: 700 }} aria-label="correct">
                    ✓
                  </span>
                )}
                {verdict === false && (
                  <span style={{ color: MISS_RED, fontWeight: 700 }} aria-label="incorrect">
                    ✗
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {blank.suggestions.map(s => {
                  const isSelected = selections[blank.id] === s;
                  const chipAccent =
                    verdict === true && isSelected
                      ? HIT_GREEN
                      : verdict === false && isSelected
                      ? MISS_RED
                      : accent;
                  return (
                    <button
                      key={s}
                      disabled={locked}
                      onClick={() => {
                        if (locked) return;
                        onChange({
                          ...selections,
                          [blank.id]: isSelected ? '' : s,
                        });
                      }}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 12,
                        padding: '4px 10px',
                        background: isSelected ? chipAccent : '#0F0F0F',
                        color: isSelected ? '#0F0F0F' : '#E8E8E8',
                        border: `1px solid ${isSelected ? chipAccent : '#3A3A3A'}`,
                        cursor: locked ? 'default' : 'pointer',
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                        opacity: locked && !isSelected ? 0.5 : 1,
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function isAllFilled(
  blanks: { id: string }[],
  selections: Record<string, string>,
): boolean {
  return blanks.every(b => Boolean(selections[b.id]));
}
