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
  publishDate: '2026-08-10',
  framing:
    "This week in Claude, the throughline is drawing your own boundary around the work — where it runs, what it can see, and how far it can reach. Self-hosted environments arrive: `claude self-hosted-runner` turns your own machines or containers into the place Claude Code cloud sessions execute, so a client whose contract says code can't leave their network finally gets a yes. Sandbox credential masking lets a sandboxed command read a per-session sentinel while the real secret is swapped in only on egress to an allowed host, keeping raw keys out of the blast radius of every unattended command. And cross-session `SendMessage` opens a channel between independent sessions — discovered with `ListAgents`, carrying only text and no power to act — so a fleet of sessions on one engagement can coordinate without any of them driving another.",
};
