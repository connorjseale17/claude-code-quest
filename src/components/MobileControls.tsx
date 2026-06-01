import { useEffect, useRef, useState } from 'react';
import { useGame } from '../engine/GameContext';

/**
 * Mobile touch overlay.
 *
 * RIGHT half = floating directional stick. Touch anywhere on the right half,
 *   drag past a small deadzone, and the matching ArrowKey is synthesized.
 *   The visual dot is clamped to the ring edge for an analog-stick feel.
 *   Direction switching uses a small hysteresis margin to kill 45° jitter.
 *
 * LEFT half = interact pane. Any tap synthesizes Space (keydown on touch,
 *   keyup on release) — advances dialogs, opens lore, picks up the key, etc.
 *
 * Synthesizing KeyboardEvents lets the existing `useMovement` and every
 * panel's keyboard handler drive the game unchanged.
 */

const DEADZONE = 14;                 // CSS px — slack before a direction is chosen
const SWITCH_MARGIN = 1.18;          // new axis must beat current by 18% to swap
const STICK_RING_RADIUS = 60;
const STICK_DOT_RADIUS = 26;
const MAX_DOT_DRIFT = STICK_RING_RADIUS - STICK_DOT_RADIUS;

type Dir = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | null;

function fireKey(type: 'keydown' | 'keyup', key: string) {
  // Real KeyboardEvent so listeners that check `e.key` see it.
  // `e.repeat` defaults to false — which is what useMovement expects.
  window.dispatchEvent(new KeyboardEvent(type, { key, bubbles: true }));
}

/**
 * Pick the dominant cardinal direction with hysteresis.
 *
 * - If currently null and drag exceeds DEADZONE, pick the bigger axis.
 * - If already moving in a direction, only swap to the cross-axis when
 *   that axis is at least SWITCH_MARGIN times larger than the current
 *   one. Stops 45° angles flipping between two directions every frame.
 */
function pickCardinal(dx: number, dy: number, current: Dir): Dir {
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);
  if (ax < DEADZONE && ay < DEADZONE) return null;

  const horiz: Dir = dx >= 0 ? 'ArrowRight' : 'ArrowLeft';
  const vert: Dir = dy >= 0 ? 'ArrowDown' : 'ArrowUp';

  if (!current) {
    return ax >= ay ? horiz : vert;
  }
  const onHoriz = current === 'ArrowLeft' || current === 'ArrowRight';
  if (onHoriz) {
    // Keep horizontal unless vertical clearly dominates.
    if (ay > ax * SWITCH_MARGIN) return vert;
    return horiz; // same axis, but possibly opposite sign — update sign
  } else {
    if (ax > ay * SWITCH_MARGIN) return horiz;
    return vert;
  }
}

function isInteractiveTarget(t: EventTarget | null): boolean {
  if (!(t instanceof Element)) return false;
  return !!t.closest('button,[role=button],a,input,textarea,select,[data-mobile-passthrough]');
}

export function MobileControls() {
  const { gamePhase } = useGame();
  const [isCoarse, setIsCoarse] = useState(false);
  const enabled = isCoarse && gamePhase === 'playing';

  const stickRef = useRef<{
    pointerId: number;
    anchor: { x: number; y: number };
    pos: { x: number; y: number };  // clamped to the ring
    raw: { x: number; y: number };  // un-clamped touch position
    dir: Dir;
  } | null>(null);
  const actionRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);
  const [, forceTick] = useState(0);
  const rerender = () => forceTick(t => (t + 1) % 1_000_000);

  // Show only on coarse pointers.
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const apply = () => setIsCoarse(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onPointerDown = (e: PointerEvent) => {
      if (isInteractiveTarget(e.target)) return;

      const isRight = e.clientX >= window.innerWidth / 2;
      if (isRight) {
        if (stickRef.current) return;
        stickRef.current = {
          pointerId: e.pointerId,
          anchor: { x: e.clientX, y: e.clientY },
          pos: { x: e.clientX, y: e.clientY },
          raw: { x: e.clientX, y: e.clientY },
          dir: null,
        };
        rerender();
      } else {
        if (actionRef.current) return;
        actionRef.current = { pointerId: e.pointerId, x: e.clientX, y: e.clientY };
        fireKey('keydown', ' ');
        rerender();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const s = stickRef.current;
      if (!s || s.pointerId !== e.pointerId) return;
      const rawDx = e.clientX - s.anchor.x;
      const rawDy = e.clientY - s.anchor.y;
      // Clamp the visual dot to the ring radius — analog-stick feel.
      const mag = Math.hypot(rawDx, rawDy);
      const scale = mag > MAX_DOT_DRIFT ? MAX_DOT_DRIFT / mag : 1;
      s.raw = { x: e.clientX, y: e.clientY };
      s.pos = { x: s.anchor.x + rawDx * scale, y: s.anchor.y + rawDy * scale };

      const newDir = pickCardinal(rawDx, rawDy, s.dir);
      if (newDir !== s.dir) {
        if (s.dir) fireKey('keyup', s.dir);
        if (newDir) fireKey('keydown', newDir);
        s.dir = newDir;
      }
      rerender();
    };

    const onPointerUp = (e: PointerEvent) => {
      const s = stickRef.current;
      if (s && s.pointerId === e.pointerId) {
        if (s.dir) fireKey('keyup', s.dir);
        stickRef.current = null;
        rerender();
      }
      const a = actionRef.current;
      if (a && a.pointerId === e.pointerId) {
        fireKey('keyup', ' ');
        actionRef.current = null;
        rerender();
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
      {/* Right floating stick. */}
      {s && (
        <>
          {/* Outer ring */}
          <div
            style={{
              position: 'fixed',
              left: s.anchor.x - STICK_RING_RADIUS,
              top: s.anchor.y - STICK_RING_RADIUS,
              width: STICK_RING_RADIUS * 2,
              height: STICK_RING_RADIUS * 2,
              borderRadius: '50%',
              border: '2px solid rgba(232, 99, 61, 0.55)',
              background: 'rgba(0,0,0,0.28)',
              pointerEvents: 'none',
              zIndex: 90,
            }}
          />
          {/* Directional highlight on the active cardinal */}
          {s.dir && <DirectionWedge cx={s.anchor.x} cy={s.anchor.y} dir={s.dir} />}
          {/* Inner dot (clamped to ring) */}
          <div
            style={{
              position: 'fixed',
              left: s.pos.x - STICK_DOT_RADIUS,
              top: s.pos.y - STICK_DOT_RADIUS,
              width: STICK_DOT_RADIUS * 2,
              height: STICK_DOT_RADIUS * 2,
              borderRadius: '50%',
              background: 'rgba(232, 99, 61, 0.9)',
              boxShadow: '0 0 12px rgba(232, 99, 61, 0.45)',
              pointerEvents: 'none',
              zIndex: 91,
            }}
          />
        </>
      )}

      {/* Left interact-pane flash. */}
      {a && (
        <div
          style={{
            position: 'fixed',
            left: a.x - 44,
            top: a.y - 44,
            width: 88,
            height: 88,
            borderRadius: '50%',
            background: 'rgba(232, 99, 61, 0.32)',
            border: '2px solid rgba(232, 99, 61, 0.7)',
            pointerEvents: 'none',
            zIndex: 90,
          }}
        />
      )}

      {/* Ambient hints when nothing is being pressed. */}
      {!s && !a && (
        <>
          <div style={hintStyle('left')}>◄ TAP TO ACT</div>
          <div style={hintStyle('right')}>MOVE ►</div>
        </>
      )}
    </>
  );
}

function hintStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'fixed',
    bottom: 24,
    [side]: 24,
    padding: '6px 10px',
    background: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(232, 99, 61, 0.3)',
    color: 'rgba(232, 99, 61, 0.7)',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.14em',
    pointerEvents: 'none',
    zIndex: 89,
  };
}

function DirectionWedge({ cx, cy, dir }: { cx: number; cy: number; dir: Dir }) {
  if (!dir) return null;
  const rotate = {
    ArrowUp: -90,
    ArrowRight: 0,
    ArrowDown: 90,
    ArrowLeft: 180,
  }[dir];
  const SZ = STICK_RING_RADIUS * 2;
  return (
    <div
      style={{
        position: 'fixed',
        left: cx - STICK_RING_RADIUS,
        top: cy - STICK_RING_RADIUS,
        width: SZ,
        height: SZ,
        pointerEvents: 'none',
        zIndex: 90,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: -2,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 0,
          height: 0,
          borderTop: '14px solid transparent',
          borderBottom: '14px solid transparent',
          borderLeft: '18px solid rgba(232, 99, 61, 0.9)',
          filter: 'drop-shadow(0 0 4px rgba(232, 99, 61, 0.7))',
        }}
      />
    </div>
  );
}
