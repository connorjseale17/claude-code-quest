import { PixelSprite } from './PixelSprite';

interface HPBarProps {
  current: number;
  max: number;
  accent: string;
  align: 'left' | 'right';
  label?: string;
}

export function HPBar({ current, max, accent, align, label }: HPBarProps) {
  const hearts = Array.from({ length: max }, (_, i) => i < current);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'left' ? 'flex-start' : 'flex-end',
        gap: 4,
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {label && (
        <div style={{ fontSize: 11, color: '#7D7D7D', letterSpacing: '0.12em' }}>
          {label.toUpperCase()}
        </div>
      )}
      <div style={{ display: 'flex', gap: 4, flexDirection: align === 'left' ? 'row' : 'row-reverse' }}>
        {hearts.map((alive, i) => (
          <PixelSprite
            key={i}
            frame="heart"
            scale={2}
            primaryColor={alive ? accent : '#2A2A2A'}
            style={{ opacity: alive ? 1 : 0.35 }}
          />
        ))}
      </div>
      <div style={{ fontSize: 10, color: '#5A5A5A' }}>
        {current}/{max}
      </div>
    </div>
  );
}
