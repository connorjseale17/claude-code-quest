// Terminal chrome shell + foundation artboards (colors, type, sprite sheet).

// ---------- TERMINAL FRAME ----------
function TerminalFrame({ title = 'claude-code-quest --v1.0', children, style, accent = false }) {
  return (
    <div
      style={{
        background: '#1A1A1A',
        border: `1px solid ${accent ? '#E8633D' : '#2A2A2A'}`,
        color: '#E8E8E8',
        fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace",
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Window header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 16px',
          borderBottom: '1px solid #2A2A2A',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          {['#F85149', '#E8B341', '#3FB950'].map(c => (
            <div
              key={c}
              style={{
                width: 10, height: 10, background: c,
                imageRendering: 'pixelated',
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: 12, color: '#7D7D7D', letterSpacing: '0.04em', flex: 1, textAlign: 'center' }}>
          {title}
        </div>
        <div style={{ fontSize: 12, color: '#3A3A3A' }}>━ ▢ ✕</div>
      </div>
      {/* Body */}
      <div style={{ flex: 1, padding: 32, overflow: 'hidden', position: 'relative' }}>{children}</div>
    </div>
  );
}

// Blinking cursor — used inline.
function Cursor({ char = '▮', color = '#E8633D' }) {
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

// ---------- FOUNDATIONS ----------

function ColorsArtboard() {
  const tokens = [
    { name: '--accent', hex: '#E8633D', use: 'Bot orange. Brand accent. Borders, fills, primary highlights.', group: 'primary' },
    { name: '--bg', hex: '#1A1A1A', use: 'Terminal background. Slightly warm near-black.', group: 'primary' },
    { name: '--fg', hex: '#E8E8E8', use: 'Primary text. Off-white.', group: 'primary' },
    { name: '--pass', hex: '#3FB950', use: 'Success / pass / ready. Reserved.', group: 'function' },
    { name: '--fail', hex: '#F85149', use: 'Error / fail. Reserved.', group: 'function' },
    { name: '--muted', hex: '#7D7D7D', use: 'Hints, timestamps, system text.', group: 'neutral' },
    { name: '--dim',   hex: '#3A3A3A', use: 'Locked, disabled, frame borders.', group: 'neutral' },
    { name: '--accent-shadow', hex: '#B84A28', use: 'Bot sprite shadow detail.', group: 'sprite' },
  ];
  const Swatch = ({ t }) => (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 16, padding: '14px 0', borderBottom: '1px solid #2A2A2A' }}>
      <div style={{ width: 96, height: 56, background: t.hex, border: '1px solid #2A2A2A', flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', whiteSpace: 'nowrap' }}>
          <span style={{ color: '#E8E8E8', fontSize: 14, fontWeight: 600 }}>{t.name}</span>
          <span style={{ color: '#7D7D7D', fontSize: 13 }}>{t.hex}</span>
        </div>
        <div style={{ color: '#7D7D7D', fontSize: 12, marginTop: 6, lineHeight: 1.5 }}>{t.use}</div>
      </div>
    </div>
  );

  return (
    <TerminalFrame title="palette.css">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ color: '#7D7D7D', fontSize: 13 }}>$ cat palette.css</div>
          <div style={{ color: '#E8E8E8', fontSize: 24, fontWeight: 700, marginTop: 8 }}>
            <span style={{ color: '#E8633D' }}>{'>'}</span> COLOR TOKENS
          </div>
          <div style={{ color: '#7D7D7D', fontSize: 13, marginTop: 8 }}>
            One accent. One green for pass. One red for fail. Everything else is gray.
          </div>
        </div>
        <div style={{ overflow: 'auto', flex: 1 }}>
          {tokens.map(t => <Swatch key={t.name} t={t} />)}
        </div>
      </div>
    </TerminalFrame>
  );
}

function TypographyArtboard() {
  const scale = [
    { label: 'Display', size: 32, weight: 700, sample: '> GAME COMPLETE' },
    { label: 'H1', size: 24, weight: 700, sample: '> LEVEL 3: PLAN BEFORE YOU CODE' },
    { label: 'H2', size: 18, weight: 600, sample: 'Choose your move' },
    { label: 'Body', size: 16, weight: 400, sample: 'You asked Claude to refactor a 400-line file. It went sideways. What do you do?' },
    { label: 'UI', size: 14, weight: 500, sample: '> 1. ASK FOR A PLAN FIRST' },
    { label: 'System', size: 13, weight: 400, sample: '[hint] use /clear when context drifts', muted: true },
  ];
  return (
    <TerminalFrame title="type.spec">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
        <div>
          <div style={{ color: '#7D7D7D', fontSize: 13 }}>$ fc-list | grep mono</div>
          <div style={{ color: '#E8E8E8', fontSize: 24, fontWeight: 700, marginTop: 8 }}>
            <span style={{ color: '#E8633D' }}>{'>'}</span> JETBRAINS MONO
          </div>
          <div style={{ color: '#7D7D7D', fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>
            Primary. Fallback: <span style={{ color: '#E8E8E8' }}>'SF Mono', Menlo, Consolas, monospace</span>.
            Letter-spacing +0.02em on UPPERCASE.
          </div>
        </div>
        <div style={{ borderTop: '1px solid #2A2A2A' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1, overflow: 'auto' }}>
          {scale.map(s => (
            <div key={s.label} style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
              <div style={{ width: 90, flexShrink: 0 }}>
                <div style={{ color: '#E8633D', fontSize: 11, letterSpacing: '0.08em' }}>{s.label.toUpperCase()}</div>
                <div style={{ color: '#7D7D7D', fontSize: 11, marginTop: 2 }}>{s.size}px · {s.weight}</div>
              </div>
              <div
                style={{
                  fontSize: s.size,
                  fontWeight: s.weight,
                  color: s.muted ? '#7D7D7D' : '#E8E8E8',
                  lineHeight: s.size >= 24 ? 1.2 : 1.5,
                  letterSpacing: /[A-Z]{3}/.test(s.sample) && s.sample === s.sample.toUpperCase().replace(/[^A-Z]/g,'') ? '0.02em' : 0,
                  flex: 1,
                }}
              >
                {s.sample}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: 12, color: '#7D7D7D', fontSize: 12 }}>
          line-height 1.5 body · 1.2 display · UPPERCASE for titles + CTAs · sentence-case for prose
        </div>
      </div>
    </TerminalFrame>
  );
}

// ---------- SPRITE SHEET ----------

function SpritesArtboard() {
  const Cell = ({ label, sub, children }) => (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 10, padding: 16, border: '1px solid #2A2A2A',
      background: '#141414', minHeight: 180, justifyContent: 'space-between',
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>{children}</div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#E8E8E8', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em' }}>{label}</div>
        <div style={{ color: '#7D7D7D', fontSize: 11, marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );

  return (
    <TerminalFrame title="sprite-sheet.png">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: '#7D7D7D', fontSize: 13 }}>$ ./preview sprites/</div>
          <div style={{ color: '#E8E8E8', fontSize: 24, fontWeight: 700, marginTop: 8 }}>
            <span style={{ color: '#E8633D' }}>{'>'}</span> THE BOT
          </div>
          <div style={{ color: '#7D7D7D', fontSize: 13, marginTop: 6 }}>
            14×14 grid · scaled with image-rendering: pixelated · 4–8 fps · no easing
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          flex: 1,
        }}>
          <Cell label="IDLE" sub="2 frames · breathe">
            <BotIdle scale={7} />
          </Cell>
          <Cell label="WALK" sub="4 frames · 6 fps">
            <BotWalk scale={7} />
          </Cell>
          <Cell label="HAPPY" sub="pass reaction">
            <BotHappy scale={7} />
          </Cell>
          <Cell label="SAD" sub="fail reaction">
            <BotSad scale={7} />
          </Cell>
          <Cell label="VICTORY" sub="completion pose">
            <BotVictory scale={7} />
          </Cell>
          <Cell label="THINKING" sub="plan-before-code">
            <BotThinking scale={7} />
          </Cell>
          <Cell label="CODING" sub="at-the-laptop">
            <BotCoding scale={7} />
          </Cell>
          <Cell label="CONFUSED" sub="goes-sideways">
            <BotConfused scale={7} />
          </Cell>
        </div>
      </div>
    </TerminalFrame>
  );
}

Object.assign(window, {
  TerminalFrame, Cursor,
  ColorsArtboard, TypographyArtboard, SpritesArtboard,
});
