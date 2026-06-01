// 8-bit Claude bot sprite system.
// Each frame is an array of strings where each char is a palette index.
// '.' = transparent. Rendered as crisp SVG rects, scale-independent.
// Grid: 14 wide × 14 tall. Top 5 rows = decoration space (bubble/?/sparkles/raised arms).

const PIXEL_PALETTE = {
  '.': null,
  '1': '#E8633D', // bot orange
  '3': '#0F0F0F', // eye / dark
  '4': '#FFFFFF', // mouth highlight
  '5': '#3FB950', // green spark
  '7': '#E8E8E8', // bubble outline / page / ?
  '8': '#6BA8DD', // thought bubble blue fill
};

// ---------- FRAME LIBRARY ----------
const FRAMES = {};
const W = 16;
const fixWidths = arr => arr.map(r => (r + '................').slice(0, W));

// Shared body block — rows 5–10 of the canvas.
//   row 5: body top                 cols 4–11 (8 wide)
//   row 6: eyes                     single black pixels at cols 5, 10
//   row 7: face / mouth area
//   rows 8–9: arms                  2×2 squares stick out at cols 2–3 (L) & 12–13 (R)
//   row 10: body bottom
// Legs: 4 single-pixel legs at cols 4, 6, 9, 11.
const BODY_TOP   = '....11111111....';
const EYES       = '....13111131....';
const FACE       = '....11111111....';
const ARM_ROW    = '..111111111111..';
const BODY_BOT   = '....11111111....';
const LEGS       = '....1.1..1.1....';
const BLANK      = '................';

// Standard base (idle, walk frame 1/3, thinking, confused).
const baseBody = [
  BODY_TOP, EYES, FACE, ARM_ROW, ARM_ROW, BODY_BOT,
];

// IDLE — two frames, subtle vertical settle (body sits 1 row lower in idle_b).
FRAMES.idle_a = fixWidths([
  BLANK, BLANK, BLANK, BLANK, BLANK,
  ...baseBody,
  LEGS, LEGS,
  BLANK,
]);
FRAMES.idle_b = fixWidths([
  BLANK, BLANK, BLANK, BLANK, BLANK, BLANK,
  ...baseBody,
  LEGS, LEGS,
]);

// WALK — diagonal leg lift (trot). Two stand frames bracket the lifts.
// Legs at cols 4, 6, 9, 11 (same as idle).
const STAND_TOP = '....1.1..1.1....';
const STAND_BOT = '....1.1..1.1....';
// Lift 1: legs at cols 4 + 9 lifted (planted legs stay at cols 6 + 11).
const WALK_LIFT_A_TOP = '....1.1..1.1....';
const WALK_LIFT_A_BOT = '......1....1....';
// Lift 2: legs at cols 6 + 11 lifted (planted legs stay at cols 4 + 9).
const WALK_LIFT_B_TOP = '....1.1..1.1....';
const WALK_LIFT_B_BOT = '....1....1......';

FRAMES.walk_1 = fixWidths([
  BLANK, BLANK, BLANK, BLANK, BLANK,
  ...baseBody,
  STAND_TOP, STAND_BOT, BLANK,
]);
FRAMES.walk_2 = fixWidths([
  BLANK, BLANK, BLANK, BLANK, BLANK,
  ...baseBody,
  WALK_LIFT_A_TOP, WALK_LIFT_A_BOT, BLANK,
]);
FRAMES.walk_3 = fixWidths([
  BLANK, BLANK, BLANK, BLANK, BLANK,
  ...baseBody,
  STAND_TOP, STAND_BOT, BLANK,
]);
FRAMES.walk_4 = fixWidths([
  BLANK, BLANK, BLANK, BLANK, BLANK,
  ...baseBody,
  WALK_LIFT_B_TOP, WALK_LIFT_B_BOT, BLANK,
]);

// HAPPY — small black smile (matches reference): two black corner pixels on
// top (cols 6, 9) with a 2-wide black bar centered below (cols 7-8). Lives in
// the arm rows so the body silhouette stays complete with arms sticking out.
FRAMES.happy = fixWidths([
  BLANK, BLANK, BLANK, BLANK, BLANK,
  BODY_TOP, EYES, FACE,
  '..111131131111..',  // smile corners (cols 6 + 9, black)
  '..111113311111..',  // smile bottom 2-wide bar (cols 7-8, black)
  BODY_BOT,
  LEGS, LEGS,
  BLANK,
]);

// SAD — small black frown (matches reference): 2-wide black bar on top
// (cols 7-8) with two black corner pixels dropping down below (cols 6, 9).
// Mirror of HAPPY.
FRAMES.sad = fixWidths([
  BLANK, BLANK, BLANK, BLANK, BLANK,
  BODY_TOP, EYES, FACE,
  '..111113311111..',  // frown top 2-wide bar (cols 7-8, black)
  '..111131131111..',  // frown corners drop (cols 6 + 9, black)
  BODY_BOT,
  LEGS, LEGS,
  BLANK,
]);

// VICTORY — standard happy bot, arms sticking out to the sides with the
// outer corner of each arm raised 1 row to form a "hands up" gesture. No
// sparkles. Matches the user's reference.
FRAMES.victory = fixWidths([
  BLANK, BLANK, BLANK, BLANK, BLANK,
  BODY_TOP,                   // row 5: head top
  EYES,                       // row 6: eyes
  '..1.11111111.1..',         // row 7: face + raised hand tips at cols 2, 13
  '..111131131111..',         // row 8: arms + smile corners (HAPPY)
  '..111113311111..',         // row 9: arms + smile bar
  BODY_BOT,                   // row 10: body bottom
  LEGS, LEGS,
  BLANK,
]);

// THINKING — chunky blue thought bubble with 3 black dots above the head,
// tail pointing down to the head.
FRAMES.thinking = fixWidths([
  '.....88888......',  // bubble top
  '....8888888.....',  // bubble row 2
  '....8383838.....',  // 3 dots evenly spaced inside
  '.....88888......',  // bubble bottom
  '.......8........',  // tail pointing down to head
  ...baseBody,
  LEGS, LEGS,
  BLANK,
]);

// CODING — standard bot with a tiny pixel laptop on the left, sitting on the
// ground. Screen is a 4-step stair-case: top-right corner closest to bot,
// going DOWN-LEFT; horizontal keyboard base at bottom. Matches user reference.
FRAMES.coding = fixWidths([
  BLANK, BLANK, BLANK, BLANK, BLANK,
  BODY_TOP,                   // row 5: head top
  EYES,                       // row 6: eyes
  FACE,                       // row 7: face
  '..111131131111..',         // row 8: arms + smile corners (HAPPY)
  '..111113311111..',         // row 9: arms + smile bar
  '...711111111....',         // row 10: BODY_BOT + laptop screen top (col 3)
  '..771.1..1.1....',         // row 11: laptop step (cols 2-3) + LEGS
  '.77.1.1..1.1....',         // row 12: laptop step (cols 1-2) + LEGS
  '7777............',         // row 13: laptop keyboard base (cols 0-3)
]);

// CONFUSED — chunky pixel "?" centered above the head, with gap + period dot.
// Matches the reference: 2-wide arc top, shoulders flaring out by 1 on each
// side, right side drops down 1, hook curves back to cols 7-8, gap, then a
// single-pixel period sitting one row above the head.
FRAMES.confused = fixWidths([
  '.......77.......',  // row 0: arc top (cols 7-8)
  '......7..7......',  // row 1: shoulders (cols 6, 9)
  '.........7......',  // row 2: right side (col 9)
  '.......77.......',  // row 3: hook back (cols 7-8)
  '................',  // row 4: gap
  '.......7........',  // row 5: period (col 7)
  ...baseBody,
  LEGS, LEGS,
]);

// ---------- COMPONENT ----------

function PixelSprite({ frame, scale = 8, style }) {
  const f = typeof frame === 'string' ? FRAMES[frame] : frame;
  if (!f) return null;
  const rows = f.length;
  const cols = f[0].length;
  // CSS-grid based renderer: each pixel is a div in a grid. This avoids the
  // SVG-edge clipping bug some screenshot tools have with rects at the
  // viewBox edge.
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const ch = f[r][c];
      const color = PIXEL_PALETTE[ch];
      cells.push(
        <div key={`${r}-${c}`} style={{ background: color || 'transparent' }} />
      );
    }
  }
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${scale}px)`,
        gridTemplateRows: `repeat(${rows}, ${scale}px)`,
        width: cols * scale,
        height: rows * scale,
        imageRendering: 'pixelated',
        flexShrink: 0,
        ...style,
      }}
    >
      {cells}
    </div>
  );
}

function AnimatedSprite({ frames, fps = 6, scale = 8, style }) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI(x => (x + 1) % frames.length), 1000 / fps);
    return () => clearInterval(id);
  }, [frames.join('|'), fps]);
  return <PixelSprite frame={frames[i]} scale={scale} style={style} />;
}

const BotIdle = ({ scale = 8, style }) => (
  <AnimatedSprite frames={['idle_a', 'idle_b']} fps={1.5} scale={scale} style={style} />
);
const BotWalk = ({ scale = 8, style }) => (
  <AnimatedSprite frames={['walk_1', 'walk_2', 'walk_3', 'walk_4']} fps={6} scale={scale} style={style} />
);
const BotHappy = ({ scale = 8, style }) => <PixelSprite frame="happy" scale={scale} style={style} />;
const BotSad = ({ scale = 8, style }) => <PixelSprite frame="sad" scale={scale} style={style} />;
const BotVictory = ({ scale = 8, style }) => <PixelSprite frame="victory" scale={scale} style={style} />;
const BotThinking = ({ scale = 8, style }) => <PixelSprite frame="thinking" scale={scale} style={style} />;
const BotCoding = ({ scale = 8, style }) => {
  // User-designed PNG. Native image has ~27.5 source px per design-pixel.
  // Render at `scale` rendered-px per design-pixel so each design-pixel
  // visually matches a sprite-pixel from the other frames.
  const nativePx = 27.5;
  const nativeW = 404, nativeH = 272;
  const w = Math.round((nativeW / nativePx) * scale);
  const h = Math.round((nativeH / nativePx) * scale);
  return (
    <img
      src="sprites/coding-bot.png"
      width={w}
      height={h}
      alt="coding bot"
      style={{ imageRendering: 'pixelated', flexShrink: 0, ...style }}
    />
  );
};
const BotConfused = ({ scale = 8, style }) => <PixelSprite frame="confused" scale={scale} style={style} />;

Object.assign(window, {
  PixelSprite, AnimatedSprite, FRAMES, PIXEL_PALETTE,
  BotIdle, BotWalk, BotHappy, BotSad, BotVictory,
  BotThinking, BotCoding, BotConfused,
});
