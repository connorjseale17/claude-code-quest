import { useState, useEffect } from 'react';

type DPadKey = 'up' | 'down' | 'left' | 'right' | 'action';

const KEY_TO_DPAD: Record<string, DPadKey> = {
  ArrowUp: 'up', w: 'up', W: 'up',
  ArrowDown: 'down', s: 'down', S: 'down',
  ArrowLeft: 'left', a: 'left', A: 'left',
  ArrowRight: 'right', d: 'right', D: 'right',
  ' ': 'action', Enter: 'action', e: 'action', E: 'action',
};

const SIZE = 28;
const GAP = 2;

function DKey({ label, active }: { label: string; active: boolean }) {
  return (
    <div
      style={{
        width: SIZE,
        height: SIZE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: active ? '#E8633D' : '#1A1A1A',
        border: '1px solid #2A2A2A',
        color: active ? '#1A1A1A' : '#3A3A3A',
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 700,
        transition: 'background 50ms, color 50ms',
      }}
    >
      {label}
    </div>
  );
}

export function DPad() {
  const [pressed, setPressed] = useState<Set<DPadKey>>(new Set());

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const dk = KEY_TO_DPAD[e.key];
      if (dk) setPressed(p => { const n = new Set(p); n.add(dk); return n; });
    };
    const onUp = (e: KeyboardEvent) => {
      const dk = KEY_TO_DPAD[e.key];
      if (dk) setPressed(p => { const n = new Set(p); n.delete(dk); return n; });
    };
    const onBlur = () => setPressed(new Set());

    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  const anyActive = pressed.size > 0;

  return (
    <div
      className="cc-desktop-dpad"
      style={{
        position: 'absolute',
        bottom: 56,
        left: 52,
        opacity: anyActive ? 0.7 : 0.35,
        transition: 'opacity 100ms',
        zIndex: 10,
        display: 'flex',
        gap: 8,
        alignItems: 'end',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `${SIZE}px ${SIZE}px ${SIZE}px`,
          gap: GAP,
        }}
      >
        <div />
        <DKey label="↑" active={pressed.has('up')} />
        <div />
        <DKey label="←" active={pressed.has('left')} />
        <div />
        <DKey label="→" active={pressed.has('right')} />
        <div />
        <DKey label="↓" active={pressed.has('down')} />
        <div />
      </div>
      <DKey label="·" active={pressed.has('action')} />
    </div>
  );
}
