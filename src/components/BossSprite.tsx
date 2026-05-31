import { PixelSprite, AnimatedSprite } from './PixelSprite';

export type BossDisplayPhase = 'idle' | 'attack' | 'hurt' | 'defeat';

interface BossSpriteProps {
  spriteKey: string;        // grid frames: ${spriteKey}_idle_1/2, _attack, _hurt, _defeat
  phase: BossDisplayPhase;
  accent: string;
  scale?: number;
  /** When present, render a real image instead of the palette grid. */
  art?: { src: string; width?: number };
}

export function BossSprite({ spriteKey, phase, accent, scale = 8, art }: BossSpriteProps) {
  // --- Image path: one PNG + CSS state effects ---
  if (art) {
    const base: React.CSSProperties = {
      width: art.width ?? 200,
      height: 'auto',
      imageRendering: 'pixelated',
      transition: 'transform 140ms ease-out, filter 140ms ease-out, opacity 300ms ease-out',
    };
    const byPhase: Record<BossDisplayPhase, React.CSSProperties> = {
      idle: {
        animation: 'cc-boss-bob 2.4s ease-in-out infinite',
        filter: `drop-shadow(0 0 10px ${accent}66)`,
      },
      attack: {
        transform: 'scale(1.08) translateX(-10px)',
        filter: `drop-shadow(0 0 18px ${accent}) brightness(1.2)`,
      },
      hurt: {
        filter: 'brightness(2.2) sepia(1) saturate(5) hue-rotate(-35deg)',
        animation: 'cc-shake 250ms steps(4, end)',
      },
      defeat: {
        opacity: 0.3,
        filter: 'grayscale(1) brightness(0.5)',
        transform: 'rotate(8deg) translateY(12px)',
      },
    };
    return <img src={art.src} alt="" draggable={false} style={{ ...base, ...byPhase[phase] }} />;
  }

  // --- Grid fallback (palette sprites) ---
  if (phase === 'idle') {
    return (
      <AnimatedSprite
        frames={[`${spriteKey}_idle_1`, `${spriteKey}_idle_2`]}
        fps={1.5}
        scale={scale}
        primaryColor={accent}
      />
    );
  }
  return <PixelSprite frame={`${spriteKey}_${phase}`} scale={scale} primaryColor={accent} />;
}
