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
  publishDate: '2026-07-13',
  framing:
    "This week in Claude, the throughline is control with the safety on — deciding how hard Claude works, trusting it to run alone, and catching what's broken before it bites. The new `Dynamic workflow size` setting in `/config` lets you dial how wide Claude fans a job out — small, medium, or large — an advisory posture, not a hard cap, so you steer the cost of a swarm without boxing in the task that truly needs to scale. Auto mode grows two hard refusals: it won't tamper with your session transcript, and it stops to ask before an `rm -rf` on a variable it can't resolve — the guardrails that make an unattended run on a client repo trustworthy. And `/doctor` becomes a full setup checkup (now aliased `/checkup`), surfacing the misconfigurations — right down to a bloated checked-in `CLAUDE.md` — that would otherwise ambush you three hours into the engagement.",
};
