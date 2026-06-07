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
  publishDate: '2026-06-07',
  framing:
    "This week in Claude, the theme is scale and control — bigger jobs, fewer stalls, and a sharper hand on the throttle. Dynamic Workflows, the headline that shipped with Opus 4.8, lets Claude plan an enormous task itself and fan out hundreds of parallel subagents in one session, enough to carry a codebase-scale migration from kickoff to merge. The new `fallbackModel` setting keeps an engagement alive by hopping to a backup roster when your primary model goes dark, and the `/effort` dial lets you decide how hard Claude thinks on any given task — and lock that choice in as your default.",
};
