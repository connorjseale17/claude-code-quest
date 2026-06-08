import { useEffect, useRef, useState } from 'react';

interface TerminalFrameProps {
  title?: string;
  accent?: boolean;
  children: React.ReactNode;
  /** When provided, the window-chrome dots become a dev-menu gate behind a
   *  2-second press-and-hold + a vestigial password prompt. */
  onDevToggle?: () => void;
  /** Optional content rendered where the window-control glyphs used to sit
   *  (right side of the title bar). Used for the in-game run timer. */
  rightSlot?: React.ReactNode;
}

const HOLD_MS = 2000;

export function TerminalFrame({ title = 'claude-code-quest --v1.0', accent = false, children, onDevToggle, rightSlot }: TerminalFrameProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [pw, setPw] = useState('');
  const holdRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const cancelHold = () => {
    if (holdRef.current !== null) {
      window.clearTimeout(holdRef.current);
      holdRef.current = null;
    }
  };

  const startHold = () => {
    if (!onDevToggle) return;
    cancelHold();
    holdRef.current = window.setTimeout(() => {
      holdRef.current = null;
      setShowPassword(true);
    }, HOLD_MS);
  };

  useEffect(() => () => cancelHold(), []);

  useEffect(() => {
    if (!showPassword) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(id);
  }, [showPassword]);

  const closeGate = () => {
    setShowPassword(false);
    setPw('');
  };

  const submitGate = () => {
    closeGate();
    onDevToggle?.();
  };

  return (
    <div
      className="flex flex-col h-full w-full box-border"
      style={{
        background: '#1A1A1A',
        border: `1px solid ${accent ? '#E8633D' : '#2A2A2A'}`,
        color: '#E8E8E8',
        fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace",
      }}
    >
      <div
        className="flex items-center gap-4"
        style={{ padding: '10px 16px', borderBottom: '1px solid #2A2A2A' }}
      >
        <div
          className="flex gap-1.5"
          onPointerDown={startHold}
          onPointerUp={cancelHold}
          onPointerLeave={cancelHold}
          onPointerCancel={cancelHold}
          style={{ cursor: onDevToggle ? 'default' : undefined, userSelect: 'none', touchAction: 'none' }}
        >
          {['#F85149', '#E8B341', '#3FB950'].map(c => (
            <div
              key={c}
              style={{
                width: 10,
                height: 10,
                background: c,
                imageRendering: 'pixelated',
              }}
            />
          ))}
        </div>
        <div className="flex-1 text-center" style={{ fontSize: 12, color: '#7D7D7D', letterSpacing: '0.04em' }}>
          {title}
        </div>
        <div style={{ minWidth: 60, display: 'flex', justifyContent: 'flex-end' }}>
          {rightSlot}
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative">
        {children}
        {showPassword && (
          <PasswordGate
            value={pw}
            onChange={setPw}
            onSubmit={submitGate}
            onCancel={closeGate}
            inputRef={inputRef}
          />
        )}
      </div>
    </div>
  );
}

interface PasswordGateProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

function PasswordGate({ value, onChange, onSubmit, onCancel, inputRef }: PasswordGateProps) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.78)' }}
      onClick={onCancel}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0F0F0F',
          border: '1px solid #2A2A2A',
          padding: '22px 26px',
          width: 360,
          fontFamily: "'JetBrains Mono', monospace",
          color: '#E8E8E8',
        }}
      >
        <div style={{ color: '#7D7D7D', fontSize: 11, letterSpacing: '0.14em', marginBottom: 14 }}>
          ── AUTHORIZATION REQUIRED ──
        </div>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#9A9A9A' }}>enter password</span>
          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSubmit();
              } else if (e.key === 'Escape') {
                e.preventDefault();
                onCancel();
              }
            }}
            style={{
              background: '#141414',
              border: '1px solid #2A2A2A',
              color: '#E8E8E8',
              padding: '8px 12px',
              fontFamily: 'inherit',
              fontSize: 14,
              outline: 'none',
              letterSpacing: '0.18em',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#E8633D'; }}
            onBlur={e => { e.currentTarget.style.borderColor = '#2A2A2A'; }}
          />
        </label>
        <div style={{ marginTop: 14, color: '#7D7D7D', fontSize: 11, display: 'flex', justifyContent: 'space-between' }}>
          <span>
            <span style={{ color: '#E8633D' }}>{'>'}</span>{' '}
            <span style={{ color: '#E8E8E8' }}>ENTER</span> to unlock
          </span>
          <span>
            <span style={{ color: '#E8E8E8' }}>ESC</span> to cancel
          </span>
        </div>
      </div>
    </div>
  );
}

export function Cursor({ char = '▮', color = '#E8633D' }: { char?: string; color?: string }) {
  return (
    <span
      style={{
        color,
        display: 'inline-block',
        animation: 'cc-blink 1.06s steps(2, end) infinite',
      }}
    >
      {char}
    </span>
  );
}
