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
  publishDate: '2026-10-05',
  framing:
    "This week in Claude, the throughline is the safety net around your own work — the check that fires itself, the watcher that catches what you miss, and the draft a slip can no longer swallow. A skill named `verify` now runs itself right before every commit — except on docs-only or tests-only changes — so a client's quality bar is enforced at the commit line without you remembering to run it. The new `You should know` built-in mod puts a side agent alongside your session that watches your back and flags the things you overlooked, the colleague-over-your-shoulder you don't have on a solo engagement. And a stray `Ctrl+C` that clears a carefully composed prompt is no longer fatal: press Up on the now-empty prompt and the whole draft comes back, pasted text and images included.",
};
