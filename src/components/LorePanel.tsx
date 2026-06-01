import { useEffect } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { CONTENT } from '../content';

// Palette — antique book
const FRAME = '#5C3E26';          // wooden brown frame
const FRAME_SHADOW = '#3A2516';   // darker brown for shadow / spine inner edge
const PAGE = '#EBE0C8';           // warm cream / parchment
const PAGE_EDGE = '#D4C4A0';      // darker beige for inner page border + edge wear
const INK = '#3A2818';            // dark brown ink for handwritten text
const INK_FADE = '#6B4F2E';       // lighter brown for the close hint

/**
 * Saw-tooth path generator. Produces a 0→1 normalized polygon-points
 * string with deterministic but uneven tear marks along the edge.
 * count = number of teeth across that edge.
 */
function tornEdge(count: number, seed: number, amp = 0.018): string {
  const pts: string[] = [];
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    // Pseudo-random offset per tooth, seeded so it's stable per render.
    const r = Math.sin((i + seed) * 12.9898) * 43758.5453;
    const f = r - Math.floor(r);
    const dy = (f - 0.5) * amp * 2;
    pts.push(`${t},${dy}`);
  }
  return pts.join(' ');
}

export function LorePanel() {
  const state = useGame();
  const dispatch = useGameDispatch();

  const lesson = CONTENT[state.currentLevel];
  const loreEntry = lesson.lore.find(l => l.id === state.activePanel?.itemId);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'e' || e.key === 'E' || e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: 'CLOSE_PANEL' });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [dispatch]);

  if (!loreEntry) return null;
  const text = loreEntry.text;

  // Generate the four torn-edge paths once per render. Seeds chosen to differ
  // per edge so they don't look mirrored.
  const topEdge = tornEdge(40, 1.1, 0.012);
  const bottomEdge = tornEdge(40, 7.3, 0.014);
  const leftEdge = tornEdge(28, 3.7, 0.012);
  const rightEdge = tornEdge(28, 5.1, 0.014);

  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.55)' }}
      onClick={() => dispatch({ type: 'CLOSE_PANEL' })}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'min(90vw, 820px)',
          aspectRatio: '3 / 2',
          imageRendering: 'pixelated',
        }}
      >
        {/* ─── Outer wooden frame ─── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: FRAME,
            // Pixel-y highlight on top, shadow on bottom for depth.
            boxShadow: `
              inset 0 4px 0 0 #6E4A2E,
              inset 0 -6px 0 0 ${FRAME_SHADOW},
              0 8px 24px rgba(0,0,0,0.6)
            `,
          }}
        />

        {/* ─── Page area (cream interior) with torn edges via SVG clip ─── */}
        <svg
          width="0"
          height="0"
          style={{ position: 'absolute', pointerEvents: 'none' }}
          aria-hidden
        >
          <defs>
            {/* Build a closed polygon: top edge L→R, right edge T→B, bottom edge R→L, left edge B→T. */}
            <clipPath id="lore-page-clip" clipPathUnits="objectBoundingBox">
              <polygon
                points={`
                  ${topEdge.split(' ').map(p => {
                    const [x, dy] = p.split(',').map(Number);
                    return `${x},${0.045 + dy}`;
                  }).join(' ')}
                  ${rightEdge.split(' ').map(p => {
                    const [t, dx] = p.split(',').map(Number);
                    return `${0.955 - dx},${t}`;
                  }).join(' ')}
                  ${bottomEdge.split(' ').reverse().map(p => {
                    const [x, dy] = p.split(',').map(Number);
                    return `${x},${0.955 - dy}`;
                  }).join(' ')}
                  ${leftEdge.split(' ').reverse().map(p => {
                    const [t, dx] = p.split(',').map(Number);
                    return `${0.045 + dx},${t}`;
                  }).join(' ')}
                `}
              />
            </clipPath>
          </defs>
        </svg>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: 'url(#lore-page-clip)',
            background: PAGE,
            // Subtle aged-paper warmth and a hint of grain via layered gradients.
            backgroundImage: `
              radial-gradient(ellipse at 25% 30%, rgba(180,140,90,0.06) 0%, transparent 55%),
              radial-gradient(ellipse at 75% 70%, rgba(180,140,90,0.07) 0%, transparent 55%),
              radial-gradient(circle at 12% 80%, rgba(120,90,50,0.06) 0%, transparent 12%),
              radial-gradient(circle at 88% 22%, rgba(120,90,50,0.05) 0%, transparent 10%)
            `,
          }}
        />

        {/* ─── Center spine ─── */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '5%',
            bottom: '5%',
            width: 6,
            transform: 'translateX(-3px)',
            background: FRAME_SHADOW,
            boxShadow: `
              -3px 0 6px rgba(58,37,22,0.35),
              3px 0 6px rgba(58,37,22,0.35)
            `,
          }}
        />

        {/* ─── Inner page border (faint double-line, both pages) ─── */}
        <div
          style={{
            position: 'absolute',
            top: '7%',
            bottom: '7%',
            left: '5.5%',
            right: '5.5%',
            display: 'flex',
            pointerEvents: 'none',
          }}
        >
          {[0, 1].map(side => (
            <div
              key={side}
              style={{
                flex: 1,
                margin: side === 0 ? '0 1.2% 0 0' : '0 0 0 1.2%',
                border: `1px solid ${PAGE_EDGE}`,
                outline: `1px solid ${PAGE_EDGE}55`,
                outlineOffset: 3,
              }}
            />
          ))}
        </div>

        {/* ─── Text (handwritten serif, flowing across both pages as 2 cols) ─── */}
        <div
          style={{
            position: 'absolute',
            top: '11%',
            bottom: '13%',
            left: '8%',
            right: '8%',
            fontFamily: "'IM Fell English', 'EB Garamond', Georgia, serif",
            color: INK,
            fontSize: 'clamp(15px, 2vw, 19px)',
            lineHeight: 1.55,
            columnCount: 2,
            columnGap: '6%',
            columnFill: 'auto',
            textAlign: 'justify',
            hyphens: 'auto',
            // Slight wobble like a quill — first letter a touch larger.
          }}
        >
          <span
            style={{
              fontFamily: "'IM Fell English', 'EB Garamond', serif",
              fontStyle: 'italic',
              fontSize: '1.5em',
              float: 'left',
              lineHeight: 0.9,
              marginRight: 6,
              marginTop: 4,
              color: INK,
            }}
          >
            {text.charAt(0)}
          </span>
          {text.slice(1)}
        </div>

        {/* ─── Bottom-left close button ─── */}
        <button
          onClick={() => dispatch({ type: 'CLOSE_PANEL' })}
          aria-label="Close book"
          style={{
            position: 'absolute',
            left: '2.5%',
            bottom: '3%',
            width: 38,
            height: 38,
            background: 'transparent',
            border: 'none',
            color: INK,
            fontFamily: "'IM Fell English', serif",
            fontSize: 28,
            lineHeight: 1,
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.7,
            transition: 'opacity 120ms ease, transform 120ms ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateX(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '0.7';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          {'<'}
        </button>

        {/* ─── Close hint (bottom-right page corner) ─── */}
        <div
          style={{
            position: 'absolute',
            right: '4%',
            bottom: '4.5%',
            fontFamily: "'IM Fell English', serif",
            fontStyle: 'italic',
            color: INK_FADE,
            fontSize: 14,
            opacity: 0.7,
            pointerEvents: 'none',
          }}
        >
          press SPACE to close
        </div>

        {/* ─── Curled bottom corners ─── */}
        {/* Bottom-left fold */}
        <div
          style={{
            position: 'absolute',
            left: '4%',
            bottom: '5%',
            width: 22,
            height: 22,
            background: PAGE_EDGE,
            clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
            boxShadow: 'inset -2px 2px 3px rgba(58,37,22,0.35)',
            pointerEvents: 'none',
          }}
        />
        {/* Bottom-right fold */}
        <div
          style={{
            position: 'absolute',
            right: '4%',
            bottom: '5%',
            width: 22,
            height: 22,
            background: PAGE_EDGE,
            clipPath: 'polygon(100% 100%, 0 100%, 100% 0)',
            boxShadow: 'inset 2px 2px 3px rgba(58,37,22,0.35)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}
