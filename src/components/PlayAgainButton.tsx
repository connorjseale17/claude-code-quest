/**
 * Shared "play again" button for the end-of-run screens (certification page,
 * TWiC stamp, quest end screen). Dispatches RESTART_RUN via the supplied
 * handler, which resets run progress and returns the player to path-select.
 */
export function PlayAgainButton({
  accent,
  onClick,
  label = '↻ PLAY AGAIN',
}: {
  accent: string;
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.12em',
        padding: '9px 20px',
        background: 'transparent',
        color: accent,
        border: `1px solid ${accent}`,
        cursor: 'pointer',
        transition: 'background 120ms ease, color 120ms ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = accent;
        e.currentTarget.style.color = '#0A0A0A';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = accent;
      }}
    >
      {label}
    </button>
  );
}
