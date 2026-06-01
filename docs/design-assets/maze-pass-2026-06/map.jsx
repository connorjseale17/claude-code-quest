// Claude Code Quest — MAP section.
// 3 deliverables:
//   1. Full Map Overview — 6 rooms snaking through a 16:9 viewport, corridors, bot in R1
//   2. Single-Room Closeup — gameplay view (locked door, challenge anchor, items)
//   3. Single-Room Closeup (after-pass) — same room, unlocked

const MAP_PALETTE = {
  orange:     '#E8633D',
  darkOrange: '#B84A28',
  void:       '#1A1A1A',
  floor:      '#3A3A3A',
  floorDot:   '#3FB950',
  text:       '#E8E8E8',
  muted:      '#7D7D7D',
  pass:       '#3FB950',
};

// ============================================================================
// PRIMITIVES
// ============================================================================

// 1 design-tile = TILE css px. Everything snaps to this grid.
const TILE = 4;

// Crisp pixel rect.
const PRect = ({ x, y, w, h, fill, opacity = 1 }) => (
  <rect
    x={x * TILE} y={y * TILE} width={w * TILE} height={h * TILE}
    fill={fill} opacity={opacity} shapeRendering="crispEdges"
  />
);

// Green dot floor pattern inside a rect. Dots spaced every N tiles.
function FloorDots({ x, y, w, h, spacing = 5, offset = 2 }) {
  const dots = [];
  for (let dx = offset; dx < w - 1; dx += spacing) {
    for (let dy = offset; dy < h - 1; dy += spacing) {
      dots.push(
        <PRect key={`${dx}-${dy}`} x={x + dx} y={y + dy} w={1} h={1}
               fill={MAP_PALETTE.floorDot} opacity={0.55} />
      );
    }
  }
  return <g>{dots}</g>;
}

// Orange-bordered, dark-gray-filled room.
function Room({ x, y, w, h, dotSpacing = 5 }) {
  return (
    <g>
      <PRect x={x} y={y} w={w} h={h} fill={MAP_PALETTE.orange} />
      <PRect x={x + 1} y={y + 1} w={w - 2} h={h - 2} fill={MAP_PALETTE.floor} />
      <FloorDots x={x + 1} y={y + 1} w={w - 2} h={h - 2} spacing={dotSpacing} />
    </g>
  );
}

// Corridor segment (horizontal or vertical). 3 tiles thick (1 border + 1 floor + 1 border).
function CorridorSeg({ x, y, w, h }) {
  return (
    <g>
      <PRect x={x} y={y} w={w} h={h} fill={MAP_PALETTE.orange} />
      <PRect x={x + 1} y={y + 1} w={w - 2} h={h - 2} fill={MAP_PALETTE.floor} />
    </g>
  );
}

// Punch a doorway through a room/corridor wall — fills the border tiles with
// floor color so the corridor connects through.
function Doorway({ x, y, w, h }) {
  return <PRect x={x} y={y} w={w} h={h} fill={MAP_PALETTE.floor} />;
}

// Tiny lock icon (orange). 3x4 tile footprint.
function LockIcon({ x, y, color = MAP_PALETTE.orange }) {
  // Shackle on top (3 wide, 1 tall) + body (3 wide, 2 tall) with keyhole
  return (
    <g>
      <PRect x={x + 1} y={y} w={1} h={1} fill={color} />
      <PRect x={x} y={y + 1} w={3} h={1} fill={color} />
      <PRect x={x} y={y + 2} w={3} h={2} fill={color} />
    </g>
  );
}

// Door tile — 4 wide × 3 tall (horizontal wall) by default.
// state: 'locked' | 'unlocked' | 'open'
function Door({ x, y, orient = 'h', state = 'locked' }) {
  const isH = orient === 'h';
  const w = isH ? 4 : 3;
  const h = isH ? 3 : 4;
  const color = state === 'unlocked' ? MAP_PALETTE.pass : MAP_PALETTE.orange;
  return (
    <g>
      {/* door frame */}
      <PRect x={x} y={y} w={w} h={h} fill={color} />
      {/* doorway floor (dark gray) inside the frame */}
      <PRect x={x + 1} y={y + 1} w={w - 2} h={h - 2}
             fill={state === 'unlocked' ? MAP_PALETTE.pass : MAP_PALETTE.floor}
             opacity={state === 'unlocked' ? 0.18 : 1} />
      {/* lock overlay (centered on the door) */}
      {state === 'locked' && (
        <LockIcon x={x + Math.floor((w - 3) / 2)} y={y + Math.floor((h - 4) / 2)} />
      )}
    </g>
  );
}

// Map-scale bot — tiny 8-bit silhouette (4x4 tiles).
// At TILE=4 this renders to 16×16 css px, fitting the 32×32 bot brief at low zoom.
function MapBot({ x, y }) {
  // Compact 4×5 pattern: head row, eyes, body, body, legs
  const O = MAP_PALETTE.orange;
  const K = '#0F0F0F';
  // grid:
  //  .XXXX.
  //  .X.X.X. nah — let's keep it minimal & legible
  // Use 4-wide pattern:
  return (
    <g>
      {/* head (row 0) */}
      <PRect x={x} y={y} w={4} h={1} fill={O} />
      {/* eyes (row 1) */}
      <PRect x={x} y={y + 1} w={1} h={1} fill={O} />
      <PRect x={x + 1} y={y + 1} w={1} h={1} fill={K} />
      <PRect x={x + 2} y={y + 1} w={1} h={1} fill={O} />
      <PRect x={x + 3} y={y + 1} w={1} h={1} fill={K} />
      {/* body (row 2) */}
      <PRect x={x} y={y + 2} w={4} h={1} fill={O} />
      {/* legs (row 3): two pixels with a gap */}
      <PRect x={x} y={y + 3} w={1} h={1} fill={O} />
      <PRect x={x + 2} y={y + 3} w={1} h={1} fill={O} />
    </g>
  );
}

// ============================================================================
// DELIVERABLE 1 — FULL MAP OVERVIEW
// ============================================================================

// Layout (design tiles on a 240×135 grid, TILE=4 → 960×540 css px):
const ROOMS = [
  { id: 1, name: 'YOUR FIRST PROMPT',         x:  8, y: 12, w: 32, h: 22 },
  { id: 2, name: 'THE CLAUDE.MD',             x: 54, y: 12, w: 34, h: 22 },
  { id: 3, name: 'PLAN BEFORE YOU CODE',      x:130, y: 36, w: 38, h: 26 },
  { id: 4, name: 'READ BEFORE YOU WRITE',     x: 18, y: 70, w: 40, h: 24 },
  { id: 5, name: 'WHEN CLAUDE GOES SIDEWAYS', x: 82, y: 72, w: 44, h: 26 },
  { id: 6, name: 'SKILLS AND SPECIALIZATION', x:158, y: 96, w: 70, h: 34 },
];

// Corridor segments + doorway punch-throughs.
// Width = 5 tiles for horizontal corridors, 5 for vertical (3-thick floor + 2-border feels right at this zoom).
const C_THICK = 5;
const CORRIDORS = [
  // R1 → R2 (horizontal, mid y=21)
  { seg: { x: 40, y: 21, w: 14, h: C_THICK } },
  // R2 → R3 (down + right): drop from R2 bottom-center, head right to R3 left
  { seg: { x: 70, y: 34, w: C_THICK, h: 18 } },   // vertical from R2 bottom
  { seg: { x: 70, y: 47, w: 60, h: C_THICK } },   // horizontal into R3 left
  // R3 → R4 (down + left): drop from R3 bottom, cross all the way left
  { seg: { x: 142, y: 62, w: C_THICK, h: 12 } },  // vertical drop
  { seg: { x: 35, y: 70, w:112, h: C_THICK } },   // long horizontal across to R4
  // R4 → R5 (horizontal)
  { seg: { x: 58, y: 82, w: 24, h: C_THICK } },
  // R5 → R6 (down + right)
  { seg: { x:108, y: 98, w: C_THICK, h: 12 } },   // drop
  { seg: { x:108, y:105, w: 50, h: C_THICK } },   // right into R6
];

// Doorway "punch-through" rects — where the corridor meets a room wall, fill
// the wall tile with floor color so it visually opens.
const DOORWAYS = [
  // R1 right wall (corridor at y=21, R1 right edge at x=40)
  { x: 39, y: 22, w: 2, h: C_THICK - 2 },
  // R2 left wall
  { x: 53, y: 22, w: 2, h: C_THICK - 2 },
  // R2 bottom wall (vertical corridor enters from below)
  { x: 71, y: 33, w: C_THICK - 2, h: 2 },
  // R3 left wall (horizontal corridor x=70..130, y=47)
  { x: 129, y: 48, w: 2, h: C_THICK - 2 },
  // R3 bottom wall (vertical corridor x=142)
  { x: 143, y: 61, w: C_THICK - 2, h: 2 },
  // R4 top wall (horizontal corridor at y=70 enters R4 from above at x~35)
  // R4 right wall (horizontal corridor R4→R5 at y=82)
  { x: 57, y: 83, w: 2, h: C_THICK - 2 },
  // R5 left wall
  { x: 81, y: 83, w: 2, h: C_THICK - 2 },
  // R5 bottom wall (vertical at x=108)
  { x: 109, y: 97, w: C_THICK - 2, h: 2 },
  // R6 left wall (horizontal at y=105)
  { x: 157, y: 106, w: 2, h: C_THICK - 2 },
  // R4 needs a way in. The big horizontal x=35..147 at y=70 — punches R4's top wall.
  { x: 35, y: 69, w: C_THICK - 2, h: 2 },
];

// Doors (locked icons) on each room's EXIT wall — except R1's entrance is open.
const DOORS = [
  // R1 exit: east wall, meeting R1→R2 corridor. We render the door ON the room's wall.
  { room: 1, x: 39, y: 21, orient: 'v' },
  // R2 exit: south wall (vertical corridor exits to R3)
  { room: 2, x: 70, y: 33, orient: 'h' },
  // R3 exit: south wall
  { room: 3, x: 142, y: 61, orient: 'h' },
  // R4 exit: east wall
  { room: 4, x: 57, y: 81, orient: 'v' },
  // R5 exit: south wall
  { room: 5, x: 107, y: 97, orient: 'h' },
  // (R6 has no exit — it's the final room)
];

function MapOverviewArtboard() {
  const W = 240, H = 135; // design tiles, TILE=4 → 960×540 css px
  const cssW = W * TILE, cssH = H * TILE;
  return (
    <div style={{
      width: '100%', height: '100%', background: MAP_PALETTE.void,
      display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
      padding: 0, position: 'relative',
    }}>
      {/* Header strip */}
      <div style={{
        padding: '14px 22px 10px',
        borderBottom: `1px solid #2A2A2A`,
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ color: MAP_PALETTE.muted, fontSize: 12 }}>$ ./map --all</div>
          <div style={{ color: MAP_PALETTE.text, fontSize: 22, fontWeight: 700, marginTop: 6, letterSpacing: '0.02em' }}>
            <span style={{ color: MAP_PALETTE.orange }}>{'>'}</span> THE QUEST · 6 ROOMS
          </div>
        </div>
        <div style={{ color: MAP_PALETTE.muted, fontSize: 11, textAlign: 'right', lineHeight: 1.6 }}>
          top-down · 8-bit · pixel-grid 4px<br />
          orange #E8633D · floor #3A3A3A · dots #3FB950
        </div>
      </div>

      {/* The map canvas */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 12 }}>
        <svg
          viewBox={`0 0 ${cssW} ${cssH}`}
          width="100%"
          style={{ maxHeight: '100%', display: 'block', imageRendering: 'pixelated' }}
        >
          {/* Void background */}
          <rect x="0" y="0" width={cssW} height={cssH} fill={MAP_PALETTE.void} />

          {/* Corridors (drawn UNDER rooms so they tuck cleanly into walls) */}
          {CORRIDORS.map((c, i) => <CorridorSeg key={`c${i}`} {...c.seg} />)}

          {/* Rooms */}
          {ROOMS.map(r => (
            <Room key={r.id} x={r.x} y={r.y} w={r.w} h={r.h} dotSpacing={5} />
          ))}

          {/* Doorways punch through room borders where corridors meet walls */}
          {DOORWAYS.map((d, i) => <Doorway key={`d${i}`} {...d} />)}

          {/* Locked doors (orange door tiles + lock overlays) */}
          {DOORS.map((d, i) => <Door key={`door${i}`} x={d.x} y={d.y} orient={d.orient} state="locked" />)}

          {/* Bot in R1 */}
          <MapBot x={ROOMS[0].x + 6} y={ROOMS[0].y + 8} />

          {/* Room labels (rendered as foreignObject text BELOW each room) */}
          {ROOMS.map(r => {
            const labelY = r.y + r.h + 2; // below the room
            return (
              <g key={`lbl${r.id}`}>
                <text
                  x={(r.x + r.w / 2) * TILE}
                  y={labelY * TILE + 10}
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize={11}
                  fontWeight={700}
                  fill={MAP_PALETTE.orange}
                  textAnchor="middle"
                  letterSpacing="0.06em"
                >
                  ROOM {r.id}
                </text>
                <text
                  x={(r.x + r.w / 2) * TILE}
                  y={labelY * TILE + 22}
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize={9}
                  fill={MAP_PALETTE.muted}
                  textAnchor="middle"
                  letterSpacing="0.04em"
                >
                  {r.name}
                </text>
              </g>
            );
          })}

          {/* Legend (bottom-left) */}
          <g transform={`translate(${8 * TILE}, ${122 * TILE})`}>
            <text x="0" y="0" fontFamily="'JetBrains Mono', monospace" fontSize="10"
                  fill={MAP_PALETTE.muted} letterSpacing="0.04em">
              LEGEND
            </text>
            <g transform={`translate(0, 12)`}>
              <rect x="0" y="-7" width="10" height="8" fill={MAP_PALETTE.orange} shapeRendering="crispEdges" />
              <rect x="1" y="-6" width="8" height="6" fill={MAP_PALETTE.floor} shapeRendering="crispEdges" />
              <text x="16" y="0" fontFamily="'JetBrains Mono', monospace" fontSize="9"
                    fill={MAP_PALETTE.text}>ROOM</text>
            </g>
            <g transform={`translate(70, 12)`}>
              <rect x="0" y="-5" width="14" height="4" fill={MAP_PALETTE.orange} shapeRendering="crispEdges" />
              <rect x="1" y="-4" width="12" height="2" fill={MAP_PALETTE.floor} shapeRendering="crispEdges" />
              <text x="20" y="0" fontFamily="'JetBrains Mono', monospace" fontSize="9"
                    fill={MAP_PALETTE.text}>CORRIDOR</text>
            </g>
            <g transform={`translate(166, 12)`}>
              <rect x="0" y="-8" width="8" height="10" fill={MAP_PALETTE.orange} shapeRendering="crispEdges" />
              <rect x="2" y="-6" width="2" height="2" fill={MAP_PALETTE.orange} shapeRendering="crispEdges" />
              <rect x="1" y="-4" width="4" height="4" fill={MAP_PALETTE.orange} shapeRendering="crispEdges" />
              <text x="14" y="0" fontFamily="'JetBrains Mono', monospace" fontSize="9"
                    fill={MAP_PALETTE.text}>LOCKED</text>
            </g>
            <g transform={`translate(244, 12)`}>
              <rect x="0" y="-7" width="4" height="4" fill={MAP_PALETTE.orange} shapeRendering="crispEdges" />
              <rect x="0" y="-3" width="4" height="1" fill={MAP_PALETTE.orange} shapeRendering="crispEdges" />
              <rect x="2" y="-2" width="1" height="1" fill={MAP_PALETTE.orange} shapeRendering="crispEdges" />
              <text x="10" y="0" fontFamily="'JetBrains Mono', monospace" fontSize="9"
                    fill={MAP_PALETTE.text}>BOT</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}


// ============================================================================
// DELIVERABLE 2 & 3 — SINGLE ROOM CLOSEUP
// ============================================================================

// One large room takes ~90% of the canvas. Below the SVG is a terminal prompt strip.

function ChallengeAnchor({ x, y, passed = false }) {
  // 8×8 tile pixel terminal/computer icon. Screen 6×4 with a small base.
  const o = MAP_PALETTE.orange;
  const ds = MAP_PALETTE.darkOrange;
  const glowColor = passed ? MAP_PALETTE.pass : o;
  return (
    <g>
      {/* glow halo (8 tiles wider square behind the icon) */}
      <PRect x={x - 2} y={y - 2} w={12} h={12} fill={glowColor} opacity={0.10} />
      <PRect x={x - 1} y={y - 1} w={10} h={10} fill={glowColor} opacity={0.18} />

      {/* monitor outline (8×6) */}
      <PRect x={x} y={y} w={8} h={6} fill={o} />
      {/* screen (6×4) */}
      <PRect x={x + 1} y={y + 1} w={6} h={4} fill={MAP_PALETTE.void} />
      {/* prompt > on screen */}
      <PRect x={x + 2} y={y + 2} w={1} h={1} fill={passed ? MAP_PALETTE.pass : o} />
      <PRect x={x + 3} y={y + 3} w={1} h={1} fill={passed ? MAP_PALETTE.pass : o} />
      <PRect x={x + 2} y={y + 4} w={1} h={1} fill={passed ? MAP_PALETTE.pass : o} />
      {/* monitor stand */}
      <PRect x={x + 3} y={y + 6} w={2} h={1} fill={ds} />
      <PRect x={x + 2} y={y + 7} w={4} h={1} fill={o} />

      {/* checkmark overlay when passed */}
      {passed && (
        <g>
          <PRect x={x + 9} y={y + 1} w={1} h={1} fill={MAP_PALETTE.pass} />
          <PRect x={x + 10} y={y + 2} w={1} h={1} fill={MAP_PALETTE.pass} />
          <PRect x={x + 11} y={y + 1} w={1} h={1} fill={MAP_PALETTE.pass} />
          <PRect x={x + 12} y={y} w={1} h={1} fill={MAP_PALETTE.pass} />
          <PRect x={x + 13} y={y - 1} w={1} h={1} fill={MAP_PALETTE.pass} />
        </g>
      )}
    </g>
  );
}

function HintToken({ x, y }) {
  // ? token, 4×6 footprint
  const o = MAP_PALETTE.orange;
  return (
    <g>
      <PRect x={x + 1} y={y} w={2} h={1} fill={o} />
      <PRect x={x + 3} y={y + 1} w={1} h={1} fill={o} />
      <PRect x={x + 2} y={y + 2} w={1} h={1} fill={o} />
      <PRect x={x + 2} y={y + 3} w={1} h={1} fill={o} />
      <PRect x={x + 2} y={y + 5} w={1} h={1} fill={o} />
    </g>
  );
}

function ScrollToken({ x, y }) {
  // Small scroll/document, 5×6 footprint — rolled top, paper, rolled bottom
  const o = MAP_PALETTE.orange;
  const ds = MAP_PALETTE.darkOrange;
  return (
    <g>
      <PRect x={x} y={y} w={5} h={1} fill={o} />
      <PRect x={x} y={y + 1} w={1} h={4} fill={o} />
      <PRect x={x + 4} y={y + 1} w={1} h={4} fill={o} />
      <PRect x={x + 1} y={y + 1} w={3} h={4} fill={ds} />
      {/* text lines */}
      <PRect x={x + 1} y={y + 2} w={3} h={1} fill={o} />
      <PRect x={x + 1} y={y + 4} w={2} h={1} fill={o} />
      <PRect x={x} y={y + 5} w={5} h={1} fill={o} />
    </g>
  );
}

// Closeup bot — bigger than the map bot. 8×10 tile body.
// We render the actual sprite from sprites.jsx (BotIdle) via foreignObject.
function CloseupBot({ x, y, tileSize = TILE }) {
  // Position in css px, render BotIdle at scale=tileSize so its pixels match the tile grid.
  const { BotIdle } = window;
  if (!BotIdle) return null;
  return (
    <foreignObject x={x * TILE} y={y * TILE} width={16 * tileSize} height={14 * tileSize}>
      <div xmlns="http://www.w3.org/1999/xhtml" style={{ display: 'inline-block' }}>
        <BotIdle scale={tileSize} />
      </div>
    </foreignObject>
  );
}

function RoomCloseupArtboard({ passed = false }) {
  // Single room — large. Design grid 200×120 tiles, TILE=4 → 800×480 css px for the room.
  // Add a terminal prompt strip below.
  const W = 200, H = 120;
  const cssW = W * TILE, cssH = H * TILE;

  // Room interior: nearly full canvas with comfortable margin.
  const room = { x: 10, y: 8, w: 180, h: 100 };

  // Door (the room's exit). Place on east wall, mid-height.
  const door = { x: room.x + room.w - 1, y: room.y + Math.floor(room.h / 2) - 4, orient: 'v' };

  // Challenge anchor — centered.
  const anchorX = room.x + Math.floor(room.w / 2) - 4;
  const anchorY = room.y + Math.floor(room.h / 2) - 5;

  // Bot — left of anchor, on a "floor" position.
  const botX = room.x + 22;
  const botY = room.y + Math.floor(room.h / 2) - 7;

  // Items scattered:
  // hint token top-right-ish
  const hint = { x: room.x + room.w - 40, y: room.y + 14 };
  // scroll bottom-left-ish
  const scroll = { x: room.x + 22, y: room.y + room.h - 16 };

  return (
    <div style={{
      width: '100%', height: '100%', background: MAP_PALETTE.void,
      display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 22px 10px',
        borderBottom: `1px solid #2A2A2A`,
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ color: MAP_PALETTE.muted, fontSize: 12 }}>
            $ ./play --room 3 {passed ? '--state=cleared' : '--state=active'}
          </div>
          <div style={{ color: MAP_PALETTE.text, fontSize: 22, fontWeight: 700, marginTop: 6, letterSpacing: '0.02em' }}>
            <span style={{ color: MAP_PALETTE.orange }}>{'>'}</span>{' '}
            ROOM 3 · PLAN BEFORE YOU CODE
            {passed && (
              <span style={{ marginLeft: 14, color: MAP_PALETTE.pass, fontSize: 14 }}>
                [PASS] door unlocked
              </span>
            )}
          </div>
        </div>
        <div style={{ color: MAP_PALETTE.muted, fontSize: 11, textAlign: 'right', lineHeight: 1.6 }}>
          challenge: 1 · items: 2 (optional)<br />
          {passed ? 'exit: OPEN — proceed →' : 'exit: LOCKED — clear the prompt'}
        </div>
      </div>

      {/* Room canvas */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px 12px' }}>
        <svg
          viewBox={`0 0 ${cssW} ${cssH}`}
          width="100%"
          style={{ maxHeight: '100%', display: 'block', imageRendering: 'pixelated' }}
        >
          <rect x="0" y="0" width={cssW} height={cssH} fill={MAP_PALETTE.void} />

          {/* Room */}
          <Room x={room.x} y={room.y} w={room.w} h={room.h} dotSpacing={6} />

          {/* Entrance doorway (west wall) — already arrived, so it's open */}
          <Doorway x={room.x} y={room.y + Math.floor(room.h / 2) - 2} w={1} h={4} />

          {/* Exit door (east wall) */}
          <Door x={door.x} y={door.y} orient={door.orient} state={passed ? 'unlocked' : 'locked'} />

          {/* Challenge anchor */}
          <ChallengeAnchor x={anchorX} y={anchorY} passed={passed} />

          {/* Anchor label */}
          <text
            x={(anchorX + 4) * TILE}
            y={(anchorY + 12) * TILE}
            fontFamily="'JetBrains Mono', monospace"
            fontSize={10}
            fill={passed ? MAP_PALETTE.pass : MAP_PALETTE.orange}
            textAnchor="middle"
            letterSpacing="0.08em"
          >
            {passed ? '> CLEARED' : '> CHALLENGE'}
          </text>

          {/* Items */}
          <HintToken x={hint.x} y={hint.y} />
          <text
            x={(hint.x + 2) * TILE}
            y={(hint.y + 10) * TILE}
            fontFamily="'JetBrains Mono', monospace"
            fontSize={9}
            fill={MAP_PALETTE.muted}
            textAnchor="middle"
          >
            hint
          </text>

          <ScrollToken x={scroll.x} y={scroll.y} />
          <text
            x={(scroll.x + 2.5) * TILE}
            y={(scroll.y + 10) * TILE}
            fontFamily="'JetBrains Mono', monospace"
            fontSize={9}
            fill={MAP_PALETTE.muted}
            textAnchor="middle"
          >
            lore
          </text>

          {/* Bot */}
          <CloseupBot x={botX} y={botY} tileSize={TILE} />

          {/* Compass / room dimensions in top-right corner */}
          <text
            x={(room.x + room.w - 4) * TILE}
            y={(room.y + 6) * TILE}
            fontFamily="'JetBrains Mono', monospace"
            fontSize={9}
            fill={MAP_PALETTE.muted}
            textAnchor="end"
          >
            R3 · 180×100
          </text>

          {/* Exit arrow (only when passed) */}
          {passed && (
            <g>
              <PRect x={door.x - 6} y={door.y + 1} w={4} h={1} fill={MAP_PALETTE.pass} opacity={0.7} />
              <PRect x={door.x - 4} y={door.y} w={1} h={1} fill={MAP_PALETTE.pass} opacity={0.7} />
              <PRect x={door.x - 4} y={door.y + 2} w={1} h={1} fill={MAP_PALETTE.pass} opacity={0.7} />
              <PRect x={door.x - 3} y={door.y - 1} w={1} h={1} fill={MAP_PALETTE.pass} opacity={0.7} />
              <PRect x={door.x - 3} y={door.y + 3} w={1} h={1} fill={MAP_PALETTE.pass} opacity={0.7} />
            </g>
          )}
        </svg>
      </div>

      {/* Terminal prompt strip — persistent UI below the room */}
      <div style={{
        padding: '12px 22px',
        borderTop: `1px solid #2A2A2A`,
        display: 'flex', alignItems: 'center', gap: 14,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
      }}>
        <span style={{ color: MAP_PALETTE.muted }}>room:03</span>
        <span style={{ color: passed ? MAP_PALETTE.pass : MAP_PALETTE.orange }}>{'>'}</span>
        <span style={{ color: MAP_PALETTE.text }}>
          {passed ? 'door unlocked — press SPACE to enter R4' : 'approach the terminal to begin'}
        </span>
        <span style={{
          display: 'inline-block',
          width: 8, height: 14,
          background: MAP_PALETTE.text,
          animation: 'cc-blink 1s steps(2) infinite',
        }} />
      </div>
    </div>
  );
}

const RoomCloseupLockedArtboard   = () => <RoomCloseupArtboard passed={false} />;
const RoomCloseupUnlockedArtboard = () => <RoomCloseupArtboard passed={true}  />;


Object.assign(window, {
  MapOverviewArtboard,
  RoomCloseupLockedArtboard,
  RoomCloseupUnlockedArtboard,
});
