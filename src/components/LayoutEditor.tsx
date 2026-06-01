import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useGame } from '../engine/GameContext';
import {
  LEVEL_CONFIGS,
  getBaseChamber,
  serializeChamber,
  type SerializedChamber,
  type ChamberId,
  type ItemConfig,
  type NPCConfig,
  type DoorConfig,
} from '../engine/roomConfigs';
import { CONTENT } from '../content';
import { PixelSprite } from './PixelSprite';
import { FRAMES, PROP_FRAMES, PROP_PALETTE, PROP_LIST } from '../assets/sprites';

const DRAFT_KEY = 'ccq-layout-draft';

type Group = 'items' | 'npcs' | 'doors' | 'decorations';
type Sel =
  | { group: Group; index: number }
  | { group: 'key' }
  | { group: 'spawn' }
  | null;

type DraftMap = Record<ChamberId, SerializedChamber>;

function loadDraft(): DraftMap {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) return JSON.parse(raw) as DraftMap;
  } catch { /* ignore */ }
  return {};
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function spriteCols(frame: string[] | undefined): number {
  return frame && frame[0] ? frame[0].length : 16;
}

export function LayoutEditor({ onExit }: { onExit: () => void }) {
  const state = useGame();
  const level = LEVEL_CONFIGS[state.currentLevel];
  const theme = level.theme;
  const chamberIds = Object.keys(level.chambers);

  const [draft, setDraft] = useState<DraftMap>(loadDraft);
  const [activeId, setActiveId] = useState<ChamberId>(() =>
    chamberIds.includes(state.currentChamber) ? state.currentChamber : level.startingChamber,
  );
  const [mode, setMode] = useState<'select' | 'paint'>('select');
  const [sel, setSel] = useState<Sel>(null);
  const [cell, setCell] = useState(28);
  const [ghost, setGhost] = useState<{ x: number; y: number } | null>(null);

  const canvasRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ group: Group; index: number; startX: number; startY: number; origX: number; origY: number } | null>(null);
  const singleDragRef = useRef<{ which: 'key' | 'spawn'; startX: number; startY: number; origX: number; origY: number } | null>(null);
  const paintRef = useRef<{ target: number; last: string } | null>(null);

  // Seed any not-yet-drafted chamber of this level from its current effective config.
  useEffect(() => {
    setDraft(prev => {
      const next = { ...prev };
      let changed = false;
      for (const id of chamberIds) {
        if (!next[id]) { next[id] = serializeChamber(level.chambers[id]); changed = true; }
      }
      return changed ? next : prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentLevel]);

  // Autosave the draft buffer.
  useEffect(() => {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); } catch { /* ignore */ }
  }, [draft]);

  // Fit the chamber to the available canvas area.
  const ch = draft[activeId];
  useEffect(() => {
    const recompute = () => {
      if (!ch) return;
      const availW = window.innerWidth - 300 - 56;   // drawer + margins
      const availH = window.innerHeight - 150;        // toolbar + margins
      const c = Math.floor(Math.min(availW / ch.width, availH / ch.height));
      setCell(clamp(c, 14, 46));
    };
    recompute();
    window.addEventListener('resize', recompute);
    return () => window.removeEventListener('resize', recompute);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ch?.width, ch?.height]);

  const mutate = useCallback((fn: (c: SerializedChamber) => void) => {
    setDraft(prev => {
      const cur = prev[activeId];
      if (!cur) return prev;
      const copy: SerializedChamber = JSON.parse(JSON.stringify(cur));
      fn(copy);
      return { ...prev, [activeId]: copy };
    });
  }, [activeId]);

  const tileFromPointer = useCallback((clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !ch) return null;
    const x = clamp(Math.floor((clientX - rect.left) / cell), 0, ch.width - 1);
    const y = clamp(Math.floor((clientY - rect.top) / cell), 0, ch.height - 1);
    return { x, y };
  }, [cell, ch]);

  const chW = ch?.width ?? 1;
  const chH = ch?.height ?? 1;

  // ---- entity drag (select mode) ----
  // Delta-based: snap by whole-tile offset from the grab point relative to the
  // entity's original tile. Overflow-proof (large sprites don't skew the drop)
  // and a no-move click is a true no-op.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const dx = Math.round((e.clientX - d.startX) / cell);
      const dy = Math.round((e.clientY - d.startY) / cell);
      setGhost({ x: clamp(d.origX + dx, 0, chW - 1), y: clamp(d.origY + dy, 0, chH - 1) });
    };
    const onUp = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d) return;
      dragRef.current = null;
      setGhost(null);
      const dx = Math.round((e.clientX - d.startX) / cell);
      const dy = Math.round((e.clientY - d.startY) / cell);
      if (dx === 0 && dy === 0) return; // pure click — selection only
      const nx = clamp(d.origX + dx, 0, chW - 1);
      const ny = clamp(d.origY + dy, 0, chH - 1);
      mutate(c => {
        const arr = c[d.group] as Array<{ x: number; y: number }>;
        if (arr[d.index]) { arr[d.index].x = nx; arr[d.index].y = ny; }
      });
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [mutate, cell, chW, chH]);

  // ---- single-entity (key / spawn) drag ----
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const d = singleDragRef.current;
      if (!d) return;
      const dx = Math.round((e.clientX - d.startX) / cell);
      const dy = Math.round((e.clientY - d.startY) / cell);
      setGhost({ x: clamp(d.origX + dx, 0, chW - 1), y: clamp(d.origY + dy, 0, chH - 1) });
    };
    const onUp = (e: PointerEvent) => {
      const d = singleDragRef.current;
      if (!d) return;
      singleDragRef.current = null;
      setGhost(null);
      const dx = Math.round((e.clientX - d.startX) / cell);
      const dy = Math.round((e.clientY - d.startY) / cell);
      if (dx === 0 && dy === 0) return;
      const nx = clamp(d.origX + dx, 0, chW - 1);
      const ny = clamp(d.origY + dy, 0, chH - 1);
      mutate(c => {
        if (d.which === 'spawn') { c.spawnX = nx; c.spawnY = ny; }
        else if (c.keySpawn) { c.keySpawn.x = nx; c.keySpawn.y = ny; }
      });
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [mutate, cell, chW, chH]);

  // ---- wall paint (paint mode) ----
  const paintAt = useCallback((clientX: number, clientY: number) => {
    const t = tileFromPointer(clientX, clientY);
    if (!t) return;
    const k = `${t.x},${t.y}`;
    mutate(c => {
      const cur = c.tiles[t.y][t.x];
      if (cur === 2) return;               // never paint over door tiles
      if (paintRef.current && paintRef.current.last === k) return;
      const target = paintRef.current ? paintRef.current.target : (cur === 1 ? 0 : 1);
      c.tiles[t.y][t.x] = target;
      if (paintRef.current) paintRef.current.last = k;
    });
  }, [mutate, tileFromPointer]);

  useEffect(() => {
    if (mode !== 'paint') return;
    const onMove = (e: PointerEvent) => { if (paintRef.current) paintAt(e.clientX, e.clientY); };
    const onUp = () => { paintRef.current = null; };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [mode, paintAt]);

  const deleteSelected = useCallback(() => {
    if (!sel) return;
    if (sel.group === 'spawn') return; // spawn can't be removed
    if (sel.group === 'key') { mutate(c => { delete c.keySpawn; }); setSel(null); return; }
    const g = sel.group;
    const i = sel.index;
    mutate(c => { (c[g] as unknown[]).splice(i, 1); });
    setSel(null);
  }, [sel, mutate]);

  // ---- keyboard: neutralize game movement; Delete removes; Esc exits ----
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); onExit(); return; }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault(); e.stopImmediatePropagation();
        deleteSelected();
        return;
      }
      // Swallow movement/interact keys so the bot underneath doesn't wander.
      const k = e.key.toLowerCase();
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd', ' ', 'enter'].includes(k)) {
        e.preventDefault(); e.stopImmediatePropagation();
      }
    };
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [deleteSelected, onExit]);

  if (!ch) return null;

  const center = () => ({ x: Math.floor(ch.width / 2), y: Math.floor(ch.height / 2) });

  // ---- palette add actions ----
  const addProp = (key: string) => {
    const { x, y } = center();
    mutate(c => { c.decorations.push({ x, y, sprite: key }); });
    setMode('select');
    setSel({ group: 'decorations', index: ch.decorations.length });
  };

  const addOrSelectNpc = (id: string) => {
    const existing = ch.npcs.findIndex(n => n.id === id);
    if (existing >= 0) { setSel({ group: 'npcs', index: existing }); return; }
    const base = getBaseChamber(activeId)?.npcs.find(n => n.id === id);
    const { x, y } = center();
    const npc: NPCConfig = base
      ? { ...base, x, y }
      : { id, x, y, color: '#3FB950', name: id, dialog: [''] };
    mutate(c => { c.npcs.push(npc); });
    setSel({ group: 'npcs', index: ch.npcs.length });
  };

  const addOrSelectItem = (id: string, type: ItemConfig['type'], sprite: string) => {
    const existing = ch.items.findIndex(it => it.id === id);
    if (existing >= 0) { setSel({ group: 'items', index: existing }); return; }
    const base = getBaseChamber(activeId)?.items.find(it => it.id === id);
    const { x, y } = center();
    const item: ItemConfig = base ? { ...base, x, y } : { id, type, x, y, sprite };
    mutate(c => { c.items.push(item); });
    setSel({ group: 'items', index: ch.items.length });
  };

  const addDoor = () => {
    const { x, y } = center();
    const template = ch.doors[0];
    const door: DoorConfig = template
      ? { ...JSON.parse(JSON.stringify(template)), id: `door-${ch.doors.length + 1}`, x, y }
      : { id: `door-${ch.doors.length + 1}`, x, y, target: { kind: 'chamber', chamber: activeId }, spawnX: 1, spawnY: 1, locked: false };
    mutate(c => { c.doors.push(door); });
    setSel({ group: 'doors', index: ch.doors.length });
  };

  const addOrSelectKey = () => {
    if (ch.keySpawn) { setSel({ group: 'key' }); return; }
    const { x, y } = center();
    mutate(c => { c.keySpawn = { x, y }; });
    setSel({ group: 'key' });
  };

  const resetChamber = () => {
    const base = getBaseChamber(activeId);
    if (!base) return;
    setDraft(prev => ({ ...prev, [activeId]: serializeChamber(base) }));
    setSel(null);
  };

  const exportJSON = () => {
    const out: DraftMap = {};
    for (const id of chamberIds) if (draft[id]) out[id] = draft[id];
    const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `ccq-layout-${state.currentLevel}-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ---- validation chips ----
  const warnings: string[] = [];
  const isWall = (x: number, y: number) => ch.tiles[y]?.[x] === 1;
  if (isWall(ch.spawnX, ch.spawnY)) warnings.push('spawn point is on a wall');
  ch.items.forEach(it => { if (isWall(it.x, it.y)) warnings.push(`item "${it.id}" on a wall`); });
  ch.npcs.forEach(n => { if (isWall(n.x, n.y)) warnings.push(`npc "${n.id}" on a wall`); });
  if (ch.keySpawn && isWall(ch.keySpawn.x, ch.keySpawn.y)) warnings.push('key spawn on a wall');

  // ---- render helpers ----
  const edgeLight = theme.accentColor;
  const edgeDark = theme.wallShadow ?? theme.accentColor;

  const startEntityDrag = (group: Group, index: number) => (e: React.PointerEvent) => {
    e.stopPropagation();
    setSel({ group, index });
    const ent = (ch[group] as Array<{ x: number; y: number }>)[index];
    if (mode === 'select' && ent) {
      dragRef.current = { group, index, startX: e.clientX, startY: e.clientY, origX: ent.x, origY: ent.y };
    }
  };
  const startSingleDrag = (which: 'key' | 'spawn') => (e: React.PointerEvent) => {
    e.stopPropagation();
    setSel({ group: which } as Sel);
    const orig = which === 'spawn'
      ? { x: ch.spawnX, y: ch.spawnY }
      : ch.keySpawn ? { x: ch.keySpawn.x, y: ch.keySpawn.y } : null;
    if (mode === 'select' && orig) {
      singleDragRef.current = { which, startX: e.clientX, startY: e.clientY, origX: orig.x, origY: orig.y };
    }
  };

  const isSel = (group: string, index?: number) =>
    sel && sel.group === group && (index === undefined || ('index' in sel && sel.index === index));

  const selOutline = (on: boolean): React.CSSProperties =>
    on ? { outline: '2px solid #6BA8DD', outlineOffset: 1, zIndex: 30 } : {};

  const drawerSection = (title: string, children: React.ReactNode) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ color: '#7D7D7D', fontSize: 10, letterSpacing: '0.14em', marginBottom: 6 }}>{title}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{children}</div>
    </div>
  );

  const chipBtn: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 11, padding: '5px 8px',
    background: '#141414', color: '#E8E8E8', border: '1px solid #2A2A2A', cursor: 'pointer',
  };

  // curriculum ids for this level
  const lc = CONTENT[state.currentLevel];
  const loreEntries = lc?.lore ?? [];
  const practiceId = lc?.practice?.id;

  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: '#0A0A0A', display: 'flex', fontFamily: "'JetBrains Mono', monospace", color: '#E8E8E8' }}>
      {/* ---- palette drawer ---- */}
      <div style={{ width: 300, flexShrink: 0, borderRight: '1px solid #2A2A2A', padding: 14, overflowY: 'auto' }}>
        <div style={{ color: '#6BA8DD', fontSize: 12, letterSpacing: '0.16em', fontWeight: 700, marginBottom: 14 }}>✎ LAYOUT MODE</div>

        {drawerSection('STRUCTURE', <>
          <button style={{ ...chipBtn, borderColor: mode === 'paint' ? '#6BA8DD' : '#2A2A2A', color: mode === 'paint' ? '#6BA8DD' : '#E8E8E8' }}
            onClick={() => setMode(m => (m === 'paint' ? 'select' : 'paint'))}>
            {mode === 'paint' ? '▣ Painting walls' : '▢ Paint walls'}
          </button>
          <button style={chipBtn} onClick={addDoor}>+ Door</button>
          <button style={chipBtn} onClick={addOrSelectKey}>+ Key spawn</button>
          <button style={chipBtn} onClick={() => setSel({ group: 'spawn' })}>◎ Spawn</button>
        </>)}

        {drawerSection('CAST', <>
          {(getBaseChamber(activeId)?.npcs ?? ch.npcs).map(n => (
            <button key={n.id} style={chipBtn} onClick={() => addOrSelectNpc(n.id)}>{n.name}</button>
          ))}
          {getBaseChamber(activeId)?.items.filter(it => it.type === 'challenge').map(it => (
            <button key={it.id} style={chipBtn} onClick={() => addOrSelectItem(it.id, it.type, it.sprite)}>⚔ {it.id}</button>
          ))}
        </>)}

        {(loreEntries.length > 0 || practiceId) && drawerSection('CURRICULUM', <>
          {loreEntries.map(l => (
            <button key={l.id} style={chipBtn} onClick={() => addOrSelectItem(l.id, 'lore', 'paper')}>✦ {l.id}</button>
          ))}
          {practiceId && (
            <button style={chipBtn} onClick={() => addOrSelectItem(practiceId, 'practice', 'hint_token')}>✎ {practiceId}</button>
          )}
        </>)}

        {drawerSection('PROPS', PROP_LIST.map(p => (
          <button key={p.key} title={p.cat} style={{ ...chipBtn, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, width: 64 }}
            onClick={() => addProp(p.key)}>
            <PixelSprite frame={PROP_FRAMES[p.key]} palette={PROP_PALETTE} scale={2} />
            <span style={{ fontSize: 8, color: '#7D7D7D', lineHeight: 1.1, textAlign: 'center' }}>{p.label}</span>
          </button>
        )))}
      </div>

      {/* ---- main area ---- */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderBottom: '1px solid #2A2A2A', flexWrap: 'wrap' }}>
          <span style={{ color: '#7D7D7D', fontSize: 11 }}>{level.title}</span>
          <select value={activeId} onChange={e => { setActiveId(e.target.value); setSel(null); }}
            style={{ ...chipBtn, padding: '5px 8px' }}>
            {chamberIds.map(id => <option key={id} value={id}>{level.chambers[id].name}</option>)}
          </select>
          <span style={{ flex: 1 }} />
          <button style={{ ...chipBtn, borderColor: '#7D7D7D' }} onClick={resetChamber}>↺ Reset to source</button>
          <button style={{ ...chipBtn, borderColor: '#3FB950', color: '#3FB950' }} onClick={exportJSON}>⤓ Save as default</button>
          <button style={{ ...chipBtn, borderColor: '#E8633D', color: '#E8633D' }} onClick={onExit}>✕ Exit</button>
        </div>

        {/* canvas */}
        <div style={{ flex: 1, overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div
            ref={canvasRef}
            onPointerDown={e => {
              if (mode === 'paint') {
                const t = tileFromPointer(e.clientX, e.clientY);
                if (t) { paintRef.current = { target: ch.tiles[t.y][t.x] === 1 ? 0 : 1, last: '' }; paintAt(e.clientX, e.clientY); }
              } else {
                setSel(null);
              }
            }}
            style={{ position: 'relative', width: ch.width * cell, height: ch.height * cell, flexShrink: 0, cursor: mode === 'paint' ? 'crosshair' : 'default', boxShadow: '0 0 0 1px #2A2A2A' }}
          >
            {/* tiles */}
            {ch.tiles.map((row, y) => row.map((tile, x) => {
              const wall = tile === 1;
              const door = tile === 2;
              const wN = !wall && ch.tiles[y - 1]?.[x] === 1;
              const wS = !wall && ch.tiles[y + 1]?.[x] === 1;
              const wW = !wall && ch.tiles[y]?.[x - 1] === 1;
              const wE = !wall && ch.tiles[y]?.[x + 1] === 1;
              return (
                <div key={`${x}-${y}`} style={{
                  position: 'absolute', left: x * cell, top: y * cell, width: cell, height: cell,
                  background: door ? '#241a14' : wall ? '#0C0B0A' : theme.floorColor,
                  boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.04)',
                }}>
                  {wN && <div style={{ position: 'absolute', left: 0, top: 0, width: cell, height: 2, background: edgeLight }} />}
                  {wW && <div style={{ position: 'absolute', left: 0, top: 0, width: 2, height: cell, background: edgeLight }} />}
                  {wS && <div style={{ position: 'absolute', left: 0, bottom: 0, width: cell, height: 2, background: edgeDark }} />}
                  {wE && <div style={{ position: 'absolute', right: 0, top: 0, width: 2, height: cell, background: edgeDark }} />}
                  {door && <div style={{ position: 'absolute', inset: 3, border: '2px solid #E8633D' }} />}
                </div>
              );
            }))}

            {/* spawn marker */}
            <EntityBox x={ch.spawnX} y={ch.spawnY} cell={cell} onPointerDown={startSingleDrag('spawn')} style={selOutline(!!isSel('spawn'))}>
              <div style={{ width: cell * 0.7, height: cell * 0.7, borderRadius: '50%', border: '2px dashed #6BA8DD', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6BA8DD', fontSize: cell * 0.3 }}>P</div>
            </EntityBox>

            {/* key spawn */}
            {ch.keySpawn && (
              <EntityBox x={ch.keySpawn.x} y={ch.keySpawn.y} cell={cell} onPointerDown={startSingleDrag('key')} style={selOutline(!!isSel('key'))}>
                <PixelSprite frame="key" scale={(cell * 1.3) / spriteCols(FRAMES.key)} />
              </EntityBox>
            )}

            {/* doors (entity-movable, separate from door tiles) */}
            {ch.doors.map((d, i) => (
              <EntityBox key={`door-${i}`} x={d.x} y={d.y} cell={cell} onPointerDown={startEntityDrag('doors', i)} style={selOutline(!!isSel('doors', i))}>
                <div style={{ width: cell * 0.8, height: cell * 0.8, background: d.locked ? '#3a2a1a' : '#241a14', border: `2px solid ${d.locked ? '#7D7D7D' : '#E8633D'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: d.locked ? '#7D7D7D' : '#E8633D', fontSize: cell * 0.3 }}>{d.locked ? '🔒' : 'D'}</div>
              </EntityBox>
            ))}

            {/* decorations (props) */}
            {ch.decorations.map((dec, i) => {
              const isProp = Boolean(PROP_FRAMES[dec.sprite]);
              const frame = isProp ? PROP_FRAMES[dec.sprite] : FRAMES[dec.sprite];
              return (
                <EntityBox key={`dec-${i}`} x={dec.x} y={dec.y} cell={cell} onPointerDown={startEntityDrag('decorations', i)} style={selOutline(!!isSel('decorations', i))}>
                  {frame && <PixelSprite frame={isProp ? PROP_FRAMES[dec.sprite] : dec.sprite} palette={isProp ? PROP_PALETTE : undefined} scale={(cell * 1.4) / spriteCols(frame)} />}
                </EntityBox>
              );
            })}

            {/* items */}
            {ch.items.map((it, i) => (
              <EntityBox key={`item-${i}`} x={it.x} y={it.y} cell={cell} onPointerDown={startEntityDrag('items', i)} style={selOutline(!!isSel('items', i))}>
                {FRAMES[it.sprite] && <PixelSprite frame={it.sprite} scale={(cell * 1.5) / spriteCols(FRAMES[it.sprite])} primaryColor={it.type !== 'challenge' ? theme.accentColor : undefined} />}
              </EntityBox>
            ))}

            {/* npcs */}
            {ch.npcs.map((n, i) => (
              <EntityBox key={`npc-${i}`} x={n.x} y={n.y} cell={cell} onPointerDown={startEntityDrag('npcs', i)} style={selOutline(!!isSel('npcs', i))}>
                <PixelSprite frame={n.sprite ?? 'idle_a'} primaryColor={n.color} scale={(cell * 1.4) / spriteCols(FRAMES[n.sprite ?? 'idle_a'])} />
              </EntityBox>
            ))}

            {/* drag ghost */}
            {ghost && (
              <div style={{ position: 'absolute', left: ghost.x * cell, top: ghost.y * cell, width: cell, height: cell, border: '2px solid #6BA8DD', background: 'rgba(107,168,221,0.18)', pointerEvents: 'none', zIndex: 40 }} />
            )}
          </div>
        </div>

        {/* status bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 16px', borderTop: '1px solid #2A2A2A', fontSize: 11, color: '#7D7D7D', minHeight: 34 }}>
          <span>{ch.width}×{ch.height}</span>
          {sel && <span style={{ color: '#6BA8DD' }}>
            selected: {sel.group}{'index' in sel ? ` #${sel.index}` : ''}
            <button style={{ ...chipBtn, marginLeft: 8, padding: '2px 6px', borderColor: '#E8633D', color: '#E8633D' }} onClick={deleteSelected}>🗑 delete</button>
          </span>}
          <span style={{ flex: 1 }} />
          {warnings.length > 0
            ? <span style={{ color: '#E8B341' }}>⚠ {warnings.length}: {warnings.slice(0, 2).join(' · ')}{warnings.length > 2 ? ' …' : ''}</span>
            : <span style={{ color: '#3FB950' }}>✓ no issues</span>}
          <span>{mode === 'paint' ? 'click/drag tiles to toggle walls' : 'click to select · drag to move'}</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function EntityBox({ x, y, cell, onPointerDown, style, children }: {
  x: number; y: number; cell: number;
  onPointerDown: (e: React.PointerEvent) => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      onPointerDown={onPointerDown}
      style={{
        position: 'absolute', left: x * cell, top: y * cell, width: cell, height: cell,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'grab', touchAction: 'none', zIndex: 20, ...style,
      }}
    >
      {children}
    </div>
  );
}
