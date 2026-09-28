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
  publishDate: '2026-09-28',
  framing:
    "This week in Claude, the throughline is keeping your own footprint honest — the brief you give, the mark you leave, and the delete you can't take back. The new `/doctor prompt-audit` reads your CLAUDE.md and flags the older-model patterns still lurking in it — stale paths and commands, leftover thinking keywords — so the standing orders every session reads don't quietly rot as the models underneath them move on. A single settings.json switch, `\"attribution\": false`, hides all of the commit and PR attribution Claude Code would otherwise stamp on your work, so a client's git history reads in the client's house style. And a sharpened dangerous-`rm` guardrail now flags a removal aimed at an empty variable or a top-level directory, names the command, and waits-then-denies rather than running blind — handing you the `${VAR:?}` guard that turns the empty-variable wipe into a clean, loud failure.",
};
