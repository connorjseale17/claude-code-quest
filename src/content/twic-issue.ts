/**
 * Floor-level "Issue Intro" — the dated framing for the current TWiC floor.
 * Sits ABOVE the per-room LessonContent. Two surfaces consume it:
 *   1. The PATH SELECT screen, which tags the TWiC tile with UPDATED · {date}.
 *   2. The one-shot TwicIssueIntroOverlay rendered on entry into twic-1.
 *
 * For the foundation, this is a hand-edited constant. A later routine will
 * regenerate it weekly along with the three rooms' content.
 */

export type TwicIssueIntro = {
  /** ISO date string (YYYY-MM-DD) of the issue's publish date. */
  publishDate: string;
  /** One- to two-sentence framing of the week's rundown. */
  framing: string;
};

export const TWIC_ISSUE_INTRO: TwicIssueIntro = {
  publishDate: '2026-09-21',
  framing:
    "This week in Claude, the throughline is where the instructions live and where the reach stops — the brief a session reads, the redirect you can still land mid-turn, and the hosts a runaway command may touch. AGENTS.md arrives as a fallback: with no CLAUDE.md in a project, Claude Code now reads the repo's `AGENTS.md` — the same cross-tool open brief a growing set of coding agents already follow — so a repo you inherit onboards your session for free. A new send-now key (`ctrl+enter`, or `ctrl+x ctrl+s`) interrupts the turn Claude is running and delivers every queued message at once, turning a correction that used to wait for the turn to end into a redirect that lands the instant you catch the drift. And per-command allowed domains let a sandboxed Bash, PowerShell, or Monitor command in auto mode name the hosts it needs on the command itself, with the classifier reviewing that reach in context and any undeclared host refused by default — least privilege at the grain of a single command.",
};
