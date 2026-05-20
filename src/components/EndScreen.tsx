import { Cursor } from './TerminalFrame';
import { PixelSprite } from './PixelSprite';

export function EndScreen() {
  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-8"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        color: '#E8E8E8',
      }}
    >
      <PixelSprite frame="victory" scale={8} />

      <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '0.02em' }}>
        <span style={{ color: '#E8633D' }}>{'>'}</span> QUEST COMPLETE
      </div>

      <div style={{ fontSize: 16, lineHeight: 1.6, textAlign: 'center', maxWidth: 520, color: '#7D7D7D' }}>
        You walked the welcome antechamber, the claude.md archives, the slash command registry, the MCP server network, and the subagent briefing room.
        <br /><br />
        <span style={{ color: '#E8E8E8' }}>All five levels cleared.</span>
      </div>

      <pre
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: '#E8633D',
          fontSize: 13,
          lineHeight: 1.0,
          textAlign: 'center',
          margin: 0,
        }}
      >
{`    ░       ░
░ ▓▓▓▓▓▓▓▓▓▓ ░
  ▓▓▓▓▓▓▓▓▓▓
  ▓██▓▓▓▓██▓
 ▓▓▓▓██▓▓▓▓▓▓
 ▓▓▓▓▓▓▓▓▓▓▓▓
  ▓▓▓▓▓▓▓▓▓▓
  ▓▓  ▓▓  ▓▓
  ▓▓  ▓▓  ▓▓  `}
      </pre>

      <div style={{ color: '#7D7D7D', fontSize: 13, textAlign: 'center' }}>
        <span style={{ color: '#E8633D' }}>{'>'}</span> built entirely with claude code · thanks for playing
        <Cursor />
      </div>
    </div>
  );
}
