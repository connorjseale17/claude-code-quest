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
  publishDate: '2026-09-07',
  framing:
    "This week in Claude, the throughline is controlling what fills a session and who gets to decide — the skills it carries, the raw output it swallows, and the tool servers an organization hands its whole fleet. The new `/skill-doctor` command reports which of your loaded skills have gone unused and what each one costs in context, so the dead weight quietly eating your window finally becomes visible. The `bashOutputMaxChars` and `taskOutputMaxChars` settings raise how much command and background-task output lands inline before the rest spills to a file, letting you tune how much of a firehose floods the context instead of drowning in it. And `managedMcpServers` gives an organization a managed-settings home for the MCP servers it issues centrally, while the narrowed `allowedMcpServers` now gates only what individuals add — two populations of tool servers, governed by two clean levers.",
};
