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
  publishDate: '2026-06-29',
  framing:
    "This week in Claude, the throughline is keeping a tight grip on what your sessions touch, lose, and leave behind. The new `sandbox.credentials` setting walls the commands Claude runs off from your credential files and secret environment variables, so a sandboxed command can't pocket a client's API keys. `/rewind` now reaches back across a `/clear`, turning what used to be a point of no return into a recoverable mistake. And `attribution.sessionUrl` lets you drop the claude.ai session link from the commits and PRs Claude makes, so a client's git history stays a clean record of the work and not a trail back to your private sessions.",
};
