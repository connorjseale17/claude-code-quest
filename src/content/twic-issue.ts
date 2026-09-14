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
  publishDate: '2026-09-14',
  framing:
    "This week in Claude, the throughline is proof over hope — measuring what actually works, watching it as it happens, and putting a ceiling on the burn. The new `claude plugin eval` command runs a plugin against real test cases and re-runs each one with no plugin loaded, so the Δ between the two proves whether the plugin helped or Claude was getting there anyway. The `/diff` panel opens beside the conversation in fullscreen and redraws itself with every edit, turning review into something you do in flight instead of squinting at one giant diff at the end. And `maxEffortLevel` caps the reasoning-effort tier as a ceiling across every provider, reining in the reflex to run routine work at maximum without forcing anyone up to it.",
};
