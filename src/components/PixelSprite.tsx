import { useState, useEffect } from 'react';
import { FRAMES, PIXEL_PALETTE, PROP_FRAMES, PROP_FRAMES_B, PROP_PALETTE } from '../assets/sprites';

interface PixelSpriteProps {
  frame: string | string[];
  scale?: number;
  primaryColor?: string;
  /** Optional palette override (e.g. PROP_PALETTE). Merged over PIXEL_PALETTE,
   *  so prop-specific colors win for shared keys without polluting the global
   *  palette. When omitted, the global PIXEL_PALETTE is used as-is. */
  palette?: Record<string, string | null>;
  style?: React.CSSProperties;
  className?: string;
}

export function PixelSprite({ frame, scale = 4, primaryColor, palette, style, className }: PixelSpriteProps) {
  const f = typeof frame === 'string' ? FRAMES[frame] : frame;
  if (!f) return null;
  const rows = f.length;
  const cols = f[0].length;
  const pal = palette ? { ...PIXEL_PALETTE, ...palette } : PIXEL_PALETTE;

  const cells: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const ch = f[r][c];
      const color = (ch === '1' && primaryColor) ? primaryColor : pal[ch];
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
  palette?: Record<string, string | null>;
  style?: React.CSSProperties;
  className?: string;
}

export function AnimatedSprite({ frames, fps = 6, scale = 4, primaryColor, palette, style, className }: AnimatedSpriteProps) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(x => (x + 1) % frames.length), 1000 / fps);
    return () => clearInterval(id);
  }, [frames.length, fps]);
  return <PixelSprite frame={frames[i]} scale={scale} primaryColor={primaryColor} palette={palette} style={style} className={className} />;
}

export function BotIdle({ scale = 4, primaryColor, style }: { scale?: number; primaryColor?: string; style?: React.CSSProperties }) {
  return <AnimatedSprite frames={['idle_a', 'idle_b']} fps={1.5} scale={scale} primaryColor={primaryColor} style={style} />;
}

export function BotWalk({ scale = 4, primaryColor, style }: { scale?: number; primaryColor?: string; style?: React.CSSProperties }) {
  return <AnimatedSprite frames={['walk_1', 'walk_2', 'walk_3', 'walk_4']} fps={6} scale={scale} primaryColor={primaryColor} style={style} />;
}

/** Renders a prop. If a B-frame exists in PROP_FRAMES_B (flicker / pulse /
 *  state / sway / shimmer), alternates between A and B every ~520 ms. */
export function PropSprite({ name, scale, style }: { name: string; scale: number; style?: React.CSSProperties }) {
  const a = PROP_FRAMES[name];
  const b = PROP_FRAMES_B[name];
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!b) return;
    const id = setInterval(() => setI(x => x ^ 1), 520);
    return () => clearInterval(id);
  }, [b]);
  if (!a) return null;
  const frame = (b && i === 1) ? b : a;
  return <PixelSprite frame={frame} scale={scale} palette={PROP_PALETTE} style={style} />;
}

export function BotHappy({ scale = 4, primaryColor, style }: { scale?: number; primaryColor?: string; style?: React.CSSProperties }) {
  return <PixelSprite frame="happy" scale={scale} primaryColor={primaryColor} style={style} />;
}

export function BotSad({ scale = 4, primaryColor, style }: { scale?: number; primaryColor?: string; style?: React.CSSProperties }) {
  return <PixelSprite frame="sad" scale={scale} primaryColor={primaryColor} style={style} />;
}
