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
  publishDate: '2026-07-06',
  framing:
    "This week in Claude, the throughline is scale — how much you can hand Claude at once, and how well it helps you shape what comes back. The new built-in `/dataviz` skill brings genuine chart-and-dashboard design with a color-palette validator, so the visuals in your deliverables hold up instead of embarrassing you. Subagents now run in the background by default, so you fire off the long jobs and keep working while notifications pull you back when each one lands. And Claude Sonnet 5 arrives as the default model with a native 1M-token context window — big enough to point at an entire codebase or a stack of client documents and have it reason across all of it at once.",
};
