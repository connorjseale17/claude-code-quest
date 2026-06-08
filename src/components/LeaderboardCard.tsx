import { colorHexFromIdx } from '../lib/palette';

type LeaderboardRow = {
  runId: string;
  handle: string;
  colorIdx: number;
  elapsed_ms: number;
  prizes_total: number;
  uid: string;
};

interface LeaderboardCardProps {
  fastest: LeaderboardRow[];
  mostPrizes: LeaderboardRow[];
  totalCompletions: number;
  currentUid: string | null;
  loading: boolean;
  error: boolean;
  /** Current player's in-flight or just-finished run stats. When present,
   *  renders a "your run" footer line so the player always sees where they
   *  stand even if they didn't make top 7. speedRank/prizesRank, when set,
   *  show the run's global placement (e.g. "#4 fastest"). */
  currentRun?: {
    elapsed_ms: number;
    prizes_total: number;
    speedRank?: number | null;
    prizesRank?: number | null;
  };
}

const CARD_STYLE = {
  width: 280,
  border: '1px solid #2A2A2A',
  padding: '14px 18px',
  background: '#0F0F0F',
} as const;

const HEADER_STYLE = {
  color: '#E8633D',
  fontSize: 11,
  letterSpacing: '0.12em',
  marginBottom: 10,
} as const;

const SUBSECTION_STYLE = {
  color: '#7D7D7D',
  fontSize: 10,
  letterSpacing: '0.10em',
  marginTop: 10,
  marginBottom: 4,
} as const;

const ROW_STYLE = {
  fontSize: 12,
  lineHeight: 1.7,
  color: '#E8E8E8',
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
} as const;

const EMPTY_ROW_STYLE = {
  fontSize: 12,
  lineHeight: 1.7,
  color: '#3A3A3A',
} as const;

const FOOTER_STYLE = {
  borderTop: '1px solid #2A2A2A',
  marginTop: 10,
  paddingTop: 10,
  color: '#7D7D7D',
  fontSize: 11,
} as const;

const YOU_LINE_STYLE = {
  marginTop: 8,
  paddingTop: 6,
  borderTop: '1px dashed #1F1F1F',
  fontSize: 11,
  color: '#7D7D7D',
} as const;

function formatTime(ms: number): string {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function truncateHandle(handle: string): string {
  return handle.length > 11 ? handle.slice(0, 11) : handle;
}

function ColorChip({ colorIdx }: { colorIdx: number }) {
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-block',
        width: 8,
        height: 8,
        background: colorHexFromIdx(colorIdx),
        flex: '0 0 8px',
        marginRight: 2,
      }}
    />
  );
}

function renderRow(
  row: LeaderboardRow,
  idx: number,
  currentUid: string | null,
  showPrizes: boolean,
) {
  const isCurrent = currentUid !== null && row.uid === currentUid;
  const handle = truncateHandle(row.handle);
  const time = formatTime(row.elapsed_ms);
  const tail = showPrizes
    ? `${row.prizes_total} · ${time}`
    : time;
  return (
    <div
      key={row.runId}
      style={{
        ...ROW_STYLE,
        color: isCurrent ? '#FFD700' : '#E8E8E8',
      }}
    >
      <span style={{ width: 14, color: isCurrent ? '#FFD700' : '#7D7D7D' }}>
        {isCurrent ? '>' : ' '}{idx + 1}
      </span>
      <ColorChip colorIdx={row.colorIdx} />
      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {handle}
      </span>
      <span style={{ color: isCurrent ? '#FFD700' : '#9A9A9A' }}>
        {tail}
      </span>
    </div>
  );
}

function renderList(
  rows: LeaderboardRow[],
  currentUid: string | null,
  showPrizes: boolean,
) {
  if (rows.length === 0) {
    return <div style={EMPTY_ROW_STYLE}>  no runs yet</div>;
  }
  return <>{rows.map((row, idx) => renderRow(row, idx, currentUid, showPrizes))}</>;
}

function renderSkeleton() {
  return (
    <>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ ...ROW_STYLE, color: '#2A2A2A' }}>
          ──────
        </div>
      ))}
    </>
  );
}

function renderErrorRows() {
  return (
    <>
      {[0, 1, 2].map(i => (
        <div key={i} style={EMPTY_ROW_STYLE}>
          —
        </div>
      ))}
    </>
  );
}

export function LeaderboardCard({
  fastest,
  mostPrizes,
  totalCompletions,
  currentUid,
  loading,
  error,
  currentRun,
}: LeaderboardCardProps) {
  const headerText = error ? 'LEADERBOARD · OFFLINE' : 'LEADERBOARD';

  let footerText: string;
  if (loading) {
    footerText = 'loading…';
  } else if (error) {
    footerText = "couldn't reach leaderboard";
  } else {
    footerText = `${totalCompletions} operator${totalCompletions === 1 ? '' : 's'} finished`;
  }

  return (
    <div style={CARD_STYLE}>
      <div style={HEADER_STYLE}>{headerText}</div>

      <div style={SUBSECTION_STYLE}>FASTEST</div>
      {loading
        ? renderSkeleton()
        : error
          ? renderErrorRows()
          : renderList(fastest, currentUid, false)}

      <div style={SUBSECTION_STYLE}>MOST PRIZES</div>
      {loading
        ? renderSkeleton()
        : error
          ? renderErrorRows()
          : renderList(mostPrizes, currentUid, true)}

      {currentRun && (
        <div style={YOU_LINE_STYLE}>
          <div>
            your run:{' '}
            <span style={{ color: '#FFD700' }}>
              {formatTime(currentRun.elapsed_ms)}
            </span>
            {' · '}
            <span style={{ color: '#FFD700' }}>
              {currentRun.prizes_total} prize{currentRun.prizes_total === 1 ? '' : 's'}
            </span>
          </div>
          {(currentRun.speedRank != null || currentRun.prizesRank != null) && (
            <div style={{ marginTop: 2 }}>
              {currentRun.speedRank != null && (
                <span style={{ color: '#9A9A9A' }}>
                  #{currentRun.speedRank} fastest
                </span>
              )}
              {currentRun.speedRank != null && currentRun.prizesRank != null && (
                <span style={{ color: '#3A3A3A' }}> · </span>
              )}
              {currentRun.prizesRank != null && (
                <span style={{ color: '#9A9A9A' }}>
                  #{currentRun.prizesRank} prizes
                </span>
              )}
            </div>
          )}
        </div>
      )}

      <div style={FOOTER_STYLE}>{footerText}</div>
    </div>
  );
}
