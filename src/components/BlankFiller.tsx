import { Fragment } from 'react';

export const BLANK_TOKEN = '____';

export type BlankFillerProps = {
  template: string;
  blanks: { id: string; suggestions: string[] }[];
  selections: Record<string, string>;
  onChange: (next: Record<string, string>) => void;
  accent: string;
};

export function BlankFiller({ template, blanks, selections, onChange, accent }: BlankFillerProps) {
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

      <div style={{ marginTop: 18 }}>
        {blanks.map((blank, i) => (
          <div key={blank.id} style={{ marginBottom: 12 }}>
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
                      onChange({
                        ...selections,
                        [blank.id]: isSelected ? '' : s,
                      })
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
    </div>
  );
}

export function isAllFilled(
  blanks: { id: string }[],
  selections: Record<string, string>,
): boolean {
  return blanks.every(b => Boolean(selections[b.id]));
}
