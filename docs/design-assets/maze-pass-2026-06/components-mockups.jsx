// Component mockups — 8 isolated component states from the design brief.

// Reusable: a typewriter-styled line.
const promptMono = {
  fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace",
  color: '#E8E8E8',
  fontSize: 16,
  lineHeight: 1.5,
};

// 1. TERMINAL DISPLAY (scenario + prompt, streaming)
function CompTerminalDisplay() {
  return (
    <TerminalFrame title="comp.01 — terminal display">
      <ComponentLabel n="01" name="TERMINAL DISPLAY" desc="Scenario text streams in at 30–50ms / char. Cursor pulses at the end of the stream." />
      <div style={{ ...promptMono, marginTop: 28 }}>
        <div style={{ color: '#7D7D7D', fontSize: 13 }}>LEVEL 3 · PLAN BEFORE YOU CODE</div>
        <div style={{ marginTop: 18 }}>
          You hand Claude a tangled 400-line auth file and say <span style={{ color: '#E8633D' }}>"refactor this."</span>
          It tears in immediately, deleting two helpers it doesn't understand.
        </div>
        <div style={{ marginTop: 18 }}>
          What do you do next?<Cursor />
        </div>
      </div>
    </TerminalFrame>
  );
}

function ComponentLabel({ n, name, desc }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, paddingBottom: 14, borderBottom: '1px solid #2A2A2A' }}>
      <div style={{ color: '#E8633D', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em' }}>{n}</div>
      <div style={{ color: '#E8E8E8', fontSize: 14, fontWeight: 600, letterSpacing: '0.04em' }}>{name}</div>
      <div style={{ color: '#7D7D7D', fontSize: 12, flex: 1 }}>{desc}</div>
    </div>
  );
}

// 2. CHOICE BUTTONS — show all 4 states at once.
function CompChoiceButtons() {
  const items = [
    { state: 'default', text: '1. Let it keep going. Trust the model.' },
    { state: 'hover',   text: '2. Stop it. Ask for a plan first.' },
    { state: 'correct', text: '3. Undo the diff and rewrite the prompt.' },
    { state: 'wrong',   text: '4. Close the laptop. Walk away.' },
  ];
  const styleFor = s => {
    if (s === 'hover')   return { color: '#E8633D', marker: '>', tail: '' };
    if (s === 'correct') return { color: '#3FB950', marker: '>', tail: ' ✓' };
    if (s === 'wrong')   return { color: '#F85149', marker: '>', tail: ' ✗' };
    return { color: '#7D7D7D', marker: ' ', tail: '' };
  };
  return (
    <TerminalFrame title="comp.02 — choices">
      <ComponentLabel n="02" name="CHOICE BUTTONS" desc="Numbered list. Hover ⇒ orange + > indicator. Click ⇒ green ✓ or red ✗." />
      <div style={{ ...promptMono, marginTop: 28, fontSize: 15, lineHeight: 2 }}>
        {items.map((it, i) => {
          const s = styleFor(it.state);
          return (
            <div key={i} style={{ display: 'flex', gap: 12, color: s.color }}>
              <span style={{ width: 14, color: s.color }}>{s.marker}</span>
              <span style={{ flex: 1 }}>{it.text}{s.tail}</span>
              <span style={{ color: '#3A3A3A', fontSize: 11, alignSelf: 'center' }}>{it.state.toUpperCase()}</span>
            </div>
          );
        })}
      </div>
    </TerminalFrame>
  );
}

// 3. INPUT FIELD
function CompInputField() {
  return (
    <TerminalFrame title="comp.03 — input">
      <ComponentLabel n="03" name="INPUT FIELD" desc="Typed answer. Wrong → red + shake + reset. Right → green + advance." />
      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Field state="empty" />
        <Field state="typing" text="claude.md" />
        <Field state="wrong" text="readme.md" />
        <Field state="right" text="CLAUDE.md" />
      </div>
    </TerminalFrame>
  );

  function Field({ state, text = '' }) {
    const color = state === 'wrong' ? '#F85149' : state === 'right' ? '#3FB950' : '#E8E8E8';
    const label = { empty: 'EMPTY', typing: 'TYPING', wrong: 'WRONG ANSWER', right: 'CORRECT' }[state];
    return (
      <div>
        <div style={{ color: '#7D7D7D', fontSize: 11, letterSpacing: '0.08em', marginBottom: 6 }}>{label}</div>
        <div style={{
          ...promptMono, fontSize: 16, padding: '10px 0',
          borderBottom: `1px solid ${state === 'empty' ? '#2A2A2A' : color}`,
          color, display: 'flex', alignItems: 'center', gap: 0,
        }}>
          <span style={{ color: '#E8633D', marginRight: 10 }}>{'>'}</span>
          <span>{text}</span>
          {state !== 'right' && state !== 'wrong' && <Cursor />}
          {state === 'right' && <span style={{ marginLeft: 'auto', color: '#3FB950' }}>✓</span>}
          {state === 'wrong' && <span style={{ marginLeft: 'auto', color: '#F85149' }}>✗ try again</span>}
        </div>
      </div>
    );
  }
}

// 4. FEEDBACK PANEL — pass and fail side-by-side.
function CompFeedback() {
  return (
    <TerminalFrame title="comp.04 — feedback">
      <ComponentLabel n="04" name="FEEDBACK PANEL" desc="Streams in after submit. [PASS] green, [FAIL] red. Ends with continue prompt." />
      <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Panel kind="PASS" color="#3FB950" body={"Nice. You asked for a plan before letting Claude touch anything.\nThat's the move."} />
        <Panel kind="FAIL" color="#F85149" body={"Hm. Letting Claude keep refactoring without a plan is how you end up\nwith ghost helpers and a broken test suite."} />
      </div>
    </TerminalFrame>
  );

  function Panel({ kind, color, body }) {
    return (
      <div style={{ border: `1px solid ${color}33`, padding: 18, background: '#141414' }}>
        <div style={{ ...promptMono, whiteSpace: 'pre-wrap', fontSize: 14 }}>
          <span style={{ color }}>[{kind}]</span>{' '}
          <span>{body.split('\n')[0]}</span>
          <br />
          <span style={{ paddingLeft: 56, color: '#E8E8E8' }}>{body.split('\n')[1]}</span>
        </div>
        <div style={{ marginTop: 18, color: '#7D7D7D', fontSize: 13 }}>
          <span style={{ color: '#E8633D' }}>{'>'}</span> Press <span style={{ color: '#E8E8E8' }}>SPACE</span> to continue<Cursor />
        </div>
      </div>
    );
  }
}

// 5. PROGRESS INDICATOR
function CompProgress() {
  const Bar = ({ filled, total }) => {
    const blocks = Array.from({ length: total }, (_, i) => i < filled);
    return (
      <div style={{ ...promptMono, fontSize: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ color: '#7D7D7D', letterSpacing: '0.08em', fontSize: 13 }}>PROGRESS</span>
        <span style={{ color: '#7D7D7D' }}>[</span>
        <span style={{ display: 'inline-flex', gap: 3 }}>
          {blocks.map((on, i) => (
            <span key={i} style={{
              width: 16, height: 16, background: on ? '#E8633D' : '#2A2A2A',
              display: 'inline-block',
            }} />
          ))}
        </span>
        <span style={{ color: '#7D7D7D' }}>]</span>
        <span style={{ color: '#E8E8E8', marginLeft: 8 }}>{filled}/{total}</span>
      </div>
    );
  };
  return (
    <TerminalFrame title="comp.05 — progress">
      <ComponentLabel n="05" name="PROGRESS INDICATOR" desc="Pixel block bar, filled in bot orange." />
      <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Bar filled={0} total={6} />
        <Bar filled={1} total={6} />
        <Bar filled={3} total={6} />
        <Bar filled={5} total={6} />
        <Bar filled={6} total={6} />
      </div>
    </TerminalFrame>
  );
}

// 6. LEVEL SELECT preview tile (smaller cousin of the full screen)
function CompLevelSelectTile() {
  return (
    <TerminalFrame title="comp.06 — level row">
      <ComponentLabel n="06" name="LEVEL ROW" desc="Six rows total. [COMPLETE] green, [CURRENT] orange, [LOCKED] dim." />
      <div style={{ ...promptMono, marginTop: 28, fontSize: 15, lineHeight: 2.1 }}>
        <Row n="1" name="YOUR FIRST PROMPT"        tag="COMPLETE" color="#3FB950" />
        <Row n="2" name="THE CLAUDE.MD"             tag="COMPLETE" color="#3FB950" />
        <Row n="3" name="PLAN BEFORE YOU CODE"      tag="CURRENT"  color="#E8633D" marker />
        <Row n="4" name="READ BEFORE YOU WRITE"     tag="LOCKED"   color="#3A3A3A" dim />
        <Row n="5" name="WHEN CLAUDE GOES SIDEWAYS" tag="LOCKED"   color="#3A3A3A" dim />
        <Row n="6" name="SKILLS AND SPECIALIZATION" tag="LOCKED"   color="#3A3A3A" dim />
      </div>
    </TerminalFrame>
  );
  function Row({ n, name, tag, color, marker, dim }) {
    return (
      <div style={{ display: 'flex', gap: 16, color: dim ? '#3A3A3A' : '#E8E8E8' }}>
        <span style={{ width: 12, color: '#E8633D' }}>{marker ? '>' : ' '}</span>
        <span style={{ width: 18, color: dim ? '#3A3A3A' : '#7D7D7D' }}>{n}.</span>
        <span style={{ flex: 1, letterSpacing: '0.02em' }}>{name}</span>
        <span style={{ color }}>[{tag}]</span>
      </div>
    );
  }
}

// 7. COMPLETION ASCII (compact)
function CompAsciiArt() {
  return (
    <TerminalFrame title="comp.07 — ascii bot">
      <ComponentLabel n="07" name="ASCII BOT" desc="Completion-screen victory pose, printed line by line." />
      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100% - 60px)' }}>
        <pre style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: '#E8633D', fontSize: 14, lineHeight: 1.0,
          textAlign: 'center', margin: 0,
        }}>
{`        ░     ░         
   ░  ▓▓▓▓▓▓▓▓▓▓  ░    
      ▓▓▓▓▓▓▓▓▓▓       
      ▓██▓▓▓▓██▓       
     ▓▓▓▓▓██▓▓▓▓▓      
     ▓▓▓▓▓▓▓▓▓▓▓▓      
      ▓▓▓▓▓▓▓▓▓▓       
      ▓▓  ▓▓  ▓▓       
      ▓▓  ▓▓  ▓▓       

   ─── the council of vibes is pleased ───`}
        </pre>
      </div>
    </TerminalFrame>
  );
}

// 8. PROMPT LINE FOOTER (with cursor variants)
function CompPromptLine() {
  return (
    <TerminalFrame title="comp.08 — prompt line">
      <ComponentLabel n="08" name="PROMPT LINE" desc="Persistent footer. Shows current action / required input." />
      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Line label="IDLE WAITING">
          <span style={{ color: '#E8633D' }}>{'>'}</span>&nbsp;<Cursor />
        </Line>
        <Line label="AWAITING CHOICE">
          <span style={{ color: '#E8633D' }}>{'>'}</span>&nbsp;<span style={{ color: '#7D7D7D' }}>select 1–4</span>&nbsp;<Cursor />
        </Line>
        <Line label="STREAMING">
          <span style={{ color: '#E8633D' }}>{'>'}</span>&nbsp;<span>printing scenario</span>&nbsp;<Cursor char="▮" />
        </Line>
        <Line label="CONTINUE">
          <span style={{ color: '#E8633D' }}>{'>'}</span>&nbsp;Press <span style={{ color: '#E8E8E8' }}>SPACE</span> to continue
        </Line>
        <Line label="LEVEL CLEAR">
          <span style={{ color: '#3FB950' }}>{'>'}</span>&nbsp;[PASS]&nbsp;loading level 4<Cursor />
        </Line>
      </div>
    </TerminalFrame>
  );
  function Line({ label, children }) {
    return (
      <div>
        <div style={{ color: '#7D7D7D', fontSize: 11, letterSpacing: '0.08em', marginBottom: 6 }}>{label}</div>
        <div style={{ ...promptMono, fontSize: 16, padding: '10px 14px', background: '#141414', border: '1px solid #2A2A2A' }}>
          {children}
        </div>
      </div>
    );
  }
}

Object.assign(window, {
  CompTerminalDisplay, CompChoiceButtons, CompInputField, CompFeedback,
  CompProgress, CompLevelSelectTile, CompAsciiArt, CompPromptLine,
});
