import { useEffect, useRef, useState } from 'react';
import { useGame } from '../engine/GameContext';

/**
 * Floating-thumbstick touch overlay.
 *
 * Left half of the screen = virtual directional stick. Touch & drag in a
 * direction → synthesizes the matching ArrowKey `keydown`. Release → keyup.
 * Right half = action zone. Tap anywhere → synthesizes Space keydown+keyup.
 *
 * Synthesizing KeyboardEvents lets the existing `useMovement` and every
 * panel's keyboard handler drive the game unchanged.
 */

const DEADZONE = 18; // CSS px — must exceed before a direction is chosen.
const STICK_RING_RADIUS = 56;
const STICK_DOT_RADIUS = 22;

type Dir = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | null;

function fireKey(type: 'keydown' | 'keyup', key: string) {
  // Use a real KeyboardEvent so listeners that check `e.key` see it. The
  // `e.repeat` flag is false (these are deliberate single events), which is
  // exactly what useMovement expects (it ignores `e.repeat`).
  window.dispatchEvent(new KeyboardEvent(type, { key, bubbles: true }));
}

function pickCardinal(dx: number, dy: number): Dir {
  if (Math.abs(dx) < DEADZONE && Math.abs(dy) < DEADZONE) return null;
  if (Math.abs(dx) >= Math.abs(dy)) return dx >= 0 ? 'ArrowRight' : 'ArrowLeft';
  return dy >= 0 ? 'ArrowDown' : 'ArrowUp';
}

function isInteractiveTarget(t: EventTarget | null): boolean {
  if (!(t instanceof Element)) return false;
  return !!t.closest('button,[role=button],a,input,textarea,select,[data-mobile-passthrough]');
}

export function MobileControls() {
  const { gamePhase } = useGame();
  const [isCoarse, setIsCoarse] = useState(false);
  // Only render controls when actually in-game. Splash, customize, and loading
  // screens have their own tap-to-advance handlers — the joystick would just
  // be visual noise there.
  const enabled = isCoarse && gamePhase === 'playing';
  const stickRef = useRef<{
    pointerId: number;
    anchor: { x: number; y: number };
    pos: { x: number; y: number };
    dir: Dir;
  } | null>(null);
  const actionRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);
  const [, forceTick] = useState(0);

  // Show only on coarse pointers (touch devices).
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const apply = () => setIsCoarse(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Pointer handlers — attached to a full-screen invisible layer.
  useEffect(() => {
    if (!enabled) return;

    const onPointerDown = (e: PointerEvent) => {
      // Let real buttons (panels, dev menu, choice list) handle their own taps.
      if (isInteractiveTarget(e.target)) return;

      const isLeft = e.clientX < window.innerWidth / 2;
      if (isLeft) {
        if (stickRef.current) return; // already tracking one finger on the left
        stickRef.current = {
          pointerId: e.pointerId,
          anchor: { x: e.clientX, y: e.clientY },
          pos: { x: e.clientX, y: e.clientY },
          dir: null,
        };
        forceTick(t => (t + 1) % 1_000_000);
      } else {
        if (actionRef.current) return;
        actionRef.current = { pointerId: e.pointerId, x: e.clientX, y: e.clientY };
        // Synthesize a Space press immediately; release on touchend.
        fireKey('keydown', ' ');
        forceTick(t => (t + 1) % 1_000_000);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const s = stickRef.current;
      if (!s || s.pointerId !== e.pointerId) return;
      s.pos = { x: e.clientX, y: e.clientY };
      const dx = s.pos.x - s.anchor.x;
      const dy = s.pos.y - s.anchor.y;
      const newDir = pickCardinal(dx, dy);
      if (newDir !== s.dir) {
        if (s.dir) fireKey('keyup', s.dir);
        if (newDir) fireKey('keydown', newDir);
        s.dir = newDir;
      }
      forceTick(t => (t + 1) % 1_000_000);
    };

    const onPointerUp = (e: PointerEvent) => {
      const s = stickRef.current;
      if (s && s.pointerId === e.pointerId) {
        if (s.dir) fireKey('keyup', s.dir);
        stickRef.current = null;
        forceTick(t => (t + 1) % 1_000_000);
      }
      const a = actionRef.current;
      if (a && a.pointerId === e.pointerId) {
        fireKey('keyup', ' ');
        actionRef.current = null;
        forceTick(t => (t + 1) % 1_000_000);
      }
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  const s = stickRef.current;
  const a = actionRef.current;

  return (
    <>
      {/* Left virtual stick visualization. */}
      {s && (
        <>
          <div
            style={{
              position: 'fixed',
              left: s.anchor.x - STICK_RING_RADIUS,
              top: s.anchor.y - STICK_RING_RADIUS,
              width: STICK_RING_RADIUS * 2,
              height: STICK_RING_RADIUS * 2,
              borderRadius: '50%',
              border: '2px solid rgba(232, 99, 61, 0.6)',
              background: 'rgba(0,0,0,0.25)',
              pointerEvents: 'none',
              zIndex: 90,
            }}
          />
          <div
            style={{
              position: 'fixed',
              left: s.pos.x - STICK_DOT_RADIUS,
              top: s.pos.y - STICK_DOT_RADIUS,
              width: STICK_DOT_RADIUS * 2,
              height: STICK_DOT_RADIUS * 2,
              borderRadius: '50%',
              background: 'rgba(232, 99, 61, 0.85)',
              pointerEvents: 'none',
              zIndex: 91,
            }}
          />
        </>
      )}

      {/* Right action-zone flash. */}
      {a && (
        <div
          style={{
            position: 'fixed',
            left: a.x - 40,
            top: a.y - 40,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(232, 99, 61, 0.35)',
            border: '2px solid rgba(232, 99, 61, 0.7)',
            pointerEvents: 'none',
            zIndex: 90,
          }}
        />
      )}

      {/* Ambient subtle hints — only visible when nothing is being pressed. */}
      {!s && !a && (
        <>
          <div
            style={{
              position: 'fixed',
              bottom: 24,
              left: 24,
              padding: '6px 10px',
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(232, 99, 61, 0.3)',
              color: 'rgba(232, 99, 61, 0.7)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.14em',
              pointerEvents: 'none',
              zIndex: 89,
            }}
          >
            ◄ MOVE
          </div>
          <div
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              padding: '6px 10px',
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(232, 99, 61, 0.3)',
              color: 'rgba(232, 99, 61, 0.7)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.14em',
              pointerEvents: 'none',
              zIndex: 89,
            }}
          >
            ACT ►
          </div>
        </>
      )}
    </>
  );
}
