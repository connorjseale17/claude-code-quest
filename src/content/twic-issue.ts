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
  publishDate: '2026-06-08',
  framing:
    "This week in Claude, the throughline is control of the surface — what Claude can touch, what you can see, and what you can hand off. Glob patterns in permission deny rules let a single wildcard fence off a whole family of tools at once, so a client guardrail stops springing leaks every time a server adds new ones. OpenTelemetry resource attributes now ride along as metric labels, turning one undifferentiated usage total into spend you can slice per engagement for an invoice or an ROI story. And the plugin tooling — `claude plugin init` plus auto-loading skills from `.claude/skills` — lets you package your firm's commands and standards into a single installable bundle instead of re-wiring them on every job.",
};
