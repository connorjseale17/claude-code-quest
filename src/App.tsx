import { useState, useEffect } from 'react';
import { GameProvider, useGame } from './engine/GameContext';
import { useMovement } from './engine/useMovement';
import { LEVEL_CONFIGS } from './engine/roomConfigs';
import { TerminalFrame } from './components/TerminalFrame';
import { Room } from './components/Room';
import { ChallengePanel } from './components/ChallengePanel';
import { LorePanel } from './components/LorePanel';
import { NPCDialog } from './components/NPCDialog';
import { PauseMenu } from './components/PauseMenu';
import { IntroOverlay } from './components/IntroOverlay';
import { EndScreen } from './components/EndScreen';
import { PromptLine } from './components/PromptLine';
import { BootScreen } from './components/BootScreen';
import { SplashScreen } from './components/SplashScreen';
import { InstructionsScreen } from './components/InstructionsScreen';
import { CustomizeScreen } from './components/CustomizeScreen';
import { LoadingScreen } from './components/LoadingScreen';

const BASE_W = 960;
const BASE_H = 640;

function useScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => {
      const sx = (window.innerWidth * 0.94) / BASE_W;
      const sy = (window.innerHeight * 0.92) / BASE_H;
      setScale(Math.min(sx, sy));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return scale;
}

function GameScreen() {
  const state = useGame();
  useMovement();

  const level = LEVEL_CONFIGS[state.currentLevel];
  const title = `level ${String(level.number).padStart(2, '0')} — ${level.title.toLowerCase()}`;

  return (
    <TerminalFrame title={title}>
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
          <Room />
          {state.activePanel?.type === 'challenge' && <ChallengePanel />}
          {state.activePanel?.type === 'lore' && <LorePanel />}
          {state.activePanel?.type === 'npc' && <NPCDialog />}
          <IntroOverlay />
          <PauseMenu />
        </div>
        <PromptLine />
      </div>
    </TerminalFrame>
  );
}

function PhaseRouter() {
  const state = useGame();

  switch (state.gamePhase) {
    case 'boot':
      return <BootScreen />;
    case 'splash':
      return <SplashScreen />;
    case 'instructions':
      return <InstructionsScreen />;
    case 'customize':
      return <CustomizeScreen />;
    case 'loading':
      return <LoadingScreen />;
    case 'gameOver':
      return (
        <TerminalFrame title="claude-code-quest --complete" accent>
          <EndScreen />
        </TerminalFrame>
      );
    case 'playing':
    default:
      return <GameScreen />;
  }
}

export default function App() {
  const scale = useScale();

  return (
    <GameProvider>
      <div className="h-full flex items-center justify-center overflow-hidden">
        <div
          style={{
            width: BASE_W,
            height: BASE_H,
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          <PhaseRouter />
        </div>
      </div>
    </GameProvider>
  );
}
