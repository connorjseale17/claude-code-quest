import { useState, useEffect } from 'react';
import { GameProvider, useGame } from './engine/GameContext';
import { useMovement } from './engine/useMovement';
import { DevMenu } from './components/DevMenu';
import { LEVEL_CONFIGS } from './engine/roomConfigs';
import { TerminalFrame } from './components/TerminalFrame';
import { Room } from './components/Room';
import { ChallengeTerminal } from './components/ChallengeTerminal';
import { BossBattle } from './components/BossBattle';
import { LorePanel } from './components/LorePanel';
import { NPCEncounter } from './components/NPCEncounter';
import { PracticeTerminal } from './components/PracticeTerminal';
import { CONTENT } from './content';
import { PauseMenu } from './components/PauseMenu';
import { IntroOverlay } from './components/IntroOverlay';
import { EndScreen } from './components/EndScreen';
import { PromptLine } from './components/PromptLine';
import { BootScreen } from './components/BootScreen';
import { SplashScreen } from './components/SplashScreen';
import { InstructionsScreen } from './components/InstructionsScreen';
import { CustomizeScreen } from './components/CustomizeScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { MobileControls } from './components/MobileControls';
import { RotatePrompt } from './components/RotatePrompt';
import { LayoutEditor } from './components/LayoutEditor';

const BASE_W = 960;
const BASE_H = 640;

function useScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      // Use visualViewport on mobile — it reflects the actually-visible area
      // (e.g. shrinks when iOS Safari's URL bar is showing) and updates
      // smoothly as the URL bar collapses. window.innerHeight lies on iOS.
      const vv = window.visualViewport;
      const w = vv ? vv.width : window.innerWidth;
      const h = vv ? vv.height : window.innerHeight;
      // Mobile: pack tight to the viewport. Desktop: keep breathing room.
      const wPad = isCoarse ? 1.0 : 0.94;
      const hPad = isCoarse ? 1.0 : 0.92;
      const sx = (w * wPad) / BASE_W;
      const sy = (h * hPad) / BASE_H;
      setScale(Math.min(sx, sy));
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    window.visualViewport?.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      window.visualViewport?.removeEventListener('resize', update);
    };
  }, []);
  return scale;
}

function GameScreen({ onDevToggle }: { onDevToggle: () => void }) {
  const state = useGame();
  useMovement();

  const level = LEVEL_CONFIGS[state.currentLevel];
  const title = `level ${String(level.number).padStart(2, '0')} — ${level.title.toLowerCase()}`;

  return (
    <TerminalFrame title={title} onDevToggle={onDevToggle}>
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
          <Room />
          {state.activePanel?.type === 'challenge' && (
            CONTENT[state.currentLevel].battle ? <BossBattle /> : <ChallengeTerminal />
          )}
          {state.activePanel?.type === 'lore' && <LorePanel />}
          {state.activePanel?.type === 'npc' && <NPCEncounter />}
          {state.activePanel?.type === 'practice' && <PracticeTerminal />}
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
  const [devOpen, setDevOpen] = useState(false);
  const [layoutMode, setLayoutMode] = useState(false);
  const toggleDev = () => setDevOpen(v => !v);
  const closeDev = () => setDevOpen(false);

  let screen: React.ReactNode;
  switch (state.gamePhase) {
    case 'boot':
      screen = <BootScreen />;
      break;
    case 'splash':
      screen = <SplashScreen />;
      break;
    case 'instructions':
      screen = <InstructionsScreen />;
      break;
    case 'customize':
      screen = <CustomizeScreen />;
      break;
    case 'loading':
      screen = <LoadingScreen />;
      break;
    case 'gameOver':
      screen = (
        <TerminalFrame title="claude-code-quest --complete" accent onDevToggle={toggleDev}>
          <EndScreen />
        </TerminalFrame>
      );
      break;
    case 'playing':
    default:
      screen = <GameScreen onDevToggle={toggleDev} />;
      break;
  }

  return (
    <div className="h-full w-full relative">
      {screen}
      <DevMenu open={devOpen} onClose={closeDev} onLayoutMode={() => setLayoutMode(true)} />
      {layoutMode && <LayoutEditor onExit={() => setLayoutMode(false)} />}
    </div>
  );
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
      {/* Touch overlay layers — rendered OUTSIDE the scaled canvas so they're
          always real CSS pixels, and only visible on coarse-pointer devices. */}
      <MobileControls />
      <RotatePrompt />
    </GameProvider>
  );
}
