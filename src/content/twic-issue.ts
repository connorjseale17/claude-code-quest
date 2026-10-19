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
  publishDate: '2026-10-19',
  framing:
    "This week in Claude, the throughline is the quiet economics of a long session — what your context costs, and seeing the bill before it lands. Idle compaction now condenses a big, idle conversation (200K+ tokens) just before its one-hour prompt cache expires, so coming back after an hour no longer means reprocessing the whole pile from scratch. The `CLAUDE_CODE_DISABLE_FILE_MENTIONS` environment variable turns an `@` file mention into a path Claude reads on demand instead of a full-contents paste, keeping context lean on a repo full of heavy files. And `/usage` now names the four levers that most inflate a session — max effort, workflows, always-on context, and large tool results — so you can see what's driving the spend instead of just watching the number climb.",
};
