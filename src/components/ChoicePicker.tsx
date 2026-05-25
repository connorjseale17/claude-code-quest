import { useEffect, useState } from 'react';

export type ChoicePickerProps = {
  choices: { id: string; label: string }[];
  accent: string;
  selectedId: string | null;
  /** Once selected, this drives the pass/fail coloring on the picked row. */
  result?: 'pass' | 'fail' | null;
  onSelect: (id: string) => void;
  /** Listen for number-key shortcuts (1..N). Defaults to true. */
  enableNumberKeys?: boolean;
};

const COLOR_DIM = '#7D7D7D';
const COLOR_DISABLED = '#3A3A3A';
const COLOR_PASS = '#3FB950';
const COLOR_FAIL = '#F85149';

export function ChoicePicker({
  choices,
  accent,
  selectedId,
  result,
  onSelect,
  enableNumberKeys = true,
}: ChoicePickerProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number>(-1);

  useEffect(() => {
    if (!enableNumberKeys) return;
    const handler = (e: KeyboardEvent) => {
      if (selectedId) return;
      const num = parseInt(e.key);
      if (num >= 1 && num <= choices.length) {
        onSelect(choices[num - 1].id);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [choices, selectedId, onSelect, enableNumberKeys]);

  return (
    <div style={{ fontSize: 15, lineHeight: 2.0 }}>
      {choices.map((choice, i) => {
        let color = COLOR_DIM;
        let marker = ' ';
        let tail = '';

        if (selectedId === choice.id && result === 'pass') {
          color = COLOR_PASS;
          marker = '>';
          tail = ' ✓';
        } else if (selectedId === choice.id && result === 'fail') {
          color = COLOR_FAIL;
          marker = '>';
          tail = ' ✗';
        } else if (selectedId === choice.id) {
          color = accent;
          marker = '>';
        } else if (hoveredIdx === i && !selectedId) {
          color = accent;
          marker = '>';
        } else if (selectedId && selectedId !== choice.id) {
          color = COLOR_DISABLED;
        }

        return (
          <div
            key={choice.id}
            className="flex gap-3 cursor-pointer"
            style={{ color }}
            onClick={() => !selectedId && onSelect(choice.id)}
            onMouseEnter={() => !selectedId && setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(-1)}
          >
            <span style={{ width: 14, color }}>{marker}</span>
            <span style={{ width: 22 }}>{i + 1}.</span>
            <span className="flex-1">
              {choice.label}
              {tail}
            </span>
          </div>
        );
      })}
    </div>
  );
}
