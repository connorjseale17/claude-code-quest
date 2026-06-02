// This Week in Claude — issue header.
// Drives the path-select tile date and the issue intro overlay.

export type TwicIssueIntro = {
  /** Issue date, ISO yyyy-mm-dd. Shown as the UPDATED date. */
  date: string;
  /** Short title for the issue. */
  title: string;
  /** 1-2 sentence rundown naming the three features in the rooms this week. */
  framing: string;
};

export const TWIC_ISSUE_INTRO: TwicIssueIntro = {
  date: '2026-06-02',
  title: 'This Week in Claude',
  framing:
    "This week's three rooms cover Opus 4.8's freshest moves: Dynamic Workflows (/workflows), which plans once and fans out into hundreds of parallel subagents in a single session; Effort Control (/effort), the dial alongside the model selector that sets how hard Claude thinks; and /simplify, the cleanup-only review that auto-applies quality fixes before you open a PR.",
};
