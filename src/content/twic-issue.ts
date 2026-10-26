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
  publishDate: '2026-10-26',
  framing:
    "This week in Claude, the throughline is matching the tool to the job — how hard to review, which model to run, and finally being able to see the controls at work. Code Review now has three levels — Quick, Standard, and Deep — set as an org-wide default and overridable per repository, so a throwaway docs site and the payments service no longer get the same pass. Claude Haiku 5.5 arrives as the cheapest, fastest small model yet, built for narrowly scoped, high-volume work like summaries, classification, and subagents, while Sonnet 5.5 and Opus 5.5 stay the choice for complex agentic coding. And the new `claude_code.safety_event` OpenTelemetry event prints a receipt for every tool call a permission rule, auto mode, a safety check, a hook, or the sandbox stopped, prompted on, or sent back — turning guardrails that fired silently into a queryable audit trail.",
};
