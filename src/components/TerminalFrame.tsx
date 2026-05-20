interface TerminalFrameProps {
  title?: string;
  accent?: boolean;
  children: React.ReactNode;
}

export function TerminalFrame({ title = 'claude-code-quest --v1.0', accent = false, children }: TerminalFrameProps) {
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
        <div className="flex gap-1.5">
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
        <div style={{ fontSize: 12, color: '#3A3A3A' }}>━ ▢ ✕</div>
      </div>
      <div className="flex-1 overflow-hidden relative">
        {children}
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
