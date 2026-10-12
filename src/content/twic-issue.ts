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
  publishDate: '2026-10-12',
  framing:
    "This week in Claude, the throughline is the controls around the work rather than the work itself — a guard that fails shut instead of open, a delegate whose horsepower you dial to the task, and a running session you can step back into by name. `onFailure: \"block\"` lets a command or HTTP hook that can't start, times out, or exits with an unexpected code stop the action it guards instead of waving it through, turning a crashed safety check from a silent gap into a hard stop. The Agent tool's new `effort` parameter runs a dispatched sub-agent at the reasoning level you ask for — low for a mechanical sweep, high for a thorny design call — so compute matches the task instead of one speed fitting all. And `claude attach <name>` and `claude logs <name>` now take part of a session's name in place of its id, so stepping back into a background run or reading its output no longer means hunting down a cryptic identifier.",
};
