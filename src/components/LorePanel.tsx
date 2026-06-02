import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { CONTENT } from '../content';

// Base pixel resolution — the canvas is rendered at this size and scaled up
// nearest-neighbor by CSS. Everything else is sized off W/H.
const W = 300;
const H = 200;

// Palette — antique book, lifted from the standalone design.
type RGBA = [number, number, number, number];
const C: Record<string, RGBA> = {
  clear:    [0, 0, 0, 0],
  outline:  [38, 23, 13, 255],
  brown:    [122, 74, 41, 255],
  brownLt:  [151, 98, 57, 255],
  brownDk:  [86, 51, 28, 255],
  bevel:    [201, 171, 121, 255],
  page:     [243, 235, 209, 255],
  page2:    [236, 227, 196, 255],
  pageEdge: [224, 211, 174, 255],
  ruling:   [199, 178, 134, 255],
  spine:    [214, 198, 158, 255],
  spineDk:  [150, 127, 90, 255],
  fold:     [249, 243, 223, 255],
  foldSh:   [206, 191, 153, 255],
  stain:    [214, 196, 154, 255],
  stainDk:  [197, 175, 128, 255],
  fox:      [176, 143, 96, 255],
  edgeDk:   [195, 174, 132, 255],
};

function rnd(x: number, y: number, s: number): number {
  let n = (x | 0) * 374761393 + (y | 0) * 668265263 + (s | 0) * 982451653;
  n = (n ^ (n >> 13)) * 1274126177;
  n = n ^ (n >> 16);
  return ((n >>> 0) % 100000) / 100000;
}
function jitter(c: RGBA, amt: number): RGBA {
  return [
    Math.max(0, Math.min(255, c[0] + amt)),
    Math.max(0, Math.min(255, c[1] + amt)),
    Math.max(0, Math.min(255, c[2] + amt)),
    c[3],
  ];
}
function blend(a: RGBA, b: RGBA, k: number): RGBA {
  return [
    a[0] + (b[0] - a[0]) * k,
    a[1] + (b[1] - a[1]) * k,
    a[2] + (b[2] - a[2]) * k,
    255,
  ];
}
function smooth(x: number, y: number, scale: number, seed: number): number {
  const gx = x / scale, gy = y / scale;
  const x0 = Math.floor(gx), y0 = Math.floor(gy);
  const fx = gx - x0, fy = gy - y0;
  const a = rnd(x0, y0, seed), b = rnd(x0 + 1, y0, seed);
  const c = rnd(x0, y0 + 1, seed), d = rnd(x0 + 1, y0 + 1, seed);
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x: number, y: number, scale: number, seed: number): number {
  return smooth(x, y, scale, seed) * 0.65 + smooth(x, y, scale / 2.3, seed + 91) * 0.35;
}
function inR(x: number, y: number, x0: number, y0: number, x1: number, y1: number, r: number): boolean {
  if (x < x0 || x >= x1 || y < y0 || y >= y1) return false;
  const cx = x < x0 + r ? x0 + r : (x >= x1 - r ? x1 - r - 1 : x);
  const cy = y < y0 + r ? y0 + r : (y >= y1 - r ? y1 - r - 1 : y);
  const dx = x - cx, dy = y - cy;
  return dx * dx + dy * dy <= r * r;
}

/**
 * Renders the pixel-art book into the given canvas. Deterministic — same
 * output every call, so we can call it once per panel mount.
 */
function renderBook(canvas: HTMLCanvasElement) {
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const img = ctx.createImageData(W, H);
  const D = img.data;

  const set = (x: number, y: number, c: RGBA) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const i = (y * W + x) * 4;
    D[i] = c[0]; D[i + 1] = c[1]; D[i + 2] = c[2];
    D[i + 3] = (c[3] === undefined ? 255 : c[3]);
  };

  const R = 13, OT = 2, FT = 12, M = FT + 7, foldS = 16;

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const book = inR(x, y, 0, 0, W, H, R);
      if (!book) { set(x, y, C.clear); continue; }

      const inkRing = !inR(x, y, OT, OT, W - OT, H - OT, R - OT);
      if (inkRing) { set(x, y, C.outline); continue; }

      const page = inR(x, y, FT, FT, W - FT, H - FT, Math.max(R - FT, 3));

      if (!page) {
        let c: RGBA = C.brown;
        const innerRing = inR(x, y, FT - 3, FT - 3, W - FT + 3, H - FT + 3, Math.max(R - FT + 3, 3));
        const outerRing = !inR(x, y, OT + 3, OT + 3, W - OT - 3, H - OT - 3, R - OT - 3);
        if (innerRing) c = C.brownDk;
        else if (outerRing && (y < H * 0.42 || x < W * 0.30)) c = C.brownLt;
        const n = (rnd(x, y, 11) - 0.5) * 9;
        set(x, y, jitter(c, n | 0));
        continue;
      }

      const dk = fbm(x, y, 5, 71);
      const dk2 = fbm(x, y, 13, 73);
      const edgeAmt = 2.0 + dk * 3.0 + Math.max(0, dk2 - 0.58) * 14 + rnd(x, y, 76) * 1.6;
      const cream = inR(x, y, FT + edgeAmt, FT + edgeAmt, W - FT - edgeAmt, H - FT - edgeAmt, Math.max(R - FT, 2));
      if (!cream) {
        const lip = !inR(x, y, FT + 1.5, FT + 1.5, W - FT - 1.5, H - FT - 1.5, Math.max(R - FT, 2));
        if (lip) { set(x, y, jitter(C.bevel, ((rnd(x, y, 75) - 0.5) * 14) | 0)); continue; }
        let ce = blend(C.page, C.edgeDk, 0.46 + dk * 0.34);
        if (dk2 > 0.66) ce = blend(ce, C.fox, 0.26);
        set(x, y, ce);
        continue;
      }

      let c: RGBA = (rnd(x, y, 3) > 0.95) ? C.page2 : C.page;
      const s1 = fbm(x, y, 48, 31);
      if (s1 > 0.58) c = blend(c, C.stain, Math.min(1, (s1 - 0.58) / 0.34) * 0.40);
      const s2 = fbm(x, y, 17, 37);
      if (s2 > 0.66) c = blend(c, C.stainDk, Math.min(1, (s2 - 0.66) / 0.30) * 0.26);
      const ncx = Math.min(x - (FT + 2), (W - FT - 2) - x);
      const ncy = Math.min(y - (FT + 2), (H - FT - 2) - y);
      const cd = Math.max(0, 1 - ncx / 42) * Math.max(0, 1 - ncy / 42);
      if (cd > 0.02) c = blend(c, C.edgeDk, cd * (0.26 + fbm(x, y, 9, 61) * 0.26));
      const en = fbm(x, y, 8, 67);
      if (!inR(x, y, FT + 9, FT + 9, W - FT - 9, H - FT - 9, 4)) c = blend(c, C.edgeDk, 0.12 + en * 0.20);

      // Single continuous ruling rectangle — no center gutter/spine, so the
      // title and takeaway read cleanly across the full spread.
      const onRule = inR(x, y, M, M, W - M, H - M, 5) && !inR(x, y, M + 1, M + 1, W - M - 1, H - M - 1, 5);
      if (onRule) c = C.ruling;

      const px0 = FT + 2, px1 = W - FT - 2, py1 = H - FT - 2;
      const dlx = x - px0, dby = py1 - y;
      if (dlx >= 0 && dby >= 0 && dlx + dby < foldS) {
        c = (dlx + dby > foldS - 2) ? C.foldSh : C.fold;
      }
      const drx = px1 - x, dby2 = py1 - y;
      if (drx >= 0 && dby2 >= 0 && drx + dby2 < foldS) {
        c = (drx + dby2 > foldS - 2) ? C.foldSh : C.fold;
      }

      set(x, y, c);
    }
  }

  const erase: number[] = [];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      if (D[i + 3] === 0) continue;
      const edge =
        (x > 0 && D[(y * W + x - 1) * 4 + 3] === 0) ||
        (x < W - 1 && D[(y * W + x + 1) * 4 + 3] === 0) ||
        (y > 0 && D[((y - 1) * W + x) * 4 + 3] === 0) ||
        (y < H - 1 && D[((y + 1) * W + x) * 4 + 3] === 0);
      if (!edge) continue;
      const nearCorner = (x < R + 4 || x > W - R - 4) && (y < R + 4 || y > H - R - 4);
      const thr = nearCorner ? 0.55 : 0.80;
      if (rnd(x, y, 21) > thr) {
        erase.push(i);
        if (rnd(x, y, 23) > 0.6) {
          if (x < W / 2 && x + 1 < W) erase.push((y * W + x + 1) * 4);
          else if (x - 1 >= 0) erase.push((y * W + x - 1) * 4);
        }
      }
    }
  }
  erase.forEach(i => { D[i + 3] = 0; });

  ctx.putImageData(img, 0, 0);
}

// ---------- Lore markup parsing ----------
// Lightweight markup encoded in the `text` string (see plan):
//   **first line**  → main header (chapter title, spans the top)
//   **other line**  → section sub-header (bold, flows in the columns)
//   > line          → takeaway callout (italic, pinned at the bottom)
//   *word* / `code` → inline italic / monospace
// Plain text with none of these (L2–L6) parses to all paragraphs — unchanged.
type LoreBlock = { kind: 'section' | 'para'; text: string };
interface ParsedLore { mainHeader?: string; blocks: LoreBlock[]; takeaway?: string }

function parseLore(text: string): ParsedLore {
  const chunks = text.split(/\n\n+/).map(s => s.trim()).filter(Boolean);
  let mainHeader: string | undefined;
  let takeaway: string | undefined;
  const blocks: LoreBlock[] = [];
  for (const c of chunks) {
    const boldLine = c.match(/^\*\*(.+)\*\*$/);
    if (boldLine) {
      // First bold line (before any body) is the chapter title; the rest are sections.
      if (mainHeader === undefined && blocks.length === 0) mainHeader = boldLine[1];
      else blocks.push({ kind: 'section', text: boldLine[1] });
      continue;
    }
    if (/^>\s?/.test(c)) { takeaway = c.replace(/^>\s?/, ''); continue; }
    blocks.push({ kind: 'para', text: c });
  }
  return { mainHeader, blocks, takeaway };
}

/** Render inline `*italic*` and `` `code` `` spans within a body string. */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const re = /(`[^`]+`)|(\*[^*]+\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('`')) {
      nodes.push(
        <code
          key={`${keyPrefix}-${k}`}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.86em',
            background: 'rgba(90,60,30,0.10)',
            padding: '0 2px',
            borderRadius: 2,
          }}
        >
          {tok.slice(1, -1)}
        </code>,
      );
    } else {
      nodes.push(<em key={`${keyPrefix}-${k}`}>{tok.slice(1, -1)}</em>);
    }
    last = m.index + tok.length;
    k++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

// Auto-fit bounds (px). Long structured lore shrinks toward MIN to stay on one spread.
const MAX_FONT = 13;
const MIN_FONT = 8;

export function LorePanel() {
  const state = useGame();
  const dispatch = useGameDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [fontPx, setFontPx] = useState(MAX_FONT);

  const lesson = CONTENT[state.currentLevel];
  const loreEntry = lesson.lore.find(l => l.id === state.activePanel?.itemId);
  const parsed = loreEntry ? parseLore(loreEntry.text) : null;

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

  useEffect(() => {
    if (canvasRef.current && loreEntry) {
      renderBook(canvasRef.current);
    }
  }, [loreEntry]);

  // Auto-fit: shrink the body font until the two columns stop spilling into a
  // third (overflowing column => scrollWidth > clientWidth). Keeps every item
  // on a single spread. Re-runs per item and again once the webfont loads.
  useLayoutEffect(() => {
    if (!loreEntry) return;
    const el = bodyRef.current;
    if (!el) return;
    const fit = () => {
      let size = MAX_FONT;
      el.style.fontSize = size + 'px';
      // Force reflow + measure; step down until the columns fit the width.
      while (size > MIN_FONT && el.scrollWidth > el.clientWidth + 2) {
        size -= 0.5;
        el.style.fontSize = size + 'px';
      }
      setFontPx(size);
    };
    fit();
    // Spectral may still be loading on first open — re-fit when fonts settle.
    document.fonts?.ready.then(fit).catch(() => {});
  }, [loreEntry]);

  if (!loreEntry || !parsed) return null;

  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center"
      style={{
        background: 'radial-gradient(120% 130% at 50% 30%, rgba(42,29,18,0.85) 0%, rgba(22,15,9,0.92) 60%, rgba(11,8,5,0.96) 100%)',
      }}
      onClick={() => dispatch({ type: 'CLOSE_PANEL' })}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          // Sized off the parent game container (960x640), not the viewport.
          // Leaves padding so the chipped/torn edges don't get cropped.
          width: '72%',
          maxWidth: 720,
          aspectRatio: `${W} / ${H}`,
          filter: 'drop-shadow(0 14px 22px rgba(0,0,0,0.55))',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            imageRendering: 'pixelated',
          }}
        />

        {/* Text area — header band (spans the top), body (two columns across
            the spine, auto-fit), and takeaway callout (pinned at the bottom).
            Top/bottom insets sit comfortably inside the ruling frame so the
            title and takeaway don't crowd the border. */}
        <div
          style={{
            position: 'absolute',
            left: '7.5%',
            right: '7.5%',
            top: '13%',
            bottom: '12.5%',
            display: 'flex',
            flexDirection: 'column',
            color: '#3a2c18',
            fontFamily: "'Spectral', Georgia, serif",
            textShadow: '0 1px 0 rgba(255,255,255,0.18)',
          }}
        >
          {parsed.mainHeader && (
            <div
              style={{
                flex: '0 0 auto',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: Math.round(fontPx * 1.32),
                lineHeight: 1.25,
                marginBottom: '0.5em',
                paddingBottom: '0.4em',
                borderBottom: '1px solid rgba(120,90,50,0.35)',
              }}
            >
              {parsed.mainHeader}
            </div>
          )}

          <div
            ref={bodyRef}
            style={{
              flex: '1 1 auto',
              minHeight: 0,
              fontSize: fontPx,
              lineHeight: 1.5,
              columnCount: 2,
              columnGap: '9%',
              columnFill: 'auto',
              textAlign: 'justify',
              hyphens: 'auto',
              overflow: 'hidden',
            }}
          >
            {parsed.blocks.map((b, i) =>
              b.kind === 'section' ? (
                <p
                  key={i}
                  style={{
                    margin: i === 0 ? '0 0 0.2em 0' : '0.7em 0 0.2em 0',
                    fontWeight: 600,
                    breakInside: 'avoid',
                  }}
                >
                  {renderInline(b.text, `s${i}`)}
                </p>
              ) : (
                <p
                  key={i}
                  style={{
                    margin: '0 0 0.55em 0',
                    textIndent: 0,
                  }}
                >
                  {renderInline(b.text, `p${i}`)}
                </p>
              ),
            )}
          </div>

          {parsed.takeaway && (
            <div
              style={{
                flex: '0 0 auto',
                marginTop: '0.5em',
                paddingTop: '0.45em',
                borderTop: '1px solid rgba(120,90,50,0.35)',
                fontStyle: 'italic',
                fontSize: Math.max(MIN_FONT, Math.round(fontPx * 0.96)),
                lineHeight: 1.4,
              }}
            >
              {renderInline(parsed.takeaway, 'tk')}
            </div>
          )}
        </div>

        {/* Bottom-left close button (`<` built into the book) */}
        <button
          onClick={() => dispatch({ type: 'CLOSE_PANEL' })}
          aria-label="Close book"
          style={{
            position: 'absolute',
            left: '2.5%',
            bottom: '3%',
            width: '6%',
            height: '12%',
            background: 'transparent',
            border: 'none',
            color: '#3a2c18',
            fontFamily: "'Spectral', Georgia, serif",
            fontSize: 20,
            fontWeight: 500,
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.85,
            transition: 'opacity 120ms ease, transform 120ms ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateX(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '0.85';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          {'<'}
        </button>

        {/* Close hint (bottom-right corner) */}
        <div
          style={{
            position: 'absolute',
            right: '4%',
            bottom: '4%',
            fontFamily: "'Spectral', Georgia, serif",
            fontStyle: 'italic',
            color: '#6b4f2e',
            fontSize: 10,
            opacity: 0.75,
            pointerEvents: 'none',
          }}
        >
          press SPACE to close
        </div>
      </div>
    </div>
  );
}
