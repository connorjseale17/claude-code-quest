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
  publishDate: '2026-08-24',
  framing:
    "This week in Claude, the throughline is control over the surface of the work — how it reads, what engine it starts on, and how you drag old integrations forward. The new built-in `Concise` output style, chosen under Output style in `/config`, has Claude lead with the result and drop the preamble and narration while doing the work just as thoroughly — trimming the words, never the rigor. The `ANTHROPIC_DEFAULT_MODEL` environment variable sets the model new sessions *start* on as a soft default a `/model` pick still overrides and keeps, so you can standardize a whole fleet without taking the wheel from anyone — unlike the hard-pinning `ANTHROPIC_MODEL`. And `/claude-api upgrade` migrates a Python project from the `anthropic` SDK's 0.x line to 1.x, catching even the easy-to-miss breakages like `httpx.Timeout` becoming `anthropic.Timeout`, so an inherited integration's dreaded upgrade becomes a reviewable diff.",
};
