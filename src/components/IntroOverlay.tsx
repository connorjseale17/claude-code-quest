import { useGame } from '../engine/GameContext';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { CONTENT } from '../content';
import { Cursor } from './TerminalFrame';

export function IntroOverlay() {
  const state = useGame();
  if (!state.showIntro) return null;

  const level = LEVEL_CONFIGS[state.currentLevel];
  const content = CONTENT[state.currentLevel];
  if (!content) return null;

  // Only show the intro overlay in the starting chamber of a level
  if (state.currentChamber !== level.startingChamber) return null;

  const text = content.intro.replace('operator', state.player.name || 'operator');

  return (
    <div
      className="absolute bottom-4 left-1/2 z-20"
      style={{
        transform: 'translateX(-50%)',
        background: '#1A1A1A',
        border: `1px solid ${level.theme.accentColor}`,
        padding: '14px 24px',
        maxWidth: 600,
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      <div style={{ fontSize: 14, lineHeight: 1.5, color: '#E8E8E8' }}>
        <span style={{ color: level.theme.accentColor }}>{'>'}</span> {text}
        <Cursor />
      </div>
    </div>
  );
}
