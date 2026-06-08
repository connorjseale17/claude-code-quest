import { useEffect, useMemo, useRef, useState } from 'react';
import { useGame, useGameDispatch } from '../engine/GameContext';
import { TerminalFrame, Cursor } from './TerminalFrame';
import { CREDITS } from '../credits';
import { LeaderboardCard } from './LeaderboardCard';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { currentUid } from '../lib/firebase';

/**
 * Wrap-up Part 2 — the Certification Page.
 *
 * Loads the standalone certificate HTML from /cert/quest-certificate.html
 * (shipped as a static asset, NOT bundled into the JS — keeps it out of the
 * main bundle), string-replaces its four placeholders with the player's
 * values, renders the populated HTML in a landscape-aspect iframe via
 * srcDoc, and exposes a "Download PDF" button that triggers the iframe's
 * print pipeline. Native print → "Save as PDF" gives vector-quality output
 * with no JS-PDF library.
 *
 * Layout: ONE compact top row (dates · name input · download button), then
 * the iframe takes ALL remaining height locked to 3:2 landscape, then a
 * tiny one-line footer (credential-id note + team credits). This pins the
 * cert preview as the dominant element instead of a half-cut afterthought
 * below a tall name-entry block.
 *
 * Placeholders in the certificate template:
 *   {{RECIPIENT_NAME}}    — player name (from state.player.name, editable)
 *   {{ISSUE_DATE}}        — today (auto-filled)
 *   {{EXPIRATION_DATE}}   — today + 1 year (auto-filled)
 *   {{CREDENTIAL_ID}}     — deterministic hash of name + date
 *
 * Per PRD §7: no backend, no server-side storage, no verification system.
 * The credential id is for visual completeness only.
 */

const CERT_URL = '/cert/quest-certificate.html';

// The cert HTML is a standalone bundle that unpacks asynchronously and its
// real rendered size isn't known until after the bundler runs. We measure
// scrollWidth/scrollHeight dynamically via a MutationObserver and ResizeObserver
// pair, rather than assuming the design dims from the thumbnail SVG. See the
// useEffect below that drives the fit-zoom on every content/size change.

function formatLongDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function addYears(d: Date, years: number): Date {
  const out = new Date(d);
  out.setFullYear(out.getFullYear() + years);
  return out;
}

/** Deterministic djb2-style 32-bit hash → 8-char hex credential id.
 *  Same name + same date → same id, so re-downloading gives the same value. */
function credentialId(name: string, isoDate: string): string {
  const s = name.trim().toLowerCase() + '|' + isoDate;
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return 'CCQ-' + (h >>> 0).toString(16).toUpperCase().padStart(8, '0');
}

function safeFilenameStem(name: string): string {
  const cleaned = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return cleaned || 'operator';
}

export function CertificationPage() {
  const state = useGame();
  const dispatch = useGameDispatch();
  // The run is already finished here, so freeze its elapsed time once on mount
  // (a fresh Date.now() each render would refetch the rank in a loop).
  const finalElapsedMs = useMemo(
    () => (state.runStartedAt != null
      ? Math.max(0, Date.now() - state.runStartedAt - state.runPausedElapsedMs)
      : 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const hasRun = state.runStartedAt != null;
  const prizesTotal = state.prizesUnlocked.length;
  const leaderboard = useLeaderboard(
    hasRun ? finalElapsedMs : undefined,
    hasRun ? prizesTotal : undefined,
  );
  const [template, setTemplate] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [name, setName] = useState<string>(state.player.name || '');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeBoxRef = useRef<HTMLDivElement>(null);

  // Today + +1 year, computed once on mount so the page doesn't shift if the
  // user lingers across midnight.
  const { issueDateLong, expirationDateLong, issueDateIso } = useMemo(() => {
    const now = new Date();
    const exp = addYears(now, 1);
    return {
      issueDateLong: formatLongDate(now),
      expirationDateLong: formatLongDate(exp),
      issueDateIso: now.toISOString().slice(0, 10),
    };
  }, []);

  // Fetch the cert template once on mount.
  useEffect(() => {
    let aborted = false;
    fetch(CERT_URL)
      .then(r => {
        if (!r.ok) throw new Error(`cert HTTP ${r.status}`);
        return r.text();
      })
      .then(txt => {
        if (!aborted) setTemplate(txt);
      })
      .catch(err => {
        if (!aborted) setLoadError(String(err?.message ?? err));
      });
    return () => { aborted = true; };
  }, []);

  // Populate the template with current values whenever name/dates change.
  const populated = useMemo(() => {
    if (!template) return null;
    const finalName = (name.trim() || 'Operator');
    const credId = credentialId(finalName, issueDateIso);
    // String-replace the four placeholders. The cert HTML is a self-contained
    // bundle (its own __bundler runtime that unpacks assets), so we treat it
    // as a black box — only swap the {{...}} tokens, never touch its DOM.
    let out = template
      .replace(/\{\{RECIPIENT_NAME\}\}/g, finalName)
      .replace(/\{\{ISSUE_DATE\}\}/g, issueDateLong)
      .replace(/\{\{EXPIRATION_DATE\}\}/g, expirationDateLong)
      .replace(/\{\{CREDENTIAL_ID\}\}/g, credId);
    // Override the <title> so the browser's print dialog defaults to a
    // sensible filename when the user picks "Save as PDF".
    const titleStem = safeFilenameStem(finalName);
    out = out.replace(
      /<title>[^<]*<\/title>/,
      `<title>claude-code-quest-certificate-${titleStem}</title>`,
    );
    // NOTE: we deliberately DON'T inject a <style> into <head> here. The cert
    // is a self-unpacking bundle whose runtime calls
    // `document.documentElement.replaceWith(...)` — that nukes the entire
    // <html> (including any <style> we add) the moment it unpacks. The cert
    // also self-handles landscape print (its own template carries
    // `@page { size: 11in 8.5in }`). All screen fit/centering is therefore
    // applied as INLINE styles on the post-unpack <body> in the effect below,
    // which survive (nothing replaces the html again) and beat the cert's own
    // stylesheet rules.
    return out;
  }, [template, name, issueDateLong, expirationDateLong, issueDateIso]);

  // Fit + center the unpacked cert inside the preview pane. The cert is a
  // 1200x800-ish fixed design that unpacks asynchronously via a bundler that
  // REPLACES document.documentElement. Two consequences shape this code:
  //   1. We must observe the DOCUMENT node (not body/documentElement) so the
  //      observer survives the replaceWith and re-fits once the real cert lands.
  //   2. We apply sizing as inline styles on the post-unpack <body>: neutralize
  //      its min-height:100vh (which fights centering), make <html> a flex box
  //      that centers <body>, and transform:scale() the body to fit. transform
  //      respects transform-origin:center (unlike CSS zoom, which always shrinks
  //      toward the top-left corner — the old 'stuck to the bottom' bug).
  useEffect(() => {
    if (!populated) return;
    const iframe = iframeRef.current;
    const box = iframeBoxRef.current;
    if (!iframe || !box) return;

    let mo: MutationObserver | null = null;
    let raf = 0;

    const applyFit = () => {
      const doc = iframe.contentDocument;
      const html = doc?.documentElement;
      const body = doc?.body;
      if (!html || !body) return;
      const rect = box.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      // Reset to a clean, measurable layout: kill any prior transform, drop the
      // cert's min-height:100vh, and let html lay out as a plain block so
      // body.scrollWidth/Height report the cert's true natural size.
      body.style.transform = 'none';
      body.style.minHeight = '0';
      body.style.margin = '0';
      html.style.display = 'block';
      html.style.margin = '0';

      const contentW = body.scrollWidth;
      const contentH = body.scrollHeight;
      if (contentW <= 0 || contentH <= 0) return;

      const fit = Math.min(rect.width / contentW, rect.height / contentH) * 0.98;

      // Now center: html fills the iframe and flex-centers body; body is scaled
      // about its own center so it stays put as it shrinks.
      html.style.width = '100%';
      html.style.height = '100%';
      html.style.display = 'flex';
      html.style.alignItems = 'center';
      html.style.justifyContent = 'center';
      html.style.overflow = 'hidden';
      body.style.transformOrigin = 'center center';
      body.style.transform = `scale(${fit})`;
    };

    const scheduleApply = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(applyFit);
    };

    const attachObserver = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      mo?.disconnect();
      mo = new MutationObserver(scheduleApply);
      // Observe the DOCUMENT node so we catch documentElement.replaceWith()
      // (the bundler's swap), plus any subtree changes as the cert renders.
      mo.observe(doc, { childList: true, subtree: true, characterData: true });
    };

    const onLoad = () => {
      scheduleApply();
      attachObserver();
    };

    iframe.addEventListener('load', onLoad);
    const ro = new ResizeObserver(scheduleApply);
    ro.observe(box);
    // Cover the case where 'load' already fired before this effect ran.
    attachObserver();
    scheduleApply();

    return () => {
      iframe.removeEventListener('load', onLoad);
      ro.disconnect();
      mo?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [populated]);

  const handlePrint = () => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    // Give the cert's bundler a beat to finish unpacking if the user clicks
    // immediately on mount — focus() also helps Safari open the dialog
    // reliably.
    win.focus();
    win.print();
  };

  return (
    <TerminalFrame title="claude-code-quest --certificate" accent>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 24px 12px',
          gap: 12,
          fontFamily: "'JetBrains Mono', monospace",
          color: '#E8E8E8',
          background: '#0A0A0A',
        }}
      >
        {/* Top bar: title + dates · name input · download button — all one row */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 auto' }}>
            <div style={{ color: '#E8633D', fontSize: 12, letterSpacing: '0.16em' }}>
              YOUR CREDENTIAL
            </div>
            <div style={{ color: '#7D7D7D', fontSize: 10, marginTop: 4 }}>
              issued {issueDateLong}
              <span style={{ marginLeft: 10, color: '#3A3A3A' }}>
                · valid through {expirationDateLong}
              </span>
            </div>
          </div>
          <label style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ color: '#7D7D7D', fontSize: 10, letterSpacing: '0.12em' }}>
              FULL NAME (as you'd like it on the certificate)
            </span>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Operator"
              autoFocus
              style={{
                background: '#141414',
                border: '1px solid #2A2A2A',
                color: '#E8E8E8',
                padding: '8px 12px',
                fontFamily: 'inherit',
                fontSize: 14,
                outline: 'none',
                letterSpacing: '0.02em',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#E8633D'; }}
              onBlur={e => { e.currentTarget.style.borderColor = '#2A2A2A'; }}
            />
          </label>
          <button
            onClick={handlePrint}
            disabled={!populated}
            style={{
              background: populated ? '#E8633D' : '#3A3A3A',
              border: 'none',
              color: '#0A0A0A',
              padding: '11px 20px',
              fontFamily: 'inherit',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.14em',
              cursor: populated ? 'pointer' : 'not-allowed',
              whiteSpace: 'nowrap',
              flex: '0 0 auto',
            }}
          >
            ⤓ DOWNLOAD PDF
          </button>
          <button
            onClick={() => dispatch({ type: 'RESTART_RUN' })}
            style={{
              background: 'transparent',
              border: '1px solid #2A2A2A',
              color: '#9A9A9A',
              padding: '11px 18px',
              fontFamily: 'inherit',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.14em',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flex: '0 0 auto',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#E8633D'; e.currentTarget.style.color = '#E8E8E8'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; e.currentTarget.style.color = '#9A9A9A'; }}
          >
            ↻ PLAY AGAIN
          </button>
        </div>

        {/* Preview area + leaderboard sidebar. Horizontal flex so the cert
            iframe shares the row with a 280px LeaderboardCard. The cert iframe
            owns its own fit-zoom (ResizeObserver below) so shrinking its box
            width just makes the cert smaller — no clipping. */}
        <div style={{ flex: 1, display: 'flex', gap: 16, minHeight: 220 }}>
        <div
          style={{
            flex: 1,
            minHeight: 220,
            background: '#1A1815',
            border: '1px solid #2A2A2A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {loadError && (
            <div style={{ padding: 24, color: '#F85149', fontSize: 13 }}>
              <div>Certificate template failed to load.</div>
              <div style={{ marginTop: 6, color: '#7D7D7D', fontSize: 11 }}>{loadError}</div>
            </div>
          )}
          {!loadError && !populated && (
            <div style={{ color: '#7D7D7D', fontSize: 13 }}>
              loading certificate template<Cursor />
            </div>
          )}
          {populated && (
            // Iframe box fills the preview pane (ResizeObserver measures it).
            // The iframe fills the box; the cert INSIDE is fit + centered by
            // applyFit (inline styles on the post-unpack body).
            <div
              ref={iframeBoxRef}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
              }}
            >
              <iframe
                ref={iframeRef}
                srcDoc={populated}
                title="Claude Code Quest Certificate Preview"
                // sandbox lets the cert's bundler runtime work but keeps it
                // walled off from the parent app. allow-same-origin so we can
                // measure contentDocument + call print() on contentWindow.
                sandbox="allow-scripts allow-same-origin allow-modals"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  display: 'block',
                  background: '#FFF',
                }}
              />
            </div>
          )}
        </div>
          <div style={{ flex: '0 0 280px', display: 'flex', flexDirection: 'column' }}>
            <LeaderboardCard
              fastest={leaderboard.fastest}
              mostPrizes={leaderboard.mostPrizes}
              totalCompletions={leaderboard.totalCompletions}
              currentUid={currentUid()}
              loading={leaderboard.loading}
              error={leaderboard.error}
              currentRun={hasRun ? {
                elapsed_ms: finalElapsedMs,
                prizes_total: prizesTotal,
                speedRank: leaderboard.speedRank,
                prizesRank: leaderboard.prizesRank,
              } : undefined}
            />
          </div>
        </div>

        {/* Compact footer: cred-id note + bookend credits, single horizontal row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '6px 16px',
            paddingTop: 8,
            borderTop: '1px solid #1A1A1A',
            fontSize: 10,
            letterSpacing: '0.04em',
          }}
        >
          <span style={{ color: '#3A3A3A' }}>
            credential id computed locally · no server · save as PDF for landscape file
          </span>
          <span style={{ display: 'flex', gap: 14, flexWrap: 'wrap', color: '#7D7D7D' }}>
            <span style={{ color: '#3A3A3A', letterSpacing: '0.12em' }}>BUILT BY ──</span>
            {CREDITS.map(c => (
              <span key={c.name}>
                <span style={{ color: '#7D7D7D' }}>{c.role}:</span>{' '}
                <span style={{ color: '#E8633D' }}>{c.name}</span>
              </span>
            ))}
          </span>
        </div>
      </div>
    </TerminalFrame>
  );
}
