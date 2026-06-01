import { useEffect, useState } from 'react';

/**
 * Full-screen "please rotate" overlay, shown when:
 *   - the device is a coarse-pointer (touch) device, AND
 *   - the orientation is portrait, AND
 *   - the viewport is narrow enough to actually be a phone.
 *
 * Hides automatically when the user rotates to landscape.
 */
export function RotatePrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      '(pointer: coarse) and (orientation: portrait) and (max-width: 900px)',
    );
    const apply = () => setShow(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#0E0E0E',
        color: '#E8E8E8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: 32,
        textAlign: 'center',
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div
        style={{
          fontSize: 56,
          lineHeight: 1,
          animation: 'cc-rotate-hint 2.6s ease-in-out infinite',
        }}
      >
        ▭
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.06em' }}>
        ROTATE TO LANDSCAPE
      </div>
      <div style={{ fontSize: 13, color: '#7D7D7D', maxWidth: 280, lineHeight: 1.6 }}>
        claude-code-quest plays in landscape mode. Turn your device sideways to begin.
      </div>
    </div>
  );
}
