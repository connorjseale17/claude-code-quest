import { useEffect, useMemo, useRef, useState } from 'react';
import { useGame } from '../engine/GameContext';
import { TerminalFrame, Cursor } from './TerminalFrame';

/**
 * Wrap-up Part 2 — the Certification Page.
 *
 * Loads the standalone certificate HTML from /cert/quest-certificate.html
 * (shipped as a static asset, NOT bundled into the JS — keeps it out of the
 * main bundle), string-replaces its four placeholders with the player's
 * values, renders the populated HTML in an iframe via srcDoc, and exposes a
 * "Download PDF" button that triggers the iframe's print pipeline. Native
 * print → "Save as PDF" gives vector-quality output with no JS-PDF library.
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
    // Inject a print stylesheet so the dialog defaults to landscape with no
    // margins. The cert is designed landscape; this stops the browser from
    // adding white borders or reflowing onto two pages.
    out = out.replace(
      '</head>',
      `<style>@media print {
        @page { size: landscape; margin: 0; }
        html, body { background: #fff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }</style></head>`,
    );
    return out;
  }, [template, name, issueDateLong, expirationDateLong, issueDateIso]);

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
          padding: '24px 32px 20px',
          gap: 16,
          fontFamily: "'JetBrains Mono', monospace",
          color: '#E8E8E8',
          background: '#0A0A0A',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <div style={{ color: '#E8633D', fontSize: 13, letterSpacing: '0.18em' }}>
            ── YOUR CREDENTIAL ──
          </div>
          <div style={{ color: '#7D7D7D', fontSize: 11 }}>
            issued {issueDateLong}
            <span style={{ marginLeft: 14, color: '#3A3A3A' }}>
              · valid through {expirationDateLong}
            </span>
          </div>
        </div>

        {/* Name capture + download row */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <label style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ color: '#7D7D7D', fontSize: 11, letterSpacing: '0.12em' }}>
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
                padding: '10px 14px',
                fontFamily: 'inherit',
                fontSize: 15,
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
              padding: '12px 22px',
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.14em',
              cursor: populated ? 'pointer' : 'not-allowed',
              whiteSpace: 'nowrap',
            }}
          >
            ⤓ DOWNLOAD PDF
          </button>
        </div>

        <div style={{ color: '#7D7D7D', fontSize: 11, lineHeight: 1.5 }}>
          The certificate updates live as you type. The Download PDF button opens your browser's
          print dialog — choose <span style={{ color: '#E8E8E8' }}>Save as PDF</span> to save the
          credential locally. The default filename will be{' '}
          <span style={{ color: '#E8E8E8' }}>
            claude-code-quest-certificate-{safeFilenameStem(name || state.player.name || 'operator')}.pdf
          </span>
          .
        </div>

        {/* Live preview iframe */}
        <div
          style={{
            flex: 1,
            minHeight: 360,
            background: '#1A1815',
            border: '1px solid #2A2A2A',
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
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#7D7D7D',
                fontSize: 13,
              }}
            >
              loading certificate template<Cursor />
            </div>
          )}
          {populated && (
            <iframe
              ref={iframeRef}
              srcDoc={populated}
              title="Claude Code Quest Certificate Preview"
              // sandbox lets the cert's bundler runtime work but keeps it
              // walled off from the parent app. allow-same-origin so we can
              // call print() on contentWindow.
              sandbox="allow-scripts allow-same-origin allow-modals"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
                background: '#FFF',
              }}
            />
          )}
        </div>

        <div style={{ color: '#3A3A3A', fontSize: 10, textAlign: 'center', letterSpacing: '0.08em' }}>
          credential id is computed locally from your name and the issue date — no server, no storage
        </div>
      </div>
    </TerminalFrame>
  );
}
