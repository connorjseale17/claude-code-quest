import { useEffect, useMemo, useRef, useState } from 'react';
import { useGame } from '../engine/GameContext';
import { TerminalFrame, Cursor } from './TerminalFrame';
import { CREDITS } from '../credits';

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

// The cert HTML is designed at this logical pixel size (3:2 landscape — see
// the thumbnail SVG's viewBox="0 0 1200 800" in the template). The preview
// uses CSS zoom to scale this to fit the iframe; the print stylesheet
// resets zoom to 1 and pins the @page to landscape Letter so the PDF
// renders at full design fidelity.
const CERT_NATURAL_W = 1200;
const CERT_NATURAL_H = 800;

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
    // Inject CSS that does two things:
    //   1. Screen: scale the cert down via CSS zoom so the full landscape
    //      design fits inside the preview iframe instead of being cut off
    //      on the right. The dynamic zoom is applied imperatively after the
    //      iframe loads (see the useEffect below); this static fallback
    //      handles the brief flash before measurement.
    //   2. Print: pin @page to landscape Letter (11in × 8.5in) with zero
    //      margin and reset zoom to 1 so the printed PDF renders at full
    //      design fidelity in landscape, not portrait.
    out = out.replace(
      '</head>',
      `<style>
        @media screen {
          html, body { margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: #fff !important; }
          html { zoom: 0.5; }
        }
        @media print {
          @page { size: 11in 8.5in; margin: 0; }
          html { zoom: 1 !important; }
          html, body { background: #fff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; overflow: visible !important; }
        }
      </style></head>`,
    );
    return out;
  }, [template, name, issueDateLong, expirationDateLong, issueDateIso]);

  // After the iframe is populated, measure its actual rendered size and set
  // the cert content's CSS zoom so the full design (CERT_NATURAL_W ×
  // CERT_NATURAL_H) fits inside the iframe with no clipping. Re-runs if the
  // iframe wrapper resizes (e.g. game scale change). Print zoom is reset to
  // 1 via the injected @media print rule above, so this only affects preview.
  useEffect(() => {
    if (!populated) return;
    const iframe = iframeRef.current;
    const box = iframeBoxRef.current;
    if (!iframe || !box) return;

    const applyZoom = () => {
      const doc = iframe.contentDocument;
      if (!doc?.documentElement) return;
      const rect = box.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const fit = Math.min(rect.width / CERT_NATURAL_W, rect.height / CERT_NATURAL_H);
      // Slight pad so the cert doesn't touch the iframe border.
      (doc.documentElement.style as CSSStyleDeclaration & { zoom?: string }).zoom = String(fit * 0.96);
    };

    // Run on iframe load AND on any resize of its container.
    iframe.addEventListener('load', applyZoom);
    const ro = new ResizeObserver(applyZoom);
    ro.observe(box);
    // First attempt — covers fast paths where load already fired.
    applyZoom();

    return () => {
      iframe.removeEventListener('load', applyZoom);
      ro.disconnect();
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
        </div>

        {/* Landscape preview area. The wrapper takes all remaining height; the
            inner box is forced to 3:2 (the cert's design aspect) and centered. */}
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
            <div
              ref={iframeBoxRef}
              style={{
                aspectRatio: `${CERT_NATURAL_W} / ${CERT_NATURAL_H}`,
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
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
