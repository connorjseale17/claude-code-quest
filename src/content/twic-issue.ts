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
  publishDate: '2026-06-22',
  framing:
    "This week in Claude, the throughline is control of your own surface — what's loaded, what's shown, and what it costs. The `--safe-mode` flag (and its `CLAUDE_CODE_SAFE_MODE` variable) boots a vanilla session with your skills, hooks, and plugins switched off, so you can tell in seconds whether odd behavior is Claude or your own setup. The new `MessageDisplay` hook event sits on the last step before a reply reaches your screen, letting you transform or hide its text — a standing redaction filter for client demos and recordings. And `/usage` now itemizes your consumption across skills, subagents, plugins, and MCP servers, so when a long engagement bumps your limits you can name the real hog before you cut it.",
};
