import { useState, useEffect, useMemo, useRef } from 'react';
import { useGameDispatch } from '../engine/GameContext';
import { TerminalFrame, Cursor } from './TerminalFrame';

/** macOS-terminal-style "Last login" timestamp from the current Date. */
function formatLoginStamp(d: Date): string {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const pad = (n: number) => String(n).padStart(2, '0');
  // macOS pads day with a leading SPACE (not zero) for single-digit days
  const day = d.getDate() < 10 ? ` ${d.getDate()}` : String(d.getDate());
  return `${weekdays[d.getDay()]} ${months[d.getMonth()]} ${day} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

const CREDITS: { role: string; name: string }[] = [
  { role: 'App Development Lead',    name: 'Connor Seale' },
  { role: 'Curriculum Development',  name: 'Gustavo Tepoz' },
  { role: 'Learning & Engagement',   name: 'Christopher Arana' },
];

const LOAD_LINES: { text: string; color: string; delay: number; art?: boolean }[] = [
  { text: '$ npm install claude-code-quest@latest', color: '#E8E8E8', delay: 0 },
  { text: '', color: '#7D7D7D', delay: 100 },
  { text: 'resolving dependencies...', color: '#7D7D7D', delay: 200 },
  { text: '  + @claude/sprite-engine@3.2.1', color: '#3FB950', delay: 80 },
  { text: '  + @claude/room-loader@1.0.4', color: '#3FB950', delay: 60 },
  { text: '  + @claude/challenge-runtime@2.1.0', color: '#3FB950', delay: 80 },
  { text: '  + @claude/pixel-renderer@4.0.2', color: '#3FB950', delay: 60 },
  { text: '  + @claude/collision-engine@1.3.1', color: '#3FB950', delay: 70 },
  { text: '  + @claude/input-handler@2.0.0', color: '#3FB950', delay: 50 },
  { text: '  + @claude/lore-parser@1.1.0', color: '#3FB950', delay: 60 },
  { text: '  + @claude/door-system@1.0.3', color: '#3FB950', delay: 70 },
  { text: '  + @claude/key-manager@1.2.0', color: '#3FB950', delay: 50 },
  { text: '  + @claude/bot-ai@0.9.7', color: '#3FB950', delay: 80 },
  { text: '', color: '#7D7D7D', delay: 100 },
  { text: 'added 147 packages in 2.3s', color: '#7D7D7D', delay: 200 },
  { text: '', color: '#7D7D7D', delay: 100 },
  { text: '$ claude-code-quest init', color: '#E8E8E8', delay: 300 },
  { text: '', color: '#7D7D7D', delay: 100 },
  { text: '[boot] loading sprite engine.............. ✓', color: '#7D7D7D', delay: 150 },
  { text: '[boot] compiling pixel shaders............ ✓', color: '#7D7D7D', delay: 120 },
  { text: '[boot] initializing rooms [14/14]......... ✓', color: '#7D7D7D', delay: 180 },
  { text: '[boot] loading challenge prompts.......... ✓', color: '#7D7D7D', delay: 130 },
  { text: '[boot] mounting collision grid............ ✓', color: '#7D7D7D', delay: 100 },
  { text: '[boot] spawning bot entity................ ✓', color: '#7D7D7D', delay: 140 },
  { text: '[boot] binding input handlers............. ✓', color: '#7D7D7D', delay: 90 },
  { text: '[boot] linking door ↔ key systems......... ✓', color: '#7D7D7D', delay: 110 },
  { text: '[boot] indexing lore fragments............ ✓', color: '#7D7D7D', delay: 120 },
  { text: '', color: '#7D7D7D', delay: 100 },
  { text: '  ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗', color: '#E8633D', delay: 40, art: true },
  { text: ' ██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝', color: '#E8633D', delay: 40, art: true },
  { text: ' ██║     ██║     ███████║██║   ██║██║  ██║█████╗  ', color: '#E8633D', delay: 40, art: true },
  { text: ' ██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝  ', color: '#E8633D', delay: 40, art: true },
  { text: ' ╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗', color: '#E8633D', delay: 40, art: true },
  { text: '  ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝', color: '#E8633D', delay: 40, art: true },
  { text: '  ██████╗ ██████╗ ██████╗ ███████╗', color: '#E8633D', delay: 40, art: true },
  { text: ' ██╔════╝██╔═══██╗██╔══██╗██╔════╝', color: '#E8633D', delay: 40, art: true },
  { text: ' ██║     ██║   ██║██║  ██║█████╗  ', color: '#E8633D', delay: 40, art: true },
  { text: ' ██║     ██║   ██║██║  ██║██╔══╝  ', color: '#E8633D', delay: 40, art: true },
  { text: ' ╚██████╗╚██████╔╝██████╔╝███████╗', color: '#E8633D', delay: 40, art: true },
  { text: '  ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝', color: '#E8633D', delay: 40, art: true },
  { text: '  ██████╗ ██╗   ██╗███████╗███████╗████████╗', color: '#E8633D', delay: 40, art: true },
  { text: ' ██╔═══██╗██║   ██║██╔════╝██╔════╝╚══██╔══╝', color: '#E8633D', delay: 40, art: true },
  { text: ' ██║   ██║██║   ██║█████╗  ███████╗   ██║   ', color: '#E8633D', delay: 40, art: true },
  { text: ' ██║▄▄ ██║██║   ██║██╔══╝  ╚════██║   ██║   ', color: '#E8633D', delay: 40, art: true },
  { text: ' ╚██████╔╝╚██████╔╝███████╗███████║   ██║   ', color: '#E8633D', delay: 40, art: true },
  { text: '  ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝   ╚═╝   ', color: '#E8633D', delay: 40, art: true },
  { text: '', color: '#7D7D7D', delay: 80 },
  { text: ' v1.0 · built entirely with claude code', color: '#7D7D7D', delay: 100 },
  { text: '', color: '#7D7D7D', delay: 200 },
  { text: '  ✓ all systems operational', color: '#3FB950', delay: 300 },
];

export function BootScreen() {
  const dispatch = useGameDispatch();
  const [phase, setPhase] = useState<'prompt' | 'loading' | 'ready'>('prompt');
  const [typed, setTyped] = useState('');
  const autoTypeRef = useRef(true);
  const [loadedLines, setLoadedLines] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Compute the login stamp ONCE on mount so it doesn't tick over while the
  // player is reading the screen — feels like a real "Last login" line, not
  // a live clock.
  const lastLogin = useMemo(() => formatLoginStamp(new Date()), []);

  useEffect(() => {
    const target = 'initialize';
    let charIdx = 0;
    const id = setInterval(() => {
      if (!autoTypeRef.current) {
        clearInterval(id);
        return;
      }
      charIdx++;
      if (charIdx > target.length) {
        clearInterval(id);
      } else {
        setTyped(target.slice(0, charIdx));
      }
    }, 70);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (phase !== 'loading') return;

    let idx = 0;
    let timeout: number;

    const showNext = () => {
      if (idx >= LOAD_LINES.length) {
        setTimeout(() => setPhase('ready'), 400);
        return;
      }
      const line = LOAD_LINES[idx];
      idx++;
      setLoadedLines(idx);
      timeout = window.setTimeout(showNext, line.delay);
    };

    timeout = window.setTimeout(showNext, 200);
    return () => clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [loadedLines, phase]);

  useEffect(() => {
    const advance = () => {
      if (phase === 'ready') {
        dispatch({ type: 'ADVANCE_PHASE' });
      } else if (phase === 'prompt') {
        // Any input from here proceeds — dummy-proofed
        autoTypeRef.current = false;
        setTyped('initialize');
        setPhase('loading');
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      // Ignore modifier keys alone (so cmd+r reloads, etc.)
      if (e.key === 'Meta' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Shift') return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      e.preventDefault();
      advance();
    };

    const handleClick = (e: MouseEvent) => {
      // Don't interfere with native window controls
      if ((e.target as HTMLElement)?.closest?.('button')) return;
      advance();
    };

    window.addEventListener('keydown', handleKey);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('click', handleClick);
    };
  }, [phase, dispatch]);

  return (
    <TerminalFrame title="claude-code-quest --v1.0">
      <div
        ref={scrollRef}
        className="flex flex-col justify-end h-full"
        style={{
          padding: 32,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          lineHeight: 1.6,
          color: '#E8E8E8',
          overflowY: 'auto',
        }}
      >
        {phase === 'prompt' && (
          <div>
            {/* Credits block — styled like a terminal MOTD shown above the
                login stamp. Subtle, muted, accent on the names. */}
            <div style={{ fontSize: 11, lineHeight: 1.7, marginBottom: 18 }}>
              <div style={{ color: '#3A3A3A', letterSpacing: '0.04em', marginBottom: 6 }}>
                ── claude-code-quest · built by ──────────────────────
              </div>
              {CREDITS.map(c => (
                <div key={c.name} style={{ display: 'flex', gap: 12 }}>
                  <span style={{ color: '#7D7D7D', minWidth: 220, display: 'inline-block' }}>
                    {c.role}
                  </span>
                  <span style={{ color: '#E8633D' }}>{c.name}</span>
                </div>
              ))}
              <div style={{ color: '#3A3A3A', letterSpacing: '0.04em', marginTop: 6 }}>
                ──────────────────────────────────────────────────────
              </div>
            </div>
            <div style={{ color: '#7D7D7D', fontSize: 12, marginBottom: 4 }}>
              Last login: {lastLogin} on ttys001
            </div>
            <div style={{ marginTop: 16 }}>
              <span style={{ color: '#7D7D7D' }}>~/claude-code-quest $ </span>
              <span style={{ color: '#E8633D' }}>{typed}</span>
              <Cursor />
            </div>
            <div style={{ color: '#3A3A3A', fontSize: 11, marginTop: 24 }}>
              press <span style={{ color: '#E8633D' }}>any key</span> to begin
            </div>
          </div>
        )}

        {(phase === 'loading' || phase === 'ready') && (
          <>
            {LOAD_LINES.slice(0, loadedLines).map((line, i) => (
              <div
                key={i}
                style={{
                  color: line.color,
                  minHeight: line.text === '' ? 8 : undefined,
                  whiteSpace: 'pre',
                  ...(line.art && { fontSize: 9, lineHeight: 1.1 }),
                }}
              >
                {line.text}
              </div>
            ))}
          </>
        )}

        {phase === 'ready' && (
          <div style={{ marginTop: 16 }}>
            <span style={{ color: '#7D7D7D' }}>~/claude-code-quest $ </span>
            <span style={{ color: '#E8E8E8' }}>press </span>
            <span style={{ color: '#E8633D' }}>any key</span>
            <span style={{ color: '#E8E8E8' }}> to launch</span>
            <Cursor />
          </div>
        )}
      </div>
    </TerminalFrame>
  );
}
