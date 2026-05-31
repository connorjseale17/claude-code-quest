import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PixelSprite } from './PixelSprite';

interface SceneDodgeProps {
  difficulty: 'easy' | 'hard';
  botColor: string;
  /** Fireball tint (boss/level accent). */
  accent: string;
  onResolve: (heartsLost: number) => void;
}

const BOT_SCALE = 3;              // bot_back is 16 wide → 48px displayed
const BOT_PX = 16 * BOT_SCALE;    // 48
const BOT_HIT = 30;               // tighter-than-sprite hitbox
const FIRE_SCALE = 2;             // fireball frame 16 → 32px
const FIRE_PX = 16 * FIRE_SCALE;  // 32
const FIRE_HIT = 16;
const BOT_SPEED = 320;            // px/sec
const WAVE_MS = 2800;
const MAX_HEARTS_LOST = 2;
const IFRAME_MS = 550;

const PROFILE = {
  easy: { spawnEvery: 360, speedMin: 130, speedMax: 175, aimJitter: 90 },
  hard: { spawnEvery: 150, speedMin: 190, speedMax: 250, aimJitter: 28 },
} as const;

interface Fire {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function SceneDodge({ difficulty, botColor, accent, onResolve }: SceneDodgeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);

  const botRef = useRef({ x: 60, y: 0 });
  const firesRef = useRef<Fire[]>([]);
  const fireIdRef = useRef(0);
  const heartsLostRef = useRef(0);
  const iframeUntilRef = useRef(0);
  const keysRef = useRef<Record<string, boolean>>({});
  const resolvedRef = useRef(false);
  const [, forceTick] = useState(0);

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Measure the scene area we fill.
  useLayoutEffect(() => {
    if (rootRef.current) {
      setDims({ w: rootRef.current.clientWidth, h: rootRef.current.clientHeight });
    }
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      const t = window.setTimeout(() => {
        if (!resolvedRef.current) {
          resolvedRef.current = true;
          onResolve(difficulty === 'hard' ? 1 : 0);
        }
      }, 800);
      return () => clearTimeout(t);
    }
    if (!dims) return;

    const { w, h } = dims;
    // Start bot lower-left.
    botRef.current = { x: 50, y: h - BOT_PX - 20 };
    firesRef.current = [];
    heartsLostRef.current = 0;
    iframeUntilRef.current = 0;
    fireIdRef.current = 0;
    resolvedRef.current = false;

    const profile = PROFILE[difficulty];
    // Boss "muzzle" — upper-right, where the boss sprite sits.
    const origin = { x: w - 120, y: 70 };

    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
        e.preventDefault();
        keysRef.current[e.key] = true;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => { keysRef.current[e.key] = false; };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const start = performance.now();
    let last = start;
    let lastSpawn = start;
    let rafId = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Move bot.
      const k = keysRef.current;
      let dx = 0, dy = 0;
      if (k['ArrowUp'] || k['w'] || k['W']) dy -= 1;
      if (k['ArrowDown'] || k['s'] || k['S']) dy += 1;
      if (k['ArrowLeft'] || k['a'] || k['A']) dx -= 1;
      if (k['ArrowRight'] || k['d'] || k['D']) dx += 1;
      if (dx && dy) { const inv = 1 / Math.sqrt(2); dx *= inv; dy *= inv; }
      botRef.current.x = Math.max(8, Math.min(w - BOT_PX - 8, botRef.current.x + dx * BOT_SPEED * dt));
      botRef.current.y = Math.max(8, Math.min(h - BOT_PX - 8, botRef.current.y + dy * BOT_SPEED * dt));

      // Spawn fireballs aimed from the boss toward the bot.
      if (now - lastSpawn >= profile.spawnEvery && now - start < WAVE_MS - 500) {
        lastSpawn = now;
        const speed = profile.speedMin + Math.random() * (profile.speedMax - profile.speedMin);
        const targetX = botRef.current.x + BOT_PX / 2 + (Math.random() - 0.5) * profile.aimJitter;
        const targetY = botRef.current.y + BOT_PX / 2 + (Math.random() - 0.5) * profile.aimJitter;
        const ang = Math.atan2(targetY - origin.y, targetX - origin.x);
        firesRef.current.push({
          id: fireIdRef.current++,
          x: origin.x,
          y: origin.y,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
        });
      }

      // Move + collide.
      const bl = botRef.current.x + (BOT_PX - BOT_HIT) / 2;
      const bt = botRef.current.y + (BOT_PX - BOT_HIT) / 2;
      const br = bl + BOT_HIT;
      const bb = bt + BOT_HIT;

      const alive: Fire[] = [];
      for (const f of firesRef.current) {
        f.x += f.vx * dt;
        f.y += f.vy * dt;
        if (f.x < -FIRE_PX || f.x > w + FIRE_PX || f.y < -FIRE_PX || f.y > h + FIRE_PX) continue;

        if (now >= iframeUntilRef.current) {
          const fl = f.x + (FIRE_PX - FIRE_HIT) / 2;
          const ft = f.y + (FIRE_PX - FIRE_HIT) / 2;
          if (fl < br && fl + FIRE_HIT > bl && ft < bb && ft + FIRE_HIT > bt) {
            if (heartsLostRef.current < MAX_HEARTS_LOST) heartsLostRef.current += 1;
            iframeUntilRef.current = now + IFRAME_MS;
            continue;
          }
        }
        alive.push(f);
      }
      firesRef.current = alive;
      forceTick(t => (t + 1) % 1_000_000);

      if (now - start >= WAVE_MS) {
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
  }, [dims, difficulty, onResolve, reducedMotion]);

  const now = typeof performance !== 'undefined' ? performance.now() : 0;
  const inIframe = now < iframeUntilRef.current;

  return (
    <div ref={rootRef} className="absolute inset-0" style={{ overflow: 'hidden' }}>
      {reducedMotion ? (
        <div
          style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: accent, fontFamily: "'JetBrains Mono', monospace", fontSize: 16, letterSpacing: '0.2em',
          }}
        >
          … BRACE …
        </div>
      ) : (
        <>
          {/* Bot avatar */}
          <div
            style={{
              position: 'absolute',
              left: botRef.current.x,
              top: botRef.current.y,
              opacity: inIframe && Math.floor(now / 80) % 2 === 0 ? 0.3 : 1,
            }}
          >
            <PixelSprite frame="bot_back" scale={BOT_SCALE} primaryColor={botColor} />
          </div>
          {/* Fireballs */}
          {firesRef.current.map(f => (
            <div key={f.id} style={{ position: 'absolute', left: f.x, top: f.y }}>
              <PixelSprite frame="fireball" scale={FIRE_SCALE} primaryColor={accent} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
