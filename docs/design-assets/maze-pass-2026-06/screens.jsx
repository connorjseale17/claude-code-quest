// Full screen mockups — landing, level select, gameplay (4 states), completion.

const screenMono = {
  fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace",
  color: '#E8E8E8',
};

// ---------- LANDING ----------
function ScreenLanding() {
  return (
    <TerminalFrame title="claude-code-quest --v1.0" accent>
      <div style={{ ...screenMono, height: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{ color: '#7D7D7D', fontSize: 13, lineHeight: 1.6 }}>
            Last login: tue may 13 16:56:48 on console
          </div>
          <div style={{ color: '#7D7D7D', fontSize: 13, marginTop: 4 }}>
            ~/claude-code-quest
          </div>
          <div style={{ marginTop: 28, lineHeight: 1.5, fontSize: 16 }}>
            <div><span style={{ color: '#E8633D' }}>{'>'}</span> Welcome to Claude Code Quest.</div>
            <div><span style={{ color: '#E8633D' }}>{'>'}</span> A game about the tool that built it.</div>
            <div><span style={{ color: '#E8633D' }}>{'>'}</span></div>
            <div><span style={{ color: '#E8633D' }}>{'>'}</span> Six levels. One bot. Don't let the model touch the codebase</div>
            <div><span style={{ color: '#7D7D7D' }}>&nbsp;&nbsp;&nbsp;</span>&nbsp;without a plan.</div>
          </div>
          <div style={{ marginTop: 44, display: 'inline-flex', alignItems: 'center', gap: 12, padding: '14px 22px', border: '1px solid #E8633D', color: '#E8633D', fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
            <span>{'>'}</span> PRESS ENTER TO START <Cursor />
          </div>
          <div style={{ marginTop: 24, color: '#3A3A3A', fontSize: 12, letterSpacing: '0.04em' }}>
            v1.0 · desktop only · dark forever
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <BotIdle scale={14} />
          <div style={{ color: '#7D7D7D', fontSize: 11, letterSpacing: '0.08em' }}>~/bot</div>
        </div>
      </div>
    </TerminalFrame>
  );
}

// ---------- LEVEL SELECT ----------
function ScreenLevelSelect() {
  const levels = [
    { n: '1', name: 'YOUR FIRST PROMPT',         tag: 'COMPLETE' },
    { n: '2', name: 'THE CLAUDE.MD',              tag: 'COMPLETE' },
    { n: '3', name: 'PLAN BEFORE YOU CODE',       tag: 'CURRENT'  },
    { n: '4', name: 'READ BEFORE YOU WRITE',      tag: 'LOCKED'   },
    { n: '5', name: 'WHEN CLAUDE GOES SIDEWAYS',  tag: 'LOCKED'   },
    { n: '6', name: 'SKILLS AND SPECIALIZATION',  tag: 'LOCKED'   },
  ];
  const tagColor = t => t === 'COMPLETE' ? '#3FB950' : t === 'CURRENT' ? '#E8633D' : '#3A3A3A';
  return (
    <TerminalFrame title="select-level">
      <div style={{ ...screenMono, height: '100%', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#7D7D7D', fontSize: 13 }}>$ ./play --select</div>
          <div style={{ fontSize: 32, fontWeight: 700, marginTop: 12, letterSpacing: '0.02em' }}>
            <span style={{ color: '#E8633D' }}>{'>'}</span> SELECT LEVEL
          </div>
          <div style={{ color: '#7D7D7D', fontSize: 13, marginTop: 8 }}>2 / 6 complete · resume mid-quest or replay from any cleared level</div>
          <div style={{ marginTop: 32, fontSize: 16, lineHeight: 2.0 }}>
            {levels.map(l => {
              const isCurrent = l.tag === 'CURRENT';
              const isLocked = l.tag === 'LOCKED';
              return (
                <div key={l.n} style={{ display: 'flex', gap: 16, color: isLocked ? '#3A3A3A' : '#E8E8E8' }}>
                  <span style={{ width: 14, color: '#E8633D' }}>{isCurrent ? '>' : ' '}</span>
                  <span style={{ width: 22, color: isLocked ? '#3A3A3A' : '#7D7D7D' }}>{l.n}.</span>
                  <span style={{ flex: 1, letterSpacing: '0.02em' }}>{l.name}</span>
                  <span style={{ color: tagColor(l.tag) }}>[{l.tag}]</span>
                </div>
              );
            })}
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: 16, color: '#7D7D7D', fontSize: 13 }}>
            <span style={{ color: '#E8633D' }}>{'>'}</span> use <span style={{ color: '#E8E8E8' }}>↑↓</span> or <span style={{ color: '#E8E8E8' }}>1–6</span> · enter to launch <Cursor />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 10, paddingBottom: 30 }}>
          <BotIdle scale={9} />
          <div style={{ color: '#7D7D7D', fontSize: 11, letterSpacing: '0.08em' }}>idle.gif</div>
        </div>
      </div>
    </TerminalFrame>
  );
}

// ---------- GAMEPLAY (shared chrome with state variation) ----------
function GameplayShell({ state }) {
  // state: 'streaming' | 'hover' | 'pass' | 'fail'
  const choices = [
    'Let it keep going. Trust the model.',
    "Stop it. Ask for a plan first, then resume.",
    'Undo the diff and rewrite the prompt.',
    'Close the laptop. Walk away.',
  ];

  const selected = state === 'pass' ? 1 : state === 'fail' ? 0 : null;
  const hovered = state === 'hover' ? 1 : null;
  const isStreaming = state === 'streaming';

  const choiceStyle = (i) => {
    if (selected === i && state === 'pass')  return { color: '#3FB950', marker: '>' };
    if (selected === i && state === 'fail')  return { color: '#F85149', marker: '>' };
    if (hovered === i)                       return { color: '#E8633D', marker: '>' };
    if (selected !== null && i !== selected) return { color: '#3A3A3A', marker: ' ' };
    return { color: '#7D7D7D', marker: ' ' };
  };
  const choiceTail = (i) => {
    if (selected === i && state === 'pass')  return ' ✓';
    if (selected === i && state === 'fail')  return ' ✗';
    return '';
  };

  return (
    <TerminalFrame title="level 03 — plan before you code">
      <div style={{ ...screenMono, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar: progress + level meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, paddingBottom: 16, borderBottom: '1px solid #2A2A2A' }}>
          <div style={{ color: '#7D7D7D', fontSize: 11, letterSpacing: '0.08em' }}>LEVEL 03 / 06</div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <span style={{ color: '#7D7D7D', letterSpacing: '0.08em' }}>PROGRESS</span>
            <span style={{ color: '#7D7D7D' }}>[</span>
            <span style={{ display: 'inline-flex', gap: 2 }}>
              {[0,1,2,3,4,5].map(i => (
                <span key={i} style={{ width: 14, height: 14, background: i < 2 ? '#E8633D' : i === 2 ? (state === 'pass' ? '#E8633D' : '#2A2A2A') : '#2A2A2A' }} />
              ))}
            </span>
            <span style={{ color: '#7D7D7D' }}>]</span>
            <span style={{ color: '#E8E8E8' }}>{state === 'pass' ? '3' : '2'}/6</span>
          </div>
          <div style={{ color: '#7D7D7D', fontSize: 11, letterSpacing: '0.08em' }}>02:14</div>
        </div>

        {/* Body: scenario left, bot right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px', gap: 36, paddingTop: 24, flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ color: '#E8E8E8', fontSize: 24, fontWeight: 700, letterSpacing: '0.02em' }}>
              <span style={{ color: '#E8633D' }}>{'>'}</span> PLAN BEFORE YOU CODE
            </div>
            <div style={{ marginTop: 18, fontSize: 16, lineHeight: 1.5, color: '#E8E8E8', maxWidth: 620 }}>
              You hand Claude a tangled 400-line auth file and say <span style={{ color: '#E8633D' }}>"refactor this."</span>{' '}
              It tears in immediately, deleting two helpers it doesn't understand.{' '}
              {isStreaming
                ? <>The diff is g<Cursor /></>
                : <>The diff is growing. What's your next move?</>
              }
            </div>

            {/* Choices */}
            {!isStreaming && (
              <div style={{ marginTop: 28, fontSize: 15, lineHeight: 2.0 }}>
                {choices.map((c, i) => {
                  const s = choiceStyle(i);
                  return (
                    <div key={i} style={{ display: 'flex', gap: 12, color: s.color }}>
                      <span style={{ width: 14, color: s.color }}>{s.marker}</span>
                      <span style={{ width: 22 }}>{i + 1}.</span>
                      <span style={{ flex: 1 }}>{c}{choiceTail(i)}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Feedback */}
            {state === 'pass' && (
              <div style={{ marginTop: 28, padding: '16px 18px', border: '1px solid #3FB95033', background: '#0F1A12' }}>
                <div style={{ fontSize: 14, lineHeight: 1.5 }}>
                  <span style={{ color: '#3FB950' }}>[PASS]</span>{' '}
                  <span>Nice. You asked for a plan before letting Claude touch anything.</span>
                  <div style={{ paddingLeft: 56 }}>That's the move.</div>
                </div>
              </div>
            )}
            {state === 'fail' && (
              <div style={{ marginTop: 28, padding: '16px 18px', border: '1px solid #F8514933', background: '#1A0F0F' }}>
                <div style={{ fontSize: 14, lineHeight: 1.5 }}>
                  <span style={{ color: '#F85149' }}>[FAIL]</span>{' '}
                  <span>Letting Claude keep going without a plan is how you end up</span>
                  <div style={{ paddingLeft: 56 }}>with ghost helpers and a broken test suite. Retry.</div>
                </div>
              </div>
            )}
          </div>

          {/* Bot column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
            {state === 'pass'  && <BotHappy scale={6} />}
            {state === 'fail'  && <BotSad scale={6} />}
            {state === 'hover' && <BotThinking scale={6} />}
            {state === 'streaming' && <BotIdle scale={6} />}
            <div style={{ color: '#7D7D7D', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {state === 'pass' ? 'happy.png' : state === 'fail' ? 'sad.png' : state === 'hover' ? 'thinking.png' : 'idle.gif'}
            </div>
          </div>
        </div>

        {/* Prompt footer */}
        <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: 14, color: '#7D7D7D', fontSize: 13 }}>
          {state === 'streaming' && <><span style={{ color: '#E8633D' }}>{'>'}</span> printing scenario <Cursor /></>}
          {state === 'hover'     && <><span style={{ color: '#E8633D' }}>{'>'}</span> select 1–4 <Cursor /></>}
          {state === 'pass'      && <><span style={{ color: '#3FB950' }}>{'>'}</span> Press <span style={{ color: '#E8E8E8' }}>SPACE</span> to continue<Cursor /></>}
          {state === 'fail'      && <><span style={{ color: '#F85149' }}>{'>'}</span> Press <span style={{ color: '#E8E8E8' }}>R</span> to retry<Cursor /></>}
        </div>
      </div>
    </TerminalFrame>
  );
}

const ScreenGameStreaming = () => <GameplayShell state="streaming" />;
const ScreenGameHover     = () => <GameplayShell state="hover" />;
const ScreenGamePass      = () => <GameplayShell state="pass" />;
const ScreenGameFail      = () => <GameplayShell state="fail" />;

// ---------- COMPLETION ----------
function ScreenCompletion() {
  return (
    <TerminalFrame title="claude-code-quest --complete" accent>
      <div style={{ ...screenMono, height: '100%', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 48, alignItems: 'center' }}>
        <pre style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: '#E8633D', fontSize: 13, lineHeight: 1.0, margin: 0,
        }}>
{`    ░       ░    
░ ▓▓▓▓▓▓▓▓▓▓ ░
  ▓▓▓▓▓▓▓▓▓▓  
  ▓██▓▓▓▓██▓  
 ▓▓▓▓██▓▓▓▓▓▓ 
 ▓▓▓▓▓▓▓▓▓▓▓▓ 
  ▓▓▓▓▓▓▓▓▓▓  
  ▓▓  ▓▓  ▓▓  
  ▓▓  ▓▓  ▓▓  `}
        </pre>
        <div>
          <div style={{ color: '#7D7D7D', fontSize: 13 }}>$ ./play --finish</div>
          <div style={{ fontSize: 32, fontWeight: 700, marginTop: 12, letterSpacing: '0.02em' }}>
            <span style={{ color: '#E8633D' }}>{'>'}</span> GAME COMPLETE
          </div>
          <div style={{ marginTop: 28, fontSize: 16, lineHeight: 1.9 }}>
            <Stat label="Levels mastered" value="6/6" valColor="#3FB950" />
            <Stat label="Time"             value="14m 23s" />
            <Stat label="First-try passes" value="4/6" />
            <Stat label="Plans requested"  value="11" />
          </div>
          <div style={{ marginTop: 28, color: '#E8E8E8', fontSize: 16, lineHeight: 1.5 }}>
            The Council of Vibes is pleased.
          </div>
          <div style={{ marginTop: 28, color: '#7D7D7D', fontSize: 13 }}>
            <span style={{ color: '#E8633D' }}>{'>'}</span> Press <span style={{ color: '#E8E8E8' }}>R</span> to replay,
            or close this window to return to your IDE.<Cursor />
          </div>
        </div>
      </div>
    </TerminalFrame>
  );
  function Stat({ label, value, valColor = '#E8E8E8' }) {
    return (
      <div style={{ display: 'flex', gap: 20 }}>
        <span style={{ color: '#7D7D7D', width: 200 }}>{label}</span>
        <span style={{ color: valColor }}>{value}</span>
      </div>
    );
  }
}

Object.assign(window, {
  ScreenLanding, ScreenLevelSelect,
  ScreenGameStreaming, ScreenGameHover, ScreenGamePass, ScreenGameFail,
  ScreenCompletion,
});
