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
  publishDate: '2026-07-20',
  framing:
    "This week in Claude, the throughline is control over where your work goes and when it gets checked. The new `/fork` command copies your whole conversation — context and all — into a background session with its own `claude agents` row, so you can chase a risky second approach without ever leaving the thread you're already in. The `/verify` and `/code-review` skills stop firing on Claude's own initiative and become yours to invoke, putting the quality gate on your timing — verify before you commit, review before you PR. And two new hard per-session ceilings — a WebSearch call limit and a subagent-spawn cap, 200 each by default and both adjustable — stand as the backstop that keeps an unattended run from quietly draining your rate limit while you're out of the room.",
};
