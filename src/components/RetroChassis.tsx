import { useState, useEffect, useCallback, useRef } from 'react';

type Phase = 'dim' | 'arrive' | 'power' | 'boot' | 'ready';

const PHASE_DURATIONS: Record<Phase, number> = {
  dim: 150,
  arrive: 320,
  power: 480,
  boot: 480,
  ready: 0,
};

const PHOSPHOR_BG = '#0A1810';
const CASE_FILL = '#D9CBA4';
const CASE_DARK = '#6B5A40';
const CASE_SHADOW = '#3A3020';

interface RetroChassisProps {
  variant: 'mac' | 'lab';
  /** Theme accent color (top strip + LED + screen border highlight) */
  accent: string;
  /** Label printed during boot, e.g. "BOSS BATTLE" or "PRACTICE" */
  diskLabel: string;
  /** Display name shown below the chassis, e.g. "CLAUDY-MAC" */
  chassisName: string;
  /** Short text in the top strip, e.g. "level 03 · slash" */
  topbarText: string;
  /** Optional second line in the top strip (e.g. screen kind) */
  topbarSub?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function RetroChassis({
  variant,
  accent,
  diskLabel,
  chassisName,
  topbarText,
  topbarSub,
  onClose,
  children,
}: RetroChassisProps) {
  const [phase, setPhase] = useState<Phase>('dim');
  const [bootLinesShown, setBootLinesShown] = useState(0);
  const skipRef = useRef(false);

  const bootLines = [
    '[BOOT] CLAUDY-OS v0.1',
    `[ OK ] LOADING ${diskLabel}.DISK`,
    '[ OK ] READY',
  ];

  const skipToReady = useCallback(() => {
    if (skipRef.current) return;
    skipRef.current = true;
    setBootLinesShown(bootLines.length);
    setPhase('ready');
  }, [bootLines.length]);

  // Drive the phase machine
  useEffect(() => {
    if (skipRef.current) return;
    if (phase === 'ready') return;

    const next: Record<Exclude<Phase, 'ready'>, Phase> = {
      dim: 'arrive',
      arrive: 'power',
      power: 'boot',
      boot: 'ready',
    };

    const id = window.setTimeout(() => {
      setPhase(next[phase as Exclude<Phase, 'ready'>]);
    }, PHASE_DURATIONS[phase]);

    return () => clearTimeout(id);
  }, [phase]);

  // Boot lines tick during 'boot' phase
  useEffect(() => {
    if (phase !== 'boot' || skipRef.current) return;
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      if (i > bootLines.length) {
        clearInterval(id);
        return;
      }
      setBootLinesShown(i);
    }, 110);
    return () => clearInterval(id);
  }, [phase, bootLines.length]);

  // Keyboard handlers: Escape closes; Space skips boot
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        return;
      }
      if (phase !== 'ready' && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        e.stopPropagation();
        skipToReady();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, onClose, skipToReady]);

  // Variant-specific dimensions
  const isMac = variant === 'mac';
  const chassisW = isMac ? 580 : 820;
  const chassisH = isMac ? 500 : 460;

  return (
    <div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center"
      style={{
        background: phase === 'dim' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.95)',
        transition: 'background 150ms linear',
        fontFamily: "'JetBrains Mono', monospace",
      }}
      onClick={() => {
        if (phase !== 'ready') skipToReady();
      }}
    >
      {/* Chassis (hidden during 'dim') */}
      {phase !== 'dim' && (
        <div
          className={phase === 'arrive' ? 'cc-chassis-arrive' : undefined}
          style={{
            width: chassisW,
            height: chassisH,
            background: CASE_FILL,
            border: `4px solid ${CASE_DARK}`,
            boxShadow: `inset -3px -3px 0 ${CASE_SHADOW}, inset 3px 3px 0 #F0E5C0, 8px 8px 0 rgba(0,0,0,0.5)`,
            padding: 14,
            display: 'flex',
            flexDirection: 'column',
            imageRendering: 'pixelated',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Top strip — theme accent */}
          <div
            style={{
              height: 22,
              background: accent,
              border: `2px solid ${CASE_DARK}`,
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 10px',
              fontSize: 10,
              color: '#1A1A1A',
              letterSpacing: '0.14em',
              fontWeight: 700,
            }}
          >
            <span>{topbarText}</span>
            {topbarSub && <span style={{ opacity: 0.7 }}>{topbarSub}</span>}
          </div>

          {/* CRT screen */}
          <div
            className="crt-scanlines"
            style={{
              flex: 1,
              background: phase === 'power' ? '#FFFFFF' : PHOSPHOR_BG,
              border: `4px solid ${CASE_SHADOW}`,
              boxShadow: `inset 0 0 30px rgba(0,0,0,0.6), inset -2px -2px 0 #1A1A1A, inset 2px 2px 0 #5A4A30`,
              padding: 16,
              color: accent,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              lineHeight: 1.5,
              overflow: 'hidden',
              position: 'relative',
              animation: phase === 'power' ? 'cc-crt-power-on 480ms ease-out forwards' : undefined,
            }}
          >
            {/* Boot phase: show boot lines */}
            {phase === 'boot' && (
              <pre
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: accent,
                  margin: 0,
                  whiteSpace: 'pre',
                }}
              >
                {bootLines.slice(0, bootLinesShown).join('\n')}
                {bootLinesShown > 0 && bootLinesShown < bootLines.length && (
                  <span style={{ animation: 'cc-blink 1.06s steps(2, end) infinite' }}>▮</span>
                )}
              </pre>
            )}

            {/* Ready phase: render children */}
            {phase === 'ready' && children}
          </div>

          {/* Bottom row — LED + variant-specific decoration */}
          <div
            style={{
              height: 30,
              marginTop: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              className="cc-led-pulse"
              style={{
                width: 8,
                height: 8,
                background: phase === 'ready' || phase === 'boot' ? accent : '#1A1A1A',
                border: `1px solid ${CASE_DARK}`,
                ['--led-color' as string]: accent,
              } as React.CSSProperties}
            />
            {isMac ? (
              // Floppy slot — boss only
              <div
                style={{
                  flex: 1,
                  height: 10,
                  background: '#1A1A1A',
                  border: `1px solid ${CASE_DARK}`,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    right: 6,
                    top: 1,
                    width: 4,
                    height: 6,
                    background: '#3A3A3A',
                  }}
                />
              </div>
            ) : (
              // Keyboard hint — practice only
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: CASE_DARK,
                  letterSpacing: '0.05em',
                }}
              >
                <span>┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐┌─┐</span>
                <span style={{ marginLeft: 'auto', fontWeight: 700 }}>KBD</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chassis name plate */}
      {phase !== 'dim' && (
        <div
          style={{
            marginTop: 12,
            fontSize: 11,
            letterSpacing: '0.2em',
            color: '#5A5A5A',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {chassisName}
        </div>
      )}

      {/* Skip hint (during boot phases) */}
      {phase !== 'ready' && phase !== 'dim' && (
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            right: 24,
            fontSize: 10,
            color: '#3A3A3A',
            letterSpacing: '0.12em',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          SPACE TO SKIP
        </div>
      )}
    </div>
  );
}
