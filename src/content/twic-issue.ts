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
  publishDate: '2026-08-17',
  framing:
    "This week in Claude, the throughline is the plumbing of a real engagement — where your reviews live, how your tooling ships, and what a runaway command can consume. GitLab arrives as a first-class host: the `--worktree` flag and the `claude agents` view now take a GitLab merge request URL, so a client who isn't on GitHub finally gets the same isolated-worktree review flow. The new `archive` plugin source installs a plugin from a plain HTTPS zip with neither git nor npm in the path — and an optional SHA-256 pin makes every install byte-identical to the package you vetted. And an opt-in Bash memory cgroup, set with `CLAUDE_CODE_TOOL_MEMORY_LIMIT`, puts a kernel-enforced ceiling on any single command, so a ballooning build on an unattended box is one failed command instead of a downed machine.",
};
