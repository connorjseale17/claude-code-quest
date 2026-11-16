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
  publishDate: '2026-11-16',
  framing:
    "This week in Claude, the throughline is the plumbing of *how* Claude runs — the way it issues its calls, the caution it takes stepping into a repo that isn't yours, and the proof-of-life it sends while a long job grinds on unwatched. The experimental **Code Mode** lets Claude write a short JavaScript program that calls its tools in one run, trading a parade of one-at-a-time round trips for a single composed pass on the grindy multi-step work. **Read-only git now asks first in untrusted repos**, so even a bare `git status` pauses when you've wandered into a checkout that's neither your project nor one you've vouched for. And a new **hook progress heartbeat** pulses every 30 seconds in headless `claude -p` and SDK runs, so a slow hook finally reads as *working* instead of *frozen* to whatever's watching the pipeline.",
};
