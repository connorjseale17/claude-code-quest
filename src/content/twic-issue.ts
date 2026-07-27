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
  publishDate: '2026-07-27',
  framing:
    "This week in Claude, the throughline is a stronger engine and tighter control over how far your session reaches. Claude Opus 5 lands as the new default Opus model — a million-token context window at $10/$50 fast-mode pricing, tuned for long-running agents and, by Anthropic's numbers, more than doubling the previous Opus on hard reasoning at a lower cost per task. The new `sandbox.network.strictAllowlist` setting turns your network allowlist into a hard wall, denying any unlisted host to sandboxed commands *without prompting*, so an unattended run can't quietly phone a client's code home. And the new `DirectoryAdded` hook fires the instant a fresh working directory joins a session — via `/add-dir` or the SDK's `register_repo_root` — giving you one place to auto-onboard every repo a sprawling engagement pulls into scope.",
};
