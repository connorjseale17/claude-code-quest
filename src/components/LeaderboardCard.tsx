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
  marginTop: 8,
  marginBottom: 4,
} as const;

const ROW_STYLE = {
  fontSize: 12,
  lineHeight: 1.8,
  color: '#E8E8E8',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
} as const;

const EMPTY_ROW_STYLE = {
  fontSize: 12,
  lineHeight: 1.8,
  color: '#3A3A3A',
} as const;

const FOOTER_STYLE = {
  borderTop: '1px solid #2A2A2A',
  marginTop: 10,
  paddingTop: 10,
  color: '#7D7D7D',
  fontSize: 11,
} as const;

function formatTime(ms: number): string {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function truncateHandle(handle: string): string {
  return handle.length > 12 ? handle.slice(0, 12) : handle;
}

function renderRow(
  row: LeaderboardRow,
  idx: number,
  currentUid: string | null,
  showPrizes: boolean,
) {
  const isCurrent = currentUid !== null && row.uid === currentUid;
  const prefix = isCurrent ? '> ' : '  ';
  const handle = truncateHandle(row.handle);
  const time = formatTime(row.elapsed_ms);
  const body = showPrizes
    ? `${idx + 1}. ${handle} · ${row.prizes_total} · ${time}`
    : `${idx + 1}. ${handle} · ${time}`;
  return (
    <div
      key={row.runId}
      style={{
        ...ROW_STYLE,
        color: isCurrent ? '#FFD700' : '#E8E8E8',
      }}
    >
      {prefix}
      {body}
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
      {[0, 1, 2, 3, 4].map(i => (
        <div key={i} style={{ ...ROW_STYLE, color: '#3A3A3A' }}>
          ──────
        </div>
      ))}
    </>
  );
}

function renderErrorRows() {
  return (
    <>
      {[0, 1, 2, 3, 4].map(i => (
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
}: LeaderboardCardProps) {
  const headerText = error ? 'LEADERBOARD · OFFLINE' : 'LEADERBOARD';

  let footerText: string;
  if (loading) {
    footerText = 'loading…';
  } else if (error) {
    footerText = "couldn't reach leaderboard";
  } else {
    footerText = `${totalCompletions} operators have finished`;
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

      <div style={FOOTER_STYLE}>{footerText}</div>
    </div>
  );
}
