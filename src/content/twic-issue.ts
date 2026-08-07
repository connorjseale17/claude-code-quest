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
  publishDate: '2026-08-03',
  framing:
    "This week in Claude, the throughline is delegating deeper and losing less to friction and silence. Subagents can now spawn their own nested subagents up to three levels deep — where the chain used to stop at one — so a branching engagement can fan out as workstream, service, then endpoint, with stream-json forwarding keeping even a headless three-level run observable. Plan mode stops nagging: read-only Bash commands like `ls`, `grep`, and `git log` now run without a permission prompt, turning plan mode into a genuine reconnaissance gear you can walk a client's repo in without click-fatigue. And MCP failures finally speak — `/mcp` and `claude mcp list` now surface the real HTTP status and error text on a broken server (with a matching `mcp_server_errors` field for headless runs), so a 401 or a 500 tells you which side of the wire to fix instead of leaving you to guess.",
};
