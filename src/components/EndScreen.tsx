import { Cursor } from './TerminalFrame';
import { PixelSprite } from './PixelSprite';
import { useGame } from '../engine/GameContext';
import { LEVEL_CONFIGS, type LevelId } from '../engine/roomConfigs';
import { CONTENT } from '../content';

export function EndScreen() {
  const state = useGame();

  const trophies = (Object.keys(LEVEL_CONFIGS) as LevelId[])
    .sort((a, b) => LEVEL_CONFIGS[a].number - LEVEL_CONFIGS[b].number)
    .map(id => CONTENT[id].practice?.prize)
    .filter((p): p is { id: string; label: string } => Boolean(p));

  const earnedCount = trophies.filter(t => state.prizesUnlocked.includes(t.id)).length;

  // Lessons: every NPC across all levels that has an authored conversation.
  const lessons = (Object.keys(LEVEL_CONFIGS) as LevelId[])
    .sort((a, b) => LEVEL_CONFIGS[a].number - LEVEL_CONFIGS[b].number)
    .flatMap(levelId => {
      const convos = CONTENT[levelId].conversations ?? {};
      return Object.keys(convos).map(npcId => {
        const chamber = Object.values(LEVEL_CONFIGS[levelId].chambers).find(c =>
          c.npcs.some(n => n.id === npcId),
        );
        const npc = chamber?.npcs.find(n => n.id === npcId);
        return { npcId, name: npc?.name ?? npcId };
      });
    });
  const lessonsCompletedCount = lessons.filter(l =>
    state.lessonsCompleted.includes(l.npcId),
  ).length;

  return (
    <div
      className="flex flex-col items-center justify-center h-full gap-6"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        color: '#E8E8E8',
        padding: '24px 0',
      }}
    >
      <PixelSprite frame="victory" scale={6} />

      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.02em' }}>
        <span style={{ color: '#E8633D' }}>{'>'}</span> QUEST COMPLETE
      </div>

      <div style={{ fontSize: 14, lineHeight: 1.6, textAlign: 'center', maxWidth: 520, color: '#7D7D7D' }}>
        You walked the welcome antechamber, the claude.md archives, the slash command registry, the MCP server network, and the subagent briefing room.
        <br />
        <span style={{ color: '#E8E8E8' }}>All five levels cleared.</span>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div
          style={{
            width: 280,
            border: '1px solid #2A2A2A',
            padding: '14px 18px',
            background: '#0F0F0F',
          }}
        >
          <div style={{ color: '#E8633D', fontSize: 11, letterSpacing: '0.12em', marginBottom: 10 }}>
            TROPHIES EARNED · {earnedCount}/{trophies.length}
          </div>
          {trophies.map(t => {
            const earned = state.prizesUnlocked.includes(t.id);
            return (
              <div
                key={t.id}
                style={{
                  fontSize: 12,
                  lineHeight: 1.8,
                  color: earned ? '#E8E8E8' : '#3A3A3A',
                }}
              >
                <span style={{ color: earned ? '#3FB950' : '#3A3A3A', marginRight: 8 }}>
                  [{earned ? 'X' : ' '}]
                </span>
                {t.label}
              </div>
            );
          })}
        </div>

        {lessons.length > 0 && (
          <div
            style={{
              width: 280,
              border: '1px solid #2A2A2A',
              padding: '14px 18px',
              background: '#0F0F0F',
            }}
          >
            <div style={{ color: '#E8633D', fontSize: 11, letterSpacing: '0.12em', marginBottom: 10 }}>
              LESSONS LEARNED · {lessonsCompletedCount}/{lessons.length}
            </div>
            {lessons.map(l => {
              const done = state.lessonsCompleted.includes(l.npcId);
              return (
                <div
                  key={l.npcId}
                  style={{
                    fontSize: 12,
                    lineHeight: 1.8,
                    color: done ? '#E8E8E8' : '#3A3A3A',
                  }}
                >
                  <span style={{ color: done ? '#3FB950' : '#3A3A3A', marginRight: 8 }}>
                    [{done ? 'X' : ' '}]
                  </span>
                  {l.name}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div style={{ color: '#7D7D7D', fontSize: 13, textAlign: 'center' }}>
        <span style={{ color: '#E8633D' }}>{'>'}</span> built entirely with claude code · thanks for playing
        <Cursor />
      </div>
    </div>
  );
}
