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
  publishDate: '2026-06-02',
  framing:
    "This week in Claude, the theme is keeping your foot on the gas without leaving a mess: Accept Edits now taps the brakes before any config file that could quietly run code, so momentum mode stops short of signing a blank check; Claude-managed git worktrees let you spike risky work in an isolated folder and sweep it up with plain git when you're done; and plugins dropped into `.claude/skills` now load on their own, shipping a team's workflow with the repo instead of through a marketplace.",
};
