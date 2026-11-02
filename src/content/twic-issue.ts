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
  publishDate: '2026-11-02',
  framing:
    "This week in Claude, the throughline is knowing the limits of the work — where it can reach, how hard it should think, and what it's been catching. `permissions.blockWritesOutsideWorkingDirectories` makes Claude's Write, Edit, and NotebookEdit tools refuse any path outside your project in every permission mode, so the fence holds even under bypassPermissions instead of riding on whichever gear you're in. The `ultrathink` keyword now runs a single turn at xhigh effort on the current 5-series models — Claude's deep-reasoning gear, usable mid-turn and confirmed by a rainbow on the word — so you spend the extra thinking on the calls that are costly to get wrong and leave the renames at the normal gear. And a new findings-by-severity card on the Code Review analytics page turns the reviewer's stream of per-PR comments into a period view — a total, a daily chart stacked by severity, and each severity's count — so 'is our code getting better or worse?' finally has a line you can point to.",
};
