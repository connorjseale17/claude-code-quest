import { useEffect } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { TerminalFrame, Cursor } from './TerminalFrame';
import { BotIdle } from './PixelSprite';

export function InstructionsScreen() {
  const { player } = useGame();
  const dispatch = useGameDispatch();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dispatch({ type: 'ADVANCE_PHASE' });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [dispatch]);

  return (
    <TerminalFrame title="how-to-play">
      <div className="flex h-full" style={{ padding: 32 }}>
        <div
          className="flex flex-col justify-between flex-1"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <div>
            <div style={{ color: '#7D7D7D', fontSize: 12, marginBottom: 8 }}>
              $ ./play --help
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 28, letterSpacing: '0.02em' }}>
              <span style={{ color: '#E8633D' }}>{'>'}</span>
              <span style={{ color: '#E8E8E8' }}> HOW TO PLAY</span>
            </div>

            <Section title="CONTROLS">
              <span style={{ color: '#E8E8E8' }}>WASD</span>
              <span style={{ color: '#7D7D7D' }}> or </span>
              <span style={{ color: '#E8E8E8' }}>Arrow keys</span>
              <span style={{ color: '#7D7D7D' }}> to move</span>
              <br />
              <span style={{ color: '#E8E8E8' }}>Space</span>
              <span style={{ color: '#7D7D7D' }}> or </span>
              <span style={{ color: '#E8E8E8' }}>Enter</span>
              <span style={{ color: '#7D7D7D' }}> to interact</span>
            </Section>

            <Section title="OBJECTIVE">
              <span style={{ color: '#7D7D7D' }}>
                Find the glowing terminal → answer the challenge → collect the key → unlock the door → proceed
              </span>
            </Section>

            <Section title="LEVELS">
              <LevelRow num="01" name="Welcome" subtitle="Your first prompt" />
              <LevelRow num="02" name="The Claude.md" subtitle="Context is everything" />
              <LevelRow num="03" name="Slash Commands" subtitle="Summon any prompt" />
              <LevelRow num="04" name="MCP Servers" subtitle="Tools without walls" />
              <LevelRow num="05" name="Subagents" subtitle="You are not alone" />
            </Section>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <BotIdle scale={6} primaryColor={player.botColor} />
            <div style={{ color: '#7D7D7D', fontSize: 13 }}>
              <span style={{ color: '#E8633D' }}>{'>'}</span> press{' '}
              <span style={{ color: '#E8E8E8' }}>ENTER</span> or{' '}
              <span style={{ color: '#E8E8E8' }}>SPACE</span> to begin
              <Cursor />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center" style={{ marginLeft: 32 }}>
          <BotIdle scale={8} primaryColor={player.botColor} />
        </div>
      </div>
    </TerminalFrame>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ color: '#E8633D', fontSize: 11, letterSpacing: '0.08em', marginBottom: 6 }}>
        {title}
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.7, paddingLeft: 12 }}>
        {children}
      </div>
    </div>
  );
}

function LevelRow({ num, name, subtitle }: { num: string; name: string; subtitle: string }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 4 }}>
      <span style={{ color: '#3A3A3A', fontSize: 12 }}>{num}</span>
      <span style={{ color: '#E8E8E8', fontSize: 14 }}>{name}</span>
      <span style={{ color: '#7D7D7D', fontSize: 12 }}>— {subtitle}</span>
    </div>
  );
}
