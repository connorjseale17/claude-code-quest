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
  publishDate: '2026-08-31',
  framing:
    "This week in Claude, the throughline is drawing hard lines around a session — what it's allowed to touch, when it may change engines, and how much it's allowed to burn. The new `--restricted` launch flag removes the built-in command and code tools along with `WebFetch`, so you can hand someone a Claude that reads and reasons over a codebase but can't run, rewrite, or reach the open web. The `PreModelSwitch` and `PostModelSwitch` hook events fire around a model change, letting you block, confirm, or annotate the swap at the lever instead of discovering it in the bill. And a new spend-limit bar in `/usage`, with a matching `rate_limits.spend_limit` status-line field, puts an engagement's dollar burn in plain sight — the on-demand check and the always-on read — so cost is something you catch at sixty percent instead of at the invoice.",
};
