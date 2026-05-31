import { useEffect, useRef, useState } from 'react';
import { PixelSprite } from './PixelSprite';

interface DodgeArenaProps {
  /** 'easy' on correct answer, 'hard' on wrong. */
  difficulty: 'easy' | 'hard';
  /** Heart-color accent (player color). */
  playerColor: string;
  /** Flame-color accent (level/boss theme). */
  flameColor: string;
  /** Called once after the wave resolves, with how many hearts the player lost. */
  onResolve: (heartsLost: number) => void;
}

// Arena dimensions (game-canvas px).
const ARENA_W = 480;
const ARENA_H = 160;

// Heart hitbox (the sprite is 16×16 base @ scale 3 = 48 displayed; hitbox is tighter).
const HEART_DISPLAY = 36;
const HEART_HITBOX = 22;
const HEART_SCALE = 3;

// Flame dimensions.
const FLAME_SIZE = 10;

// Heart movement speed (px/sec).
const HEART_SPEED = 260;

// Wave duration.
const WAVE_MS = 2800;

// Hit cap — even on a brutal wave you lose at most this much.
const MAX_HEARTS_LOST = 2;

// i-frames after a hit (ms).
const IFRAME_MS = 500;

interface Flame {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const DIFFICULTY_PROFILE = {
  easy: { spawnEvery: 280, vyMin: 110, vyMax: 160, vxAmp: 0 },
  hard: { spawnEvery: 130, vyMin: 170, vyMax: 230, vxAmp: 60 },
} as const;

export function DodgeArena({ difficulty, playerColor, flameColor, onResolve }: DodgeArenaProps) {
  const arenaRef = useRef<HTMLDivElement>(null);
  const heartPosRef = useRef({ x: ARENA_W / 2, y: ARENA_H / 2 });
  const [, forceTick] = useState(0);
  const flamesRef = useRef<Flame[]>([]);
  const flameIdRef = useRef(0);
  const heartsLostRef = useRef(0);
  const iframeUntilRef = useRef(0);
  const keysRef = useRef<Record<string, boolean>>({});
  const resolvedRef = useRef(false);

  // Check for prefers-reduced-motion — auto-resolve with a graze.
  const reducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reducedMotion) {
      // Brace fallback: graze (1 heart on hard, 0 on easy)
      const t = window.setTimeout(() => {
        if (!resolvedRef.current) {
          resolvedRef.current = true;
          onResolve(difficulty === 'hard' ? 1 : 0);
        }
      }, 700);
      return () => clearTimeout(t);
    }

    // Reset arena state on mount
    heartPosRef.current = { x: ARENA_W / 2, y: ARENA_H / 2 };
    flamesRef.current = [];
    heartsLostRef.current = 0;
    iframeUntilRef.current = 0;
    flameIdRef.current = 0;
    resolvedRef.current = false;

    const profile = DIFFICULTY_PROFILE[difficulty];

    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
        e.preventDefault();
        keysRef.current[e.key] = true;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const startTime = performance.now();
    let lastTime = startTime;
    let lastSpawn = startTime;
    let rafId = 0;

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Move heart based on held keys
      const k = keysRef.current;
      let dx = 0, dy = 0;
      if (k['ArrowUp'] || k['w'] || k['W']) dy -= 1;
      if (k['ArrowDown'] || k['s'] || k['S']) dy += 1;
      if (k['ArrowLeft'] || k['a'] || k['A']) dx -= 1;
      if (k['ArrowRight'] || k['d'] || k['D']) dx += 1;
      if (dx !== 0 && dy !== 0) {
        // diagonal normalize
        const inv = 1 / Math.sqrt(2);
        dx *= inv;
        dy *= inv;
      }
      heartPosRef.current.x = Math.max(HEART_DISPLAY / 2, Math.min(ARENA_W - HEART_DISPLAY / 2,
        heartPosRef.current.x + dx * HEART_SPEED * dt));
      heartPosRef.current.y = Math.max(HEART_DISPLAY / 2, Math.min(ARENA_H - HEART_DISPLAY / 2,
        heartPosRef.current.y + dy * HEART_SPEED * dt));

      // Spawn flames
      if (now - lastSpawn >= profile.spawnEvery && now - startTime < WAVE_MS - 400) {
        lastSpawn = now;
        const x = Math.random() * (ARENA_W - FLAME_SIZE);
        const vy = profile.vyMin + Math.random() * (profile.vyMax - profile.vyMin);
        const vx = profile.vxAmp > 0 ? (Math.random() - 0.5) * 2 * profile.vxAmp : 0;
        flamesRef.current.push({
          id: flameIdRef.current++,
          x,
          y: -FLAME_SIZE,
          vx,
          vy,
        });
      }

      // Move flames + collision
      const heartLeft = heartPosRef.current.x - HEART_HITBOX / 2;
      const heartTop = heartPosRef.current.y - HEART_HITBOX / 2;
      const heartRight = heartLeft + HEART_HITBOX;
      const heartBottom = heartTop + HEART_HITBOX;

      const surviving: Flame[] = [];
      for (const f of flamesRef.current) {
        f.x += f.vx * dt;
        f.y += f.vy * dt;

        // Despawn if off-arena
        if (f.y > ARENA_H + 4 || f.x < -FLAME_SIZE || f.x > ARENA_W + FLAME_SIZE) continue;

        // Collision (skip if in i-frames)
        if (now >= iframeUntilRef.current) {
          const fRight = f.x + FLAME_SIZE;
          const fBottom = f.y + FLAME_SIZE;
          if (
            f.x < heartRight &&
            fRight > heartLeft &&
            f.y < heartBottom &&
            fBottom > heartTop
          ) {
            if (heartsLostRef.current < MAX_HEARTS_LOST) {
              heartsLostRef.current += 1;
            }
            iframeUntilRef.current = now + IFRAME_MS;
            continue; // consume the flame
          }
        }
        surviving.push(f);
      }
      flamesRef.current = surviving;

      forceTick(t => (t + 1) % 1000000);

      // Resolve when time runs out
      if (now - startTime >= WAVE_MS) {
        if (!resolvedRef.current) {
          resolvedRef.current = true;
          onResolve(heartsLostRef.current);
        }
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      keysRef.current = {};
    };
  }, [difficulty, onResolve, reducedMotion]);

  if (reducedMotion) {
    return (
      <div
        style={{
          width: ARENA_W,
          minHeight: 60,
          background: '#0A0A0A',
          border: `2px solid ${flameColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#7D7D7D',
          fontSize: 12,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '0.12em',
        }}
      >
        … BRACING …
      </div>
    );
  }

  const now = performance.now();
  const inIframe = now < iframeUntilRef.current;

  return (
    <div
      ref={arenaRef}
      style={{
        position: 'relative',
        width: ARENA_W,
        height: ARENA_H,
        background: '#050505',
        border: `2px solid ${flameColor}`,
        overflow: 'hidden',
        margin: '0 auto',
      }}
    >
      {/* Heart */}
      <div
        style={{
          position: 'absolute',
          left: heartPosRef.current.x - HEART_DISPLAY / 2,
          top: heartPosRef.current.y - HEART_DISPLAY / 2,
          opacity: inIframe && Math.floor(now / 80) % 2 === 0 ? 0.3 : 1,
        }}
      >
        <PixelSprite frame="heart" scale={HEART_SCALE} primaryColor={playerColor} />
      </div>

      {/* Flames */}
      {flamesRef.current.map(f => (
        <div
          key={f.id}
          style={{
            position: 'absolute',
            left: f.x,
            top: f.y,
            width: FLAME_SIZE,
            height: FLAME_SIZE,
            background: flameColor,
            boxShadow: `0 0 4px ${flameColor}`,
          }}
        />
      ))}

      {/* Hint along the bottom edge */}
      <div
        style={{
          position: 'absolute',
          bottom: 4,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 9,
          color: '#3A3A3A',
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '0.18em',
          pointerEvents: 'none',
        }}
      >
        ARROW KEYS / WASD
      </div>
    </div>
  );
}
