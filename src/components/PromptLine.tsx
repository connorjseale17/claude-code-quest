import { useGame } from '../engine/GameContext';
import { LEVEL_CONFIGS } from '../engine/roomConfigs';
import { Cursor } from './TerminalFrame';

export function PromptLine() {
  const state = useGame();
  const level = LEVEL_CONFIGS[state.currentLevel];
  const chamber = level.chambers[state.currentChamber];
  const levelState = state.levels[state.currentLevel];
  const accent = level.theme.accentColor;

  const numLabel = `lvl:${String(level.number).padStart(2, '0')}`;
  const chamberLabel = chamber.name.toLowerCase().replace(/\s+/g, '-');

  let promptColor = accent;
  let promptText = 'explore the chamber';

  if (state.activePanel?.type === 'challenge') {
    promptText = 'answer the challenge';
  } else if (state.activePanel?.type === 'lore') {
    promptText = 'reading...';
  } else if (state.activePanel?.type === 'npc') {
    promptText = 'listening...';
  } else if (levelState.challengePassed && !levelState.keyCollected && chamber.id === level.challengeChamber) {
    promptColor = '#3FB950';
    promptText = 'collect the key';
  } else if (levelState.keyCollected) {
    promptColor = '#3FB950';
    promptText = 'door unlocked — proceed →';
  } else if (state.showIntro) {
    promptText = 'WASD to move · SPACE to interact';
  }

  // Lore counter: aggregated across all chambers in current level
  const levelChambers = Object.values(level.chambers);
  const totalLore = levelChambers.reduce(
    (sum, c) => sum + c.items.filter(i => i.type === 'lore').length,
    0,
  );
  const seenLore = levelChambers.reduce(
    (sum, c) => sum + (state.chambers[c.id]?.loreSeen.length ?? 0),
    0,
  );

  const promptLabel = state.player.name
    ? `${state.player.name}@${numLabel}·${chamberLabel}`
    : `${numLabel}·${chamberLabel}`;

  return (
    <div
      className="flex items-center gap-3"
      style={{
        padding: '12px 22px',
        borderTop: '1px solid #2A2A2A',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
      }}
    >
      <span style={{ color: '#7D7D7D' }}>{promptLabel}</span>
      <span style={{ color: promptColor }}>{'>'}</span>
      <span style={{ color: '#E8E8E8' }}>{promptText}</span>
      <Cursor />
      <div style={{ flex: 1 }} />
      {totalLore > 0 && (
        <span style={{ color: '#7D7D7D' }}>
          fragments:{' '}
          <span style={{ color: seenLore === totalLore ? '#3FB950' : accent }}>
            {seenLore}/{totalLore}
          </span>
        </span>
      )}
    </div>
  );
}
