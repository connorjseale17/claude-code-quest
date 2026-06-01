// Main entry — wires the design canvas together.
const { DesignCanvas, DCSection, DCArtboard } = window;

function App() {
  return (
    <DesignCanvas>
      <DCSection id="foundations" title="01 · Foundations">
        <DCArtboard id="palette"    label="palette.css"   width={760} height={620}>
          <ColorsArtboard />
        </DCArtboard>
        <DCArtboard id="type"       label="type.spec"     width={760} height={620}>
          <TypographyArtboard />
        </DCArtboard>
        <DCArtboard id="sprites"    label="sprite-sheet"  width={920} height={620}>
          <SpritesArtboard />
        </DCArtboard>
      </DCSection>

      <DCSection id="screens" title="02 · Screens">
        <DCArtboard id="landing"      label="01 — landing"              width={960} height={600}>
          <ScreenLanding />
        </DCArtboard>
        <DCArtboard id="level-select" label="02 — level select"         width={960} height={600}>
          <ScreenLevelSelect />
        </DCArtboard>
        <DCArtboard id="game-stream"  label="03a — gameplay: streaming" width={960} height={600}>
          <ScreenGameStreaming />
        </DCArtboard>
        <DCArtboard id="game-hover"   label="03b — gameplay: hover"     width={960} height={600}>
          <ScreenGameHover />
        </DCArtboard>
        <DCArtboard id="game-pass"    label="03c — gameplay: pass"      width={960} height={600}>
          <ScreenGamePass />
        </DCArtboard>
        <DCArtboard id="game-fail"    label="03d — gameplay: fail"      width={960} height={600}>
          <ScreenGameFail />
        </DCArtboard>
        <DCArtboard id="completion"   label="04 — completion"           width={960} height={600}>
          <ScreenCompletion />
        </DCArtboard>
      </DCSection>

      <DCSection id="components" title="03 · Components (1–8)">
        <DCArtboard id="c-terminal" label="01 — terminal display"  width={620} height={460}>
          <CompTerminalDisplay />
        </DCArtboard>
        <DCArtboard id="c-choices"  label="02 — choice buttons"    width={620} height={460}>
          <CompChoiceButtons />
        </DCArtboard>
        <DCArtboard id="c-input"    label="03 — input field"       width={620} height={460}>
          <CompInputField />
        </DCArtboard>
        <DCArtboard id="c-feedback" label="04 — feedback panel"    width={760} height={460}>
          <CompFeedback />
        </DCArtboard>
        <DCArtboard id="c-progress" label="05 — progress"          width={620} height={460}>
          <CompProgress />
        </DCArtboard>
        <DCArtboard id="c-levelrow" label="06 — level rows"        width={620} height={460}>
          <CompLevelSelectTile />
        </DCArtboard>
        <DCArtboard id="c-ascii"    label="07 — ascii bot"         width={620} height={460}>
          <CompAsciiArt />
        </DCArtboard>
        <DCArtboard id="c-prompt"   label="08 — prompt line"       width={620} height={460}>
          <CompPromptLine />
        </DCArtboard>
      </DCSection>
      <DCSection id="map" title="04 · Map & Rooms">
        <DCArtboard id="map-overview"     label="01 — full map (6 rooms)"        width={960} height={620}>
          <MapOverviewArtboard />
        </DCArtboard>
        <DCArtboard id="room-locked"      label="02 — room closeup (locked)"     width={960} height={620}>
          <RoomCloseupLockedArtboard />
        </DCArtboard>
        <DCArtboard id="room-unlocked"    label="03 — room closeup (after pass)" width={960} height={620}>
          <RoomCloseupUnlockedArtboard />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
