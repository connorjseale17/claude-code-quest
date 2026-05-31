import { PixelSprite, AnimatedSprite } from './PixelSprite';

export type BossDisplayPhase = 'idle' | 'attack' | 'hurt' | 'defeat';

interface BossSpriteProps {
  spriteKey: string;        // e.g. 'emberling' — frames: ${spriteKey}_idle_1/2, _attack, _hurt, _defeat
  phase: BossDisplayPhase;
  accent: string;
  scale?: number;
}

export function BossSprite({ spriteKey, phase, accent, scale = 8 }: BossSpriteProps) {
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
  return (
    <PixelSprite
      frame={`${spriteKey}_${phase}`}
      scale={scale}
      primaryColor={accent}
    />
  );
}
