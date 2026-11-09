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
  publishDate: '2026-11-09',
  framing:
    "This week in Claude, the throughline is work that runs without you watching — and the controls that keep it honest when you're not there to intervene. `permissions.denyInsteadOfPrompting` turns a permission prompt nobody's awake to answer into an instant denial, so an unattended run fails fast on anything you didn't pre-authorize instead of hanging on it forever. `/schedule` now warns you when a new cloud task would carry connectors you never requested, catching an unrequested passenger at creation time so a job that runs on its own can't quietly hold access you didn't mean to grant. And `/claude-api latency-optimize` reads your API-calling code, finds where response time is leaking, and *tests* faster settings — so the speed-up you ship to a client is one you measured, not one you guessed.",
};
