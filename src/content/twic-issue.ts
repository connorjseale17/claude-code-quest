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
  publishDate: '2026-06-15',
  framing:
    "This week in Claude, the theme is craft and control — leaving the work cleaner, keeping the rules airtight, and refusing to wait on slow jobs. The `/simplify` command runs a cleanup-only pass across reuse, simplification, efficiency, and altitude, and applies the fixes itself so you hand off a tidy codebase instead of a backlog. The new `enforceAvailableModels` managed setting closes the gap an allowlist left open, binding even the Default model to your approved list so a model policy actually holds. And inside `claude agents`, typing `! <command>` runs a shell command as a background session you can detach from and attach back to, so a twenty-minute build never pins you to a progress bar.",
};
