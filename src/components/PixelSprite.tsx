import { useState, useEffect } from 'react';
import { FRAMES, IMAGE_FRAMES, PIXEL_PALETTE } from '../assets/sprites';

interface PixelSpriteProps {
  frame: string | string[];
  scale?: number;
  primaryColor?: string;
  style?: React.CSSProperties;
  className?: string;
}

// All sprites are authored on a 16×16 logical grid, so an image-backed sprite
// renders at the same physical footprint as a string-pixel sprite at the same scale.
const SPRITE_GRID = 16;

export function PixelSprite({ frame, scale = 4, primaryColor, style, className }: PixelSpriteProps) {
  // Image-backed frames take priority over string-pixel frames.
  if (typeof frame === 'string' && IMAGE_FRAMES[frame]) {
    const size = SPRITE_GRID * scale;
    return (
      <img
        src={IMAGE_FRAMES[frame]}
        alt={frame}
        className={className}
        draggable={false}
        style={{
          width: size,
          height: size,
          imageRendering: 'pixelated',
          flexShrink: 0,
          objectFit: 'contain',
          ...style,
        }}
      />
    );
  }

  const f = typeof frame === 'string' ? FRAMES[frame] : frame;
  if (!f) return null;
  const rows = f.length;
  const cols = f[0].length;

  const cells: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const ch = f[r][c];
      const color = (ch === '1' && primaryColor) ? primaryColor : PIXEL_PALETTE[ch];
      cells.push(
        <div key={`${r}-${c}`} style={{ background: color || 'transparent' }} />
      );
    }
  }

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${scale}px)`,
        gridTemplateRows: `repeat(${rows}, ${scale}px)`,
        width: cols * scale,
        height: rows * scale,
        imageRendering: 'pixelated',
        flexShrink: 0,
        ...style,
      }}
    >
      {cells}
    </div>
  );
}

interface AnimatedSpriteProps {
  frames: string[];
  fps?: number;
  scale?: number;
  primaryColor?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function AnimatedSprite({ frames, fps = 6, scale = 4, primaryColor, style, className }: AnimatedSpriteProps) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(x => (x + 1) % frames.length), 1000 / fps);
    return () => clearInterval(id);
  }, [frames.length, fps]);
  return <PixelSprite frame={frames[i]} scale={scale} primaryColor={primaryColor} style={style} className={className} />;
}

export function BotIdle({ scale = 4, primaryColor, style }: { scale?: number; primaryColor?: string; style?: React.CSSProperties }) {
  return <AnimatedSprite frames={['idle_a', 'idle_b']} fps={1.5} scale={scale} primaryColor={primaryColor} style={style} />;
}

export function BotWalk({ scale = 4, primaryColor, style }: { scale?: number; primaryColor?: string; style?: React.CSSProperties }) {
  return <AnimatedSprite frames={['walk_1', 'walk_2', 'walk_3', 'walk_4']} fps={6} scale={scale} primaryColor={primaryColor} style={style} />;
}

export function BotHappy({ scale = 4, primaryColor, style }: { scale?: number; primaryColor?: string; style?: React.CSSProperties }) {
  return <PixelSprite frame="happy" scale={scale} primaryColor={primaryColor} style={style} />;
}

export function BotSad({ scale = 4, primaryColor, style }: { scale?: number; primaryColor?: string; style?: React.CSSProperties }) {
  return <PixelSprite frame="sad" scale={scale} primaryColor={primaryColor} style={style} />;
}
